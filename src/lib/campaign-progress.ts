import type Stripe from "stripe";
import type { CampaignCounting } from "./campaigns.ts";
import { getStripe } from "./stripe.ts";

type CampaignProgress = {
  raisedCents: number;
  donorCount: number;
};

type SettledGift = {
  id: string;
  campaign: string | null;
  receivedCents: number;
  refundedCents: number;
  email: string | null;
};

// 20 pages of 100 gifts per search. Revisit if a single campaign approaches 2,000 gifts.
const maxPages = 20;
// Renewal invoices are created shortly before their payment, so look back a little further.
const invoiceLookbackSeconds = 3 * 24 * 60 * 60;

/** Campaign progress for pages. Returns null when Stripe is unavailable so pages still render. */
export async function loadCampaignProgress(campaign: CampaignCounting): Promise<CampaignProgress | null> {
  try {
    const stripe = getStripe();
    const [tagged, windowResult] = await Promise.all([
      searchGifts(stripe, `status:'succeeded' AND metadata['campaign']:'${campaign.slug}'`),
      campaign.untaggedWindow ? loadWindowGifts(stripe, campaign.untaggedWindow) : null,
    ]);
    const gifts = windowResult ? mergeCampaignGifts(campaign.slug, tagged, ...windowResult) : tagged;
    const progress = summarizeGifts(gifts);
    return { ...progress, raisedCents: progress.raisedCents + campaign.offlineCents };
  } catch (error) {
    console.error(`Failed to load progress for campaign ${campaign.slug}:`, error);
    return null;
  }
}

async function loadWindowGifts(
  stripe: Stripe,
  untaggedWindow: NonNullable<CampaignCounting["untaggedWindow"]>
): Promise<[SettledGift[], Set<string>]> {
  const from = Math.floor(Date.parse(untaggedWindow.from) / 1000);
  const until = Math.floor(Date.parse(untaggedWindow.until) / 1000);
  return Promise.all([
    searchGifts(stripe, `status:'succeeded' AND created>=${from} AND created<${until}`),
    listSubscriptionPaymentIds(stripe, from - invoiceLookbackSeconds, until),
  ]);
}

/** Stripe search is eventually consistent, so new gifts can take about a minute to appear. */
async function searchGifts(stripe: Stripe, query: string): Promise<SettledGift[]> {
  const gifts: SettledGift[] = [];
  let page: string | undefined;

  for (let pageCount = 0; pageCount < maxPages; pageCount += 1) {
    const result = await stripe.paymentIntents.search({
      query,
      limit: 100,
      expand: ["data.latest_charge"],
      ...(page ? { page } : {}),
    });

    for (const payment of result.data) {
      const charge = typeof payment.latest_charge === "object" ? payment.latest_charge : null;
      gifts.push({
        id: payment.id,
        campaign: payment.metadata.campaign ?? null,
        receivedCents: payment.amount_received,
        refundedCents: charge?.amount_refunded ?? 0,
        email: charge?.billing_details.email ?? null,
      });
    }

    if (!result.has_more || !result.next_page) {
      return gifts;
    }
    page = result.next_page;
  }

  console.warn(`Gift search "${query}" has more than ${maxPages} pages; the total is partial.`);
  return gifts;
}

/** PaymentIntents that paid subscription invoices, so monthly charges are not counted as campaign gifts. */
async function listSubscriptionPaymentIds(stripe: Stripe, from: number, until: number): Promise<Set<string>> {
  const ids = new Set<string>();
  const invoicePayments = stripe.invoicePayments.list({ status: "paid", created: { gte: from, lt: until }, limit: 100 });
  for await (const invoicePayment of invoicePayments) {
    const paymentIntent = invoicePayment.payment.payment_intent;
    if (paymentIntent) {
      ids.add(typeof paymentIntent === "string" ? paymentIntent : paymentIntent.id);
    }
  }
  return ids;
}

/**
 * Combines gifts tagged for the campaign with untagged gifts from its window. Window gifts tagged
 * for another designation and subscription charges are left out; each gift counts once.
 */
export function mergeCampaignGifts(
  slug: string,
  tagged: SettledGift[],
  windowGifts: SettledGift[],
  subscriptionPaymentIds: Set<string>
): SettledGift[] {
  const gifts = new Map(tagged.map((gift) => [gift.id, gift]));
  for (const gift of windowGifts) {
    const isOtherDesignation = gift.campaign !== null && gift.campaign !== slug;
    if (!isOtherDesignation && !subscriptionPaymentIds.has(gift.id)) {
      gifts.set(gift.id, gift);
    }
  }
  return [...gifts.values()];
}

export function summarizeGifts(gifts: SettledGift[]): CampaignProgress {
  let raisedCents = 0;
  const donors = new Set<string>();

  for (const gift of gifts) {
    const netCents = gift.receivedCents - gift.refundedCents;
    if (netCents <= 0) {
      continue;
    }

    raisedCents += netCents;
    donors.add(gift.email?.toLowerCase() ?? gift.id);
  }

  return { raisedCents, donorCount: donors.size };
}

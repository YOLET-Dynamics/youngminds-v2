import type Stripe from "stripe";
import type { DesignationSlug } from "./campaigns.ts";
import { getStripe } from "./stripe.ts";

type CampaignProgress = {
  raisedCents: number;
  donorCount: number;
};

type SettledGift = {
  id: string;
  receivedCents: number;
  refundedCents: number;
  email: string | null;
};

// 20 pages of 100 gifts. Revisit if a single campaign approaches 2,000 gifts.
const maxSearchPages = 20;

/** Live campaign progress for pages. Returns null when Stripe is unavailable so pages still render. */
export async function loadCampaignProgress(campaign: DesignationSlug): Promise<CampaignProgress | null> {
  try {
    return summarizeGifts(await searchCampaignGifts(getStripe(), campaign));
  } catch (error) {
    console.error(`Failed to load progress for campaign ${campaign}:`, error);
    return null;
  }
}

/**
 * Finds succeeded one-time gifts tagged with the campaign. Stripe search is eventually
 * consistent (about a minute), which matches the tracker's "updated every minute".
 */
async function searchCampaignGifts(stripe: Stripe, campaign: DesignationSlug): Promise<SettledGift[]> {
  const gifts: SettledGift[] = [];
  let page: string | undefined;

  for (let pageCount = 0; pageCount < maxSearchPages; pageCount += 1) {
    const result = await stripe.paymentIntents.search({
      query: `status:'succeeded' AND metadata['campaign']:'${campaign}'`,
      limit: 100,
      expand: ["data.latest_charge"],
      ...(page ? { page } : {}),
    });

    for (const payment of result.data) {
      const charge = typeof payment.latest_charge === "object" ? payment.latest_charge : null;
      gifts.push({
        id: payment.id,
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

  console.warn(`Campaign ${campaign} has more than ${maxSearchPages} pages of gifts; the total is partial.`);
  return gifts;
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

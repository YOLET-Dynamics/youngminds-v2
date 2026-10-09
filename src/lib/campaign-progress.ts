import { cache } from "react";
import type Stripe from "stripe";
import type { DesignationSlug } from "./campaigns.ts";
import { getStripe } from "./stripe.ts";

export type CampaignProgress = {
  raisedCents: number;
  donorCount: number;
};

/** Live campaign progress for pages. Returns null when Stripe is unavailable so pages still render. */
export const loadCampaignProgress = cache(async (campaign: DesignationSlug): Promise<CampaignProgress | null> => {
  try {
    return await fetchCampaignProgress(getStripe(), campaign);
  } catch (error) {
    console.error(`Failed to load progress for campaign ${campaign}:`, error);
    return null;
  }
});

// 20 pages of 100 gifts. Revisit if a single campaign approaches 2,000 gifts.
const maxSearchPages = 20;

/**
 * Sums succeeded one-time gifts tagged with the campaign, net of refunds.
 * Stripe search is eventually consistent (about a minute), which matches the
 * "updated every minute" promise on the tracker.
 */
export async function fetchCampaignProgress(
  stripe: Stripe,
  campaign: DesignationSlug
): Promise<CampaignProgress> {
  const payments: Stripe.PaymentIntent[] = [];
  let page: string | undefined;

  for (let pageCount = 0; pageCount < maxSearchPages; pageCount += 1) {
    const result = await stripe.paymentIntents.search({
      query: `status:'succeeded' AND metadata['campaign']:'${campaign}'`,
      limit: 100,
      expand: ["data.latest_charge"],
      ...(page ? { page } : {}),
    });

    payments.push(...result.data);

    if (!result.has_more || !result.next_page) {
      return summarizePayments(payments);
    }
    page = result.next_page;
  }

  console.warn(`Campaign ${campaign} has more than ${maxSearchPages} pages of gifts; the total is partial.`);
  return summarizePayments(payments);
}

export function summarizePayments(payments: Stripe.PaymentIntent[]): CampaignProgress {
  let raisedCents = 0;
  const donors = new Set<string>();

  for (const payment of payments) {
    const charge = typeof payment.latest_charge === "object" ? payment.latest_charge : null;
    const netCents = payment.amount_received - (charge?.amount_refunded ?? 0);
    if (netCents <= 0) {
      continue;
    }

    raisedCents += netCents;
    donors.add(charge?.billing_details.email?.toLowerCase() ?? payment.id);
  }

  return { raisedCents, donorCount: donors.size };
}

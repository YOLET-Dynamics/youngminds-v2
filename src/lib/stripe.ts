import Stripe from "stripe";

let client: Stripe | undefined;

/** Server-only Stripe client. Created on first use so builds without keys still succeed. */
export function getStripe(): Stripe {
  if (client) {
    return client;
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  client = new Stripe(secretKey, { apiVersion: "2026-09-30.endive" });
  return client;
}

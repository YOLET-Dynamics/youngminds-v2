import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildCheckoutSessionParams, checkoutRequestSchema } from "./donations.ts";

const origin = "https://www.youngmindset.org";

describe("checkoutRequestSchema", () => {
  it("accepts a one-time gift for a known campaign", () => {
    const parsed = checkoutRequestSchema.safeParse({ frequency: "once", amountCents: 2500, campaign: "good-drinks" });
    assert.equal(parsed.success, true);
  });

  it("rejects amounts outside $1 to $10,000 and fractional cents", () => {
    for (const amountCents of [99, 1_000_001, 25.5, -100]) {
      assert.equal(checkoutRequestSchema.safeParse({ frequency: "once", amountCents }).success, false, String(amountCents));
    }
  });

  it("rejects unknown campaigns, tiers and extra fields", () => {
    assert.equal(checkoutRequestSchema.safeParse({ frequency: "once", amountCents: 1000, campaign: "other" }).success, false);
    assert.equal(checkoutRequestSchema.safeParse({ frequency: "monthly", tier: "platinum" }).success, false);
    assert.equal(
      checkoutRequestSchema.safeParse({ frequency: "once", amountCents: 1000, unit_amount: 1 }).success,
      false
    );
  });
});

describe("buildCheckoutSessionParams", () => {
  it("tags one-time campaign gifts on the PaymentIntent so the tracker can count them", () => {
    const params = buildCheckoutSessionParams({ frequency: "once", amountCents: 2500, campaign: "good-drinks" }, origin);

    assert.equal(params.mode, "payment");
    assert.equal(params.submit_type, "donate");
    assert.deepEqual(params.payment_intent_data?.metadata, { frequency: "once", campaign: "good-drinks" });
    assert.equal(params.line_items?.[0]?.price_data?.unit_amount, 2500);
    assert.equal(params.line_items?.[0]?.price_data?.product, "ym_campaign_good_drinks");
    assert.equal(params.success_url, `${origin}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`);
    assert.equal(params.cancel_url, `${origin}/donate?campaign=good-drinks`);
    assert.deepEqual(params.consent_collection, { promotions: "auto" });
  });

  it("uses the general donation product without a campaign", () => {
    const params = buildCheckoutSessionParams({ frequency: "once", amountCents: 1000 }, origin);

    assert.equal(params.line_items?.[0]?.price_data?.product, "ym_donation");
    assert.deepEqual(params.metadata, { frequency: "once" });
    assert.equal(params.cancel_url, `${origin}/donate`);
  });

  it("creates a monthly subscription priced from the server-side tier, not the client", () => {
    const params = buildCheckoutSessionParams({ frequency: "monthly", tier: "regular" }, origin);

    assert.equal(params.mode, "subscription");
    assert.equal(params.submit_type, undefined);
    assert.equal(params.payment_intent_data, undefined);
    assert.equal(params.line_items?.[0]?.price_data?.unit_amount, 2500);
    assert.deepEqual(params.line_items?.[0]?.price_data?.recurring, { interval: "month" });
    assert.deepEqual(params.subscription_data?.metadata, { frequency: "monthly", tier: "regular" });
  });
});

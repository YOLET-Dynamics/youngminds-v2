import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildCheckoutSessionParams, checkoutRequestSchema, loadCompletedGift } from "./donations.ts";
import { parseDesignation } from "./campaigns.ts";
import { getStripe } from "./stripe.ts";

const origin = "https://www.youngmindset.org";

describe("loadCompletedGift", () => {
  const savedKey = process.env.STRIPE_SECRET_KEY;
  process.env.STRIPE_SECRET_KEY = "sk_test_local_unit_test";
  const stripe = getStripe();
  if (savedKey === undefined) delete process.env.STRIPE_SECRET_KEY;
  else process.env.STRIPE_SECRET_KEY = savedKey;
  const sessionId = "cs_test_1234567890";
  const paidSession = { status: "complete", payment_status: "paid", amount_total: 2500, currency: "usd", mode: "payment" };

  it("confirms only paid gifts and preserves monthly frequency", async (t) => {
    t.mock.method(stripe.checkout.sessions, "retrieve", async () => paidSession);
    assert.deepEqual(await loadCompletedGift(sessionId), { status: "paid", amountCents: 2500, isMonthly: false });
    t.mock.method(stripe.checkout.sessions, "retrieve", async () => ({ ...paidSession, mode: "subscription" }));
    assert.deepEqual(await loadCompletedGift(sessionId), { status: "paid", amountCents: 2500, isMonthly: true });
  });

  it("keeps completed but unpaid checkout pending", async (t) => {
    t.mock.method(stripe.checkout.sessions, "retrieve", async () => ({ ...paidSession, payment_status: "unpaid" }));
    assert.deepEqual(await loadCompletedGift(sessionId), { status: "pending", amountCents: 2500, isMonthly: false });
  });

  it("does not confirm open, expired, free or non-USD sessions", async (t) => {
    for (const changes of [
      { status: "open" }, { status: "expired" }, { amount_total: null }, { amount_total: 0 },
      { payment_status: "no_payment_required" }, { currency: "eur" }, { mode: "setup" },
    ]) {
      t.mock.method(stripe.checkout.sessions, "retrieve", async () => ({ ...paidSession, ...changes }));
      assert.equal(await loadCompletedGift(sessionId), null);
    }
  });

  it("does not look up missing or malformed session IDs", async (t) => {
    const retrieve = t.mock.method(stripe.checkout.sessions, "retrieve", async () => paidSession);
    for (const id of [undefined, "", "invalid", [sessionId]]) {
      assert.equal(await loadCompletedGift(id), null);
    }
    assert.equal(retrieve.mock.callCount(), 0);
  });

  it("returns unverified when Stripe cannot retrieve the session", async (t) => {
    t.mock.method(console, "error", () => undefined);
    t.mock.method(stripe.checkout.sessions, "retrieve", async () => { throw new Error("Unavailable"); });
    assert.equal(await loadCompletedGift(sessionId), null);
  });
});

describe("parseDesignation", () => {
  it("accepts known campaigns", () => {
    assert.equal(parseDesignation("adina"), "adina");
    assert.equal(parseDesignation("good-drinks"), "good-drinks");
  });

  it("ignores unknown, repeated and inherited campaign names", () => {
    for (const value of [undefined, "", "other", ["adina", "good-drinks"], "constructor", "toString", "__proto__"]) {
      assert.equal(parseDesignation(value), undefined);
    }
  });
});

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

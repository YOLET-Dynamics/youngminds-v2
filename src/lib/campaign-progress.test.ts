import assert from "node:assert/strict";
import { describe, it } from "node:test";
import type Stripe from "stripe";
import { summarizePayments } from "./campaign-progress.ts";

function payment(id: string, amountReceived: number, refunded: number, email: string | null): Stripe.PaymentIntent {
  return {
    id,
    amount_received: amountReceived,
    latest_charge: { amount_refunded: refunded, billing_details: { email } },
  } as unknown as Stripe.PaymentIntent;
}

describe("summarizePayments", () => {
  it("returns zero for a campaign with no gifts", () => {
    assert.deepEqual(summarizePayments([]), { raisedCents: 0, donorCount: 0 });
  });

  it("nets partial refunds and leaves out fully refunded gifts", () => {
    const result = summarizePayments([
      payment("pi_1", 5000, 0, "a@example.com"),
      payment("pi_2", 2500, 1000, "b@example.com"),
      payment("pi_3", 10000, 10000, "c@example.com"),
    ]);

    assert.deepEqual(result, { raisedCents: 6500, donorCount: 2 });
  });

  it("counts repeat donors once, ignoring email case", () => {
    const result = summarizePayments([
      payment("pi_1", 1000, 0, "Donor@Example.com"),
      payment("pi_2", 2000, 0, "donor@example.com"),
      payment("pi_3", 3000, 0, null),
    ]);

    assert.deepEqual(result, { raisedCents: 6000, donorCount: 2 });
  });
});

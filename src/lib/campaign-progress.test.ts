import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { summarizeGifts } from "./campaign-progress.ts";

function gift(id: string, receivedCents: number, refundedCents: number, email: string | null) {
  return { id, receivedCents, refundedCents, email };
}

describe("summarizeGifts", () => {
  it("returns zero for a campaign with no gifts", () => {
    assert.deepEqual(summarizeGifts([]), { raisedCents: 0, donorCount: 0 });
  });

  it("nets partial refunds and leaves out fully refunded gifts", () => {
    const result = summarizeGifts([
      gift("pi_1", 5000, 0, "a@example.com"),
      gift("pi_2", 2500, 1000, "b@example.com"),
      gift("pi_3", 10000, 10000, "c@example.com"),
    ]);

    assert.deepEqual(result, { raisedCents: 6500, donorCount: 2 });
  });

  it("counts repeat donors once, ignoring email case", () => {
    const result = summarizeGifts([
      gift("pi_1", 1000, 0, "Donor@Example.com"),
      gift("pi_2", 2000, 0, "donor@example.com"),
      gift("pi_3", 3000, 0, null),
    ]);

    assert.deepEqual(result, { raisedCents: 6000, donorCount: 2 });
  });
});

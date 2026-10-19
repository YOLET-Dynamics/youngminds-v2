import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { mergeCampaignGifts, summarizeGifts } from "./campaign-progress.ts";

function gift(id: string, receivedCents: number, refundedCents: number, email: string | null, campaign: string | null = null) {
  return { id, campaign, receivedCents, refundedCents, email };
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

describe("mergeCampaignGifts", () => {
  it("adds untagged window gifts to tagged gifts and counts each gift once", () => {
    const tagged = [gift("pi_early", 2000, 0, "a@example.com", "good-drinks")];
    const windowGifts = [
      gift("pi_untagged", 5000, 0, "b@example.com"),
      gift("pi_same_tag", 1500, 0, "c@example.com", "good-drinks"),
      gift("pi_early", 2000, 0, "a@example.com", "good-drinks"),
    ];

    const merged = mergeCampaignGifts("good-drinks", tagged, windowGifts, new Set());

    assert.deepEqual(merged.map((item) => item.id).sort(), ["pi_early", "pi_same_tag", "pi_untagged"]);
  });

  it("leaves out gifts for another designation and subscription charges", () => {
    const windowGifts = [
      gift("pi_adina", 4000, 0, "d@example.com", "adina"),
      gift("pi_monthly", 2500, 0, "e@example.com"),
      gift("pi_one_time", 1000, 0, "f@example.com"),
    ];

    const merged = mergeCampaignGifts("good-drinks", [], windowGifts, new Set(["pi_monthly"]));

    assert.deepEqual(merged.map((item) => item.id), ["pi_one_time"]);
  });
});

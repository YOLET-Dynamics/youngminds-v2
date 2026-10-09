import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  buildSubscriptionManagementEmail,
  joinSubmissionSchema,
  newsletterSignupSchema,
  subscriptionManagementSchema,
} from "./forms.ts";

const joinBase = {
  firstName: "Abeba",
  lastName: "Tesfaye",
  email: "abeba@example.com",
  phone: "+1 (571) 555-0100",
  message: "I would love to help at events.",
};

describe("joinSubmissionSchema", () => {
  it("accepts a submission with or without the newsletter opt-in", () => {
    assert.equal(joinSubmissionSchema.safeParse(joinBase).success, true);
    assert.equal(joinSubmissionSchema.safeParse({ ...joinBase, newsletter: true }).success, true);
  });

  it("rejects a non-boolean newsletter value", () => {
    assert.equal(joinSubmissionSchema.safeParse({ ...joinBase, newsletter: "yes" }).success, false);
  });
});

describe("newsletterSignupSchema", () => {
  it("accepts a valid email and rejects anything else", () => {
    assert.equal(newsletterSignupSchema.safeParse({ email: "donor@example.com" }).success, true);
    assert.equal(newsletterSignupSchema.safeParse({ email: "not-an-email" }).success, false);
    assert.equal(newsletterSignupSchema.safeParse({ email: "donor@example.com", segment: "x" }).success, false);
  });
});

describe("subscription management", () => {
  it("accepts a known change with optional details", () => {
    const base = { fullName: "Abeba Tesfaye", email: "abeba@example.com", change: "cancel" };
    assert.equal(subscriptionManagementSchema.safeParse(base).success, true);
    assert.equal(subscriptionManagementSchema.safeParse({ ...base, details: "Moving abroad" }).success, true);
    assert.equal(subscriptionManagementSchema.safeParse({ ...base, change: "refund" }).success, false);
  });

  it("escapes submitted text in the staff email", () => {
    const email = buildSubscriptionManagementEmail({
      fullName: "<script>alert(1)</script>",
      email: "abeba@example.com",
      change: "other",
      details: "<b>bold</b>",
    });

    assert.ok(!email.html.includes("<script>"));
    assert.ok(email.html.includes("&lt;b&gt;bold&lt;/b&gt;"));
    assert.ok(email.text.includes("Requested change: Something else"));
  });
});

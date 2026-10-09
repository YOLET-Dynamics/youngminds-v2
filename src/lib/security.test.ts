import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { guardPublicPost, resetRateLimitStoreForTests } from "./security.ts";

const limit = { key: "test", limit: 2, windowMs: 60_000 };

function post(origin: string | null, ip = "203.0.113.7"): Request {
  const headers = new Headers({ "x-forwarded-for": ip });
  if (origin) {
    headers.set("origin", origin);
  }
  return new Request("https://www.youngmindset.org/api/test", { method: "POST", headers });
}

describe("guardPublicPost", () => {
  beforeEach(() => {
    resetRateLimitStoreForTests();
    delete process.env.SECURITY_ALLOWED_ORIGINS;
  });

  it("allows a same-origin request", () => {
    assert.equal(guardPublicPost(post("https://www.youngmindset.org"), limit), null);
  });

  it("rejects cross-site and missing origins with 403", () => {
    assert.equal(guardPublicPost(post("https://evil.example"), limit)?.status, 403);
    assert.equal(guardPublicPost(post(null), limit)?.status, 403);
  });

  it("rate limits per client IP with Retry-After", () => {
    const origin = "https://www.youngmindset.org";
    assert.equal(guardPublicPost(post(origin), limit), null);
    assert.equal(guardPublicPost(post(origin), limit), null);

    const blocked = guardPublicPost(post(origin), limit);
    assert.equal(blocked?.status, 429);
    assert.ok(Number(blocked?.headers.get("Retry-After")) > 0);

    assert.equal(guardPublicPost(post(origin, "198.51.100.1"), limit), null);
  });
});

import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { guardPublicPost, parseJsonBody, resetRateLimitStoreForTests } from "./security.ts";

const limit = { key: "test", limit: 2, windowMs: 60_000 };

describe("parseJsonBody", () => {
  it("accepts JSON at the byte limit, including multibyte text", async () => {
    const body = JSON.stringify({ message: "ሰላም" });
    const request = new Request("https://example.com", { method: "POST", body });
    assert.deepEqual(await parseJsonBody(request, Buffer.byteLength(body)), {
      ok: true,
      value: { message: "ሰላም" },
    });
  });

  it("rejects malformed or missing JSON", async () => {
    for (const body of [undefined, "", "{broken"]) {
      const request = new Request("https://example.com", { method: "POST", body });
      const result = await parseJsonBody(request, 100);
      assert.equal(result.ok, false);
      if (!result.ok) assert.equal(result.status, 400);
    }
  });

  it("counts bytes rather than characters", async () => {
    const body = JSON.stringify({ message: "ሰላም" });
    const request = new Request("https://example.com", { method: "POST", body });
    const result = await parseJsonBody(request, body.length);
    assert.equal(result.ok, false);
    if (!result.ok) assert.equal(result.status, 413);
  });

  it("cancels an oversized stream before consuming the rest", async () => {
    let reads = 0;
    let cancelled = false;
    const body = new ReadableStream<Uint8Array>({
      pull(controller) {
        reads += 1;
        controller.enqueue(new Uint8Array(600));
        if (reads === 10) controller.close();
      },
      cancel() { cancelled = true; },
    }, { highWaterMark: 0 });
    const request = new Request("https://example.com", {
      method: "POST", body, duplex: "half",
    } as RequestInit & { duplex: "half" });
    const result = await parseJsonBody(request, 1000);
    assert.equal(result.ok, false);
    if (!result.ok) assert.equal(result.status, 413);
    assert.equal(cancelled, true);
    assert.equal(reads, 2);
  });

  it("returns a safe error when the request stream fails", async () => {
    const body = new ReadableStream<Uint8Array>({
      pull(controller) { controller.error(new Error("Connection interrupted")); },
    });
    const request = new Request("https://example.com", {
      method: "POST", body, duplex: "half",
    } as RequestInit & { duplex: "half" });
    assert.deepEqual(await parseJsonBody(request, 1000), {
      ok: false, status: 400, message: "Invalid JSON body",
    });
  });
});

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

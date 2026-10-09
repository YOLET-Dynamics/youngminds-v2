type PostJsonResult = { ok: true; data: unknown } | { ok: false; error: string };

const fallbackError = "Something went wrong. Please try again.";

/** Browser helper for the site's JSON form endpoints, which reply with `{ error }` on failure. */
export async function postJson(url: string, body: unknown): Promise<PostJsonResult> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const payload: unknown = await response.json().catch(() => null);

    if (response.ok) {
      return { ok: true, data: payload };
    }
    if (response.status === 429) {
      return { ok: false, error: "Too many attempts. Please wait a few minutes and try again." };
    }
    const message = payload && typeof payload === "object" && "error" in payload ? payload.error : null;
    return { ok: false, error: typeof message === "string" ? message : fallbackError };
  } catch {
    return { ok: false, error: "We couldn't reach the server. Check your connection and try again." };
  }
}

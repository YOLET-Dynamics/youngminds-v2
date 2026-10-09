type PostJsonResult<T> = { ok: true; data: T } | { ok: false; error: string };

const fallbackError = "Something went wrong. Please try again.";

/** Browser helper for the site's JSON form endpoints, which reply with `{ error }` on failure. */
export async function postJson<T>(url: string, body: unknown): Promise<PostJsonResult<T>> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const payload: unknown = await response.json().catch(() => null);

    if (!response.ok) {
      if (response.status === 429) {
        return { ok: false, error: "Too many attempts. Please wait a few minutes and try again." };
      }
      const message = (payload as { error?: unknown } | null)?.error;
      return { ok: false, error: typeof message === "string" ? message : fallbackError };
    }

    return { ok: true, data: payload as T };
  } catch {
    return { ok: false, error: "We couldn't reach the server. Check your connection and try again." };
  }
}

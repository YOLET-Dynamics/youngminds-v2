export { escapeHtml } from "./html.ts";

type JsonParseResult =
  | {
      ok: true;
      value: unknown;
    }
  | {
      ok: false;
      status: 400 | 413;
      message: string;
    };

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitResult =
  | {
      allowed: true;
      retryAfterSeconds: 0;
    }
  | {
      allowed: false;
      retryAfterSeconds: number;
    };

const rateLimitStore = new Map<string, RateLimitEntry>();

export function buildAllowedOrigins(value: string | undefined): Set<string> {
  const origins = new Set<string>();

  for (const item of value?.split(",") ?? []) {
    const trimmed = item.trim();
    if (!trimmed) {
      continue;
    }

    try {
      const url = new URL(trimmed);
      const isHttps = url.protocol === "https:";
      const isLocalHttp =
        url.protocol === "http:" &&
        (url.hostname === "localhost" || url.hostname === "127.0.0.1");

      if (isHttps || isLocalHttp) {
        origins.add(url.origin);
      }
    } catch {
      continue;
    }
  }

  return origins;
}

export function isAllowedOrigin(
  origin: string | null,
  allowedOrigins: Set<string>
): boolean {
  if (allowedOrigins.size === 0) {
    return true;
  }

  if (!origin) {
    return false;
  }

  try {
    return allowedOrigins.has(new URL(origin).origin);
  } catch {
    return false;
  }
}

export async function parseJsonBody(
  request: Request,
  maxBytes: number
): Promise<JsonParseResult> {
  const body = await request.text();

  if (Buffer.byteLength(body, "utf8") > maxBytes) {
    return {
      ok: false,
      status: 413,
      message: "Request body is too large",
    };
  }

  try {
    return {
      ok: true,
      value: JSON.parse(body) as unknown,
    };
  } catch {
    return {
      ok: false,
      status: 400,
      message: "Invalid JSON body",
    };
  }
}

export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    headers.get("cf-connecting-ip") ||
    headers.get("x-real-ip") ||
    headers.get("fly-client-ip") ||
    "unknown"
  );
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
  now = Date.now()
): RateLimitResult {
  const existing = rateLimitStore.get(key);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });

    return {
      allowed: true,
      retryAfterSeconds: 0,
    };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;

  return {
    allowed: true,
    retryAfterSeconds: 0,
  };
}

export function resetRateLimitStoreForTests(): void {
  rateLimitStore.clear();
}

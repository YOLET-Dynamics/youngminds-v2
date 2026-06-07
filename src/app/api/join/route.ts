import { Resend } from "resend";
import { NextResponse } from "next/server";
import {
  buildAllowedOrigins,
  getClientIp,
  isAllowedOrigin,
  parseJsonBody,
  rateLimit,
} from "@/lib/security";
import { buildJoinEmail, joinSubmissionSchema } from "@/lib/forms";

const resend = new Resend(process.env.RESEND_API_KEY);

const maxBodyBytes = 10_000;
const rateLimitMax = 5;
const rateLimitWindowMs = 10 * 60 * 1000;

export async function POST(
  request: Request
): Promise<NextResponse<{ success: true } | { error: string }>> {
  try {
    if (!isAllowedOrigin(request.headers.get("origin"), getAllowedOrigins(request))) {
      return NextResponse.json({ error: "Invalid request origin" }, { status: 403 });
    }

    const clientIp = getClientIp(request.headers);
    const limit = rateLimit(`join:${clientIp}`, rateLimitMax, rateLimitWindowMs);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many requests" },
        {
          status: 429,
          headers: {
            "Retry-After": String(limit.retryAfterSeconds),
          },
        }
      );
    }

    const body = await parseJsonBody(request, maxBodyBytes);
    if (!body.ok) {
      return NextResponse.json({ error: body.message }, { status: body.status });
    }

    const parsed = joinSubmissionSchema.safeParse(body.value);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const email = buildJoinEmail(parsed.data);

    await resend.emails.send({
      from: "no-reply@youngmindset.org",
      to: "contact@youngmindset.org",
      subject: email.subject,
      html: email.html,
      text: email.text,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

function getAllowedOrigins(request: Request): Set<string> {
  const configuredOrigins = buildAllowedOrigins(process.env.SECURITY_ALLOWED_ORIGINS);

  if (configuredOrigins.size > 0) {
    return configuredOrigins;
  }

  return new Set([new URL(request.url).origin]);
}

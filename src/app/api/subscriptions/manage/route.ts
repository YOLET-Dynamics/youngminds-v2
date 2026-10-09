import { guardPublicPost, parseJsonBody } from "@/lib/security";
import { buildSubscriptionManagementEmail, subscriptionManagementSchema } from "@/lib/forms";
import { sendEmail } from "@/lib/email";

const maxBodyBytes = 10_000;

export async function POST(request: Request): Promise<Response> {
  const blocked = guardPublicPost(request, {
    key: "subscriptions:manage",
    limit: 5,
    windowMs: 10 * 60 * 1000,
  });
  if (blocked) {
    return blocked;
  }

  const body = await parseJsonBody(request, maxBodyBytes);
  if (!body.ok) {
    return Response.json({ error: body.message }, { status: body.status });
  }

  const parsed = subscriptionManagementSchema.safeParse(body.value);
  if (!parsed.success) {
    return Response.json({ error: "Please check your details and try again." }, { status: 400 });
  }

  try {
    await sendEmail({
      to: "subscriptions@youngmindset.org",
      replyTo: parsed.data.email,
      ...buildSubscriptionManagementEmail(parsed.data),
    });
  } catch (error) {
    console.error("Failed to send subscription management request:", error);
    return Response.json({ error: "Failed to send your request" }, { status: 502 });
  }

  return Response.json({ success: true });
}

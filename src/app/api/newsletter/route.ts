import { guardPublicPost, parseJsonBody } from "@/lib/security";
import { newsletterSignupSchema } from "@/lib/forms";
import { subscribeToNewsletter } from "@/lib/email";

const maxBodyBytes = 1_000;

export async function POST(request: Request): Promise<Response> {
  const blocked = guardPublicPost(request, { key: "newsletter", limit: 5, windowMs: 10 * 60 * 1000 });
  if (blocked) {
    return blocked;
  }

  const body = await parseJsonBody(request, maxBodyBytes);
  if (!body.ok) {
    return Response.json({ error: body.message }, { status: body.status });
  }

  const parsed = newsletterSignupSchema.safeParse(body.value);
  if (!parsed.success) {
    return Response.json({ error: "Please enter a valid email address" }, { status: 400 });
  }

  try {
    await subscribeToNewsletter({ email: parsed.data.email });
  } catch (error) {
    console.error("Failed to subscribe to the newsletter:", error);
    return Response.json({ error: "We couldn't subscribe you right now" }, { status: 502 });
  }

  return Response.json({ success: true });
}

import { guardPublicPost, parseJsonBody } from "@/lib/security";
import { buildJoinEmail, joinSubmissionSchema } from "@/lib/forms";
import { sendEmail, subscribeToNewsletter } from "@/lib/email";
import { siteConfig } from "@/lib/site";

const maxBodyBytes = 10_000;

export async function POST(request: Request): Promise<Response> {
  const blocked = guardPublicPost(request, { key: "join", limit: 5, windowMs: 10 * 60 * 1000 });
  if (blocked) {
    return blocked;
  }

  const body = await parseJsonBody(request, maxBodyBytes);
  if (!body.ok) {
    return Response.json({ error: body.message }, { status: body.status });
  }

  const parsed = joinSubmissionSchema.safeParse(body.value);
  if (!parsed.success) {
    return Response.json({ error: "Please check your details and try again." }, { status: 400 });
  }

  try {
    await sendEmail({ to: siteConfig.email, replyTo: parsed.data.email, ...buildJoinEmail(parsed.data) });
  } catch (error) {
    console.error("Failed to send join request:", error);
    return Response.json({ error: "Failed to send your request" }, { status: 502 });
  }

  // The join request already reached the team, so a newsletter failure must not fail the request.
  if (parsed.data.newsletter) {
    try {
      await subscribeToNewsletter({ email: parsed.data.email, firstName: parsed.data.firstName });
    } catch (error) {
      console.error("Failed to add join applicant to the newsletter:", error);
    }
  }

  return Response.json({ success: true });
}

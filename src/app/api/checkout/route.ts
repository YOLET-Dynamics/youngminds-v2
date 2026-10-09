import { checkoutRequestSchema, createDonationCheckout } from "@/lib/donations";
import { getSiteOrigin, guardPublicPost, parseJsonBody } from "@/lib/security";
import { getStripe } from "@/lib/stripe";
import { siteConfig } from "@/lib/site";

const maxBodyBytes = 1_000;

export async function POST(request: Request): Promise<Response> {
  const blocked = guardPublicPost(request, { key: "checkout", limit: 10, windowMs: 10 * 60 * 1000 });
  if (blocked) {
    return blocked;
  }

  const body = await parseJsonBody(request, maxBodyBytes);
  if (!body.ok) {
    return Response.json({ error: body.message }, { status: body.status });
  }

  const parsed = checkoutRequestSchema.safeParse(body.value);
  if (!parsed.success) {
    return Response.json({ error: "Please choose an amount between $1 and $10,000" }, { status: 400 });
  }

  try {
    const url = await createDonationCheckout(
      getStripe(),
      parsed.data,
      getSiteOrigin(request, siteConfig.url)
    );
    return Response.json({ url });
  } catch (error) {
    console.error("Failed to create Checkout Session:", error);
    return Response.json({ error: "We couldn't start the secure payment. Please try again." }, { status: 502 });
  }
}

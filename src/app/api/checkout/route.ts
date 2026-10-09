import { donationLimitsCents, formatUsd } from "@/lib/campaigns";
import { checkoutRequestSchema, createDonationCheckout } from "@/lib/donations";
import { getSiteOrigin, guardPublicPost, parseJsonBody } from "@/lib/security";
import { getStripe } from "@/lib/stripe";
import { siteConfig } from "@/lib/site";

const maxBodyBytes = 1_000;

export async function POST(request: Request): Promise<Response> {
  // Event guests share the venue's public IP, so this allows a busy room while still capping scripted abuse.
  const blocked = guardPublicPost(request, { key: "checkout", limit: 60, windowMs: 10 * 60 * 1000 });
  if (blocked) {
    return blocked;
  }

  const body = await parseJsonBody(request, maxBodyBytes);
  if (!body.ok) {
    return Response.json({ error: body.message }, { status: body.status });
  }

  const parsed = checkoutRequestSchema.safeParse(body.value);
  if (!parsed.success) {
    return Response.json(
      {
        error: `Please choose an amount between ${formatUsd(donationLimitsCents.min)} and ${formatUsd(donationLimitsCents.max)}`,
      },
      { status: 400 }
    );
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

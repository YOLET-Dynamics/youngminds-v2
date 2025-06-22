import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const totalOnly = searchParams.get("totalOnly") === "true";

    const paymentLinkId = process.env.STRIPE_PAYMENT_LINK_ID;
    if (!paymentLinkId) {
      throw new Error("Stripe Payment Link ID is not configured.");
    }

    let allSessions: Stripe.Checkout.Session[] = [];
    let hasMore = true;
    let startingAfter: string | undefined = undefined;

    while (hasMore) {
      const sessions: Stripe.ApiList<Stripe.Checkout.Session> =
        await stripe.checkout.sessions.list({
          limit: 100,
          payment_link: paymentLinkId,
          starting_after: startingAfter,
          expand: totalOnly ? [] : ["data.custom_fields"],
        });

      allSessions = allSessions.concat(sessions.data);
      hasMore = sessions.has_more;

      if (hasMore && sessions.data.length > 0) {
        startingAfter = sessions.data[sessions.data.length - 1].id;
      }
    }

    const donations = [];
    let total = 0;

    for (const session of allSessions) {
      if (session.payment_status === "paid") {
        const amount = session.amount_total ?? 0;
        total += amount;

        if (!totalOnly) {
          let donorName = session.customer_details?.name || "Anonymous";
          const customFields = session.custom_fields || [];
          const recognitionField = customFields.find(
            (field) => field.key === "public_recognition"
          );

          if (
            recognitionField?.dropdown?.value === "make_anonymous" ||
            !session.customer_details?.name
          ) {
            donorName = "Anonymous";
          }
          donations.push({
            id: session.id,
            name: donorName,
            email: session.customer_details?.email || "",
            amount: amount / 100,
            date: session.created * 1000,
          });
        }
      }
    }

    const responsePayload: { total: number; donations?: any[] } = {
      total: total / 100,
    };

    if (!totalOnly) {
      responsePayload.donations = donations;
    }

    return NextResponse.json(responsePayload);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

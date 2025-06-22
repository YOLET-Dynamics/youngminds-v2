import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export async function GET() {
  try {
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
        donations.push({
          id: session.id,
          name: session.customer_details?.name || "Anonymous",
          email: session.customer_details?.email || "",
          amount: amount / 100,
          date: session.created * 1000,
        });
      }
    }

    return NextResponse.json({
      total: total / 100,
      donations,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

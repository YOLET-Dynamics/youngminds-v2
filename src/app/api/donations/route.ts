import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { parseDonationQuery } from "@/lib/donations";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

type DonationsResponse = {
  total: number;
};

const privateNoStoreHeaders = {
  "Cache-Control": "private, no-store",
};

export async function GET(req: NextRequest): Promise<NextResponse<DonationsResponse | { error: string }>> {
  try {
    const { searchParams } = new URL(req.url);

    const query = parseDonationQuery(searchParams);
    if (!query.ok) {
      return NextResponse.json(
        { error: query.message },
        { status: query.status, headers: privateNoStoreHeaders }
      );
    }

    const paymentLinkId = process.env[query.value.paymentLinkEnvName];
    if (!paymentLinkId) {
      throw new Error("Stripe Payment Link ID is not configured.");
    }

    let pageCount = 0;
    let hasMore = true;
    let startingAfter: string | undefined = undefined;
    let total = 0;

    while (hasMore && pageCount < query.value.maxPages) {
      const sessions: Stripe.ApiList<Stripe.Checkout.Session> =
        await stripe.checkout.sessions.list({
          limit: 100,
          payment_link: paymentLinkId,
          starting_after: startingAfter,
          ...(query.value.createdFilter ? { created: query.value.createdFilter } : {}),
        });

      for (const session of sessions.data) {
        if (session.payment_status === "paid") {
          total += session.amount_total ?? 0;
        }
      }

      hasMore = sessions.has_more;
      pageCount += 1;

      if (hasMore && sessions.data.length > 0) {
        startingAfter = sessions.data[sessions.data.length - 1].id;
      } else {
        hasMore = false;
      }
    }

    return NextResponse.json(
      { total: total / 100 },
      { headers: privateNoStoreHeaders }
    );
  } catch (error) {
    console.error("Failed to load donation totals:", error);
    return NextResponse.json(
      { error: "Failed to load donation totals" },
      { status: 500, headers: privateNoStoreHeaders }
    );
  }
}

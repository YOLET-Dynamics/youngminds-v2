import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const totalOnly = searchParams.get("totalOnly") === "true";
    const campaign = searchParams.get("campaign") || "default";
    const sinceStr = searchParams.get("since"); // e.g. 2025-11-01 or ISO
    const untilStr = searchParams.get("until"); // optional

    let paymentLinkId: string | undefined = undefined;
    if (campaign === "matrimony") {
      paymentLinkId = process.env.STRIPE_PAYMENT_LINK_ID_MATRIMONY;
    } else if (campaign === "default") {
      paymentLinkId = process.env.STRIPE_PAYMENT_LINK_ID;
    }
    if (campaign !== "all" && !paymentLinkId) {
      throw new Error("Stripe Payment Link ID is not configured.");
    }

    // Build created range filter if provided
    let createdFilter: { gte?: number; lte?: number } | undefined = undefined;
    const parseDateToUnix = (input: string) => {
      const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(input);
      const d = new Date(isDateOnly ? `${input}T00:00:00Z` : input);
      if (isNaN(d.getTime())) return undefined;
      return Math.floor(d.getTime() / 1000);
    };
    const sinceUnix = sinceStr ? parseDateToUnix(sinceStr) : undefined;
    const untilUnix = untilStr ? parseDateToUnix(untilStr) : undefined;
    if (sinceUnix || untilUnix) {
      createdFilter = {};
      if (sinceUnix) createdFilter.gte = sinceUnix;
      if (untilUnix) createdFilter.lte = untilUnix;
    }

    let allSessions: Stripe.Checkout.Session[] = [];
    let hasMore = true;
    let startingAfter: string | undefined = undefined;

    while (hasMore) {
      const sessions: Stripe.ApiList<Stripe.Checkout.Session> =
        await stripe.checkout.sessions.list({
          limit: 100,
          ...(paymentLinkId ? { payment_link: paymentLinkId } : {}),
          starting_after: startingAfter,
          ...(createdFilter ? { created: createdFilter as any } : {}),
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

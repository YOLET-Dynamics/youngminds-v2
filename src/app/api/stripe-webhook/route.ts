import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { subscribeToNewsletter } from "@/lib/email";

export async function POST(request: Request): Promise<Response> {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!endpointSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured");
    return Response.json({ error: "Webhook is not configured" }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return Response.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(await request.text(), signature, endpointSecret);
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);
    return Response.json({ error: "Invalid webhook" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    try {
      await handleCompletedCheckout(event.data.object);
    } catch (error) {
      // A non-2xx response makes Stripe retry; the newsletter subscribe is safe to repeat.
      console.error(`Failed to handle ${event.type} event=${event.id}:`, error);
      return Response.json({ error: "Webhook handler failed" }, { status: 500 });
    }
  }

  return Response.json({ received: true });
}

async function handleCompletedCheckout(session: Stripe.Checkout.Session): Promise<void> {
  const email = session.customer_details?.email;
  if (session.consent?.promotions !== "opt_in" || !email) {
    return;
  }

  const firstName = session.customer_details?.name?.trim().split(/\s+/)[0];
  await subscribeToNewsletter({ email, firstName });
}

import Stripe from "stripe";
import { z } from "zod";
import {
  designations,
  designationSlugs,
  donationLimitsCents,
  monthlyTierKeys,
  monthlyTiers,
} from "./campaigns.ts";

export const checkoutRequestSchema = z.discriminatedUnion("frequency", [
  z
    .object({
      frequency: z.literal("once"),
      amountCents: z.number().int().min(donationLimitsCents.min).max(donationLimitsCents.max),
      campaign: z.enum(designationSlugs).optional(),
    })
    .strict(),
  z
    .object({
      frequency: z.literal("monthly"),
      tier: z.enum(monthlyTierKeys),
      campaign: z.enum(designationSlugs).optional(),
    })
    .strict(),
]);

type CheckoutRequest = z.infer<typeof checkoutRequestSchema>;

type CheckoutProduct = { id: string; name: string };

const oneTimeProduct: CheckoutProduct = { id: "ym_donation", name: "Donation to YoungMinds ET" };
const monthlyProduct: CheckoutProduct = { id: "ym_monthly_gift", name: "Monthly gift to YoungMinds ET" };

const receiptNote =
  "YoungMinds ET Inc. is a registered 501(c)(3) nonprofit. No goods or services are provided in exchange for your gift. It is tax-deductible to the extent permitted by law.";

function checkoutProductFor(request: CheckoutRequest): CheckoutProduct {
  if (request.frequency === "monthly") {
    return monthlyProduct;
  }

  if (request.campaign) {
    const designation = designations[request.campaign];
    return { id: designation.productId, name: designation.name };
  }

  return oneTimeProduct;
}

/** `origin` must be the configured site origin, never a value taken from request headers. */
export function buildCheckoutSessionParams(
  request: CheckoutRequest,
  origin: string
): Stripe.Checkout.SessionCreateParams {
  const product = checkoutProductFor(request);
  const metadata: Record<string, string> = {
    frequency: request.frequency,
    ...(request.campaign ? { campaign: request.campaign } : {}),
  };
  const shared = {
    consent_collection: { promotions: "auto" },
    custom_text: { submit: { message: receiptNote } },
    success_url: `${origin}/donate/thank-you?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/donate${request.campaign ? `?campaign=${request.campaign}` : ""}`,
  } satisfies Stripe.Checkout.SessionCreateParams;

  if (request.frequency === "monthly") {
    const tier = monthlyTiers[request.tier];
    return {
      ...shared,
      mode: "subscription",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: tier.amount * 100,
            recurring: { interval: "month" },
            product: product.id,
          },
        },
      ],
      metadata: { ...metadata, tier: request.tier },
      subscription_data: {
        description: `${tier.name} monthly gift`,
        metadata: { ...metadata, tier: request.tier },
      },
    };
  }

  return {
    ...shared,
    mode: "payment",
    submit_type: "donate",
    line_items: [
      {
        quantity: 1,
        price_data: { currency: "usd", unit_amount: request.amountCents, product: product.id },
      },
    ],
    metadata,
    payment_intent_data: { description: product.name, metadata },
  };
}

export async function createDonationCheckout(
  stripe: Stripe,
  request: CheckoutRequest,
  origin: string
): Promise<string> {
  await ensureProduct(stripe, checkoutProductFor(request));

  const session = await stripe.checkout.sessions.create(buildCheckoutSessionParams(request, origin));
  if (!session.url) {
    throw new Error(`Checkout Session ${session.id} has no URL`);
  }

  return session.url;
}

const ensuredProducts = new Map<string, Promise<void>>();

// Products use fixed IDs, so they are created once on first use and need no Dashboard setup.
function ensureProduct(stripe: Stripe, product: CheckoutProduct): Promise<void> {
  let ensured = ensuredProducts.get(product.id);
  if (!ensured) {
    ensured = createProductIfMissing(stripe, product).catch((error: unknown) => {
      ensuredProducts.delete(product.id);
      throw error;
    });
    ensuredProducts.set(product.id, ensured);
  }

  return ensured;
}

async function createProductIfMissing(stripe: Stripe, product: CheckoutProduct): Promise<void> {
  try {
    await stripe.products.retrieve(product.id);
    return;
  } catch (error) {
    if (!isStripeErrorCode(error, "resource_missing")) {
      throw error;
    }
  }

  try {
    await stripe.products.create({ id: product.id, name: product.name });
  } catch (error) {
    if (!isStripeErrorCode(error, "resource_already_exists")) {
      throw error;
    }
  }
}

function isStripeErrorCode(error: unknown, code: string): boolean {
  return error instanceof Stripe.errors.StripeError && error.code === code;
}

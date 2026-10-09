"use client";

import { useEffect, useState } from "react";
import { postJson } from "@/lib/post-json";

function checkoutUrlFrom(data: unknown): string | null {
  const url = data && typeof data === "object" && "url" in data ? data.url : null;
  return typeof url === "string" && url.startsWith("https://checkout.stripe.com/") ? url : null;
}

/** Starts a Stripe Checkout Session through `/api/checkout` and redirects to it. */
export function useCheckout() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Returning from Stripe with the back button restores this page from cache mid-submit.
  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setIsSubmitting(false);
      }
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  async function startCheckout(body: Record<string, unknown>) {
    setError(null);
    setIsSubmitting(true);
    const result = await postJson("/api/checkout", body);
    const url = result.ok ? checkoutUrlFrom(result.data) : null;

    if (!url) {
      setError(result.ok ? "We couldn't start the secure payment. Please try again." : result.error);
      setIsSubmitting(false);
      return;
    }
    window.location.assign(url);
  }

  return { isSubmitting, error, setError, startCheckout };
}

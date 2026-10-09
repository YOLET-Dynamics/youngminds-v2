"use client";

import { useEffect, useState } from "react";
import { postJson } from "@/lib/post-json";

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
    const result = await postJson<{ url: string }>("/api/checkout", body);

    if (!result.ok) {
      setError(result.error);
      setIsSubmitting(false);
      return;
    }
    window.location.assign(result.data.url);
  }

  return { isSubmitting, error, setError, startCheckout };
}

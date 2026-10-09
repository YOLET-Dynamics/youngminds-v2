"use client";

import type { DesignationSlug, MonthlyTier } from "@/lib/campaigns";
import { useCheckout } from "./useCheckout";

export function MonthlyTierButton({ tier, amount, featured, campaign }: {
  tier: MonthlyTier;
  amount: number;
  featured: boolean;
  campaign?: DesignationSlug;
}) {
  const { isSubmitting, error, startCheckout } = useCheckout();

  return (
    <>
      <button
        className={`btn btn-block ${featured ? "btn-primary" : "btn-outline"}`}
        type="button"
        onClick={() => startCheckout({ frequency: "monthly", tier, ...(campaign ? { campaign } : {}) })}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Opening secure payment…" : `Give $${amount} monthly`}
      </button>
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </>
  );
}

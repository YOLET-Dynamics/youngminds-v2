"use client";

import { monthlyTiers, type DesignationSlug, type MonthlyTier } from "@/lib/campaigns";
import { useCheckout } from "./useCheckout";

export function MonthlyTierButton({ tier, featured, campaign }: {
  tier: MonthlyTier;
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
        {isSubmitting ? "Opening secure payment…" : `Give $${monthlyTiers[tier].amount} monthly`}
      </button>
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </>
  );
}

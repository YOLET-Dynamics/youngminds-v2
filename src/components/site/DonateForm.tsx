"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { designations, donationLimitsCents, formatUsd, giftLadder, type DesignationSlug } from "@/lib/campaigns";
import { useCheckout } from "./useCheckout";

const presetAmounts = giftLadder.map((gift) => gift.amount);

type Frequency = "once" | "monthly";

function parseDollars(value: string): number | null {
  const cleaned = value.replace(/[$,\s]/g, "");
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) {
    return null;
  }
  return Number(cleaned);
}

/** `campaign` is preselected; donors can switch to the general fund instead. */
export function DonateForm({ campaign }: { campaign?: DesignationSlug }) {
  const [designation, setDesignation] = useState<DesignationSlug | undefined>(campaign);
  const [frequency, setFrequency] = useState<Frequency>("once");
  const [preset, setPreset] = useState<number | null>(25);
  const [custom, setCustom] = useState("");
  const { isSubmitting, error, setError, startCheckout } = useCheckout();

  const customDollars = custom ? parseDollars(custom) : null;
  const dollars = custom ? customDollars : preset;
  const impact = giftLadder.findLast((gift) => dollars !== null && dollars >= gift.amount);
  const monthlyHref = designation ? `/donate/subscribe?campaign=${designation}` : "/donate/subscribe";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const amountCents = dollars === null ? null : Math.round(dollars * 100);
    if (amountCents === null || amountCents < donationLimitsCents.min || amountCents > donationLimitsCents.max) {
      setError(
        `Please enter an amount between ${formatUsd(donationLimitsCents.min)} and ${formatUsd(donationLimitsCents.max)}.`
      );
      return;
    }

    await startCheckout({
      frequency: "once",
      amountCents,
      ...(designation ? { campaign: designation } : {}),
    });
  }

  return (
    <form className="paper form" onSubmit={onSubmit} aria-labelledby="give-title" noValidate>
      <h2 id="give-title" className="h3">
        Choose your gift
      </h2>

      {campaign && (
        <fieldset className="choice-group">
          <legend>Your gift supports</legend>
          {[
            { id: "designation-campaign", value: campaign, label: designations[campaign].name },
            { id: "designation-general", value: undefined, label: "Where it’s needed most" },
          ].map((option) => (
            <div className="choice" key={option.id}>
              <input
                type="radio"
                id={option.id}
                name="designation"
                checked={designation === option.value}
                onChange={() => setDesignation(option.value)}
              />
              <label htmlFor={option.id}>{option.label}</label>
            </div>
          ))}
        </fieldset>
      )}

      <fieldset className="choice-group gap-0">
        <legend className="sr-only">Frequency</legend>
        <div className="segmented">
          {(["once", "monthly"] as const).map((value) => (
            <div className="choice" key={value}>
              <input
                type="radio"
                id={`frequency-${value}`}
                name="frequency"
                value={value}
                checked={frequency === value}
                onChange={() => setFrequency(value)}
              />
              <label htmlFor={`frequency-${value}`}>{value === "once" ? "One-time" : "Monthly"}</label>
            </div>
          ))}
        </div>
      </fieldset>

      {frequency === "once" ? (
        <div className="form">
          <fieldset className="choice-group">
            <legend>Amount</legend>
            <div className="amounts">
              {presetAmounts.map((amount) => (
                <div className="choice" key={amount}>
                  <input
                    type="radio"
                    id={`amount-${amount}`}
                    name="amount"
                    value={amount}
                    checked={!custom && preset === amount}
                    onChange={() => {
                      setPreset(amount);
                      setCustom("");
                      setError(null);
                    }}
                  />
                  <label htmlFor={`amount-${amount}`}>${amount}</label>
                </div>
              ))}
            </div>
          </fieldset>
          <div className="field">
            <label htmlFor="custom-amount">Or enter an amount</label>
            <input
              className="input"
              id="custom-amount"
              name="custom"
              inputMode="decimal"
              placeholder="$ Other amount"
              value={custom}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "donate-error" : undefined}
              onChange={(event) => {
                setCustom(event.target.value);
                setError(null);
              }}
            />
          </div>
          {impact && (
            <p className="small muted" aria-live="polite">
              ${impact.amount} {impact.desc.charAt(0).toLowerCase() + impact.desc.slice(1)}
            </p>
          )}
          {error && (
            <p className="field-error" id="donate-error" role="alert">
              {error}
            </p>
          )}
          <button className="btn btn-primary btn-block" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Opening secure payment…" : "Continue to secure payment"}
          </button>
        </div>
      ) : (
        <div className="form">
          <p className="muted">Monthly gifts give students steady support. Cancel in the portal or contact us to change your amount.</p>
          <Link className="btn btn-primary btn-block" href={monthlyHref}>
            Choose a monthly tier
          </Link>
          <Link className="arrow-link small" href="/subscriptions/manage">
            Already giving monthly? Manage your gift
          </Link>
        </div>
      )}
    </form>
  );
}

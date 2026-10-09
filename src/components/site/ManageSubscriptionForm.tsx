"use client";

import { useRef, useState, type FormEvent } from "react";
import { subscriptionChangeOptions } from "@/lib/subscription-changes";
import { postJson } from "@/lib/post-json";
import { Icon } from "./Icon";

export function ManageSubscriptionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError(null);
    setIsSubmitting(true);

    const details = String(form.get("details") ?? "").trim();
    const result = await postJson("/api/subscriptions/manage", {
      fullName: String(form.get("fullName") ?? ""),
      email: String(form.get("email") ?? ""),
      change: String(form.get("change") ?? ""),
      ...(details ? { details } : {}),
    });

    setIsSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setIsSent(true);
    requestAnimationFrame(() => successRef.current?.focus());
  }

  if (isSent) {
    return (
      <div ref={successRef} className="paper stack-sm" tabIndex={-1} role="status">
        <p className="form-success">
          <Icon name="check" />
          Request received
        </p>
        <p className="muted">We’ll reply by email within two business days.</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="m-name">Full name</label>
          <input className="input" id="m-name" name="fullName" autoComplete="name" minLength={2} maxLength={100} required />
        </div>
        <div className="field">
          <label htmlFor="m-email">Email used to give</label>
          <input className="input" id="m-email" name="email" type="email" autoComplete="email" maxLength={254} required />
        </div>
      </div>
      <div className="field">
        <label htmlFor="m-change">What would you like to change?</label>
        <select className="select input" id="m-change" name="change" required defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          {Object.entries(subscriptionChangeOptions).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="m-details">
          Details <span className="muted font-normal">(optional)</span>
        </label>
        <textarea className="textarea" id="m-details" name="details" maxLength={1000} />
      </div>
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
      <button className="btn btn-outline justify-self-start" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send request"}
      </button>
    </form>
  );
}

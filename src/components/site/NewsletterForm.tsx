"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { postJson } from "@/lib/post-json";
import { Icon } from "./Icon";

type Status = { state: "idle" | "submitting" } | { state: "success" } | { state: "error"; message: string };

export function NewsletterForm({
  label = "Email address",
  showLabel = false,
  buttonClassName = "btn-primary",
}: {
  label?: string;
  showLabel?: boolean;
  buttonClassName?: "btn-primary" | "btn-gold";
}) {
  const id = useId();
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    setStatus({ state: "submitting" });

    const result = await postJson("/api/newsletter", { email });
    setStatus(result.ok ? { state: "success" } : { state: "error", message: result.error });
  }

  if (status.state === "success") {
    return (
      <p className="form-success" role="status">
        <Icon name="check" />
        Thanks for subscribing. Look out for our next update.
      </p>
    );
  }

  return (
    <form className="newsletter-form" onSubmit={onSubmit}>
      <label className={showLabel ? "small font-semibold" : "sr-only"} htmlFor={`${id}-email`}>
        {label}
      </label>
      <div className="input-group">
        <input
          className="input"
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@email.com"
          maxLength={254}
          required
          aria-describedby={status.state === "error" ? `${id}-error` : undefined}
        />
        <button className={`btn ${buttonClassName}`} type="submit" disabled={status.state === "submitting"}>
          {status.state === "submitting" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {status.state === "error" && (
        <p className="field-error" id={`${id}-error`} role="alert">
          {status.message}
        </p>
      )}
      <p className="newsletter-consent">
        By subscribing you agree to receive emails from YoungMinds ET. Unsubscribe anytime. See our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </form>
  );
}

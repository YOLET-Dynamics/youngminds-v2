"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { liveCampaign } from "@/lib/campaigns";
import { postJson } from "@/lib/post-json";
import { siteConfig } from "@/lib/site";

export function JoinForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError(null);
    setIsSubmitting(true);

    const result = await postJson("/api/join", {
      firstName: String(form.get("firstName") ?? ""),
      lastName: String(form.get("lastName") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      message: String(form.get("message") ?? ""),
      newsletter: form.get("newsletter") === "on",
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
      <div ref={successRef} className="paper stack" tabIndex={-1} role="status">
        <span className="script">Welcome to the table.</span>
        <h2 className="h2">Thanks for joining.</h2>
        <p className="muted">We’ll be in touch within a week. In the meantime, come say hello at our next event.</p>
        <div className="btn-row">
          <Link className="btn btn-primary" href={liveCampaign.href}>
            See upcoming event
          </Link>
          <a className="btn btn-outline" href={siteConfig.instagram} target="_blank" rel="noopener noreferrer">
            Follow on Instagram
          </a>
        </div>
      </div>
    );
  }

  return (
    <form className="paper form" onSubmit={onSubmit} aria-labelledby="join-title">
      <h2 id="join-title" className="h3">
        Tell us about you
      </h2>
      <div className="form-row">
        <div className="field">
          <label htmlFor="j-first">First name</label>
          <input className="input" id="j-first" name="firstName" autoComplete="given-name" minLength={2} maxLength={80} required />
        </div>
        <div className="field">
          <label htmlFor="j-last">Last name</label>
          <input className="input" id="j-last" name="lastName" autoComplete="family-name" minLength={2} maxLength={80} required />
        </div>
      </div>
      <div className="field">
        <label htmlFor="j-email">Email</label>
        <input className="input" id="j-email" name="email" type="email" autoComplete="email" maxLength={254} required />
      </div>
      <div className="field">
        <label htmlFor="j-phone">Phone</label>
        <input
          className="input"
          id="j-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          minLength={7}
          maxLength={32}
          pattern="[0-9+\(\)\.\-\s]{7,32}"
          title="Digits, spaces and + ( ) . - only"
          required
        />
      </div>
      <div className="field">
        <label htmlFor="j-msg">Why do you want to join?</label>
        <textarea
          className="textarea"
          id="j-msg"
          name="message"
          minLength={10}
          maxLength={1000}
          required
          aria-describedby="j-msg-hint"
        />
        <span className="hint" id="j-msg-hint">
          10 to 1,000 characters.
        </span>
      </div>
      <label className="check">
        <input type="checkbox" name="newsletter" />
        <span>Also send me the monthly newsletter.</span>
      </label>
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
      <button className="btn btn-primary btn-block" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Join us"}
      </button>
      <p className="small muted">
        We’ll only use your details to contact you about volunteering. <Link href="/privacy">Privacy Policy</Link>
      </p>
    </form>
  );
}

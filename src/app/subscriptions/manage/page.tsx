import type { Metadata } from "next";
import { Icon } from "@/components/site/Icon";
import { ManageSubscriptionForm } from "@/components/site/ManageSubscriptionForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Manage your monthly gift",
  description: "Update your card, change your amount, or cancel your monthly gift to YoungMinds ET.",
  alternates: { canonical: "/subscriptions/manage" },
};

export default function ManageSubscriptionPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap narrow stack">
          <p className="eyebrow">Monthly giving</p>
          <h1 className="h1">Manage your monthly gift</h1>
          <p className="lead">
            Update your card, change your amount, or cancel. It takes about a minute in the secure Stripe portal.
          </p>
          <div className="paper stack">
            <h2 className="h3">Self-service portal</h2>
            <p className="muted">Stripe will email you a secure sign-in link. Use the email you gave with.</p>
            <a className="btn btn-primary btn-block" href={siteConfig.billingPortal} rel="noopener noreferrer">
              Open billing portal
              <Icon name="external" />
            </a>
          </div>
        </div>
      </section>

      <section className="section-tight pt-0">
        <div className="wrap narrow stack">
          <h2 className="h3">Need a hand instead?</h2>
          <p className="muted">Send us the details and we’ll make the change for you within two business days.</p>
          <ManageSubscriptionForm />
        </div>
      </section>
    </>
  );
}

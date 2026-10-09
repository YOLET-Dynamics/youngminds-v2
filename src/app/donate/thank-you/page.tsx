import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/site/Icon";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { formatUsd } from "@/lib/campaigns";
import { siteConfig } from "@/lib/site";
import { getStripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Thank you for supporting students in Ethiopia.",
  robots: { index: false, follow: false },
};

type CompletedGift = {
  amountCents: number;
  isMonthly: boolean;
};

const sessionIdPattern = /^cs_(test|live)_[A-Za-z0-9]{10,200}$/;

async function loadCompletedGift(sessionId: unknown): Promise<CompletedGift | null> {
  if (typeof sessionId !== "string" || !sessionIdPattern.test(sessionId)) {
    return null;
  }

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    if (session.status !== "complete" || session.amount_total === null) {
      return null;
    }
    return {
      amountCents: session.amount_total,
      isMonthly: session.mode === "subscription",
    };
  } catch (error) {
    console.error("Failed to load Checkout Session for thank-you page:", error);
    return null;
  }
}

export default async function ThankYouPage({ searchParams }: PageProps<"/donate/thank-you">) {
  const gift = await loadCompletedGift((await searchParams).session_id);

  return (
    <>
      <section className="hero">
        <div className="wrap split split-7-5">
          <div className="stack">
            <span className="script">You made a difference today.</span>
            <h1 className="display">Thank you.</h1>
            <p className="lead">
              {gift ? (
                <>
                  Your {gift.isMonthly ? "monthly gift" : "gift"} of{" "}
                  <strong className="text-ink">
                    {formatUsd(gift.amountCents)}
                    {gift.isMonthly ? "/month" : ""}
                  </strong>{" "}
                  is on its way to students in Ethiopia. A receipt is in your inbox.
                </>
              ) : (
                <>Your gift is on its way to students in Ethiopia. A receipt is in your inbox.</>
              )}
            </p>
            <div className="btn-row-stack">
              <a className="btn btn-gold" href={siteConfig.instagram} target="_blank" rel="noopener noreferrer">
                <Icon name="instagram" />
                Share on Instagram
              </a>
              <Link className="btn btn-outline" href="/">
                Back to home
              </Link>
            </div>
            <p className="small muted">
              Tag <strong className="text-ink">{siteConfig.instagramHandle}</strong> in your story and we’ll share it.
            </p>
          </div>
          <Image
            className="arch aspect-[4/5] h-auto"
            src="/images/hero.jpg"
            alt="A young student smiling and holding a small globe"
            width={1800}
            height={1394}
            sizes="(min-width: 900px) 40vw, 100vw"
          />
        </div>
      </section>

      <section className="section band-white">
        <div className="wrap split">
          <div className="stack-sm">
            <h2 className="h2">See what your gift does.</h2>
            <p className="muted">One email a month with campaign progress and student stories.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap center stack-sm">
          {gift?.isMonthly ? (
            <>
              <p className="muted">Need to change your monthly gift later?</p>
              <Link className="arrow-link" href="/subscriptions/manage">
                Manage your monthly gift
              </Link>
            </>
          ) : (
            <>
              <p className="muted">Want to give every month?</p>
              <Link className="arrow-link" href="/donate/subscribe">
                Monthly giving from $3
              </Link>
            </>
          )}
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/site/Icon";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { formatUsd } from "@/lib/campaigns";
import { siteConfig } from "@/lib/site";
import { loadCompletedGift } from "@/lib/donations";

export const metadata: Metadata = {
  title: "Your donation",
  description: "Check the status of your donation to YoungMinds ET.",
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({ searchParams }: PageProps<"/donate/thank-you">) {
  const gift = await loadCompletedGift((await searchParams).session_id);

  return (
    <>
      <section className="hero">
        <div className="wrap split split-7-5">
          <div className="stack">
            <span className="script">Thank you for supporting students.</span>
            <h1 className="display">
              {gift?.status === "paid" ? "Thank you." : gift ? "Payment pending." : "We couldn’t confirm your gift."}
            </h1>
            <p className="lead">
              {gift ? (
                <>
                  Your {gift.isMonthly ? "monthly gift" : "gift"} of{" "}
                  <strong className="text-ink">
                    {formatUsd(gift.amountCents)}
                    {gift.isMonthly ? "/month" : ""}
                  </strong>{" "}
                  {gift.status === "paid"
                    ? "has been received. Thank you for helping students in Ethiopia."
                    : "has not been confirmed yet. Please check your email for payment updates before trying again."}
                </>
              ) : (
                <>We couldn’t verify a payment from this link. If you recently donated, check your email or contact us before trying again.</>
              )}
            </p>
            <div className="btn-row-stack">
              <a className="btn btn-gold" href={siteConfig.instagram} target="_blank" rel="noopener noreferrer">
                <Icon name="instagram" />
                Visit our Instagram
              </a>
              <Link className="btn btn-outline" href="/">
                Back to home
              </Link>
            </div>
            {gift?.status !== "paid" && (
              <p className="small muted">
                Need help? <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </p>
            )}
            <p className="small muted">
              Tag <strong className="text-ink">{siteConfig.instagramHandle}</strong> in your story and we’ll share it.
            </p>
            {gift?.status === "paid" && (
              <p className="small muted">
                {gift.isMonthly ? (
                  <Link href="/subscriptions/manage">Manage your monthly gift</Link>
                ) : (
                  <>
                    Want to give every month? <Link href="/donate/subscribe">Monthly giving from $3</Link>
                  </>
                )}
              </p>
            )}
          </div>
          <Image
            className="arch aspect-[4/5] h-auto"
            src="/images/hero-illustration.jpg"
            alt="Illustration of three students learning together with books and notebooks"
            width={1122}
            height={1402}
            sizes="(min-width: 900px) 40vw, 100vw"
          />
        </div>
      </section>

      <section className="section band-white">
        <div className="wrap split">
          <div className="stack-sm">
            <h2 className="h2">Follow our work.</h2>
            <p className="muted">One email a month with campaign progress and student stories.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}

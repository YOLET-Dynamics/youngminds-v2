import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CampaignTracker } from "@/components/site/CampaignTracker";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { loadCampaignProgress } from "@/lib/campaign-progress";
import { goodDrinks, pastCampaigns } from "@/lib/campaigns";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming events and past campaigns from YoungMinds ET, raising support for students in need across Ethiopia.",
  alternates: { canonical: "/events" },
};

export default async function EventsPage() {
  const progress = await loadCampaignProgress(goodDrinks);
  const isLive = goodDrinks.status === "live";

  return (
    <>
      <section className="hero pb-12">
        <div className="wrap stack">
          <p className="eyebrow">Events &amp; campaigns</p>
          <h1 className="h1">Gather, give, and see it add up.</h1>
        </div>
      </section>

      <section aria-labelledby="upcoming-title">
        <div className="wrap">
          <h2 id="upcoming-title" className="eyebrow mb-4">
            {isLive ? "Upcoming" : "Most recent"}
          </h2>
          <div className="paper event-feature p-6">
            <Link href={goodDrinks.href} className="block" tabIndex={-1} aria-hidden="true">
              <Image
                src={goodDrinks.flyer.src}
                alt=""
                width={goodDrinks.flyer.width}
                height={goodDrinks.flyer.height}
                sizes="(min-width: 900px) 45vw, 100vw"
                className="w-full aspect-[4/3] object-cover object-top rounded-[var(--radius)]"
              />
            </Link>
            <div className="stack">
              <div className="flex items-center gap-4">
                <span className="date-block" aria-hidden="true">
                  <span className="m">Oct</span>
                  <span className="d">17</span>
                </span>
                {isLive ? (
                  <p className="badge">
                    <span className="dot" />
                    Live campaign
                  </p>
                ) : (
                  <span className="badge badge-done">Completed</span>
                )}
              </div>
              <h3 className="h2">
                <Link href={goodDrinks.href} className="text-[inherit] no-underline hover:underline">
                  {goodDrinks.name}
                </Link>
              </h3>
              <p className="small muted">
                {goodDrinks.dateLabel} · {goodDrinks.time} · {goodDrinks.venue}, Silver Spring, MD
              </p>
              <CampaignTracker
                goalCents={goodDrinks.goalCents}
                raisedCents={progress?.raisedCents ?? null}
                donorCount={progress?.donorCount}
                status={goodDrinks.status}
                size="compact"
              />
              <div className="btn-row">
                <Link className="btn btn-primary" href={goodDrinks.href}>
                  {isLive ? "See event and give" : "See the recap"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="past-title">
        <div className="wrap">
          <h2 id="past-title" className="h2 mb-8">
            Past campaigns
          </h2>
          <div className="grid-2 gap-x-8 gap-y-12">
            {pastCampaigns.map((campaign) => (
              <Link className="event-card" href={campaign.href} key={campaign.name}>
                <Image
                  src={campaign.image.src}
                  alt={campaign.image.alt}
                  width={campaign.image.width}
                  height={campaign.image.height}
                  sizes="(min-width: 768px) 45vw, 100vw"
                  className="object-[center_30%]"
                />
                <span className="badge badge-done justify-self-start">{campaign.badge}</span>
                <h3 className="h3">{campaign.name}</h3>
                <p className="meta">
                  {campaign.period} · {campaign.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight band-white">
        <div className="wrap split items-center">
          <div className="stack-sm">
            <h2 className="h3">Hear about the next one first.</h2>
            <p className="muted">Event invites and campaign updates, about once a month.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}

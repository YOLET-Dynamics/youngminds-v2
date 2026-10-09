import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CampaignTracker } from "@/components/site/CampaignTracker";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { loadCampaignProgress } from "@/lib/campaign-progress";
import { liveCampaign, pastCampaigns } from "@/lib/campaigns";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming events and past campaigns from YoungMinds ET, raising support for students in need across Ethiopia.",
  alternates: { canonical: "/events" },
};

export default async function EventsPage() {
  const progress = await loadCampaignProgress(liveCampaign.slug);

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
            Upcoming
          </h2>
          <div className="paper event-feature p-6">
            <Link href={liveCampaign.href} className="block" tabIndex={-1} aria-hidden="true">
              <Image
                src={liveCampaign.flyer.src}
                alt=""
                width={liveCampaign.flyer.width}
                height={liveCampaign.flyer.height}
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
                <p className="badge">
                  <span className="dot" />
                  Live campaign
                </p>
              </div>
              <h3 className="h2">
                <Link href={liveCampaign.href} className="text-[inherit] no-underline hover:underline">
                  {liveCampaign.name}
                </Link>
              </h3>
              <p className="small muted">
                {liveCampaign.dateLabel} · {liveCampaign.time} · {liveCampaign.venue}, Silver Spring, MD
              </p>
              <CampaignTracker
                goalCents={liveCampaign.goalCents}
                raisedCents={progress?.raisedCents ?? null}
                donorCount={progress?.donorCount}
                size="compact"
              />
              <div className="btn-row">
                <Link className="btn btn-primary" href={liveCampaign.href}>
                  See event and give
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

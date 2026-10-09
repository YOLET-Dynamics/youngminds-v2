import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CampaignTracker } from "@/components/site/CampaignTracker";
import { BackLink, FactList, PillarGrid } from "@/components/site/blocks";
import { DonateQr } from "@/components/site/DonateQr";
import { Icon } from "@/components/site/Icon";
import { loadCampaignProgress } from "@/lib/campaign-progress";
import { formatUsd, liveCampaign } from "@/lib/campaigns";
import { siteConfig } from "@/lib/site";

export const revalidate = 60;

const description =
  "Coffee, tea, board games and connection at Buna & Barley in Silver Spring, MD on Saturday, October 17, 2026, 2–5 PM. Help raise $5,000 for students in Ethiopia.";

export const metadata: Metadata = {
  title: liveCampaign.name,
  description,
  alternates: { canonical: liveCampaign.href },
  openGraph: {
    title: `${liveCampaign.name} | YoungMinds ET`,
    description,
    images: [{ url: liveCampaign.flyer.src, width: liveCampaign.flyer.width, height: liveCampaign.flyer.height }],
  },
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: liveCampaign.name,
  description,
  startDate: liveCampaign.startsAt,
  endDate: liveCampaign.endsAt,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  image: `${siteConfig.url}${liveCampaign.flyer.src}`,
  location: {
    "@type": "Place",
    name: liveCampaign.venue,
    address: {
      "@type": "PostalAddress",
      streetAddress: liveCampaign.street,
      addressLocality: "Silver Spring",
      addressRegion: "MD",
      postalCode: "20910",
      addressCountry: "US",
    },
  },
  organizer: { "@type": "NGO", name: siteConfig.legalName, url: siteConfig.url },
};

const fundUses = [
  { icon: "house", title: "Housing", desc: "Help cover housing expenses." },
  { icon: "bowl", title: "Food & care", desc: "Daily meals and basic care." },
  { icon: "book", title: "Education", desc: "Supplies, textbooks and school costs." },
  { icon: "flag", title: "5-year vision", desc: "Change that lasts past this event." },
] as const;

export default async function GoodDrinksEventPage() {
  const progress = await loadCampaignProgress(liveCampaign.slug);
  const donateUrl = `${siteConfig.url}${liveCampaign.donateHref}`;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />

      <section className="hero">
        <BackLink href="/events" label="All events" />
        <div className="wrap split split-5-7 mt-4 items-start">
          <a className="media-after-mobile block" href={liveCampaign.flyer.src} target="_blank" rel="noopener">
            <Image
              src={liveCampaign.flyer.src}
              alt={`${liveCampaign.name} flyer. All event details are listed on this page.`}
              width={liveCampaign.flyer.width}
              height={liveCampaign.flyer.height}
              sizes="(min-width: 900px) 40vw, 100vw"
              className="w-full h-auto rounded-[var(--radius)] shadow-[var(--shadow-paper)]"
              priority
            />
            <span className="sr-only">Open the full-size flyer</span>
          </a>
          <div className="stack">
            <p className="badge">
              <span className="dot" />
              Community fundraiser · Indoor
            </p>
            <h1 className="display">
              Good Drinks, <span className="hl">Brighter</span> Futures
            </h1>
            <p className="lead">
              Coffee, tea, board games and connection. Spend the afternoon with neighbors and friends while raising{" "}
              {formatUsd(liveCampaign.goalCents)} for students in Ethiopia.
            </p>
            <span className="script">Same table. Brighter futures.</span>

            <FactList
              items={[
                { icon: "calendar", label: "Date", value: liveCampaign.dateLabel },
                { icon: "clock", label: "Time", value: liveCampaign.time },
                {
                  icon: "pin",
                  label: "Place",
                  value: (
                    <>
                      {liveCampaign.venue}
                      <br />
                      {liveCampaign.street}, {liveCampaign.city}
                    </>
                  ),
                },
                { icon: "cup", label: "What to expect", value: "Coffee, tea, board games. Indoor venue." },
              ]}
            />

            <div className="btn-row">
              <a className="btn btn-outline btn-sm" href={liveCampaign.calendarFile} download>
                <Icon name="calendar" />
                Add to calendar
              </a>
              <a className="btn btn-outline btn-sm" href={liveCampaign.mapUrl} target="_blank" rel="noopener noreferrer">
                <Icon name="pin" />
                Open map
              </a>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="goal-title">
        <div className="wrap">
          <div className="paper grid gap-8">
            <div className="split items-center">
              <div className="stack">
                <h2 id="goal-title" className="h2">
                  Help us reach {formatUsd(liveCampaign.goalCents)}
                </h2>
                <CampaignTracker
                  goalCents={liveCampaign.goalCents}
                  raisedCents={progress?.raisedCents ?? null}
                  donorCount={progress?.donorCount}
                />
                <div className="btn-row-stack">
                  <Link className="btn btn-gold" href={liveCampaign.donateHref}>
                    Donate to this campaign
                  </Link>
                  <Link className="btn btn-outline" href="/donate/subscribe">
                    Give monthly
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-6 justify-self-center">
                <DonateQr url={donateUrl} />
                <p className="small muted max-w-[16em]">
                  At the event? Scan to give from your phone in under a minute.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="funds-title">
        <div className="wrap">
          <h2 id="funds-title" className="h2 center">
            Every dollar raised supports
          </h2>
          <PillarGrid items={fundUses} className="mt-12" />
        </div>
      </section>

      <section className="section-tight band-white">
        <div className="wrap narrow stack center">
          <h2 className="h3">Can’t make it?</h2>
          <p className="muted">You can still give, or share the event with a friend in the DMV.</p>
          <div className="btn-row justify-center">
            <Link className="btn btn-primary" href={liveCampaign.donateHref}>
              Donate
            </Link>
            <a className="btn btn-outline" href={siteConfig.instagram} target="_blank" rel="noopener noreferrer">
              <Icon name="instagram" />
              Share on Instagram
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

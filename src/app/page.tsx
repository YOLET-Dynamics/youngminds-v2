import Image from "next/image";
import Link from "next/link";
import { CampaignTracker } from "@/components/site/CampaignTracker";
import { DonateBand, FactList, PillarGrid } from "@/components/site/blocks";
import { Icon } from "@/components/site/Icon";
import { NewsletterForm } from "@/components/site/NewsletterForm";
import { loadCampaignProgress } from "@/lib/campaign-progress";
import { giftLadder, liveCampaign, pastCampaigns } from "@/lib/campaigns";
import { siteConfig } from "@/lib/site";

export const revalidate = 60;

export default async function HomePage() {
  const progress = await loadCampaignProgress(liveCampaign.slug);

  return (
    <>
      <section className="hero">
        <div className="wrap split split-7-5">
          <div className="stack">
            <p className="eyebrow">{siteConfig.tagline}</p>
            <h1 className="display">
              Every <span className="hl">young mind</span> deserves a fair start.
            </h1>
            <p className="lead">
              Housing, food, care and school for students in need across Ethiopia, backed by a five-year plan for
              lasting change.
            </p>
            <div className="btn-row-stack">
              <Link className="btn btn-primary" href="/donate">
                Donate
              </Link>
              <Link className="btn btn-outline" href="/join">
                Join us
              </Link>
            </div>
          </div>
          <div className="hero-media">
            <Image
              className="arch"
              src="/images/hero.jpg"
              alt="A young student smiling and holding a small globe"
              width={1800}
              height={1394}
              sizes="(min-width: 900px) 42vw, 100vw"
              priority
            />
            <span className="script" aria-hidden="true">
              Same table. Brighter futures.
            </span>
          </div>
        </div>
      </section>

      <section aria-labelledby="live-title">
        <div className="wrap">
          <div className="paper campaign-banner reveal">
            <div className="stack-sm">
              <p className="badge">
                <span className="dot" />
                Live now · {liveCampaign.shortDate} · Silver Spring
              </p>
              <h2 id="live-title" className="h3 text-[clamp(1.625rem,1.3rem+1.2vw,2.375rem)]">
                {liveCampaign.name}
              </h2>
              <Link className="arrow-link" href={liveCampaign.href}>
                Event details
              </Link>
            </div>
            <CampaignTracker
              goalCents={liveCampaign.goalCents}
              raisedCents={progress?.raisedCents ?? null}
              donorCount={progress?.donorCount}
            />
            <Link className="btn btn-gold btn-block" href={liveCampaign.donateHref}>
              Give
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="pillars-title">
        <div className="wrap stack">
          <h2 id="pillars-title" className="h2 center">
            What your support covers
          </h2>
          <PillarGrid className="mt-12" />
          <p className="center mt-8">
            <Link className="arrow-link" href="/initiatives">
              See our initiatives
            </Link>
          </p>
        </div>
      </section>

      <section className="section band-white" aria-labelledby="gift-title">
        <div className="wrap">
          <div className="stack max-w-[640px]">
            <p className="eyebrow">Where your gift goes</p>
            <h2 id="gift-title" className="h2">
              Small amounts, real things in a student’s hands.
            </h2>
          </div>
          <div className="gift-list mt-12">
            {giftLadder.map((gift) => (
              <div className="gift" key={gift.amount}>
                <span className="gift-amount">${gift.amount}</span>
                <div>
                  <h3 className="h3">{gift.title}</h3>
                  <p className="muted">{gift.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="btn-row mt-12">
            <Link className="btn btn-primary" href="/donate">
              Give once
            </Link>
            <Link className="btn btn-outline" href="/donate/subscribe">
              Give monthly from $3
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="impact-title">
        <div className="wrap split">
          <div className="stack">
            <p className="eyebrow">Our impact</p>
            <h2 id="impact-title" className="h2">
              What we raised together
            </h2>
            <Link className="arrow-link" href="/impact">
              Read the 2025–26 annual report
            </Link>
          </div>
          <div className="grid-2">
            {pastCampaigns.map((campaign) => (
              <div className="stat reveal" key={campaign.name}>
                <span className="stat-num">{campaign.raisedLabel}</span>
                <span className="stat-label">
                  {campaign.name} · {campaign.period}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-white" aria-labelledby="event-title">
        <div className="wrap event-feature">
          <Link href={liveCampaign.href} className="block">
            <Image
              src={liveCampaign.flyer.src}
              alt={`${liveCampaign.name} event flyer`}
              width={liveCampaign.flyer.width}
              height={liveCampaign.flyer.height}
              sizes="(min-width: 900px) 45vw, 100vw"
              className="w-full rounded-[var(--radius)] aspect-[4/5] object-cover object-top"
            />
          </Link>
          <div className="stack">
            <p className="eyebrow">Upcoming event</p>
            <h2 id="event-title" className="h2">
              {liveCampaign.name}
            </h2>
            <p className="lead">
              An afternoon of coffee, tea, board games and connection, all in support of students in Ethiopia.
            </p>
            <FactList
              items={[
                { icon: "calendar", label: "Date", value: liveCampaign.dateLabel },
                { icon: "clock", label: "Time", value: liveCampaign.time },
                { icon: "pin", label: "Place", value: `${liveCampaign.venue}, Silver Spring, MD` },
              ]}
            />
            <div className="btn-row">
              <Link className="btn btn-primary" href={liveCampaign.href}>
                See event
              </Link>
              <Link className="btn btn-outline" href="/events">
                All events
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight band-forest">
        <div className="wrap flex flex-wrap items-center justify-between gap-6">
          <div className="stack-sm">
            <p className="eyebrow">Follow along</p>
            <h2 className="h3 text-[clamp(1.5rem,1.2rem+1vw,2rem)]">Photos and updates from students and events.</h2>
          </div>
          <a className="btn btn-gold" href={siteConfig.instagram} target="_blank" rel="noopener noreferrer">
            <Icon name="instagram" />
            {siteConfig.instagramHandle}
          </a>
        </div>
      </section>

      <section className="section" aria-labelledby="news-title">
        <div className="wrap split">
          <div className="stack">
            <h2 id="news-title" className="h2">
              Stories, not spam.
            </h2>
            <p className="lead">About one email a month: campaign progress, student stories and upcoming events.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      <DonateBand
        title="Be the reason a student stays in school."
        showTrust
        secondary={{ href: "/donate/subscribe", label: "Give monthly" }}
      />
    </>
  );
}

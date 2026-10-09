import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CampaignTracker } from "./CampaignTracker";
import { BackLink } from "./blocks";
import { liveCampaign, pastCampaigns } from "@/lib/campaigns";

type PastCampaign = (typeof pastCampaigns)[number];

export function PastCampaignPage({ campaign, title, intro }: {
  campaign: PastCampaign;
  title: string;
  intro: ReactNode;
}) {
  return (
    <>
      <section className="hero">
        <BackLink href="/events" label="All events" />
        <div className="wrap split split-7-5 mt-4">
          <div className="stack">
            <span className="badge badge-done justify-self-start">Completed · {campaign.period}</span>
            <h1 className="display">{title}</h1>
            <p className="lead">{intro}</p>
            <div className="paper p-6">
              <CampaignTracker
                goalCents={campaign.goalCents}
                raisedCents={campaign.raisedCents}
                raisedLabel={campaign.raisedLabel}
                status="complete"
              />
            </div>
          </div>
          <Image
            src={campaign.image.src}
            alt={campaign.image.alt}
            width={campaign.image.width}
            height={campaign.image.height}
            sizes="(min-width: 900px) 40vw, 100vw"
            className="w-full aspect-[4/5] object-cover rounded-[var(--radius)]"
            priority
          />
        </div>
      </section>

      <section className="section band-white">
        <div className="wrap narrow stack">
          <p className="eyebrow">Thank you</p>
          <h2 className="h2">A huge thank you to our donors.</h2>
          <p className="lead">
            Every contribution, big or small, helped. We couldn’t have done it without you, and the work to empower
            students continues.
          </p>
        </div>
      </section>

      <section className="section band-deep">
        <div className="wrap donate-band">
          <p className="eyebrow">What’s next</p>
          <h2 className="h1">{liveCampaign.name}</h2>
          <p className="muted">{liveCampaign.dateLabel} · Silver Spring, MD</p>
          <div className="btn-row justify-center">
            <Link className="btn btn-gold" href={liveCampaign.href}>
              See the live campaign
            </Link>
            <Link className="btn btn-outline-light" href="/donate">
              Donate
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

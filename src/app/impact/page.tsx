import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CampaignTracker } from "@/components/site/CampaignTracker";
import { DonateBand } from "@/components/site/blocks";
import { Icon, type IconName } from "@/components/site/Icon";
import { impactReport as report, type ReportMilestone, type ReportProgram } from "@/content/impact-report";
import { loadCampaignProgress } from "@/lib/campaign-progress";
import { liveCampaign, pastCampaigns } from "@/lib/campaigns";

export const revalidate = 60;

export const metadata: Metadata = {
  title: `${report.period} Annual Report`,
  description: `YoungMinds ET ${report.period} annual report: what your gifts made possible, where the money went, and our five-year vision.`,
  alternates: { canonical: "/impact" },
};

const pillarIcons: Record<ReportProgram["pillar"], IconName> = {
  housing: "house",
  food: "bowl",
  education: "book",
  vision: "flag",
};

const milestoneDisplay: Record<ReportMilestone["status"], { icon: IconName; label: string }> = {
  done: { icon: "check", label: "Done" },
  "in-progress": { icon: "clock", label: "In progress" },
  next: { icon: "flag", label: "Next" },
};

export default async function ImpactPage() {
  const progress = await loadCampaignProgress(liveCampaign.slug);
  const matrimony = pastCampaigns[1];

  return (
    <>
      <section className="hero">
        <div className="wrap split split-7-5 items-end">
          <div className="stack">
            <p className="eyebrow">Annual report</p>
            <h1 className="display">{report.period}</h1>
            <p className="lead">{report.intro}</p>
          </div>
          {report.pdf ? (
            <a className="report-card" href={report.pdf.href} download>
              <span className="report-cover">
                2025
                <br />
                –26
              </span>
              <span className="stack-sm">
                <strong>Download the full report</strong>
                <span className="meta">PDF · {report.pdf.sizeLabel}</span>
              </span>
            </a>
          ) : (
            <p className="small muted">The full report PDF will be available here once it is finalized.</p>
          )}
        </div>
      </section>

      {report.stats.length > 0 && (
        <section className="section band-forest" aria-label="Headline numbers">
          <div className="wrap grid-4">
            {report.stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <span className="stat-num">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {report.allocation.length > 0 && (
        <section className="section" aria-labelledby="money-title">
          <div className="wrap split">
            <div className="stack">
              <h2 id="money-title" className="h2">
                Where the money went
              </h2>
              <p className="muted">Share of funds spent by area.</p>
            </div>
            <div className="stack">
              {report.allocation.map((item) => (
                <div className="stack-sm" key={item.label}>
                  <div className="flex justify-between">
                    <strong>{item.label}</strong>
                    <span>{item.percent}%</span>
                  </div>
                  <div
                    className="tracker-bar"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={item.percent}
                    aria-label={`${item.label}: ${item.percent}%`}
                  >
                    <div className="tracker-fill bg-forest" style={{ width: `${item.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section band-white" aria-labelledby="programs-title">
        <div className="wrap">
          <h2 id="programs-title" className="h2 mb-12">
            Programs
          </h2>
          <div className="grid-2 gap-x-12 gap-y-16">
            {report.programs.map((program) => (
              <article className="stack-sm" key={program.pillar}>
                <Icon name={pillarIcons[program.pillar]} className="icon text-forest" />
                <h3 className="h3">{program.title}</h3>
                <p className="muted">{program.summary ?? "This year’s update is coming soon."}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {report.stories.length > 0 && (
        <section className="section" aria-labelledby="stories-title">
          <div className="wrap">
            <h2 id="stories-title" className="h2 mb-12">
              Student stories
            </h2>
            <div className="grid-2 gap-12">
              {report.stories.map((story) => (
                <figure className="stack m-0" key={story.name}>
                  {story.image && (
                    <Image
                      src={story.image.src}
                      alt={story.image.alt}
                      width={1200}
                      height={900}
                      sizes="(min-width: 768px) 45vw, 100vw"
                      className="w-full aspect-[4/3] object-cover rounded-[var(--radius)]"
                    />
                  )}
                  <blockquote className="serif h3 m-0 font-normal">“{story.quote}”</blockquote>
                  <figcaption className="small muted">{story.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="recap-title">
        <div className="wrap">
          <h2 id="recap-title" className="h2 mb-8">
            Campaign recap
          </h2>
          <div className="grid-2 gap-12">
            <div className="stack-sm">
              <h3 className="h3">
                {matrimony.name} · {matrimony.period}
              </h3>
              <CampaignTracker
                goalCents={matrimony.goalCents}
                raisedCents={matrimony.raisedCents}
                status="complete"
                size="compact"
              />
              <Link className="arrow-link" href={matrimony.href}>
                Read the story
              </Link>
            </div>
            <div className="stack-sm">
              <h3 className="h3">{liveCampaign.name} · Oct 2026</h3>
              <CampaignTracker
                goalCents={liveCampaign.goalCents}
                raisedCents={progress?.raisedCents ?? null}
                donorCount={progress?.donorCount}
                size="compact"
              />
              <Link className="arrow-link" href={liveCampaign.href}>
                See the live campaign
              </Link>
            </div>
          </div>
        </div>
      </section>

      {report.vision && (
        <section className="section band-white" aria-labelledby="vision-title">
          <div className="wrap split">
            <div className="stack">
              <p className="eyebrow">5-year vision</p>
              <h2 id="vision-title" className="h2">
                Year {report.vision.year} of {report.vision.of}
              </h2>
              <p className="muted">Milestones toward lasting change.</p>
            </div>
            <ol className="facts">
              {report.vision.milestones.map((milestone) => (
                <li key={milestone.text}>
                  <Icon name={milestoneDisplay[milestone.status].icon} />
                  <span>
                    <span className="k">{milestoneDisplay[milestone.status].label}</span>
                    <span className="v">{milestone.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {report.archive.length > 0 && (
        <section className="section-tight" aria-labelledby="archive-title">
          <div className="wrap narrow">
            <h2 id="archive-title" className="h3 mb-4">
              Past reports
            </h2>
            {report.archive.map((item) => (
              <a className="archive-row" href={item.href} key={item.href} download>
                <span>
                  <strong>{item.title}</strong>
                  <br />
                  <span className="small muted">PDF</span>
                </span>
                <Icon name="download" />
              </a>
            ))}
          </div>
        </section>
      )}

      <DonateBand title="Help write next year’s report." secondary={{ href: "/donate/subscribe", label: "Give monthly" }} />
    </>
  );
}

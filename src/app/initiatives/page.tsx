import type { Metadata } from "next";
import Link from "next/link";
import { DonateBand } from "@/components/site/blocks";
import { Icon, type IconName } from "@/components/site/Icon";

export const metadata: Metadata = {
  title: "Initiatives",
  description:
    "The four pillars YoungMinds ET funds: housing, food and care, education, and a five-year vision for lasting change in Ethiopia.",
  alternates: { canonical: "/initiatives" },
};

const pillars: { icon: IconName; title: string; desc: string }[] = [
  { icon: "house", title: "Housing", desc: "Safe, stable places for students to live and study." },
  { icon: "bowl", title: "Food & care", desc: "Daily meals and the basic care students need to focus." },
  { icon: "book", title: "Education", desc: "Supplies, textbooks, learning tools and mentorship." },
  {
    icon: "flag",
    title: "5-year vision",
    desc: "A future where education unlocks limitless potential for every child in Ethiopia.",
  },
];

export default function InitiativesPage() {
  return (
    <>
      <section className="hero pb-12">
        <div className="wrap stack">
          <p className="eyebrow">Initiatives</p>
          <h1 className="display max-w-[13em]">Four pillars, one long-term plan.</h1>
          <p className="lead">Everything we fund falls under one of four pillars, guided by a five-year vision.</p>
        </div>
      </section>

      <section aria-label="Pillars">
        <div className="wrap grid-2 gap-x-12 gap-y-0">
          {pillars.map(({ icon, title, desc }) => (
            <div className="pillar py-8 border-t border-line" key={title}>
              <Icon name={icon} />
              <h2 className="h3">{title}</h2>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="projects-title">
        <div className="wrap">
          <h2 id="projects-title" className="h2 mb-8">
            Projects
          </h2>
          <Link className="event-card paper event-feature p-6" href="/initiatives/adina">
            <div className="grid place-items-center aspect-[4/3] rounded-[var(--radius)] bg-forest p-8 text-center">
              <p className="serif text-[clamp(1.5rem,1.2rem+1.4vw,2.25rem)] leading-snug text-white">
                “Train up a child in the way he should go.”
                <span className="eyebrow mt-4 block text-gold">Proverbs 22:6</span>
              </p>
            </div>
            <div className="stack">
              <p className="eyebrow">Adina Project</p>
              <h3 className="h2">Raising the next generation in Christ</h3>
              <p className="muted">A Christ-centered initiative dedicated to raising children with love, wisdom and purpose.</p>
              <span className="arrow-link">Learn about Adina</span>
            </div>
          </Link>
        </div>
      </section>

      <DonateBand title="Fund the pillars." secondary={{ href: "/join", label: "Volunteer" }} />
    </>
  );
}

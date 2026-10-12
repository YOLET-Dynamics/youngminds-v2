import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BackLink, DonateBand } from "@/components/site/blocks";

export const metadata: Metadata = {
  title: "Adina Project",
  description:
    "Education, care, and mentorship for children in Ethiopia, with optional spiritual schooling chosen by each family.",
  alternates: { canonical: "/initiatives/adina" },
};

const values = [
  {
    title: "Learning & growth",
    desc: "Helping children build knowledge, confidence, and the skills they need for their future.",
  },
  {
    title: "Mentorship & leadership",
    desc: "Connecting children with role models who encourage them to learn, lead, and care for others.",
  },
  {
    title: "A caring community",
    desc: "Creating a place where children feel safe, valued, and supported, regardless of their background or belief.",
  },
  {
    title: "Serving with compassion",
    desc: "Helping children access the meals, care, and learning resources they need to thrive.",
  },
];

const donateHref = "/donate?campaign=adina";

export default function AdinaProjectPage() {
  return (
    <>
      <section className="hero">
        <BackLink href="/initiatives" label="All initiatives" />
        <div className="wrap split split-7-5 mt-4">
          <div className="stack">
            <p className="eyebrow">Adina Project</p>
            <h1 className="display">Helping children grow through education, care, and mentorship.</h1>
            <p className="lead">
              Every child deserves a safe place to learn, caring mentors, and a community they can rely on.
              Adina supports children and respects each family’s background and beliefs.
            </p>
            <div className="btn-row-stack">
              <Link className="btn btn-primary" href={donateHref}>
                Support this project
              </Link>
              <Link className="btn btn-outline" href="/join">
                Volunteer
              </Link>
            </div>
          </div>
          <Image
            className="arch aspect-[4/5] h-auto"
            src="/images/hero-illustration.jpg"
            alt="Illustration of three students learning together with books and notebooks"
            width={1122}
            height={1402}
            sizes="(min-width: 900px) 40vw, 100vw"
            priority
          />
        </div>
      </section>

      <section className="section band-white">
        <div className="wrap narrow center stack">
          <h2 className="h2">Everyone is welcome.</h2>
          <p className="lead">
            We welcome students, families, volunteers, and supporters of all faiths and none.
            Access to support does not depend on religious participation.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="stand-title">
        <div className="wrap">
          <h2 id="stand-title" className="h2 mb-12">
            What we stand for
          </h2>
          <div className="grid-4">
            {values.map((value, index) => (
              <div className="pillar" key={value.title}>
                <span className="serif text-[2.5rem] leading-none text-forest">{String(index + 1).padStart(2, "0")}</span>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-white">
        <div className="wrap narrow stack">
          <h2 className="h2">Spiritual schooling is a family choice.</h2>
          <p className="lead">
            Families who want Christian spiritual schooling can choose it as an optional part of Adina’s support.
            Children receive education, care, and mentorship whether or not they take part.
          </p>
        </div>
      </section>

      <DonateBand
        eyebrow="Join the movement"
        title="Help raise children with love, wisdom and purpose."
        primary={{ href: donateHref, label: "Support this project" }}
      />
    </>
  );
}

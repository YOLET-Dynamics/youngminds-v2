import type { Metadata } from "next";
import Link from "next/link";
import { BackLink, DonateBand } from "@/components/site/blocks";

export const metadata: Metadata = {
  title: "Adina Project",
  description:
    "A Christ-centered initiative dedicated to raising children in Ethiopia with love, wisdom, and purpose through education and spiritual guidance.",
  alternates: { canonical: "/initiatives/adina" },
};

const values = [
  {
    title: "Christ-centered guidance",
    desc: "Teaching children the way of Christ, helping them build a strong spiritual foundation and live with faith and integrity.",
  },
  {
    title: "Mentorship & leadership",
    desc: "Providing role models who guide them in wisdom, discipline, and purpose, following Jesus’ example of servant leadership.",
  },
  {
    title: "A family in Christ",
    desc: "Creating a community of love and support, where children feel safe, valued, and encouraged in their faith journey.",
  },
  {
    title: "Serving with compassion",
    desc: "Providing essential resources to children in need, ensuring they grow in a nurturing and faith-driven environment.",
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
            <h1 className="display">Raising the next generation in Christ.</h1>
            <p className="lead">
              We believe that every child deserves to grow in a faith-filled, nurturing environment, surrounded by
              mentors, spiritual guidance, and a family they can rely on.
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
          <figure className="m-0 grid place-items-center gap-4 rounded-[999px_999px_var(--radius)_var(--radius)/50%_50%_var(--radius)_var(--radius)] bg-forest px-8 py-20 text-center aspect-[4/5]">
            <blockquote className="serif m-0 text-[clamp(1.5rem,1.2rem+1.2vw,2.125rem)] leading-snug text-white">
              “Let the little children come to me.”
            </blockquote>
            <figcaption className="eyebrow text-gold">Matthew 19:14</figcaption>
          </figure>
        </div>
      </section>

      <section className="section band-white">
        <div className="wrap narrow center stack">
          <blockquote className="serif h2 m-0 font-normal">
            “Train up a child in the way he should go; even when he is old he will not depart from it.”
          </blockquote>
          <p className="eyebrow">Proverbs 22:6</p>
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
          <h2 className="h2">Following Christ’s call to serve</h2>
          <p className="lead">
            Jesus taught us to care for the vulnerable, to love unconditionally, and to build each other up in faith.
            The Adina Project is our response to that calling—a mission to raise children in the light of Christ,
            equipping them with wisdom, strength, and a deep relationship with God.
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

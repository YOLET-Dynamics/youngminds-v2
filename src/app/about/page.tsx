import type { Metadata } from "next";
import Image from "next/image";
import { DonateBand, FactList } from "@/components/site/blocks";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "YoungMinds ET is a US 501(c)(3) nonprofit supporting students in need across Ethiopia with housing, food and care, and education.",
  alternates: { canonical: "/about" },
};

const values = [
  { title: "Educate", desc: "Learning is the lever. We fund what keeps students in class." },
  { title: "Empower", desc: "Students and local partners lead. We listen and back them." },
  { title: "Create change", desc: "We plan in years, not campaigns, and report what we spend." },
];

export default function AboutPage() {
  return (
    <>
      <section className="hero">
        <div className="wrap split split-7-5">
          <div className="stack">
            <p className="eyebrow">About us</p>
            <h1 className="display">Every child deserves the chance to learn and grow.</h1>
            <p className="lead">
              YoungMinds ET is a US nonprofit supporting students in need across Ethiopia, with offices in Silver
              Spring, Maryland and Addis Ababa.
            </p>
          </div>
          <Image
            className="arch aspect-[4/5] h-auto"
            src="/images/hero.jpg"
            alt="A young student smiling and holding a small globe"
            width={1800}
            height={1394}
            sizes="(min-width: 900px) 40vw, 100vw"
            priority
          />
        </div>
      </section>

      <section className="section band-white" aria-labelledby="story-title">
        <div className="wrap split items-start">
          <h2 id="story-title" className="h2">
            Our story
          </h2>
          <div className="stack">
            <p className="lead text-ink">
              Our mission is to provide underserved students with access to quality education through sustainable
              initiatives, backed by the housing, food and care they need to stay in school.
            </p>
            <p className="muted">
              We believe that every child deserves the chance to learn and grow, regardless of their circumstances.
              By fostering community and collaboration, through partnerships and shared resources, we strive to create
              an environment where all students can thrive and reach their full potential.
            </p>
            <p className="muted">
              Our vision is a future where education unlocks limitless potential, empowering every child in Ethiopia
              and beyond to achieve a better quality of life without barriers.
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="values-title">
        <div className="wrap">
          <h2 id="values-title" className="h2 mb-12">
            What guides us
          </h2>
          <div className="grid-3">
            {values.map((value) => (
              <div className="pillar" key={value.title}>
                <h3>{value.title}</h3>
                <p>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section band-white" aria-labelledby="legal-title">
        <div className="wrap split items-start">
          <h2 id="legal-title" className="h2">
            501(c)(3) information
          </h2>
          <FactList
            items={[
              { icon: "receipt", label: "Legal name", value: siteConfig.legalName },
              { icon: "shield", label: "Status", value: "Registered 501(c)(3) nonprofit" },
              { icon: "pin", label: "Mailing address", value: siteConfig.address },
              {
                icon: "mail",
                label: "Contact",
                value: (
                  <>
                    <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> · {siteConfig.phoneDisplay}
                  </>
                ),
              },
            ]}
          />
        </div>
      </section>

      <DonateBand title="Be part of the story." secondary={{ href: "/join", label: "Join us" }} />
    </>
  );
}

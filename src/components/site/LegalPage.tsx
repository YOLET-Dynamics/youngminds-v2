import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site";

type LegalSection = { id: string; title: string; body: ReactNode };

export function LegalPage({ title, effectiveDate, intro, sections, contactTitle }: {
  title: string;
  effectiveDate: string;
  intro: ReactNode;
  sections: LegalSection[];
  contactTitle: string;
}) {
  return (
    <>
      <section className="hero pb-12">
        <div className="wrap stack">
          <p className="eyebrow">Legal</p>
          <h1 className="h1">{title}</h1>
          <p className="muted">Effective Date: {effectiveDate}</p>
        </div>
      </section>
      <section className="band-white section">
        <div className="wrap legal-layout">
          <aside aria-label="On this page">
            <p className="eyebrow mb-2">On this page</p>
            <nav className="toc">
              {sections.map((section) => (
                <a key={section.id} href={`#${section.id}`}>
                  {section.title}
                </a>
              ))}
              <a href="#contact">{contactTitle}</a>
            </nav>
          </aside>
          <article className="prose">
            {intro}
            {sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2 id={section.id}>{section.title}</h2>
                {section.body}
              </section>
            ))}
            <h2 id="contact">{contactTitle}</h2>
            <p>
              YoungMindsET Inc.
              <br />
              735 Sligo Avenue #106
              <br />
              Silver Spring, MD, United States
              <br />
              Email: <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              <br />
              Phone: (571) 235-6218
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

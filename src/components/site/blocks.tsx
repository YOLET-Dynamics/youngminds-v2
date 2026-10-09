import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export const pillars = [
  { icon: "house", title: "Housing", desc: "Safe, stable places for students to live and study." },
  { icon: "bowl", title: "Food & care", desc: "Daily meals and the basic care students need to focus." },
  { icon: "book", title: "Education", desc: "Supplies, textbooks and learning materials." },
  { icon: "flag", title: "5-year vision", desc: "A long-term plan so change outlasts each campaign." },
] as const satisfies readonly { icon: IconName; title: string; desc: string }[];

export function PillarGrid({ items = pillars, className = "" }: {
  items?: readonly { icon: IconName; title: string; desc: string }[];
  className?: string;
}) {
  return (
    <div className={`grid-4 pillars-center ${className}`}>
      {items.map(({ icon, title, desc }) => (
        <div key={title} className="pillar reveal">
          <Icon name={icon} />
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>
      ))}
    </div>
  );
}

export type Fact = { icon: IconName; label: string; value: ReactNode };

/** Icon + label + value rows. `emphasis="value"` puts the value first, as on the donate and join pages. */
export function FactList({ items, emphasis = "label", label }: {
  items: readonly Fact[];
  emphasis?: "label" | "value";
  label?: string;
}) {
  return (
    <ul className="facts" aria-label={label}>
      {items.map(({ icon, label: key, value }) => (
        <li key={key}>
          <Icon name={icon} />
          <span>
            {emphasis === "label" ? (
              <>
                <span className="k">{key}</span>
                <span className="v">{value}</span>
              </>
            ) : (
              <>
                <span className="v">{key}</span>
                <span className="k">{value}</span>
              </>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function TrustRow({ className = "" }: { className?: string }) {
  return (
    <div className={`trust muted ${className}`}>
      <span>
        <Icon name="receipt" />
        Tax-deductible
      </span>
      <span>
        <Icon name="shield" />
        Secure via Stripe
      </span>
      <span>
        <Icon name="heart" />
        Direct impact
      </span>
    </div>
  );
}

type BandAction = { href: string; label: string };

export function DonateBand({ eyebrow, title, subtitle, primary = { href: "/donate", label: "Donate" }, secondary, showTrust = false }: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primary?: BandAction;
  secondary?: BandAction;
  showTrust?: boolean;
}) {
  return (
    <section className="section band-deep">
      <div className="wrap donate-band">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="h1 max-w-[16em]">{title}</h2>
        {subtitle && <p className="muted">{subtitle}</p>}
        {showTrust && <TrustRow />}
        <div className="btn-row justify-center">
          <Link className="btn btn-gold" href={primary.href}>
            {primary.label}
          </Link>
          {secondary && (
            <Link className="btn btn-outline-light" href={secondary.href}>
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <div className="wrap">
      <Link className="arrow-link back-link small" href={href}>
        {label}
      </Link>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { MonthlyTierButton } from "@/components/site/MonthlyTierButton";
import { TrustRow } from "@/components/site/blocks";
import { monthlyTierKeys, monthlyTiers, parseDesignation } from "@/lib/campaigns";

export const metadata: Metadata = {
  title: "Give monthly",
  description:
    "Become a monthly supporter of students in Ethiopia from $3 a month. Change or cancel anytime.",
  alternates: { canonical: "/donate/subscribe" },
};

const featuredTier = "regular";

export default async function SubscribePage({ searchParams }: PageProps<"/donate/subscribe">) {
  const campaign = parseDesignation((await searchParams).campaign);

  return (
    <>
      <section className="hero pb-12">
        <div className="wrap stack center">
          <p className="eyebrow">Monthly giving</p>
          <h1 className="display center-x max-w-[12em]">Become a monthly supporter.</h1>
          <p className="lead center-x">Steady support lets students plan ahead. Change or cancel anytime.</p>
        </div>
      </section>

      <section aria-label="Monthly tiers">
        <div className="wrap">
          <div className="tier-list">
            {monthlyTierKeys.map((key) => {
              const tier = monthlyTiers[key];
              const featured = key === featuredTier;
              return (
                <div className={`tier${featured ? " is-featured" : ""}`} key={key}>
                  {featured && <span className="tier-tag">Suggested</span>}
                  <h2 className="h3">{tier.name}</h2>
                  <p className="tier-price">
                    ${tier.amount}
                    <small>/month</small>
                  </p>
                  <p className="muted">{tier.desc}</p>
                  <MonthlyTierButton tier={key} amount={tier.amount} featured={featured} campaign={campaign} />
                </div>
              );
            })}
          </div>
          <TrustRow className="mt-8" />
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow center stack-sm">
          <p className="muted">Already a monthly supporter?</p>
          <Link className="btn btn-outline" href="/subscriptions/manage">
            Manage your monthly gift
          </Link>
          <p className="small muted">
            Prefer a single gift? <Link href="/donate">Give once</Link>.
          </p>
        </div>
      </section>
    </>
  );
}

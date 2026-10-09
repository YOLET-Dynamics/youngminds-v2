"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { formatUsd, liveCampaign } from "@/lib/campaigns";

const hiddenOn = ["/donate", "/subscriptions", "/privacy", "/terms"];

/** Mobile-only donate bar for the live campaign. Hidden where it would compete with a form. */
export function StickyDonate() {
  const pathname = usePathname();
  if (hiddenOn.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return null;
  }

  return (
    <>
      <div className="sticky-donate-spacer" aria-hidden="true" />
      <div className="sticky-donate" role="region" aria-label="Donate">
        <span>
          <strong>{liveCampaign.name}</strong>
          <br />
          Help us reach {formatUsd(liveCampaign.goalCents)}
        </span>
        <Link className="btn btn-gold" href={liveCampaign.donateHref}>
          Donate
        </Link>
      </div>
    </>
  );
}

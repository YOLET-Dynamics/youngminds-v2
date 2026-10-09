/**
 * Gift designations a donor can choose through `/donate?campaign=<slug>`.
 * The slug is stored as `metadata.campaign` on the Stripe PaymentIntent, which is
 * how campaign totals are counted. `productId` is the Stripe Product shown on Checkout.
 */
export const designations = {
  "good-drinks": {
    slug: "good-drinks",
    name: "Good Drinks, Brighter Futures",
    productId: "ym_campaign_good_drinks",
  },
  adina: {
    slug: "adina",
    name: "Adina Project",
    productId: "ym_project_adina",
  },
} as const;

export type DesignationSlug = keyof typeof designations;

export const designationSlugs = Object.keys(designations) as [DesignationSlug, ...DesignationSlug[]];

export function parseDesignation(value: string | string[] | undefined): DesignationSlug | undefined {
  return typeof value === "string" && value in designations ? (value as DesignationSlug) : undefined;
}

export const liveCampaign = {
  slug: "good-drinks",
  name: "Good Drinks, Brighter Futures",
  href: "/events/good-drinks-brighter-futures",
  donateHref: "/donate?campaign=good-drinks",
  goalCents: 500_000,
  dateLabel: "Saturday, October 17, 2026",
  shortDate: "Sat, Oct 17",
  time: "2:00–5:00 PM",
  venue: "Buna & Barley",
  street: "901 Silver Spring Ave",
  city: "Silver Spring, MD 20910",
  startsAt: "2026-10-17T14:00:00-04:00",
  endsAt: "2026-10-17T17:00:00-04:00",
  calendarFile: "/events/good-drinks-brighter-futures.ics",
  mapUrl: "https://maps.google.com/?q=901+Silver+Spring+Ave,+Silver+Spring,+MD+20910",
  flyer: {
    src: "/images/good-drinks-flyer.jpg",
    width: 1024,
    height: 1536,
  },
} as const satisfies { slug: DesignationSlug } & Record<string, unknown>;

export const pastCampaigns = [
  {
    name: "Fund the Future",
    href: "/fund-the-future",
    period: "Spring 2024",
    raisedLabel: "$1,000+",
    raisedCents: 100_000,
    goalCents: 65_000,
    badge: "Completed · Goal exceeded",
    summary: "Raised $1,000+ of a $650 goal",
    image: { src: "/images/fund-the-future-flyer.jpg", alt: "Fund the Future picnic event flyer", width: 772, height: 1000 },
  },
  {
    name: "Matrimony Initiative",
    href: "/matrimony-initiative",
    period: "November 2025",
    raisedLabel: "$641",
    raisedCents: 64_100,
    goalCents: 64_100,
    badge: "Completed · Goal met",
    summary: "Raised $641",
    image: {
      src: "/images/matrimony.jpg",
      alt: "Illustration of students holding books around a donation box",
      width: 900,
      height: 900,
    },
  },
] as const;

export const giftLadder = [
  { amount: 10, title: "School supplies", desc: "Provides essential school supplies to a student in need." },
  { amount: 25, title: "Textbooks & materials", desc: "Puts textbooks and learning materials on a student’s desk." },
  { amount: 50, title: "Comprehensive support", desc: "Helps fund ongoing educational support for multiple students." },
] as const;

export const monthlyTiers = {
  beginner: { name: "Beginner", amount: 3, desc: "Classroom essentials like pens, paper and notebooks." },
  basic: { name: "Basic", amount: 10, desc: "Basic school supplies for the months ahead." },
  regular: { name: "Regular", amount: 25, desc: "Textbooks and learning materials, every month." },
  champion: { name: "Champion", amount: 50, desc: "Ongoing, comprehensive support for multiple students." },
} as const;

export type MonthlyTier = keyof typeof monthlyTiers;

export const monthlyTierKeys = Object.keys(monthlyTiers) as [MonthlyTier, ...MonthlyTier[]];

export function formatUsd(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

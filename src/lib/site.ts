export const siteConfig = {
  name: "YoungMinds ET",
  legalName: "YoungMinds ET Inc.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.youngmindset.org").replace(/\/$/, ""),
  defaultTitle: "YoungMinds ET | Educate, Empower, Create Change",
  tagline: "Educate | Empower | Create Change",
  description:
    "YoungMinds ET is a registered 501(c)(3) nonprofit providing housing, food and care, and education for students in need across Ethiopia.",
  instagram: "https://www.instagram.com/youngminds_et",
  instagramHandle: "@youngminds_et",
  email: "contact@youngmindset.org",
  phone: "+1-571-235-6218",
  phoneDisplay: "+1 (571) 235-6218",
  address: "735 Sligo Avenue #106, Silver Spring, MD",
  // Stripe-hosted customer portal login. Donors verify their email there before any change.
  billingPortal: "https://billing.stripe.com/p/login/28obMA7fT9IYe1W4gg",
} as const;

export const primaryNav = [
  { href: "/initiatives", label: "Initiatives" },
  { href: "/events", label: "Events" },
  { href: "/impact", label: "Impact" },
  { href: "/about", label: "About" },
  { href: "/join", label: "Join" },
] as const;

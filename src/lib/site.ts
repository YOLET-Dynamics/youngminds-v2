export const siteConfig = {
  name: "YoungMinds ET",
  legalName: "YoungMinds ET Inc.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.youngmindset.org").replace(/\/$/, ""),
  defaultTitle: "YoungMinds ET | Unlocking Potential",
  description:
    "YoungMinds ET is a registered 501(c)(3) nonprofit providing underserved students across Ethiopia with access to quality education.",
  instagram: "https://www.instagram.com/youngminds_et",
  email: "contact@youngmindset.org",
  phone: "+1-571-235-6218",
} as const;

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Icon } from "./Icon";
import { NewsletterForm } from "./NewsletterForm";

const linkGroups = [
  {
    heading: "Explore",
    links: [
      { href: "/initiatives", label: "Initiatives" },
      { href: "/events", label: "Events" },
      { href: "/impact", label: "Impact" },
      { href: "/about", label: "About" },
      { href: "/join", label: "Join us" },
    ],
  },
  {
    heading: "Give",
    links: [
      { href: "/donate", label: "Donate" },
      { href: "/donate/subscribe", label: "Give monthly" },
      { href: "/subscriptions/manage", label: "Manage monthly gift" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand stack-sm">
            <Image className="footer-logo" src="/logo/logo-02-04.png" alt="YoungMinds ET" width={56} height={56} />
            <p className="footer-tagline serif">{siteConfig.tagline}</p>
            <NewsletterForm
              label="Get campaign updates and stories, about once a month"
              showLabel
              buttonClassName="btn-gold"
            />
          </div>

          {linkGroups.map((group) => (
            <nav key={group.heading} aria-labelledby={`footer-${group.heading.toLowerCase()}`}>
              <h2 id={`footer-${group.heading.toLowerCase()}`} className="footer-heading">
                {group.heading}
              </h2>
              <ul className="footer-links">
                {group.links.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href}>{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="footer-contact">
            <h2 className="footer-heading">Contact</h2>
            <ul className="footer-links">
              <li>
                <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer">
                  <Icon name="instagram" />
                  {siteConfig.instagramHandle}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`}>
                  <Icon name="mail" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phone}`}>
                  <Icon name="phone" />
                  {siteConfig.phoneDisplay}
                </a>
              </li>
            </ul>
            <p className="footer-note">
              Silver Spring, Maryland
              <br />
              Addis Ababa, Ethiopia
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            {siteConfig.legalName} is a registered 501(c)(3) nonprofit. Donations are tax-deductible to the extent
            permitted by law.
          </p>
          <p>
            <Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link> · © {new Date().getFullYear()}{" "}
            {siteConfig.legalName}
          </p>
        </div>
      </div>
    </footer>
  );
}

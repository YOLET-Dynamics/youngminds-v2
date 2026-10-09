import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { Icon } from "./Icon";
import { NewsletterForm } from "./NewsletterForm";

const footerLinks = [
  { href: "/initiatives", label: "Initiatives" },
  { href: "/events", label: "Events" },
  { href: "/impact", label: "Impact" },
  { href: "/about", label: "About" },
  { href: "/join", label: "Join us" },
  { href: "/subscriptions/manage", label: "Manage monthly gift" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="stack">
            <Image className="footer-logo" src="/logo/logo-02-04.png" alt="YoungMinds ET" width={64} height={64} />
            <h2>{siteConfig.tagline}</h2>
            <NewsletterForm
              label="Get campaign updates and stories, about once a month"
              showLabel
              buttonClassName="btn-gold"
            />
          </div>
          <nav aria-label="Footer">
            <ul className="footer-links">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid content-start justify-items-start">
            <a className="arrow-link gap-2.5" href={siteConfig.instagram} target="_blank" rel="noopener noreferrer">
              <Icon name="instagram" />
              {siteConfig.instagramHandle}
            </a>
            <a className="arrow-link gap-2.5" href={`mailto:${siteConfig.email}`}>
              <Icon name="mail" />
              {siteConfig.email}
            </a>
            <a className="arrow-link gap-2.5" href={`tel:${siteConfig.phone}`}>
              <Icon name="phone" />
              {siteConfig.phoneDisplay}
            </a>
            <p className="small mt-4 text-on-dark-muted">
              US office: Silver Spring, Maryland
              <br />
              Ethiopia office: Addis Ababa
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            {siteConfig.legalName} is a registered 501(c)(3) nonprofit. Donations are tax-deductible to the
            extent permitted by law.
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

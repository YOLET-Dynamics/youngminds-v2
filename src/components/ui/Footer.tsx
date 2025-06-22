import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import InstagramIcon from "@/assets/instagram.svg";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Logo and Social Section */}
          <div className="lg:col-span-5">
            <div className="flex flex-col space-y-6">
              <Link 
                href="/" 
                className="inline-block transition-opacity hover:opacity-90"
              >
                <Image
                  src="/logo/logo-02-06.png"
                  alt="YoungMinds ET Logo"
                  width={120}
                  height={40}
                  className="h-12 w-auto sm:h-14"
                  priority
                />
              </Link>
              <p className="text-muted-foreground text-sm sm:text-base max-w-md">
                YoungMinds ET Inc. is a registered non-profit organization in the
                United States, extending its educational initiatives and
                operations to Ethiopia.
              </p>
              <div className="flex gap-4">
                <Link
                  href="https://www.instagram.com/youngminds_et"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#FF0069]/10 hover:bg-[#FF0069]/20 
                               flex items-center justify-center transition-all duration-200">
                    <Image
                      src={InstagramIcon}
                      alt="Instagram"
                      className="h-5 w-5 text-[#FF0069] group-hover:scale-110 transition-transform duration-200"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-semibold mb-4 sm:mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: "Our Initiatives", href: "/initiatives" },
                { label: "Fund the Future", href: "/fund-the-future" },
                { label: "Donate", href: "/donate" },
                { label: "Join Us", href: "/join" },
                { label: "About Us", href: "/about" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-primary transition-colors 
                             inline-flex items-center gap-1 group text-sm"
                  >
                    {label}
                    <ArrowUpRight 
                      className="h-3 w-3 opacity-0 -translate-y-1 
                               group-hover:opacity-100 group-hover:translate-y-0 
                               transition-all duration-200" 
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Section */}
          <div className="lg:col-span-2">
            <h3 className="text-base font-semibold mb-4 sm:mb-6">Help</h3>
            <ul className="space-y-3">
              {[
                { label: "Manage Subscription", href: "/subscriptions/manage" },
                { label: "Contact Support", href: "mailto:donations@youngmindset.org" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-primary transition-colors 
                             inline-flex items-center gap-1 group text-sm"
                  >
                    {label}
                    <ArrowUpRight 
                      className="h-3 w-3 opacity-0 -translate-y-1 
                               group-hover:opacity-100 group-hover:translate-y-0 
                               transition-all duration-200" 
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="lg:col-span-3">
            <h3 className="text-base font-semibold mb-4 sm:mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <Link
                  href="mailto:donations@youngmindset.org"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  donations@youngmindset.org
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <Link
                  href="tel:+15712356218"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  +1 (571) 235-6218
                </Link>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">US Office</p>
                  <p>Silver Spring</p>
                  <p>Maryland, USA</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Ethiopia Office</p>
                  <p>Addis Ababa</p>
                  <p>Ethiopia</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row justify-between 
                      items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} YoungMinds ET Inc. All rights reserved.</p>
          <p>
            Built by{" "}
            <Link
              href="https://yoletent.com"
              className="underline hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              YOLET Labs
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

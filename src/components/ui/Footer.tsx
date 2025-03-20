import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import InstagramIcon from "@/assets/instagram.svg";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 border-t">
      <div className="px-4 sm:px-8 md:px-16 py-12 sm:py-16 md:py-24">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start mb-6 gap-4 sm:gap-8">
              <Link href="/" className="inline-block">
                <Image
                  src="/logo/logo-02-06.png"
                  alt="YoungMinds ET Logo"
                  width={120}
                  height={40}
                  className="h-14 sm:h-16 w-auto md:h-24 lg:h-28"
                  priority
                />
              </Link>
              <div className="flex gap-4">
                <Link
                  target="_blank"
                  href="https://www.instagram.com/youngminds_et"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FF0069]/10 hover:bg-[#FF0069]/20 flex items-center justify-center transition-colors group"
                >
                  <Image
                    src={InstagramIcon}
                    alt="Instagram"
                    className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF0069] group-hover:scale-110 transition-transform"
                  />
                </Link>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">
              Unlocking Potential One Student at a Time
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
              YoungMinds ET Inc. is a registered non-profit organization in the
              United States, extending its educational initiatives and
              operations to Ethiopia.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3 sm:space-y-4">
              {["About Us", "Our Initiatives", "Donate"].map((item) => (
                <li key={item}>
                  <Link
                    href={
                      item === "About Us"
                        ? "/about"
                        : item === "Our Initiatives"
                        ? "/initiatives"
                        : "/donate"
                    }
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group text-sm sm:text-base"
                  >
                    {item}
                    <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-semibold">Contact</h3>
            <ul className="space-y-4 sm:space-y-5">
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <Link
                  href="mailto:info@youngminds.org"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base"
                >
                  donations@youngmindset.org
                </Link>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <Link
                  href="tel:+15712356218"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm sm:text-base"
                >
                  +1 (571) 235-6218
                </Link>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div className="text-muted-foreground text-sm sm:text-base">
                  <p className="font-medium text-foreground mb-0.5 sm:mb-1">US Office</p>
                  <p>Silver Spring</p>
                  <p>Maryland, USA</p>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div className="text-muted-foreground text-sm sm:text-base">
                  <p className="font-medium text-foreground mb-0.5 sm:mb-1">Ethiopia Office</p>
                  <p>Addis Ababa</p>
                  <p>Ethiopia</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} YoungMinds ET Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import InstagramIcon from "@/assets/instagram.svg";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-muted/30 border-t">
      <div className="px-4 md:px-16 py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center justify-start mb-6 gap-8">
              <Link href="/" className="inline-block">
                <Image
                  src="/logo/logo-02-06.png"
                  alt="YoungMinds ET Logo"
                  width={120}
                  height={40}
                  className="h-16 w-auto md:h-28"
                  priority
                />
              </Link>
              <div className="flex gap-4">
                <Link
                  target="_blank"
                  href="https://www.instagram.com/youngminds_et"
                  className="w-10 h-10 rounded-full bg-[#FF0069]/10 hover:bg-[#FF0069]/20 flex items-center justify-center transition-colors group"
                >
                  <Image
                    src={InstagramIcon}
                    alt="Instagram"
                    className="h-5 w-5 text-[#FF0069] group-hover:scale-110 transition-transform"
                  />
                </Link>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Unlocking Potential One Student at a Time
            </p>
            <p className="text-sm text-muted-foreground max-w-md">
              YoungMinds ET Inc. is a registered non-profit organization in the
              United States, extending its educational initiatives and
              operations to Ethiopia.
            </p>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
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
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    {item}
                    <ArrowUpRight className="h-4 w-4 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <Link
                  href="mailto:info@youngminds.org"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  donations@youngmindset.org
                </Link>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <Link
                  href="tel:+15712356218"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +1 (571) 235-6218
                </Link>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">US Office</p>
                  <p>Silver Spring</p>
                  <p>Maryland, USA</p>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">
                    Ethiopia Office
                  </p>
                  <p>Addis Ababa</p>
                  <p>Ethiopia</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} YoungMinds ET Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

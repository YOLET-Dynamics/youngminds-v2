"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/75 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 border-b border-border/40 shadow-sm"
          : isHomePage
          ? "bg-transparent"
          : "bg-background border-b border-border/40 shadow-sm"
      )}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto py-6">
        <Link href="/" className="flex items-center gap-2">
          {isHomePage ? (
            <Image
              src="/logo/logo-02-06.png"
              alt="YoungMinds ET Logo"
              width={120}
              height={40}
              className="h-16 w-auto md:h-28"
              priority
            />
          ) : (
            <Image
              src="/logo/logo-02-04.png"
              alt="YoungMinds ET Logo"
              width={120}
              height={40}
              className="h-16 w-auto md:h-28"
              priority
            />
          )}
        </Link>
        <nav className="hidden md:flex items-center space-x-16 lg:space-x-24">
          <Link
            href="/initiatives"
            className={cn(
              "relative text-base font-medium transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:transition-all after:duration-300 hover:after:w-full",
              isScrolled || !isHomePage
                ? "text-foreground hover:text-primary after:bg-primary"
                : "text-white/90 hover:text-white after:bg-white"
            )}
          >
            Initiatives
          </Link>
          <Link
            href="/about"
            className={cn(
              "relative text-base font-medium transition-colors after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:transition-all after:duration-300 hover:after:w-full",
              isScrolled || !isHomePage
                ? "text-foreground hover:text-primary after:bg-primary"
                : "text-white/90 hover:text-white after:bg-white"
            )}
          >
            About Us
          </Link>
          <Button
            asChild
            size="lg"
            className={cn(
              "px-8 transition-all",
              isScrolled || !isHomePage
                ? "bg-gradient-to-r from-slate-900 to-slate-700 hover:opacity-90 text-white"
                : "bg-white text-primary hover:bg-white/90"
            )}
          >
            <Link href="/donate">Donate</Link>
          </Button>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "md:hidden",
            isScrolled ? "text-foreground" : "text-white"
          )}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40">
          <nav className="flex flex-col space-y-4 py-6 px-4 bg-background/95 backdrop-blur-sm">
            <Link
              href="#initiatives"
              className="text-base font-medium text-muted-foreground hover:text-primary transition-colors px-2 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Initiatives
            </Link>
            <Link
              href="#about"
              className="text-base font-medium text-muted-foreground hover:text-primary transition-colors px-2 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-white w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href="/donate">Donate</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

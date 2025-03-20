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
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6",
        isScrolled
          ? "bg-background/75 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 border-b border-border/40 shadow-sm"
          : isHomePage
          ? "bg-transparent"
          : "bg-background border-b border-border/40 shadow-sm"
      )}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto py-3 sm:py-4 md:py-6">
        <Link href="/" className="flex items-center gap-2">
          {isHomePage ? (
            <Image
              src="/logo/logo-02-06.png"
              alt="YoungMinds ET Logo"
              width={120}
              height={40}
              className="h-12 w-auto sm:h-16 md:h-28 transition-all"
              priority
            />
          ) : (
            <Image
              src="/logo/logo-02-04.png"
              alt="YoungMinds ET Logo"
              width={120}
              height={40}
              className="h-12 w-auto sm:h-16 md:h-28 transition-all"
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
            "md:hidden relative",
            isScrolled || !isHomePage
              ? "text-foreground hover:bg-foreground/10"
              : "text-white hover:bg-white/10"
          )}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-5 w-5 transition-all duration-200" />
          ) : (
            <Menu className="h-5 w-5 transition-all duration-200" />
          )}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      <div
        className={cn(
          "md:hidden fixed inset-x-0 top-[57px] sm:top-[65px] border-t border-border/40",
          "transition-all duration-300 transform",
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <nav className="flex flex-col space-y-2 py-4 px-4 bg-background/95 backdrop-blur-sm">
          <Link
            href="/initiatives"
            className="text-base font-medium text-muted-foreground hover:text-primary 
                     transition-colors px-3 py-2.5 rounded-lg active:scale-98
                     hover:bg-foreground/5"
            onClick={() => setIsMenuOpen(false)}
          >
            Initiatives
          </Link>
          <Link
            href="/about"
            className="text-base font-medium text-muted-foreground hover:text-primary 
                     transition-colors px-3 py-2.5 rounded-lg active:scale-98
                     hover:bg-foreground/5"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-white w-full mt-2 
                     h-11 text-base font-medium active:scale-98"
            onClick={() => setIsMenuOpen(false)}
          >
            <Link href="/donate">Donate</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

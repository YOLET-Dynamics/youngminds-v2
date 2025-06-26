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

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Handle body scroll lock
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalStyle;
    }
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isMenuOpen]);

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-6",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border/40 shadow-sm"
          : isHomePage
          ? "bg-transparent"
          : "bg-background border-b border-border/40"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          <Link 
            href="/" 
            className="relative z-10 flex items-center gap-2 transition-opacity hover:opacity-90"
          >
            <Image
              src={isHomePage ? "/logo/logo-02-06.png" : "/logo/logo-02-04.png"}
              alt="YoungMinds ET Logo"
              width={180}
              height={60}
              className="h-14 w-auto sm:h-16 md:h-20 transition-all"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {[
              { href: "/initiatives", label: "Initiatives" },
              { href: "/events", label: "Events" },
              { href: "/join", label: "Join Us" },
              { href: "/about", label: "About Us" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative text-sm font-medium transition-colors duration-200",
                  "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0",
                  "after:transition-all after:duration-300 hover:after:w-full",
                  pathname === href ? "text-primary after:w-full after:bg-primary" : 
                  isScrolled || !isHomePage
                    ? "text-foreground/80 hover:text-primary after:bg-primary"
                    : "text-white/90 hover:text-white after:bg-white"
                )}
              >
                {label}
              </Link>
            ))}
            <Button
              asChild
              className={cn(
                "px-6 py-2 text-sm font-medium transition-all duration-200",
                isScrolled || !isHomePage
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                  : "bg-white text-primary hover:bg-white/90"
              )}
            >
              <Link href="/donate">Donate</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "md:hidden relative z-10 p-1.5 rounded-md -mr-1.5 transition-colors",
              isScrolled || !isHomePage || isMenuOpen
                ? "text-foreground hover:bg-foreground/5"
                : "text-white hover:bg-white/10"
            )}
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-5">
              <span
                className={cn(
                  "absolute left-0 w-5 h-0.5 transform transition-all duration-300",
                  isMenuOpen 
                    ? "rotate-45 translate-y-0 bg-foreground"
                    : "translate-y-[-6px]",
                  isScrolled || !isHomePage
                    ? "bg-foreground"
                    : "bg-white"
                )}
              />
              <span
                className={cn(
                  "absolute left-0 w-5 h-0.5 transform transition-all duration-300",
                  isMenuOpen 
                    ? "-rotate-45 translate-y-0 bg-foreground"
                    : "translate-y-[6px]",
                  isScrolled || !isHomePage
                    ? "bg-foreground"
                    : "bg-white"
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-16 sm:top-20 z-40 transition-all duration-300 ease-in-out",
          isMenuOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        <div 
          className="absolute inset-0 bg-background/95 backdrop-blur-lg"
          onClick={() => setIsMenuOpen(false)}
        />
        <nav className="relative h-full flex flex-col px-4 pt-6 pb-24 bg-background/50">
          {[
            { href: "/initiatives", label: "Initiatives" },
            { href: "/events", label: "Events" },
            { href: "/join", label: "Join Us" },
            { href: "/about", label: "About Us" },
          ].map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "py-4 px-6 text-lg font-medium border-b border-border/5",
                "transition-colors hover:bg-foreground/5",
                pathname === href ? "text-primary" : "text-foreground/80"
              )}
              style={{ animationDelay: `${i * 100}ms` }}
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="mt-6 px-6">
            <Button
              asChild
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href="/donate">Donate</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

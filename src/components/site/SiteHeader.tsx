"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav, siteConfig } from "@/lib/site";
import { Icon } from "./Icon";

const logo = { src: "/logo/logo-02-04.png", alt: "" };

function isCurrent(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLinks({ items, pathname, onNavigate }: {
  items: readonly (typeof primaryNav)[number][];
  pathname: string;
  onNavigate?: () => void;
}) {
  return items.map(({ href, label }) => (
    <Link key={href} href={href} aria-current={isCurrent(pathname, href) ? "page" : undefined} onClick={onNavigate}>
      {label}
    </Link>
  ));
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasMenuOpen = useRef(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsMenuOpen(false);
        }
      };
      document.addEventListener("keydown", onKeyDown);
      wasMenuOpen.current = true;
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", onKeyDown);
      };
    }

    if (wasMenuOpen.current) {
      wasMenuOpen.current = false;
      menuButtonRef.current?.focus();
    }
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
        <div className="wrap header-inner">
          <button
            ref={menuButtonRef}
            className="menu-btn"
            type="button"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <Icon name="menu" />
          </button>
          <nav className="nav-desktop" aria-label="Primary">
            <NavLinks items={primaryNav.slice(0, 3)} pathname={pathname} />
          </nav>
          <Link className="header-logo" href="/" aria-label="YoungMinds ET home">
            <Image src={logo.src} alt={logo.alt} width={72} height={72} priority />
          </Link>
          <div className="nav-desktop right">
            <NavLinks items={primaryNav.slice(3)} pathname={pathname} />
            <Link className="btn btn-primary btn-sm" href="/donate">
              Donate
            </Link>
          </div>
          <Link className="btn btn-primary btn-sm header-cta mobile-only" href="/donate">
            Donate
          </Link>
        </div>
      </header>

      <div
        className="mobile-menu"
        id="mobile-menu"
        hidden={!isMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="mobile-menu-top">
          <Link href="/" aria-label="YoungMinds ET home" onClick={closeMenu}>
            <Image src={logo.src} alt={logo.alt} width={52} height={52} />
          </Link>
          <button ref={closeButtonRef} className="close-btn" type="button" aria-label="Close menu" onClick={closeMenu}>
            <Icon name="close" />
          </button>
        </div>
        <nav aria-label="Mobile">
          <NavLinks items={primaryNav} pathname={pathname} onNavigate={closeMenu} />
        </nav>
        <Link className="btn btn-primary btn-block" href="/donate" onClick={closeMenu}>
          Donate
        </Link>
        <a className="arrow-link" href={siteConfig.instagram} target="_blank" rel="noopener noreferrer">
          Follow {siteConfig.instagramHandle}
        </a>
      </div>
    </>
  );
}

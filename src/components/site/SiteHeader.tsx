"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav, siteConfig } from "@/lib/site";
import { Icon } from "./Icon";

const logoSrc = "/logo/logo-02-04.png";

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
  const menuRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The native modal dialog traps focus, closes on Escape and returns focus to the menu button.
  const openMenu = () => {
    menuRef.current?.showModal();
    setIsMenuOpen(true);
  };
  const closeMenu = () => menuRef.current?.close();

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
        <div className="wrap header-inner">
          <button
            className="menu-btn"
            type="button"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={openMenu}
          >
            <Icon name="menu" />
          </button>
          <nav className="nav-desktop" aria-label="Primary">
            <NavLinks items={primaryNav.slice(0, 3)} pathname={pathname} />
          </nav>
          <Link className="header-logo" href="/" aria-label="YoungMinds ET home">
            <Image src={logoSrc} alt="" width={72} height={72} priority />
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

      <dialog ref={menuRef} className="mobile-menu" id="mobile-menu" aria-label="Menu" onClose={() => setIsMenuOpen(false)}>
        <div className="mobile-menu-top">
          <Link href="/" aria-label="YoungMinds ET home" onClick={closeMenu}>
            <Image src={logoSrc} alt="" width={52} height={52} />
          </Link>
          <button className="close-btn" type="button" aria-label="Close menu" onClick={closeMenu} autoFocus>
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
      </dialog>
    </>
  );
}

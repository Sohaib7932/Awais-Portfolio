"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile, sideNavLinks, topNavLinks } from "@/data/portfolio";
import { useContact } from "@/components/contact/ContactProvider";
import { Icon } from "@/components/Icon";

/* Top bar — each link opens a full, separate page.
   On mobile the links collapse into a slide-down menu, which also carries
   the home-page section links (the sidebar is desktop-only). */
export function TopNavBar() {
  const pathname = usePathname();
  const { open: openContact } = useContact();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  /* Lock scrolling while the mobile menu is open */
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-surface-container/40 backdrop-blur-xl">
      <div className="flex items-center justify-between px-5 py-4 sm:px-6 md:px-20 md:py-6">
        {/* Brand */}
        <Link
          href="/"
          className="font-display text-[15px] font-extrabold tracking-tight text-primary drop-shadow-[0_0_8px_rgba(221,183,255,0.5)] sm:text-xl md:text-headline"
        >
          {profile.name}
        </Link>

        {/* Desktop page links */}
        <nav className="hidden items-center gap-8 md:flex lg:gap-12">
          {topNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-tech text-label uppercase tracking-widest transition-colors duration-300 ${
                isActive(link.href)
                  ? "border-b-2 border-primary pb-1 text-primary"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Contact CTA */}
          <button
            type="button"
            onClick={openContact}
            className="rounded-lg bg-primary px-4 py-2.5 font-tech text-[10px] font-bold uppercase tracking-widest text-on-primary transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(221,183,255,0.4)] active:scale-95 sm:px-6 sm:py-3 sm:text-label"
          >
            Contact Me
          </button>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-on-surface transition-colors hover:border-primary/50 hover:text-primary md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${
                  menuOpen ? "top-[7px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] block h-0.5 w-5 bg-current transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${
                  menuOpen ? "top-[7px] -rotate-45" : "top-[14px]"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-surface-lowest/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 ease-out md:hidden ${
          menuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-5 py-4">
          <p className="mb-2 font-tech text-[10px] uppercase tracking-widest text-on-surface-variant/40">
            Pages
          </p>
          {topNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`border-l-2 py-3 pl-4 font-tech text-label uppercase tracking-widest transition-colors ${
                isActive(link.href)
                  ? "border-primary text-primary"
                  : "border-white/10 text-on-surface-variant hover:border-tertiary hover:text-tertiary"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <p className="mb-2 mt-6 font-tech text-[10px] uppercase tracking-widest text-on-surface-variant/40">
            Jump to
          </p>
          {sideNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 border-l-2 border-white/10 py-3 pl-4 font-tech text-label uppercase tracking-widest text-on-surface-variant transition-colors hover:border-tertiary hover:text-tertiary"
            >
              <Icon name={link.icon} size={16} />
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

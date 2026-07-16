"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile, topNavLinks } from "@/data/portfolio";
import { useContact } from "@/components/contact/ContactProvider";

/* Top bar — each link opens a full, separate page. */
export function TopNavBar() {
  const pathname = usePathname();
  const { open: openContact } = useContact();

  return (
    <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-surface-container/40 px-6 py-6 backdrop-blur-xl md:px-20">
      {/* Brand */}
      <Link
        href="/"
        className="font-display text-xl font-extrabold tracking-tight text-primary drop-shadow-[0_0_8px_rgba(221,183,255,0.5)] md:text-headline"
      >
        {profile.name}
      </Link>

      {/* Page links */}
      <nav className="hidden items-center gap-12 md:flex">
        {topNavLinks.map((link) => {
          const active =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`font-tech text-label uppercase tracking-widest transition-colors duration-300 ${
                active
                  ? "border-b-2 border-primary pb-1 text-primary"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Contact CTA — opens the contact form */}
      <button
        type="button"
        onClick={openContact}
        className="rounded-lg bg-primary px-6 py-3 font-tech text-label font-bold uppercase tracking-widest text-on-primary transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(221,183,255,0.4)] active:scale-95"
      >
        Contact Me
      </button>
    </header>
  );
}

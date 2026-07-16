import Link from "next/link";
import { footer } from "@/data/portfolio";
import { Icon } from "@/components/Icon";
import { ContactTrigger } from "@/components/contact/ContactTrigger";

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative flex flex-col items-center justify-between gap-6 overflow-hidden border-t border-white/10 bg-surface-lowest bg-gradient-to-t from-primary/10 to-transparent px-6 py-12 md:flex-row md:px-20"
    >
      {/* Decorative node */}
      <div className="absolute left-1/2 top-0 h-[2px] w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rotate-45 bg-primary" />

      <div>
        <p className="font-tech font-bold uppercase text-secondary text-glow">
          {footer.brand}
        </p>
        <p className="font-tech text-[10px] uppercase text-on-surface-variant/60">
          {footer.tagline}
        </p>
      </div>

      <div className="flex items-center gap-12">
        {footer.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-tech text-label uppercase text-on-surface-variant/60 transition-colors duration-500 hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
        <ContactTrigger className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-6 py-3 font-tech text-label uppercase text-primary transition-all hover:bg-primary/20">
          <Icon name="mail" size={14} />
          Email Me
        </ContactTrigger>
      </div>

      <p className="font-tech text-[10px] text-on-surface-variant/40">
        {footer.copyright}
      </p>
    </footer>
  );
}

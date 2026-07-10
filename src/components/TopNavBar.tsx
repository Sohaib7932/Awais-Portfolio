import { profile, topNavLinks } from "@/data/portfolio";

export function TopNavBar() {
  return (
    <header className="fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-surface-container/40 px-6 py-6 backdrop-blur-xl md:px-20">
      {/* Brand */}
      <a
        href="#home"
        className="font-display text-xl font-extrabold tracking-tight text-primary drop-shadow-[0_0_8px_rgba(221,183,255,0.5)] md:text-headline"
      >
        {profile.name}
      </a>

      {/* Links */}
      <nav className="hidden items-center gap-12 md:flex">
        {topNavLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            className={`font-tech text-label uppercase tracking-widest transition-colors duration-300 ${
              i === 0
                ? "border-b-2 border-primary pb-1 text-primary"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Contact CTA */}
      <a
        href="#contact"
        className="font-tech text-label font-bold uppercase tracking-widest bg-primary px-6 py-3 text-on-primary transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(221,183,255,0.4)] active:scale-95 rounded-lg"
      >
        Contact Me
      </a>
    </header>
  );
}

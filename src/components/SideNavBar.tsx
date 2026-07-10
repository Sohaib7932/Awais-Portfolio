import { profile, sideNavLinks } from "@/data/portfolio";
import { Icon } from "@/components/Icon";

/* Collapsed rail that expands on hover (desktop only). */
export function SideNavBar() {
  return (
    <aside className="group fixed left-0 top-0 z-40 hidden h-screen w-20 flex-col overflow-hidden border-r border-white/5 bg-surface-low/60 backdrop-blur-2xl transition-all duration-500 hover:w-64 md:flex">
      {/* Profile */}
      <div className="mt-24 flex flex-col items-center p-2 transition-all group-hover:items-start group-hover:px-6">
        <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-primary/20 font-display text-lg font-bold text-primary">
          MA
        </div>
        <div className="hidden whitespace-nowrap transition-opacity duration-300 group-hover:block">
          <p className="font-display text-sm font-bold text-on-surface">
            {profile.name}
          </p>
          <p className="font-tech text-[10px] text-tertiary">{profile.role}</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="mt-20 flex w-full flex-col">
        {sideNavLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            className={`flex items-center gap-6 p-6 transition-all ${
              i === 0
                ? "border-l-4 border-tertiary bg-secondary-container/30 text-tertiary"
                : "text-on-surface-variant hover:bg-surface-variant/30 hover:text-tertiary"
            }`}
          >
            <Icon name={link.icon} size={22} className="shrink-0" />
            <span className="font-tech text-label uppercase tracking-widest opacity-0 transition-opacity group-hover:opacity-100">
              {link.label}
            </span>
          </a>
        ))}
      </nav>

      {/* Bottom CTA */}
      <div className="mt-auto w-full p-6">
        <a
          href="#contact"
          className="block w-full bg-tertiary py-1 text-center font-tech text-[10px] uppercase tracking-widest text-on-tertiary opacity-0 transition-opacity group-hover:opacity-100 rounded-lg"
        >
          Get in Touch
        </a>
      </div>
    </aside>
  );
}

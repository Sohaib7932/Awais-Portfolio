import { skillsSection, toolkit } from "@/data/portfolio";
import { accentBg, accentText } from "@/lib/accents";
import { Icon } from "@/components/Icon";

/* The "toolkit" grid — one square hologram card per piece of software. */
export function SkillsGrid({ id = "skills" }: { id?: string }) {
  return (
    <section id={id} className="mb-12 px-5 md:mb-20 py-14 sm:px-6 md:px-20 md:py-20">
      <div className="mx-auto max-w-[1440px]">
        {/* Centered heading flanked by fading dividers */}
        <div className="mb-4 flex items-center gap-3 sm:gap-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/30" />
          <h2 className="flex items-center gap-2 text-center font-display text-headline uppercase tracking-tight sm:gap-3 md:text-display-sm">
            <Icon
              name="chip"
              size={28}
              className="shrink-0 text-primary sm:h-8 sm:w-8"
            />
            {skillsSection.title}
          </h2>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/30" />
        </div>

        <p className="mb-10 text-center font-body text-body-md text-on-surface-variant md:mb-12">
          {skillsSection.subtitle}
        </p>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-6">
          {toolkit.map((tool, i) => (
            <div
              key={tool.name}
              className="hologram-card glass-panel group relative flex aspect-square cursor-default flex-col items-center justify-center rounded-xl px-3 py-6 text-center"
            >
              <div
                className="scan-beam"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
              <Icon
                name={tool.icon}
                size={44}
                className={`mb-4 shrink-0 transition-transform duration-300 group-hover:scale-110 ${accentText[tool.accent]}`}
              />
              <div
                className={`mb-2 font-tech text-[11px] font-bold uppercase tracking-widest ${accentText[tool.accent]}`}
              >
                {tool.name}
              </div>
              <div className="font-tech text-[10px] leading-snug text-on-surface-variant/60">
                {tool.detail}
              </div>
              <div
                className={`absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${accentBg[tool.accent]}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

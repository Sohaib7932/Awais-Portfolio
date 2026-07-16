import { about } from "@/data/portfolio";
import { Icon } from "@/components/Icon";
import { TiltCard } from "@/components/TiltCard";

export function About() {
  return (
    <section id="about" className="mb-20 px-6 py-20 md:px-20">
      <div className="mx-auto max-w-[1440px]">
        {/* Heading */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="mb-1 font-display text-display-sm uppercase">
              {about.title}
            </h2>
            <div className="flex items-center gap-6">
              <div className="h-1 w-24 bg-primary" />
              <span className="font-tech text-label uppercase text-on-surface-variant">
                {about.subtitle}
              </span>
            </div>
          </div>
          <p className="max-w-sm font-body text-body-md text-on-surface-variant">
            {about.intro}
          </p>
        </div>

        {/* Education + process */}
        <TiltCard
          strength={70}
          className="glass group relative overflow-hidden rounded-xl p-12"
        >
          <div className="pointer-events-none absolute right-0 top-0 p-6 text-primary opacity-20 transition-opacity group-hover:opacity-100">
            <Icon name="fingerprint" size={64} />
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Education */}
            <div>
              <h3 className="mb-6 font-tech text-label uppercase tracking-widest text-primary">
                Education
              </h3>
              <div className="space-y-6">
                {about.education.map((edu) => (
                  <div
                    key={edu.title}
                    className="border-l-2 border-white/10 pl-6 transition-colors hover:border-tertiary"
                  >
                    <p className="font-tech text-[14px] text-tertiary">
                      {edu.years}
                    </p>
                    <p className="font-body text-body-lg font-bold text-on-surface">
                      {edu.title}
                    </p>
                    <p className="font-body text-body-md text-on-surface-variant">
                      {edu.place}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* How I work */}
            <div>
              <h3 className="mb-6 font-tech text-label uppercase tracking-widest text-primary">
                {about.process.heading}
              </h3>
              <p className="font-body text-body-md leading-relaxed text-on-surface-variant">
                {about.process.text}
              </p>
              <div className="mt-12 flex flex-wrap gap-2">
                {about.process.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-white/5 bg-surface-variant px-2 py-1 font-tech text-[10px] uppercase text-tertiary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}

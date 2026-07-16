import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { experience } from "@/data/portfolio";
import { accentBg, accentText } from "@/lib/accents";

export const metadata: Metadata = {
  title: "Experience — Muhammad Awais",
  description:
    "The education and work history of Muhammad Awais, 3D animator and game developer.",
};

export default function ExperiencePage() {
  return (
    <main className="pt-32">
      <PageHeader
        icon="clock"
        eyebrow="Timeline"
        title="My Experience"
        description="A short history of where I studied, where I have worked, and what I was animating along the way."
      />

      <section className="mb-20 px-6 pb-20 md:px-20">
        <div className="mx-auto max-w-[1440px]">
          <div className="relative space-y-6 before:absolute before:left-[7px] before:top-2 before:h-full before:w-px before:bg-gradient-to-b before:from-primary/50 before:via-tertiary/30 before:to-transparent">
            {experience.timeline.map((item) => (
              <div key={item.role} className="relative pl-12">
                {/* Node */}
                <span
                  className={`absolute left-0 top-2 h-4 w-4 rotate-45 ${accentBg[item.accent]}`}
                />

                <div className="hologram-card glass-panel rounded-xl p-12">
                  <p
                    className={`font-tech text-label uppercase tracking-widest ${accentText[item.accent]}`}
                  >
                    {item.years}
                  </p>
                  <h3 className="mt-2 font-display text-headline">
                    {item.role}
                  </h3>
                  <p className="font-body text-body-md text-on-surface-variant/70">
                    {item.place}
                  </p>
                  <p className="mt-6 max-w-2xl font-body text-body-md leading-relaxed text-on-surface-variant">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

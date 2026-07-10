import Image from "next/image";
import { featured } from "@/data/portfolio";

export function FeaturedWork() {
  return (
    <section id="work" className="mb-20 px-6 py-20 md:px-20">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 md:grid-cols-2">
        {/* Project preview */}
        <div className="group relative order-2 md:order-1">
          <div className="absolute -inset-4 bg-tertiary/20 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
          <div className="glass relative aspect-video overflow-hidden rounded-xl">
            <Image
              src="/illustration.png"
              alt={featured.project.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent p-6">
              <div>
                <span className="font-tech text-[10px] uppercase text-tertiary">
                  {featured.project.tag}
                </span>
                <p className="font-body text-body-md font-bold text-white">
                  {featured.project.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div id="experience" className="order-1 space-y-6 md:order-2">
          <span className="font-tech text-label uppercase tracking-[0.3em] text-primary">
            {featured.eyebrow}
          </span>
          <h2 className="font-display text-display-sm">{featured.title}</h2>
          <p className="font-body text-body-lg text-on-surface-variant">
            {featured.description}
          </p>
          <div className="flex gap-12 pt-2">
            {featured.stats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <p
                  className={`font-display text-display-sm ${
                    i === 0 ? "text-tertiary" : "text-primary"
                  }`}
                >
                  {stat.value}
                </p>
                <p className="font-tech text-[10px] uppercase text-on-surface-variant">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

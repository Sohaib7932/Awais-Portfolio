import Image from "next/image";
import { hero } from "@/data/portfolio";
import { Icon } from "@/components/Icon";
import { TiltCard } from "@/components/TiltCard";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center px-6 py-20 md:px-20"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* Left — copy */}
        <div className="relative z-20 space-y-12 lg:col-span-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-tech text-label text-primary">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            {hero.badge}
          </div>

          <h1 className="font-display text-display-lg uppercase leading-tight">
            {hero.headingLines.map((line) =>
              line === hero.highlight ? (
                <span key={line} className="block italic text-primary text-glow">
                  {line}
                </span>
              ) : (
                <span key={line} className="block">
                  {line}
                </span>
              )
            )}
          </h1>

          <p className="max-w-xl font-body text-body-lg text-on-surface-variant">
            {hero.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <a
              href="#work"
              className="scan-line glow-hover relative overflow-hidden rounded-lg bg-gradient-to-r from-inverse-primary to-secondary-container px-12 py-6 font-tech text-label font-bold uppercase tracking-widest text-white transition-transform hover:-translate-y-1"
            >
              {hero.primaryCta}
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-12 py-6 font-tech text-label font-bold uppercase tracking-widest text-tertiary backdrop-blur-md transition-all hover:bg-white/10 hover:border-tertiary/50"
            >
              <Icon name="download" size={16} />
              {hero.tertiaryCta}
            </a>
          </div>
        </div>

        {/* Right — illustration */}
        <div className="relative flex items-center justify-center lg:col-span-6">
          <div className="relative w-full max-w-2xl">
            <div className="absolute -inset-10 rounded-full bg-primary/20 blur-[100px]" />
            <div className="absolute -inset-10 rounded-full bg-tertiary/10 blur-[80px]" />
            <TiltCard strength={30} className="glass relative z-10 rounded-xl p-2">
              <Image
                src="/illustration.png"
                alt="Muhammad Awais — 3D animation and game development artwork"
                width={1376}
                height={768}
                priority
                className="h-auto w-full rounded-lg shadow-2xl"
              />
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}

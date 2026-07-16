"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Project } from "@/data/portfolio";
import {
  accentBackdrop,
  accentBg,
  accentChip,
  accentHoverBtn,
  accentText,
} from "@/lib/accents";
import { Icon } from "@/components/Icon";

/* Large archive card: full-bleed artwork, details overlaid at the bottom,
   and a subtle 3D tilt that follows the cursor. */
export function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rotateX = (e.clientY - rect.top - rect.height / 2) / 25;
    const rotateY = (rect.width / 2 - (e.clientX - rect.left)) / 25;
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="tilt-card glass-panel group relative flex h-[560px] flex-col overflow-hidden rounded-xl"
    >
      {/* Artwork */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        ) : (
          <div
            className={`relative h-full w-full transition-transform duration-1000 group-hover:scale-110 ${accentBackdrop[project.accent]}`}
          >
            <Icon
              name={project.tools[0]}
              size={200}
              className={`absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 opacity-15 ${accentText[project.accent]}`}
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/50 to-transparent" />
      </div>

      {/* Status badge — appears on hover */}
      <div className="absolute right-6 top-6 z-20 flex flex-col items-end gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div
          className={`font-tech text-[10px] uppercase tracking-widest ${accentText[project.accent]}`}
        >
          {project.status}
        </div>
        <div
          className={`h-[2px] w-16 animate-pulse ${accentBg[project.accent]}`}
        />
      </div>

      {/* Details */}
      <div className="relative z-10 mt-auto flex flex-col items-start gap-6 p-12">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`border px-3 py-1 font-tech text-[10px] uppercase tracking-widest ${accentChip[project.accent]}`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-2">
          <h3 className="font-display text-headline uppercase leading-none glow-text md:text-display-sm">
            {project.name}
          </h3>
          <p className="max-w-lg font-body text-body-md text-on-surface-variant/80">
            {project.description}
          </p>
        </div>

        <div className="flex w-full items-center gap-6">
          <a
            href={`/work#${project.slug}`}
            className={`flex flex-1 items-center justify-center gap-3 rounded-lg bg-white py-4 font-tech text-label font-bold uppercase tracking-widest text-black transition-all ${accentHoverBtn[project.accent]}`}
          >
            View Details
            <Icon name="arrow-right" size={18} />
          </a>
          <div className="flex -space-x-2">
            {project.tools.map((tool) => (
              <div
                key={tool}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-surface text-on-surface-variant"
              >
                <Icon name={tool} size={15} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

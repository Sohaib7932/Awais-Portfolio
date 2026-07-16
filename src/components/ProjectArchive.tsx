import { projects, stats, workSection } from "@/data/portfolio";
import { ProjectCard } from "@/components/ProjectCard";
import { Icon } from "@/components/Icon";

/* The project archive grid. `limit` lets the home page show a shorter list
   than the full /work page. */
export function ProjectArchive({
  id = "work",
  limit,
  showStats = true,
}: {
  id?: string;
  limit?: number;
  showStats?: boolean;
}) {
  const list = limit ? projects.slice(0, limit) : projects;

  return (
    <section id={id} className="mb-20 px-6 py-20 md:px-20">
      <div className="mx-auto max-w-[1440px]">
        {/* Heading + chips */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <Icon name="film" size={32} className="shrink-0 text-secondary" />
            <div>
              <h2 className="font-display text-headline uppercase tracking-tight md:text-display-sm">
                {workSection.title}
              </h2>
              <p className="font-body text-body-md text-on-surface-variant">
                {workSection.subtitle}
              </p>
            </div>
          </div>

          <div className="hidden gap-3 md:flex">
            {workSection.chips.map((chip, i) => (
              <span
                key={chip}
                className={`glass-panel px-6 py-1 font-tech text-[10px] uppercase tracking-widest ${
                  i === 0
                    ? "text-tertiary"
                    : i === 1
                      ? "text-secondary"
                      : "text-on-surface-variant/60"
                }`}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="perspective grid grid-cols-1 gap-12 lg:grid-cols-2">
          {list.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {/* Stats */}
        {showStats && (
          <div className="mt-20 flex justify-center gap-20">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <p
                  className={`font-display text-display-sm ${
                    i === 0 ? "text-tertiary" : "text-primary"
                  }`}
                >
                  {stat.value}
                </p>
                <p className="font-tech text-[10px] uppercase tracking-widest text-on-surface-variant">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

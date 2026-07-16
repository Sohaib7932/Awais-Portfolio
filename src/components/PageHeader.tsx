import { Icon, type IconName } from "@/components/Icon";

/* Shared heading for the top-level pages (/work, /skills, /experience). */
export function PageHeader({
  eyebrow,
  title,
  description,
  icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: IconName;
}) {
  return (
    <section className="px-6 pb-12 pt-12 md:px-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex items-center gap-2 font-tech text-label uppercase tracking-[0.3em] text-primary">
          <Icon name={icon} size={16} />
          {eyebrow}
        </div>
        <h1 className="mt-3 font-display text-display-sm uppercase md:text-display-lg">
          {title}
        </h1>
        <div className="mt-6 flex items-center gap-6">
          <div className="h-1 w-24 shrink-0 bg-primary" />
          <p className="max-w-2xl font-body text-body-lg text-on-surface-variant">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

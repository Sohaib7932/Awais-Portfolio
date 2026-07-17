import { skills } from "@/data/portfolio";
import { Icon } from "@/components/Icon";

/* Proficiency bars — shown on the detailed Skills page. */
export function SkillBars() {
  return (
    <section className="mb-12 px-5 md:mb-20 pb-14 sm:px-6 md:px-20 md:pb-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="glass relative rounded-xl p-6 sm:p-8 md:p-12">
          <h3 className="mb-12 font-tech text-label uppercase tracking-widest text-primary">
            How Confident I Am
          </h3>

          <div className="grid grid-cols-1 gap-x-20 gap-y-6 md:grid-cols-2">
            {skills.map((skill) => (
              <div key={skill.name} className="group">
                <div className="mb-1 flex items-end justify-between">
                  <p className="font-tech text-label uppercase tracking-widest text-on-surface">
                    {skill.name}
                  </p>
                  <p className="font-tech text-label text-tertiary">
                    {skill.level}%
                  </p>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-tertiary transition-all duration-1000 group-hover:bg-primary"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 border-t border-white/10 pt-12">
            <div className="flex items-center justify-between font-tech text-[10px] uppercase tracking-widest text-on-surface-variant">
              <span>Always Learning</span>
              <Icon name="check" size={14} className="text-tertiary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

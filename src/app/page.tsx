import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { SkillsGrid } from "@/components/SkillsGrid";
import { ProjectArchive } from "@/components/ProjectArchive";

export default function Home() {
  return (
    <main className="pt-32">
      <Hero />
      <About />
      <SkillsGrid />
      <ProjectArchive limit={2} />
    </main>
  );
}

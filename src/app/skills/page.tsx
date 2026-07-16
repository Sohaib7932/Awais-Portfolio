import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SkillsGrid } from "@/components/SkillsGrid";
import { SkillBars } from "@/components/SkillBars";

export const metadata: Metadata = {
  title: "Skills — Muhammad Awais",
  description:
    "The software and skills Muhammad Awais uses: Blender, After Effects, Unity, Photoshop and Premiere Pro.",
};

export default function SkillsPage() {
  return (
    <main className="pt-32">
      <PageHeader
        icon="chip"
        eyebrow="Capabilities"
        title="My Skills"
        description="I spend most of my time animating in Blender and building motion graphics in After Effects. Here is everything I use and how confident I am with each one."
      />
      <SkillsGrid id="all-skills" />
      <SkillBars />
    </main>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProjectArchive } from "@/components/ProjectArchive";

export const metadata: Metadata = {
  title: "Work — Muhammad Awais",
  description:
    "Animation and game projects by Muhammad Awais, made with Blender, After Effects and Unity.",
};

export default function WorkPage() {
  return (
    <main className="pt-32">
      <PageHeader
        icon="film"
        eyebrow="Portfolio"
        title="My Work"
        description="Every project here was animated or built by me. Most of it starts in Blender, gets polished in After Effects, and ends up as a clip or a small game."
      />
      <ProjectArchive id="all-work" />
    </main>
  );
}

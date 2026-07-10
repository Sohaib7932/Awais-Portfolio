import type { IconName } from "@/components/Icon";

/* ------------------------------------------------------------------ */
/*  All of the site's text lives here so it's easy to edit.           */
/* ------------------------------------------------------------------ */

export const profile = {
  name: "Muhammad Awais",
  role: "3D Animator & Game Developer",
  status: "Available for Work",
  email: "awais@example.com",
};

/* Top navigation bar */
export const topNavLinks = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
];

/* Left side navigation */
export const sideNavLinks: { label: string; href: string; icon: IconName }[] = [
  { label: "Home", href: "#home", icon: "grid" },
  { label: "Projects", href: "#work", icon: "film" },
  { label: "Skills", href: "#skills", icon: "spark" },
  { label: "Experience", href: "#experience", icon: "clock" },
];

/* Hero section */
export const hero = {
  badge: "Available for Work",
  headingLines: ["Bringing Ideas", "to Life Through", "Animation"],
  highlight: "to Life Through",
  description:
    "Hi, I'm Muhammad Awais — a 3D animator and game developer. I create smooth character animations and eye-catching motion graphics using Blender and After Effects.",
  primaryCta: "View My Work",
  tertiaryCta: "Download CV",
};

/* About section */
export const about = {
  title: "About Me",
  subtitle: "A little about my background",
  intro:
    "I graduated in Computer Game Development and have spent the last few years turning ideas into animated stories and playable games.",
  education: [
    {
      years: "2020 – 2024",
      title: "BS in Computer Game Development",
      place: "Air University, Islamabad",
    },
    {
      years: "2023",
      title: "Character Animation in Blender",
      place: "Online Certification",
    },
  ],
  process: {
    heading: "How I Work",
    text: "I like to keep my work flexible and easy to change. I start with rough sketches, block out the movement, then polish every frame until it feels natural. My goal is always animation that looks smooth and tells a clear story.",
    tags: ["Character Animation", "Motion Graphics", "Storytelling"],
  },
};

/* Skills — shown as progress bars */
export const skills = [
  { name: "Blender", level: 95 },
  { name: "After Effects", level: 90 },
  { name: "Unity Game Engine", level: 80 },
  { name: "Photoshop", level: 85 },
];

/* Featured work / projects section */
export const featured = {
  eyebrow: "My Work",
  title: "What I Create",
  description:
    "I build character animations, short animated clips, motion graphics, and small games. Below is one of my favourite projects.",
  project: {
    tag: "Featured Project",
    name: "Character Animation Reel — Blender",
  },
  stats: [
    { value: "50+", label: "Animations Created" },
    { value: "20+", label: "Projects Completed" },
  ],
};

/* Footer */
export const footer = {
  brand: "Muhammad Awais",
  tagline: "3D Animator & Game Developer",
  links: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  copyright: "© 2026 Muhammad Awais. All rights reserved.",
};

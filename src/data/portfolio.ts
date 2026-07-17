import type { IconName } from "@/components/Icon";

/* ------------------------------------------------------------------ */
/*  All of the site's text lives here so it's easy to edit.           */
/* ------------------------------------------------------------------ */

export type Accent = "purple" | "cyan" | "blue";

export const profile = {
  name: "Muhammad Awais",
  role: "3D Animator & Game Developer",
  status: "Available for Work",
  email: "awais.m4325@gmail.com",
};

/* Contact form */
export const contact = {
  eyebrow: "Get in Touch",
  title: "Let's Work Together",
  description:
    "Have an animation or game idea in mind? Send me a message and I'll get back to you as soon as I can.",
  fields: {
    name: "Your Name",
    email: "Your Email",
    subject: "Subject",
    message: "Your Message",
  },
  submit: "Send Message",
  sending: "Sending…",
  sent: "Thanks for reaching out! Your message has landed in my inbox and I'll reply as soon as I can.",
};

/* Top navigation — these open full, separate pages */
export const topNavLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Skills", href: "/skills" },
  { label: "Experience", href: "/experience" },
];

/* Left sidebar — these only scroll between sections of the home page */
export const sideNavLinks: { label: string; href: string; icon: IconName }[] = [
  { label: "Home", href: "/#home", icon: "grid" },
  { label: "About", href: "/#about", icon: "fingerprint" },
  { label: "Skills", href: "/#skills", icon: "chip" },
  { label: "Projects", href: "/#work", icon: "film" },
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

/* ------------------------------------------------------------------ */
/*  Skills — the software Awais uses, shown as a grid of cards         */
/* ------------------------------------------------------------------ */
export const skillsSection = {
  title: "My Toolkit",
  subtitle: "The software I use every day",
};

export const toolkit: {
  name: string;
  detail: string;
  icon: IconName;
  accent: Accent;
}[] = [
  {
    name: "Blender",
    detail: "Modeling • Rigging • Animation",
    icon: "cube",
    accent: "cyan",
  },
  {
    name: "After Effects",
    detail: "Motion Graphics • Visual Effects",
    icon: "wand",
    accent: "purple",
  },
  {
    name: "Unity",
    detail: "Game Development • C#",
    icon: "layers",
    accent: "blue",
  },
  {
    name: "Photoshop",
    detail: "Textures • Concept Art",
    icon: "image",
    accent: "cyan",
  },
  {
    name: "Premiere Pro",
    detail: "Video Editing • Sound",
    icon: "scissors",
    accent: "purple",
  },
  {
    name: "Unreal Engine",
    detail: "Game Levels • Cinematics",
    icon: "zap",
    accent: "blue",
  },
];

/* Skill levels — shown as bars on the detailed Skills page */
export const skills = [
  { name: "Blender", level: 95 },
  { name: "After Effects", level: 90 },
  { name: "Unity Game Engine", level: 80 },
  { name: "Photoshop", level: 85 },
  { name: "Premiere Pro", level: 75 },
];

/* ------------------------------------------------------------------ */
/*  Projects                                                           */
/* ------------------------------------------------------------------ */
export const workSection = {
  title: "My Projects",
  subtitle: "Things I have animated and built",
  chips: ["Blender", "After Effects", "Newest First"],
};

export type Project = {
  slug: string;
  name: string;
  tags: string[];
  description: string;
  image?: string;
  accent: Accent;
  status: "Completed" | "Ongoing";
  tools: IconName[];
};

export const projects: Project[] = [
  {
    slug: "character-animation-reel",
    name: "Character Animation Reel",
    tags: ["Character Animation", "Blender"],
    description:
      "A collection of walk cycles, runs, jumps and fight moves. Every character is rigged and hand-animated in Blender so the movement feels natural and full of personality.",
    image: "/illustration.png",
    accent: "purple",
    status: "Completed",
    tools: ["cube", "wand"],
  },
  {
    slug: "motion-graphics-pack",
    name: "Motion Graphics Pack",
    tags: ["Motion Graphics", "After Effects"],
    description:
      "Animated logo intros, titles and smooth transitions built in After Effects. Made for YouTube channels and small brands that need a clean, modern look.",
    accent: "cyan",
    status: "Completed",
    tools: ["wand", "scissors"],
  },
  {
    slug: "3d-game-environment",
    name: "3D Game Environment",
    tags: ["Game Art", "Unity"],
    description:
      "A small explorable 3D scene modelled in Blender and built in Unity — complete with lighting, props and simple player movement you can walk around in.",
    accent: "blue",
    status: "Completed",
    tools: ["cube", "layers"],
  },
  {
    slug: "short-animated-film",
    name: "Short Animated Film",
    tags: ["Storytelling", "Blender"],
    description:
      "A two minute animated short made from start to finish — story, characters, camera work, lighting and the final edit all done by me.",
    accent: "purple",
    status: "Ongoing",
    tools: ["cube", "scissors"],
  },
];

/* Stats shown on the projects section */
export const stats = [
  { value: "50+", label: "Animations Created" },
  { value: "20+", label: "Projects Completed" },
];

/* ------------------------------------------------------------------ */
/*  Experience — shown on the detailed Experience page                 */
/* ------------------------------------------------------------------ */
export const experience = {
  title: "My Experience",
  subtitle: "Where I have studied and worked",
  timeline: [
    {
      years: "2024 – Now",
      role: "Freelance 3D Animator",
      place: "Self-employed",
      text: "Creating character animations and motion graphics for clients around the world using Blender and After Effects.",
      accent: "purple" as Accent,
    },
    {
      years: "2023",
      role: "Animation Intern",
      place: "Local Studio, Islamabad",
      text: "Helped the team with character rigging, clean-up animation and simple visual effects shots.",
      accent: "cyan" as Accent,
    },
    {
      years: "2020 – 2024",
      role: "BS in Computer Game Development",
      place: "Air University, Islamabad",
      text: "Studied game design, 3D art and animation. Final year project was a fully animated short game scene.",
      accent: "blue" as Accent,
    },
  ],
};

/* Footer */
export const footer = {
  brand: "Muhammad Awais",
  tagline: "3D Animator & Game Developer",
  links: [
    { label: "Work", href: "/work" },
    { label: "Skills", href: "/skills" },
    { label: "Experience", href: "/experience" },
  ],
  copyright: "© 2026 Muhammad Awais. All rights reserved.",
};

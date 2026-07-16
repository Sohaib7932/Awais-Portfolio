/* ------------------------------------------------------------------ */
/*  Lightweight inline SVG icons (stroke style).                       */
/*  Self-contained — no external icon font / network request.         */
/* ------------------------------------------------------------------ */

export type IconName =
  | "grid"
  | "film"
  | "spark"
  | "clock"
  | "fingerprint"
  | "check"
  | "play"
  | "download"
  | "mail"
  | "arrow-right"
  | "cube"
  | "wand"
  | "layers"
  | "image"
  | "scissors"
  | "zap"
  | "chip";

const paths: Record<IconName, React.ReactNode> = {
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </>
  ),
  film: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" />
    </>
  ),
  spark: (
    <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2zM19 15l.9 2.6L22 18.5l-2.1.9L19 22l-.9-2.6L16 18.5l2.1-.9L19 15z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  fingerprint: (
    <>
      <path d="M12 11a2 2 0 0 1 2 2c0 3-1 5-1 5" />
      <path d="M8.5 8.5A5 5 0 0 1 17 12c0 4-1 6-1 6" />
      <path d="M5 12a7 7 0 0 1 12-5" />
      <path d="M9 20c-1-2-1.5-4-1.5-7a4.5 4.5 0 0 1 1-2.8" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 12.5l2.5 2.5 4.5-5" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 9l5 3-5 3V9z" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M4 21h16" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </>
  ),
  /* 3D / Blender */
  cube: (
    <>
      <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" />
      <path d="M3 7l9 5 9-5" />
      <path d="M12 12v10" />
    </>
  ),
  /* Motion graphics / After Effects */
  wand: (
    <>
      <path d="M15 4V2M15 10V8M12.5 6h-2M19.5 6h-2" />
      <path d="M18 14l-8.5 8.5a1.4 1.4 0 0 1-2-2L16 12" />
      <path d="M14.5 9.5l2 2" />
    </>
  ),
  /* Unity / engines */
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </>
  ),
  /* Photoshop / textures */
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="M21 15l-5-5L5 20" />
    </>
  ),
  /* Premiere / editing */
  scissors: (
    <>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <path d="M8 8l12 10M20 6L8.5 16" />
    </>
  ),
  /* Unreal / power */
  zap: <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />,
  /* Skills / toolkit */
  chip: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </>
  ),
};

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
};

export function Icon({ name, size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

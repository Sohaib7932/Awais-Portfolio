"use client";

import { useEffect, useRef } from "react";

/* Soft purple light that follows the cursor across the whole page. */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
      el.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-300 bg-[radial-gradient(circle,rgba(221,183,255,0.08)_0%,transparent_70%)]"
    />
  );
}

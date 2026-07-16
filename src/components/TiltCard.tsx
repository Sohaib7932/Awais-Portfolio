"use client";

import { useRef, type ReactNode } from "react";

/* Wraps any card so it tilts in 3D towards the cursor.
   `strength` is a divisor — a larger number means a gentler tilt. */
export function TiltCard({
  children,
  className = "",
  strength = 25,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const rotateX = (e.clientY - rect.top - rect.height / 2) / strength;
    const rotateY = (rect.width / 2 - (e.clientX - rect.left)) / strength;
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) {
      el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`tilt-card ${className}`}
    >
      {children}
    </div>
  );
}

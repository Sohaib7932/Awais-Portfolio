"use client";

import type { ReactNode } from "react";
import { useContact } from "@/components/contact/ContactProvider";

/* A button that opens the contact modal — usable from server components. */
export function ContactTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { open } = useContact();

  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}

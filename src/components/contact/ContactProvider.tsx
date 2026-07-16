"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { ContactModal } from "@/components/contact/ContactModal";

const ContactContext = createContext<{ open: () => void }>({ open: () => {} });

export function useContact() {
  return useContext(ContactContext);
}

/* Holds the contact modal once for the whole site so any button can open it. */
export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ContactContext.Provider value={{ open }}>
      {children}
      {isOpen && <ContactModal onClose={close} />}
    </ContactContext.Provider>
  );
}

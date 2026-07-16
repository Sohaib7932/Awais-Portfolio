"use client";

import { useEffect, useRef, useState } from "react";
import { contact, profile } from "@/data/portfolio";
import { Icon } from "@/components/Icon";

/* Minimalist field — the bottom border illuminates across its full width
   when focused, per the design system. */
function Field({
  label,
  name,
  type = "text",
  textarea = false,
  delay,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  delay: number;
  required?: boolean;
}) {
  const shared =
    "peer w-full border-b border-white/15 bg-transparent py-3 font-body text-body-md text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/30 focus:border-transparent";

  return (
    <div className="field-enter relative" style={{ animationDelay: `${delay}ms` }}>
      <label
        htmlFor={name}
        className="font-tech text-[10px] uppercase tracking-widest text-on-surface-variant/60"
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          required={required}
          className={`${shared} resize-none`}
        />
      ) : (
        <input id={name} name={name} type={type} required={required} className={shared} />
      )}
      {/* Illuminating underline */}
      <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-primary via-tertiary to-transparent transition-transform duration-500 peer-focus:scale-x-100" />
    </div>
  );
}

export function ContactModal({ onClose }: { onClose: () => void }) {
  const [closing, setClosing] = useState(false);
  const [sent, setSent] = useState(false);
  const [mailtoUrl, setMailtoUrl] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLFormElement>(null);

  /* Play the exit animation, then unmount */
  const requestClose = () => {
    setClosing(true);
    setTimeout(onClose, 200);
  };

  /* Escape to close + lock background scrolling while open */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    firstFieldRef.current?.querySelector("input")?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* No backend here — compose a real email and hand it to the user's mail app */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const subject = String(data.get("subject") ?? "") || `Message from ${name}`;
    const message = String(data.get("message") ?? "");

    const body = `${message}\n\n—\nFrom: ${name}\nEmail: ${email}`;
    const url = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setMailtoUrl(url);
    window.location.href = url;
    setSent(true);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
    >
      {/* Backdrop */}
      <div
        onClick={requestClose}
        className={`absolute inset-0 bg-black/70 backdrop-blur-md ${
          closing ? "backdrop-exit" : "backdrop-enter"
        }`}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`glass-panel relative z-10 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl p-12 ${
          closing ? "modal-exit" : "modal-enter"
        }`}
      >
        {/* Scanning beam across the top edge */}
        <div className="scan-beam" />

        {/* Close */}
        <button
          type="button"
          onClick={requestClose}
          aria-label="Close contact form"
          className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-on-surface-variant transition-all hover:border-primary/50 hover:text-primary"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            ×
          </span>
        </button>

        {sent ? (
          /* Confirmation */
          <div className="flex flex-col items-center py-12 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-tertiary/40 bg-tertiary/10 text-tertiary">
              <Icon name="check" size={30} />
            </div>
            <h2 className="mb-3 font-display text-headline uppercase">
              Message Ready
            </h2>
            <p className="max-w-sm font-body text-body-md text-on-surface-variant">
              {contact.sent}
            </p>
            <p className="mt-6 font-body text-body-md text-on-surface-variant/60">
              Nothing opened? Write to me directly at
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-1 font-tech text-label uppercase tracking-widest text-tertiary hover:text-primary"
            >
              {profile.email}
            </a>

            <div className="mt-12 flex items-center gap-6">
              <a
                data-testid="mailto-fallback"
                href={mailtoUrl}
                className="rounded-lg border border-white/20 bg-white/5 px-6 py-3 font-tech text-label font-bold uppercase tracking-widest text-on-surface transition-all hover:bg-white/10"
              >
                Try Again
              </a>
              <button
                type="button"
                onClick={requestClose}
                className="rounded-lg bg-primary px-12 py-3 font-tech text-label font-bold uppercase tracking-widest text-on-primary transition-transform hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="field-enter" style={{ animationDelay: "60ms" }}>
              <span className="font-tech text-label uppercase tracking-[0.3em] text-primary">
                {contact.eyebrow}
              </span>
              <h2
                id="contact-title"
                className="mt-2 font-display text-headline uppercase glow-text"
              >
                {contact.title}
              </h2>
              <p className="mt-3 font-body text-body-md text-on-surface-variant">
                {contact.description}
              </p>
            </div>

            <form ref={firstFieldRef} onSubmit={handleSubmit} className="mt-12 space-y-6">
              <Field label={contact.fields.name} name="name" delay={120} />
              <Field
                label={contact.fields.email}
                name="email"
                type="email"
                delay={180}
              />
              <Field
                label={contact.fields.subject}
                name="subject"
                delay={240}
                required={false}
              />
              <Field
                label={contact.fields.message}
                name="message"
                textarea
                delay={300}
              />

              <div
                className="field-enter flex flex-col gap-6 pt-2 sm:flex-row sm:items-center sm:justify-between"
                style={{ animationDelay: "360ms" }}
              >
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 font-tech text-[10px] uppercase tracking-widest text-on-surface-variant/60 transition-colors hover:text-tertiary"
                >
                  <Icon name="mail" size={14} />
                  {profile.email}
                </a>
                <button
                  type="submit"
                  className="scan-line glow-hover relative flex items-center justify-center gap-3 overflow-hidden rounded-lg bg-gradient-to-r from-inverse-primary to-secondary-container px-12 py-4 font-tech text-label font-bold uppercase tracking-widest text-white transition-transform hover:-translate-y-1"
                >
                  {contact.submit}
                  <Icon name="arrow-right" size={16} />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

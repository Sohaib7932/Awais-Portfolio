"use client";

import { useEffect, useRef, useState } from "react";
import { contact, profile } from "@/data/portfolio";
import { Icon } from "@/components/Icon";

type Status = "idle" | "sending" | "sent" | "error";

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
    "peer w-full border-b border-white/15 bg-transparent py-3 font-body text-body-md text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/30 focus:border-transparent disabled:opacity-50";

  return (
    <div
      className="field-enter relative"
      style={{ animationDelay: `${delay}ms` }}
    >
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
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          className={shared}
        />
      )}
      <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-primary via-tertiary to-transparent transition-transform duration-500 peer-focus:scale-x-100" />
    </div>
  );
}

export function ContactModal({ onClose }: { onClose: () => void }) {
  const [closing, setClosing] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const requestClose = () => {
    setClosing(true);
    setTimeout(onClose, 200);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    document.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    formRef.current?.querySelector("input")?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
          website: data.get("website"), // honeypot
        }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(json.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("sent");
    } catch {
      setError("Couldn't reach the server. Please check your connection.");
      setStatus("error");
    }
  };

  const sending = status === "sending";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
    >
      <div
        onClick={requestClose}
        className={`absolute inset-0 bg-black/70 backdrop-blur-md ${
          closing ? "backdrop-exit" : "backdrop-enter"
        }`}
      />

      <div
        className={`glass-panel relative z-10 max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl p-6 sm:p-10 ${
          closing ? "modal-exit" : "modal-enter"
        }`}
      >
        <div className="scan-beam" />

        <button
          type="button"
          onClick={requestClose}
          aria-label="Close contact form"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-on-surface-variant transition-all hover:border-primary/50 hover:text-primary sm:right-6 sm:top-6"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            ×
          </span>
        </button>

        {status === "sent" ? (
          <div className="flex flex-col items-center py-8 text-center sm:py-12">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-tertiary/40 bg-tertiary/10 text-tertiary">
              <Icon name="check" size={30} />
            </div>
            <h2 className="mb-3 font-display text-headline uppercase">
              Message Sent
            </h2>
            <p className="max-w-sm font-body text-body-md text-on-surface-variant">
              {contact.sent}
            </p>
            <button
              type="button"
              onClick={requestClose}
              className="mt-10 rounded-lg bg-primary px-10 py-3 font-tech text-label font-bold uppercase tracking-widest text-on-primary transition-transform hover:scale-105"
            >
              Close
            </button>
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

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-8 space-y-6 sm:mt-10"
            >
              <fieldset disabled={sending} className="space-y-6">
                {/* Hidden from people, catches bots */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />

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
              </fieldset>

              {status === "error" && (
                <p
                  role="alert"
                  className="rounded-lg border border-error/30 bg-error/10 px-4 py-3 font-body text-body-md text-error"
                >
                  {error}{" "}
                  <a
                    href={`mailto:${profile.email}`}
                    className="underline hover:text-primary"
                  >
                    Email directly instead
                  </a>
                  .
                </p>
              )}

              <div
                className="field-enter flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                style={{ animationDelay: "360ms" }}
              >
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-2 font-tech text-[10px] uppercase tracking-widest text-on-surface-variant/60 transition-colors hover:text-tertiary"
                >
                  <Icon name="mail" size={14} />
                  <span className="break-all">{profile.email}</span>
                </a>
                <button
                  type="submit"
                  disabled={sending}
                  className="scan-line glow-hover relative flex items-center justify-center gap-3 overflow-hidden rounded-lg bg-gradient-to-r from-inverse-primary to-secondary-container px-8 py-4 font-tech text-label font-bold uppercase tracking-widest text-white transition-transform hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:px-10"
                >
                  {sending ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      {contact.sending}
                    </>
                  ) : (
                    <>
                      {contact.submit}
                      <Icon name="arrow-right" size={16} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

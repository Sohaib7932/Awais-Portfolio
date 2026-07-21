import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* Sends the contact form straight to Awais's inbox over SMTP (Gmail).

   Required environment variable (see .env.example):
     SMTP_PASS  — a Gmail *App Password* (16 characters, no spaces).
                  Your normal Gmail password will NOT work; Google blocks it.
                  Create one at https://myaccount.google.com/apppasswords

   Optional (sensible defaults already set for Gmail):
     SMTP_HOST, SMTP_PORT, SMTP_USER, CONTACT_TO_EMAIL
*/

const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_USER = process.env.SMTP_USER || "awais.m4325@gmail.com";
const SMTP_PASS = process.env.SMTP_PASS;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || SMTP_USER;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/* Fallback used when no App Password is configured: FormSubmit forwards the
   message to TO_EMAIL without needing any credentials. It works instantly,
   but because the mail is sent by their servers (not your Gmail) it often
   lands in the spam folder — set SMTP_PASS to send from your own account. */
async function sendViaFormSubmit(fields: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const origin = process.env.SITE_ORIGIN || "http://localhost:3000";

  const res = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(TO_EMAIL)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        /* FormSubmit rejects requests without a browser-like origin */
        Origin: origin,
        Referer: `${origin}/`,
      },
      body: JSON.stringify({
        name: fields.name,
        email: fields.email,
        _subject: fields.subject
          ? `Portfolio: ${fields.subject}`
          : `Portfolio: new message from ${fields.name}`,
        _replyto: fields.email,
        _captcha: "false",
        _template: "table",
        message: fields.message,
      }),
    }
  );

  /* FormSubmit answers 200 even on failure — the real result is in the body. */
  const json = (await res.json().catch(() => ({}))) as {
    success?: string;
    message?: string;
  };

  if (json.success !== "true") {
    const detail = json.message || `FormSubmit responded ${res.status}`;
    const err = new Error(detail) as Error & { needsActivation?: boolean };
    err.needsActivation = /activat/i.test(detail);
    throw err;
  }

  return json;
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const subject = String(payload.subject ?? "").trim();
  const message = String(payload.message ?? "").trim();
  const honeypot = String(payload.website ?? "").trim();

  /* A bot filled the hidden field — pretend it worked and drop it. */
  if (honeypot) return NextResponse.json({ ok: true });

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email and message." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 }
    );
  }
  if (name.length > 100 || subject.length > 150 || message.length > 5000) {
    return NextResponse.json(
      { error: "That message is too long." },
      { status: 400 }
    );
  }

  /* No App Password yet → forward through FormSubmit so the form still works. */
  if (!SMTP_PASS) {
    try {
      await sendViaFormSubmit({ name, email, subject, message });
      console.warn(
        "Contact form sent via FormSubmit fallback. To deliver straight to your " +
          "inbox (instead of spam), set SMTP_PASS to a Gmail App Password."
      );
      return NextResponse.json({ ok: true, viaFallback: true });
    } catch (err) {
      const e = err as Error & { needsActivation?: boolean };
      console.error("FormSubmit fallback failed:", e.message);

      if (e.needsActivation) {
        console.error(
          `→ ACTION NEEDED: FormSubmit emailed an "Activate Form" link to ${TO_EMAIL}. ` +
            "Open that email (check spam) and click the link once — then the form works."
        );
        return NextResponse.json(
          {
            error:
              "The form isn't activated yet. Awais — check your inbox for the " +
              "'Activate Form' email and click the link once.",
          },
          { status: 503 }
        );
      }

      return NextResponse.json(
        {
          error:
            "Sorry — the message couldn't be sent. Please email directly.",
        },
        { status: 502 }
      );
    }
  }

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465, // 465 = implicit TLS, 587 = STARTTLS
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      /* Gmail requires the authenticated account as the sender, so the
         visitor's address goes in replyTo — hitting Reply just works. */
      from: `"${name} (Portfolio)" <${SMTP_USER}>`,
      to: TO_EMAIL,
      replyTo: `"${name}" <${email}>`,
      subject: subject
        ? `Portfolio: ${subject}`
        : `Portfolio: new message from ${name}`,
      text: `${message}\n\n—\nFrom: ${name}\nEmail: ${email}`,
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6">
          <h2 style="margin:0 0 16px">New message from your portfolio</h2>
          <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
          <hr style="border:none;border-top:1px solid #ddd;margin:24px 0" />
          <p style="margin:0"><strong>From:</strong> ${escapeHtml(name)}</p>
          <p style="margin:0"><strong>Email:</strong>
            <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error("SMTP send failed:", detail);

    /* Bad credentials are by far the most common cause — say so clearly
       in the server log so it's easy to fix. */
    if (/invalid login|username and password|535|534/i.test(detail)) {
      console.error(
        "→ Gmail rejected the login. SMTP_PASS must be a 16-character App Password " +
          "from https://myaccount.google.com/apppasswords (not your normal password)."
      );
    }

    return NextResponse.json(
      { error: "Sorry — the message couldn't be sent. Please email directly." },
      { status: 502 }
    );
  }
}

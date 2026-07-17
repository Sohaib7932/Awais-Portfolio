import { NextResponse } from "next/server";

/* Sends the contact form straight to Awais's inbox via Resend.
   Uses the REST API directly so there's no extra dependency to install.

   Required environment variable (see .env.example):
     RESEND_API_KEY   — from https://resend.com/api-keys
   Optional:
     CONTACT_TO_EMAIL   — defaults to Awais's address
     CONTACT_FROM_EMAIL — defaults to Resend's shared sending address
*/

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "awais.m4325@gmail.com";
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "Email sending isn't set up yet. Please use the direct email address below.",
      },
      { status: 503 }
    );
  }

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

  const finalSubject = subject
    ? `Portfolio: ${subject}`
    : `Portfolio: new message from ${name}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: finalSubject,
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
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend failed:", res.status, detail);
      return NextResponse.json(
        { error: "Sorry — the message couldn't be sent. Please email directly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Sorry — the message couldn't be sent. Please email directly." },
      { status: 502 }
    );
  }
}

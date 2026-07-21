# Muhammad Awais — Portfolio

Portfolio site for Muhammad Awais, 3D Animator & Game Developer.
Built with Next.js 16 (App Router), React 19 and Tailwind CSS v4.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form — how it delivers

Messages go to **awais.m4325@gmail.com**. There are two modes:

| Mode | Setup | Where mail lands |
|---|---|---|
| **FormSubmit** (default) | one activation click | usually **spam** |
| **Gmail SMTP** | add `SMTP_PASS` | **inbox** ✅ |

### Mode 1 — works now, no password

FormSubmit has already emailed an **"Activate Form"** link to
awais.m4325@gmail.com. Open it (check the spam folder) and click the link
**once** — after that the form forwards messages.

Because FormSubmit sends from *their* servers rather than your Gmail, those
emails commonly land in spam. Marking one "Not spam" helps, but the real
fix is Mode 2.

### Mode 2 — recommended, lands in your inbox

> **The email address alone is not enough** — SMTP has to log in to Gmail.
> Google blocks normal passwords for apps, so you need an **App Password**.

**Setup (about 2 minutes):**

1. Turn on 2-Step Verification for the account (required by Google):
   <https://myaccount.google.com/signinoptions/two-step-verification>
2. Go to <https://myaccount.google.com/apppasswords>
3. Type any name (e.g. `Portfolio`) → **Create**
4. Google shows a 16-character code like `abcd efgh ijkl mnop`
5. Copy `.env.example` to `.env.local` and paste it **without spaces**:
   ```
   SMTP_PASS=abcdefghijklmnop
   ```
6. Restart the dev server (`npm run dev`) and send yourself a test message

Replies work naturally: the email arrives from your own address with the
visitor set as **Reply-To**, so hitting Reply goes straight back to them.

> When deploying (e.g. Vercel), add `SMTP_PASS` in the host's
> **Environment Variables** settings. `.env.local` is git-ignored and is
> never uploaded.
>
> Using a different mail provider? Override `SMTP_HOST`, `SMTP_PORT` and
> `SMTP_USER` in `.env.local` — no code changes needed.

## Editing the content

Almost all text lives in one file: **`src/data/portfolio.ts`** — name, email,
hero copy, education, toolkit, projects, experience and footer.

To add real artwork to a project, drop the image into `public/` and set the
`image` field on that project, e.g. `image: "/my-reel.png"`.

## Structure

```
src/
├─ app/
│  ├─ page.tsx              home (hero, about, skills, projects)
│  ├─ work/ skills/ experience/   detail pages (top-nav routes)
│  ├─ api/contact/route.ts  sends the contact form email
│  ├─ layout.tsx            shared shell: shader, navs, footer
│  └─ globals.css           design tokens + effects
├─ components/              UI components
├─ data/portfolio.ts        ← all site content
└─ lib/accents.ts           accent colour maps
```

**Navigation:** the top navbar opens separate pages; the left sidebar only
scrolls between sections of the home page. On mobile both collapse into the
hamburger menu.

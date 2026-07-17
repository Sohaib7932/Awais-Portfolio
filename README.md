# Muhammad Awais — Portfolio

Portfolio site for Muhammad Awais, 3D Animator & Game Developer.
Built with Next.js 16 (App Router), React 19 and Tailwind CSS v4.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## ⚠️ Contact form — one setup step required

The contact form emails **awais.m4325@gmail.com** directly. It needs a free
API key before it will actually send. Until then, the form shows a message
asking visitors to email directly (it won't fail silently).

**Setup (about 2 minutes):**

1. Sign up at [resend.com](https://resend.com) using **awais.m4325@gmail.com**
2. Verify the email address
3. Go to [resend.com/api-keys](https://resend.com/api-keys) → **Create API Key** → copy it
4. In the project root, copy `.env.example` to `.env.local` and paste the key:
   ```
   RESEND_API_KEY=re_your_key_here
   ```
5. Restart the dev server (`npm run dev`)

Send yourself a test message to confirm.

> Without a custom domain, Resend only delivers to the address you signed up
> with — which is exactly what's needed here.
>
> When deploying (e.g. Vercel), add `RESEND_API_KEY` in the host's
> **Environment Variables** settings. `.env.local` is git-ignored and is
> never uploaded.

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

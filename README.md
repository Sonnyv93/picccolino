# Piccolino Italian Kitchen — Website

Dark, cinematic single-page site for the family restaurant in Toms River, NJ.
Built with **Next.js 14 (App Router) · Tailwind CSS · GSAP + ScrollTrigger · Framer Motion · Lenis**.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## 🎥 Add your hero video

Drop your food footage at:

```
public/video/hero.mp4
```

That's the only step — the hero picks it up automatically. Export tips are in
`public/video/DROP-YOUR-HERO-VIDEO-HERE.md` (short version: 1080p H.264, no
audio, 10–20s loop, under ~15 MB).

## ✏️ Everyday edits

| What | Where |
|---|---|
| Menu items & prices | `src/data/menu.json` |
| Hours, phone, address, socials | `src/data/site.ts` |
| Photos | swap files in `public/placeholder/` (or point components at new paths) |
| Story text | `src/components/About.tsx` |

> ⚠️ The phone number in `src/data/site.ts` is a placeholder — put the real one in before launch.

## 🚀 Deploy to Vercel (GitHub → Vercel)

1. **Push to GitHub**

   ```bash
   cd piccolino-site
   git add -A
   git commit -m "Piccolino site"
   ```

   Create a repo on GitHub (https://github.com/new, name it `piccolino-site`,
   keep it private if you want), then:

   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/piccolino-site.git
   git branch -M main
   git push -u origin main
   ```

   (Or with the GitHub CLI: `gh repo create piccolino-site --private --source=. --push`)

2. **Import into Vercel**
   - Go to https://vercel.com/new and sign in **with GitHub**
   - Click **Import** next to `piccolino-site`
   - Vercel auto-detects Next.js — don't change any settings
   - Click **Deploy**

3. **Done.** You get a live `piccolino-site.vercel.app` URL. Every `git push`
   to `main` redeploys automatically.

4. **Custom domain (optional):** In the Vercel project → **Settings → Domains**,
   add e.g. `piccolinotomsriver.com` and follow the DNS instructions Vercel shows
   (usually one A record + one CNAME at your domain registrar).

## Notes

- Smooth scrolling (Lenis) and all scroll animations are automatically disabled
  for visitors with "reduce motion" enabled.
- Animations use transform/opacity only, so everything stays at 60fps.
- The contact form is UI-only for now — it doesn't send anywhere yet. Easy
  upgrades later: [Formspree](https://formspree.io), [Resend](https://resend.com),
  or a Next.js API route.

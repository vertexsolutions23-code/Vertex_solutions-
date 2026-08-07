# Vertex Solutions — Website (React + Vite)

Premium black &amp; gold corporate website for **Vertex Solutions** (Tax Advisory &amp;
Business Consulting, founded by CA Abhishek Agarwal, Jaipur), built as a proper
React + Vite project — the same one you'd get from `npm create vite@latest`.

## Run it

```bash
npm install       # install dependencies (first time only)
npm run dev       # start local dev server with hot reload
npm run build     # production build → outputs to /dist
npm run preview   # preview the production build locally
```

After `npm run build`, everything the browser needs is in the **`dist/`** folder —
upload that folder to any static host (Netlify, Vercel, Hostinger, cPanel, etc.)
and the site is live.

## Before you deploy — two things to update

1. **Google Form link** — open `src/data/constants.js` and replace
   `GOOGLE_FORM_URL` with your real Google Form link. Every "Free Consultation" /
   "Book Appointment" button across all 19 pages reads from this one constant.
2. **Logo** — the header currently uses an inline gold "apex" mark
   (`src/components/Icons.jsx` → `LogoMark`). Drop your real logo file into
   `public/` and swap the `<LogoMark />` usages in `Header.jsx` / `Footer.jsx`
   for an `<img src="/your-logo.png" />` once you share the actual file.

## Project structure

```
src/
  main.jsx              → app entry
  App.jsx                → all routes (React Router)
  index.css              → global design system (black & gold, glassmorphism)
  components/            → Header, Footer, FabStack (WhatsApp/Call/Top),
                            FAQ accordion, Counter, Reveal (scroll animation),
                            and shared page building-blocks (PageBits.jsx)
  data/                   → all site content lives here, not hardcoded in JSX
    constants.js          → phone, address, WhatsApp link, Google Form URL
    services.js            → full content for all 9 service detail pages
    homeData.js             → home page services/industries/testimonials/FAQs/blog data
  pages/                  → one component per route (Home, About, Services,
                            ServiceDetail, Blogs, Faqs, Contact, Privacy,
                            Terms, Sitemap, NotFound)
```

## Pages / routes

`/`, `/about`, `/services`, `/tax-advisory`, `/gst-services`,
`/company-registration`, `/startup-india`, `/trademark-registration`,
`/iso-certification`, `/digital-signature-certificate`,
`/government-subsidy`, `/business-advisory`, `/blogs`, `/faqs`, `/contact`,
`/privacy-policy`, `/terms-conditions`, `/sitemap`, plus a catch-all 404.

## Notes for deployment

This is a client-side single-page app (SPA). Most static hosts (Netlify,
Vercel, Cloudflare Pages) handle this automatically. If you deploy to a plain
Apache/Nginx server, add a rewrite rule so unknown paths fall back to
`index.html` (otherwise a hard refresh on e.g. `/contact` will 404).

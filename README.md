# Best of India (BOI) Paris — Indian Catering Landing Page

A dedicated, bilingual (French & English), high-conversion Indian Catering landing page for **Best of India (BOI), Paris** (170 Rue du Faubourg Saint-Denis, 75010 Paris, France). Designed primarily for Google Search Ads traffic and organic high-intent discovery.

---

## 🌟 Highlights & Features

- **Art-Directed Hospitality Editorial Design:** Warm ivory (`#F8F4EC`), deep olive (`#4D5720`), warm saffron (`#FFC451`), and high-conversion orange CTA (`#F15A34`), using Manrope and Cormorant Garamond typography.
- **Strict Bilingual Support (FR & EN):**
  - French (default for France visitors): `/fr/traiteur-indien-paris`
  - English: `/en/indian-catering-paris`
  - Localized thank-you pages: `/fr/merci-demande-traiteur` & `/en/catering-thank-you`
- **Official Brand Identity:** Preserves the exact Best of India logo without modification (`boi-logo.png` & `boi-logo-white.png`).
- **10-Section Conversion Architecture:**
  1. Sticky navigation header with instant FR/EN switcher & quote CTA.
  2. Hero with catering positioning, trust badges, and prominent lead enquiry form.
  3. Authority numbers strip (`50+`, `100+`, `5M+`).
  4. The Story Behind the Flavours (authentic South Indian & Chettinad culinary heritage).
  5. Who We Serve (6 bespoke event categories: Weddings, Corporate, Engagements, Receptions, Baby Showers, Birthdays).
  6. Customer testimonials & culinary reviews.
  7. Sample catering menu with interactive tabs (Starters, Curries, Biryanis, Sweets) & dietary tags.
  8. Why Choose Best of India (2x2 differentiator grid).
  9. Final full enquiry section with 10-field form, interactive Google Maps location, direct contact, & WhatsApp.
  10. Branded footer with legal mentions, privacy policy modal, and social channels.
- **Persistent Global CRO Elements:**
  - Floating WhatsApp click-to-chat button (`wa.me/33140050606`).
  - Mobile bottom sticky CTA bar (`Call` + `Request Quote`).
  - Back-to-top button.
  - GDPR Cookie Consent banner with Google Consent Mode v2 support.
- **Production Lead Capture Backend:**
  - Handled via `POST /api/lead`.
  - Bot honeypot protection (`website` invisible field trap).
  - In-memory rate limiting per IP (5 requests per 10 minutes).
  - Dual persistent storage (individual JSON in `data/leads/{id}.json` and daily append-only `leads-YYYY-MM-DD.jsonl`).
  - Optional CRM/webhook integration via `LEAD_WEBHOOK_URL`.
- **SEO & Search Advertising Ready:**
  - Dynamic canonical and `hreflang` tags.
  - OpenGraph and Twitter card previews.
  - Schema.org JSON-LD (`Restaurant`, `FoodEstablishment`, `OfferCatalog`, `LocalBusiness`).
  - Dynamic `robots.ts` and `sitemap.ts`.

---

## 🛠 Tech Stack

- **Framework:** Next.js 16 (App Router with Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`)
- **Icons:** Lucide React
- **Validation:** Zod

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/heliocenture-hue/Best-of-India-Catering.git
cd Best-of-India-Catering
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local` and adjust as needed:

```bash
cp .env.example .env.local
```

Key variables:
- `NEXT_PUBLIC_SITE_URL`: Production domain URL (e.g. `https://traiteur.bestofindiaparis.com`).
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: Direct WhatsApp number (digits only, e.g. `33140050606`).
- `LEAD_NOTIFICATION_EMAIL`: Primary catering team inbox (`info@bestofindiaparis.com`).
- `LEAD_WEBHOOK_URL`: Optional Zapier / Make / CRM webhook endpoint.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` & `NEXT_PUBLIC_GTM_ID`: Google Analytics 4 & Tag Manager.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

---

## 📁 Repository Structure

```
├── app/
│   ├── api/lead/         # Lead submission API with honeypot & rate-limiting
│   ├── en/               # English catering landing page & thank-you page
│   ├── fr/               # French catering landing page & thank-you page
│   ├── globals.css       # Tailwind CSS v4 theme & typography tokens
│   ├── layout.tsx        # Root HTML layout with Google Consent Mode
│   ├── page.tsx          # Root redirect to /fr/traiteur-indien-paris
│   ├── robots.ts         # Search engine crawler directives
│   └── sitemap.ts        # XML sitemap generator
├── components/           # Modular UI components (Header, Hero, Forms, Menu, etc.)
├── data/leads/           # Persistent local lead logs (gitignored)
├── lib/
│   ├── analytics.ts      # GA4/GTM conversion event helpers
│   ├── config.ts         # Brand contact info, opening hours, coordinates
│   ├── i18n/             # Complete bilingual French/English translation dictionary
│   └── leadService.ts    # Lead validation, persistence & webhook delivery
└── public/
    └── images/           # High-resolution optimized WebP assets & BOI logos
```

---

## 📄 License & Ownership

Proprietary. All rights reserved by **Best of India (BOI) Paris**.

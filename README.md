# Best of India (BOI) Paris — Indian Catering Landing Page

A dedicated, bilingual (French & English), high-conversion Indian Catering landing page for **Best of India (BOI), Paris** (170 Rue du Faubourg Saint-Denis, 75010 Paris, France). Designed to match the editorial, airy aesthetic of Ruby's Catering with Athelas typography and zero UI frameworks.

---

## 🌟 Highlights & Features

- **Art-Directed Editorial Layout:** Warm sand (`#EFE3D0`), soft page grey (`#F4F4F4`), and deep rust accents (`#984421`).
- **Typography:** Athelas serif headings with elegant Mrs Saint Delafield script eyebrows and clean Ubuntu / Montserrat body type.
- **Strict Bilingual Support (FR & EN):**
  - French (default): `/`
  - English: `/en/`
  - Legal notices: `/mentions-legales` & `/en/legal-notice`
  - Privacy policy: `/politique-confidentialite` & `/en/privacy-policy`
- **12-Section Architecture:**
  1. Sticky editorial header with slide-out navigation panel and FR/EN language toggle.
  2. Hero with catering positioning, phone contact, and direct quote CTA.
  3. Title Card Intro with script eyebrow overlap.
  4. The Story Behind the Flavours (South Indian & Chettinad culinary heritage).
  5. Who We Serve (6 bespoke event categories).
  6. Customer testimonials carousel with verified reviews and quote styling.
  7. Interactive full-width culinary photo gallery.
  8. Sample catering menu panel with direct quote trigger.
  9. Why Choose Best of India (4 key differentiators).
  10. Final full enquiry section with 10-field quote form.
  11. Interactive Google Maps location embed.
  12. Branded footer with legal links, contact information, and social channels.
- **Persistent CRO Elements:**
  - Floating WhatsApp click-to-chat button.
  - Mobile bottom sticky CTA bar (`Appeler` + `Devis`).
  - Scroll-to-top button.

---

## 🛠 Tech Stack

- **Framework:** Astro 5 (Static Site Generator)
- **Styling:** Vanilla CSS with custom design tokens
- **Typography:** Self-hosted Athelas (Serif) & Google Fonts (Montserrat, Ubuntu, Mrs Saint Delafield)
- **Deployment:** Zero-config static output (`dist/`) compatible with Vercel, Netlify, Cloudflare Pages, or any web host.

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm run preview
```

The static HTML, CSS, fonts, and assets are generated in `dist/`.

---

## 📁 Repository Structure

```
├── astro.config.mjs     # Astro static configuration
├── dist/                # Production build output
├── public/              # Static assets (fonts, images, logo)
├── src/
│   ├── components/      # Reusable Astro components (Header, Hero, Contact, etc.)
│   ├── config.ts        # Central brand configuration & contact info
│   ├── data/            # Local data files (testimonials, menus)
│   ├── i18n/            # Bilingual translation dictionaries (fr.json, en.json)
│   ├── layouts/         # Base HTML layout
│   ├── pages/           # Astro page routes (/, /en/, /mentions-legales, etc.)
│   └── styles/          # Global styles, variables, & Athelas font-face declarations
└── tsconfig.json        # Astro TypeScript configuration
```

---

## 📄 License & Ownership

Proprietary. All rights reserved by **Best of India (BOI) Paris**.

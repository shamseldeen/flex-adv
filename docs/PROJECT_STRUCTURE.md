# 🗂️ هيكل المشروع — Project Structure

## نظرة عامة — Overview

هذا المشروع عبارة عن **Monorepo** يحتوي على ثلاثة artifacts رئيسية:

| المجلد | النوع | الوصف |
|--------|-------|-------|
| `artifacts/flex-adv` | React/TypeScript | الواجهة الأمامية (Vite) |
| `artifacts/flex-php` | PHP 8.2 | نسخة مرآة للـ cPanel |
| `artifacts/api-server` | Node.js/Express | API Server + PostgreSQL |
| `lib/` | Shared Libraries | مكتبات مشتركة |

---

## 📁 artifacts/flex-adv — React Frontend

```
artifacts/flex-adv/
├── index.html                    # HTML entry point
├── package.json                  # Dependencies & scripts
├── vite.config.ts                # Vite configuration
├── tailwind.config.ts            # Tailwind CSS config
├── tsconfig.json                 # TypeScript config
├── components.json               # shadcn/ui config
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── clients/              # 72 client logos (PNG)
│       │   ├── brand/            # Branded logos (aramco, shell, samsung…)
│       │   ├── transparent/      # Transparent PNG logos
│       │   └── client_01…32.png # Numbered client images
│       └── portfolio/            # 786 portfolio project images
└── src/
    ├── main.tsx                  # App entry point
    ├── App.tsx                   # Router + LanguageProvider
    ├── index.css                 # Global styles + Tailwind
    ├── contexts/
    │   └── LanguageContext.tsx   # AR/EN language switcher
    ├── hooks/
    │   ├── use-mobile.tsx        # Responsive breakpoint hook
    │   └── use-toast.ts          # Toast notifications
    ├── lib/
    │   └── utils.ts              # clsx/twMerge utility
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx        # Navigation bar (AR/EN, mobile menu)
    │   │   └── Footer.tsx        # Site footer
    │   ├── CallButton.tsx        # Floating call button
    │   ├── WhatsAppButton.tsx    # Floating WhatsApp button
    │   ├── FloatingButtons.tsx   # Combined floating actions
    │   ├── ScrollToTop.tsx       # Auto scroll on page change
    │   ├── SectionDots.tsx       # Page section indicators
    │   ├── Logo.tsx              # Company logo component
    │   ├── ClientsMarquee.tsx    # Auto-scrolling client logos
    │   ├── CaseStudySection.tsx  # Featured case studies
    │   ├── GalleryPreviewSection.tsx  # Gallery preview grid
    │   ├── ProjectShowcaseSection.tsx # Portfolio highlights
    │   ├── WorkPreviewSection.tsx     # Work samples preview
    │   └── ui/                   # shadcn/ui components (40+)
    └── pages/
        ├── home.tsx              # الرئيسية — Homepage
        ├── about.tsx             # من نحن — About Us
        ├── services.tsx          # خدماتنا — Services
        ├── portfolio.tsx         # أعمالنا — Portfolio
        ├── gallery.tsx           # معرض الصور — Gallery
        ├── contact.tsx           # تواصل معنا — Contact
        └── not-found.tsx         # 404 page
```

---

## 📁 artifacts/flex-php — PHP Mirror Site

```
artifacts/flex-php/
├── server.js                     # Node.js proxy (port 3002→3102)
├── router.php                    # PHP built-in server router
├── config.php                    # Site config + constants
├── start.sh                      # Start script
├── package.json                  # Node.js dependencies
├── api/
│   ├── contact.php               # Contact form handler (POST)
│   ├── health.php                # Health check endpoint
│   └── set-lang.php              # Language switcher (AR/EN)
├── includes/
│   ├── db.php                    # Dual-driver PDO (MySQL + PostgreSQL)
│   ├── header.php                # Shared HTML header + navigation
│   ├── footer.php                # Shared HTML footer
│   └── lang.php                  # AR/EN translations array
├── public/
│   ├── index.php                 # الرئيسية — Homepage
│   ├── about.php                 # من نحن — About Us
│   ├── services.php              # خدماتنا — Services (12 services)
│   ├── portfolio.php             # أعمالنا — Portfolio (34 items)
│   ├── gallery.php               # معرض الصور — Gallery (464 items)
│   ├── contact.php               # تواصل معنا — Contact form
│   ├── img.php                   # Image proxy + AVIF conversion + cache
│   ├── 404.php                   # Custom 404 page
│   ├── 500.php                   # Custom 500 page
│   ├── robots.txt                # SEO robots file
│   ├── sitemap.xml               # XML sitemap
│   ├── .htaccess                 # Apache URL rewriting
│   └── assets/
│       ├── css/
│       │   └── style.css         # Complete site styles (RTL/LTR)
│       └── js/
│           └── main.js           # Client-side JS (menu, gallery, forms)
└── images/
    ├── logos/                    # 128 client logo files
    └── portfolio/                # 786 portfolio images
```

---

## 📁 artifacts/api-server — Node.js API

```
artifacts/api-server/
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts                  # Server entry (Express listen)
    ├── app.ts                    # Express app setup + middleware
    ├── lib/
    │   ├── logger.ts             # Winston logger
    │   └── seed.ts               # DB seed script
    └── routes/
        ├── index.ts              # Route aggregator
        ├── health.ts             # GET /api/healthz
        ├── services.ts           # GET /api/services
        ├── portfolio.ts          # GET /api/portfolio, /api/portfolio/:id
        ├── clients.ts            # GET /api/clients
        ├── gallery.ts            # GET /api/gallery
        ├── contact.ts            # POST /api/contact
        └── stats.ts              # GET /api/stats
```

---

## 📁 lib/ — Shared Libraries

```
lib/
├── db/                           # Database layer (Drizzle ORM)
│   ├── drizzle.config.ts
│   └── src/
│       ├── index.ts
│       └── schema/
│           ├── clients.ts        # Clients table schema
│           ├── portfolio.ts      # Portfolio table (JSONB gallery)
│           ├── services.ts       # Services table (AR/EN)
│           ├── gallery.ts        # Gallery table (464 items)
│           ├── contacts.ts       # Contact submissions
│           └── index.ts
├── api-spec/                     # OpenAPI 3.1 specification
│   ├── openapi.yaml              # Full API spec (8 endpoints)
│   └── orval.config.ts           # Code generation config
├── api-client-react/             # Auto-generated React Query hooks
│   └── src/
│       ├── custom-fetch.ts
│       └── generated/
│           ├── api.ts            # React Query hooks
│           └── api.schemas.ts    # TypeScript types
└── api-zod/                      # Auto-generated Zod validators
    └── src/
        └── generated/
            ├── api.ts            # Zod API functions
            └── types/            # Zod schemas per entity
                ├── service.ts
                ├── portfolioItem.ts
                ├── client.ts
                ├── galleryItem.ts
                ├── contactInput.ts
                └── siteStats.ts
```

---

## 🗄️ قاعدة البيانات — Database Schema

```sql
-- PostgreSQL (Drizzle ORM)

clients     (id, name_ar, name_en, logo_url, category, sort_order)
            → 72 rows

portfolio   (id, title_ar, title_en, category, description_ar,
             description_en, cover_image, gallery JSONB, year, client)
            → 34 rows

services    (id, title_ar, title_en, description_ar, description_en,
             icon, sort_order)
            → 12 rows

gallery     (id, image_url, title, category, service, year, sort_order)
            → 464 rows

contacts    (id, name, email, phone, message, created_at)
            → submissions table
```

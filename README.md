# Dental Clinic Website — Handover Documentation

A production-ready dental clinic website built for the Pakistani local
market with **Next.js (App Router) + TypeScript + Tailwind CSS**,
content managed through **Sanity CMS**, and media delivered through
**Cloudinary**. There is no custom database and no fake admin panel —
the real Sanity Studio (embedded at `/studio`) *is* the CMS.

---

## 1. Tech Stack

| Layer          | Technology                          |
|----------------|--------------------------------------|
| Framework      | Next.js 14 (App Router, Server Components) |
| Language       | TypeScript                          |
| Styling        | Tailwind CSS                        |
| CMS            | Sanity (embedded Studio at `/studio`) |
| Media storage  | Cloudinary                          |
| Email          | Nodemailer (SMTP)                   |
| Validation     | Zod (server + client)               |
| Icons          | lucide-react                        |
| Hosting        | Vercel (or any Node-compatible host) |

---

## 2. Project Structure

```
app/                    Routes (App Router)
  services/[slug]/      Dynamic service detail pages
  studio/[[...tool]]/   Embedded real Sanity Studio
  api/appointment/      Appointment request handler (emails the clinic)
components/             Reusable UI, organized by domain
src/
  sanity/               Sanity client, GROQ queries, Cloudinary URL builder
  config/                Non-content site config (site URL, nav links)
  types/                 Shared TypeScript types
  lib/                    Validation schema, WhatsApp link builder
sanity/
  schemas/               All Sanity document/object schemas
  structure.ts            Custom Studio desk structure (singletons pinned)
```

---

## 3. First-Time Setup

### 3.1 Install dependencies
```bash
npm install
```

### 3.2 Create a Sanity project
1. Go to [sanity.io/manage](https://www.sanity.io/manage) and create a
   new project (or run `npx sanity init` from this folder and choose
   "use existing configuration").
2. Note your **Project ID** and **dataset name** (usually `production`).
3. Under **API → Tokens**, create a token with **Editor** or **Write**
   permissions — this becomes `SANITY_API_TOKEN`. Keep it secret;
   it is only ever used server-side (never in the browser).
4. Under **API → CORS Origins**, add your local (`http://localhost:3000`)
   and production URLs.

### 3.3 Create a Cloudinary account
1. Sign up at [cloudinary.com](https://cloudinary.com).
2. From the Dashboard, copy your **Cloud Name**, **API Key**, and
   **API Secret**.
3. Upload clinic media (doctor photos, service images, before/after
   pairs, testimonial photos) into folders that make sense, e.g.
   `clinic/doctors/`, `clinic/services/`, `clinic/before-after/`.
4. Copy each asset's **Public ID** (shown in the Media Library) — this
   is what gets pasted into the matching field in Sanity Studio.

### 3.4 Configure environment variables
```bash
cp .env.local.example .env.local
```
Fill in every value in `.env.local`. See the table in section 6 below
for what each one does and whether it's safe to expose publicly.

### 3.5 Run the app
```bash
npm run dev
```
- Website: http://localhost:3000
- CMS (Sanity Studio): http://localhost:3000/studio — log in with your
  Sanity account.

### 3.6 Seed starter content (recommended)
Instead of creating every document by hand, run:
```bash
npm run seed
```
This creates the **Clinic Information** and **Homepage** singletons
(with obvious `[bracketed placeholders]` to replace), the **6 initial
services** from the spec with generic, factual descriptions, and a
handful of general **FAQs**. It is idempotent — safe to re-run.

It deliberately does **not** create Doctors, Testimonials, or Before &
After cases — those must be real, so add them yourself in Studio once
the clinic provides them.

### 3.7 Finish adding content
In the Studio (`/studio`):
1. Open **Clinic Information** and replace every `[placeholder]` with
   real details.
2. Open **Homepage Content** and rewrite the placeholder copy in the
   clinic's own voice.
3. Add real photos (Cloudinary public IDs) to each seeded **Service**.
4. Add **Doctors**, **Before & After Cases**, and **Testimonials**
   (mark `published` only once clinic-approved).

Published changes appear on the live site automatically within about
a minute (ISR revalidation) — no redeploy needed for content changes.

---

## 4. Adding & Managing Content (for the clinic owner)

All day-to-day content lives in Sanity Studio at `/studio`. No code
changes are ever required for:

- **Doctors** — add/edit/remove, change photos, reorder via "Display Order".
- **Services** — add/edit/remove, change images, edit benefits/process/FAQs.
  New services do **not** require touching code — the `/services/[slug]`
  page is fully dynamic.
- **Before & After** — add cases with a before/after image pair; the
  comparison slider and lightbox work automatically.
- **Testimonials** — only mark `published: true` for testimonials the
  clinic has explicitly approved. Unpublished ones stay hidden.
- **FAQs** — shown on the homepage and, per-service, on service pages.
- **Clinic Information** — phone, WhatsApp, email, address, hours, map link.
- **Homepage Content** — hero text, "why choose us" cards, CTA copy.

To change an image anywhere on the site: upload the new file to
Cloudinary, copy its **Public ID**, and paste it into the relevant
field in Studio.

---

## 5. Deployment (Vercel)

1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import the repo in [vercel.com/new](https://vercel.com/new).
3. Add every variable from `.env.local` in the Vercel project's
   **Environment Variables** settings (Production + Preview).
4. Deploy. Set `NEXT_PUBLIC_SITE_URL` to the final production domain
   once it's known, then redeploy so metadata/sitemap URLs are correct.
5. Connect your custom domain under **Settings → Domains**.

**Account ownership:** Sanity, Cloudinary, Vercel, the domain
registrar, Google Search Console, Analytics, and Google Business
Profile should all be created under **client-owned accounts**. The
developer should be added as a collaborator, not the account owner.

---

## 6. Environment Variables Reference

| Variable | Public? | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Used for canonical URLs, sitemap, Open Graph. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Yes | Digits-only number used to build `wa.me` links. |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity project identifier (not secret). |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Usually `production`. |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Yes | Pin a GROQ API date, e.g. `2024-10-01`. |
| `SANITY_API_TOKEN` | **No — server only** | Write/editor token; never bundled to the browser. |
| `CLOUDINARY_CLOUD_NAME` | No* | Read server-side and embedded into resolved image URLs; never exposed as a raw client env var. |
| `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | **No — server only** | Reserved for future signed-upload features; not currently required for read-only delivery. |
| `EMAIL_SERVER_HOST/PORT/USER/PASSWORD` | **No — server only** | SMTP credentials used to email appointment requests. |
| `EMAIL_FROM` / `EMAIL_TO` | **No — server only** | Sender/recipient for appointment emails. |

\* Cloudinary's cloud name is not a secret by nature (it appears in
every public image URL), but this project still keeps it out of the
client-side JS bundle by resolving full image URLs on the server and
passing plain strings down to components.

---

## 7. WhatsApp Configuration

Set `NEXT_PUBLIC_WHATSAPP_NUMBER` to the clinic's WhatsApp Business
number, digits only, with country code (e.g. `923001234567` for a
Pakistani number `0300-1234567`). All "WhatsApp Us" buttons across the
site build a `wa.me` link with a contextual pre-filled message (e.g.
mentioning the specific service the visitor was viewing).

## 8. Email Configuration

The appointment form posts to `/api/appointment`, which validates the
submission server-side (Zod) and, if `EMAIL_SERVER_*` variables are
set, emails the request to `EMAIL_TO` via SMTP (Nodemailer). If email
sending fails or isn't configured, the patient is told plainly and
pointed to WhatsApp/phone instead — the UI never claims an email was
sent when it wasn't. There is intentionally no appointments database;
WhatsApp and phone remain the source of truth for actually confirming
a visit.

---

## 9. Production QA Checklist

Before going live, verify:

```bash
npm run lint
npm run build
```
Both must complete without errors. Also manually verify:

- [ ] All routes load: `/`, `/doctors`, `/services`, `/services/[slug]`,
      `/before-after`, `/testimonials`, `/appointment`, `/contact`,
      `/privacy`, `/terms`, `/studio`
- [ ] Sanity Studio loads at `/studio` and content edits appear on the
      live site within ~1 minute
- [ ] Cloudinary images render at every breakpoint with no broken images
- [ ] Appointment form: validation errors, successful submission, and
      the honesty of the success message (email sent vs. not) all work
- [ ] WhatsApp buttons open `wa.me` with the correct pre-filled message
- [ ] `tel:` links dial the configured clinic number
- [ ] Sitemap (`/sitemap.xml`) and robots (`/robots.txt`) resolve correctly
- [ ] Structured data (`Dentist`, `Service`, `FAQPage`) validates in
      Google's Rich Results Test
- [ ] Responsive at 320/375/390/430/768/820/1024/1280/1440/1920px —
      no horizontal scroll, no overlap
- [ ] Keyboard navigation reaches every interactive element; visible
      focus states throughout
- [ ] Before/After slider works via mouse, touch, and arrow keys
- [ ] Empty states (no testimonials yet, no before/after cases yet)
      render gracefully instead of blank/broken sections
- [ ] No secrets appear in browser dev tools / page source
- [ ] Lighthouse: strong scores on Performance, Accessibility, SEO

---

## 10. What's Code vs. What's CMS

**CMS-managed (Sanity):** clinic info, doctors, services, testimonials,
before/after cases, FAQs, homepage editable copy.

**Code-managed:** layout, design system, components, routing, form
validation, SEO implementation, security, and all business logic.
Normal content updates never require a code change or redeploy.

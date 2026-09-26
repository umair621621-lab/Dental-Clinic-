import { sanityClient } from './client';
import type {
  BeforeAfterCase,
  Clinic,
  Doctor,
  Faq,
  Homepage,
  Service,
  Testimonial,
} from '@/src/types';

// Revalidate CMS-driven pages periodically so editorial changes in
// Sanity show up on the live site without a manual redeploy.
export const CMS_REVALIDATE_SECONDS = 60;

const cloudinaryImageProjection = `{ publicId, alt }`;

/**
 * Wraps a Sanity fetch so a CMS outage or a not-yet-configured
 * project (missing/incorrect project id, network hiccup, etc.)
 * degrades to an empty/fallback value instead of crashing the page
 * or the production build. Errors are still logged for visibility.
 */
async function safeFetch<T>(promise: Promise<T>, fallback: T): Promise<T> {
  try {
    return await promise;
  } catch (error) {
    console.error('[sanity] Query failed, using fallback value.', error);
    return fallback;
  }
}

// ── Clinic (singleton) ───────────────────────────────────────────
const clinicQuery = /* groq */ `*[_type == "clinic"][0]{
  name,
  logo${cloudinaryImageProjection},
  description,
  phone,
  whatsapp,
  email,
  address,
  area,
  city,
  province,
  openingHours[]{ day, hours, closed },
  googleMapsUrl,
  googleMapsEmbedUrl,
  socialLinks[]{ platform, url },
  seo{ title, description, ogImage${cloudinaryImageProjection} }
}`;

export async function getClinic(): Promise<Clinic | null> {
  return safeFetch(
    sanityClient.fetch(clinicQuery, {}, {
      next: { revalidate: CMS_REVALIDATE_SECONDS, tags: ['clinic'] },
    }),
    null
  );
}

// ── Doctors ───────────────────────────────────────────────────────
const doctorFields = /* groq */ `{
  _id,
  name,
  "slug": slug.current,
  photo${cloudinaryImageProjection},
  qualifications,
  specialty,
  experienceYears,
  biography,
  languages,
  featured,
  order
}`;

export async function getDoctors(): Promise<Doctor[]> {
  return safeFetch(
    sanityClient.fetch(
      /* groq */ `*[_type == "doctor"] | order(order asc)${doctorFields}`,
      {},
      { next: { revalidate: CMS_REVALIDATE_SECONDS, tags: ['doctor'] } }
    ),
    []
  );
}

export async function getFeaturedDoctors(limit = 3): Promise<Doctor[]> {
  return safeFetch(
    sanityClient.fetch(
      /* groq */ `*[_type == "doctor" && featured == true] | order(order asc)[0...$limit]${doctorFields}`,
      { limit },
      { next: { revalidate: CMS_REVALIDATE_SECONDS, tags: ['doctor'] } }
    ),
    []
  );
}

// ── Services ──────────────────────────────────────────────────────
const serviceFields = /* groq */ `{
  _id,
  name,
  "slug": slug.current,
  shortDescription,
  fullDescription,
  heroImage${cloudinaryImageProjection},
  gallery[]${cloudinaryImageProjection},
  benefits,
  process[]{ step, description },
  faqs[]{ question, answer },
  featured,
  order,
  seo{ title, description, ogImage${cloudinaryImageProjection} }
}`;

export async function getServices(): Promise<Service[]> {
  return safeFetch(
    sanityClient.fetch(
      /* groq */ `*[_type == "service"] | order(order asc)${serviceFields}`,
      {},
      { next: { revalidate: CMS_REVALIDATE_SECONDS, tags: ['service'] } }
    ),
    []
  );
}

export async function getFeaturedServices(limit = 6): Promise<Service[]> {
  return safeFetch(
    sanityClient.fetch(
      /* groq */ `*[_type == "service" && featured == true] | order(order asc)[0...$limit]${serviceFields}`,
      { limit },
      { next: { revalidate: CMS_REVALIDATE_SECONDS, tags: ['service'] } }
    ),
    []
  );
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return safeFetch(
    sanityClient.fetch(
      /* groq */ `*[_type == "service" && slug.current == $slug][0]${serviceFields}`,
      { slug },
      { next: { revalidate: CMS_REVALIDATE_SECONDS, tags: ['service'] } }
    ),
    null
  );
}

export async function getServiceSlugs(): Promise<string[]> {
  return safeFetch(
    sanityClient.fetch(
      /* groq */ `*[_type == "service" && defined(slug.current)][].slug.current`
    ),
    []
  );
}

export async function getRelatedServices(
  currentSlug: string,
  limit = 3
): Promise<Service[]> {
  return safeFetch(
    sanityClient.fetch(
      /* groq */ `*[_type == "service" && slug.current != $currentSlug] | order(order asc)[0...$limit]${serviceFields}`,
      { currentSlug, limit },
      { next: { revalidate: CMS_REVALIDATE_SECONDS, tags: ['service'] } }
    ),
    []
  );
}

// ── Before & After ────────────────────────────────────────────────
const beforeAfterFields = /* groq */ `{
  _id,
  treatmentCategory,
  title,
  description,
  beforeImage${cloudinaryImageProjection},
  afterImage${cloudinaryImageProjection},
  videoPublicId,
  featured,
  order
}`;

export async function getBeforeAfterCases(): Promise<BeforeAfterCase[]> {
  return safeFetch(
    sanityClient.fetch(
      /* groq */ `*[_type == "beforeAfter"] | order(order asc)${beforeAfterFields}`,
      {},
      { next: { revalidate: CMS_REVALIDATE_SECONDS, tags: ['beforeAfter'] } }
    ),
    []
  );
}

export async function getFeaturedBeforeAfterCases(
  limit = 4
): Promise<BeforeAfterCase[]> {
  return safeFetch(
    sanityClient.fetch(
      /* groq */ `*[_type == "beforeAfter" && featured == true] | order(order asc)[0...$limit]${beforeAfterFields}`,
      { limit },
      { next: { revalidate: CMS_REVALIDATE_SECONDS, tags: ['beforeAfter'] } }
    ),
    []
  );
}

// ── Testimonials ──────────────────────────────────────────────────
const testimonialFields = /* groq */ `{
  _id,
  patientName,
  review,
  rating,
  photo${cloudinaryImageProjection},
  treatment,
  published,
  order
}`;

export async function getTestimonials(): Promise<Testimonial[]> {
  return safeFetch(
    sanityClient.fetch(
      /* groq */ `*[_type == "testimonial" && published == true] | order(order asc)${testimonialFields}`,
      {},
      { next: { revalidate: CMS_REVALIDATE_SECONDS, tags: ['testimonial'] } }
    ),
    []
  );
}

export async function getFeaturedTestimonials(
  limit = 6
): Promise<Testimonial[]> {
  return safeFetch(
    sanityClient.fetch(
      /* groq */ `*[_type == "testimonial" && published == true] | order(order asc)[0...$limit]${testimonialFields}`,
      { limit },
      { next: { revalidate: CMS_REVALIDATE_SECONDS, tags: ['testimonial'] } }
    ),
    []
  );
}

// ── FAQ ───────────────────────────────────────────────────────────
export async function getFaqs(): Promise<Faq[]> {
  return safeFetch(
    sanityClient.fetch(
      /* groq */ `*[_type == "faq" && published == true] | order(order asc){
        _id, question, answer, "relatedService": relatedService->name, order, published
      }`,
      {},
      { next: { revalidate: CMS_REVALIDATE_SECONDS, tags: ['faq'] } }
    ),
    []
  );
}

// ── Homepage (singleton) ─────────────────────────────────────────
export async function getHomepage(): Promise<Homepage | null> {
  return safeFetch(
    sanityClient.fetch(
      /* groq */ `*[_type == "homepage"][0]{
        heroHeadline,
        heroSubheadline,
        heroImage${cloudinaryImageProjection},
        introHeading,
        introBody,
        whyChooseUs[]{ icon, title, description },
        ctaHeading,
        ctaBody,
        seo{ title, description, ogImage${cloudinaryImageProjection} }
      }`,
      {},
      { next: { revalidate: CMS_REVALIDATE_SECONDS, tags: ['homepage'] } }
    ),
    null
  );
}

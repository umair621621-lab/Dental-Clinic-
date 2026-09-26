// ────────────────────────────────────────────────────────────────
// Shared content types. These mirror the shape of documents coming
// back from Sanity GROQ queries (see src/sanity/queries.ts).
// Media fields store a Cloudinary publicId; actual delivery URLs
// are built on demand via src/sanity/image.ts.
// ────────────────────────────────────────────────────────────────

export interface CloudinaryImage {
  publicId: string;
  alt: string;
}

export interface SeoFields {
  title?: string;
  description?: string;
  ogImage?: CloudinaryImage;
}

export interface OpeningHoursEntry {
  day: string;
  hours: string;
  closed?: boolean;
}

export interface Clinic {
  name: string;
  logo?: CloudinaryImage;
  description?: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  area: string;
  city: string;
  province: string;
  openingHours: OpeningHoursEntry[];
  googleMapsUrl: string;
  googleMapsEmbedUrl?: string;
  socialLinks?: { platform: string; url: string }[];
  seo?: SeoFields;
}

export interface Doctor {
  _id: string;
  name: string;
  slug: string;
  photo?: CloudinaryImage;
  qualifications: string[];
  specialty: string;
  experienceYears: number;
  biography: string;
  languages: string[];
  featured: boolean;
  order: number;
}

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export interface Service {
  _id: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  heroImage?: CloudinaryImage;
  gallery?: CloudinaryImage[];
  benefits: string[];
  process: { step: string; description: string }[];
  faqs: ServiceFaqItem[];
  featured: boolean;
  order: number;
  seo?: SeoFields;
}

export interface BeforeAfterCase {
  _id: string;
  treatmentCategory: string;
  title: string;
  description?: string;
  beforeImage: CloudinaryImage;
  afterImage: CloudinaryImage;
  videoPublicId?: string;
  featured: boolean;
  order: number;
}

export interface Testimonial {
  _id: string;
  patientName: string;
  review: string;
  rating: number;
  photo?: CloudinaryImage;
  treatment?: string;
  published: boolean;
  order: number;
}

export interface Faq {
  _id: string;
  question: string;
  answer: string;
  relatedService?: string;
  order: number;
  published: boolean;
}

export interface Homepage {
  heroHeadline: string;
  heroSubheadline: string;
  heroImage?: CloudinaryImage;
  introHeading: string;
  introBody: string;
  whyChooseUs: { icon: string; title: string; description: string }[];
  ctaHeading: string;
  ctaBody: string;
  seo?: SeoFields;
}

export interface AppointmentFormData {
  name: string;
  phone: string;
  email: string;
  serviceId?: string;
  doctorId?: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}

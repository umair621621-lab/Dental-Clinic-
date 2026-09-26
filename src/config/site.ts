/**
 * Non-content, code-managed configuration. Actual clinic details
 * (name, address, hours, etc.) live in Sanity — this file only
 * holds values that legitimately belong in code: the public site
 * URL and defaults used before CMS data has loaded (e.g. metadata
 * fallback during build).
 */
export const siteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  defaultTitle: 'Dental Clinic',
  defaultDescription:
    'Modern, patient-first dental care. Book your appointment today.',
  locale: 'en_PK',
};

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/doctors', label: 'Doctors' },
  { href: '/before-after', label: 'Before & After' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/contact', label: 'Contact' },
];

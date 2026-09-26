import { cloudinaryImage, openingHoursEntry, seoFields } from './objects';
import { clinic } from './clinic';
import { doctor } from './doctor';
import { service } from './service';
import { beforeAfter } from './beforeAfter';
import { testimonial } from './testimonial';
import { faq } from './faq';
import { homepage } from './homepage';

export const schemaTypes = [
  // Reusable objects first
  cloudinaryImage,
  seoFields,
  openingHoursEntry,
  // Singletons
  clinic,
  homepage,
  // Collections
  doctor,
  service,
  beforeAfter,
  testimonial,
  faq,
];

import type { StructureResolver } from 'sanity/structure';
import {
  Building2,
  Home,
  Stethoscope,
  Sparkles,
  Images,
  Quote,
  HelpCircle,
} from 'lucide-react';

/**
 * Custom desk structure: "clinic" and "homepage" are singletons
 * (exactly one document, no create/delete), everything else is a
 * normal, editable collection.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Clinic Information')
        .icon(Building2)
        .child(
          S.document().schemaType('clinic').documentId('clinic').title('Clinic Information')
        ),
      S.listItem()
        .title('Homepage Content')
        .icon(Home)
        .child(
          S.document().schemaType('homepage').documentId('homepage').title('Homepage Content')
        ),
      S.divider(),
      S.listItem().title('Doctors').icon(Stethoscope).child(S.documentTypeList('doctor').title('Doctors')),
      S.listItem().title('Services').icon(Sparkles).child(S.documentTypeList('service').title('Services')),
      S.listItem().title('Before & After Cases').icon(Images).child(S.documentTypeList('beforeAfter').title('Before & After Cases')),
      S.listItem().title('Testimonials').icon(Quote).child(S.documentTypeList('testimonial').title('Testimonials')),
      S.listItem().title('FAQs').icon(HelpCircle).child(S.documentTypeList('faq').title('FAQs')),
    ]);

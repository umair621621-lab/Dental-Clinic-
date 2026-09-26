import { defineType, defineField } from 'sanity';
import { Home } from 'lucide-react';

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage Content',
  type: 'document',
  icon: Home,
  fields: [
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'heroSubheadline', title: 'Hero Subheadline', type: 'text', rows: 2 }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'cloudinaryImage' }),
    defineField({ name: 'introHeading', title: 'Clinic Introduction — Heading', type: 'string' }),
    defineField({ name: 'introBody', title: 'Clinic Introduction — Body', type: 'text', rows: 5 }),
    defineField({
      name: 'whyChooseUs',
      title: 'Why Choose Us',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: 'Icon name (lucide-react)', type: 'string', description: 'e.g. ShieldCheck, Smile, Clock' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
          ],
        },
      ],
      validation: (R) => R.max(6),
    }),
    defineField({ name: 'ctaHeading', title: 'Appointment CTA — Heading', type: 'string' }),
    defineField({ name: 'ctaBody', title: 'Appointment CTA — Body', type: 'text', rows: 2 }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoFields' }),
  ],
  preview: {
    select: { title: 'heroHeadline' },
  },
});

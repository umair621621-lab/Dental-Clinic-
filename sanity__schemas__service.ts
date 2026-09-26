import { defineType, defineField } from 'sanity';
import { Sparkles } from 'lucide-react';

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: Sparkles,
  fields: [
    defineField({ name: 'name', title: 'Service Name', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'text', rows: 2, validation: (R) => R.required().max(200) }),
    defineField({ name: 'fullDescription', title: 'Full Description', type: 'text', rows: 8, validation: (R) => R.required() }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'cloudinaryImage', validation: (R) => R.required() }),
    defineField({ name: 'gallery', title: 'Gallery', type: 'array', of: [{ type: 'cloudinaryImage' }] }),
    defineField({ name: 'benefits', title: 'Benefits', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'process',
      title: 'Treatment Process',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'step', title: 'Step Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
          ],
        },
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text', rows: 3 },
          ],
        },
      ],
    }),
    defineField({ name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoFields' }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'shortDescription', media: 'heroImage' },
  },
});

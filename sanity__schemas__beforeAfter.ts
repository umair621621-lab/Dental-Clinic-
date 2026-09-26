import { defineType, defineField } from 'sanity';
import { Images } from 'lucide-react';

export const beforeAfter = defineType({
  name: 'beforeAfter',
  title: 'Before & After Case',
  type: 'document',
  icon: Images,
  fields: [
    defineField({ name: 'treatmentCategory', title: 'Treatment Category', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'title', title: 'Case Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'beforeImage', title: 'Before Image', type: 'cloudinaryImage', validation: (R) => R.required() }),
    defineField({ name: 'afterImage', title: 'After Image', type: 'cloudinaryImage', validation: (R) => R.required() }),
    defineField({
      name: 'videoPublicId',
      title: 'Optional Video (Cloudinary Public ID)',
      type: 'string',
    }),
    defineField({ name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'treatmentCategory', media: 'afterImage' },
  },
});

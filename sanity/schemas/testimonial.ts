import { defineType, defineField } from 'sanity';
import { Quote } from 'lucide-react';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: Quote,
  fields: [
    defineField({ name: 'patientName', title: 'Patient Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'review', title: 'Review', type: 'text', rows: 4, validation: (R) => R.required().max(600) }),
    defineField({ name: 'rating', title: 'Rating (1–5)', type: 'number', validation: (R) => R.required().min(1).max(5) }),
    defineField({ name: 'photo', title: 'Patient Photo (optional)', type: 'cloudinaryImage' }),
    defineField({ name: 'treatment', title: 'Treatment Received', type: 'string' }),
    defineField({
      name: 'published',
      title: 'Published (visible on site)',
      type: 'boolean',
      initialValue: false,
      description: 'Only clinic-approved, authentic testimonials should be published.',
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'patientName', subtitle: 'treatment' },
  },
});

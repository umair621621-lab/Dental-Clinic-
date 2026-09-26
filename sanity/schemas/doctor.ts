import { defineType, defineField } from 'sanity';
import { Stethoscope } from 'lucide-react';

export const doctor = defineType({
  name: 'doctor',
  title: 'Doctor',
  type: 'document',
  icon: Stethoscope,
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'photo', title: 'Photo', type: 'cloudinaryImage' }),
    defineField({
      name: 'qualifications',
      title: 'Qualifications',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. BDS, RDS, Fellowship in Implantology',
    }),
    defineField({ name: 'specialty', title: 'Specialty', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'experienceYears', title: 'Years of Experience', type: 'number', validation: (R) => R.required().min(0) }),
    defineField({ name: 'biography', title: 'Biography', type: 'text', rows: 6 }),
    defineField({
      name: 'languages',
      title: 'Languages Spoken',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
  ],
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'name', subtitle: 'specialty', media: 'photo' },
  },
});

import { defineType, defineField } from 'sanity';

/**
 * Reusable object type: an image that physically lives in Cloudinary.
 * Editors paste the Cloudinary public ID (shown in the Cloudinary
 * Media Library) rather than uploading through Sanity's own asset
 * pipeline, per the project's storage architecture.
 */
export const cloudinaryImage = defineType({
  name: 'cloudinaryImage',
  title: 'Image (Cloudinary)',
  type: 'object',
  fields: [
    defineField({
      name: 'publicId',
      title: 'Cloudinary Public ID',
      type: 'string',
      description:
        'Copy this from the Cloudinary Media Library, e.g. "clinic/doctors/dr-ahmed"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'Describe the image for accessibility and SEO.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'alt', subtitle: 'publicId' },
  },
});

export const seoFields = defineType({
  name: 'seoFields',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'SEO Title', type: 'string' }),
    defineField({
      name: 'description',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
    }),
    defineField({ name: 'ogImage', title: 'Social Share Image', type: 'cloudinaryImage' }),
  ],
});

export const openingHoursEntry = defineType({
  name: 'openingHoursEntry',
  title: 'Opening Hours Entry',
  type: 'object',
  fields: [
    defineField({ name: 'day', title: 'Day', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'hours', title: 'Hours (e.g. 10:00 AM – 8:00 PM)', type: 'string' }),
    defineField({ name: 'closed', title: 'Closed this day', type: 'boolean', initialValue: false }),
  ],
});

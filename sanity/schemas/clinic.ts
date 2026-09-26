import { defineType, defineField } from 'sanity';
import { Building2 } from 'lucide-react';

export const clinic = defineType({
  name: 'clinic',
  title: 'Clinic Information',
  type: 'document',
  icon: Building2,
  fields: [
    defineField({ name: 'name', title: 'Clinic Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'logo', title: 'Logo', type: 'cloudinaryImage' }),
    defineField({ name: 'description', title: 'Short Description', type: 'text', rows: 3 }),
    defineField({ name: 'phone', title: 'Phone (with country code)', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'whatsapp', title: 'WhatsApp Number (digits only, e.g. 923001234567)', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'email', title: 'Email', type: 'string', validation: (R) => R.required().email() }),
    defineField({ name: 'address', title: 'Full Address', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'area', title: 'Area / Neighborhood', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'city', title: 'City', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'province', title: 'Province', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours',
      type: 'array',
      of: [{ type: 'openingHoursEntry' }],
    }),
    defineField({ name: 'googleMapsUrl', title: 'Google Maps Link (Directions)', type: 'url', validation: (R) => R.required() }),
    defineField({ name: 'googleMapsEmbedUrl', title: 'Google Maps Embed URL', type: 'url' }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', title: 'Platform', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
          ],
        },
      ],
    }),
    defineField({ name: 'seo', title: 'Default SEO', type: 'seoFields' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'city' },
  },
});

import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TestimonialCard } from '@/components/testimonials/TestimonialCard';
import { getTestimonials } from '@/src/sanity/queries';
import { siteConfig } from '@/src/config/site';

export const metadata: Metadata = {
  title: 'Patient Testimonials',
  description: 'Read what our patients say about their experience at our clinic.',
  alternates: { canonical: `${siteConfig.siteUrl}/testimonials` },
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <Breadcrumbs items={[{ label: 'Testimonials' }]} />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow="Patient Stories" title="What Our Patients Say" />

        {testimonials.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-dashed border-clinic-200 p-10 text-center text-clinic-500">
            Patient testimonials will appear here once approved and published by the clinic.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t._id} testimonial={t} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

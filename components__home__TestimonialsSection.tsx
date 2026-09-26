import { SectionHeading } from '@/components/ui/SectionHeading';
import { TestimonialCard } from '@/components/testimonials/TestimonialCard';
import { Button } from '@/components/ui/Button';
import type { Testimonial } from '@/src/types';

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  // Gracefully hide the section entirely when there are no
  // clinic-approved testimonials yet — never show placeholder reviews.
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Patient Stories" title="What our patients say" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t._id} testimonial={t} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button href="/testimonials" variant="secondary">Read More Reviews</Button>
        </div>
      </div>
    </section>
  );
}

import { Star } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import type { Testimonial } from '@/src/types';

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-clinic-100 bg-white p-6 shadow-card">
      <div className="flex items-center gap-1" aria-label={`Rated ${testimonial.rating} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < testimonial.rating ? 'fill-accent-400 text-accent-400' : 'text-clinic-200'}`}
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-clinic-700">&ldquo;{testimonial.review}&rdquo;</p>
      <div className="mt-6 flex items-center gap-3">
        {testimonial.photo?.publicId ? (
          <OptimizedImage image={testimonial.photo} width={40} height={40} className="rounded-full" />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-clinic-100 text-sm font-semibold text-clinic-600">
            {testimonial.patientName.charAt(0)}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-clinic-900">{testimonial.patientName}</p>
          {testimonial.treatment && (
            <p className="text-xs text-clinic-500">{testimonial.treatment}</p>
          )}
        </div>
      </div>
    </div>
  );
}

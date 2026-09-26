import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import type { Service } from '@/src/types';

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group block overflow-hidden rounded-2xl border border-clinic-100 bg-white shadow-card transition-shadow hover:shadow-elevated"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <OptimizedImage
          image={service.heroImage}
          width={400}
          height={300}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-lg font-semibold text-clinic-900">{service.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-clinic-700">
          {service.shortDescription}
        </p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-clinic-600 group-hover:text-accent-600">
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

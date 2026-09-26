import * as Icons from 'lucide-react';
import { ShieldCheck } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { Homepage } from '@/src/types';

function resolveIcon(name?: string) {
  if (!name) return ShieldCheck;
  const Icon = (Icons as unknown as Record<string, typeof ShieldCheck>)[name];
  return Icon ?? ShieldCheck;
}

export function WhyChooseUs({ homepage }: { homepage: Homepage | null }) {
  const items = homepage?.whyChooseUs ?? [];
  if (items.length === 0) return null;

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Why Patients Choose Us" title="Care built around your comfort" />
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = resolveIcon(item.icon);
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-clinic-100 bg-clinic-50/50 p-6 transition-shadow hover:shadow-card"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-clinic-600 text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-semibold text-clinic-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-clinic-700">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import type { Homepage, Clinic } from '@/src/types';

export function IntroSection({ homepage, clinic }: { homepage: Homepage | null; clinic: Clinic | null }) {
  const heading = homepage?.introHeading ?? `Welcome to ${clinic?.name ?? 'our clinic'}`;
  const body =
    homepage?.introBody ??
    clinic?.description ??
    'We combine modern dental technology with a gentle, patient-first approach to deliver care you can trust.';

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-2xl font-semibold text-clinic-900 sm:text-3xl">{heading}</h2>
        <p className="mt-4 text-base leading-relaxed text-clinic-700">{body}</p>
      </div>
    </section>
  );
}

import { Button } from '@/components/ui/Button';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { buildAppointmentWhatsAppLink } from '@/src/lib/whatsapp';
import type { Homepage } from '@/src/types';

export function Hero({ homepage }: { homepage: Homepage | null }) {
  const headline = homepage?.heroHeadline ?? 'Confident Smiles Start Here';
  const subheadline =
    homepage?.heroSubheadline ??
    'Modern, gentle dental care for the whole family — managed by experienced local dentists.';

  return (
    <section className="relative overflow-hidden bg-clinic-950">
      <div className="absolute inset-0">
        <OptimizedImage
          image={homepage?.heroImage}
          width={1920}
          height={1080}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-clinic-950 via-clinic-950/80 to-clinic-950/40" />
      </div>

      <div className="relative mx-auto flex min-h-[560px] max-w-6xl flex-col items-start justify-center px-4 py-24 sm:px-6">
        <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
          {headline}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-clinic-100">{subheadline}</p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Button href="/appointment" variant="accent" size="lg">
            Book an Appointment
          </Button>
          <Button href={buildAppointmentWhatsAppLink()} variant="outline" size="lg">
            Chat on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}

import { Button } from '@/components/ui/Button';
import { buildAppointmentWhatsAppLink } from '@/src/lib/whatsapp';
import type { Homepage } from '@/src/types';

export function AppointmentCTA({ homepage }: { homepage: Homepage | null }) {
  return (
    <section className="bg-clinic-900 py-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">
          {homepage?.ctaHeading ?? 'Ready for your next visit?'}
        </h2>
        <p className="max-w-xl text-clinic-200">
          {homepage?.ctaBody ??
            'Book an appointment in minutes, or message us on WhatsApp with any questions.'}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button href="/appointment" variant="accent" size="lg">Book Appointment</Button>
          <Button href={buildAppointmentWhatsAppLink()} variant="outline" size="lg">WhatsApp Us</Button>
        </div>
      </div>
    </section>
  );
}

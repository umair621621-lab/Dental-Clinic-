import { MapPin, Phone, Clock } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CallButton } from '@/components/ui/CallButton';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { Button } from '@/components/ui/Button';
import type { Clinic } from '@/src/types';

export function ContactPreview({ clinic }: { clinic: Clinic | null }) {
  if (!clinic) return null;

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow="Visit Us" title="Find & Contact Our Clinic" />

        <div className="mt-12 grid gap-8 rounded-2xl border border-clinic-100 bg-clinic-50/50 p-8 sm:grid-cols-2">
          <div className="space-y-4 text-sm text-clinic-700">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-clinic-500" aria-hidden="true" />
              <span>
                {clinic.address}, {clinic.area}, {clinic.city}, {clinic.province}
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-clinic-500" aria-hidden="true" />
              <a href={`tel:${clinic.phone}`} className="hover:text-clinic-900">{clinic.phone}</a>
            </div>
            {clinic.openingHours?.[0] && (
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-clinic-500" aria-hidden="true" />
                <span>
                  {clinic.openingHours[0].day}: {clinic.openingHours[0].closed ? 'Closed' : clinic.openingHours[0].hours}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center gap-3 sm:items-end">
            <div className="flex flex-wrap gap-3 sm:justify-end">
              <CallButton phone={clinic.phone} />
              <WhatsAppButton />
            </div>
            <Button href="/contact" variant="secondary" className="sm:self-end">
              Full Contact Details
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

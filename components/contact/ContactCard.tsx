import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';
import { CallButton } from '@/components/ui/CallButton';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import type { Clinic } from '@/src/types';

export function ContactCard({ clinic }: { clinic: Clinic }) {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-clinic-100 bg-white p-6 shadow-card sm:p-8">
        <h2 className="font-display text-xl font-semibold text-clinic-900">Get in Touch</h2>

        <ul className="mt-6 space-y-4 text-sm text-clinic-700">
          <li className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-clinic-500" aria-hidden="true" />
            <span>
              {clinic.address}, {clinic.area}, {clinic.city}, {clinic.province}
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-clinic-500" aria-hidden="true" />
            <a href={`tel:${clinic.phone}`} className="hover:text-clinic-900">{clinic.phone}</a>
          </li>
          <li className="flex items-start gap-3">
            <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-clinic-500" aria-hidden="true" />
            <a href={`mailto:${clinic.email}`} className="hover:text-clinic-900">{clinic.email}</a>
          </li>
          {clinic.openingHours?.length > 0 && (
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-clinic-500" aria-hidden="true" />
              <div>
                {clinic.openingHours.map((entry) => (
                  <div key={entry.day}>
                    {entry.day}: {entry.closed ? 'Closed' : entry.hours}
                  </div>
                ))}
              </div>
            </li>
          )}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <CallButton phone={clinic.phone} />
          <WhatsAppButton label="Contact Clinic" />
          {clinic.googleMapsUrl && (
            <a
              href={clinic.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-clinic-200 px-5 py-3 text-sm font-medium text-clinic-800 hover:bg-clinic-50"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Get Directions
            </a>
          )}
        </div>
      </div>

      {clinic.googleMapsEmbedUrl && (
        <div className="overflow-hidden rounded-2xl border border-clinic-100 shadow-card">
          <iframe
            src={clinic.googleMapsEmbedUrl}
            title={`${clinic.name} location on Google Maps`}
            className="h-80 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
    </div>
  );
}

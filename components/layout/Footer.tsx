import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { navLinks } from '@/src/config/site';
import type { Clinic } from '@/src/types';

export function Footer({ clinic }: { clinic: Clinic | null }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-clinic-100 bg-clinic-950 text-clinic-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <p className="font-display text-xl font-semibold text-white">
            {clinic?.name ?? 'Dental Clinic'}
          </p>
          {clinic?.description && (
            <p className="mt-3 text-sm leading-relaxed text-clinic-300">{clinic.description}</p>
          )}
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-clinic-400">Explore</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-clinic-300 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-clinic-400">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-clinic-300">
            {clinic?.address && (
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span>
                  {clinic.address}, {clinic.area}, {clinic.city}
                </span>
              </li>
            )}
            {clinic?.phone && (
              <li className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <a href={`tel:${clinic.phone}`} className="hover:text-white">
                  {clinic.phone}
                </a>
              </li>
            )}
            {clinic?.email && (
              <li className="flex gap-2">
                <Mail className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <a href={`mailto:${clinic.email}`} className="hover:text-white">
                  {clinic.email}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-clinic-400">Opening Hours</p>
          <ul className="mt-4 space-y-2 text-sm text-clinic-300">
            {clinic?.openingHours?.length ? (
              clinic.openingHours.map((entry) => (
                <li key={entry.day} className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <span>
                    {entry.day}: {entry.closed ? 'Closed' : entry.hours}
                  </span>
                </li>
              ))
            ) : (
              <li>Hours managed via CMS.</li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-clinic-400 sm:flex-row sm:px-6">
          <p>
            © {year} {clinic?.name ?? 'Dental Clinic'}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

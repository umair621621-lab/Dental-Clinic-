import Link from 'next/link';
import { navLinks } from '@/src/config/site';
import { MobileMenu } from './MobileMenu';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { CallButton } from '@/components/ui/CallButton';
import type { Clinic } from '@/src/types';

export function Header({ clinic }: { clinic: Clinic | null }) {
  return (
    <header className="sticky top-0 z-30 border-b border-clinic-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold text-clinic-900">
          {clinic?.logo?.publicId ? (
            <OptimizedImage image={clinic.logo} width={36} height={36} className="rounded-full" />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-clinic-600 text-sm font-bold text-white">
              {(clinic?.name ?? 'DC').slice(0, 2).toUpperCase()}
            </span>
          )}
          <span className="hidden sm:inline">{clinic?.name ?? 'Dental Clinic'}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-clinic-700 transition-colors hover:text-clinic-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {clinic?.phone && (
            <CallButton phone={clinic.phone} label="Call" className="hidden sm:inline-flex" />
          )}
          <Link
            href="/appointment"
            className="hidden rounded-full bg-accent-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-600 sm:inline-flex"
          >
            Book Appointment
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

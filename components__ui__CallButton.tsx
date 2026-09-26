'use client';

import { Phone } from 'lucide-react';
import { trackEvent } from '@/src/lib/analytics';
import { cn } from '@/src/utils/cn';

interface CallButtonProps {
  phone: string;
  label?: string;
  className?: string;
}

export function CallButton({ phone, label = 'Call Now', className }: CallButtonProps) {
  return (
    <a
      href={`tel:${phone}`}
      onClick={() => trackEvent('phone_click', { phone })}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full bg-clinic-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-clinic-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-clinic-500',
        className
      )}
    >
      <Phone className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}

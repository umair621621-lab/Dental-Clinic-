'use client';

import { MessageCircle } from 'lucide-react';
import { buildWhatsAppLink } from '@/src/lib/whatsapp';
import { trackEvent } from '@/src/lib/analytics';
import { cn } from '@/src/utils/cn';

interface WhatsAppButtonProps {
  message?: string;
  label?: string;
  className?: string;
  variant?: 'solid' | 'floating';
}

export function WhatsAppButton({
  message,
  label = 'WhatsApp Us',
  className,
  variant = 'solid',
}: WhatsAppButtonProps) {
  const href = buildWhatsAppLink(message);

  if (variant === 'floating') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        onClick={() => trackEvent('whatsapp_click', { variant: 'floating' })}
        className={cn(
          'fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elevated transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]',
          className
        )}
      >
        <MessageCircle className="h-7 w-7" aria-hidden="true" />
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('whatsapp_click', { variant: 'solid', label })}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1ebe57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]',
        className
      )}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      {label}
    </a>
  );
}

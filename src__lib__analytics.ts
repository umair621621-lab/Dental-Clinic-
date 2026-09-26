'use client';

/**
 * Minimal, dependency-free analytics event dispatch.
 *
 * Pushes to `window.dataLayer` — the same data layer Google Tag
 * Manager and GA4 read from. If the clinic hasn't configured
 * `NEXT_PUBLIC_GTM_ID` (see layout.tsx), nothing is loaded to read
 * these events and this is a harmless no-op array — no third-party
 * script runs, and no network request is made, until the clinic
 * turns tracking on. That satisfies "structure for analytics, but
 * don't add unnecessary tracking" (spec section 29).
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export type AnalyticsEvent =
  | 'whatsapp_click'
  | 'phone_click'
  | 'appointment_form_start'
  | 'appointment_form_submit'
  | 'service_view'
  | 'before_after_interaction';

export function trackEvent(event: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
  } catch {
    // Analytics should never break the UI it's attached to.
  }
}

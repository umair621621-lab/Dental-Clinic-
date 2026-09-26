'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/src/lib/analytics';

/**
 * Fires a single "service_view" analytics event when a service
 * detail page is opened. Renders nothing — mount it once per page.
 */
export function ServiceViewTracker({ serviceName }: { serviceName: string }) {
  useEffect(() => {
    trackEvent('service_view', { service: serviceName });
    // Only ever re-fire if the visitor navigates to a different service.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceName]);

  return null;
}

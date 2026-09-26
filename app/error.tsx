'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

/**
 * Global error boundary. Catches any uncaught error thrown while
 * rendering a route (e.g. an unexpected CMS/network failure that
 * safeFetch() didn't already absorb) and shows a friendly recovery
 * screen instead of a blank page or a raw stack trace.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[route error]', error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <AlertTriangle className="h-12 w-12 text-accent-500" aria-hidden="true" />
      <h1 className="mt-4 font-display text-2xl font-semibold text-clinic-900">
        Something went wrong
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-clinic-600">
        We hit an unexpected error loading this page. You can try again, or
        head back to the homepage — our team has been notified.
      </p>
      <div className="mt-8 flex gap-3">
        <Button onClick={() => reset()}>Try Again</Button>
        <Button href="/" variant="secondary">Back to Home</Button>
      </div>
    </section>
  );
}

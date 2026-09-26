/**
 * Global loading UI. Shown automatically by Next.js while an async
 * Server Component (e.g. a page fetching from Sanity) is resolving,
 * on any route that doesn't define its own more specific loading.tsx.
 */
export default function Loading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-clinic-200 border-t-clinic-600"
          role="status"
          aria-label="Loading"
        />
        <p className="text-sm text-clinic-500">Loading…</p>
      </div>
    </div>
  );
}

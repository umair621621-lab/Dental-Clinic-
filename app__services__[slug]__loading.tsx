/**
 * Route-specific skeleton for service detail pages — mirrors the
 * hero + content layout so the loading state doesn't jump/shift once
 * real content arrives.
 */
export default function ServiceDetailLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-72 w-full bg-clinic-100 sm:h-96" />
      <div className="mx-auto -mt-20 max-w-4xl rounded-2xl bg-white px-6 py-8 shadow-elevated sm:px-10">
        <div className="h-8 w-2/3 rounded bg-clinic-100" />
        <div className="mt-4 h-4 w-full rounded bg-clinic-100" />
        <div className="mt-2 h-4 w-5/6 rounded bg-clinic-100" />
        <div className="mt-6 flex gap-3">
          <div className="h-11 w-40 rounded-full bg-clinic-100" />
          <div className="h-11 w-40 rounded-full bg-clinic-100" />
        </div>
      </div>
    </div>
  );
}

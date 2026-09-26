import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-6xl font-semibold text-clinic-200">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-clinic-900">
        Page not found
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-clinic-600">
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex gap-3">
        <Button href="/">Back to Home</Button>
        <Button href="/appointment" variant="secondary">Book Appointment</Button>
      </div>
    </section>
  );
}

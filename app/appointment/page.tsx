import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AppointmentForm } from '@/components/appointment/AppointmentForm';
import { getClinic, getDoctors, getServices } from '@/src/sanity/queries';
import { siteConfig } from '@/src/config/site';

export const metadata: Metadata = {
  title: 'Book an Appointment',
  description: 'Request a dental appointment online. Our team will confirm your slot by phone or WhatsApp.',
  alternates: { canonical: `${siteConfig.siteUrl}/appointment` },
};

export default async function AppointmentPage() {
  const [clinic, services, doctors] = await Promise.all([
    getClinic(),
    getServices(),
    getDoctors(),
  ]);

  return (
    <>
      <Breadcrumbs items={[{ label: 'Appointment' }]} />
      <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Book a Visit"
          title="Request an Appointment"
          description="Fill in the form below and our team will reach out to confirm your appointment time."
        />
        <div className="mt-12">
          <AppointmentForm services={services} doctors={doctors} clinicPhone={clinic?.phone} />
        </div>
      </section>
    </>
  );
}

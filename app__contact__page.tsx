import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactCard } from '@/components/contact/ContactCard';
import { getClinic } from '@/src/sanity/queries';
import { siteConfig } from '@/src/config/site';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with our clinic by phone, WhatsApp, email, or visit us in person.',
  alternates: { canonical: `${siteConfig.siteUrl}/contact` },
};

export default async function ContactPage() {
  const clinic = await getClinic();

  return (
    <>
      <Breadcrumbs items={[{ label: 'Contact' }]} />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <SectionHeading eyebrow="We're Here to Help" title="Contact Our Clinic" />
        <div className="mt-12">
          {clinic ? (
            <ContactCard clinic={clinic} />
          ) : (
            <p className="rounded-2xl border border-dashed border-clinic-200 p-10 text-center text-clinic-500">
              Clinic contact details will appear here once configured in the CMS.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

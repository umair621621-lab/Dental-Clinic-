import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/services/ServiceCard';
import { getServices } from '@/src/sanity/queries';
import { siteConfig } from '@/src/config/site';

export const metadata: Metadata = {
  title: 'Dental Services',
  description: 'Explore our full range of dental treatments, from general checkups to cosmetic dentistry.',
  alternates: { canonical: `${siteConfig.siteUrl}/services` },
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <Breadcrumbs items={[{ label: 'Services' }]} />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="What We Offer"
          title="Our Dental Services"
          description="From routine checkups to advanced cosmetic and restorative treatments, our team is here for every stage of your dental health."
        />

        {services.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-dashed border-clinic-200 p-10 text-center text-clinic-500">
            Services will appear here once added in the CMS.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

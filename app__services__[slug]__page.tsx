import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import { Button } from '@/components/ui/Button';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton';
import { FAQ } from '@/components/ui/FAQ';
import { ServiceCard } from '@/components/services/ServiceCard';
import { ServiceViewTracker } from '@/components/services/ServiceViewTracker';
import {
  getServiceBySlug,
  getServiceSlugs,
  getRelatedServices,
} from '@/src/sanity/queries';

import { cloudinaryUrl } from '@/src/sanity/image';
import { siteConfig } from '@/src/config/site';

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) return {};

  const title = service.seo?.title || service.name;
  const description = service.seo?.description || service.shortDescription;
  const ogImage = service.seo?.ogImage ?? service.heroImage;

  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.siteUrl}/services/${service.slug}` },
    openGraph: {
      title,
      description,
      images: ogImage?.publicId ? [cloudinaryUrl(ogImage.publicId, { width: 1200, height: 630 })] : [],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = await getServiceBySlug(params.slug);
  if (!service) notFound();

  const related = await getRelatedServices(service.slug, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.shortDescription,
  };

  const faqJsonLd = service.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: service.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }
    : null;

  return (
    <>
      <ServiceViewTracker serviceName={service.name} />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <Breadcrumbs items={[{ label: 'Services', href: '/services' }, { label: service.name }]} />

      <section className="relative">
        <div className="relative h-72 w-full sm:h-96">
          <OptimizedImage
            image={service.heroImage}
            width={1600}
            height={700}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-clinic-950/80 to-clinic-950/10" />
        </div>
        <div className="mx-auto -mt-20 max-w-4xl rounded-2xl bg-white px-6 py-8 shadow-elevated sm:px-10">
          <h1 className="font-display text-3xl font-semibold text-clinic-900 sm:text-4xl">
            {service.name}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-clinic-700">{service.fullDescription}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/appointment" variant="primary">Book This Treatment</Button>
            <WhatsAppButton message={`Hello, I would like to ask about "${service.name}".`} />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        {service.benefits?.length > 0 && (
          <section className="mb-14">
            <h2 className="font-display text-2xl font-semibold text-clinic-900">Benefits</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-2 text-sm text-clinic-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-clinic-600" aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {service.process?.length > 0 && (
          <section className="mb-14">
            <h2 className="font-display text-2xl font-semibold text-clinic-900">Treatment Process</h2>
            <ol className="mt-6 space-y-6">
              {service.process.map((step, i) => (
                <li key={step.step} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-clinic-600 text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold text-clinic-900">{step.step}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-clinic-700">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {service.gallery && service.gallery.length > 0 && (
          <section className="mb-14">
            <h2 className="font-display text-2xl font-semibold text-clinic-900">Gallery</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {service.gallery.map((img) => (
                <div key={img.publicId} className="relative aspect-square overflow-hidden rounded-xl">
                  <OptimizedImage image={img} width={300} height={300} fill sizes="33vw" className="object-cover" />
                </div>
              ))}
            </div>
          </section>
        )}

        {service.faqs?.length > 0 && (
          <section className="mb-14">
            <h2 className="font-display text-2xl font-semibold text-clinic-900">Frequently Asked Questions</h2>
            <div className="mt-6">
              <FAQ items={service.faqs} />
            </div>
          </section>
        )}

        <section className="rounded-2xl bg-clinic-50 p-8 text-center">
          <h2 className="font-display text-xl font-semibold text-clinic-900">
            Ready to book your {service.name.toLowerCase()}?
          </h2>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button href="/appointment" variant="primary">Book Appointment</Button>
            <WhatsAppButton
              message={`Hello, I would like to ask about "${service.name}". Could you please share more details and availability?`}
              label="Ask About Treatment"
            />
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-semibold text-clinic-900">Related Services</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {related.map((s) => (
                <ServiceCard key={s._id} service={s} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}

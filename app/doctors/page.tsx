import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DoctorCard } from '@/components/doctors/DoctorCard';
import { getDoctors } from '@/src/sanity/queries';
import { siteConfig } from '@/src/config/site';

export const metadata: Metadata = {
  title: 'Our Doctors',
  description: 'Meet the experienced, qualified dentists behind your care.',
  alternates: { canonical: `${siteConfig.siteUrl}/doctors` },
};

export default async function DoctorsPage() {
  const doctors = await getDoctors();

  const peopleJsonLd =
    doctors.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: doctors.map((doctor, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Person',
              name: doctor.name,
              jobTitle: doctor.specialty,
              description: doctor.biography,
              knowsLanguage: doctor.languages,
            },
          })),
        }
      : null;

  return (
    <>
      {peopleJsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(peopleJsonLd) }}
        />
      )}
      <Breadcrumbs items={[{ label: 'Doctors' }]} />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Our Team"
          title="Meet Our Doctors"
          description="Every dentist on our team is fully qualified and experienced in patient-first, modern dental care."
        />

        {doctors.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-dashed border-clinic-200 p-10 text-center text-clinic-500">
            Doctor profiles will appear here once added in the CMS.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

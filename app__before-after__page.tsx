import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/navigation/Breadcrumbs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { BeforeAfterGrid } from '@/components/before-after/BeforeAfterGrid';
import { getBeforeAfterCases } from '@/src/sanity/queries';
import { siteConfig } from '@/src/config/site';

export const metadata: Metadata = {
  title: 'Before & After',
  description: 'Real patient transformations from our dental treatments.',
  alternates: { canonical: `${siteConfig.siteUrl}/before-after` },
};

export default async function BeforeAfterPage() {
  const cases = await getBeforeAfterCases();

  return (
    <>
      <Breadcrumbs items={[{ label: 'Before & After' }]} />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="Real Results"
          title="Before & After Gallery"
          description="Drag the slider — or use your keyboard's left/right arrow keys — to compare real treatment results from our clinic."
        />
        <div className="mt-12">
          <BeforeAfterGrid cases={cases} />
        </div>
      </section>
    </>
  );
}

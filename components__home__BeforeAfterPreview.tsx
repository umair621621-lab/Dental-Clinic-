import { SectionHeading } from '@/components/ui/SectionHeading';
import { BeforeAfterGrid } from '@/components/before-after/BeforeAfterGrid';
import { Button } from '@/components/ui/Button';
import type { BeforeAfterCase } from '@/src/types';

export function BeforeAfterPreview({ cases }: { cases: BeforeAfterCase[] }) {
  if (cases.length === 0) return null;

  return (
    <section className="bg-clinic-50/60 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Real Results" title="See the transformation" />
        <div className="mt-12">
          <BeforeAfterGrid cases={cases} />
        </div>
        <div className="mt-10 flex justify-center">
          <Button href="/before-after" variant="secondary">View All Cases</Button>
        </div>
      </div>
    </section>
  );
}

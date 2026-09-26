import { SectionHeading } from '@/components/ui/SectionHeading';
import { DoctorCard } from '@/components/doctors/DoctorCard';
import { Button } from '@/components/ui/Button';
import type { Doctor } from '@/src/types';

export function DoctorsPreview({ doctors }: { doctors: Doctor[] }) {
  if (doctors.length === 0) return null;

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Meet The Team" title="Experienced dentists you can trust" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button href="/doctors" variant="secondary">Meet All Doctors</Button>
        </div>
      </div>
    </section>
  );
}

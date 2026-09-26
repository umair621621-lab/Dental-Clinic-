import { GraduationCap, Languages, BriefcaseMedical } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import type { Doctor } from '@/src/types';

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-clinic-100 bg-white shadow-card">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-clinic-100">
        <OptimizedImage
          image={doctor.photo}
          width={400}
          height={500}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-lg font-semibold text-clinic-900">{doctor.name}</h3>
        <p className="text-sm font-medium text-accent-600">{doctor.specialty}</p>

        <ul className="mt-4 space-y-2 text-sm text-clinic-700">
          {doctor.qualifications?.length > 0 && (
            <li className="flex items-start gap-2">
              <GraduationCap className="mt-0.5 h-4 w-4 flex-shrink-0 text-clinic-500" aria-hidden="true" />
              <span>{doctor.qualifications.join(', ')}</span>
            </li>
          )}
          <li className="flex items-start gap-2">
            <BriefcaseMedical className="mt-0.5 h-4 w-4 flex-shrink-0 text-clinic-500" aria-hidden="true" />
            <span>{doctor.experienceYears}+ years of experience</span>
          </li>
          {doctor.languages?.length > 0 && (
            <li className="flex items-start gap-2">
              <Languages className="mt-0.5 h-4 w-4 flex-shrink-0 text-clinic-500" aria-hidden="true" />
              <span>{doctor.languages.join(', ')}</span>
            </li>
          )}
        </ul>

        {doctor.biography && (
          <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-clinic-600">{doctor.biography}</p>
        )}
      </div>
    </article>
  );
}

'use client';

import { useState } from 'react';
import { PlayCircle, GitCompare } from 'lucide-react';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { BeforeAfterVideo } from './BeforeAfterVideo';
import { Lightbox } from './Lightbox';
import type { BeforeAfterCase, CloudinaryImage } from '@/src/types';

function CaseCard({
  item,
  onOpenLightbox,
}: {
  item: BeforeAfterCase;
  onOpenLightbox: (image: CloudinaryImage) => void;
}) {
  const hasVideo = Boolean(item.videoPublicId);
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="rounded-2xl border border-clinic-100 bg-white p-4 shadow-card">
      {showVideo && item.videoPublicId ? (
        <BeforeAfterVideo
          videoPublicId={item.videoPublicId}
          posterImage={item.afterImage}
          caseTitle={item.title}
        />
      ) : (
        <BeforeAfterSlider
          before={item.beforeImage}
          after={item.afterImage}
          caseTitle={item.title}
          onOpenLightbox={() => onOpenLightbox(item.afterImage)}
        />
      )}

      <div className="mt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-accent-600">
              {item.treatmentCategory}
            </p>
            <h3 className="mt-1 font-display text-lg font-semibold text-clinic-900">{item.title}</h3>
          </div>

          {hasVideo && (
            <button
              type="button"
              onClick={() => setShowVideo((v) => !v)}
              className="flex flex-shrink-0 items-center gap-1.5 rounded-full border border-clinic-200 px-3 py-1.5 text-xs font-medium text-clinic-700 hover:bg-clinic-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-500"
            >
              {showVideo ? (
                <>
                  <GitCompare className="h-3.5 w-3.5" aria-hidden="true" />
                  View Comparison
                </>
              ) : (
                <>
                  <PlayCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  Watch Video
                </>
              )}
            </button>
          )}
        </div>

        {item.description && (
          <p className="mt-2 text-sm leading-relaxed text-clinic-700">{item.description}</p>
        )}
      </div>
    </div>
  );
}

export function BeforeAfterGrid({ cases }: { cases: BeforeAfterCase[] }) {
  const [lightboxImage, setLightboxImage] = useState<CloudinaryImage | null>(null);

  if (cases.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-clinic-200 p-10 text-center text-clinic-500">
        Before &amp; after cases will appear here once published by the clinic.
      </p>
    );
  }

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2">
        {cases.map((item) => (
          <CaseCard key={item._id} item={item} onOpenLightbox={setLightboxImage} />
        ))}
      </div>
      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </>
  );
}

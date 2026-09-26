'use client';

import { useCallback, useRef, useState } from 'react';
import { cloudinaryUrl } from '@/src/sanity/image';
import { trackEvent } from '@/src/lib/analytics';
import type { CloudinaryImage } from '@/src/types';

interface BeforeAfterSliderProps {
  before: CloudinaryImage;
  after: CloudinaryImage;
  caseTitle: string;
  onOpenLightbox?: () => void;
}

/**
 * Draggable before/after comparison. Supports mouse drag, touch
 * drag, and full keyboard control (arrow keys) on the slider handle
 * for accessibility, per project requirements.
 */
export function BeforeAfterSlider({
  before,
  after,
  caseTitle,
  onOpenLightbox,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50); // percent, 0 = all "before", 100 = all "after"
  const [imageFailed, setImageFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const hasTrackedInteraction = useRef(false);

  function trackInteractionOnce() {
    if (hasTrackedInteraction.current) return;
    hasTrackedInteraction.current = true;
    trackEvent('before_after_interaction', { case: caseTitle });
  }

  const beforeUrl = cloudinaryUrl(before.publicId, { width: 900, height: 700 });
  const afterUrl = cloudinaryUrl(after.publicId, { width: 900, height: 700 });

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  // If either photo fails to actually load (deleted/renamed asset in
  // Cloudinary), a half-broken comparison isn't useful — show a
  // clear message instead of a broken-image icon. This check must
  // come after every Hook call above (Rules of Hooks).
  if (imageFailed || !beforeUrl || !afterUrl) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl bg-clinic-100 text-sm text-clinic-500">
        Images for this case are currently unavailable.
      </div>
    );
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
    trackInteractionOnce();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = () => {
    draggingRef.current = false;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    trackInteractionOnce();
    const step = e.shiftKey ? 10 : 3;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - step));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + step));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setPosition(100);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-2xl bg-clinic-100"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* After image (full, underneath) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={afterUrl}
        alt={`${caseTitle} — after treatment`}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
        onError={() => setImageFailed(true)}
      />

      {/* Before image (clipped to slider position, on top) */}
      <div
        className="absolute inset-0 h-full overflow-hidden"
        style={{ width: `${position}%` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beforeUrl}
          alt={`${caseTitle} — before treatment`}
          className="h-full w-full max-w-none object-cover"
          style={{ width: containerRef.current?.offsetWidth ?? '100%' }}
          draggable={false}
          onError={() => setImageFailed(true)}
        />
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
        After
      </span>

      {/* Divider + handle */}
      <div
        className="absolute inset-y-0 w-0.5 bg-white/90"
        style={{ left: `${position}%` }}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label={`Comparison slider for ${caseTitle}. Use left and right arrow keys to compare before and after.`}
          aria-valuenow={Math.round(position)}
          aria-valuemin={0}
          aria-valuemax={100}
          onPointerDown={handlePointerDown}
          onKeyDown={handleKeyDown}
          className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
        >
          <span className="h-4 w-1 rounded-full bg-clinic-400" />
          <span className="mx-0.5 h-4 w-1 rounded-full bg-clinic-400" />
        </div>
      </div>

      {onOpenLightbox && (
        <button
          type="button"
          onClick={onOpenLightbox}
          className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-clinic-800 shadow-card hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clinic-500"
        >
          View full size
        </button>
      )}
    </div>
  );
}

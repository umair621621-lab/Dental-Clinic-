'use client';

import { useEffect, useRef, useState } from 'react';
import { X, ImageOff } from 'lucide-react';
import { cloudinaryUrl } from '@/src/sanity/image';
import type { CloudinaryImage } from '@/src/types';

interface LightboxProps {
  image: CloudinaryImage | null;
  onClose: () => void;
}

export function Lightbox({ image, onClose }: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (image) closeButtonRef.current?.focus();
  }, [image]);

  // Reset the error state whenever a different image is opened.
  useEffect(() => {
    setFailed(false);
  }, [image]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (image) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [image, onClose]);

  if (!image) return null;

  const src = cloudinaryUrl(image.publicId, { width: 1600, height: 1600, crop: 'limit' });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Close image"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <X className="h-6 w-6" aria-hidden="true" />
      </button>
      {failed ? (
        <div
          className="flex h-64 w-64 flex-col items-center justify-center gap-3 rounded-lg bg-white/10 text-white"
          onClick={(e) => e.stopPropagation()}
        >
          <ImageOff className="h-8 w-8" aria-hidden="true" />
          <p className="text-sm">Image unavailable</p>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={image.alt}
          className="max-h-full max-w-full rounded-lg object-contain"
          onClick={(e) => e.stopPropagation()}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

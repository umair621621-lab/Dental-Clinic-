import { cloudinaryUrl, cloudinaryVideoUrl } from '@/src/sanity/image';
import type { CloudinaryImage } from '@/src/types';

interface BeforeAfterVideoProps {
  videoPublicId: string;
  posterImage?: CloudinaryImage;
  caseTitle: string;
}

/**
 * Plays an optional clinic-provided treatment video for a
 * before/after case (spec section 12: "Optional Cloudinary
 * videos"). Uses the after-photo as a poster frame so there's no
 * layout shift while the video loads, and never autoplays with
 * sound (accessibility / bandwidth-friendly for mobile visitors).
 */
export function BeforeAfterVideo({ videoPublicId, posterImage, caseTitle }: BeforeAfterVideoProps) {
  const src = cloudinaryVideoUrl(videoPublicId);
  const poster = posterImage ? cloudinaryUrl(posterImage.publicId, { width: 900, height: 700 }) : undefined;

  if (!src) return null;

  return (
    <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-clinic-900">
      <video
        controls
        preload="none"
        poster={poster}
        className="h-full w-full object-cover"
        aria-label={`Treatment video for ${caseTitle}`}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support embedded videos.
      </video>
    </div>
  );
}

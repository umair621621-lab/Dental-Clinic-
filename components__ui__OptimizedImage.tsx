'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cloudinaryUrl } from '@/src/sanity/image';
import type { CloudinaryImage } from '@/src/types';

interface OptimizedImageProps {
  image?: CloudinaryImage;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}

function ImagePlaceholder({
  className,
  fill,
  width,
  height,
}: {
  className?: string;
  fill: boolean;
  width: number;
  height: number;
}) {
  return (
    <div
      className={`flex items-center justify-center bg-clinic-100 text-clinic-400 ${className ?? ''}`}
      style={fill ? undefined : { width, height }}
      role="img"
      aria-label="Image not available"
    >
      <span className="text-xs">Image coming soon</span>
    </div>
  );
}

/**
 * Renders a Cloudinary-hosted image through next/image so we still
 * get lazy loading, responsive sizing and layout-shift protection,
 * while the actual bytes/transforms are served from Cloudinary.
 * Fails gracefully to the same placeholder both when a CMS field is
 * empty AND when the resolved Cloudinary URL fails to actually load
 * (e.g. an asset was deleted/renamed in Cloudinary after publish) —
 * a real network/asset failure should never surface as a browser
 * broken-image icon.
 */
export function OptimizedImage({
  image,
  width,
  height,
  className,
  sizes,
  priority = false,
  fill = false,
}: OptimizedImageProps) {
  const [failed, setFailed] = useState(false);

  if (!image?.publicId || failed) {
    return <ImagePlaceholder className={className} fill={fill} width={width} height={height} />;
  }

  const src = cloudinaryUrl(image.publicId, {
    width: width * 2,
    height: height * 2,
  });

  if (fill) {
    return (
      <Image
        src={src}
        alt={image.alt}
        fill
        sizes={sizes ?? '100vw'}
        className={className}
        priority={priority}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={image.alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      priority={priority}
      onError={() => setFailed(true)}
    />
  );
}

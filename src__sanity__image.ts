/**
 * Media in this project lives in Cloudinary, not Sanity's asset
 * pipeline — Sanity documents only store a Cloudinary `publicId`.
 * This module turns that publicId into an optimized delivery URL.
 * (File kept under src/sanity/ so all "given a CMS field, get a
 * usable URL" logic sits in one predictable place.)
 */

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'limit' | 'thumb' | 'scale';
  gravity?: 'auto' | 'face' | 'center';
  quality?: 'auto' | number;
}

/**
 * Builds a transformed, auto-format/auto-quality Cloudinary delivery
 * URL from a stored publicId. Safe to call from Server Components;
 * the resulting string contains no secrets (cloud name is not
 * sensitive — it appears in every public Cloudinary URL by design).
 */
export function cloudinaryUrl(
  publicId: string | undefined,
  options: CloudinaryTransformOptions = {}
): string {
  if (!publicId) return '';
  if (!CLOUD_NAME) {
    console.warn('[cloudinary] CLOUDINARY_CLOUD_NAME is not set.');
    return '';
  }

  const { width, height, crop = 'fill', gravity = 'auto', quality = 'auto' } =
    options;

  const transforms = [
    'f_auto',
    `q_${quality}`,
    crop ? `c_${crop}` : null,
    width ? `w_${width}` : null,
    height ? `h_${height}` : null,
    crop === 'fill' || crop === 'thumb' ? `g_${gravity}` : null,
  ]
    .filter(Boolean)
    .join(',');

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}

export function cloudinaryVideoUrl(publicId: string | undefined): string {
  if (!publicId || !CLOUD_NAME) return '';
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_auto/${publicId}`;
}

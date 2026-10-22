import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { apiVersion, dataset, projectId, isSanityConfigured } from '../env';

export const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true, perspective: 'published' })
  : null;

const builder = isSanityConfigured ? imageUrlBuilder({ projectId, dataset }) : null;

export type ImageWithAlt = SanityImageSource & { alt?: string; asset?: { _ref?: string } };

/** URL gambar Sanity (auto format webp/avif), atau undefined bila gambar belum diisi. */
export function imageUrl(image: ImageWithAlt | undefined | null, width?: number, height?: number): string | undefined {
  if (!builder || !image?.asset?._ref) return undefined;
  let img = builder.image(image).auto('format');
  if (width) img = img.width(width);
  // Dengan tinggi: crop mengikuti hotspot; tanpa tinggi: skala proporsional.
  img = height ? img.height(height).fit('crop') : img.fit('max');
  return img.url();
}

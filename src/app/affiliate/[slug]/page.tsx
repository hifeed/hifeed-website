import { redirect, notFound } from 'next/navigation';
import { getAffiliateUrl } from '@/sanity/content';
import { FALLBACK_AFFILIATE_LINKS } from '@/sanity/affiliateFallback';

// Link afiliasi dikelola di CMS (dokumen "Affiliate link"); map bawaan dipakai bila
// Sanity belum terhubung atau slug belum ada di CMS.
export default async function AffiliateRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const target = (await getAffiliateUrl(slug)) ?? FALLBACK_AFFILIATE_LINKS[slug];
  if (target) redirect(target);
  notFound();
}

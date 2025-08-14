import { redirect, notFound } from 'next/navigation';

// Mapping slug affiliate ke URL tujuan.
// Tambahkan entri baru sesuai kebutuhan.
const affiliateMap: Record<string, string> = {
  dibales_ai_plus_checkout: 'https://cs.pake.ai/a/HIFEEDSALES1725/instagram-comment-to-dm/checkout',
  dibales_ai_plus_description : 'https://cs.pake.ai/a/HIFEEDSALES1725/instagram-comment-to-dm/sales/1',
  dibales_ai_pro_checkout : 'https://cs.pake.ai/a/HIFEEDSALES1725/pro/checkout',
  dibales_ai_pro_description : 'https://cs.pake.ai/a/HIFEEDSALES1725/pro/sales/5'
};

export const runtime = 'nodejs'; // boleh dihapus jika tidak diperlukan

// Accept unknown props and assert the shape only where needed to avoid TypeScript/PageProps conflicts and ESLint `no-explicit-any`.
export default function AffiliateRedirect(props: unknown) {
  const params = (props as { params?: { slug?: string } })?.params;
  const slug = params?.slug;

  const target = slug ? affiliateMap[slug] : undefined;
  if (target) {
    redirect(target);
  }
  notFound();
}

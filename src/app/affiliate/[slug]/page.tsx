import { redirect, notFound } from 'next/navigation';

// Mapping slug affiliate ke URL tujuan.
// Tambahkan entri baru sesuai kebutuhan.
const affiliateMap: Record<string, string> = {
  dibales_ai_plus_checkout: 'https://cs.pake.ai/a/HIFEEDSALES1725/instagram-comment-to-dm/checkout',
  dibales_ai_plus_sales : 'https://cs.pake.ai/a/HIFEEDSALES1725/instagram-comment-to-dm/sales/1',
  dibales_ai_pro_checkout : 'https://cs.pake.ai/a/HIFEEDSALES1725/pro/checkout',
  dibales_ai_pro_sales : 'https://cs.pake.ai/a/HIFEEDSALES1725/pro/sales/5'
};

export const runtime = 'nodejs'; // boleh dihapus jika tidak diperlukan

export default function AffiliateRedirect({ params }: { params: { slug: string } }) {
  const target = affiliateMap[params.slug];
  if (target) {
    redirect(target);
  }
  notFound();
}

import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { SANITY_CACHE_TAG } from '@/sanity/env';

// Dipanggil oleh webhook Sanity setiap kali dokumen di-publish / dihapus,
// sehingga halaman statis /en & /id dibuat ulang dengan konten terbaru.
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: 'SANITY_REVALIDATE_SECRET is not set' }, { status: 500 });
  }

  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(request, secret);
    if (!isValidSignature) {
      return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
    }
    revalidateTag(SANITY_CACHE_TAG);
    return NextResponse.json({ revalidated: true, type: body?._type ?? null });
  } catch (error) {
    console.error('[sanity] Revalidate webhook failed', error);
    return NextResponse.json({ message: 'Bad request' }, { status: 400 });
  }
}

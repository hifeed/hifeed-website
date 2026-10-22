import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, isLocale, LOCALE_COOKIE } from './i18n/config';
import type { Locale } from './i18n/dictionaries';

// Urutan deteksi: pilihan user (cookie) → negara (header Vercel) → Accept-Language → default.
function detectLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(saved)) return saved;

  const country = (request.headers.get('x-vercel-ip-country') || '').toUpperCase();
  if (country === 'ID') return 'id';

  const acceptLanguage = request.headers.get('accept-language') || '';
  if (/^id\b|[,\s]id\b/i.test(acceptLanguage)) return 'id';

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split('/')[1];
  if (isLocale(firstSegment)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${detectLocale(request)}${pathname === '/' ? '' : pathname}`;
  // 307: tujuan redirect bergantung pada pengunjung, jangan di-cache sebagai permanen.
  return NextResponse.redirect(url, 307);
}

export const config = {
  // Lewati API, aset Next, dashboard MRV, Sanity Studio, redirect afiliasi, dan semua file
  // ber-ekstensi (sitemap.xml, robots.txt, manifest, gambar di /public).
  matcher: ['/((?!api|_next|_vercel|mrv|studio|affiliate|.*\\..*).*)'],
};

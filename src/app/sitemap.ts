import type { MetadataRoute } from 'next'
import { locales, siteUrl } from '../i18n/config'

// Setiap halaman publik ditulis sekali per bahasa, lengkap dengan alternates (hreflang).
const pages = [{ path: '', changeFrequency: 'weekly' as const, priority: 1 }]

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((page) => {
    const languages = Object.fromEntries(
      locales.map((l) => [l, `${siteUrl}/${l}${page.path}`]),
    )
    return locales.map((locale) => ({
      url: `${siteUrl}/${locale}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages },
    }))
  })
}

import type { MetadataRoute } from 'next'
import { isIndexable, siteUrl } from '../i18n/config'

export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/studio'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}

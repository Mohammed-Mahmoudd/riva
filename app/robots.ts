import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/', '/cart', '/checkout', '/wishlist'],
      },
    ],
    sitemap: 'https://itsriva.com/sitemap.xml',
  }
}

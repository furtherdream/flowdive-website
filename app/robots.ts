import type { MetadataRoute } from 'next'

const SITE_URL = 'https://flowdive.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/stats',     // 로그인 필요 — 검색 노출 의미 없음
          '/checkout',  // 결제 트랜잭션 URL
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
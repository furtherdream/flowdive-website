import type { MetadataRoute } from 'next'

// `output: 'export'` 정적 빌드에서 라우트 핸들러를 빌드 타임에 정적으로 생성하도록 명시.
export const dynamic = 'force-static'

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
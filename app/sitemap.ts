import type { MetadataRoute } from 'next'
import { listAllPosts, getBlogPost } from './lib/blog'

// `output: 'export'` 정적 빌드에서 라우트 핸들러를 빌드 타임에 정적으로 생성하도록 명시.
export const dynamic = 'force-static'

const SITE_URL = 'https://flowdive.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  // 모든 (slug, locale) 조합 — 영어는 /blog/<slug>, 한국어는 /ko/blog/<slug>
  const blogPosts: MetadataRoute.Sitemap = listAllPosts().map(({ slug, locale }) => {
    const post = getBlogPost(slug, locale)!
    const urlPath = locale === 'en' ? `/blog/${slug}` : `/${locale}/blog/${slug}`
    return {
      url: `${SITE_URL}${urlPath}`,
      lastModified: new Date(post.frontmatter.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  })
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/pricing`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/refund`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/ko/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogPosts,
    // /stats 는 로그인 페이지라 sitemap 에서 제외
    // /checkout 은 결제 진입 URL — 인덱싱 의미 없음
  ]
}
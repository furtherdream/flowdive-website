// 블로그 글 (MDX) 읽기 헬퍼. 빌드 타임에만 동작 — `content/blog/*.mdx` 파일들을
// 스캔하고 frontmatter + body 를 반환.
//
// 새 글 작성:
//   content/blog/<slug>.mdx 에 파일 추가
//   ---
//   title: "글 제목"
//   description: "검색 결과 / OG 에 표시될 한 줄 요약 (~160자)"
//   date: "2026-05-29"
//   author: "Flowdive"
//   locale: ko | en | ja | zh-CN | es | de   (옵션, 기본 ko)
//   ---
//   본문 markdown...

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export type BlogFrontmatter = {
  title: string
  description: string
  date: string             // ISO "YYYY-MM-DD"
  author?: string
  locale?: 'ko' | 'en' | 'ja' | 'zh-CN' | 'es' | 'de'
  cover?: string           // /public 경로
}

export type BlogPost = {
  slug: string
  frontmatter: BlogFrontmatter
  content: string          // raw MDX body
}

/** content/blog 디렉토리 안의 모든 .mdx 파일을 발행일 내림차순으로 반환 */
export function listBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))
  const posts: BlogPost[] = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
    const { data, content } = matter(raw)
    return {
      slug,
      frontmatter: data as BlogFrontmatter,
      content,
    }
  })
  return posts.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1))
}

/** 특정 slug 의 글 반환 (없으면 null) */
export function getBlogPost(slug: string): BlogPost | null {
  return listBlogPosts().find((p) => p.slug === slug) ?? null
}

/** slug 목록만 — generateStaticParams 용 */
export function listBlogSlugs(): string[] {
  return listBlogPosts().map((p) => p.slug)
}
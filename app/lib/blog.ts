// 영어 전용 블로그 헬퍼.
// 파일: content/blog/<slug>.mdx
//
// 글로벌 사용자를 위해 영어로만 작성. 비영어권 사용자는 브라우저 자동 번역 (Chrome/Safari/Edge
// 모두 내장) 으로 자국어 열람 가능 — 별도 인프라 불필요.

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export type BlogFrontmatter = {
  title: string
  description: string
  date: string             // ISO "YYYY-MM-DD"
  author?: string
  cover?: string
}

export type BlogPost = {
  slug: string
  frontmatter: BlogFrontmatter
  content: string
}

/** content/blog 안의 모든 .mdx 파일을 발행일 내림차순으로 반환 */
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

/** generateStaticParams 용 — slug 목록 */
export function listBlogSlugs(): string[] {
  return listBlogPosts().map((p) => p.slug)
}
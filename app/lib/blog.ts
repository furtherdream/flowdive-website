// 다국어 블로그 (영어 / 한국어) 헬퍼.
//
// 파일 구조:
//   content/blog/<slug>/<locale>.mdx
//   예) content/blog/five-rules-for-deep-work/en.mdx
//       content/blog/five-rules-for-deep-work/ko.mdx
//
// 한 글의 두 언어가 같은 폴더에 있으면 hreflang alternate 로 연결됨.
// 한 언어만 있어도 OK — 그 언어 URL 만 sitemap 에 등록됨.

import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export type BlogLocale = 'en' | 'ko'

export type BlogFrontmatter = {
  title: string
  description: string
  date: string             // ISO "YYYY-MM-DD"
  author?: string
  locale?: BlogLocale
  cover?: string
}

export type BlogPost = {
  slug: string
  locale: BlogLocale
  frontmatter: BlogFrontmatter
  content: string
  /** 같은 글의 다른 언어 버전들 (있으면) */
  alternates: BlogLocale[]
}

function isLocale(s: string): s is BlogLocale {
  return s === 'en' || s === 'ko'
}

/** 폴더 안에 있는 locale 들 — 예: ['en', 'ko'] */
function availableLocalesInFolder(slugFolder: string): BlogLocale[] {
  const dir = path.join(BLOG_DIR, slugFolder)
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
    .filter(isLocale)
}

/** 모든 slug 폴더 — content/blog 직속 디렉토리 이름들 */
function listSlugFolders(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((name) => fs.statSync(path.join(BLOG_DIR, name)).isDirectory())
}

/** 특정 locale 의 글 목록 (발행일 내림차순) */
export function listBlogPosts(locale: BlogLocale): BlogPost[] {
  const posts: BlogPost[] = []
  for (const slug of listSlugFolders()) {
    const locales = availableLocalesInFolder(slug)
    if (!locales.includes(locale)) continue
    const raw = fs.readFileSync(path.join(BLOG_DIR, slug, `${locale}.mdx`), 'utf-8')
    const { data, content } = matter(raw)
    posts.push({
      slug,
      locale,
      frontmatter: data as BlogFrontmatter,
      content,
      alternates: locales.filter((l) => l !== locale),
    })
  }
  return posts.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1))
}

/** 특정 (slug, locale) 글 반환 */
export function getBlogPost(slug: string, locale: BlogLocale): BlogPost | null {
  const locales = availableLocalesInFolder(slug)
  if (!locales.includes(locale)) return null
  const raw = fs.readFileSync(path.join(BLOG_DIR, slug, `${locale}.mdx`), 'utf-8')
  const { data, content } = matter(raw)
  return {
    slug,
    locale,
    frontmatter: data as BlogFrontmatter,
    content,
    alternates: locales.filter((l) => l !== locale),
  }
}

/** generateStaticParams 용 — 해당 locale 의 글이 있는 slug 들만 */
export function listBlogSlugs(locale: BlogLocale): string[] {
  return listSlugFolders().filter((slug) => availableLocalesInFolder(slug).includes(locale))
}

/** 모든 (slug, locale) 조합 — sitemap 용 */
export function listAllPosts(): { slug: string; locale: BlogLocale }[] {
  const out: { slug: string; locale: BlogLocale }[] = []
  for (const slug of listSlugFolders()) {
    for (const locale of availableLocalesInFolder(slug)) {
      out.push({ slug, locale })
    }
  }
  return out
}

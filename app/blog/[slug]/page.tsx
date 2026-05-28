// 개별 블로그 글 — MDX 본문 렌더 + JSON-LD Article 스키마.
// 영어 전용. 비영어권 사용자는 브라우저 자동 번역 (Chrome 우상단 번역 아이콘) 으로 열람.

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getBlogPost, listBlogSlugs } from '../../lib/blog'

const SITE_URL = 'https://flowdive.app'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return listBlogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return { title: 'Not found' }
  const { title, description, date } = post.frontmatter
  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: date,
      url: `${SITE_URL}/blog/${slug}`,
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const { title, description, date, author } = post.frontmatter

  // Google 리치 결과용 Article 구조화 데이터
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: date,
    dateModified: date,
    inLanguage: 'en',
    author: { '@type': 'Organization', name: author ?? 'Flowdive' },
    publisher: {
      '@type': 'Organization',
      name: 'Flowdive',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${slug}` },
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <img src="/icon.png" alt="" width={24} height={24} className="rounded" />
            <span>Flowdive</span>
          </Link>
          <Link href="/blog" className="text-sm text-slate-500 hover:text-slate-900">
            ← All posts
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-violet-600 font-semibold text-xs uppercase tracking-wider mb-4">
          {formatDate(date)}
        </p>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed mb-12">{description}</p>

        <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-violet-600 prose-a:no-underline hover:prose-a:underline prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-medium prose-code:before:content-none prose-code:after:content-none">
          <MDXRemote source={post.content} />
        </div>

        <footer className="mt-16 pt-8 border-t border-slate-100">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-slate-900 text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-slate-800 transition-colors"
          >
            Get Flowdive →
          </Link>
        </footer>
      </article>
    </main>
  )
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

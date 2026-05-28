// 한국어 블로그 목록 — /ko/blog. canonical 은 영어 /blog.

import Link from 'next/link'
import { listBlogPosts } from '../../lib/blog'

export const metadata = {
  title: '블로그',
  description: 'Flowdive 블로그 — 집중, 딥 워크, 산만함 차단에 대한 글.',
  alternates: {
    canonical: 'https://flowdive.app/blog',
    languages: {
      en: 'https://flowdive.app/blog',
      ko: 'https://flowdive.app/ko/blog',
    },
  },
}

export default function KoBlogIndex() {
  const posts = listBlogPosts('ko')

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <img src="/icon.png" alt="" width={24} height={24} className="rounded" />
            <span>Flowdive</span>
          </Link>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-violet-600 font-semibold text-sm uppercase tracking-wider mb-3">Blog</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-12">
          몰입의 깊은 곳으로
        </h1>

        <div className="flex items-center gap-3 mb-12 text-sm">
          <Link href="/blog" className="text-slate-500 hover:text-slate-900">English</Link>
          <span className="text-slate-300">·</span>
          <Link href="/ko/blog" className="font-semibold text-slate-900">한국어</Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-slate-500">아직 발행된 글이 없습니다.</p>
        ) : (
          <ul className="space-y-10">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-slate-100 pb-10 last:border-b-0">
                <Link href={`/ko/blog/${post.slug}`} className="group">
                  <time className="text-xs text-slate-400 font-medium">
                    {formatDate(post.frontmatter.date)}
                  </time>
                  <h2 className="text-2xl font-bold text-slate-900 mt-2 group-hover:text-violet-600 transition-colors">
                    {post.frontmatter.title}
                  </h2>
                  <p className="text-slate-500 mt-3 leading-relaxed">
                    {post.frontmatter.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-violet-600 text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                    더 읽기 →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-16 pt-8 border-t border-slate-100 text-center text-xs text-slate-400">
          <div className="flex justify-center gap-6 mb-3">
            <Link href="/pricing" className="hover:text-slate-600">가격</Link>
            <Link href="/terms" className="hover:text-slate-600">약관</Link>
            <Link href="/privacy" className="hover:text-slate-600">개인정보</Link>
          </div>
          <p>© 2026 Flowdive</p>
        </div>
      </section>
    </main>
  )
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}
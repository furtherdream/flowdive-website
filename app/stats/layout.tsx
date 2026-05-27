export const metadata = {
  title: 'Personal Stats',
  description: 'Flowdive 개인 집중 통계 대시보드. 일/주/월 집중 시간, Deep Dive 비율, 목표 키워드 분석.',
  alternates: { canonical: 'https://flowdive.app/stats' },
  // 로그인 필요 페이지 — 검색 노출 차단
  robots: { index: false, follow: false },
}

export default function StatsLayout({ children }: { children: React.ReactNode }) {
  return children
}
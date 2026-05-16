export const metadata = {
  title: 'Privacy Notice — Flowdive',
}

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20 text-slate-800 font-sans leading-relaxed">
      <a href="/" className="inline-flex items-center gap-2 font-bold text-lg text-slate-900 mb-10">
        <img src="/icon.png" alt="" width={24} height={24} className="rounded" /><span>Flowdive</span>
      </a>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">개인정보처리방침 (Privacy Notice)</h1>
      <p className="text-sm text-slate-500 mb-10">최종 업데이트: 2026-05-15</p>

      <Section title="1. 수집하는 개인정보">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>계정 정보</strong>: Google 로그인 시 이메일 주소, 이름, 프로필 이미지</li>
          <li><strong>구독 정보</strong>: 구독 상태, 만료일 (결제 정보는 저장하지 않음)</li>
          <li><strong>설정 정보</strong>: 사용자가 입력한 차단 사이트·앱 리스트, 목표 (대부분 로컬 기기에 저장)</li>
        </ul>
      </Section>

      <Section title="2. 처리 목적">
        <ul className="list-disc pl-6 space-y-2">
          <li>로그인 및 사용자 식별</li>
          <li>구독 상태 확인 및 Pro 기능 제공</li>
          <li>고객 지원 응대</li>
        </ul>
      </Section>

      <Section title="3. 처리 위탁 (제3자 제공)">
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Supabase Inc.</strong> — 인증·데이터베이스 호스팅</li>
          <li><strong>Paddle.com Market Limited</strong> — 결제 처리 및 영수증 발행</li>
          <li><strong>Google LLC</strong> — OAuth 로그인 제공</li>
        </ul>
        결제 카드 정보는 Paddle에서만 처리되며 Flowdive 서버에 저장되지 않습니다.
      </Section>

      <Section title="4. 보관 기간">
        계정 삭제 요청 시 즉시 파기됩니다. 단, 관계 법령(전자상거래법 등)에 따라 결제·세금 관련 기록은 5년간 보관됩니다.
      </Section>

      <Section title="5. 사용자 권리">
        사용자는 언제든지 본인의 개인정보 열람·정정·삭제·처리 정지를 요청할 수 있으며, 아래 연락처로 문의하실 수 있습니다.
      </Section>

      <Section title="6. 보안">
        모든 통신은 TLS로 암호화되며, Supabase의 Row Level Security 정책으로 사용자별 데이터가 격리됩니다.
      </Section>

      <Section title="7. 변경 사항">
        본 방침이 변경되는 경우 서비스 내 공지를 통해 알려드립니다.
      </Section>

      <Section title="8. 연락처">
        개인정보 관련 문의: <a href="mailto:support@flowdive.app" className="text-violet-600 underline">support@flowdive.app</a>
      </Section>

      <p className="text-xs text-slate-400 mt-16">© 2026 Flowdive. All rights reserved.</p>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-slate-900 mb-3">{title}</h2>
      <div className="text-slate-700">{children}</div>
    </section>
  )
}

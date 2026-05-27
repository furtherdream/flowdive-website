export const metadata = {
  title: 'Terms of Service',
  description: 'Flowdive 서비스 이용약관. 계정, 구독, 결제, 환불 등에 관한 조건.',
  alternates: { canonical: 'https://flowdive.app/terms' },
}

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20 text-slate-800 font-sans leading-relaxed">
      <a href="/" className="inline-flex items-center gap-2 font-bold text-lg text-slate-900 mb-10">
        <img src="/icon.png" alt="" width={24} height={24} className="rounded" /><span>Flowdive</span>
      </a>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">이용약관 (Terms of Service)</h1>
      <p className="text-sm text-slate-500 mb-10">최종 업데이트: 2026-05-15</p>

      <Section title="1. 서비스 개요">
        Flowdive(이하 “서비스”)는 사용자가 정한 사이트와 앱 접근을 차단하여 집중력 향상을 돕는 Chrome 확장 프로그램 및 데스크탑 앱입니다.
      </Section>

      <Section title="2. 계정">
        Deep Dive 및 Pro 기능 이용을 위해 Google 계정을 통한 로그인이 필요합니다. 사용자는 계정 정보의 보안을 유지할 책임이 있습니다.
      </Section>

      <Section title="3. 구독 및 결제">
        <ul className="list-disc pl-6 space-y-2">
          <li>유료 구독은 월 단위 자동 갱신으로 제공됩니다.</li>
          <li>결제는 결제 대행사 <strong>Paddle.com Market Limited</strong>가 처리하며, 영수증 발행 및 세금 처리는 Paddle을 통해 이루어집니다.</li>
          <li>구독은 언제든 취소할 수 있으며, 현재 결제 주기가 끝날 때까지 Pro 기능이 유지됩니다.</li>
        </ul>
      </Section>

      <Section title="4. 환불">
        환불 정책은 <a href="/refund" className="text-violet-600 underline">환불 정책</a>을 참고하세요.
      </Section>

      <Section title="5. 사용자 의무">
        사용자는 서비스를 적법한 목적으로만 사용해야 하며, 서비스의 정상 작동을 방해하거나 무단 복제·역공학 시도하지 않습니다.
      </Section>

      <Section title="6. 면책 조항">
        서비스는 “있는 그대로” 제공되며, 사용자의 작업 완료나 생산성을 보장하지 않습니다. 서비스 중단·오류로 인한 손해에 대해 법이 허용하는 최대 범위에서 책임지지 않습니다.
      </Section>

      <Section title="7. 약관 변경">
        약관은 사전 공지 후 변경될 수 있으며, 변경 후에도 서비스를 계속 이용하는 경우 변경에 동의한 것으로 간주됩니다.
      </Section>

      <Section title="8. 준거법">
        본 약관은 대한민국 법률에 따라 해석되며, 분쟁은 서울중앙지방법원을 1심 관할 법원으로 합니다.
      </Section>

      <Section title="9. 연락처">
        문의: <a href="mailto:support@flowdive.app" className="text-violet-600 underline">support@flowdive.app</a>
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

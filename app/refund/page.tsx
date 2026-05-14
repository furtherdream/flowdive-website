export const metadata = {
  title: 'Refund Policy — Flowdive',
}

export default function RefundPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20 text-slate-800 font-sans leading-relaxed">
      <a href="/" className="inline-flex items-center gap-2 font-bold text-lg text-slate-900 mb-10">
        <span>🎯</span><span>Flowdive</span>
      </a>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">환불 정책 (Refund Policy)</h1>
      <p className="text-sm text-slate-500 mb-10">최종 업데이트: 2026-05-15</p>

      <Section title="1. 환불 가능 기간">
        <strong>최초 구독 결제일로부터 7일 이내</strong>에 환불 요청 시 전액 환불해드립니다. 한국 「전자상거래법」상의 청약철회권에 준합니다.
      </Section>

      <Section title="2. 환불 절차">
        <ol className="list-decimal pl-6 space-y-2">
          <li><a href="mailto:support@flowdive.app" className="text-violet-600 underline">support@flowdive.app</a> 로 환불 요청 메일을 보내주세요.</li>
          <li>가입 시 사용한 이메일과 결제일을 함께 알려주세요.</li>
          <li>요청 확인 후 영업일 기준 1~3일 내 환불 절차가 시작됩니다.</li>
          <li>실제 환불은 결제 대행사 <strong>Paddle</strong>을 통해 진행되며, 카드사 정책에 따라 추가 3~10영업일 소요될 수 있습니다.</li>
        </ol>
      </Section>

      <Section title="3. 환불 불가 사유">
        <ul className="list-disc pl-6 space-y-2">
          <li>구독 시작 후 7일이 경과한 경우</li>
          <li>서비스의 핵심 기능(차단, Strong 모드)을 정상적으로 이용한 정황이 명확한 경우</li>
          <li>약관 위반(역공학, 무단 재배포 등)으로 인한 계정 정지</li>
        </ul>
      </Section>

      <Section title="4. 부분 환불">
        월 구독 중 사용 일수에 비례한 부분 환불은 원칙적으로 제공되지 않습니다. 단, 명백한 서비스 장애가 1주일 이상 지속된 경우 부분 환불을 검토합니다.
      </Section>

      <Section title="5. 구독 취소 vs 환불">
        구독 “취소”는 자동 갱신을 중단할 뿐, 이미 결제된 금액은 환불되지 않습니다. 환불을 원하시면 위 절차에 따라 별도 요청해주세요.
      </Section>

      <Section title="6. 결제 대행사 안내">
        결제 영수증, 결제 수단 변경 등은 Paddle 고객 포털에서 확인 가능합니다. 결제 영수증 메일에 포함된 링크를 이용해주세요.
      </Section>

      <Section title="7. 연락처">
        환불 문의: <a href="mailto:support@flowdive.app" className="text-violet-600 underline">support@flowdive.app</a>
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

'use client'

// Flowdive 결제 페이지
//   - Paddle 의 Default Payment Link 가 이 페이지를 가리킴: https://flowdive.app/checkout?_ptxn=txn_xxx
//   - URL 쿼리에서 _ptxn (transaction id) 를 읽어 Paddle.js 로 결제 UI 표시
//   - 결제 완료 후 사용자는 데스크탑 앱으로 돌아감 (이 페이지는 더 이상 필요 없음)
//
// 환경변수:
//   NEXT_PUBLIC_PADDLE_CLIENT_TOKEN — Paddle production client-side token (live_... 로 시작)

import Script from 'next/script'
import { useEffect, useState } from 'react'

declare global {
  interface Window {
    Paddle?: any
  }
}

const PADDLE_CLIENT_TOKEN = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN

export default function CheckoutPage() {
  const [status, setStatus] = useState<'loading' | 'opened' | 'completed' | 'error' | 'invalid'>('loading')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const txn = params.get('_ptxn')

    if (!txn) {
      setStatus('invalid')
      return
    }

    if (!PADDLE_CLIENT_TOKEN) {
      setStatus('error')
      setErrorMsg('Configuration missing: PADDLE_CLIENT_TOKEN')
      return
    }

    // Paddle.js 로드 대기
    const wait = setInterval(() => {
      if (!window.Paddle) return
      clearInterval(wait)

      try {
        window.Paddle.Initialize({
          token: PADDLE_CLIENT_TOKEN,
          eventCallback: (e: any) => {
            if (e.name === 'checkout.completed') {
              setStatus('completed')
            }
          },
        })
        window.Paddle.Checkout.open({ transactionId: txn })
        setStatus('opened')
      } catch (err: any) {
        setStatus('error')
        setErrorMsg(err?.message || 'Unknown error')
      }
    }, 100)

    return () => clearInterval(wait)
  }, [])

  return (
    <>
      <Script src="https://cdn.paddle.com/paddle/v2/paddle.js" strategy="afterInteractive" />

      <main className="min-h-screen flex items-center justify-center bg-slate-50 font-sans px-6">
        <div className="text-center max-w-md">
          <a href="/" className="inline-flex items-center gap-2 font-bold text-xl text-slate-900 mb-10">
            <span>🎯</span>
            <span>Flowdive</span>
          </a>

          {status === 'loading' && (
            <p className="text-slate-500">결제창을 불러오는 중...</p>
          )}

          {status === 'opened' && (
            <p className="text-slate-500">결제창이 열렸습니다. 결제를 완료해주세요.</p>
          )}

          {status === 'completed' && (
            <div>
              <div className="text-5xl mb-4">✅</div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">결제 완료!</h1>
              <p className="text-slate-500">Flowdive 앱으로 돌아가주세요. 자동으로 Pro 가 활성화됩니다.</p>
            </div>
          )}

          {status === 'invalid' && (
            <div>
              <h1 className="text-xl font-bold text-slate-900 mb-2">잘못된 접근입니다</h1>
              <p className="text-slate-500 text-sm">결제 링크가 유효하지 않습니다. 앱에서 다시 시도해주세요.</p>
            </div>
          )}

          {status === 'error' && (
            <div>
              <h1 className="text-xl font-bold text-slate-900 mb-2">오류가 발생했습니다</h1>
              <p className="text-slate-500 text-sm mb-2">잠시 후 다시 시도해주세요.</p>
              {errorMsg && <p className="text-slate-400 text-xs">{errorMsg}</p>}
            </div>
          )}

          <footer className="mt-16 text-xs text-slate-400">
            <a href="/terms" className="hover:text-slate-600 mx-2">Terms of Service</a>·
            <a href="/privacy" className="hover:text-slate-600 mx-2">Privacy Notice</a>·
            <a href="/refund" className="hover:text-slate-600 mx-2">Refund Policy</a>
          </footer>
        </div>
      </main>
    </>
  )
}
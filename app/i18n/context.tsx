'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Locale, LOCALES, messages } from './messages'

type I18nContextType = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (typeof messages)[Locale]
}

const I18nContext = createContext<I18nContextType | null>(null)

/**
 * 브라우저 언어 → 우리 6개 locale 중 하나로 매핑.
 * 우선순위: navigator.languages 의 앞에서부터 일치하는 첫 항목 → 영어 fallback.
 *
 * 매칭 규칙:
 *  - 정확 일치 (`zh-CN`) 가장 우선
 *  - 그 다음 prefix 일치 (`zh-TW`, `zh-HK`, `zh` → `zh-CN`)
 *  - 매칭 없으면 `en`
 */
function detectBrowserLocale(): Locale {
  if (typeof navigator === 'undefined') return 'en'
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const raw of candidates) {
    const tag = raw.toLowerCase()
    const exact = LOCALES.find((l) => l.toLowerCase() === tag)
    if (exact) return exact
    const base = tag.split('-')[0]
    if (base === 'zh') return 'zh-CN'  // 모든 중국어 변형은 간체로
    const prefix = LOCALES.find((l) => l.toLowerCase().split('-')[0] === base)
    if (prefix) return prefix
  }
  return 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  // SSR 단계에선 'en' 으로 고정 (hydration mismatch 방지) → 클라이언트 마운트 후 실제 언어 적용
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale | null
    if (saved && LOCALES.includes(saved)) {
      setLocaleState(saved)
    } else {
      setLocaleState(detectBrowserLocale())
    }
  }, [])

  const setLocale = (l: Locale) => {
    setLocaleState(l)
    localStorage.setItem('locale', l)
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: messages[locale] }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useTranslation() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useTranslation must be used inside I18nProvider')
  return ctx
}
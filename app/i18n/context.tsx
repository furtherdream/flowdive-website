'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Locale, LOCALES, messages } from './messages'

type I18nContextType = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (typeof messages)[Locale]
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ko')

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale | null
    if (saved && LOCALES.includes(saved)) setLocaleState(saved)
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
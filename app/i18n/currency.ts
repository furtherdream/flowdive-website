// 통화·가격 (언어 ≠ 통화). 사용자의 IP(timezone fallback) 로 통화 자동 선택.
// 표시 금액은 안내용 — 실제 결제는 Paddle 이 카드/IP 기반으로 자동 통화 매칭.

export type Currency = 'KRW' | 'JPY' | 'CNY' | 'USD'

export const PRICES_BY_CURRENCY: Record<
  Currency,
  { monthly: string; yearly: string; lifetime: string; yearlyDiscount: number }
> = {
  KRW: { monthly: '₩6,900', yearly: '₩59,000', lifetime: '₩69,000', yearlyDiscount: 29 },
  JPY: { monthly: '¥698', yearly: '¥5,980', lifetime: '¥6,980', yearlyDiscount: 29 },
  CNY: { monthly: '¥38', yearly: '¥288', lifetime: '¥388', yearlyDiscount: 37 },
  USD: { monthly: '$5.9', yearly: '$49', lifetime: '$59', yearlyDiscount: 31 },
}

/**
 * 사용자 통화 추정.
 *   1차 — IP geolocation (ipapi.co 무료 1000 req/day, https). 비동기.
 *   2차 — 브라우저 timezone (IP API 실패/지연 시 fallback). 동기.
 * 둘 다 실패하면 USD.
 *
 * 호출 패턴: 컴포넌트 마운트 시 timezone 으로 즉시 표시 → IP 결과 오면 갱신.
 */
export function currencyFromTimezone(): Currency {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
    if (tz === 'Asia/Seoul' || tz === 'Asia/Pyongyang') return 'KRW'
    if (tz === 'Asia/Tokyo') return 'JPY'
    if (
      tz === 'Asia/Shanghai' ||
      tz === 'Asia/Urumqi' ||
      tz === 'Asia/Chongqing' ||
      tz === 'Asia/Hong_Kong' ||
      tz === 'Asia/Macau' ||
      tz === 'Asia/Harbin'
    ) return 'CNY'
    return 'USD'
  } catch {
    return 'USD'
  }
}

export async function currencyFromIp(): Promise<Currency | null> {
  try {
    const res = await fetch('https://ipapi.co/json/', { cache: 'force-cache' })
    if (!res.ok) return null
    const data = await res.json()
    const cc = String(data.country_code || '').toUpperCase()
    if (cc === 'KR' || cc === 'KP') return 'KRW'
    if (cc === 'JP') return 'JPY'
    if (cc === 'CN' || cc === 'HK' || cc === 'MO' || cc === 'TW') return 'CNY'
    return 'USD'
  } catch {
    return null
  }
}
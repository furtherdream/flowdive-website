// Next.js 가 빌드 타임에 1200×630 OG 이미지를 자동 생성.
// 페북·카톡·트위터·디스코드 등에서 링크 미리보기 카드로 사용됨.
// 별도 정적 파일 관리 불필요 — 카피 변경 시 이 파일만 수정.

import { ImageResponse } from 'next/og'

// runtime='edge' 는 Vercel 전용. GitHub Pages 정적 export 에선 빌드 타임에 nodejs 로 생성.
export const dynamic = 'force-static'
export const alt = 'Flowdive — Dive into flow'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #4c1d95 100%)',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
          padding: '80px',
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: '-0.04em', display: 'flex' }}>
          Flowdive
        </div>
        <div
          style={{
            fontSize: 40,
            color: '#c4b5fd',
            marginTop: 24,
            fontWeight: 500,
            letterSpacing: '-0.01em',
            display: 'flex',
          }}
        >
          Dive into flow.
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#94a3b8',
            marginTop: 60,
            fontWeight: 400,
            maxWidth: 900,
            textAlign: 'center',
            lineHeight: 1.4,
            display: 'flex',
          }}
        >
          Block distracting sites and apps across Chrome, desktop, and Android.
        </div>
      </div>
    ),
    { ...size },
  )
}

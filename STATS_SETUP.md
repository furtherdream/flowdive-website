# 통계 페이지 (`/stats`) 활성화 체크리스트

빌드/배포가 정상 동작하려면 다음 설정이 필요합니다.

## 1. GitHub 저장소 시크릿 추가

`Settings → Secrets and variables → Actions → New repository secret` 에 두 개 추가:

| Secret 이름 | 값 |
|-----------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://bexdajgsyrpdtwlduvdr.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (Supabase 대시보드 → Project Settings → API → anon public key) |

## 2. Supabase Auth Redirect URL 등록

Supabase 대시보드 → `Authentication → URL Configuration → Redirect URLs` 에 추가:

```
https://flowdive.app/stats/
http://localhost:3000/stats/
```

(개발 시 `npm run dev` 로 `localhost:3000` 사용)

## 3. Supabase 마이그레이션 적용

`supabase/migrations/20260524000001_focus_sessions_history.sql` 의 내용을 Supabase 대시보드 SQL Editor 에서 실행.

## 4. 로컬 개발 시 `.env.local`

```bash
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=live_xxx
NEXT_PUBLIC_SUPABASE_URL=https://bexdajgsyrpdtwlduvdr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

`focus-website/.gitignore` 에 `.env.local` 이 이미 포함되어 있는지 확인 (Next.js 기본).

## 5. 배포 확인

`main` 에 push → Actions 가 자동 빌드/배포 → `https://flowdive.app/stats/` 접속

- 미로그인 시: "Google 로 계속" 버튼
- 로그인 후: 4가지 차트 + 요약 카드 표시
- 데이터가 없으면 안내 메시지 ("아직 기록된 세션이 없습니다")

## 6. 데이터 채워보기 (테스트)

데스크탑 또는 모바일 앱에서 같은 Google 계정으로 로그인 → 집중 모드 시작 → 종료 한 번
→ Supabase `focus_sessions_history` 에 INSERT 됨 → `/stats` 새로고침하면 보임
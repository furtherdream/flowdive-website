// Flowdive website 의 Supabase 클라이언트 (브라우저 측).
//
// 정적 export 사이트 (GitHub Pages) 에서 직접 Supabase REST/Realtime 사용.
// anon key 는 공개돼도 안전 (Supabase 설계상). 사용자 데이터는 JWT + RLS 로 보호.
//
// 환경변수 (빌드 시점):
//   NEXT_PUBLIC_SUPABASE_URL
//   NEXT_PUBLIC_SUPABASE_ANON_KEY

import { createClient, SupabaseClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

let _client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient {
  if (!url || !anonKey) {
    throw new Error('Supabase env vars not set (NEXT_PUBLIC_SUPABASE_URL / ANON_KEY)')
  }
  if (!_client) {
    _client = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,  // OAuth redirect 의 hash 자동 처리
        flowType: 'pkce',
      },
    })
  }
  return _client
}
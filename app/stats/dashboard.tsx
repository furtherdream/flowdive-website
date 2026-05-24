'use client'

// Stats Dashboard — 4가지 차트.
//   1) 일/주/월 집중 시간 (Bar)
//   2) DeepDive 세션 비율 + 횟수
//   3) (참고) 평소 차단 사이트/앱 개수 평균 — top blocked 는 향후 blocks_triggered 데이터 모이면 강화
//   4) 목표 키워드 빈도 (가장 자주 쓰인 단어 Top 10)

import { useEffect, useState } from 'react'
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts'
import { getSupabase } from '../../lib/supabaseClient'

type Row = {
  id: string
  started_at: string
  ended_at: string
  duration_seconds: number
  is_deep_dive: boolean
  goal: string | null
  initiated_by_device: string | null
  blocked_sites_count: number
  blocked_apps_count: number
}

const FETCH_DAYS = 90
const BRAND = '#6366F1'
const ACCENT = '#10B981'

export default function StatsDashboard() {
  const [rows, setRows] = useState<Row[] | null>(null)
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('day')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const sb = getSupabase()
    const sinceIso = new Date(Date.now() - FETCH_DAYS * 86_400_000).toISOString()
    sb.from('focus_sessions_history')
      .select('id,started_at,ended_at,duration_seconds,is_deep_dive,goal,initiated_by_device,blocked_sites_count,blocked_apps_count')
      .gte('started_at', sinceIso)
      .order('started_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else setRows(data as Row[])
      })
  }, [])

  if (error) {
    return <p className="text-red-600 text-sm">{error}</p>
  }
  if (!rows) {
    return <p className="text-slate-500 text-sm">데이터 불러오는 중…</p>
  }
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-10 text-center">
        <p className="text-slate-600 mb-2 font-semibold">아직 기록된 세션이 없습니다.</p>
        <p className="text-sm text-slate-500">데스크탑 / 모바일에서 집중 모드를 한 번 끝내면 여기서 통계가 보입니다.</p>
      </div>
    )
  }

  // 8시간 초과 일반 세션은 outlier 로 분리 — 종료 깜빡한 경우 등 비정상 데이터로 차트 왜곡 방지.
  // Deepdive 는 의도적으로 길게 설정 가능하므로 길이 무관하게 포함.
  const OUTLIER_THRESHOLD_SEC = 8 * 3600
  const outliers = rows.filter(r => !r.is_deep_dive && r.duration_seconds > OUTLIER_THRESHOLD_SEC)
  const cleanRows = rows.filter(r => r.is_deep_dive || r.duration_seconds <= OUTLIER_THRESHOLD_SEC)

  const totalSec = cleanRows.reduce((s, r) => s + r.duration_seconds, 0)
  const totalHours = (totalSec / 3600).toFixed(1)
  const deepDiveCount = cleanRows.filter(r => r.is_deep_dive).length

  return (
    <div className="space-y-10">
      {/* 요약 */}
      <section className="grid grid-cols-3 gap-4">
        <SummaryCard label="총 집중 시간" value={`${totalHours}h`} />
        <SummaryCard label="총 세션" value={`${cleanRows.length}회`} />
        <SummaryCard label="Deep Dive" value={`${deepDiveCount}회`} accent />
      </section>

      {outliers.length > 0 && (
        <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
          ⚠ 종료를 깜빡한 듯한 비정상 긴 일반 세션 {outliers.length}건(8시간 초과)은 차트와 합계에서 제외했습니다. Deep Dive 는 길이 무관 포함.
        </p>
      )}

      {/* 1. 일/주/월 집중 시간 */}
      <section>
        <SectionHeader title="집중 시간 추이">
          <PeriodToggle value={period} onChange={setPeriod} />
        </SectionHeader>
        <ChartCard>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={aggregateByPeriod(cleanRows, period)} margin={{ left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey="label" fontSize={11} stroke="#9CA3AF" />
              <YAxis fontSize={11} stroke="#9CA3AF" tickFormatter={(v) => `${v}h`} />
              <Tooltip
                formatter={(value) => {
                  const v = typeof value === 'number' ? value : Number(value) || 0
                  return [`${v.toFixed(1)}h`, '집중 시간']
                }}
              />
              <Bar dataKey="hours" fill={BRAND} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      {/* 2. DeepDive 비율 */}
      <section>
        <SectionHeader title="Deep Dive 비율" />
        <ChartCard>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Deep Dive', value: deepDiveCount },
                  { name: '일반 집중', value: cleanRows.length - deepDiveCount },
                ]}
                cx="50%" cy="50%"
                innerRadius={60} outerRadius={95}
                paddingAngle={2}
                dataKey="value"
                label
              >
                <Cell fill={BRAND} />
                <Cell fill="#E0E7FF" />
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </section>

      {/* 3. 평균 차단 항목 수 */}
      <section>
        <SectionHeader title="세션당 평균 차단 항목" />
        <ChartCard>
          <div className="grid grid-cols-2 divide-x divide-slate-200 text-center py-6">
            <div>
              <p className="text-3xl font-bold text-slate-900">
                {avg(cleanRows.map(r => r.blocked_sites_count)).toFixed(1)}
              </p>
              <p className="text-xs text-slate-500 mt-1">사이트</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">
                {avg(cleanRows.map(r => r.blocked_apps_count)).toFixed(1)}
              </p>
              <p className="text-xs text-slate-500 mt-1">앱</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 text-center pb-4">
            * 실제 차단 발생 횟수는 향후 기록되면 더 풍부한 통계로 보여드립니다.
          </p>
        </ChartCard>
      </section>

      {/* 4. 목표 키워드 */}
      <section>
        <SectionHeader title="자주 쓴 목표 키워드" />
        <ChartCard>
          {(() => {
            const top = topKeywords(cleanRows)
            if (top.length === 0) {
              return (
                <p className="text-sm text-slate-400 text-center py-8">
                  목표를 입력하고 세션을 끝내면 자주 쓰인 단어가 보입니다.
                </p>
              )
            }
            return (
              <ResponsiveContainer width="100%" height={Math.max(160, top.length * 32)}>
                <BarChart data={top} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
                  <XAxis type="number" fontSize={11} stroke="#9CA3AF" />
                  <YAxis dataKey="word" type="category" width={100} fontSize={12} stroke="#475569" />
                  <Tooltip />
                  <Bar dataKey="count" fill={ACCENT} radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )
          })()}
        </ChartCard>
      </section>

      <p className="text-xs text-slate-400 text-center mt-12">
        © 2026 Flowdive · 통계는 본인 계정 데이터로만 구성됩니다.
      </p>
    </div>
  )
}

// ── 소형 UI 컴포넌트 ──────────────────────────────────────

function SummaryCard({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl border ${accent ? 'border-violet-200 bg-violet-50' : 'border-slate-200 bg-white'} p-5`}>
      <p className={`text-xs ${accent ? 'text-violet-600' : 'text-slate-500'} font-semibold mb-1`}>{label}</p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  )
}

function SectionHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-base font-semibold text-slate-800">{title}</h2>
      {children}
    </div>
  )
}

function ChartCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      {children}
    </div>
  )
}

function PeriodToggle({ value, onChange }: {
  value: 'day' | 'week' | 'month',
  onChange: (v: 'day' | 'week' | 'month') => void,
}) {
  const opts: ['day' | 'week' | 'month', string][] = [['day', '일'], ['week', '주'], ['month', '월']]
  return (
    <div className="inline-flex rounded-md border border-slate-200 overflow-hidden text-xs">
      {opts.map(([k, label]) => (
        <button
          key={k}
          onClick={() => onChange(k)}
          className={`px-3 py-1 ${value === k ? 'bg-violet-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

// ── 데이터 가공 ───────────────────────────────────────────

function aggregateByPeriod(rows: Row[], period: 'day' | 'week' | 'month') {
  const buckets = new Map<string, number>()  // key → seconds
  rows.forEach((r) => {
    const d = new Date(r.started_at)
    let key: string
    if (period === 'day') {
      key = `${d.getMonth() + 1}/${d.getDate()}`
    } else if (period === 'week') {
      const monday = new Date(d)
      const day = (d.getDay() + 6) % 7  // Mon=0
      monday.setDate(d.getDate() - day)
      key = `${monday.getMonth() + 1}/${monday.getDate()}~`
    } else {
      key = `${d.getFullYear() % 100}/${String(d.getMonth() + 1).padStart(2, '0')}`
    }
    buckets.set(key, (buckets.get(key) || 0) + r.duration_seconds)
  })
  const data = Array.from(buckets.entries())
    .map(([label, sec]) => ({ label, hours: +(sec / 3600).toFixed(2) }))
  // 최근 ~ 과거 정렬 후 reverse (recharts 는 왼→오)
  return data.reverse()
}

function avg(nums: number[]): number {
  if (nums.length === 0) return 0
  return nums.reduce((a, b) => a + b, 0) / nums.length
}

// 한국어/영어 혼합 짧은 키워드 추출 — 불용어 제외
const STOP_WORDS = new Set([
  '의', '를', '을', '은', '는', '이', '가', '에', '와', '과', '도', '로', '으로', '한', '하기', '하다',
  'the', 'a', 'an', 'and', 'or', 'to', 'of', 'in', 'on', 'for', 'with', 'my', 'me', 'i',
])

function topKeywords(rows: Row[]): { word: string; count: number }[] {
  const freq = new Map<string, number>()
  rows.forEach((r) => {
    if (!r.goal) return
    const tokens = r.goal
      .toLowerCase()
      .replace(/[.,!?()\[\]{}"'·:;\/\\-]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length >= 2 && !STOP_WORDS.has(w))
    tokens.forEach((w) => freq.set(w, (freq.get(w) || 0) + 1))
  })
  return Array.from(freq.entries())
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
}
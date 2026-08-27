/**
 * Government/Admin dashboard component
 * Shows aggregate metrics, district analytics, and AI insights
 */

import type { District, ConsentSettings } from '@/types'
import { KPICards } from '@/components/common/KPICards'

interface GovernmentDashboardProps {
  districts: District[]
  filter: string
  setFilter: (filter: string) => void
  selectedCourse: string
  setSelectedCourse: (course: string) => void
  skillGapGenerated?: boolean
  setSkillGapGenerated?: (generated: boolean) => void
  consents: ConsentSettings
  setConsents: (consents: ConsentSettings) => void
}

export function GovernmentDashboard({
  districts,
  filter,
  setFilter,
  selectedCourse,
  setSelectedCourse,
  setSkillGapGenerated,
}: GovernmentDashboardProps) {
  const kpiCards = [
    { label: 'Total Trainees', value: '1,24,850', subtext: '+12.4% vs last year', icon: 'fa-arrow-up', color: 'indigo' as const },
    { label: 'Employed Rate', value: '78.4%', subtext: '97,882 active candidates', color: 'fuchsia' as const },
    { label: '6-Mo Retention', value: '71.8%', subtext: 'Verified via EPFO / Signal', color: 'yellow' as const },
    { label: 'Verified Outcomes', value: '64,820', subtext: 'Multi-signal match', icon: 'fa-circle-check', color: 'emerald' as const },
    { label: 'Avg Wage Growth', value: '+18.6%', subtext: 'Post 1-year placement', color: 'purple' as const },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* KPI Cards */}
      <KPICards cards={kpiCards} />

      {/* AI Skill Gap Analyzer Section */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-fuchsia-500/30 magenta-glow space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-950/80 border border-fuchsia-500/40 text-fuchsia-300 text-xs font-bold mb-2">
              <i className="fa-solid fa-wand-magic-sparkles"></i> AI Outcome Intelligence Engine
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              AI Skill Gap &amp; Curriculum Demand Analyzer
            </h2>
            <p className="text-xs text-indigo-200/80">
              Compares state vocational syllabus against real-time live employer job postings.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="bg-[#0c1024] border border-indigo-800 text-indigo-200 text-xs font-semibold rounded-xl px-4 py-2.5 focus:outline-none focus:border-fuchsia-500"
            >
              <option value="Data Analytics">Course: Data Analytics</option>
              <option value="Web Development">Course: Web Development</option>
              <option value="CNC Machining">Course: Industrial CNC Machine Operator</option>
            </select>
            <button
              onClick={() => {
                if (setSkillGapGenerated) {
                  setSkillGapGenerated(true)
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold text-xs hover:opacity-90 transition-all shadow-lg magenta-glow flex items-center gap-2 shrink-0"
            >
              <i className="fa-solid fa-rotate-right"></i> Run AI Diagnosis
            </button>
          </div>
        </div>

        {/* Curriculum Comparison */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Taught Curriculum */}
          <div className="glass-card p-5 rounded-2xl border border-indigo-900/60">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-book text-fuchsia-400"></i> Current Taught Curriculum
            </h3>
            <div className="space-y-2.5">
              {['Python Basics & Pandas', 'SQL Queries & Databases', 'Excel & Basic Visualization'].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-2.5 rounded-xl bg-indigo-950/50 text-xs">
                  <span className="font-semibold text-slate-200">{item}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold">
                    100% Covered
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Market Demand */}
          <div className="glass-card p-5 rounded-2xl border border-indigo-900/60">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-briefcase text-yellow-400"></i> Active Industry Market Demand
            </h3>
            <div className="space-y-2.5">
              {['PowerBI & Cloud Dashboards', 'AWS / Data Pipeline Basics', 'Advanced Business Communication'].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-2.5 rounded-xl bg-indigo-950/50 text-xs">
                  <span className="font-semibold text-slate-200">{item}</span>
                  <span className="px-2 py-0.5 rounded bg-red-950 border border-red-500/40 text-red-300 font-bold">
                    {idx < 2 ? 'High Deficit Gap' : 'Medium Gap'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Recommendation */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/90 to-fuchsia-950/90 border border-fuchsia-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-fuchsia-600/30 text-fuchsia-300 flex items-center justify-center shrink-0 text-lg">
              <i className="fa-solid fa-robot"></i>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                AI Recommended Policy Action
              </h4>
              <p className="text-xs text-indigo-200">
                Add mandatory 4-week <strong className="text-yellow-400">PowerBI &amp; AWS Micro-credentials</strong> to
                boost 90-day placement rates by an estimated <strong>+18.4%</strong>.
              </p>
            </div>
          </div>
          <button className="px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-extrabold text-xs transition-colors shrink-0">
            Apply Curriculum Upgrade
          </button>
        </div>
      </div>

      {/* District Analytics */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Non-Placement Causes */}
        <div className="glass-card p-6 rounded-3xl space-y-4 border border-indigo-900/60 lg:col-span-1">
          <div className="flex justify-between items-center border-b border-indigo-900 pb-3">
            <h3 className="text-sm font-bold text-white">Non-Placement Causes</h3>
            <span className="text-[10px] text-indigo-300 font-medium">Exit Survey AI Insights</span>
          </div>
          <div className="space-y-3 text-xs">
            {[
              { label: 'Practical Skill Gap', value: 41, color: 'fuchsia' },
              { label: 'Local Job Scarcity', value: 23, color: 'yellow' },
              { label: 'Relocation / Distance', value: 14, color: 'indigo' },
              { label: 'Wage Expectation Gap', value: 11, color: 'slate' },
              { label: 'Higher Studies / Other', value: 11, color: 'slate' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-indigo-200 mb-1">
                  <span>{item.label}</span>
                  <span className={`font-bold text-${item.color}-400`}>{item.value}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-indigo-950 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-${item.color}-500`}
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* District Table */}
        <div className="glass-card p-6 rounded-3xl space-y-4 border border-indigo-900/60 lg:col-span-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-indigo-900 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">District-Wise Outcome Metrics</h3>
              <p className="text-[11px] text-indigo-300">Privacy-conscious aggregated state surveillance data.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-indigo-300">Filter Region:</span>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-indigo-950 border border-indigo-800 text-slate-200 text-xs rounded-lg px-2.5 py-1 focus:outline-none"
              >
                <option value="all">All Districts</option>
                <option value="pune">Pune Division</option>
                <option value="mumbai">MMR Region</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[11px] uppercase bg-indigo-950/70 text-indigo-300 font-bold border-b border-indigo-900">
                <tr>
                  <th className="py-3 px-3">District</th>
                  <th className="py-3 px-3">Trained</th>
                  <th className="py-3 px-3">Employed</th>
                  <th className="py-3 px-3">6-Mo Retention</th>
                  <th className="py-3 px-3">Avg Salary Growth</th>
                  <th className="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-950/60">
                {districts.map((d, i) => (
                  <tr key={i} className="hover:bg-indigo-950/40 transition-colors">
                    <td className="py-3 px-3 font-bold text-white">{d.name}</td>
                    <td className="py-3 px-3">{d.trained.toLocaleString()}</td>
                    <td className="py-3 px-3 text-fuchsia-300 font-semibold">{d.employed.toLocaleString()}</td>
                    <td className="py-3 px-3 text-yellow-400 font-bold">{d.retention}</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold">{d.avgSalaryGrowth}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          d.status === 'Top Performer'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                            : d.status === 'High Growth'
                            ? 'bg-fuchsia-950 text-fuchsia-300 border border-fuchsia-500/30'
                            : 'bg-indigo-950 text-indigo-300 border border-indigo-700/30'
                        }`}
                      >
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

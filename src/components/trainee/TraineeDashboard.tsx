/**
 * Trainee dashboard component
 * Shows individual trainee profile and career trajectory
 */

import type { Trainee } from '@/types'
import { KPICards } from '@/components/common/KPICards'

interface TraineeDashboardProps {
  trainee: Trainee
  onOpenUpdate: () => void
}

export function TraineeDashboard({ trainee, onOpenUpdate }: TraineeDashboardProps) {
  const kpiCards = [
    { label: 'Livelihood Status', value: trainee.status, subtext: trainee.company, color: 'emerald' as const },
    {
      label: 'Current Remuneration',
      value: `₹${trainee.salary.toLocaleString()}/mo`,
      subtext: '+18% since placement',
      icon: 'fa-arrow-trend-up',
      color: 'emerald' as const,
    },
    {
      label: 'Verified Retention',
      value: `${trainee.retentionMonths} Months`,
      subtext: 'EPFO Contribution Matched',
      color: 'yellow' as const,
    },
    {
      label: 'Curriculum Fit Rating',
      value: `${trainee.skillMatchScore}%`,
      subtext: 'Matched against industry',
      color: 'fuchsia' as const,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* KPI Cards */}
      <KPICards cards={kpiCards} />

      {/* Timeline Section */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-900/60 space-y-6">
        <div className="flex justify-between items-center border-b border-indigo-900 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-white">Longitudinal Career Trajectory</h2>
            <p className="text-xs text-indigo-300">
              Continuous outcome tracking across skill updates and wage increments.
            </p>
          </div>
          <button
            onClick={onOpenUpdate}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 font-bold text-xs hover:opacity-90 yellow-glow flex items-center gap-2"
          >
            <i className="fa-solid fa-plus"></i> Submit Status Update
          </button>
        </div>

        {/* Timeline Steps */}
        <div className="grid sm:grid-cols-5 gap-4 relative pt-4">
          {trainee.timeline.map((step, idx) => (
            <div
              key={idx}
              className="glass-card p-4 rounded-2xl border border-indigo-900/50 space-y-2 relative hover:border-fuchsia-500/40 transition-all"
            >
              <div className="w-8 h-8 rounded-xl bg-fuchsia-950 border border-fuchsia-500/40 text-fuchsia-300 flex items-center justify-center text-xs font-bold">
                <i className={`fa-solid ${step.icon}`}></i>
              </div>
              <span className="text-[10px] font-bold font-mono text-yellow-400 block">{step.date}</span>
              <h4 className="text-xs font-bold text-white">{step.title}</h4>
              <p className="text-[11px] text-slate-400 leading-tight">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

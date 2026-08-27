/**
 * Full trainee profile view with detailed information
 */

import type { Trainee } from '@/types'
import { TraineeDashboard } from '@/components/trainee/TraineeDashboard'

interface TraineeProfileProps {
  trainee: Trainee
  onOpenUpdate: () => void
}

export function TraineeProfile({ trainee, onOpenUpdate }: TraineeProfileProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Header */}
      <div className="glass-card p-8 rounded-3xl border border-fuchsia-500/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 magenta-glow">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-yellow-500 p-0.5 shadow-xl">
            <div className="w-full h-full bg-[#0a0d1a] rounded-[14px] flex items-center justify-center text-3xl font-extrabold text-yellow-400">
              {trainee.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-white">{trainee.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold">
                <i className="fa-solid fa-circle-check mr-1"></i>VERIFIED TRAINEE
              </span>
            </div>
            <p className="text-xs text-indigo-300 font-medium">
              Persistent Skill ID:{' '}
              <span className="text-yellow-400 font-mono font-bold text-sm ml-1">{trainee.skillId}</span>
            </p>
            <p className="text-xs text-slate-400">
              {trainee.role} at <strong className="text-slate-200">{trainee.company}</strong>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onOpenUpdate}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 font-extrabold text-xs hover:opacity-90 yellow-glow flex items-center gap-2"
          >
            <i className="fa-solid fa-pen-to-square"></i> Update Status Signal
          </button>
        </div>
      </div>

      {/* Profile Details Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Skill Identity Summary */}
        <div className="glass-card p-6 rounded-3xl space-y-4 border border-indigo-900/60">
          <h2 className="text-sm font-bold uppercase tracking-wider text-fuchsia-400 border-b border-indigo-900 pb-2">
            Skill Identity Profile
          </h2>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-indigo-300 block">Training Course</span>
              <span className="font-bold text-white text-sm">{trainee.trainingCourse}</span>
            </div>
            <div>
              <span className="text-indigo-300 block">Training Institute</span>
              <span className="font-semibold text-slate-200">{trainee.provider}</span>
            </div>
            <div>
              <span className="text-indigo-300 block">DigiLocker Verification</span>
              <span className="text-emerald-400 font-bold">
                <i className="fa-solid fa-shield-halved mr-1"></i>Cryptographically Signed
              </span>
            </div>
            <div>
              <span className="text-indigo-300 block">Curriculum Match Rating</span>
              <span className="text-yellow-400 font-bold">{trainee.skillMatchScore}% Fit with Industry</span>
            </div>
          </div>
        </div>

        {/* Current Employment Signal */}
        <div className="glass-card p-6 rounded-3xl space-y-4 border border-indigo-900/60">
          <h2 className="text-sm font-bold uppercase tracking-wider text-yellow-400 border-b border-indigo-900 pb-2">
            Active Livelihood Signal
          </h2>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-indigo-300 block">Current Status</span>
              <span className="font-extrabold text-emerald-400 text-sm uppercase">{trainee.status}</span>
            </div>
            <div>
              <span className="text-indigo-300 block">Employer</span>
              <span className="font-semibold text-slate-200">{trainee.company}</span>
            </div>
            <div>
              <span className="text-indigo-300 block">Monthly In-Hand Wage</span>
              <span className="text-white font-extrabold text-base">₹{trainee.salary.toLocaleString()}/mo</span>
            </div>
            <div>
              <span className="text-indigo-300 block">Verified Retention</span>
              <span className="text-fuchsia-400 font-bold">{trainee.retentionMonths} Months (EPFO Matched)</span>
            </div>
          </div>
        </div>

        {/* Privacy & Consent Status */}
        <div className="glass-card p-6 rounded-3xl space-y-4 border border-indigo-900/60">
          <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 border-b border-indigo-900 pb-2">
            Consent Governance
          </h2>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex justify-between items-center">
              <span>Self-Report Signal</span>
              <span className="text-emerald-400 font-bold">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span>EPFO Contribution Match</span>
              <span className="text-emerald-400 font-bold">Active</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Private Social Media Access</span>
              <span className="text-red-400 font-bold">Disabled (Blocked)</span>
            </div>
            <p className="text-[11px] text-indigo-300/80 pt-2 border-t border-indigo-950">
              DPDP Act 2023 Compliant. Your privacy is guaranteed by system architecture.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline & Salary Trajectory */}
      <TraineeDashboard trainee={trainee} onOpenUpdate={onOpenUpdate} />
    </div>
  )
}

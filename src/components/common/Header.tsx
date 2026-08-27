/**
 * Main navigation header component
 */

import type { ActiveSegment } from '@/types'

interface HeaderProps {
  activeSegment: ActiveSegment
  onSegmentChange: (segment: ActiveSegment) => void
}

export function Header({ activeSegment, onSegmentChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-indigo-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo & Tagline */}
        <div
          className="flex items-center gap-3 cursor-pointer shrink-0"
          onClick={() => onSegmentChange('dashboard')}
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-fuchsia-600 via-purple-600 to-yellow-500 p-0.5 magenta-glow">
            <div className="w-full h-full bg-[#0a0d1a] rounded-[10px] flex items-center justify-center">
              <i className="fa-solid fa-chart-line text-yellow-400 text-xl"></i>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold tracking-tight text-white font-sans">
                ZEN<span className="text-yellow-400">Track</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-fuchsia-950/80 text-fuchsia-300 border border-fuchsia-500/30 rounded-full">
                SIH MVP
              </span>
            </div>
            <p className="text-[11px] text-indigo-300/80 font-medium">
              Beyond Training. Beyond Certification.
            </p>
          </div>
        </div>

        {/* Segment Tabs */}
        <div className="flex items-center gap-1.5 bg-[#0e1224] p-1.5 rounded-2xl border border-indigo-900/60 shadow-inner">
          <button
            onClick={() => onSegmentChange('dashboard')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSegment === 'dashboard'
                ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg magenta-glow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-indigo-950/40'
            }`}
          >
            <i className="fa-solid fa-chart-pie"></i>
            <span>1. Dashboard</span>
          </button>
          <button
            onClick={() => onSegmentChange('profile')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSegment === 'profile'
                ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white shadow-lg magenta-glow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-indigo-950/40'
            }`}
          >
            <i className="fa-solid fa-user-graduate"></i>
            <span>2. Profile</span>
          </button>
          <button
            onClick={() => onSegmentChange('why')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSegment === 'why'
                ? 'bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 shadow-lg yellow-glow font-extrabold'
                : 'text-yellow-400/90 hover:text-yellow-300 hover:bg-indigo-950/40'
            }`}
          >
            <i className="fa-solid fa-circle-question"></i>
            <span>3. Why ZENTrack</span>
          </button>
        </div>
      </div>
    </header>
  )
}

/**
 * Landing view explaining why ZENTrack platform
 */

interface LandingViewProps {
  onGetStarted: (role: string) => void
}

export function LandingView({ onGetStarted }: LandingViewProps) {
  return (
    <div className="space-y-12">
      {/* Comparison Table */}
      <div className="glass-panel p-8 rounded-3xl border border-indigo-900/60 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-extrabold text-white">
            Traditional Skilling vs. ZENTrack Platform
          </h2>
          <p className="text-xs text-indigo-300">
            Why legacy tracking fails post-certification and how ZENTrack bridges the gap.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-indigo-950 text-indigo-300 font-bold border-b border-indigo-900 uppercase">
              <tr>
                <th className="py-3 px-4">Feature / Metric</th>
                <th className="py-3 px-4 text-slate-400">Traditional Skilling Schemes</th>
                <th className="py-3 px-4 text-fuchsia-400">ZENTrack Platform Solution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-950/60 text-slate-300">
              <tr>
                <td className="py-3 px-4 font-bold text-white">Tracking Boundary</td>
                <td className="py-3 px-4 text-slate-400">Stops immediately at Certification</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">
                  12-Month Continuous Longitudinal Lifecycle
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Identity Persistence</td>
                <td className="py-3 px-4 text-slate-400">Lost when mobile number changes</td>
                <td className="py-3 px-4 text-yellow-400 font-bold">
                  Persistent DigiLocker / Skill ID
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Verification Rigor</td>
                <td className="py-3 px-4 text-slate-400">Unverified self-report forms</td>
                <td className="py-3 px-4 text-fuchsia-300 font-bold">
                  Multi-Signal Cross Matching (EPFO/Employer/UPI)
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Privacy Standard</td>
                <td className="py-3 px-4 text-slate-400">Manual non-standard consent</td>
                <td className="py-3 px-4 text-emerald-400 font-bold">
                  Explicit DPDP Act 2023 Consent Governance
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Get Started CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-fuchsia-950 via-purple-950 to-indigo-950 border border-fuchsia-500/40 text-center space-y-4 magenta-glow">
        <h2 className="text-3xl font-extrabold text-white">
          Ready to Explore the Portal Prototype?
        </h2>
        <p className="text-xs text-indigo-200 max-w-xl mx-auto">
          Switch perspectives between State Government, Trainees, Training Centers, and Employers to
          experience complete outcome tracking.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onGetStarted('government')}
            className="px-6 py-3 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-extrabold text-xs transition-all yellow-glow"
          >
            Enter Government Dashboard Perspective
          </button>
        </div>
      </div>
    </div>
  )
}

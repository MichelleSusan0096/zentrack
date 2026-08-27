/**
 * Main application component
 * Orchestrates all dashboard views and state management
 */

import { useState, useEffect } from 'react'
import type { UserRole, ActiveSegment, ConsentSettings } from '@/types'
import type { User } from '@/types/auth'
import { MOCK_DISTRICTS, MOCK_TRAINEE } from '@/data/mockData'

import { AuthContainer } from '@/components/auth/AuthContainer'
import { OAuthLoginPage } from '@/components/auth/OAuthLoginPage'
import { Header } from '@/components/common/Header'
import { UpdateStatusModal } from '@/components/common/UpdateStatusModal'
import { GovernmentDashboard } from '@/components/government/GovernmentDashboard'
import { TraineeDashboard } from '@/components/trainee/TraineeDashboard'
import { TraineeProfile } from '@/components/profile/TraineeProfile'
import { LandingView } from '@/components/landing/LandingView'
import { LoginAnalytics } from '@/components/admin/LoginAnalytics'

export function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isOAuthCallback, setIsOAuthCallback] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)

  // Dashboard state
  const [userRole, setUserRole] = useState<UserRole>('government')
  const [activeSegment, setActiveSegment] = useState<ActiveSegment>('dashboard')
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [districtFilter, setDistrictFilter] = useState('all')
  const [selectedSkillGapCourse, setSelectedSkillGapCourse] = useState('Data Analytics')
  const [skillGapGenerated, setSkillGapGenerated] = useState(false)
  const [consents, setConsents] = useState<ConsentSettings>({
    employmentData: true,
    professionalSignal: false,
    employerVerify: true,
    researchAnalytics: true,
  })

  // Check if this is OAuth callback
  useEffect(() => {
    const pathname = window.location.pathname
    if (pathname.includes('/auth/callback/')) {
      setIsOAuthCallback(true)
    }
  }, [])

  const handleRoleSwitch = (newRole: UserRole) => {
    setUserRole(newRole)
    setActiveSegment('dashboard')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleStatusUpdate = (data: { status: string; company: string; salary: string }) => {
    setShowUpdateModal(false)
    alert('Status Signal Updated Successfully!')
    console.log('Update data:', data)
  }

  const handleAuthSuccess = (user: User, _token: string, role: string) => {
    setCurrentUser(user)
    setIsAuthenticated(true)
    setUserRole(role as UserRole)
    console.log(`Logged in as ${user.fullName} (${role})`)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentUser(null)
    setActiveSegment('dashboard')
  }

  // Show OAuth callback page if OAuth callback
  if (isOAuthCallback) {
    return (
      <OAuthLoginPage
        onOAuthSuccess={handleAuthSuccess}
        onError={(error) => {
          console.error('OAuth error:', error)
          setIsOAuthCallback(false)
        }}
      />
    )
  }

  // Show auth container if not authenticated
  if (!isAuthenticated) {
    return <AuthContainer onAuthSuccess={handleAuthSuccess} />
  }

  // Show analytics dashboard for admin
  if (showAnalytics && currentUser?.role === 'government') {
    return (
      <div className="min-h-screen bg-[#070913] flex flex-col">
        <div className="glass-panel border-b border-indigo-900/40 px-4 sm:px-6 lg:px-8 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button
              onClick={() => setShowAnalytics(false)}
              className="text-indigo-300 hover:text-white text-sm font-semibold flex items-center gap-2"
            >
              <i className="fa-solid fa-arrow-left"></i>
              Back to Dashboard
            </button>
            <h1 className="text-lg font-bold text-white">Login Analytics</h1>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900 text-indigo-300 text-xs font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="flex-grow">
          <LoginAnalytics />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#070913]">
      {/* Header Navigation */}
      <Header activeSegment={activeSegment} onSegmentChange={setActiveSegment} />

      {/* User Info Bar */}
      <div className="glass-panel border-b border-indigo-900/40 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-600 to-yellow-500 flex items-center justify-center text-xs font-bold text-white">
              {currentUser?.fullName.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="text-xs font-semibold text-white">{currentUser?.fullName}</p>
              <p className="text-[10px] text-indigo-400 capitalize">{currentUser?.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {currentUser?.role === 'government' && (
              <button
                onClick={() => setShowAnalytics(true)}
                className="px-3 py-1.5 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 text-xs font-semibold flex items-center gap-1 transition-all"
              >
                <i className="fa-solid fa-chart-bar"></i>
                Analytics
              </button>
            )}
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900 text-indigo-300 text-xs font-semibold flex items-center gap-1 transition-all"
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Dashboard Segment */}
        {activeSegment === 'dashboard' && (
          <div className="space-y-6">
            {/* Role Switcher */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              <div className="glass-panel p-2 rounded-2xl flex flex-wrap items-center justify-between gap-3 border border-indigo-900/40">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-200 px-3">
                  <i className="fa-solid fa-sliders text-fuchsia-400"></i> Portal Perspective:
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <button
                    onClick={() => handleRoleSwitch('government')}
                    className={`px-4 py-2 rounded-xl font-bold transition-all ${
                      userRole === 'government'
                        ? 'bg-yellow-500 text-slate-950 shadow yellow-glow'
                        : 'bg-indigo-950/60 text-slate-300 hover:bg-indigo-900'
                    }`}
                  >
                    <i className="fa-solid fa-landmark mr-1.5"></i> Govt / Admin
                  </button>
                  <button
                    onClick={() => handleRoleSwitch('trainee')}
                    className={`px-4 py-2 rounded-xl font-bold transition-all ${
                      userRole === 'trainee'
                        ? 'bg-fuchsia-600 text-white shadow magenta-glow'
                        : 'bg-indigo-950/60 text-slate-300 hover:bg-indigo-900'
                    }`}
                  >
                    <i className="fa-solid fa-user-graduate mr-1.5"></i> Zenitee (Employee)
                  </button>
                </div>
              </div>
            </div>

            {/* Dashboard Content based on role */}
            {userRole === 'government' && (
              <GovernmentDashboard
                districts={MOCK_DISTRICTS}
                filter={districtFilter}
                setFilter={setDistrictFilter}
                selectedCourse={selectedSkillGapCourse}
                setSelectedCourse={setSelectedSkillGapCourse}
                skillGapGenerated={skillGapGenerated}
                setSkillGapGenerated={setSkillGapGenerated}
                consents={consents}
                setConsents={setConsents}
              />
            )}
            {userRole === 'trainee' && (
              <TraineeDashboard trainee={MOCK_TRAINEE} onOpenUpdate={() => setShowUpdateModal(true)} />
            )}
          </div>
        )}

        {/* Profile Segment */}
        {activeSegment === 'profile' && (
          <TraineeProfile trainee={MOCK_TRAINEE} onOpenUpdate={() => setShowUpdateModal(true)} />
        )}

        {/* Why ZENTrack Segment */}
        {activeSegment === 'why' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
            {/* Hero Heading */}
            <div className="text-center space-y-4 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold">
                <i className="fa-solid fa-lightbulb"></i> Why ZENTrack Platform?
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                Solving the Post-Certification <span className="gradient-text">Outcome Tracking Void</span>
              </h1>
              <p className="text-slate-300 text-sm sm:text-base">
                Traditional skilling schemes end their accountability when a candidate receives a
                certificate. ZENTrack builds a continuous, consent-first longitudinal intelligence loop
                for state and national government initiatives.
              </p>
            </div>

            {/* The 3 Core Pillars */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-3xl space-y-3 border-l-4 border-fuchsia-500">
                <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center text-xl">
                  <i className="fa-solid fa-id-card"></i>
                </div>
                <h3 className="font-extrabold text-lg text-white">1. Lifelong Skill ID</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Replaces fragmented program IDs with a persistent digital profile linked to DigiLocker
                  and APAAR, preserving trajectory across phone number or location changes.
                </p>
              </div>
              <div className="glass-card p-6 rounded-3xl space-y-3 border-l-4 border-yellow-400">
                <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center text-xl">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <h3 className="font-extrabold text-lg text-white">2. Multi-Signal Matching</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Cross-references candidate self-reports with EPFO contribution records, employer
                  scorecards, and merchant UPI QR proofs to ensure high data accuracy.
                </p>
              </div>
              <div className="glass-card p-6 rounded-3xl space-y-3 border-l-4 border-emerald-500">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl">
                  <i className="fa-solid fa-user-lock"></i>
                </div>
                <h3 className="font-extrabold text-lg text-white">3. Zero Secret Surveillance</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Operates on explicit, granular DPDP consent. Strictly avoids scraping personal WhatsApp
                  chats or private social media to maintain citizen trust.
                </p>
              </div>
            </div>

            {/* Landing View */}
            <LandingView onGetStarted={(role: string) => {
              const validRole = role as UserRole
              handleRoleSwitch(validRole)
            }} />
          </div>
        )}
      </main>

      {/* Update Status Modal */}
      <UpdateStatusModal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        onSubmit={handleStatusUpdate}
      />
    </div>
  )
}

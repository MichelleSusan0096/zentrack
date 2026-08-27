/**
 * Core type definitions for ZENTrack platform
 */

/** District performance metrics */
export interface District {
  name: string
  trained: number
  employed: number
  retention: string
  avgSalaryGrowth: string
  status: 'High Growth' | 'Top Performer' | 'Moderate' | 'Growing' | 'Needs Support'
}

/** Timeline milestone for trainee journey */
export interface TimelineMilestone {
  date: string
  title: string
  desc: string
  icon: string
}

/** Complete trainee profile */
export interface Trainee {
  name: string
  skillId: string
  status: 'Employed' | 'Seeking' | 'Self-Employed'
  company: string
  role: string
  salary: number
  joiningDate: string
  retentionMonths: number
  trainingCourse: string
  provider: string
  certifiedDate: string
  skillMatchScore: number
  verificationStatus: string
  timeline: TimelineMilestone[]
}

/** Employment verification request */
export interface VerificationRequest {
  id: number
  name: string
  role: string
  company: string
  date: string
  signal: string
  confidence: string
  status: 'Pending' | 'Approved'
}

/** User consent preferences */
export interface ConsentSettings {
  employmentData: boolean
  professionalSignal: boolean
  employerVerify: boolean
  researchAnalytics: boolean
}

/** User role in the system */
export type UserRole = 'government' | 'trainee' | 'provider' | 'employer'

/** Active view segment */
export type ActiveSegment = 'dashboard' | 'profile' | 'why'

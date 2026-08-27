/**
 * Mock data for development and demonstration
 */

import type { District, Trainee, VerificationRequest } from '@/types'

export const MOCK_DISTRICTS: District[] = [
  {
    name: 'Pune',
    trained: 28450,
    employed: 23100,
    retention: '78.5%',
    avgSalaryGrowth: '+22.4%',
    status: 'High Growth',
  },
  {
    name: 'Mumbai City',
    trained: 34200,
    employed: 28150,
    retention: '81.2%',
    avgSalaryGrowth: '+24.1%',
    status: 'Top Performer',
  },
  {
    name: 'Nagpur',
    trained: 19800,
    employed: 14650,
    retention: '68.4%',
    avgSalaryGrowth: '+16.2%',
    status: 'Moderate',
  },
  {
    name: 'Nashik',
    trained: 16500,
    employed: 12400,
    retention: '71.0%',
    avgSalaryGrowth: '+17.8%',
    status: 'Growing',
  },
  {
    name: 'Chhatrapati Sambhajinagar',
    trained: 14200,
    employed: 9800,
    retention: '64.5%',
    avgSalaryGrowth: '+14.5%',
    status: 'Needs Support',
  },
  {
    name: 'Thane',
    trained: 22100,
    employed: 17400,
    retention: '74.8%',
    avgSalaryGrowth: '+19.6%',
    status: 'High Growth',
  },
]

export const MOCK_TRAINEE: Trainee = {
  name: "Michelle D'Souza",
  skillId: 'ZT-2026-8F72A91',
  status: 'Employed',
  company: 'ABC Technologies',
  role: 'Junior Data Analyst',
  salary: 32000,
  joiningDate: '12 June 2026',
  retentionMonths: 11,
  trainingCourse: 'Advanced Data Analytics',
  provider: 'Apex Vocational Institute, Pune',
  certifiedDate: '15 March 2026',
  skillMatchScore: 84,
  verificationStatus: 'High Confidence (Multi-Signal Matched)',
  timeline: [
    {
      date: 'JAN 2026',
      title: 'Training Enrolled',
      desc: 'Advanced Data Analytics Course',
      icon: 'fa-graduation-cap',
    },
    {
      date: 'MAR 2026',
      title: 'Certified & Skill ID Issued',
      desc: 'DigiLocker Cryptographically Signed',
      icon: 'fa-certificate',
    },
    {
      date: 'JUN 2026',
      title: 'Joined ABC Technologies',
      desc: 'Verified Offer Letter & EPFO Entry',
      icon: 'fa-briefcase',
    },
    {
      date: 'DEC 2026',
      title: '6-Month Retention Milestone',
      desc: 'EPFO Signal Confirmation & Survey',
      icon: 'fa-shield-halved',
    },
    {
      date: 'JUN 2027',
      title: 'Wage Progression (+18%)',
      desc: 'Salary Updated to ₹32,000/mo',
      icon: 'fa-arrow-trend-up',
    },
  ],
}

export const MOCK_VERIFICATIONS: VerificationRequest[] = [
  {
    id: 1,
    name: 'Rahul Kumar',
    role: 'Data Analyst',
    company: 'TechNova Solutions',
    date: '12 June 2026',
    signal: 'EPFO + Self-Report',
    confidence: 'High (96%)',
    status: 'Pending',
  },
  {
    id: 2,
    name: 'Ananya Sharma',
    role: 'Frontend Engineer',
    company: 'Infosys Limited',
    date: '01 May 2026',
    signal: 'Employer Direct + Offer Letter',
    confidence: 'Verified (100%)',
    status: 'Approved',
  },
  {
    id: 3,
    name: 'Arjun Patel',
    role: 'CNC Machine Operator',
    company: 'Kirloskar Engineering',
    date: '18 July 2026',
    signal: 'Self-Report Only',
    confidence: 'Medium (64%)',
    status: 'Pending',
  },
]

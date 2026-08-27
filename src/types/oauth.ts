/**
 * OAuth and social authentication types
 */

export type OAuthProvider = 'google' | 'github'

export interface OAuthConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
  scope: string[]
}

export interface OAuthUser {
  id: string
  email: string
  name: string
  picture?: string
  provider: OAuthProvider
}

export interface LoginRecord {
  id: string
  userId: string
  email: string
  fullName: string
  authMethod: 'email' | 'google' | 'github'
  role: string
  loginTime: string
  logoutTime?: string
  ipAddress?: string
  userAgent?: string
  duration?: number
  status: 'success' | 'failed'
  errorMessage?: string
}

export interface ExcelLoginData {
  'Login ID': string
  'User ID': string
  'Email': string
  'Full Name': string
  'Auth Method': string
  'User Role': string
  'Login Time': string
  'Logout Time': string
  'Session Duration (minutes)': number
  'Status': string
  'Error': string
}

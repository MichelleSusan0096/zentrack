/**
 * Authentication type definitions
 */

export type AuthMode = 'login' | 'signup' | 'signin' | 'forgot'

export interface User {
  id: string
  email: string
  password: string
  fullName: string
  role: 'government' | 'trainee' | 'provider' | 'employer'
  phoneNumber: string
  createdAt: string
  isVerified: boolean
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  success: string | null
}

export interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

export interface SignUpFormData {
  email: string
  password: string
  confirmPassword: string
  fullName: string
  phoneNumber: string
  role: 'government' | 'trainee' | 'provider' | 'employer'
  agreeToTerms: boolean
}

export interface ForgotPasswordData {
  email: string
}

export interface ResetPasswordData {
  token: string
  newPassword: string
  confirmPassword: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: User
  token?: string
}

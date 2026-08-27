/**
 * Sign up page component
 */

import { useState } from 'react'
import type { SignUpFormData } from '@/types/auth'
import type { ValidationError } from '@/utils/validation'
import { validateSignUpForm, validatePassword } from '@/utils/validation'
import { MOCK_USERS } from '@/data/authMockData'

interface SignUpPageProps {
  onSignUpSuccess: (user: any, token: string) => void
  onLoginClick: () => void
}

export function SignUpPage({ onSignUpSuccess, onLoginClick }: SignUpPageProps) {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: '',
    role: 'trainee',
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState<ValidationError[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [generalError, setGeneralError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<{
    valid: boolean
    errors: string[]
  }>({ valid: false, errors: [] })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.currentTarget
    const newValue = type === 'checkbox' ? (e.currentTarget as HTMLInputElement).checked : value

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }))

    // Check password strength on password field change
    if (name === 'password') {
      const strength = validatePassword(value as string)
      setPasswordStrength(strength)
    }

    // Clear errors for this field
    setErrors((prev) => prev.filter((err) => err.field !== name))
    setGeneralError('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setGeneralError('')

    // Validate form
    const validationErrors = validateSignUpForm(formData)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      setIsLoading(false)
      return
    }

    // Check if email already exists
    const existingUser = MOCK_USERS.find((u) => u.email === formData.email)
    if (existingUser) {
      setGeneralError('Email already registered. Please try logging in or use a different email.')
      setIsLoading(false)
      return
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Create new mock user
    const newUser = {
      id: `user-${Date.now()}`,
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
      role: formData.role,
      phoneNumber: formData.phoneNumber,
      createdAt: new Date().toISOString().split('T')[0],
      isVerified: false,
    }

    // Mock JWT token
    const mockToken = `mock_jwt_${Date.now()}_${Math.random()}`

    // Success
    onSignUpSuccess(newUser, mockToken)
    setIsLoading(false)
  }

  const getErrorMessage = (fieldName: string): string | null => {
    return errors.find((err) => err.field === fieldName)?.message || null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070913] via-[#0c1024] to-[#141a38] flex items-center justify-center px-4 py-8">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>

      {/* Sign Up Card */}
      <div className="relative w-full max-w-2xl">
        {/* Card Container */}
        <div className="glass-panel p-8 rounded-3xl border border-fuchsia-500/30 magenta-glow space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-extrabold text-white">
              Join ZEN<span className="text-yellow-400">Track</span>
            </h1>
            <p className="text-sm text-indigo-300">Create your account to track outcomes</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* General Error Message */}
            {generalError && (
              <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/40 flex items-center gap-2">
                <i className="fa-solid fa-circle-exclamation text-red-400"></i>
                <p className="text-xs text-red-300">{generalError}</p>
              </div>
            )}

            {/* Two Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-indigo-300 mb-1.5 uppercase tracking-wider">
                  Full Name *
                </label>
                <div className="relative">
                  <i className="fa-solid fa-user absolute left-3 top-3 text-indigo-400 text-sm"></i>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className={`w-full bg-indigo-950/40 border rounded-xl pl-10 pr-4 py-2 text-white placeholder-slate-400 text-sm focus:outline-none transition-all ${
                      getErrorMessage('fullName')
                        ? 'border-red-500/50 focus:border-red-500'
                        : 'border-indigo-800/50 focus:border-fuchsia-500'
                    }`}
                  />
                </div>
                {getErrorMessage('fullName') && (
                  <p className="text-xs text-red-400 mt-1">{getErrorMessage('fullName')}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-indigo-300 mb-1.5 uppercase tracking-wider">
                  Email Address *
                </label>
                <div className="relative">
                  <i className="fa-solid fa-envelope absolute left-3 top-3 text-indigo-400 text-sm"></i>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className={`w-full bg-indigo-950/40 border rounded-xl pl-10 pr-4 py-2 text-white placeholder-slate-400 text-sm focus:outline-none transition-all ${
                      getErrorMessage('email')
                        ? 'border-red-500/50 focus:border-red-500'
                        : 'border-indigo-800/50 focus:border-fuchsia-500'
                    }`}
                  />
                </div>
                {getErrorMessage('email') && (
                  <p className="text-xs text-red-400 mt-1">{getErrorMessage('email')}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-indigo-300 mb-1.5 uppercase tracking-wider">
                  Phone Number *
                </label>
                <div className="relative">
                  <i className="fa-solid fa-phone absolute left-3 top-3 text-indigo-400 text-sm"></i>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="+91-9876543210"
                    className={`w-full bg-indigo-950/40 border rounded-xl pl-10 pr-4 py-2 text-white placeholder-slate-400 text-sm focus:outline-none transition-all ${
                      getErrorMessage('phoneNumber')
                        ? 'border-red-500/50 focus:border-red-500'
                        : 'border-indigo-800/50 focus:border-fuchsia-500'
                    }`}
                  />
                </div>
                {getErrorMessage('phoneNumber') && (
                  <p className="text-xs text-red-400 mt-1">{getErrorMessage('phoneNumber')}</p>
                )}
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-xs font-semibold text-indigo-300 mb-1.5 uppercase tracking-wider">
                  Account Type *
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full bg-indigo-950/40 border border-indigo-800/50 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-fuchsia-500 transition-all"
                >
                  <option value="trainee">
                    <i className="fa-solid fa-user-graduate mr-2"></i>Trainee / Employee
                  </option>
                  <option value="government">Government / Admin</option>
                  <option value="provider">Training Provider</option>
                  <option value="employer">Employer</option>
                </select>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-indigo-300 mb-1.5 uppercase tracking-wider">
                Password *
              </label>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-3 top-3 text-indigo-400 text-sm"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`w-full bg-indigo-950/40 border rounded-xl pl-10 pr-10 py-2 text-white placeholder-slate-400 text-sm focus:outline-none transition-all ${
                    getErrorMessage('password')
                      ? 'border-red-500/50 focus:border-red-500'
                      : 'border-indigo-800/50 focus:border-fuchsia-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-indigo-400 hover:text-indigo-300"
                >
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {getErrorMessage('password') && (
                <p className="text-xs text-red-400 mt-1">{getErrorMessage('password')}</p>
              )}

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-[10px]">
                    <div
                      className={`h-1 flex-1 rounded-full ${
                        passwordStrength.valid ? 'bg-emerald-500' : 'bg-red-500/50'
                      }`}
                    ></div>
                    <span className={passwordStrength.valid ? 'text-emerald-400' : 'text-amber-400'}>
                      {passwordStrength.valid ? '✓ Strong' : '⚠ Weak'}
                    </span>
                  </div>
                  {passwordStrength.errors.length > 0 && (
                    <ul className="text-[10px] text-slate-300 list-none space-y-0.5">
                      {passwordStrength.errors.map((error, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <i className="fa-solid fa-circle-xmark text-red-400"></i>
                          {error}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-indigo-300 mb-1.5 uppercase tracking-wider">
                Confirm Password *
              </label>
              <div className="relative">
                <i className="fa-solid fa-lock-check absolute left-3 top-3 text-indigo-400 text-sm"></i>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`w-full bg-indigo-950/40 border rounded-xl pl-10 pr-10 py-2 text-white placeholder-slate-400 text-sm focus:outline-none transition-all ${
                    getErrorMessage('confirmPassword')
                      ? 'border-red-500/50 focus:border-red-500'
                      : 'border-indigo-800/50 focus:border-fuchsia-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-indigo-400 hover:text-indigo-300"
                >
                  <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {getErrorMessage('confirmPassword') && (
                <p className="text-xs text-red-400 mt-1">{getErrorMessage('confirmPassword')}</p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="w-4 h-4 mt-0.5 rounded bg-indigo-950 border border-indigo-800 cursor-pointer accent-fuchsia-500"
                />
                <span className="text-xs text-indigo-300 group-hover:text-indigo-200">
                  I agree to the{' '}
                  <a href="#" className="text-fuchsia-400 hover:text-fuchsia-300 underline">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-fuchsia-400 hover:text-fuchsia-300 underline">
                    Privacy Policy
                  </a>
                </span>
              </label>
              {getErrorMessage('agreeToTerms') && (
                <p className="text-xs text-red-400 mt-1">{getErrorMessage('agreeToTerms')}</p>
              )}
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 px-4 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold text-sm hover:opacity-90 disabled:opacity-50 transition-all magenta-glow flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <i className="fa-solid fa-spinner animate-spin"></i>
                  Creating account...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-user-plus"></i>
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-indigo-900/50"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-indigo-950/50 text-indigo-400">Already have an account?</span>
            </div>
          </div>

          {/* Login Link */}
          <button
            type="button"
            onClick={onLoginClick}
            className="w-full px-4 py-3 rounded-xl border border-yellow-500/40 text-yellow-400 font-bold text-sm hover:bg-yellow-500/10 transition-all flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-arrow-right-to-bracket"></i>
            Sign In Instead
          </button>
        </div>

        {/* Security Info */}
        <div className="mt-6 text-center text-xs text-indigo-300/60">
          <p className="flex items-center justify-center gap-1">
            <i className="fa-solid fa-shield-halved"></i>
            Your data is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  )
}

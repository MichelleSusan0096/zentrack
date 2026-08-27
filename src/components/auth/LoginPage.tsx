/**
 * Login page component
 */

import { useState } from 'react'
import type { LoginFormData } from '@/types/auth'
import type { ValidationError } from '@/utils/validation'
import { validateLoginForm } from '@/utils/validation'
import { supabase } from '@/utils/supabaseClient'

interface LoginPageProps {
  onLoginSuccess: (user: any, token: string) => void
  onSignUpClick: () => void
  onForgotPasswordClick: () => void
}

export function LoginPage({ onLoginSuccess, onSignUpClick, onForgotPasswordClick }: LoginPageProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  })

  const [errors, setErrors] = useState<ValidationError[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [generalError, setGeneralError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.currentTarget
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    // Clear errors for this field
    setErrors((prev) => prev.filter((err) => err.field !== name))
    setGeneralError('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setGeneralError('')

    // Validate form
    const validationErrors = validateLoginForm(formData.email, formData.password)
    if (validationErrors.length > 0) {
      setErrors(validationErrors)
      setIsLoading(false)
      return
    }

    try {
      // Try to sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error && error.status === 400) {
        // User doesn't exist, try to sign up
        const { error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.email.split('@')[0],
            },
          },
        })

        if (signUpError) {
          throw signUpError
        }

        // Auto login after signup
        const { data: sessionData, error: sessionError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })

        if (sessionError) {
          throw sessionError
        }

        if (sessionData.user && sessionData.session) {
          const appUser = {
            id: sessionData.user.id,
            email: sessionData.user.email || '',
            password: 'oauth',
            fullName: sessionData.user.user_metadata?.full_name || formData.email.split('@')[0],
            role: 'trainee',
            phoneNumber: '',
            createdAt: new Date().toISOString().split('T')[0],
            isVerified: true,
          }
          onLoginSuccess(appUser, sessionData.session.access_token)
        }
      } else if (error) {
        throw error
      } else if (data.user && data.session) {
        // Login successful
        const appUser = {
          id: data.user.id,
          email: data.user.email || '',
          password: 'oauth',
          fullName: data.user.user_metadata?.full_name || formData.email.split('@')[0],
          role: 'trainee',
          phoneNumber: '',
          createdAt: new Date().toISOString().split('T')[0],
          isVerified: true,
        }
        onLoginSuccess(appUser, data.session.access_token)
      }
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Login failed'
      setGeneralError(errorMsg)
      console.error('Login error:', error)
    }

    setIsLoading(false)
  }

  const getErrorMessage = (fieldName: string): string | null => {
    return errors.find((err) => err.field === fieldName)?.message || null
  }

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true)
      setGeneralError('')
      
      console.log('Starting Google OAuth flow...')
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) {
        console.error('OAuth Error Details:', {
          message: error.message,
          status: (error as any).status,
        })
        throw error
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Google login failed'
      console.error('Google OAuth error:', error)
      
      // More detailed error message
      if (errorMessage.includes('invalid_client')) {
        setGeneralError('Google OAuth not properly configured. Please contact support.')
      } else if (errorMessage.includes('redirect_uri')) {
        setGeneralError('OAuth redirect configuration issue. Please try again.')
      } else {
        setGeneralError(`Google login error: ${errorMessage}`)
      }
      
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070913] via-[#0c1024] to-[#141a38] flex items-center justify-center px-4">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        {/* Card Container */}
        <div className="glass-panel p-8 rounded-3xl border border-fuchsia-500/30 magenta-glow space-y-6">
          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-600 via-purple-600 to-yellow-500 p-0.5 magenta-glow">
                <div className="w-full h-full bg-[#0a0d1a] rounded-[14px] flex items-center justify-center">
                  <i className="fa-solid fa-chart-line text-yellow-400 text-2xl"></i>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-extrabold text-white">
              ZEN<span className="text-yellow-400">Track</span>
            </h1>
            <p className="text-xs text-indigo-300">Beyond Training. Beyond Certification.</p>
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

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-indigo-300 mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <i className="fa-solid fa-envelope absolute left-3 top-3 text-indigo-400 text-sm"></i>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className={`w-full bg-indigo-950/40 border rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-400 text-sm focus:outline-none transition-all ${
                    getErrorMessage('email')
                      ? 'border-red-500/50 focus:border-red-500'
                      : 'border-indigo-800/50 focus:border-fuchsia-500'
                  }`}
                />
              </div>
              {getErrorMessage('email') && (
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <i className="fa-solid fa-exclamation-circle"></i>
                  {getErrorMessage('email')}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-indigo-300 mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-3 top-3 text-indigo-400 text-sm"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className={`w-full bg-indigo-950/40 border rounded-xl pl-10 pr-10 py-2.5 text-white placeholder-slate-400 text-sm focus:outline-none transition-all ${
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
                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                  <i className="fa-solid fa-exclamation-circle"></i>
                  {getErrorMessage('password')}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded bg-indigo-950 border border-indigo-800 cursor-pointer accent-fuchsia-500"
                />
                <span className="text-indigo-300 group-hover:text-indigo-200">Remember me</span>
              </label>
              <button
                type="button"
                onClick={onForgotPasswordClick}
                className="text-fuchsia-400 hover:text-fuchsia-300 font-semibold"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 px-4 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold text-sm hover:opacity-90 disabled:opacity-50 transition-all magenta-glow flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <i className="fa-solid fa-spinner animate-spin"></i>
                  Signing in...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-arrow-right-to-bracket"></i>
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-500/20">
            <p className="text-[10px] text-purple-300 font-semibold uppercase mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-[11px] text-slate-300">
              <p>
                <span className="text-yellow-400 font-semibold">Admin:</span> admin@zentrack.com / Admin@123456
              </p>
              <p>
                <span className="text-fuchsia-400 font-semibold">Trainee:</span> trainee@zentrack.com / Trainee@123456
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-indigo-900/50"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-indigo-950/50 text-indigo-400">Or continue with</span>
            </div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full px-4 py-2.5 rounded-xl border border-indigo-800/50 bg-indigo-950/40 hover:bg-indigo-950/80 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isLoading ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-brands fa-google text-red-400"></i>}
            Sign in with Google
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-indigo-900/50"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-indigo-950/50 text-indigo-400">Don't have an account?</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <button
            type="button"
            onClick={onSignUpClick}
            className="w-full px-4 py-3 rounded-xl border border-yellow-500/40 text-yellow-400 font-bold text-sm hover:bg-yellow-500/10 transition-all flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-user-plus"></i>
            Create New Account
          </button>
        </div>

        {/* Security Info */}
        <div className="mt-6 text-center text-xs text-indigo-300/60">
          <p className="flex items-center justify-center gap-1">
            <i className="fa-solid fa-shield-halved"></i>
            Your login is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  )
}

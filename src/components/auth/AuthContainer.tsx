/**
 * Authentication container component
 * Manages login, sign up, and forgot password views
 */

import { useState } from 'react'
import type { AuthMode, User } from '@/types/auth'
import { LoginPage } from './LoginPage'
import { SignUpPage } from './SignUpPage'
import { ForgotPasswordPage } from './ForgotPasswordPage'

interface AuthContainerProps {
  onAuthSuccess: (user: User, token: string, role: string) => void
}

export function AuthContainer({ onAuthSuccess }: AuthContainerProps) {
  const [authMode, setAuthMode] = useState<AuthMode>('login')

  const handleLoginSuccess = (user: User, token: string) => {
    console.log('Login successful:', user)
    onAuthSuccess(user, token, user.role)
  }

  const handleSignUpSuccess = (user: User, token: string) => {
    console.log('Sign up successful:', user)
    // Auto-login after sign up
    onAuthSuccess(user, token, user.role)
  }

  const handleResetSuccess = () => {
    // After password reset, go back to login
    setAuthMode('login')
  }

  return (
    <>
      {authMode === 'login' && (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onSignUpClick={() => setAuthMode('signup')}
          onForgotPasswordClick={() => setAuthMode('forgot')}
        />
      )}
      {authMode === 'signup' && (
        <SignUpPage onSignUpSuccess={handleSignUpSuccess} onLoginClick={() => setAuthMode('login')} />
      )}
      {authMode === 'forgot' && (
        <ForgotPasswordPage
          onBackToLogin={() => setAuthMode('login')}
          onResetSuccess={handleResetSuccess}
        />
      )}
    </>
  )
}

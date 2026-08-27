/**
 * Google OAuth Callback Handler
 * This component handles the redirect from Google and exchanges the code for a session
 */

import { useEffect, useState } from 'react'
import { handleGoogleCallback } from '@/utils/supabaseClient'
import type { User } from '@/types/auth'

interface GoogleCallbackPageProps {
  onLoginSuccess: (user: any, token: string) => void
  onError: (error: string) => void
}

export function GoogleCallbackPage({ onLoginSuccess, onError }: GoogleCallbackPageProps) {
  const [isProcessing, setIsProcessing] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the authorization code from URL
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')
        const errorParam = params.get('error')
        const errorDescription = params.get('error_description')

        if (errorParam) {
          throw new Error(errorDescription || 'OAuth error: ' + errorParam)
        }

        if (!code) {
          throw new Error('No authorization code received from Google')
        }

        console.log('✅ Received Google authorization code')

        // Exchange code for session with backend
        const response = await handleGoogleCallback(code)

        console.log('✅ Successfully authenticated with Google')
        console.log('User:', response.user)

        // Convert to app user format
        const appUser: User = {
          id: response.user.id,
          email: response.user.email,
          password: 'oauth',
          fullName: response.user.fullName,
          role: response.user.role || 'trainee',
          phoneNumber: '',
          createdAt: new Date().toISOString().split('T')[0],
          isVerified: response.user.isVerified || true,
        }

        onLoginSuccess(appUser, response.token)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Authentication failed'
        console.error('Google callback error:', err)
        setError(errorMessage)
        onError(errorMessage)
        setIsProcessing(false)
      }
    }

    handleCallback()
  }, [onLoginSuccess, onError])

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#070913] via-[#0c1024] to-[#141a38] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-600 to-yellow-500 animate-spin p-0.5">
              <div className="w-full h-full bg-[#0a0d1a] rounded-[14px] flex items-center justify-center">
                <i className="fa-solid fa-spinner animate-spin text-yellow-400 text-2xl"></i>
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white">Authenticating with Google...</h2>
          <p className="text-indigo-300">Please wait while we complete your login</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#070913] via-[#0c1024] to-[#141a38] flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-4 text-center">
          <div className="p-4 rounded-lg bg-red-950/50 border border-red-500/40">
            <i className="fa-solid fa-circle-exclamation text-red-400 text-2xl"></i>
            <h2 className="text-xl font-bold text-red-300 mt-2">Authentication Failed</h2>
            <p className="text-red-200 text-sm mt-2">{error}</p>
          </div>
          <button
            onClick={() => (window.location.href = '/')}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-semibold hover:opacity-90"
          >
            Return to Login
          </button>
        </div>
      </div>
    )
  }

  return null
}

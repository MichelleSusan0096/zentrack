/**
 * OAuth callback and login handling page
 */

import { useEffect, useState } from 'react'
import type { User } from '@/types/auth'
import { handleGoogleCallback, handleGithubCallback, getOAuthProviderFromUrl, getOAuthCodeFromUrl } from '@/utils/oauthService'
import { storeLoginRecord } from '@/utils/excelService'

interface OAuthLoginPageProps {
  onOAuthSuccess: (user: User, token: string, role: string) => void
  onError: (error: string) => void
}

export function OAuthLoginPage({ onOAuthSuccess, onError }: OAuthLoginPageProps) {
  const [status, setStatus] = useState('Processing OAuth login...')

  useEffect(() => {
    const processOAuthCallback = async () => {
      try {
        const provider = getOAuthProviderFromUrl()
        const code = getOAuthCodeFromUrl()

        if (!provider) {
          throw new Error('Invalid OAuth callback - no provider detected')
        }

        setStatus(`Processing ${provider} login...`)

        let oauthUser
        if (provider === 'google') {
          oauthUser = await handleGoogleCallback(code || 'demo_code')
        } else if (provider === 'github') {
          oauthUser = await handleGithubCallback(code || 'demo_code')
        } else {
          throw new Error('Unknown OAuth provider')
        }

        // Convert OAuth user to app user
        const user: User = {
          id: oauthUser.id,
          email: oauthUser.email,
          password: 'oauth',
          fullName: oauthUser.name,
          role: 'trainee',
          phoneNumber: '',
          createdAt: new Date().toISOString().split('T')[0],
          isVerified: true,
        }

        // Generate mock token
        const mockToken = `mock_jwt_oauth_${Date.now()}_${Math.random()}`

        // Record successful OAuth login
        storeLoginRecord({
          id: `login_${Date.now()}`,
          userId: user.id,
          email: user.email,
          fullName: user.fullName,
          authMethod: provider,
          role: user.role,
          loginTime: new Date().toISOString(),
          status: 'success',
        })

        setStatus(`Welcome, ${user.fullName}! Redirecting...`)

        // Success - redirect after brief delay
        setTimeout(() => {
          onOAuthSuccess(user, mockToken, user.role)
        }, 1500)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'OAuth login failed'
        console.error('OAuth error:', error)

        // Record failed OAuth login
        storeLoginRecord({
          id: `login_${Date.now()}`,
          userId: 'unknown',
          email: 'unknown',
          fullName: 'Unknown',
          authMethod: 'google',
          role: 'unknown',
          loginTime: new Date().toISOString(),
          status: 'failed',
          errorMessage,
        })

        setStatus(`Error: ${errorMessage}`)
        onError(errorMessage)
      }
    }

    processOAuthCallback()
  }, [onOAuthSuccess, onError])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070913] via-[#0c1024] to-[#141a38] flex items-center justify-center px-4">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>

      {/* Processing Card */}
      <div className="relative w-full max-w-md">
        <div className="glass-panel p-8 rounded-3xl border border-fuchsia-500/30 magenta-glow space-y-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-fuchsia-600 via-purple-600 to-yellow-500 p-0.5 magenta-glow animate-spin">
              <div className="w-full h-full bg-[#0a0d1a] rounded-[14px] flex items-center justify-center">
                <i className="fa-solid fa-spinner text-yellow-400 text-2xl animate-spin"></i>
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-extrabold text-white mb-2">
              ZEN<span className="text-yellow-400">Track</span>
            </h1>
            <p className="text-xs text-indigo-300 mb-6">Beyond Training. Beyond Certification.</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-white">{status}</p>
            <div className="w-full h-1 bg-indigo-900 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-fuchsia-600 to-yellow-500 animate-pulse"></div>
            </div>
          </div>

          <p className="text-xs text-indigo-300/60">
            Please wait while we verify your credentials...
          </p>
        </div>
      </div>
    </div>
  )
}

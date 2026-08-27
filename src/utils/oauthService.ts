/**
 * OAuth service for Google and GitHub authentication
 * In production, this would call real OAuth providers
 */

import type { OAuthUser, OAuthProvider } from '@/types/oauth'

// OAuth Configuration (in production, use environment variables)
export const OAUTH_CONFIG = {
  google: {
    clientId: ((import.meta as any).env.VITE_GOOGLE_CLIENT_ID as string) || '115907322645-is27479b0l7m1tvk5miis6f6o2edusom.apps.googleusercontent.com',
    redirectUri: `${window.location.origin}/auth/callback/google`,
    authEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    scopes: 'openid email profile',
  },
  github: {
    clientId: ((import.meta as any).env.VITE_GITHUB_CLIENT_ID as string) || 'YOUR_GITHUB_CLIENT_ID',
    redirectUri: `${window.location.origin}/auth/callback/github`,
    authEndpoint: 'https://github.com/login/oauth/authorize',
  },
}

/**
 * Generate Google OAuth URL for real OAuth flow
 */
export function getGoogleAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: OAUTH_CONFIG.google.clientId,
    redirect_uri: OAUTH_CONFIG.google.redirectUri,
    response_type: 'code',
    scope: OAUTH_CONFIG.google.scopes,
    access_type: 'offline',
    prompt: 'consent',
  })

  return `${OAUTH_CONFIG.google.authEndpoint}?${params.toString()}`
}

/**
 * Generate GitHub OAuth URL
 */
export function getGithubAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: OAUTH_CONFIG.github.clientId,
    redirect_uri: OAUTH_CONFIG.github.redirectUri,
    scope: 'user:email',
    allow_signup: 'true',
  })

  return `${OAUTH_CONFIG.github.authEndpoint}?${params.toString()}`
}

/**
 * Mock Google OAuth callback (in demo mode)
 * In production, this would call your backend API
 */
export async function handleGoogleCallback(_code: string): Promise<OAuthUser> {
  // Simulate backend API call
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock response - in production, verify code with Google servers
  const randomId = Math.random().toString(36).substr(2, 9)
  return {
    id: `google_${randomId}`,
    email: `google_user_${randomId}@gmail.com`,
    name: 'Google User',
    picture: 'https://via.placeholder.com/150',
    provider: 'google',
  }
}

/**
 * Mock GitHub OAuth callback (in production, call backend to verify token)
 */
export async function handleGithubCallback(_code: string): Promise<OAuthUser> {
  // Simulate API call to backend
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock response (in production, exchange code for token)
  return {
    id: `github_${Date.now()}`,
    email: `user.${Math.random().toString(36).substr(2, 9)}@github.com`,
    name: 'GitHub User',
    provider: 'github',
  }
}

/**
 * Request OAuth permission (opens OAuth provider in popup or redirect)
 */
export function initiateOAuthFlow(provider: OAuthProvider): void {
  const authUrl = provider === 'google' ? getGoogleAuthUrl() : getGithubAuthUrl()

  // Open in new window (popup)
  const width = 500
  const height = 600
  const left = window.screenX + (window.outerWidth - width) / 2
  const top = window.screenY + (window.outerHeight - height) / 2

  window.open(
    authUrl,
    `${provider}_auth`,
    `width=${width},height=${height},left=${left},top=${top},resizable,scrollbars`
  )
}

/**
 * Extract OAuth code from URL (for callback handling)
 */
export function getOAuthCodeFromUrl(): string | null {
  const params = new URLSearchParams(window.location.search)
  return params.get('code')
}

/**
 * Parse OAuth provider from URL
 */
export function getOAuthProviderFromUrl(): string {
  const pathname = window.location.pathname
  if (pathname.includes('google')) return 'google'
  if (pathname.includes('github')) return 'github'
  return 'unknown'
}

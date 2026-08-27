import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth functions
export async function signInWithGoogle() {
  try {
    // Step 1: Start OAuth flow with Google
    const googleParams = new URLSearchParams({
      client_id: '69208919498-g2k72ahnubnoksveu2lqlu088b7rd2nq.apps.googleusercontent.com',
      redirect_uri: `${window.location.origin}/auth/google-callback`,
      response_type: 'code',
      scope: 'openid profile email',
      access_type: 'offline',
      prompt: 'consent'
    })

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${googleParams.toString()}`
  } catch (error) {
    throw error
  }
}

export async function signInWithGitHub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/auth/callback/github`,
    },
  })

  if (error) {
    throw error
  }

  return data
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return data
}

export async function signUpWithEmail(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) {
    throw error
  }

  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

// Database functions
export async function recordLogin(userId: string, email: string, fullName: string, authMethod: string, role: string) {
  const { error } = await supabase
    .from('login_records')
    .insert({
      user_id: userId,
      email,
      full_name: fullName,
      auth_method: authMethod,
      role,
      login_time: new Date().toISOString(),
      status: 'success',
    })

  if (error) {
    console.error('Error recording login:', error)
  }
}

export async function getLoginRecords() {
  const { data, error } = await supabase
    .from('login_records')
    .select('*')
    .order('login_time', { ascending: false })
    .limit(100)

  if (error) {
    console.error('Error fetching login records:', error)
    return []
  }

  return data || []
}

// Handle Google OAuth Callback
export async function handleGoogleCallback(code: string) {
  try {
    const BACKEND_URL = (import.meta as any).env.VITE_API_URL || 'https://zentrack-api.vercel.app'
    
    const response = await fetch(`${BACKEND_URL}/api/auth/google/callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
      credentials: 'include'
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Google authentication failed')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Google callback error:', error)
    throw error
  }
}

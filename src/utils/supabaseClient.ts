import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth functions
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback/google`,
    },
  })

  if (error) {
    throw error
  }

  return data
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

/**
 * Form validation utilities
 */

export interface ValidationError {
  field: string
  message: string
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  if (!/[@$!%*?&]/.test(password)) {
    errors.push('Password must contain at least one special character (@$!%*?&)')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Validate phone number format (Indian format)
 */
export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^(\+91[\-\s]?)?[6-9]\d{9}$/
  return phoneRegex.test(phone.replace(/\s+/g, ''))
}

/**
 * Validate full name
 */
export function validateFullName(name: string): boolean {
  const nameRegex = /^[a-zA-Z\s']{2,}$/
  return nameRegex.test(name.trim())
}

/**
 * Login validation
 */
export function validateLoginForm(email: string, password: string): ValidationError[] {
  const errors: ValidationError[] = []

  if (!email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' })
  } else if (!validateEmail(email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' })
  }

  if (!password) {
    errors.push({ field: 'password', message: 'Password is required' })
  }

  return errors
}

/**
 * Sign up validation
 */
export function validateSignUpForm(data: {
  email: string
  password: string
  confirmPassword: string
  fullName: string
  phoneNumber: string
  agreeToTerms: boolean
}): ValidationError[] {
  const errors: ValidationError[] = []

  // Email validation
  if (!data.email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' })
  } else if (!validateEmail(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' })
  }

  // Full name validation
  if (!data.fullName.trim()) {
    errors.push({ field: 'fullName', message: 'Full name is required' })
  } else if (!validateFullName(data.fullName)) {
    errors.push({ field: 'fullName', message: 'Full name must be at least 2 characters' })
  }

  // Phone validation
  if (!data.phoneNumber.trim()) {
    errors.push({ field: 'phoneNumber', message: 'Phone number is required' })
  } else if (!validatePhoneNumber(data.phoneNumber)) {
    errors.push({ field: 'phoneNumber', message: 'Please enter a valid Indian phone number' })
  }

  // Password validation
  const passwordValidation = validatePassword(data.password)
  if (!data.password) {
    errors.push({ field: 'password', message: 'Password is required' })
  } else if (!passwordValidation.valid) {
    errors.push({
      field: 'password',
      message: passwordValidation.errors[0] || 'Password is invalid',
    })
  }

  // Confirm password validation
  if (!data.confirmPassword) {
    errors.push({ field: 'confirmPassword', message: 'Please confirm your password' })
  } else if (data.password !== data.confirmPassword) {
    errors.push({ field: 'confirmPassword', message: 'Passwords do not match' })
  }

  // Terms agreement validation
  if (!data.agreeToTerms) {
    errors.push({ field: 'agreeToTerms', message: 'You must agree to the terms and conditions' })
  }

  return errors
}

/**
 * Forgot password validation
 */
export function validateForgotPasswordForm(email: string): ValidationError[] {
  const errors: ValidationError[] = []

  if (!email.trim()) {
    errors.push({ field: 'email', message: 'Email is required' })
  } else if (!validateEmail(email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' })
  }

  return errors
}

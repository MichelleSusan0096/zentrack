# ZENTrack Authentication System Guide

Complete guide to the authentication system with login, sign up, and password reset functionality.

## 📋 Overview

The ZENTrack authentication system provides:
- ✅ User login with email and password
- ✅ New user registration (sign up)
- ✅ Password recovery with email verification
- ✅ Role-based access (Government, Trainee, Provider, Employer)
- ✅ Form validation with detailed error messages
- ✅ Password strength indicator
- ✅ Demo credentials for testing
- ✅ Mock OTP verification

## 🚀 Getting Started

### Demo Credentials

For testing without creating an account, use:

#### Government Admin
```
Email: admin@zentrack.com
Password: Admin@123456
```

#### Trainee/Employee
```
Email: trainee@zentrack.com
Password: Trainee@123456
```

#### Training Provider
```
Email: provider@zentrack.com
Password: Provider@123456
```

#### Employer
```
Email: employer@zentrack.com
Password: Employer@123456
```

## 🔐 Authentication Flow

### 1. Login Flow
```
User Opens App
    ↓
Not Authenticated → Show Login Page
    ↓
User Enters Email & Password
    ↓
Validation Check
    ├─ Invalid Format? → Show Error
    └─ Valid? → Check Database
        ├─ User Not Found? → Show Error
        ├─ Wrong Password? → Show Error
        └─ Success? → Save Token & User
            ↓
        Redirect to Dashboard
```

### 2. Sign Up Flow
```
User Clicks "Create New Account"
    ↓
Show Sign Up Form
    ↓
User Fills Form (Email, Password, Name, Phone, Role)
    ↓
Validation Check
    ├─ Any Validation Errors? → Show Errors
    └─ All Valid? → Check Email Exists
        ├─ Email Exists? → Show Error
        └─ New Email? → Create Account
            ↓
        Auto-Login User
            ↓
        Redirect to Dashboard
```

### 3. Password Reset Flow
```
User Clicks "Forgot Password?" on Login
    ↓
Show Email Input
    ↓
User Enters Email
    ↓
Validation & Check Email Exists
    ├─ Email Not Found? → Show Error
    └─ Email Found? → Send OTP
        ↓
    User Enters OTP Code (any 6 digits for demo)
        ↓
    OTP Valid? → Show Password Reset Form
        ↓
    User Enters New Password
        ↓
    Password Reset Success
        ↓
    Redirect to Login
```

## 📁 Authentication File Structure

```
src/
├── types/
│   ├── index.ts              (Main types)
│   └── auth.ts               (Authentication types) ✨ NEW
│
├── data/
│   └── authMockData.ts       (Mock users & credentials) ✨ NEW
│
├── utils/
│   └── validation.ts         (Form validation utilities) ✨ NEW
│
├── components/
│   └── auth/                 (Authentication components) ✨ NEW
│       ├── AuthContainer.tsx (Main auth coordinator)
│       ├── LoginPage.tsx     (Login form)
│       ├── SignUpPage.tsx    (Registration form)
│       └── ForgotPasswordPage.tsx (Password reset)
│
└── App.tsx                   (Updated with auth state)
```

## 🔑 Key Components

### AuthContainer
**Purpose**: Manages authentication state and switches between auth screens

**Props**:
```typescript
interface AuthContainerProps {
  onAuthSuccess: (user: User, token: string, role: string) => void
}
```

**Usage**:
```typescript
<AuthContainer onAuthSuccess={handleAuthSuccess} />
```

---

### LoginPage
**Purpose**: User login form

**Features**:
- Email and password inputs
- Show/hide password toggle
- "Remember me" checkbox
- "Forgot password?" link
- Demo credentials display
- Error validation
- Loading state

**Props**:
```typescript
interface LoginPageProps {
  onLoginSuccess: (user: User, token: string) => void
  onSignUpClick: () => void
  onForgotPasswordClick: () => void
}
```

---

### SignUpPage
**Purpose**: User registration form

**Features**:
- Full name, email, phone, role selection
- Password strength indicator
- Password confirmation
- Terms & conditions checkbox
- Real-time validation
- Error messages for each field
- Two-column responsive layout

**Fields**:
- Full Name (text, required)
- Email (email, required)
- Phone Number (tel, required, Indian format)
- Account Type (dropdown, required)
- Password (password, required, strength checked)
- Confirm Password (password, required)
- Terms Agreement (checkbox, required)

**Props**:
```typescript
interface SignUpPageProps {
  onSignUpSuccess: (user: User, token: string) => void
  onLoginClick: () => void
}
```

---

### ForgotPasswordPage
**Purpose**: Password recovery with OTP verification

**Steps**:
1. Email verification
2. OTP code entry (simulated)
3. New password creation

**Features**:
- Multi-step form
- OTP validation (accepts any 6 digits)
- Password reset
- Auto-redirect to login on success

**Props**:
```typescript
interface ForgotPasswordPageProps {
  onBackToLogin: () => void
  onResetSuccess: () => void
}
```

## 🔍 Validation Rules

### Email Validation
- Must be valid email format (user@domain.com)
- Required field

### Password Validation
- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (@$!%*?&)

**Strength Indicator**:
- ✓ Strong (all requirements met)
- ⚠ Weak (missing requirements)

### Full Name Validation
- Minimum 2 characters
- Only letters, spaces, and apostrophes allowed
- Required field

### Phone Number Validation
- Indian phone format: +91-XXXXXXXXXX or 10 digits starting with 6-9
- Required field

### Role Selection
- Required field
- Options: Trainee, Government, Provider, Employer

## 📝 Type Definitions

### User Interface
```typescript
interface User {
  id: string
  email: string
  password: string
  fullName: string
  role: 'government' | 'trainee' | 'provider' | 'employer'
  phoneNumber: string
  createdAt: string
  isVerified: boolean
}
```

### Authentication State
```typescript
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  success: string | null
}
```

### Form Data Types
```typescript
interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

interface SignUpFormData {
  email: string
  password: string
  confirmPassword: string
  fullName: string
  phoneNumber: string
  role: 'government' | 'trainee' | 'provider' | 'employer'
  agreeToTerms: boolean
}

interface ForgotPasswordData {
  email: string
}
```

## 🛠️ Validation Functions

All validation functions are in `src/utils/validation.ts`:

```typescript
validateEmail(email: string) → boolean
validatePassword(password: string) → { valid: boolean; errors: string[] }
validatePhoneNumber(phone: string) → boolean
validateFullName(name: string) → boolean
validateLoginForm(email, password) → ValidationError[]
validateSignUpForm(data) → ValidationError[]
validateForgotPasswordForm(email) → ValidationError[]
```

## 🎨 UI/UX Features

### Error Handling
- Field-level error messages
- General error messages
- Real-time validation on input change
- Error icons and colors

### Visual Feedback
- Loading spinner during form submission
- Success messages
- Error highlights (red border on invalid fields)
- Focus states
- Hover effects
- Disabled submit button when form is invalid

### User Experience
- Demo credentials visible on login page
- One-click show/hide password
- Auto-dismiss errors when user starts typing
- Smooth transitions between auth screens
- Responsive design (mobile to desktop)
- Dark mode by default

### Accessibility
- Semantic HTML labels
- Icon indicators
- Clear error messages
- Keyboard navigation support
- Color not the only indicator of state

## 🔄 Integration with Dashboard

### After Successful Login
1. User and token are stored in React state
2. App component redirects to Dashboard
3. User info bar displays at top:
   - User initials avatar
   - Full name and role
   - Logout button
4. Role-specific content is shown

### Logout Functionality
```typescript
handleLogout = () => {
  setIsAuthenticated(false)
  setCurrentUser(null)
  setAuthToken(null)
  // Show login page again
}
```

## 🧪 Testing the Auth System

### Test Scenarios

#### Scenario 1: Valid Login
1. Go to login page
2. Enter: `admin@zentrack.com` / `Admin@123456`
3. Click "Sign In"
4. ✓ Should redirect to dashboard

#### Scenario 2: Invalid Email
1. Enter: `nonexistent@zentrack.com`
2. Click "Sign In"
3. ✓ Should show "Email not found" error

#### Scenario 3: Wrong Password
1. Enter: `admin@zentrack.com`
2. Enter wrong password
3. Click "Sign In"
4. ✓ Should show "Invalid password" error

#### Scenario 4: Sign Up New User
1. Click "Create New Account"
2. Fill all fields correctly
3. Click "Create Account"
4. ✓ Should auto-login and show dashboard

#### Scenario 5: Sign Up - Existing Email
1. Click "Create New Account"
2. Use existing email: `admin@zentrack.com`
3. Click "Create Account"
4. ✓ Should show "Email already registered" error

#### Scenario 6: Password Reset
1. Click "Forgot password?"
2. Enter email: `admin@zentrack.com`
3. Enter any 6 digits as OTP
4. Enter new password (must meet requirements)
5. ✓ Should show success and redirect to login

#### Scenario 7: Password Validation
1. Click "Create New Account"
2. Try password with only lowercase: `test`
3. ✓ Should show error for all requirements

## 🔐 Security Notes

### Current Implementation (Development)
- Uses mock data for demo
- Passwords stored in mock data (NOT production-safe)
- Mock JWT tokens generated
- OTP validation is simulated (any 6 digits accepted)

### For Production Implementation
- [ ] Hash passwords with bcrypt
- [ ] Implement real JWT token generation
- [ ] Use real OTP service (Twilio, AWS SNS)
- [ ] Implement email verification
- [ ] Add rate limiting on login attempts
- [ ] Store passwords securely
- [ ] Use HTTPS only
- [ ] Implement token expiration
- [ ] Add refresh token mechanism
- [ ] Log authentication events

## 📱 Responsive Design

The authentication pages are fully responsive:

**Mobile** (< 640px):
- Full-width forms
- Single column layout
- Touch-optimized buttons
- Readable text sizes

**Tablet** (640px - 1024px):
- Centered card layout
- Optimal spacing
- Two-column signup form

**Desktop** (> 1024px):
- Centered modal-like card
- Maximum width constraints
- Full feature visibility

## 🚀 API Integration Ready

To connect to a real backend:

1. **Replace Mock Users**:
   ```typescript
   // Replace mock data check with API call
   const response = await fetch('/api/auth/login', {
     method: 'POST',
     body: JSON.stringify({ email, password })
   })
   const { user, token } = await response.json()
   ```

2. **Replace Sign Up**:
   ```typescript
   // Similar API call for registration
   ```

3. **Replace Password Reset**:
   ```typescript
   // API calls for each step (email, OTP, reset)
   ```

## 📚 Additional Resources

- Type definitions: `src/types/auth.ts`
- Validation utilities: `src/utils/validation.ts`
- Mock data: `src/data/authMockData.ts`
- Main app integration: `src/App.tsx`

## 🎯 Next Steps

To extend authentication:

1. **Add Social Login** (Google, GitHub, etc.)
2. **Implement 2FA** (Two-factor authentication)
3. **Add Email Verification** on signup
4. **Session Management** (auto-logout, remember me)
5. **Account Recovery** options
6. **Profile Management** after login
7. **Audit Logging** of auth events

---

**Authentication System**: ✅ Complete
**Status**: Ready for Backend Integration
**Last Updated**: August 2026

# OAuth & Excel Integration Guide

Complete guide to OAuth authentication (Google & GitHub) and Excel login data export.

## 📋 Overview

This system adds:
- **OAuth Authentication**: Google and GitHub login support
- **Login Tracking**: Automatic recording of all authentication events
- **Excel Export**: Download login data as CSV/Excel files
- **Analytics Dashboard**: View login statistics and trends

---

## 🔐 OAuth Setup

### Supported Providers

1. **Google OAuth**
2. **GitHub OAuth**

### How to Setup (Production)

#### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URIs:
   ```
   http://localhost:5173/auth/callback/google
   https://yourdomain.com/auth/callback/google
   ```
6. Copy Client ID and add to `.env`:
   ```
   REACT_APP_GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
   ```

#### GitHub OAuth Setup

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create new OAuth App
3. Set Authorization callback URL:
   ```
   http://localhost:5173/auth/callback/github
   https://yourdomain.com/auth/callback/github
   ```
4. Copy Client ID and add to `.env`:
   ```
   REACT_APP_GITHUB_CLIENT_ID=your_client_id
   ```

### Current Implementation (Demo)

The system includes mock OAuth handlers for testing without real credentials:

```typescript
// Mock implementations
handleGoogleCallback(code) → Mock OAuthUser
handleGithubCallback(code) → Mock OAuthUser
```

---

## 📁 New Files Created

### OAuth Files

**File**: `src/types/oauth.ts`
- OAuth type definitions
- Login record interface
- Excel data format

**File**: `src/utils/oauthService.ts`
- OAuth URL generation
- OAuth callback handling
- Provider initialization

**File**: `src/components/auth/OAuthLoginPage.tsx`
- OAuth processing page
- Callback handling
- Loading states

### Excel/Analytics Files

**File**: `src/utils/excelService.ts`
- CSV generation
- Excel export
- Login statistics
- Data filtering

**File**: `src/components/admin/LoginAnalytics.tsx`
- Analytics dashboard
- Login records table
- Statistics visualization
- Export functionality

### Updated Files

**File**: `src/components/auth/LoginPage.tsx`
- Added OAuth buttons
- Google login button
- GitHub login button

---

## 🔗 OAuth Buttons on Login Page

The login page now includes:

```
┌─────────────────────────┐
│   Email/Password Form   │
├─────────────────────────┤
│   Or continue with      │
├─────────────────────────┤
│ [Google] [GitHub]       │
├─────────────────────────┤
│ Create New Account      │
└─────────────────────────┘
```

### OAuth Flow

```
User clicks "Google" or "GitHub"
        ↓
Open OAuth provider login
        ↓
User authorizes app
        ↓
Redirected to callback URL with code
        ↓
Exchange code for user info
        ↓
Create/login user
        ↓
Record login in Excel
        ↓
Redirect to dashboard
```

---

## 📊 Login Recording System

### What Gets Recorded

Every login attempt (successful or failed) is recorded:

```typescript
{
  id: "login_1234567890",
  userId: "user_123",
  email: "user@example.com",
  fullName: "John Doe",
  authMethod: "google" | "github" | "email",
  role: "trainee",
  loginTime: "2026-08-27T10:30:00Z",
  logoutTime: "2026-08-27T11:45:00Z",
  duration: 4500000, // milliseconds
  status: "success" | "failed",
  errorMessage: "Invalid password" // if failed
}
```

### Storage

Records are stored in **browser localStorage** (for demo):
- Key: `zentrack_login_records`
- Format: JSON array
- Limit: Last 1000 records
- Persists across browser sessions

### For Production

Replace localStorage with:
- Database (MongoDB, PostgreSQL)
- Cloud storage (Firebase, AWS)
- Excel file upload to server

---

## 📈 Analytics Dashboard

### Access Analytics

1. User must be admin role
2. Go to: `/admin/analytics` (when implemented)
3. View login statistics

### Features

#### Statistics Cards
- Total logins count
- Success rate percentage
- Failed logins
- Auth methods used

#### Filters
- Search by email, name, or ID
- Filter by auth method (Email, Google, GitHub)
- Date range filtering
- Combine multiple filters

#### Data Display
- Table of recent 50 logins
- Sortable by login time
- Shows auth method icons
- Status indicators

#### Visualizations
- Logins by auth method (bar chart)
- Logins by user role (bar chart)
- Success rate trends

#### Export
- Export filtered data as CSV
- Download as Excel file
- Automatic filename with date
- All columns included

---

## 💾 Excel Export Format

### CSV Columns

```
Login ID
User ID
Email
Full Name
Auth Method
User Role
Login Time
Logout Time
Session Duration (minutes)
Status
Error
```

### Example Row

```
login_1234567890,user_123,john@example.com,John Doe,Google,trainee,8/27/2026 10:30:00,8/27/2026 11:45:00,75,Success,
```

### Download Options

1. **Export Filtered Data**: Exports current filtered view
2. **Export All**: Export all login records
3. **Date-specific**: Download with date in filename

### File Format

- Format: CSV (can open in Excel)
- Filename: `zentrack_login_records_YYYY-MM-DD.csv`
- Encoding: UTF-8 with quotes
- Proper escaping of special characters

---

## 🧪 Testing OAuth (Demo Mode)

### Test Google Login

1. Click "Google" button on login page
2. Mock callback processes
3. Random mock user created
4. Login recorded in localStorage
5. Dashboard shown

### Test GitHub Login

1. Click "GitHub" button on login page
2. Mock callback processes
3. Random mock user created
4. Login recorded in localStorage
5. Dashboard shown

### View Records

1. Open browser DevTools (F12)
2. Go to Storage → Local Storage
3. Find key: `zentrack_login_records`
4. View JSON array of records

### Export Data

1. After testing logins
2. Go to Analytics dashboard
3. Click "Export to Excel"
4. CSV file downloads automatically

---

## 🔑 API Reference

### OAuth Service Functions

```typescript
// Generate OAuth URLs
getGoogleAuthUrl() → string
getGithubAuthUrl() → string

// Initiate OAuth flow
initiateOAuthFlow(provider: 'google' | 'github') → void

// Handle callbacks
handleGoogleCallback(code: string) → Promise<OAuthUser>
handleGithubCallback(code: string) → Promise<OAuthUser>

// URL parsing
getOAuthCodeFromUrl() → string | null
getOAuthProviderFromUrl() → OAuthProvider | null
```

### Excel Service Functions

```typescript
// Data conversion
convertToExcelFormat(records: LoginRecord[]) → ExcelLoginData[]

// Export
generateCSV(records: LoginRecord[]) → string
downloadExcelFile(records: LoginRecord[], filename?: string) → void

// Storage
storeLoginRecord(record: LoginRecord) → void
getLoginRecords() → LoginRecord[]
clearLoginRecords() → void

// Analysis
getLoginStatistics(records: LoginRecord[]) → Statistics
filterByDateRange(records: LoginRecord[], start: Date, end: Date) → LoginRecord[]
filterByProvider(records: LoginRecord[], provider: string) → LoginRecord[]
searchRecords(records: LoginRecord[], query: string) → LoginRecord[]
```

---

## 🧩 Component Integration

### LoginPage Component

**New**: OAuth buttons
```jsx
<button onClick={() => initiateOAuthFlow('google')}>
  Google
</button>
<button onClick={() => initiateOAuthFlow('github')}>
  GitHub
</button>
```

**Updated**: Login recording
```typescript
// On successful login
storeLoginRecord({
  id: `login_${Date.now()}`,
  userId: user.id,
  email: user.email,
  fullName: user.fullName,
  authMethod: 'email',
  role: user.role,
  loginTime: new Date().toISOString(),
  status: 'success',
})
```

### OAuthLoginPage Component

Handles OAuth callback:
1. Get OAuth code from URL
2. Verify with provider
3. Create user account
4. Record login
5. Redirect to dashboard

### LoginAnalytics Component

Admin analytics dashboard:
1. Load records from localStorage
2. Display statistics
3. Provide filtering
4. Enable export
5. Show visualizations

---

## 🚀 Development Workflow

### Local Development

1. **No credentials needed** for demo
2. OAuth buttons work with mock handlers
3. Login records stored in localStorage
4. Can test export locally

### Production Deployment

1. **Add OAuth credentials** to environment variables
2. **Implement backend** OAuth callback handler
3. **Setup database** for login records
4. **Configure HTTPS** (required by OAuth)
5. **Update redirect URIs** in OAuth providers

---

## 🔒 Security Considerations

### Current (Demo)

⚠️ **Not secure for production**:
- Mock OAuth handlers
- localStorage storage
- No encryption
- No rate limiting
- No CSRF protection

### For Production

✅ **Required security measures**:
- Validate OAuth tokens on backend
- Store data in secure database
- Encrypt sensitive data
- Implement rate limiting
- Add CSRF tokens
- Use HTTPS only
- Implement session management
- Add audit logging

---

## 📊 Example Usage

### Record a Login

```typescript
import { storeLoginRecord } from '@/utils/excelService'

const newLogin = {
  id: `login_${Date.now()}`,
  userId: 'user_123',
  email: 'user@example.com',
  fullName: 'John Doe',
  authMethod: 'google',
  role: 'trainee',
  loginTime: new Date().toISOString(),
  status: 'success',
}

storeLoginRecord(newLogin)
```

### Export to Excel

```typescript
import { getLoginRecords, downloadExcelFile } from '@/utils/excelService'

const records = getLoginRecords()
downloadExcelFile(records, 'login_data.csv')
```

### Get Statistics

```typescript
import { getLoginStatistics } from '@/utils/excelService'

const stats = getLoginStatistics(records)
console.log(stats.totalLogins)      // 150
console.log(stats.successfulLogins) // 145
console.log(stats.byProvider)       // { email: 100, google: 40, github: 10 }
```

### Filter Records

```typescript
import { searchRecords, filterByDateRange } from '@/utils/excelService'

// Search
const matches = searchRecords(records, 'john')

// Date range
const start = new Date('2026-08-01')
const end = new Date('2026-08-31')
const thisMonth = filterByDateRange(records, start, end)
```

---

## 📝 Configuration

### Environment Variables

```bash
# .env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_GITHUB_CLIENT_ID=your_github_client_id
```

### OAuth Config (src/utils/oauthService.ts)

```typescript
export const OAUTH_CONFIG = {
  google: {
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    redirectUri: `${window.location.origin}/auth/callback/google`,
  },
  github: {
    clientId: process.env.REACT_APP_GITHUB_CLIENT_ID,
    redirectUri: `${window.location.origin}/auth/callback/github`,
  },
}
```

---

## ✅ Testing Checklist

- [ ] Google OAuth button visible
- [ ] GitHub OAuth button visible
- [ ] Email login still works
- [ ] Login records created
- [ ] Analytics dashboard loads
- [ ] Filters work
- [ ] Export creates file
- [ ] CSV readable in Excel
- [ ] Statistics accurate
- [ ] Search finds records

---

## 🐛 Troubleshooting

### OAuth buttons don't work
**Solution**: Using mock handlers - they work with any click

### No records saved
**Solution**: Check browser localStorage not cleared

### Export file empty
**Solution**: No records match current filters

### Stats don't match
**Solution**: Clear cache and reload page

### Analytics not showing
**Solution**: Ensure admin role (or update component)

---

## 📚 Related Files

- `src/types/oauth.ts` - Type definitions
- `src/utils/oauthService.ts` - OAuth logic
- `src/utils/excelService.ts` - Excel/CSV logic
- `src/components/auth/LoginPage.tsx` - OAuth buttons
- `src/components/auth/OAuthLoginPage.tsx` - Callback handler
- `src/components/admin/LoginAnalytics.tsx` - Analytics

---

## 🔗 Next Steps

1. ✅ OAuth buttons working (demo)
2. ✅ Login recording implemented
3. ✅ Excel export ready
4. 🔲 Connect real OAuth providers
5. 🔲 Setup backend verification
6. 🔲 Implement database storage
7. 🔲 Add role-based access control

---

**Status**: Demo implementation complete ✅
**Production**: Ready for backend integration
**Last Updated**: August 2026

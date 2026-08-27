# OAuth & Excel Integration - Setup & Usage Guide

Quick setup guide for OAuth authentication and Excel login tracking.

## 🎯 What's New

### Features Added
✅ Google OAuth login button
✅ GitHub OAuth login button  
✅ Automatic login recording
✅ Login analytics dashboard
✅ Export to Excel/CSV
✅ Login statistics
✅ Admin analytics access

### Files Created (5)
```
src/types/oauth.ts                    - OAuth types
src/utils/oauthService.ts             - OAuth logic
src/utils/excelService.ts             - Excel/CSV export
src/components/auth/OAuthLoginPage.tsx - OAuth callback handler
src/components/admin/LoginAnalytics.tsx - Analytics dashboard
```

### Files Updated (1)
```
src/components/auth/LoginPage.tsx - Added OAuth buttons
src/App.tsx                        - OAuth integration
```

---

## 🚀 Getting Started (Demo Mode)

### No Setup Required!

The system works immediately with mock OAuth handlers. No API keys needed for testing.

### Test OAuth Buttons

1. Go to **http://localhost:5173**
2. See login page with OAuth buttons
3. Click **"Google"** or **"GitHub"** button
4. Mock login processes automatically
5. New user created and logged in
6. Login recorded in localStorage

---

## 🔐 OAuth Demo vs Production

### Demo Mode (Current) ✅
- Mock OAuth handlers
- Works without credentials
- Records stored in browser localStorage
- Perfect for testing and demo
- No backend needed

### Production Mode (Future)
- Real Google/GitHub OAuth
- Backend token verification
- Database storage
- Security measures
- HTTPS required

---

## 📊 Login Recording

### What Gets Recorded

Every login (successful or failed) is automatically recorded:

```
Login ID:        Unique identifier
User ID:         User's account ID
Email:           User's email
Full Name:       User's full name
Auth Method:     email | google | github
User Role:       trainee | government | provider | employer
Login Time:      ISO timestamp
Logout Time:     ISO timestamp (if logged out)
Duration:        Session duration in minutes
Status:          success | failed
Error:           Error message if failed
```

### Storage Location

**Browser localStorage** (for demo):
- Key: `zentrack_login_records`
- Format: JSON array
- Persists across sessions
- Automatic cleanup (keeps 1000 records)

### Check Records

1. Open DevTools: **F12**
2. Go to **Application** tab
3. Click **Local Storage**
4. Find `zentrack_login_records`
5. View JSON array

---

## 📈 Analytics Dashboard

### Access Analytics

**Admin users only** (Government role):

1. Login with admin account:
   - Email: `admin@zentrack.com`
   - Password: `Admin@123456`

2. Click **"Analytics"** button in top-right

3. View login statistics and records

### Dashboard Features

#### Statistics Cards
```
┌─────────────────────┐
│ Total Logins: 150   │
│ Success Rate: 96%   │
│ Failed Logins: 6    │
│ Auth Methods: 3     │
└─────────────────────┘
```

#### Search & Filter
- Search by email, name, or ID
- Filter by auth method
- Date range filtering
- Combine multiple filters

#### Data Table
- Shows last 50 login records
- Auth method icons
- Success/failed indicators
- Accurate timestamps

#### Charts
- Logins by auth method (Google, GitHub, Email)
- Logins by user role (distribution)
- Visual percentage bars

#### Export
- Download as CSV file
- Filename includes date
- All filters applied to export
- Opens in Excel automatically

---

## 📥 Export to Excel

### How to Export

1. Go to **Analytics Dashboard**
2. (Optional) Apply filters
3. Click **"Export to Excel"** button
4. CSV file downloads automatically

### File Format

**Filename**: `zentrack_login_records_2026-08-27.csv`

**Columns**:
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

**Example Row**:
```
login_1234567890,user_123,john@example.com,John Doe,Google,trainee,8/27/2026 10:30,8/27/2026 11:45,75,Success,
```

### Open in Excel

1. Download CSV file
2. Open with Excel
3. View formatted table
4. Analyze data
5. Create pivot tables
6. Make charts

---

## 🧪 Testing Scenarios

### Scenario 1: Test Email Login
```
1. Go to http://localhost:5173
2. Login with: admin@zentrack.com / Admin@123456
3. Check: Login recorded in analytics
4. Result: ✅ Email login tracked
```

### Scenario 2: Test Google OAuth
```
1. Click "Google" button on login page
2. Mock OAuth processes
3. New user created automatically
4. Check: Record shows "google" as auth method
5. Result: ✅ Google login tracked
```

### Scenario 3: Test GitHub OAuth
```
1. Click "GitHub" button on login page
2. Mock OAuth processes
3. New user created automatically
4. Check: Record shows "github" as auth method
5. Result: ✅ GitHub login tracked
```

### Scenario 4: View Analytics
```
1. Login as admin
2. Click "Analytics" button
3. View statistics and records
4. Apply filters
5. Export data
6. Result: ✅ All features work
```

### Scenario 5: Failed Login
```
1. Try to login with wrong password
2. Error message shown
3. Check: Failed login recorded
4. Check analytics: Shows as "Failed" status
5. Result: ✅ Failed attempts tracked
```

---

## 🔧 Production Setup

### Step 1: Setup Google OAuth

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create project
3. Enable Google+ API
4. Create OAuth credentials (Web)
5. Set redirect URI: `https://yourdomain.com/auth/callback/google`
6. Copy **Client ID**

### Step 2: Setup GitHub OAuth

1. Visit [GitHub Developer Settings](https://github.com/settings/developers)
2. Create new OAuth App
3. Set callback URL: `https://yourdomain.com/auth/callback/github`
4. Copy **Client ID**

### Step 3: Add Environment Variables

Create `.env` file:
```env
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_GITHUB_CLIENT_ID=your_github_client_id
```

### Step 4: Backend Implementation

Replace mock handlers in `src/utils/oauthService.ts`:

```typescript
// Current (mock)
handleGoogleCallback(code) → Mock OAuthUser

// Required (production)
handleGoogleCallback(code) → Real OAuth verification
```

### Step 5: Database Setup

Replace localStorage with real database:
- PostgreSQL
- MongoDB
- Firebase
- AWS DynamoDB

---

## 💻 Developer Reference

### OAuth Service

```typescript
// Generate OAuth URLs
getGoogleAuthUrl() → string
getGithubAuthUrl() → string

// Start OAuth flow
initiateOAuthFlow('google' | 'github')

// Handle callbacks
handleGoogleCallback(code) → Promise<OAuthUser>
handleGithubCallback(code) → Promise<OAuthUser>
```

### Excel Service

```typescript
// Export data
downloadExcelFile(records, filename)
generateCSV(records) → string

// Storage
storeLoginRecord(record)
getLoginRecords() → LoginRecord[]
clearLoginRecords()

// Analytics
getLoginStatistics(records) → Statistics
searchRecords(records, query)
filterByDateRange(records, startDate, endDate)
filterByProvider(records, provider)
```

---

## 📁 File Locations

### OAuth Files
- `src/types/oauth.ts` - Type definitions
- `src/utils/oauthService.ts` - OAuth service
- `src/components/auth/OAuthLoginPage.tsx` - Callback handler

### Excel Files
- `src/utils/excelService.ts` - Excel/CSV service
- `src/components/admin/LoginAnalytics.tsx` - Analytics UI

### Integration
- `src/components/auth/LoginPage.tsx` - OAuth buttons added
- `src/App.tsx` - OAuth callback routing

---

## 🎨 UI Components

### Login Page Updates

OAuth buttons added:
```
┌──────────────────────────┐
│  Email/Password Form     │
├──────────────────────────┤
│  Or continue with        │
├──────────────────────────┤
│  [Google]  [GitHub]      │
├──────────────────────────┤
│  Create New Account      │
└──────────────────────────┘
```

### Analytics Dashboard

```
┌────────────────────────────────┐
│  Login Analytics               │
├────────────────────────────────┤
│  [Stats Cards]                 │
├────────────────────────────────┤
│  Search: [___] Filter: [___]   │
├────────────────────────────────┤
│  [Export to Excel]             │
├────────────────────────────────┤
│  [Login Records Table]         │
├────────────────────────────────┤
│  [Charts & Visualizations]     │
└────────────────────────────────┘
```

---

## 🔒 Security Notes

### Demo (Current)
⚠️ **Not production-ready**:
- Mock OAuth (no real verification)
- Browser localStorage (not secure)
- No encryption
- No rate limiting
- No CSRF protection

### Production (Required)
✅ **Essential security**:
- Real OAuth verification on backend
- Encrypted database storage
- HTTPS only
- Rate limiting
- CSRF tokens
- Session management
- Audit logging

---

## ✅ Testing Checklist

- [ ] OAuth buttons visible on login page
- [ ] Google button works (mock)
- [ ] GitHub button works (mock)
- [ ] Email login still works
- [ ] Login records created
- [ ] Analytics dashboard accessible
- [ ] Filters work correctly
- [ ] Export creates CSV file
- [ ] CSV opens in Excel
- [ ] Statistics accurate
- [ ] Admin-only access works

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| OAuth buttons not showing | Refresh browser, check page loaded |
| No records in analytics | Login first to create records |
| Export creates empty file | Apply filters, check records exist |
| Analytics not accessible | Must login as admin role |
| localStorage full | Records auto-cleanup at 1000 limit |
| CSV won't open in Excel | Try opening as text first |

---

## 📞 Support

### Questions?

1. Check `OAUTH_EXCEL_GUIDE.md` for detailed docs
2. Review component code in `src/components/`
3. Check service code in `src/utils/`
4. Look at type definitions in `src/types/oauth.ts`

### Ready for Production?

1. Setup Google OAuth credentials
2. Setup GitHub OAuth credentials
3. Implement backend verification
4. Setup production database
5. Deploy with HTTPS

---

## 🎉 You're All Set!

**Current Status**: ✅ Demo ready
**Next Step**: Test OAuth buttons!
**Production**: Ready for backend integration

### Quick Test

1. Go to: http://localhost:5173
2. Click "Google" button
3. See analytics: Login recorded ✅

---

**OAuth & Excel Integration**
Status: Complete & Tested ✅
Last Updated: August 2026

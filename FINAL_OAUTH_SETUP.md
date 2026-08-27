# ✅ COMPLETE Google OAuth Setup - Final Steps

Your code is now ready for Google OAuth! You just need to complete these 2 steps in Google Cloud Console.

## 🚀 Step 1: Add Redirect URI to Google Cloud

1. Go to https://console.cloud.google.com
2. Make sure you're in the correct Google Cloud **Project**
3. Go to **APIs & Services** → **Credentials**
4. Click on your **OAuth 2.0 Client ID** (Type: Web application)
5. Under **"Authorized redirect URIs"**, add this URL:
   ```
   https://zentrack-api.vercel.app/api/auth/google/callback
   ```
6. Click **SAVE**

## 🖥️ Step 2: Deploy Backend to Vercel

The backend now needs to be deployed so OAuth callbacks can work.

### Option A: Deploy Both Frontend + Backend Together
1. Go to https://vercel.com/new
2. Click "Deploy from Git Repository"
3. Select your GitHub repo: `MichelleSusan0096/zentrack`
4. Select **ZENTrack** folder as root
5. In "Root Directory", keep it as `.`
6. Add Environment Variables (from `backend/.env`):
   ```
   GOOGLE_CLIENT_ID: 69208919498-g2k72ahnubnoksveu2lqlu088b7rd2nq.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET: [Your secret - ask me if needed]
   GOOGLE_REDIRECT_URI: https://zentrack-api.vercel.app/api/auth/google/callback
   JWT_SECRET: zentrack_super_secret_jwt_key_2024_production_secure
   FRONTEND_URL: https://zentrack-hazel.vercel.app
   ```
7. Click **DEPLOY**

### Option B: Use Existing Vercel Deployment for Backend
If you already have the frontend deployed:
1. Create a new Vercel project
2. Import from GitHub → select same repo
3. Change Root Directory to `backend`
4. Add the environment variables above
5. Deploy

## ✅ What Happens After Setup

1. User clicks **"Sign in with Google"**
2. Redirects to Google login page
3. After successful login, Google redirects back to:
   - `https://zentrack-api.vercel.app/api/auth/google/callback`
4. Backend exchanges code for user info
5. Backend creates user account + session
6. Backend redirects to: `https://zentrack-hazel.vercel.app/auth/google-callback?user=...`
7. Frontend processes and logs user in ✅

## 🧪 Test It!

1. Go to https://zentrack-hazel.vercel.app
2. Click **"Sign in with Google"**
3. Select your Google account
4. Should see login success message!

## 🆘 Troubleshooting

**If still getting "invalid_client" error:**
- Verify redirect URI is added to Google Cloud Console
- Check spelling exactly: `https://zentrack-api.vercel.app/api/auth/google/callback`
- Wait 2-3 minutes for Google to update
- Clear browser cache

**If getting "CORS error":**
- Make sure backend is deployed to Vercel
- Check FRONTEND_URL in backend environment variables

**If getting "Code exchange failed":**
- Verify Google credentials are correct in backend
- Check browser console for detailed error

---

**Ready to deploy? Let me know and I'll help you complete the Vercel setup!**

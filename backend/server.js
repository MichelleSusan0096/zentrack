import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import ExcelJS from 'exceljs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))
app.use(express.json())

// Initialize SQLite Database
let db = null

async function initDB() {
  db = await open({
    filename: path.join(__dirname, 'zentrack.db'),
    driver: sqlite3.Database
  })

  // Create tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      fullName TEXT NOT NULL,
      role TEXT DEFAULT 'trainee',
      authMethod TEXT NOT NULL,
      phoneNumber TEXT,
      isVerified BOOLEAN DEFAULT 0,
      googleId TEXT,
      githubId TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS login_records (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      email TEXT NOT NULL,
      fullName TEXT NOT NULL,
      authMethod TEXT NOT NULL,
      role TEXT NOT NULL,
      loginTime TEXT NOT NULL,
      logoutTime TEXT,
      duration INTEGER,
      status TEXT NOT NULL,
      errorMessage TEXT,
      ipAddress TEXT,
      userAgent TEXT,
      FOREIGN KEY (userId) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      token TEXT NOT NULL,
      expiresAt TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES users(id)
    );
  `)

  console.log('✅ Database initialized')
}

// Initialize DB on startup
await initDB()

// Helper functions
function generateId() {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

function generateJWT(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ZENTrack backend is running' })
})

// Google OAuth Callback Handler
app.post('/api/auth/google/callback', async (req, res) => {
  try {
    const { code } = req.body

    if (!code) {
      return res.status(400).json({ error: 'No authorization code provided' })
    }

    // Exchange code for tokens with Google
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code'
    })

    const { access_token } = tokenResponse.data

    // Get user info from Google
    const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` }
    })

    const { id: googleId, email, name, picture } = userResponse.data

    // Check if user exists
    let user = await db.get('SELECT * FROM users WHERE email = ?', [email])

    if (!user) {
      // Create new user
      const userId = generateId()
      user = {
        id: userId,
        email,
        fullName: name,
        role: 'trainee',
        authMethod: 'google',
        googleId,
        phoneNumber: '',
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      await db.run(
        'INSERT INTO users (id, email, fullName, role, authMethod, googleId, phoneNumber, isVerified, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [user.id, user.email, user.fullName, user.role, user.authMethod, user.googleId, user.phoneNumber, user.isVerified, user.createdAt, user.updatedAt]
      )
    }

    // Create session
    const token = generateJWT(user.id)
    const sessionId = generateId()

    await db.run(
      'INSERT INTO sessions (id, userId, token, expiresAt, createdAt) VALUES (?, ?, ?, ?, ?)',
      [sessionId, user.id, token, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), new Date().toISOString()]
    )

    // Record login
    const loginId = generateId()
    await db.run(
      'INSERT INTO login_records (id, userId, email, fullName, authMethod, role, loginTime, status, ipAddress, userAgent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        loginId,
        user.id,
        user.email,
        user.fullName,
        'google',
        user.role,
        new Date().toISOString(),
        'success',
        req.ip || 'unknown',
        req.get('user-agent') || 'unknown'
      ]
    )

    // Return user and token
    res.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        isVerified: user.isVerified
      },
      token,
      sessionId
    })

  } catch (error) {
    console.error('OAuth callback error:', error.message)
    
    res.status(500).json({ error: 'OAuth authentication failed', details: error.message })
  }
}))

// Email/Password Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email])

    if (!user || user.password !== password) {
      // Record failed login
      const loginId = generateId()
      await db.run(
        'INSERT INTO login_records (id, userId, email, fullName, authMethod, role, loginTime, status, errorMessage, ipAddress, userAgent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
          loginId,
          'unknown',
          email,
          'Unknown',
          'email',
          'unknown',
          new Date().toISOString(),
          'failed',
          'Invalid credentials',
          req.ip || 'unknown',
          req.get('user-agent') || 'unknown'
        ]
      )

      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Create token
    const token = generateJWT(user.id)
    const sessionId = generateId()

    await db.run(
      'INSERT INTO sessions (id, userId, token, expiresAt, createdAt) VALUES (?, ?, ?, ?, ?)',
      [sessionId, user.id, token, new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), new Date().toISOString()]
    )

    // Record login
    const loginId = generateId()
    await db.run(
      'INSERT INTO login_records (id, userId, email, fullName, authMethod, role, loginTime, status, ipAddress, userAgent) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        loginId,
        user.id,
        user.email,
        user.fullName,
        'email',
        user.role,
        new Date().toISOString(),
        'success',
        req.ip || 'unknown',
        req.get('user-agent') || 'unknown'
      ]
    )

    res.json({
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        isVerified: user.isVerified
      },
      token,
      sessionId
    })

  } catch (error) {
    console.error('Login error:', error.message)
    res.status(500).json({ error: 'Login failed', details: error.message })
  }
})

// Get login records (with analytics)
app.get('/api/analytics/logins', async (req, res) => {
  try {
    const records = await db.all(`
      SELECT * FROM login_records 
      ORDER BY loginTime DESC 
      LIMIT 100
    `)

    res.json({ records })
  } catch (error) {
    console.error('Analytics error:', error.message)
    res.status(500).json({ error: 'Failed to fetch analytics' })
  }
})

// Export to Excel
app.get('/api/analytics/export', async (req, res) => {
  try {
    const records = await db.all(`
      SELECT * FROM login_records 
      ORDER BY loginTime DESC
    `)

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Login Records')

    // Add headers
    worksheet.columns = [
      { header: 'Login ID', key: 'id', width: 20 },
      { header: 'User ID', key: 'userId', width: 20 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Full Name', key: 'fullName', width: 20 },
      { header: 'Auth Method', key: 'authMethod', width: 15 },
      { header: 'Role', key: 'role', width: 15 },
      { header: 'Login Time', key: 'loginTime', width: 20 },
      { header: 'Status', key: 'status', width: 10 },
      { header: 'Error', key: 'errorMessage', width: 30 },
      { header: 'IP Address', key: 'ipAddress', width: 15 }
    ]

    records.forEach(record => {
      worksheet.addRow(record)
    })

    // Style header
    worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } }
    worksheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F4E78' } }

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.setHeader('Content-Disposition', `attachment; filename="zentrack_logins_${Date.now()}.xlsx"`)

    await workbook.xlsx.write(res)
  } catch (error) {
    console.error('Export error:', error.message)
    res.status(500).json({ error: 'Export failed', details: error.message })
  }
})

// Get user profile
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await db.get('SELECT * FROM users WHERE id = ?', [req.params.id])

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({ user })
  } catch (error) {
    console.error('User fetch error:', error.message)
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

// Logout
app.post('/api/auth/logout', async (req, res) => {
  try {
    const { sessionId } = req.body

    if (sessionId) {
      await db.run('DELETE FROM sessions WHERE id = ?', [sessionId])
    }

    res.json({ success: true })
  } catch (error) {
    console.error('Logout error:', error.message)
    res.status(500).json({ error: 'Logout failed' })
  }
})

// Start server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`\n✅ ZENTrack Backend running on http://localhost:${PORT}`)
  console.log(`📊 Google OAuth Client ID: ${process.env.GOOGLE_CLIENT_ID}`)
  console.log(`🔒 JWT Secret configured\n`)
})

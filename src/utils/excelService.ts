/**
 * Excel service for managing login records
 * Generates and exports login data to Excel
 */

import type { LoginRecord, ExcelLoginData } from '@/types/oauth'

/**
 * Convert LoginRecord to ExcelLoginData format
 */
export function convertToExcelFormat(records: LoginRecord[]): ExcelLoginData[] {
  return records.map((record) => ({
    'Login ID': record.id,
    'User ID': record.userId,
    'Email': record.email,
    'Full Name': record.fullName,
    'Auth Method': record.authMethod === 'email' ? 'Email/Password' : record.authMethod.toUpperCase(),
    'User Role': record.role,
    'Login Time': new Date(record.loginTime).toLocaleString(),
    'Logout Time': record.logoutTime ? new Date(record.logoutTime).toLocaleString() : 'Active',
    'Session Duration (minutes)': record.duration ? Math.round(record.duration / 60000) : 0,
    'Status': record.status === 'success' ? 'Success' : 'Failed',
    'Error': record.errorMessage || '',
  }))
}

/**
 * Generate CSV content from login records
 */
export function generateCSV(records: LoginRecord[]): string {
  const excelData = convertToExcelFormat(records)
  const headers = Object.keys(excelData[0] || {})

  // CSV header
  let csv = headers.map((h) => `"${h}"`).join(',') + '\n'

  // CSV rows
  csv += excelData
    .map((row) => {
      return headers
        .map((header) => {
          const value = row[header as keyof ExcelLoginData]
          const stringValue = String(value || '')
          // Escape quotes and wrap in quotes
          return `"${stringValue.replace(/"/g, '""')}"`
        })
        .join(',')
    })
    .join('\n')

  return csv
}

/**
 * Generate Excel file using a simple library approach
 * For production, use a library like `exceljs` or `xlsx`
 */
export function downloadExcelFile(records: LoginRecord[], filename: string = 'login_records.csv'): void {
  try {
    const csv = generateCSV(records)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Error downloading Excel file:', error)
  }
}

/**
 * Generate HTML table from login records for preview
 */
export function generateHTMLTable(records: LoginRecord[]): string {
  const excelData = convertToExcelFormat(records)
  const headers = Object.keys(excelData[0] || {})

  let html = '<table border="1" cellpadding="10" cellspacing="0">'

  // Header row
  html += '<thead><tr>'
  headers.forEach((header) => {
    html += `<th>${header}</th>`
  })
  html += '</tr></thead>'

  // Data rows
  html += '<tbody>'
  excelData.forEach((row) => {
    html += '<tr>'
    headers.forEach((header) => {
      const value = row[header as keyof ExcelLoginData] || ''
      html += `<td>${value}</td>`
    })
    html += '</tr>'
  })
  html += '</tbody>'

  html += '</table>'

  return html
}

/**
 * Store login record in localStorage (for demo/local use)
 */
export function storeLoginRecord(record: LoginRecord): void {
  try {
    const records = getLoginRecords()
    records.push(record)

    // Keep only last 1000 records
    if (records.length > 1000) {
      records.shift()
    }

    localStorage.setItem('zentrack_login_records', JSON.stringify(records))
  } catch (error) {
    console.error('Error storing login record:', error)
  }
}

/**
 * Retrieve all login records from localStorage
 */
export function getLoginRecords(): LoginRecord[] {
  try {
    const records = localStorage.getItem('zentrack_login_records')
    return records ? JSON.parse(records) : []
  } catch (error) {
    console.error('Error retrieving login records:', error)
    return []
  }
}

/**
 * Clear all login records
 */
export function clearLoginRecords(): void {
  try {
    localStorage.removeItem('zentrack_login_records')
  } catch (error) {
    console.error('Error clearing login records:', error)
  }
}

/**
 * Get login statistics
 */
export function getLoginStatistics(records: LoginRecord[]): {
  totalLogins: number
  successfulLogins: number
  failedLogins: number
  byProvider: Record<string, number>
  byRole: Record<string, number>
} {
  return {
    totalLogins: records.length,
    successfulLogins: records.filter((r) => r.status === 'success').length,
    failedLogins: records.filter((r) => r.status === 'failed').length,
    byProvider: records.reduce(
      (acc, r) => {
        acc[r.authMethod] = (acc[r.authMethod] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    ),
    byRole: records.reduce(
      (acc, r) => {
        acc[r.role] = (acc[r.role] || 0) + 1
        return acc
      },
      {} as Record<string, number>
    ),
  }
}

/**
 * Filter login records by date range
 */
export function filterByDateRange(records: LoginRecord[], startDate: Date, endDate: Date): LoginRecord[] {
  return records.filter((record) => {
    const loginDate = new Date(record.loginTime)
    return loginDate >= startDate && loginDate <= endDate
  })
}

/**
 * Filter login records by provider
 */
export function filterByProvider(records: LoginRecord[], provider: string): LoginRecord[] {
  return records.filter((record) => record.authMethod === provider)
}

/**
 * Search login records by email or name
 */
export function searchRecords(records: LoginRecord[], query: string): LoginRecord[] {
  const lowercaseQuery = query.toLowerCase()
  return records.filter(
    (record) =>
      record.email.toLowerCase().includes(lowercaseQuery) ||
      record.fullName.toLowerCase().includes(lowercaseQuery) ||
      record.userId.toLowerCase().includes(lowercaseQuery)
  )
}

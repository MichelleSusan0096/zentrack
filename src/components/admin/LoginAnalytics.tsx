/**
 * Admin dashboard for viewing login analytics and exporting data
 */

import { useState, useEffect } from 'react'
import type { LoginRecord } from '@/types/oauth'
import {
  getLoginRecords,
  downloadExcelFile,
  getLoginStatistics,
  filterByDateRange,
  searchRecords,
  clearLoginRecords,
} from '@/utils/excelService'

export function LoginAnalytics() {
  const [records, setRecords] = useState<LoginRecord[]>([])
  const [filteredRecords, setFilteredRecords] = useState<LoginRecord[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterProvider, setFilterProvider] = useState('all')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [showStats, setShowStats] = useState(true)

  useEffect(() => {
    // Load records from localStorage
    const loadedRecords = getLoginRecords()
    setRecords(loadedRecords)
    applyFilters(loadedRecords)
  }, [])

  const applyFilters = (recordsToFilter: LoginRecord[]) => {
    let filtered = recordsToFilter

    // Search filter
    if (searchQuery) {
      filtered = searchRecords(filtered, searchQuery)
    }

    // Provider filter
    if (filterProvider !== 'all') {
      filtered = filtered.filter((r) => r.authMethod === filterProvider)
    }

    // Date range filter
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)
      filtered = filterByDateRange(filtered, start, end)
    }

    // Sort by login time (newest first)
    filtered.sort((a, b) => new Date(b.loginTime).getTime() - new Date(a.loginTime).getTime())

    setFilteredRecords(filtered)
  }

  useEffect(() => {
    applyFilters(records)
  }, [searchQuery, filterProvider, startDate, endDate, records])

  const stats = getLoginStatistics(records)

  const handleExportToExcel = () => {
    downloadExcelFile(filteredRecords, `zentrack_login_records_${new Date().toISOString().split('T')[0]}.csv`)
  }

  const handleClearRecords = () => {
    if (window.confirm('Are you sure you want to clear all login records? This cannot be undone.')) {
      clearLoginRecords()
      setRecords([])
      setFilteredRecords([])
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Login Analytics</h1>
          <p className="text-sm text-indigo-300 mt-1">Monitor user authentication and access patterns</p>
        </div>
        <button
          onClick={handleExportToExcel}
          disabled={filteredRecords.length === 0}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-2"
        >
          <i className="fa-solid fa-file-excel"></i>
          Export to Excel
        </button>
      </div>

      {/* Statistics Cards */}
      {showStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-card p-5 rounded-2xl border border-indigo-900/60">
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Total Logins</span>
            <div className="text-3xl font-extrabold text-yellow-400 mt-2">{stats.totalLogins}</div>
            <p className="text-xs text-slate-400 mt-1">All authentication attempts</p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-indigo-900/60">
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Success Rate</span>
            <div className="text-3xl font-extrabold text-emerald-400 mt-2">
              {stats.totalLogins > 0 ? Math.round((stats.successfulLogins / stats.totalLogins) * 100) : 0}%
            </div>
            <p className="text-xs text-slate-400 mt-1">{stats.successfulLogins} successful</p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-indigo-900/60">
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Failed Logins</span>
            <div className="text-3xl font-extrabold text-red-400 mt-2">{stats.failedLogins}</div>
            <p className="text-xs text-slate-400 mt-1">Authentication failures</p>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-indigo-900/60">
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">Auth Methods</span>
            <div className="text-2xl font-extrabold text-fuchsia-400 mt-2">{Object.keys(stats.byProvider).length}</div>
            <p className="text-xs text-slate-400 mt-1">Different methods used</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="glass-card p-5 rounded-2xl border border-indigo-900/60 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Filters</h3>
          <button
            onClick={() => setShowStats(!showStats)}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
          >
            {showStats ? 'Hide' : 'Show'} Stats
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search */}
          <div>
            <label className="block text-xs font-semibold text-indigo-300 mb-1 uppercase">Search</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Email, name, or ID"
              className="w-full bg-indigo-950/40 border border-indigo-800/50 text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-fuchsia-500"
            />
          </div>

          {/* Provider Filter */}
          <div>
            <label className="block text-xs font-semibold text-indigo-300 mb-1 uppercase">Auth Method</label>
            <select
              value={filterProvider}
              onChange={(e) => setFilterProvider(e.target.value)}
              className="w-full bg-indigo-950/40 border border-indigo-800/50 text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-fuchsia-500"
            >
              <option value="all">All Methods</option>
              <option value="email">Email/Password</option>
              <option value="google">Google</option>
              <option value="github">GitHub</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-xs font-semibold text-indigo-300 mb-1 uppercase">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-indigo-950/40 border border-indigo-800/50 text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-fuchsia-500"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-xs font-semibold text-indigo-300 mb-1 uppercase">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-indigo-950/40 border border-indigo-800/50 text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-fuchsia-500"
            />
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => {
              setSearchQuery('')
              setFilterProvider('all')
              setStartDate('')
              setEndDate('')
            }}
            className="px-3 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900 text-indigo-300 text-xs font-semibold transition-all"
          >
            Reset Filters
          </button>
          <button
            onClick={handleClearRecords}
            className="px-3 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 text-xs font-semibold transition-all ml-auto"
          >
            Clear All Records
          </button>
        </div>
      </div>

      {/* Results Info */}
      <div className="text-xs text-indigo-300">
        Showing {filteredRecords.length} of {records.length} login records
      </div>

      {/* Login Records Table */}
      <div className="glass-card p-5 rounded-2xl border border-indigo-900/60 overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="text-[11px] uppercase bg-indigo-950/70 text-indigo-300 font-bold border-b border-indigo-900">
            <tr>
              <th className="py-3 px-3">Email</th>
              <th className="py-3 px-3">Full Name</th>
              <th className="py-3 px-3">Auth Method</th>
              <th className="py-3 px-3">Role</th>
              <th className="py-3 px-3">Login Time</th>
              <th className="py-3 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-950/60">
            {filteredRecords.length > 0 ? (
              filteredRecords.slice(0, 50).map((record) => (
                <tr key={record.id} className="hover:bg-indigo-950/40 transition-colors">
                  <td className="py-3 px-3 font-semibold text-white">{record.email}</td>
                  <td className="py-3 px-3">{record.fullName}</td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1">
                      {record.authMethod === 'email' && (
                        <>
                          <i className="fa-solid fa-envelope text-yellow-400"></i>
                          Email
                        </>
                      )}
                      {record.authMethod === 'google' && (
                        <>
                          <i className="fa-brands fa-google text-red-400"></i>
                          Google
                        </>
                      )}
                      {record.authMethod === 'github' && (
                        <>
                          <i className="fa-brands fa-github text-slate-300"></i>
                          GitHub
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-3 px-3 capitalize">{record.role}</td>
                  <td className="py-3 px-3 text-indigo-300">{new Date(record.loginTime).toLocaleString()}</td>
                  <td className="py-3 px-3">
                    {record.status === 'success' ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400">
                        <i className="fa-solid fa-check-circle"></i>
                        Success
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-400">
                        <i className="fa-solid fa-times-circle"></i>
                        Failed
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 px-3 text-center text-indigo-300">
                  No login records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Auth Methods Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-indigo-900/60">
          <h3 className="text-sm font-bold text-white mb-4">Logins by Auth Method</h3>
          <div className="space-y-2">
            {Object.entries(stats.byProvider).map(([method, count]) => (
              <div key={method} className="flex justify-between items-center">
                <span className="text-xs text-indigo-300 capitalize">{method === 'email' ? 'Email/Password' : method.toUpperCase()}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-indigo-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-fuchsia-500"
                      style={{ width: `${(count / stats.totalLogins) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-white w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-indigo-900/60">
          <h3 className="text-sm font-bold text-white mb-4">Logins by Role</h3>
          <div className="space-y-2">
            {Object.entries(stats.byRole).map(([role, count]) => (
              <div key={role} className="flex justify-between items-center">
                <span className="text-xs text-indigo-300 capitalize">{role}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-indigo-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500"
                      style={{ width: `${(count / stats.totalLogins) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-white w-8 text-right">{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Modal for trainee to submit status updates
 */

interface UpdateStatusModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { status: string; company: string; salary: string }) => void
}

export function UpdateStatusModal({ isOpen, onClose, onSubmit }: UpdateStatusModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    onSubmit({
      status: formData.get('status') as string,
      company: formData.get('company') as string,
      salary: formData.get('salary') as string,
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-lg w-full border border-yellow-500/40 space-y-6">
        <div className="flex justify-between items-center border-b border-indigo-900 pb-4">
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <i className="fa-solid fa-pen-to-square text-yellow-400"></i> Trainee Status Signal Update
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-lg">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-indigo-300 font-semibold mb-1">Employment Status</label>
            <select
              name="status"
              defaultValue="Wage Employed"
              className="w-full bg-indigo-950 border border-indigo-800 text-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-fuchsia-500"
            >
              <option>Wage Employed</option>
              <option>Self-Employed / Entrepreneur</option>
              <option>Apprenticeship</option>
              <option>Seeking Opportunities</option>
            </select>
          </div>
          <div>
            <label className="block text-indigo-300 font-semibold mb-1">Employer / Company Name</label>
            <input
              type="text"
              name="company"
              defaultValue="ABC Technologies"
              className="w-full bg-indigo-950 border border-indigo-800 text-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-fuchsia-500"
            />
          </div>
          <div>
            <label className="block text-indigo-300 font-semibold mb-1">Monthly Remuneration (₹)</label>
            <input
              type="number"
              name="salary"
              defaultValue="32000"
              className="w-full bg-indigo-950 border border-indigo-800 text-slate-200 rounded-xl p-2.5 focus:outline-none focus:border-fuchsia-500"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-indigo-900">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-300 hover:bg-indigo-950 text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold text-xs shadow-lg magenta-glow hover:opacity-90"
            >
              Submit Verified Signal
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

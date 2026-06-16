import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { applyLeave } from '../../services/api'
import { getError } from '../../utils/helpers'
import { useAuth } from '../../context/AuthContext'

const today = new Date().toISOString().split('T')[0]

export default function ApplyLeave() {
  const { user } = useAuth()
  const nav = useNavigate()
  const [form, setForm] = useState({ leaveType:'CASUAL', startDate:'', endDate:'', reason:'' })
  const [loading, setLoading] = useState(false)
  const ch = e => setForm({...form, [e.target.name]: e.target.value})

  const days = form.startDate && form.endDate
    ? Math.max(0, Math.ceil((new Date(form.endDate)-new Date(form.startDate))/(1000*60*60*24))+1)
    : 0

  const handle = async e => {
    e.preventDefault()
    if (!form.reason.trim()) { toast.error('Please provide a reason'); return }
    if (days < 1) { toast.error('Invalid date range'); return }
    if (days > (user?.leaveBalance||0)) { toast.error('Insufficient leave balance'); return }
    setLoading(true)
    try {
      await applyLeave(form)
      toast.success('Leave applied successfully!')
      nav('/my-leaves')
    } catch(err) { toast.error(getError(err)) }
    finally { setLoading(false) }
  }

  return (
    <div>
      <div className="page-title">📝 Apply for Leave</div>
      <div className="row">
        <div className="col-md-7">
          <div className="card p-4">
            <form onSubmit={handle}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Leave Type *</label>
                <select name="leaveType" className="form-select" value={form.leaveType} onChange={ch}>
                  {['CASUAL','SICK','ANNUAL','MATERNITY','UNPAID'].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <label className="form-label fw-semibold">Start Date *</label>
                  <input type="date" name="startDate" className="form-control" min={today}
                    value={form.startDate} onChange={ch} required />
                </div>
                <div className="col-6">
                  <label className="form-label fw-semibold">End Date *</label>
                  <input type="date" name="endDate" className="form-control" min={form.startDate||today}
                    value={form.endDate} onChange={ch} required />
                </div>
              </div>
              {days > 0 && (
                <div className="alert alert-info py-2 small">
                  📅 <strong>{days} day(s)</strong> — Balance after: <strong>{(user?.leaveBalance||0)-days} days</strong>
                </div>
              )}
              <div className="mb-3">
                <label className="form-label fw-semibold">Reason *</label>
                <textarea name="reason" className="form-control" rows={4} placeholder="Describe your reason..."
                  value={form.reason} onChange={ch} required />
              </div>
              <button className="btn btn-primary w-100 py-2 fw-semibold" disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm me-2"/> : null}
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-5">
          <div className="card p-3">
            <h6 className="fw-bold mb-2">📊 Your Leave Balance</h6>
            <div className="stat-card blue text-center py-3">
              <div className="value">{user?.leaveBalance ?? 0}</div>
              <div className="label">Days Available</div>
            </div>
            <div className="mt-3">
              <p className="small text-muted fw-semibold mb-1">Leave Types:</p>
              {['CASUAL – Personal work','SICK – Medical reasons','ANNUAL – Planned vacation','MATERNITY – Parental leave','UNPAID – No pay deducted'].map(t=>(
                <p key={t} className="small text-muted mb-1">• {t}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

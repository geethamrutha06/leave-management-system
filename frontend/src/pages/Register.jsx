import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register } from '../services/api'
import { getError } from '../utils/helpers'

export default function Register() {
  const [form, setForm] = useState({ name:'', email:'', password:'', department:'', phone:'', position:'' })
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()
  const ch = e => setForm({...form, [e.target.name]: e.target.value})

  const handle = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) { toast.error('Fill required fields'); return }
    if (form.password.length < 6) { toast.error('Password min 6 chars'); return }
    setLoading(true)
    try {
      await register(form)
      toast.success('Registered! Please login.')
      nav('/login')
    } catch (err) { toast.error(getError(err)) }
    finally { setLoading(false) }
  }

  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#1e293b,#334155)',display:'flex',alignItems:'center',justifyContent:'center',padding:'2rem 1rem'}}>
      <div style={{width:'100%',maxWidth:480}}>
        <div className="card p-4 shadow-lg">
          <div className="text-center mb-3">
            <div style={{fontSize:'2rem'}}>👤</div>
            <h5 className="fw-bold">Create Account</h5>
          </div>
          <form onSubmit={handle}>
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label fw-semibold">Full Name *</label>
                <input name="name" className="form-control" placeholder="Ravi Kumar" value={form.name} onChange={ch} required />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold">Email *</label>
                <input name="email" type="email" className="form-control" placeholder="ravi@company.com" value={form.email} onChange={ch} required />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold">Password *</label>
                <input name="password" type="password" className="form-control" placeholder="Min 6 characters" value={form.password} onChange={ch} required />
              </div>
              <div className="col-6">
                <label className="form-label fw-semibold">Department</label>
                <input name="department" className="form-control" placeholder="Engineering" value={form.department} onChange={ch} />
              </div>
              <div className="col-6">
                <label className="form-label fw-semibold">Position</label>
                <input name="position" className="form-control" placeholder="Developer" value={form.position} onChange={ch} />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold">Phone</label>
                <input name="phone" className="form-control" placeholder="9876543210" value={form.phone} onChange={ch} />
              </div>
              <div className="col-12">
                <button className="btn btn-primary w-100 py-2 fw-semibold" disabled={loading}>
                  {loading ? <span className="spinner-border spinner-border-sm me-2"/> : null}
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </div>
            </div>
          </form>
          <p className="text-center mt-3 text-muted small">
            Already registered? <Link to="/login" className="text-primary">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { getError } from '../utils/helpers'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login: doLogin } = useAuth()
  const nav = useNavigate()

  const handle = async e => {
    e.preventDefault()
    if (!form.email || !form.password) { toast.error('Fill all fields'); return }
    setLoading(true)
    try {
      const res = await login(form)
      const { token, ...user } = res.data
      doLogin(user, token)
      toast.success(`Welcome, ${user.name}!`)
      nav(user.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard')
    } catch (err) { toast.error(getError(err)) }
    finally { setLoading(false) }
  }

  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#1e293b,#334155)',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{width:'100%',maxWidth:400,padding:'0 1rem'}}>
        <div className="card p-4 shadow-lg">
          <div className="text-center mb-4">
            <div style={{fontSize:'2.5rem'}}>🏢</div>
            <h4 className="fw-bold text-dark">Leave Management</h4>
            <p className="text-muted small">Sign in to your account</p>
          </div>
          <form onSubmit={handle}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input type="email" className="form-control" placeholder="you@company.com"
                value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input type="password" className="form-control" placeholder="••••••••"
                value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required />
            </div>
            <button className="btn btn-primary w-100 py-2 fw-semibold" disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm me-2"/> : null}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p className="text-center mt-3 text-muted small">
            New employee? <Link to="/register" className="text-primary">Register here</Link>
          </p>
          <div className="mt-3 p-2 rounded" style={{background:'#f8fafc',fontSize:'.75rem'}}>
            <strong>Demo:</strong> admin@company.com / admin123 &nbsp;|&nbsp; ravi@company.com / emp123
          </div>
        </div>
      </div>
    </div>
  )
}

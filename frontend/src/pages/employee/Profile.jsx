import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { getProfile, updateProfile } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import { getError } from '../../utils/helpers'
import Spinner from '../../components/common/Spinner'

export default function Profile() {
  const { login, token } = useAuth()
  const [data, setData]     = useState(null)
  const [edit, setEdit]     = useState(false)
  const [form, setForm]     = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving]   = useState(false)

  useEffect(() => {
    getProfile().then(r => { setData(r.data); setForm(r.data) }).finally(()=>setLoading(false))
  }, [])

  const save = async e => {
    e.preventDefault(); setSaving(true)
    try {
      const r = await updateProfile({ name:form.name, phone:form.phone, department:form.department, position:form.position })
      setData(r.data); login(r.data, token); setEdit(false)
      toast.success('Profile updated!')
    } catch(err) { toast.error(getError(err)) }
    finally { setSaving(false) }
  }

  if (loading) return <Spinner />

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="page-title">👤 My Profile</div>
        <button className="btn btn-primary btn-sm" onClick={()=>setEdit(!edit)}>
          {edit ? 'Cancel' : '✏️ Edit'}
        </button>
      </div>
      <div className="card p-4">
        {edit ? (
          <form onSubmit={save}>
            <div className="row g-3">
              {[['name','Full Name','text'],['phone','Phone','tel'],['department','Department','text'],['position','Position','text']].map(([k,l,t])=>(
                <div className="col-md-6" key={k}>
                  <label className="form-label fw-semibold">{l}</label>
                  <input type={t} className="form-control" value={form[k]||''} onChange={e=>setForm({...form,[k]:e.target.value})} />
                </div>
              ))}
              <div className="col-12">
                <button className="btn btn-primary" disabled={saving}>
                  {saving ? <span className="spinner-border spinner-border-sm me-2"/> : null}
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3 p-3 rounded" style={{background:'#f8fafc'}}>
                <div style={{fontSize:'3rem',textAlign:'center'}}>👤</div>
                <h5 className="text-center fw-bold mt-2">{data?.name}</h5>
                <p className="text-center text-muted small">{data?.position} — {data?.department}</p>
              </div>
            </div>
            <div className="col-md-6">
              {[['📧 Email',data?.email],['📱 Phone',data?.phone||'-'],['🏢 Department',data?.department],
                ['💼 Position',data?.position],['🎯 Role',data?.role],['📅 Leave Balance',data?.leaveBalance+' days']].map(([k,v])=>(
                <div key={k} className="d-flex justify-content-between py-2 border-bottom">
                  <span className="text-muted small">{k}</span>
                  <span className="fw-semibold small">{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

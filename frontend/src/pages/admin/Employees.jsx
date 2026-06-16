import { useState, useEffect } from 'react'
import { getAllEmployees, searchEmployees } from '../../services/api'
import { fmtDate } from '../../utils/helpers'
import Spinner from '../../components/common/Spinner'

export default function Employees() {
  const [emps, setEmps]     = useState([])
  const [query, setQuery]   = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(()=>{ load() },[])

  const load = () => getAllEmployees().then(r=>setEmps(r.data)).finally(()=>setLoading(false))

  const search = async () => {
    if (!query.trim()) { load(); return }
    setLoading(true)
    searchEmployees(query).then(r=>setEmps(r.data)).finally(()=>setLoading(false))
  }

  if (loading) return <Spinner />

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="page-title mb-0">👥 All Employees</div>
        <span className="badge bg-primary">{emps.length} employees</span>
      </div>
      <div className="card p-3 mb-3">
        <div className="input-group">
          <input className="form-control" placeholder="Search by name, email or department..."
            value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&search()} />
          <button className="btn btn-primary" onClick={search}>🔍 Search</button>
          {query && <button className="btn btn-outline-secondary" onClick={()=>{setQuery('');load()}}>✕</button>}
        </div>
      </div>
      <div className="card">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead style={{background:'#f1f5f9'}}>
              <tr>{['#','Name','Email','Department','Position','Balance','Joined'].map(h=>(
                <th key={h} className="small text-muted fw-semibold py-3 px-3">{h}</th>))}
              </tr>
            </thead>
            <tbody>
              {emps.map((e,i)=>(
                <tr key={e.id}>
                  <td className="px-3 py-3 text-muted small">{i+1}</td>
                  <td className="px-3 fw-semibold">{e.name}</td>
                  <td className="px-3 small">{e.email}</td>
                  <td className="px-3"><span className="badge bg-light text-dark">{e.department}</span></td>
                  <td className="px-3 small">{e.position}</td>
                  <td className="px-3"><span className="badge bg-success">{e.leaveBalance}d</span></td>
                  <td className="px-3 small text-muted">{fmtDate(e.createdAt)}</td>
                </tr>
              ))}
              {emps.length===0&&<tr><td colSpan={7} className="text-center text-muted py-4">No employees found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

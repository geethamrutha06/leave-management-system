import { useState, useEffect } from 'react'
import { getMyLeaves } from '../../services/api'
import { fmtDate } from '../../utils/helpers'
import Spinner from '../../components/common/Spinner'

export default function MyLeaves() {
  const [leaves, setLeaves] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')

  useEffect(()=>{ getMyLeaves().then(r=>setLeaves(r.data)).finally(()=>setLoading(false)) },[])

  const shown = filter === 'ALL' ? leaves : leaves.filter(l=>l.status===filter)

  const badge = s => {
    if (s==='APPROVED') return <span className="badge-approved">✅ Approved</span>
    if (s==='REJECTED') return <span className="badge-rejected">❌ Rejected</span>
    return <span className="badge-pending">⏳ Pending</span>
  }

  if (loading) return <Spinner />

  return (
    <div>
      <div className="page-title">📋 My Leave History</div>
      <div className="card p-3 mb-3">
        <div className="d-flex gap-2 flex-wrap">
          {['ALL','PENDING','APPROVED','REJECTED'].map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              className={`btn btn-sm ${filter===f?'btn-primary':'btn-outline-secondary'}`}>{f}</button>
          ))}
          <span className="ms-auto text-muted small align-self-center">{shown.length} record(s)</span>
        </div>
      </div>
      {shown.length === 0 ? (
        <div className="card p-5 text-center text-muted">No leave requests found.</div>
      ) : (
        <div className="card">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead style={{background:'#f1f5f9'}}>
                <tr>{['Type','From','To','Days','Reason','Status','Applied','Admin Comment'].map(h=>(
                  <th key={h} className="small text-muted fw-semibold py-3 px-3">{h}</th>))}
                </tr>
              </thead>
              <tbody>
                {shown.map(l=>(
                  <tr key={l.id}>
                    <td className="px-3 py-3"><span className="badge bg-light text-dark">{l.leaveType}</span></td>
                    <td className="px-3">{fmtDate(l.startDate)}</td>
                    <td className="px-3">{fmtDate(l.endDate)}</td>
                    <td className="px-3 fw-semibold">{l.numberOfDays}</td>
                    <td className="px-3" style={{maxWidth:150}}><span title={l.reason} style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',display:'block',maxWidth:150}}>{l.reason}</span></td>
                    <td className="px-3">{badge(l.status)}</td>
                    <td className="px-3 small text-muted">{fmtDate(l.appliedDate)}</td>
                    <td className="px-3 small text-muted">{l.adminComment||'-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

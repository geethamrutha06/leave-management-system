import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { getAllLeaves, reviewLeave } from '../../services/api'
import { fmtDate, getError } from '../../utils/helpers'
import Spinner from '../../components/common/Spinner'

export default function AllLeaves() {
  const [leaves, setLeaves] = useState([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(true)
  const [modal, setModal]   = useState(null)
  const [comment, setComment] = useState('')
  const [saving, setSaving]   = useState(false)

  useEffect(()=>{ load(filter) },[filter])

  const load = f => { setLoading(true); getAllLeaves(f).then(r=>setLeaves(r.data)).finally(()=>setLoading(false)) }

  const doReview = async action => {
    setSaving(true)
    try {
      await reviewLeave(modal.id, { status: action, adminComment: comment })
      toast.success(`Leave ${action.toLowerCase()}d!`)
      setModal(null); setComment(''); load(filter)
    } catch(err) { toast.error(getError(err)) }
    finally { setSaving(false) }
  }

  const badge = s => {
    if (s==='APPROVED') return <span className="badge-approved">✅ Approved</span>
    if (s==='REJECTED') return <span className="badge-rejected">❌ Rejected</span>
    return <span className="badge-pending">⏳ Pending</span>
  }

  if (loading) return <Spinner />

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="page-title mb-0">📋 All Leave Requests</div>
        <span className="badge bg-primary">{leaves.length} records</span>
      </div>
      <div className="card p-3 mb-3">
        <div className="d-flex gap-2 flex-wrap">
          {[['','All'],['PENDING','Pending'],['APPROVED','Approved'],['REJECTED','Rejected']].map(([v,l])=>(
            <button key={v} onClick={()=>setFilter(v)}
              className={`btn btn-sm ${filter===v?'btn-primary':'btn-outline-secondary'}`}>{l}</button>
          ))}
        </div>
      </div>
      <div className="card">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead style={{background:'#f1f5f9'}}>
              <tr>{['Employee','Dept','Type','From','To','Days','Reason','Status','Applied','Action'].map(h=>(
                <th key={h} className="small text-muted fw-semibold py-3 px-2">{h}</th>))}
              </tr>
            </thead>
            <tbody>
              {leaves.map(l=>(
                <tr key={l.id}>
                  <td className="px-2 py-3 fw-semibold small">{l.userName}</td>
                  <td className="px-2 small">{l.department}</td>
                  <td className="px-2"><span className="badge bg-light text-dark small">{l.leaveType}</span></td>
                  <td className="px-2 small">{fmtDate(l.startDate)}</td>
                  <td className="px-2 small">{fmtDate(l.endDate)}</td>
                  <td className="px-2 fw-bold">{l.numberOfDays}</td>
                  <td className="px-2 small" style={{maxWidth:100}}><span title={l.reason} style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',display:'block',maxWidth:100}}>{l.reason}</span></td>
                  <td className="px-2">{badge(l.status)}</td>
                  <td className="px-2 small text-muted">{fmtDate(l.appliedDate)}</td>
                  <td className="px-2">
                    {l.status==='PENDING' ? (
                      <button className="btn btn-sm btn-outline-primary" onClick={()=>{setModal(l);setComment('')}}>Review</button>
                    ) : <span className="text-muted small">Done</span>}
                  </td>
                </tr>
              ))}
              {leaves.length===0&&<tr><td colSpan={10} className="text-center text-muted py-4">No records</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="modal d-block" style={{background:'rgba(0,0,0,.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Review Leave — {modal.userName}</h5>
                <button className="btn-close" onClick={()=>setModal(null)}/>
              </div>
              <div className="modal-body">
                <table className="table table-sm table-borderless mb-3">
                  <tbody>
                    {[['Type',modal.leaveType],['Period',`${fmtDate(modal.startDate)} → ${fmtDate(modal.endDate)}`],
                      ['Days',modal.numberOfDays],['Reason',modal.reason]].map(([k,v])=>(
                      <tr key={k}><td className="text-muted">{k}</td><td className="fw-semibold">{v}</td></tr>
                    ))}
                  </tbody>
                </table>
                <label className="form-label fw-semibold">Comment (optional)</label>
                <textarea className="form-control" rows={3} placeholder="Add a comment..."
                  value={comment} onChange={e=>setComment(e.target.value)} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-outline-secondary" onClick={()=>setModal(null)}>Cancel</button>
                <button className="btn btn-danger" disabled={saving} onClick={()=>doReview('REJECTED')}>
                  {saving?<span className="spinner-border spinner-border-sm me-1"/>:null} Reject
                </button>
                <button className="btn btn-success" disabled={saving} onClick={()=>doReview('APPROVED')}>
                  {saving?<span className="spinner-border spinner-border-sm me-1"/>:null} Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

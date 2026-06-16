export const fmtDate = d => d ? new Date(d).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) : '-'
export const statusBadge = s => {
  if (s==='APPROVED') return <span className="badge-approved">Approved</span>
  if (s==='REJECTED') return <span className="badge-rejected">Rejected</span>
  return <span className="badge-pending">Pending</span>
}
export const getError = err => err?.response?.data?.message || 'Something went wrong'

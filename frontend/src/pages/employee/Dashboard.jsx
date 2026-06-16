import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

export default function EmployeeDashboard() {
  const { user } = useAuth()
  const cards = [
    { label:'Leave Balance', value: user?.leaveBalance ?? 0, color:'blue',  icon:'📅', link:'/my-leaves'   },
    { label:'Apply Leave',   value: '+',                     color:'green', icon:'📝', link:'/apply-leave' },
    { label:'My Profile',    value: '→',                     color:'purple',icon:'👤', link:'/profile'     },
  ]
  return (
    <div>
      <div className="page-title">👋 Welcome, {user?.name}</div>
      <div className="row g-3 mb-4">
        {cards.map(c => (
          <div key={c.label} className="col-md-4">
            <Link to={c.link} style={{textDecoration:'none'}}>
              <div className={`stat-card ${c.color}`}>
                <div style={{fontSize:'1.8rem'}}>{c.icon}</div>
                <div className="value mt-1">{c.value}</div>
                <div className="label">{c.label}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="card p-4">
        <h6 className="fw-bold mb-3">My Details</h6>
        <table className="table table-sm table-borderless">
          <tbody>
            {[['Name',user?.name],['Email',user?.email],['Department',user?.department],
              ['Position',user?.position],['Role',user?.role],['Leave Balance',user?.leaveBalance+' days']].map(([k,v])=>(
              <tr key={k}><td className="text-muted" style={{width:140}}>{k}</td><td className="fw-semibold">{v}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const empLinks = [
  { to: '/dashboard',       icon: '📊', label: 'Dashboard'    },
  { to: '/profile',         icon: '👤', label: 'My Profile'   },
  { to: '/apply-leave',     icon: '📝', label: 'Apply Leave'  },
  { to: '/my-leaves',       icon: '📋', label: 'My Leaves'    },
]
const adminLinks = [
  { to: '/admin/dashboard', icon: '📊', label: 'Dashboard'    },
  { to: '/admin/employees', icon: '👥', label: 'Employees'    },
  { to: '/admin/leaves',    icon: '📋', label: 'All Leaves'   },
]

export default function Sidebar() {
  const { user, logout, isAdmin } = useAuth()
  const nav = useNavigate()
  const links = isAdmin ? adminLinks : empLinks

  const doLogout = () => { logout(); nav('/login') }

  return (
    <div className="sidebar d-flex flex-column">
      <div className="brand">🏢 LeaveMS</div>
      <div className="p-2 mt-1" style={{fontSize:'.8rem',color:'#64748b',padding:'0 1.25rem'}}>
        <div style={{color:'#cbd5e1',fontWeight:600}}>{user?.name}</div>
        <div style={{fontSize:'.75rem'}}>{user?.role}</div>
      </div>
      <nav className="flex-grow-1 mt-2">
        {links.map(l => (
          <NavLink key={l.to} to={l.to} className={({isActive})=>`nav-link${isActive?' active':''}`}>
            <span>{l.icon}</span>{l.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-top" style={{borderColor:'#334155!important'}}>
        <button onClick={doLogout} className="btn btn-sm w-100"
          style={{background:'#ef4444',color:'#fff',border:'none'}}>
          🚪 Logout
        </button>
      </div>
    </div>
  )
}

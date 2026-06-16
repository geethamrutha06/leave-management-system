import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/common/ProtectedRoute'

// Public Pages
import Login    from './pages/Login'
import Register from './pages/Register'

// Employee Pages
import EmployeeDashboard from './pages/employee/Dashboard'
import Profile           from './pages/employee/Profile'
import ApplyLeave        from './pages/employee/ApplyLeave'
import MyLeaves          from './pages/employee/MyLeaves'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import Employees      from './pages/admin/Employees'
import AllLeaves      from './pages/admin/AllLeaves'

function AppRoutes() {
  const { user } = useAuth()
  return (
    <Routes>
      {/* Public */}
      <Route path="/login"    element={!user ? <Login />    : <Navigate to={user.role==='ADMIN'?'/admin/dashboard':'/dashboard'} replace />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" replace />} />

      {/* Employee Routes */}
      <Route path="/dashboard"   element={<ProtectedRoute><Layout><EmployeeDashboard /></Layout></ProtectedRoute>} />
      <Route path="/profile"     element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
      <Route path="/apply-leave" element={<ProtectedRoute><Layout><ApplyLeave /></Layout></ProtectedRoute>} />
      <Route path="/my-leaves"   element={<ProtectedRoute><Layout><MyLeaves /></Layout></ProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly><Layout><AdminDashboard /></Layout></ProtectedRoute>} />
      <Route path="/admin/employees" element={<ProtectedRoute adminOnly><Layout><Employees /></Layout></ProtectedRoute>} />
      <Route path="/admin/leaves"    element={<ProtectedRoute adminOnly><Layout><AllLeaves /></Layout></ProtectedRoute>} />

      {/* Default */}
      <Route path="/" element={<Navigate to={user ? (user.role==='ADMIN'?'/admin/dashboard':'/dashboard') : '/login'} replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

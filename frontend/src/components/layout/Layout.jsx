import Sidebar from './Sidebar'
import { ToastContainer } from 'react-toastify'

export default function Layout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="main-content flex-grow-1">
        {children}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

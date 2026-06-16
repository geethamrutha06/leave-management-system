import axios from 'axios'

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

const api = axios.create({ baseURL: BASE, headers: { 'Content-Type': 'application/json' } })

api.interceptors.request.use(cfg => {
  const t = localStorage.getItem('lms_token')
  if (t) cfg.headers.Authorization = `Bearer ${t}`
  return cfg
})

api.interceptors.response.use(r => r, err => {
  if (err.response?.status === 401) {
    localStorage.removeItem('lms_token')
    localStorage.removeItem('lms_user')
    window.location.href = '/login'
  }
  return Promise.reject(err)
})

// Auth
export const register  = d => api.post('/auth/register', d)
export const login     = d => api.post('/auth/login',    d)

// Employee
export const getProfile    = ()  => api.get('/employee/profile')
export const updateProfile = d   => api.put('/employee/profile', d)
export const applyLeave    = d   => api.post('/employee/leaves/apply', d)
export const getMyLeaves   = ()  => api.get('/employee/leaves')

// Admin
export const getDashboard     = ()       => api.get('/admin/dashboard')
export const getAllEmployees   = ()       => api.get('/admin/employees')
export const searchEmployees  = q        => api.get(`/admin/employees/search?q=${q}`)
export const getAllLeaves      = (f='')  => api.get(`/admin/leaves?status=${f}`)
export const reviewLeave      = (id, d) => api.put(`/admin/leaves/${id}/review`, d)

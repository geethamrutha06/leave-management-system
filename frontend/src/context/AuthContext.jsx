import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const s = localStorage.getItem('lms_user')
    return s ? JSON.parse(s) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('lms_token') || null)

  const login = (userData, tok) => {
    setUser(userData); setToken(tok)
    localStorage.setItem('lms_user',  JSON.stringify(userData))
    localStorage.setItem('lms_token', tok)
  }

  const logout = () => {
    setUser(null); setToken(null)
    localStorage.removeItem('lms_user')
    localStorage.removeItem('lms_token')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAdmin: user?.role === 'ADMIN' }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

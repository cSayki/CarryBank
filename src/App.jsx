import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Budget from './pages/Budget'
import Quests from './pages/Quests'
import Profile from './pages/Profile'
import Transactions from './pages/Transactions'
import Savings from './pages/Savings'
import Layout from './components/Layout'
import { GlobalProvider } from './context/GlobalState'
import './index.css'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Layout user={user} onLogout={handleLogout}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/budget" element={<Budget user={user} />} />
            <Route path="/quests" element={<Quests user={user} />} />
            <Route path="/transactions" element={<Transactions user={user} />} />
            <Route path="/savings" element={<Savings user={user} />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </GlobalProvider>
  )
}

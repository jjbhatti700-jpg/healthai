import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import SymptomChecker from './pages/SymptomChecker'
import HealthLibrary from './pages/HealthLibrary'
import FindDoctors from './pages/FindDoctors'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import MedicineReminder from './pages/MedicineReminder'
import Emergency from './pages/Emergency'
import BMICalculator from './pages/BMICalculator'
import WaterTracker from './pages/WaterTracker'
import { LanguageProvider } from './context/LanguageContext'
import ForgotPassword from './pages/ForgotPassword'
import InstallPWA from './components/InstallPWA'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppContent({ user, login, logout, darkMode, setDarkMode }) {
  return (
    <>
      <ScrollToTop />
      <Navbar user={user} logout={logout} darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="container mx-auto px-4 py-6 page-enter">
        <Routes>
          <Route path="/" element={user ? <Dashboard user={user} /> : <Home />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login login={login} />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register login={login} />} />
          <Route path="/symptom-checker" element={user ? <SymptomChecker /> : <Navigate to="/login" />} />
          <Route path="/health-library" element={user ? <HealthLibrary /> : <Navigate to="/login" />} />
          <Route path="/find-doctors" element={user ? <FindDoctors /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
          <Route path="/settings" element={user ? <Settings user={user} darkMode={darkMode} setDarkMode={setDarkMode} logout={logout} /> : <Navigate to="/login" />} />
          <Route path="/medicine-reminder" element={user ? <MedicineReminder /> : <Navigate to="/login" />} />
          <Route path="/emergency" element={<Emergency />} />
<Route path="/bmi-calculator" element={user ? <BMICalculator /> : <Navigate to="/login" />} />
<Route path="/water-tracker" element={user ? <WaterTracker /> : <Navigate to="/login" />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </main>
    </>
  )
}

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) setUser(JSON.parse(userData))
    setLoading(false)
  }, [])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    document.documentElement.classList.toggle('dark', darkMode)
    document.body.classList.toggle('dark', darkMode)
    document.body.classList.toggle('light', !darkMode)
  }, [darkMode])

  const login = (userData, token) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
      <div className="w-8 h-8 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
    </div>
  )

  return (
    <LanguageProvider>
    <Router>
      <div className="min-h-screen">
        <AppContent user={user} login={login} logout={logout} darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      <InstallPWA />
    </Router>
    </LanguageProvider>
  )
}

export default App
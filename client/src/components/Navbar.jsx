import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar({ user, logout, darkMode, setDarkMode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const getPageTitle = () => {
  const titles = {
    '/symptom-checker': 'Symptom Checker',
    '/health-library': 'Health Library',
    '/find-doctors': 'Find Doctors',
    '/medicine-reminder': 'Medicine Reminder',  // ADD THIS
    '/profile': 'Profile',
    '/settings': 'Settings'
  }
  return titles[location.pathname] || null
}

  const pageTitle = getPageTitle()

  return (
    <nav className={`glass sticky top-0 z-50 transition-all duration-200 ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base gradient-text">HealthAI</span>
              {scrolled && pageTitle && (
                <span className="text-gray-400 dark:text-gray-500 text-sm hidden sm:inline">
                  / {pageTitle}
                </span>
              )}
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
           {user ? (
  <>
    <NavLink to="/" current={location.pathname === '/'}>Home</NavLink>
    <NavLink to="/symptom-checker" current={location.pathname === '/symptom-checker'}>Symptoms</NavLink>
    <NavLink to="/find-doctors" current={location.pathname === '/find-doctors'}>Doctors</NavLink>
    <NavLink to="/medicine-reminder" current={location.pathname === '/medicine-reminder'}>Reminders</NavLink>
    <NavLink to="/health-library" current={location.pathname === '/health-library'}>Library</NavLink>
    <NavLink to="/emergency" current={location.pathname === '/emergency'}>Emergency</NavLink>
<NavLink to="/bmi-calculator" current={location.pathname === '/bmi-calculator'}>BMI</NavLink>
<NavLink to="/water-tracker" current={location.pathname === '/water-tracker'}>Water</NavLink>
    <NavLink to="/settings" current={location.pathname === '/settings'}>Settings</NavLink>
    <button onClick={handleLogout} className="ml-2 btn-danger">Logout</button>
  </>
) : (
              <>
                <NavLink to="/" current={location.pathname === '/'}>Home</NavLink>
                <Link to="/login" className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Login</Link>
                <Link to="/register" className="ml-1 btn-primary">Get Started</Link>
              </>
            )}
            
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            >
              {darkMode ? (
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              {darkMode ? (
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 dark:border-slate-800 space-y-1">
            <MobileLink to="/" onClick={() => setIsMenuOpen(false)}>Home</MobileLink>
            {user ? (
              <>
                <MobileLink to="/symptom-checker" onClick={() => setIsMenuOpen(false)}>Symptom Checker</MobileLink>
                <MobileLink to="/find-doctors" onClick={() => setIsMenuOpen(false)}>Find Doctors</MobileLink>
                <MobileLink to="/medicine-reminder" onClick={() => setIsMenuOpen(false)}>Medicine Reminder</MobileLink>
                <MobileLink to="/health-library" onClick={() => setIsMenuOpen(false)}>Health Library</MobileLink>
                <MobileLink to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</MobileLink>
                <MobileLink to="/emergency" onClick={() => setIsMenuOpen(false)}>Emergency</MobileLink>
<MobileLink to="/bmi-calculator" onClick={() => setIsMenuOpen(false)}>BMI Calculator</MobileLink>
<MobileLink to="/water-tracker" onClick={() => setIsMenuOpen(false)}>Water Tracker</MobileLink>
                <MobileLink to="/settings" onClick={() => setIsMenuOpen(false)}>Settings</MobileLink>
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full text-left py-2 px-3 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg text-sm font-medium">Logout</button>
              </>
            ) : (
              <>
                <MobileLink to="/login" onClick={() => setIsMenuOpen(false)}>Login</MobileLink>
                <MobileLink to="/register" onClick={() => setIsMenuOpen(false)}>Get Started</MobileLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

function NavLink({ to, current, children }) {
  return (
    <Link 
      to={to} 
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        current 
          ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
      }`}
    >
      {children}
    </Link>
  )
}

function MobileLink({ to, onClick, children }) {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className="block py-2 px-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg text-sm font-medium"
    >
      {children}
    </Link>
  )
}

export default Navbar
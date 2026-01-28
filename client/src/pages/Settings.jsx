import { useState } from 'react'
import { authAPI } from '../services/api'
import { useLanguage } from '../context/LanguageContext'

function Settings({ user, darkMode, setDarkMode, logout }) {
  const [activeTab, setActiveTab] = useState('profile')
  const [profileData, setProfileData] = useState({ name: user?.name || '', email: user?.email || '' })
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' })
  const [notifications, setNotifications] = useState({ email: true, push: false, reminders: true })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
const { language, setLanguage, t } = useLanguage()
  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      localStorage.setItem('user', JSON.stringify({ ...user, name: profileData.name }))
      showMessage('success', 'Profile updated successfully')
    } catch (error) {
      showMessage('error', 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    if (passwordData.new !== passwordData.confirm) {
      showMessage('error', 'New passwords do not match')
      return
    }
    if (passwordData.new.length < 6) {
      showMessage('error', 'Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      showMessage('success', 'Password updated successfully')
      setPasswordData({ current: '', new: '', confirm: '' })
    } catch (error) {
      showMessage('error', 'Failed to update password')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.')
    if (!confirmed) return
    
    const doubleConfirm = window.prompt('Type "DELETE" to confirm account deletion:')
    if (doubleConfirm !== 'DELETE') {
      showMessage('error', 'Account deletion cancelled')
      return
    }

    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      logout()
    } catch (error) {
      showMessage('error', 'Failed to delete account')
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
    { id: 'password', name: 'Password', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> },
    { id: 'appearance', name: 'Appearance', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg> },
    { id: 'notifications', name: 'Notifications', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg> },
    { id: 'danger', name: 'Danger Zone', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg> }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your account preferences</p>
      </div>

      {/* Message Toast */}
      {message.text && (
        <div className={`mb-4 p-3 rounded-xl text-sm flex items-center gap-2 ${
          message.type === 'success' 
            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' 
            : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
        }`}>
          {message.type === 'success' ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          {message.text}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="md:w-48 flex-shrink-0">
          <div className="card p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                  activeTab === tab.id
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700'
                } ${tab.id === 'danger' ? 'text-rose-500 dark:text-rose-400' : ''}`}
              >
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="card">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Settings</h2>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="input-field"
                      disabled
                    />
                    <p className="mt-1 text-xs text-gray-400">Email cannot be changed</p>
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary">
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              </div>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Change Password</h2>
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Current Password</label>
                    <input
                      type="password"
                      value={passwordData.current}
                      onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                      className="input-field"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">New Password</label>
                    <input
                      type="password"
                      value={passwordData.new}
                      onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                      className="input-field"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordData.confirm}
                      onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                      className="input-field"
                      placeholder="••••••••"
                    />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary">
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>
            )}

            {/* Appearance Tab */}
            {activeTab === 'appearance' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Use dark theme for better night viewing</p>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${darkMode ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-slate-600'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${darkMode ? 'left-6' : 'left-1'}`}></div>
                    </button>
                  </div>

                  <div className="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                    <p className="text-sm font-medium text-gray-900 dark:text-white mb-3">Theme Preview</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div
                        onClick={() => setDarkMode(false)}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${!darkMode ? 'border-indigo-500' : 'border-gray-200 dark:border-slate-600'} bg-white`}
                      >
                        <div className="w-full h-2 bg-gray-200 rounded mb-2"></div>
                        <div className="w-3/4 h-2 bg-gray-100 rounded"></div>
                        <p className="text-xs text-gray-600 mt-2">Light</p>
                      </div>
                      <div
                        onClick={() => setDarkMode(true)}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${darkMode ? 'border-indigo-500' : 'border-gray-200 dark:border-slate-600'} bg-slate-800`}
                      >
                        <div className="w-full h-2 bg-slate-700 rounded mb-2"></div>
                        <div className="w-3/4 h-2 bg-slate-600 rounded"></div>
                        <p className="text-xs text-gray-400 mt-2">Dark</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Preferences</h2>
                <div className="space-y-3">
                  {[
                    { key: 'email', title: 'Email Notifications', desc: 'Receive health tips via email' },
                    { key: 'push', title: 'Push Notifications', desc: 'Get browser push notifications' },
                    { key: 'reminders', title: 'Health Reminders', desc: 'Daily wellness reminders' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })}
                        className={`relative w-11 h-6 rounded-full transition-colors ${notifications[item.key] ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-slate-600'}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${notifications[item.key] ? 'left-6' : 'left-1'}`}></div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Danger Zone Tab */}
            {activeTab === 'danger' && (
              <div>
                <h2 className="text-lg font-semibold text-rose-600 dark:text-rose-400 mb-4">Danger Zone</h2>
                <div className="p-4 border-2 border-rose-200 dark:border-rose-800 rounded-xl bg-rose-50 dark:bg-rose-900/20">
                  <h3 className="text-sm font-semibold text-rose-700 dark:text-rose-300 mb-2">Delete Account</h3>
                  <p className="text-xs text-rose-600 dark:text-rose-400 mb-4">
                    Once you delete your account, all your data will be permanently removed. This action cannot be undone.
                  </p>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={loading}
                    className="px-4 py-2 bg-rose-600 text-white text-sm font-medium rounded-lg hover:bg-rose-700 transition-colors"
                  >
                    {loading ? 'Deleting...' : 'Delete My Account'}
                  </button>
                </div>
              </div>
            )}
            {/* Language Section - Add in Settings.jsx */}
<div className="card p-5 mb-4">
  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Language / زبان</h3>
  <div className="flex gap-3">
    <button
      onClick={() => setLanguage('en')}
      className={`flex-1 py-3 rounded-xl text-sm font-medium transition-colors ${language === 'en' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300'}`}
    >
      English
    </button>
    <button
      onClick={() => setLanguage('ur')}
      className={`flex-1 py-3 rounded-xl text-sm font-medium transition-colors ${language === 'ur' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300'}`}
    >
      اردو
    </button>
  </div>
</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
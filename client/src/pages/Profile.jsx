import { useState, useRef, useEffect } from 'react'

function Profile({ user, updateUser }) {
  const [name, setName] = useState(user?.name || '')
  const [email] = useState(user?.email || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [avatar, setAvatar] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const fileInputRef = useRef(null)

  useEffect(() => {
    // Load saved avatar from localStorage
    const savedAvatar = localStorage.getItem('userAvatar')
    if (savedAvatar) setAvatar(savedAvatar)
    
    const savedPhone = localStorage.getItem('userPhone')
    if (savedPhone) setPhone(savedPhone)
  }, [])

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      showMessage('error', 'Image must be less than 2MB')
      return
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      showMessage('error', 'Please select an image file')
      return
    }

    const reader = new FileReader()
    reader.onload = (event) => {
      const base64 = event.target?.result
      setAvatar(base64)
      localStorage.setItem('userAvatar', base64)
      showMessage('success', 'Profile picture updated!')
    }
    reader.readAsDataURL(file)
  }

  const removeAvatar = () => {
    setAvatar(null)
    localStorage.removeItem('userAvatar')
    showMessage('success', 'Profile picture removed')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Save to localStorage
      const updatedUser = { ...user, name, phone }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      localStorage.setItem('userPhone', phone)
      
      if (updateUser) updateUser(updatedUser)
      
      showMessage('success', 'Profile updated successfully!')
      setLoading(false)
    }, 1000)
  }

  const getInitials = () => {
    if (!user?.name) return '?'
    return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-5">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">Profile</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your account information</p>
      </div>

      {/* Message Toast */}
      {message.text && (
        <div className={`mb-4 p-3 rounded-xl text-sm flex items-center gap-2 ${
          message.type === 'success' 
            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border border-emerald-200' 
            : 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 border border-rose-200'
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

      {/* Profile Picture Section */}
      <div className="card p-6 mb-5">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Profile Picture</h2>
        
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <div 
              onClick={handleAvatarClick}
              className="w-24 h-24 rounded-2xl overflow-hidden cursor-pointer border-4 border-gray-100 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
            >
              {avatar ? (
                <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold">
                  {getInitials()}
                </div>
              )}
            </div>
            
            {/* Edit Badge */}
            <div 
              onClick={handleAvatarClick}
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-indigo-700 transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Upload Instructions */}
          <div className="flex-1">
            <p className="text-sm text-gray-900 dark:text-white font-medium mb-1">Change Profile Picture</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">JPG, PNG or GIF. Max 2MB.</p>
            <div className="flex gap-2">
              <button
                onClick={handleAvatarClick}
                className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rounded-lg text-xs font-medium hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
              >
                Upload Photo
              </button>
              {avatar && (
                <button
                  onClick={removeAvatar}
                  className="px-3 py-1.5 bg-rose-50 dark:bg-rose-900/30 text-rose-600 rounded-lg text-xs font-medium hover:bg-rose-100 dark:hover:bg-rose-900/50"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info Form */}
      <div className="card p-6">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
            <input
              type="email"
              value={email}
              disabled
              className="input-field bg-gray-50 dark:bg-slate-700 cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-gray-400">Email cannot be changed</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-field"
              placeholder="03XX-XXXXXXX"
            />
          </div>

          <div className="pt-2">
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      {/* Account Stats */}
      <div className="card p-6 mt-5">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Account Stats</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-600">{user?.stats?.chats || 0}</p>
            <p className="text-xs text-gray-500">Conversations</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600">{user?.stats?.days || 0}</p>
            <p className="text-xs text-gray-500">Days Active</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-violet-600">{user?.stats?.reminders || 0}</p>
            <p className="text-xs text-gray-500">Reminders</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
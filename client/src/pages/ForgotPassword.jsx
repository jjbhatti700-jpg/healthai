import { useState } from 'react'
import { Link } from 'react-router-dom'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [step, setStep] = useState(1)
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')

  const handleSendCode = async (e) => {
    e.preventDefault()
    if (!email) { setError('Please enter your email'); return }
    setLoading(true)
    setError('')
    setTimeout(() => {
      const mockCode = Math.floor(100000 + Math.random() * 900000).toString()
      setGeneratedCode(mockCode)
      alert(`Demo Mode: Your reset code is ${mockCode}`)
      setStep(2)
      setLoading(false)
    }, 1500)
  }

  const handleVerifyCode = (e) => {
    e.preventDefault()
    if (!code) { setError('Please enter the code'); return }
    if (code !== generatedCode) { setError('Invalid code'); return }
    setError('')
    setStep(3)
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (!password || password.length < 6) { setError('Password must be at least 6 characters'); return }
    if (password !== confirmPassword) { setError('Passwords do not match'); return }
    setLoading(true)
    setError('')
    setTimeout(() => { setStep(4); setLoading(false) }, 1500)
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <span className="font-bold text-xl gradient-text">HealthAI</span>
        </div>

        <div className="card p-6">
          {step === 1 && (
            <>
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Forgot Password?</h2>
                <p className="text-gray-500 text-sm mt-1">Enter your email to reset</p>
              </div>
              <form onSubmit={handleSendCode} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" placeholder="you@example.com" />
                </div>
                {error && <p className="text-sm text-rose-500">{error}</p>}
                <button type="submit" disabled={loading} className="w-full btn-primary py-3">{loading ? 'Sending...' : 'Send Code'}</button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Enter Code</h2>
                <p className="text-gray-500 text-sm mt-1">Code sent to {email}</p>
              </div>
              <form onSubmit={handleVerifyCode} className="space-y-4">
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} className="input-field text-center text-2xl tracking-widest" placeholder="000000" maxLength={6} />
                {error && <p className="text-sm text-rose-500">{error}</p>}
                <button type="submit" className="w-full btn-primary py-3">Verify</button>
                <button type="button" onClick={() => setStep(1)} className="w-full text-sm text-gray-500">← Back</button>
              </form>
            </>
          )}

          {step === 3 && (
            <>
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">New Password</h2>
              </div>
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">New Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Confirm Password</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input-field" placeholder="••••••••" />
                </div>
                {error && <p className="text-sm text-rose-500">{error}</p>}
                <button type="submit" disabled={loading} className="w-full btn-primary py-3">{loading ? 'Resetting...' : 'Reset Password'}</button>
              </form>
            </>
          )}

          {step === 4 && (
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Password Reset!</h2>
              <Link to="/login" className="btn-primary inline-block px-8 py-3 mt-4">Go to Login</Link>
            </div>
          )}

          {step !== 4 && (
            <div className="mt-6 text-center">
              <Link to="/login" className="text-sm text-indigo-600 font-medium">← Back to Login</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
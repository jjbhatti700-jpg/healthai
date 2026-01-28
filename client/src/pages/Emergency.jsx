import { useState } from 'react'

function Emergency() {
  const [showConfirm, setShowConfirm] = useState(null)

  const emergencyNumbers = [
    { id: 'rescue', name: 'Rescue 1122', number: '1122', desc: 'Ambulance & Emergency', color: 'from-rose-500 to-red-600', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z' },
    { id: 'edhi', name: 'Edhi Foundation', number: '115', desc: 'Ambulance Service', color: 'from-emerald-500 to-green-600', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    { id: 'police', name: 'Police', number: '15', desc: 'Police Emergency', color: 'from-blue-500 to-indigo-600', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
    { id: 'fire', name: 'Fire Brigade', number: '16', desc: 'Fire Emergency', color: 'from-orange-500 to-amber-600', icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z' },
    { id: 'aman', name: 'Aman Foundation', number: '1021', desc: 'Karachi Ambulance', color: 'from-teal-500 to-cyan-600', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { id: 'chippa', name: 'Chippa Foundation', number: '1020', desc: 'Ambulance Service', color: 'from-purple-500 to-violet-600', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
  ]

  const hospitals = [
    { name: 'Shaukat Khanum', city: 'Lahore', number: '042-35905000' },
    { name: 'Aga Khan Hospital', city: 'Karachi', number: '021-111911911' },
    { name: 'PIMS Hospital', city: 'Islamabad', number: '051-9261170' },
    { name: 'Mayo Hospital', city: 'Lahore', number: '042-99211145' },
    { name: 'Jinnah Hospital', city: 'Karachi', number: '021-99201300' },
    { name: 'CMH', city: 'Rawalpindi', number: '051-9270614' },
  ]

  const makeCall = (number) => {
    window.location.href = `tel:${number}`
  }

  const handleEmergencyCall = (item) => {
    setShowConfirm(item)
  }

  const confirmCall = () => {
    if (showConfirm) {
      makeCall(showConfirm.number)
      setShowConfirm(null)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">Emergency</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Quick access to emergency services</p>
      </div>

      {/* Main Emergency Button */}
      <div className="card p-6 mb-5 bg-gradient-to-br from-rose-500 to-red-600 border-0 text-center">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Emergency Call</h2>
        <p className="text-rose-100 text-sm mb-4">Tap below to call Rescue 1122</p>
        <button
          onClick={() => handleEmergencyCall({ name: 'Rescue 1122', number: '1122' })}
          className="px-8 py-4 bg-white text-rose-600 rounded-2xl text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
        >
          Call 1122 Now
        </button>
      </div>

      {/* Emergency Services Grid */}
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Emergency Services</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {emergencyNumbers.map(item => (
          <button
            key={item.id}
            onClick={() => handleEmergencyCall(item)}
            className={`card p-4 bg-gradient-to-br ${item.color} border-0 text-left hover:scale-105 transition-transform`}
          >
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
            </div>
            <h4 className="text-white font-semibold text-sm">{item.name}</h4>
            <p className="text-white/80 text-xs">{item.desc}</p>
            <p className="text-white font-bold text-lg mt-1">{item.number}</p>
          </button>
        ))}
      </div>

      {/* Hospitals */}
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Major Hospitals</h3>
      <div className="space-y-2 mb-6">
        {hospitals.map((h, i) => (
          <div key={i} className="card p-3 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">{h.name}</h4>
              <p className="text-xs text-gray-500">{h.city}</p>
            </div>
            <button
              onClick={() => makeCall(h.number)}
              className="flex items-center gap-2 px-3 py-2 bg-emerald-500 text-white rounded-xl text-xs font-medium hover:bg-emerald-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call
            </button>
          </div>
        ))}
      </div>

      {/* First Aid Tips */}
      <div className="card p-4 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
        <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          While Waiting for Help
        </h3>
        <ul className="text-xs text-amber-700 dark:text-amber-300 space-y-1">
          <li>• Stay calm and reassure the patient</li>
          <li>• Don't move injured person unless necessary</li>
          <li>• Keep airways clear</li>
          <li>• Apply pressure to stop bleeding</li>
          <li>• Note time of incident for responders</li>
        </ul>
      </div>

      {/* Confirm Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-sm p-6 text-center">
            <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Call {showConfirm.name}?</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">You are about to call <strong>{showConfirm.number}</strong></p>
            <div className="flex gap-3">
              <button onClick={() => setShowConfirm(null)} className="flex-1 btn-secondary">Cancel</button>
              <button onClick={confirmCall} className="flex-1 px-4 py-2.5 bg-rose-500 text-white rounded-xl font-medium hover:bg-rose-600">Call Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Emergency
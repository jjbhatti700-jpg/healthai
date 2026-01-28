import { useState, useEffect } from 'react'

function MedicineReminder() {
  const [medicines, setMedicines] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ name: '', dosage: '', frequency: 'daily', times: ['08:00'], notes: '' })

  useEffect(() => {
    const saved = localStorage.getItem('medicines')
    if (saved) setMedicines(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('medicines', JSON.stringify(medicines))
  }, [medicines])

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date()
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      medicines.forEach(med => {
        if (med.times.includes(currentTime) && med.active && Notification.permission === 'granted') {
          new Notification('Medicine Reminder 💊', { body: `Time to take ${med.name} - ${med.dosage}`, icon: '/favicon.ico' })
        }
      })
    }
    const interval = setInterval(checkReminders, 60000)
    return () => clearInterval(interval)
  }, [medicines])

  const requestNotification = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') alert('Notifications enabled!')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.dosage) return
    if (editingId) {
      setMedicines(m => m.map(x => x.id === editingId ? { ...form, id: editingId, active: true } : x))
    } else {
      setMedicines(m => [...m, { ...form, id: Date.now(), active: true }])
    }
    resetForm()
  }

  const resetForm = () => {
    setForm({ name: '', dosage: '', frequency: 'daily', times: ['08:00'], notes: '' })
    setShowForm(false)
    setEditingId(null)
  }

  const editMedicine = (med) => { setForm(med); setEditingId(med.id); setShowForm(true) }
  const deleteMedicine = (id) => { if (confirm('Delete?')) setMedicines(m => m.filter(x => x.id !== id)) }
  const toggleActive = (id) => { setMedicines(m => m.map(x => x.id === id ? { ...x, active: !x.active } : x)) }
  const addTime = () => setForm(f => ({ ...f, times: [...f.times, '12:00'] }))
  const removeTime = (i) => setForm(f => ({ ...f, times: f.times.filter((_, idx) => idx !== i) }))
  const updateTime = (i, v) => setForm(f => ({ ...f, times: f.times.map((t, idx) => idx === i ? v : t) }))

  const frequencies = [
    { id: 'daily', name: 'Daily' },
    { id: 'twice', name: 'Twice a day' },
    { id: 'thrice', name: 'Three times' },
    { id: 'weekly', name: 'Weekly' },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Medicine Reminder</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Never miss your medication</p>
        </div>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="btn-primary flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add
        </button>
      </div>

      {/* Notification Banner */}
      {'Notification' in window && Notification.permission !== 'granted' && (
        <div className="card p-4 mb-5 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Enable Notifications</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Get reminded for your medicines</p>
              </div>
            </div>
            <button onClick={requestNotification} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium">Enable</button>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-md p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{editingId ? 'Edit' : 'Add'} Medicine</h2>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Medicine Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="e.g. Paracetamol" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Dosage</label>
                <input type="text" value={form.dosage} onChange={(e) => setForm({ ...form, dosage: e.target.value })} className="input-field" placeholder="e.g. 500mg, 1 tablet" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Frequency</label>
                <select value={form.frequency} onChange={(e) => setForm({ ...form, frequency: e.target.value })} className="input-field">
                  {frequencies.map(f => <option key={f.id} value={f.id}>{f.name}</option>)}
                </select>
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Reminder Times</label>
                  <button type="button" onClick={addTime} className="text-xs text-indigo-600 font-medium">+ Add</button>
                </div>
                <div className="space-y-2">
                  {form.times.map((time, i) => (
                    <div key={i} className="flex gap-2">
                      <input type="time" value={time} onChange={(e) => updateTime(i, e.target.value)} className="input-field flex-1" />
                      {form.times.length > 1 && (
                        <button type="button" onClick={() => removeTime(i)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Notes</label>
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input-field" rows={2} placeholder="e.g. Take after meals" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={resetForm} className="flex-1 btn-secondary">Cancel</button>
                <button type="submit" className="flex-1 btn-primary">{editingId ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Medicine List */}
      {medicines.length === 0 ? (
        <div className="card p-8 text-center">
          <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">No Medicines</h3>
          <p className="text-sm text-gray-500 mb-4">Add medicines to get reminders</p>
          <button onClick={() => setShowForm(true)} className="btn-primary">Add Medicine</button>
        </div>
      ) : (
        <div className="space-y-3">
          {medicines.map(med => (
            <div key={med.id} className={`card p-4 ${!med.active ? 'opacity-50' : ''}`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${med.active ? 'bg-gradient-to-br from-indigo-500 to-violet-600' : 'bg-gray-300'}`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{med.name}</h3>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400">{med.dosage}</p>
                    </div>
                    <button onClick={() => toggleActive(med.id)} className={`px-2 py-1 rounded-lg text-xs font-medium ${med.active ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                      {med.active ? 'Active' : 'Paused'}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {med.times.map((t, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-slate-700 rounded-lg text-xs text-gray-600 dark:text-gray-300">{t}</span>
                    ))}
                    <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-xs text-indigo-600">{frequencies.find(f => f.id === med.frequency)?.name}</span>
                  </div>
                  {med.notes && <p className="text-xs text-gray-500 mt-2">{med.notes}</p>}
                  <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-slate-700">
                    <button onClick={() => editMedicine(med)} className="px-3 py-1.5 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium hover:bg-gray-200">Edit</button>
                    <button onClick={() => deleteMedicine(med.id)} className="px-3 py-1.5 bg-rose-50 dark:bg-rose-900/20 text-rose-600 rounded-lg text-xs font-medium hover:bg-rose-100">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tips */}
      <div className="card mt-5 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-800">
        <h3 className="text-sm font-semibold text-emerald-800 dark:text-emerald-200 mb-2">Medicine Tips</h3>
        <ul className="text-xs text-emerald-700 dark:text-emerald-300 space-y-1">
          <li>• Take medicines at the same time daily</li>
          <li>• Keep medicines in a cool, dry place</li>
          <li>• Check expiry dates regularly</li>
          <li>• Never share prescription medicines</li>
        </ul>
      </div>
    </div>
  )
}

export default MedicineReminder
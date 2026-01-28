import { useState, useEffect } from 'react'

function WaterTracker() {
  const [glasses, setGlasses] = useState(0)
  const [goal, setGoal] = useState(8)
  const [history, setHistory] = useState([])
  const [showSettings, setShowSettings] = useState(false)

  const today = new Date().toDateString()

  useEffect(() => {
    const saved = localStorage.getItem('waterTracker')
    if (saved) {
      const data = JSON.parse(saved)
      setGoal(data.goal || 8)
      setHistory(data.history || [])
      
      const todayEntry = data.history?.find(h => h.date === today)
      if (todayEntry) {
        setGlasses(todayEntry.glasses)
      } else {
        setGlasses(0)
      }
    }
  }, [])

  useEffect(() => {
    const newHistory = history.filter(h => h.date !== today)
    newHistory.push({ date: today, glasses, goal })
    
    // Keep only last 7 days
    const last7Days = newHistory.slice(-7)
    
    localStorage.setItem('waterTracker', JSON.stringify({
      goal,
      history: last7Days
    }))
    setHistory(last7Days)
  }, [glasses, goal])

  const addGlass = () => {
    if (glasses < 20) setGlasses(g => g + 1)
  }

  const removeGlass = () => {
    if (glasses > 0) setGlasses(g => g - 1)
  }

  const percentage = Math.min((glasses / goal) * 100, 100)
  const remaining = Math.max(goal - glasses, 0)

  const quickAdd = [1, 2, 3, 4]

  const getLast7Days = () => {
    const days = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toDateString()
      const entry = history.find(h => h.date === dateStr)
      days.push({
        day: date.toLocaleDateString('en', { weekday: 'short' }),
        date: dateStr,
        glasses: entry?.glasses || 0,
        goal: entry?.goal || goal,
        isToday: i === 0
      })
    }
    return days
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Water Tracker</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Stay hydrated, stay healthy</p>
        </div>
        <button onClick={() => setShowSettings(true)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>

      {/* Main Progress Card */}
      <div className="card p-6 mb-5 bg-gradient-to-br from-blue-500 to-cyan-600 border-0 text-white text-center">
        {/* Water Drop Animation */}
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Background drop */}
            <path
              d="M50 5 C50 5, 85 45, 85 65 C85 85, 67 95, 50 95 C33 95, 15 85, 15 65 C15 45, 50 5, 50 5"
              fill="rgba(255,255,255,0.2)"
            />
            {/* Filled water */}
            <clipPath id="dropClip">
              <path d="M50 5 C50 5, 85 45, 85 65 C85 85, 67 95, 50 95 C33 95, 15 85, 15 65 C15 45, 50 5, 50 5" />
            </clipPath>
            <rect
              x="0"
              y={100 - percentage}
              width="100"
              height={percentage}
              fill="rgba(255,255,255,0.9)"
              clipPath="url(#dropClip)"
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">{Math.round(percentage)}%</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-1">{glasses} / {goal}</h2>
        <p className="text-blue-100 text-sm mb-4">glasses of water</p>

        {glasses >= goal ? (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Goal reached! Great job!</span>
          </div>
        ) : (
          <p className="text-blue-100">{remaining} more to reach your goal</p>
        )}
        {/* Share Button */}
<button 
  onClick={() => {
    const percentage = Math.round((glasses / goal) * 100)
    const text = `💧 *Water Intake Today - HealthAI*\n\n🥛 *Glasses:* ${glasses} / ${goal}\n📊 *Progress:* ${percentage}%\n${percentage >= 100 ? '🎉 Goal Reached!' : ''}\n\n_Stay hydrated! Track yours at HealthAI_`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }}
  className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-sm font-medium"
>
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
  Share Progress
</button>
      </div>

      {/* Quick Add Buttons */}
      <div className="card p-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-900 dark:text-white">Add Water</span>
          <div className="flex gap-2">
            <button onClick={removeGlass} className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600">
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <button onClick={addGlass} className="w-8 h-8 flex items-center justify-center bg-blue-500 rounded-lg hover:bg-blue-600">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {quickAdd.map(num => (
            <button
              key={num}
              onClick={() => setGlasses(g => Math.min(g + num, 20))}
              className="py-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400 font-medium text-sm transition-colors"
            >
              +{num} glass{num > 1 ? 'es' : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Weekly History */}
      <div className="card p-4 mb-5">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">This Week</h3>
        <div className="flex justify-between">
          {getLast7Days().map((day, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mb-1 ${
                day.glasses >= day.goal 
                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' 
                  : day.isToday 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-500'
              }`}>
                {day.glasses}
              </div>
              <span className={`text-xs ${day.isToday ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="card p-4 bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800">
        <h3 className="text-sm font-semibold text-cyan-800 dark:text-cyan-200 mb-2">Hydration Tips</h3>
        <ul className="text-xs text-cyan-700 dark:text-cyan-300 space-y-1">
          <li>• Drink a glass of water when you wake up</li>
          <li>• Keep a water bottle with you</li>
          <li>• Drink before, during, and after exercise</li>
          <li>• Eat water-rich fruits and vegetables</li>
        </ul>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-sm p-5">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Settings</h3>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Daily Goal (glasses)</label>
              <input
                type="number"
                value={goal}
                onChange={(e) => setGoal(Math.max(1, Math.min(20, parseInt(e.target.value) || 8)))}
                className="input-field"
                min="1"
                max="20"
              />
            </div>
            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Reset Today's Count</label>
              <button onClick={() => setGlasses(0)} className="w-full btn-secondary">Reset to 0</button>
            </div>
            <button onClick={() => setShowSettings(false)} className="w-full btn-primary">Done</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default WaterTracker
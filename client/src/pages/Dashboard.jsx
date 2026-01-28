import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { conversationAPI } from '../services/api'

function Dashboard({ user }) {
  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ totalChats: 0, thisWeek: 0, thisMonth: 0 })
  const [weeklyData, setWeeklyData] = useState([])
  const [categoryData, setCategoryData] = useState([])

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const response = await conversationAPI.getAll()
      const convs = response.data.conversations || []
      setConversations(convs)

      const now = new Date()
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

      setStats({
        totalChats: convs.length,
        thisWeek: convs.filter(c => new Date(c.createdAt) > weekAgo).length,
        thisMonth: convs.filter(c => new Date(c.createdAt) > monthAgo).length
      })

      const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
      setWeeklyData(days.map((day, i) => ({
        day,
        count: convs.filter(c => {
          const d = new Date(c.createdAt)
          return Math.floor((now - d) / 864e5) < 7 && d.getDay() === i
        }).length
      })))

      const cats = { Pain: ['pain', 'ache'], Fever: ['fever'], Respiratory: ['cough'], Digestive: ['stomach'], Other: [] }
      const catData = Object.entries(cats).map(([name, kw]) => ({
        name,
        count: convs.filter(c => kw.length ? kw.some(k => c.title.toLowerCase().includes(k)) : !Object.values(cats).slice(0, -1).flat().some(k => c.title.toLowerCase().includes(k))).length,
        color: { Pain: '#8b5cf6', Fever: '#f97316', Respiratory: '#06b6d4', Digestive: '#10b981', Other: '#6b7280' }[name]
      })).filter(c => c.count > 0)
      setCategoryData(catData)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const generateReport = () => {
    const txt = `HEALTH REPORT\n${user?.name} | ${new Date().toLocaleDateString()}\nTotal: ${stats.totalChats}\n\n${conversations.map((c, i) => `${i + 1}. ${c.title}`).join('\n')}`
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([txt]))
    a.download = 'health-report.txt'
    a.click()
  }

  const maxCount = Math.max(...weeklyData.map(d => d.count), 1)
  const totalCat = categoryData.reduce((s, c) => s + c.count, 0) || 1
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-5">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">{greeting}, {user?.name?.split(' ')[0]}!</h1>
        <p className="text-gray-500 dark:text-gray-400 text-xs">Your health dashboard</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <StatCard label="Total" value={stats.totalChats} color="from-indigo-500 to-violet-600" />
        <StatCard label="Week" value={stats.thisWeek} color="from-blue-500 to-cyan-500" />
        <StatCard label="Month" value={stats.thisMonth} color="from-emerald-500 to-teal-500" />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-4 mb-5">
        <div className="card p-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Weekly Activity</h3>
          <div className="flex items-end justify-between h-28 gap-1">
            {weeklyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col justify-end h-20">
                  <div
                    className="w-full bg-gradient-to-t from-indigo-600 to-violet-500 rounded-t transition-all"
                    style={{ height: `${(d.count / maxCount) * 100}%`, minHeight: d.count ? 4 : 0 }}
                  />
                </div>
                <span className="text-[10px] text-gray-400 mt-1">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Categories</h3>
          {categoryData.length ? (
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  {categoryData.reduce((acc, item) => {
                    const pct = (item.count / totalCat) * 100
                    acc.els.push(<circle key={item.name} cx="18" cy="18" r="14" fill="none" stroke={item.color} strokeWidth="4" strokeDasharray={`${pct} ${100 - pct}`} strokeDashoffset={-acc.off} />)
                    acc.off += pct
                    return acc
                  }, { els: [], off: 0 }).els}
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-gray-900 dark:text-white">{stats.totalChats}</span>
              </div>
              <div className="flex-1 space-y-1">
                {categoryData.map(c => (
                  <div key={c.name} className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                    <span className="text-gray-600 dark:text-gray-400">{c.name}</span>
                    <span className="ml-auto text-gray-500">{c.count}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-xs text-center py-6">No data yet</p>
          )}
        </div>
      </div>

      {/* Actions & Recent */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ActionCard to="/symptom-checker" title="Symptoms" desc="Check now" color="from-indigo-500 to-violet-600" icon="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            <ActionCard to="/health-library" title="Library" desc="Learn more" color="from-blue-500 to-cyan-500" icon="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            <button onClick={generateReport} className="card card-hover p-4 text-left">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center text-white mb-2">
                
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="text-xs font-semibold text-gray-900 dark:text-white">Report</h3>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">Download</p>
            </button>
            <button 
  onClick={() => {
    const text = `🏥 *HealthAI Report*\n📅 ${new Date().toLocaleDateString()}\n\n📊 Stats:\n• Total Chats: ${conversations.length}\n\n_Generated by HealthAI_`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }} 
  className="flex items-center gap-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium"
>
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
  Share on WhatsApp
</button>
          </div>

          <div className="card p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Recent</h3>
            {loading ? (
              <div className="flex justify-center py-6"><div className="w-5 h-5 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" /></div>
            ) : !conversations.length ? (
              <div className="text-center py-6">
                <p className="text-gray-400 text-xs mb-3">No conversations yet</p>
                <Link to="/symptom-checker" className="btn-primary text-xs">Start Chat</Link>
              </div>
            ) : (
              <div className="space-y-2">
                {conversations.slice(0, 4).map(c => (
                  <Link key={c._id} to="/symptom-checker" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                    <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{c.title}</p>
                      <p className="text-[10px] text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Health Tips</h3>
            <div className="space-y-2">
              {[
                { tip: 'Drink 8 glasses of water', color: 'from-blue-500 to-cyan-500' },
                { tip: 'Sleep 7-9 hours', color: 'from-indigo-500 to-violet-500' },
                { tip: 'Take breaks hourly', color: 'from-emerald-500 to-teal-500' },
                { tip: 'Eat fruits & veggies', color: 'from-green-500 to-emerald-500' }
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                  <div className={`w-6 h-6 bg-gradient-to-br ${t.color} rounded-md flex items-center justify-center`}>
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-xs text-gray-700 dark:text-gray-300">{t.tip}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-4 bg-gradient-to-br from-indigo-500 to-violet-600 border-0">
            <h3 className="text-white font-semibold text-sm mb-1">Feeling unwell?</h3>
            <p className="text-indigo-100 text-xs mb-3">Get AI health insights</p>
            <Link to="/symptom-checker" className="block w-full bg-white text-indigo-600 text-center py-2 rounded-lg text-xs font-semibold hover:bg-gray-100 transition-colors">Check Symptoms</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, color }) {
  return (
    <div className="card p-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">{label}</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className={`w-9 h-9 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}>
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
        </div>
      </div>
    </div>
  )
}

function ActionCard({ to, title, desc, color, icon }) {
  return (
    <Link to={to} className="card card-hover p-4">
      <div className={`w-8 h-8 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center text-white mb-2`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} /></svg>
      </div>
      <h3 className="text-xs font-semibold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-[10px] text-gray-500 dark:text-gray-400">{desc}</p>
    </Link>
  )
}

export default Dashboard
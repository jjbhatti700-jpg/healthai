import { useState } from 'react'
import { healthAPI } from '../services/api'

function HealthLibrary() {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    {
      name: 'Common Conditions',
      color: 'from-violet-500 to-purple-600',
      topics: [
        { name: 'Common Cold', icon: <IconCold /> },
        { name: 'Headaches', icon: <IconHead /> },
        { name: 'Back Pain', icon: <IconBack /> },
        { name: 'Allergies', icon: <IconAllergy /> }
      ]
    },
    {
      name: 'Wellness',
      color: 'from-emerald-500 to-teal-600',
      topics: [
        { name: 'Healthy Sleep', icon: <IconSleep /> },
        { name: 'Nutrition', icon: <IconFood /> },
        { name: 'Exercise', icon: <IconExercise /> },
        { name: 'Mental Health', icon: <IconMental /> }
      ]
    },
    {
      name: 'Prevention',
      color: 'from-blue-500 to-cyan-600',
      topics: [
        { name: 'Vaccinations', icon: <IconVaccine /> },
        { name: 'Hygiene', icon: <IconHygiene /> },
        { name: 'Regular Checkups', icon: <IconCheckup /> },
        { name: 'First Aid', icon: <IconFirstAid /> }
      ]
    }
  ]

  const fetchTopicInfo = async (topic) => {
    setSelectedTopic(topic)
    setLoading(true)
    try {
      const response = await healthAPI.getHealthInfo(topic)
      setContent(response.data.response)
    } catch (error) {
      setContent('Unable to load information. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const filteredCategories = categories.map(cat => ({
    ...cat,
    topics: cat.topics.filter(topic => 
      topic.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.topics.length > 0)

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Health Library</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Explore health topics and get reliable information</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search health topics..."
          className="input-field pl-10"
        />
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Topics List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredCategories.map((category, catIndex) => (
            <div key={catIndex} className="card p-4">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`}></div>
                {category.name}
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {category.topics.map((topic, topicIndex) => (
                  <button
                    key={topicIndex}
                    onClick={() => fetchTopicInfo(topic.name)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-left transition-all text-sm ${
                      selectedTopic === topic.name
                        ? `bg-gradient-to-r ${category.color} text-white`
                        : 'bg-gray-50 dark:bg-slate-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      selectedTopic === topic.name ? 'bg-white/20' : `bg-gradient-to-br ${category.color} text-white`
                    }`}>
                      {topic.icon}
                    </div>
                    <span className="text-xs font-medium truncate">{topic.name}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-3">
          <div className="card min-h-[400px] sticky top-20">
            {!selectedTopic ? (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-violet-100 dark:from-indigo-900/50 dark:to-violet-900/50 rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">Select a Topic</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">Choose a health topic from the left to view detailed information</p>
              </div>
            ) : loading ? (
              <div className="flex flex-col items-center justify-center h-[400px]">
                <div className="w-8 h-8 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-3"></div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Loading information...</p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100 dark:border-slate-700">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">{selectedTopic}</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Health Information</p>
                  </div>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {content}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                  <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    This is general information only, not medical advice.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Icon Components (small, clean)
function IconCold() {
  return <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
}
function IconHead() {
  return <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
}
function IconBack() {
  return <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
}
function IconAllergy() {
  return <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
}
function IconSleep() {
  return <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
}
function IconFood() {
  return <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" /></svg>
}
function IconExercise() {
  return <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
}
function IconMental() {
  return <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
}
function IconVaccine() {
  return <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
}
function IconHygiene() {
  return <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" /></svg>
}
function IconCheckup() {
  return <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
}
function IconFirstAid() {
  return <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
}

export default HealthLibrary
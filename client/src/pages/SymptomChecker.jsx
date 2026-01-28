import { useState, useEffect, useRef } from 'react'
import { healthAPI } from '../services/api'

function SymptomChecker() {
  const [conversations, setConversations] = useState([])
  const [currentConversation, setCurrentConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const saved = localStorage.getItem('symptomConversations')
    if (saved) setConversations(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('symptomConversations', JSON.stringify(conversations))
  }, [conversations])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const startNewChat = () => {
    const newConvo = { id: Date.now(), title: 'New Chat', messages: [], date: new Date().toISOString() }
    setConversations([newConvo, ...conversations])
    setCurrentConversation(newConvo)
    setMessages([])
    setSidebarOpen(false)
  }

  const selectConversation = (convo) => {
    setCurrentConversation(convo)
    setMessages(convo.messages || [])
    setSidebarOpen(false)
  }

  const deleteConversation = (id, e) => {
    e.stopPropagation()
    setConversations(conversations.filter(c => c.id !== id))
    if (currentConversation?.id === id) {
      setCurrentConversation(null)
      setMessages([])
    }
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = { role: 'user', content: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const response = await healthAPI.chat(input)
      const assistantMessage = { role: 'assistant', content: response.message }
      const updatedMessages = [...newMessages, assistantMessage]
      setMessages(updatedMessages)

      // Update conversation
      const title = input.slice(0, 30) + (input.length > 30 ? '...' : '')
      if (currentConversation) {
        const updated = { ...currentConversation, messages: updatedMessages, title }
        setCurrentConversation(updated)
        setConversations(convos => convos.map(c => c.id === updated.id ? updated : c))
      } else {
        const newConvo = { id: Date.now(), title, messages: updatedMessages, date: new Date().toISOString() }
        setCurrentConversation(newConvo)
        setConversations([newConvo, ...conversations])
      }
    } catch (error) {
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }])
    }
    setLoading(false)
  }

  const quickSymptoms = ['Headache', 'Fever', 'Stomach pain', 'Back pain', 'Fatigue', 'Cough']

  // SHARE ON WHATSAPP FUNCTION
  const shareOnWhatsApp = () => {
    if (messages.length === 0) {
      alert('No conversation to share')
      return
    }
    const chatText = messages.map(m => `${m.role === 'user' ? '👤 You' : '🤖 HealthAI'}: ${m.content.slice(0, 150)}${m.content.length > 150 ? '...' : ''}`).join('\n\n')
    const text = `🏥 *HealthAI Symptom Check*\n📅 ${new Date().toLocaleDateString()}\n\n${chatText.slice(0, 800)}\n\n⚠️ _This is AI-generated info, not medical advice._`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <div className="flex h-[calc(100vh-7rem)] max-w-6xl mx-auto">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'fixed inset-0 z-40' : 'hidden'} md:relative md:block`}>
        <div className="absolute inset-0 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
        <div className="absolute left-0 top-0 bottom-0 w-64 bg-white dark:bg-slate-800 border-r border-gray-100 dark:border-slate-700 md:relative md:w-56 overflow-y-auto">
          <div className="p-3 border-b border-gray-100 dark:border-slate-700">
            <button onClick={startNewChat} className="w-full btn-primary flex items-center justify-center gap-2 text-xs py-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              New Chat
            </button>
          </div>
          <div className="p-2">
            {conversations.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">No conversations</p>
            ) : (
              conversations.map(convo => (
                <div
                  key={convo.id}
                  onClick={() => selectConversation(convo)}
                  className={`group flex items-center justify-between p-2 rounded-lg cursor-pointer mb-1 ${currentConversation?.id === convo.id ? 'bg-indigo-50 dark:bg-indigo-900/30' : 'hover:bg-gray-50 dark:hover:bg-slate-700'}`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                    <span className="text-xs truncate text-gray-700 dark:text-gray-300">{convo.title}</span>
                  </div>
                  <button onClick={(e) => deleteConversation(convo.id, e)} className="opacity-0 group-hover:opacity-100 p-1 hover:bg-rose-100 dark:hover:bg-rose-900/30 rounded">
                    <svg className="w-3 h-3 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div>
              <h1 className="text-sm font-semibold text-gray-900 dark:text-white">Symptom Checker</h1>
              <p className="text-xs text-gray-500">AI-powered health insights</p>
            </div>
          </div>
          
          {/* SHARE BUTTON - RIGHT SIDE OF HEADER */}
          {messages.length > 0 && (
            <button 
              onClick={shareOnWhatsApp}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-medium transition-colors"
              title="Share on WhatsApp"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Share
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">How are you feeling?</h3>
              <p className="text-xs text-gray-500 mb-4">Describe your symptoms or select below</p>
              <div className="flex flex-wrap justify-center gap-2">
                {quickSymptoms.map(symptom => (
                  <button key={symptom} onClick={() => { setInput(symptom); }} className="px-3 py-1.5 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg text-xs text-gray-700 dark:text-gray-300 transition-colors">
                    {symptom}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200'}`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-slate-700 px-4 py-3 rounded-2xl">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Disclaimer */}
        <div className="px-4 py-2 bg-amber-50 dark:bg-amber-900/20 border-t border-amber-100 dark:border-amber-800">
          <p className="text-xs text-amber-700 dark:text-amber-300 text-center">⚠️ For informational purposes only. Not medical advice.</p>
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-100 dark:border-slate-700">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Describe your symptoms..."
              className="input-field flex-1 py-2.5"
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()} className="btn-primary px-4 disabled:opacity-50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SymptomChecker
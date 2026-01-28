import { Link } from 'react-router-dom'

function Home() {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: 'Smart Symptom Analysis',
      description: 'Describe how you feel and get AI-powered health insights instantly.',
      color: 'from-violet-500 to-purple-600'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Health Encyclopedia',
      description: 'Access comprehensive information about conditions and treatments.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: 'AI Health Chat',
      description: 'Have natural conversations about your health concerns anytime.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Secure & Private',
      description: 'Your health data is encrypted and never shared with third parties.',
      color: 'from-orange-500 to-rose-500'
    }
  ]

  const stats = [
    { value: '100%', label: 'Free to Use' },
    { value: '24/7', label: 'Available' },
    { value: 'AI', label: 'Powered' },
    { value: 'Secure', label: 'Platform' }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24">
        <div className="inline-flex items-center bg-gradient-to-r from-violet-100 to-blue-100 text-blue-700 px-5 py-2.5 rounded-full text-sm font-semibold mb-8 shadow-sm">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Powered by Google Gemini AI
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight">
          Your Personal
          <span className="block gradient-text mt-2">
            Health Assistant
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
          Understand your symptoms, learn about health conditions, and get 
          personalized wellness guidance — all powered by advanced AI.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Link to="/register" className="btn-primary text-lg px-10 py-5 flex items-center justify-center gap-3">
            <span>Start Free Now</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link to="/login" className="btn-secondary text-lg px-10 py-5">
            Sign In
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Everything you need for better health understanding
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card card-hover group"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="card bg-gradient-to-br from-slate-50 to-blue-50 border-0">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-500">Get started in 3 simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Create Account</h3>
              <p className="text-gray-500">Sign up for free in seconds. No credit card required.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Describe Symptoms</h3>
              <p className="text-gray-500">Tell our AI how you're feeling in your own words.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Get Insights</h3>
              <p className="text-gray-500">Receive helpful health information and guidance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-16 mb-8">
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-1 shadow-2xl">
          <div className="bg-white rounded-[22px] px-8 py-10 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Medical Disclaimer
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed text-lg">
              This application provides <strong>general health information only</strong>. It is not a substitute 
              for professional medical advice, diagnosis, or treatment. Always consult a qualified 
              healthcare provider for medical concerns. In case of emergency, call your local emergency services.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
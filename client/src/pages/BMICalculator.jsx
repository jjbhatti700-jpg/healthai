import { useState } from 'react'

function BMICalculator() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [unit, setUnit] = useState('metric') // metric or imperial
  const [result, setResult] = useState(null)

  const calculateBMI = () => {
    if (!weight || !height) return

    let bmi
    if (unit === 'metric') {
      // Weight in kg, height in cm
      const heightM = parseFloat(height) / 100
      bmi = parseFloat(weight) / (heightM * heightM)
    } else {
      // Weight in lbs, height in inches
      bmi = (parseFloat(weight) / (parseFloat(height) * parseFloat(height))) * 703
    }

    bmi = Math.round(bmi * 10) / 10

    let category, color, advice
    if (bmi < 18.5) {
      category = 'Underweight'
      color = 'text-blue-600 bg-blue-100 dark:bg-blue-900/30'
      advice = 'You may need to gain weight. Consult a doctor for personalized advice.'
    } else if (bmi < 25) {
      category = 'Normal'
      color = 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30'
      advice = 'Great! You have a healthy weight. Maintain it with balanced diet and exercise.'
    } else if (bmi < 30) {
      category = 'Overweight'
      color = 'text-amber-600 bg-amber-100 dark:bg-amber-900/30'
      advice = 'Consider lifestyle changes. Increase physical activity and eat healthier.'
    } else {
      category = 'Obese'
      color = 'text-rose-600 bg-rose-100 dark:bg-rose-900/30'
      advice = 'Please consult a healthcare provider for a weight management plan.'
    }

    setResult({ bmi, category, color, advice })
  }

  const reset = () => {
    setWeight('')
    setHeight('')
    setResult(null)
  }

  const bmiRanges = [
    { range: '< 18.5', category: 'Underweight', color: 'bg-blue-500' },
    { range: '18.5 - 24.9', category: 'Normal', color: 'bg-emerald-500' },
    { range: '25 - 29.9', category: 'Overweight', color: 'bg-amber-500' },
    { range: '≥ 30', category: 'Obese', color: 'bg-rose-500' },
  ]

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-5">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">BMI Calculator</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">Calculate your Body Mass Index</p>
      </div>

      <div className="card p-5 mb-5">
        {/* Unit Toggle */}
        <div className="flex bg-gray-100 dark:bg-slate-700 rounded-xl p-1 mb-5">
          <button
            onClick={() => { setUnit('metric'); reset(); }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${unit === 'metric' ? 'bg-white dark:bg-slate-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500'}`}
          >
            Metric (kg/cm)
          </button>
          <button
            onClick={() => { setUnit('imperial'); reset(); }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${unit === 'imperial' ? 'bg-white dark:bg-slate-600 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500'}`}
          >
            Imperial (lb/in)
          </button>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Weight ({unit === 'metric' ? 'kg' : 'lbs'})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="input-field"
              placeholder={unit === 'metric' ? 'e.g. 70' : 'e.g. 154'}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Height ({unit === 'metric' ? 'cm' : 'inches'})
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="input-field"
              placeholder={unit === 'metric' ? 'e.g. 175' : 'e.g. 69'}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button onClick={reset} className="btn-secondary flex-1">Reset</button>
          <button onClick={calculateBMI} className="btn-primary flex-1">Calculate BMI</button>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="card p-5 mb-5 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Your BMI is</p>
          <div className={`inline-block px-6 py-3 rounded-2xl mb-3 ${result.color}`}>
            <span className="text-4xl font-bold">{result.bmi}</span>
          </div>
          <p className={`text-lg font-semibold mb-2 ${result.color.split(' ')[0]}`}>{result.category}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{result.advice}</p>
          {/* Share Button */}
<button 
  onClick={() => {
    const text = `🏥 *My BMI Result - HealthAI*\n\n📊 *BMI:* ${result.bmi}\n📋 *Category:* ${result.category}\n⚖️ *Weight:* ${weight} ${unit === 'metric' ? 'kg' : 'lbs'}\n📏 *Height:* ${height} ${unit === 'metric' ? 'cm' : 'in'}\n\n_Calculate yours at HealthAI_`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }}
  className="mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium mx-auto"
>
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
  Share Result
</button>

          {/* Visual Scale */}
          <div className="mt-5 pt-5 border-t border-gray-100 dark:border-slate-700">
            <div className="flex rounded-full overflow-hidden h-3 mb-2">
              <div className="bg-blue-500 flex-1"></div>
              <div className="bg-emerald-500 flex-1"></div>
              <div className="bg-amber-500 flex-1"></div>
              <div className="bg-rose-500 flex-1"></div>
            </div>
            <div className="relative h-4">
              <div
                className="absolute w-3 h-3 bg-gray-900 dark:bg-white rounded-full -top-1 transform -translate-x-1/2"
                style={{
                  left: `${Math.min(Math.max((result.bmi / 40) * 100, 2), 98)}%`
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>15</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40</span>
            </div>
          </div>
        </div>
      )}

      {/* BMI Chart */}
      <div className="card p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">BMI Categories</h3>
        <div className="space-y-2">
          {bmiRanges.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
              <span className="text-sm text-gray-600 dark:text-gray-400 w-24">{item.range}</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{item.category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-5 p-3 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          BMI is a general indicator. It doesn't account for muscle mass, age, or gender. Consult a doctor for accurate assessment.
        </p>
      </div>
    </div>
  )
}

export default BMICalculator
function Disclaimer() {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
      <div className="flex items-start">
        <span className="text-yellow-400 text-xl mr-3">⚠️</span>
        <div>
          <h4 className="font-semibold text-yellow-800">Medical Disclaimer</h4>
          <p className="text-yellow-700 text-sm mt-1">
            This AI assistant provides general health information only. It is NOT a substitute 
            for professional medical advice, diagnosis, or treatment. Always consult a qualified 
            healthcare provider for medical concerns.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Disclaimer
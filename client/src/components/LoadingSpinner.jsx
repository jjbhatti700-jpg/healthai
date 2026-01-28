function LoadingSpinner({ size = 'md', text = '' }) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div
        className={`animate-spin rounded-full border-4 border-gray-200 border-t-primary-600 ${sizeClasses[size]}`}
      ></div>
      {text && <p className="text-gray-600 text-sm">{text}</p>}
    </div>
  )
}

export default LoadingSpinner
function ChatMessage({ message }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] p-4 rounded-2xl ${
          isUser
            ? 'bg-primary-600 text-white rounded-br-md'
            : 'bg-gray-100 text-gray-800 rounded-bl-md'
        }`}
      >
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg">{isUser ? '👤' : '🤖'}</span>
          <span className="font-semibold text-sm">
            {isUser ? 'You' : 'Health Assistant'}
          </span>
        </div>
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {message.content}
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
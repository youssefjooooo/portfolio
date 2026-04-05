'use client'

import { useState, useEffect } from 'react'

export default function RandomFooterMessage({ messages }: { messages: string[] }) {
  const [msg, setMsg] = useState<string>('')

  useEffect(() => {
    setMsg(messages[Math.floor(Math.random() * messages.length)])
  }, [messages])

  return (
    <p 
      className={`text-xs text-white/20 transition-opacity duration-700 ${msg ? 'opacity-100' : 'opacity-0'}`}
    >
      {msg || messages[0]}
    </p>
  )
}

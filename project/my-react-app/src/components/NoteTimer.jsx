import React, { useEffect, useState } from 'react'

export default function NoteTimer({ createdAt }) {
  const [secondsLeft, setSecondsLeft] = useState(60)

  useEffect(() => {
    const createdTime = new Date(createdAt).getTime()

    const interval = setInterval(() => {
      const now = Date.now()
      const elapsed = Math.floor((now - createdTime) / 1000)
      const remaining = Math.max(60 - elapsed, 0)
      setSecondsLeft(remaining)

      if (remaining <= 0) clearInterval(interval)
    }, 1000)

    return () => clearInterval(interval)
  }, [createdAt])

  return (
    <span className="text-sm text-gray-500 ml-2">
      ⏱️ {secondsLeft}s left
    </span>
  )
}

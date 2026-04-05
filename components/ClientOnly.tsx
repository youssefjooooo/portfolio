'use client'

/**
 * ClientOnly
 *
 * High-performance hydration-safe wrapper.
 * Renders `fallback` on the server (and during SSR),
 * then swaps in `children` after the first client paint.
 *
 * Use this to wrap any component that:
 *  – reads window / document
 *  – relies on randomness or Date that differs between server & client
 *  – uses WebGL / Canvas APIs
 */

import { useEffect, useState, type ReactNode } from 'react'

interface ClientOnlyProps {
  children: ReactNode
  /** Optional SSR skeleton — keeps layout stable while JS loads */
  fallback?: ReactNode
}

export default function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? <>{children}</> : <>{fallback}</>
}

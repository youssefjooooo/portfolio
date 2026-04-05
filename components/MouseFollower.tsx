'use client'

/**
 * MouseFollower — Chroma-Engine
 *
 * Two large (60vw) radial gradient spotlights that lazily follow the cursor
 * via requestAnimationFrame + linear interpolation (lerp).
 *
 * Architecture decisions:
 *  – willChange: 'transform' isolates these layers into their own GPU compositor layers
 *  – mix-blend-mode: screen creates the additive color blending against the dark bg
 *  – Disabled entirely on pointer: coarse devices (touch/mobile) to save GPU cycles
 *  – Wrapped in ClientOnly in layout.tsx to prevent SSR hydration mismatch
 */

import { useEffect, useRef } from 'react'

export default function MouseFollower() {
  const spot1Ref = useRef<HTMLDivElement>(null)
  const spot2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Bail on touch/mobile — no hover capability & saves GPU on low-end devices
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let rafId: number
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    // Separate lerp targets so the two spots drift at different speeds
    let x1 = mouseX, y1 = mouseY
    let x2 = mouseX, y2 = mouseY

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      x1 = lerp(x1, mouseX, 0.07)
      y1 = lerp(y1, mouseY, 0.07)
      x2 = lerp(x2, mouseX, 0.035)
      y2 = lerp(y2, mouseY, 0.035)

      // Offset by half-size so gradient is centered on cursor
      if (spot1Ref.current) {
        spot1Ref.current.style.transform = `translate(${x1 - 400}px, ${y1 - 400}px)`
      }
      if (spot2Ref.current) {
        spot2Ref.current.style.transform = `translate(${x2 - 500}px, ${y2 - 500}px)`
      }

      rafId = requestAnimationFrame(tick)
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      // Hidden on touch/mobile via Tailwind (md: prefix = ≥768px pointer devices)
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden hidden md:block"
    >
      {/* Spotlight 1 — faster, slate-800 (#1e293b) */}
      <div
        ref={spot1Ref}
        className="absolute top-0 left-0 rounded-full"
        style={{
          width: 800,
          height: 800,
          background: 'radial-gradient(circle, #1e293b 0%, transparent 70%)',
          mixBlendMode: 'screen',
          opacity: 0.4,
          willChange: 'transform',
        }}
      />
      {/* Spotlight 2 — slower, larger, slate-900 (#0f172a) */}
      <div
        ref={spot2Ref}
        className="absolute top-0 left-0 rounded-full"
        style={{
          width: 1000,
          height: 1000,
          background: 'radial-gradient(circle, #0f172a 0%, transparent 70%)',
          mixBlendMode: 'screen',
          opacity: 0.4,
          willChange: 'transform',
        }}
      />
    </div>
  )
}

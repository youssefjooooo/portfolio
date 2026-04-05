'use client'

/**
 * MouseFollower — Dark mode.
 * Two white-tinted blobs that lazily follow the cursor via rAF + lerp.
 * Very low opacity so they're a subtle ambient effect, not distracting.
 */

import { useEffect, useRef } from 'react'

export default function MouseFollower() {
  const b1 = useRef<HTMLDivElement>(null)
  const b2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf: number
    let mx = window.innerWidth / 2, my = window.innerHeight / 2
    let x1 = mx, y1 = my, x2 = mx, y2 = my

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      x1 = lerp(x1, mx, 0.06); y1 = lerp(y1, my, 0.06)
      x2 = lerp(x2, mx, 0.03); y2 = lerp(y2, my, 0.03)
      if (b1.current) b1.current.style.transform = `translate(${x1-400}px,${y1-400}px)`
      if (b2.current) b2.current.style.transform = `translate(${x2-500}px,${y2-500}px)`
      raf = requestAnimationFrame(tick)
    }
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden hidden md:block">
      <div ref={b1} className="absolute top-0 left-0 rounded-full" style={{
        width:800, height:800,
        background:'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
        willChange:'transform',
      }} />
      <div ref={b2} className="absolute top-0 left-0 rounded-full" style={{
        width:1000, height:1000,
        background:'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
        willChange:'transform',
      }} />
    </div>
  )
}

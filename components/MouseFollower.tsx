'use client'

/**
 * MouseFollower — Modern interactive circle cursor.
 *
 *  · Small dot tracks the cursor 1:1
 *  · Outer ring lerps with elastic spring physics
 *  · Hovers over <a> / <button> / [data-cursor] / inputs:
 *      → ring grows + becomes a soft tinted fill
 *  · Mousedown anywhere: ring pulses inward
 *
 *  Disabled on touch devices & when prefers-reduced-motion.
 */

import { useEffect, useRef } from 'react'

const HOVER_SELECTOR =
  'a, button, [role="button"], [data-cursor="hover"], input, select, textarea, summary, label'

export default function MouseFollower() {
  const dot  = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    // Start off-screen so there's no flash at top-left
    let mx = -100, my = -100
    let rx = mx, ry = my
    let hovering = false
    let pressed  = false

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const tick = () => {
      // Ring follows with elastic delay
      rx = lerp(rx, mx, 0.18)
      ry = lerp(ry, my, 0.18)

      const baseSize  = hovering ? 56 : 34
      const size      = pressed ? baseSize * 0.78 : baseSize
      const tint      = hovering ? 'rgba(78,123,255,0.16)' : 'rgba(11,16,32,0)'
      const border    = hovering ? 'rgba(78,123,255,0.55)' : 'rgba(11,16,32,0.45)'

      if (dot.current) {
        dot.current.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`
        dot.current.style.opacity = hovering ? '0' : '1'
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx - size / 2}px, ${ry - size / 2}px, 0)`
        ring.current.style.width  = `${size}px`
        ring.current.style.height = `${size}px`
        ring.current.style.background = tint
        ring.current.style.borderColor = border
      }

      raf = requestAnimationFrame(tick)
    }

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      hovering = !!t?.closest?.(HOVER_SELECTOR)
    }
    const onOut = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null
      if (t?.closest?.(HOVER_SELECTOR)) hovering = false
    }
    const onDown = () => { pressed = true }
    const onUp   = () => { pressed = false }
    const onLeave = () => {
      mx = -100; my = -100
    }

    window.addEventListener('mousemove',  onMove,  { passive: true })
    window.addEventListener('mouseover',  onOver,  { passive: true })
    window.addEventListener('mouseout',   onOut,   { passive: true })
    window.addEventListener('mousedown',  onDown,  { passive: true })
    window.addEventListener('mouseup',    onUp,    { passive: true })
    document.addEventListener('mouseleave', onLeave)

    // Hide native cursor on interactive root
    document.documentElement.classList.add('has-custom-cursor')

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('mouseover',  onOver)
      window.removeEventListener('mouseout',   onOut)
      window.removeEventListener('mousedown',  onDown)
      window.removeEventListener('mouseup',    onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <>
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full hidden md:block"
        style={{
          width:  34,
          height: 34,
          border: '1.5px solid rgba(11,16,32,0.45)',
          background: 'transparent',
          transition:
            'width 280ms cubic-bezier(0.16,1,0.3,1), height 280ms cubic-bezier(0.16,1,0.3,1), background 220ms ease, border-color 220ms ease',
          willChange: 'transform, width, height, background, border-color',
          backdropFilter: 'invert(0.04)',
          WebkitBackdropFilter: 'invert(0.04)',
          mixBlendMode: 'normal',
        }}
      />
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full hidden md:block"
        style={{
          width:  8,
          height: 8,
          background: '#0B1020',
          transition: 'opacity 200ms ease',
          willChange: 'transform, opacity',
        }}
      />
    </>
  )
}

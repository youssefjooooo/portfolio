'use client'

/**
 * GlassButton — Apple Liquid Glass.
 *
 * primary → solid ink with white text + specular shimmer + soft accent glow.
 * glass   → translucent white glass pill.
 * ghost   → thin outlined glass.
 */

import Link from 'next/link'
import { useRef, type ReactNode, type MouseEvent } from 'react'

interface Props {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'glass' | 'ghost'
  className?: string
  external?: boolean
}

export default function GlassButton({
  children, href, onClick, variant = 'primary', className = '', external = false,
}: Props) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null)

  // Subtle magnetic hover effect
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = ''
  }

  const base = [
    'relative inline-flex items-center justify-center gap-2',
    'px-6 py-3 rounded-full text-sm font-semibold tracking-wide',
    'overflow-hidden select-none cursor-pointer will-change-transform',
    'transition-[background,color,box-shadow,border-color] duration-300 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50',
  ].join(' ')

  const variants = {
    primary: [
      'bg-ink text-white',
      'shadow-[0_10px_28px_-8px_rgba(11,16,32,0.5)]',
      'hover:shadow-[0_14px_36px_-8px_rgba(78,123,255,0.55)]',
      'hover:bg-[#1A2138]',
      'active:scale-[0.97]',
    ].join(' '),
    glass: [
      'glass-pill text-ink-strong',
      'hover:bg-white/85',
    ].join(' '),
    ghost: [
      'bg-white/30 backdrop-blur-glass border border-white/65 text-ink-mid',
      'hover:bg-white/55 hover:text-ink-strong hover:border-white/90',
      'shadow-[0_1px_0_0_rgba(255,255,255,0.8)_inset,0_6px_18px_-6px_rgba(8,22,58,0.14)]',
    ].join(' '),
  }

  const shimmer = variant === 'primary' ? (
    <span
      aria-hidden="true"
      className="absolute inset-0 -skew-x-[18deg] animate-shimmer pointer-events-none"
      style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)',
        width: '50%',
      }}
    />
  ) : null

  const inner = (
    <>
      {shimmer}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  )

  if (href) {
    return (
      <Link
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`${base} ${variants[variant]} ${className}`}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </Link>
    )
  }
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {inner}
    </button>
  )
}

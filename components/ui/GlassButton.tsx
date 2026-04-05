'use client'

/**
 * GlassButton — Monochromatic dark mode.
 *
 * primary → white fill, black text — maximum contrast.
 * glass   → subtle white glass panel.
 * ghost   → transparent with white border.
 */

import Link from 'next/link'
import type { ReactNode } from 'react'

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
  const base = [
    'relative inline-flex items-center justify-center gap-2',
    'px-6 py-3 rounded-xl text-sm font-semibold tracking-wide',
    'overflow-hidden select-none cursor-pointer',
    'transition-all duration-300 ease-out',
    'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40',
  ].join(' ')

  const variants = {
    primary: [
      'bg-white text-black',
      'hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.18)]',
      'active:scale-[0.98]',
    ].join(' '),
    glass: [
      'glass-surface text-white/70',
      'hover:glass-dense hover:text-white',
    ].join(' '),
    ghost: [
      'bg-transparent border border-white/20 text-white/55',
      'hover:text-white hover:border-white/40',
    ].join(' '),
  }

  // Shimmer: faint diagonal sweep — works on both white and dark fills
  const shimmer = variant === 'primary' ? (
    <span
      aria-hidden="true"
      className="absolute inset-0 -skew-x-[20deg] animate-shimmer pointer-events-none"
      style={{
        background: 'linear-gradient(90deg,transparent 0%,rgba(0,0,0,0.06) 50%,transparent 100%)',
        width: '40%',
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
        href={href}
        className={`${base} ${variants[variant]} ${className}`}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {inner}
    </button>
  )
}

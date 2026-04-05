'use client'

/**
 * GlassButton
 *
 * variant="primary"  — glass fill + 3s shimmer loop + chroma-sky glow on hover
 * variant="ghost"    — transparent, border only, text shifts to white on hover
 *
 * Can render as either an <a> (via href) or a <button>.
 */

import Link from 'next/link'
import type { ReactNode } from 'react'

interface GlassButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  className?: string
  external?: boolean
}

export default function GlassButton({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  external = false,
}: GlassButtonProps) {
  const base = [
    'relative inline-flex items-center justify-center gap-2',
    'px-6 py-3 rounded-xl text-sm font-medium',
    'overflow-hidden select-none cursor-pointer',
    'transition-all duration-300 ease-out',
    'border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60',
  ].join(' ')

  const styles = {
    primary: [
      'bg-white/[0.07] border-white/[0.14] text-white',
      'hover:bg-white/[0.11] hover:border-white/30',
      'hover:shadow-[0_0_40px_rgba(56,189,248,0.18)]',
    ].join(' '),
    ghost: [
      'bg-transparent border-white/[0.07] text-slate-400',
      'hover:text-white hover:border-white/[0.18]',
    ].join(' '),
  }

  const shimmer =
    variant === 'primary' ? (
      <span
        aria-hidden="true"
        className="absolute inset-0 -skew-x-[20deg] animate-shimmer pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.10) 50%, transparent 100%)',
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

  const topBorder: React.CSSProperties =
    variant === 'primary'
      ? { borderTopColor: 'rgba(255,255,255,0.24)' }
      : {}

  if (href) {
    return (
      <Link
        href={href}
        className={`${base} ${styles[variant]} ${className}`}
        style={topBorder}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`${base} ${styles[variant]} ${className}`}
      style={topBorder}
      type="button"
    >
      {inner}
    </button>
  )
}

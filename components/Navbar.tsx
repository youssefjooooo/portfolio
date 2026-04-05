'use client'

/**
 * Navbar
 *
 * Scroll-triggered glass density:
 *  – < 40px scroll → sparse glass (bg-white/[0.02], blur-xl, border-white/5)
 *  – ≥ 40px scroll → dense glass (bg-white/[0.07], blur-3xl, border-white/20)
 *
 * The transition is handled with CSS `transition-all duration-500` on the <nav>
 * element to avoid janky frame drops from frequent re-renders.
 */

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Work',    href: '#work'    },
  { label: 'Stack',   href: '#stack'   },
  { label: 'About',   href: '#about'   },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  const onScroll = useCallback(() => {
    setScrolled(window.scrollY > 40)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4"
    >
      <nav
        className="
          flex items-center gap-6 px-5 py-2.5 rounded-2xl
          transition-all duration-500 ease-in-out
        "
        style={
          scrolled
            ? {
                // Dense state
                backgroundColor: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(64px)',
                WebkitBackdropFilter: 'blur(64px)',
                border: '1px solid rgba(255,255,255,0.20)',
                borderTopColor: 'rgba(255,255,255,0.28)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.12)',
              }
            : {
                // Sparse state
                backgroundColor: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderTopColor: 'rgba(255,255,255,0.08)',
                boxShadow: 'none',
              }
        }
      >
        {/* ── Logo ─────────────────────────────────── */}
        <Link
          href="/"
          className="mr-2 text-sm font-semibold tracking-tight text-white/85 hover:text-white transition-colors duration-200 font-mono"
        >
          &lt;YK /&gt;
        </Link>

        {/* ── Nav links ────────────────────────────── */}
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm text-slate-400 hover:text-white transition-colors duration-200 tracking-wide hidden sm:block"
          >
            {link.label}
          </Link>
        ))}

        {/* ── Hire CTA ─────────────────────────────── */}
        <a
          href="mailto:hello@example.com"
          className="
            relative ml-2 px-4 py-1.5 rounded-xl text-sm font-medium text-white
            overflow-hidden transition-all duration-300 cursor-pointer
            hover:shadow-[0_0_20px_rgba(56,189,248,0.18)]
          "
          style={{
            backgroundColor: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderTopColor: 'rgba(255,255,255,0.22)',
          }}
        >
          <span className="relative z-10">Hire me</span>
          {/* 3-second shimmer */}
          <span
            aria-hidden="true"
            className="absolute inset-0 -skew-x-[20deg] animate-shimmer pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.09) 50%, transparent 100%)',
              width: '40%',
            }}
          />
        </a>
      </nav>
    </motion.header>
  )
}

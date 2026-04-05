'use client'

/**
 * InfiniteScroll — Client Component
 *
 * Seamless ticker using CSS animation (not JS scroll).
 * The logo array is duplicated so the -50% translate creates a perfect loop.
 *
 * Masking: CSS mask-image fades logos out at left/right edges.
 * State:   grayscale(1) opacity-50 → full color + drop-shadow glow on hover.
 */

import { useState } from 'react'

export interface Technology {
  name: string
  /** Full-color hex used for the hover glow */
  color: string
}

/* ── Single pill ────────────────────────────────── */
function TechPill({ tech }: { tech: Technology }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      role="listitem"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl mx-3 cursor-default shrink-0 select-none glass-surface"
      style={{
        filter: hovered ? 'grayscale(0)' : 'grayscale(1)',
        opacity: hovered ? 1 : 0.45,
        color: hovered ? tech.color : '#94a3b8',
        boxShadow: hovered ? `0 0 22px 4px ${tech.color}28` : 'none',
        transition: 'filter 0.35s ease, opacity 0.35s ease, color 0.35s ease, box-shadow 0.35s ease',
      }}
    >
      <span className="text-sm font-medium whitespace-nowrap">{tech.name}</span>
    </div>
  )
}

/* ── Ticker ─────────────────────────────────────── */
export default function InfiniteScroll({ technologies }: { technologies: Technology[] }) {
  // Double the list so the -50% animation lands on an identical frame (seamless)
  const doubled = [...technologies, ...technologies]

  return (
    <div
      role="list"
      aria-label="Technology stack"
      className="relative overflow-hidden"
      style={{
        /* Fade edges so logos "dissolve" at the margins */
        maskImage:
          'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
      }}
    >
      <div
        className="flex animate-infinite-scroll"
        style={{ width: 'max-content' }}
        /* Pause on hover so users can inspect individual logos */
        onMouseEnter={(e) => {
          ;(e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused'
        }}
        onMouseLeave={(e) => {
          ;(e.currentTarget as HTMLDivElement).style.animationPlayState = 'running'
        }}
      >
        {doubled.map((tech, i) => (
          <TechPill key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  )
}

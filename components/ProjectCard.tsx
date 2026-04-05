'use client'

/**
 * ProjectCard — Client Component
 *
 * Bento-grid card with:
 *  – Glass hover: border-white/10 → border-white/40, backdrop-blur xl → 3xl
 *  – 3D tilt: Framer Motion whileHover perspective + rotateX/Y
 *  – Chroma-shadow: 60px+ blur, 0.15 opacity, category-keyed functional color
 *  – Category accent dot + glow overlay
 */

'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

/* ── Types ──────────────────────────────────────── */
export type ProjectCategory = 'frontend' | 'backend' | 'fullstack' | 'creative'

export interface ProjectData {
  id: string
  title: string
  description: string
  tags: string[]
  category: ProjectCategory
  href?: string
  year?: string
}

/* ── Chroma mappings ────────────────────────────── */
const ACCENTS: Record<ProjectCategory, string> = {
  frontend: '#38bdf8',   // sky-400  — matches spec
  backend:  '#4ade80',   // green-400 — matches spec
  fullstack:'#a78bfa',   // violet-400
  creative: '#fbbf24',   // amber-400
}

const SHADOWS: Record<ProjectCategory, string> = {
  frontend: '0 0 70px 24px rgba(56,  189, 248, 0.15)',
  backend:  '0 0 70px 24px rgba(74,  222, 128, 0.15)',
  fullstack:'0 0 70px 24px rgba(167, 139, 250, 0.15)',
  creative: '0 0 70px 24px rgba(251, 191,  36, 0.15)',
}

const GLOW_BG: Record<ProjectCategory, string> = {
  frontend: 'rgba(56,  189, 248, 0.12)',
  backend:  'rgba(74,  222, 128, 0.12)',
  fullstack:'rgba(167, 139, 250, 0.12)',
  creative: 'rgba(251, 191,  36, 0.12)',
}

/* ── Component ──────────────────────────────────── */
export default function ProjectCard({ project }: { project: ProjectData }) {
  const [hovered, setHovered] = useState(false)
  const accent = ACCENTS[project.category]

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        rotateX: 2,
        rotateY: -2,
        scale: 1.012,
        transition: { duration: 0.35, ease: 'easeOut' },
      }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      className="h-full"
    >
      {/* ── Glass panel ─────────────────────────────── */}
      <div
        className="relative h-full rounded-2xl p-6 flex flex-col transition-all duration-500 ease-out overflow-hidden"
        style={{
          backgroundColor: hovered ? 'rgba(255,255,255,0.055)' : 'rgba(255,255,255,0.03)',
          backdropFilter: hovered ? 'blur(64px)' : 'blur(24px)',
          WebkitBackdropFilter: hovered ? 'blur(64px)' : 'blur(24px)',
          border: `1px solid ${hovered ? 'rgba(255,255,255,0.40)' : 'rgba(255,255,255,0.10)'}`,
          borderTopColor: hovered ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.20)',
          boxShadow: hovered
            ? SHADOWS[project.category]
            : '0 4px 24px rgba(0,0,0,0.30)',
          transition:
            'background-color 0.5s ease, backdrop-filter 0.5s ease, border-color 0.3s ease, box-shadow 0.5s ease',
        }}
      >
        {/* Category meta */}
        <div className="flex items-center gap-2 mb-5">
          <span
            className="inline-block w-2 h-2 rounded-full transition-colors duration-300"
            style={{ backgroundColor: hovered ? accent : 'rgba(255,255,255,0.25)' }}
          />
          <span className="text-[10px] text-slate-500 uppercase tracking-[0.18em]">
            {project.category}
          </span>
          {project.year && (
            <span className="ml-auto text-[10px] text-slate-600">{project.year}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-semibold text-white tracking-tight mb-2 leading-snug">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[11px] text-slate-500 transition-colors duration-300"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA link */}
        {project.href && (
          <Link
            href={project.href}
            className="inline-flex items-center gap-1.5 text-xs font-medium transition-colors duration-200"
            style={{ color: hovered ? accent : 'rgba(255,255,255,0.35)' }}
          >
            View project
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        )}

        {/* ── Chroma bottom-glow overlay ─────────────── */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at 50% 110%, ${GLOW_BG[project.category]} 0%, transparent 65%)`,
            opacity: hovered ? 1 : 0,
          }}
        />
      </div>
    </motion.div>
  )
}

'use client'

/**
 * ProjectCard — Client Component (Dark Monochromatic)
 *
 * Glass panel with:
 *  – hover: glass intensifies from standard → dense
 *  – Framer Motion whileHover 3D tilt (perspective 1000, rotateX/Y ±2°)
 *  – Subtle white glow on hover
 */

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'

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

export default function ProjectCard({ project }: { project: ProjectData }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        rotateX: 2,
        rotateY: -2,
        scale: 1.012,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      className="h-full"
    >
      <div
        className="relative h-full rounded-2xl p-6 flex flex-col overflow-hidden transition-all duration-500 ease-out"
        style={{
          backgroundColor:      hovered ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
          backdropFilter:       'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border:               '1px solid',
          borderColor:          hovered ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.07)',
          boxShadow:            hovered
            ? '0 0 60px 10px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)'
            : 'inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        {/* Category meta */}
        <div className="flex items-center gap-2 mb-5">
          <span
            className="inline-block w-2 h-2 rounded-full transition-colors duration-300"
            style={{ backgroundColor: hovered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.15)' }}
          />
          <span className="text-[10px] text-white/25 uppercase tracking-[0.18em]">
            {project.category}
          </span>
          {project.year && (
            <span className="ml-auto text-[10px] text-white/20">{project.year}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold tracking-tight mb-2 leading-snug transition-colors duration-300"
          style={{ color: hovered ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.70)' }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-white/35 text-sm leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg text-[11px] transition-colors duration-300"
              style={{
                backgroundColor: hovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${hovered ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)'}`,
                color: hovered ? 'rgba(255,255,255,0.60)' : 'rgba(255,255,255,0.25)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        {project.href && (
          <Link
            href={project.href}
            className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200"
            style={{ color: hovered ? 'rgba(255,255,255,0.60)' : 'rgba(255,255,255,0.20)' }}
          >
            View project →
          </Link>
        )}

        {/* White glow overlay */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
          style={{
            background: 'radial-gradient(ellipse at 50% 115%, rgba(255,255,255,0.04) 0%, transparent 60%)',
            opacity: hovered ? 1 : 0,
          }}
        />
      </div>
    </motion.div>
  )
}

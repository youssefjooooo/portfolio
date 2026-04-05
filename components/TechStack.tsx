/**
 * TechStack — Server Component
 *
 * Static data + layout. The <InfiniteScroll /> ticker is a Client Component
 * that handles hover interaction and CSS animation.
 */

import InfiniteScroll, { type Technology } from '@/components/InfiniteScroll'

const TECHNOLOGIES: Technology[] = [
  { name: 'Next.js',       color: '#ffffff' },
  { name: 'TypeScript',    color: '#3178c6' },
  { name: 'React',         color: '#61dafb' },
  { name: 'Tailwind CSS',  color: '#38bdf8' },
  { name: 'Framer Motion', color: '#ff0080' },
  { name: 'Node.js',       color: '#4ade80' },
  { name: 'Rust',          color: '#f97316' },
  { name: 'PostgreSQL',    color: '#336791' },
  { name: 'Redis',         color: '#ef4444' },
  { name: 'Docker',        color: '#2496ed' },
  { name: 'Figma',         color: '#a259ff' },
  { name: 'Three.js',      color: '#ffffff' },
  { name: 'Prisma',        color: '#5a67d8' },
  { name: 'GraphQL',       color: '#e535ab' },
]

export default function TechStack() {
  return (
    <section id="stack" className="relative z-10 py-24 overflow-hidden">

      {/* Header */}
      <div className="px-4 md:px-8 lg:px-16 mb-14 max-w-7xl mx-auto">
        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-3">
          Technology Stack
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
          Tools I{' '}
          <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
            master
          </span>
        </h2>
      </div>

      {/* Ticker */}
      <InfiniteScroll technologies={TECHNOLOGIES} />

      {/* Subtle section divider */}
      <div className="mt-20 mx-4 md:mx-8 lg:mx-16 max-w-7xl border-t border-white/[0.05]" />
    </section>
  )
}

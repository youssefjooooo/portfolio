/**
 * TechStack — Editorial tech ticker (Apple Liquid Glass · Light)
 */

import { getTranslations } from 'next-intl/server'
import InfiniteScroll, { type Technology } from '@/components/InfiniteScroll'

const TECHNOLOGIES: Technology[] = [
  { name: 'Next.js'       },
  { name: 'TypeScript'    },
  { name: 'React'         },
  { name: 'Encore.ts'     },
  { name: 'Tailwind CSS'  },
  { name: 'Framer Motion' },
  { name: 'Node.js'       },
  { name: 'PostgreSQL'    },
  { name: 'Redis'         },
  { name: 'Docker'        },
  { name: 'Figma'         },
  { name: 'Three.js'      },
  { name: 'Prisma'        },
  { name: 'GraphQL'       },
]

export default async function TechStack() {
  const t = await getTranslations('stack')

  return (
    <section id="stack" className="relative z-10 py-32 overflow-hidden">
      <div className="px-4 md:px-8 lg:px-16 mb-14 max-w-7xl mx-auto">
        <p className="eyebrow mb-4">{t('tag')}</p>
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.92] max-w-3xl">
          <span className="text-ink-strong">{t('headline_1')}</span>{' '}
          <span className="serif-italic text-gradient">{t('headline_2')}</span>
        </h2>
      </div>

      <InfiniteScroll technologies={TECHNOLOGIES} />

      <div className="mt-20 mx-4 md:mx-8 lg:mx-16 divider" />
    </section>
  )
}

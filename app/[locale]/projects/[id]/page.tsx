import { setRequestLocale, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ProjectDetailHero      from '@/components/project-detail/ProjectDetailHero'
import ProjectFeaturesSection from '@/components/project-detail/ProjectFeaturesSection'
import ProjectStackSection    from '@/components/project-detail/ProjectStackSection'
import ProjectResultsSection  from '@/components/project-detail/ProjectResultsSection'
import ContactSection         from '@/components/ContactSection'

const VALID_IDS = ['1', '2', '3', '4', '5'] as const

// Tech name → message key suffix, per project
const STACK_KEYS: Record<string, Record<string, string>> = {
  '1': { 'Next.js': 'next', 'Encore.ts': 'encore', 'PostgreSQL': 'postgres', 'Redis': 'redis', 'WebSocket': 'websocket' },
  '2': { 'Encore.ts': 'encore', 'TypeScript': 'typescript', 'Kubernetes': 'kubernetes', 'gRPC': 'grpc', 'Redis': 'redis' },
  '3': { 'Next.js': 'next', 'Python': 'python', 'OpenAI': 'openai', 'PostgreSQL': 'postgres', 'Vercel': 'vercel' },
  '4': { 'Next.js': 'next', 'Sanity': 'sanity', 'Tailwind': 'tailwind', 'Framer Motion': 'framer' },
  '5': { 'React': 'react', 'TypeScript': 'typescript', 'Radix UI': 'radix', 'Storybook': 'storybook' },
}

const YEARS: Record<string, string> = { '1': '2024', '2': '2024', '3': '2023', '4': '2023', '5': '2023' }

type Props = { params: Promise<{ locale: string; id: string }> }

export function generateStaticParams() {
  return ['en', 'ar'].flatMap((locale) =>
    VALID_IDS.map((id) => ({ locale, id }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params
  if (!VALID_IDS.includes(id as typeof VALID_IDS[number])) return {}
  setRequestLocale(locale)
  const t = await getTranslations('work')
  return { title: t(`p${id}_title` as Parameters<typeof t>[0]) }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { locale, id } = await params

  if (!VALID_IDS.includes(id as typeof VALID_IDS[number])) notFound()

  setRequestLocale(locale)
  const t = await getTranslations('work')

  // Helper to read nested project-specific keys
  const p = (key: string) => t(`projects.${id}.${key}` as Parameters<typeof t>[0])

  // ── Core project data ────────────────────────────────────────
  const title       = t(`p${id}_title` as Parameters<typeof t>[0])
  const description = t(`p${id}_desc`  as Parameters<typeof t>[0])
  const category    = t(`p${id}_cat`   as Parameters<typeof t>[0])
  const tags        = t(`p${id}_tags`  as Parameters<typeof t>[0]).split(',')

  // ── Section labels (bilingual) ───────────────────────────────
  const backLabel      = t('detail_back'     as Parameters<typeof t>[0])
  const overviewLabel  = t('detail_overview' as Parameters<typeof t>[0])
  const challengeLabel = t('detail_challenge'as Parameters<typeof t>[0])
  const featuresLabel  = t('detail_features' as Parameters<typeof t>[0])
  const stackLabel     = t('detail_stack'    as Parameters<typeof t>[0])
  const resultsLabel   = t('detail_results'  as Parameters<typeof t>[0])

  // ── Features list ────────────────────────────────────────────
  const features = p('features').split('|')

  // ── Stack items ──────────────────────────────────────────────
  const stackMap   = STACK_KEYS[id]
  const stackItems = tags
    .filter((tag) => stackMap[tag])
    .map((tag) => ({ tech: tag, explanation: p(`stack_${stackMap[tag]}`) }))

  // ── Metrics ──────────────────────────────────────────────────
  const metrics = [1, 2, 3, 4].map((n) => ({
    label: p(`result_label_${n}`),
    value: parseInt(p(`result_value_${n}`), 10),
    unit:  p(`result_unit_${n}`),
  }))

  return (
    <>
      <ProjectDetailHero
        locale={locale}
        backLabel={backLabel}
        title={title}
        description={description}
        category={category}
        year={YEARS[id]}
        tags={tags}
      />
      <ProjectFeaturesSection
        overviewLabel={overviewLabel}
        challengeLabel={challengeLabel}
        featuresLabel={featuresLabel}
        overview={p('overview')}
        problem={p('problem')}
        features={features}
      />
      <ProjectStackSection
        stackLabel={stackLabel}
        items={stackItems}
      />
      <ProjectResultsSection
        resultsLabel={resultsLabel}
        metrics={metrics}
      />
      <ContactSection />
    </>
  )
}

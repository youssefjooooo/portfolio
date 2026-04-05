import { setRequestLocale } from 'next-intl/server'
import Hero           from '@/components/Hero'
import Stats          from '@/components/Stats'
import Philosophy     from '@/components/Philosophy'
import BentoGrid      from '@/components/BentoGrid'
import TechStack      from '@/components/TechStack'
import BuildingNow    from '@/components/BuildingNow'
import About          from '@/components/About'
import ContactSection from '@/components/ContactSection'

type Props = { params: Promise<{ locale: string }> }

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Hero />
      <Stats />
      <Philosophy />
      <BentoGrid />
      <TechStack />
      <BuildingNow />
      <About />
      <ContactSection />
    </>
  )
}

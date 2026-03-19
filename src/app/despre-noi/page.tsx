import type { Metadata } from 'next'
import { DespreNoiPage } from '@/components/DespreNoiPage'

export const metadata: Metadata = {
  title: 'Despre noi — Smile Dent Team | 15 ani de stomatologie digitala',
  description: 'Despre Smile Dent Team: 15 ani de excelenta in stomatologie digitala, 600+ specialisti, 40.000+ pacienti tratati, 9 filiale in 4 tari. Descopera povestea, valorile si certificarile noastre internationale.',
  keywords: 'smile dent team, stomatologie chisinau, clinica dentara, implant dentar, coroane dentare, digital check-up, stomatologie digitala, clinica dentara moldova, dentist chisinau',
  openGraph: {
    title: 'Despre noi — Smile Dent Team',
    description: '15 ani de excelenta in stomatologie digitala. 600+ specialisti, 40.000+ pacienti, 9 filiale in 4 tari.',
    type: 'website',
    url: 'https://smiledentteam.vercel.app/despre-noi',
  },
}

export default function Page() {
  return <DespreNoiPage />
}

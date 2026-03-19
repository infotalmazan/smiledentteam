import type { Metadata } from 'next'
import { CarierePage } from '@/components/CarierePage'

export const metadata: Metadata = {
  title: 'Cariere — Smile Dent Team | Alatura-te echipei noastre',
  description: 'Cariere la Smile Dent Team: pozitii deschise pentru medici stomatologi, asistenti medicali, marketing si administratie. 600+ angajati, 9 filiale in 4 tari. Beneficii premium, dezvoltare profesionala si tehnologii de top.',
  keywords: 'cariere stomatologie, job dentist chisinau, angajare clinica dentara, medic stomatolog job, asistent medical dentar, cariere smile dent team',
  openGraph: {
    title: 'Cariere — Smile Dent Team',
    description: 'Construieste viitorul stomatologiei. Pozitii deschise pentru profesionisti in 4 tari.',
    type: 'website',
    url: 'https://smiledentteam.vercel.app/cariere',
  },
}

export default function Page() {
  return <CarierePage />
}

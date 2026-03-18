import type { Metadata } from 'next'
import { ServiciiPage } from '@/components/ServiciiPage'

export const metadata: Metadata = {
  title: 'Servicii — Smile Dent Team',
  description: '6 specialități stomatologice cu tehnologie digitală. Estetică, Terapie, Chirurgie, Implantologie, Protetică, Ortodonție. Programează-te acum.',
}

export default function Page() {
  return <ServiciiPage />
}

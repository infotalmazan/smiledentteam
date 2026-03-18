import type { Metadata } from 'next'
import { EchipaPage } from '@/components/EchipaPage'

export const metadata: Metadata = {
  title: 'Echipa — Smile Dent Team',
  description: '600+ specialiști, 15 ani de experiență. Cunoaște echipa Smile Dent Team — chirurgi, implantologi, esteticieni, ortodonți.',
}

export default function Page() {
  return <EchipaPage />
}

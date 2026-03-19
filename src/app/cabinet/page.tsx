import type { Metadata } from 'next'
import { CabinetDashboard } from '@/components/CabinetPage'

export const metadata: Metadata = {
  title: 'Cabinet Personal — Smile Dent Team',
  description: 'Cabinetul tău personal Smile Dent Team. Programări, documente, mesaje, istoric tratamente.',
}

export default function Page() {
  return <CabinetDashboard />
}

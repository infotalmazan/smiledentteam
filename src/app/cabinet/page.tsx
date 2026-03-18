import type { Metadata } from 'next'
import { DashboardPage } from '@/components/Homepage'

export const metadata: Metadata = {
  title: 'Cabinet Personal — Smile Dent Team',
  description: 'Cabinetul tău personal Smile Dent Team.',
}

export default function Page() {
  return <DashboardPage />
}

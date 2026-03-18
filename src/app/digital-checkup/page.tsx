import type { Metadata } from 'next'
import { DigitalCheckupPage } from '@/components/Homepage'

export const metadata: Metadata = {
  title: 'Digital Check-Up — Smile Dent Team',
  description: 'Digital Check-Up: primul pas către un zâmbet sănătos. Procedură modernă, rapidă și precisă. Programează-te acum — consultație gratuită.',
}

export default function Page() {
  return <DigitalCheckupPage />
}

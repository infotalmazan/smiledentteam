import type { Metadata } from 'next'
import { RecenziiPage } from '@/components/RecenziiPage'

export const metadata: Metadata = {
  title: 'Recenzii — Smile Dent Team',
  description: 'Peste 1 200 de recenzii verificate pe Google. Nota medie 4.9/5.0. Ce spun pacientii despre experienta lor la Smile Dent Team.',
}

export default function Page() {
  return <RecenziiPage />
}

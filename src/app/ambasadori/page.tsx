import type { Metadata } from 'next'
import { AmbasadoriPage } from '@/components/AmbasadoriPage'

export const metadata: Metadata = {
  title: 'Ambasadori — Smile Dent Team',
  description: 'Personalități care ne-au ales și ne reprezintă. Cunoaște ambasadorii Smile Dent Team.',
}

export default function Page() {
  return <AmbasadoriPage />
}

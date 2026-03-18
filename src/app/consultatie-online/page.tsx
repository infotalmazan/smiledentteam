import type { Metadata } from 'next'
import { ConsultatieOnlinePage } from '@/components/ConsultatieOnline'

export const metadata: Metadata = {
  title: 'Consultație Online — Smile Dent Team',
  description: 'Ești în străinătate? Începe cu o consultație online. Trimite tomografia, discutăm la distanță, primești un plan personalizat.',
}

export default function Page() {
  return <ConsultatieOnlinePage />
}

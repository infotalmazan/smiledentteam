import type { Metadata } from 'next'
import { LoginPage } from '@/components/Homepage'

export const metadata: Metadata = {
  title: 'Autentificare — Smile Dent Team',
  description: 'Accesează contul tău Smile Dent Team pentru a vedea istoricul tratamentelor, programările și documentele tale.',
}

export default function Page() {
  return <LoginPage />
}

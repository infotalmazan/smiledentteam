import type { Metadata } from 'next'
import { AuthLoginPage } from '@/components/LoginPage'

export const metadata: Metadata = {
  title: 'Autentificare — Cabinetul Meu | Smile Dent Team',
  description: 'Accesează cabinetul tău personal Smile Dent Team. Programări, dosarul digital, mesaje cu medicul, istoric tratamente.',
}

export default function Page() {
  return <AuthLoginPage />
}

import type { Metadata } from 'next'
import { ContactePage } from '@/components/ContactePage'

export const metadata: Metadata = {
  title: 'Contacte — Smile Dent Team | 5 filiale in 2 tari',
  description: 'Contacteaza Smile Dent Team: 5 filiale in Chisinau, Iasi si Bucuresti. Telefon, WhatsApp, email. Program Luni-Sambata. Raspundem in maxim 2 ore. Programeaza consultatie gratuita.',
  keywords: 'contact smile dent team, clinica dentara chisinau, stomatolog chisinau adresa, programare stomatolog, telefon clinica dentara, smile dent iasi, smile dent bucuresti',
  openGraph: {
    title: 'Contacte — Smile Dent Team',
    description: '5 filiale in 2 tari. Telefon, WhatsApp, email. Raspundem in maxim 2 ore.',
    type: 'website',
    url: 'https://smiledentteam.vercel.app/contacte',
  },
}

export default function Page() {
  return <ContactePage />
}

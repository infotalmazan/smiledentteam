import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Smile Dent Team — Clinică Stomatologică Digitală',
  description: 'Clinică stomatologică digitală Nr.1 în Moldova. 600+ specialiști, 40.000+ pacienți, 15 ani de excelență. Digital Check-Up, Implantologie 3D, Estetică dentară.',
  keywords: 'stomatologie, clinica dentara, chisinau, implant dentar, digital smile design, smile dent team',
  openGraph: {
    title: 'Smile Dent Team — ALEGE-TE PE TINE',
    description: 'Clinică stomatologică digitală Nr.1 în Moldova.',
    url: 'https://smiledent.md',
    siteName: 'Smile Dent Team',
    locale: 'ro_MD',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  )
}

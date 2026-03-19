import type { Metadata } from 'next'
import { TehnologiiPage } from '@/components/TehnologiiPage'

export const metadata: Metadata = {
  title: 'Tehnologii — Smile Dent Team | Stomatologie 100% digitala',
  description: 'Tehnologii de ultima generatie la Smile Dent Team: Scanner 3Shape Trios 5, Tomografie 3D CBCT, Digital Smile Design, CAD/CAM, Ghid Chirurgical 3D, Piezosurgery, Laser Dentar. Investitie de peste €2M in echipamente premium.',
  keywords: 'stomatologie digitala, scanner 3D dentar, tomografie CBCT, digital smile design, CAD CAM dentar, ghid chirurgical 3D, piezosurgery, laser dentar, 3Shape Trios, Straumann, Nobel Biocare',
  openGraph: {
    title: 'Tehnologii — Smile Dent Team',
    description: '8 tehnologii de top mondial pentru stomatologie 100% digitala. Scanner 3D, CBCT, DSD, CAD/CAM si mai mult.',
    type: 'website',
    url: 'https://smiledentteam.vercel.app/tehnologii',
  },
}

export default function Page() {
  return <TehnologiiPage />
}

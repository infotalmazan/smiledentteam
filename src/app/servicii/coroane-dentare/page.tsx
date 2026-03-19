import type { Metadata } from 'next'
import { CoraneDentarePage } from '@/components/CoraneDentarePage'

export const metadata: Metadata = {
  title: 'Coroane Dentare — Smile Dent Team | De la 200€ | Zirconiu & E-max',
  description: 'Coroane dentare la Smile Dent Team: de la 200€, zirconiu si E-max, design CAD personalizat, scanare 3Shape, garantie pe viata. Gata in 2-5 zile. Rate 0%. Consultatie GRATUITA.',
  keywords: 'coroane dentare, coroana zirconiu, coroana e-max, protetica dentara, punte dentara, coroana pe implant, coroane dentare chisinau, coroane dentare pret, cat costa coroana dentara',
  openGraph: {
    title: 'Coroane Dentare — Smile Dent Team | De la 200€',
    description: 'Coroane premium zirconiu & E-max. Design CAD, scanare 3Shape, garantie pe viata. Rate 0%.',
    type: 'website',
    url: 'https://smiledentteam.vercel.app/servicii/coroane-dentare',
    images: [{ url: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200&h=630&fit=crop', width: 1200, height: 630 }],
  },
}

function ServiceJsonLd() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      name: 'Coroane Dentare',
      description: 'Coroane dentare CAD/CAM din zirconiu si E-max cu design digital personalizat si garantie pe viata.',
      procedureType: 'Therapeutic',
      bodyLocation: 'Mouth',
      url: 'https://smiledentteam.vercel.app/servicii/coroane-dentare',
      provider: {
        '@type': 'Dentist',
        name: 'Smile Dent Team',
        url: 'https://smiledentteam.vercel.app',
        telephone: '+373-22-881-414',
        priceRange: '€€',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasa', item: 'https://smiledentteam.vercel.app' },
        { '@type': 'ListItem', position: 2, name: 'Servicii', item: 'https://smiledentteam.vercel.app/servicii' },
        { '@type': 'ListItem', position: 3, name: 'Coroane Dentare', item: 'https://smiledentteam.vercel.app/servicii/coroane-dentare' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Cat costa o coroana dentara?', acceptedAnswer: { '@type': 'Answer', text: 'Pretul porneste de la 200€ pentru coroana zirconiu. E-max: de la 250€. Consultatia este GRATUITA.' } },
        { '@type': 'Question', name: 'Cat dureaza o coroana dentara?', acceptedAnswer: { '@type': 'Answer', text: 'Zirconiu: 20+ ani. E-max: 15+ ani. Oferim garantie pe viata pe structura.' } },
        { '@type': 'Question', name: 'Se vede ca este coroana?', acceptedAnswer: { '@type': 'Answer', text: 'Nu. Coroanele moderne din zirconiu si E-max imita perfect dintele natural.' } },
      ],
    },
  ]
  return <>{jsonLd.map((ld, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />)}</>
}

export default function Page() {
  return (
    <>
      <ServiceJsonLd />
      <CoraneDentarePage />
    </>
  )
}

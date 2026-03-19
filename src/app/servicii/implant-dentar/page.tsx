import type { Metadata } from 'next'
import { ImplantDentarPage } from '@/components/ImplantDentarPage'

export const metadata: Metadata = {
  title: 'Implant Dentar — Smile Dent Team | De la 350€ | Straumann & Nobel Biocare',
  description: 'Implant dentar la Smile Dent Team: de la 350€, planificare 3D completa, Straumann si Nobel Biocare, rata succes 99.2%. Insertie ghidata minim invaziva. Rate 0%. Consultatie GRATUITA.',
  keywords: 'implant dentar, implant dentar pret, implant dentar chisinau, implant straumann, implant nobel biocare, implantologie, dinti noi, implant dentar moldova, implant dentar iasi, cat costa implant dentar',
  openGraph: {
    title: 'Implant Dentar — Smile Dent Team | De la 350€',
    description: 'Implanturi premium Straumann & Nobel Biocare. Planificare 3D, insertie ghidata, rata succes 99.2%. Rate 0% disponibile.',
    type: 'website',
    url: 'https://smiledentteam.vercel.app/servicii/implant-dentar',
    images: [{ url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&h=630&fit=crop', width: 1200, height: 630 }],
  },
}

function ServiceJsonLd() {
  const jsonLd = [
    // Service schema
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      name: 'Implant Dentar',
      description: 'Implant dentar cu planificare 3D completa, implanturi Straumann si Nobel Biocare, rata de succes 99.2%.',
      procedureType: 'Surgical',
      bodyLocation: 'Mouth',
      url: 'https://smiledentteam.vercel.app/servicii/implant-dentar',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&h=630&fit=crop',
      provider: {
        '@type': 'Dentist',
        name: 'Smile Dent Team',
        url: 'https://smiledentteam.vercel.app',
        address: { '@type': 'PostalAddress', streetAddress: 'str. Ismail 88', addressLocality: 'Chisinau', addressCountry: 'MD' },
        telephone: '+373-22-881-414',
        priceRange: '€€',
      },
    },
    // Breadcrumbs
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasa', item: 'https://smiledentteam.vercel.app' },
        { '@type': 'ListItem', position: 2, name: 'Servicii', item: 'https://smiledentteam.vercel.app/servicii' },
        { '@type': 'ListItem', position: 3, name: 'Implant Dentar', item: 'https://smiledentteam.vercel.app/servicii/implant-dentar' },
      ],
    },
    // FAQ
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Cat costa un implant dentar la SDT?', acceptedAnswer: { '@type': 'Answer', text: 'Pretul porneste de la 350€ pentru implant Straumann/Nobel Biocare. Pachetul complet (implant + bont + coroana zirconiu) porneste de la 800€. Consultatia initiala este GRATUITA.' } },
        { '@type': 'Question', name: 'Este dureros implantul dentar?', acceptedAnswer: { '@type': 'Answer', text: 'Nu. Procedura se realizeaza sub anestezie locala moderna. Disconfortul post-operator dureaza 2-3 zile si este gestionabil cu analgezice obisnuite.' } },
        { '@type': 'Question', name: 'Cat dureaza un implant dentar?', acceptedAnswer: { '@type': 'Answer', text: 'Cu igiena corecta si controale regulate, implantul poate dura toata viata. Oferim garantie pe viata pe implant.' } },
        { '@type': 'Question', name: 'Ce marca de implanturi folositi?', acceptedAnswer: { '@type': 'Answer', text: 'Folosim exclusiv Straumann (Elvetia) si Nobel Biocare (Suedia) — cele mai studiate sisteme de implanturi din lume, cu rata de succes de peste 99%.' } },
      ],
    },
  ]

  return (
    <>
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
    </>
  )
}

export default function Page() {
  return (
    <>
      <ServiceJsonLd />
      <ImplantDentarPage />
    </>
  )
}

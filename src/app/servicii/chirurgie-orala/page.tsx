import type { Metadata } from 'next'
import { ChirurgiePage } from '@/components/ChirurgiePage'

export const metadata: Metadata = {
  title: 'Chirurgie Orala — Piezosurgery & Ghidaj 3D | Smile Dent Team | De la 200\u20AC',
  description: 'Chirurgie orala de precizie la Smile Dent Team. Extractii complexe, augmentare osoasa, sinus lifting. Piezosurgery, ghid 3D, sedare constienta. 5000+ interventii.',
  keywords: 'chirurgie orala, extractie molar de minte, augmentare osoasa, sinus lifting, piezosurgery, sedare constienta, chirurg oral chisinau, extractie chirurgicala, chirurgie dentara',
  openGraph: {
    title: 'Chirurgie Orala — Piezosurgery & Ghidaj 3D | Smile Dent Team',
    description: 'Chirurgie orala de precizie. Piezosurgery, ghid 3D, sedare constienta. 5000+ interventii realizate. De la 200\u20AC.',
    type: 'website',
    url: 'https://smiledentteam.vercel.app/servicii/chirurgie-orala',
    images: [{ url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200&h=630&fit=crop', width: 1200, height: 630 }],
  },
}

function ServiceJsonLd() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      name: 'Chirurgie Orala',
      description: 'Chirurgie orala de precizie cu piezosurgery, ghid chirurgical 3D si sedare constienta. Extractii complexe, augmentare osoasa, sinus lifting.',
      procedureType: 'Surgical',
      bodyLocation: 'Mouth',
      url: 'https://smiledentteam.vercel.app/servicii/chirurgie-orala',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200&h=630&fit=crop',
      provider: {
        '@type': 'Dentist',
        name: 'Smile Dent Team',
        url: 'https://smiledentteam.vercel.app',
        address: { '@type': 'PostalAddress', streetAddress: 'str. Ismail 88', addressLocality: 'Chisinau', addressCountry: 'MD' },
        telephone: '+373-22-881-414',
        priceRange: '\u20AC\u20AC',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasa', item: 'https://smiledentteam.vercel.app' },
        { '@type': 'ListItem', position: 2, name: 'Servicii', item: 'https://smiledentteam.vercel.app/servicii' },
        { '@type': 'ListItem', position: 3, name: 'Chirurgie Orala', item: 'https://smiledentteam.vercel.app/servicii/chirurgie-orala' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Cat costa o extractie chirurgicala?', acceptedAnswer: { '@type': 'Answer', text: 'Extractia chirurgicala porneste de la 200 euro si include anestezie, extractia, sutura si controalele post-operatorii. Sedarea constienta se adauga separat.' } },
        { '@type': 'Question', name: 'Ce este sedarea constienta?', acceptedAnswer: { '@type': 'Answer', text: 'Sedarea constienta este o tehnica de anxioliza administrata intravenos de un medic anesteziolog. Esti relaxat, somnoros dar treaz, nu simti durere si nu ai amintiri neplacute.' } },
        { '@type': 'Question', name: 'Cat dureaza recuperarea?', acceptedAnswer: { '@type': 'Answer', text: 'Edemul dureaza 3-5 zile. Durerile sunt usoare si controlate cu analgezice. Revenirea la normal: 7-10 zile. Vindecare osoasa completa: 2-3 luni.' } },
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
      <ChirurgiePage />
    </>
  )
}

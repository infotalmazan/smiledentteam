import type { Metadata } from 'next'
import { FateteDentarePage } from '@/components/FateteDentarePage'

export const metadata: Metadata = {
  title: 'Fatete Dentare cu Digital Smile Design | Smile Dent Team | De la 7000\u20AC',
  description: 'Fatete dentare premium cu Digital Smile Design la Smile Dent Team. Ceramica E-max si zirconiu. Simulare fotorealista, mock-up fizic. Garantie 15-25 ani. Consultatie DSD.',
  keywords: 'fatete dentare, fatete dentare pret, smile design, digital smile design, fatete e-max, fatete zirconiu, fatete dentare chisinau, estetica dentara, hollywood smile, fatete ceramice',
  openGraph: {
    title: 'Fatete Dentare cu Digital Smile Design | Smile Dent Team',
    description: 'Fatete dentare premium cu simulare fotorealista. E-max si zirconiu. Garantie 15-25 ani. De la 7000\u20AC.',
    type: 'website',
    url: 'https://smiledentteam.vercel.app/servicii/fatete-dentare',
    images: [{ url: 'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=1200&h=630&fit=crop', width: 1200, height: 630 }],
  },
}

function ServiceJsonLd() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      name: 'Fatete Dentare cu Digital Smile Design',
      description: 'Fatete dentare premium cu Digital Smile Design — simulare fotorealista, mock-up fizic, ceramica E-max si zirconiu premium.',
      procedureType: 'NoninvasiveProcedure',
      bodyLocation: 'Mouth',
      url: 'https://smiledentteam.vercel.app/servicii/fatete-dentare',
      image: 'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=1200&h=630&fit=crop',
      provider: {
        '@type': 'Dentist',
        name: 'Smile Dent Team',
        url: 'https://smiledentteam.vercel.app',
        address: { '@type': 'PostalAddress', streetAddress: 'str. Ismail 88', addressLocality: 'Chisinau', addressCountry: 'MD' },
        telephone: '+373-22-881-414',
        priceRange: '\u20AC\u20AC\u20AC',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasa', item: 'https://smiledentteam.vercel.app' },
        { '@type': 'ListItem', position: 2, name: 'Servicii', item: 'https://smiledentteam.vercel.app/servicii' },
        { '@type': 'ListItem', position: 3, name: 'Fatete Dentare', item: 'https://smiledentteam.vercel.app/servicii/fatete-dentare' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Cat costa fatetele dentare?', acceptedAnswer: { '@type': 'Answer', text: 'Investitia porneste de la 7.000 euro pentru 4-6 fatete E-max cu Digital Smile Design complet. Pretul depinde de numarul de fatete si materialul ales.' } },
        { '@type': 'Question', name: 'Cat dureaza fatetele dentare?', acceptedAnswer: { '@type': 'Answer', text: 'Fatetele E-max au durabilitate de 15-20+ ani, iar cele din zirconiu 20-25+ ani. Cu igiena corecta, pot dura o viata intreaga.' } },
        { '@type': 'Question', name: 'Se vede ca sunt fatete dentare?', acceptedAnswer: { '@type': 'Answer', text: 'Nu. Fatetele premium DSD reproduc translucenta, culoarea si textura naturala a dintilor. Sunt practic imposibil de deosebit de dintii naturali.' } },
        { '@type': 'Question', name: 'Ce este Digital Smile Design?', acceptedAnswer: { '@type': 'Answer', text: 'DSD este o tehnologie care proiecteaza zambetul ideal bazat pe proportiile faciale ale pacientului. Vedeti simularea fotorealista inainte de orice interventie.' } },
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
      <FateteDentarePage />
    </>
  )
}

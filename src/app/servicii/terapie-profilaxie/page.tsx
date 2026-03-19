import type { Metadata } from 'next'
import { TerapiePage } from '@/components/TerapiePage'

export const metadata: Metadata = {
  title: 'Terapie & Profilaxie Dentara | Smile Dent Team | De la 25\u20AC',
  description: 'Terapie si profilaxie dentara la Smile Dent Team. Igienizare profesionala de la 25\u20AC, fluoruire, sigilare, tratament carii. Proceduri fara durere. Preventie accesibila.',
  keywords: 'igienizare dentara, detartraj, profilaxie dentara, fluoruire, tratament carie, igiena orala, preventie dentara, detartraj pret, curatare dinti, parodontologie',
  openGraph: {
    title: 'Terapie & Profilaxie Dentara | Smile Dent Team',
    description: 'Igienizare profesionala de la 25\u20AC. Proceduri fara durere. Preventie accesibila pentru toata familia.',
    type: 'website',
    url: 'https://smiledentteam.vercel.app/servicii/terapie-profilaxie',
    images: [{ url: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=1200&h=630&fit=crop', width: 1200, height: 630 }],
  },
}

function ServiceJsonLd() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      name: 'Terapie si Profilaxie Dentara',
      description: 'Igienizare profesionala, fluoruire, sigilare fisuri, tratament carii si parodontologie. Proceduri fara durere, preventie accesibila.',
      procedureType: 'NoninvasiveProcedure',
      bodyLocation: 'Mouth',
      url: 'https://smiledentteam.vercel.app/servicii/terapie-profilaxie',
      image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=1200&h=630&fit=crop',
      provider: {
        '@type': 'Dentist',
        name: 'Smile Dent Team',
        url: 'https://smiledentteam.vercel.app',
        address: { '@type': 'PostalAddress', streetAddress: 'str. Ismail 88', addressLocality: 'Chisinau', addressCountry: 'MD' },
        telephone: '+373-22-881-414',
        priceRange: '\u20AC',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasa', item: 'https://smiledentteam.vercel.app' },
        { '@type': 'ListItem', position: 2, name: 'Servicii', item: 'https://smiledentteam.vercel.app/servicii' },
        { '@type': 'ListItem', position: 3, name: 'Terapie & Profilaxie', item: 'https://smiledentteam.vercel.app/servicii/terapie-profilaxie' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Cat costa igienizarea profesionala?', acceptedAnswer: { '@type': 'Answer', text: 'Igienizarea profesionala (detartraj + airflow + periaj profesional) porneste de la 25 euro la Smile Dent Team.' } },
        { '@type': 'Question', name: 'Cat de des trebuie sa fac igienizare?', acceptedAnswer: { '@type': 'Answer', text: 'Recomandam igienizare profesionala de 2 ori pe an, la fiecare 6 luni. Pacientii cu probleme parodontale pot necesita vizite mai frecvente.' } },
        { '@type': 'Question', name: 'Este dureroasa igienizarea profesionala?', acceptedAnswer: { '@type': 'Answer', text: 'Nu. Igienizarea moderna cu ultrasunete si airflow este complet nedureroasa. Nivel durere: 0/10.' } },
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
      <TerapiePage />
    </>
  )
}

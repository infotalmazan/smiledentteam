import type { Metadata } from 'next'
import { AllOnPage } from '@/components/AllOnPage'

export const metadata: Metadata = {
  title: 'Dinti Ficsi / All-On — Smile Dent Team | De la 2997\u20AC | All-on-4 & All-on-6',
  description: 'Dinti ficsi pe implanturi la Smile Dent Team: All-on-4 de la 2997\u20AC, All-on-6 de la 4500\u20AC. Arcada completa fixa in aceeasi zi. Sedare constienta, planificare 3D, Straumann. Rate 0%. Consultatie GRATUITA.',
  keywords: 'all-on-4, all-on-6, dinti ficsi, dinti ficsi pe implanturi, reabilitare completa, proteza fixa, edentatie totala, all on 4 pret, all on 6 pret, dinti ficsi intr-o zi, proteza pe implanturi chisinau',
  openGraph: {
    title: 'Dinti Ficsi / All-On — Smile Dent Team | De la 2997\u20AC',
    description: 'Arcada completa fixa pe implanturi Straumann. Dinti ficsi in aceeasi zi. All-on-4 de la 2997\u20AC. Rate 0%.',
    type: 'website',
    url: 'https://smiledentteam.vercel.app/servicii/dinti-ficsi-all-on',
    images: [{ url: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&h=630&fit=crop', width: 1200, height: 630 }],
  },
}

function ServiceJsonLd() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      name: 'Dinti Ficsi / All-On (All-on-4, All-on-6)',
      description: 'Reabilitare completa pe implanturi: arcada fixa in aceeasi zi. All-on-4 si All-on-6 cu implanturi Straumann, sedare constienta, planificare 3D.',
      procedureType: 'Surgical',
      bodyLocation: 'Mouth',
      url: 'https://smiledentteam.vercel.app/servicii/dinti-ficsi-all-on',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&h=630&fit=crop',
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
        { '@type': 'ListItem', position: 3, name: 'Dinti Ficsi / All-On', item: 'https://smiledentteam.vercel.app/servicii/dinti-ficsi-all-on' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Cat costa All-on-4?', acceptedAnswer: { '@type': 'Answer', text: 'All-on-4 porneste de la 2997\u20AC per arcada si include 4 implanturi Straumann, proteza provizorie fixa si controale. Consultatia este GRATUITA.' } },
        { '@type': 'Question', name: 'Pot primi dinti ficsi in aceeasi zi?', acceptedAnswer: { '@type': 'Answer', text: 'Da! Proteza provizorie fixa se monteaza pe implanturi in aceeasi zi. Pleci din clinica cu dinti ficsi.' } },
        { '@type': 'Question', name: 'Care este diferenta intre All-on-4 si All-on-6?', acceptedAnswer: { '@type': 'Answer', text: 'All-on-4 foloseste 4 implanturi angulate, ideal pentru atrofie osoasa moderata. All-on-6 foloseste 6 implanturi drepte, pentru atrofie severa.' } },
        { '@type': 'Question', name: 'Este dureroasa interventia?', acceptedAnswer: { '@type': 'Answer', text: 'Nu. Interventia se realizeaza sub sedare constienta. Disconfortul post-operator este moderat si dureaza 3-5 zile.' } },
      ],
    },
  ]
  return <>{jsonLd.map((ld, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />)}</>
}

export default function Page() {
  return (
    <>
      <ServiceJsonLd />
      <AllOnPage />
    </>
  )
}

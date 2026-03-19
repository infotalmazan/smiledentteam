import type { Metadata } from 'next'
import { OrtodontiePage } from '@/components/OrtodontiePage'

export const metadata: Metadata = {
  title: 'Ortodontie Digitala — Invisalign & Brackets | Smile Dent Team | De la 42\u20AC/luna',
  description: 'Ortodontie digitala la Smile Dent Team: Invisalign de la 1000\u20AC, brackets de la 800\u20AC. Simulare ClinCheck 3D, rate de la 42\u20AC/luna. Pentru adolescenti si adulti.',
  keywords: 'ortodontie, invisalign, brackets, aparat dentar, invisalign pret, ortodont chisinau, aliniere dentara, dinti strambi, ortodontie copii, ortodontie adulti, clincheck',
  openGraph: {
    title: 'Ortodontie Digitala — Invisalign & Brackets | Smile Dent Team',
    description: 'Invisalign si brackets cu simulare ClinCheck 3D. Rate de la 42\u20AC/luna. Pentru adolescenti si adulti.',
    type: 'website',
    url: 'https://smiledentteam.vercel.app/servicii/ortodontie-digitala',
    images: [{ url: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1200&h=630&fit=crop', width: 1200, height: 630 }],
  },
}

function ServiceJsonLd() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalProcedure',
      name: 'Ortodontie Digitala',
      description: 'Tratament ortodontic cu Invisalign si brackets. Simulare ClinCheck 3D, plan digital complet, rate lunare fara dobanda.',
      procedureType: 'NoninvasiveProcedure',
      bodyLocation: 'Mouth',
      url: 'https://smiledentteam.vercel.app/servicii/ortodontie-digitala',
      image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=1200&h=630&fit=crop',
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
        { '@type': 'ListItem', position: 3, name: 'Ortodontie Digitala', item: 'https://smiledentteam.vercel.app/servicii/ortodontie-digitala' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Cat costa Invisalign?', acceptedAnswer: { '@type': 'Answer', text: 'Invisalign la SDT porneste de la 1000 euro. Pretul include consultatie, scanare 3D, simulare ClinCheck, toate seturile de aliniere si controale lunare. Rate de la 42 euro/luna.' } },
        { '@type': 'Question', name: 'Cat dureaza tratamentul ortodontic?', acceptedAnswer: { '@type': 'Answer', text: 'Durata depinde de complexitate: cazuri usoare 6-12 luni, medii 12-18 luni, complexe pana la 24 luni. Simularea ClinCheck estimeaza durata exacta inainte de a incepe.' } },
        { '@type': 'Question', name: 'Invisalign sau brackets — ce e mai bun?', acceptedAnswer: { '@type': 'Answer', text: 'Depinde de caz. Invisalign este aproape invizibil si se scoate la masa. Brackets-urile sunt fixe si recomandate pentru cazuri complexe. Ortodontul va recomanda optiunea potrivita.' } },
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
      <OrtodontiePage />
    </>
  )
}

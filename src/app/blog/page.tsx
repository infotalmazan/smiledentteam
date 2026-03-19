import type { Metadata } from 'next'
import { BlogPage } from '@/components/BlogPage'

export const metadata: Metadata = {
  title: 'Blog — Smile Dent Team | Articole, Podcast, Ghiduri Stomatologice',
  description: 'Blog Smile Dent Team: articole de specialitate, podcast, serial video, cazuri clinice si ghiduri practice. Continut scris de medici stomatologi cu experienta. Informatii verificate despre implant dentar, fatete, ortodontie, Digital Check-Up.',
  keywords: 'blog stomatologie, articole dentare, podcast stomatologic, ghid implant dentar, fatete dentare ghid, ortodontie invisalign, igiena orala, cazuri clinice dentare, sfaturi stomatolog',
  openGraph: {
    title: 'Blog — Smile Dent Team',
    description: 'Articole, podcast-uri, ghiduri si cazuri clinice scrise de medici stomatologi. Informatii verificate despre sanatatea orala.',
    type: 'website',
    url: 'https://smiledentteam.vercel.app/blog',
  },
}

// JSON-LD Structured Data for Blog listing
function BlogJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog Smile Dent Team',
    description: 'Articole de specialitate, podcast-uri, seriale video si ghiduri practice despre stomatologie digitala.',
    url: 'https://smiledentteam.vercel.app/blog',
    publisher: {
      '@type': 'Organization',
      name: 'Smile Dent Team',
      url: 'https://smiledentteam.vercel.app',
      logo: {
        '@type': 'ImageObject',
        url: 'https://smiledentteam.vercel.app/images/logo/logo.svg',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'str. Ismail 88',
        addressLocality: 'Chisinau',
        addressCountry: 'MD',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+373-22-881-414',
        contactType: 'customer service',
        availableLanguage: ['Romanian', 'Russian', 'English'],
      },
    },
    inLanguage: 'ro',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function Page() {
  return (
    <>
      <BlogJsonLd />
      <BlogPage />
    </>
  )
}

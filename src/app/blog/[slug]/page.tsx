import type { Metadata } from 'next'
import { BLOG_ARTICLES } from '@/lib/blog-data'
import { BlogArticleDetail } from '@/components/BlogArticleDetail'
import { notFound } from 'next/navigation'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return BLOG_ARTICLES.map(a => ({ slug: a.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const article = BLOG_ARTICLES.find(a => a.slug === params.slug)
  if (!article) return { title: 'Articol negasit' }

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: article.tags.join(', '),
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: 'article',
      url: `https://smiledentteam.vercel.app/blog/${article.slug}`,
      images: [{ url: article.image, width: 1200, height: 630 }],
      publishedTime: article.date,
      authors: [article.author.name],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle,
      description: article.metaDescription,
      images: [article.image],
    },
  }
}

function ArticleJsonLd({ slug }: { slug: string }) {
  const article = BLOG_ARTICLES.find(a => a.slug === slug)
  if (!article) return null

  const jsonLd: Record<string, unknown>[] = [
    // Article schema
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.metaDescription,
      image: article.image,
      datePublished: article.date,
      dateModified: article.date,
      author: {
        '@type': 'Person',
        name: article.author.name,
        jobTitle: article.author.role,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Smile Dent Team',
        url: 'https://smiledentteam.vercel.app',
        logo: { '@type': 'ImageObject', url: 'https://smiledentteam.vercel.app/images/logo/logo.svg' },
      },
      mainEntityOfPage: `https://smiledentteam.vercel.app/blog/${article.slug}`,
      articleSection: article.category,
      keywords: article.tags.join(', '),
      wordCount: article.content.join(' ').split(' ').length,
      inLanguage: 'ro',
    },
    // Breadcrumbs
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Acasa', item: 'https://smiledentteam.vercel.app' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://smiledentteam.vercel.app/blog' },
        { '@type': 'ListItem', position: 3, name: article.title, item: `https://smiledentteam.vercel.app/blog/${article.slug}` },
      ],
    },
  ]

  // FAQ schema if present
  if (article.faq && article.faq.length > 0) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: article.faq.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }

  return (
    <>
      {jsonLd.map((ld, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      ))}
    </>
  )
}

export default function Page({ params }: Props) {
  const article = BLOG_ARTICLES.find(a => a.slug === params.slug)
  if (!article) notFound()

  return (
    <>
      <ArticleJsonLd slug={params.slug} />
      <BlogArticleDetail slug={params.slug} />
    </>
  )
}

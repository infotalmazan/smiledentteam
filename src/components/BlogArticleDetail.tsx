'use client'

import { useState } from 'react'
import { Logo } from './Logo'
import { BRAND as B, STATS, SERVICES, LOCATIONS, CAMPAIGN_2026 } from '@/lib/brand'
import { BLOG_ARTICLES, BLOG_CATEGORIES } from '@/lib/blog-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  ArrowRight, ArrowLeft, MapPin, Clock, Calendar, Eye, Tag,
  ChevronDown, ChevronUp, Play, Share2, BookOpen, User,
  FileText, Headphones, Video, Newspaper, Heart, Phone
} from 'lucide-react'

/* ─── NAV ─────────────────────────────────── */
const NAV_LINKS: [string, string][] = [
  ['Servicii', '/servicii'],
  ['Digital Check-Up', '/digital-checkup'],
  ['Consultație Online', '/consultatie-online'],
  ['Echipa', '/echipa'],
  ['Recenzii', '/recenzii'],
]

function Nav() {
  return (
    <nav className="sticky top-0 z-[100] bg-white border-b border-[--bdr] px-12 py-3.5 flex justify-between items-center" style={{ borderTop: `3px solid ${B.a}` }}>
      <a href="/" className="no-underline"><Logo height={36}/></a>
      <div className="flex gap-7 items-center">
        {NAV_LINKS.map(([l, h]) => (
          <a key={l} href={h} className="relative text-sm no-underline pb-1 font-medium text-[#3a5a50]">{l}</a>
        ))}
      </div>
      <div className="flex gap-2.5 items-center">
        <a href="/login" className="no-underline">
          <Button variant="outline" size="sm" className="border-sdt-600 text-sdt-600 font-semibold text-[13px]">Cabinetul meu</Button>
        </a>
        <Button variant="accent" size="sm" className="text-[13px]">Programeaza-te</Button>
      </div>
    </nav>
  )
}

const CAT_ICONS: Record<string, typeof FileText> = {
  specialitate: FileText, podcast: Headphones, serial: Video,
  presa: Newspaper, cazuri: Heart, ghid: BookOpen,
}

/* ─── Article Detail Component ────────────── */
export function BlogArticleDetail({ slug }: { slug: string }) {
  const article = BLOG_ARTICLES.find(a => a.slug === slug)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  if (!article) return null

  const cat = BLOG_CATEGORIES.find(c => c.id === article.category)
  const CatIcon = CAT_ICONS[article.category]
  const currentIdx = BLOG_ARTICLES.findIndex(a => a.slug === slug)
  const prevArticle = currentIdx > 0 ? BLOG_ARTICLES[currentIdx - 1] : null
  const nextArticle = currentIdx < BLOG_ARTICLES.length - 1 ? BLOG_ARTICLES[currentIdx + 1] : null
  const relatedArticles = BLOG_ARTICLES.filter(a => a.slug !== slug && (a.category === article.category || a.tags.some(t => article.tags.includes(t)))).slice(0, 3)

  return (
    <>
      <Nav />

      {/* ━━━ Breadcrumbs ━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="bg-[#fafcfb] border-b border-[--bdr] px-12 py-3">
        <div className="mx-auto max-w-[800px] flex items-center gap-2 text-[12px] text-[#5a7a6e]">
          <a href="/" className="no-underline text-[#5a7a6e] hover:text-sdt-600 transition-colors">Acasa</a>
          <span>/</span>
          <a href="/blog" className="no-underline text-[#5a7a6e] hover:text-sdt-600 transition-colors">Blog</a>
          <span>/</span>
          <a href={`/blog?cat=${article.category}`} className="no-underline hover:text-sdt-600 transition-colors" style={{ color: cat?.color }}>{cat?.name}</a>
          <span>/</span>
          <span className="text-[#5a7a6e]/60 truncate max-w-[300px]">{article.title}</span>
        </div>
      </div>

      {/* ━━━ ARTICLE HEADER ━━━━━━━━━━━━━━━━━━━ */}
      <article>
        <header className="py-12 px-12">
          <div className="mx-auto max-w-[800px]">
            {/* Category + meta */}
            <div className="flex items-center gap-3 mb-5">
              <Badge className="border-0 text-white text-[10px] font-bold flex items-center gap-1" style={{ background: cat?.color }}>
                <CatIcon className="w-3 h-3" /> {cat?.name}
              </Badge>
              {article.episodeNumber && <Badge className="bg-[#0a1e18] text-white border-0 text-[10px]">Episodul {article.episodeNumber}</Badge>}
            </div>

            {/* H1 Title — critical for SEO */}
            <h1 className="font-display text-[36px] font-semibold leading-[1.15] tracking-tight mb-5" style={{ color: B.nv }}>
              {article.title}
            </h1>

            {/* Meta row */}
            <div className="flex items-center gap-4 mb-6 text-[13px] text-[#5a7a6e]">
              <div className="flex items-center gap-2">
                <img src={article.author.photo} alt={article.author.name} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <span className="font-semibold" style={{ color: B.nv }}>{article.author.name}</span>
                  <span className="text-[11px] block text-[#5a7a6e]">{article.author.role}</span>
                </div>
              </div>
              <span className="text-[--bdr]">|</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(article.date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{article.readTime}</span>
              {article.views && <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{article.views} vizualizari</span>}
            </div>

            {/* Featured image */}
            <div className="rounded-2xl overflow-hidden h-[400px] relative mb-2">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
              {article.videoUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-16 h-16 rounded-full bg-pink-500 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 text-white fill-white" />
                  </div>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-8">
              {article.tags.map(tag => (
                <span key={tag} className="text-[10px] font-semibold text-sdt-600 bg-sdt-50 px-2.5 py-1 rounded-full border border-sdt-100">{tag}</span>
              ))}
            </div>
          </div>
        </header>

        {/* ━━━ ARTICLE BODY ━━━━━━━━━━━━━━━━━━━━ */}
        <div className="px-12 pb-12">
          <div className="mx-auto max-w-[800px]">
            {/* Excerpt — H2 for SEO */}
            <h2 className="font-display text-[20px] font-semibold leading-[1.4] mb-6" style={{ color: B.nv }}>
              {article.excerpt}
            </h2>

            {/* Body paragraphs */}
            <div className="prose-sdt">
              {article.content.map((p, i) => (
                <p key={i} className="text-[16px] leading-[1.85] text-[#3a5a50] mb-5">{p}</p>
              ))}
            </div>

            {/* ━━━ FAQ Section (Schema markup) ━━━━ */}
            {article.faq && article.faq.length > 0 && (
              <div className="mt-12 pt-8 border-t border-[--bdr]">
                <h2 className="font-display text-[22px] font-semibold mb-6" style={{ color: B.nv }}>Intrebari frecvente</h2>
                <div className="space-y-3">
                  {article.faq.map((item, i) => (
                    <div key={i} className="border border-[--bdr] rounded-xl overflow-hidden" style={{ background: openFaq === i ? `${B.p}04` : 'white' }}>
                      <button className="w-full flex justify-between items-center p-5 text-left cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                        <h3 className="font-display text-[15px] font-semibold pr-4" style={{ color: B.nv }}>{item.q}</h3>
                        {openFaq === i ? <ChevronUp className="w-5 h-5 flex-shrink-0 text-sdt-600" /> : <ChevronDown className="w-5 h-5 flex-shrink-0 text-[#5a7a6e]" />}
                      </button>
                      {openFaq === i && (
                        <div className="px-5 pb-5 pt-0 text-[15px] leading-[1.75] text-[#5a7a6e]">{item.a}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ━━━ CTA Strip ━━━━━━━━━━━━━━━━━━━━ */}
            <div className="mt-12 p-8 rounded-2xl text-center" style={{ background: `linear-gradient(135deg, ${B.p}, ${B.pm})` }}>
              <h3 className="font-display text-[22px] font-semibold text-white mb-2">Ai intrebari? Programeaza o consultatie gratuita.</h3>
              <p className="text-sm text-white/60 mb-5">Echipa noastra raspunde la orice intrebare despre sanatatea ta dentara.</p>
              <a href="/" className="no-underline">
                <Button variant="accent" className="px-8 py-3 text-[14px] font-bold">
                  Programeaza Digital Check-Up <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </a>
            </div>

            {/* ━━━ Author Bio ━━━━━━━━━━━━━━━━━━━ */}
            <div className="mt-10 p-6 rounded-xl border border-[--bdr] flex items-center gap-5">
              <img src={article.author.photo} alt={article.author.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <div className="text-[12px] font-bold uppercase tracking-[.1em] text-sdt-600 mb-1">Autor</div>
                <div className="font-display text-[17px] font-semibold" style={{ color: B.nv }}>{article.author.name}</div>
                <div className="text-sm text-[#5a7a6e]">{article.author.role} la Smile Dent Team</div>
              </div>
            </div>

            {/* ━━━ Navigation (prev/next) ━━━━━━━ */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {prevArticle ? (
                <a href={`/blog/${prevArticle.slug}`} className="no-underline p-4 rounded-xl border border-[--bdr] hover:border-sdt-200 transition-all group">
                  <div className="text-[11px] text-[#5a7a6e] flex items-center gap-1 mb-1"><ArrowLeft className="w-3 h-3" /> Anterior</div>
                  <div className="font-display text-[14px] font-semibold group-hover:text-sdt-600 transition-colors line-clamp-1" style={{ color: B.nv }}>{prevArticle.title}</div>
                </a>
              ) : <div />}
              {nextArticle ? (
                <a href={`/blog/${nextArticle.slug}`} className="no-underline p-4 rounded-xl border border-[--bdr] hover:border-sdt-200 transition-all group text-right">
                  <div className="text-[11px] text-[#5a7a6e] flex items-center gap-1 justify-end mb-1">Urmator <ArrowRight className="w-3 h-3" /></div>
                  <div className="font-display text-[14px] font-semibold group-hover:text-sdt-600 transition-colors line-clamp-1" style={{ color: B.nv }}>{nextArticle.title}</div>
                </a>
              ) : <div />}
            </div>
          </div>
        </div>
      </article>

      {/* ━━━ RELATED ARTICLES ━━━━━━━━━━━━━━━━━ */}
      {relatedArticles.length > 0 && (
        <section className="py-14 px-12" style={{ background: B.ps }}>
          <div className="mx-auto max-w-[1200px]">
            <h2 className="font-display text-[22px] font-semibold mb-8" style={{ color: B.nv }}>Articole similare</h2>
            <div className="grid grid-cols-3 gap-6">
              {relatedArticles.map(art => {
                const rCat = BLOG_CATEGORIES.find(c => c.id === art.category)
                return (
                  <a key={art.slug} href={`/blog/${art.slug}`} className="no-underline group">
                    <Card className="overflow-hidden border-[--bdr] hover:border-sdt-200 transition-all hover:shadow-lg h-full">
                      <div className="h-[160px] overflow-hidden relative">
                        <img src={art.image} alt={art.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <Badge className="absolute top-3 left-3 border-0 text-white text-[9px] font-bold" style={{ background: rCat?.color }}>{rCat?.name}</Badge>
                      </div>
                      <CardContent className="p-4">
                        <div className="text-[11px] text-[#5a7a6e] mb-2 flex items-center gap-2">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{art.readTime}</span>
                        </div>
                        <h3 className="font-display text-[14px] font-semibold leading-snug group-hover:text-sdt-600 transition-colors" style={{ color: B.nv }}>{art.title}</h3>
                      </CardContent>
                    </Card>
                  </a>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ━━━ FOOTER ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="section-line" />
      <footer className="pt-16 pb-8 px-[52px]" style={{ background: B.nv }}>
        <div className="grid gap-12 mb-12" style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr' }}>
          <div>
            <div className="mb-5"><Logo height={34} light/></div>
            <p className="text-sm leading-[1.75] text-white/60 max-w-[260px]">
              Clinica stomatologica digitala. 15 ani de excelenta, {STATS.team} specialisti, {STATS.patients} pacienti, {STATS.locations} filiale.
            </p>
            <div className="mt-5 p-3 px-4 bg-pink-500/[.12] border border-pink-500/20 rounded-lg">
              <div className="font-display text-base font-semibold text-pink-500">{CAMPAIGN_2026.slogan}</div>
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-white tracking-[.15em] uppercase mb-5">Servicii</div>
            {SERVICES.map(s => (
              <div key={s.slug} className="text-[13px] mb-2.5 text-white/[.58] cursor-pointer hover:text-white transition-colors">{s.name}</div>
            ))}
          </div>
          <div>
            <div className="text-[11px] font-bold text-white tracking-[.15em] uppercase mb-5">Clinica</div>
            {[['Despre noi','/despre-noi'],['Echipa','/echipa'],['Ambasadori','/ambasadori'],['Tehnologii','/tehnologii'],['Blog','/blog'],['Cariere','/cariere'],['Contacte','/contacte']].map(([s,h]) => (
              <a key={s} href={h} className="block text-[13px] mb-2.5 text-white/[.58] no-underline hover:text-white transition-colors">{s}</a>
            ))}
          </div>
          <div>
            <div className="text-[11px] font-bold text-white tracking-[.15em] uppercase mb-5">Contact</div>
            {LOCATIONS.slice(0,3).map(l => (
              <div key={l.city} className="mb-4 leading-[1.65]">
                <div className="text-[13px] font-semibold text-white">{l.city}</div>
                <div className="text-xs text-white/[.52]">{l.address}</div>
              </div>
            ))}
            <a href="mailto:info@smiledent.md" className="text-[13px] text-sdt-500 font-semibold no-underline">info@smiledent.md</a>
          </div>
        </div>
        <div className="border-t border-white/[.07] pt-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Logo height={26} light/>
            <span className="text-xs text-white/[.28]">&copy; {CAMPAIGN_2026.year} Smile Dent Team. Toate drepturile rezervate.</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex gap-1.5">
              {['RO','RU','EN'].map(l => (
                <span key={l} className="bg-white/[.08] text-white/50 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-[.08em] cursor-pointer hover:bg-white/15 hover:text-white transition-all">{l}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

'use client'

import { useState, useMemo } from 'react'
import { Logo } from './Logo'
import { BRAND as B, STATS, SERVICES, LOCATIONS, CAMPAIGN_2026 } from '@/lib/brand'
import { BLOG_ARTICLES, BLOG_CATEGORIES, type BlogCategory } from '@/lib/blog-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  ArrowRight, MapPin, Phone, Search, Clock, Eye,
  FileText, Headphones, Video, Newspaper, Heart, BookOpen,
  Tag, User, Calendar, ChevronRight, Play, Star,
  TrendingUp, Rss, Filter
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

/* ─── Category Icon Map ───────────────────── */
const CAT_ICONS: Record<string, typeof FileText> = {
  specialitate: FileText,
  podcast: Headphones,
  serial: Video,
  presa: Newspaper,
  cazuri: Heart,
  ghid: BookOpen,
}

/* ─── Animations ──────────────────────────── */
const ANIM_BLOG = `
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
`

/* ─── Page Component ─────────────────────── */
export function BlogPage() {
  const [activeCat, setActiveCat] = useState<BlogCategory | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    let articles = BLOG_ARTICLES
    if (activeCat !== 'all') articles = articles.filter(a => a.category === activeCat)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      articles = articles.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q)) ||
        a.excerpt.toLowerCase().includes(q)
      )
    }
    return articles
  }, [activeCat, searchQuery])

  const featuredArticles = BLOG_ARTICLES.filter(a => a.featured).slice(0, 3)
  const latestArticles = BLOG_ARTICLES.slice(0, 6)

  return (
    <>
      <Nav />
      <style dangerouslySetInnerHTML={{ __html: ANIM_BLOG }} />

      {/* ━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${B.nv} 0%, #0f2e24 50%, ${B.pd} 100%)` }}>
        <div className="mx-auto max-w-[1200px] px-12 pb-16 pt-[72px]">
          <div className="max-w-[700px]">
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[.12] px-3.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
              <span className="text-[11px] font-bold uppercase tracking-[.12em] text-white">Blog Smile Dent Team</span>
            </div>
            <h1 className="font-display mb-[18px] text-[44px] font-semibold leading-[1.08] tracking-tight text-white">
              Cunostinte care <span className="text-pink-500">transforma zambete.</span>
            </h1>
            <p className="mb-8 max-w-[540px] text-base leading-relaxed text-white/[.65]">
              Articole de specialitate, podcast-uri, seriale video si ghiduri practice — tot ce trebuie sa stii despre sanatatea orala, scris de echipa noastra de medici.
            </p>
            {/* Search */}
            <div className="relative max-w-[480px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Cauta articole, subiecte, tag-uri..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white/[.08] border border-white/[.15] rounded-xl px-4 pl-12 py-3.5 text-sm text-white placeholder-white/40 outline-none focus:border-pink-500/50 transition-colors"
              />
            </div>
          </div>
          {/* Stats */}
          <div className="flex gap-8 mt-10">
            {[[String(BLOG_ARTICLES.length), 'articole publicate'], ['6', 'categorii'], ['50K+', 'cititori lunari'], ['4.9', 'rating continut']].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-[24px] font-semibold text-pink-500">{n}</div>
                <div className="mt-0.5 text-xs text-white/[.45]">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ CATEGORY FILTERS ━━━━━━━━━━━━━━━━━ */}
      <section className="py-6 px-12 border-b border-[--bdr] sticky top-[52px] z-[90] bg-white">
        <div className="mx-auto max-w-[1200px] flex items-center gap-3 overflow-x-auto">
          <button
            onClick={() => setActiveCat('all')}
            className={cn(
              'px-4 py-2 rounded-full text-[12px] font-semibold border transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5',
              activeCat === 'all' ? 'bg-sdt-600 text-white border-sdt-600' : 'bg-white text-[#5a7a6e] border-[--bdr] hover:border-sdt-200'
            )}
          >
            <Filter className="w-3.5 h-3.5" /> Toate ({BLOG_ARTICLES.length})
          </button>
          {BLOG_CATEGORIES.map(cat => {
            const Icon = CAT_ICONS[cat.id]
            const count = BLOG_ARTICLES.filter(a => a.category === cat.id).length
            return (
              <button key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={cn(
                  'px-4 py-2 rounded-full text-[12px] font-semibold border transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5',
                  activeCat === cat.id ? 'text-white border-transparent' : 'bg-white text-[#5a7a6e] border-[--bdr] hover:border-sdt-200'
                )}
                style={activeCat === cat.id ? { background: cat.color } : undefined}
              >
                <Icon className="w-3.5 h-3.5" /> {cat.name} ({count})
              </button>
            )
          })}
        </div>
      </section>

      {/* ━━━ FEATURED (only when no filter) ━━━━ */}
      {activeCat === 'all' && !searchQuery && (
        <section className="py-14 px-12">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="w-5 h-5 text-pink-500" strokeWidth={1.5} />
              <h2 className="font-display text-[22px] font-semibold" style={{ color: B.nv }}>Recomandate</h2>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {featuredArticles.map((art, i) => {
                const CatIcon = CAT_ICONS[art.category]
                const cat = BLOG_CATEGORIES.find(c => c.id === art.category)
                return (
                  <a key={art.slug} href={`/blog/${art.slug}`} className="no-underline group">
                    <Card className="overflow-hidden border-[--bdr] hover:border-sdt-200 transition-all hover:shadow-lg hover:shadow-sdt-500/[.06] h-full">
                      <div className="h-[200px] overflow-hidden relative">
                        <img src={art.image} alt={art.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e18]/50 to-transparent" />
                        <Badge className="absolute top-3 left-3 border-0 text-white text-[9px] font-bold" style={{ background: cat?.color }}>{cat?.name}</Badge>
                        {art.videoUrl && (
                          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center">
                            <Play className="w-3.5 h-3.5 text-white fill-white" />
                          </div>
                        )}
                        {i === 0 && <Badge className="absolute bottom-3 right-3 bg-pink-500 text-white border-0 text-[9px]">FEATURED</Badge>}
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-2.5 text-[11px] text-[#5a7a6e]">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(art.date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{art.readTime}</span>
                          {art.views && <><span>·</span><span className="flex items-center gap-1"><Eye className="w-3 h-3" />{art.views}</span></>}
                        </div>
                        <h3 className="font-display text-[16px] font-semibold leading-snug mb-2 group-hover:text-sdt-600 transition-colors" style={{ color: B.nv }}>{art.title}</h3>
                        <p className="text-[12px] leading-[1.6] text-[#5a7a6e] mb-3 line-clamp-2">{art.excerpt}</p>
                        <div className="flex items-center gap-2 mt-auto">
                          <img src={art.author.photo} alt={art.author.name} className="w-6 h-6 rounded-full object-cover" />
                          <span className="text-[11px] font-semibold text-[#5a7a6e]">{art.author.name}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ━━━ ALL ARTICLES GRID ━━━━━━━━━━━━━━━━ */}
      <section className="py-14 px-12" style={{ background: activeCat === 'all' && !searchQuery ? B.ps : 'white' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-display text-[22px] font-semibold" style={{ color: B.nv }}>
              {activeCat === 'all' ? (searchQuery ? `Rezultate: ${filtered.length}` : 'Toate articolele') : BLOG_CATEGORIES.find(c => c.id === activeCat)?.name}
              <span className="text-pink-500 ml-2">({filtered.length})</span>
            </h2>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Search className="w-12 h-12 mx-auto text-[#5a7a6e]/30 mb-4" />
              <h3 className="font-display text-lg font-semibold mb-2" style={{ color: B.nv }}>Niciun articol gasit</h3>
              <p className="text-sm text-[#5a7a6e]">Incearca alte cuvinte cheie sau selecteaza o alta categorie.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {filtered.map(art => {
                const CatIcon = CAT_ICONS[art.category]
                const cat = BLOG_CATEGORIES.find(c => c.id === art.category)
                return (
                  <a key={art.slug} href={`/blog/${art.slug}`} className="no-underline group animate-fadeUp" style={{ animationDuration: '0.3s' }}>
                    <Card className="overflow-hidden border-[--bdr] hover:border-sdt-200 transition-all hover:shadow-lg hover:shadow-sdt-500/[.06] h-full flex flex-col">
                      <div className="h-[180px] overflow-hidden relative">
                        <img src={art.image} alt={art.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e18]/40 to-transparent" />
                        <div className="absolute top-3 left-3 flex gap-1.5">
                          <Badge className="border-0 text-white text-[9px] font-bold" style={{ background: cat?.color }}>{cat?.name}</Badge>
                          {art.episodeNumber && <Badge className="bg-white/90 text-[#0a1e18] border-0 text-[9px]">Ep. {art.episodeNumber}</Badge>}
                        </div>
                        {art.videoUrl && (
                          <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-pink-500/90 flex items-center justify-center">
                            <Play className="w-3.5 h-3.5 text-white fill-white" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-2.5 text-[11px] text-[#5a7a6e]">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{new Date(art.date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' })}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{art.readTime}</span>
                          {art.views && <><span>·</span><span className="flex items-center gap-1"><Eye className="w-3 h-3" />{art.views}</span></>}
                        </div>
                        <h3 className="font-display text-[15px] font-semibold leading-snug mb-2 group-hover:text-sdt-600 transition-colors flex-1" style={{ color: B.nv }}>{art.title}</h3>
                        <p className="text-[12px] leading-[1.6] text-[#5a7a6e] mb-3 line-clamp-2">{art.excerpt}</p>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {art.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[9px] font-semibold text-sdt-600 bg-sdt-50 px-2 py-0.5 rounded">{tag}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 mt-auto pt-3 border-t border-[--bdr]">
                          <img src={art.author.photo} alt={art.author.name} className="w-6 h-6 rounded-full object-cover" />
                          <div>
                            <span className="text-[11px] font-semibold" style={{ color: B.nv }}>{art.author.name}</span>
                            <span className="text-[10px] text-[#5a7a6e] block">{art.author.role}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ━━━ NEWSLETTER ━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 px-12" style={{ background: `linear-gradient(135deg, ${B.p}, ${B.pm})` }}>
        <div className="mx-auto max-w-[600px] text-center">
          <Rss className="w-10 h-10 mx-auto text-white/60 mb-4" strokeWidth={1.5} />
          <h2 className="font-display text-[28px] font-semibold text-white mb-3">Aboneaza-te la newsletter</h2>
          <p className="text-sm text-white/60 mb-6">Primesti lunar cele mai noi articole, ghiduri si noutati direct in inbox. Fara spam, doar continut de valoare.</p>
          <div className="flex gap-3">
            <input type="email" placeholder="Adresa ta de email" className="flex-1 bg-white/[.1] border border-white/[.2] rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-pink-500/50" />
            <Button variant="accent" className="px-6 py-3 text-[14px] font-bold whitespace-nowrap">
              Aboneaza-te <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <p className="text-[10px] text-white/30 mt-3">Prin abonare esti de acord cu Politica de confidentialitate.</p>
        </div>
      </section>

      {/* ━━━ CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 px-12">
        <div className="mx-auto max-w-[1200px] grid grid-cols-2 gap-8">
          <Card className="border-[--bdr] p-8 flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${B.p}0D` }}>
              <Calendar className="w-8 h-8 text-sdt-600" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-display text-[18px] font-semibold mb-1" style={{ color: B.nv }}>Programeaza o consultatie</h3>
              <p className="text-sm text-[#5a7a6e] mb-3">Consultatia initiala cu Digital Check-Up este GRATUITA.</p>
              <a href="/" className="text-[13px] font-bold text-pink-500 no-underline flex items-center gap-1">
                Programeaza-te acum <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </Card>
          <Card className="border-[--bdr] p-8 flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 bg-pink-500/10">
              <Headphones className="w-8 h-8 text-pink-500" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-display text-[18px] font-semibold mb-1" style={{ color: B.nv }}>Asculta podcastul SDT</h3>
              <p className="text-sm text-[#5a7a6e] mb-3">Conversatii cu specialisti despre sanatatea orala.</p>
              <button onClick={() => setActiveCat('podcast')} className="text-[13px] font-bold text-pink-500 bg-transparent border-none cursor-pointer flex items-center gap-1">
                Vezi episoadele <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </Card>
        </div>
      </section>

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
            <div className="flex gap-2.5 mt-4">
              {['FB','IG','YT','TK'].map(s => (
                <div key={s} className="w-[34px] h-[34px] rounded-lg bg-white/[.07] flex items-center justify-center cursor-pointer text-[11px] font-bold text-white/50 hover:bg-sdt-600/45 transition-colors">{s}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-white tracking-[.15em] uppercase mb-5">Servicii</div>
            <div className="text-[13px] mb-2.5 text-pink-500 cursor-pointer font-semibold">Digital Check-Up</div>
            {SERVICES.map(s => (
              <div key={s.slug} className="text-[13px] mb-2.5 text-white/[.58] cursor-pointer hover:text-white transition-colors">{s.name}</div>
            ))}
          </div>
          <div>
            <div className="text-[11px] font-bold text-white tracking-[.15em] uppercase mb-5">Clinica</div>
            {[['Despre noi','/despre-noi'],['Echipa','/echipa'],['Ambasadori','/ambasadori'],['Tehnologii','/tehnologii'],['Blog','/blog'],['Cariere','/cariere'],['Contacte','/contacte']].map(([s,h]) => (
              <a key={s} href={h} className={cn(
                'block text-[13px] mb-2.5 no-underline hover:text-white transition-colors',
                s === 'Blog' ? 'text-pink-500 font-semibold' : 'text-white/[.58]'
              )}>{s}</a>
            ))}
          </div>
          <div>
            <div className="text-[11px] font-bold text-white tracking-[.15em] uppercase mb-5">Contact</div>
            {LOCATIONS.slice(0,3).map(l => (
              <div key={l.city} className="mb-4 leading-[1.65]">
                <div className="text-[13px] font-semibold text-white">{l.city}</div>
                <div className="text-xs text-white/[.52]">{l.address}</div>
                <div className="text-xs text-white/[.52]">{l.phone}</div>
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
            <div className="flex gap-6 text-xs text-white/30">
              {['Politica de confidentialitate','Termeni si conditii','Cookies'].map(s => (
                <span key={s} className="cursor-pointer hover:text-white/70 transition-colors">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

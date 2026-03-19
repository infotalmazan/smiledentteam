'use client'

import { useState } from 'react'
import { Logo } from './Logo'
import { BRAND as B, STATS, SERVICES, LOCATIONS, CAMPAIGN_2026, AMBASSADORS, SVC_COLORS } from '@/lib/brand'
import { BLOG_ARTICLES } from '@/lib/blog-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  ArrowRight, Clock, CheckCircle, Shield,
  Star, ChevronDown, ChevronUp, Heart, Eye,
  Users, Sparkles, BookOpen, Timer, Award,
  Camera, Gem, Palette, Layers, Crown, Diamond,
  Play, Phone, MapPin, DollarSign
} from 'lucide-react'

const C = SVC_COLORS.estetica

/* ─── NAV ─────────────────────────────────── */
const NAV_LINKS: [string, string][] = [
  ['Servicii', '/servicii'], ['Digital Check-Up', '/digital-checkup'],
  ['Consultatie Online', '/consultatie-online'], ['Echipa', '/echipa'], ['Recenzii', '/recenzii'],
]
function Nav() {
  return (
    <nav className="sticky top-0 z-[100] bg-white border-b border-[--bdr] px-12 py-3.5 flex justify-between items-center" style={{ borderTop: `3px solid ${C.accent}` }}>
      <a href="/" className="no-underline"><Logo height={36}/></a>
      <div className="flex gap-7 items-center">
        {NAV_LINKS.map(([l, h]) => (
          <a key={l} href={h} className={cn('relative text-sm no-underline pb-1 font-medium', l === 'Servicii' ? 'font-bold text-[#e8157a]' : 'text-[#3a5a50]')}>
            {l}
            {l === 'Servicii' && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-5 rounded-full" style={{ background: C.accent }} />}
          </a>
        ))}
      </div>
      <div className="flex gap-2.5 items-center">
        <a href="/login" className="no-underline"><Button variant="outline" size="sm" className="border-[#e8157a] text-[#e8157a] font-semibold text-[13px]">Cabinetul meu</Button></a>
        <Button size="sm" className="text-[13px] text-white" style={{ background: C.accent }}>Programeaza-te</Button>
      </div>
    </nav>
  )
}

const ANIM = `
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  @keyframes breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.03); } }
`

/* ═══════════════════════════════════════════════
   CONCEPT: "LUXURY SMILE EXPERIENCE"
   Magazine-style, editorial, premium aspirational
   Target: Top management, business, public figures 25-50
   ═══════════════════════════════════════════════ */

/* ─── Smile Gallery (before/after editorial) ─ */
const GALLERY = [
  { label: 'Transformare completa — 10 fatete E-max', before: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=600&h=400&fit=crop', patient: 'Pacient, 34 ani, CEO' },
  { label: 'Corectie simetrie — 8 fatete zirconiu', before: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=600&h=400&fit=crop', patient: 'Pacienta, 29 ani, TV Presenter' },
  { label: 'Hollywood Smile — 20 fatete complete', before: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop', after: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop', patient: 'Pacient, 42 ani, Antreprenor' },
]

/* ─── DSD Process ─────────────────────────── */
const DSD_STEPS = [
  { step: '01', title: 'Sedinta foto & video', desc: 'Protocol complet de fotografie faciala si dentara. Analizam proportiile, simetria si linia zambetului in miscare.', icon: Camera, detail: 'Analiza 2D + Video' },
  { step: '02', title: 'Scanare 3D digitala', desc: 'Scanner 3Shape Trios capteaza arcadele cu precizie de 6.9 microni. Zero amprenta clasica, zero disconfort.', icon: Layers, detail: '6.9 microni precizie' },
  { step: '03', title: 'Design digital zambet', desc: 'Software DSD proiecteaza zambetul ideal bazat pe proportiile faciale. Vedeti simularea fotorealista pe ecran.', icon: Palette, detail: 'Simulare fotorealista' },
  { step: '04', title: 'Mock-up in gura', desc: 'Proba fizica a viitorului zambet. Vedeti si simtiti rezultatul final inainte de orice interventie. Aprobati sau ajustam.', icon: Gem, detail: 'Try before you commit' },
  { step: '05', title: 'Fabricare premium', desc: 'Fatetele sunt fabricate din ceramica E-max sau zirconiu premium. Fiecare fateta este o opera de arta, sculptata manual.', icon: Diamond, detail: 'E-max / Zirconiu' },
  { step: '06', title: 'Aplicare & reveal', desc: 'Aplicare cu adezivi premium in 2-3 sedinte. Momentul dezvelirii noului zambet — emotia suprema a intregului proces.', icon: Crown, detail: '2-3 sedinte' },
]

/* ─── VIP Social Proof ────────────────────── */
const VIP_REVIEWS = [
  { name: 'Alexandra V.', title: 'CEO, Tech Startup', text: 'Zambetul meu a devenit cartea mea de vizita. Fiecare intalnire de business incepe cu o prima impresie perfecta.', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face', rating: 5, hashtag: '#SmileInvestment' },
  { name: 'Radu M.', title: 'Managing Partner, Law Firm', text: 'Ca avocat, zambetul conteaza enorm in sala de judecata. Fatetele SDT sunt investitia care s-a intors de 100x.', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face', rating: 5, hashtag: '#ConfidenceBoost' },
  { name: 'Ioana P.', title: 'TV Anchor', text: 'In fata camerei, fiecare detaliu conteaza. Fatetele mele arata absolut natural — nimeni nu le deosebeste de dintii reali.', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face', rating: 5, hashtag: '#NaturalBeauty' },
  { name: 'Cristian D.', title: 'Antreprenor, HoReCa', text: 'Digital Smile Design mi-a permis sa vad rezultatul inainte de a incepe. Zero surprize, 100% multumire. O experienta premium.', photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face', rating: 5, hashtag: '#DigitalSmile' },
]

/* ─── Investment tiers ────────────────────── */
const INVESTMENT = [
  { tier: 'Classic', fatete: '4-6 fatete', price: 'de la 7.000\u20AC', desc: 'Corectie zona zambetului. Ideal pentru discromii, spatii usoare, forme imperfecte.', features: ['E-max ceramica', 'Digital Smile Design', 'Mock-up inclus', 'Garantie 10 ani'] },
  { tier: 'Signature', fatete: '8-10 fatete', price: 'de la 12.000\u20AC', desc: 'Transformare completa a liniei zambetului. Simetrie perfecta, culoare uniforma.', features: ['E-max sau Zirconiu premium', 'DSD + Wax-up complet', 'Sedinte de ajustare', 'Garantie 15 ani'], popular: true },
  { tier: 'Hollywood', fatete: '16-20 fatete', price: 'de la 20.000\u20AC', desc: 'Reabilitare estetica totala. Ambele arcade, aspect de revista. Cel mai solicitat de personalitati.', features: ['Zirconiu ultra-premium', 'DSD complet + Video preview', 'VIP scheduling', 'Garantie 20 ani'] },
]

const FAQ = [
  { q: 'Cat dureaza procesul complet de fatete dentare?', a: 'De la prima consultatie pana la aplicare: 2-4 saptamani. Aceasta include sedinta DSD (Digital Smile Design), fabricarea si aplicarea. In aceasta perioada, purtati fatetele provizorii.' },
  { q: 'Sunt fatetele dentare permanente?', a: 'Fatetele E-max au o durabilitate de 15-20+ ani, iar cele din zirconiu 20-25+ ani. Cu igiena corecta si controale regulate, fatetele pot dura o viata intreaga.' },
  { q: 'Trebuie sa slefuiesc dintii pentru fatete?', a: 'Slefuirea este minima — 0.3-0.5mm din smaltz. In unele cazuri, fatetele no-prep sunt posibile fara nicio slefuire. Medicul evalueaza individual fiecare caz.' },
  { q: 'Cum arata fatetele? Se vede ca sunt artificiale?', a: 'Nu. Fatetele premium DSD sunt proiectate sa reproduca translucenta, culoarea si textura naturala a dintilor. Sunt practic imposibil de deosebit de dintii naturali.' },
  { q: 'Cat de mult costa fatetele dentare?', a: 'Investitia porneste de la 7.000 euro pentru 4-6 fatete E-max cu Digital Smile Design complet. Pretul exact depinde de numarul de fatete, materialul ales si complexitatea cazului.' },
  { q: 'Pot sa vad cum va arata zambetul meu inainte?', a: 'Da! Acesta este avantajul major al Digital Smile Design. Vedeti simularea fotorealista pe ecran, apoi primiti un mock-up fizic — proba reala in gura. Aprobati rezultatul inainte de orice interventie.' },
]

const RELATED_BLOGS = BLOG_ARTICLES.filter(a => a.tags.some(t => t.includes('fatete') || t.includes('estetica') || t.includes('smile design') || t.includes('zambet'))).slice(0, 3)
const RELATED_AMBASSADORS = AMBASSADORS.filter(a => ['adam', 'cociu', 'cosovan'].includes(a.slug))

/* ─── Page Component ─────────────────────── */
export function FateteDentarePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [dsdStep, setDsdStep] = useState(0)
  const [galleryIdx, setGalleryIdx] = useState(0)
  const [showAfter, setShowAfter] = useState(false)

  return (
    <>
      <Nav />
      <style dangerouslySetInnerHTML={{ __html: ANIM }} />

      {/* Breadcrumbs */}
      <div className="bg-[#fafcfb] border-b border-[--bdr] px-12 py-3">
        <div className="mx-auto max-w-[1200px] flex items-center gap-2 text-[12px] text-[#5a7a6e]">
          <a href="/" className="no-underline text-[#5a7a6e] hover:text-sdt-600">Acasa</a><span>/</span>
          <a href="/servicii" className="no-underline text-[#5a7a6e] hover:text-sdt-600">Servicii</a><span>/</span>
          <span className="font-semibold" style={{ color: C.accent }}>Fatete Dentare</span>
        </div>
      </div>

      {/* ━━━ HERO — Cinematic, luxury, minimal ━━━ */}
      <section className="relative overflow-hidden" style={{ background: C.gradient, minHeight: '600px' }}>
        {/* Subtle shimmer overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ background: 'linear-gradient(90deg, transparent, rgba(232,21,122,0.3), transparent)', backgroundSize: '200% 100%', animation: 'shimmer 8s linear infinite' }} />
        <div className="mx-auto max-w-[1200px] px-12 py-20 relative z-10">
          <div className="grid grid-cols-[1fr_480px] gap-16 items-center">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <Badge className="text-white border-0 text-[10px] font-bold tracking-[.15em]" style={{ background: C.accent }}>SMILE DESIGN</Badge>
                <Badge className="bg-white/10 text-white/70 border-white/20 text-[10px] tracking-wider">PREMIUM</Badge>
              </div>
              <h1 className="font-display mb-6 text-[52px] font-semibold leading-[1.02] tracking-tight text-white">
                Zambetul ca<br/>
                <span style={{ color: '#f472b6' }}>statement.</span>
              </h1>
              <p className="mb-8 max-w-[440px] text-[17px] leading-[1.8] text-white/50 font-light">
                Fatete dentare cu Digital Smile Design. Proiectam zambetul perfect bazat pe proportiile tale faciale. Vedeti rezultatul inainte de a incepe.
              </p>
              <div className="flex gap-4 mb-10">
                <Button className="gap-2 px-8 py-5 text-[15px] font-bold text-white rounded-full" style={{ background: C.accent }}>
                  Programeaza DSD <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="gap-2 border-white/20 px-6 py-5 text-[15px] text-white hover:bg-white/10 rounded-full">
                  <Play className="h-4 w-4" /> Galerie transformari
                </Button>
              </div>
              {/* Luxury stats */}
              <div className="flex gap-8">
                {([
                  { val: '2.200+', label: 'Zambete create' },
                  { val: '15+', label: 'Ani experienta' },
                  { val: '99%', label: 'Satisfactie' },
                ] as const).map(s => (
                  <div key={s.label}>
                    <div className="font-display text-[28px] font-semibold" style={{ color: '#f472b6' }}>{s.val}</div>
                    <div className="text-[11px] text-white/40 uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Editorial photo */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden border border-white/10 relative" style={{ aspectRatio: '4/5' }}>
                <img src="https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=600&h=750&fit=crop" alt="Smile Design" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <div className="text-[11px] uppercase tracking-[.2em] text-white/50 mb-1">Investment</div>
                  <div className="font-display text-[36px] font-semibold text-white">de la 7.000<span className="text-[20px]">&euro;</span></div>
                  <div className="text-[12px] text-white/50">Digital Smile Design complet inclus</div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-3 -right-3 bg-white rounded-2xl px-5 py-3 shadow-xl" style={{ animation: 'float 3s ease-in-out infinite' }}>
                <div className="flex items-center gap-2">
                  <Diamond className="w-5 h-5" style={{ color: C.accent }} strokeWidth={1.5} />
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: C.accent }}>E-max Premium</div>
                    <div className="text-[10px] text-[#5a7a6e]">Garantie 15+ ani</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ SMILE GALLERY — Editorial before/after ━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-14">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: C.accent }} />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: C.accent }}>Galerie transformari</span>
            </div>
            <h2 className="font-display text-[38px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Rezultate care <span style={{ color: C.accent }}>vorbesc.</span>
            </h2>
          </div>

          {/* Gallery selector */}
          <div className="flex justify-center gap-3 mb-8">
            {GALLERY.map((g, i) => (
              <button key={i} onClick={() => { setGalleryIdx(i); setShowAfter(false) }}
                className={cn(
                  'px-5 py-2.5 rounded-full text-[12px] font-semibold cursor-pointer border transition-all',
                  galleryIdx === i ? 'text-white border-transparent' : 'bg-white text-[#5a7a6e] border-[--bdr] hover:border-[#e8157a]/30'
                )}
                style={galleryIdx === i ? { background: C.accent } : {}}
              >
                {g.label.split(' \u2014 ')[0]}
              </button>
            ))}
          </div>

          {/* Active case */}
          <div className="bg-white rounded-3xl border border-[--bdr] overflow-hidden shadow-sm">
            <div className="grid grid-cols-2 gap-0">
              <div className="relative h-[400px] overflow-hidden">
                <img
                  src={showAfter ? GALLERY[galleryIdx].after : GALLERY[galleryIdx].before}
                  alt={showAfter ? 'Dupa' : 'Inainte'}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <Badge className="absolute top-4 left-4 text-white border-0 text-[10px] font-bold" style={{ background: showAfter ? '#059669' : '#6b7280' }}>
                  {showAfter ? 'DUPA' : 'INAINTE'}
                </Badge>
              </div>
              <div className="p-10 flex flex-col justify-center">
                <div className="text-[11px] uppercase tracking-[.15em] mb-2" style={{ color: C.accent }}>Studiu de caz</div>
                <h3 className="font-display text-[24px] font-semibold mb-3" style={{ color: B.nv }}>{GALLERY[galleryIdx].label}</h3>
                <p className="text-[13px] text-[#5a7a6e] mb-6">{GALLERY[galleryIdx].patient}</p>
                <button
                  onClick={() => setShowAfter(!showAfter)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-bold text-white cursor-pointer border-none transition-all hover:opacity-90"
                  style={{ background: showAfter ? '#059669' : C.accent }}
                >
                  <Eye className="w-4 h-4" /> {showAfter ? 'Vezi inainte' : 'Vezi rezultatul'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ DSD EXPERIENCE — Visual storytelling ━━━ */}
      <section className="py-20 px-12" style={{ background: '#fdf2f8' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-14">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" style={{ color: C.accent }} />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: C.accent }}>Digital Smile Design</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Experienta DSD in <span style={{ color: C.accent }}>6 pasi</span>
            </h2>
            <p className="text-[14px] text-[#5a7a6e] mt-3 max-w-[500px] mx-auto">Proiectam zambetul ideal bazat pe proportiile tale faciale. Vedeti si aprobati rezultatul inainte de a incepe.</p>
          </div>

          <div className="grid grid-cols-[280px_1fr] gap-8">
            {/* Steps navigation */}
            <div className="space-y-2">
              {DSD_STEPS.map((s, i) => (
                <button key={i} onClick={() => setDsdStep(i)}
                  className={cn(
                    'w-full text-left p-4 rounded-xl cursor-pointer border transition-all flex items-center gap-3',
                    dsdStep === i ? 'bg-white border-[#e8157a]/20 shadow-sm' : 'bg-transparent border-transparent hover:bg-white/60'
                  )}
                >
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
                    dsdStep === i ? 'text-white' : 'bg-[#e8157a]/10 text-[#e8157a]'
                  )} style={dsdStep === i ? { background: C.accent } : {}}>
                    <s.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#5a7a6e]">Pasul {s.step}</div>
                    <div className={cn('text-[13px] font-semibold', dsdStep === i ? 'text-[#e8157a]' : 'text-[#0a1e18]')}>{s.title}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Active step detail */}
            <div className="bg-white rounded-2xl border border-[--bdr] p-10 shadow-sm flex flex-col justify-center" key={dsdStep} style={{ animation: 'fadeUp 0.25s ease-out' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white" style={{ background: C.accent }}>
                  {(() => { const I = DSD_STEPS[dsdStep].icon; return <I className="w-7 h-7" strokeWidth={1.5} /> })()}
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: C.accent }}>Pasul {DSD_STEPS[dsdStep].step}</div>
                  <h3 className="font-display text-[24px] font-semibold" style={{ color: B.nv }}>{DSD_STEPS[dsdStep].title}</h3>
                </div>
              </div>
              <p className="text-[16px] leading-[1.8] text-[#5a7a6e] mb-6">{DSD_STEPS[dsdStep].desc}</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fdf2f8] border border-[#e8157a]/10 text-[12px] font-bold" style={{ color: C.accent }}>
                <Gem className="w-3.5 h-3.5" /> {DSD_STEPS[dsdStep].detail}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ VIP SOCIAL PROOF — Instagram grid style ━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-12">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <Star className="w-4 h-4" style={{ color: C.accent }} />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: C.accent }}>Social proof</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Oameni de <span style={{ color: C.accent }}>succes</span> care au ales SDT
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {VIP_REVIEWS.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl border border-[--bdr] p-6 hover:border-[#e8157a]/30 transition-all hover:shadow-lg group">
                <div className="flex items-center gap-3 mb-4">
                  <img src={r.photo} alt={r.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-[#e8157a]/20" />
                  <div>
                    <div className="text-[13px] font-semibold" style={{ color: B.nv }}>{r.name}</div>
                    <div className="text-[10px] text-[#5a7a6e]">{r.title}</div>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">{[1,2,3,4,5].map(j => <Star key={j} className="w-3 h-3 text-[#fbb040] fill-current" />)}</div>
                <p className="text-[12px] leading-[1.7] text-[#5a7a6e] italic mb-3">&ldquo;{r.text}&rdquo;</p>
                <div className="text-[11px] font-bold" style={{ color: C.accent }}>{r.hashtag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ INVESTMENT — Premium pricing ━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: C.gradient }}>
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center mb-14">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <Diamond className="w-4 h-4 text-[#f472b6]" />
              <span className="text-[11px] font-bold uppercase tracking-[.15em] text-[#f472b6]">Investitie in tine</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight text-white">
              Zambetul perfect are un <span className="text-[#f472b6]">pret corect.</span>
            </h2>
            <p className="text-[14px] text-white/40 mt-3">Fiecare pachet include Digital Smile Design complet si mock-up fizic.</p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {INVESTMENT.map((inv, i) => (
              <div key={i}
                className={cn(
                  'rounded-2xl p-8 transition-all relative',
                  inv.popular ? 'bg-white shadow-2xl scale-[1.03]' : 'bg-white/[.06] border border-white/10 hover:bg-white/[.1]'
                )}
              >
                {inv.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-bold text-white tracking-wider" style={{ background: C.accent }}>
                    CEL MAI POPULAR
                  </div>
                )}
                <div className={cn('text-[11px] font-bold uppercase tracking-[.15em] mb-1', inv.popular ? 'text-[#e8157a]' : 'text-white/50')}>{inv.tier}</div>
                <div className={cn('font-display text-[32px] font-semibold mb-1', inv.popular ? 'text-[#0a1e18]' : 'text-white')}>{inv.price}</div>
                <div className={cn('text-[12px] mb-4', inv.popular ? 'text-[#5a7a6e]' : 'text-white/40')}>{inv.fatete}</div>
                <p className={cn('text-[13px] leading-[1.7] mb-6', inv.popular ? 'text-[#5a7a6e]' : 'text-white/50')}>{inv.desc}</p>
                <div className="space-y-2.5 mb-6">
                  {inv.features.map(f => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckCircle className={cn('w-4 h-4 flex-shrink-0', inv.popular ? 'text-[#e8157a]' : 'text-[#f472b6]')} strokeWidth={1.5} />
                      <span className={cn('text-[12px]', inv.popular ? 'text-[#5a7a6e]' : 'text-white/60')}>{f}</span>
                    </div>
                  ))}
                </div>
                <Button
                  className={cn('w-full justify-center py-3 text-[13px] font-bold rounded-full',
                    inv.popular ? 'text-white' : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                  )}
                  style={inv.popular ? { background: C.accent } : {}}
                >
                  Programeaza consultatie <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ INTERCONNECTED: Blog ━━━━━━━━━━━━━ */}
      {RELATED_BLOGS.length > 0 && (
        <section className="py-14 px-12" style={{ background: B.ps }}>
          <div className="mx-auto max-w-[1200px]">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" style={{ color: C.accent }} />
                <h2 className="font-display text-[20px] font-semibold" style={{ color: B.nv }}>Citeste mai mult despre estetica dentara</h2>
              </div>
              <a href="/blog" className="text-[13px] font-bold no-underline flex items-center gap-1" style={{ color: C.accent }}>Toate articolele <ArrowRight className="w-3.5 h-3.5" /></a>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {RELATED_BLOGS.map(art => (
                <a key={art.slug} href={`/blog/${art.slug}`} className="no-underline group">
                  <Card className="overflow-hidden border-[--bdr] hover:border-[#e8157a]/30 transition-all hover:shadow-lg h-full">
                    <div className="h-[160px] overflow-hidden">
                      <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <CardContent className="p-4">
                      <div className="text-[11px] text-[#5a7a6e] mb-2"><Clock className="w-3 h-3 inline mr-1" />{art.readTime}</div>
                      <h3 className="font-display text-[14px] font-semibold leading-snug group-hover:text-[#e8157a] transition-colors" style={{ color: B.nv }}>{art.title}</h3>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ━━━ INTERCONNECTED: Ambassadors ━━━━━━━ */}
      <section className="py-14 px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" style={{ color: C.accent }} />
              <h2 className="font-display text-[20px] font-semibold" style={{ color: B.nv }}>Ambasadori care au ales fatete dentare</h2>
            </div>
            <a href="/ambasadori" className="text-[13px] font-bold no-underline flex items-center gap-1" style={{ color: C.accent }}>Toti ambasadorii <ArrowRight className="w-3.5 h-3.5" /></a>
          </div>
          <div className="flex gap-5">
            {RELATED_AMBASSADORS.map(amb => (
              <a key={amb.slug} href="/ambasadori" className="no-underline group flex items-center gap-4 bg-white rounded-xl p-4 border border-[--bdr] hover:border-[#e8157a]/30 transition-all flex-1">
                <img src={amb.photo} alt={amb.name} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <div className="font-display text-[15px] font-semibold group-hover:text-[#e8157a] transition-colors" style={{ color: B.nv }}>{amb.name}</div>
                  <div className="text-[11px] font-semibold" style={{ color: C.accent }}>{amb.role}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ FAQ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: '#fdf2f8' }}>
        <div className="mx-auto max-w-[800px]">
          <div className="text-center mb-12">
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Intrebari despre <span style={{ color: C.accent }}>fatete dentare</span>
            </h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="border border-[--bdr] rounded-xl overflow-hidden transition-all" style={{ background: openFaq === i ? 'white' : 'white' }}>
                <button className="w-full flex justify-between items-center p-5 text-left cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-display text-[15px] font-semibold pr-4" style={{ color: B.nv }}>{item.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 flex-shrink-0" style={{ color: C.accent }} /> : <ChevronDown className="w-5 h-5 flex-shrink-0 text-[#5a7a6e]" />}
                </button>
                {openFaq === i && <div className="px-5 pb-5 pt-0 text-[14px] leading-[1.75] text-[#5a7a6e]">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ FINAL CTA ━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: `linear-gradient(135deg, #2a0a18 0%, ${C.accent} 100%)` }}>
        <div className="mx-auto max-w-[1200px] flex gap-16 items-center">
          <div className="flex-1 text-white">
            <h2 className="font-display text-[36px] font-semibold leading-[1.1] mb-4">
              Zambetul tau de<br/><span className="text-[#f9a8d4]">cover story.</span>
            </h2>
            <p className="text-white/50 mb-6 max-w-[400px] text-[15px] leading-relaxed font-light">
              Programeaza o consultatie Digital Smile Design. Vedeti cum va arata zambetul tau inainte de a lua orice decizie.
            </p>
            <div className="space-y-2.5 mb-6">
              {(['Consultatie DSD completa', 'Simulare fotorealista a zambetului', 'Mock-up fizic — proba reala in gura', 'Fara obligatii — decizi in ritmul tau'] as const).map(item => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-[#f9a8d4] flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-[14px] text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[400px] shrink-0 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-display text-[20px] font-semibold mb-1" style={{ color: B.nv }}>Programeaza DSD</h3>
            <p className="text-sm text-[#5a7a6e] mb-5">Te contactam in maxim 24h.</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Input placeholder="Prenume" />
              <Input placeholder="Nume" />
            </div>
            <Input placeholder="Telefon *" className="mb-3" />
            <select defaultValue="Fatete dentare" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mb-3">
              <option>Fatete dentare</option>
              <option>Hollywood Smile</option>
              <option>Nu stiu — vreau consultatie</option>
            </select>
            <Button className="w-full justify-center py-3.5 text-[14px] font-bold text-white rounded-full" style={{ background: C.accent }}>
              Vreau consultatie DSD <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <p className="text-[10px] text-[#5a7a6e] text-center mt-2">Consultatie premium. Fara obligatii.</p>
          </div>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="section-line" />
      <footer className="pt-16 pb-8 px-[52px]" style={{ background: B.nv }}>
        <div className="grid gap-12 mb-12" style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr' }}>
          <div>
            <div className="mb-5"><Logo height={34} light/></div>
            <p className="text-sm leading-[1.75] text-white/60 max-w-[260px]">Clinica stomatologica digitala. {STATS.years} ani, {STATS.team} specialisti, {STATS.patients} pacienti.</p>
            <div className="mt-5 p-3 px-4 border rounded-lg" style={{ background: `${C.accent}15`, borderColor: `${C.accent}30` }}>
              <div className="font-display text-base font-semibold" style={{ color: C.accent }}>{CAMPAIGN_2026.slogan}</div>
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-white tracking-[.15em] uppercase mb-5">Servicii</div>
            <a href="/servicii/fatete-dentare" className="block text-[13px] mb-2.5 font-semibold no-underline" style={{ color: C.accent }}>Fatete Dentare</a>
            {SERVICES.filter(s => s.slug !== 'estetica').map(s => (
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
                <div className="text-xs text-white/[.52]">{l.address} &middot; {l.phone}</div>
              </div>
            ))}
            <a href="mailto:info@smiledent.md" className="text-[13px] font-semibold no-underline" style={{ color: `${C.accent}cc` }}>info@smiledent.md</a>
          </div>
        </div>
        <div className="border-t border-white/[.07] pt-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Logo height={26} light/>
            <span className="text-xs text-white/[.28]">&copy; {CAMPAIGN_2026.year} Smile Dent Team.</span>
          </div>
          <div className="flex gap-1.5">
            {['RO','RU','EN'].map(l => (
              <span key={l} className="bg-white/[.08] text-white/50 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-[.08em] cursor-pointer hover:bg-white/15 hover:text-white transition-all">{l}</span>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}

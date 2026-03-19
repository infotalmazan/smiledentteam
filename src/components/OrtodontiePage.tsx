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
  Smile, Zap, Target, Scan, Play, Phone, MapPin,
  DollarSign, TrendingUp, HelpCircle, X, Check
} from 'lucide-react'

const C = SVC_COLORS.ortodontie

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
          <a key={l} href={h} className={cn('relative text-sm no-underline pb-1 font-medium', l === 'Servicii' ? 'font-bold text-[#0891b2]' : 'text-[#3a5a50]')}>
            {l}
            {l === 'Servicii' && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-5 rounded-full" style={{ background: C.accent }} />}
          </a>
        ))}
      </div>
      <div className="flex gap-2.5 items-center">
        <a href="/login" className="no-underline"><Button variant="outline" size="sm" className="border-[#0891b2] text-[#0891b2] font-semibold text-[13px]">Cabinetul meu</Button></a>
        <Button size="sm" className="text-[13px] text-white" style={{ background: C.accent }}>Programeaza-te</Button>
      </div>
    </nav>
  )
}

const ANIM = `
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  @keyframes pulse-glow { 0%,100% { box-shadow: 0 0 0 0 rgba(8,145,178,0.3); } 50% { box-shadow: 0 0 20px 6px rgba(8,145,178,0.15); } }
`

/* ═══════════════════════════════════════════════
   CONCEPT: "YOUNG, FRESH, DIGITAL"
   Split design for teens + parents, fun & modern
   Target: 14+ teenagers, parents, young adults 20-30
   ═══════════════════════════════════════════════ */

/* ─── Invisalign vs Brackets comparison ───── */
const COMPARISON: { feature: string; invisalign: string; brackets: string; winner: 'invisalign' | 'brackets' | 'tie' }[] = [
  { feature: 'Vizibilitate', invisalign: 'Aproape invizibil', brackets: 'Vizibil', winner: 'invisalign' },
  { feature: 'Confort', invisalign: 'Se scot la masa', brackets: 'Fix, restrictii alimentare', winner: 'invisalign' },
  { feature: 'Igiena', invisalign: 'Periaj normal', brackets: 'Periaj mai dificil', winner: 'invisalign' },
  { feature: 'Cazuri complexe', invisalign: 'Cazuri usoare-medii', brackets: 'Toate cazurile', winner: 'brackets' },
  { feature: 'Pret de la', invisalign: '1.000\u20AC', brackets: '800\u20AC', winner: 'brackets' },
  { feature: 'Durata', invisalign: '6-18 luni', brackets: '12-24 luni', winner: 'invisalign' },
  { feature: 'Vizite la cabinet', invisalign: 'La fiecare 6-8 sapt.', brackets: 'La fiecare 4 sapt.', winner: 'invisalign' },
  { feature: 'Simulare rezultat', invisalign: 'ClinCheck 3D', brackets: 'Nu', winner: 'invisalign' },
]

/* ─── Timeline durations ──────────────────── */
const TIMELINES = [
  { months: 6, label: '6 luni', desc: 'Cazuri usoare: inghesuire minima, spatii mici', severity: 'Usor', color: '#10b981' },
  { months: 12, label: '12 luni', desc: 'Cazuri medii: inghesuire moderata, ocluzie usoara', severity: 'Mediu', color: '#0891b2' },
  { months: 18, label: '18 luni', desc: 'Cazuri complexe: ocluzie defectuoasa, spatii multiple', severity: 'Complex', color: '#6366f1' },
  { months: 24, label: '24 luni', desc: 'Cazuri foarte complexe: malocluzii severe, chirurgie ortognatica', severity: 'Avansat', color: '#e8157a' },
]

/* ─── Young influencer reviews ────────────── */
const REVIEWS = [
  { name: 'Ana S.', age: '16 ani', text: 'Invisalign e genial! Nimeni de la scoala nu stie ca port aparat. Si l-am scos in poze la bal fara probleme.', type: 'Invisalign', months: 8, photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face' },
  { name: 'Mihai R.', age: '22 ani', text: 'Am purtat brackets 14 luni. Rezultatul merita 100%. Acum zambesc in fiecare selfie.', type: 'Brackets', months: 14, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
  { name: 'Diana V.', age: '28 ani', text: 'La 28 ani am decis in sfarsit. Invisalign la birou — nimeni nu a observat. Cel mai bun cadou pe care mi l-am facut.', type: 'Invisalign', months: 10, photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face' },
]

/* ─── Parent FAQ ──────────────────────────── */
const PARENT_FAQ = [
  { q: 'La ce varsta trebuie sa incep tratamentul ortodontic pentru copilul meu?', a: 'Prima evaluare ortodontica recomandata este la 7 ani. Tratamentul activ incepe de obicei la 12-14 ani, dupa eruptia dintilor permanenti. Ortodontul SDT va recomanda momentul optim.' },
  { q: 'Cat costa tratamentul ortodontic complet?', a: 'Invisalign: de la 1.000 euro. Brackets: de la 800 euro. Pretul include consultatie, scanare 3D ClinCheck, aparatul complet, toate controalele si contentia. Rate de la 42 euro/luna.' },
  { q: 'Ortodontia este dureroasa pentru copilul meu?', a: 'Durerea este minima — un disconfort usor primele 2-3 zile dupa aplicare sau ajustare, gestionabil cu paracetamol. Copiii se adapteaza foarte rapid.' },
  { q: 'Cat dureaza tratamentul ortodontic?', a: 'Intre 6-24 luni, in functie de complexitate. Simularea ClinCheck 3D va arata durata exacta inainte de a incepe tratamentul.' },
  { q: 'Invisalign sau brackets — ce e mai bun pentru adolescenti?', a: 'Depinde de caz si de responsabilitatea adolescentului. Invisalign necesita purtare 22h/zi si disciplina. Brackets-urile sunt fixe si nu depind de cooperarea pacientului. Ortodontul va recomanda optiunea potrivita.' },
]

const FAQ = [
  { q: 'Ce include pretul tratamentului ortodontic?', a: 'Pretul include: consultatie initiala, scanare 3D, simulare ClinCheck (Invisalign), aparatul complet, toate controalele lunare pe durata tratamentului si aparatul de contentie. Zero costuri ascunse.' },
  { q: 'Pot sa platesc in rate?', a: 'Da! Oferim rate lunare fara dobanda. Invisalign de la 42 euro/luna, Brackets de la 34 euro/luna. Plata se poate esalona pe intreaga durata a tratamentului.' },
  { q: 'Ce este simularea ClinCheck?', a: 'ClinCheck este software-ul Invisalign care creeaza o simulare 3D a intregului tratament. Vedeti cum se vor muta dintii, pas cu pas, si cum va arata zambetul final — inainte de a incepe.' },
  { q: 'Pot sa fac sport cu aparatul ortodontic?', a: 'Da! Cu Invisalign, scoateti alinierea pentru sport de contact. Cu brackets, recomandam un protector bucal. Sportul nu este o contraindicatie.' },
]

const RELATED_BLOGS = BLOG_ARTICLES.filter(a => a.tags.some(t => t.includes('ortodontie') || t.includes('invisalign') || t.includes('brackets') || t.includes('aliniere'))).slice(0, 3)
const RELATED_AMBASSADORS = AMBASSADORS.filter(a => ['rascu', 'malareu', 'spataru'].includes(a.slug))

/* ─── Page Component ─────────────────────── */
export function OrtodontiePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [openParentFaq, setOpenParentFaq] = useState<number | null>(null)
  const [activeTimeline, setActiveTimeline] = useState(1)
  const [audience, setAudience] = useState<'teen' | 'parent'>('teen')

  return (
    <>
      <Nav />
      <style dangerouslySetInnerHTML={{ __html: ANIM }} />

      {/* Breadcrumbs */}
      <div className="bg-[#fafcfb] border-b border-[--bdr] px-12 py-3">
        <div className="mx-auto max-w-[1200px] flex items-center gap-2 text-[12px] text-[#5a7a6e]">
          <a href="/" className="no-underline text-[#5a7a6e] hover:text-sdt-600">Acasa</a><span>/</span>
          <a href="/servicii" className="no-underline text-[#5a7a6e] hover:text-sdt-600">Servicii</a><span>/</span>
          <span className="font-semibold" style={{ color: C.accent }}>Ortodontie Digitala</span>
        </div>
      </div>

      {/* ━━━ HERO — Split design: teens / parents ━━━ */}
      <section className="relative overflow-hidden" style={{ background: C.gradient }}>
        <div className="mx-auto max-w-[1200px] px-12 py-16">
          {/* Audience toggle */}
          <div className="flex justify-center mb-10">
            <div className="bg-white/10 rounded-full p-1 flex gap-1">
              <button onClick={() => setAudience('teen')}
                className={cn('px-6 py-2.5 rounded-full text-[13px] font-bold cursor-pointer border-none transition-all',
                  audience === 'teen' ? 'bg-white text-[#0891b2] shadow-lg' : 'text-white/60 hover:text-white'
                )}>
                Pentru mine
              </button>
              <button onClick={() => setAudience('parent')}
                className={cn('px-6 py-2.5 rounded-full text-[13px] font-bold cursor-pointer border-none transition-all',
                  audience === 'parent' ? 'bg-white text-[#0891b2] shadow-lg' : 'text-white/60 hover:text-white'
                )}>
                Pentru copilul meu
              </button>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_420px] gap-12 items-center" key={audience} style={{ animation: 'fadeUp 0.3s ease-out' }}>
            <div>
              <div className="mb-5 flex items-center gap-3">
                <Badge className="text-white border-0 text-[10px] font-bold" style={{ background: C.accent }}>ORTODONTIE DIGITALA</Badge>
                <Badge className="bg-white/10 text-white/70 border-white/20 text-[10px]">INVISALIGN & BRACKETS</Badge>
              </div>
              <h1 className="font-display mb-5 text-[44px] font-semibold leading-[1.05] tracking-tight text-white">
                {audience === 'teen' ? (
                  <>Dinti drepti,<br/><span className="text-cyan-300">zero stres.</span></>
                ) : (
                  <>Investitie in<br/><span className="text-cyan-300">viitorul lor.</span></>
                )}
              </h1>
              <p className="mb-6 max-w-[460px] text-[16px] leading-relaxed text-white/50">
                {audience === 'teen'
                  ? 'Aparat invizibil sau brackets modern — tu alegi. Simularea ClinCheck 3D iti arata cum va arata zambetul tau final inainte de a incepe.'
                  : 'Tratamentul ortodontic corect la varsta potrivita previne probleme grave. Scanare 3D, plan digital, rezultat previzibil.'}
              </p>
              <div className="space-y-3 mb-8 max-w-[440px]">
                {(audience === 'teen' ? [
                  { I: Eye, l: 'Invisalign — aproape invizibil, nimeni nu stie' },
                  { I: Scan, l: 'Simulare ClinCheck — vezi rezultatul final' },
                  { I: Timer, l: 'De la 6 luni — rezultate rapide' },
                  { I: DollarSign, l: 'De la 42\u20AC/luna — rate fara dobanda' },
                ] : [
                  { I: Shield, l: 'Tratament personalizat, plan digital complet' },
                  { I: Target, l: 'Rezultat previzibil — vedeti simularea 3D' },
                  { I: Heart, l: 'Fara durere — disconfort minim, adaptare rapida' },
                  { I: DollarSign, l: 'Rate de la 42\u20AC/luna, fara dobanda' },
                ] as const).map(({ I, l }) => (
                  <div key={l} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${C.accent}30` }}>
                      <I className="w-4 h-4 text-cyan-300" strokeWidth={1.5} />
                    </div>
                    <span className="text-[14px] text-white/70 leading-relaxed">{l}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Button className="gap-2 px-8 py-4 text-[15px] font-bold text-white" style={{ background: C.accent }}>
                  {audience === 'teen' ? 'Vreau consultatie' : 'Programeaza evaluare'} <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="gap-2 border-white/20 px-6 py-4 text-[15px] text-white hover:bg-white/10">
                  <Play className="h-4 w-4" /> Simulare ClinCheck
                </Button>
              </div>
            </div>

            {/* Right — Image + price */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border-2 border-white/10 relative" style={{ aspectRatio: '3/4' }}>
                <img src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=500&h=670&fit=crop" alt="Ortodontie" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex gap-0.5 mb-2">{[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-[#fbb040] fill-current" />)}</div>
                  <p className="text-[13px] text-white/80 italic mb-2">&ldquo;Am ales Invisalign si a fost cea mai buna decizie.&rdquo;</p>
                  <div className="text-[11px] text-white/50">Ana S., 16 ani</div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-6 bg-white rounded-xl px-5 py-3 shadow-lg" style={{ animation: 'float 3s ease-in-out infinite' }}>
                <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: C.accent }}>De la</div>
                <div className="font-display text-[26px] font-semibold" style={{ color: C.accent }}>42<span className="text-[16px]">&euro;/luna</span></div>
                <div className="text-[10px] text-[#5a7a6e]">Rate 0% dobanda</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ INVISALIGN vs BRACKETS ━━━━━━━━━━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[1000px]">
          <div className="text-center mb-12">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: C.accent }} />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: C.accent }}>Comparatie</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Invisalign <span className="text-[#5a7a6e] text-[28px]">vs.</span> <span style={{ color: C.accent }}>Brackets</span>
            </h2>
          </div>

          <div className="rounded-2xl border border-[--bdr] overflow-hidden bg-white">
            {/* Header */}
            <div className="grid grid-cols-[1fr_1fr_1fr] text-center border-b border-[--bdr]">
              <div className="p-4 text-[12px] font-bold uppercase tracking-wider text-[#5a7a6e]">Criteriu</div>
              <div className="p-4 text-[12px] font-bold uppercase tracking-wider text-[#0891b2] bg-cyan-50/50">Invisalign</div>
              <div className="p-4 text-[12px] font-bold uppercase tracking-wider text-[#5a7a6e]">Brackets</div>
            </div>
            {COMPARISON.map((row, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr_1fr] border-b border-[--bdr] last:border-0">
                <div className="p-4 text-[13px] font-semibold" style={{ color: B.nv }}>{row.feature}</div>
                <div className={cn('p-4 text-[13px] text-center', row.winner === 'invisalign' ? 'bg-cyan-50/30 font-semibold text-[#0891b2]' : 'text-[#5a7a6e]')}>
                  {row.winner === 'invisalign' && <Check className="w-3.5 h-3.5 inline mr-1 text-[#0891b2]" />}
                  {row.invisalign}
                </div>
                <div className={cn('p-4 text-[13px] text-center', row.winner === 'brackets' ? 'font-semibold text-[#0891b2]' : 'text-[#5a7a6e]')}>
                  {row.winner === 'brackets' && <Check className="w-3.5 h-3.5 inline mr-1 text-[#0891b2]" />}
                  {row.brackets}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[13px] text-[#5a7a6e] mt-4">Nu stii ce sa alegi? Ortodontul SDT iti recomanda optiunea potrivita la consultatie.</p>
        </div>
      </section>

      {/* ━━━ CLINCHECK SIMULATION ━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: '#ecfeff' }}>
        <div className="mx-auto max-w-[1100px]">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" style={{ color: C.accent }} />
                <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: C.accent }}>ClinCheck 3D</span>
              </div>
              <h2 className="font-display text-[32px] font-semibold tracking-tight mb-4" style={{ color: B.nv }}>
                Vezi-ti viitorul <span style={{ color: C.accent }}>zambet.</span>
              </h2>
              <p className="text-[15px] leading-[1.8] text-[#5a7a6e] mb-6">
                Simularea ClinCheck creeaza un film 3D al intregului tratament. Vedeti cum se muta fiecare dinte, pas cu pas, pana la zambetul final. Zero surprize, 100% previzibil.
              </p>
              <div className="space-y-3 mb-6">
                {([
                  { I: Target, l: 'Simulare 3D completa a tratamentului' },
                  { I: Timer, l: 'Vedeti durata exacta si numarul de aliniere' },
                  { I: Smile, l: 'Previzualizati zambetul final inainte de start' },
                  { I: CheckCircle, l: 'Aprobati sau ajustati planul' },
                ] as const).map(({ I, l }) => (
                  <div key={l} className="flex items-center gap-3">
                    <I className="w-5 h-5 flex-shrink-0" style={{ color: C.accent }} strokeWidth={1.5} />
                    <span className="text-[14px] text-[#5a7a6e]">{l}</span>
                  </div>
                ))}
              </div>
              <Button className="text-white text-[14px] font-bold" style={{ background: C.accent }}>
                Vreau simulare ClinCheck <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="rounded-2xl overflow-hidden border border-[--bdr] shadow-lg" style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}>
              <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=450&fit=crop" alt="ClinCheck Simulare" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ TIMELINE DURATION ━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[1000px]">
          <div className="text-center mb-12">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <Timer className="w-4 h-4" style={{ color: C.accent }} />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: C.accent }}>Durata tratamentului</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Cat <span style={{ color: C.accent }}>dureaza?</span>
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {TIMELINES.map((t, i) => (
              <button key={i} onClick={() => setActiveTimeline(i)}
                className={cn(
                  'p-6 rounded-xl text-left cursor-pointer border transition-all',
                  activeTimeline === i ? 'bg-white shadow-lg border-[#0891b2]/20' : 'bg-white/50 border-[--bdr] hover:border-[#0891b2]/20'
                )}
              >
                {/* Progress bar */}
                <div className="h-2 rounded-full bg-gray-100 mb-4 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(t.months / 24) * 100}%`, background: t.color }} />
                </div>
                <div className="font-display text-[28px] font-semibold mb-1" style={{ color: activeTimeline === i ? t.color : B.nv }}>{t.label}</div>
                <Badge className="text-[9px] font-bold border-0 mb-3 text-white" style={{ background: t.color }}>{t.severity}</Badge>
                <p className="text-[12px] leading-[1.6] text-[#5a7a6e]">{t.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ YOUNG REVIEWS ━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: '#ecfeff' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-12">
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Zambete <span style={{ color: C.accent }}>noi</span>
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <Card key={i} className="overflow-hidden border-[--bdr] hover:border-[#0891b2]/30 transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={r.photo} alt={r.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-cyan-200" />
                    <div>
                      <div className="text-[13px] font-semibold" style={{ color: B.nv }}>{r.name}</div>
                      <div className="text-[10px] text-[#5a7a6e]">{r.age}</div>
                    </div>
                    <Badge className="ml-auto text-[9px] font-bold border-0 text-white" style={{ background: C.accent }}>{r.type}</Badge>
                  </div>
                  <div className="flex gap-0.5 mb-3">{[1,2,3,4,5].map(j => <Star key={j} className="w-3 h-3 text-[#fbb040] fill-current" />)}</div>
                  <p className="text-[13px] leading-[1.65] text-[#5a7a6e] italic mb-3">&ldquo;{r.text}&rdquo;</p>
                  <div className="flex items-center gap-2 text-[11px]" style={{ color: C.accent }}>
                    <Timer className="w-3.5 h-3.5" /> Durata: {r.months} luni
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ PARENT FAQ ━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[800px]">
          <div className="text-center mb-12">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" style={{ color: C.accent }} />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: C.accent }}>Pentru parinti</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Raspunsuri pentru <span style={{ color: C.accent }}>parinti</span>
            </h2>
            <p className="text-[14px] text-[#5a7a6e] mt-2">Tot ce trebuie sa stiti despre tratamentul ortodontic al copilului.</p>
          </div>
          <div className="space-y-3">
            {PARENT_FAQ.map((item, i) => (
              <div key={i} className="border border-[--bdr] rounded-xl overflow-hidden bg-white">
                <button className="w-full flex justify-between items-center p-5 text-left cursor-pointer" onClick={() => setOpenParentFaq(openParentFaq === i ? null : i)}>
                  <span className="font-display text-[15px] font-semibold pr-4" style={{ color: B.nv }}>{item.q}</span>
                  {openParentFaq === i ? <ChevronUp className="w-5 h-5 flex-shrink-0" style={{ color: C.accent }} /> : <ChevronDown className="w-5 h-5 flex-shrink-0 text-[#5a7a6e]" />}
                </button>
                {openParentFaq === i && <div className="px-5 pb-5 pt-0 text-[14px] leading-[1.75] text-[#5a7a6e]">{item.a}</div>}
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
                <h2 className="font-display text-[20px] font-semibold" style={{ color: B.nv }}>Citeste mai mult despre ortodontie</h2>
              </div>
              <a href="/blog" className="text-[13px] font-bold no-underline flex items-center gap-1" style={{ color: C.accent }}>Toate articolele <ArrowRight className="w-3.5 h-3.5" /></a>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {RELATED_BLOGS.map(art => (
                <a key={art.slug} href={`/blog/${art.slug}`} className="no-underline group">
                  <Card className="overflow-hidden border-[--bdr] hover:border-[#0891b2]/30 transition-all hover:shadow-lg h-full">
                    <div className="h-[160px] overflow-hidden">
                      <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <CardContent className="p-4">
                      <div className="text-[11px] text-[#5a7a6e] mb-2"><Clock className="w-3 h-3 inline mr-1" />{art.readTime}</div>
                      <h3 className="font-display text-[14px] font-semibold leading-snug group-hover:text-[#0891b2] transition-colors" style={{ color: B.nv }}>{art.title}</h3>
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
              <h2 className="font-display text-[20px] font-semibold" style={{ color: B.nv }}>Ambasadori cu zambete drepte</h2>
            </div>
            <a href="/ambasadori" className="text-[13px] font-bold no-underline flex items-center gap-1" style={{ color: C.accent }}>Toti ambasadorii <ArrowRight className="w-3.5 h-3.5" /></a>
          </div>
          <div className="flex gap-5">
            {RELATED_AMBASSADORS.map(amb => (
              <a key={amb.slug} href="/ambasadori" className="no-underline group flex items-center gap-4 bg-white rounded-xl p-4 border border-[--bdr] hover:border-[#0891b2]/30 transition-all flex-1">
                <img src={amb.photo} alt={amb.name} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <div className="font-display text-[15px] font-semibold group-hover:text-[#0891b2] transition-colors" style={{ color: B.nv }}>{amb.name}</div>
                  <div className="text-[11px] font-semibold" style={{ color: C.accent }}>{amb.role}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ FAQ General ━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: '#ecfeff' }}>
        <div className="mx-auto max-w-[800px]">
          <div className="text-center mb-12">
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Intrebari <span style={{ color: C.accent }}>frecvente</span>
            </h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="border border-[--bdr] rounded-xl overflow-hidden bg-white">
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
      <section className="py-20 px-12" style={{ background: `linear-gradient(135deg, #0a1e20 0%, ${C.accent} 100%)` }}>
        <div className="mx-auto max-w-[1200px] flex gap-16 items-center">
          <div className="flex-1 text-white">
            <h2 className="font-display text-[36px] font-semibold leading-[1.1] mb-4">
              Primul pas spre<br/><span className="text-cyan-300">zambetul drept.</span>
            </h2>
            <p className="text-white/50 mb-6 max-w-[400px] text-[15px] leading-relaxed">
              Consultatia ortodontica include scanare 3D si simulare ClinCheck. Afli totul: durata, optiuni, pret exact.
            </p>
            <div className="space-y-2.5 mb-6">
              {(['Consultatie + scanare 3D', 'Simulare ClinCheck gratuita', 'Plan complet cu pret exact', 'Rate de la 42 euro/luna'] as const).map(item => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-cyan-300 flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-[14px] text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[400px] shrink-0 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-display text-[20px] font-semibold mb-1" style={{ color: B.nv }}>Programeaza evaluare</h3>
            <p className="text-sm text-[#5a7a6e] mb-5">Te sunam in maxim 24h.</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Input placeholder="Prenume" />
              <Input placeholder="Nume" />
            </div>
            <Input placeholder="Telefon *" className="mb-3" />
            <select defaultValue="Ortodontie" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mb-3">
              <option>Ortodontie — pentru mine</option>
              <option>Ortodontie — pentru copilul meu</option>
              <option>Nu stiu — vreau consultatie</option>
            </select>
            <Button className="w-full justify-center py-3.5 text-[14px] font-bold text-white" style={{ background: C.accent }}>
              Vreau evaluare gratuita <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <p className="text-[10px] text-[#5a7a6e] text-center mt-2">Fara obligatii. Include simulare ClinCheck.</p>
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
            <a href="/servicii/ortodontie-digitala" className="block text-[13px] mb-2.5 font-semibold no-underline" style={{ color: C.accent }}>Ortodontie Digitala</a>
            {SERVICES.filter(s => s.slug !== 'ortodontie').map(s => (
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

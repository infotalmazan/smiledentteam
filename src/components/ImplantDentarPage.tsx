'use client'

import { useState } from 'react'
import { Logo } from './Logo'
import { BRAND as B, STATS, SERVICES, LOCATIONS, CAMPAIGN_2026, AMBASSADORS } from '@/lib/brand'
import { BLOG_ARTICLES } from '@/lib/blog-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  ArrowRight, MapPin, Phone, Clock, CheckCircle, Shield,
  Star, Play, ChevronDown, ChevronUp, Heart, Eye,
  Zap, Award, Users, FileText, Scan, Target, X,
  Timer, AlertCircle, TrendingUp, HelpCircle, Sparkles,
  Calendar, Stethoscope, DollarSign, Video, BookOpen,
  ThumbsDown, ThumbsUp, Frown, Smile, AlertTriangle
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
          <a key={l} href={h} className={cn(
            'relative text-sm no-underline pb-1 font-medium',
            l === 'Servicii' ? 'font-bold text-sdt-600' : 'text-[#3a5a50]'
          )}>
            {l}
            {l === 'Servicii' && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-5 rounded-full bg-pink-500" />}
          </a>
        ))}
      </div>
      <div className="flex gap-2.5 items-center">
        <a href="/login" className="no-underline"><Button variant="outline" size="sm" className="border-sdt-600 text-sdt-600 font-semibold text-[13px]">Cabinetul meu</Button></a>
        <Button variant="accent" size="sm" className="text-[13px]">Programeaza-te</Button>
      </div>
    </nav>
  )
}

const ANIM = `
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  @keyframes breathe { 0%,100% { transform: scale(1); } 50% { transform: scale(1.03); } }
`

/* ═══════════════════════════════════════════════
   CONCEPT: "DE LA FRICĂ LA ZÂMBET"
   Layout empatic, problem-first, emotional journey
   Audiență: 35-55 ani, anxietate, frica de durere
   ═══════════════════════════════════════════════ */

/* ─── Patient journey stages ──────────────── */
const JOURNEY = [
  { emoji: '😟', stage: 'Frica', text: 'Te temi de durere? Nu esti singur. 36% din oameni evita dentistul din frica. La SDT, procedura este complet fara durere.' },
  { emoji: '🔍', stage: 'Descoperire', text: 'Afli ca exista solutii moderne: anestezie avansata, sedare constienta, ghidaj 3D — totul fara disconfort.' },
  { emoji: '📋', stage: 'Planificare', text: 'Digital Check-Up gratuit: scanare 3D + tomografie. Vezi pe ecran exact ce urmeaza. Zero surprize.' },
  { emoji: '⚡', stage: 'Procedura', text: '30-60 minute sub anestezie locala. Ghid 3D — fara taieturi, fara suturi. Mai simplu decat o extractie.' },
  { emoji: '😊', stage: 'Zambet nou', text: 'Dinte nou, fix, natural. Garantie pe viata. Mananci, vorbesti, zambesti — ca si cum n-ar fi fost niciodata lipsa.' },
]

/* ─── Myths vs Reality ────────────────────── */
const MYTHS = [
  { myth: '"Implantul dentar doare foarte tare"', reality: 'Procedura se face sub anestezie locala moderna. Pacientii spun ca este mai usor decat o extractie. Disconfort post-operator: 2-3 zile, gestionabil cu paracetamol.' },
  { myth: '"Este o procedura lunga si complicata"', reality: 'Insertia dureaza 30-60 minute per implant. Cu ghid 3D, interventia este minim invaziva — fara taieturi clasice, fara suturi.' },
  { myth: '"Implanturile sunt foarte scumpe"', reality: 'De la 350€ cu Rate 0% pe 24 luni. Investitia se amortizeaza: implantul dureaza 20-30+ ani, fata de o punte care dureaza 10-15 ani.' },
  { myth: '"Corpul poate respinge implantul"', reality: 'Titanul este biocompatibil — corpul nu il recunoaste ca "strain". Rata de succes: 99.2%. Rejectionarea este extrem de rara (<1%).' },
  { myth: '"La varsta mea e prea tarziu"', reality: 'Nu exista limita de varsta pentru implanturi. Pacientii de 70-80+ ani primesc implanturi cu succes. Conteaza sanatatea osoasa, nu varsta.' },
]

/* ─── What happens if you DON'T ──────────── */
const CONSEQUENCES = [
  { icon: AlertTriangle, title: 'Osul se resoarbe', desc: 'Fara dinte, osul maxilar se resoarbe in 6-12 luni. Cu cat astepti mai mult, cu atat interventia devine mai complexa si mai scumpa.' },
  { icon: Frown, title: 'Dintii vecini se deplaseaza', desc: 'Dintii adiacenti se inclina spre spatiul gol, creand probleme de ocluzie, dureri de cap si dificultati la mestecat.' },
  { icon: AlertCircle, title: 'Aspectul facial se modifica', desc: 'Lipsa dintilor cauzeaza imbatranirea prematura a fetei — obrajii se infunda, buzele se subtieaza, ridurile se accentueaza.' },
]

/* ─── Price calculator data ───────────────── */
const CALC_OPTIONS = [
  { label: '1 implant Straumann', price: 350, monthly: 15 },
  { label: '1 implant Nobel Biocare', price: 500, monthly: 21 },
  { label: 'Implant + Coroana zirconiu', price: 800, monthly: 34 },
  { label: '2 implanturi + Coroane', price: 1500, monthly: 63 },
  { label: 'All-on-4 (arcada completa)', price: 2997, monthly: 125 },
]

const REVIEWS = [
  { name: 'Denis P.', age: '42 ani', text: 'Am avut o frica teribila de dentist. La SDT m-au tratat cu o rabdare incredibila. Am primit implantul fara sa simt absolut nimic. Cel mai bun lucru pe care l-am facut.', procedure: '2 implanturi Straumann', rating: 5, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face', videoThumb: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face' },
  { name: 'Elena M.', age: '55 ani', text: 'Dupa 15 ani de proteza mobila, am ales All-on-4. Am plecat din clinica cu dinti ficsi. Plang de fericire cand ma uit in oglinda. SDT mi-a schimbat viata.', procedure: 'All-on-4 superior', rating: 5, photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face', videoThumb: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop&crop=face' },
  { name: 'Gheorghe T.', age: '63 ani', text: 'Am amanat 5 ani din frica. A fost cea mai mare greseala. Procedura in sine a durat 45 de minute. Acum regret doar ca nu am venit mai devreme.', procedure: 'Implant Nobel + coroana', rating: 5, photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face', videoThumb: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face' },
]

const FAQ = [
  { q: 'Ma tem foarte tare de durere. Ce pot face?', a: 'Intelegem perfect. La SDT, folosim anestezie locala de ultima generatie — nu simtiti absolut nimic. Pentru pacientii cu anxietate severa, oferim sedare constienta: esti relaxat, treaz dar complet fara durere. Multe pacienti adorm in timpul procedurii.' },
  { q: 'Cat costa un implant dentar?', a: 'Implant Straumann: de la 350€. Nobel Biocare: de la 500€. Pachet complet (implant + coroana zirconiu): de la 800€. Oferim Rate 0% pe 24 luni. Consultatia cu Digital Check-Up este GRATUITA.' },
  { q: 'Cat dureaza toata procedura?', a: 'Insertia propriu-zisa: 30-60 minute. Vindecarea (osteointegrare): 3-6 luni cu proteza provizorie. Coroana finala: 2 sedinte. In total, de la prima consultatie la zambet final: 4-7 luni.' },
  { q: 'Este sigur? Care sunt riscurile?', a: 'Implanturile au rata de succes de 99.2%. Titanul este biocompatibil — corpul nu il respinge. Riscurile sunt minime si sunt identificate in avans prin tomografia 3D CBCT.' },
  { q: 'Am 60+ ani. Pot sa fac implant?', a: 'Da! Nu exista limita de varsta. Conteaza sanatatea generala si densitatea osoasa, nu varsta. Avem pacienti de 70-80 ani cu implanturi perfecte. Tomografia 3D evalueaza exact situatia.' },
  { q: 'Ce se intampla daca nu am suficient os?', a: 'Oferim augmentare osoasa (aditie de os, sinus lifting). Planificarea 3D identifica exact cat os aveti si ce interventii sunt necesare. In multe cazuri, implantul se poate face simultan cu augmentarea.' },
  { q: 'Cat de repede pot manca normal?', a: 'Dieta moale 2-3 saptamani dupa insertie. Dupa osteointegrare si coroana finala — mancati absolut orice, fara restrictii. Implantul se comporta exact ca un dinte natural.' },
]

const RELATED_BLOGS = BLOG_ARTICLES.filter(a => a.tags.some(t => t.includes('implant') || t.includes('chirurgie'))).slice(0, 3)
const RELATED_AMBASSADORS = AMBASSADORS.filter(a => ['talmazan', 'malareu', 'cosovan'].includes(a.slug))

/* ─── Page Component ─────────────────────── */
export function ImplantDentarPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [journeyStep, setJourneyStep] = useState(0)
  const [calcIdx, setCalcIdx] = useState(0)
  const [openMyth, setOpenMyth] = useState<number | null>(null)

  return (
    <>
      <Nav />
      <style dangerouslySetInnerHTML={{ __html: ANIM }} />

      {/* Breadcrumbs */}
      <div className="bg-[#fafcfb] border-b border-[--bdr] px-12 py-3">
        <div className="mx-auto max-w-[1200px] flex items-center gap-2 text-[12px] text-[#5a7a6e]">
          <a href="/" className="no-underline text-[#5a7a6e] hover:text-sdt-600">Acasa</a><span>/</span>
          <a href="/servicii" className="no-underline text-[#5a7a6e] hover:text-sdt-600">Servicii</a><span>/</span>
          <span className="text-sdt-600 font-semibold">Implant Dentar</span>
        </div>
      </div>

      {/* ━━━ HERO — Empathic, problem-first ━━━━ */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${B.nv} 0%, #0f2e24 50%, ${B.pd} 100%)` }}>
        <div className="mx-auto max-w-[1200px] px-12 pb-20 pt-12">
          <div className="grid grid-cols-[1fr_420px] gap-12 items-center">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <Badge className="bg-pink-500 text-white border-0 text-[10px] font-bold">SERVICIU #1</Badge>
                <Badge className="bg-white/10 text-white/70 border-white/20 text-[10px]">FARA DURERE</Badge>
                <Badge className="bg-white/10 text-white/70 border-white/20 text-[10px]">RATE 0%</Badge>
              </div>
              <h1 className="font-display mb-5 text-[46px] font-semibold leading-[1.05] tracking-tight text-white">
                Iti lipseste un dinte?<br/>
                <span className="text-pink-400">Stii ca trebuie sa faci ceva.</span>
              </h1>
              <p className="mb-4 max-w-[480px] text-[16px] leading-relaxed text-white/[.55]">
                Stim ca te gandesti la asta de ceva timp. Poate te temi de durere, poate de pret. Hai sa iti spunem direct:
              </p>
              <div className="space-y-3 mb-8 max-w-[460px]">
                {([
                  { I: Heart, l: 'Nu doare. Anestezie moderna + sedare constienta.' },
                  { I: Timer, l: '30-60 minute. Mai rapid decat o extractie.' },
                  { I: Shield, l: 'Garantie pe viata. Straumann & Nobel Biocare.' },
                  { I: DollarSign, l: 'De la 350€. Rate 0% pe 24 luni.' },
                ] as const).map(({ I, l }) => (
                  <div key={l} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sdt-600/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <I className="w-4 h-4 text-sdt-400" strokeWidth={1.5} />
                    </div>
                    <span className="text-[15px] text-white/80 leading-relaxed">{l}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="accent" className="gap-2 px-8 py-4 text-[15px] font-bold">
                  Vreau consultatie gratuita <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="gap-2 border-white/20 px-6 py-4 text-[15px] text-white hover:bg-white/10">
                  <Play className="h-4 w-4" /> Vezi o procedura reala
                </Button>
              </div>
            </div>

            {/* Right — Featured patient video testimonial */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border-2 border-white/10 relative" style={{ aspectRatio: '3/4' }}>
                <img src={REVIEWS[0].videoThumb} alt={REVIEWS[0].name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-pink-500/90 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform" style={{ animation: 'breathe 3s ease-in-out infinite' }}>
                    <Play className="w-7 h-7 text-white fill-white ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex gap-0.5 mb-1">{[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-[#fbb040] fill-current" />)}</div>
                  <p className="text-[13px] text-white/90 italic leading-relaxed mb-2">&ldquo;Am avut o frica teribila. Nu am simtit nimic.&rdquo;</p>
                  <div className="flex items-center gap-2">
                    <div className="text-[12px] font-semibold text-white">{REVIEWS[0].name}</div>
                    <span className="text-[10px] text-white/50">{REVIEWS[0].age} · {REVIEWS[0].procedure}</span>
                  </div>
                </div>
              </div>
              {/* Price floating card */}
              <div className="absolute -bottom-4 -left-6 bg-white rounded-xl px-5 py-3 shadow-lg" style={{ animation: 'float 3s ease-in-out infinite' }}>
                <div className="text-[10px] font-bold text-[#5a7a6e] uppercase tracking-wider">De la</div>
                <div className="font-display text-[28px] font-semibold text-sdt-600">350€</div>
                <div className="text-[10px] text-[#5a7a6e]">sau 15€/luna × 24</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ WHAT HAPPENS IF YOU DON'T ━━━━━━━━ */}
      <section className="py-16 px-12 border-b border-[--bdr]">
        <div className="mx-auto max-w-[1000px]">
          <div className="text-center mb-10">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span className="text-[12px] font-bold uppercase tracking-[.12em] text-amber-600">Ce se intampla daca nu faci nimic</span>
            </div>
            <h2 className="font-display text-[30px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Cu cat astepti mai mult, cu atat devine <span className="text-pink-500">mai complicat.</span>
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {CONSEQUENCES.map((c, i) => (
              <div key={i} className="p-6 rounded-xl bg-amber-50/50 border border-amber-200/50">
                <c.icon className="w-8 h-8 text-amber-500 mb-4" strokeWidth={1.5} />
                <h3 className="font-display text-[16px] font-semibold mb-2" style={{ color: B.nv }}>{c.title}</h3>
                <p className="text-[13px] leading-[1.7] text-[#5a7a6e]">{c.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-sm text-[#5a7a6e] mb-4">Vestea buna? <strong className="text-sdt-600">Solutia exista si este mai simpla decat crezi.</strong></p>
            <Button variant="accent" className="text-[14px] font-bold">
              Programeaza evaluare gratuita <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* ━━━ PATIENT JOURNEY (emotional) ━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: B.ps }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-12">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-pink-500" />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: B.p }}>Parcursul tau</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              De la <span className="text-[#5a7a6e]">frica</span> la <span className="text-pink-500">zambet</span> — in 5 pasi
            </h2>
          </div>

          {/* Journey steps as clickable timeline */}
          <div className="flex justify-center gap-2 mb-10">
            {JOURNEY.map((j, i) => (
              <button key={i} onClick={() => setJourneyStep(i)}
                className={cn(
                  'flex items-center gap-2 px-5 py-3 rounded-full text-[13px] font-semibold cursor-pointer border transition-all',
                  journeyStep === i
                    ? 'bg-sdt-600 text-white border-sdt-600 shadow-lg'
                    : 'bg-white text-[#5a7a6e] border-[--bdr] hover:border-sdt-200'
                )}
              >
                <span className="text-lg">{j.emoji}</span> {j.stage}
              </button>
            ))}
          </div>

          {/* Active journey detail */}
          <div className="bg-white rounded-2xl border border-[--bdr] p-10 shadow-sm animate-fadeUp max-w-[700px] mx-auto text-center" key={journeyStep} style={{ animationDuration: '0.25s' }}>
            <div className="text-5xl mb-4">{JOURNEY[journeyStep].emoji}</div>
            <h3 className="font-display text-[24px] font-semibold mb-3" style={{ color: B.nv }}>
              Pasul {journeyStep + 1}: {JOURNEY[journeyStep].stage}
            </h3>
            <p className="text-[16px] leading-[1.8] text-[#5a7a6e] max-w-[500px] mx-auto">{JOURNEY[journeyStep].text}</p>
            {journeyStep === JOURNEY.length - 1 && (
              <Button variant="accent" className="mt-6 text-[14px] font-bold">
                Incepe calatoria ta <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* ━━━ MYTHS vs REALITY ━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[900px]">
          <div className="text-center mb-14">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: B.p }} />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: B.p }}>Mituri vs. Realitate</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Ce ai auzit <span className="text-pink-500">nu este adevarat.</span>
            </h2>
          </div>
          <div className="space-y-4">
            {MYTHS.map((m, i) => (
              <div key={i} className="border border-[--bdr] rounded-xl overflow-hidden bg-white hover:border-sdt-200 transition-all">
                <button className="w-full flex items-center justify-between p-5 text-left cursor-pointer" onClick={() => setOpenMyth(openMyth === i ? null : i)}>
                  <div className="flex items-center gap-3">
                    <X className="w-5 h-5 text-red-400 flex-shrink-0" strokeWidth={2} />
                    <span className="font-display text-[15px] font-semibold text-red-400 line-through decoration-red-300">{m.myth}</span>
                  </div>
                  {openMyth === i ? <ChevronUp className="w-5 h-5 text-sdt-600" /> : <ChevronDown className="w-5 h-5 text-[#5a7a6e]" />}
                </button>
                {openMyth === i && (
                  <div className="px-5 pb-5 pt-0 flex items-start gap-3 animate-fadeUp" style={{ animationDuration: '0.2s' }}>
                    <CheckCircle className="w-5 h-5 text-sdt-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-[.1em] text-sdt-600 mb-1">REALITATEA:</div>
                      <p className="text-[14px] leading-[1.75] text-[#5a7a6e]">{m.reality}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ PRICE CALCULATOR ━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: B.nv }}>
        <div className="mx-auto max-w-[900px]">
          <div className="text-center mb-12">
            <h2 className="font-display text-[32px] font-semibold text-white">
              Cat costa <span className="text-pink-400">zambetul tau nou?</span>
            </h2>
            <p className="text-sm text-white/50 mt-2">Selecteaza optiunea si vezi pretul lunar cu Rate 0%</p>
          </div>
          <div className="grid grid-cols-[1fr_320px] gap-8 items-start">
            {/* Options */}
            <div className="space-y-3">
              {CALC_OPTIONS.map((opt, i) => (
                <button key={i} onClick={() => setCalcIdx(i)}
                  className={cn(
                    'w-full text-left p-5 rounded-xl border transition-all cursor-pointer flex justify-between items-center',
                    calcIdx === i ? 'bg-white/[.08] border-pink-500/40' : 'bg-white/[.03] border-white/[.08] hover:border-white/20'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn('w-5 h-5 rounded-full border-2 flex items-center justify-center',
                      calcIdx === i ? 'border-pink-500' : 'border-white/30'
                    )}>
                      {calcIdx === i && <div className="w-2.5 h-2.5 rounded-full bg-pink-500" />}
                    </div>
                    <span className="text-[14px] font-semibold text-white">{opt.label}</span>
                  </div>
                  <span className="font-display text-lg font-semibold text-pink-400">{opt.price}€</span>
                </button>
              ))}
            </div>
            {/* Result card */}
            <div className="bg-white rounded-2xl p-7 shadow-lg sticky top-20">
              <div className="text-center mb-5">
                <div className="text-[11px] font-bold text-[#5a7a6e] uppercase tracking-wider mb-1">Pretul selectat</div>
                <div className="font-display text-[42px] font-semibold text-sdt-600">{CALC_OPTIONS[calcIdx].price}€</div>
                <div className="h-px bg-[--bdr] my-4" />
                <div className="text-[11px] font-bold text-[#5a7a6e] uppercase tracking-wider mb-1">Rate 0% pe 24 luni</div>
                <div className="font-display text-[28px] font-semibold text-pink-500">{CALC_OPTIONS[calcIdx].monthly}€<span className="text-sm text-[#5a7a6e] font-normal">/luna</span></div>
              </div>
              <div className="space-y-2 mb-5 text-[12px] text-[#5a7a6e]">
                <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-sdt-600" /> Consultatie gratuita inclusa</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-sdt-600" /> Planificare 3D inclusa</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-sdt-600" /> Garantie pe viata</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-sdt-600" /> Controale post-op gratuite</div>
              </div>
              <Button variant="accent" className="w-full justify-center py-3 text-[14px] font-bold">
                Vreau acest pret <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ VIDEO TESTIMONIALS ━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-12">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-pink-500" />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: B.p }}>Povesti reale</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Si ei s-au <span className="text-pink-500">temut</span>. Acum <span className="text-sdt-600">zambesc.</span>
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <Card key={i} className="overflow-hidden border-[--bdr] hover:border-sdt-200 transition-all hover:shadow-lg group">
                {/* Video thumbnail */}
                <div className="relative h-[280px] overflow-hidden">
                  <img src={r.videoThumb} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e18]/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-pink-500/90 flex items-center justify-center cursor-pointer group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                  <Badge className="absolute top-3 left-3 bg-white/90 text-sdt-700 border-0 text-[9px] font-bold">{r.procedure}</Badge>
                </div>
                <CardContent className="p-5">
                  <div className="flex gap-0.5 mb-2">{[1,2,3,4,5].map(j => <Star key={j} className="w-3.5 h-3.5 text-[#fbb040] fill-current" />)}</div>
                  <p className="text-[13px] leading-[1.65] text-[#5a7a6e] italic mb-3">&ldquo;{r.text}&rdquo;</p>
                  <div className="flex items-center gap-2">
                    <img src={r.photo} alt={r.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="text-[13px] font-semibold" style={{ color: B.nv }}>{r.name}</div>
                      <div className="text-[10px] text-[#5a7a6e]">{r.age}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                <BookOpen className="w-5 h-5 text-sdt-600" />
                <h2 className="font-display text-[20px] font-semibold" style={{ color: B.nv }}>Citeste mai mult despre implant dentar</h2>
              </div>
              <a href="/blog" className="text-[13px] font-bold text-sdt-600 no-underline flex items-center gap-1">Toate articolele <ArrowRight className="w-3.5 h-3.5" /></a>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {RELATED_BLOGS.map(art => (
                <a key={art.slug} href={`/blog/${art.slug}`} className="no-underline group">
                  <Card className="overflow-hidden border-[--bdr] hover:border-sdt-200 transition-all hover:shadow-lg h-full">
                    <div className="h-[160px] overflow-hidden">
                      <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <CardContent className="p-4">
                      <div className="text-[11px] text-[#5a7a6e] mb-2"><Clock className="w-3 h-3 inline mr-1" />{art.readTime}</div>
                      <h3 className="font-display text-[14px] font-semibold leading-snug group-hover:text-sdt-600 transition-colors" style={{ color: B.nv }}>{art.title}</h3>
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
              <Users className="w-5 h-5 text-pink-500" />
              <h2 className="font-display text-[20px] font-semibold" style={{ color: B.nv }}>Ambasadori care au ales implant dentar</h2>
            </div>
            <a href="/ambasadori" className="text-[13px] font-bold text-sdt-600 no-underline flex items-center gap-1">Toti ambasadorii <ArrowRight className="w-3.5 h-3.5" /></a>
          </div>
          <div className="flex gap-5">
            {RELATED_AMBASSADORS.map(amb => (
              <a key={amb.slug} href="/ambasadori" className="no-underline group flex items-center gap-4 bg-white rounded-xl p-4 border border-[--bdr] hover:border-sdt-200 transition-all flex-1">
                <img src={amb.photo} alt={amb.name} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <div className="font-display text-[15px] font-semibold group-hover:text-sdt-600 transition-colors" style={{ color: B.nv }}>{amb.name}</div>
                  <div className="text-[11px] text-pink-500 font-semibold">{amb.role}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ FAQ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: B.ps }}>
        <div className="mx-auto max-w-[800px]">
          <div className="text-center mb-12">
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Intrebarile care te <span className="text-pink-500">framanta</span>
            </h2>
            <p className="text-sm text-[#5a7a6e] mt-2">Raspunsuri sincere, fara jargon medical.</p>
          </div>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="border border-[--bdr] rounded-xl overflow-hidden transition-all" style={{ background: openFaq === i ? `${B.p}04` : 'white' }}>
                <button className="w-full flex justify-between items-center p-5 text-left cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-display text-[15px] font-semibold pr-4" style={{ color: B.nv }}>{item.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 flex-shrink-0 text-sdt-600" /> : <ChevronDown className="w-5 h-5 flex-shrink-0 text-[#5a7a6e]" />}
                </button>
                {openFaq === i && <div className="px-5 pb-5 pt-0 text-[14px] leading-[1.75] text-[#5a7a6e]">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ FINAL CTA — Emotional ━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: `linear-gradient(135deg, ${B.p} 0%, ${B.pd} 100%)` }}>
        <div className="mx-auto max-w-[1200px] flex gap-16 items-center">
          <div className="flex-1 text-white">
            <h2 className="font-display text-[36px] font-semibold leading-[1.1] mb-4">
              Primul pas e cel<br/><span className="text-pink-300">mai greu. Fa-l acum.</span>
            </h2>
            <p className="text-white/60 mb-6 max-w-[400px] text-[15px] leading-relaxed">
              Nu te costa nimic sa afli. Consultatia cu Digital Check-Up este gratuita, fara obligatii. Vorbesti cu medicul, vezi planul 3D, afli pretul exact.
            </p>
            <div className="space-y-2.5 mb-6">
              {['Consultatie 100% gratuita', 'Fara durere la consultatie si la procedura', 'Afli pretul exact si optiunile de rate', 'Fara obligatii — decizi in ritmul tau'].map(item => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-pink-400 flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-[14px] text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[400px] shrink-0 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-display text-[20px] font-semibold mb-1" style={{ color: B.nv }}>Fa primul pas</h3>
            <p className="text-sm text-[#5a7a6e] mb-5">Te sunam in maxim 24h. Fara presiune.</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Input placeholder="Prenume" />
              <Input placeholder="Nume" />
            </div>
            <Input placeholder="Telefon *" className="mb-3" />
            <select defaultValue="Implant Dentar" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mb-3">
              <option>Implant Dentar</option>
              <option>All-on-4 / All-on-6</option>
              <option>Implant + Coroana</option>
              <option>Nu stiu — vreau consultatie</option>
            </select>
            <Button variant="accent" className="w-full justify-center py-3.5 text-[14px] font-bold">
              Vreau consultatie gratuita <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <p className="text-[10px] text-[#5a7a6e] text-center mt-2">100% gratuit. Fara obligatii.</p>
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
            <div className="mt-5 p-3 px-4 bg-pink-500/[.12] border border-pink-500/20 rounded-lg">
              <div className="font-display text-base font-semibold text-pink-500">{CAMPAIGN_2026.slogan}</div>
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-white tracking-[.15em] uppercase mb-5">Servicii</div>
            <a href="/servicii/implant-dentar" className="block text-[13px] mb-2.5 text-pink-500 font-semibold no-underline">Implant Dentar</a>
            {SERVICES.filter(s => s.slug !== 'implantologie').map(s => (
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
                <div className="text-xs text-white/[.52]">{l.address} · {l.phone}</div>
              </div>
            ))}
            <a href="mailto:info@smiledent.md" className="text-[13px] text-sdt-500 font-semibold no-underline">info@smiledent.md</a>
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

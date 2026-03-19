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
  Leaf, Droplets, Sun, CalendarDays, Activity,
  ThermometerSun, Smile, Stethoscope, DollarSign,
  Play, Phone, MapPin, HelpCircle, Check
} from 'lucide-react'

const C = SVC_COLORS.terapie

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
          <a key={l} href={h} className={cn('relative text-sm no-underline pb-1 font-medium', l === 'Servicii' ? 'font-bold text-[#059669]' : 'text-[#3a5a50]')}>
            {l}
            {l === 'Servicii' && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-5 rounded-full" style={{ background: C.accent }} />}
          </a>
        ))}
      </div>
      <div className="flex gap-2.5 items-center">
        <a href="/login" className="no-underline"><Button variant="outline" size="sm" className="border-[#059669] text-[#059669] font-semibold text-[13px]">Cabinetul meu</Button></a>
        <Button size="sm" className="text-[13px] text-white" style={{ background: C.accent }}>Programeaza-te</Button>
      </div>
    </nav>
  )
}

const ANIM = `
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
`

/* ═══════════════════════════════════════════════
   CONCEPT: "WELLNESS & PREVENTION"
   Calm, nature-inspired, educational, reassuring
   Target: 14-65, health-conscious, prevention-minded
   ═══════════════════════════════════════════════ */

/* ─── Quiz questions ──────────────────────── */
const QUIZ_QUESTIONS = [
  { q: 'Cat de des vizitezi stomatologul?', options: ['La fiecare 6 luni', 'O data pe an', 'Doar cand am dureri', 'Nu am fost de ani'], scores: [3, 2, 1, 0] },
  { q: 'Iti sangereaza gingiile la periaj?', options: ['Niciodata', 'Rar', 'Des', 'Aproape mereu'], scores: [3, 2, 1, 0] },
  { q: 'Folosesti ata dentara sau irigator?', options: ['Zilnic', 'De cateva ori pe saptamana', 'Rar', 'Niciodata'], scores: [3, 2, 1, 0] },
  { q: 'Ai sensibilitate la rece/cald?', options: ['Deloc', 'Uneori', 'Des', 'Mereu'], scores: [3, 2, 1, 0] },
  { q: 'Cand ai facut ultima igienizare profesionala?', options: ['Sub 6 luni', '6-12 luni', '1-2 ani', 'Nu imi amintesc'], scores: [3, 2, 1, 0] },
]

/* ─── Prevention calendar ─────────────────── */
const CALENDAR = [
  { month: 'Ian-Feb', action: 'Control & Igienizare #1', desc: 'Start de an cu gura curata. Detartraj + periaj profesional + evaluare.', icon: CalendarDays },
  { month: 'Mar-Apr', action: 'Fluoruire protectiva', desc: 'Aplicare fluor profesional pentru intarirea smaltului. Recomandat mai ales copiilor.', icon: Shield },
  { month: 'Mai-Iun', action: 'Evaluare parodontala', desc: 'Verificare sanatate gingivala. Depistare timpurie a problemelor parodontale.', icon: Activity },
  { month: 'Iul-Aug', action: 'Control & Igienizare #2', desc: 'A doua igienizare anuala. Mentine sanatatea orala in parametri optimi.', icon: Droplets },
  { month: 'Sep-Oct', action: 'Sigilare (copii)', desc: 'Sigilare fisuri dentare pentru copii. Previne cariile pe dintii permanenti noi.', icon: Leaf },
  { month: 'Nov-Dec', action: 'Evaluare anuala completa', desc: 'Digital Check-Up complet + plan de preventie pentru anul urmator.', icon: Sun },
]

/* ─── Procedures with pain level ──────────── */
const PROCEDURES = [
  { name: 'Igienizare profesionala', desc: 'Detartraj ultrasonic + airflow + periaj profesional. Elimina tartrul si petele.', pain: 0, duration: '45 min', price: 'de la 25\u20AC', frequency: 'La fiecare 6 luni' },
  { name: 'Fluoruire', desc: 'Aplicare gel fluorurat pe dinti. Intareste smaltul si previne cariile.', pain: 0, duration: '15 min', price: 'de la 15\u20AC', frequency: 'De 2 ori pe an' },
  { name: 'Sigilare fisuri', desc: 'Acoperirea fisurilor dintilor cu material protector. Ideal pentru copii.', pain: 0, duration: '20 min', price: 'de la 20\u20AC', frequency: 'O singura data per dinte' },
  { name: 'Tratament carie simpla', desc: 'Eliminare carie + obturatie estetica compozit. Anestezie locala moderna.', pain: 1, duration: '30-45 min', price: 'de la 35\u20AC', frequency: 'La nevoie' },
  { name: 'Tratament de canal', desc: 'Endodontie cu sistem rotativ + obtinere hermetica. Salveaza dintele de extractie.', pain: 1, duration: '60-90 min', price: 'de la 80\u20AC', frequency: 'La nevoie' },
  { name: 'Tratament parodontal', desc: 'Curatare subgingivala + irigare + medicatie. Trateaza inflamatia gingiilor.', pain: 1, duration: '45-60 min', price: 'de la 50\u20AC', frequency: 'Conform plan tratament' },
]

const FAQ = [
  { q: 'Cat de des trebuie sa fac igienizare profesionala?', a: 'Recomandam igienizare profesionala (detartraj + airflow) de 2 ori pe an, la fiecare 6 luni. Pacientii cu parodontita pot necesita igienizare la fiecare 3-4 luni.' },
  { q: 'Este dureroasa igienizarea profesionala?', a: 'Nu! Igienizarea moderna cu ultrasunete si airflow este complet nedureroasa. Puteti simti o usoara sensibilitate temporara, dar nu durere.' },
  { q: 'Cum previn cariile?', a: 'Periaj corect de 2 ori pe zi (2 minute), ata dentara sau irigator zilnic, vizita la stomatolog la fiecare 6 luni, alimentatie echilibrata cu zahar limitat.' },
  { q: 'De ce imi sangereaza gingiile?', a: 'Sangerarea gingiilor indica inflamatie (gingivita). Cauza principala: acumularea de placa bacteriana. Tratament: igienizare profesionala + igiena corecta acasa. Netratata, poate evolua in parodontita.' },
  { q: 'Ce este airflow?', a: 'Airflow este o procedura de curatare cu jet de apa, aer si particule fine de bicarbonat. Elimina eficient petele de cafea, ceai si tutun. Este rapida, nedureroasa si foarte eficienta.' },
  { q: 'Igienizarea inlocuieste periajul acasa?', a: 'Nu. Igienizarea profesionala complementeaza igiena zilnica. Elimina tartrul si depunerile pe care periuta nu le poate indeparta, dar igiena zilnica ramane esentiala.' },
]

const RELATED_BLOGS = BLOG_ARTICLES.filter(a => a.tags.some(t => t.includes('igiena') || t.includes('prevenire') || t.includes('periaj') || t.includes('ghid pacient') || t.includes('profilaxie'))).slice(0, 3)
const RELATED_AMBASSADORS = AMBASSADORS.filter(a => ['parpaut', 'coberman', 'galben'].includes(a.slug))

/* ─── Page Component ─────────────────────── */
export function TerapiePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [quizStep, setQuizStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const [quizDone, setQuizDone] = useState(false)
  const [calendarMonth, setCalendarMonth] = useState(0)

  const quizScore = quizAnswers.reduce((a, b) => a + b, 0)
  const quizMax = QUIZ_QUESTIONS.length * 3

  function answerQuiz(scoreIdx: number) {
    const newAnswers = [...quizAnswers, QUIZ_QUESTIONS[quizStep].scores[scoreIdx]]
    setQuizAnswers(newAnswers)
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setQuizStep(quizStep + 1)
    } else {
      setQuizDone(true)
    }
  }

  function getQuizResult() {
    const pct = (quizScore / quizMax) * 100
    if (pct >= 80) return { label: 'Excelent!', color: '#059669', desc: 'Felicitari! Igiena ta orala este foarte buna. Continua asa si programeaza controlul semestrial.' }
    if (pct >= 50) return { label: 'Bine, dar poate fi mai bine', color: '#d97706', desc: 'Igiena ta orala este ok, dar sunt zone de imbunatatit. O igienizare profesionala ar fi un start bun.' }
    return { label: 'Atentie! Ai nevoie de ajutor', color: '#dc2626', desc: 'Igiena ta orala necesita atentie urgenta. Programeaza o consultatie cat mai curand pentru a preveni complicatii.' }
  }

  return (
    <>
      <Nav />
      <style dangerouslySetInnerHTML={{ __html: ANIM }} />

      {/* Breadcrumbs */}
      <div className="bg-[#fafcfb] border-b border-[--bdr] px-12 py-3">
        <div className="mx-auto max-w-[1200px] flex items-center gap-2 text-[12px] text-[#5a7a6e]">
          <a href="/" className="no-underline text-[#5a7a6e] hover:text-sdt-600">Acasa</a><span>/</span>
          <a href="/servicii" className="no-underline text-[#5a7a6e] hover:text-sdt-600">Servicii</a><span>/</span>
          <span className="font-semibold" style={{ color: C.accent }}>Terapie &amp; Profilaxie</span>
        </div>
      </div>

      {/* ━━━ HERO — Calm, wellness, nature-inspired ━━━ */}
      <section className="relative overflow-hidden" style={{ background: C.gradient }}>
        <div className="mx-auto max-w-[1200px] px-12 py-20">
          <div className="grid grid-cols-[1fr_440px] gap-12 items-center">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <Badge className="text-white border-0 text-[10px] font-bold" style={{ background: C.accent }}>PREVENTIE</Badge>
                <Badge className="bg-white/10 text-white/70 border-white/20 text-[10px]">FARA DURERE</Badge>
              </div>
              <h1 className="font-display mb-5 text-[46px] font-semibold leading-[1.05] tracking-tight text-white">
                Preventia e cel mai bun<br/>
                <span className="text-emerald-300">tratament.</span>
              </h1>
              <p className="mb-6 max-w-[460px] text-[16px] leading-relaxed text-white/50">
                90% din problemele dentare pot fi prevenite cu igiena corecta si vizite regulate. Hai sa avem grija de sanatatea ta orala impreuna.
              </p>
              <div className="space-y-3 mb-8 max-w-[440px]">
                {([
                  { I: Leaf, l: 'Proceduri fara durere — 0/10 pe scala durerii' },
                  { I: Droplets, l: 'Igienizare profesionala — de la 25\u20AC' },
                  { I: Shield, l: 'Preventie — mai ieftin decat un tratament' },
                  { I: Smile, l: 'Gura sanatoasa — corp sanatos' },
                ] as const).map(({ I, l }) => (
                  <div key={l} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${C.accent}30` }}>
                      <I className="w-4 h-4 text-emerald-300" strokeWidth={1.5} />
                    </div>
                    <span className="text-[14px] text-white/70 leading-relaxed">{l}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Button className="gap-2 px-8 py-4 text-[15px] font-bold text-white" style={{ background: C.accent }}>
                  Programeaza igienizare <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="gap-2 border-white/20 px-6 py-4 text-[15px] text-white hover:bg-white/10">
                  Fa testul de sanatate
                </Button>
              </div>
            </div>

            {/* Right — Calm wellness image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border-2 border-white/10 relative" style={{ aspectRatio: '4/5' }}>
                <img src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=550&h=690&fit=crop" alt="Preventie dentara" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-[11px] uppercase tracking-[.15em] text-white/50 mb-1">Igienizare profesionala</div>
                  <div className="font-display text-[32px] font-semibold text-white">de la 25<span className="text-[18px]">&euro;</span></div>
                  <div className="text-[12px] text-white/50">Mai ieftin decat un tratament</div>
                </div>
              </div>
              <div className="absolute -top-3 -right-3 bg-white rounded-xl px-4 py-2.5 shadow-lg" style={{ animation: 'float 3s ease-in-out infinite' }}>
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5" style={{ color: C.accent }} strokeWidth={1.5} />
                  <div>
                    <div className="text-[10px] font-bold" style={{ color: C.accent }}>Nivel durere</div>
                    <div className="text-[14px] font-semibold" style={{ color: B.nv }}>0/10</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ QUIZ — Self-assessment ━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: '#ecfdf5' }}>
        <div className="mx-auto max-w-[700px]">
          <div className="text-center mb-10">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" style={{ color: C.accent }} />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: C.accent }}>Test rapid</span>
            </div>
            <h2 className="font-display text-[32px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Cat de sanatoasa e <span style={{ color: C.accent }}>gura ta?</span>
            </h2>
            <p className="text-[14px] text-[#5a7a6e] mt-2">5 intrebari rapide. Afla in 30 secunde.</p>
          </div>

          {!quizDone ? (
            <div className="bg-white rounded-2xl border border-[--bdr] p-8 shadow-sm" key={quizStep} style={{ animation: 'fadeUp 0.25s ease-out' }}>
              {/* Progress */}
              <div className="flex justify-between items-center mb-6">
                <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: C.accent }}>Intrebarea {quizStep + 1} din {QUIZ_QUESTIONS.length}</div>
                <div className="flex gap-1.5">
                  {QUIZ_QUESTIONS.map((_, i) => (
                    <div key={i} className={cn('w-8 h-1.5 rounded-full', i <= quizStep ? 'bg-emerald-500' : 'bg-gray-200')} />
                  ))}
                </div>
              </div>
              <h3 className="font-display text-[20px] font-semibold mb-6" style={{ color: B.nv }}>{QUIZ_QUESTIONS[quizStep].q}</h3>
              <div className="space-y-3">
                {QUIZ_QUESTIONS[quizStep].options.map((opt, i) => (
                  <button key={i} onClick={() => answerQuiz(i)}
                    className="w-full text-left p-4 rounded-xl border border-[--bdr] hover:border-emerald-300 bg-white hover:bg-emerald-50/50 cursor-pointer transition-all text-[14px] font-medium text-[#5a7a6e] hover:text-emerald-700"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-[--bdr] p-8 shadow-sm text-center" style={{ animation: 'fadeUp 0.3s ease-out' }}>
              <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: `${getQuizResult().color}15` }}>
                <div className="font-display text-[28px] font-bold" style={{ color: getQuizResult().color }}>{quizScore}/{quizMax}</div>
              </div>
              <h3 className="font-display text-[24px] font-semibold mb-2" style={{ color: getQuizResult().color }}>{getQuizResult().label}</h3>
              <p className="text-[14px] text-[#5a7a6e] leading-[1.7] mb-6 max-w-[400px] mx-auto">{getQuizResult().desc}</p>
              <div className="flex gap-3 justify-center">
                <Button className="text-white text-[14px] font-bold" style={{ background: C.accent }}>
                  Programeaza consultatie <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Button variant="outline" className="text-[14px]" style={{ borderColor: C.accent, color: C.accent }} onClick={() => { setQuizStep(0); setQuizAnswers([]); setQuizDone(false) }}>
                  Repeta testul
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ━━━ PREVENTION CALENDAR ━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center mb-12">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4" style={{ color: C.accent }} />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: C.accent }}>Calendar preventie</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Planul tau de <span style={{ color: C.accent }}>preventie anuala</span>
            </h2>
          </div>
          <div className="grid grid-cols-6 gap-4">
            {CALENDAR.map((c, i) => (
              <button key={i} onClick={() => setCalendarMonth(i)}
                className={cn(
                  'p-5 rounded-xl text-left cursor-pointer border transition-all',
                  calendarMonth === i ? 'bg-emerald-50 border-emerald-200 shadow-sm' : 'bg-white border-[--bdr] hover:border-emerald-200'
                )}
              >
                <c.icon className={cn('w-6 h-6 mb-3', calendarMonth === i ? 'text-emerald-600' : 'text-[#5a7a6e]')} strokeWidth={1.5} />
                <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: calendarMonth === i ? C.accent : '#5a7a6e' }}>{c.month}</div>
                <div className={cn('text-[12px] font-semibold leading-snug', calendarMonth === i ? 'text-emerald-700' : 'text-[#0a1e18]')}>{c.action}</div>
              </button>
            ))}
          </div>
          <div className="mt-6 bg-emerald-50 rounded-xl p-6 border border-emerald-200" key={calendarMonth} style={{ animation: 'fadeUp 0.2s ease-out' }}>
            <div className="flex items-center gap-3">
              {(() => { const I = CALENDAR[calendarMonth].icon; return <I className="w-8 h-8 text-emerald-600" strokeWidth={1.5} /> })()}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: C.accent }}>{CALENDAR[calendarMonth].month}</div>
                <div className="font-display text-[18px] font-semibold" style={{ color: B.nv }}>{CALENDAR[calendarMonth].action}</div>
              </div>
            </div>
            <p className="text-[14px] text-[#5a7a6e] leading-[1.7] mt-3">{CALENDAR[calendarMonth].desc}</p>
          </div>
        </div>
      </section>

      {/* ━━━ PROCEDURES — pain level indicator ━━━ */}
      <section className="py-20 px-12" style={{ background: '#ecfdf5' }}>
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center mb-12">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4" style={{ color: C.accent }} />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: C.accent }}>Proceduri fara durere</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Simple, <span style={{ color: C.accent }}>nedureroase</span>, accesibile
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {PROCEDURES.map((p, i) => (
              <div key={i} className="bg-white rounded-xl border border-[--bdr] p-6 hover:border-emerald-200 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-display text-[16px] font-semibold" style={{ color: B.nv }}>{p.name}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#5a7a6e]">Durere:</span>
                    <div className="flex gap-0.5">
                      {[0,1,2,3,4].map(j => (
                        <div key={j} className={cn('w-3.5 h-3.5 rounded-full', j <= p.pain ? 'bg-emerald-400' : 'bg-gray-200')} />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold" style={{ color: C.accent }}>{p.pain}/10</span>
                  </div>
                </div>
                <p className="text-[13px] text-[#5a7a6e] leading-[1.65] mb-4">{p.desc}</p>
                <div className="flex gap-4 text-[11px]">
                  <div className="flex items-center gap-1 text-[#5a7a6e]"><Clock className="w-3 h-3" /> {p.duration}</div>
                  <div className="flex items-center gap-1 font-bold" style={{ color: C.accent }}><DollarSign className="w-3 h-3" /> {p.price}</div>
                  <div className="flex items-center gap-1 text-[#5a7a6e]"><CalendarDays className="w-3 h-3" /> {p.frequency}</div>
                </div>
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
                <h2 className="font-display text-[20px] font-semibold" style={{ color: B.nv }}>Ghiduri de igiena orala</h2>
              </div>
              <a href="/blog" className="text-[13px] font-bold no-underline flex items-center gap-1" style={{ color: C.accent }}>Toate articolele <ArrowRight className="w-3.5 h-3.5" /></a>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {RELATED_BLOGS.map(art => (
                <a key={art.slug} href={`/blog/${art.slug}`} className="no-underline group">
                  <Card className="overflow-hidden border-[--bdr] hover:border-emerald-200 transition-all hover:shadow-lg h-full">
                    <div className="h-[160px] overflow-hidden">
                      <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <CardContent className="p-4">
                      <div className="text-[11px] text-[#5a7a6e] mb-2"><Clock className="w-3 h-3 inline mr-1" />{art.readTime}</div>
                      <h3 className="font-display text-[14px] font-semibold leading-snug group-hover:text-emerald-600 transition-colors" style={{ color: B.nv }}>{art.title}</h3>
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
              <h2 className="font-display text-[20px] font-semibold" style={{ color: B.nv }}>Ambasadori pentru preventie</h2>
            </div>
            <a href="/ambasadori" className="text-[13px] font-bold no-underline flex items-center gap-1" style={{ color: C.accent }}>Toti ambasadorii <ArrowRight className="w-3.5 h-3.5" /></a>
          </div>
          <div className="flex gap-5">
            {RELATED_AMBASSADORS.map(amb => (
              <a key={amb.slug} href="/ambasadori" className="no-underline group flex items-center gap-4 bg-white rounded-xl p-4 border border-[--bdr] hover:border-emerald-200 transition-all flex-1">
                <img src={amb.photo} alt={amb.name} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <div className="font-display text-[15px] font-semibold group-hover:text-emerald-600 transition-colors" style={{ color: B.nv }}>{amb.name}</div>
                  <div className="text-[11px] font-semibold" style={{ color: C.accent }}>{amb.role}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ FAQ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: '#ecfdf5' }}>
        <div className="mx-auto max-w-[800px]">
          <div className="text-center mb-12">
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Intrebari despre <span style={{ color: C.accent }}>prevenire</span>
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
      <section className="py-20 px-12" style={{ background: `linear-gradient(135deg, #0a1e14 0%, ${C.accent} 100%)` }}>
        <div className="mx-auto max-w-[1200px] flex gap-16 items-center">
          <div className="flex-1 text-white">
            <h2 className="font-display text-[36px] font-semibold leading-[1.1] mb-4">
              Preventia costa<br/><span className="text-emerald-300">25 euro. Tratamentul, mult mai mult.</span>
            </h2>
            <p className="text-white/50 mb-6 max-w-[400px] text-[15px] leading-relaxed">
              Programeaza o igienizare profesionala. Cel mai simplu, mai rapid si mai ieftin lucru pe care il poti face pentru sanatatea ta orala.
            </p>
            <div className="space-y-2.5 mb-6">
              {(['Igienizare profesionala — 45 minute', 'Zero durere, zero disconfort', 'De la 25 euro — accesibil tuturor', 'Previne carii, parodontita si complicatii'] as const).map(item => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-[14px] text-white/70">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[400px] shrink-0 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-display text-[20px] font-semibold mb-1" style={{ color: B.nv }}>Programeaza igienizare</h3>
            <p className="text-sm text-[#5a7a6e] mb-5">Te sunam in maxim 24h.</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Input placeholder="Prenume" />
              <Input placeholder="Nume" />
            </div>
            <Input placeholder="Telefon *" className="mb-3" />
            <select defaultValue="Igienizare" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mb-3">
              <option>Igienizare profesionala</option>
              <option>Fluoruire</option>
              <option>Tratament carie</option>
              <option>Control general</option>
            </select>
            <Button className="w-full justify-center py-3.5 text-[14px] font-bold text-white" style={{ background: C.accent }}>
              Programeaza acum <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <p className="text-[10px] text-[#5a7a6e] text-center mt-2">De la 25 euro. Fara durere.</p>
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
            <a href="/servicii/terapie-profilaxie" className="block text-[13px] mb-2.5 font-semibold no-underline" style={{ color: C.accent }}>Terapie &amp; Profilaxie</a>
            {SERVICES.filter(s => s.slug !== 'terapie').map(s => (
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

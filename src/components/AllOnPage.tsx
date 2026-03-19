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
  Zap, Award, Users, Scan, Target, Timer, Sparkles,
  DollarSign, BookOpen, Stethoscope, SmilePlus
} from 'lucide-react'

const C = SVC_COLORS.allon // Purple accent

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
    <nav className="sticky top-0 z-[100] bg-white border-b border-[--bdr] px-12 py-3.5 flex justify-between items-center" style={{ borderTop: `3px solid ${C.accent}` }}>
      <a href="/" className="no-underline"><Logo height={36}/></a>
      <div className="flex gap-7 items-center">
        {NAV_LINKS.map(([l, h]) => (
          <a key={l} href={h} className={cn(
            'relative text-sm no-underline pb-1 font-medium',
            l === 'Servicii' ? 'font-bold text-[#7c3aed]' : 'text-[#3a5a50]'
          )}>
            {l}
            {l === 'Servicii' && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-5 rounded-full" style={{ background: C.accent }} />}
          </a>
        ))}
      </div>
      <div className="flex gap-2.5 items-center">
        <a href="/login" className="no-underline">
          <Button variant="outline" size="sm" className="border-[#7c3aed] text-[#7c3aed] font-semibold text-[13px]">Cabinetul meu</Button>
        </a>
        <Button size="sm" className="text-[13px] text-white" style={{ background: C.accent }}>Programeaza-te</Button>
      </div>
    </nav>
  )
}

const ANIM = `
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
`

/* ─── Content Data ────────────────────────── */
const PROCESS_STEPS = [
  { step: '01', title: 'Consultatie CBCT', desc: 'Evaluam starea osoasa si structurile anatomice cu tomografie 3D CBCT. Analizam daca exista suficient os pentru implantare sau este necesara augmentare. Discutam optiunile: All-on-4 sau All-on-6.', duration: '45 min', icon: Scan },
  { step: '02', title: 'Planificare 3D', desc: 'Simulam digital pozitia exacta a fiecarui implant, unghiul de insertie si tipul de proteza. Ghidul chirurgical este tiparit 3D pentru precizie maxima in sala de operatie.', duration: '1 saptamana', icon: Target },
  { step: '03', title: 'Insertie 4-6 implanturi', desc: 'Inseram 4 sau 6 implanturi strategic pozitionate sub sedare constienta. Implanturile posterioare sunt angulate la 30-45 grade pentru a utiliza maxim osul disponibil, evitand augmentarea.', duration: '2-3 ore', icon: Stethoscope },
  { step: '04', title: 'Proteza provizorie fixa', desc: 'In aceeasi zi, fixam proteza provizorie pe implanturi. Pleci din clinica cu dinti ficsi — poti manca, vorbi si zambi imediat. Fara proteza mobila, fara lipici.', duration: 'Same day', icon: SmilePlus },
  { step: '05', title: 'Proteza finala zirconiu', desc: 'Dupa 3-4 luni de osteointegrare, inlocuim proteza provizorie cu proteza finala din zirconiu — aspect natural, rezistenta maxima, garantie pe structura.', duration: '3-4 luni', icon: Sparkles },
]

const PRICES = [
  { name: 'All-on-4 (o arcada)', price: 'de la 2997\u20AC', includes: '4 implanturi Straumann + proteza provizorie fixa + controale', popular: true },
  { name: 'All-on-6 (o arcada)', price: 'de la 4500\u20AC', includes: '6 implanturi Straumann + proteza provizorie fixa + controale', popular: false },
  { name: 'All-on-4 + proteza finala', price: 'de la 5500\u20AC', includes: '4 implanturi + provizorie + finala zirconiu + garantie', popular: false },
  { name: 'All-on-6 + proteza finala', price: 'de la 7000\u20AC', includes: '6 implanturi + provizorie + finala zirconiu + garantie', popular: false },
]

const WHO_IS_IT_FOR = [
  { title: 'Edentatie totala', desc: 'Ai pierdut toti dintii de pe o arcada sau ambele? All-On iti ofera o arcada completa fixa pe implanturi — fara proteza mobila.', icon: 'ET' },
  { title: 'Proteza mobila', desc: 'Porti proteza mobila si esti nemultumit? All-On elimina definitiv proteza care se misca, cade si cauzeaza disconfort.', icon: 'PM' },
  { title: 'Parodontita avansata', desc: 'Dintii tai sunt mobili din cauza parodontitei? Extractia planificata + All-On rezolva problema definitiv intr-o singura zi.', icon: 'PA' },
  { title: 'Dinti multipli lipsa', desc: 'Ai pierdut mai multi dinti si vrei o solutie fixa? All-On este mai economic si mai rapid decat implanturile individuale.', icon: 'ML' },
]

const WHY_SDT = [
  { icon: SmilePlus, title: 'Dinti ficsi in aceeasi zi', desc: 'Pleci din clinica cu dinti ficsi — nu mai astepti luni de zile. Proteza provizorie se fixeaza pe implanturi in aceeasi sedinta.' },
  { icon: Heart, title: 'Sedare constienta', desc: 'Interventia se realizeaza sub sedare constienta — fara anxietate, fara durere, fara amintiri neplacute. Te trezesti cu dinti noi.' },
  { icon: Scan, title: 'Ghid chirurgical 3D', desc: 'Fiecare implant este pozitionat cu precizie de 0.2mm folosind ghid chirurgical tiparit 3D din planificarea digitala.' },
  { icon: Shield, title: 'Straumann & Nobel Biocare', desc: 'Folosim exclusiv implanturi premium de la Straumann si Nobel Biocare — cele mai studiate sisteme din lume.' },
  { icon: DollarSign, title: 'Rate 0% dobanda', desc: 'Plata in rate lunare fara dobanda pana la 24 luni. Acces la reabilitare completa fara efort financiar.' },
  { icon: Award, title: '15+ ani experienta', desc: 'Peste 2000 de cazuri All-On realizate cu succes. Echipa dedicata cu experienta in reabilitari complexe pe implanturi.' },
]

const COMPARISON = [
  { feature: 'Numar implanturi', allon4: '4 implanturi', allon6: '6 implanturi' },
  { feature: 'Stabilitate', allon4: 'Excelenta', allon6: 'Superioara' },
  { feature: 'Cazuri recomandate', allon4: 'Atrofie osoasa moderata', allon6: 'Atrofie osoasa severa' },
  { feature: 'Pret de la', allon4: '2997\u20AC', allon6: '4500\u20AC' },
  { feature: 'Durata interventie', allon4: '2-3 ore', allon6: '3-4 ore' },
  { feature: 'Proteza provizorie', allon4: 'Same day', allon6: 'Same day' },
  { feature: 'Necesita augmentare', allon4: 'Rar — implanturile angulate evita', allon6: 'Foarte rar' },
  { feature: 'Proteza finala', allon4: 'Dupa 3-4 luni', allon6: 'Dupa 3-4 luni' },
]

const REVIEWS = [
  { name: 'Maria S.', age: '62 ani', procedure: 'All-on-4 superior', text: 'Am purtat proteza mobila 15 ani. Acum am dinti ficsi si pot manca orice. Cea mai buna decizie din viata mea!', rating: 5, photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face' },
  { name: 'Victor D.', age: '58 ani', procedure: 'All-on-6 ambele arcade', text: 'Interventia a durat cateva ore sub sedare. M-am trezit cu dinti noi. Dupa 4 luni am primit proteza finala — arata natural.', rating: 5, photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face' },
  { name: 'Galina P.', age: '67 ani', procedure: 'All-on-4 inferior', text: 'Proteza inferioara nu mai tinea deloc. Acum am arcada fixa pe 4 implanturi — stabilitate perfecta, zero disconfort.', rating: 5, photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face' },
  { name: 'Gheorghe T.', age: '71 ani', procedure: 'All-on-4 + finala zirconiu', text: 'La 71 de ani am dinti noi. Echipa SDT a fost extraordinara — de la planificare pana la rezultatul final. Recomand cu toata inima.', rating: 5, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
]

const FAQ = [
  { q: 'Cat costa All-on-4 la SDT?', a: 'All-on-4 porneste de la 2997\u20AC per arcada si include 4 implanturi Straumann, proteza provizorie fixa (same day) si controale post-operatorii. Proteza finala din zirconiu se adauga separat. Consultatia initiala este GRATUITA.' },
  { q: 'Pot primi dinti ficsi in aceeasi zi?', a: 'Da! Proteza provizorie fixa se monteaza pe implanturi in aceeasi zi cu interventia. Pleci din clinica cu dinti ficsi — poti manca alimente moi imediat. Proteza finala se realizeaza dupa 3-4 luni.' },
  { q: 'Care este diferenta intre All-on-4 si All-on-6?', a: 'All-on-4 foloseste 4 implanturi (cele posterioare angulate), ideal pentru atrofie osoasa moderata. All-on-6 foloseste 6 implanturi drepte, oferind stabilitate suplimentara — recomandat pentru atrofie severa sau arcade mari.' },
  { q: 'Este dureroasa interventia?', a: 'Nu. Interventia se realizeaza sub sedare constienta — nu simtiti nimic si nu aveti amintiri neplacute. Disconfortul post-operator este moderat si gestionabil cu medicatie prescrisa timp de 3-5 zile.' },
  { q: 'Am suficient os pentru All-On?', a: 'Avantajul tehnicii All-on-4 este ca implanturile posterioare sunt angulate la 30-45 grade, utilizand maxim osul existent. In majoritatea cazurilor, augmentarea osoasa NU este necesara. Evaluarea CBCT 3D clarifica situatia exact.' },
  { q: 'Cat dureaza proteza finala?', a: 'Proteza finala din zirconiu are durabilitate de 15-20+ ani cu intretinere corecta. Controalele anuale si igiena corecta sunt esentiale pentru longevitate. Oferim garantie pe structura.' },
  { q: 'Pot plati in rate?', a: 'Da! Oferim Rate 0% dobanda pe 6, 12 sau 24 luni prin partenerii nostri financiari. Consultatia gratuita include un plan financiar detaliat cu toate optiunile de plata.' },
]

const RELATED_BLOGS = BLOG_ARTICLES.filter(a =>
  a.tags.some(t => t.includes('all-on') || t.includes('reabilitare') || t.includes('edentatie') || t.includes('implant'))
).slice(0, 3)

const RELATED_AMBASSADORS = AMBASSADORS.filter(a =>
  ['rascu', 'talmazan', 'cosovan'].includes(a.slug)
)

/* ─── Page Component ─────────────────────── */
export function AllOnPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeStep, setActiveStep] = useState(0)

  return (
    <>
      <Nav />
      <style dangerouslySetInnerHTML={{ __html: ANIM }} />

      {/* Breadcrumbs */}
      <div className="bg-[#fafcfb] border-b border-[--bdr] px-12 py-3">
        <div className="mx-auto max-w-[1200px] flex items-center gap-2 text-[12px] text-[#5a7a6e]">
          <a href="/" className="no-underline text-[#5a7a6e] hover:text-[#7c3aed]">Acasa</a><span>/</span>
          <a href="/servicii" className="no-underline text-[#5a7a6e] hover:text-[#7c3aed]">Servicii</a><span>/</span>
          <span className="text-[#7c3aed] font-semibold">Dinti Ficsi / All-On</span>
        </div>
      </div>

      {/* ━━━ HERO (Purple accent) ━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden" style={{ background: C.gradient }}>
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 items-center gap-10 px-12 pb-20 pt-12">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Badge style={{ background: C.accent }} className="text-white border-0 text-[10px] font-bold">SERVICIU #3</Badge>
              <Badge className="bg-white/10 text-white/70 border-white/20 text-[10px]">RATE 0%</Badge>
            </div>
            <h1 className="font-display mb-4 text-[48px] font-semibold leading-[1.05] tracking-tight text-white">
              Dinti ficsi intr-o zi &mdash;<br/>reabilitare <span style={{ color: '#a78bfa' }}>completa pe implanturi.</span>
            </h1>
            <p className="mb-6 max-w-[460px] text-[15px] leading-relaxed text-white/[.65]">
              All-on-4 si All-on-6: arcada completa fixa pe implanturi Straumann. Dinti ficsi in aceeasi zi, sedare constienta, planificare 3D. Alternativa permanenta la proteza mobila.
            </p>
            <div className="grid grid-cols-2 gap-2 mb-7">
              {([
                { I: SmilePlus, l: 'Dinti ficsi in aceeasi zi' },
                { I: Heart, l: 'Sedare constienta' },
                { I: Scan, l: 'Planificare 3D completa' },
                { I: DollarSign, l: 'Rate 0% disponibile' },
              ] as const).map(({ I, l }) => (
                <div key={l} className="flex items-center gap-2 text-white/70">
                  <I className="w-4 h-4 text-purple-400" strokeWidth={1.5} />
                  <span className="text-[13px]">{l}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Button className="gap-2 px-8 py-3.5 text-[15px] font-bold text-white" style={{ background: C.accent }}>
                Programeaza consultatie gratuita <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-8 inline-flex items-center gap-3 bg-white/[.06] border border-white/[.12] rounded-xl px-5 py-3">
              <div className="font-display text-[32px] font-semibold text-purple-400">2997&euro;</div>
              <div className="text-xs text-white/50 leading-tight">pret de la<br/><span className="text-white/70 font-semibold">All-on-4 o arcada</span></div>
            </div>
          </div>

          {/* Right — Photo with floating cards */}
          <div className="relative flex h-[420px] items-center justify-center">
            <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=400&fit=crop" alt="All-On SDT — dinti ficsi pe implanturi"
              className="w-[320px] h-[320px] rounded-3xl object-cover border-2 border-white/10"
            />
            <div className="absolute -top-4 -right-8 bg-white/[.1] backdrop-blur-md border border-white/20 rounded-xl px-3 py-2" style={{ animation: 'float 3s ease-in-out infinite' }}>
              <div className="text-[10px] font-bold text-purple-400">DINTI FICSI</div>
              <div className="font-display text-lg font-semibold text-white">24h</div>
              <div className="text-[9px] text-white/50">same day teeth</div>
            </div>
            <div className="absolute -bottom-4 -left-8 bg-white/[.1] backdrop-blur-md border border-white/20 rounded-xl px-3 py-2" style={{ animation: 'float 3.5s 0.5s ease-in-out infinite' }}>
              <div className="text-[10px] font-bold text-purple-400">RATA DE SUCCES</div>
              <div className="font-display text-xl font-semibold text-white">99%</div>
              <div className="text-[9px] text-white/50">cazuri All-On</div>
            </div>
            <div className="absolute top-1/2 -right-12 bg-white/[.1] backdrop-blur-md border border-white/20 rounded-xl px-3 py-2" style={{ animation: 'float 4s 1s ease-in-out infinite' }}>
              <div className="text-[10px] font-bold text-white/60">Straumann</div>
              <div className="text-[10px] font-bold text-white/60">Nobel Biocare</div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ STATS STRIP (Purple) ━━━━━━━━━━━━━━ */}
      <section className="py-5 px-12" style={{ background: C.accent }}>
        <div className="mx-auto max-w-[1200px] flex justify-center gap-12">
          {[['2000+', 'cazuri All-On'], ['24h', 'dinti ficsi'], ['99%', 'rata succes'], ['0%', 'dobanda la rate']].map(([n, l]) => (
            <div key={l} className="flex items-baseline gap-2">
              <div className="font-display text-2xl font-semibold text-white">{n}</div>
              <div className="text-xs text-white/60">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ PENTRU CINE ━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-14">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: C.accent }} />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: C.accent }}>Pentru cine este</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Cand ai nevoie de <span style={{ color: C.accent }}>All-On?</span>
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {WHO_IS_IT_FOR.map((w, i) => (
              <Card key={i} className="group border-[--bdr] hover:border-purple-200 transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 font-display text-sm font-bold text-white" style={{ background: C.accent }}>{w.icon}</div>
                  <h3 className="font-display text-[16px] font-semibold mb-2" style={{ color: B.nv }}>{w.title}</h3>
                  <p className="text-[12px] leading-[1.7] text-[#5a7a6e]">{w.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ PROCES (Interactive Steps) ━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: C.accentLight }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-14">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: C.accent }} />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: C.accent }}>Procesul complet</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              5 pasi de la <span style={{ color: C.accent }}>consultatie la dinti ficsi</span>
            </h2>
          </div>
          <div className="grid grid-cols-[280px_1fr] gap-6">
            <div className="space-y-2">
              {PROCESS_STEPS.map((s, i) => (
                <button key={i} onClick={() => setActiveStep(i)}
                  className={cn('w-full text-left p-4 rounded-xl border transition-all cursor-pointer',
                    activeStep === i ? 'bg-white border-purple-200 shadow-lg' : 'bg-transparent border-transparent hover:bg-white/60'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center text-[12px] font-bold',
                      activeStep === i ? 'text-white' : 'bg-purple-50 text-[#7c3aed]'
                    )} style={activeStep === i ? { background: C.accent } : undefined}>{s.step}</div>
                    <div>
                      <div className={cn('text-[14px] font-semibold', activeStep === i ? 'text-[#7c3aed]' : 'text-[#5a7a6e]')}>{s.title}</div>
                      <div className="text-[10px] text-[#5a7a6e]/60">{s.duration}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-[--bdr] p-8 shadow-sm animate-fadeUp" key={activeStep} style={{ animationDuration: '0.25s' }}>
              {(() => {
                const s = PROCESS_STEPS[activeStep]
                return (
                  <div className="flex gap-6">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${C.accent}15` }}>
                      <s.icon className="w-8 h-8" style={{ color: C.accent }} strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-display text-[22px] font-semibold" style={{ color: B.nv }}>{s.step}. {s.title}</h3>
                        <Badge variant="outline" className="text-[10px] border-purple-200 text-[#7c3aed]">{s.duration}</Badge>
                      </div>
                      <p className="text-[15px] leading-[1.8] text-[#5a7a6e]">{s.desc}</p>
                    </div>
                  </div>
                )
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ DE CE SDT ━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-14">
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              6 motive sa alegi <span style={{ color: C.accent }}>SDT pentru All-On</span>
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {WHY_SDT.map((w, i) => (
              <Card key={i} className="group border-[--bdr] hover:border-purple-200 transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${C.accent}12` }}>
                    <w.icon className="w-5 h-5" style={{ color: C.accent }} strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-[15px] font-semibold mb-2" style={{ color: B.nv }}>{w.title}</h3>
                  <p className="text-[12px] leading-[1.7] text-[#5a7a6e]">{w.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ ALL-ON-4 vs ALL-ON-6 COMPARISON ━━━ */}
      <section className="py-20 px-12" style={{ background: '#faf5ff' }}>
        <div className="mx-auto max-w-[900px]">
          <div className="text-center mb-14">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: C.accent }} />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: C.accent }}>Comparatie</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              All-on-4 vs <span style={{ color: C.accent }}>All-on-6</span>
            </h2>
            <p className="text-[14px] text-[#5a7a6e] mt-3 max-w-[500px] mx-auto">Medicul va recomanda varianta optima in functie de starea osoasa si necesitatile tale. Ambele optiuni ofera dinti ficsi in aceeasi zi.</p>
          </div>
          <div className="bg-white rounded-2xl border border-[--bdr] overflow-hidden shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-3 border-b border-[--bdr]">
              <div className="p-4 text-[13px] font-semibold text-[#5a7a6e]">Caracteristica</div>
              <div className="p-4 text-center text-[13px] font-bold" style={{ color: C.accent, background: `${C.accent}08` }}>All-on-4</div>
              <div className="p-4 text-center text-[13px] font-bold" style={{ color: B.nv }}>All-on-6</div>
            </div>
            {/* Rows */}
            {COMPARISON.map((row, i) => (
              <div key={i} className={cn('grid grid-cols-3 border-b border-[--bdr] last:border-b-0', i % 2 === 0 ? '' : 'bg-[#faf5ff]/50')}>
                <div className="p-4 text-[13px] font-medium text-[#5a7a6e]">{row.feature}</div>
                <div className="p-4 text-center text-[13px]" style={{ color: C.accent }}>{row.allon4}</div>
                <div className="p-4 text-center text-[13px]" style={{ color: B.nv }}>{row.allon6}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ PRICES ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[1000px]">
          <div className="text-center mb-14">
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Cat costa <span style={{ color: C.accent }}>All-On?</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {PRICES.map((p, i) => (
              <Card key={i} className={cn('border transition-all', p.popular ? 'border-[#7c3aed] shadow-lg shadow-purple-500/10' : 'border-[--bdr]')}>
                <CardContent className="p-6">
                  {p.popular && <Badge style={{ background: C.accent }} className="text-white border-0 text-[9px] mb-3">CEL MAI POPULAR</Badge>}
                  <h3 className="font-display text-[17px] font-semibold mb-2" style={{ color: B.nv }}>{p.name}</h3>
                  <div className="font-display text-[32px] font-semibold mb-2" style={{ color: C.accent }}>{p.price}</div>
                  <p className="text-[12px] text-[#5a7a6e] mb-4">{p.includes}</p>
                  <Button className={cn('w-full justify-center text-[13px] font-bold', p.popular ? 'text-white' : 'bg-white text-[#7c3aed] border border-[#7c3aed]')}
                    style={p.popular ? { background: C.accent } : undefined}
                  >Programeaza consultatie gratuita <ArrowRight className="w-3.5 h-3.5 ml-1" /></Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-6 p-4 rounded-xl" style={{ background: C.accentLight }}>
            <p className="text-sm text-[#5a7a6e]">
              <DollarSign className="w-4 h-4 inline mr-1" style={{ color: C.accent }} />
              <strong style={{ color: C.accent }}>Rate 0% dobanda</strong> disponibile pe 6, 12 sau 24 luni. Consultatia include plan financiar detaliat.
            </p>
          </div>
        </div>
      </section>

      {/* ━━━ REVIEWS ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: '#faf5ff' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="flex justify-between items-end mb-10">
            <h2 className="font-display text-[28px] font-semibold" style={{ color: B.nv }}>Ce spun pacientii despre <span style={{ color: C.accent }}>All-On</span></h2>
            <a href="/recenzii" className="text-[13px] font-bold no-underline flex items-center gap-1" style={{ color: C.accent }}>Toate recenziile <ArrowRight className="w-3.5 h-3.5" /></a>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {REVIEWS.map((r, i) => (
              <Card key={i} className="border-[--bdr]">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={r.photo} alt={r.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="text-[13px] font-semibold" style={{ color: B.nv }}>{r.name}</div>
                      <div className="text-[10px] text-[#5a7a6e]">{r.age} · {r.procedure}</div>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-[#fbb040] fill-current" />)}
                  </div>
                  <p className="text-[12px] leading-[1.65] text-[#5a7a6e] italic">&ldquo;{r.text}&rdquo;</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ INTERCONNECTED: Blog ━━━━━━━━━━━━━ */}
      {RELATED_BLOGS.length > 0 && (
        <section className="py-16 px-12">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" style={{ color: C.accent }} />
                <h2 className="font-display text-[20px] font-semibold" style={{ color: B.nv }}>Articole despre reabilitare pe implanturi</h2>
              </div>
              <a href="/blog" className="text-[13px] font-bold no-underline flex items-center gap-1" style={{ color: C.accent }}>
                Toate articolele <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {RELATED_BLOGS.map(art => (
                <a key={art.slug} href={`/blog/${art.slug}`} className="no-underline group">
                  <Card className="overflow-hidden border-[--bdr] hover:border-purple-200 transition-all hover:shadow-lg h-full">
                    <div className="h-[160px] overflow-hidden">
                      <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <CardContent className="p-4">
                      <div className="text-[11px] text-[#5a7a6e] mb-2 flex items-center gap-2">
                        <Clock className="w-3 h-3" />{art.readTime}
                        {art.views && <><span>·</span><Eye className="w-3 h-3" />{art.views}</>}
                      </div>
                      <h3 className="font-display text-[14px] font-semibold leading-snug group-hover:text-[#7c3aed] transition-colors" style={{ color: B.nv }}>{art.title}</h3>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ━━━ INTERCONNECTED: Ambassadors ━━━━━━━ */}
      <section className="py-14 px-12" style={{ background: '#faf5ff' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" style={{ color: C.accent }} />
              <h2 className="font-display text-[20px] font-semibold" style={{ color: B.nv }}>Ambasadori care au ales reabilitare pe implanturi</h2>
            </div>
            <a href="/ambasadori" className="text-[13px] font-bold no-underline flex items-center gap-1" style={{ color: C.accent }}>Toti ambasadorii <ArrowRight className="w-3.5 h-3.5" /></a>
          </div>
          <div className="flex gap-5">
            {RELATED_AMBASSADORS.map(amb => (
              <a key={amb.slug} href="/ambasadori" className="no-underline group flex items-center gap-4 bg-white rounded-xl p-4 border border-[--bdr] hover:border-purple-200 transition-all flex-1">
                <img src={amb.photo} alt={amb.name} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <div className="font-display text-[15px] font-semibold transition-colors" style={{ color: B.nv }}>{amb.name}</div>
                  <div className="text-[11px] font-semibold" style={{ color: C.accent }}>{amb.role}</div>
                  <div className="text-[10px] text-[#5a7a6e] mt-1">Serviciu: Dinti Ficsi / All-On</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ FAQ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[800px]">
          <div className="text-center mb-12">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: C.accent }} />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: C.accent }}>Intrebari frecvente</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Totul despre <span style={{ color: C.accent }}>All-On</span>
            </h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="border border-[--bdr] rounded-xl overflow-hidden transition-all" style={{ background: openFaq === i ? `${C.accent}08` : 'white' }}>
                <button className="w-full flex justify-between items-center p-5 text-left cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-display text-[15px] font-semibold pr-4" style={{ color: B.nv }}>{item.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 flex-shrink-0" style={{ color: C.accent }} /> : <ChevronDown className="w-5 h-5 flex-shrink-0 text-[#5a7a6e]" />}
                </button>
                {openFaq === i && <div className="px-5 pb-5 pt-0 text-sm leading-[1.75] text-[#5a7a6e]">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ CTA + FORM ━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: C.accent }}>
        <div className="mx-auto max-w-[1200px] flex gap-16 items-center">
          <div className="flex-1 text-white">
            <h2 className="font-display text-[36px] font-semibold leading-[1.1] mb-4">Fa primul pas spre<br/><span className="text-purple-200">dinti ficsi definitiv.</span></h2>
            <p className="text-white/60 mb-6 max-w-[400px]">Consultatia initiala cu tomografie CBCT este GRATUITA. Afla daca All-On este solutia potrivita pentru tine.</p>
            {['Consultatie gratuita cu tomografie 3D', 'Plan All-On personalizat', 'Dinti ficsi in aceeasi zi', 'Pret transparent + rate 0%'].map(item => (
              <div key={item} className="flex items-center gap-2.5 mb-2.5">
                <CheckCircle className="w-4 h-4 text-purple-200 flex-shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-white/80">{item}</span>
              </div>
            ))}
          </div>
          <div className="w-[400px] shrink-0 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-display text-[20px] font-semibold mb-1" style={{ color: B.nv }}>Programeaza consultatie</h3>
            <p className="text-sm text-[#5a7a6e] mb-5">Te contactam in maxim 24h.</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Input placeholder="Prenume" />
              <Input placeholder="Nume" />
            </div>
            <Input placeholder="Telefon *" className="mb-3" />
            <select defaultValue="Dinti Ficsi / All-On" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mb-3">
              <option>Dinti Ficsi / All-On</option>
              <option>All-on-4</option>
              <option>All-on-6</option>
              <option>Consultatie generala</option>
            </select>
            <Button className="w-full justify-center py-3 text-[14px] font-bold text-white" style={{ background: C.accent }}>
              Programeaza gratuit <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <p className="text-[10px] text-[#5a7a6e] text-center mt-2">Consultatie initiala GRATUITA</p>
          </div>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="section-line" />
      <footer className="pt-16 pb-8 px-[52px]" style={{ background: B.nv }}>
        <div className="grid gap-12 mb-12" style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr' }}>
          <div>
            <div className="mb-5"><Logo height={34} light/></div>
            <p className="text-sm leading-[1.75] text-white/60 max-w-[260px]">Clinica stomatologica digitala. {STATS.years} ani de excelenta, {STATS.team} specialisti, {STATS.patients} pacienti.</p>
            <div className="mt-5 p-3 px-4 bg-pink-500/[.12] border border-pink-500/20 rounded-lg">
              <div className="font-display text-base font-semibold text-pink-500">{CAMPAIGN_2026.slogan}</div>
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-white tracking-[.15em] uppercase mb-5">Servicii</div>
            <a href="/servicii/implant-dentar" className="block text-[13px] mb-2.5 text-white/[.58] no-underline hover:text-white transition-colors">Implant Dentar</a>
            <a href="/servicii/coroane-dentare" className="block text-[13px] mb-2.5 text-white/[.58] no-underline hover:text-white transition-colors">Coroane Dentare</a>
            <a href="/servicii/dinti-ficsi-all-on" className="block text-[13px] mb-2.5 text-purple-400 font-semibold no-underline">Dinti Ficsi / All-On</a>
            {SERVICES.filter(s => !['implantologie','protetica','allon'].includes(s.slug)).map(s => (
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

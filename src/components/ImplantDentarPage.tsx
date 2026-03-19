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
  Zap, Award, Users, FileText, Scan, Target,
  Timer, AlertCircle, TrendingUp, HelpCircle, Sparkles,
  Calendar, Stethoscope, DollarSign, Video, BookOpen
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
        <a href="/login" className="no-underline">
          <Button variant="outline" size="sm" className="border-sdt-600 text-sdt-600 font-semibold text-[13px]">Cabinetul meu</Button>
        </a>
        <Button variant="accent" size="sm" className="text-[13px]">Programeaza-te</Button>
      </div>
    </nav>
  )
}

const ANIM = `
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  @keyframes pulse-ring { 0% { transform: scale(1); opacity: .4; } 100% { transform: scale(1.5); opacity: 0; } }
`

/* ─── Content Data ────────────────────────── */
const PROCESS_STEPS = [
  { step: '01', title: 'Digital Check-Up', desc: 'Consultatie gratuita + scanare 3D + tomografie CBCT. Evaluam densitatea osoasa, structurile anatomice si planificam pozitia exacta a implantului.', duration: '45 min', icon: Scan },
  { step: '02', title: 'Planificare 3D', desc: 'Simulare digitala completa: pozitie implant, unghiul de insertie, tip implant (Straumann/Nobel Biocare). Ghid chirurgical tiparit 3D.', duration: '1 saptamana', icon: Target },
  { step: '03', title: 'Insertia implantului', desc: 'Procedura minim invaziva sub anestezie locala. Ghid 3D pentru precizie de 0.2mm. Durata: 30-60 min/implant. Fara taieturi, fara suturi clasice.', duration: '30-60 min', icon: Stethoscope },
  { step: '04', title: 'Vindecare (osteointegrare)', desc: 'Implantul se integreaza in os in 3-6 luni. In aceasta perioada purtati o proteza provizorie estetica. Controale la 2 si 6 saptamani.', duration: '3-6 luni', icon: Timer },
  { step: '05', title: 'Coroana finala', desc: 'Scanare digitala + fabricare CAD/CAM a coroanei din zirconiu sau E-max. Cimentare definitiva — aspect natural, rezistenta pe viata.', duration: '2 sedinte', icon: Sparkles },
]

const PRICES = [
  { name: 'Implant Straumann (Elvetia)', price: 'de la 450€', includes: 'Consultatie + Planificare 3D + Implant + Interventie + Controale', popular: false },
  { name: 'Implant Nobel Biocare (Suedia)', price: 'de la 500€', includes: 'Consultatie + Planificare 3D + Implant + Interventie + Controale', popular: true },
  { name: 'Implant + Coroana Zirconiu', price: 'de la 800€', includes: 'Pachet complet: implant + bont + coroana zirconiu + garantie', popular: false },
  { name: 'All-on-4 (arcada completa)', price: 'de la 2997€', includes: '4 implanturi + arcada provizorie + arcada finala + garantie', popular: false },
]

const WHO_IS_IT_FOR = [
  { title: 'Lipsa unui dinte', desc: 'Implantul inlocuieste un singur dinte pierdut fara a afecta dintii vecini (spre deosebire de punte dentara).', icon: '1' },
  { title: 'Lipsa mai multor dinti', desc: 'Multiple implanturi cu punte pe implanturi — solutie fixa, stabila, fara proteza mobila.', icon: '2+' },
  { title: 'Edentatie totala', desc: 'All-on-4/6: arcada completa fixa pe 4-6 implanturi. Alternativa permanenta la proteza mobila.', icon: 'All' },
  { title: 'Parodontita avansata', desc: 'Dinti mobili din cauza parodontitei? Extractie + implantare imediata cu augmentare osoasa daca e necesar.', icon: 'P' },
]

const WHY_SDT = [
  { icon: Scan, title: 'Planificare 100% digitala', desc: 'Fiecare implant este planificat cu tomografie 3D si ghid chirurgical tiparit 3D. Zero improvizatie.' },
  { icon: Shield, title: 'Implanturi Straumann & Nobel', desc: 'Folosim exclusiv implanturi premium de la Straumann (Elvetia) si Nobel Biocare (Suedia) — lideri mondiali.' },
  { icon: Award, title: 'Rata de succes 99.2%', desc: 'Peste 5.000 de implanturi insertate cu rata de succes de 99.2%. Echipa cu 15+ ani experienta.' },
  { icon: Zap, title: 'Minim invaziv', desc: 'Ghidajul 3D permite insertia fara taieturi si fara suturi clasice. Recuperare mai rapida, disconfort minimal.' },
  { icon: Heart, title: 'Fara durere', desc: 'Anestezie moderna + optiune de sedare constienta. Pacientii raporteaza disconfort mai mic decat la o extractie simpla.' },
  { icon: DollarSign, title: 'Rate 0% dobanda', desc: 'Plata in rate lunare fara dobanda pana la 24 luni. Acces la tratament premium fara efort financiar.' },
]

const TECHNOLOGIES = [
  { name: '3Shape Trios 5', type: 'Scanner intraoral', desc: 'Amprenta digitala in 2 minute, precizie 6.9 microni' },
  { name: 'CBCT 3D', type: 'Tomografie', desc: 'Imagine 3D completa a maxilarelor si structurilor anatomice' },
  { name: 'Ghid chirurgical 3D', type: 'Chirurgie ghidata', desc: 'Tiparit 3D din planificarea digitala, precizie 0.2mm' },
  { name: 'Piezosurgery', type: 'Chirurgie ultrasunete', desc: 'Protejarea nervilor si tesuturilor moi, vindecare rapida' },
  { name: 'Straumann BLX', type: 'Sistem implant', desc: 'Implant cu stabilitate primara excelenta, incarcare imediata' },
  { name: 'Nobel Biocare TiUltra', type: 'Sistem implant', desc: 'Suprafata unica TiUltra pentru osteointegrare accelerata' },
]

const REVIEWS = [
  { name: 'Denis P.', age: '42 ani', procedure: '2 implanturi Straumann', text: 'Am primit implanturile fara durere. Ghidul 3D a facut totul rapid — 45 minute si gata. In 4 luni aveam dinti noi.', rating: 5, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
  { name: 'Elena M.', age: '55 ani', procedure: 'All-on-4 superior', text: 'Dupa 15 ani de proteza mobila, am ales All-on-4. Am plecat din clinica cu dinti ficsi. Cea mai buna decizie.', rating: 5, photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face' },
  { name: 'Gheorghe T.', age: '63 ani', procedure: 'Implant Nobel Biocare', text: 'Echipa a fost extraordinara. Totul planificat digital, fara surprize. La control la 1 an — perfect.', rating: 5, photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face' },
  { name: 'Maria L.', age: '38 ani', procedure: 'Implant + coroana zirconiu', text: 'Am pierdut un dinte intr-un accident. In 5 luni aveam implant cu coroana — nimeni nu vede diferenta!', rating: 5, photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face' },
]

const FAQ = [
  { q: 'Cat costa un implant dentar la SDT?', a: 'Pretul porneste de la 350€ pentru implant Straumann/Nobel Biocare. Pachetul complet (implant + bont + coroana zirconiu) porneste de la 800€. Consultatia initiala cu Digital Check-Up este GRATUITA.' },
  { q: 'Este dureros implantul dentar?', a: 'Nu. Procedura se realizeaza sub anestezie locala moderna. Pacientii compara disconfortul cu o extractie simpla. Pentru cazuri complexe, oferim sedare constienta. Disconfortul post-operator dureaza 2-3 zile.' },
  { q: 'Cat dureaza procedura de implantare?', a: 'Insertia propriu-zisa dureaza 30-60 minute per implant. Intregul proces (de la consultatie la coroana finala) dureaza 3-6 luni, incluzand perioada de osteointegrare.' },
  { q: 'Cat dureaza un implant dentar?', a: 'Implanturile Straumann si Nobel Biocare au o durata de viata de 20-30+ ani. Cu igiena corecta si controale regulate, implantul poate dura toata viata. Oferim garantie pe viata pe implant.' },
  { q: 'Se poate face implant imediat dupa extractie?', a: 'Da, in multe cazuri. Se numeste "implantare imediata" si permite insertia implantului in aceeasi sedinta cu extractia. Economiseste timp si reduce numarul de interventii.' },
  { q: 'Ce se intampla daca nu am suficient os?', a: 'Oferim proceduri de augmentare osoasa (aditie osoasa, sinus lifting) pentru a reconstrui osul necesar. Planificarea 3D CBCT identifica exact cat os este disponibil si ce este necesar.' },
  { q: 'Pot plati in rate?', a: 'Da! Oferim Rate 0% dobanda pe 6, 12 sau 24 luni prin partenerii nostri financiari. Consultatia este gratuita si include un plan financiar detaliat.' },
  { q: 'Ce marca de implanturi folositi?', a: 'Folosim exclusiv Straumann (Elvetia) si Nobel Biocare (Suedia) — cele mai studiate si certificate sisteme de implanturi din lume, cu rata de succes de peste 99%.' },
]

// Related blog articles about implants
const RELATED_BLOGS = BLOG_ARTICLES.filter(a =>
  a.tags.some(t => t.includes('implant') || t.includes('chirurgie') || t.includes('all-on'))
).slice(0, 3)

// Related ambassadors
const RELATED_AMBASSADORS = AMBASSADORS.filter(a =>
  ['talmazan', 'malareu', 'cosovan'].includes(a.slug)
)

/* ─── Page Component ─────────────────────── */
export function ImplantDentarPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeStep, setActiveStep] = useState(0)

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

      {/* ━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${B.nv} 0%, #0f2e24 50%, ${B.pd} 100%)` }}>
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 items-center gap-10 px-12 pb-20 pt-12">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Badge className="bg-pink-500 text-white border-0 text-[10px] font-bold">SERVICIU #1</Badge>
              <Badge className="bg-white/10 text-white/70 border-white/20 text-[10px]">RATE 0%</Badge>
            </div>
            <h1 className="font-display mb-4 text-[48px] font-semibold leading-[1.05] tracking-tight text-white">
              Implant dentar —<br/>solutia <span className="text-pink-500">permanenta.</span>
            </h1>
            <p className="mb-6 max-w-[460px] text-[15px] leading-relaxed text-white/[.65]">
              Inlocuieste dintii lipsa cu implanturi premium Straumann si Nobel Biocare. Planificare 100% digitala, insertie ghidata 3D, rata de succes 99.2%.
            </p>
            {/* Key selling points */}
            <div className="grid grid-cols-2 gap-2 mb-7">
              {([
                { I: CheckCircle, l: 'Planificare 3D completa' },
                { I: Shield, l: 'Garantie pe viata' },
                { I: Timer, l: 'Procedura 30-60 min' },
                { I: DollarSign, l: 'Rate 0% disponibile' },
              ] as const).map(({ I, l }) => (
                <div key={l} className="flex items-center gap-2 text-white/70">
                  <I className="w-4 h-4 text-pink-400" strokeWidth={1.5} />
                  <span className="text-[13px]">{l}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="accent" className="gap-2 px-8 py-3.5 text-[15px] font-bold">
                Programeaza consultatie gratuita <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            {/* Price anchor */}
            <div className="mt-8 inline-flex items-center gap-3 bg-white/[.06] border border-white/[.12] rounded-xl px-5 py-3">
              <div className="font-display text-[32px] font-semibold text-pink-500">350€</div>
              <div className="text-xs text-white/50 leading-tight">pret de la<br/><span className="text-white/70 font-semibold">implant Straumann</span></div>
            </div>
          </div>

          {/* Right — Implant visualization */}
          <div className="relative flex h-[420px] items-center justify-center">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=400&fit=crop" alt="Implant dentar SDT"
                className="w-[320px] h-[320px] rounded-3xl object-cover border-2 border-white/10"
              />
              {/* Floating info cards */}
              <div className="absolute -top-4 -right-8 bg-white/[.1] backdrop-blur-md border border-white/20 rounded-xl px-3 py-2" style={{ animation: 'float 3s ease-in-out infinite' }}>
                <div className="text-[10px] font-bold text-pink-400">RATA DE SUCCES</div>
                <div className="font-display text-xl font-semibold text-white">99.2%</div>
              </div>
              <div className="absolute -bottom-4 -left-8 bg-white/[.1] backdrop-blur-md border border-white/20 rounded-xl px-3 py-2" style={{ animation: 'float 3.5s 0.5s ease-in-out infinite' }}>
                <div className="text-[10px] font-bold text-pink-400">EXPERIENTA</div>
                <div className="font-display text-xl font-semibold text-white">5000+</div>
                <div className="text-[9px] text-white/50">implanturi insertate</div>
              </div>
              <div className="absolute top-1/2 -right-12 bg-white/[.1] backdrop-blur-md border border-white/20 rounded-xl px-3 py-2" style={{ animation: 'float 4s 1s ease-in-out infinite' }}>
                <div className="text-[10px] font-bold text-white/60">Straumann</div>
                <div className="text-[10px] font-bold text-white/60">Nobel Biocare</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ STATS STRIP ━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-5 px-12" style={{ background: `linear-gradient(135deg, ${B.p}, ${B.pm})` }}>
        <div className="mx-auto max-w-[1200px] flex justify-center gap-12">
          {[['5.000+', 'implanturi insertate'], ['99.2%', 'rata succes'], ['15+', 'ani experienta'], ['0%', 'dobanda la rate']].map(([n, l]) => (
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
              <span className="h-2 w-2 rounded-full bg-pink-500" />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: B.p }}>Pentru cine este</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Cand ai nevoie de <span className="text-pink-500">implant dentar?</span>
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {WHO_IS_IT_FOR.map((w, i) => (
              <Card key={i} className="group border-[--bdr] hover:border-sdt-200 transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 font-display text-lg font-bold text-white" style={{ background: B.p }}>
                    {w.icon}
                  </div>
                  <h3 className="font-display text-[16px] font-semibold mb-2" style={{ color: B.nv }}>{w.title}</h3>
                  <p className="text-[12px] leading-[1.7] text-[#5a7a6e]">{w.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ PROCES (Interactive Steps) ━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: B.ps }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-14">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: B.p }} />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: B.p }}>Procesul complet</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              5 pasi de la <span className="text-pink-500">consultatie la zambet</span>
            </h2>
          </div>
          <div className="grid grid-cols-[280px_1fr] gap-6">
            {/* Left — Step selector */}
            <div className="space-y-2">
              {PROCESS_STEPS.map((s, i) => (
                <button key={i} onClick={() => setActiveStep(i)}
                  className={cn(
                    'w-full text-left p-4 rounded-xl border transition-all cursor-pointer',
                    activeStep === i ? 'bg-white border-sdt-200 shadow-lg' : 'bg-transparent border-transparent hover:bg-white/60'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center text-[12px] font-bold',
                      activeStep === i ? 'bg-sdt-600 text-white' : 'bg-sdt-50 text-sdt-600'
                    )}>{s.step}</div>
                    <div>
                      <div className={cn('text-[14px] font-semibold', activeStep === i ? 'text-sdt-600' : 'text-[#5a7a6e]')}>{s.title}</div>
                      <div className="text-[10px] text-[#5a7a6e]/60">{s.duration}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {/* Right — Step detail */}
            <div className="bg-white rounded-2xl border border-[--bdr] p-8 shadow-sm animate-fadeUp" key={activeStep} style={{ animationDuration: '0.25s' }}>
              {(() => {
                const s = PROCESS_STEPS[activeStep]
                return (
                  <div className="flex gap-6">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${B.p}0D` }}>
                      <s.icon className="w-8 h-8 text-sdt-600" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-display text-[22px] font-semibold" style={{ color: B.nv }}>{s.step}. {s.title}</h3>
                        <Badge variant="outline" className="text-[10px] border-sdt-200 text-sdt-600">{s.duration}</Badge>
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
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-pink-500" />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: B.p }}>De ce Smile Dent Team</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              6 motive sa alegi <span className="text-pink-500">SDT</span>
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {WHY_SDT.map((w, i) => (
              <Card key={i} className="group border-[--bdr] hover:border-sdt-200 transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${B.p}0D` }}>
                    <w.icon className="w-5 h-5 text-sdt-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-[15px] font-semibold mb-2" style={{ color: B.nv }}>{w.title}</h3>
                  <p className="text-[12px] leading-[1.7] text-[#5a7a6e]">{w.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ TECHNOLOGIES ━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-14 px-12" style={{ background: B.nv }}>
        <div className="mx-auto max-w-[1200px]">
          <h2 className="font-display text-[24px] font-semibold text-white mb-8 text-center">Tehnologii folosite in <span className="text-pink-500">implantologie</span></h2>
          <div className="grid grid-cols-6 gap-4">
            {TECHNOLOGIES.map((t, i) => (
              <div key={i} className="p-4 rounded-xl border border-white/[.07] bg-white/[.03] text-center">
                <div className="text-[13px] font-semibold text-white mb-1">{t.name}</div>
                <div className="text-[10px] text-pink-400 font-semibold mb-1">{t.type}</div>
                <div className="text-[10px] text-white/40">{t.desc}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <a href="/tehnologii" className="text-[12px] text-sdt-500 font-semibold no-underline flex items-center gap-1 justify-center">
              Vezi toate tehnologiile <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* ━━━ PRICES ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[1000px]">
          <div className="text-center mb-14">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-pink-500" />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: B.p }}>Preturi transparente</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Cat costa <span className="text-pink-500">implantul dentar?</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {PRICES.map((p, i) => (
              <Card key={i} className={cn('border transition-all', p.popular ? 'border-pink-500 shadow-lg shadow-pink-500/10' : 'border-[--bdr]')}>
                <CardContent className="p-6">
                  {p.popular && <Badge className="bg-pink-500 text-white border-0 text-[9px] mb-3">CEL MAI POPULAR</Badge>}
                  <h3 className="font-display text-[17px] font-semibold mb-2" style={{ color: B.nv }}>{p.name}</h3>
                  <div className="font-display text-[32px] font-semibold text-pink-500 mb-2">{p.price}</div>
                  <p className="text-[12px] text-[#5a7a6e] mb-4">{p.includes}</p>
                  <Button variant={p.popular ? 'accent' : 'outline'} className="w-full justify-center text-[13px] font-bold">
                    Programeaza consultatie gratuita <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-6 p-4 bg-sdt-50 rounded-xl">
            <p className="text-sm text-[#5a7a6e]">
              <DollarSign className="w-4 h-4 inline text-pink-500 mr-1" />
              <strong className="text-sdt-600">Rate 0% dobanda</strong> disponibile pe 6, 12 sau 24 luni. Consultatia include plan financiar detaliat.
            </p>
          </div>
        </div>
      </section>

      {/* ━━━ REVIEWS ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: B.ps }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="flex justify-between items-end mb-10">
            <div>
              <div className="mb-3 inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-pink-500" />
                <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: B.p }}>Recenzii pacienti</span>
              </div>
              <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
                Ce spun pacientii despre <span className="text-pink-500">implant</span>
              </h2>
            </div>
            <a href="/recenzii" className="text-[13px] font-bold text-sdt-600 no-underline flex items-center gap-1">
              Toate recenziile <ArrowRight className="w-3.5 h-3.5" />
            </a>
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
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 text-[#fbb040] fill-current" />
                    ))}
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
                <BookOpen className="w-5 h-5 text-sdt-600" />
                <h2 className="font-display text-[20px] font-semibold" style={{ color: B.nv }}>Articole despre implant dentar</h2>
              </div>
              <a href="/blog" className="text-[13px] font-bold text-sdt-600 no-underline flex items-center gap-1">
                Toate articolele <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {RELATED_BLOGS.map(art => (
                <a key={art.slug} href={`/blog/${art.slug}`} className="no-underline group">
                  <Card className="overflow-hidden border-[--bdr] hover:border-sdt-200 transition-all hover:shadow-lg h-full">
                    <div className="h-[160px] overflow-hidden">
                      <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <CardContent className="p-4">
                      <div className="text-[11px] text-[#5a7a6e] mb-2 flex items-center gap-2">
                        <Clock className="w-3 h-3" />{art.readTime}
                        {art.views && <><span>·</span><Eye className="w-3 h-3" />{art.views}</>}
                      </div>
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
      <section className="py-14 px-12" style={{ background: B.ps }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-pink-500" />
              <h2 className="font-display text-[20px] font-semibold" style={{ color: B.nv }}>Ambasadori care au ales implant dentar</h2>
            </div>
            <a href="/ambasadori" className="text-[13px] font-bold text-sdt-600 no-underline flex items-center gap-1">
              Toti ambasadorii <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="flex gap-5">
            {RELATED_AMBASSADORS.map(amb => (
              <a key={amb.slug} href={`/ambasadori`} className="no-underline group flex items-center gap-4 bg-white rounded-xl p-4 border border-[--bdr] hover:border-sdt-200 transition-all flex-1">
                <img src={amb.photo} alt={amb.name} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <div className="font-display text-[15px] font-semibold group-hover:text-sdt-600 transition-colors" style={{ color: B.nv }}>{amb.name}</div>
                  <div className="text-[11px] text-pink-500 font-semibold">{amb.role}</div>
                  <div className="text-[10px] text-[#5a7a6e] mt-1">Serviciu: Implant Dentar</div>
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
              <span className="h-2 w-2 rounded-full bg-pink-500" />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: B.p }}>Intrebari frecvente</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Totul despre <span className="text-pink-500">implant dentar</span>
            </h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="border border-[--bdr] rounded-xl overflow-hidden transition-all" style={{ background: openFaq === i ? `${B.p}04` : 'white' }}>
                <button className="w-full flex justify-between items-center p-5 text-left cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-display text-[15px] font-semibold pr-4" style={{ color: B.nv }}>{item.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 flex-shrink-0 text-sdt-600" /> : <ChevronDown className="w-5 h-5 flex-shrink-0 text-[#5a7a6e]" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pt-0 text-sm leading-[1.75] text-[#5a7a6e]">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ CTA + FORM ━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: `linear-gradient(135deg, ${B.p}, ${B.pm})` }}>
        <div className="mx-auto max-w-[1200px] flex gap-16 items-center">
          <div className="flex-1 text-white">
            <h2 className="font-display text-[36px] font-semibold leading-[1.1] mb-4">
              Fa primul pas spre<br/><span className="text-pink-300">zambetul complet.</span>
            </h2>
            <p className="text-white/60 mb-6 max-w-[400px]">Consultatia initiala cu Digital Check-Up este GRATUITA. Afla daca implantul dentar este solutia potrivita pentru tine.</p>
            {['Consultatie gratuita cu Digital Check-Up', 'Plan de tratament 3D personalizat', 'Pret transparent, fara costuri ascunse', 'Rate 0% disponibile'].map(item => (
              <div key={item} className="flex items-center gap-2.5 mb-2.5">
                <CheckCircle className="w-4 h-4 text-pink-400 flex-shrink-0" strokeWidth={1.5} />
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
            <select defaultValue="Implant Dentar" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mb-3">
              <option>Implant Dentar</option>
              <option>All-on-4 / All-on-6</option>
              <option>Implant + Coroana</option>
              <option>Consultatie generala</option>
            </select>
            <Button variant="accent" className="w-full justify-center py-3 text-[14px] font-bold">
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

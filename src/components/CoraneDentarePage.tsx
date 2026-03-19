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
  ArrowRight, MapPin, Phone, Clock, CheckCircle, Shield,
  Star, Play, ChevronDown, ChevronUp, Heart, Eye,
  Zap, Award, Users, Scan, Target, Timer, Sparkles,
  Calendar, Stethoscope, DollarSign, BookOpen, Gem, Crown
} from 'lucide-react'

const C = SVC_COLORS.protetica // Blue accent for Coroane

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
            l === 'Servicii' ? 'font-bold text-[#2563EB]' : 'text-[#3a5a50]'
          )}>
            {l}
            {l === 'Servicii' && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-5 rounded-full" style={{ background: C.accent }} />}
          </a>
        ))}
      </div>
      <div className="flex gap-2.5 items-center">
        <a href="/login" className="no-underline">
          <Button variant="outline" size="sm" className="border-[#2563EB] text-[#2563EB] font-semibold text-[13px]">Cabinetul meu</Button>
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
  { step: '01', title: 'Consultatie + Scanare 3D', desc: 'Evaluam starea dintelui cu scanner intraoral 3Shape. Determinam tipul de restaurare necesara (coroana, punte, inlay/onlay). Fara amprenta clasica.', duration: '30 min', icon: Scan },
  { step: '02', title: 'Design digital CAD', desc: 'Coroana este proiectata virtual in software-ul CAD. Forma, culoarea si contactele ocluzale sunt optimizate digital pentru un rezultat perfect.', duration: '1-2 zile', icon: Target },
  { step: '03', title: 'Frezare CAD/CAM', desc: 'Coroana este frezata din bloc de zirconiu sau ceramica E-max pe echipament CAD/CAM. Precizie de 10 microni — superioara oricarei tehnici manuale.', duration: '2-3 ore', icon: Gem },
  { step: '04', title: 'Proba si ajustare', desc: 'Coroana este probata pe dinte: verificam fit-ul, culoarea si ocluzia. Ajustari fine daca e necesar. Pacientul aprooba rezultatul.', duration: '30 min', icon: Eye },
  { step: '05', title: 'Cimentare definitiva', desc: 'Coroana este cimentata definitiv cu adeziv special. Rezultat: aspect natural, rezistenta maxima, garantie pe viata pe structura.', duration: '20 min', icon: Sparkles },
]

const MATERIALS = [
  { name: 'Zirconiu monolitic', type: 'Premium', desc: 'Cel mai rezistent material. Aspect natural, biocompatibil, fara alergii. Ideal pentru zonele posterioare si punti lungi.', durability: '20+ ani', popular: true },
  { name: 'E-max (disilicate de litiu)', type: 'Estetica superioara', desc: 'Ceramica cu translucenta naturala exceptionala. Ideal pentru zonele anterioare — rezultat estetic perfect.', durability: '15+ ani', popular: false },
  { name: 'Metal-ceramica', type: 'Economic', desc: 'Structura metalica acoperita cu ceramica. Optiune economica cu rezistenta buna. Estetic acceptabila.', durability: '10-15 ani', popular: false },
  { name: 'Zirconiu stratificat', type: 'Ultra-premium', desc: 'Baza de zirconiu cu straturi de ceramica aplicata manual. Combinatie ideala: rezistenta + estetica maxima.', durability: '25+ ani', popular: false },
]

const PRICES = [
  { name: 'Coroana zirconiu monolitic', price: 'de la 200€', includes: 'Scanare + Design + Coroana + Cimentare + Garantie', popular: true },
  { name: 'Coroana E-max', price: 'de la 250€', includes: 'Scanare + Design + Coroana ceramica + Garantie', popular: false },
  { name: 'Punte pe 3 dinti (zirconiu)', price: 'de la 550€', includes: '3 unitati protetice + Scanare + Garantie', popular: false },
  { name: 'Coroana pe implant', price: 'de la 350€', includes: 'Bont + Coroana zirconiu + Cimentare + Garantie', popular: false },
]

const WHO_IS_IT_FOR = [
  { title: 'Dinte deteriorat', desc: 'Carie extinsa, fractura sau tratament de canal — coroana protejeaza si restaureaza dintele natural.', icon: '1' },
  { title: 'Dinte lipsa (punte)', desc: 'Puntea dentara inlocuieste 1-2 dinti lipsa sprijinindu-se pe dintii vecini — fara chirurgie.', icon: '⊓' },
  { title: 'Coroane vechi', desc: 'Coroanele metalice sau metal-ceramice vechi pot fi inlocuite cu zirconiu modern — aspect natural.', icon: '↻' },
  { title: 'Coroana pe implant', desc: 'Dupa osteointegrarea implantului, coroana finala restaureaza functia si estetica complet.', icon: '⬡' },
]

const WHY_SDT = [
  { icon: Scan, title: 'Scanare digitala 3Shape', desc: 'Fara amprenta clasica cu pasta. Scanner intraoral — confort total, precizie maxima.' },
  { icon: Target, title: 'Design CAD personalizat', desc: 'Fiecare coroana este proiectata digital — forma, culoare, ocluzie optimizate pe calculator.' },
  { icon: Gem, title: 'Materiale premium certificate', desc: 'Zirconiu Ivoclar Vivadent si E-max — lideri mondiali in protetica dentara.' },
  { icon: Shield, title: 'Garantie pe viata', desc: 'Garantie pe viata pe structura coroanei. Controale anuale gratuite incluse.' },
  { icon: Timer, title: 'Rapida: 2-5 zile', desc: 'De la scanare la coroana finala in 2-5 zile. Coroana temporara estetica in aceeasi sedinta.' },
  { icon: DollarSign, title: 'Rate 0% disponibile', desc: 'Plata in rate lunare fara dobanda pana la 24 luni. Preturi transparente, fara surprize.' },
]

const REVIEWS = [
  { name: 'Ion V.', age: '48 ani', procedure: '4 coroane zirconiu', text: 'Coroanele arata absolut natural. Nimeni nu le deosebeste de dintii mei reali. Recomand cu incredere!', rating: 5, photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face' },
  { name: 'Ana M.', age: '35 ani', procedure: 'Punte ceramica E-max', text: 'Sunt impresionata de cat de rapid a fost tot procesul. In 3 zile aveam puntea gata. Zero disconfort!', rating: 5, photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face' },
  { name: 'Valentina P.', age: '52 ani', procedure: 'Inlocuire coroane vechi', text: 'Am inlocuit 6 coroane metal-ceramice cu zirconiu. Diferenta este uimitoare — zambetul meu arata cu 10 ani mai tanar.', rating: 5, photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face' },
  { name: 'Dmitri K.', age: '41 ani', procedure: 'Coroana pe implant', text: 'Coroana pe implant arata si se simte ca un dinte natural. Echipa a fost foarte profesionista la fiecare pas.', rating: 5, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face' },
]

const FAQ = [
  { q: 'Cat costa o coroana dentara la SDT?', a: 'Pretul porneste de la 200€ pentru coroana zirconiu monolitic. E-max: de la 250€. Coroana pe implant: de la 350€. Consultatia initiala cu Digital Check-Up este GRATUITA.' },
  { q: 'Cat dureaza procesul complet?', a: 'De la prima scanare la coroana finala cimentata: 2-5 zile lucratoare. Coroana temporara estetica se aplica in aceeasi sedinta cu prepararea dintelui.' },
  { q: 'Ce material sa aleg — zirconiu sau E-max?', a: 'Zirconiu: maxim rezistent, ideal pentru zonele posterioare si punti. E-max: estetica superioara cu translucenta naturala, ideal pentru zonele anterioare. Medicul va recomanda materialul optim.' },
  { q: 'Cat dureaza o coroana dentara?', a: 'Zirconiu: 20+ ani. E-max: 15+ ani. Metal-ceramica: 10-15 ani. Cu igiena corecta si controale regulate, durata poate fi si mai mare. Oferim garantie pe viata pe structura.' },
  { q: 'Se vede ca este coroana, nu dinte natural?', a: 'Nu. Coroanele moderne din zirconiu si E-max imita perfect dintele natural: culoare, translucenta, forma. Folosim shade matching AI pentru potrivirea exacta a culorii.' },
  { q: 'Este necesar tratament de canal inainte?', a: 'Nu intotdeauna. Doar daca nervul dintelui este afectat. Evaluarea cu tomografie 3D determina daca tratamentul de canal este necesar inainte de coroana.' },
  { q: 'Pot plati in rate?', a: 'Da! Rate 0% dobanda pe 6, 12 sau 24 luni. Consultatia include plan financiar detaliat cu toate optiunile de plata.' },
]

const RELATED_BLOGS = BLOG_ARTICLES.filter(a =>
  a.tags.some(t => t.includes('coroana') || t.includes('protetica') || t.includes('zirconiu') || t.includes('estetica'))
).slice(0, 3)

const RELATED_AMBASSADORS = AMBASSADORS.filter(a =>
  ['marian', 'adam', 'cosovan'].includes(a.slug)
)

/* ─── Page Component ─────────────────────── */
export function CoraneDentarePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [activeMaterial, setActiveMaterial] = useState(0)

  return (
    <>
      <Nav />
      <style dangerouslySetInnerHTML={{ __html: ANIM }} />

      {/* Breadcrumbs */}
      <div className="bg-[#fafcfb] border-b border-[--bdr] px-12 py-3">
        <div className="mx-auto max-w-[1200px] flex items-center gap-2 text-[12px] text-[#5a7a6e]">
          <a href="/" className="no-underline text-[#5a7a6e] hover:text-[#2563EB]">Acasa</a><span>/</span>
          <a href="/servicii" className="no-underline text-[#5a7a6e] hover:text-[#2563EB]">Servicii</a><span>/</span>
          <span className="text-[#2563EB] font-semibold">Coroane Dentare</span>
        </div>
      </div>

      {/* ━━━ HERO (Blue accent) ━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden" style={{ background: C.gradient }}>
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 items-center gap-10 px-12 pb-20 pt-12">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Badge style={{ background: C.accent }} className="text-white border-0 text-[10px] font-bold">SERVICIU #2</Badge>
              <Badge className="bg-white/10 text-white/70 border-white/20 text-[10px]">RATE 0%</Badge>
              <Badge className="bg-white/10 text-white/70 border-white/20 text-[10px]">GARANTIE PE VIATA</Badge>
            </div>
            <h1 className="font-display mb-4 text-[48px] font-semibold leading-[1.05] tracking-tight text-white">
              Coroane dentare —<br/>zambet <span style={{ color: '#60a5fa' }}>restaurat perfect.</span>
            </h1>
            <p className="mb-6 max-w-[460px] text-[15px] leading-relaxed text-white/[.65]">
              Restaurari protetice premium din zirconiu si E-max. Design CAD personalizat, scanare digitala 3Shape, garantie pe viata. Fara amprenta clasica.
            </p>
            <div className="grid grid-cols-2 gap-2 mb-7">
              {([
                { I: Scan, l: 'Scanare digitala 3Shape' },
                { I: Shield, l: 'Garantie pe viata' },
                { I: Timer, l: 'Gata in 2-5 zile' },
                { I: DollarSign, l: 'Rate 0% disponibile' },
              ] as const).map(({ I, l }) => (
                <div key={l} className="flex items-center gap-2 text-white/70">
                  <I className="w-4 h-4 text-blue-400" strokeWidth={1.5} />
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
              <div className="font-display text-[32px] font-semibold text-blue-400">200€</div>
              <div className="text-xs text-white/50 leading-tight">pret de la<br/><span className="text-white/70 font-semibold">coroana zirconiu</span></div>
            </div>
          </div>

          {/* Right — Photo with floating cards */}
          <div className="relative flex h-[420px] items-center justify-center">
            <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=400&fit=crop" alt="Coroane dentare SDT"
              className="w-[320px] h-[320px] rounded-3xl object-cover border-2 border-white/10"
            />
            <div className="absolute -top-4 -right-8 bg-white/[.1] backdrop-blur-md border border-white/20 rounded-xl px-3 py-2" style={{ animation: 'float 3s ease-in-out infinite' }}>
              <div className="text-[10px] font-bold text-blue-400">MATERIAL</div>
              <div className="font-display text-lg font-semibold text-white">Zirconiu</div>
              <div className="text-[9px] text-white/50">Ivoclar Vivadent</div>
            </div>
            <div className="absolute -bottom-4 -left-8 bg-white/[.1] backdrop-blur-md border border-white/20 rounded-xl px-3 py-2" style={{ animation: 'float 3.5s 0.5s ease-in-out infinite' }}>
              <div className="text-[10px] font-bold text-blue-400">PRECIZIE</div>
              <div className="font-display text-xl font-semibold text-white">10μm</div>
              <div className="text-[9px] text-white/50">CAD/CAM digital</div>
            </div>
            <div className="absolute top-1/2 -right-12 bg-white/[.1] backdrop-blur-md border border-white/20 rounded-xl px-3 py-2" style={{ animation: 'float 4s 1s ease-in-out infinite' }}>
              <div className="text-[10px] font-bold text-white/60">Garantie</div>
              <div className="font-display text-lg font-semibold text-white">pe viata</div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ STATS STRIP (Blue) ━━━━━━━━━━━━━━━ */}
      <section className="py-5 px-12" style={{ background: C.accent }}>
        <div className="mx-auto max-w-[1200px] flex justify-center gap-12">
          {[['10.000+', 'coroane realizate'], ['10μm', 'precizie CAD/CAM'], ['20+', 'ani durabilitate'], ['0%', 'dobanda la rate']].map(([n, l]) => (
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
              Cand ai nevoie de <span style={{ color: C.accent }}>coroana dentara?</span>
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {WHO_IS_IT_FOR.map((w, i) => (
              <Card key={i} className="group border-[--bdr] hover:border-blue-200 transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 font-display text-lg font-bold text-white" style={{ background: C.accent }}>{w.icon}</div>
                  <h3 className="font-display text-[16px] font-semibold mb-2" style={{ color: B.nv }}>{w.title}</h3>
                  <p className="text-[12px] leading-[1.7] text-[#5a7a6e]">{w.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ MATERIALS ━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: C.accentLight }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-14">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: C.accent }} />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: C.accent }}>Materiale premium</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Materialul potrivit pentru <span style={{ color: C.accent }}>fiecare caz</span>
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {MATERIALS.map((m, i) => (
              <Card key={i} className={cn('border transition-all cursor-pointer', activeMaterial === i ? 'border-[#2563EB] shadow-lg shadow-blue-500/10' : 'border-[--bdr] hover:border-blue-200')}
                onClick={() => setActiveMaterial(i)}
              >
                <CardContent className="p-6">
                  {m.popular && <Badge style={{ background: C.accent }} className="text-white border-0 text-[9px] mb-3">RECOMANDAT</Badge>}
                  <h3 className="font-display text-[15px] font-semibold mb-1" style={{ color: B.nv }}>{m.name}</h3>
                  <div className="text-[11px] font-semibold mb-2" style={{ color: C.accent }}>{m.type}</div>
                  <p className="text-[12px] leading-[1.65] text-[#5a7a6e] mb-3">{m.desc}</p>
                  <div className="text-[11px] text-[#5a7a6e] flex items-center gap-1">
                    <Timer className="w-3 h-3" /> Durabilitate: <span className="font-semibold" style={{ color: C.accent }}>{m.durability}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ PROCES ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-14">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: C.accent }} />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: C.accent }}>Procesul complet</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              5 pasi de la <span style={{ color: C.accent }}>scanare la zambet</span>
            </h2>
          </div>
          <div className="grid grid-cols-[280px_1fr] gap-6">
            <div className="space-y-2">
              {PROCESS_STEPS.map((s, i) => (
                <button key={i} onClick={() => setActiveStep(i)}
                  className={cn('w-full text-left p-4 rounded-xl border transition-all cursor-pointer',
                    activeStep === i ? 'bg-white border-blue-200 shadow-lg' : 'bg-transparent border-transparent hover:bg-white/60'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center text-[12px] font-bold',
                      activeStep === i ? 'text-white' : 'bg-blue-50 text-[#2563EB]'
                    )} style={activeStep === i ? { background: C.accent } : undefined}>{s.step}</div>
                    <div>
                      <div className={cn('text-[14px] font-semibold', activeStep === i ? 'text-[#2563EB]' : 'text-[#5a7a6e]')}>{s.title}</div>
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
                        <Badge variant="outline" className="text-[10px] border-blue-200 text-[#2563EB]">{s.duration}</Badge>
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
      <section className="py-20 px-12" style={{ background: '#f8faff' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-14">
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              6 motive sa alegi <span style={{ color: C.accent }}>SDT pentru coroane</span>
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {WHY_SDT.map((w, i) => (
              <Card key={i} className="group border-[--bdr] hover:border-blue-200 transition-all hover:shadow-lg">
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

      {/* ━━━ PRICES ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[1000px]">
          <div className="text-center mb-14">
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Cat costa <span style={{ color: C.accent }}>coroana dentara?</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {PRICES.map((p, i) => (
              <Card key={i} className={cn('border transition-all', p.popular ? 'border-[#2563EB] shadow-lg shadow-blue-500/10' : 'border-[--bdr]')}>
                <CardContent className="p-6">
                  {p.popular && <Badge style={{ background: C.accent }} className="text-white border-0 text-[9px] mb-3">CEL MAI POPULAR</Badge>}
                  <h3 className="font-display text-[17px] font-semibold mb-2" style={{ color: B.nv }}>{p.name}</h3>
                  <div className="font-display text-[32px] font-semibold mb-2" style={{ color: C.accent }}>{p.price}</div>
                  <p className="text-[12px] text-[#5a7a6e] mb-4">{p.includes}</p>
                  <Button className={cn('w-full justify-center text-[13px] font-bold', p.popular ? 'text-white' : 'bg-white text-[#2563EB] border border-[#2563EB]')}
                    style={p.popular ? { background: C.accent } : undefined}
                  >Programeaza consultatie gratuita <ArrowRight className="w-3.5 h-3.5 ml-1" /></Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-6 p-4 rounded-xl" style={{ background: C.accentLight }}>
            <p className="text-sm text-[#5a7a6e]">
              <DollarSign className="w-4 h-4 inline mr-1" style={{ color: C.accent }} />
              <strong style={{ color: C.accent }}>Rate 0% dobanda</strong> disponibile pe 6, 12 sau 24 luni.
            </p>
          </div>
        </div>
      </section>

      {/* ━━━ REVIEWS ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: '#f8faff' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="flex justify-between items-end mb-10">
            <h2 className="font-display text-[28px] font-semibold" style={{ color: B.nv }}>Ce spun pacientii despre <span style={{ color: C.accent }}>coroane</span></h2>
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

      {/* ━━━ INTERCONNECTED: Ambassadors ━━━━━━━ */}
      <section className="py-14 px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" style={{ color: C.accent }} />
              <h2 className="font-display text-[20px] font-semibold" style={{ color: B.nv }}>Ambasadori care au ales coroane dentare</h2>
            </div>
            <a href="/ambasadori" className="text-[13px] font-bold no-underline flex items-center gap-1" style={{ color: C.accent }}>Toti ambasadorii <ArrowRight className="w-3.5 h-3.5" /></a>
          </div>
          <div className="flex gap-5">
            {RELATED_AMBASSADORS.map(amb => (
              <a key={amb.slug} href="/ambasadori" className="no-underline group flex items-center gap-4 bg-white rounded-xl p-4 border border-[--bdr] hover:border-blue-200 transition-all flex-1">
                <img src={amb.photo} alt={amb.name} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <div className="font-display text-[15px] font-semibold transition-colors" style={{ color: B.nv }}>{amb.name}</div>
                  <div className="text-[11px] font-semibold" style={{ color: C.accent }}>{amb.role}</div>
                  <div className="text-[10px] text-[#5a7a6e] mt-1">Serviciu: Coroane Dentare</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ FAQ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: '#f8faff' }}>
        <div className="mx-auto max-w-[800px]">
          <div className="text-center mb-12">
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Totul despre <span style={{ color: C.accent }}>coroane dentare</span>
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
            <h2 className="font-display text-[36px] font-semibold leading-[1.1] mb-4">Restaureaza-ti<br/><span className="text-blue-200">zambetul perfect.</span></h2>
            <p className="text-white/60 mb-6 max-w-[400px]">Consultatia initiala cu Digital Check-Up este GRATUITA. Afla care este materialul optim pentru tine.</p>
            {['Consultatie gratuita cu scanare 3D', 'Vizualizare design digital inainte', 'Preturi transparente, fara surprize', 'Rate 0% pana la 24 luni'].map(item => (
              <div key={item} className="flex items-center gap-2.5 mb-2.5">
                <CheckCircle className="w-4 h-4 text-blue-200 flex-shrink-0" strokeWidth={1.5} />
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
            <select defaultValue="Coroane Dentare" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mb-3">
              <option>Coroane Dentare</option>
              <option>Punte Dentara</option>
              <option>Coroana pe implant</option>
              <option>Inlocuire coroane vechi</option>
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
            <a href="/servicii/coroane-dentare" className="block text-[13px] mb-2.5 text-blue-400 font-semibold no-underline">Coroane Dentare</a>
            {SERVICES.filter(s => !['implantologie','protetica'].includes(s.slug)).map(s => (
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

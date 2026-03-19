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
  Calendar, DollarSign, BookOpen, Gem, Layers,
  Maximize2, Palette, BarChart3, Microscope
} from 'lucide-react'

const C = SVC_COLORS.protetica

/* ─── NAV ─────────────────────────────────── */
const NAV_LINKS: [string, string][] = [
  ['Servicii', '/servicii'], ['Digital Check-Up', '/digital-checkup'],
  ['Consultație Online', '/consultatie-online'], ['Echipa', '/echipa'], ['Recenzii', '/recenzii'],
]
function Nav() {
  return (
    <nav className="sticky top-0 z-[100] bg-white border-b border-[--bdr] px-12 py-3.5 flex justify-between items-center" style={{ borderTop: `3px solid ${C.accent}` }}>
      <a href="/" className="no-underline"><Logo height={36}/></a>
      <div className="flex gap-7 items-center">
        {NAV_LINKS.map(([l, h]) => (
          <a key={l} href={h} className={cn('relative text-sm no-underline pb-1 font-medium', l === 'Servicii' ? 'font-bold text-[#2563EB]' : 'text-[#3a5a50]')}>
            {l}
            {l === 'Servicii' && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-5 rounded-full" style={{ background: C.accent }} />}
          </a>
        ))}
      </div>
      <div className="flex gap-2.5 items-center">
        <a href="/login" className="no-underline"><Button variant="outline" size="sm" className="border-[#2563EB] text-[#2563EB] font-semibold text-[13px]">Cabinetul meu</Button></a>
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
   CONCEPT: "PRECIZIA FACE DIFERENTA"
   Layout tehnic-premium, focus pe materiale si proces
   Audienta: 36-65 ani, pragmatici, vor calitate
   ═══════════════════════════════════════════════ */

const MATERIALS = [
  {
    name: 'Zirconiu monolitic', badge: 'RECOMANDAT', color: '#2563EB',
    specs: { rezistenta: '1200 MPa', translucenta: '★★★☆☆', estetica: '★★★★☆', durabilitate: '20+ ani', biocompat: '100%' },
    ideal: 'Zone posterioare, punti lungi, bruxism',
    desc: 'Cel mai rezistent material protetic. Ideal pentru zone cu forta mare de mestecat. Estetica buna cu optiune de stratificare.',
    photo: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=500&h=350&fit=crop',
  },
  {
    name: 'E-max (ceramica)', badge: 'ESTETICA #1', color: '#e8157a',
    specs: { rezistenta: '500 MPa', translucenta: '★★★★★', estetica: '★★★★★', durabilitate: '15+ ani', biocompat: '100%' },
    ideal: 'Zone anterioare, fatete, cazuri estetice',
    desc: 'Translucenta naturala exceptionala — imposibil de deosebit de un dinte real. Materialul preferat pentru estetica dentara.',
    photo: 'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=500&h=350&fit=crop',
  },
  {
    name: 'Zirconiu stratificat', badge: 'ULTRA PREMIUM', color: '#7c3aed',
    specs: { rezistenta: '900 MPa', translucenta: '★★★★★', estetica: '★★★★★', durabilitate: '25+ ani', biocompat: '100%' },
    ideal: 'Cazuri complexe: rezistenta + estetica maxima',
    desc: 'Baza de zirconiu pentru rezistenta + straturi de ceramica aplicate manual pentru estetica perfecta.',
    photo: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&h=350&fit=crop',
  },
]

const TECH_FLOW = [
  { icon: Scan, name: 'Scanner 3Shape', metric: '6.9μm', desc: 'Amprenta digitala in 120 secunde' },
  { icon: Target, name: 'CAD Design', metric: '10μm', desc: 'Proiectare virtuala forma + culoare' },
  { icon: Gem, name: 'Frezare CAD/CAM', metric: '5-axis', desc: 'Frezare din bloc zirconiu/E-max' },
  { icon: Palette, name: 'AI Shade Match', metric: '99.5%', desc: 'Potrivire culoare cu AI' },
  { icon: Microscope, name: 'Control calitate', metric: '50x', desc: 'Verificare sub microscop' },
]

const CASES = [
  { label: '4 coroane E-max anterioare', before: 'Dinti deteriorati, discromie', after: 'Zambet natural, uniform', photoBefore: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=280&fit=crop', photoAfter: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=280&fit=crop' },
  { label: 'Punte 3 dinti zirconiu', before: 'Dinte lipsa + vecini deteriorati', after: 'Arcada completa restaurata', photoBefore: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=280&fit=crop', photoAfter: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=280&fit=crop' },
  { label: 'Inlocuire 6 coroane metal vechi', before: 'Coroane metal-ceramice invechite', after: 'Zirconiu modern, 10 ani mai tanar', photoBefore: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=280&fit=crop', photoAfter: 'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=400&h=280&fit=crop' },
]

const GUARANTEE = [
  { year: 'An 1-5', coverage: '100%', desc: 'Inlocuire gratuita' },
  { year: 'An 5-10', coverage: '80%', desc: 'Acoperire 80%' },
  { year: 'An 10-20', coverage: '50%', desc: 'Acoperire 50%' },
  { year: '20+ ani', coverage: 'Pe viata', desc: 'Garantie structura' },
]

const FAQ = [
  { q: 'Ce material sa aleg — zirconiu sau E-max?', a: 'E-max pentru zone anterioare (estetica maxima), Zirconiu pentru zone posterioare (rezistenta maxima). Zirconiu stratificat pentru combinatia ideala. Medicul recomanda optiunea optima dupa evaluarea 3D.' },
  { q: 'Se vede ca este coroana?', a: 'Nu. Coroanele E-max si zirconiu stratificat sunt imposibil de deosebit de dintii naturali. AI Shade Matching asigura potrivirea exacta a culorii.' },
  { q: 'Cat dureaza o coroana din zirconiu?', a: 'Zirconiu: 20+ ani. E-max: 15+ ani. Zirconiu stratificat: 25+ ani. Garantie pe viata pe structura.' },
  { q: 'Cat costa o coroana dentara?', a: 'Zirconiu: de la 200€. E-max: de la 250€. Zirconiu stratificat: de la 350€. Rate 0% pe 24 luni. Consultatie GRATUITA.' },
  { q: 'Cat dureaza — de la scanare la coroana gata?', a: 'Standard: 3-5 zile. Express: 24-48 ore. Coroana temporara estetica in aceeasi sedinta.' },
  { q: 'Pot inlocui coroanele metal vechi?', a: 'Da! Procedura frecventa. Coroanele vechi se inlocuiesc cu zirconiu modern — aspect imbunatatit dramatic, fara linia metalica.' },
]

const REVIEWS = [
  { name: 'Ion V.', age: '48 ani', text: 'Am comparat cu clinici din Germania. Calitatea identica, pretul de 3x mai mic. Zirconiul Ivoclar e acelasi.', procedure: '4 coroane zirconiu', photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face' },
  { name: 'Ana M.', age: '35 ani', text: 'E-max-ul de la SDT este o arta. Dentistul meu din Franta a ramas impresionat. Nimeni nu crede ca sunt coroane.', procedure: 'E-max anterior', photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face' },
  { name: 'Valentina P.', age: '52 ani', text: 'Am inlocuit 8 coroane metal-ceramice cu zirconiu. Zambetul meu arata cu 15 ani mai tanar. 4 zile procesul complet.', procedure: '8 coroane zirconiu', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face' },
]

const RELATED_AMBASSADORS = AMBASSADORS.filter(a => ['marian', 'adam', 'cosovan'].includes(a.slug))

/* ─── Page Component ─────────────────────── */
export function CoraneDentarePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeMat, setActiveMat] = useState(0)
  const [activeCase, setActiveCase] = useState(0)

  return (
    <>
      <Nav />
      <style dangerouslySetInnerHTML={{ __html: ANIM }} />

      <div className="bg-[#fafcfb] border-b border-[--bdr] px-12 py-3">
        <div className="mx-auto max-w-[1200px] flex items-center gap-2 text-[12px] text-[#5a7a6e]">
          <a href="/" className="no-underline text-[#5a7a6e] hover:text-[#2563EB]">Acasa</a><span>/</span>
          <a href="/servicii" className="no-underline text-[#5a7a6e] hover:text-[#2563EB]">Servicii</a><span>/</span>
          <span className="text-[#2563EB] font-semibold">Coroane Dentare</span>
        </div>
      </div>

      {/* ━━━ HERO — Technical precision ━━━━━━━━ */}
      <section className="relative overflow-hidden" style={{ background: C.gradient }}>
        <div className="mx-auto max-w-[1200px] px-12 pb-20 pt-12">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <Badge style={{ background: C.accent }} className="text-white border-0 text-[10px] font-bold">SERVICIU #2</Badge>
                <Badge className="bg-white/10 text-white/70 border-white/20 text-[10px]">CAD/CAM DIGITAL</Badge>
              </div>
              <h1 className="font-display mb-5 text-[46px] font-semibold leading-[1.05] tracking-tight text-white">
                Precizie de <span className="text-blue-400">10 microni.</span><br/>Estetica perfecta.
              </h1>
              <p className="mb-6 max-w-[460px] text-[15px] leading-relaxed text-white/[.55]">
                Coroane proiectate digital, fabricate din zirconiu si E-max premium. Scanare 3Shape — fara amprenta clasica. De la design la zambet in 3-5 zile.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[{ val: '10μm', label: 'precizie CAD/CAM' }, { val: '99.5%', label: 'potrivire AI' }, { val: '3-5', label: 'zile — gata' }].map(m => (
                  <div key={m.label} className="bg-white/[.06] border border-white/[.12] rounded-xl p-3 text-center">
                    <div className="font-display text-[22px] font-semibold text-blue-400">{m.val}</div>
                    <div className="text-[10px] text-white/40 mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>
              <Button className="gap-2 px-8 py-4 text-[15px] font-bold text-white" style={{ background: C.accent }}>
                Programeaza scanare 3D gratuita <ArrowRight className="h-4 w-4" />
              </Button>
              <div className="mt-8 inline-flex items-center gap-3 bg-white/[.06] border border-white/[.12] rounded-xl px-5 py-3">
                <div className="font-display text-[32px] font-semibold text-blue-400">200€</div>
                <div className="text-xs text-white/50 leading-tight">pret de la<br/><span className="text-white/70 font-semibold">coroana zirconiu</span></div>
              </div>
            </div>
            {/* Right — Tech flow visualization */}
            <div className="relative bg-white/[.03] border border-white/[.08] rounded-2xl p-6">
              <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-4">Flux digital complet</div>
              <div className="space-y-3">
                {TECH_FLOW.map((t, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/[.04] border border-white/[.06]" style={{ animation: `float ${3 + i * 0.3}s ${i * 0.5}s ease-in-out infinite` }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${C.accent}25` }}>
                      <t.icon className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] font-semibold text-white">{t.name}</span>
                        <span className="text-[10px] font-bold text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">{t.metric}</span>
                      </div>
                      <div className="text-[10px] text-white/40 mt-0.5">{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ MATERIAL COMPARISON ━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-12">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <Gem className="w-4 h-4" style={{ color: C.accent }} />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: C.accent }}>Alege materialul potrivit</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              3 materiale. <span style={{ color: C.accent }}>Specificatii reale.</span>
            </h2>
          </div>
          <div className="flex justify-center gap-3 mb-8">
            {MATERIALS.map((m, i) => (
              <button key={i} onClick={() => setActiveMat(i)}
                className={cn('px-5 py-3 rounded-xl text-[13px] font-semibold cursor-pointer border transition-all',
                  activeMat === i ? 'text-white shadow-lg border-transparent' : 'bg-white text-[#5a7a6e] border-[--bdr] hover:border-blue-200'
                )}
                style={activeMat === i ? { background: m.color } : undefined}
              >{m.badge} — {m.name}</button>
            ))}
          </div>
          <div className="grid grid-cols-[1fr_380px] gap-8 animate-fadeUp" key={activeMat} style={{ animationDuration: '0.3s' }}>
            <div className="bg-white rounded-2xl border border-[--bdr] p-8">
              <div className="flex items-center gap-3 mb-5">
                <h3 className="font-display text-[24px] font-semibold" style={{ color: B.nv }}>{MATERIALS[activeMat].name}</h3>
                <Badge className="text-white border-0 text-[10px]" style={{ background: MATERIALS[activeMat].color }}>{MATERIALS[activeMat].badge}</Badge>
              </div>
              <p className="text-[15px] leading-[1.8] text-[#5a7a6e] mb-6">{MATERIALS[activeMat].desc}</p>
              <div className="text-[11px] font-bold uppercase tracking-[.1em] text-[#5a7a6e] mb-2">Ideal pentru:</div>
              <p className="text-sm text-sdt-600 font-semibold mb-6">{MATERIALS[activeMat].ideal}</p>
              <div className="grid grid-cols-5 gap-3">
                {Object.entries(MATERIALS[activeMat].specs).map(([key, val]) => (
                  <div key={key} className="text-center p-3 rounded-lg bg-[#f8faff] border border-blue-100">
                    <div className="text-[13px] font-semibold" style={{ color: MATERIALS[activeMat].color }}>{val}</div>
                    <div className="text-[9px] text-[#5a7a6e] uppercase tracking-wider mt-0.5">{key}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden h-full min-h-[350px]">
              <img src={MATERIALS[activeMat].photo} alt={MATERIALS[activeMat].name} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ BEFORE / AFTER ━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: B.nv }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="text-center mb-12">
            <h2 className="font-display text-[32px] font-semibold text-white">Rezultate <span className="text-blue-400">verificabile.</span></h2>
          </div>
          <div className="flex justify-center gap-3 mb-8">
            {CASES.map((c, i) => (
              <button key={i} onClick={() => setActiveCase(i)}
                className={cn('px-4 py-2.5 rounded-full text-[12px] font-semibold cursor-pointer border transition-all',
                  activeCase === i ? 'bg-blue-500 text-white border-blue-500' : 'bg-transparent text-white/60 border-white/20'
                )}>{c.label}</button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 animate-fadeUp" key={activeCase} style={{ animationDuration: '0.3s' }}>
            <div className="relative rounded-xl overflow-hidden h-[300px]">
              <img src={CASES[activeCase].photoBefore} alt="Inainte" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 px-3 py-1 bg-red-500/80 rounded text-white text-[11px] font-bold">INAINTE</div>
              <div className="absolute bottom-3 left-3 text-sm font-semibold text-white">{CASES[activeCase].before}</div>
            </div>
            <div className="relative rounded-xl overflow-hidden h-[300px]">
              <img src={CASES[activeCase].photoAfter} alt="Dupa" className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 px-3 py-1 bg-blue-500/80 rounded text-white text-[11px] font-bold">DUPA</div>
              <div className="absolute bottom-3 left-3 text-sm font-semibold text-white">{CASES[activeCase].after}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ GUARANTEE TIMELINE ━━━━━━━━━━━━━━━ */}
      <section className="py-16 px-12">
        <div className="mx-auto max-w-[900px]">
          <div className="text-center mb-10">
            <h2 className="font-display text-[28px] font-semibold" style={{ color: B.nv }}>Garantie <span style={{ color: C.accent }}>pe viata</span> — nu doar vorbe</h2>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {GUARANTEE.map((g, i) => (
              <div key={i} className={cn('text-center p-5 rounded-xl border', i === 3 ? 'border-blue-500 bg-blue-50' : 'border-[--bdr]')}>
                <div className="font-display text-[22px] font-semibold mb-1" style={{ color: i === 3 ? C.accent : B.nv }}>{g.coverage}</div>
                <div className="text-[12px] font-bold text-[#5a7a6e] mb-2">{g.year}</div>
                <div className="text-[11px] text-[#5a7a6e]">{g.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ REVIEWS ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: '#f8faff' }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-10">
            <h2 className="font-display text-[28px] font-semibold" style={{ color: B.nv }}>Pacientii confirma <span style={{ color: C.accent }}>calitatea</span></h2>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <Card key={i} className="border-[--bdr]">
                <CardContent className="p-6">
                  <div className="flex gap-0.5 mb-3">{[1,2,3,4,5].map(j => <Star key={j} className="w-3.5 h-3.5 text-[#fbb040] fill-current" />)}</div>
                  <p className="text-[13px] leading-[1.7] text-[#5a7a6e] italic mb-4">&ldquo;{r.text}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-3 border-t border-[--bdr]">
                    <img src={r.photo} alt={r.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="text-[13px] font-semibold" style={{ color: B.nv }}>{r.name}</div>
                      <div className="text-[10px] text-[#5a7a6e]">{r.age} · {r.procedure}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Ambassadors ━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-14 px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-display text-[20px] font-semibold" style={{ color: B.nv }}>Ambasadori care au ales coroane SDT</h2>
            <a href="/ambasadori" className="text-[13px] font-bold no-underline flex items-center gap-1" style={{ color: C.accent }}>Toti <ArrowRight className="w-3.5 h-3.5" /></a>
          </div>
          <div className="flex gap-5">
            {RELATED_AMBASSADORS.map(amb => (
              <a key={amb.slug} href="/ambasadori" className="no-underline group flex items-center gap-4 bg-white rounded-xl p-4 border border-[--bdr] hover:border-blue-200 transition-all flex-1">
                <img src={amb.photo} alt={amb.name} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <div className="font-display text-[15px] font-semibold" style={{ color: B.nv }}>{amb.name}</div>
                  <div className="text-[11px] font-semibold" style={{ color: C.accent }}>{amb.role}</div>
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
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>Intrebari despre <span style={{ color: C.accent }}>coroane</span></h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="border border-[--bdr] rounded-xl overflow-hidden transition-all" style={{ background: openFaq === i ? `${C.accent}08` : 'white' }}>
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

      {/* ━━━ CTA + FORM ━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: C.accent }}>
        <div className="mx-auto max-w-[1200px] flex gap-16 items-center">
          <div className="flex-1 text-white">
            <h2 className="font-display text-[36px] font-semibold leading-[1.1] mb-4">Zambetul perfect<br/>incepe cu o <span className="text-blue-200">scanare.</span></h2>
            <p className="text-white/60 mb-6 max-w-[400px]">Scanare 3D gratuita + recomandare material + pret transparent. In 30 de minute stii totul.</p>
            {['Scanare 3Shape gratuita', 'Recomandare material personalizata', 'Pret fix, fara surprize', 'Rate 0% pe 24 luni'].map(item => (
              <div key={item} className="flex items-center gap-2.5 mb-2.5">
                <CheckCircle className="w-4 h-4 text-blue-200 flex-shrink-0" strokeWidth={1.5} />
                <span className="text-[14px] text-white/80">{item}</span>
              </div>
            ))}
          </div>
          <div className="w-[400px] shrink-0 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-display text-[20px] font-semibold mb-1" style={{ color: B.nv }}>Programeaza scanare</h3>
            <p className="text-sm text-[#5a7a6e] mb-5">Raspundem in maxim 24h.</p>
            <div className="grid grid-cols-2 gap-3 mb-3"><Input placeholder="Prenume" /><Input placeholder="Nume" /></div>
            <Input placeholder="Telefon *" className="mb-3" />
            <select defaultValue="Coroane Dentare" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mb-3">
              <option>Coroane Dentare</option><option>Punte Dentara</option><option>Inlocuire coroane vechi</option><option>Coroana pe implant</option>
            </select>
            <Button className="w-full justify-center py-3 text-[14px] font-bold text-white" style={{ background: C.accent }}>
              Programeaza gratuit <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="section-line" />
      <footer className="pt-16 pb-8 px-[52px]" style={{ background: B.nv }}>
        <div className="grid gap-12 mb-12" style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr' }}>
          <div>
            <div className="mb-5"><Logo height={34} light/></div>
            <p className="text-sm leading-[1.75] text-white/60 max-w-[260px]">Clinica stomatologica digitala. {STATS.years} ani, {STATS.team} specialisti.</p>
          </div>
          <div>
            <div className="text-[11px] font-bold text-white tracking-[.15em] uppercase mb-5">Servicii</div>
            <a href="/servicii/implant-dentar" className="block text-[13px] mb-2.5 text-white/[.58] no-underline hover:text-white">Implant Dentar</a>
            <a href="/servicii/coroane-dentare" className="block text-[13px] mb-2.5 text-blue-400 font-semibold no-underline">Coroane Dentare</a>
            {SERVICES.filter(s => !['implantologie','protetica'].includes(s.slug)).map(s => (
              <div key={s.slug} className="text-[13px] mb-2.5 text-white/[.58] cursor-pointer hover:text-white transition-colors">{s.name}</div>
            ))}
          </div>
          <div>
            <div className="text-[11px] font-bold text-white tracking-[.15em] uppercase mb-5">Clinica</div>
            {[['Despre noi','/despre-noi'],['Echipa','/echipa'],['Ambasadori','/ambasadori'],['Tehnologii','/tehnologii'],['Blog','/blog'],['Cariere','/cariere'],['Contacte','/contacte']].map(([s,h]) => (
              <a key={s} href={h} className="block text-[13px] mb-2.5 text-white/[.58] no-underline hover:text-white">{s}</a>
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
          </div>
        </div>
        <div className="border-t border-white/[.07] pt-6 flex justify-between items-center">
          <div className="flex items-center gap-4"><Logo height={26} light/><span className="text-xs text-white/[.28]">&copy; {CAMPAIGN_2026.year} Smile Dent Team.</span></div>
          <div className="flex gap-1.5">{['RO','RU','EN'].map(l => <span key={l} className="bg-white/[.08] text-white/50 px-2.5 py-1 rounded-full text-[11px] font-bold cursor-pointer hover:bg-white/15 hover:text-white transition-all">{l}</span>)}</div>
        </div>
      </footer>
    </>
  )
}

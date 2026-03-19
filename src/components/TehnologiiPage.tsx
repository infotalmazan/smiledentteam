'use client'

import { useState } from 'react'
import { Logo } from './Logo'
import { BRAND as B, STATS, SERVICES, LOCATIONS, CAMPAIGN_2026 } from '@/lib/brand'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  ArrowRight, MapPin, Phone, CheckCircle, Play, Star,
  Scan, Cpu, Printer, Layers, Activity, Monitor,
  Zap, Shield, Eye, Timer, Sparkles, TrendingUp,
  ChevronDown, ChevronUp, Award, Heart, FileCheck,
  BarChart3, Microscope, Wifi, Box, CircleDot
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
    <nav
      className="sticky top-0 z-[100] bg-white border-b border-[--bdr] px-12 py-3.5 flex justify-between items-center"
      style={{ borderTop: `3px solid ${B.a}` }}
    >
      <a href="/" className="no-underline"><Logo height={36}/></a>
      <div className="flex gap-7 items-center">
        {NAV_LINKS.map(([l, h]) => (
          <a key={l} href={h} className="relative text-sm no-underline pb-1 font-medium text-[#3a5a50]">
            {l}
          </a>
        ))}
      </div>
      <div className="flex gap-2.5 items-center">
        <a href="/login" className="no-underline">
          <Button variant="outline" size="sm" className="border-sdt-600 text-sdt-600 font-semibold text-[13px]">
            Cabinetul meu
          </Button>
        </a>
        <Button variant="accent" size="sm" className="text-[13px]">
          Programeaza-te
        </Button>
      </div>
    </nav>
  )
}

/* ─── Animations ──────────────────────────── */
const ANIM_TECH = `
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
  @keyframes pulse-ring { 0% { transform: scale(1); opacity: .5; } 100% { transform: scale(1.8); opacity: 0; } }
  @keyframes scan-line { 0% { top: 10%; } 100% { top: 85%; } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes rotate-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes data-flow { 0% { opacity: 0; transform: translateY(8px); } 50% { opacity: 1; } 100% { opacity: 0; transform: translateY(-8px); } }
`

/* ─── Core Technologies (expanded from Homepage) ── */
const TECHNOLOGIES = [
  {
    id: 'scanner-3d',
    icon: Scan,
    tag: 'Estetica & Diagnostica',
    name: '3Shape Trios 5',
    subtitle: 'Scanner intraoral de ultima generatie',
    desc: 'Cel mai avansat scanner intraoral din lume. Captureaza 6.000 de imagini pe secunda cu o precizie de 6.9 microni. Confort maxim pentru pacient — fara amprenta clasica cu pasta.',
    specs: [
      'Precizie: 6.9 microni',
      'Viteza: 6.000 imagini/sec',
      'AI-powered shade matching',
      'Real-time HD color',
    ],
    benefits: ['Fara disconfort', 'Rezultat in 2 minute', 'Vizualizare instant 3D'],
    photo: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop',
    services: ['Digital Check-Up', 'Coroane Dentare', 'Fatete Dentare', 'Ortodontie Digitala'],
  },
  {
    id: 'dsd',
    icon: Monitor,
    tag: 'Estetica',
    name: 'Digital Smile Design',
    subtitle: 'Simulare 3D a zambetului',
    desc: 'Software avansat care permite vizualizarea rezultatului final inainte de orice interventie. Proiectam zambetul ideal bazat pe proportiile faciale, simetrie si preferintele pacientului.',
    specs: [
      'Simulare fotorealista 3D',
      'Analiza proportii faciale',
      'Mock-up digital + fizic',
      'Aprobare pacient pre-tratament',
    ],
    benefits: ['Vezi rezultatul inainte', 'Design personalizat', 'Zero surprize'],
    photo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
    services: ['Fatete Dentare', 'Coroane Dentare', 'Ortodontie Digitala'],
  },
  {
    id: 'cbct',
    icon: Activity,
    tag: 'Diagnostica',
    name: 'Tomografie 3D CBCT',
    subtitle: 'Radiologie digitala completa',
    desc: 'Cone Beam Computed Tomography — investigatie radiologica tridimensionala care ofera o imagine completa a structurilor orale. Esentiala pentru planificarea implanturilor si a interventiilor chirurgicale complexe.',
    specs: [
      'Rezolutie: 75 microni',
      'Camp vizual: 16x13 cm',
      'Doza radiatie minima',
      'Reconstructie 3D instantanee',
    ],
    benefits: ['Diagnostic precis', 'Planificare exacta', 'Radiatie minima'],
    photo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
    services: ['Implant Dentar', 'Chirurgie Orala', 'Digital Check-Up'],
  },
  {
    id: 'cad-cam',
    icon: Cpu,
    tag: 'Protetica',
    name: 'CAD/CAM & Zirconiu',
    subtitle: 'Proiectare si fabricare digitala',
    desc: 'Sistem complet de proiectare asistata de calculator si fabricare in clinica. Coroane, fatete si proteze realizate din zirconiu monolitic cu precizie de laborator, in timp record.',
    specs: [
      'Zirconiu translucent premium',
      'Precizie: 10 microni',
      'Fabricare same-day posibila',
      'Garantie pe viata',
    ],
    benefits: ['Material premium', 'Rezistenta maxima', 'Estetica naturala'],
    photo: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop',
    services: ['Coroane Dentare', 'Fatete Dentare', 'Dinti Ficsi / All-On'],
  },
  {
    id: 'ghid-3d',
    icon: Printer,
    tag: 'Chirurgie',
    name: 'Ghid Chirurgical 3D',
    subtitle: 'Implantologie ghidata digital',
    desc: 'Ghiduri chirurgicale tiparite 3D din planificarea digitala a tomografiei. Pozitionarea implanturilor cu precizie submilimetrica, reducand timpul interventiei si accelerand vindecarea.',
    specs: [
      'Precizie: 0.2mm',
      'Tiparire 3D in clinica',
      'Planificare pre-operatorie',
      'Rata succes: 99.2%',
    ],
    benefits: ['Minim invaziv', 'Recuperare rapida', 'Predictibilitate maxima'],
    photo: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&h=400&fit=crop',
    services: ['Implant Dentar', 'Chirurgie Orala', 'Dinti Ficsi / All-On'],
  },
  {
    id: 'flux-digital',
    icon: Layers,
    tag: 'Ecosistem',
    name: 'Flux Digital Complet',
    subtitle: 'De la diagnostic la finalizare — 100% digital',
    desc: 'Intregul parcurs al pacientului este digitalizat: de la prima scanare 3D, prin planificarea tratamentului, pana la monitorizarea post-interventie. Fiecare pas este documentat, masurabil si transparent.',
    specs: [
      'Dosarul pacientului digital',
      'Comunicare clinica-laborator',
      'Monitorizare post-tratament',
      'Acces pacient la dosar online',
    ],
    benefits: ['Transparenta totala', 'Zero erori', 'Acces online'],
    photo: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
    services: ['Digital Check-Up', 'Consultatie Online'],
  },
  {
    id: 'piezo',
    icon: Zap,
    tag: 'Chirurgie',
    name: 'Piezosurgery',
    subtitle: 'Chirurgie cu ultrasunete',
    desc: 'Instrument chirurgical cu ultrasunete care taie doar tesutul osos, protejand nervii si tesuturile moi. Ideal pentru extractii complexe, augmentari osoase si sinus lifting.',
    specs: [
      'Frecventa: 25-30 kHz',
      'Selectivitate tisulara',
      'Hemoragie redusa',
      'Vindecare accelerata 40%',
    ],
    benefits: ['Fara durere', 'Protejare nervi', 'Vindecare rapida'],
    photo: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&h=400&fit=crop',
    services: ['Chirurgie Orala', 'Implant Dentar'],
  },
  {
    id: 'laser',
    icon: CircleDot,
    tag: 'Terapie',
    name: 'Laser Dentar Dioda',
    subtitle: 'Tratamente minim invazive',
    desc: 'Laser cu dioda pentru tratamente gingivale, dezinfectie canalara si proceduri estetice. Precizie maxima, sangerare minima si vindecare accelerata comparativ cu metodele clasice.',
    specs: [
      'Lungime unda: 810-980nm',
      'Putere: 0.5-10W',
      'Bactericid instantaneu',
      'Fara sutura necesara',
    ],
    benefits: ['Minim invaziv', 'Fara sangerare', 'Dezinfectie totala'],
    photo: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop',
    services: ['Terapie & Profilaxie', 'Chirurgie Orala'],
  },
]

/* ─── Digital Workflow Steps ──────────────── */
const WORKFLOW_STEPS = [
  { icon: Scan, step: '01', name: 'Scanare 3D', desc: 'Scanner intraoral 3Shape — amprenta digitala in 2 minute, fara disconfort.' },
  { icon: Activity, step: '02', name: 'Tomografie CBCT', desc: 'Imagine tridimensionala completa a structurilor orale si osoase.' },
  { icon: Monitor, step: '03', name: 'Planificare digitala', desc: 'Design 3D al tratamentului cu simulare foto-realista a rezultatului.' },
  { icon: Printer, step: '04', name: 'Fabricare CAD/CAM', desc: 'Proiectare si fabricare digitala cu precizie de laborator.' },
  { icon: Cpu, step: '05', name: 'Ghid 3D', desc: 'Ghid chirurgical tiparit 3D pentru interventii cu precizie submilimetrica.' },
  { icon: Shield, step: '06', name: 'Monitorizare', desc: 'Urmarire digitala post-tratament cu acces la dosarul pacientului online.' },
]

/* ─── Comparative Advantages ──────────────── */
const COMPARISONS = [
  { feature: 'Amprenta dentara', traditional: 'Pasta siliconata, 5-8 min, disconfort', digital: 'Scanner 3D, 2 min, confort total' },
  { feature: 'Planificare implant', traditional: 'Radiografie 2D, estimare manuala', digital: 'CBCT 3D + ghid chirurgical tiparit' },
  { feature: 'Coroane dentare', traditional: 'Amprentare + laborator extern, 7-14 zile', digital: 'CAD/CAM, fabricare in 24h-3 zile' },
  { feature: 'Vizualizare rezultat', traditional: 'Descriere verbala, fara preview', digital: 'Simulare 3D fotorealista inainte' },
  { feature: 'Dosarul pacientului', traditional: 'Fisa pe hartie, radiografii fizice', digital: 'Dosar digital complet, acces online' },
  { feature: 'Precizie interventie', traditional: 'Mana libera, variabilitate', digital: 'Ghid 3D, precizie 0.2mm' },
]

/* ─── Partners / Brands ──────────────────── */
const PARTNERS = [
  { name: '3Shape', country: 'Danemarca', type: 'Scanner intraoral' },
  { name: 'Straumann', country: 'Elvetia', type: 'Implanturi premium' },
  { name: 'Nobel Biocare', country: 'Suedia', type: 'Implanturi & protetica' },
  { name: 'Ivoclar Vivadent', country: 'Liechtenstein', type: 'Materiale ceramice' },
  { name: 'Planmeca', country: 'Finlanda', type: 'Echipamente radiologice' },
  { name: 'Dentsply Sirona', country: 'Germania', type: 'Solutii CAD/CAM' },
  { name: 'Invisalign', country: 'SUA', type: 'Ortodontie invizibila' },
  { name: 'Mectron', country: 'Italia', type: 'Piezosurgery' },
]

/* ─── FAQ ─────────────────────────────────── */
const FAQ = [
  { q: 'Ce este stomatologia digitala?', a: 'Stomatologia digitala inlocuieste procesele manuale cu tehnologii computerizate: scanere 3D in loc de amprente clasice, planificare 3D in loc de estimari, fabricare CAD/CAM in loc de modelare manuala. Rezultat: mai precis, mai rapid, mai confortabil.' },
  { q: 'Este scanerul 3D sigur?', a: 'Da, scanerul intraoral 3Shape Trios foloseste lumina structurata (nu radiatie). Este complet sigur pentru copii, gravide si orice pacient. Tomografia CBCT are o doza de radiatie de 5-10x mai mica decat un CT medical.' },
  { q: 'Cat costa tehnologiile digitale?', a: 'Investitia in tehnologie se reflecta in calitatea tratamentului, nu in pret. Scanarea 3D este inclusa in Digital Check-Up (de la 25€). Planificarea digitala este inclusa in pretul tratamentului.' },
  { q: 'Pot vedea zambetul meu viitor inainte de tratament?', a: 'Da! Cu Digital Smile Design, simulam 3D rezultatul final bazat pe proportiile tale faciale. Aprobi designul inainte de orice interventie. Zero surprize.' },
  { q: 'Cum functioneaza ghidul chirurgical 3D?', a: 'Din tomografia ta CBCT, planificam digital pozitia exacta a fiecarui implant. Un ghid din material biocompatibil este tiparit 3D si folosit in interventie pentru pozitionare cu precizie de 0.2mm.' },
  { q: 'Ce furnizori de echipamente folositi?', a: 'Lucram exclusiv cu lideri mondiali: 3Shape (Danemarca), Straumann (Elvetia), Nobel Biocare (Suedia), Planmeca (Finlanda), Dentsply Sirona (Germania). Toate materialele sunt certificate international.' },
]

/* ─── Page Component ─────────────────────── */
export function TehnologiiPage() {
  const [activeTech, setActiveTech] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const selectedTech = TECHNOLOGIES.find(t => t.id === activeTech)

  return (
    <>
      <Nav />
      <style dangerouslySetInnerHTML={{ __html: ANIM_TECH }} />

      {/* ━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${B.nv} 0%, #0f2e24 50%, ${B.pd} 100%)` }}>
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 items-center gap-10 px-12 pb-20 pt-[72px]">
          <div>
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[.12] px-3.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
              <span className="text-[11px] font-bold uppercase tracking-[.12em] text-white">Tehnologii 2026</span>
            </div>
            <h1 className="font-display mb-[18px] text-[44px] font-semibold leading-[1.08] tracking-tight text-white">
              Stomatologie <span className="text-pink-500">100% digitala.</span>
            </h1>
            <p className="mb-7 max-w-[440px] text-base leading-relaxed text-white/[.65]">
              Investim constant in cele mai avansate tehnologii din industria dentara mondiala. De la scanere 3D la inteligenta artificiala — fiecare echipament este ales pentru a oferi rezultate perfecte si o experienta fara disconfort.
            </p>
            <div className="flex gap-3.5">
              <Button variant="accent" className="gap-2 px-8 py-3.5 text-[15px] font-bold">
                Programeaza Digital Check-Up <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-11 flex gap-8">
              {[['8', 'tehnologii core'], ['€2M+', 'investitie echipamente'], ['99.2%', 'rata de succes'], ['0', 'amprente clasice']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-[28px] font-semibold text-pink-500">{n}</div>
                  <div className="mt-0.5 text-xs text-white/[.45]">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Animated scanning visualization */}
          <div className="relative flex h-[400px] items-center justify-center">
            {/* Central "tooth" outline */}
            <div className="relative z-10 w-[120px] h-[140px] rounded-[40%] border-2 border-white/20 bg-white/[.04] backdrop-blur-md flex items-center justify-center">
              <Scan className="w-12 h-12 text-white/60" strokeWidth={1} />
            </div>
            {/* Scanning line */}
            <div className="absolute left-1/2 -translate-x-1/2 w-[160px] h-[2px] z-20"
              style={{ background: `linear-gradient(90deg, transparent, ${B.a}, transparent)`, animation: 'scan-line 2.5s ease-in-out infinite alternate' }}
            />
            {/* Orbiting tech nodes */}
            {[
              { Icon: Scan, label: '3Shape', r: 130, dur: 20, delay: 0 },
              { Icon: Activity, label: 'CBCT', r: 130, dur: 20, delay: -5 },
              { Icon: Monitor, label: 'DSD', r: 130, dur: 20, delay: -10 },
              { Icon: Printer, label: '3D Print', r: 130, dur: 20, delay: -15 },
              { Icon: Cpu, label: 'CAD/CAM', r: 170, dur: 28, delay: 0 },
              { Icon: Zap, label: 'Piezo', r: 170, dur: 28, delay: -7 },
              { Icon: Layers, label: 'Digital', r: 170, dur: 28, delay: -14 },
              { Icon: CircleDot, label: 'Laser', r: 170, dur: 28, delay: -21 },
            ].map((node, i) => (
              <div key={i} className="absolute" style={{
                width: 56, height: 56,
                left: 'calc(50% - 28px)', top: 'calc(50% - 28px)',
                animation: `rotate-slow ${node.dur}s ${node.delay}s linear infinite`,
                transformOrigin: '28px 28px',
              }}>
                <div style={{ '--r': `${node.r}px`, transform: `translateX(var(--r))` } as React.CSSProperties} className="flex flex-col items-center">
                  <div className="flex h-[48px] w-[48px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[.06] backdrop-blur-sm"
                    style={{ animation: `rotate-slow ${node.dur}s ${node.delay}s linear infinite reverse` }}
                  >
                    <node.Icon className="h-4 w-4 text-white/60" strokeWidth={1.5} />
                    <span className="mt-0.5 text-[7px] font-medium text-white/40">{node.label}</span>
                  </div>
                </div>
              </div>
            ))}
            {/* Orbit rings */}
            {[130, 170].map(r => (
              <div key={r} className="absolute rounded-full border border-white/[.06]" style={{ width: r * 2 + 56, height: r * 2 + 56 }} />
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ DIGITAL WORKFLOW ━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: B.ps }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-14">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1" style={{ borderColor: `${B.p}22`, background: `${B.p}08` }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: B.p }} />
              <span className="text-[11px] font-bold uppercase tracking-[.12em]" style={{ color: B.p }}>Flux digital complet</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              6 pasi de la <span className="text-pink-500">diagnostic la zambet</span>
            </h2>
            <p className="mt-3 text-sm text-[#5a7a6e] max-w-[520px] mx-auto">Fiecare etapa a tratamentului este digitalizata, precisa si transparenta.</p>
          </div>
          <div className="grid grid-cols-6 gap-4">
            {WORKFLOW_STEPS.map((s, i) => (
              <div key={i} className="relative text-center group">
                <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 border border-[--bdr] bg-white group-hover:border-sdt-200 group-hover:shadow-lg transition-all"
                  style={{ animation: `float ${3 + i * 0.3}s ${i * 0.2}s ease-in-out infinite` }}
                >
                  <s.icon className="w-7 h-7 text-sdt-600" strokeWidth={1.5} />
                </div>
                <div className="text-[10px] font-bold text-pink-500 mb-1">{s.step}</div>
                <h4 className="font-display text-[14px] font-semibold mb-1.5" style={{ color: B.nv }}>{s.name}</h4>
                <p className="text-[11px] leading-[1.6] text-[#5a7a6e]">{s.desc}</p>
                {/* Connecting arrow */}
                {i < WORKFLOW_STEPS.length - 1 && (
                  <ArrowRight className="absolute top-7 -right-3 w-4 h-4 text-sdt-300" strokeWidth={1.5} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ TECHNOLOGIES GRID ━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-14">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-pink-500" />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: B.p }}>Echipamente si sisteme</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              8 tehnologii <span className="text-pink-500">de top mondial</span>
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
            {TECHNOLOGIES.map((tech, i) => (
              <Card
                key={tech.id}
                className={cn(
                  'group cursor-pointer overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl',
                  activeTech === tech.id ? 'border-sdt-600 shadow-lg shadow-sdt-500/10' : 'border-[--bdr] hover:border-sdt-200'
                )}
                onClick={() => setActiveTech(activeTech === tech.id ? null : tech.id)}
              >
                <div className="h-[140px] overflow-hidden relative">
                  <img src={tech.photo} alt={tech.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e18]/60 to-transparent" />
                  <Badge className="absolute top-3 left-3 bg-white/90 text-sdt-700 border-0 text-[9px] font-bold">{tech.tag}</Badge>
                  <div className="absolute bottom-3 left-3">
                    <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <tech.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-display text-[15px] font-semibold mb-1" style={{ color: B.nv }}>{tech.name}</h3>
                  <p className="text-[11px] text-[#5a7a6e] leading-[1.5]">{tech.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Expanded detail panel */}
          {selectedTech && (
            <div className="animate-fadeUp rounded-2xl border border-sdt-200 bg-white overflow-hidden shadow-lg" style={{ animationDuration: '0.3s' }}>
              <div className="grid grid-cols-2 gap-0">
                <div className="relative h-[380px]">
                  <img src={selectedTech.photo} alt={selectedTech.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${B.p}0D` }}>
                      <selectedTech.icon className="w-6 h-6 text-sdt-600" strokeWidth={1.5} />
                    </div>
                    <div>
                      <Badge variant="outline" className="text-[9px] font-bold border-sdt-200 text-sdt-600 mb-1">{selectedTech.tag}</Badge>
                      <h3 className="font-display text-[22px] font-semibold" style={{ color: B.nv }}>{selectedTech.name}</h3>
                    </div>
                  </div>
                  <p className="text-sm leading-[1.75] text-[#5a7a6e] mb-5">{selectedTech.desc}</p>

                  {/* Specs */}
                  <div className="mb-5">
                    <div className="text-[11px] font-bold uppercase tracking-[.12em] text-sdt-600 mb-2.5">Specificatii tehnice</div>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedTech.specs.map(spec => (
                        <div key={spec} className="flex items-center gap-2 text-xs text-[#5a7a6e]">
                          <CheckCircle className="w-3.5 h-3.5 text-sdt-600 flex-shrink-0" strokeWidth={1.5} />
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="flex gap-2 mb-5">
                    {selectedTech.benefits.map(b => (
                      <Badge key={b} className="bg-sdt-50 text-sdt-700 border-sdt-200 text-[10px]">{b}</Badge>
                    ))}
                  </div>

                  {/* Related services */}
                  <div className="text-[11px] font-bold uppercase tracking-[.12em] text-[#5a7a6e] mb-2">Folosit in serviciile:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTech.services.map(s => (
                      <span key={s} className="text-[11px] text-pink-500 font-semibold">{s}{selectedTech.services.indexOf(s) < selectedTech.services.length - 1 ? ' ·' : ''}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ━━━ COMPARISON TABLE ━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: B.ps }}>
        <div className="mx-auto max-w-[1000px]">
          <div className="text-center mb-14">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-pink-500" />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: B.p }}>De ce digital?</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Traditional vs. <span className="text-pink-500">Digital</span>
            </h2>
          </div>
          <div className="bg-white rounded-2xl border border-[--bdr] overflow-hidden">
            <div className="grid grid-cols-3 bg-[#f8faf9] border-b border-[--bdr] text-[11px] font-bold uppercase tracking-[.1em]">
              <div className="p-4 pl-6" style={{ color: B.nv }}>Procedura</div>
              <div className="p-4 text-[#5a7a6e]">Metoda clasica</div>
              <div className="p-4 text-sdt-600">Metoda digitala SDT</div>
            </div>
            {COMPARISONS.map((c, i) => (
              <div key={i} className={cn('grid grid-cols-3 border-b border-[--bdr] last:border-0', i % 2 === 1 && 'bg-[#fafcfb]')}>
                <div className="p-4 pl-6 text-sm font-semibold" style={{ color: B.nv }}>{c.feature}</div>
                <div className="p-4 text-sm text-[#5a7a6e]">{c.traditional}</div>
                <div className="p-4 text-sm text-sdt-700 font-medium flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-sdt-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  {c.digital}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ PARTNERS ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 px-12" style={{ background: B.nv }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-12">
            <h2 className="font-display text-[32px] font-semibold tracking-tight text-white">
              Parteneri <span className="text-pink-500">de incredere</span>
            </h2>
            <p className="mt-2 text-sm text-white/50">Lucram exclusiv cu lideri mondiali in industria dentara.</p>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {PARTNERS.map((p, i) => (
              <div key={i} className="text-center p-5 rounded-xl border border-white/[.07] bg-white/[.03] hover:bg-white/[.06] transition-colors">
                <div className="font-display text-lg font-semibold text-white mb-1">{p.name}</div>
                <div className="text-[11px] text-pink-400 font-semibold mb-0.5">{p.country}</div>
                <div className="text-[11px] text-white/40">{p.type}</div>
              </div>
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
              Totul despre <span className="text-pink-500">tehnologie</span>
            </h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="border border-[--bdr] rounded-xl overflow-hidden transition-all" style={{ background: openFaq === i ? `${B.p}04` : 'white' }}>
                <button
                  className="w-full flex justify-between items-center p-5 text-left cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-display text-[15px] font-semibold pr-4" style={{ color: B.nv }}>{item.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-5 h-5 flex-shrink-0 text-sdt-600" />
                    : <ChevronDown className="w-5 h-5 flex-shrink-0 text-[#5a7a6e]" />
                  }
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pt-0 text-sm leading-[1.75] text-[#5a7a6e] animate-fadeUp" style={{ animationDuration: '0.2s' }}>{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden py-20 px-12" style={{ background: `linear-gradient(135deg, ${B.p} 0%, ${B.pd} 100%)` }}>
        <div className="mx-auto max-w-[700px] text-center relative z-10">
          <h2 className="font-display text-[36px] font-semibold tracking-tight text-white mb-4">
            Experimenteaza <span className="text-pink-400">viitorul stomatologiei</span>
          </h2>
          <p className="text-white/60 mb-8 max-w-[480px] mx-auto">
            Programeaza un Digital Check-Up si descopera cum tehnologia digitala face diferenta. Consultatia initiala este GRATUITA.
          </p>
          <Button variant="accent" className="gap-2 px-10 py-4 text-[16px] font-bold">
            Programeaza Digital Check-Up <ArrowRight className="h-4 w-4" />
          </Button>
          <div className="mt-6 flex justify-center gap-6 text-sm text-white/50">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-pink-400" /> Scanner 3D inclus</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-pink-400" /> Plan digital gratuit</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-pink-400" /> Fara disconfort</span>
          </div>
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
                <div key={s}
                  className="w-[34px] h-[34px] rounded-lg bg-white/[.07] flex items-center justify-center cursor-pointer text-[11px] font-bold text-white/50 hover:bg-sdt-600/45 transition-colors"
                >{s}</div>
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
            {[['Despre noi','/despre-noi'],['Echipa','/echipa'],['Ambasadori','/ambasadori'],['Tehnologii','/tehnologii'],['Blog','/'],['Cariere','/'],['Contacte','/']].map(([s,h]) => (
              <a key={s} href={h} className={cn(
                'block text-[13px] mb-2.5 no-underline hover:text-white transition-colors',
                s === 'Tehnologii' ? 'text-pink-500 font-semibold' : 'text-white/[.58]'
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

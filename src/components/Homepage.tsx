'use client'

import { useState, useEffect } from 'react'
import { Logo } from './Logo'
import { BRAND as B, STATS, SERVICES, LOCATIONS, CAMPAIGN_2026, AMBASSADORS } from '@/lib/brand'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  Heart, Shield, FileText, Check, Star, Play,
  ChevronLeft, ChevronRight, X, MapPin, Clock,
  Phone, Maximize2, Video, ArrowRight
} from 'lucide-react'

/* ─── helpers ─────────────────────────────── */
const HERO_SLIDES = [
  '/images/team/team-photo.jpg',
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=1000&fit=crop',
]

function HeroSlideshow({ className }: { className?: string }) {
  const [idx, setIdx] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  useEffect(() => {
    if (fullscreen) return
    const timer = setInterval(() => setIdx(p => (p + 1) % HERO_SLIDES.length), 3000)
    return () => clearInterval(timer)
  }, [fullscreen])
  return (
    <>
      <div className={cn('relative w-full h-full overflow-hidden', className)}>
        {HERO_SLIDES.map((src, i) => (
          <img key={src} src={src} alt={`SDT Team ${i+1}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
            style={{ objectPosition: 'center 35%', opacity: i === idx ? 1 : 0 }}
          />
        ))}
        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-[2]">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={cn(
                'h-[7px] rounded-full border-none cursor-pointer transition-all duration-300',
                i === idx ? 'w-5 bg-white' : 'w-[7px] bg-white/40'
              )}
            />
          ))}
        </div>
        {/* Fullscreen button */}
        <button
          onClick={() => setFullscreen(true)}
          className="absolute top-3 right-3 z-[2] w-8 h-8 rounded-full bg-black/30 border-none cursor-pointer flex items-center justify-center hover:bg-black/50 transition-colors"
        >
          <Maximize2 className="w-3.5 h-3.5 text-white" strokeWidth={1.8} />
        </button>
      </div>
      {/* Fullscreen modal */}
      {fullscreen && (
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center" onClick={() => setFullscreen(false)}>
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 border-none cursor-pointer flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" strokeWidth={1.8} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setIdx(p => (p - 1 + HERO_SLIDES.length) % HERO_SLIDES.length) }}
            className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 border-none cursor-pointer flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" strokeWidth={1.8} />
          </button>
          <img src={HERO_SLIDES[idx]} alt={`SDT Team ${idx+1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg"
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); setIdx(p => (p + 1) % HERO_SLIDES.length) }}
            className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 border-none cursor-pointer flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white" strokeWidth={1.8} />
          </button>
          {/* Fullscreen dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setIdx(i) }}
                className={cn(
                  'h-2 rounded-full border-none cursor-pointer transition-all duration-300',
                  i === idx ? 'w-6 bg-white' : 'w-2 bg-white/40'
                )}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function SdtBadge({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={cn(
      'inline-flex items-center gap-2 px-3.5 py-[5px] rounded-full border',
      light
        ? 'bg-white/[.13] border-white/[.22]'
        : 'bg-sdt-100 border-transparent'
    )}>
      <span className="w-[7px] h-[7px] rounded-full bg-pink-500" />
      <span className={cn(
        'text-xs font-bold tracking-[.04em]',
        light ? 'text-white' : 'text-sdt-600'
      )}>{children}</span>
    </div>
  )
}

function SHead({ eyebrow, title, sub, center, light }: {
  eyebrow?: string; title: React.ReactNode; sub?: string; center?: boolean; light?: boolean
}) {
  return (
    <div className={cn('mb-[52px]', center && 'text-center')}>
      {eyebrow && <div className="mb-4"><SdtBadge light={light}>{eyebrow}</SdtBadge></div>}
      <h2 className={cn(
        'font-display text-[40px] font-semibold tracking-[-0.03em] leading-[1.06] mb-3.5',
        light ? 'text-white' : 'text-[#0a1e18]'
      )}>{title}</h2>
      {sub && <p className={cn(
        'text-[17px] leading-[1.75]',
        light ? 'text-white/[.72]' : 'text-[#4a6a58]',
        center ? 'max-w-[540px] mx-auto' : 'max-w-[500px]'
      )}>{sub}</p>}
    </div>
  )
}

/* ─── Navbar ──────────────────────────────── */
function Navbar() {
  const [sc, setSc] = useState(false)
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav className={cn(
      'bg-white flex justify-between items-center px-[52px] h-[70px] border-t-[3px] border-t-pink-500 sticky top-0 z-[200] transition-shadow border-b border-sdt-600/10',
      sc ? 'shadow-sm' : 'shadow-none'
    )}>
      <a href="/" className="no-underline"><Logo height={38}/></a>
      <div className="flex gap-7">
        {[
          ['Servicii','/servicii'],
          ['Digital Check-Up','/digital-checkup'],
          ['Consultatie Online','/consultatie-online'],
          ['Echipa','/echipa'],
          ['Recenzii','/recenzii'],
        ].map(([label, href]) => (
          <a key={label} href={href}
            className="text-sm font-medium text-[#3a5a50] no-underline py-1 border-b-2 border-transparent hover:text-pink-500 hover:border-pink-500 transition-all duration-300"
          >{label}</a>
        ))}
      </div>
      <div className="flex gap-2.5 items-center">
        <a href="/login" className="no-underline">
          <Button variant="outline" size="sm" className="text-sdt-600 border-sdt-600 hover:bg-sdt-50 rounded-full">
            Cabinetul meu
          </Button>
        </a>
        <Button variant="accent" size="sm" className="btn-shine text-[13px] px-[22px] py-[9px] rounded-full">
          Programeaza-te
        </Button>
      </div>
    </nav>
  )
}

/* ─── Hero ────────────────────────────────── */
const SVC_LIST = SERVICES.map(s => s.name)

function Hero() {
  return (
    <section className="relative bg-white h-[calc(100vh-52px)] flex flex-col overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full bg-sdt-500 opacity-[0.04] pointer-events-none" />
      <div className="absolute bottom-40 -right-24 w-[300px] h-[300px] rounded-full bg-pink-500 opacity-[0.05] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[200px] h-[200px] rounded-full bg-sdt-400 opacity-[0.03] pointer-events-none" />

      <div className="grid flex-1 min-h-0 relative z-[1]" style={{ gridTemplateColumns: '1fr 1px 1.35fr 1px 0.85fr' }}>

        {/* COL 1 — Headline */}
        <div className="pt-6 pr-9 pb-0 pl-12 flex flex-col justify-start">
          <h1 className="animate-slide-up font-display text-6xl font-semibold leading-[0.95] tracking-[-0.04em] mb-5 text-pink-500">
            ALEGE-TE<br/>PE TINE.
          </h1>
          <div className="mb-4 h-[3px] w-12 rounded-full bg-pink-500" />
          <h2 className="animate-slide-up stagger-2 font-display text-lg font-medium text-[#0a1e18] tracking-[-0.02em] mb-3.5 leading-[1.2]">
            Incepe cu un Digital Check-Up.
          </h2>
          <p className="animate-slide-up stagger-3 text-[13px] leading-[1.65] text-[#4a6a58] max-w-[320px] mb-7">
            600+ specialisti, tehnologii 3D si 15 ani de experienta — totul pentru un singur lucru: sa stii exact ce ai nevoie, inainte sa decizi orice.
          </p>
          <Button variant="accent" className="btn-shine w-full justify-center text-[13px] py-3 px-6 rounded-full">
            Descopera Digital Check-Up <ArrowRight className="w-4 h-4 ml-1" />
          </Button>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-2 mt-7">
            {[
              [Heart, 'Fara durere'],
              [Shield, 'Garantie'],
              [FileText, 'Plan digital'],
              [Shield, 'Tehnologie 3D'],
            ].map(([Icon, label]) => (
              <div key={label as string} className="flex items-center gap-1.5 py-1.5">
                <Icon className="w-3.5 h-3.5 text-sdt-600" strokeWidth={1.8} />
                <span className="text-[11px] font-semibold text-[#5a7a6e]">{label as string}</span>
              </div>
            ))}
          </div>

          {/* Mini appointment */}
          <div className="mt-8 p-3.5 bg-sdt-50 rounded-xl border border-transparent shadow-sm">
            <div className="text-[11px] font-bold text-sdt-600 mb-2">Programare rapida</div>
            <div className="flex gap-2">
              <select className="w-[90px] rounded-lg border border-transparent bg-white px-2 py-2 text-xs font-medium shadow-sm">
                <option>{'\ud83c\uddf2\ud83c\udde9'} +373</option>
                <option>{'\ud83c\uddf7\ud83c\uddf4'} +40</option>
                <option>{'\ud83c\uddec\ud83c\udde7'} +44</option>
                <option>{'\ud83c\udde9\ud83c\uddea'} +49</option>
                <option>{'\ud83c\uddeb\ud83c\uddf7'} +33</option>
                <option>{'\ud83c\uddfa\ud83c\uddf8'} +1</option>
              </select>
              <Input placeholder="__ ___ ___" type="tel" className="flex-1" />
            </div>
            <Button variant="outline" className="btn-shine w-full mt-2 text-sdt-600 border-sdt-600 text-xs font-bold rounded-full">
              Programeaza-te <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>

        <div className="bg-sdt-600/10" />

        {/* COL 2 — Photo */}
        <div className="relative overflow-hidden">
          <HeroSlideshow />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(10,30,24,.18) 0%, transparent 50%)' }} />
        </div>

        <div className="bg-sdt-600/10" />

        {/* COL 3 — Services list */}
        <div className="pt-6 px-6 pb-0 flex flex-col justify-start">
          <div className="text-[10px] font-bold text-sdt-600 tracking-[.22em] uppercase mb-2.5">Servicii</div>
          {SVC_LIST.map((s, i) => (
            <div key={s}
              className="hover-glow flex items-center justify-between py-2.5 px-2 rounded-xl cursor-pointer text-[#0a1e18] hover:text-sdt-600 hover:bg-sdt-50/60 transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-sdt-600/30 font-bold">{String(i+1).padStart(2,'0')}</span>
                <span className="text-[13px] font-semibold">{s}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#5a7a6e]" />
            </div>
          ))}
          {/* Locatii */}
          <div className="mt-2 pt-2.5 border-t border-sdt-600/10">
            <div className="text-[10px] font-bold text-sdt-600 tracking-[.15em] uppercase mb-1.5">Locatii</div>
            {[['Chisinau, Centru','str. Ismail 88'],['Chisinau, Rascani','Bd. Moscova 17/A'],['Chisinau, Botanica','Bd. Dacia 44']].map(([city,addr]) => (
              <div key={city} className="flex items-start gap-1.5 py-[3px]">
                <MapPin className="w-[11px] h-[11px] text-sdt-600 mt-0.5 shrink-0" strokeWidth={2} />
                <div>
                  <div className="text-[11px] font-semibold text-[#0a1e18] leading-[1.2]">{city}</div>
                  <div className="text-[10px] text-[#5a7a6e] leading-[1.2]">{addr}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Program */}
          <div className="mt-2 flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-sdt-600" strokeWidth={2} />
            <span className="text-[10px] text-[#5a7a6e]">Lun-Vin 09-19:00 . Sam 09-14:00</span>
          </div>

          {/* Google Reviews */}
          <div className="mt-3 bg-sdt-100 p-2.5 pl-3.5 border-l-[3px] border-l-sdt-600 rounded-r-lg">
            <div className="flex items-center gap-2">
              <div className="text-[#fbb040] text-xs flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
              </div>
              <div className="font-display text-lg font-semibold text-sdt-600">4.9</div>
            </div>
            <div className="text-[10px] text-[#5a7a6e] mt-0.5">1 200+ recenzii Google verificate</div>
          </div>
        </div>
      </div>

      {/* Stats strip — full width, pinned to bottom */}
      <div className="flex justify-center gap-11 items-center shrink-0 py-[22px] px-[52px]" style={{ background: `linear-gradient(135deg, ${B.p}, ${B.pm})` }}>
        {[[STATS.years,'ani de excelenta'],[STATS.team,'specialisti'],[STATS.patients,'pacienti tratati'],['3','filiale']].map(([n,l]) => (
          <div key={String(l)} className="flex items-baseline gap-2">
            <div className="font-display text-4xl font-semibold text-white leading-none">{n}</div>
            <div className="text-xs text-white/[.65] font-medium">{l}</div>
          </div>
        ))}
        {/* Rate 0% — pink accent */}
        <div className="flex items-center gap-2 bg-pink-500 py-2 px-5 rounded-full ml-2">
          <div className="font-display text-2xl font-semibold text-white leading-none">0%</div>
          <div className="text-[11px] text-white/[.85] font-semibold leading-[1.2]">dobanda<br/>la rate</div>
        </div>
      </div>
    </section>
  )
}

/* ─── Digital Check-Up strip ──────────────── */
function CheckUpStrip() {
  const steps = [
    { Icon: FileText, label: 'Inregistrare' },
    { Icon: Maximize2, label: 'Scanare 3D' },
    { Icon: Star, label: 'Evaluare' },
    { Icon: Check, label: 'Plan digital' },
  ]
  return (
    <section className="relative overflow-hidden py-11 px-[52px]" style={{ background: `linear-gradient(135deg, ${B.p}, ${B.pm})` }}>
      <div className="absolute -top-[60px] -right-10 w-[200px] h-[200px] rounded-full border border-white/[.06]" />
      <div className="grid items-center gap-8 max-w-[1200px] mx-auto" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
        <div>
          <div className="inline-flex items-center gap-2 bg-white/[.15] border border-white/25 px-3.5 py-1 rounded-full mb-3">
            <span className="text-[9px] font-extrabold text-white tracking-[.2em] uppercase">
              PRODUS FLAGSHIP {CAMPAIGN_2026.year}
            </span>
          </div>
          <h2 className="font-display text-[30px] font-semibold text-white tracking-[-0.03em] leading-[1.1] mb-2">
            Digital Check-Up
          </h2>
          <p className="text-[13px] text-white/[.65] max-w-[340px] leading-[1.6]">
            Primul pas catre un zambet sanatos. Evaluare completa, digitala si fara disconfort.
          </p>
        </div>
        {/* Center — 4 step process with pulse animation */}
        <div className="flex items-center">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center">
              <div className="text-center">
                <div
                  className="w-12 h-12 rounded-full bg-white/10 border-[1.5px] border-white/20 flex items-center justify-center mx-auto mb-[5px]"
                  style={{ animation: `pulse ${2 + i * 0.5}s ease-in-out infinite` }}
                >
                  <s.Icon className="w-[18px] h-[18px] text-white" strokeWidth={1.8} />
                </div>
                <div className="text-[9px] font-semibold text-white/60 whitespace-nowrap">{s.label}</div>
              </div>
              {i < steps.length - 1 && (
                <div className="w-6 h-px bg-white/15 mx-1 mb-4" />
              )}
            </div>
          ))}
        </div>
        {/* Right — CTA */}
        <div className="flex flex-col gap-2 items-end">
          <a href="/digital-checkup" className="no-underline">
            <Button
              variant="outline"
              className="btn-shine bg-white text-sdt-600 border-2 border-pink-500 text-sm font-extrabold whitespace-nowrap hover:bg-pink-500 hover:text-white transition-all hover:-translate-y-0.5 rounded-full"
            >
              Programeaza Digital Check-Up <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </a>
          <span className="text-[10px] text-white/40">Durata ~30 min</span>
        </div>
      </div>
    </section>
  )
}

/* ─── Services ────────────────────────────── */
const SVC_DATA: { photo:string; desc:string }[] = [
  { photo:'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=260&fit=crop', desc:'Dinti noi, ficsi, fara durere. Planificare 3D completa pentru un rezultat predictibil si natural. Implanturi Straumann si Nobel Biocare cu garantie pe viata.' },
  { photo:'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=260&fit=crop', desc:'Zambet restaurat cu coroane premium. Materiale de ultima generatie — zirconiu si E-max, garantie pe viata. Scanare digitala, fara amprenta clasica.' },
  { photo:'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=260&fit=crop', desc:'Arcada completa intr-o zi. Alternativa moderna la proteze — dinti ficsi pe implanturi. Planificare 3D, sedare constienta, Rate 0% disponibile.' },
  { photo:'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=400&h=260&fit=crop', desc:'Zambetul pe care l-ai visat. Fatete ceramice personalizate cu Digital Smile Design. Vizualizezi rezultatul 3D inainte de orice procedura.' },
  { photo:'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=260&fit=crop', desc:'Dinti drepti, discret si rapid. Aliniere invizibila cu Invisalign pentru copii si adulti. Simulare ClinCheck a rezultatului final.' },
  { photo:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=260&fit=crop', desc:'Primul pas catre un zambet sanatos. Evaluare completa cu scanare 3D si tomografie CBCT. Plan transparent cu preturi clare, in 30 minute.' },
  { photo:'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&h=260&fit=crop', desc:'Preventie fara durere. Igienizare profesionala cu ultrasunete si detectie timpurie cu scanner digital. Plan personalizat de preventie.' },
  { photo:'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=260&fit=crop', desc:'Interventii precise cu ghidaj 3D. Extractii complexe, augmentari osoase si sinus lifting. Piezosurgery pentru recuperare rapida.' },
  { photo:'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=260&fit=crop', desc:'Consultatie video de oriunde din lume. Trimite tomografia, discutam la distanta. Plan personalizat complet inainte de a ajunge la clinica.' },
]

function Services() {
  return (
    <section id="servicii" className="py-10 px-[52px]" style={{ background: B.cr }}>
      <div className="flex justify-between items-end mb-4">
        <div className="max-w-[600px]">
          <SdtBadge>Servicii complete</SdtBadge>
          <h2 className="font-display text-[26px] font-semibold text-[#0a1e18] tracking-[-0.03em] leading-[1.1] mb-2 mt-2">
            Tot ce ai nevoie, intr-un singur loc
          </h2>
          <p className="text-[13px] text-[#5a7a6e] leading-[1.5]">
            De la preventie la reabilitare completa — 9 specialitati stomatologice cu tehnologii 3D de ultima generatie.
          </p>
        </div>
        <a href="/servicii" className="text-[13px] font-bold text-sdt-600 no-underline shrink-0">
          Toate serviciile <ArrowRight className="w-3.5 h-3.5 inline" />
        </a>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {SERVICES.map((s, i) => (
          <a key={s.slug} href="/servicii" className="no-underline">
            <Card className={cn(
              'img-zoom hover-glow cursor-pointer overflow-hidden border-transparent rounded-2xl shadow-sm hover:shadow-card-hover hover:border-sdt-600 transition-all',
              'animate-slide-up',
              i < 3 ? `stagger-${i+1}` : i < 6 ? `stagger-${i-2}` : `stagger-${i-5}`
            )}>
              <div className="relative h-[140px] overflow-hidden">
                <img src={SVC_DATA[i]?.photo || SVC_DATA[0].photo} alt={s.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,30,24,.25) 0%, transparent 50%)' }} />
              </div>
              <CardContent className="p-3 pt-3">
                <div className="font-display text-sm font-semibold text-[#0a1e18] leading-[1.2] mb-1">{s.name}</div>
                <div className="text-[11px] text-[#5a7a6e] leading-[1.5]">{SVC_DATA[i]?.desc || ''}</div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </section>
  )
}

/* ─── Technologies ────────────────────────── */
const TECHS = [
  { n:'01', tag:'Estetica',      name:'Scanner 3Shape Trios', desc:'Cel mai performant scanner intraoral. Precizie 20 microni, confort digital — fara amprenta traditionala.' },
  { n:'02', tag:'Estetica',      name:'Digital Smile Design', desc:'Simulare 3D a viitorului tau zambet. Probezi rezultatul inainte sa inceapa orice tratament.' },
  { n:'03', tag:'Chirurgie',     name:'Ghid Chirurgical 3D',  desc:'Planificare digitala completa, ghid tiparit 3D din tomografia ta. Rata de succes aproape 100%.' },
  { n:'04', tag:'Protetica',     name:'CAD/CAM & Zirconiu',   desc:'Coroane si proteze CAD-CAM pe structura de zirconiu. Rezistenta maxima, garantie pe viata.' },
  { n:'05', tag:'Implantologie', name:'Tomografie 3D CBCT',   desc:'Investigatie radiologica completa: densitate osoasa, structuri anatomice, planificare precisa.' },
  { n:'06', tag:'Clinica',       name:'Flux Digital Complet', desc:'De la diagnostic la finalizare — fiecare pas digital, precis si documentat.' },
]

function Technologies() {
  return (
    <section id="tehnologii" className="bg-white py-20 px-[52px]">
      <div className="text-center mb-12">
        <SdtBadge>Tehnologii 2026</SdtBadge>
        <h2 className="font-display text-[28px] font-semibold text-[#0a1e18] tracking-[-0.03em] leading-[1.1] mb-3 mt-2">
          Viitorul e digital
        </h2>
        <p className="text-[14px] text-[#5a7a6e] max-w-[480px] mx-auto leading-[1.6]">
          Investim in tehnologii de ultima generatie pentru rezultate perfecte si o experienta confortabila.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {TECHS.map((t, i) => (
          <Card key={t.n} className="group relative overflow-hidden rounded-2xl border border-transparent p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-sdt-600/20"
            style={{ background: i === 0 ? `linear-gradient(135deg, ${B.p}08, ${B.a}06)` : undefined }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sdt-100 group-hover:bg-sdt-600 transition-colors">
                <span className="font-display text-base font-bold text-sdt-600 group-hover:text-white transition-colors">{t.n}</span>
              </div>
              <Badge variant="accent" className="text-[9px] font-bold px-2.5 py-0.5">{t.tag}</Badge>
            </div>
            <h4 className="font-display text-[15px] font-semibold text-[#0a1e18] mb-2">{t.name}</h4>
            <p className="text-[12px] leading-[1.7] text-[#4a6a58]">{t.desc}</p>
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: `radial-gradient(circle at 50% 0%, ${B.p}08 0%, transparent 70%)` }}
            />
          </Card>
        ))}
      </div>
      <div className="text-center mt-8">
        <a href="/tehnologii" className="no-underline">
          <Button variant="outline" className="btn-shine rounded-full text-sdt-600 border-sdt-600 hover:bg-sdt-600 hover:text-white transition-all text-[13px] font-bold px-7">
            Toate tehnologiile <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </a>
      </div>
    </section>
  )
}

/* ─── Before / After ──────────────────────── */
function BeforeAfter() {
  const cases = [
    { label:'Implanturi + Protetica', before:'Dinti lipsa, carii avansate', after:'Zambet complet restaurat', photoBefore:'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=300&h=200&fit=crop', photoAfter:'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=300&h=200&fit=crop' },
    { label:'Digital Smile Design',   before:'Dinti inegali, decolorati',   after:'Fatete ceramice perfecte', photoBefore:'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=300&h=200&fit=crop', photoAfter:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&h=200&fit=crop' },
    { label:'Ortodontie Digitala',    before:'Malocluzii, spatii',          after:'Aliniere perfecta 3D', photoBefore:'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=300&h=200&fit=crop', photoAfter:'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=300&h=200&fit=crop' },
    { label:'All-on-4 Complet',       before:'Edentatie totala',            after:'Arcada completa 1 zi', photoBefore:'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=300&h=200&fit=crop', photoAfter:'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=300&h=200&fit=crop' },
  ]
  return (
    <section className="py-[72px] px-[52px]" style={{ background: `linear-gradient(160deg, ${B.nv}, #0f2e24)` }}>
      <SHead center light eyebrow="Rezultate reale" title="Transformari care schimba vieti"
        sub="Fiecare caz este unic. Iata cateva dintre transformarile de care se bucura pacientii nostri."
      />
      <div className="flex gap-4 overflow-x-auto pb-2 scroll-premium">
        {cases.map(c => (
          <div key={c.label} className="glass-dark img-zoom rounded-2xl overflow-hidden min-w-[260px] shrink-0 flex-1">
            <div className="grid grid-cols-2 h-40 relative">
              <img src={c.photoBefore} alt="Inainte" className="w-full h-full object-cover grayscale-[30%]" />
              <img src={c.photoAfter} alt="Dupa" className="w-full h-full object-cover" />
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/30" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px] rounded-full bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,.3)]">
                <ChevronLeft className="w-3 h-3 text-sdt-600" /><ChevronRight className="w-3 h-3 text-sdt-600 -ml-1.5" />
              </div>
              <div className="absolute top-2 left-2 text-[9px] font-bold text-white bg-black/40 px-2 py-0.5 rounded">INAINTE</div>
              <div className="absolute top-2 right-2 text-[9px] font-bold text-white bg-black/40 px-2 py-0.5 rounded">DUPA</div>
            </div>
            <div className="p-4 px-[18px]">
              <Badge variant="accent" className="text-[9px] font-bold tracking-[.08em] uppercase mb-2">{c.label}</Badge>
              <div className="text-xs text-white/[.55] mb-[3px]">Inainte: <span className="text-white/80">{c.before}</span></div>
              <div className="text-xs text-white/[.55]">Dupa: <span className="text-white font-bold">{c.after}</span></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Reviews ─────────────────────────────── */
const REVIEWS = [
  { name:'Denis P.',     proc:'Digital Check-Up',  text:'Excellent service, very kind and professional. I want to thank Dr. Roman and Dr. Stefano, exceptional experience!' },
  { name:'Alexandru C.', proc:'Estetica dentara',   text:'Smile Dent Team offers excellent dental services. Victoria Potinga proves to be a dedicated and empathetic professional.' },
  { name:'S. L.',        proc:'Tratament complex',  text:'This place is amazing. They speak English and have an amazing understanding of dental care. Amazing dentists for expats!' },
  { name:'Kathryn J.',   proc:'Protetica digitala', text:'Retainers made and ready within five hours using incredibly modern technology! Would recommend to anyone in the area.' },
  { name:'Aleksandr Z.', proc:'Implantologie',      text:'A dentist who knows their business 101%. Helped me once again with my problematic teeth. I am eternally grateful.' },
  { name:'Ksenia D.',    proc:'Pacient fidel',      text:'Thank you Smile Dent for 3 years with me!' },
]

function Reviews() {
  return (
    <section id="recenzii" className="bg-white py-24 px-[52px]">
      <div className="flex justify-between items-end mb-[52px]">
        <SHead eyebrow="Recenzii pacienti" title={<>Ce spun<br/>pacientii nostri</>} sub="Peste 1 200 de recenzii verificate. Nota medie 4.9/5.0 pe Google." />
        <div className="bg-sdt-100 rounded-2xl p-6 px-8 text-center border border-transparent shadow-sm shrink-0 mb-4">
          <div className="text-[#fbb040] text-xl mb-1 flex gap-0.5 justify-center">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
          </div>
          <div className="font-display text-[40px] font-semibold text-sdt-600 leading-none">4.9</div>
          <div className="text-xs text-[#5a7a6e] mt-1">1 200+ recenzii</div>
          <div className="text-[11px] text-sdt-600 font-semibold mt-1.5">Google Verified</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-[18px]">
        {REVIEWS.map(r => (
          <Card key={r.name} className="hover-glow p-[26px] border-transparent rounded-2xl shadow-sm">
            <div className="flex justify-between items-start mb-3.5">
              <div>
                <div className="font-bold text-sm text-[#0a1e18]">{r.name}</div>
                <div className="text-[11px] text-sdt-600 font-semibold mt-0.5">{r.proc}</div>
              </div>
              <div className="text-[#fbb040] text-[13px] flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
            </div>
            <p className="text-sm leading-[1.72] text-[#4a6a58] italic">{r.text}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}

/* ─── Despre Noi Preview ─────────────────── */
function DespreNoiPreview() {
  return (
    <section className="py-24 px-[52px]">
      <div className="grid grid-cols-2 gap-16 items-center">
        {/* Left — Photo Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl overflow-hidden h-[200px]">
            <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop" alt="Clinica SDT" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="rounded-xl overflow-hidden h-[200px]">
            <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop" alt="Echipa medicala" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="rounded-xl overflow-hidden h-[200px] col-span-2">
            <img src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=250&fit=crop" alt="Consultatie pacient" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
        {/* Right — Text */}
        <div>
          <SHead
            eyebrow="Despre Smile Dent Team"
            title={<>15 ani de excelenta in <span className="text-pink-500">stomatologie digitala</span></>}
            sub="De la o clinica cu 8 specialisti in 2009 la o retea internationala cu 600+ profesionisti in 9 filiale. Povestea noastra e despre curaj, inovatie si mii de zambete transformate."
          />
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              [STATS.years, 'ani de excelenta'],
              [STATS.patients, 'pacienti tratati'],
              [STATS.locations, 'filiale active'],
            ].map(([n, l]) => (
              <div key={l} className="text-center p-3 rounded-lg border" style={{ borderColor: `${B.p}15`, background: `${B.p}06` }}>
                <div className="font-display text-xl font-semibold text-sdt-600">{n}</div>
                <div className="text-[11px] text-[#5a7a6e] mt-0.5">{l}</div>
              </div>
            ))}
          </div>
          <a href="/despre-noi" className="no-underline">
            <Button className="btn-shine font-bold rounded-full">
              Descopera povestea noastra <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── Cariere Preview ────────────────────── */
function CarierePreview() {
  return (
    <section className="relative overflow-hidden py-16 px-[52px]" style={{ background: `linear-gradient(135deg, ${B.p}, ${B.pm})` }}>
      <div className="flex items-center gap-16">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 bg-white/[.15] border border-white/25 px-3.5 py-1 rounded-full mb-4">
            <span className="w-[7px] h-[7px] rounded-full bg-pink-500" />
            <span className="text-[11px] font-bold text-white tracking-[.08em]">CARIERE SDT</span>
          </div>
          <h2 className="font-display text-[32px] font-semibold text-white tracking-[-0.03em] leading-[1.1] mb-3">
            Construieste viitorul <span className="text-pink-300">stomatologiei.</span>
          </h2>
          <p className="text-[14px] text-white/[.65] max-w-[420px] leading-[1.65] mb-6">
            Alatura-te unei echipe de {STATS.team} profesionisti. 6 pozitii deschise in 4 tari — salariu competitiv, tehnologii de top si dezvoltare continua.
          </p>
          <div className="flex gap-3 mb-6">
            {[['6','pozitii deschise'],['4','tari'],['85%','retentie']].map(([n,l]) => (
              <div key={l} className="text-center bg-white/[.08] border border-white/[.12] rounded-xl px-4 py-2.5">
                <div className="font-display text-lg font-semibold text-white">{n}</div>
                <div className="text-[10px] text-white/50">{l}</div>
              </div>
            ))}
          </div>
          <a href="/cariere" className="no-underline">
            <Button variant="outline" className="btn-shine bg-white text-sdt-600 border-2 border-pink-500 text-sm font-extrabold hover:bg-pink-500 hover:text-white transition-all hover:-translate-y-0.5 rounded-full">
              Vezi pozitiile deschise <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </a>
        </div>
        <div className="w-[360px] shrink-0 space-y-2.5">
          {[
            { title: 'Medic Stomatolog — Protetica', loc: 'Chisinau', urgent: true },
            { title: 'Medic Ortodont', loc: 'Chisinau', urgent: true },
            { title: 'Medic Implantolog', loc: 'Iasi', urgent: true },
          ].map(j => (
            <a key={j.title} href="/cariere" className="no-underline block bg-white/[.08] border border-white/[.12] rounded-xl p-3.5 hover:bg-white/[.12] transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[13px] font-semibold text-white">{j.title}</div>
                  <div className="text-[11px] text-white/50 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />{j.loc}
                  </div>
                </div>
                {j.urgent && <span className="text-[9px] font-bold text-pink-400 bg-pink-500/20 px-2 py-0.5 rounded">URGENT</span>}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ ─────────────────────────────────── */
const FAQS = [
  { q:'Ce este Digital Check-Up?', a:'O procedura moderna care combina Protocol Fotografic, Scanner 3Shape, Radiografie 3D si Consultatie Personalizata pentru o analiza completa a sanatatii dentare.' },
  { q:'Cat dureaza o consultatie initiala?', a:'30-45 minute. Include examinare clinica, radiografie si plan de tratament personalizat, discutat impreuna cu tine.' },
  { q:'Oferiti optiuni de finantare?', a:'Da! Lucram cu parteneri financiari si oferim rate lunare fara dobanda pentru tratamentele majore.' },
  { q:'Este dureroasa implantologia dentara?', a:'Nu. Folosim anestezie locala moderna si, pentru cazuri complexe, anestezie generala. Ghidul 3D minimizeaza interventia.' },
  { q:'Pot vedea rezultatul inainte de tratament?', a:'Absolut! Cu Digital Smile Design si 3Shape Trios, simulam 3D rezultatul in cabinet. Aprobi designul inainte de orice interventie.' },
]

/* ─── Video Reels Slider ─────────────────── */
function VideoReels() {
  const videos = [
    { name:'Denis P.', service:'Implant Dentar', thumb:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&h=420&fit=crop&crop=face' },
    { name:'Elena M.', service:'Coroane Dentare', thumb:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&h=420&fit=crop&crop=face' },
    { name:'Alexandru C.', service:'All-On-4', thumb:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=240&h=420&fit=crop&crop=face' },
    { name:'Maria T.', service:'Fatete Dentare', thumb:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=240&h=420&fit=crop&crop=face' },
    { name:'Ion V.', service:'Digital Check-Up', thumb:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=240&h=420&fit=crop&crop=face' },
    { name:'Nadejda B.', service:'Ortodontie', thumb:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&h=420&fit=crop&crop=face' },
    { name:'Svetlana L.', service:'Terapie', thumb:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=240&h=420&fit=crop&crop=face' },
  ]
  return (
    <section className="bg-sdt-50 py-14 px-[52px] overflow-hidden">
      <div className="flex justify-between items-end mb-6">
        <div>
          <SdtBadge>Video feedback</SdtBadge>
          <h2 className="font-display text-[28px] font-semibold text-[#0a1e18] tracking-[-0.03em] leading-[1.1] mt-2">
            Povesti <span className="text-pink-500">reale</span>
          </h2>
        </div>
        <div className="flex gap-2">
          <button className="w-9 h-9 rounded-full border-[1.5px] border-transparent bg-white cursor-pointer flex items-center justify-center hover:bg-sdt-50 transition-colors shadow-sm">
            <ChevronLeft className="w-3.5 h-3.5 text-[#0a1e18]" strokeWidth={2} />
          </button>
          <button className="w-9 h-9 rounded-full border-[1.5px] border-sdt-600 bg-sdt-600 cursor-pointer flex items-center justify-center hover:bg-sdt-500 transition-colors">
            <ChevronRight className="w-3.5 h-3.5 text-white" strokeWidth={2} />
          </button>
        </div>
      </div>
      <div className="flex gap-3.5 overflow-x-auto pb-2 snap-x snap-mandatory scroll-premium">
        {videos.map((v, i) => (
          <div key={i}
            className="hover-glow-pink w-[180px] h-[320px] rounded-[18px] shrink-0 cursor-pointer relative overflow-hidden snap-start transition-all"
          >
            <img src={v.thumb} alt={v.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,30,24,.7) 0%, transparent 40%)' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center opacity-90">
                <Play className="w-[18px] h-[18px] text-white fill-white" />
              </div>
            </div>
            <div className="absolute top-2.5 right-2.5 bg-black/40 rounded px-1.5 py-0.5">
              <Video className="w-3 h-3 text-white" strokeWidth={2} />
            </div>
            <div className="absolute bottom-3.5 left-3 right-3">
              <div className="text-[13px] font-bold text-white">{v.name}</div>
              <div className="text-[10px] text-white/60 mt-0.5">{v.service}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Ambasadori ─────────────────────────── */
function Ambasadori() {
  return (
    <section id="ambasadori" className="bg-white py-[72px] px-[52px] border-t border-transparent">
      <div className="text-center mb-11">
        <SdtBadge>Zambete care inspira</SdtBadge>
        <h2 className="font-display text-[40px] font-semibold tracking-[-0.03em] leading-[1.06] text-[#0a1e18] mt-4 mb-3.5">
          Ambasadorii <span className="text-pink-500">Smile Dent Team</span>
        </h2>
        <p className="text-[15px] text-[#5a7a6e] max-w-[500px] mx-auto">
          Personalitati din diverse industrii care ne-au ales si ne reprezinta.
        </p>
      </div>
      <div className="grid grid-cols-6 gap-[18px] max-w-[1100px] mx-auto">
        {AMBASSADORS.map(amb => (
          <div key={amb.slug}
            className="img-zoom hover-glow rounded-2xl overflow-hidden cursor-pointer relative border border-transparent bg-white shadow-sm transition-all group"
          >
            <div className="relative pt-[110%] overflow-hidden">
              <img src={amb.photo} alt={amb.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 h-[60%] pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(10,30,24,.9) 0%, transparent 100%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-3.5">
                <div className="font-display text-[13px] font-medium text-white leading-[1.2]">{amb.name}</div>
                <div className="text-[10px] text-white/60 mt-0.5">{amb.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-7">
        <a href="/ambasadori" className="no-underline">
          <Button variant="outline" className="btn-shine rounded-full text-sdt-600 border-sdt-600 hover:bg-sdt-600 hover:text-white transition-all text-[13px] font-bold px-7">
            Vezi toti ambasadorii <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </a>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState<number|null>(null)
  return (
    <section className="py-24 px-[52px]" style={{ background: B.cr }}>
      <div className="flex gap-20">
        <div className="w-[340px] shrink-0">
          <SHead eyebrow="Intrebari frecvente" title={<>Ai intrebari?<br/>Avem raspunsuri.</>}
            sub="Nu gasesti raspunsul? Contacteaza-ne direct sau programeaza o consultatie gratuita."
          />
          <Button className="btn-shine font-bold rounded-full">
            Contacteaza-ne <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="flex-1">
          {FAQS.map((f, i) => (
            <div key={i} className="border-b border-sdt-600/10">
              <button onClick={() => setOpen(open===i?null:i)}
                className="w-full bg-transparent border-none text-left py-5 cursor-pointer flex justify-between items-center font-sans text-base font-semibold text-[#0a1e18]"
              >
                <span>{f.q}</span>
                <span className={cn(
                  'text-xl text-sdt-600 shrink-0 ml-4 transition-all duration-300',
                  open === i && 'rotate-45'
                )}>+</span>
              </button>
              <div className={cn(
                'overflow-hidden transition-all duration-300 ease-in-out',
                open === i ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
              )}>
                <p className="text-[15px] leading-[1.78] text-[#4a6a58] pb-5 pr-10">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Appointment ─────────────────────────── */
function Appointment() {
  return (
    <section className="py-24 px-[52px]" style={{ background: `linear-gradient(135deg, ${B.p}, ${B.pm})` }}>
      <div className="flex gap-20 items-center">
        <div className="flex-1 text-white">
          <div className="mb-8 p-5 px-6 bg-pink-500 rounded-xl">
            <div className="font-display text-[32px] font-semibold text-white tracking-[-0.02em]">{CAMPAIGN_2026.slogan}</div>
            <div className="text-sm text-white/80 mt-1.5">Investeste in sanatatea ta — incepe cu Digital Check-Up.</div>
          </div>
          <h2 className="font-display text-[38px] font-semibold leading-[1.06] tracking-[-0.03em] mb-5 text-white">
            Fa primul pas<br/>spre zambetul perfect
          </h2>
          <p className="text-[17px] leading-[1.75] text-white/75 max-w-[380px] mb-8">
            Consultatie initiala <strong className="text-white">GRATUITA</strong>. Fara angajament.
          </p>
          {['Consultatie gratuita confirmata in 24h','Fara liste de asteptare','Plan de tratament digital detaliat','Preturi transparente de la prima intalnire'].map(item => (
            <div key={item} className="flex items-center gap-2.5 mb-2.5">
              <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-sm text-white/[.85]">{item}</span>
            </div>
          ))}
        </div>
        <div className="w-[420px] shrink-0 bg-white rounded-[20px] p-10 shadow-premium">
          <h3 className="text-[22px] font-extrabold text-[#0a1e18] mb-2 tracking-[-0.02em]">Programeaza-te acum</h3>
          <p className="text-sm text-[#5a7a6e] mb-7">Completeaza formularul — te contactam in max. 2h.</p>
          <div className="flex flex-col gap-3.5">
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Prenume" className="focus:ring-sdt-600/20" />
              <Input placeholder="Nume" className="focus:ring-sdt-600/20" />
            </div>
            <Input placeholder="Telefon *" className="focus:ring-sdt-600/20" />
            <select defaultValue="" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sdt-600/20 focus-visible:ring-offset-2">
              <option value="" disabled>Selecteaza serviciul</option>
              <option>Digital Check-Up</option>
              {SVC_LIST.map(s => <option key={s}>{s}</option>)}
            </select>
            <Button className="btn-shine w-full justify-center py-[15px] text-[15px] font-bold rounded-full">
              Trimite cererea <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <p className="text-[11px] text-[#5a7a6e] text-center">
              Prin trimitere esti de acord cu <span className="text-sdt-600 cursor-pointer">Politica de confidentialitate</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ──────────────────────────────── */
function Footer() {
  return (
    <>
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
            {SVC_LIST.map(s => (
              <div key={s} className="text-[13px] mb-2.5 text-white/[.58] cursor-pointer hover:text-white transition-colors">{s}</div>
            ))}
          </div>
          <div>
            <div className="text-[11px] font-bold text-white tracking-[.15em] uppercase mb-5">Clinica</div>
            {[['Despre noi','/despre-noi'],['Echipa','/echipa'],['Ambasadori','/ambasadori'],['Tehnologii','/tehnologii'],['Blog','/'],['Cariere','/cariere'],['Contacte','/contacte']].map(([s,h]) => (
              <a key={s} href={h} className="block text-[13px] mb-2.5 text-white/[.58] no-underline hover:text-white transition-colors">{s}</a>
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

/* ─── Keyframes injected once ─────────────── */
const ANIM_CSS = `
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
  @keyframes barGrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
  @keyframes pulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}
  .fl1{animation:floatY 4s ease-in-out infinite}
  .fl2{animation:floatY 4.6s 1.1s ease-in-out infinite}
`

/* ─── Exports ─────────────────────────────── */
export function Homepage() {
  return (
    <>
      <style>{ANIM_CSS}</style>
      <Navbar/>
      <Hero/>
      <Services/>
      <Technologies/>
      <CheckUpStrip/>
      <BeforeAfter/>
      <Reviews/>
      <VideoReels/>
      <Ambasadori/>
      <DespreNoiPreview/>
      <CarierePreview/>
      <FAQ/>
      <Appointment/>
      <Footer/>
    </>
  )
}

export function DigitalCheckupPage() {
  return <div className="p-10 font-sans"><h1 className="text-sdt-600 font-display">Digital Check-Up — in constructie</h1></div>
}

export function LoginPage() {
  return <div className="p-10 font-sans"><h1 className="text-sdt-600 font-display">Login — in constructie</h1></div>
}

export function DashboardPage() {
  return <div className="p-10 font-sans"><h1 className="text-sdt-600 font-display">Cabinet Personal — in constructie</h1></div>
}

'use client'

import { useState } from 'react'
import { Logo } from './Logo'
import { BRAND as B, STATS, SERVICES, LOCATIONS, CAMPAIGN_2026, AMBASSADORS } from '@/lib/brand'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  Heart, Shield, Award, Users, Building2, Zap, Target,
  CheckCircle, ArrowRight, MapPin, Phone, Clock,
  Play, Star, Sparkles, TrendingUp, Globe, Lightbulb,
  GraduationCap, FileCheck, Camera, Video, ChevronDown, ChevronUp,
  Calendar, BookOpen, Stethoscope, Handshake, Eye, Gem
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

/* ─── Hero animation CSS ─────────────────── */
const ANIM_DESPRE = `
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  @keyframes pulse-ring { 0% { transform: scale(1); opacity: .6; } 100% { transform: scale(1.6); opacity: 0; } }
  @keyframes orbit { from { transform: rotate(0deg) translateX(var(--r)) rotate(0deg); } to { transform: rotate(360deg) translateX(var(--r)) rotate(-360deg); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes count-glow { 0%,100% { opacity: .4; } 50% { opacity: .8; } }
  @keyframes timeline-dot-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(232,21,122,.4); } 50% { box-shadow: 0 0 0 8px rgba(232,21,122,0); } }
`

/* ─── Timeline Data ───────────────────────── */
const TIMELINE = [
  { year: '2009', title: 'Inceputurile', desc: 'Prima clinica Smile Dent deschisa in Chisinau, Centru. O echipa de 8 specialisti cu viziunea de a schimba stomatologia in Moldova.' },
  { year: '2012', title: 'Primul scanner 3D', desc: 'Introducerea primului scanner intraoral 3D din Republica Moldova. Inceputul erei digitale in stomatologia locala.' },
  { year: '2015', title: 'Expansiune nationala', desc: 'Deschiderea filialelor Rascani si Botanica. Echipa creste la 120+ specialisti. Lansarea serviciului Digital Check-Up.' },
  { year: '2018', title: 'Internationalizare', desc: 'Prima filiala internationala la Iasi, Romania. Parteneriat cu furnizori din Germania si Elvetia pentru materiale premium.' },
  { year: '2021', title: 'Lider de piata', desc: 'Cota de piata 11.3% in Moldova. Lansarea Consultatiei Online pentru diaspora. Peste 25.000 de pacienti tratati.' },
  { year: '2023', title: 'Retea internationala', desc: 'Deschiderea filialei Bucuresti. 9 filiale in 4 tari. Acreditari internationale si certificari ISO.' },
  { year: '2026', title: 'Viitorul digital', desc: 'Campania "ALEGE-TE PE TINE." Peste 40.000 de pacienti. Integrare completa AI in diagnostica si planificarea tratamentelor.' },
]

/* ─── Values/Principles ───────────────────── */
const VALUES = [
  { icon: Lightbulb, title: 'Inovatie digitala', desc: 'Investim continuu in tehnologii de ultima generatie: scanere 3D, ghidaj digital, planificare computerizata.' },
  { icon: Heart, title: 'Grija pentru pacient', desc: 'Fiecare pacient primeste un plan de tratament personalizat, transparent si adaptat nevoilor sale individuale.' },
  { icon: Shield, title: 'Siguranta si calitate', desc: 'Materiale certificate international, protocoale stricte de sterilizare, garantie extinsa pe toate lucrarile.' },
  { icon: Eye, title: 'Transparenta totala', desc: 'Preturi clare afisate, plan digital vizualizabil inainte de tratament, comunicare deschisa la fiecare etapa.' },
  { icon: TrendingUp, title: 'Excelenta continua', desc: 'Echipa noastra participa anual la peste 50 de conferinte internationale si cursuri de perfectionare.' },
  { icon: Handshake, title: 'Parteneriat pe termen lung', desc: 'Nu tratam doar dinti — construim relatii de incredere pe viata. Programul de monitorizare post-tratament este gratuit.' },
]

/* ─── Certifications ──────────────────────── */
const CERTIFICATIONS = [
  { name: 'ISO 9001:2015', body: 'Bureau Veritas', desc: 'Sistem de management al calitatii', year: '2020' },
  { name: 'CE Medical', body: 'European Conformity', desc: 'Conformitate echipamente medicale', year: '2019' },
  { name: 'Digital Dentistry', body: 'German Board', desc: 'Excelenta in stomatologie digitala', year: '2022' },
  { name: 'Patient Safety', body: 'WHO Standards', desc: 'Protocol siguranta pacientilor', year: '2023' },
  { name: 'Green Clinic', body: 'Eco Certification', desc: 'Clinica cu impact ecologic redus', year: '2024' },
  { name: 'AI Diagnostics', body: 'MedTech Alliance', desc: 'Utilizare AI in diagnostica dentara', year: '2025' },
]

/* ─── Media Gallery ───────────────────────── */
const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop', alt: 'Cabinet stomatologic modern', type: 'photo' as const },
  { src: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop', alt: 'Echipa medicala in actiune', type: 'photo' as const },
  { src: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop', alt: 'Consultatie cu pacient', type: 'photo' as const },
  { src: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&h=400&fit=crop', alt: 'Scanner 3D digital', type: 'photo' as const },
  { src: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&h=400&fit=crop', alt: 'Sala de tratament', type: 'photo' as const },
  { src: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=400&fit=crop', alt: 'Echipament modern', type: 'photo' as const },
]

const TEAM_NUMBERS = [
  { icon: Users, value: '600+', label: 'Specialisti' },
  { icon: Stethoscope, value: '85', label: 'Medici stomatologi' },
  { icon: GraduationCap, value: '32', label: 'Doctori in stiinte' },
  { icon: Globe, value: '4', label: 'Tari de prezenta' },
  { icon: Building2, value: '9', label: 'Filiale active' },
  { icon: Award, value: '50+', label: 'Premii si distinctii' },
]

/* ─── Blog / News Articles ────────────────── */
const ARTICLES = [
  {
    title: 'Cum functioneaza Digital Check-Up-ul la SDT',
    excerpt: 'Procesul complet de evaluare dentara digitala, de la scanarea 3D pana la planul personalizat de tratament.',
    category: 'Tehnologie',
    date: '12 Mar 2026',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=250&fit=crop',
    readTime: '5 min',
  },
  {
    title: 'De ce aleg pacientii din diaspora Smile Dent Team',
    excerpt: 'Peste 6.000 de pacienti din Germania, Franta si UK ne aleg anual. Descoperiti motivele.',
    category: 'Diaspora',
    date: '8 Mar 2026',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop',
    readTime: '4 min',
  },
  {
    title: 'Implantologia in 2026: ce trebuie sa stiti',
    excerpt: 'Ultimele inovatii in implantologie digitala. Ghid complet pentru pacienti.',
    category: 'Educatie',
    date: '1 Mar 2026',
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=250&fit=crop',
    readTime: '7 min',
  },
]

/* ─── FAQ ─────────────────────────────────── */
const FAQ = [
  { q: 'De cand exista Smile Dent Team?', a: 'Smile Dent Team a fost fondata in 2009 in Chisinau. In cei 15+ ani de activitate am crescut de la o singura clinica la o retea internationala cu 9 filiale in 4 tari.' },
  { q: 'Cati pacienti ati tratat pana acum?', a: 'Peste 40.000 de pacienti ne-au acordat increderea lor. Anual tratam aproximativ 18.000 de adresari, de la controale preventive la cazuri complexe de reabilitare.' },
  { q: 'Ce certificari internationale detineti?', a: 'Detinem certificari ISO 9001:2015, CE Medical, acreditari de la German Board of Digital Dentistry si certificari WHO Patient Safety. Toate materialele sunt certificate international.' },
  { q: 'Oferiti servicii pentru pacientii din diaspora?', a: 'Da, avem un program dedicat diasporei: Consultatie Online, planificare pre-vizita si coordonare completa a tratamentului. Peste 6.000 de pacienti din diaspora ne aleg anual.' },
  { q: 'Ce tehnologii folositi?', a: 'Folosim scanere intraorale 3D, CBCT, planificare digitala a tratamentului, ghiduri chirurgicale 3D, AI pentru diagnostica si monitorizare digitala post-tratament.' },
  { q: 'Cum pot programa o consultatie?', a: 'Puteti programa online 24/7 prin formularul de pe site, prin telefon la orice filiala, sau prin Consultatie Online daca sunteti in diaspora. Consultatia initiala este GRATUITA.' },
]

/* ─── Despre Noi Page Component ───────────── */
export function DespreNoiPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [galleryIdx, setGalleryIdx] = useState(0)

  return (
    <>
      <Nav />
      <style dangerouslySetInnerHTML={{ __html: ANIM_DESPRE }} />

      {/* ━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${B.nv} 0%, #0f2e24 50%, ${B.pd} 100%)` }}>
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 items-center gap-10 px-12 pb-20 pt-[72px]">
          {/* Left — Text */}
          <div>
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[.12] px-3.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
              <span className="text-[11px] font-bold uppercase tracking-[.12em] text-white">Despre Smile Dent Team</span>
            </div>
            <h1 className="font-display mb-[18px] text-[44px] font-semibold leading-[1.08] tracking-tight text-white">
              15 ani de excelenta<br/>in <span className="text-pink-500">stomatologie digitala.</span>
            </h1>
            <p className="mb-7 max-w-[440px] text-base leading-relaxed text-white/[.65]">
              De la o clinica cu 8 specialisti la o retea internationala cu {STATS.team} profesionisti in {STATS.locations} filiale. Povestea noastra este despre curaj, inovatie si mii de zambete transformate.
            </p>
            <div className="flex gap-3.5">
              <Button variant="accent" className="gap-2 px-8 py-3.5 text-[15px] font-bold">
                Descopera povestea <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="gap-2 border-white/20 px-6 py-3.5 text-[15px] text-white hover:bg-white/10">
                <Play className="h-4 w-4" /> Video prezentare
              </Button>
            </div>
            <div className="mt-11 flex gap-8">
              {[[STATS.years, 'ani de excelenta'], [STATS.patients, 'pacienti tratati'], [STATS.team, 'specialisti'], [STATS.locations, 'filiale']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-[28px] font-semibold text-pink-500">{n}</div>
                  <div className="mt-0.5 text-xs text-white/[.45]">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Animated Clinic Network */}
          <div className="relative flex h-[400px] items-center justify-center">
            {/* Central hub */}
            <div className="relative z-10 flex h-[100px] w-[100px] flex-col items-center justify-center rounded-full border-2 border-white/20 bg-white/[.08] backdrop-blur-md">
              <Building2 className="h-8 w-8 text-white/80" strokeWidth={1.5} />
              <span className="mt-1 text-[9px] font-bold text-white/50">SDT HUB</span>
            </div>
            {/* Pulse rings */}
            {[1, 2, 3].map(i => (
              <div key={i} className="absolute rounded-full border border-white/[.06]" style={{
                width: 100 + i * 80, height: 100 + i * 80,
                animation: `pulse-ring ${3 + i}s ${i * 0.5}s ease-out infinite`,
              }} />
            ))}
            {/* Orbiting location nodes */}
            {LOCATIONS.map((loc, i) => {
              const angle = (i * 72) * (Math.PI / 180)
              const r = 130 + (i % 2) * 40
              return (
                <div key={loc.city} className="absolute" style={{
                  left: `calc(50% + ${Math.cos(angle) * r}px - 32px)`,
                  top: `calc(50% + ${Math.sin(angle) * r}px - 20px)`,
                  animation: `float ${3 + i * 0.4}s ${i * 0.3}s ease-in-out infinite`,
                }}>
                  <div className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[.06] px-3 py-2 backdrop-blur-sm">
                    <MapPin className="h-3.5 w-3.5 text-pink-400" strokeWidth={1.5} />
                    <span className="text-[10px] font-semibold text-white/70 whitespace-nowrap">{loc.city}</span>
                  </div>
                </div>
              )
            })}
            {/* Connecting lines (decorative) */}
            <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.1 }}>
              {LOCATIONS.map((_, i) => {
                const angle = (i * 72) * (Math.PI / 180)
                const r = 130 + (i % 2) * 40
                return (
                  <line key={i} x1="50%" y1="50%" x2={`calc(50% + ${Math.cos(angle) * r}px)`} y2={`calc(50% + ${Math.sin(angle) * r}px)`} stroke="white" strokeWidth="1" />
                )
              })}
            </svg>
          </div>
        </div>
      </section>

      {/* ━━━ MISSION & VISION ━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[1200px] grid grid-cols-2 gap-16">
          {/* Mission */}
          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-pink-500" />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: B.p }}>Misiunea noastra</span>
            </div>
            <h2 className="font-display text-[32px] font-semibold leading-[1.12] tracking-tight mb-5" style={{ color: B.nv }}>
              Transformam stomatologia prin tehnologie si empatie.
            </h2>
            <p className="text-[15px] leading-[1.8] text-[#5a7a6e] mb-6">
              Credem ca fiecare persoana merita acces la stomatologie de calitate internationala. Misiunea noastra este sa eliminam barierele — frica, distanta, costul — si sa oferim fiecarui pacient experienta pe care o merita: transparenta, fara durere, 100% digitala.
            </p>
            <p className="text-[15px] leading-[1.8] text-[#5a7a6e]">
              Nu tratam doar dinti. Reconstruim increderea oamenilor in propriul zambet, in propria sanatate si in sistemul medical. Fiecare transformare pe care o realizam este o dovada ca se poate si altfel.
            </p>
            <div className="mt-8 p-5 rounded-xl border border-pink-500/15 bg-pink-500/[.04]">
              <div className="font-display text-lg font-semibold text-pink-500 mb-1">{CAMPAIGN_2026.slogan}</div>
              <p className="text-sm text-[#5a7a6e]">Campania 2026 — pentru ca sanatatea incepe cu o decizie personala.</p>
            </div>
          </div>
          {/* Vision */}
          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: B.p }} />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: B.p }}>Viziunea noastra</span>
            </div>
            <h2 className="font-display text-[32px] font-semibold leading-[1.12] tracking-tight mb-5" style={{ color: B.nv }}>
              Clinica dentara nr.1 din Europa de Est.
            </h2>
            <p className="text-[15px] leading-[1.8] text-[#5a7a6e] mb-6">
              Obiectivul nostru pentru 2030: sa devenim reteaua de clinici stomatologice digitale de referinta in Europa de Est, cu prezenta in 8 tari si peste 100.000 de pacienti satisfacuti.
            </p>
            <div className="space-y-4">
              {[
                ['2026', 'Integrare completa AI in diagnostica. 50.000+ pacienti.'],
                ['2028', 'Extindere in 3 tari noi: Ungaria, Bulgaria, Polonia.'],
                ['2030', '100.000 pacienti. Hub de excelenta in stomatologie digitala.'],
              ].map(([year, goal]) => (
                <div key={year} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-[52px] h-[30px] rounded-md flex items-center justify-center text-[12px] font-bold text-white" style={{ background: B.p }}>{year}</div>
                  <p className="text-sm leading-[1.7] text-[#5a7a6e]">{goal}</p>
                </div>
              ))}
            </div>
            {/* Decorative photo */}
            <div className="mt-8 rounded-xl overflow-hidden h-[180px] relative">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=250&fit=crop"
                alt="Clinica moderna SDT"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e18]/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="font-display text-sm font-semibold">Filiala Chisinau, Centru</div>
                <div className="text-xs text-white/60">Renovata complet in 2024</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ TIMELINE (Istoria) ━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: B.ps }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-14">
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1" style={{ borderColor: `${B.p}22`, background: `${B.p}08` }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: B.p }} />
              <span className="text-[11px] font-bold uppercase tracking-[.12em]" style={{ color: B.p }}>Parcursul nostru</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              De la idee la <span className="text-pink-500">retea internationala</span>
            </h2>
            <p className="mt-3 text-sm text-[#5a7a6e] max-w-[500px] mx-auto">15 ani de crestere continua, inovatie si mii de zambete transformate.</p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: `${B.p}22` }} />

            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0
              return (
                <div key={item.year} className={cn('relative flex items-start mb-12 last:mb-0', isLeft ? '' : 'flex-row-reverse')}>
                  <div className={cn('w-[calc(50%-28px)]', isLeft ? 'text-right pr-8' : 'text-left pl-8')}>
                    <div className="font-display text-[32px] font-semibold text-pink-500 leading-none mb-1">{item.year}</div>
                    <h3 className="font-display text-lg font-semibold mb-2" style={{ color: B.nv }}>{item.title}</h3>
                    <p className="text-sm leading-[1.7] text-[#5a7a6e]">{item.desc}</p>
                  </div>
                  {/* Center dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-[14px] h-[14px] rounded-full border-[3px] bg-white z-10"
                    style={{ borderColor: i === TIMELINE.length - 1 ? B.a : B.p, animation: i === TIMELINE.length - 1 ? 'timeline-dot-pulse 2s infinite' : undefined }}
                  />
                  <div className="w-[calc(50%-28px)]" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ━━━ VALUES ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-14">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-pink-500" />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: B.p }}>Principiile noastre</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Valorile care ne <span className="text-pink-500">definesc</span>
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <Card key={i} className="group border-[--bdr] hover:border-sdt-200 transition-all duration-300 hover:shadow-lg hover:shadow-sdt-500/[.06]">
                <CardContent className="p-7">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300"
                    style={{ background: `${B.p}0D` }}
                  >
                    <v.icon className="w-6 h-6 text-sdt-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-[17px] font-semibold mb-2.5" style={{ color: B.nv }}>{v.title}</h3>
                  <p className="text-sm leading-[1.75] text-[#5a7a6e]">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ TEAM NUMBERS ━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 px-12" style={{ background: B.nv }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-12">
            <h2 className="font-display text-[32px] font-semibold tracking-tight text-white">
              Echipa noastra in <span className="text-pink-500">cifre</span>
            </h2>
          </div>
          <div className="grid grid-cols-6 gap-6">
            {TEAM_NUMBERS.map((t, i) => (
              <div key={i} className="text-center p-6 rounded-xl border border-white/[.07] bg-white/[.03]">
                <t.icon className="w-6 h-6 mx-auto mb-3 text-sdt-500" strokeWidth={1.5} />
                <div className="font-display text-[28px] font-semibold text-white mb-1">{t.value}</div>
                <div className="text-xs text-white/50">{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ GALLERY ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-12">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-pink-500" />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: B.p }}>Galerie foto</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Clinicile noastre — <span className="text-pink-500">in imagini</span>
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {GALLERY.map((g, i) => (
              <div key={i} className="group relative rounded-xl overflow-hidden cursor-pointer" style={{ height: i === 0 || i === 5 ? 280 : 220 }}>
                <img src={g.src} alt={g.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e18]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-sm font-semibold text-white">{g.alt}</div>
                </div>
                {i === 0 && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-pink-500 text-white border-0 text-[10px]">
                      <Camera className="w-3 h-3 mr-1" /> Video Tour
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ CERTIFICATIONS ━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: B.ps }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-14">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: B.p }} />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: B.p }}>Certificari si acreditari</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Standarde <span className="text-pink-500">internationale</span>
            </h2>
            <p className="mt-3 text-sm text-[#5a7a6e] max-w-[500px] mx-auto">Certificarile noastre confirma angajamentul fata de calitate, siguranta si inovatie.</p>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {CERTIFICATIONS.map((c, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl bg-white border border-[--bdr] hover:border-sdt-200 transition-all">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${B.p}0D` }}>
                  <FileCheck className="w-5 h-5 text-sdt-600" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-display text-[15px] font-semibold" style={{ color: B.nv }}>{c.name}</h4>
                    <span className="text-[10px] text-white font-bold px-1.5 py-0.5 rounded bg-sdt-600">{c.year}</span>
                  </div>
                  <div className="text-xs font-semibold text-sdt-600 mb-1">{c.body}</div>
                  <p className="text-xs text-[#5a7a6e]">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ LOCATIONS MAP ━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-14">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-pink-500" />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: B.p }}>Filialele noastre</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Prezenti in <span className="text-pink-500">4 tari</span>
            </h2>
          </div>
          <div className="grid grid-cols-5 gap-4">
            {LOCATIONS.map((loc, i) => (
              <Card key={i} className="group border-[--bdr] hover:border-sdt-200 transition-all hover:shadow-lg hover:shadow-sdt-500/[.06] overflow-hidden">
                <div className="h-[120px] relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${B.p}15, ${B.pd}10)` }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="w-10 h-10 text-sdt-500/30" strokeWidth={1} />
                  </div>
                  <div className="absolute bottom-2 left-3">
                    <Badge className="bg-white/90 text-sdt-700 border-0 text-[10px] font-bold">
                      {loc.city.includes('Chișinău') ? 'Moldova' : loc.city.includes('Iași') ? 'Romania' : 'Romania'}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-display text-[14px] font-semibold mb-1.5" style={{ color: B.nv }}>{loc.city}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-[#5a7a6e] mb-1">
                    <MapPin className="w-3 h-3" strokeWidth={1.5} />
                    {loc.address}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#5a7a6e]">
                    <Phone className="w-3 h-3" strokeWidth={1.5} />
                    {loc.phone}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ BLOG / ARTICLES ━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: B.ps }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="flex justify-between items-end mb-10">
            <div>
              <div className="mb-3 inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-pink-500" />
                <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: B.p }}>Blog si resurse</span>
              </div>
              <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
                Ultimele <span className="text-pink-500">articole</span>
              </h2>
            </div>
            <Button variant="outline" className="border-sdt-600 text-sdt-600 font-semibold text-[13px]">
              Toate articolele <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {ARTICLES.map((art, i) => (
              <Card key={i} className="group border-[--bdr] hover:border-sdt-200 transition-all overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-sdt-500/[.06]">
                <div className="h-[180px] overflow-hidden">
                  <img src={art.image} alt={art.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-[10px] font-bold border-sdt-200 text-sdt-600">{art.category}</Badge>
                    <span className="text-[11px] text-[#5a7a6e]">{art.date}</span>
                    <span className="text-[11px] text-[#5a7a6e] ml-auto flex items-center gap-1"><BookOpen className="w-3 h-3" />{art.readTime}</span>
                  </div>
                  <h3 className="font-display text-[16px] font-semibold leading-snug mb-2" style={{ color: B.nv }}>{art.title}</h3>
                  <p className="text-sm leading-[1.65] text-[#5a7a6e]">{art.excerpt}</p>
                </CardContent>
              </Card>
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
              Ai intrebari? <span className="text-pink-500">Avem raspunsuri.</span>
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
            Fa primul pas<br/>spre <span className="text-pink-400">zambetul perfect</span>
          </h2>
          <p className="text-white/60 mb-8 max-w-[480px] mx-auto">
            Consultatia initiala este GRATUITA. Programeaza-te acum si descopera planul de tratament potrivit pentru tine.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="accent" className="gap-2 px-10 py-4 text-[16px] font-bold">
              Programeaza consultatie gratuita <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-6 flex justify-center gap-6 text-sm text-white/50">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-pink-400" /> Consultatie gratuita</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-pink-400" /> Fara lista de asteptare</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-pink-400" /> Plan digital personalizat</span>
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
            {[['Despre noi','/despre-noi'],['Echipa','/echipa'],['Ambasadori','/ambasadori'],['Tehnologii','/tehnologii'],['Blog','/'],['Cariere','/cariere'],['Contacte','/']].map(([s,h]) => (
              <a key={s} href={h} className={cn(
                'block text-[13px] mb-2.5 no-underline hover:text-white transition-colors',
                s === 'Despre noi' ? 'text-pink-500 font-semibold' : 'text-white/[.58]'
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

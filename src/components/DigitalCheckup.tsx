'use client'
import { useState } from 'react'
import { BRAND as B, STATS, LOCATIONS, CAMPAIGN_2026 } from '@/lib/brand'
import { Logo } from './Logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  CheckCircle,
  Shield,
  Monitor,
  User,
  Eye,
  Heart,
  FileText,
  Clock,
  Play,
  Check,
  Plus,
  Star,
  CircleDot,
  Banknote,
} from 'lucide-react'

/* ─── Keyframe animations — scan beam theme ─── */
const ANIM = `
  @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes barGrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes scanBeam{0%{top:-10%;opacity:0}10%{opacity:1}90%{opacity:1}100%{top:100%;opacity:0}}
  @keyframes scanPulse{0%,100%{opacity:.3;box-shadow:0 0 30px 10px rgba(232,21,122,0)}50%{opacity:.7;box-shadow:0 0 40px 15px rgba(232,21,122,.15)}}
  @keyframes dataFade{0%,15%{opacity:0;transform:translateX(8px)}20%,80%{opacity:1;transform:translateX(0)}85%,100%{opacity:0;transform:translateX(-8px)}}
`

/* ─── Icon map for data-driven sections ─── */
const ICON_MAP: Record<string, React.ElementType> = {
  checkCircle: CheckCircle,
  shield: Shield,
  monitor: Monitor,
  user: User,
  eye: Eye,
  heart: Heart,
  fileText: FileText,
  clock: Clock,
  banknote: Banknote,
}

/* ─── Section Badge ─── */
function SectionBadge({ children, light }: { children: string; light?: boolean }) {
  return (
    <div className={cn(
      'inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full mb-4 border',
      light
        ? 'bg-white/[.12] border-white/20'
        : 'bg-sdt-100 border-sdt-600/10'
    )}>
      <span className={cn(
        'w-1.5 h-1.5 rounded-full',
        light ? 'bg-white' : 'bg-sdt-600'
      )} />
      <span className={cn(
        'text-[11px] font-bold tracking-[.12em] uppercase',
        light ? 'text-white' : 'text-sdt-600'
      )}>{children}</span>
    </div>
  )
}

/* ─── Navbar ─── */
function Nav() {
  const navLinks = [
    ['Servicii', '/servicii'],
    ['Digital Check-Up', '/digital-checkup'],
    ['Consultație Online', '/consultatie-online'],
    ['Echipa', '/echipa'],
    ['Recenzii', '/'],
  ]

  return (
    <nav
      className="sticky top-0 z-[100] bg-white/[.97] backdrop-blur-[12px] px-12 py-3.5 flex justify-between items-center"
      style={{ borderTop: `3px solid ${B.a}`, borderBottom: `1px solid ${B.bdr}` }}
    >
      <a href="/" className="no-underline">
        <Logo height={36} />
      </a>
      <div className="flex gap-7 items-center">
        {navLinks.map(([label, href]) => (
          <a
            key={label}
            href={href}
            className={cn(
              'text-sm no-underline',
              label === 'Digital Check-Up'
                ? 'font-bold text-sdt-600'
                : 'font-medium text-[#3a5a50]'
            )}
          >
            {label}
          </a>
        ))}
      </div>
      <div className="flex gap-2.5 items-center">
        <a href="/login" className="no-underline">
          <Button variant="outline" className="text-sdt-600 border-sdt-600 text-[13px] font-semibold h-auto px-[18px] py-2">
            Cabinetul meu
          </Button>
        </a>
        <Button
          variant="accent"
          className="text-[13px] font-bold h-auto px-[22px] py-2.5"
        >
          Programează-te
        </Button>
      </div>
    </nav>
  )
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: `linear-gradient(160deg, ${B.nv} 0%, #0f2e24 50%, ${B.pd} 100%)` }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-[120px] -right-[80px] w-[400px] h-[400px] rounded-full border border-white/[.04]" />
      <div className="absolute -bottom-[60px] -left-[40px] w-[250px] h-[250px] rounded-full border border-white/[.03]" />

      <div className="max-w-[1200px] mx-auto px-12 pt-20 pb-[72px] grid grid-cols-2 gap-[60px] items-center">
        {/* Left */}
        <div>
          <SectionBadge light>Produs Flagship 2026</SectionBadge>
          <h1 className="font-display text-[52px] font-semibold text-white leading-[1.05] tracking-[-0.03em] mb-5">
            Digital<br /><span className="text-pink-500">Check-Up</span>
          </h1>
          <p className="text-lg leading-[1.7] text-white/70 max-w-[480px] mb-9">
            Primul pas către un zâmbet sănătos. O evaluare completă, digitală și fără disconfort — detectăm problemele înainte să devină costisitoare.
          </p>
          <div className="flex gap-3.5">
            <Button variant="accent" className="text-[15px] font-bold h-auto px-8 py-3.5 gap-2">
              Programează Digital Check-Up →
            </Button>
            <Button
              variant="outline"
              className="text-white border-white/30 hover:bg-white/10 text-[15px] font-bold h-auto px-8 py-3.5"
            >
              Află mai multe ↓
            </Button>
          </div>
          <div className="flex gap-8 mt-11">
            {[['30 min', 'Durată'], ['100%', 'Digital'], ['0', 'Disconfort']].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-[28px] font-semibold text-pink-500">{n}</div>
                <div className="text-xs text-white/[.45] mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — 3D Scan visualization */}
        <div className="relative flex h-[420px] items-center justify-center">
          {/* Scanner frame */}
          <div
            className="relative flex h-[340px] w-[280px] items-center justify-center overflow-hidden rounded-[24px] border border-white/[.08]"
            style={{ background: `linear-gradient(180deg, ${B.pm}11 0%, ${B.a}08 100%)` }}
          >
            {/* Scan beam — horizontal line sweeping */}
            <div
              className="absolute left-0 z-[1] h-[2px] w-full"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${B.a} 50%, transparent 100%)`,
                animation: 'scanBeam 3.5s ease-in-out infinite',
                boxShadow: `0 0 20px 8px ${B.a}33`,
              }}
            />
            {/* Grid lines (scanner aesthetic) */}
            {[...Array(7)].map((_, i) => (
              <div key={`h${i}`} className="absolute left-0 h-px w-full bg-white/[.03]" style={{ top: `${(i + 1) * 12.5}%` }} />
            ))}
            {[...Array(5)].map((_, i) => (
              <div key={`v${i}`} className="absolute top-0 w-px h-full bg-white/[.03]" style={{ left: `${(i + 1) * 16.6}%` }} />
            ))}
            {/* Tooth icon center */}
            <div className="z-[2] flex flex-col items-center">
              <svg width="80" height="96" viewBox="0 0 80 96" fill="none" className="opacity-40">
                <path d="M40 8c-12 0-20 6-24 14s-4 18 0 28c3 8 6 18 10 28 2 5 4 10 8 14 2 2 4 2 6 0 4-4 6-9 8-14 4-10 7-20 10-28 4-10 4-20 0-28S52 8 40 8z" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <div className="mt-3 text-center text-[11px] font-medium text-white/40">Scanare 3D activa</div>
            </div>
            {/* Data readouts floating in */}
            {[
              { label: 'Carii detectate', val: '0', y: '18%', delay: 0 },
              { label: 'Gingivita', val: 'Nu', y: '38%', delay: 1.5 },
              { label: 'Os alveolar', val: 'OK', y: '58%', delay: 3 },
              { label: 'Parodontal', val: 'Sanatos', y: '78%', delay: 4.5 },
            ].map((d, i) => (
              <div
                key={i}
                className="absolute right-3 z-[3] flex items-center gap-1.5 rounded-md border border-sdt-600/20 bg-sdt-900/60 px-2 py-1 backdrop-blur-sm"
                style={{ top: d.y, animation: `dataFade 6s ${d.delay}s ease-in-out infinite` }}
              >
                <CheckCircle className="h-3 w-3 text-emerald-400" strokeWidth={2} />
                <div>
                  <div className="text-[8px] text-white/40">{d.label}</div>
                  <div className="text-[10px] font-bold text-emerald-400">{d.val}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Floating stat cards */}
          <div
            className="absolute -right-[10px] top-[20px] z-[3] rounded-xl bg-white px-[18px] py-3 shadow-[0_8px_32px_rgba(0,0,0,.15)]"
            style={{ animation: 'float 4s ease-in-out infinite' }}
          >
            <div className="mb-0.5 text-[11px] text-[#5a7a6e]">Precizie</div>
            <div className="font-display text-xl font-semibold text-sdt-600">99.8%</div>
          </div>
          <div
            className="absolute bottom-[30px] -left-[20px] z-[3] rounded-xl bg-white px-[18px] py-3 shadow-[0_8px_32px_rgba(0,0,0,.15)]"
            style={{ animation: 'float 4.5s 1s ease-in-out infinite' }}
          >
            <div className="text-[13px] text-[#fbb040]">★★★★★</div>
            <div className="text-xs font-bold text-sdt-900">4.9 / 5.0</div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Benefits ─── */
const BENEFITS = [
  { icon: CheckCircle, title: 'Detecție timpurie', desc: 'Identifică cariile, inflamațiile gingivale și alte afecțiuni înainte de a deveni grave.' },
  { icon: Shield, title: 'Prevenție inteligentă', desc: 'Evită tratamente complicate prin checkup-uri regulate cu tehnologie avansată.' },
  { icon: Monitor, title: 'Precizie digitală', desc: 'Analiză cu tehnologie de ultimă generație, fără disconfort, rezultate imediate.' },
  { icon: User, title: 'Consultație personalizată', desc: 'Plan de tratament adaptat nevoilor tale, explicat clar și transparent.' },
  { icon: Eye, title: 'Claritate totală', desc: 'Înțelegi exact starea ta dentară și pașii necesari pentru un zâmbet perfect.' },
  { icon: Heart, title: 'Încredere crescută', desc: 'Un zâmbet sănătos îți oferă siguranță în fiecare zi.' },
]

function Benefits() {
  return (
    <section className="bg-white py-20 px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-14">
          <SectionBadge>De ce Digital Check-Up</SectionBadge>
          <h2 className="font-display text-[38px] font-semibold text-sdt-900 tracking-[-0.03em] mb-3.5">
            Beneficiile unui<br /><span className="text-sdt-600">Digital Check-Up</span>
          </h2>
          <p className="text-[15px] text-[#5a7a6e] max-w-[520px] mx-auto">
            O procedură modernă, rapidă și precisă care îți analizează sănătatea dentară în detaliu.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {BENEFITS.map((b) => {
            const Icon = b.icon
            return (
              <Card
                key={b.title}
                className="p-7 cursor-pointer transition-all duration-[250ms] hover:-translate-y-1 hover:border-sdt-600 hover:shadow-lg border bg-white"
              >
                <div className="w-12 h-12 rounded-xl bg-sdt-100 flex items-center justify-center mb-[18px]">
                  <Icon className="w-[22px] h-[22px] text-sdt-600" strokeWidth={1.8} />
                </div>
                <h3 className="font-display text-[17px] font-medium text-sdt-900 mb-2">{b.title}</h3>
                <p className="text-[13px] leading-[1.65] text-[#5a7a6e] m-0">{b.desc}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── Process Steps ─── */
const STEPS = [
  { num: '01', title: 'Înregistrare', desc: 'Completezi datele și primești o consultație inițială.', photo: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop' },
  { num: '02', title: 'Protocol foto', desc: 'Realizăm fotografii profesionale pentru documentare completă.', photo: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=250&fit=crop' },
  { num: '03', title: 'Scanare digitală 3D', desc: 'Scanner intraoral de ultimă generație — fără paste, fără disconfort.', photo: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=250&fit=crop' },
  { num: '04', title: 'Radiografie CBCT', desc: 'Imagini 3D de înaltă rezoluție pentru un diagnostic complet.', photo: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=250&fit=crop' },
  { num: '05', title: 'Evaluare detaliată', desc: 'Medicul analizează toate datele și identifică problemele.', photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=250&fit=crop' },
  { num: '06', title: 'Plan de tratament', desc: 'Primești un plan personalizat, cu opțiuni și costuri clare.', photo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop' },
]

function Process() {
  return (
    <section className="bg-sdt-50 py-[72px] px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-end mb-9">
          <div>
            <SectionBadge>Cum funcționează</SectionBadge>
            <h2 className="font-display text-[34px] font-semibold text-sdt-900 tracking-[-0.03em] m-0">
              Etapele unui <span className="text-sdt-600">Digital Check-Up</span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="font-display text-[22px] font-semibold text-sdt-600">~30 min</div>
            <div className="text-[11px] text-[#5a7a6e]">durată totală</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3.5">
          {STEPS.map((s) => (
            <Card
              key={s.num}
              className="overflow-hidden transition-all duration-200 hover:border-pink-500 hover:shadow-md"
            >
              <div className="relative h-[120px] overflow-hidden">
                <img src={s.photo} alt={s.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center border-2 border-white shadow-[0_2px_8px_rgba(0,0,0,.2)]">
                  <span className="text-[11px] font-extrabold text-white">{s.num}</span>
                </div>
              </div>
              <CardContent className="px-[18px] py-4">
                <h3 className="font-display text-[15px] font-medium text-sdt-900 mb-1">{s.title}</h3>
                <p className="text-xs leading-[1.5] text-[#5a7a6e] m-0">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── DCU Stats ─── */
function DcuStats() {
  return (
    <section className="py-12 px-12" style={{ background: `linear-gradient(135deg, ${B.p}, ${B.pm})` }}>
      <div className="max-w-[1200px] mx-auto flex justify-center gap-14 items-center">
        {[
          ['2.200+', 'Digital Check-Up-uri realizate'],
          ['30', 'minute — durată medie'],
          ['99.8%', 'precizie diagnostic'],
          ['4.9', 'rating Google pacienți'],
        ].map(([n, l]) => (
          <div key={l} className="text-center">
            <div className="font-display text-[30px] font-semibold text-white">{n}</div>
            <div className="text-[11px] text-white/60 mt-1">{l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── DCU Testimonials + Video ─── */
function DcuTestimonials() {
  const reviews = [
    { text: 'Am aflat exact ce am nevoie. Totul transparent, fără presiune. Cel mai bun prim pas.', author: 'Ana R.', rating: 5 },
    { text: 'În 30 de minute am avut o imagine clară a sănătății mele dentare. Impresionant!', author: 'Mihai P.', rating: 5 },
    { text: 'Scanarea 3D a fost rapidă și complet fără durere. Recomand oricui.', author: 'Elena S.', rating: 5 },
    { text: 'Am primit planul cu costuri clare. Nicio surpriză. Exact ce aveam nevoie.', author: 'Victor D.', rating: 5 },
  ]
  return (
    <section className="bg-white py-[72px] px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 gap-10">
          {/* Left — Reviews */}
          <div>
            <SectionBadge>Ce spun pacienții</SectionBadge>
            <h2 className="font-display text-[28px] font-semibold text-sdt-900 mb-5">
              Experiența <span className="text-pink-500">Digital Check-Up</span>
            </h2>
            <div className="flex flex-col gap-3">
              {reviews.map((r, i) => (
                <div key={i} className="bg-sdt-50 rounded-xl p-4 border-l-[3px] border-l-sdt-600">
                  <div className="text-[#fbb040] text-[11px] mb-1">{'★'.repeat(r.rating)}</div>
                  <p className="text-[13px] leading-[1.6] text-sdt-900 mb-1.5 italic m-0">&ldquo;{r.text}&rdquo;</p>
                  <div className="text-xs text-[#5a7a6e] font-semibold">— {r.author}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Right — Video reels */}
          <div>
            <SectionBadge>Video feedback</SectionBadge>
            <h2 className="font-display text-[28px] font-semibold text-sdt-900 mb-5">
              Povești <span className="text-sdt-600">reale</span>
            </h2>
            <div className="grid grid-cols-3 gap-2.5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-[280px] rounded-[14px] cursor-pointer flex items-center justify-center relative"
                  style={{ background: `linear-gradient(160deg, ${B.nv}, #0f2e24)` }}
                >
                  <div className="w-11 h-11 rounded-full bg-pink-500 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-[11px] font-bold text-white">Pacient #{i}</div>
                    <div className="text-[9px] text-white/50">Digital Check-Up</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── What you get ─── */
function WhatYouGet() {
  const items = [
    { title: 'Scanare 3D completă', desc: 'Model digital al danturii tale — fără amprentă clasică', icon: Monitor },
    { title: 'Tomografie 3D CBCT', desc: 'Imagini de înaltă rezoluție ale structurii osoase', icon: Eye },
    { title: 'Protocol fotografic', desc: 'Documentare completă înainte/după', icon: Heart },
    { title: 'Plan de tratament PDF', desc: 'Document detaliat cu diagnostic, opțiuni și costuri', icon: FileText },
    { title: 'Consultație 1:1', desc: 'Discuție cu specialistul — explicații clare, fără grabă', icon: User },
    { title: 'Prețuri transparente', desc: 'Știi exact cât costă — fără costuri ascunse', icon: Clock },
  ]
  return (
    <section
      className="py-[72px] px-12"
      style={{ background: `linear-gradient(160deg, ${B.nv}, #0f2e24)` }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-9">
          <SectionBadge light>Ce primești</SectionBadge>
          <h2 className="font-display text-[32px] font-semibold text-white m-0">
            Totul într-un <span className="text-pink-500">Digital Check-Up</span>
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-3.5">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="bg-white/5 border border-white/[.08] rounded-[14px] p-[22px] flex gap-3.5">
                <div className="w-10 h-10 rounded-[10px] bg-white/[.08] flex items-center justify-center shrink-0">
                  <Icon className="w-[18px] h-[18px] text-pink-500" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-display text-sm font-medium text-white mb-1">{item.title}</h3>
                  <p className="text-xs leading-[1.5] text-white/[.55] m-0">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── When you need it ─── */
const INDICATORS = [
  'Sângerări ale gingiilor sau respirație neplăcută',
  'Probleme la mestecat sau disconfort la mâncare',
  'Porți proteze și ai nevoie de verificare',
  'Nu ai fost la control de mai mult de 6 luni',
  'Vrei să-ți planifici un tratament estetic',
  'Ai dureri sau sensibilitate dentară',
]

function WhenNeeded() {
  return (
    <section className="bg-white py-20 px-12">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 gap-[60px] items-center">
        <div>
          <SectionBadge>Ai nevoie de check-up?</SectionBadge>
          <h2 className="font-display text-[34px] font-semibold text-sdt-900 tracking-[-0.03em] mb-3.5 leading-[1.1]">
            Când ar trebui<br />să faci un <span className="text-sdt-600">Digital Check-Up</span>?
          </h2>
          <p className="text-sm leading-[1.7] text-[#5a7a6e] mb-7 max-w-[420px]">
            Dacă te regăsești în oricare dintre situațiile de mai jos, Digital Check-Up este soluția ideală.
          </p>
          <Button variant="accent" className="text-[15px] font-bold h-auto px-8 py-3.5 gap-2">
            Programează-te acum →
          </Button>
        </div>
        <div className="grid gap-3">
          {INDICATORS.map((ind, i) => (
            <div
              key={i}
              className="flex items-center gap-3.5 px-5 py-3.5 bg-sdt-50 rounded-[10px] border border-sdt-600/10"
            >
              <div className="w-7 h-7 rounded-full bg-sdt-100 shrink-0 flex items-center justify-center">
                <Check className="w-3.5 h-3.5 text-sdt-600" strokeWidth={2.5} />
              </div>
              <span className="text-sm text-sdt-900 font-medium">{ind}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA Strip ─── */
function CtaStrip() {
  return (
    <section className="py-[60px] px-12" style={{ background: `linear-gradient(135deg, ${B.p}, ${B.pm})` }}>
      <div className="max-w-[900px] mx-auto text-center">
        <h2 className="font-display text-[34px] font-semibold text-white mb-3.5 tracking-[-0.02em]">
          Alege-te pe tine. Programează un Digital Check-Up.
        </h2>
        <p className="text-base text-white/70 mb-8 max-w-[540px] mx-auto">
          30 de minute care îți pot schimba zâmbetul. Fără durere, fără surprize — doar claritate.
        </p>
        <div className="flex gap-3.5 justify-center">
          <Button variant="accent" className="text-base font-bold h-auto px-9 py-4 gap-2">
            Programează-te →
          </Button>
          <Button
            variant="outline"
            className="text-white border-white/30 hover:bg-white/10 text-base font-bold h-auto px-9 py-4"
          >
            Sună: +373 22 881 414
          </Button>
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ ─── */
const FAQS = [
  { q: 'Cât durează un Digital Check-Up?', a: 'Un Digital Check-Up complet durează aproximativ 30 de minute. Include scanarea 3D, radiografia și consultația personalizată.' },
  { q: 'Este dureros?', a: 'Nu. Digital Check-Up este complet non-invaziv. Scanarea 3D se face cu un scanner intraoral mic, fără paste sau disconfort.' },
  { q: 'Ce include prețul?', a: 'Prețul include scanarea digitală 3D, radiografia CBCT, evaluarea completă de către specialist și planul de tratament personalizat.' },
  { q: 'Cum mă pot programa?', a: 'Poți suna la +373 22 881 414, completa formularul de pe site, sau vizita direct clinica din str. Ismail 88, Chișinău.' },
  { q: 'Pot vedea rezultatul Smile Design înainte de tratament?', a: 'Da! Prin tehnologia Digital Smile Design, poți vizualiza rezultatul final al zâmbetului tău înainte de a începe orice procedură.' },
]

function Faq() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="bg-white py-20 px-12">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-12">
          <SectionBadge>Întrebări frecvente</SectionBadge>
          <h2 className="font-display text-[34px] font-semibold text-sdt-900 tracking-[-0.03em] m-0">
            Tot ce trebuie să știi
          </h2>
        </div>
        {FAQS.map((f, i) => (
          <div key={i} className="border-b border-sdt-600/10">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full bg-transparent border-none cursor-pointer py-5 flex justify-between items-center font-sans"
            >
              <span className="text-[15px] font-semibold text-sdt-900 text-left">{f.q}</span>
              <span
                className={cn(
                  'text-xl text-sdt-600 font-light transition-transform duration-200',
                  open === i && 'rotate-45'
                )}
              >
                +
              </span>
            </button>
            <div
              className={cn(
                'overflow-hidden transition-[max-height] duration-300 ease-in-out',
                open === i ? 'max-h-[200px]' : 'max-h-0'
              )}
            >
              <p className="text-sm leading-[1.7] text-[#5a7a6e] mb-5 pr-10">{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Appointment Form ─── */
function AppointmentForm() {
  return (
    <section className="bg-sdt-50 py-20 px-12">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 gap-[60px] items-center">
        <div>
          <SectionBadge>Programare</SectionBadge>
          <h2 className="font-display text-[34px] font-semibold text-sdt-900 mb-3.5 tracking-[-0.02em] leading-[1.1]">
            Programează-ți<br /><span className="text-pink-500">Digital Check-Up</span>
          </h2>
          <p className="text-sm leading-[1.7] text-[#5a7a6e] mb-7 max-w-[400px]">
            Completează formularul și te contactăm în 24h pentru confirmare. Fără obligații, fără surprize.
          </p>
          <div className="flex flex-col gap-3.5">
            {[
              { icon: CheckCircle, text: 'Confirmare în max. 24h' },
              { icon: Clock, text: 'Durată: ~30 minute' },
              { icon: Heart, text: 'Fără durere, 100% digital' },
              { icon: Banknote, text: 'Prețuri transparente' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <Icon className="w-[18px] h-[18px] text-sdt-600" strokeWidth={1.8} />
                <span className="text-sm text-sdt-900 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <Card className="p-8 shadow-[0_8px_32px_rgba(10,107,92,0.1)]">
          <CardContent className="p-0 space-y-3.5">
            <div className="grid grid-cols-2 gap-3.5">
              <Input placeholder="Prenume" />
              <Input placeholder="Nume" />
            </div>
            <Input placeholder="Telefon *" type="tel" />
            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-muted-foreground">
              <option>Selectează locația</option>
              {LOCATIONS.map((l) => (
                <option key={l.city}>{l.city} — {l.address}</option>
              ))}
            </select>
            <Button variant="accent" className="w-full text-[15px] font-bold h-auto py-3.5">
              Trimite cererea →
            </Button>
            <p className="text-[11px] text-[#5a7a6e] text-center mt-3">
              Prin trimitere ești de acord cu <span className="text-sdt-600 cursor-pointer">Politica de confidențialitate</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="bg-sdt-900 pt-14 pb-8 px-12">
      <div className="max-w-[1200px] mx-auto grid grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-10 mb-10">
        <div>
          <Logo height={32} light />
          <p className="text-[13px] text-white/[.45] mt-4 leading-[1.7] max-w-[260px]">
            Clinică stomatologică digitală. {STATS.years} ani de excelență, {STATS.team} specialiști, {STATS.patients} pacienți.
          </p>
          <div className="font-display text-base font-semibold text-pink-500 mt-4">{CAMPAIGN_2026.slogan}</div>
        </div>
        <div>
          <div className="text-[11px] font-bold text-white tracking-[.15em] uppercase mb-[18px]">Servicii</div>
          {['Digital Check-Up', 'Estetică & Smile Design', 'Terapie & Profilaxie', 'Chirurgie Orală', 'Implantologie 3D', 'Protetică CAD/CAM', 'Ortodonție Digitală'].map((s) => (
            <div key={s} className="text-[13px] mb-[9px] text-white/50 cursor-pointer">{s}</div>
          ))}
        </div>
        <div>
          <div className="text-[11px] font-bold text-white tracking-[.15em] uppercase mb-[18px]">Clinică</div>
          {[['Despre noi', '/'], ['Echipa', '/echipa'], ['Ambasadori', '/ambasadori'], ['Tehnologii', '/'], ['Blog', '/'], ['Contacte', '/']].map(([s, h]) => (
            <a key={s} href={h} className="block text-[13px] mb-[9px] text-white/50 no-underline">{s}</a>
          ))}
        </div>
        <div>
          <div className="text-[11px] font-bold text-white tracking-[.15em] uppercase mb-[18px]">Contact</div>
          {LOCATIONS.slice(0, 2).map((l) => (
            <div key={l.city} className="mb-3.5">
              <div className="text-[13px] font-semibold text-white">{l.city}</div>
              <div className="text-xs text-white/[.45]">{l.address}</div>
              <div className="text-xs text-white/[.45]">{l.phone}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/[.07] pt-5 flex justify-between items-center">
        <div className="flex items-center gap-3.5">
          <Logo height={22} light />
          <span className="text-[11px] text-white/25">&copy; {CAMPAIGN_2026.year} Smile Dent Team. Toate drepturile rezervate.</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            {['RO', 'RU', 'EN'].map((l) => (
              <span key={l} className="bg-white/[.08] text-white/50 px-2 py-[3px] rounded-full text-[10px] font-bold cursor-pointer">{l}</span>
            ))}
          </div>
          <div className="flex gap-4 text-[11px] text-white/25">
            {['Confidențialitate', 'Termeni', 'Cookies'].map((s) => (
              <span key={s} className="cursor-pointer">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── Main Export ─── */
export function DigitalCheckupPage() {
  return (
    <>
      <style>{ANIM}</style>
      <Nav />
      <Hero />
      <Benefits />
      <Process />
      <DcuStats />
      <WhenNeeded />
      <DcuTestimonials />
      <WhatYouGet />
      <CtaStrip />
      <Faq />
      <AppointmentForm />
      <Footer />
    </>
  )
}

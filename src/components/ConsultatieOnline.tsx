'use client'
import { useState } from 'react'
import { BRAND as B, STATS, LOCATIONS, CAMPAIGN_2026, DIASPORA, SERVICES } from '@/lib/brand'
import { Logo } from './Logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Play, Check, MapPin, Clock, Phone, ArrowRight, Video, Upload, Globe } from 'lucide-react'

/* ─── Animations ─────────────────────────── */
const ANIM = `
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes orbit{from{transform:rotate(0deg) translateX(var(--r)) rotate(0deg)}to{transform:rotate(360deg) translateX(var(--r)) rotate(-360deg)}}
  @keyframes pulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}
`

/* ─── Shared UI ──────────────────────────── */
function SectionBadge({ children, light }: { children: string; light?: boolean }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'mb-4 gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.12em]',
        light
          ? 'border-white/20 bg-white/[.12] text-white'
          : 'border-sdt-600/10 bg-sdt-50 text-sdt-600'
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', light ? 'bg-white' : 'bg-sdt-600')} />
      {children}
    </Badge>
  )
}

/* ─── Nav ─────────────────────────────────── */
function Nav() {
  return (
    <nav
      className="sticky top-0 z-[100] flex items-center justify-between border-b border-sdt-600/10 bg-white px-12 py-3.5"
      style={{ borderTop: `3px solid ${B.a}` }}
    >
      <a href="/" className="no-underline"><Logo height={36} /></a>
      <div className="flex items-center gap-7">
        {[['Servicii', '/servicii'], ['Digital Check-Up', '/digital-checkup'], ['Consultație Online', '/consultatie-online'], ['Echipa', '/echipa'], ['Recenzii', '/recenzii']].map(([l, h]) => (
          <a
            key={l}
            href={h}
            className={cn(
              'relative text-sm no-underline pb-1',
              l === 'Consultație Online' ? 'font-bold text-sdt-600' : 'font-medium text-[#3a5a50]'
            )}
          >
            {l}
            {l === 'Consultație Online' && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-5 rounded-full bg-pink-500" />}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-2.5">
        <a href="/login" className="no-underline">
          <Button variant="outline" size="sm" className="border-sdt-600 text-sdt-600 text-[13px] font-semibold">
            Cabinetul meu
          </Button>
        </a>
        <Button variant="accent" size="sm" className="text-[13px] font-bold">
          Programează-te
        </Button>
      </div>
    </nav>
  )
}

/* ─── All world flags for globe effect ──── */
const FLAGS = ['🇩🇪', '🇫🇷', '🇬🇧', '🇺🇸', '🇪🇸', '🇮🇹', '🇵🇹', '🇷🇴', '🇦🇹', '🇧🇪', '🇳🇱', '🇸🇪', '🇨🇭', '🇮🇪', '🇨🇦', '🇦🇺', '🇮🇱', '🇬🇷', '🇨🇿', '🇩🇰', '🇳🇴', '🇫🇮', '🇵🇱', '🇭🇺', '🇹🇷', '🇯🇵', '🇰🇷', '🇧🇷', '🇦🇷', '🇲🇽']

/* ─── Hero ──────────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${B.nv} 0%, #0f2e24 50%, ${B.pd} 100%)` }}>
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 items-center gap-10 px-12 pb-16 pt-[72px]">
        <div>
          <SectionBadge light>Pentru diaspora</SectionBadge>
          <h1 className="font-display mb-[18px] text-[44px] font-semibold leading-[1.08] tracking-tight text-white">
            Ești în <span className="text-pink-500">străinătate</span>?<br />Începe cu o consultație online.
          </h1>
          <p className="mb-7 max-w-[440px] text-base leading-relaxed text-white/[.65]">
            Discutăm la distanță, îți oferim un plan clar și personalizat, iar tu vii pregătit la prima vizită. Fără surprize, fără pierdere de timp.
          </p>
          <div className="flex gap-3.5">
            <Button variant="accent" className="gap-2 px-8 py-3.5 text-[15px] font-bold">
              Programează consultație <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="border-white/30 bg-transparent px-8 py-3.5 text-[15px] font-bold text-white hover:bg-white/10">
              Cum funcționează <span className="ml-1">↓</span>
            </Button>
          </div>
        </div>
        {/* Right — Globe with floating flags */}
        <div className="relative flex h-[400px] items-center justify-center">
          {/* Orbiting rings */}
          {[140, 190, 240].map((r, ri) => (
            <div
              key={ri}
              className="absolute rounded-full border border-white/[.06]"
              style={{ width: r * 2, height: r * 2 }}
            />
          ))}
          {/* Floating flags in orbits */}
          {FLAGS.map((flag, i) => {
            const orbit = [140, 190, 240][i % 3]
            const duration = 20 + (i % 5) * 8
            const delay = -(i * 1.2)
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  fontSize: i < 10 ? 22 : 16,
                  animation: `orbit ${duration}s ${delay}s linear infinite`,
                  ['--r' as string]: `${orbit}px`,
                  opacity: i < 15 ? 0.8 : 0.4,
                }}
              >{flag}</div>
            )
          })}
          {/* Center — stat bubble */}
          <div
            className="z-[2] flex h-40 w-40 flex-col items-center justify-center rounded-full"
            style={{
              background: `radial-gradient(circle, ${B.a}33 0%, ${B.a}11 60%, transparent 70%)`,
              border: `2px solid ${B.a}44`,
              animation: 'pulse 3s ease-in-out infinite',
            }}
          >
            <div className="font-display text-[32px] font-semibold leading-none text-pink-500">455K+</div>
            <div className="mt-1 text-center text-[11px] leading-tight text-white/60">moldoveni<br />în diasporă</div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Process ──────────────────────────── */
const STEPS = [
  { num: '01', title: 'Trimite tomografia', desc: 'Încarcă radiografia panoramică sau CBCT prin formularul nostru securizat. Dacă nu ai — te ghidăm unde poți face.' },
  { num: '02', title: 'Consultație video', desc: 'Medicul analizează imaginile și discutați 1:1 prin video call. Primești explicații clare despre situația ta.' },
  { num: '03', title: 'Plan de tratament', desc: 'Primești un plan personalizat cu opțiuni, etape, durată și costuri. Totul transparent, fără surprize.' },
  { num: '04', title: 'Vii pregătit', desc: 'Când ajungi acasă, totul este deja planificat. Economisești timp și începi tratamentul imediat.' },
]

function Process() {
  return (
    <section className="bg-white px-12 py-[72px]">
      <div className="mx-auto max-w-[1200px]">
        <SectionBadge>Cum funcționează</SectionBadge>
        <h2 className="font-display mb-9 text-[34px] font-semibold tracking-tight text-[#0a1e18]">
          4 pași simpli către <span className="text-sdt-600">tratamentul tău</span>
        </h2>
        <div className="grid grid-cols-2 items-start gap-10">
          {/* Left — Video */}
          <div
            className="relative h-[420px] cursor-pointer overflow-hidden rounded-[18px]"
            style={{ background: `linear-gradient(160deg, ${B.nv}, #0f2e24)` }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-pink-500 transition-transform hover:scale-105">
                <Play className="h-7 w-7 fill-white text-white" />
              </div>
            </div>
            <div className="absolute bottom-5 left-5 right-5">
              <div className="text-sm font-bold text-white">Cum funcționează Consultația Online?</div>
              <div className="mt-1 text-xs text-white/50">2:30 min · Explicat de echipa SDT</div>
            </div>
          </div>
          {/* Right — Steps */}
          <div className="flex flex-col gap-[18px]">
            {STEPS.map((s, i) => (
              <div
                key={s.num}
                className={cn(
                  'flex items-start gap-4 rounded-[14px] border px-5 py-[18px] transition-all',
                  i === 0
                    ? 'border-sdt-600/20 bg-sdt-50'
                    : 'border-sdt-600/10 bg-white'
                )}
              >
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px]"
                  style={{
                    background: i === 0 ? `linear-gradient(135deg, ${B.p}, ${B.pm})` : B.pl,
                  }}
                >
                  <span className={cn('text-sm font-extrabold', i === 0 ? 'text-white' : 'text-sdt-600')}>{s.num}</span>
                </div>
                <div>
                  <h3 className="font-display mb-1 text-base font-medium text-[#0a1e18]">{s.title}</h3>
                  <p className="m-0 text-[13px] leading-relaxed text-[#5a7a6e]">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Journey Timeline ────────────────────── */
const JOURNEY = [
  { step: '01', title: 'Decizi să acționezi', desc: 'Ai o problemă dentară sau vrei un zâmbet nou. Completezi formularul online sau ne scrii pe WhatsApp.', detail: ['Formularul durează 2 minute', 'Nu ai nevoie de tomografie încă', 'Echipa te contactează în max. 24h'], photo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop', side: 'left' },
  { step: '02', title: 'Trimiti documentele', desc: 'Încarcă tomografia panoramică (dacă ai) și fotografii ale danturii. Dacă nu ai tomografie — te ghidăm unde poți face una în orașul tău.', detail: ['Acceptăm CBCT, OPG, fotografii intra-orale', 'Upload securizat pe platforma noastră', 'Dacă nu ai — te direcționăm la un centru din orașul tău'], photo: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop', side: 'right' },
  { step: '03', title: 'Consultație video 1:1', desc: 'Medicul specialist analizează documentele și discutați pe video call. Primești explicații clare, vizuale, despre situația ta.', detail: ['Durată: 20-30 minute', 'Folosim screen sharing pentru a-ți arăta imaginile', 'Poți pune orice întrebare — fără grabă'], photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=300&fit=crop', side: 'left' },
  { step: '04', title: 'Primești planul complet', desc: 'În 48h primești un document detaliat: diagnostic, opțiuni de tratament, etape, durată estimată și costuri exacte.', detail: ['Plan PDF profesional cu toate detaliile', '2-3 opțiuni de tratament cu costuri', 'Informații despre Rate 0% dacă e cazul', 'Fără costuri ascunse — prețul final = prețul din plan'], photo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop', side: 'right' },
  { step: '05', title: 'Programare și pregătire', desc: 'Alegi data vizitei. Echipa pregătește totul: materiale, laborator, programări consecutive — pentru a economisi maximum de timp.', detail: ['Programare în funcție de zborul tău', 'Tratamente consecutive — minim vizite', 'Coordonator personal dedicat'], photo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop', side: 'left' },
  { step: '06', title: 'Vii și zâmbești', desc: 'Când ajungi la clinică, totul este pregătit. Începi tratamentul imediat, fără așteptare, fără surprize. Pleci cu un zâmbet nou.', detail: ['Transfer aeroport disponibil', 'Totul pregătit — start imediat', 'Rezultat conform planului aprobat', 'Suport post-tratament la distanță'], photo: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=500&h=300&fit=crop', side: 'right' },
]

function JourneyTimeline() {
  return (
    <section className="bg-sdt-50 px-12 py-16">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-9 text-center">
          <SectionBadge>Călătoria ta</SectionBadge>
          <h2 className="font-display mb-2 text-[32px] font-semibold tracking-tight text-[#0a1e18]">
            Ce se întâmplă <span className="text-pink-500">pas cu pas</span>?
          </h2>
          <p className="mx-auto max-w-[460px] text-sm text-[#5a7a6e]">
            De la decizie la zâmbet — fiecare etapă explicată clar.
          </p>
        </div>

        {/* Compact timeline — 2 columns, 3 rows */}
        <div className="grid grid-cols-2 gap-3.5">
          {JOURNEY.map((j) => (
            <Card
              key={j.step}
              className="grid grid-cols-[120px_1fr] overflow-hidden rounded-[14px] border-sdt-600/10 shadow-none transition-all hover:border-pink-500 hover:shadow-md"
            >
              {/* Photo */}
              <div className="relative">
                <img src={j.photo} alt={j.title} className="h-full min-h-[140px] w-full object-cover" />
                <div className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-pink-500 shadow-md">
                  <span className="text-[11px] font-extrabold text-white">{j.step}</span>
                </div>
              </div>
              {/* Content */}
              <CardContent className="p-3.5 pt-3.5">
                <h3 className="font-display mb-1 text-[15px] font-medium text-[#0a1e18]">{j.title}</h3>
                <p className="mb-2 text-xs leading-snug text-[#5a7a6e]">{j.desc}</p>
                <div className="flex flex-col gap-[3px]">
                  {j.detail.slice(0, 2).map(d => (
                    <div key={d} className="flex items-center gap-[5px]">
                      <Check className="h-2.5 w-2.5 shrink-0 text-pink-500" strokeWidth={3} />
                      <span className="text-[11px] font-medium text-[#0a1e18]">{d}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-7 text-center">
          <Button variant="accent" className="gap-2 px-9 py-3.5 text-[15px] font-bold">
            Începe călătoria ta <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

/* ─── Benefits ─────────────────────────── */
function Benefits() {
  const items = [
    { icon: Globe, title: 'De acasă', desc: 'Consultație video de oriunde din lume. Nu contează fusul orar.' },
    { icon: Clock, title: 'Rapid', desc: 'Consultația durează 20-30 min. Primești planul în 48h.' },
    { icon: Check, title: 'Plan complet', desc: 'Diagnostic, opțiuni, costuri, etape — totul înainte de a ajunge la clinică.' },
    { icon: MapPin, title: 'Prețuri clare', desc: 'Știi exact cât costă înainte de a lua orice decizie.' },
  ]
  return (
    <section className="bg-sdt-50 px-12 py-[72px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 text-center">
          <SectionBadge>De ce online</SectionBadge>
          <h2 className="font-display text-[36px] font-semibold tracking-tight text-[#0a1e18]">
            Avantajele consultației <span className="text-sdt-600">online</span>
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-5">
          {items.map(b => (
            <Card
              key={b.title}
              className="rounded-[14px] border-sdt-600/10 bg-white p-7 shadow-none transition-all hover:-translate-y-[3px] hover:shadow-lg"
            >
              <CardContent className="p-0">
                <div className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-xl bg-sdt-100">
                  <b.icon className="h-5 w-5 text-sdt-600" strokeWidth={1.8} />
                </div>
                <h3 className="font-display mb-1.5 text-base font-medium text-[#0a1e18]">{b.title}</h3>
                <p className="m-0 text-[13px] leading-relaxed text-[#5a7a6e]">{b.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA Strip ──────────────────────────── */
function CtaStrip() {
  return (
    <section className="px-12 py-14" style={{ background: `linear-gradient(135deg, ${B.p}, ${B.pm})` }}>
      <div className="mx-auto max-w-[900px] text-center">
        <h2 className="font-display mb-3 text-[32px] font-semibold text-white">
          Oriunde ai fi. În fiecare țară. Alege-te pe tine.
        </h2>
        <p className="mx-auto mb-7 max-w-[480px] text-[15px] text-white/70">
          Sănătatea nu are sezon. Programează o consultație online și pregătește-ți vizita acasă.
        </p>
        <Button variant="accent" className="gap-2 px-9 py-4 text-base font-bold">
          Programează consultație online <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}

/* ─── Diaspora Testimonials ──────────────── */
function DiasporaTestimonials() {
  const testimonials = [
    { text: 'Am planificat totul din Berlin. Când am ajuns la Chișinău, am început tratamentul imediat. Zero pierdere de timp.', author: 'Andrei K.', country: 'Germania 🇩🇪', service: 'Implant Dentar', rating: 5 },
    { text: 'Consultația video a fost exactă și profesionistă. Am primit planul în 24h cu toate costurile clare.', author: 'Elena M.', country: 'UK 🇬🇧', service: 'Coroane Dentare', rating: 5 },
    { text: 'Din Paris am trimis tomografia, am discutat pe video, iar când am venit acasă totul era pregătit.', author: 'Ion C.', country: 'Franța 🇫🇷', service: 'All-On-4', rating: 5 },
    { text: 'Cel mai bun serviciu pe care l-am întâlnit. Comunicare excelentă, totul transparent.', author: 'Maria D.', country: 'SUA 🇺🇸', service: 'Fațete Dentare', rating: 5 },
    { text: 'Am economisit 2 săptămâni de concediu. Totul a fost planificat înainte să ajung.', author: 'Cristina R.', country: 'Spania 🇪🇸', service: 'Digital Check-Up', rating: 5 },
  ]
  return (
    <section className="bg-sdt-50 px-12 py-[72px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <SectionBadge>Feedback din diasporă</SectionBadge>
            <h2 className="font-display text-[32px] font-semibold text-[#0a1e18]">
              Pacienți din <span className="text-sdt-600">toată lumea</span>
            </h2>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="font-display text-[22px] font-semibold text-sdt-600">4.9</div>
            <div className="text-xs text-[#fbb040]">★★★★★</div>
            <div className="text-[11px] text-[#5a7a6e]">Google</div>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {testimonials.map((t, i) => (
            <Card
              key={i}
              className="min-w-[300px] shrink-0 rounded-2xl border-sdt-600/10 border-t-[3px] border-t-sdt-600 p-6 shadow-none"
            >
              <CardContent className="p-0">
                <div className="mb-3 flex items-center justify-between">
                  <Badge variant="outline" className="border-transparent bg-sdt-100 text-[11px] font-semibold text-sdt-600">
                    {t.country}
                  </Badge>
                  <div className="text-[11px] text-[#fbb040]">{'★'.repeat(t.rating)}</div>
                </div>
                <p className="mb-3.5 text-sm italic leading-relaxed text-[#0a1e18]">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div className="text-[13px] font-bold text-[#0a1e18]">— {t.author}</div>
                  <span className="text-[10px] text-[#5a7a6e]">{t.service}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Video Reels ────────────────────────── */
function VideoReels() {
  const videos = [
    { name: 'Andrei din Berlin', service: 'Implant Dentar', flag: '🇩🇪' },
    { name: 'Elena din Londra', service: 'Coroane Dentare', flag: '🇬🇧' },
    { name: 'Ion din Paris', service: 'All-On-4', flag: '🇫🇷' },
    { name: 'Maria din New York', service: 'Fațete', flag: '🇺🇸' },
    { name: 'Cristina din Madrid', service: 'Digital Check-Up', flag: '🇪🇸' },
  ]
  return (
    <section className="bg-white px-12 py-[72px]">
      <div className="mx-auto max-w-[1200px]">
        <SectionBadge>Video testimoniale</SectionBadge>
        <h2 className="font-display mb-7 text-[32px] font-semibold text-[#0a1e18]">
          Povești <span className="text-pink-500">reale</span> din diasporă
        </h2>
        <div className="flex gap-3.5 overflow-x-auto pb-2">
          {videos.map((v, i) => (
            <div
              key={i}
              className="relative h-[350px] w-[200px] shrink-0 cursor-pointer overflow-hidden rounded-[18px] transition-transform hover:-translate-y-1"
              style={{ background: `linear-gradient(160deg, ${B.nv}, #0f2e24)` }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-pink-500">
                  <Play className="h-5 w-5 fill-white text-white" />
                </div>
              </div>
              <div className="absolute left-3 top-3">
                <span className="text-2xl">{v.flag}</span>
              </div>
              <div className="absolute right-3 top-3">
                <Video className="h-3.5 w-3.5 text-white/40" strokeWidth={2} />
              </div>
              <div className="absolute bottom-4 left-3.5 right-3.5">
                <div className="text-[13px] font-bold text-white">{v.name}</div>
                <div className="mt-0.5 text-[10px] text-white/50">{v.service}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Why choose section ─────────────────── */
function WhyChoose() {
  const reasons = [
    { num: '01', title: 'Zero timp pierdut', desc: 'Planifici totul de acasă. Când ajungi — tratamentul începe imediat.' },
    { num: '02', title: 'Prețuri transparente', desc: 'Știi exact cât costă înainte de a lua avionul. Fără costuri ascunse.' },
    { num: '03', title: 'Calitate europeană', desc: 'Aceleași tehnologii 3D și materiale ca în clinicile din Germania sau Elveția.' },
    { num: '04', title: 'Echipă dedicată', desc: 'Un coordonator personal care te ghidează din momentul consultației până la finalizare.' },
    { num: '05', title: 'Rate 0%', desc: 'Planuri de finanțare flexibile pentru tratamente complexe. Fără dobândă.' },
    { num: '06', title: 'Garanție pe viață', desc: 'Pe implanturi și structuri protetice. Revii oricând pentru control gratuit.' },
  ]
  return (
    <section className="px-12 py-[72px]" style={{ background: `linear-gradient(160deg, ${B.nv}, #0f2e24)` }}>
      <div className="mx-auto max-w-[1200px]">
        <SectionBadge light>De ce Smile Dent Team</SectionBadge>
        <h2 className="font-display mb-9 text-[32px] font-semibold text-white">
          6 motive să alegi <span className="text-pink-500">SDT</span>
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {reasons.map(r => (
            <div key={r.num} className="rounded-[14px] border border-white/[.08] bg-white/5 p-6">
              <span className="font-display text-[28px] font-semibold text-white/10">{r.num}</span>
              <h3 className="font-display my-1.5 text-base font-medium text-white">{r.title}</h3>
              <p className="m-0 text-[13px] leading-relaxed text-white/[.55]">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Appointment Form ───────────────────── */
function AppointmentForm() {
  return (
    <section className="bg-white px-12 py-[72px]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 items-center gap-14">
        <div>
          <SectionBadge>Programare online</SectionBadge>
          <h2 className="font-display mb-3.5 text-[32px] font-semibold leading-[1.1] text-[#0a1e18]">
            Completează formularul<br /><span className="text-pink-500">și te contactăm</span>
          </h2>
          <p className="mb-6 max-w-[400px] text-sm leading-relaxed text-[#5a7a6e]">
            Te sunăm în max. 24h pentru a stabili data și ora consultației video. Ai nevoie doar de o radiografie panoramică.
          </p>
          <div className="flex flex-col gap-3">
            {['Consultație video 1:1 cu specialistul', 'Analiză completă a radiografiei', 'Plan de tratament detaliat cu costuri', 'Programare prioritară la sosire'].map(t => (
              <div key={t} className="flex items-center gap-2.5">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sdt-100">
                  <Check className="h-[11px] w-[11px] text-sdt-600" strokeWidth={3} />
                </div>
                <span className="text-[13px] font-medium text-[#0a1e18]">{t}</span>
              </div>
            ))}
          </div>
        </div>
        <Card className="rounded-2xl border-sdt-600/10 bg-sdt-50 p-7 shadow-lg shadow-sdt-600/5">
          <CardContent className="space-y-3 p-0">
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Prenume" />
              <Input placeholder="Nume" />
            </div>
            <Input placeholder="Telefon *" type="tel" />
            <Input placeholder="Email *" type="email" />
            <select
              defaultValue=""
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="" disabled>Țara în care locuiești</option>
              {DIASPORA.map(d => <option key={d.country}>{d.flag} {d.country}</option>)}
              <option>Altă țară</option>
            </select>
            <select
              defaultValue=""
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="" disabled>Serviciul dorit</option>
              {SERVICES.map(s => <option key={s.slug}>{s.name}</option>)}
            </select>
            <textarea
              placeholder="Descrie pe scurt problemele tale dentare"
              rows={3}
              className="flex w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <div className="cursor-pointer rounded-lg border border-dashed border-sdt-600 bg-sdt-100 p-3.5 text-center">
              <Upload className="mx-auto mb-1 h-5 w-5 text-sdt-600" strokeWidth={1.8} />
              <div className="text-xs font-semibold text-sdt-600">Încarcă radiografia panoramică</div>
              <div className="text-[10px] text-[#5a7a6e]">JPG, PNG sau DICOM — max 10MB</div>
            </div>
            <Button variant="accent" className="w-full gap-2 py-3.5 text-[15px] font-bold">
              Trimite cererea <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="text-center text-[11px] text-[#5a7a6e]">
              Prin trimitere ești de acord cu <span className="cursor-pointer text-sdt-600">Politica de confidențialitate</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

/* ─── Footer ─────────────────────────────── */
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
            {SERVICES.map(s => (
              <div key={s.slug} className="text-[13px] mb-2.5 text-white/[.58] cursor-pointer hover:text-white transition-colors">{s.name}</div>
            ))}
          </div>
          <div>
            <div className="text-[11px] font-bold text-white tracking-[.15em] uppercase mb-5">Clinica</div>
            {[['Despre noi','/despre-noi'],['Echipa','/echipa'],['Ambasadori','/ambasadori'],['Tehnologii','/tehnologii'],['Blog','/'],['Cariere','/'],['Contacte','/']].map(([s,h]) => (
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

/* ─── Main Export ─────────────────────────── */
export function ConsultatieOnlinePage() {
  return (
    <>
      <style>{ANIM}</style>
      <Nav />
      <Hero />
      <Process />
      <JourneyTimeline />
      <Benefits />
      <DiasporaTestimonials />
      <VideoReels />
      <WhyChoose />
      <CtaStrip />
      <AppointmentForm />
      <Footer />
    </>
  )
}

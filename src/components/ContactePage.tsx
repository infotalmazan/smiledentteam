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
  ArrowRight, MapPin, Phone, Mail, Clock, Globe,
  CheckCircle, MessageCircle, Send, Building2,
  Navigation, Calendar, ChevronDown, ChevronUp,
  Instagram, Facebook, Youtube, ExternalLink
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
          <a key={l} href={h} className="relative text-sm no-underline pb-1 font-medium text-[#3a5a50]">{l}</a>
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

/* ─── Animations ──────────────────────────── */
const ANIM_CONTACT = `
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes ping-slow { 0% { transform: scale(1); opacity: .7; } 100% { transform: scale(2); opacity: 0; } }
`

/* ─── Extended Locations Data ─────────────── */
const LOCATIONS_FULL = [
  {
    city: 'Chisinau, Centru',
    address: 'str. Ismail 88',
    phone: '+373 22 881 414',
    email: 'centru@smiledent.md',
    hours: 'Lun-Vin 08:00-20:00 · Sam 09:00-14:00',
    mapUrl: 'https://maps.google.com/?q=Ismail+88+Chisinau',
    photo: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=500&h=300&fit=crop',
    features: ['Sediul central', 'Toate serviciile', 'Parcare gratuita'],
    country: 'Moldova',
    flag: '\ud83c\uddf2\ud83c\udde9',
  },
  {
    city: 'Chisinau, Rascani',
    address: 'Bd. Moscova 17/A',
    phone: '+373 22 011 061',
    email: 'rascani@smiledent.md',
    hours: 'Lun-Vin 08:00-20:00 · Sam 09:00-14:00',
    mapUrl: 'https://maps.google.com/?q=Moscova+17A+Chisinau',
    photo: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=500&h=300&fit=crop',
    features: ['Ortodontie', 'Protetica', 'Estetica'],
    country: 'Moldova',
    flag: '\ud83c\uddf2\ud83c\udde9',
  },
  {
    city: 'Chisinau, Botanica',
    address: 'Bd. Dacia 44',
    phone: '+373 22 881 414',
    email: 'botanica@smiledent.md',
    hours: 'Lun-Vin 08:00-20:00 · Sam 09:00-14:00',
    mapUrl: 'https://maps.google.com/?q=Dacia+44+Chisinau',
    photo: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&h=300&fit=crop',
    features: ['Implantologie', 'Chirurgie', 'Terapie'],
    country: 'Moldova',
    flag: '\ud83c\uddf2\ud83c\udde9',
  },
  {
    city: 'Iasi, Romania',
    address: 'str. Arcu 18',
    phone: '+40 33 240 2505',
    email: 'iasi@smiledent.md',
    hours: 'Lun-Vin 09:00-19:00 · Sam 09:00-14:00',
    mapUrl: 'https://maps.google.com/?q=Arcu+18+Iasi',
    photo: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=500&h=300&fit=crop',
    features: ['Implantologie', 'Protetica', 'Digital Check-Up'],
    country: 'Romania',
    flag: '\ud83c\uddf7\ud83c\uddf4',
  },
  {
    city: 'Bucuresti, Romania',
    address: 'str. G. Puccini 8A',
    phone: '+40 31 433 7004',
    email: 'bucuresti@smiledent.md',
    hours: 'Lun-Vin 09:00-19:00 · Sam 09:00-14:00',
    mapUrl: 'https://maps.google.com/?q=Puccini+8A+Bucuresti',
    photo: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=500&h=300&fit=crop',
    features: ['Toate serviciile', 'Consultatie Online', 'Parcare'],
    country: 'Romania',
    flag: '\ud83c\uddf7\ud83c\uddf4',
  },
]

/* ─── Contact Methods ─────────────────────── */
const CONTACT_METHODS = [
  { icon: Phone, title: 'Telefon', desc: 'Suna-ne direct la orice filiala', value: '+373 22 881 414', action: 'tel:+37322881414', label: 'Apeleaza acum' },
  { icon: MessageCircle, title: 'WhatsApp', desc: 'Scrie-ne pe WhatsApp 24/7', value: '+373 69 123 456', action: 'https://wa.me/37369123456', label: 'Deschide WhatsApp' },
  { icon: Mail, title: 'Email', desc: 'Raspundem in maxim 2 ore', value: 'info@smiledent.md', action: 'mailto:info@smiledent.md', label: 'Trimite email' },
  { icon: Calendar, title: 'Programare Online', desc: 'Formular rapid, confirmare in 24h', value: 'smiledent.md/programare', action: '/#appointment', label: 'Programeaza-te' },
]

/* ─── Social Media ────────────────────────── */
const SOCIALS = [
  { icon: Facebook, name: 'Facebook', handle: '@SmileDentTeam', url: 'https://facebook.com/smiledentteam', followers: '45K' },
  { icon: Instagram, name: 'Instagram', handle: '@smiledentteam', url: 'https://instagram.com/smiledentteam', followers: '32K' },
  { icon: Youtube, name: 'YouTube', handle: 'Smile Dent Team', url: 'https://youtube.com/smiledentteam', followers: '12K' },
]

/* ─── FAQ ─────────────────────────────────── */
const FAQ = [
  { q: 'Care este programul de lucru?', a: 'Clinicile din Chisinau sunt deschise Luni-Vineri 08:00-20:00 si Sambata 09:00-14:00. Filialele din Romania: Luni-Vineri 09:00-19:00, Sambata 09:00-14:00. Duminica — inchis.' },
  { q: 'Cum ajung la clinica din Centru?', a: 'Clinica centrala se afla pe str. Ismail 88, la 5 minute de Piata Centrala. Parcare gratuita disponibila in curtea clinicii. Transport public: troleibuzele 1, 4, 22.' },
  { q: 'Pot programa o consultatie online?', a: 'Da! Prin formularul de pe site, prin WhatsApp (+373 69 123 456), telefonic la orice filiala sau prin pagina Consultatie Online pentru pacienti din diaspora.' },
  { q: 'Raspundeti in weekend?', a: 'Sambata lucram 09:00-14:00 in toate filialele. Duminica, puteti lasa un mesaj pe WhatsApp sau email — raspundem luni dimineata.' },
  { q: 'Aveti parcare la clinici?', a: 'Da, clinica din Centru (Ismail 88) si Bucuresti (Puccini 8A) au parcare gratuita. Celelalte filiale au parcari publice in apropiere.' },
]

/* ─── Page Component ─────────────────────── */
export function ContactePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [selectedLoc, setSelectedLoc] = useState(0)

  return (
    <>
      <Nav />
      <style dangerouslySetInnerHTML={{ __html: ANIM_CONTACT }} />

      {/* ━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${B.nv} 0%, #0f2e24 50%, ${B.pd} 100%)` }}>
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 items-center gap-10 px-12 pb-20 pt-[72px]">
          <div>
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[.12] px-3.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
              <span className="text-[11px] font-bold uppercase tracking-[.12em] text-white">Contacte</span>
            </div>
            <h1 className="font-display mb-[18px] text-[44px] font-semibold leading-[1.08] tracking-tight text-white">
              Suntem aici <span className="text-pink-500">pentru tine.</span>
            </h1>
            <p className="mb-7 max-w-[440px] text-base leading-relaxed text-white/[.65]">
              {LOCATIONS_FULL.length} filiale in 2 tari, echipa disponibila 6 zile pe saptamana. Contacteaza-ne prin orice canal — raspundem rapid si cu drag.
            </p>
            <div className="flex gap-3.5">
              <a href="tel:+37322881414" className="no-underline">
                <Button variant="accent" className="gap-2 px-8 py-3.5 text-[15px] font-bold">
                  <Phone className="h-4 w-4" /> Suna acum
                </Button>
              </a>
              <a href="https://wa.me/37369123456" className="no-underline" target="_blank" rel="noopener">
                <Button variant="outline" className="gap-2 border-white/20 px-6 py-3.5 text-[15px] text-white hover:bg-white/10">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </Button>
              </a>
            </div>
            <div className="mt-11 flex gap-8">
              {[['5', 'filiale'], ['2', 'tari'], ['6/7', 'zile deschis'], ['<2h', 'timp raspuns']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-[28px] font-semibold text-pink-500">{n}</div>
                  <div className="mt-0.5 text-xs text-white/[.45]">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Location pins visualization */}
          <div className="relative flex h-[400px] items-center justify-center">
            <div className="relative z-10 w-[100px] h-[100px] rounded-full border-2 border-white/15 bg-white/[.06] backdrop-blur-md flex flex-col items-center justify-center">
              <Globe className="h-8 w-8 text-white/70" strokeWidth={1.5} />
              <span className="mt-1 text-[8px] font-bold text-white/40">2 TARI</span>
            </div>
            {LOCATIONS_FULL.map((loc, i) => {
              const angle = (i * 72) * (Math.PI / 180)
              const r = 140
              return (
                <div key={loc.city} className="absolute cursor-pointer" style={{
                  left: `calc(50% + ${Math.cos(angle) * r}px - 40px)`,
                  top: `calc(50% + ${Math.sin(angle) * r}px - 24px)`,
                  animation: `float ${3 + i * 0.4}s ${i * 0.3}s ease-in-out infinite`,
                }} onClick={() => setSelectedLoc(i)}>
                  <div className={cn(
                    'flex items-center gap-1.5 rounded-xl border px-3 py-2.5 backdrop-blur-sm transition-all',
                    selectedLoc === i ? 'border-pink-500/40 bg-pink-500/15' : 'border-white/10 bg-white/[.06]'
                  )}>
                    <MapPin className={cn('h-3.5 w-3.5', selectedLoc === i ? 'text-pink-400' : 'text-white/50')} strokeWidth={1.5} />
                    <div>
                      <span className="text-[10px] font-semibold text-white/70 whitespace-nowrap block">{loc.city}</span>
                      <span className="text-[8px] text-white/30">{loc.flag}</span>
                    </div>
                  </div>
                  {selectedLoc === i && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-pink-500" style={{ animation: 'ping-slow 1.5s infinite' }} />
                  )}
                </div>
              )
            })}
            <div className="absolute rounded-full border border-white/[.05]" style={{ width: 336, height: 336 }} />
          </div>
        </div>
      </section>

      {/* ━━━ CONTACT METHODS ━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 px-12" style={{ background: B.ps }}>
        <div className="mx-auto max-w-[1200px] grid grid-cols-4 gap-5">
          {CONTACT_METHODS.map((m, i) => (
            <a key={i} href={m.action} className="no-underline" target={m.action.startsWith('http') ? '_blank' : undefined} rel="noopener">
              <Card className="group border-[--bdr] hover:border-sdt-200 transition-all hover:shadow-lg hover:shadow-sdt-500/[.06] h-full cursor-pointer">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform" style={{ background: `${B.p}0D` }}>
                    <m.icon className="w-6 h-6 text-sdt-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-[16px] font-semibold mb-1" style={{ color: B.nv }}>{m.title}</h3>
                  <p className="text-[12px] text-[#5a7a6e] mb-3 flex-1">{m.desc}</p>
                  <div className="text-[13px] font-semibold text-sdt-600 mb-2">{m.value}</div>
                  <div className="text-[11px] font-bold text-pink-500 flex items-center gap-1">
                    {m.label} <ArrowRight className="w-3 h-3" />
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* ━━━ LOCATIONS DETAIL ━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-14">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-pink-500" />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: B.p }}>Filialele noastre</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              5 filiale in <span className="text-pink-500">2 tari</span>
            </h2>
          </div>

          {/* Location tabs */}
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {LOCATIONS_FULL.map((loc, i) => (
              <button key={i} onClick={() => setSelectedLoc(i)}
                className={cn(
                  'px-4 py-2.5 rounded-full text-[12px] font-semibold border transition-all cursor-pointer flex items-center gap-2',
                  selectedLoc === i ? 'bg-sdt-600 text-white border-sdt-600' : 'bg-white text-[#5a7a6e] border-[--bdr] hover:border-sdt-200'
                )}
              >
                <span>{loc.flag}</span> {loc.city}
              </button>
            ))}
          </div>

          {/* Selected location detail */}
          {(() => {
            const loc = LOCATIONS_FULL[selectedLoc]
            return (
              <div className="animate-fadeUp grid grid-cols-2 gap-10 items-start" style={{ animationDuration: '0.3s' }} key={selectedLoc}>
                {/* Left — Photo + Map */}
                <div>
                  <div className="rounded-2xl overflow-hidden h-[280px] mb-4 relative group">
                    <img src={loc.photo} alt={loc.city} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1e18]/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-white/90 text-sdt-700 border-0 text-[11px] font-bold">{loc.country}</Badge>
                    </div>
                  </div>
                  {/* Map placeholder */}
                  <a href={loc.mapUrl} target="_blank" rel="noopener" className="no-underline block rounded-xl overflow-hidden h-[180px] relative group cursor-pointer border border-[--bdr]"
                    style={{ background: `linear-gradient(135deg, ${B.p}08, ${B.ps})` }}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Navigation className="w-8 h-8 text-sdt-500/40 mb-2" strokeWidth={1.5} />
                      <div className="text-sm font-semibold text-sdt-600">Deschide in Google Maps</div>
                      <div className="text-[11px] text-[#5a7a6e] mt-1">{loc.address}, {loc.city}</div>
                    </div>
                    <div className="absolute inset-0 bg-sdt-600/[.03] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>

                {/* Right — Info */}
                <div>
                  <h3 className="font-display text-[28px] font-semibold mb-2" style={{ color: B.nv }}>
                    {loc.flag} {loc.city}
                  </h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3 p-4 rounded-xl border border-[--bdr] bg-white">
                      <MapPin className="w-5 h-5 text-sdt-600 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-[.1em] text-[#5a7a6e] mb-1">Adresa</div>
                        <div className="text-sm font-semibold" style={{ color: B.nv }}>{loc.address}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-xl border border-[--bdr] bg-white">
                      <Phone className="w-5 h-5 text-sdt-600 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-[.1em] text-[#5a7a6e] mb-1">Telefon</div>
                        <a href={`tel:${loc.phone.replace(/\s/g,'')}`} className="text-sm font-semibold text-sdt-600 no-underline">{loc.phone}</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-xl border border-[--bdr] bg-white">
                      <Mail className="w-5 h-5 text-sdt-600 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-[.1em] text-[#5a7a6e] mb-1">Email</div>
                        <a href={`mailto:${loc.email}`} className="text-sm font-semibold text-sdt-600 no-underline">{loc.email}</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-xl border border-[--bdr] bg-white">
                      <Clock className="w-5 h-5 text-sdt-600 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-[.1em] text-[#5a7a6e] mb-1">Program</div>
                        <div className="text-sm font-semibold" style={{ color: B.nv }}>{loc.hours}</div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex gap-2 mb-6">
                    {loc.features.map(f => (
                      <Badge key={f} className="bg-sdt-50 text-sdt-700 border-sdt-200 text-[10px]">{f}</Badge>
                    ))}
                  </div>

                  <a href={`tel:${loc.phone.replace(/\s/g,'')}`} className="no-underline block">
                    <Button variant="accent" className="w-full justify-center gap-2 py-3.5 text-[14px] font-bold">
                      <Phone className="w-4 h-4" /> Suna la aceasta filiala
                    </Button>
                  </a>
                </div>
              </div>
            )
          })()}
        </div>
      </section>

      {/* ━━━ SOCIAL MEDIA ━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 px-12" style={{ background: B.nv }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-10">
            <h2 className="font-display text-[32px] font-semibold tracking-tight text-white">
              Urmareste-ne pe <span className="text-pink-500">social media</span>
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {SOCIALS.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noopener" className="no-underline">
                <div className="p-6 rounded-xl border border-white/[.07] bg-white/[.03] hover:bg-white/[.06] transition-all cursor-pointer flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-white/[.08]">
                    <s.icon className="w-7 h-7 text-white/70" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="text-base font-semibold text-white">{s.name}</div>
                    <div className="text-[12px] text-pink-400">{s.handle}</div>
                    <div className="text-[11px] text-white/40 mt-0.5">{s.followers} followers</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/30" strokeWidth={1.5} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ CONTACT FORM ━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[1200px] grid grid-cols-2 gap-16 items-start">
          {/* Left — Info */}
          <div>
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-pink-500" />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: B.p }}>Scrie-ne</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight leading-[1.1] mb-5" style={{ color: B.nv }}>
              Ai o intrebare?<br/><span className="text-pink-500">Te ascultam.</span>
            </h2>
            <p className="text-[15px] leading-[1.8] text-[#5a7a6e] mb-8">
              Completeaza formularul si echipa noastra iti va raspunde in cel mai scurt timp. Pentru urgente, te rugam sa ne suni direct.
            </p>
            <div className="space-y-4">
              {[
                { icon: Clock, text: 'Timp mediu de raspuns: sub 2 ore' },
                { icon: CheckCircle, text: 'Confirmare programare in 24h' },
                { icon: Globe, text: 'Comunicam in Romana, Rusa si Engleza' },
                { icon: MessageCircle, text: 'WhatsApp disponibil 24/7' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${B.p}0D` }}>
                    <item.icon className="w-4 h-4 text-sdt-600" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm text-[#5a7a6e]">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Central contact */}
            <div className="mt-8 p-5 rounded-xl border border-pink-500/15 bg-pink-500/[.04]">
              <div className="font-display text-lg font-semibold text-pink-500 mb-1">Contact central</div>
              <div className="text-sm text-[#5a7a6e] space-y-1">
                <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-sdt-600" /> +373 22 881 414</div>
                <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-sdt-600" /> info@smiledent.md</div>
                <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-sdt-600" /> str. Ismail 88, Chisinau</div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-white rounded-2xl border border-[--bdr] p-8 shadow-sm">
            <h3 className="font-display text-[20px] font-semibold mb-5" style={{ color: B.nv }}>Formular de contact</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input placeholder="Prenume *" />
              <Input placeholder="Nume *" />
            </div>
            <Input placeholder="Email *" className="mb-4" />
            <Input placeholder="Telefon" className="mb-4" />
            <select defaultValue="" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mb-4">
              <option value="" disabled>Subiect</option>
              <option>Programare consultatie</option>
              <option>Informatii despre servicii</option>
              <option>Informatii despre preturi</option>
              <option>Reclamatie</option>
              <option>Colaborare / Parteneriat</option>
              <option>Altul</option>
            </select>
            <select defaultValue="" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mb-4">
              <option value="" disabled>Filiala preferata</option>
              {LOCATIONS_FULL.map(l => <option key={l.city}>{l.flag} {l.city}</option>)}
            </select>
            <textarea placeholder="Mesajul tau *" rows={4}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm mb-4 resize-none"
            />
            <Button variant="accent" className="w-full justify-center gap-2 py-3.5 text-[15px] font-bold">
              <Send className="w-4 h-4" /> Trimite mesajul
            </Button>
            <p className="text-[11px] text-[#5a7a6e] text-center mt-3">
              Prin trimitere esti de acord cu <span className="text-sdt-600 cursor-pointer">Politica de confidentialitate</span>
            </p>
          </div>
        </div>
      </section>

      {/* ━━━ FAQ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: B.ps }}>
        <div className="mx-auto max-w-[800px]">
          <div className="text-center mb-12">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-pink-500" />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: B.p }}>Intrebari frecvente</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Informatii <span className="text-pink-500">practice</span>
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
                  <div className="px-5 pb-5 pt-0 text-sm leading-[1.75] text-[#5a7a6e] animate-fadeUp" style={{ animationDuration: '0.2s' }}>{item.a}</div>
                )}
              </div>
            ))}
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
                <div key={s} className="w-[34px] h-[34px] rounded-lg bg-white/[.07] flex items-center justify-center cursor-pointer text-[11px] font-bold text-white/50 hover:bg-sdt-600/45 transition-colors">{s}</div>
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
            {[['Despre noi','/despre-noi'],['Echipa','/echipa'],['Ambasadori','/ambasadori'],['Tehnologii','/tehnologii'],['Blog','/blog'],['Cariere','/cariere'],['Contacte','/contacte']].map(([s,h]) => (
              <a key={s} href={h} className={cn(
                'block text-[13px] mb-2.5 no-underline hover:text-white transition-colors',
                s === 'Contacte' ? 'text-pink-500 font-semibold' : 'text-white/[.58]'
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

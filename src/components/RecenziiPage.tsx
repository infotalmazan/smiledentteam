'use client'
import { useState } from 'react'
import { BRAND as B, STATS, LOCATIONS, SERVICES, CAMPAIGN_2026 } from '@/lib/brand'
import { Logo } from './Logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Star, ArrowRight, ThumbsUp, MessageCircle, Award, TrendingUp, Quote, MapPin, Phone, Clock } from 'lucide-react'

/* ─── Animations — Floating review cards ─── */
const ANIM = `
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes floatSlow{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-12px) rotate(2deg)}}
  @keyframes starBurst{0%,100%{opacity:.4;transform:scale(.9)}50%{opacity:1;transform:scale(1.1)}}
  @keyframes slideIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
`

/* ─── Review data — expanded set ─── */
const REVIEWS_ALL = [
  // Implantologie
  { name: 'Denis P.', proc: 'Implant Dentar', cat: 'Implantologie', rating: 5, text: 'Am primit implantul fara durere. In 3 luni aveam dinte nou. Echipa a fost extraordinara!', date: 'Dec 2025', location: 'Chisinau, Centru' },
  { name: 'Aleksandr Z.', proc: 'Implant Dentar', cat: 'Implantologie', rating: 5, text: 'A dentist who knows their business 101%. Helped me once again with my problematic teeth. I am eternally grateful.', date: 'Nov 2025', location: 'Chisinau, Centru' },
  { name: 'Igor M.', proc: 'Implant + Coroana', cat: 'Implantologie', rating: 5, text: 'Totul planificat digital, fara surprize. Implantul s-a integrat perfect in 2 luni.', date: 'Oct 2025', location: 'Chisinau, Rascani' },
  // Estetica
  { name: 'Maria T.', proc: 'Fatete E-max', cat: 'Estetica', rating: 5, text: 'Zambetul pe care l-am visat! Ana a fost extraordinara. Totul planificat cu Smile Design.', date: 'Ian 2026', location: 'Chisinau, Centru' },
  { name: 'Ksenia D.', proc: 'Fatete ceramice', cat: 'Estetica', rating: 5, text: 'Rezultat natural, nimeni nu a observat ca am fatete. Recomand cu toata increderea.', date: 'Dec 2025', location: 'Iasi' },
  { name: 'Alexandra R.', proc: 'Smile Makeover', cat: 'Estetica', rating: 5, text: 'Incredibil de multumita! Totul a fost planificat 3D, am vazut rezultatul inainte de tratament.', date: 'Nov 2025', location: 'Chisinau, Botanica' },
  // Protetica
  { name: 'Ion V.', proc: 'Coroane Zirconiu', cat: 'Protetica', rating: 5, text: 'Coroanele arata perfect natural. Nimeni nu le deosebeste de dintii mei. Tehnologie CAD/CAM impresionanta.', date: 'Dec 2025', location: 'Chisinau, Centru' },
  { name: 'Kathryn J.', proc: 'Retainers', cat: 'Protetica', rating: 5, text: 'Retainers made and ready within five hours using incredibly modern technology! Would recommend to anyone.', date: 'Oct 2025', location: 'Chisinau, Centru' },
  // Ortodontie
  { name: 'Svetlana L.', proc: 'Invisalign copil', cat: 'Ortodontie', rating: 5, text: 'Copilul meu adora vizitele! Cea mai buna ortodontista. Tratamentul merge perfect.', date: 'Ian 2026', location: 'Chisinau, Rascani' },
  { name: 'Ana P.', proc: 'Invisalign adult', cat: 'Ortodontie', rating: 5, text: 'La 35 de ani am decis sa-mi corectez dintii. Rezultatul cu Invisalign este absolut incredibil!', date: 'Nov 2025', location: 'Chisinau, Centru' },
  // Digital Check-Up
  { name: 'Ana R.', proc: 'Digital Check-Up', cat: 'Digital Check-Up', rating: 5, text: 'Am inteles exact ce am nevoie. Totul transparent, fara presiune. Scanarea 3D e impresionanta.', date: 'Feb 2026', location: 'Chisinau, Centru' },
  { name: 'Alexandru C.', proc: 'Digital Check-Up', cat: 'Digital Check-Up', rating: 5, text: 'Victoria Potinga proves to be a dedicated and empathetic professional. Excellent dental services!', date: 'Ian 2026', location: 'Chisinau, Centru' },
  // Chirurgie
  { name: 'Elena M.', proc: 'Extractie complexa', cat: 'Chirurgie', rating: 5, text: 'M-am simtit in siguranta pe tot parcursul interventiei. Profesionalism desavarsit. Zero durere!', date: 'Dec 2025', location: 'Chisinau, Centru' },
  // All-On
  { name: 'Victor D.', proc: 'All-On-4', cat: 'All-On', rating: 5, text: 'Am scapat de proteza mobila! Interventia a durat cateva ore. Am plecat acasa cu dinti noi.', date: 'Nov 2025', location: 'Chisinau, Centru' },
  { name: 'Maria S.', proc: 'All-On-6', cat: 'All-On', rating: 5, text: 'Viata mea s-a schimbat complet. Acum am dinti ficsi si pot manca orice. Recomand SDT!', date: 'Oct 2025', location: 'Iasi' },
  // Terapie
  { name: 'Nadejda B.', proc: 'Terapie dentara', cat: 'Terapie', rating: 5, text: 'Foarte atenta si delicata, tratament fara durere. Recomand cu incredere!', date: 'Ian 2026', location: 'Chisinau, Botanica' },
  // Consultatie Online
  { name: 'Andrei K.', proc: 'Consultatie Online', cat: 'Consultatie Online', rating: 5, text: 'Am planificat totul din Germania. Cand am ajuns in Moldova, am inceput tratamentul imediat. Genial!', date: 'Dec 2025', location: 'Germania → Chisinau' },
  { name: 'Natalia V.', proc: 'Consultatie Online', cat: 'Consultatie Online', rating: 5, text: 'Din Londra am trimis tomografia, in 48h aveam plan complet. Am economisit 2 saptamani de concediu!', date: 'Nov 2025', location: 'UK → Chisinau' },
]

const CATEGORIES = ['Toate', 'Implantologie', 'Estetica', 'Protetica', 'Ortodontie', 'Digital Check-Up', 'All-On', 'Chirurgie', 'Terapie', 'Consultatie Online']

/* ─── Shared Badge ─── */
function SectionBadge({ children, light }: { children: string; light?: boolean }) {
  return (
    <Badge variant="outline" className={cn(
      'mb-4 gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.12em]',
      light ? 'border-white/20 bg-white/[.12] text-white' : 'border-sdt-600/10 bg-sdt-100 text-sdt-600'
    )}>
      <span className={cn('h-1.5 w-1.5 rounded-full', light ? 'bg-white' : 'bg-sdt-600')} />
      {children}
    </Badge>
  )
}

/* ─── Nav ─── */
function Nav() {
  return (
    <nav className="sticky top-0 z-[100] flex items-center justify-between border-b border-sdt-600/10 bg-white px-12 py-3.5" style={{ borderTop: `3px solid ${B.a}` }}>
      <a href="/" className="no-underline"><Logo height={36} /></a>
      <div className="flex items-center gap-7">
        {[['Servicii','/servicii'],['Digital Check-Up','/digital-checkup'],['Consultatie Online','/consultatie-online'],['Echipa','/echipa'],['Recenzii','/recenzii']].map(([l, h]) => (
          <a key={l} href={h} className={cn(
            'relative text-sm no-underline pb-1',
            l === 'Recenzii' ? 'font-bold text-sdt-600' : 'font-medium text-[#3a5a50]'
          )}>
            {l}
            {l === 'Recenzii' && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-5 rounded-full bg-pink-500" />}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-2.5">
        <a href="/login" className="no-underline">
          <Button variant="outline" size="sm" className="border-sdt-600 text-sdt-600 text-[13px] font-semibold">Cabinetul meu</Button>
        </a>
        <Button variant="accent" size="sm" className="text-[13px] font-bold">Programeaza-te</Button>
      </div>
    </nav>
  )
}

/* ─── Stars component ─── */
function Stars({ count = 5, size = 14 }: { count?: number; size?: number }) {
  return (
    <div className="flex gap-0.5 text-[#fbb040]">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="fill-current" style={{ width: size, height: size }} />
      ))}
    </div>
  )
}

/* ─── Hero — Floating review bubbles ─── */
function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${B.nv} 0%, #0f2e24 50%, ${B.pd} 100%)` }}>
      <style dangerouslySetInnerHTML={{ __html: ANIM }} />
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 items-center gap-10 px-12 pb-16 pt-[72px]">
        <div>
          <SectionBadge light>Recenzii verificate</SectionBadge>
          <h1 className="font-display mb-[18px] text-[44px] font-semibold leading-[1.08] tracking-tight text-white">
            Ce spun<br/><span className="text-pink-500">pacientii nostri</span>
          </h1>
          <p className="mb-7 max-w-[440px] text-base leading-relaxed text-white/[.65]">
            Peste 1 200 de recenzii verificate pe Google. Nota medie 4.9/5.0. Transparenta totala — fiecare cuvant conteaza.
          </p>
          <div className="flex gap-3.5">
            <Button variant="accent" className="gap-2 px-8 py-3.5 text-[15px] font-bold">
              Lasa o recenzie <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="border-white/30 bg-transparent px-8 py-3.5 text-[15px] font-bold text-white hover:bg-white/10">
              Google Reviews ↗
            </Button>
          </div>
          <div className="mt-11 flex gap-8">
            {[['4.9','nota medie'],['1.200+','recenzii'],['99%','recomanda']].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-[28px] font-semibold text-pink-500">{n}</div>
                <div className="mt-0.5 text-xs text-white/[.45]">{l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Right — Floating review cards stack */}
        <div className="relative flex h-[400px] items-center justify-center">
          {/* Floating mini review cards */}
          <div
            className="absolute left-[20px] top-[20px] z-[2] w-[220px] rounded-2xl border border-white/10 bg-white/[.06] p-4 backdrop-blur-sm"
            style={{ animation: 'floatSlow 5s ease-in-out infinite' }}
          >
            <Stars size={12} />
            <p className="mt-2 text-[11px] leading-relaxed text-white/60 italic">&ldquo;Zambetul pe care l-am visat!&rdquo;</p>
            <div className="mt-2 text-[10px] font-semibold text-white/40">— Maria T.</div>
          </div>
          <div
            className="absolute right-[10px] top-[60px] z-[3] w-[200px] rounded-2xl border border-white/10 bg-white/[.06] p-4 backdrop-blur-sm"
            style={{ animation: 'floatSlow 4.5s 0.8s ease-in-out infinite' }}
          >
            <Stars size={12} />
            <p className="mt-2 text-[11px] leading-relaxed text-white/60 italic">&ldquo;Implantul fara durere. Recomand!&rdquo;</p>
            <div className="mt-2 text-[10px] font-semibold text-white/40">— Denis P.</div>
          </div>
          <div
            className="absolute left-[40px] bottom-[80px] z-[2] w-[210px] rounded-2xl border border-white/10 bg-white/[.06] p-4 backdrop-blur-sm"
            style={{ animation: 'floatSlow 5.5s 1.5s ease-in-out infinite' }}
          >
            <Stars size={12} />
            <p className="mt-2 text-[11px] leading-relaxed text-white/60 italic">&ldquo;Totul planificat din Germania!&rdquo;</p>
            <div className="mt-2 text-[10px] font-semibold text-white/40">— Andrei K.</div>
          </div>
          {/* Central Google rating */}
          <div
            className="relative z-[4] flex flex-col items-center rounded-2xl border border-white/15 bg-white px-8 py-6 shadow-[0_20px_60px_rgba(0,0,0,.3)]"
            style={{ animation: 'float 4s ease-in-out infinite' }}
          >
            <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#5a7a6e]">Google Reviews</div>
            <Stars size={22} />
            <div className="font-display mt-1 text-[48px] font-semibold leading-none text-sdt-600">4.9</div>
            <div className="mt-1 text-[11px] text-[#5a7a6e]">1 200+ recenzii verificate</div>
          </div>
          {/* Floating stat cards */}
          <div
            className="absolute bottom-[20px] right-[20px] z-[3] rounded-xl bg-white px-[18px] py-3 shadow-[0_8px_32px_rgba(0,0,0,.15)]"
            style={{ animation: 'float 4.5s 1s ease-in-out infinite' }}
          >
            <div className="flex items-center gap-1.5">
              <ThumbsUp className="h-3.5 w-3.5 text-sdt-600" />
              <span className="text-xs font-bold text-sdt-900">99% recomanda</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Stats strip ─── */
function StatsStrip() {
  const stats = [
    { icon: Star, val: '4.9/5.0', label: 'Nota medie Google' },
    { icon: MessageCircle, val: '1.200+', label: 'Recenzii verificate' },
    { icon: ThumbsUp, val: '99%', label: 'Rata de recomandare' },
    { icon: Award, val: '#1', label: 'Clinica din Moldova' },
    { icon: TrendingUp, val: '15 ani', label: 'Excelenta constanta' },
  ]
  return (
    <section className="border-b border-sdt-600/10 bg-sdt-50 px-12 py-8">
      <div className="mx-auto flex max-w-[1200px] justify-between">
        {stats.map(({ icon: Icon, val, label }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-sdt-600/10">
              <Icon className="h-5 w-5 text-sdt-600" strokeWidth={1.5} />
            </div>
            <div>
              <div className="font-display text-lg font-semibold text-sdt-900">{val}</div>
              <div className="text-[11px] text-[#5a7a6e]">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Reviews grid with category filter ─── */
function ReviewsGrid() {
  const [cat, setCat] = useState('Toate')
  const filtered = cat === 'Toate' ? REVIEWS_ALL : REVIEWS_ALL.filter(r => r.cat === cat)

  return (
    <section className="bg-white px-12 py-16">
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center mb-10">
          <SectionBadge>Toate recenziile</SectionBadge>
          <h2 className="font-display text-[36px] font-semibold text-sdt-900 tracking-[-0.03em] mb-3">
            Filtreaza dupa <span className="text-sdt-600">serviciu</span>
          </h2>
          <p className="text-[15px] text-[#5a7a6e] max-w-[480px] mx-auto">
            Alege categoria care te intereseaza si citeste experientele reale ale pacientilor nostri.
          </p>
        </div>

        {/* Category tabs */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                'rounded-full border px-4 py-2 text-[12px] font-semibold transition-all cursor-pointer font-sans',
                cat === c
                  ? 'border-sdt-600 bg-sdt-600 text-white'
                  : 'border-sdt-600/15 bg-white text-[#5a7a6e] hover:border-sdt-600/40'
              )}
            >
              {c}
              {c !== 'Toate' && (
                <span className="ml-1 text-[10px] opacity-60">
                  ({REVIEWS_ALL.filter(r => r.cat === c).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((r, i) => (
            <Card
              key={`${r.name}-${i}`}
              className="rounded-2xl border border-sdt-600/8 p-6 shadow-none hover:shadow-lg hover:border-sdt-600/20 transition-all duration-300"
              style={{ animation: `slideIn 0.4s ${i * 0.05}s ease-out both` }}
            >
              <CardContent className="p-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sdt-100 text-sm font-bold text-sdt-600">
                      {r.name.split(' ').map(w => w[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-sdt-900">{r.name}</div>
                      <div className="text-[11px] font-semibold text-sdt-600">{r.proc}</div>
                    </div>
                  </div>
                  <Stars size={12} />
                </div>
                <div className="mb-3 flex items-center gap-1">
                  <Quote className="h-3 w-3 text-sdt-600/30" />
                </div>
                <p className="text-[13px] leading-[1.75] text-[#4a6a58]">{r.text}</p>
                <div className="mt-4 flex items-center justify-between text-[10px] text-[#5a7a6e]/60">
                  <span>{r.date}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {r.location}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load more hint */}
        <div className="mt-10 text-center">
          <p className="text-sm text-[#5a7a6e] mb-4">
            Afisam {filtered.length} din 1 200+ recenzii verificate pe Google
          </p>
          <Button variant="outline" className="border-sdt-600 text-sdt-600 rounded-full px-8">
            Vezi toate pe Google ↗
          </Button>
        </div>
      </div>
    </section>
  )
}

/* ─── Video Testimonials section ─── */
function VideoTestimonials() {
  const videos = [
    { name: 'Denis & familia', proc: 'Implant Dentar', thumb: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=400&fit=crop' },
    { name: 'Maria T.', proc: 'Fatete E-max', thumb: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop' },
    { name: 'Victor D.', proc: 'All-On-4', thumb: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop' },
    { name: 'Andrei K.', proc: 'Diaspora Germania', thumb: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop' },
  ]
  return (
    <section className="bg-sdt-50 px-12 py-16">
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center mb-10">
          <SectionBadge>Video testimoniale</SectionBadge>
          <h2 className="font-display text-[36px] font-semibold text-sdt-900 tracking-[-0.03em] mb-3">
            Povesti <span className="text-sdt-600">reale</span>
          </h2>
          <p className="text-[15px] text-[#5a7a6e] max-w-[480px] mx-auto">
            Pacientii nostri povestesc experienta lor in fata camerei. Rezultate reale, emotii autentice.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-5">
          {videos.map(v => (
            <div key={v.name} className="group relative cursor-pointer overflow-hidden rounded-2xl aspect-[3/4]">
              <img src={v.thumb} alt={v.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-pink-500 text-white shadow-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="text-sm font-bold text-white">{v.name}</div>
                <div className="text-[11px] text-white/60">{v.proc}</div>
              </div>
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
    <section className="px-12 py-14" style={{ background: `linear-gradient(135deg, ${B.p}, ${B.pm})` }}>
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        <div>
          <h2 className="font-display text-[32px] font-semibold text-white mb-2">
            Experimenteaza si tu diferenta SDT
          </h2>
          <p className="text-white/70 text-[15px]">Programeaza-te acum si descopera de ce 99% ne recomanda.</p>
        </div>
        <Button variant="accent" className="shrink-0 gap-2 px-10 py-4 text-[15px] font-bold">
          Programeaza-te <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}

/* ─── Appointment Form ─── */
function AppointmentForm() {
  return (
    <section className="bg-white px-12 py-16">
      <div className="mx-auto max-w-[520px]">
        <div className="text-center mb-8">
          <SectionBadge>Programare</SectionBadge>
          <h2 className="font-display text-[32px] font-semibold text-sdt-900 mb-2">Programeaza-te acum</h2>
          <p className="text-sm text-[#5a7a6e]">Completeaza formularul si te vom contacta in cel mai scurt timp.</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="Prenume" className="border-sdt-600/15 h-12 rounded-xl" />
            <Input placeholder="Nume" className="border-sdt-600/15 h-12 rounded-xl" />
          </div>
          <div className="flex gap-2">
            <select className="h-12 w-24 rounded-xl border border-sdt-600/15 bg-white px-3 text-sm font-medium text-sdt-900">
              <option>+373</option><option>+40</option><option>+44</option><option>+49</option><option>+33</option><option>+1</option>
            </select>
            <Input placeholder="Numar de telefon" className="border-sdt-600/15 h-12 flex-1 rounded-xl" />
          </div>
          <select className="h-12 rounded-xl border border-sdt-600/15 bg-white px-4 text-sm text-[#5a7a6e]">
            <option>Selecteaza serviciul</option>
            {SERVICES.map(s => <option key={s.slug}>{s.name}</option>)}
          </select>
          <Button variant="accent" className="mt-2 h-12 w-full rounded-xl text-[15px] font-bold">
            Programeaza-te →
          </Button>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer (matches Servicii dark footer) ─── */
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
            {[['Despre noi','/despre-noi'],['Echipa','/echipa'],['Ambasadori','/ambasadori'],['Tehnologii','/tehnologii'],['Blog','/'],['Cariere','/cariere'],['Contacte','/']].map(([s,h]) => (
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

/* ─── Main Export ─── */
export function RecenziiPage() {
  return (
    <>
      <Nav />
      <Hero />
      <StatsStrip />
      <ReviewsGrid />
      <VideoTestimonials />
      <CtaStrip />
      <AppointmentForm />
      <Footer />
    </>
  )
}

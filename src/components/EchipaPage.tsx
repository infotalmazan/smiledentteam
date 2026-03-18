'use client'
import { useState } from 'react'
import { BRAND as B, STATS, LOCATIONS, CAMPAIGN_2026, SERVICES, AMBASSADORS } from '@/lib/brand'
import { Logo } from './Logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Check, Star, X, MapPin, Clock, Phone, ArrowRight, Stethoscope, Heart, Shield, Brain, Activity, Smile } from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─── Demo doctors data ──────────────────── */
const DOCTORS = [
  { id:1, name:'Dr. Stanislav Eni',    dept:'Chirurgie',     title:'Medic chirurg dento-alveolar', years:12, rating:4.9, photo:'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop&crop=face', bio:'Specialist in chirurgie ghidata 3D, extractii complexe si augmentari osoase. Peste 3.000 de interventii chirurgicale realizate.', education:['Universitatea de Stat de Medicina, Chisinau','Masterclass Implantologie, Berlin','Certificare Straumann, Elvetia'], review:{ text:'Profesionalism desavarsit. M-am simtit in siguranta pe tot parcursul interventiei.', author:'Elena M.' } },
  { id:2, name:'Dr. Victoria Potinga', dept:'Chirurgie',     title:'Medic chirurg oral', years:8, rating:4.8, photo:'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=400&h=500&fit=crop&crop=face', bio:'Specializata in implantologie si chirurgie reconstructiva. Focus pe cazuri complexe All-On-4/6.', education:['USMF Nicolae Testemitanu','Cursuri Nobel Biocare, Zurich'], review:{ text:'Foarte atenta si delicata. Recomand cu incredere!', author:'Alexandru C.' } },
  { id:3, name:'Dr. Rustam Anatolie',  dept:'Implantologie', title:'Medic implantolog', years:10, rating:4.9, photo:'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=500&fit=crop&crop=face', bio:'Specialist in implantologie digitala, planificare 3D si incarcare imediata. Peste 5.000 de implanturi inserate.', education:['USMF Chisinau','Fellowship Implantologie, ITI Basel','Certificare 3Shape'], review:{ text:'Cel mai bun implantolog din Moldova. Rezultat impecabil.', author:'Denis P.' } },
  { id:4, name:'Dr. Ana Cosovan',      dept:'Estetica',      title:'Medic stomatolog estetician', years:7, rating:4.9, photo:'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop&crop=face', bio:'Expert in Digital Smile Design, fatete ceramice E-max si albire profesionala. Transforma zambete cu precizie digitala.', education:['USMF Chisinau','Digital Smile Design Academy, Madrid','Masterclass Fatete, Milano'], review:{ text:'Zambetul pe care l-am visat! Ana a fost extraordinara.', author:'Maria T.' } },
  { id:5, name:'Dr. Iulian Spataru',   dept:'Estetica',      title:'Medic stomatolog', years:6, rating:4.8, photo:'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=500&fit=crop&crop=face', bio:'Specializat in restaurari estetice minimale, bonding direct si smile makeover digital.', education:['USMF Chisinau','Cursuri Style Italiano'], review:{ text:'Rezultat natural, nimeni nu a observat ca am fatete.', author:'Ksenia D.' } },
  { id:6, name:'Dr. Mariana Cojocaru', dept:'Terapie',       title:'Medic terapeut', years:14, rating:4.7, photo:'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&h=500&fit=crop&crop=face', bio:'Expert in tratamente endodontice sub microscop, restaurari complexe si profilaxie digitala.', education:['USMF Chisinau','Certificare Microscop Zeiss'], review:{ text:'Foarte atenta, tratament fara durere. Recomand!', author:'Nadejda B.' } },
  { id:7, name:'Dr. Cristina Radu',    dept:'Ortodontie',    title:'Medic ortodont', years:9, rating:4.9, photo:'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=500&fit=crop&crop=face', bio:'Specializata in ortodontie digitala cu Invisalign si brackets autoligaturante. Tratamente pentru copii si adulti.', education:['USMF Chisinau','Invisalign Certified Provider','Cursuri Damon System'], review:{ text:'Copilul meu adora vizitele! Cea mai buna ortodontista.', author:'Svetlana L.' } },
  { id:8, name:'Dr. Andrei Munteanu',  dept:'Protetica',     title:'Medic protetician', years:11, rating:4.8, photo:'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=500&fit=crop&crop=face', bio:'Expert in protetica digitala CAD/CAM, coroane zirconiu si reabilitari complete pe implanturi.', education:['USMF Chisinau','Certificare Cerec/inLab','Masterclass Zirconiu, Germania'], review:{ text:'Coroanele arata perfect, nu se deosebesc de dintii naturali.', author:'Ion V.' } },
  { id:9, name:'Dumitru Talmazan',     dept:'Management',    title:'Fondator & CEO', years:16, rating:5.0, photo:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face', bio:'Vizionar si fondator al Smile Dent Team. A transformat o clinica locala intr-o retea internationala cu 9 filiale in 4 tari.', education:['Business Management','Strategie & Leadership'], review:{ text:'Un lider care inspira intreaga echipa si comunitate.', author:'Echipa SDT' } },
  { id:10, name:'Maria Rotari',        dept:'Management',    title:'Director Marketing', years:5, rating:4.9, photo:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face', bio:'Arhitectul strategiei de marketing SDT. A crescut brandul de la nivel local la recunoastere nationala cu ROMI 1106%.', education:['Marketing Digital','Brand Strategy'], review:{ text:'Creativitate si strategie la cel mai inalt nivel.', author:'Board SDT' } },
]

const DEPARTMENTS = ['Toti','Chirurgie','Implantologie','Estetica','Terapie','Ortodontie','Protetica','Management']

const deptColors: Record<string,string> = {
  Chirurgie: B.p,
  Implantologie: '#0d8a72',
  Estetica: B.a,
  Terapie: '#059669',
  Ortodontie: '#6366f1',
  Protetica: '#D97706',
  Management: B.nv,
}

/* ─── Shared UI ──────────────────────────── */
function SectionBadge({ children, light }: { children: string; light?: boolean }) {
  return (
    <Badge variant="outline" className={cn(
      'mb-4 gap-1.5 rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.12em]',
      light
        ? 'border-white/20 bg-white/[.12] text-white'
        : 'border-sdt-600/10 bg-sdt-100 text-sdt-600'
    )}>
      <span className={cn('h-1.5 w-1.5 rounded-full', light ? 'bg-white' : 'bg-sdt-600')} />
      {children}
    </Badge>
  )
}

/* ─── Nav ─────────────────────────────────── */
function Nav() {
  return (
    <nav className="sticky top-0 z-[100] flex items-center justify-between border-b border-sdt-600/10 bg-white px-12 py-3.5" style={{ borderTop: `3px solid ${B.a}` }}>
      <a href="/" className="no-underline"><Logo height={36}/></a>
      <div className="flex items-center gap-7">
        {[['Servicii','/servicii'],['Digital Check-Up','/digital-checkup'],['Consultatie Online','/consultatie-online'],['Echipa','/echipa'],['Recenzii','/recenzii']].map(([l,h]) => (
          <a
            key={l}
            href={h}
            className={cn(
              'relative text-sm no-underline pb-1',
              l === 'Echipa' ? 'font-bold text-sdt-600' : 'font-medium text-[#3a5a50]'
            )}
          >
            {l}
            {l === 'Echipa' && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-5 rounded-full bg-pink-500" />}
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
          Programeaza-te
        </Button>
      </div>
    </nav>
  )
}

/* ─── Animations — Team constellation ─── */
const ANIM_ECHIPA = `
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
  @keyframes nodePulse{0%,100%{opacity:.6;transform:scale(.95)}50%{opacity:1;transform:scale(1.05)}}
  @keyframes lineDraw{from{stroke-dashoffset:100}to{stroke-dashoffset:0}}
  @keyframes nodeGlow{0%,100%{box-shadow:0 0 0 0 rgba(10,107,92,0)}50%{box-shadow:0 0 15px 5px rgba(10,107,92,.2)}}
`

/* ─── Constellation nodes (departments as interconnected nodes) ─── */
const CONSTELLATION_NODES = [
  { x: 150, y: 30,  Icon: Stethoscope, label: 'Chirurgie',  color: '#0a6b5c' },
  { x: 260, y: 80,  Icon: Shield,      label: 'Implant',    color: '#0d8a72' },
  { x: 280, y: 190, Icon: Smile,       label: 'Estetica',   color: '#e8157a' },
  { x: 200, y: 280, Icon: Activity,    label: 'Ortodontie', color: '#6366f1' },
  { x: 80,  y: 260, Icon: Heart,       label: 'Terapie',    color: '#059669' },
  { x: 40,  y: 150, Icon: Brain,       label: 'Protetica',  color: '#D97706' },
  { x: 100, y: 60,  Icon: Star,        label: 'Management', color: '#0a1e18' },
]

/* ─── Lines connecting nodes (index pairs) ─── */
const CONSTELLATION_LINES = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0],[0,2],[1,3],[4,6],[5,2],
]

/* ─── Hero ──────────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${B.nv} 0%, #0f2e24 50%, ${B.pd} 100%)` }}>
      <style dangerouslySetInnerHTML={{ __html: ANIM_ECHIPA }} />
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 items-center gap-10 px-12 pb-16 pt-[72px]">
        <div>
          <SectionBadge light>Echipa noastra</SectionBadge>
          <h1 className="font-display mb-[18px] text-[44px] font-semibold leading-[1.08] tracking-tight text-white">
            Echipa ta de<br/><span className="text-pink-500">specialisti</span>
          </h1>
          <p className="mb-7 max-w-[440px] text-base leading-relaxed text-white/[.65]">
            {STATS.team} specialisti, {STATS.years} ani de experienta si un singur obiectiv — zambetul tau perfect.
          </p>
          <div className="flex gap-3.5">
            <Button variant="accent" className="gap-2 px-8 py-3.5 text-[15px] font-bold">
              Cunoaste echipa <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-11 flex gap-8">
            {[['600+','specialisti'],['15','ani experienta'],['3','filiale']].map(([n,l]) => (
              <div key={l}>
                <div className="font-display text-[28px] font-semibold text-pink-500">{n}</div>
                <div className="mt-0.5 text-xs text-white/[.45]">{l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Right — Team constellation network */}
        <div className="relative flex h-[400px] items-center justify-center">
          <div className="relative" style={{ width: 320, height: 320 }}>
            {/* SVG connection lines */}
            <svg className="absolute inset-0" width="320" height="320" fill="none">
              {CONSTELLATION_LINES.map(([a, b], i) => {
                const na = CONSTELLATION_NODES[a], nb = CONSTELLATION_NODES[b]
                return (
                  <line
                    key={i}
                    x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                    stroke="rgba(255,255,255,.08)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    style={{ animation: `lineDraw 2s ${i * 0.15}s ease-out forwards` }}
                  />
                )
              })}
            </svg>
            {/* Department nodes */}
            {CONSTELLATION_NODES.map(({ x, y, Icon, label, color }, i) => (
              <div
                key={i}
                className="absolute z-[2] flex flex-col items-center"
                style={{
                  left: x - 24,
                  top: y - 24,
                  animation: `nodePulse ${3 + (i % 3) * 0.8}s ${i * 0.4}s ease-in-out infinite`,
                }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 backdrop-blur-sm"
                  style={{
                    background: `${color}22`,
                    animation: `nodeGlow ${4 + i * 0.5}s ${i * 0.3}s ease-in-out infinite`,
                  }}
                >
                  <Icon className="h-5 w-5 text-white/80" strokeWidth={1.5} />
                </div>
                <span className="mt-1 text-[8px] font-medium text-white/40">{label}</span>
              </div>
            ))}
          </div>
          {/* Floating stat cards */}
          <div
            className="absolute right-0 top-[20px] z-[3] rounded-xl bg-white px-[18px] py-3 shadow-[0_8px_32px_rgba(0,0,0,.15)]"
            style={{ animation: 'float 4s ease-in-out infinite' }}
          >
            <div className="mb-0.5 text-[11px] text-[#5a7a6e]">Experienta</div>
            <div className="font-display text-xl font-semibold text-sdt-600">15 ani</div>
          </div>
          <div
            className="absolute bottom-[20px] left-[10px] z-[3] rounded-xl bg-white px-[18px] py-3 shadow-[0_8px_32px_rgba(0,0,0,.15)]"
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

/* ─── Doctors Section ────────────────────── */
function DoctorsSection() {
  const [dept, setDept] = useState('Toti')
  const [selected, setSelected] = useState<number|null>(null)
  const filtered = dept === 'Toti' ? DOCTORS : DOCTORS.filter(d => d.dept === dept)
  const selectedDoc = DOCTORS.find(d => d.id === selected)

  return (
    <section className="bg-white px-12 py-14">
      <div className="mx-auto max-w-[1200px]">
        {/* Filter tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {DEPARTMENTS.map(d => (
            <button
              key={d}
              onClick={() => { setDept(d); setSelected(null) }}
              className={cn(
                'cursor-pointer rounded-full px-[18px] py-2 text-[13px] font-semibold transition-all duration-150',
                dept === d
                  ? 'border-[1.5px] border-sdt-600 bg-sdt-600 text-white'
                  : 'border-[1.5px] border-sdt-600/10 bg-sdt-50 text-[#0a1e18]'
              )}
            >{d}</button>
          ))}
        </div>

        {/* Portrait Grid */}
        <div className="grid grid-cols-4 gap-4">
          {filtered.map(doc => {
            const color = deptColors[doc.dept] || B.p
            const isSelected = selected === doc.id
            return (
              <Card
                key={doc.id}
                onClick={() => setSelected(isSelected ? null : doc.id)}
                className={cn(
                  'cursor-pointer overflow-hidden rounded-2xl border bg-white p-0 shadow-none transition-all duration-300',
                  isSelected && 'shadow-lg'
                )}
                style={{
                  borderColor: isSelected ? color : undefined,
                  borderWidth: isSelected ? 2 : 1,
                  boxShadow: isSelected ? `0 12px 40px ${B.bdr}` : undefined,
                }}
              >
                {/* Photo */}
                <div className="group relative overflow-hidden" style={{ paddingTop: '120%' }}>
                  <img
                    src={doc.photo}
                    alt={doc.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-400 group-hover:scale-[1.04]"
                  />
                  {/* Gradient overlay */}
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[55%]" style={{ background: 'linear-gradient(to top, rgba(10,30,24,.85) 0%, rgba(10,30,24,.3) 60%, transparent 100%)' }} />
                  {/* Info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="mb-1 flex items-center gap-1.5">
                      <span
                        className="rounded-full px-2 py-0.5 text-[9px] font-bold tracking-[.05em] text-white"
                        style={{ background: color }}
                      >{doc.dept}</span>
                      <span className="flex items-center gap-0.5 text-[10px] text-[#fbb040]">
                        <Star className="h-2.5 w-2.5 fill-[#fbb040] text-[#fbb040]" />
                        {doc.rating}
                      </span>
                    </div>
                    <div className="font-display text-base font-medium leading-tight text-white">{doc.name}</div>
                    <div className="mt-0.5 text-[11px] text-white/70">{doc.title}</div>
                    <div className="mt-1 text-[10px] text-white/50">{doc.years} ani de experienta</div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Selected doctor detail panel */}
        {selectedDoc && (() => {
          const color = deptColors[selectedDoc.dept] || B.p
          return (
            <Card
              className="mt-6 grid grid-cols-[320px_1fr] overflow-hidden rounded-[20px] border-2 bg-white p-0 shadow-none animate-in fade-in slide-in-from-bottom-2 duration-300"
              style={{ borderColor: color, boxShadow: `0 16px 48px ${B.bdr}` }}
            >
              {/* Left — large photo */}
              <div className="relative">
                <img src={selectedDoc.photo} alt={selectedDoc.name} className="h-full min-h-[380px] w-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-5" style={{ background: 'linear-gradient(to top, rgba(10,30,24,.8), transparent)' }}>
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
                    style={{ background: color }}
                  >{selectedDoc.dept}</span>
                </div>
              </div>
              {/* Right — info */}
              <CardContent className="p-7">
                <div className="mb-1 flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-[#0a1e18]">{selectedDoc.name}</h3>
                    <div className="mt-0.5 text-sm text-[#5a7a6e]">{selectedDoc.title}</div>
                  </div>
                  <button onClick={() => setSelected(null)} className="cursor-pointer border-none bg-transparent p-1 text-[#5a7a6e]">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="mb-4 mt-2.5 flex gap-3">
                  <Badge variant="outline" className="border-none bg-sdt-100 text-[11px] font-semibold text-sdt-600">
                    <Clock className="mr-1 h-3 w-3" />
                    {selectedDoc.years} ani experienta
                  </Badge>
                  <Badge variant="outline" className="border-none bg-[#fbb04015] text-[11px] font-semibold text-[#fbb040]">
                    <Star className="mr-1 h-3 w-3 fill-[#fbb040]" />
                    {selectedDoc.rating} Google
                  </Badge>
                </div>
                <p className="mb-[18px] text-sm leading-[1.7] text-[#5a7a6e]">{selectedDoc.bio}</p>
                <div className="mb-2 text-[10px] font-bold uppercase tracking-[.1em] text-sdt-600">Educatie & Certificari</div>
                <div className="mb-[18px] flex flex-col gap-[5px]">
                  {selectedDoc.education.map(e => (
                    <div key={e} className="flex items-center gap-2">
                      <Check className="h-[13px] w-[13px] text-sdt-600" strokeWidth={2.5} />
                      <span className="text-[13px] font-medium text-[#0a1e18]">{e}</span>
                    </div>
                  ))}
                </div>
                {selectedDoc.review && (
                  <div
                    className="mb-[18px] rounded-xl bg-sdt-50 p-4"
                    style={{ borderLeft: `3px solid ${color}` }}
                  >
                    <div className="mb-1 flex gap-0.5 text-xs text-[#fbb040]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-[#fbb040] text-[#fbb040]" />
                      ))}
                    </div>
                    <p className="mb-1.5 text-[13px] italic leading-[1.6] text-[#0a1e18]">&ldquo;{selectedDoc.review.text}&rdquo;</p>
                    <div className="text-xs font-semibold text-[#5a7a6e]">— {selectedDoc.review.author}</div>
                  </div>
                )}
                <Button className="w-full justify-center text-sm font-bold">
                  Programeaza cu {selectedDoc.name} <ArrowRight className="ml-1.5 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          )
        })()}
      </div>
    </section>
  )
}

/* ─── Ambasadori ─────────────────────────── */
function AmbasadoriSection() {
  return (
    <section className="bg-sdt-50 px-12 py-16">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-10 text-center">
          <SectionBadge>Zambete care inspira</SectionBadge>
          <h2 className="font-display mb-2.5 text-[32px] font-semibold text-[#0a1e18]">
            Ambasadorii <span className="text-pink-500">Smile Dent Team</span>
          </h2>
          <p className="mx-auto max-w-[440px] text-sm text-[#5a7a6e]">Personalitati din diverse industrii care ne-au ales si ne reprezinta.</p>
        </div>
        <div className="grid grid-cols-6 gap-4">
          {AMBASSADORS.map(amb => (
            <a key={amb.slug} href="/ambasadori" className="group no-underline">
              <div className="overflow-hidden rounded-[14px] border border-sdt-600/10 bg-white transition-all duration-300 hover:-translate-y-[3px] hover:shadow-lg">
                <div className="relative overflow-hidden" style={{ paddingTop: '110%' }}>
                  <img
                    src={amb.photo}
                    alt={amb.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-400 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[60%]" style={{ background: 'linear-gradient(to top, rgba(10,30,24,.9) 0%, transparent 100%)' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="font-display text-xs font-medium leading-tight text-white">{amb.name}</div>
                    <div className="mt-0.5 text-[10px] text-white/60">{amb.role}</div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-6 text-center">
          <a href="/ambasadori" className="text-[13px] font-bold text-sdt-600 no-underline hover:underline">
            Vezi toti ambasadorii <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── CTA Strip ──────────────────────────── */
function CtaStrip() {
  return (
    <section className="px-12 py-[52px]" style={{ background: `linear-gradient(135deg,${B.p},${B.pm})` }}>
      <div className="mx-auto max-w-[900px] text-center">
        <h2 className="font-display mb-3 text-[30px] font-semibold text-white">
          Alege-ti specialistul. Programeaza-te acum.
        </h2>
        <p className="mb-6 text-[15px] text-white/70">
          {STATS.team} specialisti pregatiti sa aiba grija de zambetul tau.
        </p>
        <Button variant="accent" className="px-8 py-3.5 text-[15px] font-bold">
          Programeaza-te <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}

/* ─── Appointment Form ───────────────────── */
function AppointmentForm() {
  return (
    <section className="bg-white px-12 py-16">
      <Card className="mx-auto max-w-[700px] rounded-[20px] border-sdt-600/10 bg-sdt-50 p-0 shadow-none">
        <CardContent className="px-9 py-10">
          <div className="mb-7 text-center">
            <h2 className="font-display mb-2 text-[26px] font-semibold text-[#0a1e18]">Programeaza-te acum</h2>
            <p className="text-[13px] text-[#5a7a6e]">Completeaza formularul — te contactam rapid.</p>
          </div>
          <div className="mb-3 grid grid-cols-2 gap-3">
            <Input placeholder="Prenume" />
            <Input placeholder="Nume" />
          </div>
          <Input placeholder="Telefon *" type="tel" className="mb-3" />
          <select
            defaultValue=""
            className="mb-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="" disabled>Alege specialistul</option>
            {DOCTORS.map(d => <option key={d.id}>{d.name} — {d.dept}</option>)}
          </select>
          <select
            defaultValue=""
            className="mb-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="" disabled>Selecteaza locatia</option>
            {LOCATIONS.map(l => <option key={l.city}>{l.city} — {l.address}</option>)}
          </select>
          <Button variant="accent" className="w-full justify-center text-[15px] font-bold">
            Trimite cererea <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
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
            {[['Despre noi','/'],['Echipa','/echipa'],['Ambasadori','/ambasadori'],['Tehnologii','/'],['Blog','/'],['Cariere','/'],['Contacte','/']].map(([s,h]) => (
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
export function EchipaPage() {
  return (
    <>
      <Nav/>
      <Hero/>
      <DoctorsSection/>
      <AmbasadoriSection/>
      <CtaStrip/>
      <AppointmentForm/>
      <Footer/>
    </>
  )
}

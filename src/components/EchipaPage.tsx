'use client'
import { useState } from 'react'
import { BRAND as B, STATS, LOCATIONS, CAMPAIGN_2026, SERVICES, AMBASSADORS } from '@/lib/brand'
import { Logo } from './Logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Check, Star, X, MapPin, Clock, Phone, ArrowRight } from 'lucide-react'
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
function SectionBadge({ children }: { children: string }) {
  return (
    <Badge variant="outline" className="mb-4 gap-1.5 border-sdt-600/10 bg-sdt-100 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.12em] text-sdt-600 rounded-full">
      <span className="h-1.5 w-1.5 rounded-full bg-sdt-600" />
      {children}
    </Badge>
  )
}

/* ─── Nav ─────────────────────────────────── */
function Nav() {
  return (
    <nav className="sticky top-0 z-[100] flex items-center justify-between border-b border-sdt-600/10 bg-white/[.97] px-12 py-3.5 backdrop-blur-md" style={{ borderTop: `3px solid ${B.a}` }}>
      <a href="/" className="no-underline"><Logo height={36}/></a>
      <div className="flex items-center gap-7">
        {[['Servicii','/servicii'],['Digital Check-Up','/digital-checkup'],['Consultatie Online','/consultatie-online'],['Echipa','/echipa'],['Recenzii','/']].map(([l,h]) => (
          <a
            key={l}
            href={h}
            className={cn(
              'text-sm no-underline',
              l === 'Echipa' ? 'font-bold text-sdt-600' : 'font-medium text-[#3a5a50]'
            )}
          >{l}</a>
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

/* ─── Hero ──────────────────────────────── */
function Hero() {
  return (
    <section className="border-b border-sdt-600/10 bg-sdt-50 px-12 pb-12 pt-14">
      <div className="mx-auto flex max-w-[1200px] items-end justify-between">
        <div>
          <SectionBadge>Echipa noastra</SectionBadge>
          <h1 className="font-display mb-3.5 text-[42px] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#0a1e18]">
            Echipa ta de<br/><span className="text-sdt-600">specialisti</span>
          </h1>
          <p className="max-w-[460px] text-[15px] leading-[1.7] text-[#5a7a6e]">
            {STATS.team} specialisti, {STATS.years} ani de experienta si un singur obiectiv — zambetul tau.
          </p>
        </div>
        <div className="flex gap-6">
          {[['600+','specialisti'],['15','ani experienta'],['3','filiale']].map(([n,l]) => (
            <div key={l} className="text-center">
              <div className="font-display text-2xl font-extrabold text-sdt-600">{n}</div>
              <div className="text-[11px] text-[#5a7a6e]">{l}</div>
            </div>
          ))}
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
                    <div className="font-display text-base font-bold leading-tight text-white">{doc.name}</div>
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
                    <h3 className="font-display text-2xl font-extrabold text-[#0a1e18]">{selectedDoc.name}</h3>
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
          <h2 className="font-display mb-2.5 text-[32px] font-extrabold text-[#0a1e18]">
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
                    <div className="font-display text-xs font-bold leading-tight text-white">{amb.name}</div>
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
        <h2 className="font-display mb-3 text-[30px] font-extrabold text-white">
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
            <h2 className="font-display mb-2 text-[26px] font-extrabold text-[#0a1e18]">Programeaza-te acum</h2>
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
    <footer className="bg-[#0a1e18] px-12 pb-8 pt-14">
      <div className="mx-auto mb-10 grid max-w-[1200px] grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-10">
        <div>
          <Logo height={32} light/>
          <p className="mt-4 max-w-[260px] text-[13px] leading-[1.7] text-white/[.45]">
            Clinica stomatologica digitala. {STATS.years} ani de excelenta, {STATS.team} specialisti, {STATS.patients} pacienti.
          </p>
          <div className="font-display mt-4 text-base font-extrabold text-pink-500">{CAMPAIGN_2026.slogan}</div>
        </div>
        <div>
          <div className="mb-[18px] text-[11px] font-bold uppercase tracking-[.15em] text-white">Servicii</div>
          {SERVICES.slice(0,7).map(s => (
            <div key={s.slug} className="mb-2.5 cursor-pointer text-[13px] text-white/50">{s.name}</div>
          ))}
        </div>
        <div>
          <div className="mb-[18px] text-[11px] font-bold uppercase tracking-[.15em] text-white">Clinica</div>
          {[['Despre noi','/'],['Echipa','/echipa'],['Ambasadori','/ambasadori'],['Tehnologii','/'],['Blog','/'],['Contacte','/']].map(([s,h]) => (
            <a key={s} href={h} className="mb-2.5 block text-[13px] text-white/50 no-underline">{s}</a>
          ))}
        </div>
        <div>
          <div className="mb-[18px] text-[11px] font-bold uppercase tracking-[.15em] text-white">Contact</div>
          {LOCATIONS.slice(0,2).map(l => (
            <div key={l.city} className="mb-3.5">
              <div className="flex items-center gap-1.5 text-[13px] font-semibold text-white">
                <MapPin className="h-3 w-3 text-sdt-400" />
                {l.city}
              </div>
              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-white/[.45]">
                {l.address}
                <span className="text-white/20">|</span>
                <Phone className="h-2.5 w-2.5" />
                {l.phone}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-white/[.07] pt-5">
        <span className="text-[11px] text-white/25">&copy; {CAMPAIGN_2026.year} Smile Dent Team</span>
        <div className="flex gap-1.5">
          {['RO','RU','EN'].map(l => (
            <span key={l} className="cursor-pointer rounded-full bg-white/[.08] px-2 py-[3px] text-[10px] font-bold text-white/50">{l}</span>
          ))}
        </div>
      </div>
    </footer>
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

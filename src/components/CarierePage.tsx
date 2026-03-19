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
  ArrowRight, MapPin, Phone, CheckCircle, Star,
  Briefcase, GraduationCap, Heart, Users, TrendingUp,
  Clock, Globe, Award, Zap, Shield, Lightbulb,
  ChevronDown, ChevronUp, Send, Building2, Stethoscope,
  Smile, BookOpen, Coffee, Plane, Dumbbell, Baby
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
const ANIM_CAR = `
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse-dot { 0%,100% { opacity: .5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.3); } }
`

/* ─── Open Positions ──────────────────────── */
const POSITIONS = [
  {
    title: 'Medic Stomatolog — Protetica',
    department: 'Protetica & Estetica',
    location: 'Chisinau, Centru',
    type: 'Full-time',
    experience: '3+ ani',
    urgent: true,
    desc: 'Cautam un medic stomatolog specializat in protetica fixa si mobila, cu experienta in lucrul cu zirconiu si CAD/CAM. Vei lucra cu tehnologii de ultima generatie intr-o echipa de top.',
    requirements: ['Licenta in Medicina Dentara', 'Specializare in Protetica', 'Experienta minim 3 ani', 'Cunostinte CAD/CAM — avantaj'],
  },
  {
    title: 'Medic Ortodont',
    department: 'Ortodontie Digitala',
    location: 'Chisinau, Rascani',
    type: 'Full-time',
    experience: '2+ ani',
    urgent: true,
    desc: 'Pozitie pentru medic ortodont cu experienta in alinierea invizibila (Invisalign) si brackets. Acces la scanner 3Shape si software ClinCheck.',
    requirements: ['Licenta + Rezidentiat Ortodontie', 'Experienta Invisalign — avantaj', 'Certificare activa', 'Orientare catre pacient'],
  },
  {
    title: 'Asistent Medical Dentar',
    department: 'Clinica',
    location: 'Chisinau, Botanica',
    type: 'Full-time',
    experience: '1+ an',
    urgent: false,
    desc: 'Asistent medical pentru cabinetul de implantologie si chirurgie orala. Responsabilitati: pregatire cabinet, asistenta la interventii, sterilizare, comunicare cu pacientii.',
    requirements: ['Diploma asistent medical', 'Experienta in stomatologie', 'Atentie la detalii', 'Empatie si rabdare'],
  },
  {
    title: 'Digital Marketing Specialist',
    department: 'Marketing',
    location: 'Remote / Chisinau',
    type: 'Full-time',
    experience: '2+ ani',
    urgent: false,
    desc: 'Specialist marketing digital pentru gestionarea campaniilor sociale, content creation, SEO si performance marketing. Vei lucra direct cu echipa de management.',
    requirements: ['Experienta 2+ ani in digital marketing', 'Cunostinte Meta Ads, Google Ads', 'Creativitate si analitia', 'Limba romana + engleza'],
  },
  {
    title: 'Medic Implantolog',
    department: 'Implantologie',
    location: 'Iasi, Romania',
    type: 'Full-time',
    experience: '5+ ani',
    urgent: true,
    desc: 'Medic implantolog pentru filiala Iasi. Experienta cu sisteme Straumann si Nobel Biocare, chirurgie ghidata 3D si augmentari osoase.',
    requirements: ['Specializare Chirurgie Orala / Implantologie', 'Experienta 5+ ani', 'Cunostinte ghidaj 3D', 'Disponibilitate relocare'],
  },
  {
    title: 'Receptioner / Coordonator Pacienti',
    department: 'Front Office',
    location: 'Chisinau, Centru',
    type: 'Full-time',
    experience: 'Entry level',
    urgent: false,
    desc: 'Primul contact al pacientului cu clinica noastra. Responsabilitati: programari, comunicare telefonica, coordonare consultatii, gestiune CRM.',
    requirements: ['Comunicare excelenta', 'Romana + Rusa fluent', 'Cunostinte PC de baza', 'Aspect ingrijit si profesional'],
  },
]

/* ─── Benefits ────────────────────────────── */
const BENEFITS = [
  { icon: TrendingUp, title: 'Salariu competitiv', desc: 'Pachet salarial peste media pietei, bonusuri de performanta trimestriale si anuale.' },
  { icon: GraduationCap, title: 'Dezvoltare profesionala', desc: 'Acces la conferinte internationale, cursuri de specializare si training-uri platite integral de companie.' },
  { icon: Zap, title: 'Tehnologie de top', desc: 'Lucrezi cu cele mai avansate echipamente din industrie: 3Shape, Straumann, Planmeca, CAD/CAM.' },
  { icon: Globe, title: 'Cariera internationala', desc: 'Oportunitati de transfer intre cele 9 filiale din 4 tari. Program de mobilitate interna.' },
  { icon: Heart, title: 'Sanatate si wellbeing', desc: 'Asigurare medicala privata, tratamente stomatologice gratuite pentru angajati si familie.' },
  { icon: Coffee, title: 'Work-life balance', desc: 'Program flexibil, zile libere suplimentare, team building-uri si evenimente sociale regulate.' },
  { icon: Plane, title: 'Concediu extins', desc: '28 zile de concediu anual + zile libere pentru evenimente personale si dezvoltare profesionala.' },
  { icon: Dumbbell, title: 'Abonament fitness', desc: 'Abonament la sala de fitness platit de companie. Programe de wellness si mindfulness.' },
]

/* ─── Employee Testimonials ───────────────── */
const TESTIMONIALS = [
  { name: 'Dr. Elena Rusu', role: 'Medic Stomatolog, 6 ani la SDT', text: 'La SDT am gasit echipa care ma inspira zilnic. Tehnologiile cu care lucram sunt la nivel mondial, iar pacientii simt diferenta.', photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face' },
  { name: 'Andrei Moraru', role: 'Tehnicien Dentar, 4 ani la SDT', text: 'Lucrul cu CAD/CAM si zirconiu de ultima generatie mi-a transformat complet abordarea profesionala. Aici invat ceva nou in fiecare zi.', photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face' },
  { name: 'Marina Cebotari', role: 'Coordonator Pacienti, 3 ani la SDT', text: 'Atmosfera la SDT este unica. Fiecare coleg este dedicat si profesionist. Ma simt parte dintr-o familie care face diferenta.', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face' },
]

/* ─── Career Numbers ──────────────────────── */
const CAREER_NUMBERS = [
  { value: '600+', label: 'Angajati in echipa' },
  { value: '4', label: 'Tari de prezenta' },
  { value: '85%', label: 'Rata de retentie' },
  { value: '50+', label: 'Training-uri/an' },
  { value: '28', label: 'Zile concediu' },
  { value: '100%', label: 'Tratamente gratuite' },
]

/* ─── Culture Photos ──────────────────────── */
const CULTURE_PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=350&fit=crop', alt: 'Echipa SDT in actiune' },
  { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop', alt: 'Team building SDT' },
  { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=350&fit=crop', alt: 'Training profesional' },
  { src: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&h=350&fit=crop', alt: 'Conferinta anuala' },
]

/* ─── FAQ ─────────────────────────────────── */
const FAQ = [
  { q: 'Cum aplic pentru o pozitie la SDT?', a: 'Trimite CV-ul tau prin formularul de pe aceasta pagina sau la cariere@smiledent.md. Echipa HR te va contacta in maxim 48h pentru un interviu telefonic initial.' },
  { q: 'Ce documente am nevoie?', a: 'CV actualizat, copie diploma, certificari relevante (daca este cazul). Pentru medici: atestat de libera practica si asigurare de malpraxis.' },
  { q: 'Cum arata procesul de recrutare?', a: 'Etapele: 1) Aplicare online, 2) Interviu telefonic HR, 3) Interviu tehnic cu seful de departament, 4) Zi de proba (platita), 5) Oferta finala.' },
  { q: 'Oferiti relocare pentru pozitii internationale?', a: 'Da, oferim pachet complet de relocare: transport, cazare temporara, asistenta administrativa si perioada de adaptare platita.' },
  { q: 'Exista oportunitati part-time?', a: 'Pentru anumite pozitii clinice oferim program part-time (4-6h/zi). Pozitiile administrative sunt exclusiv full-time.' },
  { q: 'Cum este mediul de lucru?', a: 'Clinicile noastre sunt moderne, echipate cu tehnologii de ultima generatie. Atmosfera este profesionala dar prietenoasa. Investim in wellbeing-ul echipei.' },
]

/* ─── Page Component ─────────────────────── */
export function CarierePage() {
  const [expandedJob, setExpandedJob] = useState<number | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [filterDept, setFilterDept] = useState<string>('all')

  const departments = ['all', ...Array.from(new Set(POSITIONS.map(p => p.department)))]
  const filtered = filterDept === 'all' ? POSITIONS : POSITIONS.filter(p => p.department === filterDept)

  return (
    <>
      <Nav />
      <style dangerouslySetInnerHTML={{ __html: ANIM_CAR }} />

      {/* ━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${B.nv} 0%, #0f2e24 50%, ${B.pd} 100%)` }}>
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 items-center gap-10 px-12 pb-20 pt-[72px]">
          <div>
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[.12] px-3.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-500" style={{ animation: 'pulse-dot 2s infinite' }} />
              <span className="text-[11px] font-bold uppercase tracking-[.12em] text-white">Cariere la Smile Dent Team</span>
            </div>
            <h1 className="font-display mb-[18px] text-[44px] font-semibold leading-[1.08] tracking-tight text-white">
              Construieste viitorul <span className="text-pink-500">stomatologiei.</span>
            </h1>
            <p className="mb-7 max-w-[440px] text-base leading-relaxed text-white/[.65]">
              Alatura-te unei echipe de {STATS.team} profesionisti care transforma zambete in fiecare zi. Tehnologii de top mondial, dezvoltare continua si o cultura bazata pe excelenta.
            </p>
            <div className="flex gap-3.5">
              <Button variant="accent" className="gap-2 px-8 py-3.5 text-[15px] font-bold">
                Vezi pozitiile deschise <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="gap-2 border-white/20 px-6 py-3.5 text-[15px] text-white hover:bg-white/10">
                Aplica spontan
              </Button>
            </div>
            <div className="mt-11 flex gap-8">
              {[['6', 'pozitii deschise'], [STATS.team, 'in echipa'], ['4', 'tari'], ['85%', 'retentie']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-[28px] font-semibold text-pink-500">{n}</div>
                  <div className="mt-0.5 text-xs text-white/[.45]">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Team constellation */}
          <div className="relative flex h-[400px] items-center justify-center">
            {/* Central */}
            <div className="relative z-10 flex h-[90px] w-[90px] flex-col items-center justify-center rounded-full border-2 border-white/20 bg-white/[.08] backdrop-blur-md">
              <Users className="h-7 w-7 text-white/80" strokeWidth={1.5} />
              <span className="mt-1 text-[8px] font-bold text-white/50">ECHIPA</span>
            </div>
            {/* Department nodes */}
            {[
              { icon: Stethoscope, label: 'Medici', angle: 0 },
              { icon: GraduationCap, label: 'Training', angle: 60 },
              { icon: Globe, label: 'International', angle: 120 },
              { icon: Briefcase, label: 'Admin', angle: 180 },
              { icon: Lightbulb, label: 'Marketing', angle: 240 },
              { icon: Heart, label: 'Wellbeing', angle: 300 },
            ].map((node, i) => {
              const r = 140
              const rad = (node.angle * Math.PI) / 180
              return (
                <div key={i} className="absolute" style={{
                  left: `calc(50% + ${Math.cos(rad) * r}px - 28px)`,
                  top: `calc(50% + ${Math.sin(rad) * r}px - 22px)`,
                  animation: `float ${3 + i * 0.3}s ${i * 0.4}s ease-in-out infinite`,
                }}>
                  <div className="flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/[.06] px-3 py-2.5 backdrop-blur-sm">
                    <node.icon className="h-4 w-4 text-pink-400" strokeWidth={1.5} />
                    <span className="text-[9px] font-semibold text-white/60">{node.label}</span>
                  </div>
                </div>
              )
            })}
            {/* Orbit ring */}
            <div className="absolute rounded-full border border-white/[.06]" style={{ width: 336, height: 336 }} />
          </div>
        </div>
      </section>

      {/* ━━━ CAREER NUMBERS STRIP ━━━━━━━━━━━━━ */}
      <section className="py-12 px-12" style={{ background: `linear-gradient(135deg, ${B.p}, ${B.pm})` }}>
        <div className="mx-auto max-w-[1200px] grid grid-cols-6 gap-6">
          {CAREER_NUMBERS.map((c, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-[28px] font-semibold text-white">{c.value}</div>
              <div className="text-xs text-white/50 mt-0.5">{c.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━ OPEN POSITIONS ━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-10">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-pink-500" />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: B.p }}>Pozitii deschise</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Gaseste <span className="text-pink-500">rolul potrivit</span>
            </h2>
          </div>

          {/* Department filter */}
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {departments.map(d => (
              <button key={d} onClick={() => setFilterDept(d)}
                className={cn(
                  'px-4 py-2 rounded-full text-[12px] font-semibold border transition-all cursor-pointer',
                  filterDept === d
                    ? 'bg-sdt-600 text-white border-sdt-600'
                    : 'bg-white text-[#5a7a6e] border-[--bdr] hover:border-sdt-200'
                )}
              >
                {d === 'all' ? 'Toate departamentele' : d}
              </button>
            ))}
          </div>

          {/* Job cards */}
          <div className="space-y-4">
            {filtered.map((job, i) => (
              <div key={i} className="border border-[--bdr] rounded-xl overflow-hidden bg-white hover:border-sdt-200 transition-all">
                <button
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                  onClick={() => setExpandedJob(expandedJob === i ? null : i)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${B.p}0D` }}>
                      <Briefcase className="w-5 h-5 text-sdt-600" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display text-[17px] font-semibold" style={{ color: B.nv }}>{job.title}</h3>
                        {job.urgent && <Badge className="bg-pink-500 text-white border-0 text-[9px]">URGENT</Badge>}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[#5a7a6e]">
                        <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{job.department}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.type}</span>
                        <span className="flex items-center gap-1"><Award className="w-3 h-3" />{job.experience}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-[10px] font-bold border-sdt-200 text-sdt-600">{job.department}</Badge>
                    {expandedJob === i
                      ? <ChevronUp className="w-5 h-5 text-sdt-600" />
                      : <ChevronDown className="w-5 h-5 text-[#5a7a6e]" />
                    }
                  </div>
                </button>
                {expandedJob === i && (
                  <div className="px-6 pb-6 pt-0 border-t border-[--bdr] animate-fadeUp" style={{ animationDuration: '0.25s' }}>
                    <div className="grid grid-cols-2 gap-8 mt-5">
                      <div>
                        <h4 className="text-[12px] font-bold uppercase tracking-[.12em] text-sdt-600 mb-3">Descrierea rolului</h4>
                        <p className="text-sm leading-[1.75] text-[#5a7a6e] mb-5">{job.desc}</p>
                        <h4 className="text-[12px] font-bold uppercase tracking-[.12em] text-sdt-600 mb-3">Cerinte</h4>
                        <ul className="space-y-2">
                          {job.requirements.map(r => (
                            <li key={r} className="flex items-center gap-2 text-sm text-[#5a7a6e]">
                              <CheckCircle className="w-4 h-4 text-sdt-600 flex-shrink-0" strokeWidth={1.5} />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex flex-col justify-between">
                        <div className="p-5 rounded-xl border border-[--bdr] bg-[#fafcfb]">
                          <h4 className="font-display text-[15px] font-semibold mb-3" style={{ color: B.nv }}>Ce oferim</h4>
                          <div className="space-y-2 text-sm text-[#5a7a6e]">
                            {['Salariu competitiv + bonusuri', 'Asigurare medicala privata', 'Training-uri internationale', 'Tratamente dentare gratuite', 'Program flexibil'].map(b => (
                              <div key={b} className="flex items-center gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-pink-500 flex-shrink-0" strokeWidth={1.5} />
                                {b}
                              </div>
                            ))}
                          </div>
                        </div>
                        <Button variant="accent" className="gap-2 mt-4 w-full justify-center text-[14px] font-bold">
                          <Send className="w-4 h-4" /> Aplica pentru aceasta pozitie
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ BENEFITS ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: B.ps }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-14">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: B.p }} />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: B.p }}>De ce Smile Dent Team</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Beneficii care <span className="text-pink-500">conteaza</span>
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {BENEFITS.map((b, i) => (
              <Card key={i} className="group border-[--bdr] hover:border-sdt-200 transition-all hover:shadow-lg hover:shadow-sdt-500/[.06]">
                <CardContent className="p-6">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: `${B.p}0D` }}>
                    <b.icon className="w-5 h-5 text-sdt-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-[15px] font-semibold mb-2" style={{ color: B.nv }}>{b.title}</h3>
                  <p className="text-[12px] leading-[1.7] text-[#5a7a6e]">{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ CULTURE GALLERY ━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-2 gap-16 items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-pink-500" />
                <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: B.p }}>Cultura noastra</span>
              </div>
              <h2 className="font-display text-[36px] font-semibold tracking-tight leading-[1.1] mb-5" style={{ color: B.nv }}>
                Mai mult decat<br/>un loc de <span className="text-pink-500">munca.</span>
              </h2>
              <p className="text-[15px] leading-[1.8] text-[#5a7a6e] mb-6">
                La Smile Dent Team, credem ca oamenii fericiti creaza rezultate exceptionale. Investim in echipa noastra la fel cum investim in tehnologie — constant, serios si pe termen lung.
              </p>
              <p className="text-[15px] leading-[1.8] text-[#5a7a6e] mb-8">
                Organizam lunar training-uri interne, trimestrial team building-uri si anual conferinte internationale. Fiecare membru al echipei are un plan individual de dezvoltare profesionala.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {([
                  { I: BookOpen, l: 'Training lunar garantat' },
                  { I: Users, l: 'Team building trimestrial' },
                  { I: Plane, l: 'Conferinte internationale' },
                  { I: Smile, l: 'Wellbeing program' },
                ] as const).map(({ I, l }) => (
                  <div key={l} className="flex items-center gap-2.5 p-3 rounded-lg border border-[--bdr]">
                    <I className="w-4 h-4 text-sdt-600 flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-[12px] font-semibold text-[#5a7a6e]">{l}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {CULTURE_PHOTOS.map((p, i) => (
                <div key={i} className="rounded-xl overflow-hidden group cursor-pointer" style={{ height: i === 0 || i === 3 ? 220 : 180 }}>
                  <img src={p.src} alt={p.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ TESTIMONIALS ━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 px-12" style={{ background: B.nv }}>
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center mb-12">
            <h2 className="font-display text-[32px] font-semibold tracking-tight text-white">
              Ce spun <span className="text-pink-500">colegii nostri</span>
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-6 rounded-xl border border-white/[.07] bg-white/[.03]">
                <div className="flex items-center gap-3 mb-4">
                  <img src={t.photo} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-[11px] text-pink-400">{t.role}</div>
                  </div>
                </div>
                <p className="text-sm leading-[1.7] text-white/60 italic">&ldquo;{t.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ APPLICATION FORM ━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: B.ps }}>
        <div className="mx-auto max-w-[700px]">
          <div className="text-center mb-10">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-pink-500" />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: B.p }}>Aplica acum</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Trimite <span className="text-pink-500">aplicatia ta</span>
            </h2>
            <p className="mt-3 text-sm text-[#5a7a6e]">Completeaza formularul si te contactam in maxim 48h.</p>
          </div>
          <div className="bg-white rounded-2xl border border-[--bdr] p-8">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input placeholder="Prenume *" />
              <Input placeholder="Nume *" />
            </div>
            <Input placeholder="Email *" className="mb-4" />
            <Input placeholder="Telefon *" className="mb-4" />
            <select defaultValue="" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mb-4">
              <option value="" disabled>Pozitia dorita</option>
              {POSITIONS.map(p => <option key={p.title}>{p.title}</option>)}
              <option>Aplicatie spontana</option>
            </select>
            <textarea placeholder="Mesaj optional / Link CV online (LinkedIn, Google Drive)" rows={4}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm mb-4 resize-none"
            />
            <Button variant="accent" className="w-full justify-center gap-2 py-3.5 text-[15px] font-bold">
              <Send className="w-4 h-4" /> Trimite aplicatia
            </Button>
            <p className="text-[11px] text-[#5a7a6e] text-center mt-3">
              Sau trimite CV-ul la <a href="mailto:cariere@smiledent.md" className="text-sdt-600 font-semibold no-underline">cariere@smiledent.md</a>
            </p>
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
              Despre procesul de <span className="text-pink-500">recrutare</span>
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
            {[['Despre noi','/despre-noi'],['Echipa','/echipa'],['Ambasadori','/ambasadori'],['Tehnologii','/tehnologii'],['Blog','/'],['Cariere','/cariere'],['Contacte','/contacte']].map(([s,h]) => (
              <a key={s} href={h} className={cn(
                'block text-[13px] mb-2.5 no-underline hover:text-white transition-colors',
                s === 'Cariere' ? 'text-pink-500 font-semibold' : 'text-white/[.58]'
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

'use client'

import { useState } from 'react'
import { Logo } from './Logo'
import { BRAND as B, STATS, SERVICES, LOCATIONS, CAMPAIGN_2026, AMBASSADORS, SVC_COLORS } from '@/lib/brand'
import { BLOG_ARTICLES } from '@/lib/blog-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  ArrowRight, Clock, CheckCircle, Shield,
  Star, ChevronDown, ChevronUp, Heart, Eye,
  Users, Sparkles, BookOpen, Timer, Award,
  Stethoscope, Scan, Target, Zap, Phone,
  MapPin, DollarSign, AlertCircle, Activity,
  Play, UserCheck, GraduationCap, Syringe, Brain
} from 'lucide-react'

const C = SVC_COLORS.chirurgie

/* ─── NAV ─────────────────────────────────── */
const NAV_LINKS: [string, string][] = [
  ['Servicii', '/servicii'], ['Digital Check-Up', '/digital-checkup'],
  ['Consultatie Online', '/consultatie-online'], ['Echipa', '/echipa'], ['Recenzii', '/recenzii'],
]
function Nav() {
  return (
    <nav className="sticky top-0 z-[100] bg-white border-b border-[--bdr] px-12 py-3.5 flex justify-between items-center" style={{ borderTop: `3px solid ${C.accent}` }}>
      <a href="/" className="no-underline"><Logo height={36}/></a>
      <div className="flex gap-7 items-center">
        {NAV_LINKS.map(([l, h]) => (
          <a key={l} href={h} className={cn('relative text-sm no-underline pb-1 font-medium', l === 'Servicii' ? 'font-bold text-[#dc2626]' : 'text-[#3a5a50]')}>
            {l}
            {l === 'Servicii' && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-5 rounded-full" style={{ background: C.accent }} />}
          </a>
        ))}
      </div>
      <div className="flex gap-2.5 items-center">
        <a href="/login" className="no-underline"><Button variant="outline" size="sm" className="border-[#dc2626] text-[#dc2626] font-semibold text-[13px]">Cabinetul meu</Button></a>
        <Button size="sm" className="text-[13px] text-white" style={{ background: C.accent }}>Programeaza-te</Button>
      </div>
    </nav>
  )
}

const ANIM = `
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
`

/* ═══════════════════════════════════════════════
   CONCEPT: "EXPERT PRECISION, ZERO WORRY"
   Authoritative, reassuring, clinical expertise
   Target: 25+ ani, complex cases, referred patients
   ═══════════════════════════════════════════════ */

/* ─── Case types with complexity ──────────── */
const CASE_TYPES = [
  { name: 'Extractii complexe', complexity: 2, desc: 'Dinti de minte inclusi, dinti fracturati, resturi radiculare. Extractie chirurgicala minim invaziva cu piezosurgery.', icon: Zap, duration: '30-60 min' },
  { name: 'Augmentare osoasa', complexity: 3, desc: 'Aditie de os autolog sau sintetic pentru pregatirea insertiei implanturilor. Inclusiv sinus lifting intern si extern.', icon: Activity, duration: '60-90 min' },
  { name: 'Sinus lifting', complexity: 3, desc: 'Ridicarea membranei sinusale pentru a crea spatiu osos suficient pentru implanturi in zona posterioara superioara.', icon: Target, duration: '60-120 min' },
  { name: 'Rezectie apicala', complexity: 2, desc: 'Inlaturarea infectiei de la varful radacinii dintelui. Alternativa la extractie — salveaza dintele.', icon: Stethoscope, duration: '45-60 min' },
  { name: 'Chirurgie preprotetica', complexity: 2, desc: 'Regularizarea crestei osoase, indepartarea exostozelor, pregatirea campului pentru protezare.', icon: Shield, duration: '30-45 min' },
  { name: 'Chirurgie parodontala', complexity: 3, desc: 'Lambouri chirurgicale, regenerare ghidata, grefe gingivale. Tratament avansat pentru parodontita severa.', icon: Heart, duration: '60-90 min' },
]

/* ─── Surgical team ───────────────────────── */
const DOCTORS = [
  { name: 'Dr. Andrei Moraru', title: 'Chirurg Oral Principal', experience: '12 ani', cases: '3.500+ interventii', credentials: ['Doctorat Chirurgie Oro-Maxilo-Faciala', 'Trainer Straumann', 'Certificare Piezosurgery'], photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face' },
  { name: 'Dr. Victor Ene', title: 'Chirurg Implantolog', experience: '8 ani', cases: '2.000+ implanturi', credentials: ['Specializare Implantologie', 'Certificare Nobel Biocare', 'Ghidaj digital 3D'], photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&crop=face' },
  { name: 'Dr. Marina Cebotari', title: 'Anesteziolog', experience: '10 ani', cases: '5.000+ sedari', credentials: ['Specializare ATI', 'Sedare constienta', 'Analgosedare pediatrica'], photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face' },
]

/* ─── Technology ──────────────────────────── */
const TECH = [
  { name: 'Piezosurgery', desc: 'Chirurgie cu ultrasunete — taietura precisa, fara afectarea tesuturilor moi. Vindecare mai rapida, mai putin edem.', icon: Zap, metric: '0.2mm precizie' },
  { name: 'Ghid chirurgical 3D', desc: 'Tiparit 3D din planificarea digitala CBCT. Pozitioneaza implantul cu precizie sub 0.5mm.', icon: Target, metric: 'Precizie sub-milimetrica' },
  { name: 'Tomografie CBCT', desc: 'Imagine 3D completa a structurilor osoase si anatomice. Planificare fara surprize.', icon: Scan, metric: 'Rezolutie 0.1mm' },
  { name: 'Sedare constienta', desc: 'Administrata de medic anesteziolog. Esti relaxat, treaz dar fara anxietate sau durere.', icon: Brain, metric: 'Monitorizare continua' },
]

/* ─── Recovery timeline ───────────────────── */
const RECOVERY = [
  { day: 'Ziua 0', title: 'Interventia', desc: 'Procedura sub anestezie locala + sedare constienta (optional). Protectie antibiotica.', color: '#dc2626' },
  { day: 'Ziua 1-3', title: 'Edem si disconfort usor', desc: 'Aplicare gheata, analgezice prescrise, dieta moale. Edemul atinge maximul in ziua 2-3.', color: '#f59e0b' },
  { day: 'Ziua 4-7', title: 'Recuperare activa', desc: 'Edemul scade progresiv. Incepi alimentatia semi-solida. Control post-operator la clinica.', color: '#0891b2' },
  { day: 'Ziua 7-14', title: 'Vindecare semnificativa', desc: 'Scoaterea firelor (daca este cazul). Revenire la alimentatia normala. Activitate fizica usoara.', color: '#059669' },
  { day: 'Luna 1-3', title: 'Vindecare completa', desc: 'Osul se regenereaza complet. Control la 1 luna si 3 luni. Reluarea tuturor activitatilor.', color: '#059669' },
]

const FAQ = [
  { q: 'Cat dureaza o extractie de minte?', a: 'O extractie chirurgicala de molar de minte dureaza 30-60 minute, in functie de complexitate (pozitie, grad de incluziune). Sub anestezie locala, nu simtiti durere.' },
  { q: 'Ce este sedarea constienta?', a: 'Sedarea constienta este o tehnica de anxioliza administrata intravenos de un medic anesteziolog. Esti relaxat, somnoros dar treaz, raspunzi la comenzi dar nu simti durere si nu ai amintiri neplacute.' },
  { q: 'Cat dureaza recuperarea dupa extractie chirurgicala?', a: 'Edemul dureaza 3-5 zile, cu maximum in ziua 2-3. Durerile sunt ussoare si controlate cu analgezice. Revenirea la normal: 7-10 zile. Vindecare osoasa completa: 2-3 luni.' },
  { q: 'Ce este piezosurgery?', a: 'Piezosurgery este o tehnologie chirurgicala cu ultrasunete care taie osul cu precizie de 0.2mm fara a afecta tesuturile moi (nervi, vase, membrana sinusala). Rezultat: vindecare mai rapida, mai putin edem.' },
  { q: 'Pot sa conduc dupa sedare constienta?', a: 'Nu. Dupa sedare constienta, nu aveti voie sa conduceti 24 de ore. Veti avea nevoie de un insotitor care sa va duca acasa. Efectele sedarii dispar complet in 4-6 ore.' },
  { q: 'Cat costa o extractie chirurgicala?', a: 'Extractia chirurgicala porneste de la 200 euro si include: anestezie, extractia propriu-zisa, sutura si controalele post-operatorii. Sedarea constienta se adauga separat.' },
]

const RELATED_BLOGS = BLOG_ARTICLES.filter(a => a.tags.some(t => t.includes('chirurgie') || t.includes('extractie') || t.includes('sedare') || t.includes('implant'))).slice(0, 3)
const RELATED_AMBASSADORS = AMBASSADORS.filter(a => ['talmazan', 'malareu', 'cosovan'].includes(a.slug))

/* ─── Page Component ─────────────────────── */
export function ChirurgiePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeCase, setActiveCase] = useState(0)
  const [activeDoctor, setActiveDoctor] = useState(0)
  const [recoveryStep, setRecoveryStep] = useState(0)

  return (
    <>
      <Nav />
      <style dangerouslySetInnerHTML={{ __html: ANIM }} />

      {/* Breadcrumbs */}
      <div className="bg-[#fafcfb] border-b border-[--bdr] px-12 py-3">
        <div className="mx-auto max-w-[1200px] flex items-center gap-2 text-[12px] text-[#5a7a6e]">
          <a href="/" className="no-underline text-[#5a7a6e] hover:text-sdt-600">Acasa</a><span>/</span>
          <a href="/servicii" className="no-underline text-[#5a7a6e] hover:text-sdt-600">Servicii</a><span>/</span>
          <span className="font-semibold" style={{ color: C.accent }}>Chirurgie Orala</span>
        </div>
      </div>

      {/* ━━━ HERO — Authoritative, expertise-first ━━━ */}
      <section className="relative overflow-hidden" style={{ background: C.gradient }}>
        <div className="mx-auto max-w-[1200px] px-12 py-20">
          <div className="grid grid-cols-[1fr_440px] gap-12 items-center">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <Badge className="text-white border-0 text-[10px] font-bold" style={{ background: C.accent }}>CHIRURGIE ORALA</Badge>
                <Badge className="bg-white/10 text-white/70 border-white/20 text-[10px]">GHIDAJ 3D</Badge>
                <Badge className="bg-white/10 text-white/70 border-white/20 text-[10px]">SEDARE CONSTIENTA</Badge>
              </div>
              <h1 className="font-display mb-5 text-[44px] font-semibold leading-[1.05] tracking-tight text-white">
                Maini experte,<br/>
                <span className="text-red-300">ghidaj 3D.</span>
              </h1>
              <p className="mb-6 max-w-[460px] text-[16px] leading-relaxed text-white/50">
                Chirurgie orala de precizie cu tehnologie piezosurgery si ghid 3D. Sedare constienta disponibila pentru confort maxim. Echipa cu peste 5.000 de interventii.
              </p>
              <div className="space-y-3 mb-8 max-w-[440px]">
                {([
                  { I: Stethoscope, l: '5.000+ interventii chirurgicale realizate' },
                  { I: Target, l: 'Piezosurgery — precizie 0.2mm, vindecare rapida' },
                  { I: Brain, l: 'Sedare constienta — zero anxietate, zero durere' },
                  { I: Scan, l: 'Planificare 3D CBCT — zero surprize' },
                ] as const).map(({ I, l }) => (
                  <div key={l} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${C.accent}30` }}>
                      <I className="w-4 h-4 text-red-300" strokeWidth={1.5} />
                    </div>
                    <span className="text-[14px] text-white/70 leading-relaxed">{l}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <Button className="gap-2 px-8 py-4 text-[15px] font-bold text-white" style={{ background: C.accent }}>
                  Programeaza consultatie <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="gap-2 border-white/20 px-6 py-4 text-[15px] text-white hover:bg-white/10">
                  <Phone className="h-4 w-4" /> Urgente: {LOCATIONS[0].phone}
                </Button>
              </div>
            </div>

            {/* Right — Doctor expertise */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border-2 border-white/10 relative" style={{ aspectRatio: '3/4' }}>
                <img src={DOCTORS[0].photo} alt={DOCTORS[0].name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-[11px] uppercase tracking-[.15em] text-white/50 mb-1">Chirurg principal</div>
                  <div className="font-display text-[20px] font-semibold text-white mb-1">{DOCTORS[0].name}</div>
                  <div className="text-[12px] text-white/60">{DOCTORS[0].experience} experienta &middot; {DOCTORS[0].cases}</div>
                </div>
              </div>
              {/* Emergency card */}
              <div className="absolute -bottom-4 -left-6 bg-white rounded-xl px-5 py-3 shadow-lg" style={{ animation: 'float 3s ease-in-out infinite' }}>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" style={{ color: C.accent }} strokeWidth={1.5} />
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: C.accent }}>Urgente</div>
                    <div className="text-[13px] font-semibold" style={{ color: B.nv }}>{LOCATIONS[0].phone}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ CASE TYPES — Complexity indicator ━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center mb-12">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: C.accent }} />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: C.accent }}>Cazuri pe care le rezolvam</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Expertiza pentru cazuri <span style={{ color: C.accent }}>complexe</span>
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {CASE_TYPES.map((c, i) => (
              <button key={i} onClick={() => setActiveCase(i)}
                className={cn(
                  'p-6 rounded-xl text-left cursor-pointer border transition-all',
                  activeCase === i ? 'bg-red-50/50 border-red-200 shadow-sm' : 'bg-white border-[--bdr] hover:border-red-200'
                )}
              >
                <div className="flex justify-between items-start mb-3">
                  <c.icon className={cn('w-7 h-7', activeCase === i ? 'text-red-600' : 'text-[#5a7a6e]')} strokeWidth={1.5} />
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#5a7a6e]">Complexitate</span>
                    <div className="flex gap-0.5">
                      {[1,2,3].map(j => (
                        <div key={j} className={cn('w-3 h-3 rounded-full', j <= c.complexity ? 'bg-red-400' : 'bg-gray-200')} />
                      ))}
                    </div>
                  </div>
                </div>
                <h3 className={cn('font-display text-[15px] font-semibold mb-2', activeCase === i ? 'text-red-700' : 'text-[#0a1e18]')}>{c.name}</h3>
                <p className="text-[12px] leading-[1.6] text-[#5a7a6e] mb-3">{c.desc}</p>
                <div className="flex items-center gap-1.5 text-[11px]" style={{ color: C.accent }}>
                  <Clock className="w-3 h-3" /> {c.duration}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ SURGICAL TEAM ━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: '#fef2f2' }}>
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center mb-12">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <UserCheck className="w-4 h-4" style={{ color: C.accent }} />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: C.accent }}>Echipa chirurgicala</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Expertii din spatele <span style={{ color: C.accent }}>preciziei</span>
            </h2>
          </div>

          <div className="grid grid-cols-[300px_1fr] gap-6">
            {/* Doctor selection */}
            <div className="space-y-3">
              {DOCTORS.map((d, i) => (
                <button key={i} onClick={() => setActiveDoctor(i)}
                  className={cn(
                    'w-full flex items-center gap-4 p-4 rounded-xl cursor-pointer border transition-all text-left',
                    activeDoctor === i ? 'bg-white border-red-200 shadow-sm' : 'bg-transparent border-transparent hover:bg-white/60'
                  )}
                >
                  <img src={d.photo} alt={d.name} className="w-14 h-14 rounded-xl object-cover" />
                  <div>
                    <div className={cn('text-[13px] font-semibold', activeDoctor === i ? 'text-red-700' : 'text-[#0a1e18]')}>{d.name}</div>
                    <div className="text-[11px] text-[#5a7a6e]">{d.title}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Doctor detail */}
            <div className="bg-white rounded-2xl border border-[--bdr] p-8 shadow-sm" key={activeDoctor} style={{ animation: 'fadeUp 0.25s ease-out' }}>
              <div className="flex items-center gap-5 mb-6">
                <img src={DOCTORS[activeDoctor].photo} alt={DOCTORS[activeDoctor].name} className="w-20 h-20 rounded-2xl object-cover ring-2 ring-red-100" />
                <div>
                  <h3 className="font-display text-[22px] font-semibold" style={{ color: B.nv }}>{DOCTORS[activeDoctor].name}</h3>
                  <div className="text-[13px]" style={{ color: C.accent }}>{DOCTORS[activeDoctor].title}</div>
                  <div className="flex gap-4 mt-1 text-[11px] text-[#5a7a6e]">
                    <span><Award className="w-3 h-3 inline mr-1" />{DOCTORS[activeDoctor].experience}</span>
                    <span><Stethoscope className="w-3 h-3 inline mr-1" />{DOCTORS[activeDoctor].cases}</span>
                  </div>
                </div>
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: C.accent }}>Credentiale si certificari</div>
              <div className="space-y-2.5">
                {DOCTORS[activeDoctor].credentials.map(cred => (
                  <div key={cred} className="flex items-center gap-2.5">
                    <GraduationCap className="w-4 h-4 flex-shrink-0" style={{ color: C.accent }} strokeWidth={1.5} />
                    <span className="text-[13px] text-[#5a7a6e]">{cred}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ TECHNOLOGY ━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="text-center mb-12">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" style={{ color: C.accent }} />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: C.accent }}>Tehnologie chirurgicala</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Precizie <span style={{ color: C.accent }}>tehnologica</span>
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {TECH.map((t, i) => (
              <Card key={i} className="border-[--bdr] hover:border-red-200 transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <t.icon className="w-8 h-8 mb-4" style={{ color: C.accent }} strokeWidth={1.5} />
                  <h3 className="font-display text-[15px] font-semibold mb-2" style={{ color: B.nv }}>{t.name}</h3>
                  <p className="text-[12px] leading-[1.65] text-[#5a7a6e] mb-3">{t.desc}</p>
                  <Badge className="text-[9px] font-bold border-0 text-white" style={{ background: C.accent }}>{t.metric}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ SEDARE CONSTIENTA — Dedicated section ━━━ */}
      <section className="py-20 px-12" style={{ background: C.gradient }}>
        <div className="mx-auto max-w-[1100px]">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-red-300" />
                <span className="text-[11px] font-bold uppercase tracking-[.15em] text-red-300">Sedare constienta</span>
              </div>
              <h2 className="font-display text-[32px] font-semibold tracking-tight text-white mb-4">
                Zero anxietate.<br/><span className="text-red-300">Zero durere.</span>
              </h2>
              <p className="text-[15px] leading-[1.8] text-white/50 mb-6">
                Sedarea constienta este administrata intravenos de un medic anesteziolog cu monitorizare continua. Esti relaxat, somnoros, dar treaz. Nu simti durere si nu ai amintiri neplacute.
              </p>
              <div className="space-y-3 mb-6">
                {([
                  { I: Brain, l: 'Administrata de medic anesteziolog ATI' },
                  { I: Activity, l: 'Monitorizare continua: puls, saturatie, tensiune' },
                  { I: Heart, l: 'Relaxare profunda — nu simti nimic' },
                  { I: Timer, l: 'Efecte dispar complet in 4-6 ore' },
                  { I: Shield, l: 'Sigura — mii de sedari realizate la SDT' },
                ] as const).map(({ I, l }) => (
                  <div key={l} className="flex items-center gap-3">
                    <I className="w-5 h-5 text-red-300 flex-shrink-0" strokeWidth={1.5} />
                    <span className="text-[14px] text-white/60">{l}</span>
                  </div>
                ))}
              </div>
              <Button className="text-white text-[14px] font-bold" style={{ background: C.accent }}>
                Vreau sedare constienta <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="bg-white/[.06] border border-white/10 rounded-2xl p-8">
              <div className="text-[11px] font-bold uppercase tracking-wider text-red-300 mb-4">Cum functioneaza</div>
              <div className="space-y-5">
                {[
                  { step: '1', title: 'Evaluare preoperatorie', desc: 'Anesteziologul evalueaza starea de sanatate si stabileste protocolul de sedare.' },
                  { step: '2', title: 'Administrare IV', desc: 'Sedativul este administrat intravenos. In cateva minute te simti profund relaxat.' },
                  { step: '3', title: 'Monitorizare continua', desc: 'Pe toata durata interventiei, parametrii vitali sunt monitorizati constant.' },
                  { step: '4', title: 'Trezire lina', desc: 'Dupa interventie, te trezesti gradat. In 30-60 minute esti alert si poti pleca acasa.' },
                ].map(s => (
                  <div key={s.step} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-[14px] font-bold text-white" style={{ background: C.accent }}>{s.step}</div>
                    <div>
                      <div className="text-[14px] font-semibold text-white mb-0.5">{s.title}</div>
                      <div className="text-[12px] text-white/50 leading-[1.6]">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ RECOVERY TIMELINE ━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12">
        <div className="mx-auto max-w-[900px]">
          <div className="text-center mb-12">
            <div className="mb-3 inline-flex items-center gap-1.5">
              <Timer className="w-4 h-4" style={{ color: C.accent }} />
              <span className="text-[11px] font-bold uppercase tracking-[.15em]" style={{ color: C.accent }}>Recuperare</span>
            </div>
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              La ce sa te <span style={{ color: C.accent }}>astepti</span>
            </h2>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gray-200" />
            <div className="space-y-6">
              {RECOVERY.map((r, i) => (
                <button key={i} onClick={() => setRecoveryStep(i)}
                  className={cn(
                    'relative flex items-start gap-5 pl-0 text-left cursor-pointer w-full border-none bg-transparent',
                    recoveryStep === i ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                  )}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-4 border-white" style={{ background: r.color }}>
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </div>
                  <div className={cn('flex-1 p-5 rounded-xl transition-all', recoveryStep === i ? 'bg-white border border-[--bdr] shadow-sm' : '')}>
                    <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: r.color }}>{r.day}</div>
                    <h3 className="font-display text-[15px] font-semibold mb-1" style={{ color: B.nv }}>{r.title}</h3>
                    {recoveryStep === i && <p className="text-[13px] text-[#5a7a6e] leading-[1.65]">{r.desc}</p>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ INTERCONNECTED: Blog ━━━━━━━━━━━━━ */}
      {RELATED_BLOGS.length > 0 && (
        <section className="py-14 px-12" style={{ background: B.ps }}>
          <div className="mx-auto max-w-[1200px]">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" style={{ color: C.accent }} />
                <h2 className="font-display text-[20px] font-semibold" style={{ color: B.nv }}>Citeste mai mult despre chirurgie orala</h2>
              </div>
              <a href="/blog" className="text-[13px] font-bold no-underline flex items-center gap-1" style={{ color: C.accent }}>Toate articolele <ArrowRight className="w-3.5 h-3.5" /></a>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {RELATED_BLOGS.map(art => (
                <a key={art.slug} href={`/blog/${art.slug}`} className="no-underline group">
                  <Card className="overflow-hidden border-[--bdr] hover:border-red-200 transition-all hover:shadow-lg h-full">
                    <div className="h-[160px] overflow-hidden">
                      <img src={art.image} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <CardContent className="p-4">
                      <div className="text-[11px] text-[#5a7a6e] mb-2"><Clock className="w-3 h-3 inline mr-1" />{art.readTime}</div>
                      <h3 className="font-display text-[14px] font-semibold leading-snug group-hover:text-red-600 transition-colors" style={{ color: B.nv }}>{art.title}</h3>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ━━━ INTERCONNECTED: Ambassadors ━━━━━━━ */}
      <section className="py-14 px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" style={{ color: C.accent }} />
              <h2 className="font-display text-[20px] font-semibold" style={{ color: B.nv }}>Ambasadori care au ales chirurgie la SDT</h2>
            </div>
            <a href="/ambasadori" className="text-[13px] font-bold no-underline flex items-center gap-1" style={{ color: C.accent }}>Toti ambasadorii <ArrowRight className="w-3.5 h-3.5" /></a>
          </div>
          <div className="flex gap-5">
            {RELATED_AMBASSADORS.map(amb => (
              <a key={amb.slug} href="/ambasadori" className="no-underline group flex items-center gap-4 bg-white rounded-xl p-4 border border-[--bdr] hover:border-red-200 transition-all flex-1">
                <img src={amb.photo} alt={amb.name} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <div className="font-display text-[15px] font-semibold group-hover:text-red-600 transition-colors" style={{ color: B.nv }}>{amb.name}</div>
                  <div className="text-[11px] font-semibold" style={{ color: C.accent }}>{amb.role}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ FAQ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: '#fef2f2' }}>
        <div className="mx-auto max-w-[800px]">
          <div className="text-center mb-12">
            <h2 className="font-display text-[36px] font-semibold tracking-tight" style={{ color: B.nv }}>
              Intrebari despre <span style={{ color: C.accent }}>chirurgie</span>
            </h2>
          </div>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="border border-[--bdr] rounded-xl overflow-hidden bg-white">
                <button className="w-full flex justify-between items-center p-5 text-left cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-display text-[15px] font-semibold pr-4" style={{ color: B.nv }}>{item.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 flex-shrink-0" style={{ color: C.accent }} /> : <ChevronDown className="w-5 h-5 flex-shrink-0 text-[#5a7a6e]" />}
                </button>
                {openFaq === i && <div className="px-5 pb-5 pt-0 text-[14px] leading-[1.75] text-[#5a7a6e]">{item.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ FINAL CTA ━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-12" style={{ background: `linear-gradient(135deg, #1e0a0a 0%, ${C.accent} 100%)` }}>
        <div className="mx-auto max-w-[1200px] flex gap-16 items-center">
          <div className="flex-1 text-white">
            <h2 className="font-display text-[36px] font-semibold leading-[1.1] mb-4">
              Expertiza care<br/><span className="text-red-300">elimina teama.</span>
            </h2>
            <p className="text-white/50 mb-6 max-w-[400px] text-[15px] leading-relaxed">
              Consultatia chirurgicala include tomografie 3D si plan complet de tratament. Afli exact ce urmeaza, fara surprize.
            </p>
            <div className="space-y-2.5 mb-6">
              {(['Consultatie chirurgicala completa', 'Tomografie 3D CBCT inclusa', 'Plan de tratament detaliat cu pret exact', 'Sedare constienta disponibila'] as const).map(item => (
                <div key={item} className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-red-300 flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-[14px] text-white/70">{item}</span>
                </div>
              ))}
            </div>
            {/* Emergency prominent */}
            <div className="mt-6 p-4 rounded-xl bg-white/10 border border-white/20 inline-flex items-center gap-3">
              <Phone className="w-5 h-5 text-red-300" />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-red-300">Urgente chirurgicale</div>
                <div className="text-[16px] font-semibold text-white">{LOCATIONS[0].phone}</div>
              </div>
            </div>
          </div>
          <div className="w-[400px] shrink-0 bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="font-display text-[20px] font-semibold mb-1" style={{ color: B.nv }}>Consultatie chirurgicala</h3>
            <p className="text-sm text-[#5a7a6e] mb-5">Te contactam in maxim 24h.</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Input placeholder="Prenume" />
              <Input placeholder="Nume" />
            </div>
            <Input placeholder="Telefon *" className="mb-3" />
            <select defaultValue="Chirurgie" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mb-3">
              <option>Extractie chirurgicala</option>
              <option>Augmentare osoasa</option>
              <option>Sinus lifting</option>
              <option>Alt caz — vreau consultatie</option>
            </select>
            <Button className="w-full justify-center py-3.5 text-[14px] font-bold text-white" style={{ background: C.accent }}>
              Programeaza consultatie <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <p className="text-[10px] text-[#5a7a6e] text-center mt-2">Include tomografie 3D CBCT.</p>
          </div>
        </div>
      </section>

      {/* ━━━ FOOTER ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="section-line" />
      <footer className="pt-16 pb-8 px-[52px]" style={{ background: B.nv }}>
        <div className="grid gap-12 mb-12" style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr' }}>
          <div>
            <div className="mb-5"><Logo height={34} light/></div>
            <p className="text-sm leading-[1.75] text-white/60 max-w-[260px]">Clinica stomatologica digitala. {STATS.years} ani, {STATS.team} specialisti, {STATS.patients} pacienti.</p>
            <div className="mt-5 p-3 px-4 border rounded-lg" style={{ background: `${C.accent}15`, borderColor: `${C.accent}30` }}>
              <div className="font-display text-base font-semibold" style={{ color: C.accent }}>{CAMPAIGN_2026.slogan}</div>
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-white tracking-[.15em] uppercase mb-5">Servicii</div>
            <a href="/servicii/chirurgie-orala" className="block text-[13px] mb-2.5 font-semibold no-underline" style={{ color: C.accent }}>Chirurgie Orala</a>
            {SERVICES.filter(s => s.slug !== 'chirurgie').map(s => (
              <div key={s.slug} className="text-[13px] mb-2.5 text-white/[.58] cursor-pointer hover:text-white transition-colors">{s.name}</div>
            ))}
          </div>
          <div>
            <div className="text-[11px] font-bold text-white tracking-[.15em] uppercase mb-5">Clinica</div>
            {[['Despre noi','/despre-noi'],['Echipa','/echipa'],['Ambasadori','/ambasadori'],['Tehnologii','/tehnologii'],['Blog','/blog'],['Cariere','/cariere'],['Contacte','/contacte']].map(([s,h]) => (
              <a key={s} href={h} className="block text-[13px] mb-2.5 text-white/[.58] no-underline hover:text-white transition-colors">{s}</a>
            ))}
          </div>
          <div>
            <div className="text-[11px] font-bold text-white tracking-[.15em] uppercase mb-5">Contact</div>
            {LOCATIONS.slice(0,3).map(l => (
              <div key={l.city} className="mb-4 leading-[1.65]">
                <div className="text-[13px] font-semibold text-white">{l.city}</div>
                <div className="text-xs text-white/[.52]">{l.address} &middot; {l.phone}</div>
              </div>
            ))}
            <a href="mailto:info@smiledent.md" className="text-[13px] font-semibold no-underline" style={{ color: `${C.accent}cc` }}>info@smiledent.md</a>
          </div>
        </div>
        <div className="border-t border-white/[.07] pt-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Logo height={26} light/>
            <span className="text-xs text-white/[.28]">&copy; {CAMPAIGN_2026.year} Smile Dent Team.</span>
          </div>
          <div className="flex gap-1.5">
            {['RO','RU','EN'].map(l => (
              <span key={l} className="bg-white/[.08] text-white/50 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-[.08em] cursor-pointer hover:bg-white/15 hover:text-white transition-all">{l}</span>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}

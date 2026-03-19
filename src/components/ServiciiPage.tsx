'use client'
import { useState } from 'react'
import { BRAND as B, SERVICES, STATS, LOCATIONS, CAMPAIGN_2026, AMBASSADORS } from '@/lib/brand'
import { Logo } from './Logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  FileText, Monitor, Bookmark, Moon, CheckCircle, Shield, User, Clock,
  Heart, Video, Star, Play, ArrowRight, ChevronRight, Smile, Zap, Sparkles,
} from 'lucide-react'

/* ─── Animations — Hexagonal grid ─── */
const ANIM_SVC = `
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
  @keyframes hexPulse{0%,100%{opacity:.5;transform:scale(.95)}50%{opacity:1;transform:scale(1)}}
  @keyframes hexGlow{0%,100%{box-shadow:0 0 0 0 rgba(232,21,122,0)}50%{box-shadow:0 0 20px 4px rgba(232,21,122,.15)}}
`

/* ─── Hex positions for honeycomb grid (3 rows: 3-3-3) ─── */
const HEX_GRID = [
  /* Row 1 */  { x: 0, y: 0 },   { x: 72, y: 0 },   { x: 144, y: 0 },
  /* Row 2 */  { x: 36, y: 62 },  { x: 108, y: 62 },  { x: 180, y: 62 },
  /* Row 3 */  { x: 0, y: 124 },  { x: 72, y: 124 },  { x: 144, y: 124 },
]

const SVC_HEX_ICONS = [
  { Icon: Shield, label: 'Implant' },
  { Icon: Monitor, label: 'Coroane' },
  { Icon: Bookmark, label: 'All-On' },
  { Icon: Sparkles, label: 'Fațete' },
  { Icon: CheckCircle, label: 'Orto' },
  { Icon: Heart, label: 'Check-Up' },
  { Icon: FileText, label: 'Terapie' },
  { Icon: Zap, label: 'Chirurgie' },
  { Icon: Video, label: 'Online' },
]

/* ─── Rich service detail data ────────────── */
const SVC_DETAILS: Record<string, {
  hero: string; desc: string; process: string[];
  benefits: [string,string][]; techs: string[];
  reviews: { text:string; author:string; rating:number }[];
  ambassador?: { name:string; quote:string; photo:string };
  photo: string;
}> = {
  implantologie: {
    hero: 'Implant dentar — solutia permanenta pentru dintii lipsa. Planificare 3D, inserare ghidata, rezultat previzibil.',
    desc: 'Implanturile dentare inlocuiesc radacina dintelui pierdut cu un stalp de titan biocompatibil. Planificam fiecare caz digital, inseram ghidat 3D si oferim optiuni de incarcare imediata pentru confort maxim.',
    process: ['Consultatie + Tomografie 3D CBCT','Planificare digitala a pozitiei implantului','Inserare ghidata — minim invaziv','Vindecare 2-4 luni + protezare finala'],
    benefits: [
      ['check-circle','Planificare 3D completa — precizie maxima'],
      ['shield','Inserare ghidata — fara taieturi, fara suturi'],
      ['user','Garantie pe viata pe implant'],
      ['clock','Optiune de incarcare imediata'],
    ],
    techs: ['Straumann','Nobel Biocare','CBCT 3D','Ghid chirurgical digital','3Shape Trios'],
    reviews: [
      { text:'Am primit implantul fara durere. In 3 luni aveam dinte nou. Recomand!', author:'Denis P.', rating:5 },
      { text:'Echipa a fost extraordinara. Totul planificat digital, fara surprize.', author:'Elena M.', rating:5 },
    ],
    ambassador: { name:'Dumitru Talmazan', quote:'Implantul dentar mi-a redat increderea in zambet. Tehnologia 3D face totul previzibil.', photo:AMBASSADORS[0].photo },
    photo: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop',
  },
  protetica: {
    hero: 'Coroane dentare CAD/CAM — restaurari precise, estetice si durabile. Scanare digitala, fabricare in aceeasi zi.',
    desc: 'Coroanele dentare protejeaza si restaureaza dintii deteriorati. Folosim tehnologie CAD/CAM pentru scanare digitala, design si frezare — fara amprenta clasica, cu precizie de microni.',
    process: ['Scanare digitala 3Shape','Design virtual al coroanei','Frezare CAD/CAM din zirconiu/E-max','Cimentare definitiva — estetica perfecta'],
    benefits: [
      ['check-circle','Fara amprenta clasica — doar scanner digital'],
      ['shield','Materiale premium: zirconiu, E-max'],
      ['user','Garantie pe viata pe structura'],
      ['clock','Coroana temporara in aceeasi sedinta'],
    ],
    techs: ['Cerec/inLab','Zirconiu','E-max','3Shape','Scanner intraoral'],
    reviews: [
      { text:'Coroanele arata perfect natural. Nimeni nu le deosebeste de dintii mei.', author:'Ion V.', rating:5 },
    ],
    photo: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop',
  },
  allon: {
    hero: 'Dinti ficsi pe implanturi — alternativa moderna la protezele mobile. Reabilitare completa in aceeasi zi.',
    desc: 'All-On-4/6 este solutia pentru pacientii cu edentatie totala sau partiala avansata. Inseram 4-6 implanturi strategic pozitionate si fixam o arcada completa de dinti — totul planificat 3D, realizat intr-o singura zi.',
    process: ['Digital Check-Up + Tomografie CBCT','Plan chirurgical 3D + ghid personalizat','Inserare implanturi + arcada provizorie fixa','Protezare finala dupa 3-4 luni'],
    benefits: [
      ['check-circle','Dinti ficsi in aceeasi zi — pleci cu zambet nou'],
      ['shield','Alternative la proteza mobila — nu se misca, nu cad'],
      ['user','Sedare constienta disponibila'],
      ['clock','Rate 0% disponibile'],
    ],
    techs: ['All-On-4','All-On-6','Straumann','Nobel Biocare','CBCT 3D','Sedare constienta'],
    reviews: [
      { text:'Am scapat de proteza mobila! Acum am dinti ficsi si pot manca orice.', author:'Maria S.', rating:5 },
      { text:'Interventia a durat doar cateva ore. Am plecat acasa cu dinti noi.', author:'Victor D.', rating:5 },
    ],
    ambassador: { name:'Valeriu Rascu', quote:'All-On-4 este o revolutie. Am vazut cum oameni isi schimba viata intr-o zi.', photo:AMBASSADORS[3].photo },
    photo: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop',
  },
  estetica: {
    hero: 'Fatete dentare — zambetul de Hollywood, planificat digital. Vizualizezi rezultatul inainte de tratament.',
    desc: 'Fatetele sunt placute subtiri de ceramica E-max care acopera fata vizibila a dintelui. Cu Digital Smile Design, simulam rezultatul 3D inainte de orice procedura — aprobi designul, apoi realizam.',
    process: ['Digital Smile Design — simulare 3D','Mock-up in gura — testezi rezultatul','Preparare minimala','Bonding fatete ceramice E-max'],
    benefits: [
      ['check-circle','Vizualizare 3D inainte de tratament'],
      ['shield','Rezultat natural, personalizat'],
      ['user','Ceramica E-max — rezistenta 15+ ani'],
      ['clock','Preparare minimala — protejam dintele'],
    ],
    techs: ['Digital Smile Design','Fatete E-max','Scanner 3Shape','Albire Philips Zoom'],
    reviews: [
      { text:'Zambetul pe care l-am visat! Totul a fost planificat perfect.', author:'Maria T.', rating:5 },
    ],
    ambassador: { name:'Nicoleta Adam', quote:'Fatetele de la SDT mi-au schimbat complet increderea. Arata absolut natural.', photo:AMBASSADORS[1].photo },
    photo: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&h=400&fit=crop',
  },
  ortodontie: {
    hero: 'Ortodontie digitala — alignere invizibile sau bracketi, planificate 3D pentru rezultat predictibil.',
    desc: 'Corectam problemele de aliniere cu Invisalign sau bracketi autoligaturante. Planificam fiecare miscare digital — stii exact cum va arata rezultatul final inainte de a incepe.',
    process: ['Scanare digitala iTero','Plan ClinCheck — simulare completa','Aliniere cu Invisalign sau bracketi','Contentie + monitorizare'],
    benefits: [
      ['check-circle','Simulare 3D a rezultatului final'],
      ['shield','Aliniere invizibila — fara bracketi vizibili'],
      ['user','Monitorizare digitala la distanta'],
      ['clock','Rate 0% disponibile'],
    ],
    techs: ['Invisalign','iTero Scanner','ClinCheck','Damon System','Accelerated Ortho'],
    reviews: [
      { text:'Copilul meu adora vizitele! Tratamentul merge perfect.', author:'Svetlana L.', rating:5 },
    ],
    photo: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&h=400&fit=crop',
  },
  'digital-checkup': {
    hero: 'Digital Check-Up — evaluare completa, digitala si fara discomfort. Primul pas catre sanatatea orala.',
    desc: 'Scanare 3D, tomografie CBCT, analiza completa — in 30 minute ai o imagine clara a sanatatii tale orale. Planul de tratament detaliat, cu costuri transparente, fara surprize.',
    process: ['Scanare intraorala 3Shape Trios','Tomografie 3D CBCT','Analiza completa + diagnostic','Plan de tratament personalizat + costuri'],
    benefits: [
      ['check-circle','100% digital — fara amprenta clasica'],
      ['shield','Diagnostic precis cu tomografie 3D'],
      ['user','Durata ~30 minute, fara durere'],
      ['clock','Plan transparent cu preturi clare'],
    ],
    techs: ['3Shape Trios','CBCT 3D','Digital Workflow','Software diagnostic'],
    reviews: [
      { text:'Am inteles exact ce am nevoie. Totul transparent, fara presiune.', author:'Ana R.', rating:5 },
    ],
    photo: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop',
  },
  terapie: {
    hero: 'Terapie & Profilaxie — preventia este cel mai bun tratament. Igienizare profesionala fara durere.',
    desc: 'Oferim igienizare profesionala cu ultrasunete, tratament parodontal, obturatii estetice si profilaxie completa. Totul cu instrumente digitale pentru o experienta confortabila.',
    process: ['Evaluare digitala completa','Igienizare profesionala cu ultrasunete','Tratament carii / restaurari estetice','Plan de preventie personalizat'],
    benefits: [
      ['check-circle','Detectie timpurie cu scanner digital'],
      ['shield','Tratament fara durere — anestezie digitala'],
      ['user','Igienizare profesionala cu ultrasunete'],
      ['clock','Plan personalizat de preventie'],
    ],
    techs: ['Scanner digital','Ultrasunete','Anestezie digitala','Materiale biocompatibile'],
    reviews: [
      { text:'Foarte atenta, tratament fara durere. Recomand!', author:'Nadejda B.', rating:5 },
    ],
    photo: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop',
  },
  chirurgie: {
    hero: 'Chirurgie orala — extractii complexe, augmentari osoase, rezectii. Totul ghidat 3D, minim invaziv.',
    desc: 'Realizam interventii chirurgicale complexe cu ghidare 3D: extractii de masele de minte, augmentari osoase, rezectii apicale, sinus lifting. Planificare digitala completa pentru siguranta maxima.',
    process: ['Tomografie 3D + planificare digitala','Ghid chirurgical personalizat','Interventie minim invaziva','Monitorizare post-operatorie'],
    benefits: [
      ['check-circle','Ghid chirurgical 3D — precizie maxima'],
      ['shield','Interventie minim invaziva'],
      ['user','Sedare constienta disponibila'],
      ['clock','Recuperare rapida post-operatorie'],
    ],
    techs: ['CBCT 3D','Ghid chirurgical','Piezosurgery','PRF/PRP','Sedare constienta'],
    reviews: [
      { text:'M-am simtit in siguranta pe tot parcursul interventiei.', author:'Elena M.', rating:5 },
    ],
    photo: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=600&h=400&fit=crop',
  },
  'consultatie-online': {
    hero: 'Consultatie Online — pentru diaspora si pacienti la distanta. Discutam, analizam, planificam.',
    desc: 'Esti in strainatate? Trimite tomografia, discutam la distanta, primesti un plan complet de tratament. Vii pregatit la clinica — economisesti timp si bani.',
    process: ['Trimite tomografia online','Consultatie video 1:1','Plan de tratament personalizat','Programare prioritara la sosire'],
    benefits: [
      ['check-circle','Consultatie video cu specialistul'],
      ['shield','Analiza completa la distanta'],
      ['user','Plan detaliat inainte de sosire'],
      ['clock','Disponibil: UK, Germania, Franta, USA'],
    ],
    techs: ['Consultatie Video','Radiografie digitala','Plan 3D la distanta','Programare prioritara'],
    reviews: [
      { text:'Am planificat totul din Germania. Cand am ajuns, am inceput imediat.', author:'Andrei K.', rating:5 },
    ],
    photo: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
  },
}

/* ─── SVG icon paths per service ─────────── */
const SVC_ICONS: Record<string, string> = {
  implantologie:         'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
  protetica:             'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  allon:                 'M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z',
  estetica:              'M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z',
  ortodontie:            'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  'digital-checkup':     'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  terapie:               'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  chirurgie:             'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  'consultatie-online':  'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
}

/* ─── Benefit icon map ──────────────────── */
const BENEFIT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  'check-circle': CheckCircle,
  'shield': Shield,
  'user': User,
  'clock': Clock,
}

/* ─── Nav ──────────────────────────────────── */
const NAV_LINKS: [string, string][] = [
  ['Servicii','/servicii'],
  ['Digital Check-Up','/digital-checkup'],
  ['Consultatie Online','/consultatie-online'],
  ['Echipa','/echipa'],
  ['Recenzii','/recenzii'],
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
          <a
            key={l}
            href={h}
            className={cn(
              'relative text-sm no-underline pb-1',
              l === 'Servicii'
                ? 'font-bold text-sdt-600'
                : 'font-medium text-[#3a5a50]'
            )}
          >
            {l}
            {l === 'Servicii' && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-5 rounded-full bg-pink-500" />}
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

/* ─── Service Detail Page ─────────────────── */
function ServiceDetail({ svc }: { svc: typeof SERVICES[number] }) {
  const detail = SVC_DETAILS[svc.slug]
  if (!detail) return null
  const iconPath = SVC_ICONS[svc.slug]

  return (
    <div className="animate-fadeUp">
      {/* Service Hero */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-12 border-b border-[--bdr]">
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg,${B.p},${B.pm})` }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={B.wh} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={iconPath}/></svg>
            </div>
            <div>
              <h2 className="font-display text-[28px] font-semibold text-[--nv] leading-none">{svc.name}</h2>
              <div className="flex gap-2 mt-1">
                <Badge className="text-[11px] font-semibold bg-sdt-100 text-sdt-600 border-none">{svc.tag}</Badge>
                <Badge className="text-[11px] font-bold bg-sdt-100 text-sdt-800 border-none">{svc.price}</Badge>
                {svc.rate && (
                  <Badge variant="accent" className="text-[10px] font-extrabold">{`RATE 0%`}</Badge>
                )}
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-[--gr] my-4 max-w-[480px]">{detail.desc}</p>
          <div className="flex gap-2.5">
            <Button className="text-sm px-7 py-3">
              Programeaza-te <ArrowRight className="w-4 h-4 ml-1"/>
            </Button>
            {svc.slug === 'digital-checkup' && (
              <a href="/digital-checkup" className="no-underline">
                <Button variant="outline" className="text-[13px] px-6 py-3 border-sdt-600 text-sdt-600">
                  Pagina completa <ChevronRight className="w-4 h-4 ml-1"/>
                </Button>
              </a>
            )}
            {svc.slug === 'consultatie-online' && (
              <a href="/consultatie-online" className="no-underline">
                <Button variant="outline" className="text-[13px] px-6 py-3 border-sdt-600 text-sdt-600">
                  Pagina completa <ChevronRight className="w-4 h-4 ml-1"/>
                </Button>
              </a>
            )}
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden h-[280px]">
          <img src={detail.photo} alt={svc.name} className="w-full h-full object-cover"/>
        </div>
      </div>

      {/* Process + Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 border-b border-[--bdr]">
        {/* Process */}
        <div>
          <div className="text-[11px] font-bold text-sdt-600 tracking-[.12em] uppercase mb-4">Procesul de tratament</div>
          <div className="flex flex-col gap-3">
            {detail.process.map((step, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-lg bg-sdt-100 flex items-center justify-center shrink-0">
                  <span className="text-xs font-extrabold text-sdt-600">{String(i+1).padStart(2,'0')}</span>
                </div>
                <div className="text-[13px] text-[--nv] font-medium pt-1">{step}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Benefits */}
        <div>
          <div className="text-[11px] font-bold text-sdt-600 tracking-[.12em] uppercase mb-4">Avantaje</div>
          <div className="flex flex-col gap-2.5">
            {detail.benefits.map(([iconKey, text]) => {
              const IconComp = BENEFIT_ICONS[iconKey] || CheckCircle
              return (
                <div key={text} className="flex items-center gap-2.5">
                  <IconComp className="w-4 h-4 text-sdt-600 shrink-0"/>
                  <span className="text-[13px] text-[--nv] font-medium">{text}</span>
                </div>
              )
            })}
          </div>
          <div className="mt-5">
            <div className="text-[11px] font-bold text-sdt-600 tracking-[.12em] uppercase mb-2.5">Tehnologii</div>
            <div className="flex flex-wrap gap-1.5">
              {detail.techs.map(t => (
                <Badge key={t} className="text-[11px] font-semibold bg-sdt-100 text-sdt-600 border border-[--bdr]">{t}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews -- scrollable */}
      <div className="py-10 border-b border-[--bdr]">
        <div className="flex justify-between items-center mb-4">
          <div className="text-[11px] font-bold text-sdt-600 tracking-[.12em] uppercase">Recenzii pacienti</div>
          <a href="/#recenzii" className="text-xs font-semibold text-sdt-600 no-underline">Toate recenziile <ArrowRight className="w-3 h-3 inline ml-0.5"/></a>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {detail.reviews.map((r, i) => (
            <Card key={i} className="bg-sdt-50 rounded-[14px] border-l-[3px] border-l-sdt-600 border-t-0 border-r-0 border-b-0 min-w-[320px] shrink-0 shadow-none">
              <CardContent className="p-5">
                <div className="text-[#fbb040] text-xs mb-1.5">{'★'.repeat(r.rating)}</div>
                <p className="text-[13px] leading-relaxed text-[--nv] mb-2 italic">&ldquo;{r.text}&rdquo;</p>
                <div className="text-xs text-[--gr] font-semibold">&mdash; {r.author}</div>
              </CardContent>
            </Card>
          ))}
          <Card className="bg-sdt-100 rounded-[14px] min-w-[200px] shrink-0 border-dashed border-[--bdr] shadow-none">
            <CardContent className="p-5 flex items-center justify-center h-full">
              <div className="text-center">
                <div className="font-display text-lg font-semibold text-sdt-600">4.9</div>
                <div className="text-[#fbb040] text-[10px] mt-0.5">★★★★★</div>
                <div className="text-[10px] text-[--gr] mt-1">1 200+ recenzii Google</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Video Reels -- horizontal scroll */}
      <div className="py-10 border-b border-[--bdr]">
        <div className="text-[11px] font-bold text-sdt-600 tracking-[.12em] uppercase mb-4">Video testimoniale</div>
        <div className="flex gap-3.5 overflow-x-auto pb-2">
          {[1,2,3,4].map(i => (
            <div
              key={i}
              className="w-[180px] h-[320px] rounded-2xl shrink-0 cursor-pointer flex items-center justify-center relative overflow-hidden"
              style={{ background: `linear-gradient(160deg, ${B.nv} 0%, #0f2e24 100%)` }}
            >
              <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center opacity-90">
                <Play className="w-[18px] h-[18px] text-white fill-white"/>
              </div>
              <div className="absolute bottom-3.5 left-3.5 right-3.5">
                <div className="text-[11px] font-bold text-white">Pacient #{i}</div>
                <div className="text-[9px] text-white/50">{svc.name} &mdash; feedback video</div>
              </div>
              <div className="absolute top-2.5 right-2.5">
                <Video className="w-3.5 h-3.5 text-white/40"/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Ambassador recommendation */}
      {detail.ambassador && (
        <div className="py-10 border-b border-[--bdr]">
          <div className="text-[11px] font-bold text-pink-500 tracking-[.12em] uppercase mb-4">Ambasador recomanda</div>
          <div className="grid grid-cols-[auto_1fr] rounded-[18px] overflow-hidden border border-pink-500/[.13]">
            <div className="w-[200px] relative">
              <img src={detail.ambassador.photo.replace('300','600')} alt={detail.ambassador.name} className="w-full h-full object-cover min-h-[200px]"/>
              <div className="absolute bottom-0 left-0 right-0 p-3" style={{ background: 'linear-gradient(to top, rgba(10,30,24,.8), transparent)' }}>
                <Badge variant="accent" className="text-[9px] font-bold">AMBASADOR</Badge>
              </div>
            </div>
            <div className="bg-pink-50 px-6 py-7 flex flex-col justify-center">
              <p className="text-base leading-relaxed text-[--nv] mb-3 italic font-display font-semibold">
                &ldquo;{detail.ambassador.quote}&rdquo;
              </p>
              <div className="font-display text-[15px] font-semibold text-pink-500">&mdash; {detail.ambassador.name}</div>
              <a href="/ambasadori" className="text-xs font-semibold text-pink-500 mt-2.5 no-underline">
                Vezi profilul complet <ArrowRight className="w-3 h-3 inline ml-0.5"/>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="py-10 text-center">
        <h3 className="font-display text-[22px] font-semibold text-[--nv] mb-2.5">
          Pregatit pentru {svc.name.toLowerCase()}?
        </h3>
        <p className="text-sm text-[--gr] mb-5">Programeaza-te acum si fa primul pas.</p>
        <Button variant="accent" className="text-[15px] px-9 py-3.5">
          Programeaza-te <ArrowRight className="w-4 h-4 ml-1.5"/>
        </Button>
      </div>
    </div>
  )
}

/* ─── Main Page ────────────────────────────── */
export function ServiciiPage() {
  const [activeTab, setActiveTab] = useState<string|null>(null)
  const activeService = SERVICES.find(s => s.slug === activeTab)

  return (
    <>
      <Nav/>
      <style dangerouslySetInnerHTML={{ __html: ANIM_SVC }} />

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${B.nv} 0%, #0f2e24 50%, ${B.pd} 100%)` }}>
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 items-center gap-10 px-12 pb-16 pt-[72px]">
          <div>
            <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[.12] px-3.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              <span className="text-[11px] font-bold uppercase tracking-[.12em] text-white">Servicii complete</span>
            </div>
            <h1 className="font-display mb-[18px] text-[44px] font-semibold leading-[1.08] tracking-tight text-white">
              Tot ce ai nevoie,<br/>intr-un <span className="text-pink-500">singur loc.</span>
            </h1>
            <p className="mb-7 max-w-[440px] text-base leading-relaxed text-white/[.65]">
              {SERVICES.length} specialitati, tehnologie digitala de ultima generatie — totul pentru zambetul tau.
            </p>
            <div className="flex gap-3.5">
              <Button variant="accent" className="gap-2 px-8 py-3.5 text-[15px] font-bold">
                Exploreaza serviciile <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-11 flex gap-8">
              {[[SERVICES.length.toString(),'servicii'],['15','ani experienta'],['40.000+','pacienti']].map(([n,l]) => (
                <div key={l}>
                  <div className="font-display text-[28px] font-semibold text-pink-500">{n}</div>
                  <div className="mt-0.5 text-xs text-white/[.45]">{l}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Right — Honeycomb service grid */}
          <div className="relative flex h-[400px] items-center justify-center">
            <div className="relative" style={{ width: 216, height: 190 }}>
              {SVC_HEX_ICONS.map(({ Icon, label }, i) => {
                const pos = HEX_GRID[i]
                const delay = i * 0.3
                return (
                  <div
                    key={i}
                    className="absolute flex flex-col items-center justify-center"
                    style={{
                      left: pos.x,
                      top: pos.y,
                      width: 64,
                      height: 64,
                      animation: `float ${3 + (i % 3) * 0.5}s ${delay}s ease-in-out infinite, hexPulse ${4 + (i % 4)}s ${delay}s ease-in-out infinite`,
                    }}
                  >
                    <div
                      className="flex h-[58px] w-[58px] flex-col items-center justify-center rounded-2xl border border-white/10 backdrop-blur-sm"
                      style={{
                        background: i === 4 ? `linear-gradient(135deg, ${B.a}33, ${B.a}11)` : `linear-gradient(135deg, ${B.p}22, ${B.pm}11)`,
                        animation: i === 4 ? 'hexGlow 3s ease-in-out infinite' : undefined,
                      }}
                    >
                      <Icon className={cn('h-5 w-5', i === 4 ? 'text-pink-400' : 'text-white/70')} strokeWidth={1.5} />
                      <span className={cn('mt-1 text-[8px] font-medium', i === 4 ? 'text-pink-300' : 'text-white/40')}>{label}</span>
                    </div>
                  </div>
                )
              })}
            </div>
            {/* Floating stat cards */}
            <div
              className="absolute right-0 top-[30px] z-[3] rounded-xl bg-white px-[18px] py-3 shadow-[0_8px_32px_rgba(0,0,0,.15)]"
              style={{ animation: 'float 4s ease-in-out infinite' }}
            >
              <div className="mb-0.5 text-[11px] text-[#5a7a6e]">Rate</div>
              <div className="font-display text-xl font-semibold text-pink-500">0%</div>
            </div>
            <div
              className="absolute bottom-[30px] left-[10px] z-[3] rounded-xl bg-white px-[18px] py-3 shadow-[0_8px_32px_rgba(0,0,0,.15)]"
              style={{ animation: 'float 4.5s 1s ease-in-out infinite' }}
            >
              <div className="text-[13px] text-[#fbb040]">★★★★★</div>
              <div className="text-xs font-bold text-sdt-900">Google Reviews</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-12 py-10">
        {/* Service Tabs */}
        <div className="flex gap-1.5 flex-wrap mb-2 border-b-2 border-[--bdr] pb-0">
          <button
            onClick={() => setActiveTab(null)}
            className={cn(
              'px-[18px] py-2.5 text-[13px] font-bold cursor-pointer font-sans border-none rounded-t-lg transition-all',
              !activeTab
                ? 'bg-sdt-600 text-white border-b-2 border-b-sdt-600'
                : 'bg-transparent text-[--nv] border-b-2 border-b-transparent'
            )}
          >
            Toate serviciile
          </button>
          {SERVICES.map(s => {
            const hasLanding = s.slug === 'implantologie' || s.slug === 'digital-checkup' || s.slug === 'consultatie-online'
            const landingUrl = s.slug === 'implantologie' ? '/servicii/implant-dentar' : s.slug === 'digital-checkup' ? '/digital-checkup' : s.slug === 'consultatie-online' ? '/consultatie-online' : ''
            return hasLanding ? (
              <a key={s.slug} href={landingUrl}
                className={cn('px-3.5 py-2.5 text-xs font-semibold cursor-pointer font-sans border-none rounded-t-lg transition-all whitespace-nowrap no-underline bg-transparent text-[#5a7a6e] border-b-2 border-b-transparent hover:text-sdt-600')}
              >{s.name}</a>
            ) : (
            <button
              key={s.slug}
              onClick={() => setActiveTab(s.slug)}
              className={cn(
                'px-3.5 py-2.5 text-xs font-semibold cursor-pointer font-sans border-none rounded-t-lg transition-all whitespace-nowrap',
                activeTab === s.slug
                  ? 'bg-sdt-600 text-white border-b-2 border-b-sdt-600'
                  : 'bg-transparent text-[#5a7a6e] border-b-2 border-b-transparent'
              )}
            >
              {s.name}
            </button>
            )
          })}
        </div>

        {/* Content: cards grid or detail page */}
        {!activeTab ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
            {SERVICES.map((svc, index) => {
              const iconPath = SVC_ICONS[svc.slug]
              const landingUrl = svc.slug === 'implantologie' ? '/servicii/implant-dentar' : svc.slug === 'digital-checkup' ? '/digital-checkup' : svc.slug === 'consultatie-online' ? '/consultatie-online' : ''
              return (
                <Card
                  key={svc.slug}
                  onClick={() => { if (landingUrl) { window.location.href = landingUrl } else { setActiveTab(svc.slug) } }}
                  className="bg-white rounded-[14px] border border-[--bdr] p-6 cursor-pointer transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-sdt-600 hover:shadow-lg shadow-none"
                >
                  <CardContent className="p-0">
                    <div className="flex items-center gap-3.5 mb-3">
                      <div className="w-11 h-11 rounded-xl bg-sdt-100 flex items-center justify-center shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={B.p} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={iconPath}/></svg>
                      </div>
                      <div>
                        <span className="text-[11px] text-sdt-600/30 font-bold">{String(index+1).padStart(2,'0')}</span>
                        <h3 className="font-display text-base font-medium text-[--nv]">{svc.name}</h3>
                      </div>
                    </div>
                    <div className="flex gap-1.5 flex-wrap mb-2.5">
                      <Badge className="text-[10px] font-semibold bg-sdt-100 text-sdt-600 border-none">{svc.tag}</Badge>
                      <Badge className="text-[10px] font-bold bg-sdt-100 text-sdt-800 border-none">{svc.price}</Badge>
                      {svc.rate && (
                        <Badge variant="accent" className="text-[9px] font-extrabold py-0">{`RATE 0%`}</Badge>
                      )}
                    </div>
                    <p className="text-xs leading-normal text-[--gr]">{svc.audience}</p>
                    <div className="mt-3 text-xs font-semibold text-sdt-600">
                      Detalii <ArrowRight className="w-3 h-3 inline ml-0.5"/>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : activeService ? (
          <ServiceDetail svc={activeService}/>
        ) : null}
      </section>

      {/* Footer */}
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
            {[['Despre noi','/despre-noi'],['Echipa','/echipa'],['Ambasadori','/ambasadori'],['Tehnologii','/tehnologii'],['Blog','/blog'],['Cariere','/cariere'],['Contacte','/contacte']].map(([s,h]) => (
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

'use client'
import { useState } from 'react'
import { BRAND as B, SERVICES, STATS, LOCATIONS, CAMPAIGN_2026 } from '@/lib/brand'
import { Logo } from './Logo'

/* ─── Animations ─────────────────────────── */
const ANIM = `
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes barGrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
`

/* ─── Service detail data ────────────────── */
const SVC_DETAILS: Record<string, { desc: string; benefits: [string,string][]; techs: string[] }> = {
  estetica: {
    desc: 'Transformăm zâmbete cu tehnologie digitală de ultimă generație. De la fațete dentare la albire profesională — fiecare procedură este planificată digital pentru un rezultat natural și armonios.',
    benefits: [
      ['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z','Vizualizare rezultat înainte de tratament'],
      ['M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z','Digital Smile Design — previzualizare 3D'],
      ['M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z','Rezultat natural, personalizat'],
      ['M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z','Proceduri rapide, minim invazive'],
    ],
    techs: ['Digital Smile Design','Fațete E-max','Albire Philips Zoom','Scanner 3Shape'],
  },
  terapie: {
    desc: 'Prevenția este cel mai bun tratament. Oferim igienizare profesională, tratament parodontal și profilaxie cu instrumente digitale pentru o experiență fără durere.',
    benefits: [
      ['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z','Detecție timpurie cu scanner digital'],
      ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z','Tratament fără durere — anestezie digitală'],
      ['M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z','Igienizare profesională cu ultrasunete'],
      ['M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z','Plan personalizat de prevenție'],
    ],
    techs: ['Air Flow','Ultrasunete EMS','Laser diodă','Microscop dentar'],
  },
  chirurgie: {
    desc: 'Chirurgie orală ghidată 3D — de la extracții complexe la augmentări osoase. Fiecare intervenție este planificată digital pentru precizie maximă și recuperare rapidă.',
    benefits: [
      ['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z','Planificare 3D pre-operatorie'],
      ['M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z','Ghidaj chirurgical digital'],
      ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z','Recuperare rapidă, minim invazivă'],
      ['M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z','Sedare conștientă disponibilă'],
    ],
    techs: ['CBCT 3D','Ghid chirurgical','Piezo surgery','PRF/PRP'],
  },
  implantologie: {
    desc: 'Implanturi dentare planificate 100% digital. De la un singur implant la reabilitări complete — folosim tehnologia 3D pentru un rezultat precis și durabil pe viață.',
    benefits: [
      ['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z','Planificare 3D — precizie sub 0.5mm'],
      ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z','Garanție pe viață pe implant'],
      ['M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z','Chirurgie ghidată — fără tăieturi'],
      ['M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z','Încărcare imediată disponibilă'],
    ],
    techs: ['Straumann','Nobel Biocare','Ghid chirurgical 3D','CBCT planificare'],
  },
  protetica: {
    desc: 'Coroane, punți și proteze realizate digital — de la scanare la frezare CAD/CAM. Lucrări precise, estetice și durabile, finalizate rapid.',
    benefits: [
      ['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z','Frezare CAD/CAM în laborator propriu'],
      ['M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z','Precizie digitală sub 20 microni'],
      ['M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z','Materiale premium — zirconiu, E-max'],
      ['M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z','Garanție pe viață'],
    ],
    techs: ['CAD/CAM Cerec','Zirconiu','E-max','Scanner 3Shape'],
  },
  ortodontie: {
    desc: 'Ortodonție digitală cu aliniere invizibilă. Planificăm fiecare mișcare digital pentru un tratament predictibil, confortabil și discret.',
    benefits: [
      ['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z','Simulare 3D a rezultatului final'],
      ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z','Aliniere invizibilă — fără bracketi'],
      ['M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z','Monitorizare digitală la distanță'],
      ['M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z','Tratament accelerat cu micro-osteo'],
    ],
    techs: ['Invisalign','iTero Scanner','ClinCheck','Accelerated Ortho'],
  },
  allon: {
    desc: 'Dinți ficși pe implanturi — alternativa modernă la protezele mobile. Reabilitare completă a danturii pe 4, 5, 6 sau 8 implanturi, fără durere și fără stres.',
    benefits: [
      ['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z','Dinți ficși în aceeași zi — încărcare imediată'],
      ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z','Planificare 3D completă pre-operatorie'],
      ['M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z','Alternativă la proteze mobile — nu se mișcă, nu cad'],
      ['M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z','Sedare conștientă disponibilă pentru confort maxim'],
    ],
    techs: ['All-On-4','All-On-6','Straumann','Nobel Biocare','CBCT 3D','Ghid chirurgical'],
  },
  'consultatie-online': {
    desc: 'Ești plecat din țară, dar vrei un tratament dentar acasă? Începe cu o consultație online — discutăm la distanță, îți oferim un plan clar și personalizat, iar tu vii pregătit la prima vizită.',
    benefits: [
      ['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z','Consultație video cu specialistul'],
      ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z','Trimite tomografia — analiză completă la distanță'],
      ['M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z','Plan de tratament personalizat înainte de sosire'],
      ['M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z','Disponibil pentru diaspora: UK, Germania, Franța, USA'],
    ],
    techs: ['Consultație Video','Radiografie digitală','Plan 3D la distanță','Programare prioritară'],
  },
}

/* ─── SVG icon paths per service ─────────── */
const SVC_ICONS: Record<string, string> = {
  estetica:              'M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z',
  terapie:               'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
  chirurgie:             'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  implantologie:         'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
  protetica:             'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  ortodontie:            'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  allon:                 'M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z',
  'consultatie-online':  'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
}

/* ─── Shared components ──────────────────── */
function Btn({ children, pink, outline, style, ...p }: any) {
  const bg = pink ? B.a : outline ? 'transparent' : B.p
  const clr = outline ? B.p : B.wh
  const brd = outline ? `1.5px solid ${B.p}` : pink ? `1.5px solid ${B.a}` : 'none'
  return (
    <button style={{
      background:bg, color:clr, border:brd, padding:'14px 32px', borderRadius:8,
      fontSize:15, fontWeight:700, cursor:'pointer', fontFamily:"'DM Sans',sans-serif",
      transition:'all .2s', display:'inline-flex', alignItems:'center', gap:8, ...style
    }} {...p}>{children}</button>
  )
}

function SectionBadge({ children }: { children: string }) {
  return (
    <div style={{
      display:'inline-flex', alignItems:'center', gap:6,
      background:B.pl, border:`1px solid ${B.bdr}`, padding:'5px 14px', borderRadius:100, marginBottom:16,
    }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background:B.p }}/>
      <span style={{ fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:B.p }}>{children}</span>
    </div>
  )
}

/* ─── Nav ─────────────────────────────────── */
function Nav() {
  return (
    <>
      <div style={{ background:B.p, padding:'8px 48px', display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:12, color:'rgba(255,255,255,.7)' }}>
        <div style={{ display:'flex', gap:24, alignItems:'center' }}>
          <span>📍 str. Ismail 88, Chișinău</span>
          <span>🕐 Lun–Vin 09:00–19:00 · Sâm 09:00–14:00</span>
        </div>
        <span style={{ fontWeight:600, color:B.wh }}>+373 22 881 414</span>
      </div>
      <nav style={{
        position:'sticky', top:0, zIndex:100, background:'rgba(255,255,255,.97)',
        backdropFilter:'blur(12px)', borderBottom:`1px solid ${B.bdr}`,
        padding:'14px 48px', display:'flex', justifyContent:'space-between', alignItems:'center',
      }}>
        <a href="/" style={{ textDecoration:'none' }}><Logo height={36}/></a>
        <div style={{ display:'flex', gap:28, alignItems:'center' }}>
          {[['Servicii','/servicii'],['Digital Check-Up','/digital-checkup'],['Echipa','/'],['Recenzii','/'],['Contact','/']].map(([l,h]) => (
            <a key={l} href={h} style={{
              fontSize:14, fontWeight: l==='Servicii' ? 700 : 500,
              color: l==='Servicii' ? B.p : '#3a5a50', textDecoration:'none',
              borderBottom: l==='Servicii' ? `2px solid ${B.p}` : '2px solid transparent', paddingBottom:2,
            }}>{l}</a>
          ))}
        </div>
        <Btn pink style={{ fontSize:13, padding:'10px 22px' }}>Programează-te</Btn>
      </nav>
    </>
  )
}

/* ─── Hero ──────────────────────────────── */
function Hero() {
  return (
    <section style={{ background:B.ps, padding:'64px 48px 56px', borderBottom:`1px solid ${B.bdr}` }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
        <div>
          <SectionBadge>Servicii complete</SectionBadge>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:44, fontWeight:800, color:B.nv, letterSpacing:'-.03em', lineHeight:1.08, margin:'0 0 16px' }}>
            Tot ce ai nevoie,<br/>într-un <span style={{ color:B.p }}>singur loc</span>.
          </h1>
          <p style={{ fontSize:16, lineHeight:1.7, color:B.gr, maxWidth:480, margin:0 }}>
            6 specialități, tehnologie digitală de ultimă generație și o echipă de {STATS.team} specialiști — totul pentru zâmbetul tău.
          </p>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{ fontSize:13, color:B.gr, marginBottom:8 }}>Nu știi ce serviciu ai nevoie?</div>
          <a href="/digital-checkup" style={{ textDecoration:'none' }}>
            <Btn pink style={{ fontSize:14 }}>Începe cu Digital Check-Up →</Btn>
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── Service Card (expandable) ──────────── */
function ServiceCard({ svc, index, isOpen, onToggle }: {
  svc: typeof SERVICES[number]; index: number; isOpen: boolean; onToggle: () => void
}) {
  const detail = SVC_DETAILS[svc.slug]
  const iconPath = SVC_ICONS[svc.slug]

  return (
    <div style={{
      background:B.wh, borderRadius:16, border: isOpen ? `2px solid ${B.p}` : `1px solid ${B.bdr}`,
      transition:'all .3s', overflow:'hidden',
      boxShadow: isOpen ? `0 12px 40px ${B.bdr}` : 'none',
    }}>
      {/* Header — always visible */}
      <div
        onClick={onToggle}
        style={{
          padding:'28px 32px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'space-between',
          transition:'background .15s',
        }}
        onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = B.ps }}
        onMouseLeave={e => { e.currentTarget.style.background = '' }}
      >
        <div style={{ display:'flex', alignItems:'center', gap:20 }}>
          <div style={{
            width:52, height:52, borderRadius:14,
            background: isOpen ? `linear-gradient(135deg,${B.p},${B.pm})` : B.pl,
            display:'flex', alignItems:'center', justifyContent:'center', transition:'all .3s', flexShrink:0,
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isOpen ? B.wh : B.p} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={iconPath}/></svg>
          </div>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
              <span style={{ fontSize:12, color:'rgba(10,107,92,.3)', fontWeight:700 }}>{String(index+1).padStart(2,'0')}</span>
              <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:700, color:B.nv, margin:0 }}>{svc.name}</h3>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap' }}>
              <span style={{ fontSize:11, fontWeight:600, color:B.p, background:B.pl, padding:'3px 10px', borderRadius:100, letterSpacing:'.05em' }}>{svc.tag}</span>
              <span style={{ fontSize:11, fontWeight:700, color:B.pd, background:B.pl, padding:'3px 10px', borderRadius:100 }}>{svc.price}</span>
              {svc.rate && <span style={{ fontSize:10, fontWeight:800, color:B.a, background:B.al, padding:'3px 8px', borderRadius:100, letterSpacing:'.05em' }}>RATE 0%</span>}
            </div>
          </div>
        </div>
        <div style={{
          width:36, height:36, borderRadius:'50%', border:`1.5px solid ${isOpen ? B.p : B.bdr}`,
          display:'flex', alignItems:'center', justifyContent:'center',
          transition:'all .25s', transform: isOpen ? 'rotate(180deg)' : '',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isOpen ? B.p : B.gr} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>

      {/* Expanded content */}
      <div style={{
        maxHeight: isOpen ? 500 : 0, overflow:'hidden',
        transition:'max-height .4s ease',
      }}>
        <div style={{ padding:'0 32px 32px', borderTop:`1px solid ${B.bdr}` }}>
          <div style={{ paddingTop:24, display:'grid', gridTemplateColumns:'1fr 1fr', gap:32 }}>
            {/* Left — description + benefits */}
            <div>
              <p style={{ fontSize:14, lineHeight:1.7, color:B.gr, margin:'0 0 20px' }}>{detail.desc}</p>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {detail.benefits.map(([icon, text]) => (
                  <div key={text} style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={B.p} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={icon}/></svg>
                    <span style={{ fontSize:13, color:B.nv, fontWeight:500 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — techs + CTAs */}
            <div>
              <div style={{ fontSize:11, fontWeight:700, color:B.p, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:12 }}>Tehnologii utilizate</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:24 }}>
                {detail.techs.map(t => (
                  <span key={t} style={{
                    fontSize:12, fontWeight:600, color:B.p, background:B.pl,
                    padding:'6px 14px', borderRadius:100, border:`1px solid ${B.bdr}`,
                  }}>{t}</span>
                ))}
              </div>
              {svc.audience && (
                <div style={{ marginBottom:16, padding:'10px 14px', background:B.ps, borderRadius:8, border:`1px solid ${B.bdr}` }}>
                  <div style={{ fontSize:10, fontWeight:700, color:B.p, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:4 }}>Pentru cine</div>
                  <div style={{ fontSize:12, color:B.nv, fontWeight:500 }}>{svc.audience}</div>
                </div>
              )}
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                <Btn style={{ justifyContent:'center', fontSize:14, padding:'12px 24px' }}>Programează-te →</Btn>
                <a href="/digital-checkup" style={{ textDecoration:'none' }}>
                  <Btn outline style={{ justifyContent:'center', fontSize:13, padding:'10px 24px', width:'100%' }}>Începe cu Digital Check-Up</Btn>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Services Grid ──────────────────────── */
function ServicesSection() {
  const [openIdx, setOpenIdx] = useState<number|null>(0)

  return (
    <section style={{ background:B.wh, padding:'56px 48px 64px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', flexDirection:'column', gap:16 }}>
        {SERVICES.map((svc, i) => (
          <ServiceCard
            key={svc.slug}
            svc={svc}
            index={i}
            isOpen={openIdx === i}
            onToggle={() => setOpenIdx(openIdx === i ? null : i)}
          />
        ))}
      </div>
    </section>
  )
}

/* ─── CTA Strip ──────────────────────────── */
function CtaStrip() {
  return (
    <section style={{ background:`linear-gradient(135deg,${B.p},${B.pm})`, padding:'56px 48px' }}>
      <div style={{ maxWidth:900, margin:'0 auto', textAlign:'center' }}>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:32, fontWeight:800, color:B.wh, margin:'0 0 12px', letterSpacing:'-.02em' }}>
          Nu știi de unde să începi?
        </h2>
        <p style={{ fontSize:15, color:'rgba(255,255,255,.7)', margin:'0 0 28px', maxWidth:480, marginLeft:'auto', marginRight:'auto' }}>
          Digital Check-Up analizează totul în 30 de minute și îți oferă un plan personalizat de tratament.
        </p>
        <div style={{ display:'flex', gap:14, justifyContent:'center' }}>
          <a href="/digital-checkup" style={{ textDecoration:'none' }}>
            <Btn pink style={{ fontSize:15, padding:'14px 32px' }}>Descoperă Digital Check-Up →</Btn>
          </a>
          <Btn outline style={{ borderColor:'rgba(255,255,255,.3)', color:B.wh, fontSize:15, padding:'14px 32px' }}>Sună: +373 22 881 414</Btn>
        </div>
      </div>
    </section>
  )
}

/* ─── Appointment Form ───────────────────── */
function AppointmentForm() {
  const inp: React.CSSProperties = {
    width:'100%', padding:'12px 16px', border:`1px solid ${B.bdr}`, borderRadius:8,
    fontSize:14, fontFamily:"'DM Sans',sans-serif", background:B.wh, outline:'none', boxSizing:'border-box',
  }

  return (
    <section style={{ background:B.ps, padding:'72px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:56, alignItems:'center' }}>
        <div>
          <SectionBadge>Programare</SectionBadge>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:32, fontWeight:800, color:B.nv, margin:'0 0 14px', letterSpacing:'-.02em', lineHeight:1.1 }}>
            Programează-te<br/><span style={{ color:B.a }}>acum</span>
          </h2>
          <p style={{ fontSize:14, lineHeight:1.7, color:B.gr, margin:'0 0 24px', maxWidth:400 }}>
            Alege serviciul dorit, completează formularul și te contactăm rapid.
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {[
              'Confirmare în max. 2h',
              `${STATS.team} specialiști la dispoziția ta`,
              'Prețuri transparente de la prima întâlnire',
              `${STATS.locations} filiale — alege cea mai apropiată`,
            ].map(text => (
              <div key={text} style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:20, height:20, borderRadius:'50%', background:B.pl, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={B.p} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span style={{ fontSize:13, color:B.nv, fontWeight:500 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background:B.wh, borderRadius:16, padding:'32px 28px', border:`1px solid ${B.bdr}`, boxShadow:`0 8px 32px ${B.bdr}` }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
            <input placeholder="Prenume" style={inp}/>
            <input placeholder="Nume" style={inp}/>
          </div>
          <input placeholder="Telefon *" type="tel" style={{ ...inp, marginBottom:12 }}/>
          <select defaultValue="" style={{ ...inp, marginBottom:16, color:B.gr }}>
            <option value="" disabled>Selectează serviciul</option>
            <option>⭐ Digital Check-Up</option>
            {SERVICES.map(s => <option key={s.slug}>{s.name}</option>)}
          </select>
          <select defaultValue="" style={{ ...inp, marginBottom:20, color:B.gr }}>
            <option value="" disabled>Selectează locația</option>
            {LOCATIONS.map(l => <option key={l.city}>{l.city} — {l.address}</option>)}
          </select>
          <Btn pink style={{ width:'100%', justifyContent:'center', fontSize:15, padding:'14px' }}>Trimite cererea →</Btn>
          <p style={{ fontSize:11, color:B.gr, textAlign:'center', marginTop:10 }}>
            Prin trimitere ești de acord cu <span style={{ color:B.p, cursor:'pointer' }}>Politica de confidențialitate</span>
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background:B.nv, padding:'56px 48px 32px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1.5fr 1fr 1fr 1.2fr', gap:40, marginBottom:40 }}>
        <div>
          <Logo height={32} light/>
          <p style={{ fontSize:13, color:'rgba(255,255,255,.45)', marginTop:16, lineHeight:1.7, maxWidth:260 }}>
            Clinică stomatologică digitală. {STATS.years} ani de excelență, {STATS.team} specialiști, {STATS.patients} pacienți.
          </p>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:800, color:B.a, marginTop:16 }}>{CAMPAIGN_2026.slogan}</div>
        </div>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:B.wh, letterSpacing:'.15em', textTransform:'uppercase', marginBottom:18 }}>Servicii</div>
          {['Digital Check-Up',...SERVICES.map(s=>s.name)].map(s => (
            <div key={s} style={{ fontSize:13, marginBottom:9, color:'rgba(255,255,255,.5)', cursor:'pointer' }}>{s}</div>
          ))}
        </div>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:B.wh, letterSpacing:'.15em', textTransform:'uppercase', marginBottom:18 }}>Clinică</div>
          {['Despre noi','Echipa','Tehnologii','Blog','Cariere','Contacte'].map(s => (
            <div key={s} style={{ fontSize:13, marginBottom:9, color:'rgba(255,255,255,.5)', cursor:'pointer' }}>{s}</div>
          ))}
        </div>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:B.wh, letterSpacing:'.15em', textTransform:'uppercase', marginBottom:18 }}>Contact</div>
          {LOCATIONS.slice(0,2).map(l => (
            <div key={l.city} style={{ marginBottom:14 }}>
              <div style={{ fontSize:13, fontWeight:600, color:B.wh }}>{l.city}</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,.45)' }}>{l.address} · {l.phone}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop:'1px solid rgba(255,255,255,.07)', paddingTop:20, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontSize:11, color:'rgba(255,255,255,.25)' }}>© {CAMPAIGN_2026.year} Smile Dent Team. Toate drepturile rezervate.</span>
        <div style={{ display:'flex', gap:6 }}>
          {['RO','RU','EN'].map(l => (
            <span key={l} style={{ background:'rgba(255,255,255,.08)', color:'rgba(255,255,255,.5)', padding:'3px 8px', borderRadius:40, fontSize:10, fontWeight:700, cursor:'pointer' }}>{l}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ─── Main Export ─────────────────────────── */
export function ServiciiPage() {
  return (
    <>
      <style>{ANIM}</style>
      <Nav/>
      <Hero/>
      <ServicesSection/>
      <CtaStrip/>
      <AppointmentForm/>
      <Footer/>
    </>
  )
}

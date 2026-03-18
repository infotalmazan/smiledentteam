'use client'
import { useState } from 'react'
import { BRAND as B, SERVICES, STATS, LOCATIONS, CAMPAIGN_2026, AMBASSADORS } from '@/lib/brand'
import { Logo } from './Logo'

/* ─── Animations ─────────────────────────── */
const ANIM = `
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes barGrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
`

/* ─── Rich service detail data ────────────── */
const SVC_DETAILS: Record<string, {
  hero: string; desc: string; process: string[];
  benefits: [string,string][]; techs: string[];
  reviews: { text:string; author:string; rating:number }[];
  ambassador?: { name:string; quote:string; photo:string };
  photo: string;
}> = {
  implantologie: {
    hero: 'Implant dentar — soluția permanentă pentru dinții lipsă. Planificare 3D, inserare ghidată, rezultat previzibil.',
    desc: 'Implanturile dentare înlocuiesc rădăcina dintelui pierdut cu un stâlp de titan biocompatibil. Planificăm fiecare caz digital, inserăm ghidat 3D și oferim opțiuni de încărcare imediată pentru confort maxim.',
    process: ['Consultație + Tomografie 3D CBCT','Planificare digitală a poziției implantului','Inserare ghidată — minim invaziv','Vindecare 2-4 luni + protezare finală'],
    benefits: [
      ['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z','Planificare 3D completă — precizie maximă'],
      ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z','Inserare ghidată — fără tăieturi, fără suturi'],
      ['M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z','Garanție pe viață pe implant'],
      ['M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z','Opțiune de încărcare imediată'],
    ],
    techs: ['Straumann','Nobel Biocare','CBCT 3D','Ghid chirurgical digital','3Shape Trios'],
    reviews: [
      { text:'Am primit implantul fără durere. În 3 luni aveam dinte nou. Recomand!', author:'Denis P.', rating:5 },
      { text:'Echipa a fost extraordinară. Totul planificat digital, fără surprize.', author:'Elena M.', rating:5 },
    ],
    ambassador: { name:'Dumitru Talmazan', quote:'Implantul dentar mi-a redat încrederea în zâmbet. Tehnologia 3D face totul previzibil.', photo:AMBASSADORS[0].photo },
    photo: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop',
  },
  protetica: {
    hero: 'Coroane dentare CAD/CAM — restaurări precise, estetice și durabile. Scanare digitală, fabricare în aceeași zi.',
    desc: 'Coroanele dentare protejează și restaurează dinții deteriorați. Folosim tehnologie CAD/CAM pentru scanare digitală, design și frezare — fără amprentă clasică, cu precizie de microni.',
    process: ['Scanare digitală 3Shape','Design virtual al coroanei','Frezare CAD/CAM din zirconiu/E-max','Cimentare definitivă — estetică perfectă'],
    benefits: [
      ['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z','Fără amprentă clasică — doar scanner digital'],
      ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z','Materiale premium: zirconiu, E-max'],
      ['M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z','Garanție pe viață pe structură'],
      ['M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z','Coroană temporară în aceeași ședință'],
    ],
    techs: ['Cerec/inLab','Zirconiu','E-max','3Shape','Scanner intraoral'],
    reviews: [
      { text:'Coroanele arată perfect natural. Nimeni nu le deosebește de dinții mei.', author:'Ion V.', rating:5 },
    ],
    photo: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop',
  },
  allon: {
    hero: 'Dinți ficși pe implanturi — alternativa modernă la protezele mobile. Reabilitare completă în aceeași zi.',
    desc: 'All-On-4/6 este soluția pentru pacienții cu edentație totală sau parțială avansată. Inserăm 4-6 implanturi strategic poziționate și fixăm o arcadă completă de dinți — totul planificat 3D, realizat într-o singură zi.',
    process: ['Digital Check-Up + Tomografie CBCT','Plan chirurgical 3D + ghid personalizat','Inserare implanturi + arcadă provizorie fixă','Protezare finală după 3-4 luni'],
    benefits: [
      ['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z','Dinți ficși în aceeași zi — pleci cu zâmbet nou'],
      ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z','Alternative la proteza mobilă — nu se mișcă, nu cad'],
      ['M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z','Sedare conștientă disponibilă'],
      ['M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z','Rate 0% disponibile'],
    ],
    techs: ['All-On-4','All-On-6','Straumann','Nobel Biocare','CBCT 3D','Sedare conștientă'],
    reviews: [
      { text:'Am scăpat de proteza mobilă! Acum am dinți ficși și pot mânca orice.', author:'Maria S.', rating:5 },
      { text:'Interventia a durat doar câteva ore. Am plecat acasă cu dinți noi.', author:'Victor D.', rating:5 },
    ],
    ambassador: { name:'Valeriu Rașcu', quote:'All-On-4 este o revoluție. Am văzut cum oameni își schimbă viața într-o zi.', photo:AMBASSADORS[3].photo },
    photo: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop',
  },
  estetica: {
    hero: 'Fațete dentare — zâmbetul de Hollywood, planificat digital. Vizualizezi rezultatul înainte de tratament.',
    desc: 'Fațetele sunt plăcuțe subțiri de ceramică E-max care acoperă fața vizibilă a dintelui. Cu Digital Smile Design, simulăm rezultatul 3D înainte de orice procedură — aprobi designul, apoi realizăm.',
    process: ['Digital Smile Design — simulare 3D','Mock-up în gură — testezi rezultatul','Preparare minimală','Bonding fațete ceramice E-max'],
    benefits: [
      ['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z','Vizualizare 3D înainte de tratament'],
      ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z','Rezultat natural, personalizat'],
      ['M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z','Ceramică E-max — rezistentă 15+ ani'],
      ['M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z','Preparare minimală — protejăm dintele'],
    ],
    techs: ['Digital Smile Design','Fațete E-max','Scanner 3Shape','Albire Philips Zoom'],
    reviews: [
      { text:'Zâmbetul pe care l-am visat! Totul a fost planificat perfect.', author:'Maria T.', rating:5 },
    ],
    ambassador: { name:'Nicoleta Adam', quote:'Fațetele de la SDT mi-au schimbat complet încrederea. Arată absolut natural.', photo:AMBASSADORS[1].photo },
    photo: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&h=400&fit=crop',
  },
  ortodontie: {
    hero: 'Ortodonție digitală — alignere invizibile sau bracketi, planificate 3D pentru rezultat predictibil.',
    desc: 'Corectăm problemele de aliniere cu Invisalign sau bracketi autoligaturante. Planificăm fiecare mișcare digital — știi exact cum va arăta rezultatul final înainte de a începe.',
    process: ['Scanare digitală iTero','Plan ClinCheck — simulare completă','Aliniere cu Invisalign sau bracketi','Contenție + monitorizare'],
    benefits: [
      ['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z','Simulare 3D a rezultatului final'],
      ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z','Aliniere invizibilă — fără bracketi vizibili'],
      ['M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z','Monitorizare digitală la distanță'],
      ['M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z','Rate 0% disponibile'],
    ],
    techs: ['Invisalign','iTero Scanner','ClinCheck','Damon System','Accelerated Ortho'],
    reviews: [
      { text:'Copilul meu adoră vizitele! Tratamentul merge perfect.', author:'Svetlana L.', rating:5 },
    ],
    photo: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&h=400&fit=crop',
  },
  'digital-checkup': {
    hero: 'Digital Check-Up — evaluare completă, digitală și fără discomfort. Primul pas către sănătatea orală.',
    desc: 'Scanare 3D, tomografie CBCT, analiză completă — în 30 minute ai o imagine clară a sănătății tale orale. Planul de tratament detaliat, cu costuri transparente, fără surprize.',
    process: ['Scanare intraorală 3Shape Trios','Tomografie 3D CBCT','Analiză completă + diagnostic','Plan de tratament personalizat + costuri'],
    benefits: [
      ['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z','100% digital — fără amprentă clasică'],
      ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z','Diagnostic precis cu tomografie 3D'],
      ['M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z','Durată ~30 minute, fără durere'],
      ['M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z','Plan transparent cu prețuri clare'],
    ],
    techs: ['3Shape Trios','CBCT 3D','Digital Workflow','Software diagnostic'],
    reviews: [
      { text:'Am înțeles exact ce am nevoie. Totul transparent, fără presiune.', author:'Ana R.', rating:5 },
    ],
    photo: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop',
  },
  terapie: {
    hero: 'Terapie & Profilaxie — prevenția este cel mai bun tratament. Igienizare profesională fără durere.',
    desc: 'Oferim igienizare profesională cu ultrasunete, tratament parodontal, obturații estetice și profilaxie completă. Totul cu instrumente digitale pentru o experiență confortabilă.',
    process: ['Evaluare digitală completă','Igienizare profesională cu ultrasunete','Tratament carii / restaurări estetice','Plan de prevenție personalizat'],
    benefits: [
      ['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z','Detecție timpurie cu scanner digital'],
      ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z','Tratament fără durere — anestezie digitală'],
      ['M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z','Igienizare profesională cu ultrasunete'],
      ['M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z','Plan personalizat de prevenție'],
    ],
    techs: ['Scanner digital','Ultrasunete','Anestezie digitală','Materiale biocompatibile'],
    reviews: [
      { text:'Foarte atentă, tratament fără durere. Recomand!', author:'Nadejda B.', rating:5 },
    ],
    photo: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop',
  },
  chirurgie: {
    hero: 'Chirurgie orală — extracții complexe, augmentări osoase, rezecții. Totul ghidat 3D, minim invaziv.',
    desc: 'Realizăm intervenții chirurgicale complexe cu ghidare 3D: extracții de măsele de minte, augmentări osoase, rezecții apicale, sinus lifting. Planificare digitală completă pentru siguranță maximă.',
    process: ['Tomografie 3D + planificare digitală','Ghid chirurgical personalizat','Intervenție minim invazivă','Monitorizare post-operatorie'],
    benefits: [
      ['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z','Ghid chirurgical 3D — precizie maximă'],
      ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z','Intervenție minim invazivă'],
      ['M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z','Sedare conștientă disponibilă'],
      ['M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z','Recuperare rapidă post-operatorie'],
    ],
    techs: ['CBCT 3D','Ghid chirurgical','Piezosurgery','PRF/PRP','Sedare conștientă'],
    reviews: [
      { text:'M-am simțit în siguranță pe tot parcursul intervenției.', author:'Elena M.', rating:5 },
    ],
    photo: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=600&h=400&fit=crop',
  },
  'consultatie-online': {
    hero: 'Consultație Online — pentru diaspora și pacienți la distanță. Discutăm, analizăm, planificăm.',
    desc: 'Ești în străinătate? Trimite tomografia, discutăm la distanță, primești un plan complet de tratament. Vii pregătit la clinică — economisești timp și bani.',
    process: ['Trimite tomografia online','Consultație video 1:1','Plan de tratament personalizat','Programare prioritară la sosire'],
    benefits: [
      ['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z','Consultație video cu specialistul'],
      ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z','Analiză completă la distanță'],
      ['M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z','Plan detaliat înainte de sosire'],
      ['M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z','Disponibil: UK, Germania, Franța, USA'],
    ],
    techs: ['Consultație Video','Radiografie digitală','Plan 3D la distanță','Programare prioritară'],
    reviews: [
      { text:'Am planificat totul din Germania. Când am ajuns, am început imediat.', author:'Andrei K.', rating:5 },
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

/* ─── Nav ──────────────────────────────────── */
function Nav() {
  return (
    <>
      <nav style={{
        position:'sticky', top:0, zIndex:100, background:'rgba(255,255,255,.97)',
        backdropFilter:'blur(12px)', borderBottom:`1px solid ${B.bdr}`,
        padding:'14px 48px', display:'flex', justifyContent:'space-between', alignItems:'center',
      }}>
        <a href="/" style={{ textDecoration:'none' }}><Logo height={36}/></a>
        <div style={{ display:'flex', gap:28, alignItems:'center' }}>
          {[['Servicii','/servicii'],['Digital Check-Up','/digital-checkup'],['Consultație Online','/consultatie-online'],['Echipa','/echipa'],['Recenzii','/']].map(([l,h]) => (
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

/* ─── Service Detail Page ─────────────────── */
function ServiceDetail({ svc }: { svc: typeof SERVICES[number] }) {
  const detail = SVC_DETAILS[svc.slug]
  if (!detail) return null
  const iconPath = SVC_ICONS[svc.slug]

  return (
    <div style={{ animation:'fadeUp .3s ease' }}>
      {/* Service Hero */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, padding:'48px 0', borderBottom:`1px solid ${B.bdr}` }}>
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
            <div style={{ width:44, height:44, borderRadius:12, background:`linear-gradient(135deg,${B.p},${B.pm})`, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={B.wh} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={iconPath}/></svg>
            </div>
            <div>
              <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800, color:B.nv, margin:0, lineHeight:1.1 }}>{svc.name}</h2>
              <div style={{ display:'flex', gap:8, marginTop:4 }}>
                <span style={{ fontSize:11, fontWeight:600, color:B.p, background:B.pl, padding:'2px 10px', borderRadius:100 }}>{svc.tag}</span>
                <span style={{ fontSize:11, fontWeight:700, color:B.pd, background:B.pl, padding:'2px 10px', borderRadius:100 }}>{svc.price}</span>
                {svc.rate && <span style={{ fontSize:10, fontWeight:800, color:B.a, background:B.al, padding:'2px 8px', borderRadius:100 }}>RATE 0%</span>}
              </div>
            </div>
          </div>
          <p style={{ fontSize:14, lineHeight:1.7, color:B.gr, margin:'16px 0 24px', maxWidth:480 }}>{detail.desc}</p>
          <div style={{ display:'flex', gap:10 }}>
            <Btn style={{ fontSize:14, padding:'12px 28px' }}>Programează-te →</Btn>
            {svc.slug === 'digital-checkup' && <a href="/digital-checkup" style={{ textDecoration:'none' }}><Btn outline style={{ fontSize:13, padding:'12px 24px' }}>Pagina completă →</Btn></a>}
            {svc.slug === 'consultatie-online' && <a href="/consultatie-online" style={{ textDecoration:'none' }}><Btn outline style={{ fontSize:13, padding:'12px 24px' }}>Pagina completă →</Btn></a>}
          </div>
        </div>
        <div style={{ borderRadius:16, overflow:'hidden', height:280 }}>
          <img src={detail.photo} alt={svc.name} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
        </div>
      </div>

      {/* Process + Benefits */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, padding:'40px 0', borderBottom:`1px solid ${B.bdr}` }}>
        {/* Process */}
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:B.p, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:16 }}>Procesul de tratament</div>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {detail.process.map((step, i) => (
              <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                <div style={{ width:28, height:28, borderRadius:8, background:B.pl, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ fontSize:12, fontWeight:800, color:B.p }}>{String(i+1).padStart(2,'0')}</span>
                </div>
                <div style={{ fontSize:13, color:B.nv, fontWeight:500, paddingTop:4 }}>{step}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Benefits */}
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:B.p, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:16 }}>Avantaje</div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {detail.benefits.map(([icon, text]) => (
              <div key={text} style={{ display:'flex', alignItems:'center', gap:10 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={B.p} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={icon}/></svg>
                <span style={{ fontSize:13, color:B.nv, fontWeight:500 }}>{text}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop:20 }}>
            <div style={{ fontSize:11, fontWeight:700, color:B.p, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:10 }}>Tehnologii</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {detail.techs.map(t => (
                <span key={t} style={{ fontSize:11, fontWeight:600, color:B.p, background:B.pl, padding:'4px 12px', borderRadius:100, border:`1px solid ${B.bdr}` }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div style={{ padding:'40px 0', borderBottom:`1px solid ${B.bdr}` }}>
        <div style={{ fontSize:11, fontWeight:700, color:B.p, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:16 }}>Recenzii pacienți</div>
        <div style={{ display:'grid', gridTemplateColumns: detail.reviews.length > 1 ? '1fr 1fr' : '1fr', gap:16 }}>
          {detail.reviews.map((r, i) => (
            <div key={i} style={{ background:B.ps, borderRadius:14, padding:'20px', borderLeft:`3px solid ${B.p}` }}>
              <div style={{ color:'#fbb040', fontSize:12, marginBottom:6 }}>{'★'.repeat(r.rating)}</div>
              <p style={{ fontSize:13, lineHeight:1.6, color:B.nv, margin:'0 0 8px', fontStyle:'italic' }}>&ldquo;{r.text}&rdquo;</p>
              <div style={{ fontSize:12, color:B.gr, fontWeight:600 }}>— {r.author}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Ambassador recommendation */}
      {detail.ambassador && (
        <div style={{ padding:'40px 0', borderBottom:`1px solid ${B.bdr}` }}>
          <div style={{ fontSize:11, fontWeight:700, color:B.a, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:16 }}>Ambasador recomandă</div>
          <div style={{ display:'flex', gap:20, alignItems:'center', background:B.al, borderRadius:16, padding:'24px', border:`1px solid ${B.a}22` }}>
            <img src={detail.ambassador.photo} alt={detail.ambassador.name} style={{ width:72, height:72, borderRadius:'50%', objectFit:'cover', border:`3px solid ${B.a}` }}/>
            <div>
              <p style={{ fontSize:14, lineHeight:1.6, color:B.nv, margin:'0 0 8px', fontStyle:'italic' }}>&ldquo;{detail.ambassador.quote}&rdquo;</p>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:700, color:B.a }}>— {detail.ambassador.name}</div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div style={{ padding:'40px 0', textAlign:'center' }}>
        <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800, color:B.nv, margin:'0 0 10px' }}>
          Pregătit pentru {svc.name.toLowerCase()}?
        </h3>
        <p style={{ fontSize:14, color:B.gr, margin:'0 0 20px' }}>Programează-te acum și fă primul pas.</p>
        <Btn pink style={{ fontSize:15, padding:'14px 36px' }}>Programează-te →</Btn>
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
      <style>{ANIM}</style>
      <Nav/>

      <section style={{ maxWidth:1200, margin:'0 auto', padding:'40px 48px' }}>
        {/* Header */}
        <div style={{ marginBottom:32 }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:B.pl, border:`1px solid ${B.bdr}`, padding:'5px 14px', borderRadius:100, marginBottom:16 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:B.a }}/>
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:B.a }}>Servicii complete</span>
          </div>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:38, fontWeight:800, color:B.nv, lineHeight:1.08, margin:'0 0 12px' }}>
            Tot ce ai nevoie,<br/>într-un <span style={{ color:B.p }}>singur loc.</span>
          </h1>
          <p style={{ fontSize:15, color:B.gr, maxWidth:500, margin:0 }}>
            {SERVICES.length} specialități, tehnologie digitală de ultimă generație — totul pentru zâmbetul tău.
          </p>
        </div>

        {/* Service Tabs */}
        <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:8, borderBottom:`2px solid ${B.bdr}`, paddingBottom:0 }}>
          <button onClick={() => setActiveTab(null)} style={{
            padding:'10px 18px', fontSize:13, fontWeight:700, cursor:'pointer', fontFamily:"'DM Sans',sans-serif",
            background: !activeTab ? B.p : 'transparent', color: !activeTab ? B.wh : B.nv,
            border:'none', borderBottom: !activeTab ? `2px solid ${B.p}` : '2px solid transparent',
            borderRadius:'8px 8px 0 0', transition:'all .15s',
          }}>Toate serviciile</button>
          {SERVICES.map(s => (
            <button key={s.slug} onClick={() => setActiveTab(s.slug)} style={{
              padding:'10px 14px', fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:"'DM Sans',sans-serif",
              background: activeTab===s.slug ? B.p : 'transparent', color: activeTab===s.slug ? B.wh : '#5a7a6e',
              border:'none', borderBottom: activeTab===s.slug ? `2px solid ${B.p}` : '2px solid transparent',
              borderRadius:'8px 8px 0 0', transition:'all .15s', whiteSpace:'nowrap',
            }}>{s.name}</button>
          ))}
        </div>

        {/* Content: cards grid or detail page */}
        {!activeTab ? (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, paddingTop:24 }}>
            {SERVICES.map((svc, index) => {
              const iconPath = SVC_ICONS[svc.slug]
              return (
                <div key={svc.slug} onClick={() => setActiveTab(svc.slug)} style={{
                  background:B.wh, borderRadius:14, border:`1px solid ${B.bdr}`, padding:'24px',
                  cursor:'pointer', transition:'all .25s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.borderColor=B.p; e.currentTarget.style.boxShadow=`0 8px 28px ${B.bdr}` }}
                  onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.borderColor=B.bdr; e.currentTarget.style.boxShadow='' }}
                >
                  <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:12 }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:B.pl, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={B.p} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={iconPath}/></svg>
                    </div>
                    <div>
                      <span style={{ fontSize:11, color:'rgba(10,107,92,.3)', fontWeight:700 }}>{String(index+1).padStart(2,'0')}</span>
                      <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:700, color:B.nv, margin:0 }}>{svc.name}</h3>
                    </div>
                  </div>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:10 }}>
                    <span style={{ fontSize:10, fontWeight:600, color:B.p, background:B.pl, padding:'2px 8px', borderRadius:100 }}>{svc.tag}</span>
                    <span style={{ fontSize:10, fontWeight:700, color:B.pd, background:B.pl, padding:'2px 8px', borderRadius:100 }}>{svc.price}</span>
                    {svc.rate && <span style={{ fontSize:9, fontWeight:800, color:B.a, background:B.al, padding:'2px 6px', borderRadius:100 }}>RATE 0%</span>}
                  </div>
                  <p style={{ fontSize:12, lineHeight:1.5, color:B.gr, margin:0 }}>{svc.audience}</p>
                  <div style={{ marginTop:12, fontSize:12, fontWeight:600, color:B.p }}>Detalii →</div>
                </div>
              )
            })}
          </div>
        ) : activeService ? (
          <ServiceDetail svc={activeService}/>
        ) : null}
      </section>

      {/* Footer */}
      <footer style={{ background:B.nv, padding:'56px 48px 32px', marginTop:40 }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1.5fr 1fr 1fr 1.2fr', gap:40, marginBottom:40 }}>
          <div>
            <Logo height={32} light/>
            <p style={{ fontSize:13, color:'rgba(255,255,255,.45)', marginTop:16, lineHeight:1.7, maxWidth:260 }}>
              Clinică stomatologică digitală. {STATS.years} ani de excelență, {STATS.team} specialiști, {STATS.patients} pacienți.
            </p>
          </div>
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:B.wh, letterSpacing:'.15em', textTransform:'uppercase', marginBottom:18 }}>Servicii</div>
            {SERVICES.map(s => (
              <div key={s.slug} style={{ fontSize:13, marginBottom:9, color:'rgba(255,255,255,.5)', cursor:'pointer' }}>{s.name}</div>
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
            {LOCATIONS.slice(0,3).map(l => (
              <div key={l.city} style={{ marginBottom:14 }}>
                <div style={{ fontSize:13, fontWeight:600, color:B.wh }}>{l.city}</div>
                <div style={{ fontSize:12, color:'rgba(255,255,255,.45)' }}>{l.address} · {l.phone}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,.07)', paddingTop:20, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontSize:11, color:'rgba(255,255,255,.25)' }}>© {CAMPAIGN_2026.year} Smile Dent Team</span>
          <div style={{ display:'flex', gap:6 }}>
            {['RO','RU','EN'].map(l => (
              <span key={l} style={{ background:'rgba(255,255,255,.08)', color:'rgba(255,255,255,.5)', padding:'3px 8px', borderRadius:40, fontSize:10, fontWeight:700 }}>{l}</span>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}

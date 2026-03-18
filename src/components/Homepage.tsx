'use client'

import { useState, useEffect } from 'react'
import { Logo } from './Logo'
import { BRAND as B, STATS, SERVICES, LOCATIONS, CAMPAIGN_2026 } from '@/lib/brand'

/* ─── helpers ─────────────────────────────── */
function TeamPhoto({ style }: { style?: React.CSSProperties }) {
  const [err, setErr] = useState(false)
  if (err) return (
    <div style={{ width:'100%', height:'100%', background:B.pl,
      display:'flex', alignItems:'center', justifyContent:'center', ...style }}>
      <span style={{ fontSize:11, color:B.gr, letterSpacing:'.1em' }}>SDT TEAM</span>
    </div>
  )
  return (
    <img src="/images/team/team-photo.jpg" alt="SDT Team"
      style={{ width:'100%', height:'100%', objectFit:'cover', ...style }}
      onError={() => setErr(true)} />
  )
}

function Badge({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div style={{
      display:'inline-flex', alignItems:'center', gap:8,
      background: light ? 'rgba(255,255,255,.13)' : B.pl,
      border:`1px solid ${light ? 'rgba(255,255,255,.22)' : B.bdr}`,
      padding:'5px 14px', borderRadius:100,
    }}>
      <span style={{ width:7, height:7, borderRadius:'50%', background:B.a }}/>
      <span style={{ fontSize:12, fontWeight:700, color: light ? B.wh : B.p, letterSpacing:'.04em' }}>{children}</span>
    </div>
  )
}

function SHead({ eyebrow, title, sub, center, light }: {
  eyebrow?: string; title: React.ReactNode; sub?: string; center?: boolean; light?: boolean
}) {
  return (
    <div style={{ textAlign:center?'center':'left', marginBottom:52 }}>
      {eyebrow && <div style={{ marginBottom:16 }}><Badge light={light}>{eyebrow}</Badge></div>}
      <h2 style={{ fontSize:40, fontWeight:800, letterSpacing:'-.03em', lineHeight:1.06,
        color:light?B.wh:B.nv, margin:'0 0 14px' }}>{title}</h2>
      {sub && <p style={{ fontSize:17, lineHeight:1.75,
        color:light?'rgba(255,255,255,.72)':'#4a6a58',
        maxWidth:center?540:500, margin:center?'0 auto':'0' }}>{sub}</p>}
    </div>
  )
}

function FloatCard({ children, cls, style }: {
  children: React.ReactNode; cls?: string; style?: React.CSSProperties
}) {
  return (
    <div className={cls||'fl1'} style={{
      background:B.wh, borderRadius:14, padding:'14px 18px',
      boxShadow:'0 6px 28px rgba(10,107,92,.13)',
      border:`1px solid ${B.bdr}`, ...style,
    }}>{children}</div>
  )
}

function Btn({ children, onClick, style, outline }: {
  children: React.ReactNode; onClick?: ()=>void; style?: React.CSSProperties; outline?: boolean
}) {
  const base: React.CSSProperties = {
    display:'inline-flex', alignItems:'center', gap:6,
    padding:'14px 28px', borderRadius:8,
    fontSize:15, fontWeight:700, cursor:'pointer',
    fontFamily:"'DM Sans',sans-serif",
    transition:'transform .15s,box-shadow .15s',
    border:'none',
  }
  const filled: React.CSSProperties = { background:`linear-gradient(135deg,${B.pm},${B.p})`, color:B.wh }
  const out: React.CSSProperties = { background:'transparent', color:B.nv, border:`1.5px solid rgba(10,107,92,.22)` }
  return (
    <button style={{ ...base, ...(outline ? out : filled), ...style }} onClick={onClick}
      onMouseEnter={e => { (e.currentTarget).style.transform='translateY(-2px)'; (e.currentTarget).style.boxShadow='0 8px 28px rgba(10,107,92,.28)' }}
      onMouseLeave={e => { (e.currentTarget).style.transform='translateY(0)'; (e.currentTarget).style.boxShadow='none' }}
    >{children}</button>
  )
}

/* ─── Topbar ──────────────────────────────── */
function Topbar({ lang, setLang }: { lang:string; setLang:(l:string)=>void }) {
  return (
    <div style={{ background:B.p, padding:'7px 52px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
      <div style={{ display:'flex', gap:24, fontSize:12, color:'rgba(255,255,255,.82)' }}>
        <span>📍 str. Ismail 88, Chișinău</span>
        <span>🕐 Lun–Vin 09:00–19:00 · Sâm 09:00–14:00</span>
      </div>
      <div style={{ display:'flex', gap:18, alignItems:'center' }}>
        {['RO','RU','EN'].map(l => (
          <span key={l} onClick={() => setLang(l)} style={{
            fontSize:11, fontWeight:l===lang?700:400,
            color:l===lang?B.wh:'rgba(255,255,255,.5)',
            cursor:'pointer', letterSpacing:'.14em',
            borderBottom:l===lang?'1px solid rgba(255,255,255,.5)':'1px solid transparent',
          }}>{l}</span>
        ))}
        <span style={{ color:'rgba(255,255,255,.2)' }}>|</span>
        <span style={{ fontSize:12, color:'rgba(255,255,255,.9)', fontWeight:600 }}>+373 22 881 414</span>
      </div>
    </div>
  )
}

/* ─── Navbar ──────────────────────────────── */
function Navbar() {
  const [sc, setSc] = useState(false)
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 10)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav style={{
      display:'flex', justifyContent:'space-between', alignItems:'center',
      padding:'0 52px', height:70, background:'rgba(255,255,255,.97)',
      boxShadow:sc?'0 2px 20px rgba(10,107,92,.1)':'0 1px 0 rgba(10,107,92,.1)',
      position:'sticky', top:0, zIndex:200, backdropFilter:'blur(8px)',
    }}>
      <a href="/" style={{ textDecoration:'none' }}><Logo height={38}/></a>
      <div style={{ display:'flex', gap:28 }}>
        {[
          ['Servicii','#servicii'],
          ['Digital Check-Up','/digital-checkup'],
          ['Tehnologii','#tehnologii'],
          ['Echipa','#echipa'],
          ['Recenzii','#recenzii'],
          ['Blog','/blog'],
        ].map(([label, href]) => (
          <a key={label} href={href} style={{
            fontSize:14, fontWeight: label==='Digital Check-Up'?700:500,
            color: label==='Digital Check-Up'?B.a:'#3a5a50',
            textDecoration:'none', padding:'4px 0',
            borderBottom:'2px solid transparent',
          }}>{label}</a>
        ))}
      </div>
      <div style={{ display:'flex', gap:10, alignItems:'center' }}>
        <a href="/login" style={{ textDecoration:'none' }}>
          <button style={{
            background:'transparent', color:B.p, border:`1.5px solid ${B.p}`,
            padding:'8px 18px', fontSize:13, fontWeight:600, cursor:'pointer',
            borderRadius:6, fontFamily:"'DM Sans',sans-serif",
          }}>Autentificare</button>
        </a>
        <Btn style={{ fontSize:13, padding:'9px 22px' }}>Programează-te</Btn>
      </div>
    </nav>
  )
}

/* ─── Hero ────────────────────────────────── */
const SVC_LIST = SERVICES.map(s => s.name)

function Hero() {
  return (
    <section style={{ background:B.wh, borderBottom:`1px solid ${B.bdr}` }}>
      <div style={{ height:4, background:`linear-gradient(90deg,${B.p},${B.pm},${B.a})`, transformOrigin:'left', animation:'barGrow .8s ease both' }}/>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1px 1.35fr 1px 0.85fr', minHeight:'calc(100vh - 114px)' }}>

        {/* COL 1 — Headline */}
        <div style={{ padding:'36px 40px 32px 52px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:44, fontWeight:800, lineHeight:1.02, letterSpacing:'-.04em', margin:'0 0 10px', color:B.a }}>
            ALEGE-TE<br/>PE TINE.
          </h1>
          <div style={{ width:44, height:3, background:B.p, borderRadius:2, marginBottom:14, transformOrigin:'left', animation:'barGrow .6s .2s ease both' }}/>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:700, color:B.nv, letterSpacing:'-.02em', margin:'0 0 14px', lineHeight:1.2 }}>
            Începe cu un Digital Check-Up.
          </h2>
          <p style={{ fontSize:14, lineHeight:1.7, color:'#4a6a58', maxWidth:340, margin:'0 0 24px' }}>
            600+ specialiști, tehnologii 3D și 15 ani de experiență — totul pentru un singur lucru: să știi exact ce ai nevoie, înainte să decizi orice.
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <Btn style={{ justifyContent:'center', padding:'12px 24px' }}>Consultație GRATUITĂ →</Btn>
            <Btn outline style={{ justifyContent:'center', padding:'12px 24px' }}>Descoperă Digital Check-Up</Btn>
          </div>
          <div style={{ display:'flex', gap:20, marginTop:28, paddingTop:20, borderTop:`1px solid ${B.bdr}` }}>
            {[[STATS.years,'ani'],[STATS.team,'specialiști'],[STATS.patients,'pacienți'],[STATS.locations,'filiale']].map(([n,l]) => (
              <div key={String(l)}>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:24, fontWeight:800, color:B.p, lineHeight:1 }}>{n}</div>
                <div style={{ fontSize:10, color:B.gr, marginTop:3, fontWeight:500 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background:B.bdr }}/>

        {/* COL 2 — Photo */}
        <div style={{ position:'relative', overflow:'hidden' }}>
          <TeamPhoto/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(10,30,24,.22) 0%,transparent 55%)', pointerEvents:'none' }}/>
          <FloatCard cls="fl1" style={{ position:'absolute', top:24, right:-14 }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:800, color:B.p }}>{STATS.patients}</div>
            <div style={{ fontSize:11, fontWeight:600, color:B.nv }}>Pacienți tratați</div>
          </FloatCard>
          <FloatCard cls="fl2" style={{ position:'absolute', bottom:24, left:-14 }}>
            <div style={{ color:'#fbb040', fontSize:14, marginBottom:2 }}>★★★★★</div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:800, color:B.nv }}>4.9 / 5.0</div>
            <div style={{ fontSize:11, color:B.gr }}>1 200+ recenzii Google</div>
          </FloatCard>
        </div>

        <div style={{ background:B.bdr }}/>

        {/* COL 3 — Services list */}
        <div style={{ padding:'32px 32px', display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <div style={{ fontSize:10, fontWeight:700, color:B.p, letterSpacing:'.22em', textTransform:'uppercase', marginBottom:16 }}>Servicii</div>
          {SVC_LIST.map((s, i) => (
            <div key={s} style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'14px 0', borderBottom:`1px solid ${B.bdr}`, cursor:'pointer', transition:'color .15s', color:B.nv }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = B.p }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = B.nv }}
            >
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <span style={{ fontSize:12, color:'rgba(10,107,92,.3)', fontWeight:700 }}>{String(i+1).padStart(2,'0')}</span>
                <span style={{ fontSize:14, fontWeight:600 }}>{s}</span>
              </div>
              <span style={{ fontSize:17, color:B.gr }}>→</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Digital Check-Up strip ──────────────── */
function CheckUpStrip() {
  return (
    <section style={{ background:`linear-gradient(135deg,${B.p},${B.pm})`, padding:'48px 52px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap:40 }}>
        <div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8,
            background:'rgba(255,255,255,.15)', border:'1px solid rgba(255,255,255,.25)',
            padding:'4px 14px', borderRadius:100, marginBottom:14 }}>
            <span style={{ fontSize:9, fontWeight:800, color:B.wh, letterSpacing:'.2em', textTransform:'uppercase' }}>
              ✦ PRODUS FLAGSHIP {CAMPAIGN_2026.year}
            </span>
          </div>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:34, fontWeight:800, color:B.wh, letterSpacing:'-.03em', lineHeight:1.1, margin:'0 0 12px' }}>
            Digital Check-Up
          </h2>
          <p style={{ fontSize:16, color:'rgba(255,255,255,.78)', maxWidth:500 }}>
            Primul pas către un zâmbet sănătos. O evaluare completă, digitală și fără disconfort —
            detectăm problemele înainte să devină costisitoare.
          </p>
        </div>
        <div style={{ flexShrink:0, display:'flex', flexDirection:'column', gap:10, alignItems:'flex-end' }}>
          <a href="/digital-checkup" style={{ textDecoration:'none' }}>
            <button style={{
              background:B.wh, color:B.p, border:'none', padding:'14px 28px', borderRadius:8,
              fontSize:14, fontWeight:800, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", whiteSpace:'nowrap',
            }}>Programează Digital Check-Up →</button>
          </a>
          <span style={{ fontSize:12, color:'rgba(255,255,255,.55)' }}>digital-checkup.smiledent.md</span>
        </div>
      </div>
    </section>
  )
}

/* ─── Services ────────────────────────────── */
const SVCS_EXTRA = [
  'Digital Smile Design, Scanner 3Shape Trios, fațete ceramice, albire. Zâmbetul tău, simulat 3D înainte de tratament.',
  'Tratamentul cariei cu materiale de ultimă generație, obturații invizibile în 30+ nuanțe. Confort maxim.',
  'Chirurgie ghidată digital, implanturi zigomatice, anestezie generală. Precizie aproape 100%.',
  'Tomografie 3D, planificare digitală completă, ghiduri chirurgicale imprimate 3D. Implantul tău în locul perfect.',
  'All-on-4, All-on-6, All-on-8. CAD/CAM pe zirconiu premium. Reabilitare totală cu garanție pe viață.',
  'Simulare 3D a rezultatului, durată redusă cu 25–30%, costuri previzibile. Tratament modern și confortabil.',
]

function Services() {
  return (
    <section id="servicii" style={{ background:B.cr, padding:'96px 52px' }}>
      <SHead eyebrow="Servicii complete" title={<>Tot ce ai nevoie,<br/>într-un singur loc</>}
        sub="De la prevenție la reabilitare totală — acoperim toate specialitățile stomatologice cu tehnologii de ultimă generație."
      />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:18 }}>
        {SERVICES.map((s, i) => (
          <div key={s.slug} style={{
            background:B.wh, border:`1px solid ${B.bdr}`, borderRadius:14, padding:'28px 24px', cursor:'pointer',
            transition:'transform .2s,box-shadow .2s,border-color .2s',
          }}
          onMouseEnter={e => { const el=e.currentTarget; el.style.transform='translateY(-4px)'; el.style.boxShadow='0 12px 36px rgba(10,107,92,.1)'; el.style.borderColor=B.p }}
          onMouseLeave={e => { const el=e.currentTarget; el.style.transform='translateY(0)'; el.style.boxShadow='none'; el.style.borderColor=B.bdr }}
          >
            <div style={{ width:48, height:48, borderRadius:12, background:`linear-gradient(135deg,${B.pm},${B.p})`,
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, color:B.wh, marginBottom:18 }}>
              {s.icon}
            </div>
            <div style={{ fontSize:10, fontWeight:700, color:B.a, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:6 }}>{s.tag}</div>
            <h3 style={{ fontSize:22, fontWeight:800, letterSpacing:'-.02em', color:B.nv, marginBottom:10 }}>{s.name.split(' ')[0]}</h3>
            <p style={{ fontSize:14, lineHeight:1.72, color:'#4a6a58', marginBottom:20 }}>{SVCS_EXTRA[i]}</p>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, fontWeight:600, color:B.p }}>
              Află mai mult <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Technologies ────────────────────────── */
const TECHS = [
  { n:'01', tag:'Estetică',      name:'Scanner 3Shape Trios', desc:'Cel mai performant scanner intraoral. Precizie 20 microni, confort digital — fără amprentă tradițională.' },
  { n:'02', tag:'Estetică',      name:'Digital Smile Design', desc:'Simulare 3D a viitorului tău zâmbet. Probezi rezultatul înainte să înceapă orice tratament.' },
  { n:'03', tag:'Chirurgie',     name:'Ghid Chirurgical 3D',  desc:'Planificare digitală completă, ghid tipărit 3D din tomografia ta. Rata de succes aproape 100%.' },
  { n:'04', tag:'Protetică',     name:'CAD/CAM & Zirconiu',   desc:'Coroane și proteze CAD-CAM pe structură de zirconiu. Rezistență maximă, garanție pe viață.' },
  { n:'05', tag:'Implantologie', name:'Tomografie 3D CBCT',   desc:'Investigație radiologică completă: densitate osoasă, structuri anatomice, planificare precisă.' },
  { n:'06', tag:'Clinică',       name:'Flux Digital Complet', desc:'De la diagnostic la finalizare — fiecare pas digital, precis și documentat.' },
]

function Technologies() {
  return (
    <section id="tehnologii" style={{ background:B.wh, padding:'96px 52px' }}>
      <div style={{ display:'flex', gap:80, alignItems:'flex-start' }}>
        <div style={{ width:320, flexShrink:0 }}>
          <SHead eyebrow="Tehnologii 2025" title={<>Viitorul<br/>stomatologiei,<br/>acum la tine</>}
            sub="Investim permanent în cele mai noi tehnologii pentru că tu meriți cel mai bun tratament posibil."
          />
          <Btn>Tranziția analog → digital →</Btn>
          <div style={{ marginTop:40, padding:'28px', background:`linear-gradient(135deg,${B.pm},${B.p})`, borderRadius:16, color:B.wh }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:52, fontWeight:800, lineHeight:1 }}>6</div>
            <div style={{ fontSize:13, fontWeight:600, opacity:.85, marginTop:4 }}>tehnologii certificate</div>
            <div style={{ fontSize:12, opacity:.6, marginTop:6 }}>utilizate zilnic în clinica noastră</div>
          </div>
        </div>
        <div style={{ flex:1, display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          {TECHS.map(t => (
            <div key={t.n} style={{ background:B.ps, border:`1px solid ${B.bdr}`, borderRadius:14, padding:'26px', transition:'transform .2s,box-shadow .2s' }}
              onMouseEnter={e => { const el=e.currentTarget; el.style.transform='translateY(-3px)'; el.style.boxShadow='0 8px 28px rgba(10,107,92,.1)' }}
              onMouseLeave={e => { const el=e.currentTarget; el.style.transform='translateY(0)'; el.style.boxShadow='none' }}
            >
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
                <span style={{ fontFamily:"'Syne',sans-serif", fontSize:32, fontWeight:800, color:'rgba(10,107,92,.18)', lineHeight:1 }}>{t.n}</span>
                <span style={{ background:B.al, color:B.a, fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:40 }}>{t.tag}</span>
              </div>
              <h4 style={{ fontSize:16, fontWeight:700, color:B.nv, marginBottom:10 }}>{t.name}</h4>
              <p style={{ fontSize:13, lineHeight:1.7, color:'#4a6a58' }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Before / After ──────────────────────── */
function BeforeAfter() {
  const cases = [
    { label:'Implanturi + Protetică', before:'Dinți lipsă, carii avansate', after:'Zâmbet complet restaurat' },
    { label:'Digital Smile Design',   before:'Dinți inegali, decolorați',   after:'Fațete ceramice perfecte' },
    { label:'Ortodonție Digitală',    before:'Malocluzii, spații',          after:'Aliniere perfectă 3D' },
    { label:'All-on-4 Complet',       before:'Edentație totală',            after:'Arcadă completă 1 zi' },
  ]
  return (
    <section style={{ background:`linear-gradient(135deg,${B.p},${B.pm})`, padding:'88px 52px' }}>
      <SHead center light eyebrow="Rezultate reale" title="Transformări care schimbă vieți"
        sub="Fiecare caz este unic. Iată câteva dintre transformările de care se bucură pacienții noștri."
      />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
        {cases.map(c => (
          <div key={c.label} style={{ background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.12)', borderRadius:14, overflow:'hidden' }}>
            <div style={{ height:180, background:'rgba(255,255,255,.05)', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
              <span style={{ fontSize:11, color:'rgba(255,255,255,.28)', letterSpacing:'.1em' }}>FOTO ÎNAINTE / DUPĂ</span>
              <div style={{ position:'absolute', left:'50%', top:0, bottom:0, width:2, background:'rgba(255,255,255,.18)' }}/>
              <div style={{ position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', width:28, height:28, borderRadius:'50%', background:B.wh, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <span style={{ fontSize:10, color:B.p, fontWeight:800 }}>↔</span>
              </div>
            </div>
            <div style={{ padding:'18px 20px' }}>
              <div style={{ fontSize:10, fontWeight:700, color:B.a, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:8 }}>{c.label}</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,.5)', marginBottom:4 }}>Înainte: <span style={{ color:'rgba(255,255,255,.75)' }}>{c.before}</span></div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,.5)' }}>După: <span style={{ color:B.wh, fontWeight:600 }}>{c.after}</span></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Reviews ─────────────────────────────── */
const REVIEWS = [
  { name:'Denis P.',     proc:'Digital Check-Up',  text:'«Excellent service, very kind and professional. I want to thank Dr. Roman and Dr. Stefano, exceptional experience!»' },
  { name:'Alexandru C.', proc:'Estetică dentară',   text:'«Smile Dent Team offers excellent dental services. Victoria Potîngă proves to be a dedicated and empathetic professional.»' },
  { name:'S. L.',        proc:'Tratament complex',  text:'«This place is amazing. They speak English and have an amazing understanding of dental care. Amazing dentists for expats!»' },
  { name:'Kathryn J.',   proc:'Protetică digitală', text:'«Retainers made and ready within five hours using incredibly modern technology! Would recommend to anyone in the area.»' },
  { name:'Александр З.', proc:'Implantologie',      text:'«A dentist who knows their business 101%. Helped me once again with my problematic teeth. I am eternally grateful.»' },
  { name:'Ksenia D.',    proc:'Pacient fidel',      text:'«Thank you Smile Dent for 3 years with me 💚»' },
]

function Reviews() {
  return (
    <section id="recenzii" style={{ background:B.wh, padding:'96px 52px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:52 }}>
        <SHead eyebrow="Recenzii pacienți" title={<>Ce spun<br/>pacienții noștri</>} sub="Peste 1 200 de recenzii verificate. Nota medie 4.9/5.0 pe Google."/>
        <div style={{ background:B.pl, borderRadius:16, padding:'24px 32px', textAlign:'center', border:`1px solid ${B.bdr}`, flexShrink:0, marginBottom:16 }}>
          <div style={{ color:'#fbb040', fontSize:20, marginBottom:4 }}>★★★★★</div>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:40, fontWeight:800, color:B.p, lineHeight:1 }}>4.9</div>
          <div style={{ fontSize:12, color:B.gr, marginTop:4 }}>1 200+ recenzii</div>
          <div style={{ fontSize:11, color:B.p, fontWeight:600, marginTop:6 }}>Google Verified</div>
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:18 }}>
        {REVIEWS.map(r => (
          <div key={r.name} style={{ background:B.wh, border:`1px solid ${B.bdr}`, borderRadius:14, padding:'26px', transition:'transform .2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform='translateY(-3px)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform='translateY(0)' }}
          >
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
              <div>
                <div style={{ fontWeight:700, fontSize:14, color:B.nv }}>{r.name}</div>
                <div style={{ fontSize:11, color:B.p, fontWeight:600, marginTop:2 }}>{r.proc}</div>
              </div>
              <div style={{ color:'#fbb040', fontSize:13 }}>★★★★★</div>
            </div>
            <p style={{ fontSize:14, lineHeight:1.72, color:'#4a6a58', fontStyle:'italic' }}>{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── FAQ ─────────────────────────────────── */
const FAQS = [
  { q:'Ce este Digital Check-Up?', a:'O procedură modernă care combină Protocol Fotografic, Scanner 3Shape, Radiografie 3D și Consultație Personalizată pentru o analiză completă a sănătății dentare.' },
  { q:'Cât durează o consultație inițială?', a:'30–45 minute. Include examinare clinică, radiografie și plan de tratament personalizat, discutat împreună cu tine.' },
  { q:'Oferiți opțiuni de finanțare?', a:'Da! Lucrăm cu parteneri financiari și oferim rate lunare fără dobândă pentru tratamentele majore.' },
  { q:'Este dureroasă implantologia dentară?', a:'Nu. Folosim anestezie locală modernă și, pentru cazuri complexe, anestezie generală. Ghidul 3D minimizează intervenția.' },
  { q:'Pot vedea rezultatul înainte de tratament?', a:'Absolut! Cu Digital Smile Design și 3Shape Trios, simulăm 3D rezultatul în cabinet. Aprobi designul înainte de orice intervenție.' },
]

function FAQ() {
  const [open, setOpen] = useState<number|null>(null)
  return (
    <section style={{ background:B.cr, padding:'96px 52px' }}>
      <div style={{ display:'flex', gap:80 }}>
        <div style={{ width:340, flexShrink:0 }}>
          <SHead eyebrow="Întrebări frecvente" title={<>Ai întrebări?<br/>Avem răspunsuri.</>}
            sub="Nu găsești răspunsul? Contactează-ne direct sau programează o consultație gratuită."
          />
          <Btn>Contactează-ne →</Btn>
        </div>
        <div style={{ flex:1 }}>
          {FAQS.map((f,i) => (
            <div key={i} style={{ borderBottom:`1px solid ${B.bdr}` }}>
              <button onClick={() => setOpen(open===i?null:i)} style={{
                width:'100%', background:'none', border:'none', textAlign:'left', padding:'20px 0', cursor:'pointer',
                display:'flex', justifyContent:'space-between', alignItems:'center',
                fontFamily:"'DM Sans',sans-serif", fontSize:16, fontWeight:600, color:B.nv,
              }}>
                <span>{f.q}</span>
                <span style={{ fontSize:20, color:B.p, flexShrink:0, marginLeft:16, transition:'transform .25s', transform:open===i?'rotate(45deg)':'rotate(0)' }}>+</span>
              </button>
              <div style={{ maxHeight:open===i?'200px':'0', overflow:'hidden', transition:'max-height .35s ease' }}>
                <p style={{ fontSize:15, lineHeight:1.78, color:'#4a6a58', paddingBottom:20, paddingRight:40 }}>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Appointment ─────────────────────────── */
function Appointment() {
  const inp: React.CSSProperties = { width:'100%', padding:'12px 16px', border:`1.5px solid rgba(10,107,92,.18)`, borderRadius:8, fontFamily:"'DM Sans',sans-serif", fontSize:14, outline:'none', background:B.wh }
  return (
    <section style={{ background:`linear-gradient(135deg,${B.p},${B.pm})`, padding:'96px 52px' }}>
      <div style={{ display:'flex', gap:80, alignItems:'center' }}>
        <div style={{ flex:1, color:B.wh }}>
          <div style={{ marginBottom:32, padding:'20px 24px', background:'rgba(255,255,255,.08)', border:'1px solid rgba(255,255,255,.15)', borderRadius:12 }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:32, fontWeight:800, color:B.a, letterSpacing:'-.02em' }}>{CAMPAIGN_2026.slogan}</div>
            <div style={{ fontSize:14, color:'rgba(255,255,255,.7)', marginTop:6 }}>Investește în sănătatea ta — începe cu Digital Check-Up.</div>
          </div>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:38, fontWeight:800, lineHeight:1.06, letterSpacing:'-.03em', margin:'0 0 20px', color:B.wh }}>
            Fă primul pas<br/>spre zâmbetul perfect
          </h2>
          <p style={{ fontSize:17, lineHeight:1.75, color:'rgba(255,255,255,.75)', maxWidth:380, margin:'0 0 32px' }}>
            Consultație inițială <strong style={{ color:B.wh }}>GRATUITĂ</strong>. Fără angajament.
          </p>
          {['Consultație gratuită confirmată în 24h','Fără liste de așteptare','Plan de tratament digital detaliat','Prețuri transparente de la prima întâlnire'].map(item => (
            <div key={item} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
              <div style={{ width:20, height:20, borderRadius:'50%', background:'rgba(255,255,255,.15)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <span style={{ fontSize:10, color:B.wh }}>✓</span>
              </div>
              <span style={{ fontSize:14, color:'rgba(255,255,255,.85)' }}>{item}</span>
            </div>
          ))}
        </div>
        <div style={{ width:420, flexShrink:0, background:B.wh, borderRadius:20, padding:'40px', boxShadow:'0 24px 80px rgba(10,30,24,.28)' }}>
          <h3 style={{ fontSize:22, fontWeight:800, color:B.nv, marginBottom:8, letterSpacing:'-.02em' }}>Programează-te acum</h3>
          <p style={{ fontSize:14, color:B.gr, marginBottom:28 }}>Completează formularul — te contactăm în max. 2h.</p>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              <input placeholder="Prenume" style={inp}/>
              <input placeholder="Nume" style={inp}/>
            </div>
            <input placeholder="Telefon *" style={inp}/>
            <input placeholder="Email" style={inp}/>
            <select defaultValue="" style={{ ...inp }}>
              <option value="" disabled>Selectează serviciul</option>
              <option>⭐ Digital Check-Up</option>
              {SVC_LIST.map(s => <option key={s}>{s}</option>)}
            </select>
            <textarea placeholder="Mesaj opțional" rows={3} style={{ ...inp, resize:'none' }}/>
            <Btn style={{ justifyContent:'center', padding:'15px', fontSize:15 }}>Trimite cererea →</Btn>
            <p style={{ fontSize:11, color:B.gr, textAlign:'center' }}>
              Prin trimitere ești de acord cu <span style={{ color:B.p, cursor:'pointer' }}>Politica de confidențialitate</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ──────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background:B.nv, padding:'64px 52px 32px' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr 1fr 1fr', gap:48, marginBottom:48 }}>
        <div>
          <div style={{ marginBottom:20 }}><Logo height={34} light/></div>
          <p style={{ fontSize:14, lineHeight:1.75, color:'rgba(255,255,255,.6)', maxWidth:260 }}>
            Clinică stomatologică digitală. 15 ani de excelență, {STATS.team} specialiști, {STATS.patients} pacienți, {STATS.locations} filiale.
          </p>
          <div style={{ marginTop:20, padding:'12px 16px', background:'rgba(232,21,122,.12)', border:'1px solid rgba(232,21,122,.2)', borderRadius:8 }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:800, color:B.a }}>{CAMPAIGN_2026.slogan}</div>
          </div>
          <div style={{ display:'flex', gap:10, marginTop:16 }}>
            {['FB','IG','YT','TK'].map(s => (
              <div key={s} style={{ width:34, height:34, borderRadius:8, background:'rgba(255,255,255,.07)',
                display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer',
                fontSize:11, fontWeight:700, color:'rgba(255,255,255,.5)', transition:'background .15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(10,107,92,.45)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.07)' }}
              >{s}</div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:B.wh, letterSpacing:'.15em', textTransform:'uppercase', marginBottom:20 }}>Servicii</div>
          <div style={{ fontSize:13, marginBottom:10, color:B.a, cursor:'pointer', fontWeight:600 }}>⭐ Digital Check-Up</div>
          {SVC_LIST.map(s => (
            <div key={s} style={{ fontSize:13, marginBottom:10, color:'rgba(255,255,255,.58)', cursor:'pointer', transition:'color .15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = B.wh }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,.58)' }}
            >{s}</div>
          ))}
        </div>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:B.wh, letterSpacing:'.15em', textTransform:'uppercase', marginBottom:20 }}>Clinică</div>
          {['Despre noi','Echipa','Tehnologii','Vlog','Blog','Cariere','Contacte'].map(s => (
            <div key={s} style={{ fontSize:13, marginBottom:10, color:'rgba(255,255,255,.58)', cursor:'pointer', transition:'color .15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = B.wh }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,.58)' }}
            >{s}</div>
          ))}
        </div>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:B.wh, letterSpacing:'.15em', textTransform:'uppercase', marginBottom:20 }}>Contact</div>
          {LOCATIONS.slice(0,3).map(l => (
            <div key={l.city} style={{ marginBottom:16, lineHeight:1.65 }}>
              <div style={{ fontSize:13, fontWeight:600, color:B.wh }}>{l.city}</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,.52)' }}>{l.address}</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,.52)' }}>{l.phone}</div>
            </div>
          ))}
          <a href="mailto:info@smiledent.md" style={{ fontSize:13, color:B.pm, fontWeight:600, textDecoration:'none' }}>info@smiledent.md</a>
        </div>
      </div>
      <div style={{ borderTop:'1px solid rgba(255,255,255,.07)', paddingTop:24, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <Logo height={26} light/>
          <span style={{ fontSize:12, color:'rgba(255,255,255,.28)' }}>© {CAMPAIGN_2026.year} Smile Dent Team. Toate drepturile rezervate.</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:20 }}>
          <div style={{ display:'flex', gap:6 }}>
            {['RO','RU','EN'].map(l => (
              <span key={l} style={{ background:'rgba(255,255,255,.08)', color:'rgba(255,255,255,.5)', padding:'4px 10px', borderRadius:40, fontSize:11, fontWeight:700, letterSpacing:'.08em', cursor:'pointer', transition:'all .15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.15)'; (e.currentTarget as HTMLElement).style.color = B.wh }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,.08)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,.5)' }}
              >{l}</span>
            ))}
          </div>
          <div style={{ display:'flex', gap:24, fontSize:12, color:'rgba(255,255,255,.3)' }}>
            {['Politica de confidențialitate','Termeni și condiții','Cookies'].map(s => (
              <span key={s} style={{ cursor:'pointer', transition:'color .15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,.7)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,.3)' }}
              >{s}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── Keyframes injected once ─────────────── */
const ANIM_CSS = `
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
  @keyframes barGrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
  .fl1{animation:floatY 4s ease-in-out infinite}
  .fl2{animation:floatY 4.6s 1.1s ease-in-out infinite}
`

/* ─── Exports ─────────────────────────────── */
export function Homepage() {
  const [lang, setLang] = useState('RO')
  return (
    <>
      <style>{ANIM_CSS}</style>
      <Topbar lang={lang} setLang={setLang}/>
      <Navbar/>
      <Hero/>
      <CheckUpStrip/>
      <Services/>
      <Technologies/>
      <BeforeAfter/>
      <Reviews/>
      <FAQ/>
      <Appointment/>
      <Footer/>
    </>
  )
}

export function DigitalCheckupPage() {
  return <div style={{ padding:40, fontFamily:"'DM Sans',sans-serif" }}><h1 style={{ color:B.p, fontFamily:"'Syne',sans-serif" }}>Digital Check-Up — în construcție</h1></div>
}

export function LoginPage() {
  return <div style={{ padding:40, fontFamily:"'DM Sans',sans-serif" }}><h1 style={{ color:B.p, fontFamily:"'Syne',sans-serif" }}>Login — în construcție</h1></div>
}

export function DashboardPage() {
  return <div style={{ padding:40, fontFamily:"'DM Sans',sans-serif" }}><h1 style={{ color:B.p, fontFamily:"'Syne',sans-serif" }}>Cabinet Personal — în construcție</h1></div>
}

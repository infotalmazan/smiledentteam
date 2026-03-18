'use client'
import { useState } from 'react'
import { BRAND as B, STATS, LOCATIONS, CAMPAIGN_2026 } from '@/lib/brand'
import { Logo } from './Logo'

/* ─── Shared UI ──────────────────────────── */
const ANIM = `
  @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
  @keyframes barGrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
`

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

function SectionBadge({ children, light }: { children: string; light?: boolean }) {
  return (
    <div style={{
      display:'inline-flex', alignItems:'center', gap:6,
      background: light ? 'rgba(255,255,255,.12)' : B.pl,
      border: light ? '1px solid rgba(255,255,255,.2)' : `1px solid ${B.bdr}`,
      padding:'5px 14px', borderRadius:100, marginBottom:16,
    }}>
      <span style={{ width:6, height:6, borderRadius:'50%', background: light ? B.wh : B.p }}/>
      <span style={{ fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color: light ? B.wh : B.p }}>{children}</span>
    </div>
  )
}

/* ─── Navbar (reused from homepage style) ─── */
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
          {[['Servicii','/'],['Digital Check-Up','/digital-checkup'],['Echipa','/'],['Recenzii','/'],['Contact','/']].map(([l,h]) => (
            <a key={l} href={h} style={{
              fontSize:14, fontWeight: l==='Digital Check-Up' ? 700 : 500,
              color: l==='Digital Check-Up' ? B.a : '#3a5a50', textDecoration:'none',
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
    <section style={{ background:`linear-gradient(160deg, ${B.nv} 0%, #0f2e24 50%, ${B.pd} 100%)`, position:'relative', overflow:'hidden' }}>
      {/* Decorative circles */}
      <div style={{ position:'absolute', top:-120, right:-80, width:400, height:400, borderRadius:'50%', border:'1px solid rgba(255,255,255,.04)' }}/>
      <div style={{ position:'absolute', bottom:-60, left:-40, width:250, height:250, borderRadius:'50%', border:'1px solid rgba(255,255,255,.03)' }}/>

      <div style={{ maxWidth:1200, margin:'0 auto', padding:'80px 48px 72px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center' }}>
        {/* Left */}
        <div>
          <SectionBadge light>Produs Flagship 2026</SectionBadge>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:52, fontWeight:800, color:B.wh, lineHeight:1.05, letterSpacing:'-.03em', margin:'0 0 20px' }}>
            Digital<br/><span style={{ color:B.a }}>Check-Up</span>
          </h1>
          <p style={{ fontSize:18, lineHeight:1.7, color:'rgba(255,255,255,.7)', maxWidth:480, margin:'0 0 36px' }}>
            Primul pas către un zâmbet sănătos. O evaluare completă, digitală și fără disconfort — detectăm problemele înainte să devină costisitoare.
          </p>
          <div style={{ display:'flex', gap:14 }}>
            <Btn pink style={{ fontSize:15 }}>Programează Digital Check-Up →</Btn>
            <Btn outline style={{ borderColor:'rgba(255,255,255,.3)', color:B.wh }}>Află mai multe ↓</Btn>
          </div>
          <div style={{ display:'flex', gap:32, marginTop:44 }}>
            {[['30 min','Durată'],['100%','Digital'],['0','Disconfort']].map(([n,l]) => (
              <div key={l}>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800, color:B.a }}>{n}</div>
                <div style={{ fontSize:12, color:'rgba(255,255,255,.45)', marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Visual card */}
        <div style={{ position:'relative', display:'flex', justifyContent:'center' }}>
          <div style={{
            width:380, height:420, borderRadius:20, overflow:'hidden',
            background:`linear-gradient(135deg, ${B.pm}22, ${B.a}11)`,
            border:'1px solid rgba(255,255,255,.08)',
            display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:20,
          }}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke={B.a} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12l2 2 4-4"/>
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
            </svg>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800, color:B.wh, textAlign:'center' }}>
              Scanare 3D<br/>Completă
            </div>
            <div style={{ fontSize:13, color:'rgba(255,255,255,.5)', textAlign:'center', maxWidth:240 }}>
              Tehnologie de ultimă generație pentru un diagnostic precis
            </div>
          </div>
          {/* Float cards */}
          <div style={{
            position:'absolute', top:30, right:-10, background:B.wh, borderRadius:12,
            padding:'12px 18px', boxShadow:'0 8px 32px rgba(0,0,0,.15)', animation:'float 4s ease-in-out infinite',
          }}>
            <div style={{ fontSize:11, color:B.gr, marginBottom:2 }}>Precizie</div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800, color:B.p }}>99.8%</div>
          </div>
          <div style={{
            position:'absolute', bottom:40, left:-20, background:B.wh, borderRadius:12,
            padding:'12px 18px', boxShadow:'0 8px 32px rgba(0,0,0,.15)', animation:'float 4.5s 1s ease-in-out infinite',
          }}>
            <div style={{ color:'#fbb040', fontSize:13, marginBottom:2 }}>★★★★★</div>
            <div style={{ fontSize:12, fontWeight:700, color:B.nv }}>4.9 / 5.0</div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Benefits ─────────────────────────── */
const BENEFITS = [
  { icon:'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title:'Detecție timpurie', desc:'Identifică cariile, inflamațiile gingivale și alte afecțiuni înainte de a deveni grave.' },
  { icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', title:'Prevenție inteligentă', desc:'Evită tratamente complicate prin checkup-uri regulate cu tehnologie avansată.' },
  { icon:'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title:'Precizie digitală', desc:'Analiză cu tehnologie de ultimă generație, fără disconfort, rezultate imediate.' },
  { icon:'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', title:'Consultație personalizată', desc:'Plan de tratament adaptat nevoilor tale, explicat clar și transparent.' },
  { icon:'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', title:'Claritate totală', desc:'Înțelegi exact starea ta dentară și pașii necesari pentru un zâmbet perfect.' },
  { icon:'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', title:'Încredere crescută', desc:'Un zâmbet sănătos îți oferă siguranță în fiecare zi.' },
]

function Benefits() {
  return (
    <section style={{ background:B.wh, padding:'80px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <SectionBadge>De ce Digital Check-Up</SectionBadge>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:38, fontWeight:800, color:B.nv, letterSpacing:'-.03em', margin:'0 0 14px' }}>
            Beneficiile unui<br/><span style={{ color:B.p }}>Digital Check-Up</span>
          </h2>
          <p style={{ fontSize:15, color:B.gr, maxWidth:520, margin:'0 auto' }}>
            O procedură modernă, rapidă și precisă care îți analizează sănătatea dentară în detaliu.
          </p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
          {BENEFITS.map((b, i) => (
            <div key={b.title} style={{
              padding:'32px 28px', borderRadius:12, border:`1px solid ${B.bdr}`,
              transition:'all .25s', cursor:'pointer', background:B.wh,
            }}
              onMouseEnter={e => { const t = e.currentTarget; t.style.transform='translateY(-4px)'; t.style.borderColor=B.p; t.style.boxShadow=`0 12px 32px ${B.bdr}` }}
              onMouseLeave={e => { const t = e.currentTarget; t.style.transform=''; t.style.borderColor=B.bdr; t.style.boxShadow='' }}
            >
              <div style={{
                width:48, height:48, borderRadius:12, background:B.pl,
                display:'flex', alignItems:'center', justifyContent:'center', marginBottom:18,
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={B.p} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={b.icon}/></svg>
              </div>
              <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:17, fontWeight:700, color:B.nv, margin:'0 0 8px' }}>{b.title}</h3>
              <p style={{ fontSize:13, lineHeight:1.65, color:B.gr, margin:0 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Process Steps ────────────────────── */
const STEPS = [
  { num:'01', title:'Înregistrare', desc:'Completezi datele și primești o consultație inițială.' },
  { num:'02', title:'Protocol foto', desc:'Realizăm fotografii profesionale pentru documentare completă.' },
  { num:'03', title:'Scanare digitală 3D', desc:'Scanner intraoral de ultimă generație — fără paste, fără disconfort.' },
  { num:'04', title:'Radiografie CBCT', desc:'Imagini 3D de înaltă rezoluție pentru un diagnostic complet.' },
  { num:'05', title:'Evaluare detaliată', desc:'Medicul analizează toate datele și identifică problemele.' },
  { num:'06', title:'Plan de tratament', desc:'Primești un plan personalizat, cu opțiuni și costuri clare.' },
]

function Process() {
  return (
    <section style={{ background:B.ps, padding:'80px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <SectionBadge>Cum funcționează</SectionBadge>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:38, fontWeight:800, color:B.nv, letterSpacing:'-.03em', margin:'0 0 14px' }}>
            Etapele unui<br/><span style={{ color:B.p }}>Digital Check-Up</span>
          </h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
          {STEPS.map((s, i) => (
            <div key={s.num} style={{
              background:B.wh, borderRadius:12, padding:'28px 24px', border:`1px solid ${B.bdr}`,
              position:'relative', overflow:'hidden',
            }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:48, fontWeight:800, color:B.pl, position:'absolute', top:12, right:16, lineHeight:1 }}>{s.num}</div>
              <div style={{
                width:36, height:36, borderRadius:8, background:`linear-gradient(135deg,${B.p},${B.pm})`,
                display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14,
              }}>
                <span style={{ color:B.wh, fontSize:14, fontWeight:800 }}>{s.num}</span>
              </div>
              <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:700, color:B.nv, margin:'0 0 6px' }}>{s.title}</h3>
              <p style={{ fontSize:13, lineHeight:1.6, color:B.gr, margin:0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── When you need it ─────────────────── */
const INDICATORS = [
  'Sângerări ale gingiilor sau respirație neplăcută',
  'Probleme la mestecat sau disconfort la mâncare',
  'Porți proteze și ai nevoie de verificare',
  'Nu ai fost la control de mai mult de 6 luni',
  'Vrei să-ți planifici un tratament estetic',
  'Ai dureri sau sensibilitate dentară',
]

function WhenNeeded() {
  return (
    <section style={{ background:B.wh, padding:'80px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center' }}>
        <div>
          <SectionBadge>Ai nevoie de check-up?</SectionBadge>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:34, fontWeight:800, color:B.nv, letterSpacing:'-.03em', margin:'0 0 14px', lineHeight:1.1 }}>
            Când ar trebui<br/>să faci un <span style={{ color:B.p }}>Digital Check-Up</span>?
          </h2>
          <p style={{ fontSize:14, lineHeight:1.7, color:B.gr, margin:'0 0 28px', maxWidth:420 }}>
            Dacă te regăsești în oricare dintre situațiile de mai jos, Digital Check-Up este soluția ideală.
          </p>
          <Btn pink>Programează-te acum →</Btn>
        </div>
        <div style={{ display:'grid', gap:12 }}>
          {INDICATORS.map((ind, i) => (
            <div key={i} style={{
              display:'flex', alignItems:'center', gap:14, padding:'14px 20px',
              background:B.ps, borderRadius:10, border:`1px solid ${B.bdr}`,
            }}>
              <div style={{
                width:28, height:28, borderRadius:'50%', background:B.pl, flexShrink:0,
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={B.p} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <span style={{ fontSize:14, color:B.nv, fontWeight:500 }}>{ind}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA Strip ────────────────────────── */
function CtaStrip() {
  return (
    <section style={{ background:`linear-gradient(135deg,${B.p},${B.pm})`, padding:'60px 48px' }}>
      <div style={{ maxWidth:900, margin:'0 auto', textAlign:'center' }}>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:34, fontWeight:800, color:B.wh, margin:'0 0 14px', letterSpacing:'-.02em' }}>
          Alege-te pe tine. Programează un Digital Check-Up.
        </h2>
        <p style={{ fontSize:16, color:'rgba(255,255,255,.7)', margin:'0 0 32px', maxWidth:540, marginLeft:'auto', marginRight:'auto' }}>
          30 de minute care îți pot schimba zâmbetul. Fără durere, fără surprize — doar claritate.
        </p>
        <div style={{ display:'flex', gap:14, justifyContent:'center' }}>
          <Btn pink style={{ fontSize:16, padding:'16px 36px' }}>Programează-te →</Btn>
          <Btn outline style={{ borderColor:'rgba(255,255,255,.3)', color:B.wh, fontSize:16, padding:'16px 36px' }}>Sună: +373 22 881 414</Btn>
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ ──────────────────────────────── */
const FAQS = [
  { q:'Cât durează un Digital Check-Up?', a:'Un Digital Check-Up complet durează aproximativ 30 de minute. Include scanarea 3D, radiografia și consultația personalizată.' },
  { q:'Este dureros?', a:'Nu. Digital Check-Up este complet non-invaziv. Scanarea 3D se face cu un scanner intraoral mic, fără paste sau disconfort.' },
  { q:'Ce include prețul?', a:'Prețul include scanarea digitală 3D, radiografia CBCT, evaluarea completă de către specialist și planul de tratament personalizat.' },
  { q:'Cum mă pot programa?', a:'Poți suna la +373 22 881 414, completa formularul de pe site, sau vizita direct clinica din str. Ismail 88, Chișinău.' },
  { q:'Pot vedea rezultatul Smile Design înainte de tratament?', a:'Da! Prin tehnologia Digital Smile Design, poți vizualiza rezultatul final al zâmbetului tău înainte de a începe orice procedură.' },
]

function Faq() {
  const [open, setOpen] = useState<number|null>(null)
  return (
    <section style={{ background:B.wh, padding:'80px 48px' }}>
      <div style={{ maxWidth:800, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <SectionBadge>Întrebări frecvente</SectionBadge>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:34, fontWeight:800, color:B.nv, letterSpacing:'-.03em', margin:0 }}>
            Tot ce trebuie să știi
          </h2>
        </div>
        {FAQS.map((f, i) => (
          <div key={i} style={{ borderBottom:`1px solid ${B.bdr}` }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{
              width:'100%', background:'none', border:'none', cursor:'pointer',
              padding:'20px 0', display:'flex', justifyContent:'space-between', alignItems:'center',
              fontFamily:"'DM Sans',sans-serif",
            }}>
              <span style={{ fontSize:15, fontWeight:600, color:B.nv, textAlign:'left' }}>{f.q}</span>
              <span style={{
                fontSize:20, color:B.p, transition:'transform .2s', fontWeight:300,
                transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
              }}>+</span>
            </button>
            <div style={{
              maxHeight: open === i ? 200 : 0, overflow:'hidden', transition:'max-height .3s ease',
            }}>
              <p style={{ fontSize:14, lineHeight:1.7, color:B.gr, margin:'0 0 20px', paddingRight:40 }}>{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Appointment Form ─────────────────── */
function AppointmentForm() {
  return (
    <section style={{ background:B.ps, padding:'80px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center' }}>
        <div>
          <SectionBadge>Programare</SectionBadge>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:34, fontWeight:800, color:B.nv, margin:'0 0 14px', letterSpacing:'-.02em', lineHeight:1.1 }}>
            Programează-ți<br/><span style={{ color:B.a }}>Digital Check-Up</span>
          </h2>
          <p style={{ fontSize:14, lineHeight:1.7, color:B.gr, margin:'0 0 28px', maxWidth:400 }}>
            Completează formularul și te contactăm în 24h pentru confirmare. Fără obligații, fără surprize.
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {[
              ['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z','Confirmare în max. 24h'],
              ['M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z','Durată: ~30 minute'],
              ['M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z','Fără durere, 100% digital'],
              ['M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z','Prețuri transparente'],
            ].map(([icon, text]) => (
              <div key={text} style={{ display:'flex', alignItems:'center', gap:12 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={B.p} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={icon}/></svg>
                <span style={{ fontSize:14, color:B.nv, fontWeight:500 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div style={{ background:B.wh, borderRadius:16, padding:'36px 32px', border:`1px solid ${B.bdr}`, boxShadow:`0 8px 32px ${B.bdr}` }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:14 }}>
            <input placeholder="Prenume" style={inputStyle}/>
            <input placeholder="Nume" style={inputStyle}/>
          </div>
          <input placeholder="Telefon" type="tel" style={{ ...inputStyle, marginBottom:14 }}/>
          <input placeholder="Email" type="email" style={{ ...inputStyle, marginBottom:14 }}/>
          <select style={{ ...inputStyle, marginBottom:14, color:B.gr }}>
            <option>Selectează locația</option>
            {LOCATIONS.map(l => <option key={l.city}>{l.city} — {l.address}</option>)}
          </select>
          <textarea placeholder="Mesaj opțional" rows={3} style={{ ...inputStyle, marginBottom:20, resize:'vertical' }}/>
          <Btn pink style={{ width:'100%', justifyContent:'center', fontSize:15, padding:'14px' }}>
            Trimite cererea →
          </Btn>
          <p style={{ fontSize:11, color:B.gr, textAlign:'center', marginTop:12 }}>
            Prin trimitere ești de acord cu <span style={{ color:B.p, cursor:'pointer' }}>Politica de confidențialitate</span>
          </p>
        </div>
      </div>
    </section>
  )
}

const inputStyle: React.CSSProperties = {
  width:'100%', padding:'12px 16px', border:`1px solid ${B.bdr}`, borderRadius:8,
  fontSize:14, fontFamily:"'DM Sans',sans-serif", background:B.wh, outline:'none',
  boxSizing:'border-box', transition:'border-color .15s',
}

/* ─── Footer ──────────────────────────── */
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
          {['Digital Check-Up','Estetică & Smile Design','Terapie & Profilaxie','Chirurgie Orală','Implantologie 3D','Protetică CAD/CAM','Ortodonție Digitală'].map(s => (
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
              <div style={{ fontSize:12, color:'rgba(255,255,255,.45)' }}>{l.address}</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,.45)' }}>{l.phone}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ borderTop:'1px solid rgba(255,255,255,.07)', paddingTop:20, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <Logo height={22} light/>
          <span style={{ fontSize:11, color:'rgba(255,255,255,.25)' }}>© {CAMPAIGN_2026.year} Smile Dent Team. Toate drepturile rezervate.</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <div style={{ display:'flex', gap:6 }}>
            {['RO','RU','EN'].map(l => (
              <span key={l} style={{ background:'rgba(255,255,255,.08)', color:'rgba(255,255,255,.5)', padding:'3px 8px', borderRadius:40, fontSize:10, fontWeight:700, cursor:'pointer' }}>{l}</span>
            ))}
          </div>
          <div style={{ display:'flex', gap:16, fontSize:11, color:'rgba(255,255,255,.25)' }}>
            {['Confidențialitate','Termeni','Cookies'].map(s => (
              <span key={s} style={{ cursor:'pointer' }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── Main Export ──────────────────────── */
export function DigitalCheckupPage() {
  return (
    <>
      <style>{ANIM}</style>
      <Nav/>
      <Hero/>
      <Benefits/>
      <Process/>
      <WhenNeeded/>
      <CtaStrip/>
      <Faq/>
      <AppointmentForm/>
      <Footer/>
    </>
  )
}

'use client'
import { useState } from 'react'
import { BRAND as B, STATS, LOCATIONS, CAMPAIGN_2026, DIASPORA, SERVICES } from '@/lib/brand'
import { Logo } from './Logo'

/* ─── Animations ─────────────────────────── */
const ANIM = `
  @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes orbit{from{transform:rotate(0deg) translateX(var(--r)) rotate(0deg)}to{transform:rotate(360deg) translateX(var(--r)) rotate(-360deg)}}
  @keyframes pulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}}
`

/* ─── Shared UI ──────────────────────────── */
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

/* ─── Nav ─────────────────────────────────── */
function Nav() {
  return (
    <>
      <div style={{ background:B.p, padding:'8px 48px', display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:12, color:'rgba(255,255,255,.7)' }}>
        <div style={{ display:'flex', gap:24 }}>
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
          {[['Servicii','/servicii'],['Digital Check-Up','/digital-checkup'],['Consultație Online','/consultatie-online'],['Echipa','/echipa'],['Recenzii','/']].map(([l,h]) => (
            <a key={l} href={h} style={{
              fontSize:14, fontWeight: l==='Consultație Online' ? 700 : 500,
              color: l==='Consultație Online' ? B.a : '#3a5a50', textDecoration:'none',
              borderBottom: l==='Consultație Online' ? `2px solid ${B.a}` : '2px solid transparent', paddingBottom:2,
            }}>{l}</a>
          ))}
        </div>
        <Btn pink style={{ fontSize:13, padding:'10px 22px' }}>Programează-te</Btn>
      </nav>
    </>
  )
}

/* ─── All world flags for globe effect ──── */
const FLAGS = ['🇩🇪','🇫🇷','🇬🇧','🇺🇸','🇪🇸','🇮🇹','🇵🇹','🇷🇴','🇦🇹','🇧🇪','🇳🇱','🇸🇪','🇨🇭','🇮🇪','🇨🇦','🇦🇺','🇮🇱','🇬🇷','🇨🇿','🇩🇰','🇳🇴','🇫🇮','🇵🇱','🇭🇺','🇹🇷','🇯🇵','🇰🇷','🇧🇷','🇦🇷','🇲🇽']

/* ─── Hero ──────────────────────────────── */
function Hero() {
  return (
    <section style={{ background:`linear-gradient(160deg, ${B.nv} 0%, #0f2e24 50%, ${B.pd} 100%)`, position:'relative', overflow:'hidden' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'72px 48px 64px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'center' }}>
        <div>
          <SectionBadge light>Pentru diaspora</SectionBadge>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:44, fontWeight:800, color:B.wh, lineHeight:1.08, letterSpacing:'-.03em', margin:'0 0 18px' }}>
            Ești în <span style={{ color:B.a }}>străinătate</span>?<br/>Începe cu o consultație online.
          </h1>
          <p style={{ fontSize:16, lineHeight:1.7, color:'rgba(255,255,255,.65)', maxWidth:440, margin:'0 0 28px' }}>
            Discutăm la distanță, îți oferim un plan clar și personalizat, iar tu vii pregătit la prima vizită. Fără surprize, fără pierdere de timp.
          </p>
          <div style={{ display:'flex', gap:14 }}>
            <Btn pink style={{ fontSize:15 }}>Programează consultație →</Btn>
            <Btn outline style={{ borderColor:'rgba(255,255,255,.3)', color:B.wh }}>Cum funcționează ↓</Btn>
          </div>
        </div>
        {/* Right — Globe with floating flags */}
        <div style={{ display:'flex', justifyContent:'center', alignItems:'center', position:'relative', height:400 }}>
          {/* Orbiting rings */}
          {[140,190,240].map((r,ri) => (
            <div key={ri} style={{ position:'absolute', width:r*2, height:r*2, borderRadius:'50%', border:'1px solid rgba(255,255,255,.06)' }}/>
          ))}
          {/* Floating flags in orbits */}
          {FLAGS.map((flag, i) => {
            const orbit = [140,190,240][i % 3]
            const duration = 20 + (i % 5) * 8
            const delay = -(i * 1.2)
            return (
              <div key={i} style={{
                position:'absolute', fontSize: i < 10 ? 22 : 16,
                animation:`orbit ${duration}s ${delay}s linear infinite`,
                ['--r' as string]: `${orbit}px`,
                opacity: i < 15 ? .8 : .4,
              }}>{flag}</div>
            )
          })}
          {/* Center — stat bubble */}
          <div style={{
            width:160, height:160, borderRadius:'50%', zIndex:2,
            background:`radial-gradient(circle, ${B.a}33 0%, ${B.a}11 60%, transparent 70%)`,
            display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column',
            border:`2px solid ${B.a}44`, animation:'pulse 3s ease-in-out infinite',
          }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:32, fontWeight:800, color:B.a, lineHeight:1 }}>455K+</div>
            <div style={{ fontSize:11, color:'rgba(255,255,255,.6)', marginTop:4, textAlign:'center', lineHeight:1.3 }}>moldoveni<br/>în diasporă</div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Process ──────────────────────────── */
const STEPS = [
  { num:'01', title:'Trimite tomografia', desc:'Încarcă radiografia panoramică sau CBCT prin formularul nostru securizat. Dacă nu ai — te ghidăm unde poți face.' },
  { num:'02', title:'Consultație video', desc:'Medicul analizează imaginile și discutați 1:1 prin video call. Primești explicații clare despre situația ta.' },
  { num:'03', title:'Plan de tratament', desc:'Primești un plan personalizat cu opțiuni, etape, durată și costuri. Totul transparent, fără surprize.' },
  { num:'04', title:'Vii pregătit', desc:'Când ajungi acasă, totul este deja planificat. Economisești timp și începi tratamentul imediat.' },
]

function Process() {
  return (
    <section style={{ background:B.wh, padding:'72px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <SectionBadge>Cum funcționează</SectionBadge>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:34, fontWeight:800, color:B.nv, letterSpacing:'-.03em', margin:'0 0 36px' }}>
          4 pași simpli către <span style={{ color:B.p }}>tratamentul tău</span>
        </h2>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'start' }}>
          {/* Left — Video */}
          <div style={{
            borderRadius:18, overflow:'hidden', position:'relative', height:420,
            background:`linear-gradient(160deg, ${B.nv}, #0f2e24)`, cursor:'pointer',
          }}>
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ width:72, height:72, borderRadius:'50%', background:B.a, display:'flex', alignItems:'center', justifyContent:'center', transition:'transform .2s' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill={B.wh} stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            </div>
            <div style={{ position:'absolute', bottom:20, left:20, right:20 }}>
              <div style={{ fontSize:14, fontWeight:700, color:B.wh }}>Cum funcționează Consultația Online?</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,.5)', marginTop:4 }}>2:30 min · Explicat de echipa SDT</div>
            </div>
          </div>
          {/* Right — Steps */}
          <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
            {STEPS.map((s,i) => (
              <div key={s.num} style={{
                display:'flex', gap:16, alignItems:'flex-start', padding:'18px 20px',
                background: i===0 ? B.ps : B.wh, borderRadius:14, border:`1px solid ${i===0 ? B.p+'33' : B.bdr}`,
                transition:'all .2s',
              }}>
                <div style={{
                  width:40, height:40, borderRadius:10, flexShrink:0,
                  background: i===0 ? `linear-gradient(135deg,${B.p},${B.pm})` : B.pl,
                  display:'flex', alignItems:'center', justifyContent:'center',
                }}>
                  <span style={{ color: i===0 ? B.wh : B.p, fontSize:14, fontWeight:800 }}>{s.num}</span>
                </div>
                <div>
                  <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:700, color:B.nv, margin:'0 0 4px' }}>{s.title}</h3>
                  <p style={{ fontSize:13, lineHeight:1.6, color:B.gr, margin:0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Journey Timeline ────────────────────── */
const JOURNEY = [
  { step:'01', title:'Decizi să acționezi', desc:'Ai o problemă dentară sau vrei un zâmbet nou. Completezi formularul online sau ne scrii pe WhatsApp.', detail:['Formularul durează 2 minute','Nu ai nevoie de tomografie încă','Echipa te contactează în max. 24h'], photo:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop', side:'left' },
  { step:'02', title:'Trimiti documentele', desc:'Încarcă tomografia panoramică (dacă ai) și fotografii ale danturii. Dacă nu ai tomografie — te ghidăm unde poți face una în orașul tău.', detail:['Acceptăm CBCT, OPG, fotografii intra-orale','Upload securizat pe platforma noastră','Dacă nu ai — te direcționăm la un centru din orașul tău'], photo:'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop', side:'right' },
  { step:'03', title:'Consultație video 1:1', desc:'Medicul specialist analizează documentele și discutați pe video call. Primești explicații clare, vizuale, despre situația ta.', detail:['Durată: 20-30 minute','Folosim screen sharing pentru a-ți arăta imaginile','Poți pune orice întrebare — fără grabă'], photo:'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=300&fit=crop', side:'left' },
  { step:'04', title:'Primești planul complet', desc:'În 48h primești un document detaliat: diagnostic, opțiuni de tratament, etape, durată estimată și costuri exacte.', detail:['Plan PDF profesional cu toate detaliile','2-3 opțiuni de tratament cu costuri','Informații despre Rate 0% dacă e cazul','Fără costuri ascunse — prețul final = prețul din plan'], photo:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop', side:'right' },
  { step:'05', title:'Programare și pregătire', desc:'Alegi data vizitei. Echipa pregătește totul: materiale, laborator, programări consecutive — pentru a economisi maximum de timp.', detail:['Programare în funcție de zborul tău','Tratamente consecutive — minim vizite','Coordonator personal dedicat'], photo:'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop', side:'left' },
  { step:'06', title:'Vii și zâmbești', desc:'Când ajungi la clinică, totul este pregătit. Începi tratamentul imediat, fără așteptare, fără surprize. Pleci cu un zâmbet nou.', detail:['Transfer aeroport disponibil','Totul pregătit — start imediat','Rezultat conform planului aprobat','Suport post-tratament la distanță'], photo:'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=500&h=300&fit=crop', side:'right' },
]

function JourneyTimeline() {
  return (
    <section style={{ background:B.ps, padding:'80px 48px', position:'relative' }}>
      <div style={{ maxWidth:1000, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <SectionBadge>Călătoria ta</SectionBadge>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:36, fontWeight:800, color:B.nv, letterSpacing:'-.03em', margin:'0 0 12px' }}>
            Ce se întâmplă <span style={{ color:B.p }}>pas cu pas</span>?
          </h2>
          <p style={{ fontSize:15, color:B.gr, maxWidth:500, margin:'0 auto' }}>
            De la decizie la zâmbet — fiecare etapă explicată clar, cu imagini și detalii.
          </p>
        </div>

        {/* Timeline line */}
        <div style={{ position:'relative' }}>
          {/* Vertical line */}
          <div style={{ position:'absolute', left:'50%', top:0, bottom:0, width:2, background:B.bdr, transform:'translateX(-50%)' }}/>

          {JOURNEY.map((j, i) => (
            <div key={j.step} style={{
              display:'grid', gridTemplateColumns: j.side==='left' ? '1fr 60px 1fr' : '1fr 60px 1fr',
              gap:0, marginBottom: i < JOURNEY.length-1 ? 48 : 0, alignItems:'center',
            }}>
              {/* Left content or empty */}
              {j.side === 'left' ? (
                <div style={{ paddingRight:32 }}>
                  <div style={{ background:B.wh, borderRadius:16, overflow:'hidden', border:`1px solid ${B.bdr}`, boxShadow:`0 4px 20px ${B.bdr}` }}>
                    <div style={{ height:180, overflow:'hidden' }}>
                      <img src={j.photo} alt={j.title} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                    </div>
                    <div style={{ padding:'20px' }}>
                      <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:700, color:B.nv, margin:'0 0 6px' }}>{j.title}</h3>
                      <p style={{ fontSize:13, lineHeight:1.6, color:B.gr, margin:'0 0 12px' }}>{j.desc}</p>
                      <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                        {j.detail.map(d => (
                          <div key={d} style={{ display:'flex', alignItems:'flex-start', gap:6 }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={B.p} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop:2, flexShrink:0 }}><polyline points="20 6 9 17 4 12"/></svg>
                            <span style={{ fontSize:12, color:B.nv, fontWeight:500 }}>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : <div/>}

              {/* Center dot */}
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', zIndex:2 }}>
                <div style={{
                  width:44, height:44, borderRadius:'50%',
                  background: i === JOURNEY.length-1 ? B.a : `linear-gradient(135deg,${B.p},${B.pm})`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  border:`3px solid ${B.wh}`, boxShadow:`0 2px 12px ${B.bdr}`,
                }}>
                  <span style={{ fontSize:12, fontWeight:800, color:B.wh }}>{j.step}</span>
                </div>
              </div>

              {/* Right content or empty */}
              {j.side === 'right' ? (
                <div style={{ paddingLeft:32 }}>
                  <div style={{ background:B.wh, borderRadius:16, overflow:'hidden', border:`1px solid ${B.bdr}`, boxShadow:`0 4px 20px ${B.bdr}` }}>
                    <div style={{ height:180, overflow:'hidden' }}>
                      <img src={j.photo} alt={j.title} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                    </div>
                    <div style={{ padding:'20px' }}>
                      <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:700, color:B.nv, margin:'0 0 6px' }}>{j.title}</h3>
                      <p style={{ fontSize:13, lineHeight:1.6, color:B.gr, margin:'0 0 12px' }}>{j.desc}</p>
                      <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                        {j.detail.map(d => (
                          <div key={d} style={{ display:'flex', alignItems:'flex-start', gap:6 }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={B.p} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop:2, flexShrink:0 }}><polyline points="20 6 9 17 4 12"/></svg>
                            <span style={{ fontSize:12, color:B.nv, fontWeight:500 }}>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : <div/>}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign:'center', marginTop:56 }}>
          <Btn pink style={{ fontSize:16, padding:'16px 40px' }}>Începe călătoria ta →</Btn>
        </div>
      </div>
    </section>
  )
}

/* ─── Benefits ─────────────────────────── */
function Benefits() {
  const items = [
    { icon:'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', title:'De acasă', desc:'Consultație video de oriunde din lume. Nu contează fusul orar.' },
    { icon:'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title:'Rapid', desc:'Consultația durează 20-30 min. Primești planul în 48h.' },
    { icon:'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', title:'Plan complet', desc:'Diagnostic, opțiuni, costuri, etape — totul înainte de a ajunge la clinică.' },
    { icon:'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z', title:'Prețuri clare', desc:'Știi exact cât costă înainte de a lua orice decizie.' },
  ]
  return (
    <section style={{ background:B.ps, padding:'72px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:48 }}>
          <SectionBadge>De ce online</SectionBadge>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:36, fontWeight:800, color:B.nv, letterSpacing:'-.03em', margin:0 }}>
            Avantajele consultației <span style={{ color:B.p }}>online</span>
          </h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
          {items.map(b => (
            <div key={b.title} style={{
              background:B.wh, borderRadius:14, padding:'28px 24px', border:`1px solid ${B.bdr}`,
              transition:'all .25s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow=`0 8px 24px ${B.bdr}` }}
              onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}
            >
              <div style={{ width:44, height:44, borderRadius:12, background:B.pl, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={B.p} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={b.icon}/></svg>
              </div>
              <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:700, color:B.nv, margin:'0 0 6px' }}>{b.title}</h3>
              <p style={{ fontSize:13, lineHeight:1.6, color:B.gr, margin:0 }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CTA Strip ──────────────────────────── */
function CtaStrip() {
  return (
    <section style={{ background:`linear-gradient(135deg,${B.p},${B.pm})`, padding:'56px 48px' }}>
      <div style={{ maxWidth:900, margin:'0 auto', textAlign:'center' }}>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:32, fontWeight:800, color:B.wh, margin:'0 0 12px' }}>
          Oriunde ai fi. În fiecare țară. Alege-te pe tine.
        </h2>
        <p style={{ fontSize:15, color:'rgba(255,255,255,.7)', margin:'0 0 28px', maxWidth:480, marginLeft:'auto', marginRight:'auto' }}>
          Sănătatea nu are sezon. Programează o consultație online și pregătește-ți vizita acasă.
        </p>
        <Btn pink style={{ fontSize:16, padding:'16px 36px' }}>Programează consultație online →</Btn>
      </div>
    </section>
  )
}

/* ─── Diaspora Testimonials ──────────────── */
function DiasporaTestimonials() {
  const testimonials = [
    { text:'Am planificat totul din Berlin. Când am ajuns la Chișinău, am început tratamentul imediat. Zero pierdere de timp.', author:'Andrei K.', country:'Germania 🇩🇪', service:'Implant Dentar', rating:5 },
    { text:'Consultația video a fost exactă și profesionistă. Am primit planul în 24h cu toate costurile clare.', author:'Elena M.', country:'UK 🇬🇧', service:'Coroane Dentare', rating:5 },
    { text:'Din Paris am trimis tomografia, am discutat pe video, iar când am venit acasă totul era pregătit.', author:'Ion C.', country:'Franța 🇫🇷', service:'All-On-4', rating:5 },
    { text:'Cel mai bun serviciu pe care l-am întâlnit. Comunicare excelentă, totul transparent.', author:'Maria D.', country:'SUA 🇺🇸', service:'Fațete Dentare', rating:5 },
    { text:'Am economisit 2 săptămâni de concediu. Totul a fost planificat înainte să ajung.', author:'Cristina R.', country:'Spania 🇪🇸', service:'Digital Check-Up', rating:5 },
  ]
  return (
    <section style={{ background:B.ps, padding:'72px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:32 }}>
          <div>
            <SectionBadge>Feedback din diasporă</SectionBadge>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:32, fontWeight:800, color:B.nv, margin:0 }}>
              Pacienți din <span style={{ color:B.p }}>toată lumea</span>
            </h2>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800, color:B.p }}>4.9</div>
            <div style={{ color:'#fbb040', fontSize:12 }}>★★★★★</div>
            <div style={{ fontSize:11, color:B.gr }}>Google</div>
          </div>
        </div>
        <div style={{ display:'flex', gap:16, overflowX:'auto', paddingBottom:8 }}>
          {testimonials.map((t,i) => (
            <div key={i} style={{ background:B.wh, borderRadius:16, padding:'24px', minWidth:300, flexShrink:0, border:`1px solid ${B.bdr}`, borderTop:`3px solid ${B.p}` }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
                <span style={{ fontSize:11, fontWeight:600, color:B.p, background:B.pl, padding:'3px 10px', borderRadius:100 }}>{t.country}</span>
                <div style={{ color:'#fbb040', fontSize:11 }}>{'★'.repeat(t.rating)}</div>
              </div>
              <p style={{ fontSize:14, lineHeight:1.65, color:B.nv, margin:'0 0 14px', fontStyle:'italic' }}>&ldquo;{t.text}&rdquo;</p>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div style={{ fontSize:13, fontWeight:700, color:B.nv }}>— {t.author}</div>
                <span style={{ fontSize:10, color:B.gr }}>{t.service}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Video Reels ────────────────────────── */
function VideoReels() {
  const videos = [
    { name:'Andrei din Berlin', service:'Implant Dentar', flag:'🇩🇪' },
    { name:'Elena din Londra', service:'Coroane Dentare', flag:'🇬🇧' },
    { name:'Ion din Paris', service:'All-On-4', flag:'🇫🇷' },
    { name:'Maria din New York', service:'Fațete', flag:'🇺🇸' },
    { name:'Cristina din Madrid', service:'Digital Check-Up', flag:'🇪🇸' },
  ]
  return (
    <section style={{ background:B.wh, padding:'72px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <SectionBadge>Video testimoniale</SectionBadge>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:32, fontWeight:800, color:B.nv, margin:'0 0 28px' }}>
          Povești <span style={{ color:B.a }}>reale</span> din diasporă
        </h2>
        <div style={{ display:'flex', gap:14, overflowX:'auto', paddingBottom:8 }}>
          {videos.map((v,i) => (
            <div key={i} style={{
              width:200, height:350, borderRadius:18, flexShrink:0, cursor:'pointer',
              background:`linear-gradient(160deg, ${B.nv}, #0f2e24)`,
              position:'relative', overflow:'hidden', transition:'transform .2s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform='translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform=''}
            >
              <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div style={{ width:52, height:52, borderRadius:'50%', background:B.a, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill={B.wh} stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
              </div>
              <div style={{ position:'absolute', top:12, left:12 }}>
                <span style={{ fontSize:24 }}>{v.flag}</span>
              </div>
              <div style={{ position:'absolute', top:12, right:12 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
              </div>
              <div style={{ position:'absolute', bottom:16, left:14, right:14 }}>
                <div style={{ fontSize:13, fontWeight:700, color:B.wh }}>{v.name}</div>
                <div style={{ fontSize:10, color:'rgba(255,255,255,.5)', marginTop:2 }}>{v.service}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Why choose section ─────────────────── */
function WhyChoose() {
  const reasons = [
    { num:'01', title:'Zero timp pierdut', desc:'Planifici totul de acasă. Când ajungi — tratamentul începe imediat.' },
    { num:'02', title:'Prețuri transparente', desc:'Știi exact cât costă înainte de a lua avionul. Fără costuri ascunse.' },
    { num:'03', title:'Calitate europeană', desc:'Aceleași tehnologii 3D și materiale ca în clinicile din Germania sau Elveția.' },
    { num:'04', title:'Echipă dedicată', desc:'Un coordonator personal care te ghidează din momentul consultației până la finalizare.' },
    { num:'05', title:'Rate 0%', desc:'Planuri de finanțare flexibile pentru tratamente complexe. Fără dobândă.' },
    { num:'06', title:'Garanție pe viață', desc:'Pe implanturi și structuri protetice. Revii oricând pentru control gratuit.' },
  ]
  return (
    <section style={{ background:`linear-gradient(160deg, ${B.nv}, #0f2e24)`, padding:'72px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <SectionBadge light>De ce Smile Dent Team</SectionBadge>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:32, fontWeight:800, color:B.wh, margin:'0 0 36px' }}>
          6 motive să alegi <span style={{ color:B.a }}>SDT</span>
        </h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
          {reasons.map(r => (
            <div key={r.num} style={{ background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.08)', borderRadius:14, padding:'24px' }}>
              <span style={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800, color:'rgba(255,255,255,.1)' }}>{r.num}</span>
              <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:700, color:B.wh, margin:'6px 0 6px' }}>{r.title}</h3>
              <p style={{ fontSize:13, lineHeight:1.6, color:'rgba(255,255,255,.55)', margin:0 }}>{r.desc}</p>
            </div>
          ))}
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
    <section style={{ background:B.wh, padding:'72px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:56, alignItems:'center' }}>
        <div>
          <SectionBadge>Programare online</SectionBadge>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:32, fontWeight:800, color:B.nv, margin:'0 0 14px', lineHeight:1.1 }}>
            Completează formularul<br/><span style={{ color:B.a }}>și te contactăm</span>
          </h2>
          <p style={{ fontSize:14, lineHeight:1.7, color:B.gr, margin:'0 0 24px', maxWidth:400 }}>
            Te sunăm în max. 24h pentru a stabili data și ora consultației video. Ai nevoie doar de o radiografie panoramică.
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {['Consultație video 1:1 cu specialistul','Analiză completă a radiografiei','Plan de tratament detaliat cu costuri','Programare prioritară la sosire'].map(t => (
              <div key={t} style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:20, height:20, borderRadius:'50%', background:B.pl, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={B.p} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span style={{ fontSize:13, color:B.nv, fontWeight:500 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background:B.ps, borderRadius:16, padding:'32px 28px', border:`1px solid ${B.bdr}`, boxShadow:`0 8px 32px ${B.bdr}` }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
            <input placeholder="Prenume" style={inp}/>
            <input placeholder="Nume" style={inp}/>
          </div>
          <input placeholder="Telefon *" type="tel" style={{ ...inp, marginBottom:12 }}/>
          <input placeholder="Email *" type="email" style={{ ...inp, marginBottom:12 }}/>
          <select defaultValue="" style={{ ...inp, marginBottom:12, color:B.gr }}>
            <option value="" disabled>Țara în care locuiești</option>
            {DIASPORA.map(d => <option key={d.country}>{d.flag} {d.country}</option>)}
            <option>Altă țară</option>
          </select>
          <select defaultValue="" style={{ ...inp, marginBottom:12, color:B.gr }}>
            <option value="" disabled>Serviciul dorit</option>
            {SERVICES.map(s => <option key={s.slug}>{s.name}</option>)}
          </select>
          <textarea placeholder="Descrie pe scurt problemele tale dentare" rows={3} style={{ ...inp, marginBottom:16, resize:'vertical' }}/>
          <div style={{ padding:'14px 16px', background:B.pl, borderRadius:8, border:`1px dashed ${B.p}`, textAlign:'center', marginBottom:16, cursor:'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={B.p} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom:4}}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/></svg>
            <div style={{ fontSize:12, fontWeight:600, color:B.p }}>Încarcă radiografia panoramică</div>
            <div style={{ fontSize:10, color:B.gr }}>JPG, PNG sau DICOM — max 10MB</div>
          </div>
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
          {SERVICES.slice(0,7).map(s => (
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
          {LOCATIONS.slice(0,2).map(l => (
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
            <span key={l} style={{ background:'rgba(255,255,255,.08)', color:'rgba(255,255,255,.5)', padding:'3px 8px', borderRadius:40, fontSize:10, fontWeight:700, cursor:'pointer' }}>{l}</span>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ─── Main Export ─────────────────────────── */
export function ConsultatieOnlinePage() {
  return (
    <>
      <style>{ANIM}</style>
      <Nav/>
      <Hero/>
      <Process/>
      <JourneyTimeline/>
      <Benefits/>
      <DiasporaTestimonials/>
      <VideoReels/>
      <WhyChoose/>
      <CtaStrip/>
      <AppointmentForm/>
      <Footer/>
    </>
  )
}

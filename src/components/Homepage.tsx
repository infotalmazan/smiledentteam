'use client'

import { useState, useEffect } from 'react'
import { Logo } from './Logo'
import { BRAND as B, STATS, SERVICES, LOCATIONS, CAMPAIGN_2026, AMBASSADORS } from '@/lib/brand'

/* ─── helpers ─────────────────────────────── */
const HERO_SLIDES = [
  '/images/team/team-photo.jpg',
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&h=1000&fit=crop',
]

function HeroSlideshow({ style }: { style?: React.CSSProperties }) {
  const [idx, setIdx] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  useEffect(() => {
    if (fullscreen) return
    const timer = setInterval(() => setIdx(p => (p + 1) % HERO_SLIDES.length), 3000)
    return () => clearInterval(timer)
  }, [fullscreen])
  return (
    <>
      <div style={{ width:'100%', height:'100%', position:'relative', overflow:'hidden', ...style }}>
        {HERO_SLIDES.map((src, i) => (
          <img key={src} src={src} alt={`SDT Team ${i+1}`}
            style={{
              position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover',
              objectPosition:'center 35%',
              opacity: i === idx ? 1 : 0,
              transition:'opacity 1s ease-in-out',
            }}
          />
        ))}
        {/* Dots */}
        <div style={{ position:'absolute', bottom:12, left:'50%', transform:'translateX(-50%)', display:'flex', gap:6, zIndex:2 }}>
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} style={{
              width: i===idx ? 20 : 7, height:7, borderRadius:100, border:'none', cursor:'pointer',
              background: i===idx ? B.wh : 'rgba(255,255,255,.4)', transition:'all .3s',
            }}/>
          ))}
        </div>
        {/* Preview button */}
        <button onClick={() => setFullscreen(true)} style={{
          position:'absolute', bottom:12, right:12, zIndex:2,
          background:'rgba(0,0,0,.35)', backdropFilter:'blur(4px)',
          border:'1px solid rgba(255,255,255,.2)', borderRadius:6,
          padding:'4px 10px', cursor:'pointer', display:'flex', alignItems:'center', gap:4,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={B.wh} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
          <span style={{ fontSize:10, fontWeight:600, color:B.wh }}>Preview</span>
        </button>
      </div>
      {/* Fullscreen overlay */}
      {fullscreen && (
        <div onClick={() => setFullscreen(false)} style={{
          position:'fixed', inset:0, zIndex:9999, background:'rgba(0,0,0,.92)',
          display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer',
        }}>
          <button onClick={e => { e.stopPropagation(); setIdx(p => (p - 1 + HERO_SLIDES.length) % HERO_SLIDES.length) }} style={{
            position:'absolute', left:24, top:'50%', transform:'translateY(-50%)',
            width:44, height:44, borderRadius:'50%', background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.2)',
            cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={B.wh} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <img src={HERO_SLIDES[idx]} alt="" style={{ maxWidth:'85vw', maxHeight:'85vh', objectFit:'contain', borderRadius:12 }}/>
          <button onClick={e => { e.stopPropagation(); setIdx(p => (p + 1) % HERO_SLIDES.length) }} style={{
            position:'absolute', right:24, top:'50%', transform:'translateY(-50%)',
            width:44, height:44, borderRadius:'50%', background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.2)',
            cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={B.wh} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          {/* Close */}
          <button onClick={() => setFullscreen(false)} style={{
            position:'absolute', top:24, right:24, width:40, height:40, borderRadius:'50%',
            background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.2)',
            cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={B.wh} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          {/* Dots in fullscreen */}
          <div style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)', display:'flex', gap:8 }}>
            {HERO_SLIDES.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setIdx(i) }} style={{
                width: i===idx ? 28 : 10, height:10, borderRadius:100, border:'none', cursor:'pointer',
                background: i===idx ? B.a : 'rgba(255,255,255,.3)', transition:'all .3s',
              }}/>
            ))}
          </div>
          <div style={{ position:'absolute', bottom:32, right:32, fontSize:12, color:'rgba(255,255,255,.4)' }}>
            {idx + 1} / {HERO_SLIDES.length}
          </div>
        </div>
      )}
    </>
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

function Btn({ children, onClick, style, outline, pink }: {
  children: React.ReactNode; onClick?: ()=>void; style?: React.CSSProperties; outline?: boolean; pink?: boolean
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
  const pinkStyle: React.CSSProperties = { background:B.a, color:B.wh, border:`1.5px solid ${B.a}` }
  const out: React.CSSProperties = { background:'transparent', color:B.nv, border:`1.5px solid rgba(10,107,92,.22)` }
  return (
    <button style={{ ...base, ...(outline ? out : pink ? pinkStyle : filled), ...style }} onClick={onClick}
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
    <>
    <nav style={{
      display:'flex', justifyContent:'space-between', alignItems:'center',
      padding:'0 52px', height:70, background:'rgba(255,255,255,.97)',
      borderTop:`3px solid ${B.a}`,
      boxShadow:sc?'0 2px 20px rgba(10,107,92,.1)':'0 1px 0 rgba(10,107,92,.1)',
      position:'sticky', top:0, zIndex:200, backdropFilter:'blur(8px)',
    }}>
      <a href="/" style={{ textDecoration:'none' }}><Logo height={38}/></a>
      <div style={{ display:'flex', gap:28 }}>
        {[
          ['Servicii','/servicii'],
          ['Digital Check-Up','/digital-checkup'],
          ['Consultație Online','/consultatie-online'],
          ['Echipa','/echipa'],
          ['Recenzii','#recenzii'],
        ].map(([label, href]) => (
          <a key={label} href={href} style={{
            fontSize:14, fontWeight:500,
            color:'#3a5a50',
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
          }}>Cabinetul meu</button>
        </a>
        <Btn pink style={{ fontSize:13, padding:'9px 22px' }}>Programează-te</Btn>
      </div>
    </nav>
    </>
  )
}

/* ─── Hero ────────────────────────────────── */
const SVC_LIST = SERVICES.map(s => s.name)

function Hero() {
  // navbar only (~64px) above hero
  return (
    <section style={{ background:B.wh, height:'calc(100vh - 64px)', display:'flex', flexDirection:'column' }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1px 1.35fr 1px 0.85fr', flex:1, minHeight:0 }}>

        {/* COL 1 — Headline */}
        <div style={{ padding:'36px 36px 24px 48px', display:'flex', flexDirection:'column', justifyContent:'flex-start' }}>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:42, fontWeight:800, lineHeight:1.02, letterSpacing:'-.04em', margin:'0 0 20px', color:B.a }}>
            ALEGE-TE<br/>PE TINE.
          </h1>
          <div style={{ width:40, height:3, background:B.p, borderRadius:2, marginBottom:18, transformOrigin:'left', animation:'barGrow .6s .2s ease both' }}/>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:700, color:B.nv, letterSpacing:'-.02em', margin:'0 0 14px', lineHeight:1.2 }}>
            Începe cu un Digital Check-Up.
          </h2>
          <p style={{ fontSize:13, lineHeight:1.65, color:'#4a6a58', maxWidth:320, margin:'0 0 28px' }}>
            600+ specialiști, tehnologii 3D și 15 ani de experiență — totul pentru un singur lucru: să știi exact ce ai nevoie, înainte să decizi orice.
          </p>
          <button style={{
            justifyContent:'center', padding:'12px 24px', fontSize:13, fontWeight:700,
            background:B.a, color:B.wh, border:'none', borderRadius:8, cursor:'pointer',
            fontFamily:"'DM Sans',sans-serif", width:'100%', textAlign:'center',
          }}>Descoperă Digital Check-Up →</button>

          {/* Trust badges */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:28 }}>
            {[
              ['M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z','Fără durere'],
              ['M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1 8.618 3.04A12.02 12.02 0 0 1 23 12c0 3.074-1.155 5.877-3.054 8.003l.672.672A11.955 11.955 0 0 0 12 24a11.955 11.955 0 0 0-8.618-3.325l.672-.672A12.02 12.02 0 0 1 1 12c0-3.074 1.155-5.877 3.054-8.003','Garanție'],
              ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8','Plan digital'],
              ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z','Tehnologie 3D'],
            ].map(([path,label]) => (
              <div key={label} style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 0' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={B.p} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={path}/></svg>
                <span style={{ fontSize:11, fontWeight:600, color:B.gr }}>{label}</span>
              </div>
            ))}
          </div>

          {/* Mini appointment */}
          <div style={{ marginTop:24, padding:'14px 16px', background:B.ps, borderRadius:8, border:`1px solid ${B.bdr}` }}>
            <div style={{ fontSize:11, fontWeight:700, color:B.p, marginBottom:8 }}>Programare rapidă</div>
            <input type="tel" placeholder="+373 __ ___ ___" style={{
              width:'100%', padding:'8px 12px', border:`1px solid ${B.bdr}`, borderRadius:6,
              fontSize:13, fontFamily:"'DM Sans',sans-serif", background:B.wh, outline:'none', boxSizing:'border-box',
            }}/>
            <button style={{
              width:'100%', marginTop:8, padding:'9px 16px', background:'transparent', color:B.p, border:`1.5px solid ${B.p}`,
              borderRadius:6, fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:"'DM Sans',sans-serif",
            }}>Programează-te →</button>
          </div>
        </div>

        <div style={{ background:B.bdr }}/>

        {/* COL 2 — Photo */}
        <div style={{ position:'relative', overflow:'hidden' }}>
          <HeroSlideshow/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top,rgba(10,30,24,.18) 0%,transparent 50%)', pointerEvents:'none' }}/>
        </div>

        <div style={{ background:B.bdr }}/>

        {/* COL 3 — Services list */}
        <div style={{ padding:'36px 24px 24px', display:'flex', flexDirection:'column', justifyContent:'flex-start' }}>
          <div style={{ fontSize:10, fontWeight:700, color:B.p, letterSpacing:'.22em', textTransform:'uppercase', marginBottom:10 }}>Servicii</div>
          {SVC_LIST.map((s, i) => (
            <div key={s} style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
              padding:'10px 0', borderBottom:`1px solid ${B.bdr}`, cursor:'pointer', transition:'color .15s', color:B.nv }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = B.p }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = B.nv }}
            >
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ fontSize:10, color:'rgba(10,107,92,.3)', fontWeight:700 }}>{String(i+1).padStart(2,'0')}</span>
                <span style={{ fontSize:13, fontWeight:600 }}>{s}</span>
              </div>
              <span style={{ fontSize:15, color:B.gr }}>→</span>
            </div>
          ))}
          {/* Locații */}
          <div style={{ marginTop:16, paddingTop:14, borderTop:`1px solid ${B.bdr}` }}>
            <div style={{ fontSize:10, fontWeight:700, color:B.p, letterSpacing:'.15em', textTransform:'uppercase', marginBottom:6 }}>Locații</div>
            {[['Chișinău, Centru','str. Ismail 88'],['Chișinău, Râșcani','Bd. Moscova 17/A'],['Chișinău, Botanica','Bd. Dacia 44']].map(([city,addr]) => (
              <div key={city} style={{ display:'flex', alignItems:'flex-start', gap:6, padding:'3px 0' }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={B.p} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginTop:2,flexShrink:0}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <div>
                  <div style={{ fontSize:11, fontWeight:600, color:B.nv, lineHeight:1.2 }}>{city}</div>
                  <div style={{ fontSize:10, color:B.gr, lineHeight:1.2 }}>{addr}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Program */}
          <div style={{ marginTop:12, display:'flex', alignItems:'center', gap:6 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={B.p} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span style={{ fontSize:10, color:B.gr }}>Lun–Vin 09–19:00 · Sâm 09–14:00</span>
          </div>

          {/* Google Reviews */}
          <div style={{ marginTop:14, background:B.pl, padding:'10px 14px', borderLeft:`3px solid ${B.p}`, borderRadius:'0 8px 8px 0' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ color:'#fbb040', fontSize:12 }}>★★★★★</div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:800, color:B.p }}>4.9</div>
            </div>
            <div style={{ fontSize:10, color:B.gr, marginTop:2 }}>1 200+ recenzii Google verificate</div>
          </div>
        </div>
      </div>

      {/* Stats strip — full width, pinned to bottom */}
      <div style={{ background:`linear-gradient(135deg,${B.p},${B.pm})`, padding:'22px 52px', display:'flex', justifyContent:'center', gap:44, alignItems:'center', flexShrink:0 }}>
        {[[STATS.years,'ani de excelență'],[STATS.team,'specialiști'],[STATS.patients,'pacienți tratați'],['3','filiale']].map(([n,l]) => (
          <div key={String(l)} style={{ display:'flex', alignItems:'baseline', gap:8 }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800, color:B.wh, lineHeight:1 }}>{n}</div>
            <div style={{ fontSize:12, color:'rgba(255,255,255,.65)', fontWeight:500 }}>{l}</div>
          </div>
        ))}
        {/* Rate 0% — pink accent */}
        <div style={{ display:'flex', alignItems:'center', gap:8, background:B.a, padding:'8px 20px', borderRadius:100, marginLeft:8 }}>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:24, fontWeight:800, color:B.wh, lineHeight:1 }}>0%</div>
          <div style={{ fontSize:11, color:'rgba(255,255,255,.85)', fontWeight:600, lineHeight:1.2 }}>dobândă<br/>la rate</div>
        </div>
      </div>
    </section>
  )
}

/* ─── Digital Check-Up strip ──────────────── */
function CheckUpStrip() {
  const steps = [
    { icon:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6', label:'Înregistrare' },
    { icon:'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label:'Scanare 3D' },
    { icon:'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', label:'Evaluare' },
    { icon:'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', label:'Plan digital' },
  ]
  return (
    <section style={{ background:`linear-gradient(135deg,${B.p},${B.pm})`, padding:'44px 52px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', top:-60, right:-40, width:200, height:200, borderRadius:'50%', border:'1px solid rgba(255,255,255,.06)' }}/>
      <div style={{ display:'grid', gridTemplateColumns:'1fr auto 1fr', gap:32, alignItems:'center', maxWidth:1200, margin:'0 auto' }}>
        <div>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8,
            background:'rgba(255,255,255,.15)', border:'1px solid rgba(255,255,255,.25)',
            padding:'4px 14px', borderRadius:100, marginBottom:12 }}>
            <span style={{ fontSize:9, fontWeight:800, color:B.wh, letterSpacing:'.2em', textTransform:'uppercase' }}>
              ✦ PRODUS FLAGSHIP {CAMPAIGN_2026.year}
            </span>
          </div>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:30, fontWeight:800, color:B.wh, letterSpacing:'-.03em', lineHeight:1.1, margin:'0 0 8px' }}>
            Digital Check-Up
          </h2>
          <p style={{ fontSize:13, color:'rgba(255,255,255,.65)', maxWidth:340, margin:0, lineHeight:1.6 }}>
            Primul pas către un zâmbet sănătos. Evaluare completă, digitală și fără disconfort.
          </p>
        </div>
        {/* Center — 4 step process with pulse animation */}
        <div style={{ display:'flex', alignItems:'center', gap:0 }}>
          {steps.map((s,i) => (
            <div key={s.label} style={{ display:'flex', alignItems:'center' }}>
              <div style={{ textAlign:'center' }}>
                <div style={{
                  width:48, height:48, borderRadius:'50%', background:'rgba(255,255,255,.1)',
                  border:'1.5px solid rgba(255,255,255,.2)', display:'flex', alignItems:'center', justifyContent:'center',
                  margin:'0 auto 5px', animation:`pulse ${2 + i * 0.5}s ease-in-out infinite`,
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={B.wh} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={s.icon}/></svg>
                </div>
                <div style={{ fontSize:9, fontWeight:600, color:'rgba(255,255,255,.6)', whiteSpace:'nowrap' }}>{s.label}</div>
              </div>
              {i < steps.length - 1 && (
                <div style={{ width:24, height:1, background:'rgba(255,255,255,.15)', margin:'0 4px', marginBottom:16 }}/>
              )}
            </div>
          ))}
        </div>
        {/* Right — CTA */}
        <div style={{ display:'flex', flexDirection:'column', gap:8, alignItems:'flex-end' }}>
          <a href="/digital-checkup" style={{ textDecoration:'none' }}>
            <button style={{
              background:B.wh, color:B.p, border:`2px solid ${B.a}`, padding:'13px 26px', borderRadius:8,
              fontSize:14, fontWeight:800, cursor:'pointer', fontFamily:"'DM Sans',sans-serif", whiteSpace:'nowrap',
              transition:'all .2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background=B.a; e.currentTarget.style.color=B.wh; e.currentTarget.style.transform='translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background=B.wh; e.currentTarget.style.color=B.p; e.currentTarget.style.transform='' }}
            >Programează Digital Check-Up →</button>
          </a>
          <span style={{ fontSize:10, color:'rgba(255,255,255,.4)' }}>Durată ~30 min</span>
        </div>
      </div>
    </section>
  )
}

/* ─── Services ────────────────────────────── */
const SVC_DATA: { photo:string; desc:string }[] = [
  { photo:'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=260&fit=crop', desc:'Dinți noi, ficși, fără durere. Planificare 3D completă pentru un rezultat predictibil și natural.' },
  { photo:'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=260&fit=crop', desc:'Zâmbet restaurat cu coroane premium. Materiale de ultimă generație, garanție pe viață.' },
  { photo:'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=260&fit=crop', desc:'Arcadă completă într-o zi. Alternativa modernă la proteze — dinți ficși pe implanturi.' },
  { photo:'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=400&h=260&fit=crop', desc:'Zâmbetul pe care l-ai visat. Fațete ceramice personalizate cu Digital Smile Design.' },
  { photo:'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=260&fit=crop', desc:'Dinți drepți, discret și rapid. Aliniere invizibilă pentru copii și adulți.' },
  { photo:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=260&fit=crop', desc:'Primul pas către un zâmbet sănătos. Evaluare completă, digitală, fără disconfort.' },
  { photo:'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&h=260&fit=crop', desc:'Prevenție fără durere. Igienizare profesională și detecție timpurie cu scanner digital.' },
  { photo:'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=260&fit=crop', desc:'Intervenții precise cu ghidaj 3D. Extracții, augmentări și chirurgie ghidată digital.' },
  { photo:'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=260&fit=crop', desc:'Consultație video de oriunde din lume. Plan personalizat înainte de a ajunge la clinică.' },
]

function Services() {
  return (
    <section id="servicii" style={{ background:B.cr, padding:'40px 52px 36px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:16 }}>
        <div style={{ maxWidth:600 }}>
          <Badge>Servicii complete</Badge>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:800, color:B.nv, letterSpacing:'-.03em', margin:'0 0 8px', lineHeight:1.1 }}>
            Tot ce ai nevoie, într-un singur loc
          </h2>
          <p style={{ fontSize:13, color:B.gr, lineHeight:1.5, margin:0 }}>
            De la prevenție la reabilitare completă — 9 specialități stomatologice cu tehnologii 3D de ultimă generație.
          </p>
        </div>
        <a href="/servicii" style={{ fontSize:13, fontWeight:700, color:B.p, textDecoration:'none', flexShrink:0 }}>Toate serviciile →</a>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
        {SERVICES.map((s, i) => (
          <a key={s.slug} href="/servicii" style={{ textDecoration:'none' }}>
            <div style={{
              background:B.wh, border:`1px solid ${B.bdr}`, borderRadius:12, cursor:'pointer',
              overflow:'hidden', transition:'transform .2s,box-shadow .2s,border-color .2s',
            }}
            onMouseEnter={e => { const el=e.currentTarget; el.style.transform='translateY(-2px)'; el.style.boxShadow='0 6px 20px rgba(10,107,92,.08)'; el.style.borderColor=B.p }}
            onMouseLeave={e => { const el=e.currentTarget; el.style.transform=''; el.style.boxShadow=''; el.style.borderColor=B.bdr }}
            >
              <div style={{ position:'relative', height:115, overflow:'hidden' }}>
                <img src={SVC_DATA[i]?.photo || SVC_DATA[0].photo} alt={s.name} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(10,30,24,.25) 0%, transparent 50%)' }}/>
              </div>
              <div style={{ padding:'11px 14px 13px' }}>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:700, color:B.nv, lineHeight:1.2, marginBottom:4 }}>{s.name}</div>
                <div style={{ fontSize:11, color:B.gr, lineHeight:1.5 }}>{SVC_DATA[i]?.desc || ''}</div>
              </div>
            </div>
          </a>
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
    <section id="tehnologii" style={{ background:B.wh, padding:'80px 52px' }}>
      <div style={{ display:'flex', gap:36, alignItems:'flex-start' }}>
        <div style={{ width:300, flexShrink:0 }}>
          <SHead eyebrow="Tehnologii 2026" title={<>Viitorul<br/>e digital</>}
            sub="Investim în tehnologii de ultimă generație pentru rezultate perfecte."
          />
          <Btn>Analog → digital →</Btn>
          <div style={{ marginTop:32, padding:'22px', background:`linear-gradient(135deg,${B.pm},${B.p})`, borderRadius:14, color:B.wh }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:44, fontWeight:800, lineHeight:1 }}>6</div>
            <div style={{ fontSize:12, fontWeight:600, opacity:.85, marginTop:4 }}>tehnologii certificate</div>
            <div style={{ fontSize:11, opacity:.6, marginTop:4 }}>utilizate zilnic în clinica noastră</div>
          </div>
        </div>
        <div style={{ flex:1, display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
          {TECHS.map(t => (
            <div key={t.n} style={{ background:B.ps, border:`1px solid ${B.bdr}`, borderRadius:14, padding:'22px', transition:'transform .2s,box-shadow .2s' }}
              onMouseEnter={e => { const el=e.currentTarget; el.style.transform='translateY(-3px)'; el.style.boxShadow='0 8px 28px rgba(10,107,92,.1)' }}
              onMouseLeave={e => { const el=e.currentTarget; el.style.transform='translateY(0)'; el.style.boxShadow='none' }}
            >
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
                <span style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:800, color:'rgba(10,107,92,.18)', lineHeight:1 }}>{t.n}</span>
                <span style={{ background:B.al, color:B.a, fontSize:9, fontWeight:700, padding:'2px 8px', borderRadius:40 }}>{t.tag}</span>
              </div>
              <h4 style={{ fontSize:14, fontWeight:700, color:B.nv, marginBottom:8 }}>{t.name}</h4>
              <p style={{ fontSize:12, lineHeight:1.65, color:'#4a6a58' }}>{t.desc}</p>
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
    { label:'Implanturi + Protetică', before:'Dinți lipsă, carii avansate', after:'Zâmbet complet restaurat', photoBefore:'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=300&h=200&fit=crop', photoAfter:'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=300&h=200&fit=crop' },
    { label:'Digital Smile Design',   before:'Dinți inegali, decolorați',   after:'Fațete ceramice perfecte', photoBefore:'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=300&h=200&fit=crop', photoAfter:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&h=200&fit=crop' },
    { label:'Ortodonție Digitală',    before:'Malocluzii, spații',          after:'Aliniere perfectă 3D', photoBefore:'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=300&h=200&fit=crop', photoAfter:'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=300&h=200&fit=crop' },
    { label:'All-on-4 Complet',       before:'Edentație totală',            after:'Arcadă completă 1 zi', photoBefore:'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=300&h=200&fit=crop', photoAfter:'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=300&h=200&fit=crop' },
  ]
  return (
    <section style={{ background:`linear-gradient(160deg,${B.nv},#0f2e24)`, padding:'72px 52px' }}>
      <SHead center light eyebrow="Rezultate reale" title="Transformări care schimbă vieți"
        sub="Fiecare caz este unic. Iată câteva dintre transformările de care se bucură pacienții noștri."
      />
      <div style={{ display:'flex', gap:16, overflowX:'auto', paddingBottom:8 }}>
        {cases.map(c => (
          <div key={c.label} style={{ background:'rgba(255,255,255,.06)', border:'1px solid rgba(255,255,255,.1)', borderRadius:16, overflow:'hidden', minWidth:260, flexShrink:0, flex:1 }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', height:160, position:'relative' }}>
              <img src={c.photoBefore} alt="Înainte" style={{ width:'100%', height:'100%', objectFit:'cover', filter:'grayscale(.3)' }}/>
              <img src={c.photoAfter} alt="După" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              <div style={{ position:'absolute', left:'50%', top:0, bottom:0, width:2, background:'rgba(255,255,255,.3)' }}/>
              <div style={{ position:'absolute', left:'50%', top:'50%', transform:'translate(-50%,-50%)', width:30, height:30, borderRadius:'50%', background:B.wh, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 8px rgba(0,0,0,.3)' }}>
                <span style={{ fontSize:11, color:B.p, fontWeight:800 }}>↔</span>
              </div>
              <div style={{ position:'absolute', top:8, left:8, fontSize:9, fontWeight:700, color:B.wh, background:'rgba(0,0,0,.4)', padding:'2px 8px', borderRadius:4 }}>ÎNAINTE</div>
              <div style={{ position:'absolute', top:8, right:8, fontSize:9, fontWeight:700, color:B.wh, background:'rgba(0,0,0,.4)', padding:'2px 8px', borderRadius:4 }}>DUPĂ</div>
            </div>
            <div style={{ padding:'16px 18px' }}>
              <div style={{ display:'inline-flex', background:B.a, color:B.wh, fontSize:9, fontWeight:700, padding:'3px 10px', borderRadius:100, letterSpacing:'.08em', textTransform:'uppercase', marginBottom:8 }}>{c.label}</div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,.55)', marginBottom:3 }}>Înainte: <span style={{ color:'rgba(255,255,255,.8)' }}>{c.before}</span></div>
              <div style={{ fontSize:12, color:'rgba(255,255,255,.55)' }}>După: <span style={{ color:B.wh, fontWeight:700 }}>{c.after}</span></div>
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

/* ─── Video Reels Slider ─────────────────── */
function VideoReels() {
  const videos = [
    { name:'Denis P.', service:'Implant Dentar', thumb:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&h=420&fit=crop&crop=face' },
    { name:'Elena M.', service:'Coroane Dentare', thumb:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240&h=420&fit=crop&crop=face' },
    { name:'Alexandru C.', service:'All-On-4', thumb:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=240&h=420&fit=crop&crop=face' },
    { name:'Maria T.', service:'Fațete Dentare', thumb:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=240&h=420&fit=crop&crop=face' },
    { name:'Ion V.', service:'Digital Check-Up', thumb:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=240&h=420&fit=crop&crop=face' },
    { name:'Nadejda B.', service:'Ortodonție', thumb:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=240&h=420&fit=crop&crop=face' },
    { name:'Svetlana L.', service:'Terapie', thumb:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=240&h=420&fit=crop&crop=face' },
  ]
  return (
    <section style={{ background:B.ps, padding:'56px 52px', overflow:'hidden' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:24 }}>
        <div>
          <Badge>Video feedback</Badge>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:800, color:B.nv, letterSpacing:'-.03em', margin:0, lineHeight:1.1 }}>
            Povești <span style={{ color:B.a }}>reale</span>
          </h2>
        </div>
        <div style={{ display:'flex', gap:8 }}>
          <button style={{ width:36, height:36, borderRadius:'50%', border:`1.5px solid ${B.bdr}`, background:B.wh, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={B.nv} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button style={{ width:36, height:36, borderRadius:'50%', border:`1.5px solid ${B.p}`, background:B.p, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={B.wh} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
      <div style={{ display:'flex', gap:14, overflowX:'auto', paddingBottom:8, scrollSnapType:'x mandatory' }}>
        {videos.map((v,i) => (
          <div key={i} style={{
            width:180, height:320, borderRadius:18, flexShrink:0, cursor:'pointer',
            position:'relative', overflow:'hidden', transition:'transform .2s',
            scrollSnapAlign:'start',
          }}
            onMouseEnter={e => e.currentTarget.style.transform='translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform=''}
          >
            <img src={v.thumb} alt={v.name} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
            <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(10,30,24,.7) 0%, transparent 40%)' }}/>
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ width:48, height:48, borderRadius:'50%', background:B.a, display:'flex', alignItems:'center', justifyContent:'center', opacity:.9 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill={B.wh} stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            </div>
            <div style={{ position:'absolute', top:10, right:10, background:'rgba(0,0,0,.4)', borderRadius:4, padding:'2px 6px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={B.wh} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            </div>
            <div style={{ position:'absolute', bottom:14, left:12, right:12 }}>
              <div style={{ fontSize:13, fontWeight:700, color:B.wh }}>{v.name}</div>
              <div style={{ fontSize:10, color:'rgba(255,255,255,.6)', marginTop:2 }}>{v.service}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Ambasadori ─────────────────────────── */
function Ambasadori() {
  return (
    <section id="ambasadori" style={{ background:B.wh, padding:'72px 52px', borderTop:`1px solid ${B.bdr}` }}>
      <div style={{ textAlign:'center', marginBottom:44 }}>
        <Badge>Zâmbete care inspiră</Badge>
        <SHead title={<>Ambasadorii <span style={{ color:B.a }}>Smile Dent Team</span></>}/>
        <p style={{ fontSize:15, color:B.gr, maxWidth:500, margin:'0 auto' }}>
          Personalități din diverse industrii care ne-au ales și ne reprezintă.
        </p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(6, 1fr)', gap:18, maxWidth:1100, margin:'0 auto' }}>
        {AMBASSADORS.map(amb => (
          <div key={amb.slug} style={{
            borderRadius:16, overflow:'hidden', cursor:'pointer', position:'relative',
            border:`1px solid ${B.bdr}`, transition:'all .3s', background:B.wh,
          }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 12px 32px ${B.bdr}` }}
            onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}
          >
            <div style={{ position:'relative', paddingTop:'110%', overflow:'hidden' }}>
              <img src={amb.photo} alt={amb.name} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transition:'transform .4s' }}
                onMouseEnter={e => e.currentTarget.style.transform='scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform=''}
              />
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'60%', background:'linear-gradient(to top, rgba(10,30,24,.9) 0%, transparent 100%)', pointerEvents:'none' }}/>
              <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'14px' }}>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:700, color:B.wh, lineHeight:1.2 }}>{amb.name}</div>
                <div style={{ fontSize:10, color:'rgba(255,255,255,.6)', marginTop:2 }}>{amb.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign:'center', marginTop:28 }}>
        <a href="/ambasadori" style={{ textDecoration:'none' }}>
          <button style={{
            background:'transparent', border:`1.5px solid ${B.p}`, color:B.p,
            padding:'10px 28px', borderRadius:100, fontSize:13, fontWeight:700,
            cursor:'pointer', fontFamily:"'DM Sans',sans-serif", transition:'all .2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background=B.p; e.currentTarget.style.color=B.wh }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color=B.p }}
          >
            Vezi toți ambasadorii →
          </button>
        </a>
      </div>
    </section>
  )
}

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
          <div style={{ marginBottom:32, padding:'20px 24px', background:B.a, borderRadius:12 }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:32, fontWeight:800, color:B.wh, letterSpacing:'-.02em' }}>{CAMPAIGN_2026.slogan}</div>
            <div style={{ fontSize:14, color:'rgba(255,255,255,.8)', marginTop:6 }}>Investește în sănătatea ta — începe cu Digital Check-Up.</div>
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
            <select defaultValue="" style={{ ...inp }}>
              <option value="" disabled>Selectează serviciul</option>
              <option>⭐ Digital Check-Up</option>
              {SVC_LIST.map(s => <option key={s}>{s}</option>)}
            </select>
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
          {[['Despre noi','/'],['Echipa','/echipa'],['Ambasadori','/ambasadori'],['Tehnologii','/'],['Blog','/'],['Cariere','/'],['Contacte','/']].map(([s,h]) => (
            <a key={s} href={h} style={{ display:'block', fontSize:13, marginBottom:10, color:'rgba(255,255,255,.58)', textDecoration:'none', transition:'color .15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = B.wh }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,.58)' }}
            >{s}</a>
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
  @keyframes pulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}
  .fl1{animation:floatY 4s ease-in-out infinite}
  .fl2{animation:floatY 4.6s 1.1s ease-in-out infinite}
`

/* ─── Exports ─────────────────────────────── */
export function Homepage() {
  const [lang, setLang] = useState('RO')
  return (
    <>
      <style>{ANIM_CSS}</style>
      <Navbar/>
      <Hero/>
      <Services/>
      <Technologies/>
      <CheckUpStrip/>
      <BeforeAfter/>
      <Reviews/>
      <VideoReels/>
      <Ambasadori/>
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

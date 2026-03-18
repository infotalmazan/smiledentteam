'use client'
import { useState } from 'react'
import { BRAND as B, STATS, LOCATIONS, CAMPAIGN_2026, SERVICES, AMBASSADORS } from '@/lib/brand'
import { Logo } from './Logo'

/* ─── Demo doctors data ──────────────────── */
const DOCTORS = [
  { id:1, name:'Dr. Stanislav Eni',    dept:'Chirurgie',     title:'Medic chirurg dento-alveolar', years:12, rating:4.9, photo:'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop&crop=face', bio:'Specialist în chirurgie ghidată 3D, extracții complexe și augmentări osoase. Peste 3.000 de intervenții chirurgicale realizate.', education:['Universitatea de Stat de Medicină, Chișinău','Masterclass Implantologie, Berlin','Certificare Straumann, Elveția'], review:{ text:'Profesionalism desăvârșit. M-am simțit în siguranță pe tot parcursul intervenției.', author:'Elena M.' } },
  { id:2, name:'Dr. Victoria Potîngă', dept:'Chirurgie',     title:'Medic chirurg oral', years:8, rating:4.8, photo:'https://images.unsplash.com/photo-1594824476967-48c8b964ac31?w=400&h=500&fit=crop&crop=face', bio:'Specializată în implantologie și chirurgie reconstructivă. Focus pe cazuri complexe All-On-4/6.', education:['USMF Nicolae Testemițanu','Cursuri Nobel Biocare, Zürich'], review:{ text:'Foarte atentă și delicată. Recomand cu încredere!', author:'Alexandru C.' } },
  { id:3, name:'Dr. Rustam Anatolie',  dept:'Implantologie', title:'Medic implantolog', years:10, rating:4.9, photo:'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=500&fit=crop&crop=face', bio:'Specialist în implantologie digitală, planificare 3D și încărcare imediată. Peste 5.000 de implanturi inserate.', education:['USMF Chișinău','Fellowship Implantologie, ITI Basel','Certificare 3Shape'], review:{ text:'Cel mai bun implantolog din Moldova. Rezultat impecabil.', author:'Denis P.' } },
  { id:4, name:'Dr. Ana Cosovan',      dept:'Estetică',      title:'Medic stomatolog estetician', years:7, rating:4.9, photo:'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop&crop=face', bio:'Expert în Digital Smile Design, fațete ceramice E-max și albire profesională. Transformă zâmbete cu precizie digitală.', education:['USMF Chișinău','Digital Smile Design Academy, Madrid','Masterclass Fațete, Milano'], review:{ text:'Zâmbetul pe care l-am visat! Ana a fost extraordinară.', author:'Maria T.' } },
  { id:5, name:'Dr. Iulian Spataru',   dept:'Estetică',      title:'Medic stomatolog', years:6, rating:4.8, photo:'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=500&fit=crop&crop=face', bio:'Specializat în restaurări estetice minimale, bonding direct și smile makeover digital.', education:['USMF Chișinău','Cursuri Style Italiano'], review:{ text:'Rezultat natural, nimeni nu a observat că am fațete.', author:'Ksenia D.' } },
  { id:6, name:'Dr. Mariana Cojocaru', dept:'Terapie',       title:'Medic terapeut', years:14, rating:4.7, photo:'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&h=500&fit=crop&crop=face', bio:'Expert în tratamente endodontice sub microscop, restaurări complexe și profilaxie digitală.', education:['USMF Chișinău','Certificare Microscop Zeiss'], review:{ text:'Foarte atentă, tratament fără durere. Recomand!', author:'Nadejda B.' } },
  { id:7, name:'Dr. Cristina Radu',    dept:'Ortodonție',    title:'Medic ortodont', years:9, rating:4.9, photo:'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=500&fit=crop&crop=face', bio:'Specializată în ortodonție digitală cu Invisalign și brackets autoligaturante. Tratamente pentru copii și adulți.', education:['USMF Chișinău','Invisalign Certified Provider','Cursuri Damon System'], review:{ text:'Copilul meu adoră vizitele! Cea mai bună ortodontistă.', author:'Svetlana L.' } },
  { id:8, name:'Dr. Andrei Munteanu',  dept:'Protetică',     title:'Medic protetician', years:11, rating:4.8, photo:'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=500&fit=crop&crop=face', bio:'Expert în protetică digitală CAD/CAM, coroane zirconiu și reabilitări complete pe implanturi.', education:['USMF Chișinău','Certificare Cerec/inLab','Masterclass Zirconiu, Germania'], review:{ text:'Coroanele arată perfect, nu se deosebesc de dinții naturali.', author:'Ion V.' } },
  { id:9, name:'Dumitru Talmazan',     dept:'Management',    title:'Fondator & CEO', years:16, rating:5.0, photo:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face', bio:'Vizionar și fondator al Smile Dent Team. A transformat o clinică locală într-o rețea internațională cu 9 filiale în 4 țări.', education:['Business Management','Strategie & Leadership'], review:{ text:'Un lider care inspiră întreaga echipă și comunitate.', author:'Echipa SDT' } },
  { id:10, name:'Maria Rotari',        dept:'Management',    title:'Director Marketing', years:5, rating:4.9, photo:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face', bio:'Arhitectul strategiei de marketing SDT. A crescut brandul de la nivel local la recunoaștere națională cu ROMI 1106%.', education:['Marketing Digital','Brand Strategy'], review:{ text:'Creativitate și strategie la cel mai înalt nivel.', author:'Board SDT' } },
]

const DEPARTMENTS = ['Toți','Chirurgie','Implantologie','Estetică','Terapie','Ortodonție','Protetică','Management']

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
              fontSize:14, fontWeight: l==='Echipa' ? 700 : 500,
              color: l==='Echipa' ? B.p : '#3a5a50', textDecoration:'none',
              borderBottom: l==='Echipa' ? `2px solid ${B.p}` : '2px solid transparent', paddingBottom:2,
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
    <section style={{ background:B.ps, padding:'56px 48px 48px', borderBottom:`1px solid ${B.bdr}` }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
        <div>
          <SectionBadge>Echipa noastră</SectionBadge>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:42, fontWeight:800, color:B.nv, letterSpacing:'-.03em', lineHeight:1.08, margin:'0 0 14px' }}>
            Echipa ta de<br/><span style={{ color:B.p }}>specialiști</span>
          </h1>
          <p style={{ fontSize:15, lineHeight:1.7, color:B.gr, maxWidth:460, margin:0 }}>
            {STATS.team} specialiști, {STATS.years} ani de experiență și un singur obiectiv — zâmbetul tău.
          </p>
        </div>
        <div style={{ display:'flex', gap:24 }}>
          {[['600+','specialiști'],['15','ani experiență'],['9','filiale'],['4.9','Google rating']].map(([n,l]) => (
            <div key={l} style={{ textAlign:'center' }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:24, fontWeight:800, color:B.p }}>{n}</div>
              <div style={{ fontSize:11, color:B.gr }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Doctors Section ────────────────────── */
function DoctorsSection() {
  const [dept, setDept] = useState('Toți')
  const [selected, setSelected] = useState<number|null>(null)
  const filtered = dept === 'Toți' ? DOCTORS : DOCTORS.filter(d => d.dept === dept)
  const deptColors: Record<string,string> = { Chirurgie:B.p, Implantologie:'#0d8a72', Estetică:B.a, Terapie:'#059669', Ortodonție:'#6366f1', Protetică:'#D97706', Management:B.nv }
  const selectedDoc = DOCTORS.find(d => d.id === selected)

  return (
    <section style={{ background:B.wh, padding:'56px 48px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        {/* Filter tabs */}
        <div style={{ display:'flex', gap:8, marginBottom:32, flexWrap:'wrap' }}>
          {DEPARTMENTS.map(d => (
            <button key={d} onClick={() => { setDept(d); setSelected(null) }} style={{
              padding:'8px 18px', borderRadius:100, fontSize:13, fontWeight:600, cursor:'pointer',
              fontFamily:"'DM Sans',sans-serif", transition:'all .15s',
              background: dept===d ? B.p : B.ps, color: dept===d ? B.wh : B.nv,
              border: dept===d ? `1.5px solid ${B.p}` : `1.5px solid ${B.bdr}`,
            }}>{d}</button>
          ))}
        </div>

        {/* Portrait Grid — large photo cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
          {filtered.map(doc => {
            const color = deptColors[doc.dept] || B.p
            return (
              <div key={doc.id} onClick={() => setSelected(selected === doc.id ? null : doc.id)} style={{
                borderRadius:16, overflow:'hidden', cursor:'pointer', position:'relative',
                border: selected===doc.id ? `2px solid ${color}` : `1px solid ${B.bdr}`,
                transition:'all .3s', background:B.wh,
                boxShadow: selected===doc.id ? `0 12px 40px ${B.bdr}` : 'none',
              }}
                onMouseEnter={e => { if(selected!==doc.id) { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 12px 32px ${B.bdr}` } }}
                onMouseLeave={e => { if(selected!==doc.id) { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' } }}
              >
                {/* Photo */}
                <div style={{ position:'relative', paddingTop:'120%', overflow:'hidden' }}>
                  <img src={doc.photo} alt={doc.name} style={{
                    position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover',
                    transition:'transform .4s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform='scale(1.04)'}
                    onMouseLeave={e => e.currentTarget.style.transform=''}
                  />
                  {/* Gradient overlay */}
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'55%', background:'linear-gradient(to top, rgba(10,30,24,.85) 0%, rgba(10,30,24,.3) 60%, transparent 100%)', pointerEvents:'none' }}/>
                  {/* Info overlay */}
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'16px' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
                      <span style={{ fontSize:9, fontWeight:700, color:B.wh, background:color, padding:'2px 8px', borderRadius:100, letterSpacing:'.05em' }}>{doc.dept}</span>
                      <span style={{ fontSize:10, color:'#fbb040' }}>★ {doc.rating}</span>
                    </div>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:700, color:B.wh, lineHeight:1.2 }}>{doc.name}</div>
                    <div style={{ fontSize:11, color:'rgba(255,255,255,.7)', marginTop:2 }}>{doc.title}</div>
                    <div style={{ fontSize:10, color:'rgba(255,255,255,.5)', marginTop:3 }}>{doc.years} ani de experiență</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Selected doctor detail panel */}
        {selectedDoc && (() => {
          const color = deptColors[selectedDoc.dept] || B.p
          return (
            <div style={{
              marginTop:24, borderRadius:20, border:`2px solid ${color}`, overflow:'hidden',
              display:'grid', gridTemplateColumns:'320px 1fr', background:B.wh,
              boxShadow:`0 16px 48px ${B.bdr}`, animation:'fadeUp .3s ease',
            }}>
              {/* Left — large photo */}
              <div style={{ position:'relative' }}>
                <img src={selectedDoc.photo} alt={selectedDoc.name} style={{ width:'100%', height:'100%', objectFit:'cover', minHeight:380 }}/>
                <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'20px', background:'linear-gradient(to top, rgba(10,30,24,.8), transparent)' }}>
                  <span style={{ fontSize:10, fontWeight:700, color:B.wh, background:color, padding:'3px 10px', borderRadius:100 }}>{selectedDoc.dept}</span>
                </div>
              </div>
              {/* Right — info */}
              <div style={{ padding:'28px 32px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:4 }}>
                  <div>
                    <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:24, fontWeight:800, color:B.nv, margin:0 }}>{selectedDoc.name}</h3>
                    <div style={{ fontSize:14, color:B.gr, marginTop:2 }}>{selectedDoc.title}</div>
                  </div>
                  <button onClick={() => setSelected(null)} style={{ background:'none', border:'none', cursor:'pointer', fontSize:20, color:B.gr, padding:4 }}>✕</button>
                </div>
                <div style={{ display:'flex', gap:12, marginTop:10, marginBottom:16 }}>
                  <span style={{ fontSize:11, fontWeight:600, color:B.p, background:B.pl, padding:'4px 10px', borderRadius:100 }}>{selectedDoc.years} ani experiență</span>
                  <span style={{ fontSize:11, fontWeight:600, color:'#fbb040', background:'#fbb04015', padding:'4px 10px', borderRadius:100 }}>★ {selectedDoc.rating} Google</span>
                </div>
                <p style={{ fontSize:14, lineHeight:1.7, color:B.gr, margin:'0 0 18px' }}>{selectedDoc.bio}</p>
                <div style={{ fontSize:10, fontWeight:700, color:B.p, letterSpacing:'.1em', textTransform:'uppercase', marginBottom:8 }}>Educație & Certificări</div>
                <div style={{ display:'flex', flexDirection:'column', gap:5, marginBottom:18 }}>
                  {selectedDoc.education.map(e => (
                    <div key={e} style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={B.p} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ fontSize:13, color:B.nv, fontWeight:500 }}>{e}</span>
                    </div>
                  ))}
                </div>
                {selectedDoc.review && (
                  <div style={{ background:B.ps, borderRadius:12, padding:'16px 18px', borderLeft:`3px solid ${color}`, marginBottom:18 }}>
                    <div style={{ color:'#fbb040', fontSize:12, marginBottom:4 }}>★★★★★</div>
                    <p style={{ fontSize:13, lineHeight:1.6, color:B.nv, margin:'0 0 6px', fontStyle:'italic' }}>&ldquo;{selectedDoc.review.text}&rdquo;</p>
                    <div style={{ fontSize:12, color:B.gr, fontWeight:600 }}>— {selectedDoc.review.author}</div>
                  </div>
                )}
                <Btn style={{ width:'100%', justifyContent:'center', fontSize:14, padding:'13px 24px' }}>
                  Programează cu {selectedDoc.name} →
                </Btn>
              </div>
            </div>
          )
        })()}
      </div>
    </section>
  )
}

/* ─── Ambasadori ─────────────────────────── */
function AmbasadoriSection() {
  return (
    <section style={{ background:B.ps, padding:'64px 48px' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <SectionBadge>Zâmbete care inspiră</SectionBadge>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:32, fontWeight:800, color:B.nv, margin:'0 0 10px' }}>
            Ambasadorii <span style={{ color:B.a }}>Smile Dent Team</span>
          </h2>
          <p style={{ fontSize:14, color:B.gr, maxWidth:440, margin:'0 auto' }}>Personalități din diverse industrii care ne-au ales și ne reprezintă.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:16 }}>
          {AMBASSADORS.map(amb => (
            <a key={amb.slug} href="/ambasadori" style={{ textDecoration:'none' }}>
              <div style={{
                borderRadius:14, overflow:'hidden', cursor:'pointer', position:'relative',
                border:`1px solid ${B.bdr}`, transition:'all .3s', background:B.wh,
              }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow=`0 10px 28px ${B.bdr}` }}
                onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}
              >
                <div style={{ position:'relative', paddingTop:'110%', overflow:'hidden' }}>
                  <img src={amb.photo} alt={amb.name} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transition:'transform .4s' }}
                    onMouseEnter={e => e.currentTarget.style.transform='scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform=''}
                  />
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'60%', background:'linear-gradient(to top, rgba(10,30,24,.9) 0%, transparent 100%)', pointerEvents:'none' }}/>
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'12px' }}>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontSize:12, fontWeight:700, color:B.wh, lineHeight:1.2 }}>{amb.name}</div>
                    <div style={{ fontSize:10, color:'rgba(255,255,255,.6)', marginTop:2 }}>{amb.role}</div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div style={{ textAlign:'center', marginTop:24 }}>
          <a href="/ambasadori" style={{ textDecoration:'none', fontSize:13, fontWeight:700, color:B.p }}>Vezi toți ambasadorii →</a>
        </div>
      </div>
    </section>
  )
}

/* ─── CTA Strip ──────────────────────────── */
function CtaStrip() {
  return (
    <section style={{ background:`linear-gradient(135deg,${B.p},${B.pm})`, padding:'52px 48px' }}>
      <div style={{ maxWidth:900, margin:'0 auto', textAlign:'center' }}>
        <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:30, fontWeight:800, color:B.wh, margin:'0 0 12px' }}>
          Alege-ți specialistul. Programează-te acum.
        </h2>
        <p style={{ fontSize:15, color:'rgba(255,255,255,.7)', margin:'0 0 24px' }}>
          {STATS.team} specialiști pregătiți să aibă grijă de zâmbetul tău.
        </p>
        <Btn pink style={{ fontSize:15, padding:'14px 32px' }}>Programează-te →</Btn>
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
    <section style={{ background:B.wh, padding:'64px 48px' }}>
      <div style={{ maxWidth:700, margin:'0 auto', background:B.ps, borderRadius:20, padding:'40px 36px', border:`1px solid ${B.bdr}` }}>
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:800, color:B.nv, margin:'0 0 8px' }}>Programează-te acum</h2>
          <p style={{ fontSize:13, color:B.gr }}>Completează formularul — te contactăm rapid.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 }}>
          <input placeholder="Prenume" style={inp}/>
          <input placeholder="Nume" style={inp}/>
        </div>
        <input placeholder="Telefon *" type="tel" style={{ ...inp, marginBottom:12 }}/>
        <select defaultValue="" style={{ ...inp, marginBottom:12, color:B.gr }}>
          <option value="" disabled>Alege specialistul</option>
          {DOCTORS.map(d => <option key={d.id}>{d.name} — {d.dept}</option>)}
        </select>
        <select defaultValue="" style={{ ...inp, marginBottom:12, color:B.gr }}>
          <option value="" disabled>Selectează locația</option>
          {LOCATIONS.map(l => <option key={l.city}>{l.city} — {l.address}</option>)}
        </select>
        <Btn pink style={{ width:'100%', justifyContent:'center', fontSize:15, padding:'14px' }}>Trimite cererea →</Btn>
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
          {[['Despre noi','/'],['Echipa','/echipa'],['Ambasadori','/ambasadori'],['Tehnologii','/'],['Blog','/'],['Contacte','/']].map(([s,h]) => (
            <a key={s} href={h} style={{ display:'block', fontSize:13, marginBottom:9, color:'rgba(255,255,255,.5)', textDecoration:'none' }}>{s}</a>
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

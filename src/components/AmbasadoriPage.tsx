'use client'
import { useState } from 'react'
import { BRAND as B, STATS, LOCATIONS, CAMPAIGN_2026, SERVICES, AMBASSADORS } from '@/lib/brand'
import { Logo } from './Logo'

/* ─── Extended ambassador data ────────────── */
const AMB_DETAILS: Record<string, {
  bio: string; story: string; service: string;
  gallery: string[]; videoPlaceholder?: string;
  quote: string;
}> = {
  talmazan: {
    bio: 'Fondator al ecosistemului digital de marketing CONTINUUM și CEO al mai multor companii. Vizionar în business și marketing digital cu peste 15 ani de experiență.',
    story: 'Dumitru nu este doar un ambasador — este fondatorul Smile Dent Team. A transformat o clinică locală într-o rețea internațională cu 9 filiale în 4 țări. Filosofia sa: "Alege-te pe tine" a devenit motto-ul întregii campanii 2026.',
    service: 'Digital Check-Up',
    gallery: [
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=350&fit=crop',
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=350&fit=crop',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=350&fit=crop',
    ],
    quote: 'Fiecare zâmbet transformat este o poveste de succes. Smile Dent Team nu este doar o clinică — este o misiune.',
  },
  adam: {
    bio: 'Fashion blogger și influencer cu peste 200K followers. Expert în lifestyle, beauty și fashion din Republica Moldova.',
    story: 'Nicoleta a descoperit SDT prin programul de fațete dentare. După transformarea zâmbetului ei, a devenit cea mai vocală susținătoare a clinicii, împărtășind experiența pe toate platformele sale sociale.',
    service: 'Fațete Dentare',
    gallery: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=350&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=350&fit=crop',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&h=350&fit=crop',
    ],
    quote: 'Zâmbetul meu de la SDT mi-a schimbat nu doar aspectul — mi-a schimbat încrederea în mine.',
  },
  cosovan: {
    bio: 'Profesor universitar, doctor în științe, personalitate publică și formator de opinie în educație și cultură.',
    story: 'Victoria a ales SDT pentru tratament de implantologie. Experiența profesională și atenția la detalii din clinică au convins-o că aceasta este viitorul stomatologiei.',
    service: 'Implant Dentar',
    gallery: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=350&fit=crop',
      'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=500&h=350&fit=crop',
    ],
    quote: 'Profesionalismul echipei SDT este la nivel internațional. Am găsit aici tot ce căutam.',
  },
  rascu: {
    bio: 'Content creator și influencer cu comunitate activă de tineri. Cunoscut pentru conținut autentic și energie pozitivă.',
    story: 'Valeriu a documentat întregul proces de ortodonție digitală la SDT pe canalul său. Transparența și calitatea tratamentului au inspirat sute de tineri să își corecteze zâmbetul.',
    service: 'Ortodonție Digitală',
    gallery: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=350&fit=crop',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=350&fit=crop',
    ],
    quote: 'Am filmat tot procesul. Oamenii trebuie să vadă că ortodonția modernă nu mai doare.',
  },
  marian: {
    bio: 'Antreprenor de succes, fondatoare a mai multor business-uri în Moldova. Activistă pentru drepturile femeilor în business.',
    story: 'Maria a ales SDT pentru un Digital Check-Up și a descoperit necesitatea unor coroane dentare. Întregul proces, de la diagnostic la finalizare, a fost digital și transparent.',
    service: 'Coroane Dentare',
    gallery: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=350&fit=crop',
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&h=350&fit=crop',
    ],
    quote: 'Ca antreprenor, apreciez eficiența. La SDT totul este organizat impecabil.',
  },
  akord: {
    bio: 'Muzician și artist cu popularitate națională. Voce iconică a scenei muzicale moldovenești.',
    story: 'Akord a ales SDT pentru albire profesională și estetică dentară înainte de un turneu important. Rezultatul a depășit așteptările — zâmbetul pe scenă a devenit marca sa.',
    service: 'Fațete Dentare',
    gallery: [
      'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=500&h=350&fit=crop',
      'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=350&fit=crop',
    ],
    quote: 'Pe scenă zâmbetul contează enorm. SDT mi-a dat cel mai bun "instrument".',
  },
  malareu: {
    bio: 'Sportiv profesionist și antrenor fitness. Promotor al unui stil de viață sănătos și activ.',
    story: 'Daniel a venit la SDT după un traumatism dentar sportiv. Implantul și restaurarea au fost realizate cu tehnologie 3D, permițându-i revenirea rapidă la antrenamente.',
    service: 'Implant Dentar',
    gallery: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=350&fit=crop',
    ],
    quote: 'Recuperarea a fost mai rapidă decât mă așteptam. Pot zâmbi din nou cu încredere.',
  },
  spataru: {
    bio: 'Specialist IT, antreprenor tech și early adopter al tehnologiilor digitale în Republica Moldova.',
    story: 'Cristian a apreciat abordarea digitală a SDT — scanare 3D, planificare computerizată, totul transparent și măsurabil. A ales Digital Check-Up ca prim pas.',
    service: 'Digital Check-Up',
    gallery: [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=350&fit=crop',
    ],
    quote: 'Ca om de tech, am fost impresionat de nivelul de digitalizare. Este viitorul.',
  },
  coberman: {
    bio: 'Jurnalistă premiată, prezentatoare TV și formator de opinie în mass-media moldovenească.',
    story: 'Veronica a realizat un reportaj despre SDT și a rămas impresionată de tehnologie. A devenit pacientă și apoi ambasadoare, promovând stomatologia digitală.',
    service: 'Digital Check-Up',
    gallery: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=350&fit=crop',
    ],
    quote: 'Am venit ca jurnalistă, am plecat ca pacientă fidelă. Povestea SDT merită spusă.',
  },
  parpaut: {
    bio: 'Medic specialist, promotoare a sănătății și a medicinei preventive. Activă în comunitatea medicală.',
    story: 'Elena, ca medic, a apreciat standardele ridicate de sterilizare și protocoalele digitale ale SDT. A recomandat clinica colegilor și pacienților săi.',
    service: 'Terapie & Profilaxie',
    gallery: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=350&fit=crop',
    ],
    quote: 'Ca medic, sunt foarte exigentă. SDT respectă standardele la care mă aștept.',
  },
  galben: {
    bio: 'Chef și restaurator, fondator al mai multor restaurante populare din Chișinău.',
    story: 'Dorin a ales SDT pentru coroane All-On după ani de probleme dentare. Transformarea i-a redat încrederea și capacitatea de a gusta profesional.',
    service: 'Dinți Ficși / All-On',
    gallery: [
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=500&h=350&fit=crop',
    ],
    quote: 'Am recuperat tot ce pierdusem. Acum pot gusta, zâmbi și trăi din nou.',
  },
  cociu: {
    bio: 'Prezentatoare TV, actriță și personalitate publică iubită de publicul moldovenesc.',
    story: 'Veronica a ales fațete dentare la SDT pentru un zâmbet perfect de cameră. Rezultatul natural a fost exact ce căuta pentru cariera ei în televiziune.',
    service: 'Fațete Dentare',
    gallery: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=350&fit=crop',
    ],
    quote: 'În fața camerei fiecare detaliu contează. SDT mi-a dat zâmbetul perfect.',
  },
}

/* ─── Shared ──────────────────────────────── */
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
    <nav style={{
      position:'sticky', top:0, zIndex:100, background:'rgba(255,255,255,.97)',
      backdropFilter:'blur(12px)', borderBottom:`1px solid ${B.bdr}`,
      padding:'14px 48px', display:'flex', justifyContent:'space-between', alignItems:'center',
    }}>
      <a href="/" style={{ textDecoration:'none' }}><Logo height={36}/></a>
      <div style={{ display:'flex', gap:28, alignItems:'center' }}>
        {[['Servicii','/servicii'],['Digital Check-Up','/digital-checkup'],['Consultație Online','/consultatie-online'],['Echipa','/echipa'],['Ambasadori','/ambasadori']].map(([l,h]) => (
          <a key={l} href={h} style={{
            fontSize:14, fontWeight: l==='Ambasadori' ? 700 : 500,
            color: l==='Ambasadori' ? B.a : '#3a5a50', textDecoration:'none',
            borderBottom: l==='Ambasadori' ? `2px solid ${B.a}` : '2px solid transparent', paddingBottom:2,
          }}>{l}</a>
        ))}
      </div>
      <Btn pink style={{ fontSize:13, padding:'10px 22px' }}>Programează-te</Btn>
    </nav>
  )
}

/* ─── Ambassador Profile ──────────────────── */
function AmbassadorProfile({ amb, onNav }: { amb: typeof AMBASSADORS[number]; onNav: (slug:string) => void }) {
  const detail = AMB_DETAILS[amb.slug]
  if (!detail) return null

  const idx = AMBASSADORS.findIndex(a => a.slug === amb.slug)
  const prev = idx > 0 ? AMBASSADORS[idx-1] : null
  const next = idx < AMBASSADORS.length-1 ? AMBASSADORS[idx+1] : null

  return (
    <div style={{ animation:'fadeUp .3s ease' }}>
      {/* Hero — full width photo + overlay */}
      <div style={{ position:'relative', height:480, overflow:'hidden', borderRadius:'0 0 24px 24px' }}>
        <img src={amb.photo.replace('300','1200')} alt={amb.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top' }}/>
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(10,30,24,.9) 0%, rgba(10,30,24,.3) 40%, transparent 70%)' }}/>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'48px 52px' }}>
          <span style={{ fontSize:10, fontWeight:700, color:B.a, background:'rgba(232,21,122,.15)', padding:'4px 12px', borderRadius:100, letterSpacing:'.1em' }}>AMBASADOR SDT</span>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:42, fontWeight:800, color:B.wh, margin:'10px 0 6px', lineHeight:1.05 }}>{amb.name}</h1>
          <div style={{ fontSize:16, color:'rgba(255,255,255,.7)' }}>{amb.role}</div>
          <div style={{ fontSize:13, color:'rgba(255,255,255,.5)', marginTop:4 }}>Serviciu recomandat: <span style={{ color:B.a, fontWeight:600 }}>{detail.service}</span></div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 48px' }}>
        {/* Bio + Story */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, padding:'48px 0', borderBottom:`1px solid ${B.bdr}` }}>
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:B.p, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:12 }}>Despre</div>
            <p style={{ fontSize:15, lineHeight:1.8, color:B.gr, margin:0 }}>{detail.bio}</p>
          </div>
          <div>
            <div style={{ fontSize:11, fontWeight:700, color:B.a, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:12 }}>Povestea cu SDT</div>
            <p style={{ fontSize:15, lineHeight:1.8, color:B.nv, margin:0 }}>{detail.story}</p>
          </div>
        </div>

        {/* Quote */}
        <div style={{ padding:'40px 0', borderBottom:`1px solid ${B.bdr}`, textAlign:'center' }}>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:24, fontWeight:700, color:B.nv, lineHeight:1.4, maxWidth:700, margin:'0 auto', fontStyle:'italic' }}>
            &ldquo;{detail.quote}&rdquo;
          </div>
          <div style={{ fontSize:14, color:B.a, fontWeight:700, marginTop:12 }}>— {amb.name}</div>
        </div>

        {/* Gallery */}
        <div style={{ padding:'40px 0', borderBottom:`1px solid ${B.bdr}` }}>
          <div style={{ fontSize:11, fontWeight:700, color:B.p, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:16 }}>Galerie</div>
          <div style={{ display:'grid', gridTemplateColumns: detail.gallery.length >= 3 ? '1fr 1fr 1fr' : detail.gallery.length === 2 ? '1fr 1fr' : '1fr', gap:14 }}>
            {detail.gallery.map((img, i) => (
              <div key={i} style={{ borderRadius:14, overflow:'hidden', height:220 }}>
                <img src={img} alt={`${amb.name} gallery ${i+1}`} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform .4s' }}
                  onMouseEnter={e => e.currentTarget.style.transform='scale(1.04)'}
                  onMouseLeave={e => e.currentTarget.style.transform=''}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Video placeholder */}
        <div style={{ padding:'40px 0', borderBottom:`1px solid ${B.bdr}` }}>
          <div style={{ fontSize:11, fontWeight:700, color:B.p, letterSpacing:'.12em', textTransform:'uppercase', marginBottom:16 }}>Video feedback</div>
          <div style={{
            height:320, borderRadius:16, background:`linear-gradient(135deg, ${B.nv}, #0f2e24)`,
            display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', position:'relative',
          }}>
            <div style={{ width:72, height:72, borderRadius:'50%', background:B.a, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill={B.wh} stroke="none"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <div style={{ position:'absolute', bottom:20, left:24, color:'rgba(255,255,255,.5)', fontSize:12 }}>Video testimonial — {amb.name}</div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding:'40px 0', textAlign:'center', borderBottom:`1px solid ${B.bdr}` }}>
          <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800, color:B.nv, margin:'0 0 8px' }}>
            Inspirat de {amb.name.split(' ')[0]}?
          </h3>
          <p style={{ fontSize:14, color:B.gr, margin:'0 0 20px' }}>Începe și tu cu un Digital Check-Up.</p>
          <Btn pink style={{ fontSize:15, padding:'14px 36px' }}>Programează Digital Check-Up →</Btn>
        </div>

        {/* Navigation between ambassadors */}
        <div style={{ padding:'32px 0', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          {prev ? (
            <button onClick={() => onNav(prev.slug)} style={{ display:'flex', alignItems:'center', gap:10, background:'none', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={B.p} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              <div style={{ textAlign:'left' }}>
                <div style={{ fontSize:10, color:B.gr }}>Anterior</div>
                <div style={{ fontSize:14, fontWeight:700, color:B.nv }}>{prev.name}</div>
              </div>
            </button>
          ) : <div/>}
          <button onClick={() => onNav('')} style={{ background:B.pl, border:`1px solid ${B.bdr}`, borderRadius:100, padding:'8px 20px', cursor:'pointer', fontSize:12, fontWeight:600, color:B.p, fontFamily:"'DM Sans',sans-serif" }}>
            Toți ambasadorii
          </button>
          {next ? (
            <button onClick={() => onNav(next.slug)} style={{ display:'flex', alignItems:'center', gap:10, background:'none', border:'none', cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:10, color:B.gr }}>Următor</div>
                <div style={{ fontSize:14, fontWeight:700, color:B.nv }}>{next.name}</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={B.p} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          ) : <div/>}
        </div>
      </div>
    </div>
  )
}

/* ─── All Ambassadors Grid ────────────────── */
function AllAmbassadors({ onSelect }: { onSelect: (slug:string) => void }) {
  return (
    <div>
      {/* Hero */}
      <div style={{ background:B.ps, padding:'56px 48px 48px', borderBottom:`1px solid ${B.bdr}` }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:B.al, border:`1px solid ${B.a}22`, padding:'5px 14px', borderRadius:100, marginBottom:16 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:B.a }}/>
            <span style={{ fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:B.a }}>Zâmbete care inspiră</span>
          </div>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:42, fontWeight:800, color:B.nv, lineHeight:1.08, margin:'0 0 14px' }}>
            Ambasadorii<br/><span style={{ color:B.a }}>Smile Dent Team</span>
          </h1>
          <p style={{ fontSize:16, lineHeight:1.7, color:B.gr, maxWidth:520, margin:0 }}>
            Personalități din diverse industrii care ne-au ales și ne reprezintă. Fiecare zâmbet — o poveste de încredere.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div style={{ maxWidth:1100, margin:'0 auto', padding:'40px 48px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:18 }}>
          {AMBASSADORS.map(amb => {
            const detail = AMB_DETAILS[amb.slug]
            return (
              <div key={amb.slug} onClick={() => onSelect(amb.slug)} style={{
                borderRadius:16, overflow:'hidden', cursor:'pointer', position:'relative',
                border:`1px solid ${B.bdr}`, transition:'all .3s', background:B.wh,
              }}
                onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 12px 32px ${B.bdr}` }}
                onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='' }}
              >
                <div style={{ position:'relative', paddingTop:'120%', overflow:'hidden' }}>
                  <img src={amb.photo} alt={amb.name} style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', transition:'transform .4s' }}
                    onMouseEnter={e => e.currentTarget.style.transform='scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform=''}
                  />
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'65%', background:'linear-gradient(to top, rgba(10,30,24,.9) 0%, transparent 100%)', pointerEvents:'none' }}/>
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, padding:'16px' }}>
                    <span style={{ fontSize:9, fontWeight:700, color:B.wh, background:B.a, padding:'2px 8px', borderRadius:100, letterSpacing:'.05em' }}>AMBASADOR</span>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:700, color:B.wh, lineHeight:1.2, marginTop:6 }}>{amb.name}</div>
                    <div style={{ fontSize:11, color:'rgba(255,255,255,.65)', marginTop:2 }}>{amb.role}</div>
                    {detail && <div style={{ fontSize:10, color:'rgba(255,255,255,.45)', marginTop:4 }}>Serviciu: {detail.service}</div>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ─── Footer ──────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background:B.nv, padding:'56px 48px 32px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1.5fr 1fr 1fr 1.2fr', gap:40, marginBottom:40 }}>
        <div>
          <Logo height={32} light/>
          <p style={{ fontSize:13, color:'rgba(255,255,255,.45)', marginTop:16, lineHeight:1.7, maxWidth:260 }}>
            Clinică stomatologică digitală. {STATS.years} ani de excelență, {STATS.team} specialiști, {STATS.patients} pacienți.
          </p>
        </div>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:B.wh, letterSpacing:'.15em', textTransform:'uppercase', marginBottom:18 }}>Servicii</div>
          {SERVICES.slice(0,7).map(s => (
            <a key={s.slug} href="/servicii" style={{ display:'block', fontSize:13, marginBottom:9, color:'rgba(255,255,255,.5)', textDecoration:'none' }}>{s.name}</a>
          ))}
        </div>
        <div>
          <div style={{ fontSize:11, fontWeight:700, color:B.wh, letterSpacing:'.15em', textTransform:'uppercase', marginBottom:18 }}>Clinică</div>
          {[['Despre noi','/'],['Echipa','/echipa'],['Ambasadori','/ambasadori'],['Blog','/'],['Cariere','/'],['Contacte','/']].map(([s,h]) => (
            <a key={s} href={h} style={{ display:'block', fontSize:13, marginBottom:9, color:'rgba(255,255,255,.5)', textDecoration:'none' }}>{s}</a>
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
  )
}

/* ─── Main Export ─────────────────────────── */
const ANIM = `@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`

export function AmbasadoriPage() {
  const [selected, setSelected] = useState<string|null>(null)
  const selectedAmb = AMBASSADORS.find(a => a.slug === selected)

  const handleNav = (slug: string) => {
    setSelected(slug || null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <style>{ANIM}</style>
      <Nav/>
      {selectedAmb ? (
        <AmbassadorProfile amb={selectedAmb} onNav={handleNav}/>
      ) : (
        <AllAmbassadors onSelect={(slug) => { setSelected(slug); window.scrollTo({top:0,behavior:'smooth'}) }}/>
      )}
      <Footer/>
    </>
  )
}

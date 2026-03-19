'use client'
import { useState } from 'react'
import { BRAND as B, STATS, LOCATIONS, CAMPAIGN_2026, SERVICES, AMBASSADORS } from '@/lib/brand'
import { Logo } from './Logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ChevronLeft, ChevronRight, Play, MapPin, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'

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

/* ─── Nav ──────────────────────────────────── */
function Nav() {
  return (
    <nav
      className="sticky top-0 z-[100] flex items-center justify-between border-b border-sdt-600/10 bg-white px-12 py-3.5"
      style={{ borderTop: `3px solid ${B.a}` }}
    >
      <a href="/" className="no-underline"><Logo height={36}/></a>
      <div className="flex items-center gap-7">
        {[['Servicii','/servicii'],['Digital Check-Up','/digital-checkup'],['Consultație Online','/consultatie-online'],['Echipa','/echipa'],['Recenzii','/recenzii']].map(([l,h]) => (
          <a
            key={l}
            href={h}
            className="relative text-sm font-medium text-[#3a5a50] no-underline pb-1"
          >{l}</a>
        ))}
      </div>
      <div className="flex items-center gap-2.5">
        <a href="/login" className="no-underline">
          <Button variant="outline" size="sm" className="border-sdt-600 text-sdt-600 text-[13px] font-semibold">
            Cabinetul meu
          </Button>
        </a>
        <Button variant="accent" size="sm" className="text-[13px] font-bold">
          Programează-te
        </Button>
      </div>
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
    <div className="animate-[fadeUp_.3s_ease]">
      {/* Hero — full width photo + overlay */}
      <div className="relative h-[480px] overflow-hidden rounded-b-3xl">
        <img
          src={amb.photo.replace('300','1200')}
          alt={amb.name}
          className="h-full w-full object-cover object-top"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(10,30,24,.9) 0%, rgba(10,30,24,.3) 40%, transparent 70%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 px-[52px] pb-12">
          <Badge variant="accent" className="mb-2.5 bg-pink-500/15 text-[10px] font-bold tracking-[.1em] text-pink-500">
            AMBASADOR SDT
          </Badge>
          <h1 className="font-display text-[42px] font-semibold leading-[1.05] text-white">
            {amb.name}
          </h1>
          <div className="mt-1.5 text-base text-white/70">{amb.role}</div>
          <div className="mt-1 text-[13px] text-white/50">
            Serviciu recomandat: <span className="font-semibold text-pink-500">{detail.service}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[1100px] px-12">
        {/* Despre — full width */}
        <div className="border-b border-sdt-600/10 py-12">
          <div className="mb-3 text-[11px] font-bold uppercase tracking-[.12em] text-sdt-600">Despre</div>
          <p className="m-0 max-w-[700px] text-[16px] leading-[1.85] text-[#5a7a6e]">{detail.bio}</p>
        </div>

        {/* Experienta cu SDT — story + inline gallery */}
        <div className="border-b border-sdt-600/10 py-12">
          <div className="mb-4 text-[11px] font-bold uppercase tracking-[.12em] text-pink-500">Experienta cu SDT</div>
          <div className="grid grid-cols-[1fr_1fr] gap-10 items-start">
            <div>
              <p className="m-0 text-[16px] leading-[1.85] text-[#0a1e18]">{detail.story}</p>
              <div className="mt-5 flex items-center gap-2.5">
                <Badge variant="accent" className="text-[10px] font-bold">{detail.service}</Badge>
                <span className="text-[12px] text-[#5a7a6e]">Serviciu recomandat</span>
              </div>
            </div>
            {/* Story gallery — stacked photos */}
            <div className="flex flex-col gap-3">
              {detail.gallery.slice(0, 2).map((img, i) => (
                <div key={i} className="h-[180px] overflow-hidden rounded-xl">
                  <img src={img} alt={`${amb.name} ${i+1}`} className="h-full w-full object-cover transition-transform duration-[400ms] hover:scale-[1.04]" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="border-b border-sdt-600/10 py-10 text-center">
          <div className="font-display mx-auto max-w-[700px] text-2xl font-medium italic leading-[1.4] text-[#0a1e18]">
            &ldquo;{detail.quote}&rdquo;
          </div>
          <div className="mt-3 text-sm font-bold text-pink-500">— {amb.name}</div>
        </div>

        {/* Full Gallery — if more than 2 photos */}
        {detail.gallery.length > 2 && (
          <div className="border-b border-sdt-600/10 py-10">
            <div className="mb-4 text-[11px] font-bold uppercase tracking-[.12em] text-sdt-600">Galerie</div>
            <div className={cn('grid gap-3.5', detail.gallery.length >= 3 ? 'grid-cols-3' : 'grid-cols-2')}>
              {detail.gallery.map((img, i) => (
                <div key={i} className="h-[220px] overflow-hidden rounded-xl">
                  <img src={img} alt={`${amb.name} gallery ${i+1}`} className="h-full w-full object-cover transition-transform duration-[400ms] hover:scale-[1.04]" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video placeholder */}
        <div className="border-b border-sdt-600/10 py-10">
          <div className="mb-4 text-[11px] font-bold uppercase tracking-[.12em] text-sdt-600">Video feedback</div>
          <div
            className="relative flex h-[320px] cursor-pointer items-center justify-center rounded-2xl"
            style={{ background: `linear-gradient(135deg, ${B.nv}, #0f2e24)` }}
          >
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-pink-500">
              <Play className="h-7 w-7 fill-white text-white" />
            </div>
            <div className="absolute bottom-5 left-6 text-xs text-white/50">
              Video testimonial — {amb.name}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="border-b border-sdt-600/10 py-10 text-center">
          <h3 className="font-display mb-2 text-[22px] font-semibold text-[#0a1e18]">
            Inspirat de {amb.name.split(' ')[0]}?
          </h3>
          <p className="mb-5 text-sm text-[#5a7a6e]">Începe și tu cu un Digital Check-Up.</p>
          <Button variant="accent" className="px-9 py-3.5 text-[15px] font-bold">
            Programează Digital Check-Up &rarr;
          </Button>
        </div>

        {/* Navigation between ambassadors — with photos */}
        <div className="flex items-center justify-between py-8">
          {prev ? (
            <button
              onClick={() => onNav(prev.slug)}
              className="flex cursor-pointer items-center gap-3 border-none bg-transparent font-sans"
            >
              <ChevronLeft className="h-4 w-4 text-sdt-600 shrink-0" strokeWidth={2} />
              <img src={prev.photo} alt={prev.name} className="h-10 w-10 rounded-full object-cover shrink-0" />
              <div className="text-left">
                <div className="text-[10px] text-[#5a7a6e]">Anterior</div>
                <div className="text-sm font-bold text-[#0a1e18]">{prev.name}</div>
              </div>
            </button>
          ) : <div/>}
          <button
            onClick={() => onNav('')}
            className="cursor-pointer rounded-full border border-sdt-600/10 bg-sdt-50 px-5 py-2 font-sans text-xs font-semibold text-sdt-600"
          >
            Toți ambasadorii
          </button>
          {next ? (
            <button
              onClick={() => onNav(next.slug)}
              className="flex cursor-pointer items-center gap-3 border-none bg-transparent font-sans"
            >
              <div className="text-right">
                <div className="text-[10px] text-[#5a7a6e]">Următor</div>
                <div className="text-sm font-bold text-[#0a1e18]">{next.name}</div>
              </div>
              <img src={next.photo} alt={next.name} className="h-10 w-10 rounded-full object-cover shrink-0" />
              <ChevronRight className="h-4 w-4 text-sdt-600 shrink-0" strokeWidth={2} />
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
      <section className="border-b border-sdt-600/10 bg-sdt-50 px-12 pb-12 pt-14">
        <div className="mx-auto max-w-[1100px]">
          <Badge variant="outline" className="mb-4 gap-1.5 rounded-full border-sdt-600/10 bg-pink-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[.12em] text-pink-500">
            <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
            Zâmbete care inspiră
          </Badge>
          <h1 className="font-display mb-3.5 text-[42px] font-semibold leading-[1.08] text-[#0a1e18]">
            Ambasadorii<br/><span className="text-pink-500">Smile Dent Team</span>
          </h1>
          <p className="m-0 max-w-[520px] text-base leading-[1.7] text-[#5a7a6e]">
            Personalități din diverse industrii care ne-au ales și ne reprezintă. Fiecare zâmbet — o poveste de încredere.
          </p>
        </div>
      </section>

      {/* Grid */}
      <div className="mx-auto max-w-[1100px] px-12 py-10">
        <div className="grid grid-cols-4 gap-[18px]">
          {AMBASSADORS.map(amb => {
            const detail = AMB_DETAILS[amb.slug]
            return (
              <Card
                key={amb.slug}
                onClick={() => onSelect(amb.slug)}
                className="group cursor-pointer overflow-hidden rounded-2xl border-sdt-600/10 bg-white p-0 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative overflow-hidden pt-[120%]">
                  <img
                    src={amb.photo}
                    alt={amb.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[400ms] group-hover:scale-105"
                  />
                  <div
                    className="pointer-events-none absolute bottom-0 left-0 right-0 h-[65%]"
                    style={{ background: 'linear-gradient(to top, rgba(10,30,24,.9) 0%, transparent 100%)' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <Badge variant="accent" className="mb-1.5 px-2 py-0.5 text-[9px] font-bold tracking-[.05em]">
                      AMBASADOR
                    </Badge>
                    <div className="font-display text-base font-medium leading-tight text-white">{amb.name}</div>
                    <div className="mt-0.5 text-[11px] text-white/65">{amb.role}</div>
                    {detail && <div className="mt-1 text-[10px] text-white/[.45]">Serviciu: {detail.service}</div>}
                  </div>
                </div>
              </Card>
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
    <>
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

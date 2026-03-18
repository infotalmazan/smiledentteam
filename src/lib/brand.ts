// ─── SDT Brand Tokens ───────────────────────
// Single source of truth for all brand colors and values

export const BRAND = {
  // Colors
  p:   '#0a6b5c',   // teal primary (SDT logo letters)
  pm:  '#0d8a72',   // teal mid
  pd:  '#074d42',   // teal dark
  pl:  '#e6f4f0',   // teal light tint
  ps:  '#f0faf7',   // teal softest
  a:   '#e8157a',   // pink accent (S bar in logo)
  al:  '#fde6f0',   // pink light
  nv:  '#0a1e18',   // near black
  wh:  '#ffffff',
  cr:  '#f7f5f2',   // warm cream
  gr:  '#5a7a6e',   // muted green-gray
  bdr: 'rgba(10,107,92,0.1)',
} as const

// ─── Site Stats ───
export const STATS = {
  years:        '15',
  patients:     '40.000+',
  team:         '600+',
  locations:    '9',
  adresari:     '18.000+',
  dcuRealizate: '2.200+',
  marketShare:  '11.3%',
} as const

// ─── Locations ───
export const LOCATIONS = [
  { city: 'Chișinău, Centru',   address: 'str. Ismail 88',        phone: '+373 22 881 414' },
  { city: 'Chișinău, Râșcani',  address: 'Bd. Moscova 17/A',      phone: '+373 22 011 061' },
  { city: 'Chișinău, Botanica', address: 'Bd. Dacia 44',          phone: '+373 22 881 414' },
  { city: 'Iași',               address: 'str. Arcu 18',           phone: '+40 33 240 2505' },
  { city: 'București',          address: 'str. G. Puccini 8A',     phone: '+40 31 433 7004' },
] as const

// ─── Services (8 categories — from Servicii & Audiență SDT 2025) ───
export const SERVICES = [
  { slug: 'estetica',           name: 'Estetică & Smile Design',  tag: 'Smile Design',        icon: '✦', price: 'de la 7000€',  rate: false, audience: 'Top management, business, persoane publice' },
  { slug: 'terapie',            name: 'Terapie & Profilaxie',     tag: 'Fără durere',         icon: '◎', price: 'de la 25€',    rate: false, audience: '14–65 ani, toți pacienții' },
  { slug: 'chirurgie',          name: 'Chirurgie Orală',          tag: 'Ghid 3D',             icon: '⊕', price: 'de la 200€',   rate: false, audience: '25+ ani, cazuri complexe' },
  { slug: 'implantologie',      name: 'Implantologie 3D',         tag: 'Planificare 3D',      icon: '◈', price: 'de la 350€',   rate: true,  audience: '35+ ani, lipsa dinților, parodontită' },
  { slug: 'protetica',          name: 'Protetică CAD/CAM',        tag: 'Garanție pe viață',    icon: '◇', price: 'de la 200€',   rate: true,  audience: '36–65 ani, coroane, punți' },
  { slug: 'ortodontie',         name: 'Ortodonție Digitală',      tag: 'Aligners & Brackets',  icon: '◌', price: 'de la 1000€',  rate: true,  audience: '14+ ani, copii și părinți' },
  { slug: 'allon',              name: 'Dinți Ficși / All-On',     tag: 'Reabilitare completă', icon: '⬡', price: 'de la 2997€',  rate: true,  audience: '50+ ani, parodontită, proteze mobile' },
  { slug: 'consultatie-online', name: 'Consultație Online',       tag: 'Diaspora',             icon: '◉', price: 'de la 25€',    rate: false, audience: 'Diaspora: UK, Germania, Franța, USA' },
] as const

// ─── Campaign ───
export const CAMPAIGN_2026 = {
  slogan:   'ALEGE-TE PE TINE.',
  year:     '2026',
  product:  'Digital Check-Up',
  url:      'https://digital-checkup.smiledent.md',
} as const

// ─── Brand Ambassadors (from Marketing Board 2025) ───
export const AMBASSADORS = [
  { name: 'Dumitru Talmazan',   role: 'Fondator & CEO',           slug: 'talmazan' },
  { name: 'Nicoleta Adam',      role: 'Brand Ambassador',         slug: 'adam' },
  { name: 'Victoria Cosovan',   role: 'Brand Ambassador',         slug: 'cosovan' },
  { name: 'Valeriu Rașcu',      role: 'Brand Ambassador',         slug: 'rascu' },
  { name: 'Maria Marian',       role: 'Brand Ambassador',         slug: 'marian' },
  { name: 'Akord',              role: 'Muzician / Ambassador',    slug: 'akord' },
  { name: 'Daniel Malareu',     role: 'Brand Ambassador',         slug: 'malareu' },
  { name: 'Cristian Spătaru',   role: 'Brand Ambassador',         slug: 'spataru' },
  { name: 'Veronica Coberman',  role: 'Jurnalist / Ambassador',   slug: 'coberman' },
  { name: 'Elena Parpaut',      role: 'Brand Ambassador',         slug: 'parpaut' },
  { name: 'Dorin Galben',       role: 'Brand Ambassador',         slug: 'galben' },
  { name: 'Veronica Cociu',     role: 'TV Presenter / Ambassador',slug: 'cociu' },
] as const

// ─── Diaspora Markets (from Marketing Board) ───
export const DIASPORA = [
  { country: 'Germania',  population: '210.000', flag: '🇩🇪' },
  { country: 'Franța',    population: '95.000',  flag: '🇫🇷' },
  { country: 'UK & Irlanda', population: '90.000', flag: '🇬🇧' },
  { country: 'SUA',       population: '60.000',  flag: '🇺🇸' },
  { country: 'Spania',    population: '25.000',  flag: '🇪🇸' },
] as const

// ─── Image paths ───
export const IMAGES = {
  team:        '/images/team/team-photo.jpg',
  logo:        '/images/logo/logo.svg',
  logoWhite:   '/images/logo/logo-white.svg',
  ba1Before:   '/images/before-after/case1-before.jpg',
  ba1After:    '/images/before-after/case1-after.jpg',
} as const

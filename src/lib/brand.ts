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

// ─── Services (9 categories — ordered by business priority) ───
export const SERVICES = [
  { slug: 'implantologie',      name: 'Implant Dentar',            tag: 'Planificare 3D',       icon: '◈', price: 'de la 350€',   rate: true,  audience: '35+ ani, lipsa dinților, parodontită' },
  { slug: 'protetica',          name: 'Coroane Dentare',           tag: 'Garanție pe viață',    icon: '◇', price: 'de la 200€',   rate: true,  audience: '36–65 ani, coroane, punți' },
  { slug: 'allon',              name: 'Dinți Ficși / All-On',     tag: 'Reabilitare completă', icon: '⬡', price: 'de la 2997€',  rate: true,  audience: '50+ ani, parodontită, proteze mobile' },
  { slug: 'estetica',           name: 'Fațete Dentare',           tag: 'Smile Design',         icon: '✦', price: 'de la 7000€',  rate: false, audience: 'Top management, business, persoane publice' },
  { slug: 'ortodontie',         name: 'Ortodonție Digitală',      tag: 'Aligners & Brackets',  icon: '◌', price: 'de la 1000€',  rate: true,  audience: '14+ ani, copii și părinți' },
  { slug: 'digital-checkup',    name: 'Digital Check-Up',         tag: 'Evaluare completă',    icon: '◎', price: 'de la 25€',    rate: false, audience: 'Toți pacienții — primul pas' },
  { slug: 'terapie',            name: 'Terapie & Profilaxie',     tag: 'Fără durere',          icon: '◎', price: 'de la 25€',    rate: false, audience: '14–65 ani, toți pacienții' },
  { slug: 'chirurgie',          name: 'Chirurgie Orală',          tag: 'Ghid 3D',              icon: '⊕', price: 'de la 200€',   rate: false, audience: '25+ ani, cazuri complexe' },
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
  { name: 'Dumitru Talmazan',   role: 'Marketing & Business',     slug: 'talmazan',  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face', featured: true },
  { name: 'Nicoleta Adam',      role: 'Fashion & Lifestyle',      slug: 'adam',       photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face', featured: true },
  { name: 'Victoria Cosovan',   role: 'Profesor universitar',     slug: 'cosovan',    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face', featured: true },
  { name: 'Valeriu Rașcu',      role: 'Influencer & Creator',     slug: 'rascu',      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face', featured: true },
  { name: 'Maria Marian',       role: 'Antreprenor',              slug: 'marian',     photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face', featured: true },
  { name: 'Akord',              role: 'Muzician',                 slug: 'akord',      photo: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=300&h=300&fit=crop&crop=face', featured: true },
  { name: 'Daniel Malareu',     role: 'Sport & Fitness',          slug: 'malareu',    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face', featured: false },
  { name: 'Cristian Spătaru',   role: 'IT & Tech',                slug: 'spataru',    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face', featured: false },
  { name: 'Veronica Coberman',  role: 'Jurnalism & Media',        slug: 'coberman',   photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face', featured: false },
  { name: 'Elena Parpaut',      role: 'Medicină & Sănătate',      slug: 'parpaut',    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face', featured: false },
  { name: 'Dorin Galben',       role: 'HoReCa & Gastronomie',     slug: 'galben',     photo: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=300&h=300&fit=crop&crop=face', featured: false },
  { name: 'Veronica Cociu',     role: 'TV & Entertainment',       slug: 'cociu',      photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&crop=face', featured: false },
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

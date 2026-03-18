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

// ─── Site Stats (from digital-checkup.smiledent.md) ───
export const STATS = {
  years:     '15',
  patients:  '40.000+',
  team:      '600+',
  locations: '9',
} as const

// ─── Locations ───
export const LOCATIONS = [
  { city: 'Chișinău, Centru',  address: 'str. Ismail 88',        phone: '+373 22 881 414' },
  { city: 'Chișinău, Râșcani', address: 'Bd. Moscova 17/A',      phone: '+373 22 011 061' },
  { city: 'Iași',              address: 'str. Arcu 18',           phone: '+40 33 240 2505' },
  { city: 'București',         address: 'str. G. Puccini 8A',     phone: '+40 31 433 7004' },
] as const

// ─── Services ───
export const SERVICES = [
  { slug: 'estetica',      name: 'Estetică & Smile Design',  tag: 'Smile Design',     icon: '✦' },
  { slug: 'terapie',       name: 'Terapie & Profilaxie',     tag: 'Fără durere',      icon: '◎' },
  { slug: 'chirurgie',     name: 'Chirurgie Orală',          tag: 'Ghid 3D',          icon: '⊕' },
  { slug: 'implantologie', name: 'Implantologie 3D',         tag: 'Planificare 3D',   icon: '◈' },
  { slug: 'protetica',     name: 'Protetică CAD/CAM',        tag: 'Garanție pe viață',icon: '◇' },
  { slug: 'ortodontie',    name: 'Ortodonție Digitală',      tag: 'Digital',          icon: '◌' },
] as const

// ─── Campaign ───
export const CAMPAIGN_2026 = {
  slogan:   'ALEGE-TE PE TINE.',
  year:     '2026',
  product:  'Digital Check-Up',
  url:      'https://digital-checkup.smiledent.md',
} as const

// ─── Image paths ───
// Local (in /public/images/):  use '/images/...'
// Cloudinary:                  use full URL
export const IMAGES = {
  team:        '/images/team/team-photo.jpg',
  logo:        '/images/logo/logo.svg',
  logoWhite:   '/images/logo/logo-white.svg',
  // Before/after — replace with Cloudinary URLs when available
  ba1Before:   '/images/before-after/case1-before.jpg',
  ba1After:    '/images/before-after/case1-after.jpg',
} as const

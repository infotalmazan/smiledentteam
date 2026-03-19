// ─── Blog Data — Single source of truth for all blog content ───
// Structured for maximum SEO + AI indexing value

export type BlogCategory = 'specialitate' | 'podcast' | 'serial' | 'presa' | 'cazuri' | 'ghid'

export interface BlogArticle {
  slug: string
  title: string
  // SEO fields
  metaTitle: string        // <title> tag — max 60 chars
  metaDescription: string  // <meta description> — max 155 chars
  // Content
  category: BlogCategory
  excerpt: string          // Short preview (2-3 sentences)
  content: string[]        // Paragraphs for article body
  // Rich data
  author: { name: string; role: string; photo: string }
  date: string             // ISO date
  readTime: string
  image: string
  tags: string[]
  // SEO structured data
  faq?: { q: string; a: string }[]  // FAQ schema markup
  // Engagement
  featured: boolean
  views?: string
  // Media
  videoUrl?: string        // YouTube embed for podcast/serial
  audioUrl?: string        // Podcast audio
  episodeNumber?: number   // For serial/podcast
}

export const BLOG_CATEGORIES: { id: BlogCategory; name: string; desc: string; icon: string; color: string }[] = [
  { id: 'specialitate', name: 'Articole de specialitate', desc: 'Ghiduri detaliate scrise de medici stomatologi', icon: 'FileText', color: '#0a6b5c' },
  { id: 'podcast', name: 'Podcast SDT', desc: 'Conversatii cu specialisti despre sanatatea orala', icon: 'Headphones', color: '#e8157a' },
  { id: 'serial', name: 'Serial Video', desc: 'Documentare si serii educationale despre tratamente', icon: 'Video', color: '#2563EB' },
  { id: 'presa', name: 'In presa', desc: 'Mentiuni, interviuri si aparitii media', icon: 'Newspaper', color: '#D97706' },
  { id: 'cazuri', name: 'Cazuri clinice', desc: 'Transformari reale cu inainte si dupa', icon: 'Heart', color: '#DC2626' },
  { id: 'ghid', name: 'Ghiduri pacient', desc: 'Tot ce trebuie sa stii inainte de tratament', icon: 'BookOpen', color: '#059669' },
]

export const BLOG_AUTHORS = {
  talmazan: { name: 'Dr. Dumitru Talmazan', role: 'Fondator & CEO', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
  rusu: { name: 'Dr. Elena Rusu', role: 'Medic Stomatolog', photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face' },
  moraru: { name: 'Dr. Andrei Moraru', role: 'Chirurg Oral', photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face' },
  cebotari: { name: 'Dr. Marina Cebotari', role: 'Ortodont', photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face' },
  editorial: { name: 'Echipa SDT', role: 'Redactia', photo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop&crop=face' },
}

const A = BLOG_AUTHORS

export const BLOG_ARTICLES: BlogArticle[] = [
  // ─── SPECIALITATE ───
  {
    slug: 'implant-dentar-ghid-complet-2026',
    title: 'Implant dentar in 2026: Ghid complet — de la diagnostic la zambet',
    metaTitle: 'Implant Dentar 2026: Ghid Complet | Smile Dent Team',
    metaDescription: 'Tot ce trebuie sa stii despre implanturile dentare in 2026. Pret, procedura, recuperare, riscuri si beneficii. Ghid scris de medici implantologi.',
    category: 'specialitate',
    excerpt: 'Implantologia dentara a evoluat dramatic in ultimii ani. Ghidul nostru complet acopera totul: de la evaluarea initiala si planificarea 3D, pana la procedura propriu-zisa si ingrijirea post-operatorie.',
    content: [
      'Implantul dentar este considerata cea mai avansata solutie pentru inlocuirea dintilor lipsa. In 2026, procedura a devenit mai rapida, mai precisa si mai confortabila decat oricand, datorita tehnologiilor digitale.',
      'La Smile Dent Team, fiecare implant este planificat digital folosind tomografie 3D CBCT si ghiduri chirurgicale tiparite 3D. Aceasta abordare garanteaza o precizie de 0.2mm in pozitionarea implantului.',
      'Procedura dureaza intre 30-60 minute per implant si se realizeaza sub anestezie locala. Pacientul nu simte durere in timpul interventiei, iar disconfortul post-operator este minimal.',
      'Recuperarea completa dureaza 3-6 luni, perioada in care implantul se integreaza in os (osteointegrare). In aceasta perioada, pacientul poarta o proteza provizorie estetica.',
      'Costul unui implant dentar la SDT porneste de la 350€ si include: consultatie, planificare 3D, implant Straumann/Nobel Biocare, interventie chirurgicala ghidata si controale post-operatorii.',
    ],
    author: A.moraru,
    date: '2026-03-15',
    readTime: '12 min',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=450&fit=crop',
    tags: ['implant dentar', 'implantologie', 'ghid complet', 'pret implant', 'recuperare implant'],
    featured: true,
    views: '4.2K',
    faq: [
      { q: 'Cat costa un implant dentar?', a: 'Pretul unui implant dentar la SDT porneste de la 350€. Pretul final depinde de complexitatea cazului, tipul implantului si necesitatea interventiilor suplimentare (augmentare osoasa, sinus lifting).' },
      { q: 'Este dureros implantul dentar?', a: 'Nu. Procedura se realizeaza sub anestezie locala si nu simtiti durere. Disconfortul post-operator este de obicei usor si gestionabil cu analgezice obisnuite timp de 2-3 zile.' },
      { q: 'Cat dureaza recuperarea?', a: 'Osteointegrarea completa dureaza 3-6 luni. In aceasta perioada purtati o proteza provizorie estetica. Revenirea la activitatile normale este posibila in 24-48 ore.' },
    ],
  },
  {
    slug: 'fatete-dentare-smile-design-digital',
    title: 'Fatete dentare cu Digital Smile Design: cum arata procesul complet',
    metaTitle: 'Fatete Dentare cu Smile Design Digital | Smile Dent Team',
    metaDescription: 'Descoperiti procesul complet al fatetelor dentare cu Digital Smile Design. Simulare 3D, materiale premium, rezultate garantate. De la 7000€.',
    category: 'specialitate',
    excerpt: 'Fatetele dentare cu Digital Smile Design iti permit sa vezi rezultatul final inainte de a incepe tratamentul. Afla cum functioneaza procesul complet, de la prima consultatie pana la zambetul perfect.',
    content: [
      'Digital Smile Design (DSD) revolutioneaza estetica dentara. Aceasta tehnologie permite proiectarea zambetului ideal bazat pe proportiile faciale, simetria si preferintele personale ale pacientului.',
      'Procesul incepe cu o sedinta foto si video completa, urmata de scanare 3D. Datele sunt procesate in software-ul DSD pentru a crea o simulare fotorealista a viitorului zambet.',
      'Pacientul approba designul inainte de orice interventie. Apoi, un mock-up fizic (proba) este realizat in gura pacientului — puteti vedea si simti rezultatul final inainte de a lua decizia.',
      'Fatetele sunt fabricate din ceramica premium E-max sau zirconiu, materiale biocompatibile cu durabilitate de peste 15 ani. Procedura de aplicare dureaza 2-3 sedinte.',
    ],
    author: A.rusu,
    date: '2026-03-10',
    readTime: '9 min',
    image: 'https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?w=800&h=450&fit=crop',
    tags: ['fatete dentare', 'smile design', 'estetica dentara', 'ceramica E-max', 'zambet perfect'],
    featured: true,
    views: '3.1K',
  },
  {
    slug: 'ortodontie-invizibila-invisalign-vs-brackets',
    title: 'Ortodontie invizibila: Invisalign vs. brackets — ce sa alegi in 2026',
    metaTitle: 'Invisalign vs Brackets 2026: Comparatie Completa | SDT',
    metaDescription: 'Invisalign sau brackets? Comparatie detaliata: pret, durata, confort, rezultate. Ghid pentru adulti si adolescenti de la ortodontii SDT.',
    category: 'specialitate',
    excerpt: 'Alegerea intre Invisalign si brackets depinde de mai multi factori. Ortodontii nostri compara cele doua optiuni din toate perspectivele pentru a te ajuta sa iei cea mai buna decizie.',
    content: [
      'Ortodontia digitala a facut pasii uriasi in ultimii ani. Astazi, atat Invisalign cat si brackets-urile moderne ofera rezultate excelente, dar cu experienti diferite pentru pacient.',
      'Invisalign foloseste aliniere transparente, aproape invizibile, care se schimba la fiecare 1-2 saptamani. Brackets-urile moderne sunt mai mici si mai discrete decat in trecut.',
      'Pretul Invisalign la SDT porneste de la 1000€, iar brackets-urile de la 800€. Durata tratamentului variaza intre 6-24 luni, in functie de complexitatea cazului.',
    ],
    author: A.cebotari,
    date: '2026-03-05',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&h=450&fit=crop',
    tags: ['ortodontie', 'invisalign', 'brackets', 'aliniere dentara', 'ortodont chisinau'],
    featured: false,
    views: '2.8K',
    faq: [
      { q: 'Cat costa Invisalign?', a: 'Pretul Invisalign la SDT porneste de la 1000€ si include consultatie, scanare 3D, simulare ClinCheck, toate seturile de aliniere si controale lunare.' },
      { q: 'Cat dureaza tratamentul ortodontic?', a: 'Durata depinde de complexitate: cazuri usoare 6-12 luni, medii 12-18 luni, complexe pana la 24 luni. Simularea ClinCheck estimeaza durata exacta inainte de a incepe.' },
    ],
  },
  // ─── PODCAST ───
  {
    slug: 'podcast-ep1-frica-de-dentist',
    title: 'Podcast SDT Ep.1: Cum depasesti frica de dentist — sfaturi practice',
    metaTitle: 'Podcast: Frica de Dentist — Cum o Depasesti | SDT Ep.1',
    metaDescription: 'Primul episod din podcastul Smile Dent Team. Dr. Talmazan discuta despre fobia dentara, cauze, solutii si cum clinica ajuta pacientii anxiosi.',
    category: 'podcast',
    excerpt: 'In primul episod al podcastului SDT, Dr. Dumitru Talmazan discuta deschis despre una dintre cele mai frecvente probleme: frica de dentist. Cauze, solutii si cum echipa SDT ajuta pacientii anxiosi.',
    content: [
      'Fobia dentara afecteaza aproximativ 36% din populatie. Aproximativ 12% au o frica severa care ii impiedica sa viziteze stomatologul, chiar si in situatii de urgenta.',
      'La SDT, am dezvoltat un protocol special pentru pacientii anxiosi: comunicare transparenta la fiecare pas, anestezie moderna fara durere, sedare constienta pentru cazuri complexe.',
      'In acest episod, Dr. Talmazan impartaseste povesti reale ale pacientilor care au depasit fobia si sfaturi practice pentru a face din vizita la dentist o experienta confortabila.',
    ],
    author: A.talmazan,
    date: '2026-02-28',
    readTime: '35 min',
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=450&fit=crop',
    tags: ['podcast', 'frica de dentist', 'fobie dentara', 'sedare constienta', 'sfaturi dentist'],
    featured: true,
    views: '6.1K',
    videoUrl: 'https://youtube.com/watch?v=example1',
    episodeNumber: 1,
  },
  {
    slug: 'podcast-ep2-digital-checkup-explicat',
    title: 'Podcast SDT Ep.2: Digital Check-Up explicat — ce include si de ce conteaza',
    metaTitle: 'Podcast: Digital Check-Up Explicat | SDT Ep.2',
    metaDescription: 'Episodul 2: Ce este Digital Check-Up, ce include scanarea 3D, cum se face planul digital si de ce este primul pas catre un zambet sanatos.',
    category: 'podcast',
    excerpt: 'Dr. Talmazan explica pas cu pas ce presupune Digital Check-Up-ul la SDT: scanare 3D, tomografie CBCT, analiza digitala si planul personalizat de tratament.',
    content: [
      'Digital Check-Up este produsul nostru flagship — primul pas pe care il recomandam fiecarui pacient, indiferent de motivul vizitei.',
      'Include: protocol fotografic complet, scanare intraorala 3Shape Trios, tomografie 3D CBCT (daca este necesar), analiza digitala si plan de tratament personalizat discutat cu medicul.',
    ],
    author: A.talmazan,
    date: '2026-02-21',
    readTime: '28 min',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=450&fit=crop',
    tags: ['podcast', 'digital check-up', 'scanare 3D', 'consultatie dentara', 'diagnostic digital'],
    featured: false,
    views: '4.5K',
    videoUrl: 'https://youtube.com/watch?v=example2',
    episodeNumber: 2,
  },
  // ─── SERIAL VIDEO ───
  {
    slug: 'serial-ep1-o-zi-la-sdt',
    title: 'Serial SDT Ep.1: O zi la Smile Dent Team — behind the scenes',
    metaTitle: 'Serial Video: O Zi la SDT — Behind the Scenes | Ep.1',
    metaDescription: 'Primul episod din serialul documentar SDT. Urmariti o zi completa din viata clinicii: de la prima consultatie la ultima interventie.',
    category: 'serial',
    excerpt: 'Urmariti o zi completa din viata Smile Dent Team. De la deschiderea clinicii la 8 dimineata, prin consultatii si interventii, pana la ultimul pacient — o privire autentica in spatele scenei.',
    content: [
      'Serialul documentar "Inside SDT" ofera o perspectiva unica asupra functionarii unei clinici stomatologice moderne.',
      'In primul episod, camera urmareste echipa de la prima scanare 3D a zilei pana la ultima coroana cimentata. Fiecare pacient, fiecare procedura, fiecare zambet — documentat autentic.',
    ],
    author: A.editorial,
    date: '2026-03-01',
    readTime: '18 min',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=450&fit=crop',
    tags: ['serial video', 'behind the scenes', 'clinica dentara', 'documentar', 'echipa medicala'],
    featured: false,
    views: '8.3K',
    videoUrl: 'https://youtube.com/watch?v=example3',
    episodeNumber: 1,
  },
  // ─── PRESA ───
  {
    slug: 'interviu-talmazan-forbes-moldova',
    title: 'Forbes Moldova: Dumitru Talmazan — "Am transformat o clinica in retea internationala"',
    metaTitle: 'Interviu Forbes: Talmazan despre SDT | Smile Dent Team',
    metaDescription: 'Interviul fondatorului SDT in Forbes Moldova. Cum a crescut Smile Dent Team de la o clinica cu 8 angajati la o retea cu 600+ specialisti in 4 tari.',
    category: 'presa',
    excerpt: 'Intr-un interviu acordat Forbes Moldova, Dumitru Talmazan povesteste cum a construit Smile Dent Team: de la prima clinica in 2009 la o retea internationala cu 9 filiale.',
    content: [
      'Interviul acopera parcursul de 15 ani al companiei, deciziile strategice cheie si viziunea pentru 2030.',
      'Talmazan dezvaluie investitiile in tehnologie (peste €2M in echipamente), strategia de expansiune internationala si filozofia "pacientul pe primul loc".',
    ],
    author: A.editorial,
    date: '2026-02-15',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop',
    tags: ['forbes', 'interviu', 'dumitru talmazan', 'antreprenoriat', 'stomatologie moldova'],
    featured: true,
    views: '12.4K',
  },
  {
    slug: 'sdt-premiul-excelenta-digitala-2025',
    title: 'Smile Dent Team castiga premiul "Excelenta in Stomatologie Digitala 2025"',
    metaTitle: 'SDT — Premiul Excelenta Digitala 2025 | Smile Dent Team',
    metaDescription: 'Smile Dent Team a fost premiata pentru excelenta in stomatologie digitala la gala anuala a industriei dentare din Europa de Est.',
    category: 'presa',
    excerpt: 'Smile Dent Team a fost premiata cu distinctia "Excelenta in Stomatologie Digitala" la gala anuala a industriei dentare din Europa de Est, recunoscand investitiile in tehnologie si inovatie.',
    content: [
      'Premiul recunoaste investitia continua a SDT in digitalizare: scanner 3Shape Trios 5, planificare computerizata, ghiduri chirurgicale 3D si flux digital complet.',
      'Juriul a apreciat in mod special programul Digital Check-Up si integrarea AI in diagnostica preventiva.',
    ],
    author: A.editorial,
    date: '2026-01-20',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=450&fit=crop',
    tags: ['premiu', 'excelenta', 'stomatologie digitala', 'recunoastere', 'award'],
    featured: false,
    views: '5.7K',
  },
  // ─── CAZURI CLINICE ───
  {
    slug: 'caz-clinic-all-on-4-reabilitare-completa',
    title: 'Caz clinic: Reabilitare completa All-on-4 — de la edentatie la zambet fix',
    metaTitle: 'Caz Clinic All-on-4: Reabilitare Completa | SDT',
    metaDescription: 'Caz real de reabilitare completa cu All-on-4 la SDT. Pacient 58 ani, edentatie totala. Rezultat: arcada completa fixa in 24 ore. Inainte si dupa.',
    category: 'cazuri',
    excerpt: 'Domnul Gheorghe, 58 ani, a venit la SDT cu edentatie totala superioara si purtand o proteza mobila de 12 ani. Dupa o planificare digitala completa, a primit o arcada fixa pe 4 implanturi in 24 de ore.',
    content: [
      'Pacientul s-a prezentat cu edentatie totala superioara si atrofie osoasa moderata. Proteza mobila pe care o purta de 12 ani ii cauza disconfort si ii afecta calitatea vietii.',
      'Planificarea a inclus tomografie CBCT 3D, simulare pozitionare implanturi, ghid chirurgical tiparit 3D. Interventia a durat 2 ore sub sedare constienta.',
      'La 24 de ore dupa interventie, pacientul a primit proteza provizorie fixa. Dupa 4 luni de osteointegrare, proteza finala din zirconiu a fost cimentata.',
      'Rezultat: zambet complet, natural, fix — pacientul mananca, vorbeste si zambeste fara restrictii. Controlul la 1 an confirma integrarea perfecta a tuturor celor 4 implanturi.',
    ],
    author: A.moraru,
    date: '2026-02-10',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=800&h=450&fit=crop',
    tags: ['all-on-4', 'caz clinic', 'reabilitare', 'implanturi', 'inainte dupa', 'edentatie'],
    featured: false,
    views: '3.9K',
  },
  // ─── GHIDURI PACIENT ───
  {
    slug: 'ghid-inainte-de-vizita-la-dentist',
    title: 'Ce trebuie sa stii inainte de prima vizita la stomatolog — ghid complet',
    metaTitle: 'Prima Vizita la Dentist: Ghid Complet | Smile Dent Team',
    metaDescription: 'Ghid complet pentru prima vizita la stomatolog. Ce documente, cum te pregatesti, ce sa intrebi, cat dureaza. Sfaturi de la echipa SDT.',
    category: 'ghid',
    excerpt: 'Prima vizita la stomatolog poate genera anxietate. Acest ghid complet iti spune exact la ce sa te astepti: de la documentele necesare, la intrebarile pe care sa le pui medicului.',
    content: [
      'Prima vizita la SDT incepe cu Digital Check-Up: o evaluare completa, digitala si fara durere. Nu este nevoie de documente speciale — doar o programare si dorinta de a avea grija de sanatatea ta.',
      'In timpul consultatiei (30-45 minute), medicul va realiza o scanare 3D, va analiza starea dentara si va discuta cu tine planul de tratament recomandat, cu preturi transparente.',
      'Sfaturi: vino cu 10 minute inainte, informeaza medicul despre alergii sau medicatia curenta, nu ezita sa pui intrebari. Consultatia initiala la SDT este GRATUITA.',
    ],
    author: A.rusu,
    date: '2026-03-12',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=450&fit=crop',
    tags: ['ghid pacient', 'prima vizita', 'consultatie dentara', 'sfaturi', 'ce sa intrebi dentistul'],
    featured: false,
    views: '7.2K',
    faq: [
      { q: 'Cat dureaza prima consultatie?', a: '30-45 minute. Include examinare clinica, scanare 3D si discutie despre planul de tratament.' },
      { q: 'Costa ceva prima consultatie?', a: 'Consultatia initiala cu Digital Check-Up la SDT este GRATUITA. Nu exista obligatii sau costuri ascunse.' },
      { q: 'Trebuie sa vin cu documente?', a: 'Nu sunt necesare documente speciale. Daca ai radiografii recente sau un istoric medical, le poti aduce, dar nu este obligatoriu.' },
    ],
  },
  {
    slug: 'ghid-igiena-orala-zilnica-2026',
    title: 'Igiena orala zilnica: ghidul complet pentru 2026 — tehnici, produse, greseli',
    metaTitle: 'Igiena Orala 2026: Ghid Complet Zilnic | SDT',
    metaDescription: 'Ghid complet de igiena orala: periaj corect, ata dentara, apa de gura, alimentatie. Greseli frecvente si sfaturi de la stomatologi SDT.',
    category: 'ghid',
    excerpt: 'Igiena orala corecta previne 90% din problemele dentare. Ghidul nostru complet acopera: tehnica de periaj, alegerea periutei, ata dentara, apa de gura si alimentele care protejeaza dintii.',
    content: [
      'Periajul corect dureaza minim 2 minute, de 2 ori pe zi. Folositi o periuta electrica cu cap rotund si pasta cu fluor (1000-1500 ppm pentru adulti).',
      'Ata dentara se foloseste cel putin o data pe zi, preferabil seara. Alternativa: irigatorul oral (waterpik) — mai eficient si mai confortabil.',
      'Vizita de control la stomatolog: o data la 6 luni. Igienizarea profesionala (detartraj + periaj profesional) este recomandata de 2 ori pe an.',
    ],
    author: A.rusu,
    date: '2026-03-08',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&h=450&fit=crop',
    tags: ['igiena orala', 'periaj dentar', 'prevenire', 'ata dentara', 'sfaturi stomatolog'],
    featured: false,
    views: '9.1K',
  },
]

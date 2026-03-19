// ─── Cabinet Mock Data — Patient Admin Panel ───

export const PATIENT = {
  id: 'p-001',
  name: 'Alexandru Moraru',
  firstName: 'Alexandru',
  code: 'SDT-2024-7842',
  phone: '+373 69 123 456',
  email: 'alexandru.m@gmail.com',
  location: 'Chisinau, Centru',
  doctor: 'Dr. Elena Rusu',
  doctorSpecialty: 'Medic Stomatolog',
  since: '2023',
  dob: '1984-05-12',
  age: 41,
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  bloodType: 'A+',
  allergies: 'Niciuna cunoscuta',
  insurance: 'CNAM Moldova',
  language: 'ro',
  preferredClinic: 'Chisinau, Centru',
}

export type FamilyMember = {
  id: string; name: string; firstName: string; relation: string
  age: number; dob: string; photo: string
  doctor: string; lastVisit: string; nextVisit?: string
  activeConditions: string[]; healthStatus: 'green' | 'yellow' | 'red'
  healthNote: string; treatmentsActive: number
}

export const FAMILY: FamilyMember[] = [
  {
    id: 'f-001', name: 'Ana Moraru', firstName: 'Ana', relation: 'Sotie',
    age: 38, dob: '1988-09-22',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    doctor: 'Dr. Elena Rusu', lastVisit: '15 Feb 2026', nextVisit: '20 Apr 2026',
    activeConditions: ['Ortodontie — Invisalign (luna 8/14)'],
    healthStatus: 'green', healthNote: 'Tratament in curs, evolutie excelenta',
    treatmentsActive: 1,
  },
  {
    id: 'f-002', name: 'David Moraru', firstName: 'David', relation: 'Fiu',
    age: 14, dob: '2012-03-15',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    doctor: 'Dr. Marina Cebotari', lastVisit: '5 Ian 2026', nextVisit: undefined,
    activeConditions: [],
    healthStatus: 'yellow', healthNote: 'Control periodic necesar (6+ luni de la ultima vizita)',
    treatmentsActive: 0,
  },
  {
    id: 'f-003', name: 'Sofia Moraru', firstName: 'Sofia', relation: 'Fiica',
    age: 8, dob: '2018-11-08',
    photo: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=100&h=100&fit=crop&crop=face',
    doctor: 'Dr. Elena Rusu', lastVisit: '28 Feb 2026', nextVisit: '28 Aug 2026',
    activeConditions: ['Sigilare molari permanenti'],
    healthStatus: 'green', healthNote: 'Sanatate dentara excelenta, control la 6 luni',
    treatmentsActive: 1,
  },
]

export type Appointment = {
  id: string; date: string; time: string; service: string
  doctor: string; doctorPhoto: string; location: string
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
  notes?: string; duration: string; instructions?: string[]
  forMember?: string // family member name
}

export const APPOINTMENTS: Appointment[] = [
  // Future
  { id: 'a-01', date: '24 Mar 2026', time: '10:00', service: 'Control periodic + igienizare', doctor: 'Dr. Elena Rusu', doctorPhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=60&h=60&fit=crop&crop=face', location: 'Chisinau, Centru', status: 'confirmed', duration: '45 min', instructions: ['Nu mancati cu 2 ore inainte', 'Aduceti cardul de asigurare'], notes: 'Control semestrial + detartraj' },
  { id: 'a-02', date: '15 Apr 2026', time: '14:30', service: 'Coroana zirconiu — cimentare finala', doctor: 'Dr. Andrei Moraru', doctorPhoto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=60&h=60&fit=crop&crop=face', location: 'Chisinau, Centru', status: 'pending', duration: '30 min', notes: 'Cimentare definitiva coroana #15' },
  { id: 'a-03', date: '20 Apr 2026', time: '09:00', service: 'Ortodontie — control Invisalign', doctor: 'Dr. Marina Cebotari', doctorPhoto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&crop=face', location: 'Chisinau, Rascani', status: 'confirmed', duration: '20 min', forMember: 'Ana Moraru', notes: 'Schimbare set aliniere #8' },
  { id: 'a-04', date: '10 Mai 2026', time: '11:00', service: 'Control periodic copil', doctor: 'Dr. Elena Rusu', doctorPhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=60&h=60&fit=crop&crop=face', location: 'Chisinau, Centru', status: 'pending', duration: '30 min', forMember: 'Sofia Moraru' },
  // Past
  { id: 'a-05', date: '10 Feb 2026', time: '09:30', service: 'Digital Check-Up complet', doctor: 'Dr. Elena Rusu', doctorPhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=60&h=60&fit=crop&crop=face', location: 'Chisinau, Centru', status: 'completed', duration: '45 min' },
  { id: 'a-06', date: '18 Feb 2026', time: '14:00', service: 'Preparare dinte #15 + coroana temporara', doctor: 'Dr. Andrei Moraru', doctorPhoto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=60&h=60&fit=crop&crop=face', location: 'Chisinau, Centru', status: 'completed', duration: '60 min' },
  { id: 'a-07', date: '25 Ian 2026', time: '10:00', service: 'Detartraj + igienizare profesionala', doctor: 'Dr. Elena Rusu', doctorPhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=60&h=60&fit=crop&crop=face', location: 'Chisinau, Centru', status: 'completed', duration: '40 min' },
  { id: 'a-08', date: '15 Dec 2025', time: '11:00', service: 'Consultatie initiala', doctor: 'Dr. Elena Rusu', doctorPhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=60&h=60&fit=crop&crop=face', location: 'Chisinau, Centru', status: 'completed', duration: '30 min' },
  { id: 'a-09', date: '20 Nov 2025', time: '15:00', service: 'Obturatie compozit #24', doctor: 'Dr. Elena Rusu', doctorPhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=60&h=60&fit=crop&crop=face', location: 'Chisinau, Centru', status: 'completed', duration: '45 min' },
  { id: 'a-10', date: '5 Oct 2025', time: '09:00', service: 'Radiografie panoramica', doctor: 'Dr. Elena Rusu', doctorPhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=60&h=60&fit=crop&crop=face', location: 'Chisinau, Centru', status: 'completed', duration: '15 min' },
]

export type TreatmentStep = {
  name: string; status: 'done' | 'current' | 'upcoming'; date?: string; doctor?: string
}

export type Treatment = {
  id: string; name: string; doctor: string; status: 'active' | 'completed' | 'planned'
  startDate: string; endDate?: string; steps: TreatmentStep[]
  totalCost: number; paid: number; documents: string[]
  notes: string; tooth?: string
}

export const TREATMENTS: Treatment[] = [
  {
    id: 't-01', name: 'Coroana zirconiu dinte #15', doctor: 'Dr. Andrei Moraru', status: 'active',
    startDate: '10 Feb 2026', steps: [
      { name: 'Digital Check-Up', status: 'done', date: '10 Feb 2026', doctor: 'Dr. Elena Rusu' },
      { name: 'Scanare 3D + amprenta digitala', status: 'done', date: '10 Feb 2026' },
      { name: 'Preparare dinte + coroana temporara', status: 'done', date: '18 Feb 2026', doctor: 'Dr. Andrei Moraru' },
      { name: 'Design CAD + fabricare', status: 'done', date: '25 Feb 2026' },
      { name: 'Cimentare coroana definitiva', status: 'current', date: '15 Apr 2026', doctor: 'Dr. Andrei Moraru' },
    ],
    totalCost: 250, paid: 150, documents: ['Plan tratament #15', 'Scanare intraorala', 'Design CAD coroana'],
    notes: 'Coroana zirconiu monolitic Ivoclar, shade A2. Cimentare planificata 15 Apr.', tooth: '#15',
  },
  {
    id: 't-02', name: 'Obturatie compozit dinte #24', doctor: 'Dr. Elena Rusu', status: 'completed',
    startDate: '20 Nov 2025', endDate: '20 Nov 2025', steps: [
      { name: 'Consultatie + diagnostic', status: 'done', date: '20 Nov 2025' },
      { name: 'Obturatie compozit directa', status: 'done', date: '20 Nov 2025' },
    ],
    totalCost: 80, paid: 80, documents: ['Radiografie periapicala #24'],
    notes: 'Carie medie ocluzala. Obturatie compozit fotopolimerizabil.', tooth: '#24',
  },
  {
    id: 't-03', name: 'Igienizare profesionala (semestrial)', doctor: 'Dr. Elena Rusu', status: 'active',
    startDate: '25 Ian 2026', steps: [
      { name: 'Detartraj ultrasonic', status: 'done', date: '25 Ian 2026' },
      { name: 'Periaj profesional + fluorizare', status: 'done', date: '25 Ian 2026' },
      { name: 'Control la 6 luni', status: 'upcoming', date: '24 Mar 2026' },
    ],
    totalCost: 50, paid: 50, documents: [],
    notes: 'Igienizare de rutina. Urmatorul control: 24 Mar 2026.',
  },
  {
    id: 't-04', name: 'Ortodontie Invisalign — Ana', doctor: 'Dr. Marina Cebotari', status: 'active',
    startDate: '15 Aug 2025', steps: [
      { name: 'Consultatie + scanare ClinCheck', status: 'done', date: '15 Aug 2025' },
      { name: 'Aprobare plan + comanda aliniere', status: 'done', date: '25 Aug 2025' },
      { name: 'Seturile 1-4 (lunile 1-4)', status: 'done', date: 'Aug-Nov 2025' },
      { name: 'Seturile 5-8 (lunile 5-8)', status: 'current', date: 'Dec 2025-Mar 2026' },
      { name: 'Seturile 9-14 (lunile 9-14)', status: 'upcoming', date: 'Apr-Sep 2026' },
      { name: 'Retainer + control final', status: 'upcoming', date: 'Oct 2026' },
    ],
    totalCost: 1200, paid: 800, documents: ['Plan ClinCheck', 'Scanare initiala'],
    notes: 'Invisalign Comprehensive, 14 seturi. Pacient: Ana Moraru. Evolutie excelenta.',
  },
  {
    id: 't-05', name: 'Sigilare molari — Sofia', doctor: 'Dr. Elena Rusu', status: 'completed',
    startDate: '28 Feb 2026', endDate: '28 Feb 2026', steps: [
      { name: 'Examinare + curatare dinti', status: 'done', date: '28 Feb 2026' },
      { name: 'Sigilare 4 molari permanenti', status: 'done', date: '28 Feb 2026' },
    ],
    totalCost: 60, paid: 60, documents: [],
    notes: 'Sigilarea preventiva a celor 4 molari permanenti. Pacient: Sofia Moraru.',
  },
]

export type DocItem = {
  id: string; name: string; date: string; type: 'PDF' | 'DICOM' | '3D' | 'IMG' | 'FACTURA' | 'RETETA'
  category: 'tomografie' | 'scanare' | 'radiografie' | 'plan' | 'factura' | 'reteta'
  size: string; treatment?: string
}

export const DOCUMENTS: DocItem[] = [
  { id: 'd-01', name: 'Plan tratament — Coroana #15', date: '10 Feb 2026', type: 'PDF', category: 'plan', size: '2.4 MB', treatment: 't-01' },
  { id: 'd-02', name: 'Tomografie 3D CBCT', date: '10 Feb 2026', type: 'DICOM', category: 'tomografie', size: '156 MB', treatment: 't-01' },
  { id: 'd-03', name: 'Scanare intraorala 3Shape', date: '10 Feb 2026', type: '3D', category: 'scanare', size: '84 MB', treatment: 't-01' },
  { id: 'd-04', name: 'Design CAD coroana #15', date: '25 Feb 2026', type: '3D', category: 'scanare', size: '12 MB', treatment: 't-01' },
  { id: 'd-05', name: 'Radiografie panoramica', date: '5 Oct 2025', type: 'IMG', category: 'radiografie', size: '8.2 MB' },
  { id: 'd-06', name: 'Radiografie periapicala #24', date: '20 Nov 2025', type: 'IMG', category: 'radiografie', size: '3.1 MB', treatment: 't-02' },
  { id: 'd-07', name: 'Plan ClinCheck — Ana', date: '25 Aug 2025', type: 'PDF', category: 'plan', size: '5.6 MB', treatment: 't-04' },
  { id: 'd-08', name: 'Factura #SDT-2026-041', date: '18 Feb 2026', type: 'FACTURA', category: 'factura', size: '0.3 MB' },
  { id: 'd-09', name: 'Factura #SDT-2026-028', date: '25 Ian 2026', type: 'FACTURA', category: 'factura', size: '0.2 MB' },
  { id: 'd-10', name: 'Factura #SDT-2025-215', date: '20 Nov 2025', type: 'FACTURA', category: 'factura', size: '0.2 MB' },
  { id: 'd-11', name: 'Reteta — antibiotic post-extractie', date: '18 Feb 2026', type: 'RETETA', category: 'reteta', size: '0.1 MB' },
  { id: 'd-12', name: 'Scanare initiala — Ana Invisalign', date: '15 Aug 2025', type: '3D', category: 'scanare', size: '92 MB', treatment: 't-04' },
]

export type ChatMessage = {
  id: string; from: 'patient' | 'doctor'; text: string; time: string; date: string; read: boolean
  attachment?: { name: string; type: string }
}

export type Conversation = {
  id: string; doctor: string; doctorPhoto: string; specialty: string
  lastMessage: string; lastTime: string; unread: number; messages: ChatMessage[]
}

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'c-01', doctor: 'Dr. Elena Rusu', doctorPhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=60&h=60&fit=crop&crop=face',
    specialty: 'Medic Stomatolog', lastMessage: 'Totul este in regula. Ne vedem pe 24 martie!', lastTime: '14:30', unread: 0,
    messages: [
      { id: 'm-01', from: 'patient', text: 'Buna ziua, Dr. Rusu! Am o intrebare despre controlul de pe 24 martie.', time: '10:15', date: '12 Mar 2026', read: true },
      { id: 'm-02', from: 'doctor', text: 'Buna, Alexandru! Spune-mi, cu ce te pot ajuta?', time: '10:22', date: '12 Mar 2026', read: true },
      { id: 'm-03', from: 'patient', text: 'Trebuie sa vin pe nemancate? Si cat dureaza sedinta?', time: '10:25', date: '12 Mar 2026', read: true },
      { id: 'm-04', from: 'doctor', text: 'Nu e necesar sa fii pe nemancate. Sedinta dureaza aproximativ 45 minute — detartraj + control.', time: '10:31', date: '12 Mar 2026', read: true },
      { id: 'm-05', from: 'doctor', text: 'Te rog sa aduci cardul de asigurare CNAM daca il ai.', time: '10:32', date: '12 Mar 2026', read: true },
      { id: 'm-06', from: 'patient', text: 'Perfect, multumesc! Il voi aduce. O zi buna!', time: '10:35', date: '12 Mar 2026', read: true },
      { id: 'm-07', from: 'doctor', text: 'Totul este in regula. Ne vedem pe 24 martie! 😊', time: '14:30', date: '12 Mar 2026', read: true },
    ],
  },
  {
    id: 'c-02', doctor: 'Dr. Andrei Moraru', doctorPhoto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=60&h=60&fit=crop&crop=face',
    specialty: 'Protetica', lastMessage: 'Coroana este gata! Te asteptam pe 15 aprilie.', lastTime: '16:45', unread: 1,
    messages: [
      { id: 'm-10', from: 'doctor', text: 'Buna, Alexandru! Am vesti bune — coroana ta de zirconiu a fost fabricata si a trecut controlul de calitate.', time: '16:40', date: '10 Mar 2026', read: true },
      { id: 'm-11', from: 'doctor', text: 'Shade-ul A2 se potriveste perfect cu dintii vecini. Am verificat sub microscop — fit-ul este excelent.', time: '16:41', date: '10 Mar 2026', read: true },
      { id: 'm-12', from: 'patient', text: 'Ce bine! Abia astept. Sedinta de pe 15 aprilie ramane la ora 14:30?', time: '17:00', date: '10 Mar 2026', read: true },
      { id: 'm-13', from: 'doctor', text: 'Da, exact! Sedinta de cimentare dureaza circa 30 minute. Dupa cimentare, vei putea manca normal in 2-3 ore.', time: '17:05', date: '10 Mar 2026', read: true },
      { id: 'm-14', from: 'patient', text: 'Multumesc mult! Am si o intrebare — trebuie sa fac ceva special inainte?', time: '09:15', date: '11 Mar 2026', read: true },
      { id: 'm-15', from: 'doctor', text: 'Nimic special! Doar vino cu 5 minute mai devreme. Coroana temporara o vom indeparta noi.', time: '09:30', date: '11 Mar 2026', read: true },
      { id: 'm-16', from: 'doctor', text: 'Coroana este gata! Te asteptam pe 15 aprilie pentru cimentare. Va fi un zambet nou! 🦷✨', time: '16:45', date: '14 Mar 2026', read: false },
    ],
  },
]

export type Notification = {
  id: string; type: 'appointment' | 'treatment' | 'document' | 'system' | 'family'
  title: string; text: string; time: string; date: string; read: boolean
  actionUrl?: string; actionLabel?: string
}

export const NOTIFICATIONS: Notification[] = [
  { id: 'n-01', type: 'appointment', title: 'Programare confirmata', text: 'Control periodic + igienizare — 24 Mar 2026, ora 10:00, Centru', time: '09:00', date: '19 Mar 2026', read: false, actionLabel: 'Vezi detalii' },
  { id: 'n-02', type: 'treatment', title: 'Coroana ta este gata!', text: 'Coroana zirconiu #15 a fost fabricata. Cimentare planificata 15 Apr.', time: '16:45', date: '14 Mar 2026', read: false, actionLabel: 'Vezi tratament' },
  { id: 'n-03', type: 'document', title: 'Document nou disponibil', text: 'Design CAD coroana #15 a fost adaugat in dosarul tau.', time: '11:00', date: '25 Feb 2026', read: true },
  { id: 'n-04', type: 'family', title: 'Reminder: Control David', text: 'David nu a fost la control de 6+ luni. Programeaza o vizita.', time: '08:00', date: '19 Mar 2026', read: false, actionLabel: 'Programeaza' },
  { id: 'n-05', type: 'appointment', title: 'Programare Ana — confirmare', text: 'Ortodontie control Invisalign — 20 Apr 2026, Rascani', time: '14:00', date: '18 Mar 2026', read: true },
  { id: 'n-06', type: 'system', title: 'Bine ai venit in Cabinet!', text: 'Exploreaza functiile noi: Familie, Plati, Mesaje.', time: '10:00', date: '1 Mar 2026', read: true },
  { id: 'n-07', type: 'treatment', title: 'Invisalign Ana — schimbare set', text: 'Este timpul sa treaca la setul de aliniere #8.', time: '09:00', date: '15 Mar 2026', read: true },
  { id: 'n-08', type: 'document', title: 'Factura disponibila', text: 'Factura #SDT-2026-041 pentru preparare coroana #15.', time: '15:00', date: '18 Feb 2026', read: true },
]

export type Payment = {
  id: string; number: string; date: string; service: string
  amount: number; status: 'paid' | 'pending' | 'partial'; method: string
}

export const PAYMENTS: Payment[] = [
  { id: 'pay-01', number: 'SDT-2026-041', date: '18 Feb 2026', service: 'Preparare coroana #15 + temporara', amount: 150, status: 'paid', method: 'Card bancar' },
  { id: 'pay-02', number: 'SDT-2026-028', date: '25 Ian 2026', service: 'Detartraj + igienizare', amount: 50, status: 'paid', method: 'Numerar' },
  { id: 'pay-03', number: 'SDT-2025-215', date: '20 Nov 2025', service: 'Obturatie compozit #24', amount: 80, status: 'paid', method: 'Card bancar' },
  { id: 'pay-04', number: 'SDT-2025-180', date: '5 Oct 2025', service: 'Radiografie panoramica', amount: 25, status: 'paid', method: 'Numerar' },
  { id: 'pay-05', number: 'SDT-2026-055', date: '15 Apr 2026', service: 'Cimentare coroana zirconiu #15', amount: 100, status: 'pending', method: '—' },
]

export const INSTALLMENT_PLAN = {
  treatment: 'Ortodontie Invisalign — Ana Moraru',
  totalAmount: 1200,
  paid: 800,
  remaining: 400,
  monthlyRate: 100,
  months: 12,
  paidMonths: 8,
  remainingMonths: 4,
  nextPaymentDate: '1 Apr 2026',
  interest: '0%',
}

export const ACTIVITY_FEED = [
  { text: 'Programare confirmata: Control periodic — 24 Mar', time: '2 ore', icon: 'calendar' },
  { text: 'Dr. Moraru a adaugat: Design CAD coroana #15', time: '3 zile', icon: 'file' },
  { text: 'Mesaj nou de la Dr. Moraru', time: '5 zile', icon: 'message' },
  { text: 'Factura #SDT-2026-041 emisa', time: '1 luna', icon: 'payment' },
  { text: 'Programare finalizata: Preparare dinte #15', time: '1 luna', icon: 'check' },
]

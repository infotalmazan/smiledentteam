'use client'

import { useState } from 'react'
import { Logo } from './Logo'
import { BRAND as B, CAMPAIGN_2026 } from '@/lib/brand'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  Calendar, FileText, MessageCircle, Bell, User, LogOut,
  ChevronRight, Clock, Star, Shield, Heart, TrendingUp,
  Settings, HelpCircle, Phone, MapPin, Scan, CheckCircle
} from 'lucide-react'

/* ─── Mock patient data ───────────────────── */
const PATIENT = {
  name: 'Alexandru Moraru',
  code: 'SDT-2024-7842',
  phone: '+373 69 123 456',
  email: 'alexandru.m@gmail.com',
  location: 'Chisinau, Centru',
  doctor: 'Dr. Elena Rusu',
  since: '2023',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
}

const UPCOMING = [
  { date: '24 Mar 2026', time: '10:00', service: 'Control periodic', doctor: 'Dr. Elena Rusu', location: 'Centru', status: 'confirmed' as const },
  { date: '15 Apr 2026', time: '14:30', service: 'Coroana zirconiu — cimentare', doctor: 'Dr. Andrei Moraru', location: 'Centru', status: 'pending' as const },
]

const HISTORY = [
  { date: '10 Feb 2026', service: 'Digital Check-Up', doctor: 'Dr. Elena Rusu', notes: 'Scanare 3D completa, plan de tratament stabilit' },
  { date: '18 Feb 2026', service: 'Preparare dinte + coroana temporara', doctor: 'Dr. Andrei Moraru', notes: 'Preparare dinte 15, amprenta digitala, coroana temporara aplicata' },
  { date: '25 Jan 2026', service: 'Detartraj + igienizare', doctor: 'Dr. Elena Rusu', notes: 'Igienizare profesionala, aplicare fluor' },
]

const DOCUMENTS = [
  { name: 'Plan tratament — Coroana #15', date: '10 Feb 2026', type: 'PDF' },
  { name: 'Tomografie 3D CBCT', date: '10 Feb 2026', type: 'DICOM' },
  { name: 'Scanare intraorala 3Shape', date: '10 Feb 2026', type: '3D' },
  { name: 'Radiografie panoramica', date: '25 Jan 2026', type: 'IMG' },
]

const NAV_ITEMS = [
  { icon: Calendar, label: 'Programari', id: 'programari' },
  { icon: TrendingUp, label: 'Tratamente', id: 'tratamente' },
  { icon: FileText, label: 'Documente', id: 'documente' },
  { icon: MessageCircle, label: 'Mesaje', id: 'mesaje' },
  { icon: Bell, label: 'Notificari', id: 'notificari' },
  { icon: Settings, label: 'Setari', id: 'setari' },
]

export function CabinetDashboard() {
  const [activeNav, setActiveNav] = useState('programari')

  return (
    <div className="min-h-screen bg-[#f8faf9]">
      {/* ━━━ Top Bar ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header className="bg-white border-b border-[--bdr] px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <a href="/" className="no-underline"><Logo height={30} /></a>
          <div className="h-6 w-px bg-[--bdr]" />
          <span className="text-[12px] font-bold text-sdt-600 uppercase tracking-[.1em]">Cabinet Personal</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative w-9 h-9 rounded-lg bg-sdt-50 flex items-center justify-center cursor-pointer border-none hover:bg-sdt-100 transition-colors">
            <Bell className="w-4 h-4 text-sdt-600" strokeWidth={1.5} />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-500 text-[9px] font-bold text-white flex items-center justify-center">2</span>
          </button>
          <div className="flex items-center gap-3 cursor-pointer">
            <img src={PATIENT.photo} alt={PATIENT.name} className="w-8 h-8 rounded-full object-cover" />
            <div>
              <div className="text-[13px] font-semibold" style={{ color: B.nv }}>{PATIENT.name}</div>
              <div className="text-[10px] text-[#5a7a6e]">{PATIENT.code}</div>
            </div>
          </div>
          <a href="/login" className="no-underline">
            <button className="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer border border-[--bdr] bg-white hover:bg-red-50 hover:border-red-200 transition-colors">
              <LogOut className="w-4 h-4 text-[#5a7a6e]" strokeWidth={1.5} />
            </button>
          </a>
        </div>
      </header>

      <div className="flex">
        {/* ━━━ Sidebar ━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <aside className="w-[220px] bg-white border-r border-[--bdr] min-h-[calc(100vh-52px)] p-4 flex flex-col justify-between sticky top-[52px] h-[calc(100vh-52px)]">
          <div>
            {/* Patient card */}
            <div className="p-4 rounded-xl bg-sdt-50 border border-sdt-100 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <img src={PATIENT.photo} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="text-[13px] font-semibold" style={{ color: B.nv }}>{PATIENT.name.split(' ')[0]}</div>
                  <div className="text-[10px] text-sdt-600 font-semibold">Pacient din {PATIENT.since}</div>
                </div>
              </div>
              <div className="text-[10px] text-[#5a7a6e] space-y-1">
                <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {PATIENT.location}</div>
                <div className="flex items-center gap-1.5"><User className="w-3 h-3" /> {PATIENT.doctor}</div>
              </div>
            </div>

            {/* Nav */}
            <nav className="space-y-1">
              {NAV_ITEMS.map(item => (
                <button key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-medium cursor-pointer border-none transition-all text-left',
                    activeNav === item.id
                      ? 'bg-sdt-600 text-white shadow-sm'
                      : 'bg-transparent text-[#5a7a6e] hover:bg-sdt-50'
                  )}
                >
                  <item.icon className="w-4 h-4" strokeWidth={1.5} />
                  {item.label}
                  {item.id === 'notificari' && <span className="ml-auto w-5 h-5 rounded-full bg-pink-500 text-[9px] font-bold text-white flex items-center justify-center">2</span>}
                  {item.id === 'mesaje' && <span className="ml-auto w-5 h-5 rounded-full bg-sdt-400 text-[9px] font-bold text-white flex items-center justify-center">1</span>}
                </button>
              ))}
            </nav>
          </div>

          {/* Help */}
          <div className="p-3.5 rounded-xl bg-pink-50 border border-pink-100">
            <HelpCircle className="w-5 h-5 text-pink-500 mb-2" strokeWidth={1.5} />
            <div className="text-[12px] font-semibold text-pink-600 mb-1">Ai nevoie de ajutor?</div>
            <div className="text-[10px] text-pink-500/70 mb-2">Contacteaza echipa SDT</div>
            <a href="/contacte" className="no-underline">
              <Button size="sm" className="w-full text-[11px] bg-pink-500 hover:bg-pink-600 text-white">
                <Phone className="w-3 h-3 mr-1" /> Contacteaza-ne
              </Button>
            </a>
          </div>
        </aside>

        {/* ━━━ Main Content ━━━━━━━━━━━━━━━━━━━━ */}
        <main className="flex-1 p-8">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="font-display text-[26px] font-semibold" style={{ color: B.nv }}>
              Buna, {PATIENT.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-sm text-[#5a7a6e]">Bine ai venit in cabinetul tau personal Smile Dent Team.</p>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { icon: Calendar, label: 'Programari viitoare', value: '2', color: B.p },
              { icon: FileText, label: 'Documente', value: '4', color: '#2563EB' },
              { icon: MessageCircle, label: 'Mesaje necitite', value: '1', color: '#e8157a' },
              { icon: CheckCircle, label: 'Tratamente finalizate', value: '3', color: '#059669' },
            ].map((s, i) => (
              <Card key={i} className="border-[--bdr]">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${s.color}12` }}>
                    <s.icon className="w-5 h-5" style={{ color: s.color }} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="font-display text-[22px] font-semibold" style={{ color: B.nv }}>{s.value}</div>
                    <div className="text-[11px] text-[#5a7a6e]">{s.label}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-[1fr_340px] gap-6">
            {/* Left — Main content */}
            <div className="space-y-6">
              {/* Upcoming appointments */}
              <Card className="border-[--bdr]">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="font-display text-[18px] font-semibold" style={{ color: B.nv }}>Programari viitoare</h2>
                    <Button variant="outline" size="sm" className="text-[11px] border-sdt-200 text-sdt-600">
                      <Calendar className="w-3 h-3 mr-1" /> Programeaza
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {UPCOMING.map((a, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-[--bdr] hover:border-sdt-200 transition-all">
                        <div className="text-center w-[50px]">
                          <div className="font-display text-[18px] font-semibold" style={{ color: B.nv }}>{a.date.split(' ')[0]}</div>
                          <div className="text-[10px] text-[#5a7a6e]">{a.date.split(' ')[1]}</div>
                        </div>
                        <div className="h-10 w-px bg-[--bdr]" />
                        <div className="flex-1">
                          <div className="text-[14px] font-semibold" style={{ color: B.nv }}>{a.service}</div>
                          <div className="text-[11px] text-[#5a7a6e] mt-0.5 flex items-center gap-3">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {a.time}</span>
                            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {a.doctor}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {a.location}</span>
                          </div>
                        </div>
                        <Badge className={cn('text-[9px] font-bold border-0',
                          a.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        )}>
                          {a.status === 'confirmed' ? 'Confirmata' : 'In asteptare'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Treatment history */}
              <Card className="border-[--bdr]">
                <CardContent className="p-6">
                  <h2 className="font-display text-[18px] font-semibold mb-5" style={{ color: B.nv }}>Istoric tratamente</h2>
                  <div className="space-y-3">
                    {HISTORY.map((h, i) => (
                      <div key={i} className="flex items-start gap-4 p-3 rounded-lg hover:bg-sdt-50/50 transition-colors cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-sdt-600 mt-2 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div className="text-[13px] font-semibold" style={{ color: B.nv }}>{h.service}</div>
                            <div className="text-[11px] text-[#5a7a6e]">{h.date}</div>
                          </div>
                          <div className="text-[11px] text-[#5a7a6e] mt-0.5">{h.doctor}</div>
                          <div className="text-[11px] text-[#5a7a6e]/70 mt-1">{h.notes}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right sidebar */}
            <div className="space-y-5">
              {/* Documents */}
              <Card className="border-[--bdr]">
                <CardContent className="p-5">
                  <h3 className="font-display text-[15px] font-semibold mb-4" style={{ color: B.nv }}>Documente recente</h3>
                  <div className="space-y-2">
                    {DOCUMENTS.map((d, i) => (
                      <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-sdt-50 transition-colors cursor-pointer">
                        <div className="w-8 h-8 rounded-lg bg-sdt-50 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4 text-sdt-600" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] font-semibold truncate" style={{ color: B.nv }}>{d.name}</div>
                          <div className="text-[10px] text-[#5a7a6e]">{d.date}</div>
                        </div>
                        <Badge variant="outline" className="text-[9px] border-sdt-200 text-sdt-600">{d.type}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Next step CTA */}
              <div className="p-5 rounded-xl" style={{ background: `linear-gradient(135deg, ${B.p}, ${B.pm})` }}>
                <Scan className="w-6 h-6 text-white/70 mb-3" strokeWidth={1.5} />
                <h4 className="font-display text-[15px] font-semibold text-white mb-1">Urmatorul pas</h4>
                <p className="text-[11px] text-white/60 mb-3">Cimentare coroana zirconiu #15 — programata pentru 15 Apr.</p>
                <Button size="sm" className="w-full text-[11px] bg-white text-sdt-600 hover:bg-white/90 font-bold">
                  Vezi detalii tratament <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </div>

              {/* Doctor contact */}
              <Card className="border-[--bdr]">
                <CardContent className="p-5">
                  <h3 className="font-display text-[15px] font-semibold mb-3" style={{ color: B.nv }}>Medicul tau</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-sdt-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-sdt-600" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold" style={{ color: B.nv }}>{PATIENT.doctor}</div>
                      <div className="text-[10px] text-[#5a7a6e]">Medic Stomatolog</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full text-[11px] border-sdt-200 text-sdt-600">
                    <MessageCircle className="w-3 h-3 mr-1" /> Trimite mesaj
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

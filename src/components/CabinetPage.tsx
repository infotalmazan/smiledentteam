'use client'

import { useState, useEffect, useRef } from 'react'
import { Logo } from './Logo'
import { BRAND as B, SERVICES, LOCATIONS } from '@/lib/brand'
import {
  PATIENT, FAMILY, APPOINTMENTS, TREATMENTS, DOCUMENTS, CONVERSATIONS,
  NOTIFICATIONS, PAYMENTS, INSTALLMENT_PLAN, ACTIVITY_FEED,
  type Appointment, type Treatment, type DocItem, type Conversation, type Notification, type FamilyMember
} from '@/lib/cabinet-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  Calendar, FileText, MessageCircle, Bell, User, LogOut,
  ChevronRight, Clock, TrendingUp, Settings, HelpCircle,
  Phone, MapPin, CheckCircle, X, Send, Paperclip,
  Search, Upload, Download, Grid3X3, List, Filter,
  Users, Heart, CreditCard, Shield, AlertTriangle,
  ChevronDown, ChevronUp, Eye, Trash2, Globe, Lock,
  BookOpen, Activity, ArrowRight, Bot, ShoppingBag, ShoppingCart, Plus, Minus, Star, Sparkles, Package
} from 'lucide-react'

/* ─── Types ─── */
type NavId = 'dashboard' | 'programari' | 'tratamente' | 'documente' | 'mesaje' | 'notificari' | 'familie' | 'plati' | 'setari' | 'aisuport' | 'shop'

const NAV_ITEMS: { icon: typeof Calendar; label: string; id: NavId }[] = [
  { icon: Activity, label: 'Dashboard', id: 'dashboard' },
  { icon: Calendar, label: 'Programari', id: 'programari' },
  { icon: TrendingUp, label: 'Tratamente', id: 'tratamente' },
  { icon: FileText, label: 'Documente', id: 'documente' },
  { icon: MessageCircle, label: 'Mesaje', id: 'mesaje' },
  { icon: Bell, label: 'Notificari', id: 'notificari' },
  { icon: Users, label: 'Familie', id: 'familie' },
  { icon: CreditCard, label: 'Plati', id: 'plati' },
  { icon: Bot, label: 'AI Suport', id: 'aisuport' },
  { icon: ShoppingBag, label: 'Shop', id: 'shop' },
  { icon: Settings, label: 'Setari', id: 'setari' },
]

/* ─── Helpers ─── */
const statusBadge = (s: string) => {
  const map: Record<string, string> = {
    confirmed: 'bg-green-100 text-green-700',
    pending: 'bg-amber-100 text-amber-700',
    completed: 'bg-blue-100 text-blue-700',
    cancelled: 'bg-red-100 text-red-700',
    active: 'bg-teal-100 text-teal-700',
    planned: 'bg-purple-100 text-purple-700',
    paid: 'bg-green-100 text-green-700',
    partial: 'bg-amber-100 text-amber-700',
  }
  const labels: Record<string, string> = {
    confirmed: 'Confirmata', pending: 'In asteptare', completed: 'Finalizata',
    cancelled: 'Anulata', active: 'Activ', planned: 'Planificat',
    paid: 'Platit', partial: 'Partial',
  }
  return { cls: map[s] || 'bg-gray-100 text-gray-600', label: labels[s] || s }
}

const typeBadge = (t: string) => {
  const map: Record<string, string> = {
    PDF: 'bg-red-100 text-red-600', DICOM: 'bg-purple-100 text-purple-600',
    '3D': 'bg-blue-100 text-blue-600', IMG: 'bg-amber-100 text-amber-600',
    FACTURA: 'bg-green-100 text-green-600', RETETA: 'bg-pink-100 text-pink-600',
  }
  return map[t] || 'bg-gray-100 text-gray-600'
}

const healthDot = (s: 'green' | 'yellow' | 'red') => {
  const map = { green: 'bg-green-500', yellow: 'bg-amber-500', red: 'bg-red-500' }
  return map[s]
}

const feedIcon = (t: string) => {
  const map: Record<string, typeof Calendar> = {
    calendar: Calendar, file: FileText, message: MessageCircle,
    payment: CreditCard, check: CheckCircle,
  }
  return map[t] || Activity
}

const notifIcon = (t: string) => {
  const map: Record<string, typeof Calendar> = {
    appointment: Calendar, treatment: TrendingUp, document: FileText,
    family: Users, system: Settings,
  }
  return map[t] || Bell
}

/* ─── Modal wrapper ─── */
function Modal({ children, onClose, wide }: { children: React.ReactNode; onClose: () => void; wide?: boolean }) {
  return (
    <div className="fixed inset-0 z-[200]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="absolute bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: wide ? 640 : 460,
          width: 'calc(100% - 40px)',
          maxHeight: 'calc(100vh - 100px)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-gray-100/90 flex items-center justify-center cursor-pointer border-none hover:bg-gray-200 transition-colors z-20"
        >
          <X className="w-3.5 h-3.5 text-gray-500" />
        </button>
        <div className="overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */
export function CabinetDashboard() {
  // Nav
  const [activeNav, setActiveNav] = useState<NavId>('dashboard')

  // Toast
  const [toast, setToast] = useState<string | null>(null)
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t) } }, [toast])

  // Appointments (local state for mutations)
  const [localAppts, setLocalAppts] = useState(APPOINTMENTS)
  const [apptTab, setApptTab] = useState<'future' | 'past'>('future')
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [showNewAppointment, setShowNewAppointment] = useState(false)
  const [newApptStep, setNewApptStep] = useState(1)
  const [newApptService, setNewApptService] = useState('')
  const [newApptLocation, setNewApptLocation] = useState('')
  const [newApptDate, setNewApptDate] = useState('')
  const [newApptTime, setNewApptTime] = useState('')
  const [newApptDone, setNewApptDone] = useState(false)

  // Treatments
  const [treatTab, setTreatTab] = useState<'active' | 'completed'>('active')
  const [expandedTreatment, setExpandedTreatment] = useState<string | null>(null)

  // Documents
  const [docView, setDocView] = useState<'grid' | 'list'>('grid')
  const [docFilter, setDocFilter] = useState('all')
  const [docSearch, setDocSearch] = useState('')
  const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(null)

  // Messages
  const [activeConvo, setActiveConvo] = useState<string>(CONVERSATIONS[0].id)
  const [msgInput, setMsgInput] = useState('')
  const [localMessages, setLocalMessages] = useState<Record<string, Conversation['messages']>>(() => {
    const m: Record<string, Conversation['messages']> = {}
    CONVERSATIONS.forEach(c => { m[c.id] = [...c.messages] })
    return m
  })

  // Notifications
  const [notifFilter, setNotifFilter] = useState('all')
  const [readNotifs, setReadNotifs] = useState<Set<string>>(() => {
    const s = new Set<string>()
    NOTIFICATIONS.filter(n => n.read).forEach(n => s.add(n.id))
    return s
  })

  // Family (local for mutations)
  const [localFamily, setLocalFamily] = useState(FAMILY)
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null)
  const [showAddMember, setShowAddMember] = useState(false)
  const [addMemberName, setAddMemberName] = useState('')
  const [addMemberRelation, setAddMemberRelation] = useState('')
  const [addMemberPhone, setAddMemberPhone] = useState('')

  // Chat ref for auto-scroll
  const messagesEndRef = useRef<HTMLDivElement>(null)
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [activeConvo, localMessages])

  // AI Suport
  const [aiMessages, setAiMessages] = useState<{role:'ai'|'user';text:string}[]>([
    { role: 'ai', text: 'Buna! Sunt asistentul virtual Smile Dent Team. Cu ce te pot ajuta?' }
  ])
  const [aiInput, setAiInput] = useState('')
  const [aiTyping, setAiTyping] = useState(false)

  // Shop
  const [shopCategory, setShopCategory] = useState('all')
  const [localCart, setLocalCart] = useState<{id:string;qty:number}[]>([])
  const [showCart, setShowCart] = useState(false)

  // Payments
  const [expandedPayment, setExpandedPayment] = useState<string | null>(null)

  // Settings
  const [settFirstName, setSettFirstName] = useState(PATIENT.firstName)
  const [settLastName, setSettLastName] = useState(PATIENT.name.split(' ')[1] || '')
  const [settPhone, setSettPhone] = useState(PATIENT.phone)
  const [settEmail, setSettEmail] = useState(PATIENT.email)
  const [settLang, setSettLang] = useState('ro')
  const [settClinic, setSettClinic] = useState(PATIENT.preferredClinic)
  const [notifPrefs, setNotifPrefs] = useState({ programari: true, tratamente: true, mesaje: true, sistem: false })
  const [settSaved, setSettSaved] = useState(false)

  // Escape closes modals
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedAppointment(null); setShowNewAppointment(false); setSelectedDoc(null)
        setSelectedMember(null); setShowAddMember(false); setShowCart(false)
      }
    }
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h)
  }, [])

  // Derived counts
  const unreadMessages = CONVERSATIONS.reduce((a, c) => a + c.unread, 0)
  const unreadNotifs = NOTIFICATIONS.filter(n => !readNotifs.has(n.id)).length
  const cartCount = localCart.reduce((a, c) => a + c.qty, 0)

  /* ─── Section renderers ─── */

  // ━━━ 1. DASHBOARD ━━━
  const renderDashboard = () => {
    const futureAppts = localAppts.filter(a => a.status === 'confirmed' || a.status === 'pending')
    const nextAppt = futureAppts[0]
    const activeTreatments = TREATMENTS.filter(t => t.status === 'active')

    return (
      <div key="dashboard" className="animate-fadeUp">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-display text-[26px] font-semibold" style={{ color: B.nv }}>
            Buna, {PATIENT.firstName}! <span role="img" aria-label="wave">&#128075;</span>
          </h1>
          <p className="text-sm text-[#5a7a6e]">
            {nextAppt
              ? `Urmatoarea programare: ${nextAppt.service} — ${nextAppt.date}, ora ${nextAppt.time}`
              : 'Nu ai programari viitoare.'}
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {([
            { I: Calendar, l: 'Programari viitoare', v: String(futureAppts.length), c: B.p },
            { I: FileText, l: 'Documente', v: String(DOCUMENTS.length), c: '#2563EB' },
            { I: MessageCircle, l: 'Mesaje necitite', v: String(unreadMessages), c: '#e8157a' },
            { I: CheckCircle, l: 'Tratamente finalizate', v: String(TREATMENTS.filter(t => t.status === 'completed').length), c: '#059669' },
          ] as const).map((s, i) => {
            const navTargets: NavId[] = ['programari', 'documente', 'mesaje', 'tratamente']
            return (
            <Card key={i} className="border-[--bdr] cursor-pointer hover:border-sdt-200 transition-all" onClick={() => setActiveNav(navTargets[i])}>
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${s.c}12` }}>
                  <s.I className="w-5 h-5" style={{ color: s.c }} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="font-display text-[22px] font-semibold" style={{ color: B.nv }}>{s.v}</div>
                  <div className="text-[11px] text-[#5a7a6e]">{s.l}</div>
                </div>
              </CardContent>
            </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-[1fr_340px] gap-6">
          <div className="space-y-6">
            {/* Treatment progress */}
            <Card className="border-[--bdr]">
              <CardContent className="p-6">
                <h2 className="font-display text-[18px] font-semibold mb-5" style={{ color: B.nv }}>Progres tratamente</h2>
                <div className="space-y-4">
                  {activeTreatments.map(t => {
                    const done = t.steps.filter(s => s.status === 'done').length
                    const pct = Math.round((done / t.steps.length) * 100)
                    return (
                      <div key={t.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="text-[13px] font-semibold" style={{ color: B.nv }}>{t.name}</div>
                          <span className="text-[11px] text-[#5a7a6e]">{pct}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: B.p }} />
                        </div>
                        <div className="text-[10px] text-[#5a7a6e]">{t.doctor} &middot; {done}/{t.steps.length} etape</div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Activity feed */}
            <Card className="border-[--bdr]">
              <CardContent className="p-6">
                <h2 className="font-display text-[18px] font-semibold mb-5" style={{ color: B.nv }}>Activitate recenta</h2>
                <div className="space-y-3">
                  {ACTIVITY_FEED.map((a, i) => {
                    const Icon = feedIcon(a.icon)
                    return (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-sdt-50/50 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-sdt-50 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-sdt-600" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 text-[12px]" style={{ color: B.nv }}>{a.text}</div>
                        <span className="text-[10px] text-[#5a7a6e] whitespace-nowrap">{a.time}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            {/* Quick actions */}
            <Card className="border-[--bdr]">
              <CardContent className="p-5 space-y-2">
                <h3 className="font-display text-[15px] font-semibold mb-3" style={{ color: B.nv }}>Actiuni rapide</h3>
                <Button className="w-full justify-start text-[12px] bg-sdt-600 hover:bg-sdt-700 text-white" onClick={() => { setActiveNav('programari'); setShowNewAppointment(true) }}>
                  <Calendar className="w-4 h-4 mr-2" /> Programeaza
                </Button>
                <Button variant="outline" className="w-full justify-start text-[12px] border-sdt-200 text-sdt-600" onClick={() => setActiveNav('mesaje')}>
                  <MessageCircle className="w-4 h-4 mr-2" /> Trimite mesaj
                </Button>
                <Button variant="outline" className="w-full justify-start text-[12px] border-sdt-200 text-sdt-600" onClick={() => setActiveNav('documente')}>
                  <Upload className="w-4 h-4 mr-2" /> Incarca document
                </Button>
              </CardContent>
            </Card>

            {/* Recommended articles */}
            <Card className="border-[--bdr]">
              <CardContent className="p-5">
                <h3 className="font-display text-[15px] font-semibold mb-3" style={{ color: B.nv }}>Articole recomandate</h3>
                <div className="space-y-3">
                  {[
                    { title: 'Cum sa ai grija de coroana ta dentara', slug: 'ingrijire-coroana' },
                    { title: '5 sfaturi pentru igiena orala perfecta', slug: 'igiena-orala' },
                    { title: 'Ce este Digital Check-Up?', slug: 'digital-checkup' },
                  ].map((art, i) => (
                    <a key={i} href={`/blog/${art.slug}`} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-sdt-50 transition-colors no-underline group">
                      <div className="w-10 h-10 rounded-lg bg-sdt-50 flex items-center justify-center flex-shrink-0 group-hover:bg-sdt-100 transition-colors">
                        <BookOpen className="w-4 h-4 text-sdt-600" strokeWidth={1.5} />
                      </div>
                      <div className="text-[12px] font-medium group-hover:text-sdt-700 transition-colors" style={{ color: B.nv }}>{art.title}</div>
                      <ArrowRight className="w-3 h-3 text-[#5a7a6e] ml-auto flex-shrink-0" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // ━━━ 2. PROGRAMARI ━━━
  const renderProgramari = () => {
    const future = localAppts.filter(a => a.status === 'confirmed' || a.status === 'pending')
    const past = localAppts.filter(a => a.status === 'completed' || a.status === 'cancelled')
    const items = apptTab === 'future' ? future : past

    const calDays = Array.from({ length: 31 }, (_, i) => i + 1)
    const apptDays = new Set(localAppts.map(a => {
      const d = a.date.split(' ')[0]
      return parseInt(d, 10)
    }))

    return (
      <div key="programari" className="animate-fadeUp">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-display text-[22px] font-semibold" style={{ color: B.nv }}>Programari</h1>
          <Button className="text-[12px] bg-sdt-600 hover:bg-sdt-700 text-white" onClick={() => { setShowNewAppointment(true); setNewApptStep(1); setNewApptDone(false) }}>
            <Calendar className="w-4 h-4 mr-2" /> Programare noua
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-100 rounded-xl p-1 w-fit">
          {(['future', 'past'] as const).map(t => (
            <button key={t} onClick={() => setApptTab(t)} className={cn(
              'px-4 py-2 rounded-lg text-[12px] font-medium border-none cursor-pointer transition-all',
              apptTab === t ? 'bg-white text-sdt-700 shadow-sm' : 'bg-transparent text-[#5a7a6e]'
            )}>
              {t === 'future' ? `Viitoare (${future.length})` : `Trecute (${past.length})`}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_260px] gap-6">
          <div className="space-y-3">
            {items.map(a => {
              const sb = statusBadge(a.status)
              return (
                <div key={a.id} onClick={() => setSelectedAppointment(a)}
                  className="flex items-center gap-4 p-4 rounded-xl border border-[--bdr] hover:border-sdt-200 transition-all cursor-pointer bg-white">
                  <div className="text-center w-[50px]">
                    <div className="font-display text-[18px] font-semibold" style={{ color: B.nv }}>{a.date.split(' ')[0]}</div>
                    <div className="text-[10px] text-[#5a7a6e]">{a.date.split(' ')[1]}</div>
                  </div>
                  <div className="h-10 w-px bg-[--bdr]" />
                  <img src={a.doctorPhoto} alt="" className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold truncate" style={{ color: B.nv }}>{a.service}</div>
                    <div className="text-[11px] text-[#5a7a6e] mt-0.5 flex items-center gap-3 flex-wrap">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {a.time} &middot; {a.duration}</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {a.doctor}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {a.location}</span>
                    </div>
                    {a.forMember && <div className="text-[10px] text-pink-500 mt-1">Pentru: {a.forMember}</div>}
                  </div>
                  <Badge className={cn('text-[9px] font-bold border-0', sb.cls)}>{sb.label}</Badge>
                </div>
              )
            })}
          </div>

          {/* Mini calendar */}
          <Card className="border-[--bdr] h-fit">
            <CardContent className="p-4">
              <div className="text-[13px] font-semibold mb-3" style={{ color: B.nv }}>Martie 2026</div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
                  <div key={i} className="text-[9px] font-bold text-[#5a7a6e] py-1">{d}</div>
                ))}
                {/* March 2026 starts on Sunday (offset 6) */}
                {Array.from({ length: 6 }, (_, i) => <div key={`e${i}`} />)}
                {calDays.map(d => (
                  <div key={d} className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-[11px] relative',
                    d === 19 ? 'bg-sdt-600 text-white font-bold' : 'text-gray-600'
                  )}>
                    {d}
                    {apptDays.has(d) && d !== 19 && <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-pink-500" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointment detail modal */}
        {selectedAppointment && (
          <Modal onClose={() => setSelectedAppointment(null)}>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <img src={selectedAppointment.doctorPhoto} alt="" className="w-14 h-14 rounded-full object-cover" />
                <div>
                  <div className="text-[16px] font-semibold" style={{ color: B.nv }}>{selectedAppointment.doctor}</div>
                  <div className="text-[12px] text-[#5a7a6e]">{selectedAppointment.service}</div>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-[13px]"><Calendar className="w-4 h-4 text-sdt-600" /> {selectedAppointment.date} &middot; {selectedAppointment.time}</div>
                <div className="flex items-center gap-2 text-[13px]"><Clock className="w-4 h-4 text-sdt-600" /> Durata: {selectedAppointment.duration}</div>
                <div className="flex items-center gap-2 text-[13px]"><MapPin className="w-4 h-4 text-sdt-600" /> {selectedAppointment.location}</div>
                {selectedAppointment.forMember && <div className="flex items-center gap-2 text-[13px]"><Users className="w-4 h-4 text-pink-500" /> Pentru: {selectedAppointment.forMember}</div>}
              </div>
              {selectedAppointment.notes && (
                <div className="p-3 rounded-lg bg-sdt-50 text-[12px] mb-4" style={{ color: B.nv }}>{selectedAppointment.notes}</div>
              )}
              {selectedAppointment.instructions && (
                <div className="mb-6">
                  <div className="text-[12px] font-semibold mb-2" style={{ color: B.nv }}>Instructiuni:</div>
                  <ul className="space-y-1">
                    {selectedAppointment.instructions.map((inst, i) => (
                      <li key={i} className="text-[12px] text-[#5a7a6e] flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-sdt-600 mt-0.5 flex-shrink-0" /> {inst}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex gap-2">
                <Button className="flex-1 text-[12px] bg-green-600 hover:bg-green-700 text-white" onClick={() => {
                  setLocalAppts(prev => prev.map(a => a.id === selectedAppointment.id ? { ...a, status: 'confirmed' } : a))
                  setSelectedAppointment(null); setToast('Programare confirmata cu succes!')
                }}>Confirma</Button>
                <Button variant="outline" className="flex-1 text-[12px] border-sdt-200 text-sdt-600" onClick={() => {
                  setSelectedAppointment(null); setShowNewAppointment(true); setNewApptStep(1); setNewApptDone(false)
                }}>Reprogrameaza</Button>
                <Button variant="outline" className="text-[12px] border-red-200 text-red-500 hover:bg-red-50" onClick={() => {
                  setLocalAppts(prev => prev.map(a => a.id === selectedAppointment.id ? { ...a, status: 'cancelled' } : a))
                  setSelectedAppointment(null); setToast('Programare anulata.')
                }}>Anuleaza</Button>
              </div>
            </div>
          </Modal>
        )}

        {/* New appointment modal */}
        {showNewAppointment && (
          <Modal onClose={() => { setShowNewAppointment(false); setNewApptDone(false) }}>
            <div className="p-5 pt-4">
              <h2 className="text-[16px] font-semibold mb-0.5 pr-8" style={{ color: B.nv }}>Programare noua</h2>
              {!newApptDone && <div className="text-[11px] text-[#5a7a6e] mb-3">Pasul {newApptStep} din 3</div>}
              {!newApptDone && (
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3].map(s => (
                    <div key={s} className={cn('h-1 flex-1 rounded-full', s <= newApptStep ? 'bg-sdt-600' : 'bg-gray-200')} />
                  ))}
                </div>
              )}

              {newApptDone ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-7 h-7 text-green-600" />
                  </div>
                  <div className="text-[15px] font-semibold mb-1" style={{ color: B.nv }}>Programare confirmata!</div>
                  <div className="text-[12px] text-[#5a7a6e]">Vei primi o notificare de confirmare.</div>
                </div>
              ) : newApptStep === 1 ? (
                <div>
                  <div className="text-[13px] font-semibold mb-2" style={{ color: B.nv }}>Alege serviciul:</div>
                  <div className="space-y-1">
                    {SERVICES.map(s => (
                      <label key={s.slug} className={cn(
                        'flex items-center gap-2.5 py-2.5 px-3 rounded-lg border cursor-pointer transition-all',
                        newApptService === s.slug ? 'border-sdt-400 bg-sdt-50' : 'border-transparent hover:bg-gray-50'
                      )}>
                        <div className={cn(
                          'w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
                          newApptService === s.slug ? 'border-sdt-600' : 'border-gray-300'
                        )}>
                          {newApptService === s.slug && <div className="w-2 h-2 rounded-full bg-sdt-600" />}
                        </div>
                        <input type="radio" name="service" value={s.slug} checked={newApptService === s.slug}
                          onChange={() => setNewApptService(s.slug)} className="sr-only" />
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] font-medium" style={{ color: B.nv }}>{s.name}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                  <Button className="w-full mt-3 bg-sdt-600 hover:bg-sdt-700 text-white text-[12px]"
                    disabled={!newApptService} onClick={() => setNewApptStep(2)}>
                    Continua <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              ) : newApptStep === 2 ? (
                <div className="space-y-2">
                  <div className="text-[13px] font-semibold mb-3" style={{ color: B.nv }}>Alege locatia:</div>
                  {LOCATIONS.map((loc, i) => (
                    <label key={i} className={cn(
                      'flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all',
                      newApptLocation === loc.city ? 'border-sdt-400 bg-sdt-50' : 'border-[--bdr] hover:border-sdt-200'
                    )}>
                      <input type="radio" name="location" value={loc.city} checked={newApptLocation === loc.city}
                        onChange={() => setNewApptLocation(loc.city)} className="accent-[#0a6b5c]" />
                      <div>
                        <div className="text-[13px] font-medium" style={{ color: B.nv }}>{loc.city}</div>
                        <div className="text-[10px] text-[#5a7a6e]">{loc.address} &middot; {loc.phone}</div>
                      </div>
                    </label>
                  ))}
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="text-[12px]" onClick={() => setNewApptStep(1)}>Inapoi</Button>
                    <Button className="flex-1 bg-sdt-600 hover:bg-sdt-700 text-white text-[12px]"
                      disabled={!newApptLocation} onClick={() => setNewApptStep(3)}>
                      Continua <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-[13px] font-semibold mb-3" style={{ color: B.nv }}>Alege data si ora:</div>
                  {/* Fake mini-calendar */}
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
                      <div key={i} className="text-[9px] font-bold text-[#5a7a6e] text-center py-1">{d}</div>
                    ))}
                    {Array.from({ length: 6 }, (_, i) => <div key={`e${i}`} />)}
                    {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                      <button key={d} onClick={() => setNewApptDate(`${d} Apr 2026`)}
                        className={cn(
                          'w-8 h-8 rounded-full text-[11px] border-none cursor-pointer transition-all',
                          newApptDate === `${d} Apr 2026` ? 'bg-sdt-600 text-white' : 'bg-transparent text-gray-600 hover:bg-sdt-50',
                          (d % 7 === 0 || d % 7 === 6) && 'text-gray-300'
                        )}>
                        {d}
                      </button>
                    ))}
                  </div>
                  <div className="text-[12px] font-semibold mb-2" style={{ color: B.nv }}>Ora disponibila:</div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'].map(t => (
                      <button key={t} onClick={() => setNewApptTime(t)} className={cn(
                        'px-3 py-2 rounded-lg text-[12px] border cursor-pointer transition-all',
                        newApptTime === t ? 'border-sdt-400 bg-sdt-50 text-sdt-700 font-semibold' : 'border-[--bdr] text-gray-600 hover:border-sdt-200'
                      )}>
                        {t}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="text-[12px]" onClick={() => setNewApptStep(2)}>Inapoi</Button>
                    <Button className="flex-1 bg-sdt-600 hover:bg-sdt-700 text-white text-[12px]"
                      disabled={!newApptDate || !newApptTime} onClick={() => setNewApptDone(true)}>
                      Confirma programare
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Modal>
        )}
      </div>
    )
  }

  // ━━━ 3. TRATAMENTE ━━━
  const renderTratamente = () => {
    const active = TREATMENTS.filter(t => t.status === 'active')
    const completed = TREATMENTS.filter(t => t.status === 'completed')
    const items = treatTab === 'active' ? active : completed

    // Donut data
    const totalSteps = TREATMENTS.reduce((a, t) => a + t.steps.length, 0)
    const doneSteps = TREATMENTS.reduce((a, t) => a + t.steps.filter(s => s.status === 'done').length, 0)
    const pct = Math.round((doneSteps / totalSteps) * 100)

    return (
      <div key="tratamente" className="animate-fadeUp">
        <h1 className="font-display text-[22px] font-semibold mb-6" style={{ color: B.nv }}>Tratamente</h1>

        <div className="flex gap-1 mb-6 bg-gray-100 rounded-xl p-1 w-fit">
          {(['active', 'completed'] as const).map(t => (
            <button key={t} onClick={() => setTreatTab(t)} className={cn(
              'px-4 py-2 rounded-lg text-[12px] font-medium border-none cursor-pointer transition-all',
              treatTab === t ? 'bg-white text-sdt-700 shadow-sm' : 'bg-transparent text-[#5a7a6e]'
            )}>
              {t === 'active' ? `Active (${active.length})` : `Finalizate (${completed.length})`}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_200px] gap-6">
          <div className="space-y-3">
            {items.map(t => {
              const isExpanded = expandedTreatment === t.id
              const done = t.steps.filter(s => s.status === 'done').length
              const tPct = Math.round((done / t.steps.length) * 100)
              const sb = statusBadge(t.status)
              const remaining = t.totalCost - t.paid
              const paidPct = Math.round((t.paid / t.totalCost) * 100)

              return (
                <Card key={t.id} className="border-[--bdr] overflow-hidden">
                  <div className="p-5 cursor-pointer" onClick={() => setExpandedTreatment(isExpanded ? null : t.id)}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="text-[14px] font-semibold" style={{ color: B.nv }}>{t.name}</div>
                          <div className="text-[11px] text-[#5a7a6e] mt-0.5">{t.doctor} {t.tooth && `\u00b7 Dinte ${t.tooth}`}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={cn('text-[9px] font-bold border-0', sb.cls)}>{sb.label}</Badge>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-[#5a7a6e]" /> : <ChevronDown className="w-4 h-4 text-[#5a7a6e]" />}
                      </div>
                    </div>
                    {/* Mini progress */}
                    <div className="mt-3 flex items-center gap-3">
                      <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${tPct}%`, background: B.p }} />
                      </div>
                      <span className="text-[10px] text-[#5a7a6e]">{tPct}%</span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-[--bdr] pt-4 space-y-5">
                      {/* Steps timeline */}
                      <div>
                        <div className="text-[12px] font-semibold mb-3" style={{ color: B.nv }}>Etape tratament</div>
                        <div className="space-y-0">
                          {t.steps.map((step, i) => (
                            <div key={i} className="flex gap-3">
                              <div className="flex flex-col items-center">
                                <div className={cn('w-6 h-6 rounded-full flex items-center justify-center text-[10px]',
                                  step.status === 'done' ? 'bg-green-100 text-green-600' :
                                  step.status === 'current' ? 'bg-sdt-100 text-sdt-600' : 'bg-gray-100 text-gray-400'
                                )}>
                                  {step.status === 'done' ? <CheckCircle className="w-3.5 h-3.5" /> :
                                   step.status === 'current' ? <Clock className="w-3.5 h-3.5" /> :
                                   <span className="w-2 h-2 rounded-full bg-gray-300" />}
                                </div>
                                {i < t.steps.length - 1 && <div className="w-px flex-1 bg-gray-200 min-h-[16px]" />}
                              </div>
                              <div className="pb-3">
                                <div className="text-[12px] font-medium" style={{ color: B.nv }}>{step.name}</div>
                                {step.date && <div className="text-[10px] text-[#5a7a6e]">{step.date}{step.doctor ? ` \u00b7 ${step.doctor}` : ''}</div>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Documents */}
                      {t.documents.length > 0 && (
                        <div>
                          <div className="text-[12px] font-semibold mb-2" style={{ color: B.nv }}>Documente asociate</div>
                          <div className="space-y-1">
                            {t.documents.map((d, i) => (
                              <div key={i} className="flex items-center gap-2 text-[11px] text-sdt-600 hover:text-sdt-700 cursor-pointer">
                                <FileText className="w-3 h-3" /> {d}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Cost breakdown */}
                      <div>
                        <div className="text-[12px] font-semibold mb-2" style={{ color: B.nv }}>Cost tratament</div>
                        <div className="flex justify-between text-[11px] mb-1">
                          <span className="text-[#5a7a6e]">Platit: {t.paid}&euro;</span>
                          <span className="text-[#5a7a6e]">Rest: {remaining}&euro;</span>
                          <span className="font-semibold" style={{ color: B.nv }}>Total: {t.totalCost}&euro;</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: `${paidPct}%` }} />
                        </div>
                      </div>

                      {t.notes && <div className="p-3 rounded-lg bg-sdt-50 text-[11px] text-[#5a7a6e]">{t.notes}</div>}
                    </div>
                  )}
                </Card>
              )
            })}
          </div>

          {/* Donut progress */}
          <Card className="border-[--bdr] h-fit">
            <CardContent className="p-5 text-center">
              <div className="text-[12px] font-semibold mb-4" style={{ color: B.nv }}>Progres total</div>
              <div className="relative w-28 h-28 mx-auto mb-3">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none" stroke="#e5e7eb" strokeWidth="3" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none" stroke={B.p} strokeWidth="3" strokeDasharray={`${pct}, 100`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-[20px] font-bold" style={{ color: B.nv }}>{pct}%</span>
                </div>
              </div>
              <div className="text-[10px] text-[#5a7a6e]">{doneSteps} din {totalSteps} etape finalizate</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // ━━━ 4. DOCUMENTE ━━━
  const renderDocumente = () => {
    const categories = ['all', 'tomografie', 'scanare', 'radiografie', 'plan', 'factura', 'reteta'] as const
    const catLabels: Record<string, string> = {
      all: 'Toate', tomografie: 'Tomografii', scanare: 'Scanari', radiografie: 'Radiografii',
      plan: 'Planuri', factura: 'Facturi', reteta: 'Retete',
    }

    const filtered = DOCUMENTS.filter(d => {
      if (docFilter !== 'all' && d.category !== docFilter) return false
      if (docSearch && !d.name.toLowerCase().includes(docSearch.toLowerCase())) return false
      return true
    })

    return (
      <div key="documente" className="animate-fadeUp">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-display text-[22px] font-semibold" style={{ color: B.nv }}>Documente</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="text-[12px] border-sdt-200 text-sdt-600">
              <Upload className="w-4 h-4 mr-1" /> Incarca
            </Button>
            <div className="flex bg-gray-100 rounded-lg p-0.5">
              <button onClick={() => setDocView('grid')} className={cn('p-1.5 rounded-md border-none cursor-pointer transition-all', docView === 'grid' ? 'bg-white shadow-sm' : 'bg-transparent')}>
                <Grid3X3 className="w-4 h-4" style={{ color: docView === 'grid' ? B.p : '#5a7a6e' }} />
              </button>
              <button onClick={() => setDocView('list')} className={cn('p-1.5 rounded-md border-none cursor-pointer transition-all', docView === 'list' ? 'bg-white shadow-sm' : 'bg-transparent')}>
                <List className="w-4 h-4" style={{ color: docView === 'list' ? B.p : '#5a7a6e' }} />
              </button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a7a6e]" />
          <Input placeholder="Cauta documente..." className="pl-10 text-[12px]" value={docSearch} onChange={e => setDocSearch(e.target.value)} />
        </div>

        {/* Category pills */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {categories.map(c => (
            <button key={c} onClick={() => setDocFilter(c)} className={cn(
              'px-3 py-1.5 rounded-full text-[11px] font-medium border-none cursor-pointer transition-all',
              docFilter === c ? 'bg-sdt-600 text-white' : 'bg-gray-100 text-[#5a7a6e] hover:bg-gray-200'
            )}>
              {catLabels[c]}
            </button>
          ))}
        </div>

        {docView === 'grid' ? (
          <div className="grid grid-cols-3 gap-4">
            {filtered.map(d => (
              <Card key={d.id} className="border-[--bdr] cursor-pointer hover:border-sdt-200 transition-all" onClick={() => setSelectedDoc(d)}>
                <CardContent className="p-4">
                  <div className="w-full h-24 rounded-lg bg-gray-50 flex items-center justify-center mb-3">
                    <FileText className="w-8 h-8 text-gray-300" strokeWidth={1} />
                  </div>
                  <div className="text-[12px] font-semibold truncate" style={{ color: B.nv }}>{d.name}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-[#5a7a6e]">{d.date}</span>
                    <Badge className={cn('text-[8px] font-bold border-0', typeBadge(d.type))}>{d.type}</Badge>
                  </div>
                  <div className="text-[10px] text-[#5a7a6e] mt-1">{d.size}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(d => (
              <div key={d.id} onClick={() => setSelectedDoc(d)}
                className="flex items-center gap-4 p-3 rounded-xl border border-[--bdr] hover:border-sdt-200 cursor-pointer transition-all bg-white">
                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-gray-300" strokeWidth={1} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-semibold truncate" style={{ color: B.nv }}>{d.name}</div>
                  <div className="text-[10px] text-[#5a7a6e]">{d.date}</div>
                </div>
                <Badge className={cn('text-[8px] font-bold border-0', typeBadge(d.type))}>{d.type}</Badge>
                <span className="text-[10px] text-[#5a7a6e]">{d.size}</span>
              </div>
            ))}
          </div>
        )}

        {/* Document viewer modal */}
        {selectedDoc && (
          <Modal onClose={() => setSelectedDoc(null)}>
            <div className="p-6">
              <div className="w-full h-48 bg-gray-50 rounded-xl flex items-center justify-center mb-5">
                <FileText className="w-16 h-16 text-gray-200" strokeWidth={1} />
              </div>
              <div className="text-[16px] font-semibold mb-1" style={{ color: B.nv }}>{selectedDoc.name}</div>
              <div className="space-y-2 mb-5">
                <div className="flex items-center gap-2 text-[12px] text-[#5a7a6e]"><Calendar className="w-3.5 h-3.5" /> {selectedDoc.date}</div>
                <div className="flex items-center gap-2 text-[12px] text-[#5a7a6e]"><Filter className="w-3.5 h-3.5" /> {selectedDoc.type} &middot; {selectedDoc.size}</div>
                {selectedDoc.treatment && (
                  <div className="flex items-center gap-2 text-[12px] text-[#5a7a6e]">
                    <TrendingUp className="w-3.5 h-3.5" /> Tratament: {TREATMENTS.find(t => t.id === selectedDoc.treatment)?.name || selectedDoc.treatment}
                  </div>
                )}
              </div>
              <Button className="w-full bg-sdt-600 hover:bg-sdt-700 text-white text-[12px]">
                <Download className="w-4 h-4 mr-2" /> Descarca
              </Button>
            </div>
          </Modal>
        )}
      </div>
    )
  }

  // ━━━ 5. MESAJE ━━━
  const renderMesaje = () => {
    const convo = CONVERSATIONS.find(c => c.id === activeConvo)!
    const messages = localMessages[activeConvo] || convo.messages

    const sendMsg = () => {
      if (!msgInput.trim()) return
      const newMsg = {
        id: `m-new-${Date.now()}`,
        from: 'patient' as const,
        text: msgInput,
        time: new Date().toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' }),
        date: '19 Mar 2026',
        read: false,
      }
      setLocalMessages(prev => ({ ...prev, [activeConvo]: [...(prev[activeConvo] || []), newMsg] }))
      setMsgInput('')
    }

    return (
      <div key="mesaje" className="animate-fadeUp">
        <h1 className="font-display text-[22px] font-semibold mb-6" style={{ color: B.nv }}>Mesaje</h1>
        <div className="flex gap-0 rounded-2xl border border-[--bdr] overflow-hidden bg-white" style={{ height: 520 }}>
          {/* Left — conversation list */}
          <div className="w-[280px] border-r border-[--bdr] overflow-y-auto">
            {CONVERSATIONS.map(c => (
              <div key={c.id} onClick={() => setActiveConvo(c.id)} className={cn(
                'flex items-center gap-3 p-4 cursor-pointer transition-all border-b border-[--bdr]',
                activeConvo === c.id ? 'bg-sdt-50' : 'hover:bg-gray-50'
              )}>
                <img src={c.doctorPhoto} alt="" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] font-semibold truncate" style={{ color: B.nv }}>{c.doctor}</span>
                    <span className="text-[9px] text-[#5a7a6e]">{c.lastTime}</span>
                  </div>
                  <div className="text-[10px] text-sdt-600">{c.specialty}</div>
                  <div className="text-[11px] text-[#5a7a6e] truncate mt-0.5">{c.lastMessage}</div>
                </div>
                {c.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-pink-500 text-[9px] font-bold text-white flex items-center justify-center flex-shrink-0">{c.unread}</span>
                )}
              </div>
            ))}
          </div>

          {/* Right — chat area */}
          <div className="flex-1 flex flex-col">
            {/* Chat header */}
            <div className="px-5 py-3 border-b border-[--bdr] flex items-center gap-3">
              <img src={convo.doctorPhoto} alt="" className="w-9 h-9 rounded-full object-cover" />
              <div>
                <div className="text-[13px] font-semibold" style={{ color: B.nv }}>{convo.doctor}</div>
                <div className="text-[10px] text-[#5a7a6e]">{convo.specialty}</div>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-[10px] text-green-600">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {messages.map(m => (
                <div key={m.id} className={cn('flex', m.from === 'patient' ? 'justify-end' : 'justify-start')}>
                  <div className={cn(
                    'max-w-[75%] px-4 py-2.5 rounded-2xl text-[12px]',
                    m.from === 'patient'
                      ? 'bg-sdt-600 text-white rounded-br-md'
                      : 'bg-gray-100 rounded-bl-md'
                  )} style={m.from === 'doctor' ? { color: B.nv } : undefined}>
                    {m.text}
                    <div className={cn('text-[9px] mt-1 flex items-center gap-1', m.from === 'patient' ? 'text-white/60 justify-end' : 'text-[#5a7a6e]')}>
                      {m.time}
                      {m.from === 'patient' && m.read && <span className="text-[8px]">&#10003;&#10003;</span>}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-[--bdr] flex items-center gap-2">
              <button className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer border border-[--bdr] bg-white hover:bg-gray-50 transition-colors">
                <Paperclip className="w-4 h-4 text-[#5a7a6e]" />
              </button>
              <Input
                placeholder="Scrie un mesaj..."
                className="flex-1 text-[12px]"
                value={msgInput}
                onChange={e => setMsgInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMsg()}
              />
              <button onClick={sendMsg} className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer border-none bg-sdt-600 hover:bg-sdt-700 transition-colors">
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ━━━ 6. NOTIFICARI ━━━
  const renderNotificari = () => {
    const types = ['all', 'appointment', 'treatment', 'document', 'family'] as const
    const typeLabels: Record<string, string> = { all: 'Toate', appointment: 'Programari', treatment: 'Tratamente', document: 'Documente', family: 'Familie' }

    const filtered = NOTIFICATIONS.filter(n => notifFilter === 'all' || n.type === notifFilter)

    const toggleRead = (id: string) => {
      setReadNotifs(prev => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id); else next.add(id)
        return next
      })
    }

    const markAllRead = () => {
      setReadNotifs(new Set(NOTIFICATIONS.map(n => n.id)))
    }

    return (
      <div key="notificari" className="animate-fadeUp">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-display text-[22px] font-semibold" style={{ color: B.nv }}>Notificari</h1>
          <Button variant="outline" className="text-[12px] border-sdt-200 text-sdt-600" onClick={markAllRead}>
            <CheckCircle className="w-3.5 h-3.5 mr-1" /> Marcheaza toate ca citite
          </Button>
        </div>

        <div className="flex gap-2 mb-6">
          {types.map(t => (
            <button key={t} onClick={() => setNotifFilter(t)} className={cn(
              'px-3 py-1.5 rounded-full text-[11px] font-medium border-none cursor-pointer transition-all',
              notifFilter === t ? 'bg-sdt-600 text-white' : 'bg-gray-100 text-[#5a7a6e] hover:bg-gray-200'
            )}>
              {typeLabels[t]}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {filtered.map(n => {
            const isRead = readNotifs.has(n.id)
            const Icon = notifIcon(n.type)
            return (
              <div key={n.id} onClick={() => toggleRead(n.id)}
                className={cn(
                  'flex items-start gap-4 p-4 rounded-xl border transition-all cursor-pointer',
                  isRead ? 'border-[--bdr] bg-white' : 'border-sdt-200 bg-sdt-50/50'
                )}>
                <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0',
                  isRead ? 'bg-gray-100' : 'bg-sdt-100')}>
                  <Icon className={cn('w-4 h-4', isRead ? 'text-gray-400' : 'text-sdt-600')} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div className={cn('text-[13px] font-semibold', isRead ? 'text-gray-500' : '')} style={!isRead ? { color: B.nv } : undefined}>{n.title}</div>
                    <span className="text-[10px] text-[#5a7a6e] whitespace-nowrap ml-3">{n.date}</span>
                  </div>
                  <div className="text-[11px] text-[#5a7a6e] mt-0.5">{n.text}</div>
                  {n.actionLabel && !isRead && (
                    <button className="mt-2 text-[11px] text-sdt-600 font-semibold bg-transparent border-none cursor-pointer hover:underline">{n.actionLabel}</button>
                  )}
                </div>
                {!isRead && <span className="w-2 h-2 rounded-full bg-pink-500 mt-2 flex-shrink-0" />}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // ━━━ 7. FAMILIE ━━━
  const renderFamilie = () => {
    const allMembers = [
      {
        id: PATIENT.id, name: PATIENT.name, firstName: PATIENT.firstName, relation: 'Titular',
        age: PATIENT.age, dob: PATIENT.dob,
        photo: PATIENT.photo, doctor: PATIENT.doctor, lastVisit: '10 Feb 2026',
        activeConditions: ['Coroana zirconiu #15 (in curs)'],
        healthStatus: 'green' as const, healthNote: 'Sanatate buna, tratament in progres',
        treatmentsActive: TREATMENTS.filter(t => t.status === 'active' && !t.name.includes('Ana') && !t.name.includes('Sofia')).length,
      },
      ...localFamily,
    ]

    return (
      <div key="familie" className="animate-fadeUp">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-display text-[22px] font-semibold" style={{ color: B.nv }}>Familia Moraru</h1>
          <Button className="text-[12px] bg-sdt-600 hover:bg-sdt-700 text-white" onClick={() => setShowAddMember(true)}>
            <Users className="w-4 h-4 mr-2" /> Adauga membru
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {allMembers.map(m => (
            <Card key={m.id} className="border-[--bdr] cursor-pointer hover:border-sdt-200 transition-all" onClick={() => 'treatmentsActive' in m && m.id !== PATIENT.id ? setSelectedMember(m as FamilyMember) : setSelectedMember(null)}>
              <CardContent className="p-5 text-center">
                <div className="relative inline-block mb-3">
                  <img src={m.photo} alt="" className="w-16 h-16 rounded-full object-cover mx-auto" />
                  <span className={cn('absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white', healthDot(m.healthStatus))} />
                </div>
                <div className="text-[14px] font-semibold" style={{ color: B.nv }}>{m.name}</div>
                <div className="text-[11px] text-[#5a7a6e]">{m.relation} &middot; {m.age} ani</div>
                <div className="text-[10px] text-[#5a7a6e] mt-1">{m.doctor}</div>
                <div className="text-[10px] mt-2 text-[#5a7a6e]">Ultima vizita: {m.lastVisit}</div>
                {m.treatmentsActive > 0 && (
                  <Badge className="mt-2 text-[9px] bg-sdt-100 text-sdt-700 border-0">{m.treatmentsActive} tratament{m.treatmentsActive > 1 ? 'e' : ''} activ{m.treatmentsActive > 1 ? 'e' : ''}</Badge>
                )}
                {m.healthStatus !== 'green' && (
                  <div className="mt-2 p-2 rounded-lg bg-amber-50 border border-amber-100">
                    <div className="flex items-center gap-1 text-[10px] text-amber-600 font-semibold">
                      <AlertTriangle className="w-3 h-3" /> Reminder
                    </div>
                    <div className="text-[9px] text-amber-500 mt-0.5">{m.healthNote}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Family member detail modal */}
        {selectedMember && (
          <Modal onClose={() => setSelectedMember(null)}>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img src={selectedMember.photo} alt="" className="w-16 h-16 rounded-full object-cover" />
                  <span className={cn('absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white', healthDot(selectedMember.healthStatus))} />
                </div>
                <div>
                  <div className="text-[16px] font-semibold" style={{ color: B.nv }}>{selectedMember.name}</div>
                  <div className="text-[12px] text-[#5a7a6e]">{selectedMember.relation} &middot; {selectedMember.age} ani</div>
                  <div className="text-[11px] text-[#5a7a6e]">{selectedMember.doctor}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-[12px] font-semibold mb-2" style={{ color: B.nv }}>Stare de sanatate</div>
                  <div className="p-3 rounded-lg bg-sdt-50 text-[12px] text-[#5a7a6e]">{selectedMember.healthNote}</div>
                </div>

                {selectedMember.activeConditions.length > 0 && (
                  <div>
                    <div className="text-[12px] font-semibold mb-2" style={{ color: B.nv }}>Conditii active</div>
                    {selectedMember.activeConditions.map((c, i) => (
                      <div key={i} className="text-[11px] text-[#5a7a6e] flex items-center gap-2">
                        <TrendingUp className="w-3 h-3 text-sdt-600" /> {c}
                      </div>
                    ))}
                  </div>
                )}

                {selectedMember.nextVisit && (
                  <div className="flex items-center gap-2 text-[12px] text-[#5a7a6e]">
                    <Calendar className="w-3.5 h-3.5 text-sdt-600" /> Urmatoarea vizita: {selectedMember.nextVisit}
                  </div>
                )}
              </div>

              <Button className="w-full mt-6 bg-sdt-600 hover:bg-sdt-700 text-white text-[12px]"
                onClick={() => { setSelectedMember(null); setActiveNav('programari'); setShowNewAppointment(true) }}>
                <Calendar className="w-4 h-4 mr-2" /> Programeaza pentru {selectedMember.firstName}
              </Button>
            </div>
          </Modal>
        )}

        {/* Add member modal */}
        {showAddMember && (
          <Modal onClose={() => setShowAddMember(false)}>
            <div className="p-6">
              <h2 className="text-[18px] font-semibold mb-5" style={{ color: B.nv }}>Adauga membru familie</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-[12px] font-medium block mb-1" style={{ color: B.nv }}>Prenume si Nume</label>
                  <Input className="text-[12px]" placeholder="ex: Maria Moraru" value={addMemberName} onChange={e => setAddMemberName(e.target.value)} />
                </div>
                <div>
                  <label className="text-[12px] font-medium block mb-1" style={{ color: B.nv }}>Relatie</label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-[12px]" value={addMemberRelation} onChange={e => setAddMemberRelation(e.target.value)}>
                    <option value="">Selecteaza...</option>
                    <option value="Sotie">Sotie / Sot</option>
                    <option value="Fiu">Fiu</option>
                    <option value="Fiica">Fiica</option>
                    <option value="Parinte">Parinte</option>
                    <option value="Alta relatie">Alta relatie</option>
                  </select>
                </div>
                <div>
                  <label className="text-[12px] font-medium block mb-1" style={{ color: B.nv }}>Telefon</label>
                  <Input className="text-[12px]" placeholder="+373 ..." value={addMemberPhone} onChange={e => setAddMemberPhone(e.target.value)} />
                </div>
              </div>
              <Button className="w-full mt-6 bg-sdt-600 hover:bg-sdt-700 text-white text-[12px]" disabled={!addMemberName || !addMemberRelation} onClick={() => {
                const newMember: FamilyMember = {
                  id: `fam-${Date.now()}`, name: addMemberName, firstName: addMemberName.split(' ')[0],
                  relation: addMemberRelation, age: 0, dob: '', photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(addMemberName)}&background=0a6b5c&color=fff`,
                  doctor: 'Dr. Elena Rusu', lastVisit: '-', nextVisit: undefined,
                  activeConditions: [], healthStatus: 'green', healthNote: 'Nou adaugat', treatmentsActive: 0,
                }
                setLocalFamily(prev => [...prev, newMember])
                setShowAddMember(false); setAddMemberName(''); setAddMemberRelation(''); setAddMemberPhone('')
                setToast(`${addMemberName} a fost adaugat in familie!`)
              }}>
                Salveaza
              </Button>
            </div>
          </Modal>
        )}
      </div>
    )
  }

  // ━━━ 8. PLATI ━━━
  const renderPlati = () => {
    const totalPaid = PAYMENTS.filter(p => p.status === 'paid').reduce((a, p) => a + p.amount, 0)
    const totalPending = PAYMENTS.filter(p => p.status === 'pending').reduce((a, p) => a + p.amount, 0)
    const IP = INSTALLMENT_PLAN

    // Spending by category
    const categories = [
      { name: 'Protetica', amount: 250, color: '#2563EB' },
      { name: 'Terapie', amount: 130, color: '#059669' },
      { name: 'Radiografie', amount: 25, color: '#d97706' },
      { name: 'Ortodontie (Ana)', amount: 800, color: '#0891b2' },
      { name: 'Sigilare (Sofia)', amount: 60, color: '#e8157a' },
    ]
    const maxAmount = Math.max(...categories.map(c => c.amount))

    return (
      <div key="plati" className="animate-fadeUp">
        <h1 className="font-display text-[22px] font-semibold mb-6" style={{ color: B.nv }}>Plati</h1>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {([
            { l: 'Total platit', v: `${totalPaid}\u20AC`, c: '#059669', bg: 'bg-green-50' },
            { l: 'Rest de plata', v: `${totalPending}\u20AC`, c: '#d97706', bg: 'bg-amber-50' },
            { l: 'Plan rate activ', v: `${IP.paidMonths}/${IP.months} luni`, c: B.p, bg: 'bg-sdt-50' },
          ] as const).map((s, i) => (
            <Card key={i} className="border-[--bdr]">
              <CardContent className="p-5">
                <div className="text-[11px] text-[#5a7a6e] mb-1">{s.l}</div>
                <div className="font-display text-[24px] font-semibold" style={{ color: s.c }}>{s.v}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-[1fr_300px] gap-6">
          <div className="space-y-6">
            {/* Payment history */}
            <Card className="border-[--bdr]">
              <CardContent className="p-6">
                <h2 className="font-display text-[16px] font-semibold mb-4" style={{ color: B.nv }}>Istoric plati</h2>
                <div className="space-y-2">
                  {PAYMENTS.map(p => {
                    const sb = statusBadge(p.status)
                    const isExpanded = expandedPayment === p.id
                    return (
                      <div key={p.id}>
                        <div onClick={() => setExpandedPayment(isExpanded ? null : p.id)}
                          className="flex items-center gap-4 p-3 rounded-xl border border-[--bdr] hover:border-sdt-200 cursor-pointer transition-all bg-white">
                          <div className="text-[11px] text-[#5a7a6e] w-[100px]">{p.number}</div>
                          <div className="text-[11px] text-[#5a7a6e] w-[90px]">{p.date}</div>
                          <div className="text-[12px] font-medium flex-1" style={{ color: B.nv }}>{p.service}</div>
                          <div className="text-[14px] font-semibold" style={{ color: B.nv }}>{p.amount}&euro;</div>
                          <Badge className={cn('text-[9px] font-bold border-0', sb.cls)}>{sb.label}</Badge>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-[#5a7a6e]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#5a7a6e]" />}
                        </div>
                        {isExpanded && (
                          <div className="ml-4 mt-1 p-3 rounded-lg bg-gray-50 text-[11px] text-[#5a7a6e] space-y-1">
                            <div>Metoda: {p.method}</div>
                            <div>Data: {p.date}</div>
                            <div>Serviciu: {p.service}</div>
                            <div>Suma: {p.amount}&euro;</div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Installment plan */}
            <Card className="border-[--bdr]">
              <CardContent className="p-6">
                <h2 className="font-display text-[16px] font-semibold mb-2" style={{ color: B.nv }}>Plan de rate</h2>
                <div className="text-[12px] text-[#5a7a6e] mb-4">{IP.treatment} &middot; Dobanda: {IP.interest}</div>
                <div className="flex justify-between text-[11px] mb-2">
                  <span className="text-[#5a7a6e]">Platit: {IP.paid}&euro;</span>
                  <span className="text-[#5a7a6e]">Ramas: {IP.remaining}&euro;</span>
                  <span className="font-semibold" style={{ color: B.nv }}>Total: {IP.totalAmount}&euro;</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${(IP.paid / IP.totalAmount) * 100}%` }} />
                </div>
                <div className="grid grid-cols-12 gap-1 mb-3">
                  {Array.from({ length: IP.months }, (_, i) => (
                    <div key={i} className={cn(
                      'h-8 rounded-md flex items-center justify-center text-[9px] font-bold',
                      i < IP.paidMonths ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'
                    )}>
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div className="text-[11px] text-[#5a7a6e]">Urmatoarea rata: {IP.nextPaymentDate} &middot; {IP.monthlyRate}&euro;</div>
              </CardContent>
            </Card>
          </div>

          {/* Spending by category */}
          <Card className="border-[--bdr] h-fit">
            <CardContent className="p-5">
              <h3 className="font-display text-[15px] font-semibold mb-4" style={{ color: B.nv }}>Cheltuieli pe categorie</h3>
              <div className="space-y-3">
                {categories.map((c, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span style={{ color: B.nv }}>{c.name}</span>
                      <span className="font-semibold" style={{ color: c.color }}>{c.amount}&euro;</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(c.amount / maxAmount) * 100}%`, background: c.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // ━━━ 9. SETARI ━━━
  const renderSetari = () => {
    return (
      <div key="setari" className="animate-fadeUp max-w-[640px]">
        <h1 className="font-display text-[22px] font-semibold mb-6" style={{ color: B.nv }}>Setari</h1>

        {/* Profile */}
        <Card className="border-[--bdr] mb-6">
          <CardContent className="p-6">
            <h2 className="font-display text-[16px] font-semibold mb-4" style={{ color: B.nv }}>Profil</h2>
            <div className="flex items-center gap-4 mb-6">
              <img src={PATIENT.photo} alt="" className="w-16 h-16 rounded-full object-cover" />
              <div>
                <div className="text-[14px] font-semibold" style={{ color: B.nv }}>{PATIENT.name}</div>
                <div className="text-[11px] text-[#5a7a6e]">{PATIENT.code}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[12px] font-medium block mb-1" style={{ color: B.nv }}>Prenume</label>
                <Input className="text-[12px]" value={settFirstName} onChange={e => { setSettFirstName(e.target.value); setSettSaved(false) }} />
              </div>
              <div>
                <label className="text-[12px] font-medium block mb-1" style={{ color: B.nv }}>Nume</label>
                <Input className="text-[12px]" value={settLastName} onChange={e => { setSettLastName(e.target.value); setSettSaved(false) }} />
              </div>
              <div>
                <label className="text-[12px] font-medium block mb-1" style={{ color: B.nv }}>Telefon</label>
                <Input className="text-[12px]" value={settPhone} onChange={e => { setSettPhone(e.target.value); setSettSaved(false) }} />
              </div>
              <div>
                <label className="text-[12px] font-medium block mb-1" style={{ color: B.nv }}>Email</label>
                <Input className="text-[12px]" value={settEmail} onChange={e => { setSettEmail(e.target.value); setSettSaved(false) }} />
              </div>
            </div>
            <Button className={cn('mt-4 text-[12px]', settSaved ? 'bg-green-600 hover:bg-green-700' : 'bg-sdt-600 hover:bg-sdt-700', 'text-white')}
              onClick={() => setSettSaved(true)}>
              {settSaved ? <><CheckCircle className="w-4 h-4 mr-1" /> Salvat!</> : 'Salveaza modificarile'}
            </Button>
          </CardContent>
        </Card>

        {/* Notification preferences */}
        <Card className="border-[--bdr] mb-6">
          <CardContent className="p-6">
            <h2 className="font-display text-[16px] font-semibold mb-4" style={{ color: B.nv }}>Preferinte notificari</h2>
            <div className="space-y-3">
              {([
                { key: 'programari' as const, label: 'Programari' },
                { key: 'tratamente' as const, label: 'Tratamente' },
                { key: 'mesaje' as const, label: 'Mesaje' },
                { key: 'sistem' as const, label: 'Sistem' },
              ]).map(p => (
                <div key={p.key} className="flex items-center justify-between">
                  <span className="text-[13px]" style={{ color: B.nv }}>{p.label}</span>
                  <button
                    onClick={() => setNotifPrefs(prev => ({ ...prev, [p.key]: !prev[p.key] }))}
                    className={cn(
                      'w-10 h-6 rounded-full border-none cursor-pointer transition-all relative',
                      notifPrefs[p.key] ? 'bg-sdt-600' : 'bg-gray-300'
                    )}
                  >
                    <span className={cn(
                      'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all',
                      notifPrefs[p.key] ? 'left-[18px]' : 'left-0.5'
                    )} />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Language */}
        <Card className="border-[--bdr] mb-6">
          <CardContent className="p-6">
            <h2 className="font-display text-[16px] font-semibold mb-4" style={{ color: B.nv }}>Limba</h2>
            <div className="flex gap-3">
              {(['ro', 'ru', 'en'] as const).map(l => (
                <label key={l} className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all',
                  settLang === l ? 'border-sdt-400 bg-sdt-50' : 'border-[--bdr] hover:border-sdt-200'
                )}>
                  <input type="radio" name="lang" value={l} checked={settLang === l} onChange={() => setSettLang(l)} className="accent-[#0a6b5c]" />
                  <span className="text-[13px] font-medium" style={{ color: B.nv }}>
                    {l === 'ro' ? 'Romana' : l === 'ru' ? 'Rusa' : 'English'}
                  </span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Preferred clinic */}
        <Card className="border-[--bdr] mb-6">
          <CardContent className="p-6">
            <h2 className="font-display text-[16px] font-semibold mb-4" style={{ color: B.nv }}>Clinica preferata</h2>
            <select
              className="w-full h-10 rounded-md border border-input bg-background px-3 text-[12px]"
              value={settClinic}
              onChange={e => setSettClinic(e.target.value)}
            >
              {LOCATIONS.map((loc, i) => (
                <option key={i} value={loc.city}>{loc.city} &mdash; {loc.address}</option>
              ))}
            </select>
          </CardContent>
        </Card>

        {/* Danger zone */}
        <Card className="border-red-200 mb-6">
          <CardContent className="p-6">
            <h2 className="font-display text-[16px] font-semibold text-red-600 mb-4">Zona periculoasa</h2>
            <div className="flex gap-3">
              <Button variant="outline" className="text-[12px] border-red-200 text-red-500 hover:bg-red-50">
                <Lock className="w-4 h-4 mr-1" /> Schimba codul de acces
              </Button>
              <Button variant="outline" className="text-[12px] border-red-200 text-red-500 hover:bg-red-50"
                onClick={() => { if (confirm('Esti sigur ca vrei sa stergi contul? Aceasta actiune este ireversibila.')) { /* noop */ } }}>
                <Trash2 className="w-4 h-4 mr-1" /> Sterge contul
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ━━━ 10. AI SUPORT ━━━
  const AI_QA: Record<string, string> = {
    'Cum ma pregatesc pentru implant?': 'Pentru implant dentar, recomandam: 1) Consultatie initiala cu CBCT (gratuit la SDT), 2) Nu fumati cu 48h inainte, 3) Mancati bine dimineata, 4) Informati doctorul despre medicamentele curente. Procedura dureaza 30-60 min sub anestezie locala. Recuperarea e rapida — 2-3 zile. Echipa noastra va fi alaturi de tine pas cu pas!',
    'Ce include Digital Check-Up?': 'Digital Check-Up la SDT include: scanner intraoral 3D complet, radiografie panoramica digitala, analiza CBCT (daca e necesar), evaluare parodontala, plan de tratament digital personalizat. Totul dureaza ~30 minute, 100% digital, 0 disconfort. Pret: de la 25€. Programeaza-te acum!',
    'Programeaza vizita': 'Cu placere! Poti programa direct din sectiunea "Programari" din meniu. Alege serviciul, clinica si ora care ti se potriveste. Sau suna la +373 22 881 414 pentru programare telefonica. Te asteptam!',
    'Despre rate 0%': 'Da, oferim rate 0% dobanda! Disponibil pentru: Implant Dentar (de la 350€), Coroane (de la 200€), All-On (de la 2997€), Ortodontie (de la 42€/luna), Fatete Dentare (de la 7000€). Plata se imparte in 6-24 rate fara dobanda. Vorbeste cu consultantul nostru pentru detalii personalizate.',
    'Urgenta dentara': 'In caz de urgenta dentara: Suna ACUM la +373 22 881 414. Clinica Chisinau Centru accepta urgente Lun-Vin 08:00-20:00, Sam 09:00-14:00. Pana ajungi: clateste cu apa calda sarata, aplica gheata pe exterior, ia un analgezic. NU aplica aspirina direct pe dinte!',
  }
  const aiSend = (text: string) => {
    if (!text.trim()) return
    setAiMessages(prev => [...prev, { role: 'user', text }])
    setAiInput(''); setAiTyping(true)
    setTimeout(() => {
      const answer = AI_QA[text] || 'Multumesc pentru intrebare! Un consultant SDT te va contacta in curand cu un raspuns detaliat. Poti suna si la +373 22 881 414 pentru asistenta imediata.'
      setAiMessages(prev => [...prev, { role: 'ai', text: answer }])
      setAiTyping(false)
    }, 1500)
  }
  const renderAISuport = () => (
    <div key="aisuport" className="animate-fadeUp">
      <div className="rounded-2xl border border-[--bdr] overflow-hidden bg-white" style={{ height: 'calc(100vh - 140px)' }}>
        {/* Header */}
        <div className="px-6 py-4 flex items-center gap-3" style={{ background: `linear-gradient(135deg, ${B.p}, #059669)` }}>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" strokeWidth={1.5} />
          </div>
          <div>
            <div className="text-[14px] font-semibold text-white">Asistent Virtual SDT</div>
            <div className="text-[11px] text-white/70 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-300" /> Online 24/7</div>
          </div>
          <Badge className="ml-auto bg-white/20 text-white border-0 text-[10px]"><Sparkles className="w-3 h-3 mr-1" /> AI Powered</Badge>
        </div>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3" style={{ height: 'calc(100% - 160px)' }}>
          {aiMessages.map((m, i) => (
            <div key={i} className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}>
              {m.role === 'ai' && <div className="w-7 h-7 rounded-full bg-sdt-100 flex items-center justify-center mr-2 flex-shrink-0 mt-1"><Bot className="w-3.5 h-3.5 text-sdt-600" /></div>}
              <div className={cn('max-w-[75%] px-4 py-2.5 rounded-2xl text-[12px] leading-relaxed',
                m.role === 'user' ? 'bg-sdt-600 text-white rounded-br-md' : 'bg-gray-100 rounded-bl-md'
              )} style={m.role === 'ai' ? { color: B.nv } : undefined}>{m.text}</div>
            </div>
          ))}
          {aiTyping && (
            <div className="flex justify-start">
              <div className="w-7 h-7 rounded-full bg-sdt-100 flex items-center justify-center mr-2 flex-shrink-0"><Bot className="w-3.5 h-3.5 text-sdt-600" /></div>
              <div className="bg-gray-100 px-4 py-2.5 rounded-2xl rounded-bl-md">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          {aiMessages.length === 1 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {Object.keys(AI_QA).map(q => (
                <button key={q} onClick={() => aiSend(q)} className="px-3 py-2 rounded-xl border border-sdt-200 bg-sdt-50 text-[11px] font-medium text-sdt-700 cursor-pointer hover:bg-sdt-100 transition-colors">{q}</button>
              ))}
            </div>
          )}
        </div>
        {/* Input */}
        <div className="px-4 py-3 border-t border-[--bdr] flex items-center gap-2">
          <Input placeholder="Scrie o intrebare..." className="flex-1 text-[12px]" value={aiInput}
            onChange={e => setAiInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && aiSend(aiInput)} />
          <button onClick={() => aiSend(aiInput)} className="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer border-none bg-sdt-600 hover:bg-sdt-700 transition-colors">
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  )

  // ━━━ 11. SHOP ━━━
  const SHOP_PRODUCTS = [
    { id: 'p1', name: 'Periuta electrica Oral-B iO', desc: 'Series 9, cu senzor de presiune si timer', price: 149, cat: 'periute', rec: true, dr: 'Dr. Elena Rusu' },
    { id: 'p2', name: 'Pasta Sensodyne Pronamel', desc: 'Protectie email, pentru dinti sensibili', price: 8, cat: 'paste', rec: false, dr: '' },
    { id: 'p3', name: 'Apa de gura Listerine Total', desc: 'Protectie completa 6 in 1, 500ml', price: 6, cat: 'accesorii', rec: false, dr: '' },
    { id: 'p4', name: 'Ata dentara Oral-B Satin', desc: 'Cu ceara, mentol, 50m', price: 4, cat: 'accesorii', rec: false, dr: '' },
    { id: 'p5', name: 'Irigator oral Waterpik', desc: 'Ultra Professional, 10 nivele presiune', price: 89, cat: 'accesorii', rec: true, dr: 'Dr. Andrei Moraru' },
    { id: 'p6', name: 'Kit albire profesionala SDT', desc: 'Gutiere personalizate + gel profesional, 14 zile', price: 199, cat: 'kituri', rec: true, dr: 'Dr. Marina Calinescu' },
    { id: 'p7', name: 'Gutiera bruxism (noapte)', desc: 'Protectie personalizata contra bruxismului', price: 79, cat: 'kituri', rec: false, dr: '' },
    { id: 'p8', name: 'Set travel igiena dentara', desc: 'Periuta + pasta + ata + etui, format calatorie', price: 29, cat: 'kituri', rec: false, dr: '' },
    { id: 'p9', name: 'Periuta interdentara TePe', desc: 'Set 6 buc, diferite dimensiuni, ISO 1-5', price: 5, cat: 'periute', rec: false, dr: '' },
    { id: 'p10', name: 'Gel fluorid profesional', desc: 'Aplicare acasa, intarire email, 50ml', price: 15, cat: 'paste', rec: false, dr: '' },
  ]
  const SHOP_CATS = [
    { id: 'all', label: 'Toate' }, { id: 'periute', label: 'Periute' },
    { id: 'paste', label: 'Paste & Geluri' }, { id: 'accesorii', label: 'Accesorii' }, { id: 'kituri', label: 'Kituri profesionale' },
  ]
  const addToCart = (pid: string) => {
    setLocalCart(prev => {
      const existing = prev.find(c => c.id === pid)
      if (existing) return prev.map(c => c.id === pid ? { ...c, qty: c.qty + 1 } : c)
      return [...prev, { id: pid, qty: 1 }]
    })
    setToast('Produs adaugat in cos!')
  }
  const cartTotal = localCart.reduce((a, c) => {
    const p = SHOP_PRODUCTS.find(pr => pr.id === c.id)
    return a + (p ? p.price * c.qty : 0)
  }, 0)
  const renderShop = () => {
    const filtered = shopCategory === 'all' ? SHOP_PRODUCTS : SHOP_PRODUCTS.filter(p => p.cat === shopCategory)
    const recommended = SHOP_PRODUCTS.filter(p => p.rec)
    return (
      <div key="shop" className="animate-fadeUp">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-display text-[22px] font-semibold" style={{ color: B.nv }}>Produse de ingrijire</h1>
          <Button className="text-[12px] bg-sdt-600 hover:bg-sdt-700 text-white relative" onClick={() => setShowCart(true)}>
            <ShoppingCart className="w-4 h-4 mr-2" /> Cosul meu
            {cartCount > 0 && <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-pink-500 text-[9px] font-bold text-white flex items-center justify-center">{cartCount}</span>}
          </Button>
        </div>
        {/* Recommended */}
        {recommended.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span className="text-[13px] font-semibold" style={{ color: B.nv }}>Recomandat pentru tine</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {recommended.map(p => (
                <Card key={p.id} className="border-pink-100 bg-pink-50/30">
                  <CardContent className="p-4">
                    <div className="w-full h-20 rounded-lg bg-gradient-to-br from-sdt-100 to-sdt-50 flex items-center justify-center mb-3">
                      <Package className="w-8 h-8 text-sdt-400" strokeWidth={1.2} />
                    </div>
                    <div className="text-[12px] font-semibold mb-0.5" style={{ color: B.nv }}>{p.name}</div>
                    <div className="text-[10px] text-[#5a7a6e] mb-2">{p.desc}</div>
                    {p.dr && <div className="text-[9px] text-pink-500 mb-2 flex items-center gap-1"><Star className="w-3 h-3" /> Recomandat de {p.dr}</div>}
                    <div className="flex items-center justify-between">
                      <span className="text-[16px] font-display font-semibold" style={{ color: B.p }}>{p.price}&euro;</span>
                      <Button size="sm" className="text-[10px] bg-sdt-600 hover:bg-sdt-700 text-white h-7" onClick={() => addToCart(p.id)}>
                        <Plus className="w-3 h-3 mr-1" /> Adauga
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
        {/* Categories */}
        <div className="flex gap-1 mb-4 bg-gray-100 rounded-xl p-1 w-fit">
          {SHOP_CATS.map(c => (
            <button key={c.id} onClick={() => setShopCategory(c.id)} className={cn(
              'px-3 py-1.5 rounded-lg text-[11px] font-medium border-none cursor-pointer transition-all',
              shopCategory === c.id ? 'bg-white text-sdt-700 shadow-sm' : 'bg-transparent text-[#5a7a6e]'
            )}>{c.label}</button>
          ))}
        </div>
        {/* Grid */}
        <div className="grid grid-cols-3 gap-4">
          {filtered.map(p => {
            const inCart = localCart.find(c => c.id === p.id)
            return (
              <Card key={p.id} className="border-[--bdr] hover:border-sdt-200 transition-all">
                <CardContent className="p-4">
                  <div className="w-full h-24 rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center mb-3">
                    <Package className="w-8 h-8 text-gray-300" strokeWidth={1.2} />
                  </div>
                  <div className="text-[12px] font-semibold mb-0.5" style={{ color: B.nv }}>{p.name}</div>
                  <div className="text-[10px] text-[#5a7a6e] mb-2">{p.desc}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-[16px] font-display font-semibold" style={{ color: B.p }}>{p.price}&euro;</span>
                    {inCart ? (
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => setLocalCart(prev => prev.map(c => c.id === p.id ? { ...c, qty: Math.max(0, c.qty - 1) } : c).filter(c => c.qty > 0))}
                          className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center cursor-pointer border-none hover:bg-gray-200"><Minus className="w-3 h-3" /></button>
                        <span className="text-[12px] font-semibold w-4 text-center">{inCart.qty}</span>
                        <button onClick={() => addToCart(p.id)}
                          className="w-6 h-6 rounded-md bg-sdt-100 flex items-center justify-center cursor-pointer border-none hover:bg-sdt-200"><Plus className="w-3 h-3 text-sdt-700" /></button>
                      </div>
                    ) : (
                      <Button size="sm" className="text-[10px] bg-sdt-600 hover:bg-sdt-700 text-white h-7" onClick={() => addToCart(p.id)}>
                        <Plus className="w-3 h-3 mr-1" /> Adauga
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
        {/* Cart modal */}
        {showCart && (
          <Modal onClose={() => setShowCart(false)}>
            <div className="p-6">
              <h2 className="text-[18px] font-semibold mb-4" style={{ color: B.nv }}>Cosul tau ({cartCount} produse)</h2>
              {localCart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <div className="text-[13px] text-[#5a7a6e]">Cosul este gol</div>
                </div>
              ) : (
                <div className="space-y-3 mb-4">
                  {localCart.map(ci => {
                    const p = SHOP_PRODUCTS.find(pr => pr.id === ci.id)
                    if (!p) return null
                    return (
                      <div key={ci.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                        <div className="w-10 h-10 rounded-lg bg-sdt-50 flex items-center justify-center flex-shrink-0">
                          <Package className="w-5 h-5 text-sdt-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] font-semibold truncate" style={{ color: B.nv }}>{p.name}</div>
                          <div className="text-[11px] text-[#5a7a6e]">{p.price}&euro; x {ci.qty}</div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => setLocalCart(prev => prev.map(c => c.id === ci.id ? { ...c, qty: Math.max(0, c.qty - 1) } : c).filter(c => c.qty > 0))}
                            className="w-6 h-6 rounded-md bg-white flex items-center justify-center cursor-pointer border border-[--bdr] hover:bg-gray-100"><Minus className="w-3 h-3" /></button>
                          <span className="text-[12px] font-semibold w-4 text-center">{ci.qty}</span>
                          <button onClick={() => addToCart(ci.id)}
                            className="w-6 h-6 rounded-md bg-white flex items-center justify-center cursor-pointer border border-[--bdr] hover:bg-gray-100"><Plus className="w-3 h-3" /></button>
                        </div>
                        <span className="text-[13px] font-semibold w-14 text-right" style={{ color: B.nv }}>{p.price * ci.qty}&euro;</span>
                      </div>
                    )
                  })}
                </div>
              )}
              {localCart.length > 0 && (
                <>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-sdt-50 border border-sdt-100 mb-4">
                    <span className="text-[13px] font-semibold" style={{ color: B.nv }}>Total</span>
                    <span className="text-[18px] font-display font-semibold" style={{ color: B.p }}>{cartTotal}&euro;</span>
                  </div>
                  <Button className="w-full bg-sdt-600 hover:bg-sdt-700 text-white text-[12px]" onClick={() => {
                    setShowCart(false); setLocalCart([]); setToast('Comanda a fost trimisa! Te vom contacta pentru livrare.')
                  }}>Trimite comanda</Button>
                </>
              )}
            </div>
          </Modal>
        )}
      </div>
    )
  }

  /* ─── Section router ─── */
  const renderSection = () => {
    switch (activeNav) {
      case 'dashboard': return renderDashboard()
      case 'programari': return renderProgramari()
      case 'tratamente': return renderTratamente()
      case 'documente': return renderDocumente()
      case 'mesaje': return renderMesaje()
      case 'notificari': return renderNotificari()
      case 'familie': return renderFamilie()
      case 'plati': return renderPlati()
      case 'aisuport': return renderAISuport()
      case 'shop': return renderShop()
      case 'setari': return renderSetari()
    }
  }

  /* ═══ RENDER ═══ */
  return (
    <div className="min-h-screen bg-[#f8faf9]">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-[300] px-5 py-3 rounded-xl bg-sdt-700 text-white text-[12px] font-medium shadow-xl flex items-center gap-2 animate-fadeUp">
          <CheckCircle className="w-4 h-4" /> {toast}
        </div>
      )}
      {/* ━━━ Top Bar ━━━ */}
      <header className="bg-white border-b border-[--bdr] px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <a href="/" className="no-underline"><Logo height={30} /></a>
          <div className="h-6 w-px bg-[--bdr]" />
          <span className="text-[12px] font-bold text-sdt-600 uppercase tracking-[.1em]">Cabinet Personal</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setActiveNav('notificari')}
            className="relative w-9 h-9 rounded-lg bg-sdt-50 flex items-center justify-center cursor-pointer border-none hover:bg-sdt-100 transition-colors">
            <Bell className="w-4 h-4 text-sdt-600" strokeWidth={1.5} />
            {unreadNotifs > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-500 text-[9px] font-bold text-white flex items-center justify-center">{unreadNotifs}</span>
            )}
          </button>
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveNav('setari')}>
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
        {/* ━━━ Sidebar ━━━ */}
        <aside className="w-[220px] bg-white border-r border-[--bdr] min-h-[calc(100vh-52px)] p-4 flex flex-col justify-between sticky top-[52px] h-[calc(100vh-52px)]">
          <div>
            {/* Patient card */}
            <div className="p-4 rounded-xl bg-sdt-50 border border-sdt-100 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <img src={PATIENT.photo} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="text-[13px] font-semibold" style={{ color: B.nv }}>{PATIENT.firstName}</div>
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
              {NAV_ITEMS.map(item => {
                const badge =
                  item.id === 'notificari' ? unreadNotifs :
                  item.id === 'mesaje' ? unreadMessages : 0
                return (
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
                    {badge > 0 && (
                      <span className={cn(
                        'ml-auto w-5 h-5 rounded-full text-[9px] font-bold text-white flex items-center justify-center',
                        item.id === 'notificari' ? 'bg-pink-500' : 'bg-sdt-400'
                      )}>{badge}</span>
                    )}
                  </button>
                )
              })}
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

        {/* ━━━ Main Content ━━━ */}
        <main className="flex-1 p-8">
          {renderSection()}
        </main>
      </div>
    </div>
  )
}

'use client'

import { useState, useRef, useEffect } from 'react'
import { Logo } from './Logo'
import { BRAND as B, CAMPAIGN_2026 } from '@/lib/brand'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  ArrowRight, Shield, Calendar, FileText, MessageCircle,
  Bell, Heart, Clock, CheckCircle, ChevronLeft, Smartphone,
  Lock, User, Star, TrendingUp, Zap, AlertCircle
} from 'lucide-react'

const ANIM = `
  @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  @keyframes pulse-soft { 0%,100% { opacity: .7; } 50% { opacity: 1; } }
  @keyframes slide-in { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes check-pop { 0% { transform: scale(0); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
`

/* ─── Auth steps ──────────────────────────── */
type AuthStep = 'code' | 'phone' | 'sms' | 'success'

/* ─── Benefits shown on left panel ────────── */
const BENEFITS = [
  { icon: Calendar, title: 'Programari online', desc: 'Programeaza, reprogrameaza sau anuleaza vizitele direct din cabinet.' },
  { icon: FileText, title: 'Dosarul tau digital', desc: 'Tomografii 3D, scanari, planuri de tratament — totul intr-un singur loc.' },
  { icon: MessageCircle, title: 'Chat cu medicul', desc: 'Comunica direct cu echipa medicala, trimite poze, primeste sfaturi.' },
  { icon: Bell, title: 'Notificari smart', desc: 'Remindere pentru programari, controale periodice si tratamente in curs.' },
  { icon: TrendingUp, title: 'Istoric complet', desc: 'Urmareste evolutia tratamentului si compara rezultatele in timp.' },
  { icon: Shield, title: 'Date securizate', desc: 'Criptare end-to-end, conform GDPR. Datele tale sunt in siguranta.' },
]

/* ─── Component ───────────────────────────── */
export function AuthLoginPage() {
  const [step, setStep] = useState<AuthStep>('code')
  const [personalCode, setPersonalCode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phonePrefix, setPhonePrefix] = useState('+373')
  const [smsCode, setSmsCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const smsRefs = useRef<(HTMLInputElement | null)[]>([])
  const [countdown, setCountdown] = useState(0)

  // SMS countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(c => c - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [countdown])

  // ─── Handlers ───
  const handleCodeSubmit = () => {
    setError('')
    if (personalCode.length < 4) {
      setError('Codul trebuie sa contina minim 4 caractere.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep('phone')
    }, 800)
  }

  const handlePhoneSubmit = () => {
    setError('')
    if (phoneNumber.length < 6) {
      setError('Introduceti un numar de telefon valid.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep('sms')
      setCountdown(60)
      // Focus first SMS input
      setTimeout(() => smsRefs.current[0]?.focus(), 100)
    }, 1000)
  }

  const handleSmsInput = (idx: number, val: string) => {
    if (val.length > 1) val = val.slice(-1)
    if (val && !/^\d$/.test(val)) return
    const newCode = [...smsCode]
    newCode[idx] = val
    setSmsCode(newCode)
    // Auto-focus next
    if (val && idx < 5) {
      smsRefs.current[idx + 1]?.focus()
    }
    // Auto-submit when all 6 filled
    if (val && idx === 5 && newCode.every(c => c)) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setStep('success')
        // Redirect to cabinet after animation
        setTimeout(() => {
          window.location.href = '/cabinet'
        }, 2000)
      }, 1200)
    }
  }

  const handleSmsKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !smsCode[idx] && idx > 0) {
      smsRefs.current[idx - 1]?.focus()
    }
  }

  const handleResendSms = () => {
    if (countdown > 0) return
    setCountdown(60)
    // Simulate resend
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ANIM }} />
      <div className="min-h-screen grid grid-cols-2">

        {/* ━━━ LEFT PANEL — Benefits & Graphics ━━━ */}
        <div className="relative overflow-hidden flex flex-col justify-between p-12" style={{ background: `linear-gradient(160deg, ${B.nv} 0%, #0f2e24 50%, ${B.pd} 100%)` }}>
          {/* Logo */}
          <div>
            <a href="/" className="no-underline inline-block">
              <Logo height={36} light />
            </a>
          </div>

          {/* Main message */}
          <div className="flex-1 flex flex-col justify-center max-w-[440px]">
            <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[.08] px-3.5 py-1 w-fit">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
              <span className="text-[11px] font-bold uppercase tracking-[.12em] text-white">Cabinetul tau personal</span>
            </div>
            <h1 className="font-display text-[36px] font-semibold leading-[1.1] tracking-tight text-white mb-4">
              Sanatatea ta,<br/>
              <span className="text-pink-400">la un click distanta.</span>
            </h1>
            <p className="text-[15px] leading-relaxed text-white/[.55] mb-10">
              Acceseaza dosarul tau digital, programeaza vizite, comunica cu medicul si urmareste evolutia tratamentului — totul intr-un singur loc, securizat.
            </p>

            {/* Benefits grid */}
            <div className="grid grid-cols-2 gap-4">
              {BENEFITS.map((b, i) => (
                <div key={i} className="flex items-start gap-3" style={{ animation: `float ${3 + i * 0.3}s ${i * 0.5}s ease-in-out infinite` }}>
                  <div className="w-9 h-9 rounded-lg bg-white/[.06] border border-white/[.1] flex items-center justify-center flex-shrink-0">
                    <b.icon className="w-4 h-4 text-sdt-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-[12px] font-semibold text-white/80">{b.title}</div>
                    <div className="text-[10px] text-white/40 leading-[1.5] mt-0.5">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="flex items-center gap-3 text-[11px] text-white/30">
            <Shield className="w-3.5 h-3.5" />
            <span>Criptat end-to-end · GDPR compliant · Date securizate</span>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full border border-white/[.04]" />
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full border border-white/[.03]" />
        </div>

        {/* ━━━ RIGHT PANEL — Auth Form ━━━━━━━━━━ */}
        <div className="flex items-center justify-center p-12 bg-white relative">
          <div className="w-full max-w-[380px]">

            {/* ─── STEP 1: Personal Code ──────── */}
            {step === 'code' && (
              <div className="animate-fadeUp" style={{ animationDuration: '0.4s' }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${B.p}0D` }}>
                  <Lock className="w-7 h-7 text-sdt-600" strokeWidth={1.5} />
                </div>
                <h2 className="font-display text-[28px] font-semibold tracking-tight mb-2" style={{ color: B.nv }}>
                  Bine ai venit!
                </h2>
                <p className="text-sm text-[#5a7a6e] mb-8 leading-relaxed">
                  Introdu codul personal primit de la Smile Dent Team pentru a accesa cabinetul tau.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-[.1em] text-[#5a7a6e] mb-2 block">Cod personal</label>
                    <Input
                      placeholder="Ex: SDT-2024-XXXX"
                      value={personalCode}
                      onChange={e => { setPersonalCode(e.target.value.toUpperCase()); setError('') }}
                      onKeyDown={e => e.key === 'Enter' && handleCodeSubmit()}
                      className="text-center text-lg font-mono tracking-wider h-14 border-2 focus:border-sdt-600"
                      autoFocus
                    />
                  </div>

                  {error && (
                    <div className="text-sm text-red-500 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> {error}
                    </div>
                  )}

                  <Button
                    onClick={handleCodeSubmit}
                    disabled={loading}
                    className="w-full justify-center py-3.5 text-[15px] font-bold"
                    variant="accent"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Verificare...
                      </span>
                    ) : (
                      <>Continua <ArrowRight className="w-4 h-4 ml-1" /></>
                    )}
                  </Button>
                </div>

                <div className="mt-8 p-4 rounded-xl bg-sdt-50 border border-sdt-100">
                  <div className="text-[12px] font-semibold text-sdt-600 mb-1">Nu ai un cod?</div>
                  <p className="text-[11px] text-[#5a7a6e] leading-relaxed">
                    Codul personal se primeste la prima vizita la clinica sau la programarea consultatiei. <a href="/contacte" className="text-sdt-600 font-semibold no-underline">Contacteaza-ne</a> pentru ajutor.
                  </p>
                </div>
              </div>
            )}

            {/* ─── STEP 2: Phone Number ──────── */}
            {step === 'phone' && (
              <div className="animate-fadeUp" style={{ animationDuration: '0.4s' }}>
                <button onClick={() => setStep('code')} className="flex items-center gap-1.5 text-[13px] text-[#5a7a6e] mb-6 cursor-pointer bg-transparent border-none hover:text-sdt-600 transition-colors">
                  <ChevronLeft className="w-4 h-4" /> Inapoi
                </button>

                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${B.p}0D` }}>
                  <Smartphone className="w-7 h-7 text-sdt-600" strokeWidth={1.5} />
                </div>
                <h2 className="font-display text-[28px] font-semibold tracking-tight mb-2" style={{ color: B.nv }}>
                  Verifica identitatea
                </h2>
                <p className="text-sm text-[#5a7a6e] mb-2 leading-relaxed">
                  Cod verificat cu succes! Acum introdu numarul de telefon asociat contului.
                </p>
                <div className="flex items-center gap-2 mb-8">
                  <CheckCircle className="w-4 h-4 text-sdt-600" />
                  <span className="text-[12px] font-semibold text-sdt-600">Cod: {personalCode}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-[.1em] text-[#5a7a6e] mb-2 block">Numar de telefon</label>
                    <div className="flex gap-2">
                      <select
                        value={phonePrefix}
                        onChange={e => setPhonePrefix(e.target.value)}
                        className="w-[100px] h-14 rounded-md border-2 border-input bg-background px-3 text-sm font-semibold"
                      >
                        <option value="+373">🇲🇩 +373</option>
                        <option value="+40">🇷🇴 +40</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+49">🇩🇪 +49</option>
                        <option value="+33">🇫🇷 +33</option>
                        <option value="+1">🇺🇸 +1</option>
                      </select>
                      <Input
                        placeholder="69 123 456"
                        value={phoneNumber}
                        onChange={e => { setPhoneNumber(e.target.value.replace(/[^\d\s]/g, '')); setError('') }}
                        onKeyDown={e => e.key === 'Enter' && handlePhoneSubmit()}
                        className="flex-1 text-lg h-14 border-2 focus:border-sdt-600"
                        type="tel"
                        autoFocus
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="text-sm text-red-500 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> {error}
                    </div>
                  )}

                  <Button
                    onClick={handlePhoneSubmit}
                    disabled={loading}
                    className="w-full justify-center py-3.5 text-[15px] font-bold"
                    variant="accent"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Trimitem SMS...
                      </span>
                    ) : (
                      <>Trimite codul SMS <ArrowRight className="w-4 h-4 ml-1" /></>
                    )}
                  </Button>
                </div>

                <p className="text-[11px] text-[#5a7a6e] mt-6 text-center">
                  Vei primi un SMS cu un cod de 6 cifre pe acest numar.
                </p>
              </div>
            )}

            {/* ─── STEP 3: SMS Code ──────────── */}
            {step === 'sms' && (
              <div className="animate-fadeUp" style={{ animationDuration: '0.4s' }}>
                <button onClick={() => setStep('phone')} className="flex items-center gap-1.5 text-[13px] text-[#5a7a6e] mb-6 cursor-pointer bg-transparent border-none hover:text-sdt-600 transition-colors">
                  <ChevronLeft className="w-4 h-4" /> Schimba numarul
                </button>

                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${B.p}0D` }}>
                  <MessageCircle className="w-7 h-7 text-sdt-600" strokeWidth={1.5} />
                </div>
                <h2 className="font-display text-[28px] font-semibold tracking-tight mb-2" style={{ color: B.nv }}>
                  Introdu codul SMS
                </h2>
                <p className="text-sm text-[#5a7a6e] mb-1 leading-relaxed">
                  Am trimis un cod de 6 cifre pe numarul:
                </p>
                <div className="flex items-center gap-2 mb-8">
                  <Smartphone className="w-4 h-4 text-sdt-600" />
                  <span className="text-[14px] font-semibold" style={{ color: B.nv }}>{phonePrefix} {phoneNumber}</span>
                </div>

                {/* 6-digit SMS input */}
                <div className="flex gap-2.5 justify-center mb-6">
                  {smsCode.map((digit, i) => (
                    <input
                      key={i}
                      ref={el => { smsRefs.current[i] = el }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleSmsInput(i, e.target.value)}
                      onKeyDown={e => handleSmsKeyDown(i, e)}
                      className={cn(
                        'w-[52px] h-[64px] text-center text-2xl font-display font-semibold rounded-xl border-2 outline-none transition-all',
                        digit ? 'border-sdt-600 bg-sdt-50 text-sdt-700' : 'border-[--bdr] bg-white text-[#0a1e18]',
                        'focus:border-sdt-600 focus:ring-2 focus:ring-sdt-600/20'
                      )}
                    />
                  ))}
                </div>

                {loading && (
                  <div className="flex justify-center mb-4">
                    <span className="flex items-center gap-2 text-sdt-600 text-sm font-semibold">
                      <span className="w-4 h-4 border-2 border-sdt-200 border-t-sdt-600 rounded-full animate-spin" />
                      Verificare cod...
                    </span>
                  </div>
                )}

                {/* Resend */}
                <div className="text-center mt-4">
                  {countdown > 0 ? (
                    <span className="text-[13px] text-[#5a7a6e]">Retrimite codul in <span className="font-semibold text-sdt-600">{countdown}s</span></span>
                  ) : (
                    <button onClick={handleResendSms} className="text-[13px] font-semibold text-sdt-600 cursor-pointer bg-transparent border-none hover:text-pink-500 transition-colors">
                      Retrimite codul SMS
                    </button>
                  )}
                </div>

                <p className="text-[11px] text-[#5a7a6e] mt-6 text-center">
                  Nu ai primit codul? Verifica folderul de spam sau <a href="/contacte" className="text-sdt-600 font-semibold no-underline">contacteaza-ne</a>.
                </p>
              </div>
            )}

            {/* ─── STEP 4: Success ───────────── */}
            {step === 'success' && (
              <div className="text-center animate-fadeUp" style={{ animationDuration: '0.4s' }}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: `${B.p}15`, animation: 'check-pop 0.5s ease-out' }}>
                  <CheckCircle className="w-10 h-10 text-sdt-600" strokeWidth={1.5} />
                </div>
                <h2 className="font-display text-[28px] font-semibold tracking-tight mb-2" style={{ color: B.nv }}>
                  Autentificat cu succes!
                </h2>
                <p className="text-sm text-[#5a7a6e] mb-6">
                  Redirectionare catre cabinetul tau personal...
                </p>
                <div className="flex justify-center">
                  <span className="w-6 h-6 border-2 border-sdt-200 border-t-sdt-600 rounded-full animate-spin" />
                </div>
              </div>
            )}

          </div>

          {/* Bottom right decorative */}
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <p className="text-[11px] text-[#5a7a6e]/50">
              &copy; {CAMPAIGN_2026.year} Smile Dent Team · <a href="/" className="no-underline text-[#5a7a6e]/50 hover:text-sdt-600 transition-colors">smiledentteam.vercel.app</a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}


import { useState, useEffect } from 'react'
import { IconEye, IconEyeOff, IconArrowRight, IconShield, IconUser } from '../components/Icons'
import { motion, AnimatePresence } from 'framer-motion'

import logo from '../assets/IconCarryBank.jpg'
const PROFILES = [
  { label: '12 – 17 ans', sub: 'Compte mineur avec supervision parentale', key: 'minor' },
  { label: '18 – 25 ans', sub: 'Accès complet à votre espace client', key: 'adult' },
]

export default function Login({ onLogin }) {
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleProfile = (idx) => {
    setProfile(idx)
    setTimeout(() => setStep(2), 300)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) { setError('Veuillez remplir tous les champs.'); return }
    setError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin({ name: 'Lucas Martin', profile })
    }, 1400)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 sm:p-12 relative overflow-hidden bg-white font-sans">
      {/* Animated Background - Water/Fluid effect */}
      <div className="absolute inset-0 z-0 animate-gradient-shift bg-gradient-to-br from-white via-violet-50 to-indigo-50" />
      
      {/* Liquid Water Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-violet-400/20 blur-[100px] animate-water-fluid" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-indigo-400/20 blur-[120px] animate-water-fluid" style={{ animationDelay: '-4s' }} />
        <div className="absolute top-[20%] right-[-15%] w-[50%] h-[50%] bg-fuchsia-300/15 blur-[90px] animate-water-fluid" style={{ animationDelay: '-2s' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-7xl z-10 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24"
      >
        {/* Illustration Left (Desktop Only) */}
        <div className="hidden lg:flex flex-1 flex-col items-center justify-center text-center">
           <motion.div
             animate={{ 
               y: [0, -20, 0],
               rotate: [0, 2, 0]
             }}
             transition={{ 
               duration: 6, 
               repeat: Infinity,
               ease: "easeInOut" 
             }}
             className="w-full max-w-xl drop-shadow-[0_20px_50px_rgba(107,78,255,0.3)] mb-12"
           >
           </motion.div>
           <h2 className="font-display text-4xl font-extrabold text-slate-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
             L'avenir de la banque est là.
           </h2>
           <p className="text-lg font-medium text-slate-500 max-w-md">
             Gérez vos finances avec style, gagnez de l'XP et maîtrisez votre budget grâce à Carrybank.
           </p>
        </div>

        {/* Login Form Right */}
        <div className="w-full max-w-md">
          {/* Brand */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col mb-10"
          >
            <div className="flex items-center gap-4 mb-8">
              <img src={logo} alt="CarryBank Logo" className="h-10 w-auto rounded-lg shadow-sm" />
              <span className="font-display text-2xl font-bold tracking-tight text-slate-900">
                Carrybank
              </span>
            </div>

            {step === 1 ? (
              <div className="space-y-3">
                <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900">
                  Bonjour.
                </h1>
                <p className="text-base text-slate-500 font-medium">Sélectionnez votre profil pour continuer.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900">
                  Connexion
                </h1>
                <p className="text-base text-slate-500 font-medium">Profil : <span className="text-violet-600 font-semibold">{PROFILES[profile]?.label}</span></p>
              </div>
            )}
          </motion.div>


        {/* Card */}
        <motion.div 
          layout
          className="bg-white/70 backdrop-blur-2xl rounded-[2.5rem] p-8 sm:p-10 shadow-[0_32px_64px_-16px_rgba(124,58,237,0.12)] border border-white/60 ring-1 ring-slate-900/5 relative overflow-hidden"
        >
          {/* Subtle inner highlight */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-5"
              >
                {PROFILES.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleProfile(i)}
                    className="group flex items-center gap-5 p-6 w-full text-left rounded-2xl bg-white border-2 border-slate-100 hover:border-violet-500 hover:shadow-[0_8px_24px_-10px_rgba(124,58,237,0.3)] transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-violet-50 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                      <IconUser size={24} className="text-slate-400 group-hover:text-violet-600 transition-colors duration-300" />
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-slate-900 mb-1">{p.label}</p>
                      <p className="text-sm text-slate-500 leading-snug">{p.sub}</p>
                    </div>
                    <IconChevronRight size={20} className="text-slate-300 group-hover:text-violet-500 group-hover:translate-x-1 transition-all duration-300" />
                  </button>
                ))}

                <div className="flex items-center gap-3 mt-6 p-5 rounded-2xl bg-white/40 border border-white/60 shadow-sm">
                  <IconShield size={20} className="text-violet-500 flex-shrink-0" />
                  <p className="text-sm text-slate-600 font-medium">Connexion sécurisée par chiffrement bout-en-bout</p>
                </div>
              </motion.div>
            ) : (
              <motion.form 
                key="step2"
                onSubmit={handleSubmit} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-6"
              >
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-violet-600 transition-colors w-fit mb-4"
                >
                  <IconArrowLeft size={16} />
                  Changer de profil
                </button>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700 ml-1">
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="votre@email.fr"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-[15px] font-medium text-slate-900 placeholder-slate-400 focus:outline-none transition-all input-focus-effect"
                    autoFocus
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-1">
                    <label className="block text-sm font-semibold text-slate-700">
                      Mot de passe
                    </label>
                    <button type="button" className="text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors">
                      Oublié ?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 pr-12 text-[15px] font-medium text-slate-900 placeholder-slate-400 focus:outline-none transition-all input-focus-effect"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(v => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center p-2 rounded-lg hover:bg-slate-200/50"
                    >
                      {showPass ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-100 mt-2">
                    <p className="text-sm font-medium text-red-600">
                      {error}
                    </p>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-2xl py-4 px-6 shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)] hover:shadow-[0_12px_24px_-8px_rgba(124,58,237,0.6)] disabled:opacity-70 disabled:hover:translate-y-0 transition-all duration-200 mt-4 flex items-center justify-center btn-hover-effect"
                >
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity=".25" />
                        <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Connexion en cours...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-[15px]">
                      Se connecter <IconArrowRight size={18} />
                    </span>
                  )}
                </button>

                <div className="flex items-center gap-4 my-2">
                  <div className="flex-1 h-px bg-slate-100" />
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">ou</span>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>

                <button
                  type="button"
                  className="w-full bg-white border-2 border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-2xl py-4 px-6 transition-all duration-200 flex items-center justify-center gap-3"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-violet-600">
                    <path d="M12 2a5 5 0 100 10 5 5 0 000-10z"/>
                    <path d="M12 14c-5 0-9 2.5-9 4.5V21h18v-2.5c0-2-4-4.5-9-4.5z"/>
                  </svg>
                  Authentification biométrique
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        <p className="text-center text-sm font-medium mt-12 text-slate-400">
          © 2026 Carrybank. Tous droits réservés.
        </p>
        </div>
      </motion.div>
    </div>
  )
}

// Local alias
function IconChevronRight({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}
function IconArrowLeft({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
  )
}

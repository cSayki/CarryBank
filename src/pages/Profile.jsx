import { useState } from 'react'
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer
} from 'recharts'
import {
  IconAward, IconCheck, IconZap, IconSettings, IconShield, IconBell, IconActivity,
  IconUser, IconFire, IconBook
} from '../components/Icons'
import { quests } from '../data/mockData'
import { useGlobal } from '../context/GlobalState'
import { motion, AnimatePresence } from 'framer-motion'

const TABS = [
  { id: 'overview', label: 'Vue d\'ensemble', icon: IconActivity },
  { id: 'stats', label: 'Statistiques', icon: IconZap },
  { id: 'wealth', label: 'Succès', icon: IconAward },
  { id: 'settings', label: 'Paramètres', icon: IconSettings },
]

const RADAR_DATA = [
  { subject: 'Épargne', value: 85 },
  { subject: 'Investissement', value: 40 },
  { subject: 'Budget', value: 90 },
  { subject: 'Régularité', value: 100 },
  { subject: 'Quêtes', value: 70 },
]

const BADGES = [
  { id: 1, name: 'Premier Pas', icon: 'zap', desc: 'Première connexion réussie', earned: true, Icon: IconZap },
  { id: 2, name: 'Économe', icon: 'piggy', desc: '100€ épargnés ce mois', earned: true, Icon: IconAward },
  { id: 3, name: 'Régulier', icon: 'check', desc: 'Connecté 7 jours de suite', earned: false, Icon: IconCheck },
  { id: 4, name: 'Analyste', icon: 'book', desc: 'A lu 3 articles', earned: false, Icon: IconBook },
  { id: 5, name: 'Investisseur', icon: 'fire', desc: 'Premier placement', earned: false, Icon: IconFire },
]

const ACTIVITY = [
  { text: 'Badge "Économe" débloqué', sub: 'Il y a 2 jours', icon: 'award', Icon: IconAward },
  { text: 'Quête "Budget Alimentation" terminée', sub: 'Semaine dernière', icon: 'check', Icon: IconCheck },
  { text: 'Level Up : Niveau 3 !', sub: 'Mois dernier', icon: 'zap', Icon: IconZap },
]

const SETTINGS = [
  { label: 'Notifications Push', sub: 'Dépenses et alertes de budget', icon: 'bell', Icon: IconBell },
  { label: 'Mode Anonyme', sub: 'Masquer les soldes sur l\'accueil', icon: 'shield', Icon: IconShield },
  { label: 'Arrondi solidaire', sub: 'Donner les centimes à une asso', icon: 'activity', Icon: IconActivity },
  { label: 'Beta Tester', sub: 'Accès aux nouveautés en avance', icon: 'settings', Icon: IconSettings },
]

export default function Profile() {
  const { user, updateUserName, updateUserProfile } = useGlobal()
  const [activeTab, setActiveTab] = useState('overview')
  const [editName, setEditName] = useState(user.name)
  const [editing, setEditing] = useState(false)
  const [toggles, setToggles] = useState([true, false, true, false])
  
  // Settings edit state
  const [editInfo, setEditInfo] = useState({ 
    email: user.email, 
    phone: user.phone, 
    address: user.address 
  })

  const xpPct = Math.round((user.xp / user.xpToNext) * 100)
  const toggle = (i) => setToggles(t => t.map((v, j) => j === i ? !v : v))

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full font-sans pb-24 px-4 sm:px-6 mt-6 sm:mt-10">
      <div className="animate-slide-up">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">Profil</h1>
        <p className="text-slate-500 font-medium mt-1">Votre progression et vos paramètres</p>
      </div>

      {/* Profile hero card */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 ring-1 ring-slate-900/5 animate-slide-up-delayed">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center font-display font-bold text-3xl ${user.avatarColor || 'bg-violet-600'} text-white shrink-0 shadow-lg ring-4 ring-white relative overflow-hidden`}
          >
            {user.name.split(' ').map(n=>n[0]).join('').substring(0,2)}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none" />
          </motion.div>
          
          <div className="flex-1 min-w-0 text-center sm:text-left">
            {editing ? (
              <input
                autoFocus
                value={editName}
                onChange={e => setEditName(e.target.value)}
                onBlur={() => {
                  if (editName.trim()) updateUserName(editName.trim())
                  else setEditName(user.name)
                  setEditing(false)
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    if (editName.trim()) updateUserName(editName.trim())
                    else setEditName(user.name)
                    setEditing(false)
                  }
                }}
                className="w-full max-w-[240px] bg-white border border-violet-200 shadow-sm rounded-xl px-4 py-2 font-display text-2xl font-bold text-slate-900 focus:outline-none text-center sm:text-left mb-3 transition-all"
              />
            ) : (
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-1">
                <h2 className="font-display font-bold text-3xl text-slate-900">{user.name}</h2>
                <button
                  onClick={() => setEditing(true)}
                  className="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
              </div>
            )}
            <p className="text-sm font-semibold text-slate-500 mb-4 sm:ml-0.5">Membre depuis Mars 2024</p>
            <div className="flex justify-center sm:justify-start gap-2 flex-wrap mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-semibold bg-violet-100 text-violet-700">
                <IconZap size={14} /> Niv. {user.level}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-bold bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200/50">
                <IconAward size={14} /> {user.rank}
              </span>
            </div>
            
            <div className="w-full max-w-sm mx-auto sm:mx-0">
              <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                <span>XP Globale</span>
                <span className="text-violet-600 tracking-wide">{user.xp} / {user.xpToNext}</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner ring-1 ring-black/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPct}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full shadow-[0_0_12px_rgba(124,58,237,0.3)]"
                />
              </div>
            </div>
          </div>
          
          <div className="hidden sm:flex flex-col items-end gap-2 shrink-0">
             <div className="bg-gradient-to-br from-violet-600 to-indigo-700 px-6 py-4 rounded-3xl text-center shadow-xl shadow-violet-200">
                <p className="font-display font-bold text-3xl text-white mb-0.5">#3</p>
                <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest">Classement</p>
              </div>
              <div className="flex items-center gap-1.5 px-4 py-2 bg-amber-50 rounded-2xl border border-amber-100 text-amber-700">
                <IconFire size={16} />
                <span className="font-bold text-sm tracking-tight">{user.streak} JOURS</span>
              </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-2 p-1.5 bg-slate-900/5 rounded-2xl overflow-x-auto no-scrollbar scroll-smooth">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all relative shrink-0
              ${activeTab === tab.id ? 'text-violet-700' : 'text-slate-500 hover:text-slate-700'}`}
          >
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTab"
                className="absolute inset-0 bg-white shadow-sm rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <tab.icon size={18} className="relative z-10" />
            <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="min-h-[400px]"
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 ring-1 ring-slate-900/5">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600">
                      <IconActivity size={24} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl text-slate-900">Persona Financier</h3>
                      <p className="text-sm font-medium text-slate-500">D'après vos habitudes récentes</p>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 mb-8 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full -translate-y-12 translate-x-12 blur-3xl group-hover:bg-violet-500/10 transition-colors" />
                     <p className="text-xs font-bold text-violet-600 uppercase tracking-widest mb-3">Votre profil actuel</p>
                     <h4 className="font-display font-bold text-2xl text-slate-900 mb-3">{user.persona || 'Le Stratège Économe'}</h4>
                     <p className="text-sm font-medium text-slate-600 leading-relaxed mb-6">Vous avez une excellente maîtrise de vos dépenses fixes. Votre force réside dans la régularité de vos virements vers vos coffres d'épargne (+12% ce mois).</p>
                     <div className="flex gap-2">
                        {['Discipliné', 'Prévoyant', 'Analytique'].map(tag => (
                          <span key={tag} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-wider">{tag}</span>
                        ))}
                     </div>
                  </div>
                  
                  <div className="space-y-4">
                     <h4 className="text-sm font-bold text-slate-900 px-2 uppercase tracking-widest text-[11px]">Insights de santé</h4>
                     {[
                       { label: 'Indice d\'épargne', val: '8.4/10', color: 'text-emerald-500' },
                       { label: 'Risque de découvert', val: 'Très faible', color: 'text-emerald-500' },
                       { label: 'Score "CarryPlus"', val: '742', color: 'text-violet-600' }
                     ].map((item, i) => (
                       <div key={i} className="flex justify-between items-center p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                         <span className="text-sm font-semibold text-slate-600">{item.label}</span>
                         <span className={`text-sm font-bold ${item.color}`}>{item.val}</span>
                       </div>
                     ))}
                  </div>
               </div>
               
               <div className="space-y-8">
                  <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 ring-1 ring-slate-900/5">
                     <h3 className="font-display font-bold text-xl text-slate-900 mb-6">Objectifs en cours</h3>
                     <div className="space-y-6">
                        {[{ n: 'Achat Appartement', p: 12, target: '45k €' }, { n: 'Voyage Japon', p: 68, target: '3500 €' }].map((o, i) => (
                          <div key={i}>
                            <div className="flex justify-between text-sm font-bold text-slate-900 mb-2">
                              <span>{o.n}</span>
                              <span className="text-slate-400 font-semibold">{o.target}</span>
                            </div>
                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${o.p}%` }}
                                transition={{ duration: 1, delay: 0.2 + i*0.2 }}
                                className="h-full bg-violet-600 rounded-full" 
                              />
                            </div>
                          </div>
                        ))}
                     </div>
                  </div>
                  
                  <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 ring-1 ring-slate-900/5">
                     <h3 className="font-display font-bold text-xl text-slate-900 mb-6">Activité récente</h3>
                     <div className="space-y-5">
                       {ACTIVITY.map((a, i) => (
                         <div key={i} className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                             <a.Icon size={18} />
                           </div>
                           <div className="flex-1">
                             <p className="text-sm font-bold text-slate-800 leading-tight">{a.text}</p>
                             <p className="text-[11px] font-semibold text-slate-400 mt-0.5">{a.sub}</p>
                           </div>
                         </div>
                       ))}
                     </div>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'stats' && (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 ring-1 ring-slate-900/5">
                  <h3 className="font-display font-bold text-xl text-slate-900 mb-6">Profil Financier</h3>
                  <div className="h-[300px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={RADAR_DATA}>
                        <PolarGrid stroke="#f1f5f9" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 700 }} />
                        <Radar dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.25} strokeWidth={2.5} dot={{ r: 4, fill: '#8b5cf6' }} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 ring-1 ring-slate-900/5">
                  <h3 className="font-display font-bold text-xl text-slate-900 mb-2">Constance d'Utilisation</h3>
                  <p className="text-sm font-medium text-slate-500 mb-8">Votre assiduité au cours des 4 derniers mois</p>
                  
                  {/* Heatmap-like visualization */}
                  <div className="grid grid-cols-12 gap-2 mb-8">
                     {Array.from({ length: 48 }).map((_, i) => (
                       <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.01 }}
                        key={i} 
                        className={`aspect-square rounded-[3px] sm:rounded-sm shadow-sm
                          ${i % 7 === 0 || i % 11 === 0 ? 'bg-violet-600' : 
                            i % 3 === 0 ? 'bg-violet-300' : 
                            i % 2 === 0 ? 'bg-violet-100' : 'bg-slate-50 border border-slate-100'}`}
                       />
                     ))}
                  </div>
                  
                  <div className="p-6 bg-violet-600 rounded-[2rem] text-white">
                     <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-2">Streak Actuel</p>
                     <div className="flex items-end gap-2">
                        <span className="font-display font-bold text-5xl leading-none">{user.streak || 12}</span>
                        <span className="text-sm font-bold mb-1 opacity-90 tracking-tight">jours d'affilée</span>
                     </div>
                     <p className="text-xs font-semibold mt-4 text-white/70 leading-relaxed">Continuez comme ça ! Vous êtes plus régulier que 92% des utilisateurs Carrybank.</p>
                  </div>
                </div>
             </div>
          )}

          {activeTab === 'wealth' && (
             <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 ring-1 ring-slate-900/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-slate-900">Badges et Trophées</h3>
                    <p className="text-sm font-medium text-slate-500 mt-1">Gagnez des points XP en complétant des défis</p>
                  </div>
                  <span className="inline-flex items-center px-5 py-2.5 rounded-2xl text-sm font-bold bg-violet-600 text-white shadow-lg shadow-violet-200">
                    {BADGES.filter(b => b.earned).length} / {BADGES.length} Débloqués
                  </span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {BADGES.map((b, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5 }}
                      className={`group flex flex-col items-center text-center p-6 rounded-[2.5rem] transition-all duration-500 border-2 cursor-pointer
                        ${b.earned 
                          ? 'bg-white border-violet-100 hover:border-violet-300 shadow-sm hover:shadow-xl' 
                          : 'bg-slate-50/50 border-transparent opacity-40 grayscale hover:grayscale-0 hover:opacity-100'
                        }`}
                    >
                      <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-4 transition-all duration-500 group-hover:rotate-12
                        ${b.earned ? 'bg-violet-50 text-violet-600 shadow-inner' : 'bg-slate-100 text-slate-400'}`}
                      >
                        <b.Icon size={40} />
                      </div>
                      <div className="space-y-1">
                        <span className={`block font-bold text-base leading-tight ${b.earned ? 'text-slate-900' : 'text-slate-500'}`}>{b.name}</span>
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">{b.earned ? 'Débloqué' : 'Verrouillé'}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
             </div>
          )}

          {activeTab === 'settings' && (
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                <div className="lg:col-span-2 space-y-8">
                   <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 ring-1 ring-slate-900/5">
                      <h3 className="font-display font-bold text-xl text-slate-900 mb-8">Informations Personnelles</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                         {[
                           { label: 'E-mail', key: 'email', icon: IconBook },
                           { label: 'Téléphone', key: 'phone', icon: IconActivity },
                           { label: 'Adresse', key: 'address', icon: IconShield }
                         ].map(f => (
                           <div key={f.key} className="space-y-2">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{f.label}</label>
                              <div className="relative group">
                                 <input 
                                   value={editInfo[f.key]}
                                   onChange={e => setEditInfo({...editInfo, [f.key]: e.target.value})}
                                   className="w-full bg-slate-50/50 border border-slate-100 hover:border-violet-200 focus:border-violet-600 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-900 focus:outline-none transition-all focus:ring-4 focus:ring-violet-500/10"
                                 />
                              </div>
                           </div>
                         ))}
                         <div className="sm:col-span-2 pt-4">
                            <button 
                              onClick={() => {
                                updateUserProfile(editInfo)
                              }}
                              className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all btn-hover-effect"
                            >
                               Enregistrer les modifications
                            </button>
                         </div>
                      </div>
                   </div>

                   <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 ring-1 ring-slate-900/5">
                      <h3 className="font-display font-bold text-xl text-slate-900 mb-6 font-display">Préférences & Sécurité</h3>
                      <div className="divide-y divide-slate-100">
                        {SETTINGS.map((s, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-5 py-5 group cursor-pointer"
                            onClick={() => toggle(i)}
                          >
                            <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-violet-50 flex items-center justify-center flex-shrink-0 text-slate-500 group-hover:text-violet-600 transition-colors">
                              <s.Icon size={24} />
                            </div>
                            <div className="flex-1">
                              <p className="text-base font-bold text-slate-900">{s.label}</p>
                              <p className="text-xs font-semibold text-slate-500 mt-0.5">{s.sub}</p>
                            </div>
                            <div className={`w-12 h-6 rounded-full transition-colors relative ${toggles[i] ? 'bg-violet-600' : 'bg-slate-200'}`}>
                               <motion.div 
                                 animate={{ x: toggles[i] ? 24 : 2 }}
                                 className="absolute top-1 left-0 bg-white w-4 h-4 rounded-full shadow-sm" 
                               />
                            </div>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>

                <div className="space-y-8">
                   <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/20 rounded-full -translate-y-8 translate-x-8 blur-3xl pointer-events-none" />
                      <h3 className="font-display font-bold text-xl mb-4 relative z-10">Compte Premium</h3>
                      <p className="text-sm font-medium text-white/70 mb-8 leading-relaxed relative z-10">Libérez tout le potentiel de Carrybank avec le mode Expert : cashback illimité, IBAN personnalisés et coffres partagés.</p>
                      <button className="w-full py-4 bg-violet-600 hover:bg-violet-500 font-bold rounded-2xl transition-all shadow-xl shadow-violet-900/40">
                         Passer à CarryPlus
                      </button>
                   </div>
                   
                   <button className="w-full p-6 text-rose-600 font-bold rounded-[2rem] bg-rose-50 border border-rose-100 hover:bg-rose-100 transition-colors flex items-center justify-center gap-3">
                      Déconnexion
                   </button>
                </div>
             </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

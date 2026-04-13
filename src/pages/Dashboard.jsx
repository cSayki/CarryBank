import { useNavigate } from 'react-router-dom'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'
import {
  IconTrendingUp, IconTrendingDown, IconPiggyBank, IconZap,
  IconArrowRight, IconPlus, IconCar, IconPlane, IconMonitor, IconActivity, IconFire
} from '../components/Icons'
import { useGlobal } from '../context/GlobalState'

const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white px-4 py-3 rounded-xl shadow-lg border border-slate-100 text-sm">
      <p className="mb-2 font-bold text-slate-700">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-semibold flex justify-between gap-4">
          <span>{p.name}</span>
          <span>{p.value} €</span>
        </p>
      ))}
    </div>
  )
}

const SAVE_ICONS = { 1: IconCar, 2: IconPlane, 3: IconMonitor }

const TX_ICON_MAP = {
  'Revenus':     IconTrendingUp,
  'Alimentation': IconActivity,
  'Loisirs':     IconActivity,
  'Transport':   IconActivity,
  'Shopping':    IconActivity,
  'Épargne':     IconPiggyBank,
}

function StatCard({ label, value, sub, Icon, accent, delay = 0 }) {
  return (
    <div className={`bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 ring-1 ring-slate-900/5 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 animate-slide-up group cursor-pointer btn-hover-effect`} style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-start justify-between mb-6">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm ${accent ? 'bg-gradient-to-br from-violet-500 to-indigo-500 text-white' : 'bg-slate-50 text-slate-500'}`}>
          <Icon size={24} />
        </div>
        <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{label}</span>
      </div>
      <p className="font-display font-bold text-3xl sm:text-4xl text-slate-900 group-hover:text-violet-600 transition-colors">{value}</p>
      {sub && <p className="text-sm font-medium mt-2 text-slate-500">{sub}</p>}
    </div>
  )
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, transactions: mockTransactions, monthlyData, goals: savingsGoals } = useGlobal()
  
  return (
    <div className="flex flex-col gap-10 max-w-6xl mx-auto w-full mt-6 sm:mt-8">
      {/* Welcome & Banner */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-[2.5rem] p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl animate-slide-up flex flex-col md:flex-row items-center gap-8 group">
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/20 to-transparent pointer-events-none" />
        <div className="flex-1 relative z-10 text-center md:text-left">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
             Bonjour, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-lg font-medium text-white/70 max-w-md">
            Prêt à faire fructifier votre argent aujourd'hui ? Vous avez déjà épargné <span className="text-white font-bold">{user.savings.toFixed(0)}€</span> ce mois-ci !
          </p>
          <button className="mt-8 px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-violet-50 transition-all shadow-xl shadow-black/20 flex items-center gap-2 mx-auto md:mx-0 btn-hover-effect">
            Voir mes objectifs <IconArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard label="Solde net" value={`${user.balance.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €`} sub="Compte courant" Icon={IconActivity} accent delay={0} />
        <StatCard label="Épargne totale" value={`${user.savings.toFixed(0)} €`} sub="Tous mes comptes" Icon={IconPiggyBank} delay={60} />
        <StatCard label="Niveau XP" value={`Niv. ${user.level}`} sub={`${user.xp} / ${user.xpToNext} XP`} Icon={IconZap} delay={120} />
        <StatCard label="Streak" value={`${user.streak} jours`} sub="Connecté sans interruption" Icon={IconFire} delay={180} />
      </div>

      {/* Chart + Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Chart */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 ring-1 ring-slate-900/5 lg:col-span-3 animate-slide-up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="font-display font-bold text-xl text-slate-900">Évolution sur 6 mois</h3>
              <p className="text-sm font-medium text-slate-500 mt-1">Revenus, dépenses et épargne</p>
            </div>
            <div className="flex flex-wrap gap-4">
              {[
                { label: 'Revenus', color: '#8b5cf6' },
                { label: 'Dépenses', color: '#f43f5e' },
                { label: 'Épargne', color: '#10b981' },
              ].map((l, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full inline-block shadow-sm" style={{ background: l.color }} />
                  <span className="text-sm font-semibold text-slate-600">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gI" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gE" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gS" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} axisLine={false} tickLine={false} dy={10} />
                <YAxis tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area type="monotone" dataKey="income" name="Revenus" stroke="#8b5cf6" strokeWidth={3} fill="url(#gI)" dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#8b5cf6' }} activeDot={{ r: 6, strokeWidth: 0 }} />
                <Area type="monotone" dataKey="expenses" name="Dépenses" stroke="#f43f5e" strokeWidth={3} fill="url(#gE)" dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                <Area type="monotone" dataKey="savings" name="Épargne" stroke="#10b981" strokeWidth={3} fill="url(#gS)" dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent transactions */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 ring-1 ring-slate-900/5 lg:col-span-2 animate-slide-up-delayed">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-bold text-xl text-slate-900">Dernières opérations</h3>
            <button
              onClick={() => navigate('/transactions')}
              className="flex items-center gap-1.5 text-sm font-bold text-violet-600 hover:text-violet-700 transition-all bg-violet-50 hover:bg-violet-100 px-4 py-2 rounded-xl btn-hover-effect"
            >
              Voir tout <IconArrowRight size={14} />
            </button>
          </div>
          <div className="flex flex-col divide-y divide-slate-100">
            {mockTransactions.slice(0, 6).map((tx, i) => {
              const Icon = TX_ICON_MAP[tx.category] || IconActivity
              return (
                <div key={tx.id} className="flex items-center gap-4 py-4 group cursor-pointer hover:bg-slate-50/50 -mx-4 px-4 transition-colors rounded-2xl">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${
                      tx.amount > 0 ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-bold text-slate-900 truncate pr-4">{tx.label}</p>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">{tx.category}</p>
                  </div>
                  <span
                    className={`text-base font-display font-bold tracking-tight whitespace-nowrap ${
                      tx.amount > 0 ? 'text-emerald-500' : 'text-slate-700'
                    }`}
                  >
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)} €
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Savings goals */}
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-xl text-slate-900">Objectifs d'épargne</h3>
          <button className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 shadow-sm px-5 py-2.5 rounded-xl transition-all btn-hover-effect">
            <IconPlus size={16} />
            Ajouter un projet
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savingsGoals.map(goal => {
            const pct = Math.round((goal.current / goal.target) * 100)
            const GoalIcon = SAVE_ICONS[goal.id] || IconPiggyBank
            return (
              <div key={goal.id} className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 ring-1 ring-slate-900/5 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all cursor-pointer group btn-hover-effect">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center text-slate-500 shadow-sm border border-slate-200/50 group-hover:from-violet-500 group-hover:to-indigo-500 group-hover:text-white transition-all duration-300">
                    <GoalIcon size={28} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-bold text-slate-900 truncate">{goal.name}</p>
                    <p className="text-sm font-medium text-slate-500 mt-0.5">
                      <span className="text-slate-800 font-bold">{goal.current} €</span> / {goal.target} €
                    </p>
                  </div>
                  <span className="text-lg font-display font-bold text-violet-600 bg-violet-50 px-3 py-1 rounded-lg">{pct}%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner mb-3">
                  <div className="h-full bg-violet-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-xs font-semibold text-slate-400">
                  Objectif : {new Date(goal.deadline).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

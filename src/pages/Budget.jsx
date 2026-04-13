import { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import {
  IconShoppingBag, IconMusic, IconBus, IconActivity, IconPiggyBank, IconBook, IconPlus
} from '../components/Icons'
import { useGlobal } from '../context/GlobalState'

const CAT_ICONS = {
  'Alimentation': IconActivity,
  'Loisirs':      IconMusic,
  'Transport':    IconBus,
  'Shopping':     IconShoppingBag,
  'Abonnements':  IconActivity,
  'Épargne':      IconPiggyBank,
}

// One consistent color per category — no rainbow
const CAT_COLORS = {
  'Alimentation': { fg: 'text-slate-900',   bg: 'bg-slate-50', bar: '#8b5cf6' },
  'Loisirs':      { fg: 'text-slate-600', bg: 'bg-slate-50', bar: '#a78bfa' },
  'Transport':    { fg: 'text-slate-600', bg: 'bg-slate-50', bar: '#c4b5fd' },
  'Shopping':     { fg: 'text-slate-600', bg: 'bg-slate-50', bar: '#ddd6fe' },
  'Abonnements':  { fg: 'text-slate-600', bg: 'bg-slate-50', bar: '#ede9fe' },
  'Épargne':      { fg: 'text-emerald-500', bg: 'bg-emerald-50', bar: '#10b981' },
}

const PIE_COLORS = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe', '#10b981']

const TIPS = [
  "Épargner 10 % de vos revenus chaque mois vous permet de constituer un fonds d'urgence en moins d'un an.",
  "La règle 50/30/20 : 50 % besoins, 30 % envies, 20 % épargne. Un cadre simple et efficace.",
  "L'intérêt composé : 50 €/mois placés à 3 % representent plus de 8 000 € en 10 ans.",
  "Définir un plafond de dépenses par catégorie réduit les achats impulsifs de près de 30 %.",
]

export default function Budget() {
  const { budgetCategories } = useGlobal()
  const [openCat, setOpenCat] = useState(null)
  const [tipIdx, setTipIdx] = useState(0)
  const [income, setIncome] = useState(770)

  const total = budgetCategories.reduce((a, c) => a + c.budget, 0)
  const spent = budgetCategories.reduce((a, c) => a + c.spent, 0)
  const pieData = budgetCategories.map((c, i) => ({ name: c.name, value: c.spent }))

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full mt-6 sm:mt-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 animate-slide-up">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Budget</h1>
          <p className="text-base font-medium text-slate-500 mt-1">Mars 2026</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 border border-slate-200 rounded-xl shadow-sm">
          <label className="text-sm font-semibold text-slate-500">Revenu mensuel</label>
          <input
            type="number"
            value={income}
            onChange={e => setIncome(Number(e.target.value))}
            className="w-24 text-right font-bold text-slate-900 focus:outline-none placeholder-slate-400 bg-transparent rounded-lg px-2 input-focus-effect"
          />
          <span className="text-sm font-bold text-slate-500">€</span>
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
        {[
          { label: 'Budget alloué', value: `${total} €`, accent: false },
          { label: 'Dépensé', value: `${spent} €`, negative: true },
          { label: 'Disponible', value: `${total - spent} €`, positive: true },
        ].map((s, i) => (
          <div key={i} className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5 hover:shadow-[0_16px_40px_rgb(0,0,0,0.08)] transition-all">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">{s.label}</p>
            <p
              className={`font-display font-bold text-3xl sm:text-4xl ${s.positive ? 'text-emerald-500' : s.negative ? 'text-rose-500' : 'text-slate-900'}`}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* 50/30/20 rule */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5 animate-slide-up" style={{ animationDelay: '150ms' }}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-violet-100 flex items-center justify-center text-violet-600">
            <IconBook size={24} />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-slate-900">Règle 50 / 30 / 20</h3>
            <p className="text-sm font-medium text-slate-500 mt-0.5">Répartition recommandée de vos {income} €</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Besoins', pct: 50 },
            { label: 'Envies', pct: 30 },
            { label: 'Épargne', pct: 20 },
          ].map((item, i) => (
            <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
              <p className="font-display font-bold text-3xl text-violet-600">{item.pct}%</p>
              <p className="text-sm font-bold text-slate-700 mt-1 uppercase tracking-wide">{item.label}</p>
              <p className="text-sm font-semibold text-slate-500 mt-2">{Math.round(income * item.pct / 100)} €</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chart + categories */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Pie */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5 lg:col-span-2">
          <h3 className="font-display font-bold text-xl text-slate-900 mb-6">Répartition des dépenses</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value" stroke="none">
                {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
              </Pie>
              <Tooltip
                formatter={v => `${v} €`}
                contentStyle={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', color: '#0f172a', fontSize: '14px', fontWeight: 'bold', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-3 mt-6">
            {budgetCategories.map((c, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="w-3 h-3 rounded-full shrink-0 shadow-sm" style={{ background: PIE_COLORS[i] }} />
                <span className="flex-1 font-semibold text-slate-600">{c.name}</span>
                <span className="font-bold text-slate-900">{c.spent} €</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category bars */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <h3 className="font-display font-bold text-xl text-slate-900 px-2">Détail par catégorie</h3>
          {budgetCategories.map((cat, i) => {
            const pct = Math.round((cat.spent / cat.budget) * 100)
            const isHigh = pct > 88
            const Icon = CAT_ICONS[cat.name] || IconActivity
            const colors = CAT_COLORS[cat.name] || CAT_COLORS['Loisirs']
            return (
              <button
                key={i}
                onClick={() => setOpenCat(openCat === i ? null : i)}
                className="bg-white/80 backdrop-blur-md border border-white/50 text-left w-full p-5 sm:p-6 transition-all hover:bg-slate-50 cursor-pointer ring-1 ring-slate-900/5 rounded-2xl shadow-[0_4px_12px_rgb(0,0,0,0.02)] hover:shadow-[0_12px_24px_rgb(0,0,0,0.06)]"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colors.bg}`}>
                    <Icon size={20} className={colors.fg} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-base font-bold text-slate-900">{cat.name}</span>
                      <span className={`text-sm font-bold tabular-nums ${isHigh ? 'text-rose-500' : 'text-slate-600'}`}>
                        {cat.spent} € / {cat.budget} €
                      </span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${Math.min(pct, 100)}%`,
                          background: isHigh ? '#f43f5e' : colors.bar,
                        }}
                      />
                    </div>
                  </div>
                  <span className="w-12 text-right text-sm font-bold tabular-nums text-slate-400">
                    {pct}%
                  </span>
                </div>
                {openCat === i && (
                  <p className={`text-sm font-medium mt-4 pt-4 border-t border-slate-100 ${isHigh ? 'text-rose-600' : 'text-slate-500'}`}>
                    {isHigh
                      ? `Attention : vous avez utilisé ${pct}% de votre budget ${cat.name}. Il reste ${cat.budget - cat.spent} € disponibles.`
                      : `Vous êtes dans les limites. Il reste ${cat.budget - cat.spent} € disponibles dans cette catégorie.`
                    }
                  </p>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* AI tip */}
      <button
        className="bg-violet-50 p-6 sm:p-8 text-left w-full transition-all animate-slide-up cursor-pointer border border-violet-100 rounded-[2rem] hover:bg-violet-100"
        style={{ animationDelay: '200ms' }}
        onClick={() => setTipIdx(t => (t + 1) % TIPS.length)}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-200 flex items-center justify-center text-violet-700">
              <IconBook size={20} />
            </div>
            <span className="text-base font-bold text-violet-700 uppercase tracking-wide">Conseil du jour</span>
          </div>
          <span className="text-sm font-semibold text-violet-500">Suivant →</span>
        </div>
        <p className="text-base sm:text-lg font-medium leading-relaxed text-violet-900">{TIPS[tipIdx]}</p>
      </button>
    </div>
  )
}

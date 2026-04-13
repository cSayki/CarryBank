import { useState } from 'react'
import { IconSearch, IconFilter, IconTrendingUp, IconTrendingDown, IconActivity, IconPiggyBank, IconShoppingBag, IconBus } from '../components/Icons'
import { useGlobal } from '../context/GlobalState'
const CATS = ['Tout', 'Revenus', 'Alimentation', 'Loisirs', 'Transport', 'Shopping', 'Épargne']

const CAT_ICON = {
  'Revenus':      IconTrendingUp,
  'Alimentation': IconActivity,
  'Loisirs':      IconActivity,
  'Transport':    IconBus,
  'Shopping':     IconShoppingBag,
  'Épargne':      IconPiggyBank,
}

export default function Transactions() {
  const { transactions } = useGlobal()
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('Tout')
  const [asc, setAsc] = useState(false)

  const filtered = transactions
    .filter(tx => cat === 'Tout' || tx.category === cat)
    .filter(tx => tx.label.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => asc ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date))

  const totalIn  = filtered.filter(t => t.amount > 0).reduce((a, c) => a + c.amount, 0)
  const totalOut = filtered.filter(t => t.amount < 0).reduce((a, c) => a + Math.abs(c.amount), 0)

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full font-sans pb-24 px-4 sm:px-6 mt-6 sm:mt-10">
      <div className="animate-slide-up">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900">Transactions</h1>
        <p className="text-slate-500 font-medium mt-1">Historique de vos opérations</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-slide-up-delayed">
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 ring-1 ring-slate-900/5 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgb(0,0,0,0.08)] transition-all duration-300 group cursor-default">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm border border-emerald-100 group-hover:scale-110 group-hover:from-emerald-500 group-hover:text-white transition-all duration-300">
              <IconTrendingUp size={24} />
            </div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Entrées</p>
          </div>
          <p className="font-display font-bold text-3xl text-emerald-600">
            +{totalIn.toFixed(2)} €
          </p>
        </div>
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 ring-1 ring-slate-900/5 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgb(0,0,0,0.08)] transition-all duration-300 group cursor-default">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center text-rose-600 shadow-sm border border-red-100 group-hover:scale-110 group-hover:from-rose-500 group-hover:text-white transition-all duration-300">
              <IconTrendingDown size={24} />
            </div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Sorties</p>
          </div>
          <p className="font-display font-bold text-3xl text-rose-600">
            -{totalOut.toFixed(2)} €
          </p>
        </div>
        <div className="bg-gradient-to-br from-violet-600 to-indigo-800 border border-violet-500 rounded-3xl p-6 shadow-[0_12px_30px_rgba(124,58,237,0.3)] hover:shadow-[0_20px_40px_rgba(124,58,237,0.4)] transition-all duration-300 group cursor-default text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform duration-300">
              <IconActivity size={24} />
            </div>
            <p className="text-sm font-semibold text-violet-200 uppercase tracking-wider">Solde net</p>
          </div>
          <p
            className="font-display font-bold text-3xl"
          >
            {(totalIn - totalOut) >= 0 ? '+' : ''}{(totalIn - totalOut).toFixed(2)} €
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="relative flex-1 group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-violet-600 transition-colors">
            <IconSearch size={22} />
          </div>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher une opération..."
            className="w-full bg-white border border-slate-200 rounded-[1.25rem] py-4 pl-14 pr-4 text-base font-medium text-slate-900 placeholder-slate-400 focus:outline-none shadow-[0_4px_12px_rgb(0,0,0,0.03)] transition-all input-focus-effect"
          />
        </div>
        <button
          className="bg-white border border-slate-200 hover:border-violet-300 hover:bg-violet-50 text-slate-700 font-semibold py-4 px-8 rounded-[1.25rem] shadow-[0_4px_12px_rgb(0,0,0,0.03)] transition-all flex items-center justify-center gap-3 whitespace-nowrap btn-hover-effect"
          onClick={() => setAsc(v => !v)}
        >
          <IconFilter size={20} className="text-violet-600" />
          Trier: {asc ? 'Ancien' : 'Récent'}
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-3 flex-wrap animate-slide-up" style={{ animationDelay: '0.25s' }}>
        {CATS.map(c => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-6 py-3 rounded-[1rem] font-semibold text-[15px] transition-all duration-200 active:scale-95 btn-hover-effect ${
              cat === c 
                ? 'bg-violet-600 text-white shadow-[0_8px_20px_rgba(124,58,237,0.35)] -translate-y-0.5' 
                : 'bg-white text-slate-600 border border-slate-200 hover:border-violet-400 hover:bg-violet-50'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="bg-white/80 backdrop-blur-xl border border-white/50 ring-1 ring-slate-900/5 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden animate-slide-up" style={{ animationDelay: '0.3s' }}>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-20 h-20 rounded-[1.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
              <IconSearch size={40} className="text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium text-lg">Aucune transaction trouvée</p>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-slate-100">
            {filtered.map((tx, i) => {
              const Icon = CAT_ICON[tx.category] || IconActivity
              return (
                <div
                  key={tx.id}
                  className="flex items-center gap-4 sm:gap-6 p-5 sm:px-8 sm:py-6 transition-all hover:bg-slate-50 cursor-pointer group"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 ${
                      tx.amount > 0 ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-100 text-slate-500 group-hover:bg-violet-50 group-hover:text-violet-600'
                    }`}
                  >
                    <Icon size={26} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1.5">
                      <p className="text-lg font-bold text-slate-900 truncate pr-4">{tx.label}</p>
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 whitespace-nowrap">
                        {tx.category}
                      </span>
                    </div>
                    <p className="text-[15px] font-medium text-slate-400">
                      {new Date(tx.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                  <p
                    className={`font-display text-xl font-bold whitespace-nowrap transition-transform group-hover:translate-x-[-4px] ${
                      tx.amount > 0 ? 'text-emerald-500' : 'text-slate-700'
                    }`}
                  >
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)} €
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}


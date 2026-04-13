import { useState } from 'react'
import {
  IconPlus, IconArrowRight, IconPiggyBank, IconX, IconTarget
} from '../components/Icons'
import { useGlobal } from '../context/GlobalState'

function CreateAccountModal({ onClose, onCreate }) {
  const [name, setName] = useState('')
  const [limit, setLimit] = useState('')
  const [color, setColor] = useState('bg-violet-500')
  const colors = ['bg-violet-500', 'bg-emerald-500', 'bg-cyan-500', 'bg-rose-500', 'bg-amber-500']

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onCreate({
      name,
      limit: Number(limit) || 0,
      color,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-white w-full max-w-md p-8 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 animate-slide-up" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-2xl text-slate-900">Nouveau compte</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <IconX size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Nom du compte</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="ex: Voyage, Nouvel ordi..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none transition-all font-medium input-focus-effect"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Objectif / Plafond mensuel (€)</label>
            <input
              type="number"
              value={limit}
              onChange={e => setLimit(e.target.value)}
              placeholder="ex: 2000"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none transition-all font-medium input-focus-effect"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-3">Couleur</label>
            <div className="flex gap-3">
              {colors.map(c => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-full transition-transform hover:scale-110 ${c} ${color === c ? 'ring-4 ring-offset-2 ring-violet-200 scale-110' : ''}`}
                />
              ))}
            </div>
          </div>
          <button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-2xl py-4 mt-2 transition-all shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)] hover:shadow-[0_12px_24px_-8px_rgba(124,58,237,0.6)] btn-hover-effect">
            Créer le compte
          </button>
        </form>
      </div>
    </div>
  )
}

function TransferModal({ onClose, accounts, onTransfer }) {
  const [fromId, setFromId] = useState('main')
  const [toId, setToId] = useState(accounts.find(a => !a.isMain)?.id || '')
  const [amount, setAmount] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!amount || Number(amount) <= 0 || fromId === toId) return
    onTransfer(fromId, toId, amount)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-white w-full max-w-md p-8 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 animate-slide-up" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-bold text-2xl text-slate-900">Transfert</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
            <IconX size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Depuis</label>
            <select
              value={fromId}
              onChange={e => setFromId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none transition-all font-medium appearance-none input-focus-effect cursor-pointer"
            >
              {accounts.map(a => (
                <option key={a.id} value={a.id}>{a.name} ({a.balance} €)</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Vers</label>
            <select
              value={toId}
              onChange={e => setToId(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 focus:outline-none transition-all font-medium appearance-none input-focus-effect cursor-pointer"
            >
              {accounts.map(a => (
                <option key={a.id} value={a.id} disabled={a.id === fromId}>{a.name} ({a.balance} €)</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Montant (€)</label>
            <input
              type="number"
              required
              min="1"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="ex: 50"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none transition-all font-medium input-focus-effect"
            />
          </div>
          <button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-2xl py-4 mt-2 transition-all shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)] hover:shadow-[0_12px_24px_-8px_rgba(124,58,237,0.6)] btn-hover-effect">
            Valider le transfert
          </button>
        </form>
      </div>
    </div>
  )
}

export default function Savings() {
  const { accounts, createSavingsAccount, transferFunds } = useGlobal()
  const [showCreate, setShowCreate] = useState(false)
  const [showTransfer, setShowTransfer] = useState(false)

  const handleCreate = (newAcc) => {
    createSavingsAccount(newAcc)
    setShowCreate(false)
  }

  const handleTransfer = (fromId, toId, amount) => {
    transferFunds(fromId, toId, amount)
    setShowTransfer(false)
  }

  const mainAccount = accounts.find(a => a.isMain)
  const savingsAccounts = accounts.filter(a => !a.isMain)
  const totalSavings = savingsAccounts.reduce((sum, a) => sum + a.balance, 0)

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full mt-6 sm:mt-8">
      {showCreate && <CreateAccountModal onClose={() => setShowCreate(false)} onCreate={handleCreate} />}
      {showTransfer && <TransferModal onClose={() => setShowTransfer(false)} accounts={accounts} onTransfer={handleTransfer} />}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 animate-slide-up">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Comptes & Épargne</h1>
          <p className="text-base font-medium text-slate-500 mt-1">Gérez vos coffres et vos objectifs</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowTransfer(true)}
            className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm btn-hover-effect"
          >
            Transférer
          </button>
          <button 
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg btn-hover-effect"
          >
            <IconPlus size={18} />
            Nouveau
          </button>
        </div>
      </div>

      {/* Main Account Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className="bg-gradient-to-br from-violet-600 to-indigo-800 text-white rounded-[2rem] p-8 sm:p-10 shadow-[0_20px_60px_-15px_rgba(124,58,237,0.5)] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[60px] pointer-events-none -mr-32 -mt-32 transition-transform group-hover:scale-110 duration-700" />
          <div className="relative z-10 flex justify-between items-start mb-12">
            <div>
              <p className="text-violet-200 font-semibold mb-1">Compte Courant principal</p>
              <p className="font-display font-bold text-4xl sm:text-5xl">{mainAccount.balance.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex flex-shrink-0 items-center justify-center backdrop-blur-md shadow-inner">
              <IconPiggyBank size={24} />
            </div>
          </div>
          <p className="text-violet-200 font-medium font-mono text-sm tracking-widest">FR76 **** **** **** 8294</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5 flex flex-col justify-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Total épargné</p>
          <p className="font-display font-bold text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 mb-6">{totalSavings.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €</p>
          <div className="flex -space-x-3">
            {savingsAccounts.slice(0, 4).map((a, i) => (
              <div key={a.id} className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold ${a.color} shadow-sm z-[${10-i}]`}>
                {a.name.substring(0, 1)}
              </div>
            ))}
            {savingsAccounts.length > 4 && (
              <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center bg-slate-100 text-slate-600 text-xs font-bold shadow-sm z-0">
                +{savingsAccounts.length - 4}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vaults / Savings Accounts Liste */}
      <h3 className="font-display font-bold text-2xl text-slate-900 mt-4 px-2 animate-slide-up" style={{ animationDelay: '150ms' }}>Vos coffres</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
        {savingsAccounts.map((acc) => {
          const pct = Math.min(100, Math.round((acc.balance / (acc.limit || 1)) * 100))
          return (
            <div key={acc.id} className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${acc.color} shadow-md transition-transform group-hover:scale-110`}>
                  <IconTarget size={22} />
                </div>
                {pct >= 100 && (
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide">Atteint</span>
                )}
              </div>
              <h4 className="font-display font-bold text-xl text-slate-900 mb-1 truncate">{acc.name}</h4>
              <p className="font-bold text-2xl text-slate-700 mb-6">{acc.balance.toLocaleString('fr-FR')} €</p>
              
              {acc.limit > 0 && (
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">
                    <span>Progression</span>
                    <span>{pct}% ({acc.limit} €)</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ease-out ${acc.color}`}
                      style={{ width: `${pct}%` }} 
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
        
        {/* Empty state "Create" card */}
        <button 
          onClick={() => setShowCreate(true)}
          className="flex flex-col items-center justify-center gap-4 bg-slate-50/50 rounded-[2rem] p-6 border-2 border-dashed border-slate-200 hover:border-violet-400 hover:bg-violet-50/50 transition-all text-slate-400 hover:text-violet-600 min-h-[220px] group cursor-pointer"
        >
          <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform">
            <IconPlus size={24} />
          </div>
          <span className="font-bold text-lg">Nouveau coffre</span>
        </button>
      </div>

    </div>
  )
}

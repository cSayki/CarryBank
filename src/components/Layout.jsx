import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  IconHome, IconTarget, IconSword, IconList, IconUser,
  IconBell, IconZap, IconFire, IconCoin, IconLogOut, IconPiggyBank
} from './Icons'
import { useGlobal } from '../context/GlobalState'
import logo from '../assets/IconCarryBank.jpg'

const NAV = [
  { path: '/dashboard',    label: 'Tableau de bord', Icon: IconHome },
  { path: '/budget',       label: 'Budget',          Icon: IconTarget },
  { path: '/savings',      label: 'Épargne',         Icon: IconPiggyBank },
  { path: '/quests',       label: 'Défis',           Icon: IconSword },
  { path: '/transactions', label: 'Transactions',    Icon: IconList },
  { path: '/profile',      label: 'Profil',          Icon: IconUser },
]

export default function Layout({ children, onLogout }) {
  const { user } = useGlobal()
  const location = useLocation()
  const navigate = useNavigate()
  const xpPct = Math.round((user.xp / user.xpToNext) * 100)
  const current = NAV.find(n => n.path === location.pathname)
  const initials = user.name.split(' ').map(n => n[0]).join('').substring(0,2)

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      {/* ─── Sidebar ─── */}
      <aside className="hidden md:flex flex-col shrink-0 w-64 bg-white border-r border-slate-100 py-6 px-4 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        {/* Logo */}
        <div className="flex items-center gap-3 px-3 mb-10">
          <img src={logo} alt="CarryBank Logo" className="h-10 w-auto rounded-lg shadow-sm" />
          <span className="font-display font-bold text-xl tracking-tight text-slate-900">
            Carrybank
          </span>
        </div>

        {/* User summary */}
        <div className="px-3 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold bg-gradient-to-br from-violet-100 to-fuchsia-50 text-violet-700 shadow-sm border border-violet-100">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate text-slate-900">{user.name}</p>
              <p className="text-xs font-medium truncate text-slate-500">Niveau {user.level}</p>
            </div>
          </div>
          {/* XP progress */}
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${xpPct}%` }} />
          </div>
          <p className="text-xs font-semibold text-slate-400">
            {user.xp} / {user.xpToNext} XP
          </p>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1.5 flex-1">
          {NAV.map(({ path, label, Icon }) => {
            return (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-[15px] transition-all duration-300 group btn-hover-effect ${
                      isActive
                        ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_8px_20px_-6px_rgba(124,58,237,0.5)]'
                        : 'text-slate-500 hover:bg-violet-50 hover:text-violet-600'
                    }`
                  }
                >
                {({ isActive }) => (
                  <>
                    <Icon size={18} className={`shrink-0 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-violet-600'}`} />
                    <span className="flex-1 text-left">{label}</span>
                    {path === '/quests' && !location.pathname.startsWith('/quests') && (
                      <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-lg bg-violet-100 text-violet-700">
                        3
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Gamification stats */}
        <div className="flex flex-col gap-2 px-4 mb-6 pt-6 border-t border-slate-100 mt-4">
          <div className="flex items-center justify-between py-1.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-amber-50 flex items-center justify-center">
                <IconCoin size={14} className="text-amber-500" />
              </div>
              <span className="text-xs font-medium text-slate-500">NeoCoins</span>
            </div>
            <span className="text-sm font-bold text-slate-900">{user.coins}</span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-orange-50 flex items-center justify-center">
                <IconFire size={14} className="text-orange-500" />
              </div>
              <span className="text-xs font-medium text-slate-500">Streak</span>
            </div>
            <span className="text-sm font-bold text-slate-900">{user.streak}j</span>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 text-sm font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600 group btn-hover-effect"
        >
          <IconLogOut size={18} className="shrink-0 text-slate-400 group-hover:text-red-500 transition-colors" />
          <span>Déconnexion</span>
        </button>
      </aside>

      {/* ─── Main ─── */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top bar */}
        <header className="flex items-center justify-between shrink-0 px-6 sm:px-10 py-5 bg-white/70 backdrop-blur-2xl border-b border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)] z-10 sticky top-0">
          <div>
            <h2 className="font-display font-bold text-[22px] tracking-tight text-slate-900">
              {current?.label}
            </h2>
            <p className="text-sm font-medium text-slate-500 mt-0.5 hidden sm:block">Lundi 2 mars 2026</p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Streak pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-50 border border-orange-100 cursor-default hover:bg-orange-100 transition-colors">
              <IconFire size={16} className="text-orange-500 animate-pulse" />
              <span className="text-sm font-bold text-orange-700">{user.streak}j</span>
            </div>

            {/* Coins */}
            <button className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-all btn-hover-effect relative">
              <IconBell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-px bg-slate-200 rotate-90 mx-1"></div>
            <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-xl hover:bg-slate-50 transition-all group btn-hover-effect">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 group-hover:text-violet-600 transition-colors">{user.name}</p>
                <p className="text-[11px] font-bold text-violet-500 uppercase tracking-wider">{user.rank}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-indigo-50 flex items-center justify-center text-violet-600 font-bold border border-violet-200 group-hover:shadow-md transition-all">
                {initials}
              </div>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto px-6 sm:px-12 lg:px-16 pb-32 md:pb-12 bg-slate-50">
          {children}
        </main>
      </div>

      {/* ─── Mobile bottom nav ─── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex justify-around px-2 py-3 z-50 shadow-[0_-4_-24px_rgba(0,0,0,0.02)] pb-safe-bottom">
        {NAV.map(({ path, label, Icon }) => {
          const isActive = location.pathname === path
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-1.5 min-w-[64px] transition-all p-2 rounded-xl btn-hover-effect ${
                isActive ? 'text-violet-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all ${isActive ? 'bg-violet-100' : 'bg-transparent'}`}>
                <Icon size={20} className={isActive ? 'text-violet-600' : 'text-slate-400'} />
              </div>
              <span className="text-[10px] font-bold">{label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

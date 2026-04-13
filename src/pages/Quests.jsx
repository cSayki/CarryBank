import { useState } from 'react'
import { IconZap, IconCheck, IconBook, IconArrowRight, IconX, IconActivity, IconAward, IconFire } from '../components/Icons'
import { useGlobal } from '../context/GlobalState'
const QUIZ_QUESTIONS = [
  {
    q: "Qu'est-ce que l'intérêt composé ?",
    opts: [
      "Intérêt calculé uniquement sur le capital initial",
      "Intérêt calculé sur le capital et les intérêts accumulés",
      "Une taxe bancaire sur les retraits",
      "Un type de crédit immobilier",
    ],
    answer: 1,
  },
  {
    q: "Quel pourcentage de ses revenus est conseillé d'épargner chaque mois ?",
    opts: ["2 à 5 %", "10 à 20 %", "30 à 40 %", "Aucun"],
    answer: 1,
  },
  {
    q: "À quoi sert un IBAN ?",
    opts: ["Payer en ligne", "Identifier un compte bancaire", "Calculer ses impôts", "Obtenir un prêt"],
    answer: 1,
  },
]

function QuizModal({ onClose }) {
  const [idx, setIdx] = useState(0)
  const [sel, setSel] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const q = QUIZ_QUESTIONS[idx]

  const pick = (i) => {
    setSel(i)
    const correct = i === q.answer
    if (correct) setScore(s => s + 1)
    setTimeout(() => {
      setSel(null)
      if (idx + 1 < QUIZ_QUESTIONS.length) setIdx(p => p + 1)
      else setDone(true)
    }, 750)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        className="bg-white w-full max-w-md p-8 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 animate-slide-up relative overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-200/30 rounded-full blur-[60px] pointer-events-none -mr-32 -mt-32"></div>

        {done ? (
          <div className="text-center py-6 relative z-10">
            <div className="w-20 h-20 rounded-[2rem] mx-auto mb-6 flex items-center justify-center bg-violet-100 text-violet-600 shadow-inner">
              <IconAward size={40} />
            </div>
            <h3 className="font-display font-bold text-3xl mb-2 text-slate-900 tracking-tight">Quiz terminé</h3>
            <p className="text-base font-semibold text-slate-500 mb-6">
              {score}/{QUIZ_QUESTIONS.length} bonne{score > 1 ? 's' : ''} réponse{score > 1 ? 's' : ''}
            </p>
            <span className="inline-flex items-center gap-2 font-display text-lg font-bold px-5 py-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
              <IconZap size={20} /> +{score * 50} XP gagnés
            </span>
            <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl py-4 mt-8 transition-colors" onClick={onClose}>
              Super !
            </button>
          </div>
        ) : (
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2.5 bg-violet-50 text-violet-700 px-3 py-1.5 rounded-lg border border-violet-100">
                <IconBook size={16} />
                <span className="text-sm font-bold">Question {idx + 1} / {QUIZ_QUESTIONS.length}</span>
              </div>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
                <IconX size={20} />
              </button>
            </div>
            <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden mb-8 shadow-inner">
              <div className="h-full bg-violet-500 rounded-full transition-all duration-300 ease-out" style={{ width: `${(idx / QUIZ_QUESTIONS.length) * 100}%` }} />
            </div>
            <h3 className="font-display font-bold text-2xl leading-snug mb-8 text-slate-900">{q.q}</h3>
            <div className="flex flex-col gap-3">
              {q.opts.map((opt, i) => {
                let styleClasses = 'bg-white border-slate-200 text-slate-700 hover:border-violet-400 hover:bg-violet-50 hover:text-violet-900 shadow-sm'
                if (sel !== null) {
                  if (i === q.answer) {
                    styleClasses = 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-[0_4px_12px_rgba(16,185,129,0.15)] ring-4 ring-emerald-500/20'
                  } else if (i === sel) {
                    styleClasses = 'bg-rose-50 border-rose-400 text-rose-800 shadow-[0_4px_12px_rgba(244,63,94,0.15)] ring-4 ring-rose-500/20'
                  } else {
                    styleClasses = 'bg-slate-50 border-slate-100 text-slate-400 opacity-50 grayscale'
                  }
                }
                return (
                  <button
                    key={i}
                    disabled={sel !== null}
                    onClick={() => pick(i)}
                    className={`p-5 rounded-2xl text-left text-base font-semibold transition-all duration-300 border-2 btn-hover-effect ${styleClasses} ${sel === null ? 'cursor-pointer active:scale-[0.98]' : 'cursor-default'}`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Quests() {
  const { user, quests, leaderboard } = useGlobal()
  const [filter, setFilter] = useState('all')
  const [showQuiz, setShowQuiz] = useState(false)

  const filtered = filter === 'all' ? quests
    : filter === 'done' ? quests.filter(q => q.completed)
    : quests.filter(q => !q.completed)

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto w-full mt-6 sm:mt-8">
      {showQuiz && <QuizModal onClose={() => setShowQuiz(false)} />}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 animate-slide-up">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">Défis & Quêtes</h1>
          <p className="text-base font-medium text-slate-500 mt-1">
            <span className="font-bold text-violet-600">{quests.filter(q => !q.completed).length} actif{quests.filter(q => !q.completed).length > 1 ? 's' : ''}</span> · {quests.filter(q => q.completed).length} terminé{quests.filter(q => q.completed).length > 1 ? 's' : ''}
          </p>
        </div>
        <button 
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-slate-900/20 btn-hover-effect"
          onClick={() => setShowQuiz(true)}
        >
          <IconBook size={18} />
          Quiz du jour
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
        {[
          { label: 'XP cette semaine', value: '+340', Icon: IconZap, color: 'text-amber-500', bg: 'bg-gradient-to-br from-amber-50 to-amber-100', border: 'border-amber-100' },
          { label: 'Défis terminés', value: `${quests.filter(q => q.completed).length}`, Icon: IconCheck, color: 'text-emerald-500', bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100', border: 'border-emerald-100' },
          { label: 'Streak actuel', value: `${user.streak}j`, Icon: IconFire, color: 'text-orange-500', bg: 'bg-gradient-to-br from-orange-50 to-orange-100', border: 'border-orange-100' },
        ].map((s, i) => (
          <div key={i} className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5 hover:shadow-[0_16px_40px_rgb(0,0,0,0.08)] transition-all flex items-center gap-5 group cursor-default">
            <div className={`w-14 h-14 rounded-2xl flex flex-shrink-0 items-center justify-center border shadow-sm transition-transform group-hover:scale-110 ${s.bg} ${s.color} ${s.border}`}>
              <s.Icon size={26} />
            </div>
            <div>
              <p className="font-display font-bold text-3xl text-slate-900 tracking-tight">{s.value}</p>
              <p className="text-sm font-semibold text-slate-500 mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 p-1.5 bg-white border border-slate-200 rounded-[1.25rem] w-fit shadow-sm animate-slide-up" style={{ animationDelay: '150ms' }}>
        {[['all', 'Tous'], ['active', 'En cours'], ['done', 'Terminés']].map(([v, l]) => (
          <button
            key={v}
            onClick={() => setFilter(v)}
            className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
              filter === v 
                ? 'bg-slate-900 text-white shadow-md' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map((quest, idx) => {
          const pct = Math.round((quest.progress / quest.total) * 100)
          return (
            <div key={quest.id} className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5 flex gap-5 animate-slide-up hover:shadow-[0_16px_40px_rgb(0,0,0,0.08)] transition-all group" style={{ animationDelay: `${200 + idx * 40}ms` }}>
              <div
                className={`w-14 h-14 rounded-2xl shrink-0 flex items-center justify-center shadow-sm border transition-transform group-hover:scale-110 ${
                  quest.completed ? 'bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600 border-emerald-100' : 'bg-gradient-to-br from-slate-50 to-slate-100 text-slate-500 border-slate-200'
                }`}
              >
                {quest.completed ? <IconCheck size={26} /> : <IconActivity size={26} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <p className={`text-lg font-bold leading-snug ${quest.completed ? 'text-slate-500' : 'text-slate-900'}`}>
                    {quest.title}
                  </p>
                  {quest.completed && (
                    <span className="shrink-0 text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-700 uppercase tracking-wide">Terminé</span>
                  )}
                </div>
                <p className="text-sm font-medium text-slate-500 mb-5 leading-relaxed">{quest.description}</p>
                {!quest.completed && (
                  <div className="mb-4">
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner mb-2">
                      <div className="h-full bg-violet-500 rounded-full transition-all duration-1000 ease-out" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-wide">
                      <span>{quest.category}</span>
                      <span className="text-slate-600">{quest.progress} / {quest.total}</span>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-100">
                    <IconZap size={14} />
                    +{quest.xp} XP
                  </span>
                  <span className="inline-flex items-center text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-50 text-slate-500 border border-slate-100">
                    {quest.difficulty}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Leaderboard */}
      <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-900/5 animate-slide-up" style={{ animationDelay: '400ms' }}>
        <h3 className="font-display font-bold text-xl text-slate-900 mb-6">Classement (Division Or)</h3>
        <div className="flex flex-col gap-2">
          {leaderboard.map((entry) => (
            <div
              key={entry.rank}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-colors ${
                entry.isMe 
                  ? 'bg-violet-50 border-2 border-violet-100 shadow-sm' 
                  : 'bg-transparent border-2 border-transparent hover:bg-slate-50'
              }`}
            >
              <span
                className={`w-6 text-center text-base font-display font-bold tabular-nums ${
                  entry.rank === 1 ? 'text-amber-500' :
                  entry.rank === 2 ? 'text-slate-400' :
                  entry.rank === 3 ? 'text-orange-400' :
                  'text-slate-300'
                }`}
              >
                {entry.rank}
              </span>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold bg-slate-100 text-slate-600 shadow-sm"
              >
                {entry.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-base font-bold truncate ${entry.isMe ? 'text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-indigo-700' : 'text-slate-900'}`}>
                  {entry.isMe ? user.name : entry.name} {entry.isMe && <span className="text-violet-600 text-[10px] uppercase tracking-wider ml-2 bg-violet-100 border border-violet-200 px-1.5 py-0.5 rounded shadow-sm">(vous)</span>}
                </p>
                <p className="text-xs font-semibold text-slate-500">Niv. {entry.isMe ? user.level : entry.level}</p>
              </div>
              <span className={`text-base font-display font-bold tabular-nums ${entry.isMe ? 'text-violet-600' : 'text-slate-600'}`}>
                {entry.isMe ? user.xp.toLocaleString() : entry.xp.toLocaleString()} XP
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

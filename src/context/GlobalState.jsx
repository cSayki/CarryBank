import { createContext, useContext, useState } from 'react'
import {
  mockUser,
  mockTransactions,
  monthlyData,
  budgetCategories,
  quests,
  leaderboard,
  savingsGoals,
  initialAccounts
} from '../data/mockData'

const GlobalContext = createContext()

export function GlobalProvider({ children }) {
  const [user, setUser] = useState({ 
    ...mockUser,
    email: 'leo.marchand@carrybank.fr',
    phone: '+33 6 12 34 56 78',
    address: '12 Rue de la Paix, 75002 Paris',
    memberSince: 'Mars 2024',
    persona: 'Le Stratège Économe',
    avatarColor: 'bg-violet-500'
  })
  const [transactions, setTransactions] = useState([...mockTransactions])
  const [accounts, setAccounts] = useState([...initialAccounts])
  const [goals, setGoals] = useState([...savingsGoals])

  // Computed totals
  const mainAccount = accounts.find(a => a.isMain) || accounts[0]
  const totalSavings = accounts.filter(a => !a.isMain).reduce((acc, a) => acc + a.balance, 0)

  // Actions
  const updateUserName = (newName) => {
    setUser(prev => ({ ...prev, name: newName }))
  }

  const updateUserProfile = (newData) => {
    setUser(prev => ({ ...prev, ...newData }))
  }

  const createSavingsAccount = (account) => {
    const newAccount = {
      ...account,
      id: `acc_${Date.now()}`,
      balance: 0,
      isMain: false,
    }
    setAccounts(prev => [...prev, newAccount])
  }

  const transferFunds = (fromId, toId, amountStr) => {
    const amount = parseFloat(amountStr)
    if (isNaN(amount) || amount <= 0) return false

    setAccounts(prev => {
      const copy = [...prev]
      const fromIdx = copy.findIndex(a => a.id === fromId)
      const toIdx = copy.findIndex(a => a.id === toId)
      
      if (fromIdx < 0 || toIdx < 0) return prev
      if (copy[fromIdx].balance < amount) return prev

      copy[fromIdx] = { ...copy[fromIdx], balance: copy[fromIdx].balance - amount }
      copy[toIdx] = { ...copy[toIdx], balance: copy[toIdx].balance + amount }
      return copy
    })

    // Add a transaction record
    const newTx = {
      id: Date.now(),
      label: 'Virement interne',
      category: 'Épargne',
      icon: '🏦',
      amount: -amount, // from the perspective of the main/source account?
      // Actually, if we just want a visual log, let's keep it simple
      date: new Date().toISOString().split('T')[0],
      color: '#10B981'
    }
    setTransactions(prev => [newTx, ...prev])

    return true
  }

  const value = {
    user: { ...user, balance: mainAccount.balance, savings: totalSavings },
    transactions,
    accounts,
    goals,
    mainAccount,
    updateUserName,
    updateUserProfile,
    createSavingsAccount,
    transferFunds,
    // read-only collections
    monthlyData,
    budgetCategories,
    quests,
    leaderboard
  }

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  )
}

export function useGlobal() {
  return useContext(GlobalContext)
}

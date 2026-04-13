// Shared mock data for the whole app
export const mockUser = {
    name: 'Lucas Martin',
    age: 20,
    level: 7,
    xp: 2340,
    xpToNext: 3000,
    avatar: '🧑‍💻',
    rank: 'Investisseur Bronze',
    balance: 1842.50,
    savings: 430.00,
    streak: 12,
    badges: ['🔥', '💰', '🎯', '🏆', '⚡'],
    coins: 1240,
}

export const mockTransactions = [
    { id: 1, label: 'Netflix', category: 'Loisirs', icon: '🎬', amount: -13.99, date: '2026-03-01', color: '#EF4444' },
    { id: 2, label: 'Salaire McDonalds', category: 'Revenus', icon: '💼', amount: +620.00, date: '2026-02-28', color: '#10B981' },
    { id: 3, label: 'Carrefour', category: 'Alimentation', icon: '🛒', amount: -38.50, date: '2026-02-28', color: '#F59E0B' },
    { id: 4, label: 'Spotify', category: 'Loisirs', icon: '🎵', amount: -9.99, date: '2026-02-27', color: '#EF4444' },
    { id: 5, label: 'Virement parents', category: 'Revenus', icon: '🎁', amount: +150.00, date: '2026-02-26', color: '#10B981' },
    { id: 6, label: 'RATP', category: 'Transport', icon: '🚇', amount: -26.00, date: '2026-02-25', color: '#8B5CF6' },
    { id: 7, label: 'Zara', category: 'Shopping', icon: '👕', amount: -54.90, date: '2026-02-24', color: '#06B6D4' },
    { id: 8, label: 'Gaming - Steam', category: 'Loisirs', icon: '🎮', amount: -29.99, date: '2026-02-23', color: '#EF4444' },
    { id: 9, label: 'McDonald\'s', category: 'Alimentation', icon: '🍔', amount: -8.70, date: '2026-02-22', color: '#F59E0B' },
    { id: 10, label: 'Compte épargne', category: 'Épargne', icon: '🏦', amount: -50.00, date: '2026-02-22', color: '#10B981' },
]

export const monthlyData = [
    { month: 'Sep', income: 620, expenses: 480, savings: 140 },
    { month: 'Oct', income: 770, expenses: 510, savings: 260 },
    { month: 'Nov', income: 620, expenses: 590, savings: 30 },
    { month: 'Dec', income: 920, expenses: 730, savings: 190 },
    { month: 'Jan', income: 620, expenses: 450, savings: 170 },
    { month: 'Fév', income: 770, expenses: 532, savings: 238 },
]

export const budgetCategories = [
    { name: 'Alimentation', budget: 200, spent: 158, icon: '🛒', color: '#F59E0B' },
    { name: 'Loisirs', budget: 100, spent: 53, icon: '🎬', color: '#EF4444' },
    { name: 'Transport', budget: 80, spent: 78, icon: '🚇', color: '#8B5CF6' },
    { name: 'Shopping', budget: 150, spent: 54, icon: '👕', color: '#06B6D4' },
    { name: 'Abonnements', budget: 50, spent: 43, icon: '📱', color: '#10B981' },
    { name: 'Épargne', budget: 100, spent: 50, icon: '🏦', color: '#3B82F6' },
]

export const quests = [
    {
        id: 1, title: 'Économise 100€ ce mois', description: 'Mets 100€ de côté avant le 31 mars',
        xp: 200, coins: 50, icon: '💰', category: 'Épargne',
        progress: 50, total: 100, difficulty: 'Facile', color: '#10B981', completed: false,
    },
    {
        id: 2, title: 'Zéro fast-food cette semaine', description: 'Évite tout achat fast-food pendant 7 jours',
        xp: 150, coins: 30, icon: '🥦', category: 'Alimentation',
        progress: 4, total: 7, difficulty: 'Moyen', color: '#F59E0B', completed: false,
    },
    {
        id: 3, title: 'Réponds au quiz financier', description: 'Complète le quiz sur les taux d\'intérêt',
        xp: 100, coins: 20, icon: '🎓', category: 'Éducation',
        progress: 1, total: 1, difficulty: 'Facile', color: '#8B5CF6', completed: true,
    },
    {
        id: 4, title: 'Reste sous ton budget loisirs', description: 'Ne dépasse pas 100€ en loisirs ce mois',
        xp: 180, coins: 40, icon: '🎯', category: 'Budget',
        progress: 53, total: 100, difficulty: 'Moyen', color: '#06B6D4', completed: false,
    },
    {
        id: 5, title: 'Connecte-toi 7 jours d\'affilée', description: 'Maintiens ton streak de connexion',
        xp: 120, coins: 25, icon: '🔥', category: 'Habitude',
        progress: 12, total: 30, difficulty: 'Difficile', color: '#EF4444', completed: false,
    },
    {
        id: 6, title: 'Crée ton premier objectif épargne', description: 'Définis un projet avec une date et un montant cible',
        xp: 80, coins: 15, icon: '🚀', category: 'Épargne',
        progress: 1, total: 1, difficulty: 'Facile', color: '#3B82F6', completed: true,
    },
]

export const leaderboard = [
    { rank: 1, name: 'Emma L.', level: 12, xp: 8400, avatar: '👧' },
    { rank: 2, name: 'Nathan B.', level: 10, xp: 6200, avatar: '🧑' },
    { rank: 3, name: 'Lucas M.', level: 7, xp: 2340, avatar: '🧑‍💻', isMe: true },
    { rank: 4, name: 'Sophia R.', level: 6, xp: 1870, avatar: '👩' },
    { rank: 5, name: 'Tom C.', level: 5, xp: 1240, avatar: '👦' },
]

export const savingsGoals = [
    { id: 1, name: 'Permis de conduire', target: 1500, current: 430, icon: '🚗', color: '#8B5CF6', deadline: '2026-09-01' },
    { id: 2, name: 'Voyage Japon', target: 2000, current: 120, icon: '✈️', color: '#06B6D4', deadline: '2027-06-01' },
    { id: 3, name: 'PC Gaming', target: 1200, current: 800, icon: '🖥️', color: '#10B981', deadline: '2026-05-01' },
]

export const initialAccounts = [
    { id: 'main', name: 'Compte Courant', balance: 1842.50, color: 'bg-violet-600', isMain: true },
    { id: 'livret_a', name: 'Livret A', balance: 430.00, limit: 10000, color: 'bg-emerald-500', isMain: false },
    { id: 'vacances', name: 'Vacances Japon', balance: 120.00, limit: 2000, color: 'bg-cyan-500', isMain: false },
]

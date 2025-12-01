// ============================================
// MOCK DATA - All dummy data for the application
// ============================================

const MOCK_DATA = {
    user: {
        name: 'Alsha',
        greeting: 'Good evening'
    },
    
    accounts: {
        deposit: [
            {
                id: 'dep1',
                name: 'LL Every Day Chequing Account',
                type: 'Chequing',
                balance: 17760.43,
                lastFour: '4301'
            }
        ],
        credit: [
            {
                id: 'cc1',
                name: 'LL Credit Back Visa Card',
                type: 'Visa',
                balance: 2560.47,
                limit: 10000,
                lastFour: '8392'
            }
        ]
    },
    
    transactions: [
        { id: 1, type: 'SEND E-TRANSFER', amount: -175.00, date: '2025-01-15', category: 'Transfer' },
        { id: 2, type: 'INTERAC e-mail 1122', amount: -85.99, date: '2025-01-14', category: 'Payment' },
        { id: 3, type: 'WALMART', amount: -127.34, date: '2025-01-13', category: 'Shopping' },
        { id: 4, type: 'SALARY DEPOSIT', amount: 3200.00, date: '2025-01-12', category: 'Income' },
        { id: 5, type: 'AAPN Main 04/03/2814', amount: -89.15, date: '2025-01-11', category: 'Payment' },
        { id: 6, type: 'SWRTS 442334', amount: -54.12, date: '2025-01-10', category: 'Shopping' },
        { id: 7, type: 'APPLE.COM/BILL', amount: -29.99, date: '2025-01-09', category: 'Subscription' },
        { id: 8, type: 'SWRTS 442334', amount: -27.50, date: '2025-01-08', category: 'Shopping' },
        { id: 9, type: 'SEND E-TRANSFER', amount: -250.00, date: '2025-01-07', category: 'Transfer' },
        { id: 10, type: 'GROCERY STORE', amount: -143.67, date: '2025-01-06', category: 'Groceries' }
    ],
    
    investments: [
        { id: 1, name: 'Amazon', ticker: 'AMZN', shares: 15, price: 182.50, change: 10.275, changePercent: 5.97, isFav: true },
        { id: 2, name: 'Netflix', ticker: 'NFLX', shares: 8, price: 512.00, change: -8.50, changePercent: -1.63, isFav: true },
        { id: 3, name: 'Bitcoin', ticker: 'BTC', shares: 0.5, price: 42500.00, change: 1250.00, changePercent: 3.03 },
        { id: 4, name: 'Ethereum', ticker: 'ETH', shares: 2.5, price: 2850.00, change: -75.00, changePercent: -2.56 },
        { id: 5, name: 'Apple', ticker: 'AAPL', shares: 25, price: 195.75, change: 5.25, changePercent: 2.76 },
        { id: 6, name: 'Tesla', ticker: 'TSLA', shares: 10, price: 245.30, change: -12.80, changePercent: -4.96 },
        { id: 7, name: 'Microsoft', ticker: 'MSFT', shares: 20, price: 410.00, change: 15.50, changePercent: 3.93 },
        { id: 8, name: 'Google', ticker: 'GOOGL', shares: 12, price: 142.50, change: 3.75, changePercent: 2.70 },
        { id: 9, name: 'Meta', ticker: 'META', shares: 18, price: 475.00, change: -8.25, changePercent: -1.71 },
        { id: 10, name: 'Dogecoin', ticker: 'DOGE', shares: 5000, price: 0.085, change: 0.005, changePercent: 6.25 }
    ],
    
    upcomingPayments: [
        { id: 1, name: 'Amazon Prime', amount: 14.99, dueDate: '2025-02-03', icon: '📦' },
        { id: 2, name: 'Hydro Energy', amount: 125.00, dueDate: '2025-02-05', icon: '⚡' }
    ],
    
    chatMessages: [
        {
            id: 1,
            text: "I have a question about why my international fee was $10.00. Can you explain how that works?",
            sender: 'user',
            timestamp: new Date()
        },
        {
            id: 2,
            text: "Of course! International transfers include a processing fee charged by the receiving bank and a currency conversion fee. For this transaction, the $10.00 fee was split between these two charges.",
            sender: 'bot',
            timestamp: new Date()
        },
        {
            id: 3,
            text: "Yeah, ok. Is there a way to skip currency conversion? I'd like money arrive faster before you convert.",
            sender: 'user',
            timestamp: new Date()
        },
        {
            id: 4,
            text: "Yes! When you start a transfer, tap 'Show Fee Breakdown'. I'll show you the latest fees, then choose 'Skip Fee' and I'll send the money before converting to arrive faster before you confirm.",
            sender: 'bot',
            timestamp: new Date()
        },
        {
            id: 5,
            text: "Hmm I thank you, that really helps",
            sender: 'user',
            timestamp: new Date()
        },
        {
            id: 6,
            text: "Anytime! Let me know if you want help tracking your transfer.",
            sender: 'bot',
            timestamp: new Date()
        }
    ]
};
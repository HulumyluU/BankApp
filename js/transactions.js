// TRANSACTIONS PAGE LOGIC


let activeTab = 'transactions';

document.addEventListener('DOMContentLoaded', function() {
    renderTransactions();
});

function renderTransactions() {
    const desktopContent = document.getElementById('desktopContent');
    const mobileContent = document.getElementById('mobileContent');
    
    if (desktopContent) {
        desktopContent.innerHTML = `<div class="transactions-desktop-container">${generateTransactionsHTML()}</div>`;
    }
    
    if (mobileContent) {
        mobileContent.innerHTML = generateTransactionsHTML();
    }
    
    setupTabListeners();
}

function generateTransactionsHTML() {
    const account = MOCK_DATA.accounts.deposit[0];
    
    return `
        <div class="page-title-section">
            <h1 class="page-title">Banking</h1>
        </div>
        
        <div class="search-container">
            <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input type="text" class="search-input" placeholder="Search">
        </div>
        
        <div class="account-balance-card">
            <p class="account-name-label">${account.name}</p>
            <h2 class="account-balance-amount">${formatCurrency(account.balance)}</h2>
        </div>
        
        <div class="transaction-tabs">
            <button class="tab-btn ${activeTab === 'transactions' ? 'active' : ''}" data-tab="transactions">
                Transactions
            </button>
            <button class="tab-btn ${activeTab === 'details' ? 'active' : ''}" data-tab="details">
                Details
            </button>
        </div>
        
        <div id="tabContent">
            ${activeTab === 'transactions' ? renderTransactionsList() : renderDetailsView()}
        </div>
    `;
}

function renderTransactionsList() {
    // Group transactions by date
    const groupedTransactions = groupByDate(MOCK_DATA.transactions);
    
    let html = '<div class="transaction-list">';
    
    for (const [date, transactions] of Object.entries(groupedTransactions)) {
        html += `
            <div class="transaction-date-group">
                <div class="date-header">${formatDateHeader(date)}</div>
                ${transactions.map(transaction => {
                    const isPositive = transaction.amount > 0;
                    const amountClass = isPositive ? 'positive' : 'negative';
                    const displayAmount = Math.abs(transaction.amount);
                    
                    return `
                        <div class="transaction-item">
                            <div class="transaction-info">
                                <div class="transaction-title">${transaction.type}</div>
                            </div>
                            <div class="transaction-amount ${amountClass}">
                                ${isPositive ? '+' : '-'}$${displayAmount.toFixed(2)}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
    
    html += '</div>';
    return html;
}

function renderDetailsView() {
    const account = MOCK_DATA.accounts.deposit[0];
    return `
        <div class="account-details" style="background-color: white; padding: 1.5rem; border-radius: 0.75rem; border: 1px solid #e5e7eb;">
            <h3 style="margin-bottom: 1.5rem; font-size: 1.125rem; font-weight: 600; color: #1f2937;">Account Details</h3>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div style="display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #6b7280; font-size: 0.875rem;">Account Name:</span>
                    <strong style="color: #1f2937; font-size: 0.875rem;">${account.name}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #6b7280; font-size: 0.875rem;">Account Type:</span>
                    <strong style="color: #1f2937; font-size: 0.875rem;">${account.type}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #e5e7eb;">
                    <span style="color: #6b7280; font-size: 0.875rem;">Account Number:</span>
                    <strong style="color: #1f2937; font-size: 0.875rem;">****${account.lastFour}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 0.75rem 0;">
                    <span style="color: #6b7280; font-size: 0.875rem;">Current Balance:</span>
                    <strong style="color: #1f2937; font-size: 0.875rem;">${formatCurrency(account.balance)}</strong>
                </div>
            </div>
        </div>
    `;
}

function setupTabListeners() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            activeTab = this.dataset.tab;
            renderTransactions();
        });
    });
}

function groupByDate(transactions) {
    const grouped = {};
    
    transactions.forEach(transaction => {
        const date = transaction.date;
        if (!grouped[date]) {
            grouped[date] = [];
        }
        grouped[date].push(transaction);
    });
    
    return grouped;
}

function formatDateHeader(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    } else {
        const month = date.toLocaleDateString('en-US', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }
}
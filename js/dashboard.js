// ============================================
// DASHBOARD PAGE LOGIC
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    renderDashboard();
});

function renderDashboard() {
    const desktopContent = document.getElementById('desktopContent');
    const mobileContent = document.getElementById('mobileContent');
    
    if (desktopContent) {
        desktopContent.innerHTML = generateDesktopDashboard();
    }
    
    if (mobileContent) {
        mobileContent.innerHTML = generateMobileDashboard();
    }
}

function generateDesktopDashboard() {
    return `
        <div class="desktop-dashboard-content">
            <div class="desktop-greeting">
                <h2>Good evening</h2>
                <h1>Alsha</h1>
            </div>
            
            <div class="quick-actions">
                <button class="quick-action-pill">Home + Lifestyle</button>
                <button class="quick-action-pill">Payments</button>
                <button class="quick-action-pill">Deposit Cheq</button>
                <button class="quick-action-pill">Get cash free</button>
            </div>
            
            ${generateAccountsContent()}
        </div>
    `;
}

function generateMobileDashboard() {
    return `
        <div class="mobile-dashboard-content">
            <div class="quick-actions">
                <button class="quick-action-pill">Interac e-Transfer</button>
                <button class="quick-action-pill">Payments</button>
                <button class="quick-action-pill">Deposit Cheq</button>
            </div>
            
            ${generateAccountsContent()}
        </div>
    `;
}

function generateAccountsContent() {
    const account = MOCK_DATA.accounts.deposit[0];
    const creditCard = MOCK_DATA.accounts.credit[0];
    const usagePercent = (creditCard.balance / creditCard.limit) * 100;
    
    return `
        <!-- My Accounts Section -->
        <section class="accounts-section">
            <h2 class="section-title">My Accounts</h2>
            
            <!-- Deposit Accounts -->
            <div class="subsection-header" style="font-size: 0.875rem; font-weight: 600; color: #6b7280; margin-bottom: 0.75rem;">
                Deposit Accounts
            </div>
            
            <div class="account-card">
                <div class="account-header">
                    <div class="account-info">
                        <div class="account-name">${account.name}</div>
                        <div class="account-number">****${account.lastFour}</div>
                    </div>
                    <div class="account-balance">${formatCurrency(account.balance)}</div>
                </div>
                <div class="account-progress-bar"></div>
                <div class="account-actions">
                    <button class="btn-account-action btn-more" style="width: 100%;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                    </button>
                </div>
            </div>
            
            <!-- Credit Cards -->
            <div class="subsection-header" style="font-size: 0.875rem; font-weight: 600; color: #6b7280; margin-bottom: 0.75rem; margin-top: 1.5rem;">
                Credit Cards
            </div>
            
            <div class="account-card">
                <div class="account-header">
                    <div class="account-info">
                        <div class="account-name">${creditCard.name}</div>
                        <div class="account-number">****${creditCard.lastFour}</div>
                    </div>
                    <div class="account-balance">${formatCurrency(creditCard.balance)}</div>
                </div>
                <div class="credit-progress">
                    <div class="credit-progress-fill" style="width: ${usagePercent}%"></div>
                </div>
                <div class="credit-limit-text">Limit: ${formatCurrency(creditCard.limit)}</div>
                <div class="account-actions" style="margin-top: 1rem;">
                    <button class="btn-account-action btn-pay-card">
                        Pay Card
                    </button>
                    <button class="btn-account-action btn-more">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="19" cy="12" r="1"></circle>
                            <circle cx="5" cy="12" r="1"></circle>
                        </svg>
                    </button>
                </div>
            </div>
            
            <button class="add-account-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Accounts
            </button>
        </section>
        
        <!-- Upcoming Payments -->
        <section class="payments-section">
            <h2 class="section-title">Upcoming Payments</h2>
            
            <div class="subsection-header" style="font-size: 0.875rem; font-weight: 600; color: #6b7280; margin-bottom: 0.75rem;">
                Subscriptions
            </div>
            
            <div class="payments-grid">
                <div class="payment-card">
                    <div class="payment-header">
                        <div class="payment-icon blue">⭐</div>
                        <button class="payment-menu-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="5" r="2"></circle>
                                <circle cx="12" cy="12" r="2"></circle>
                                <circle cx="12" cy="19" r="2"></circle>
                            </svg>
                        </button>
                    </div>
                    <div class="payment-name">Amazon Prime</div>
                    <div class="payment-amount">$9.99/month</div>
                    <div class="payment-frequency">Monthly</div>
                </div>
            
                <div class="payment-card">
                    <div class="payment-header">
                        <div class="payment-icon orange">⭐</div>
                        <button class="payment-menu-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="5" r="2"></circle>
                                <circle cx="12" cy="12" r="2"></circle>
                                <circle cx="12" cy="19" r="2"></circle>
                            </svg>
                        </button>
                    </div>
                    <div class="payment-name">Crunch Fitness</div>
                    <div class="payment-amount">$16.95/month</div>
                    <div class="payment-frequency">Monthly</div>
                </div>
            </div>
        </section>
    `;
}
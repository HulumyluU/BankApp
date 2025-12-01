// ============================================
// INVESTMENTS PAGE LOGIC
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    renderInvestments();
});

function renderInvestments() {
    const desktopContent = document.getElementById('desktopContent');
    const mobileContent = document.getElementById('mobileContent');
    
    const investmentsHTML = generateInvestmentsHTML();
    
    if (desktopContent) desktopContent.innerHTML = investmentsHTML;
    if (mobileContent) mobileContent.innerHTML = investmentsHTML;
}

function generateInvestmentsHTML() {
    const totalValue = MOCK_DATA.investments.reduce((sum, inv) => sum + (inv.shares * inv.price), 0);
    const cryptoInvestments = MOCK_DATA.investments.filter(inv => ['BTC', 'ETH', 'DOGE'].includes(inv.ticker));
    const cryptoValue = cryptoInvestments.reduce((sum, inv) => sum + (inv.shares * inv.price), 0);
    const cryptoPercentage = (cryptoValue / totalValue) * 100;
    
    const totalSpent = 5341;
    const typicalSpend = 1870.13;
    const aboveSpend = 750.43;
    
    return `
        <!-- Spending Card -->
        <div class="spending-card">
            <h3>My Spending</h3>
            <div class="mb-4">
                <p class="spending-title">This month you've spent</p>
                <h2 class="spending-amount">$${totalSpent.toLocaleString()}</h2>
            </div>
            <div class="spending-grid">
                <div class="spending-item">
                    <p>Typical spend</p>
                    <h4>$${typicalSpend.toLocaleString()}</h4>
                </div>
                <div class="spending-item purple">
                    <p>Above typical</p>
                    <h4>$${aboveSpend.toLocaleString()}</h4>
                </div>
            </div>
        </div>
        
        <!-- Portfolio Card -->
        <div class="portfolio-card">
            <div class="portfolio-header">
                <h3>Current Balance</h3>
                <select class="period-select">
                    <option>Month</option>
                    <option>Quarter</option>
                    <option>Year</option>
                </select>
            </div>
            <h2 class="portfolio-balance">${formatCurrency(totalValue)}</h2>
            
            <div class="chart-container">
                <div class="donut-chart">
                    <svg width="160" height="160" viewBox="0 0 160 160">
                        <circle cx="80" cy="80" r="70" fill="none" stroke="#e5e7eb" stroke-width="12"/>
                        <circle 
                            cx="80" 
                            cy="80" 
                            r="70" 
                            fill="none" 
                            stroke="url(#gradient)" 
                            stroke-width="12"
                            stroke-dasharray="${(cryptoPercentage / 100) * 439.6} 439.6"
                            transform="rotate(-90 80 80)"
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style="stop-color:#a855f7;stop-opacity:1" />
                                <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div class="chart-center">
                        <div class="chart-center-value">${formatCurrency(cryptoValue).replace('.00', '')}</div>
                        <div class="chart-center-label">Crypto Assets</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Trending Stocks -->
        <section class="section">
            <div class="section-header">
                <h3>Trending Stocks</h3>
            </div>
            
            <div class="trending-stocks-grid">
                ${MOCK_DATA.investments.filter(inv => inv.isFav).map(stock => `
                    <div class="stock-card">
                        <div class="stock-header">
                            <h4 class="stock-name">${stock.name}</h4>
                            <svg class="star-icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                        </div>
                        <p class="stock-ticker">${stock.ticker}</p>
                        <div class="stock-performance">
                            <span class="stock-change ${stock.changePercent > 0 ? 'positive' : 'negative'}">
                                ${stock.changePercent > 0 ? '↑' : '↓'} ${Math.abs(stock.changePercent).toFixed(2)}%
                            </span>
                            <span class="stock-price">$${stock.price.toFixed(2)}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
        
        <!-- All Investments -->
        <section class="section">
            <div class="section-header">
                <h3>All Investments</h3>
            </div>
            
            <div class="investments-list">
                ${MOCK_DATA.investments.map(inv => {
                    const totalValue = inv.shares * inv.price;
                    return `
                        <div class="investment-item">
                            <div class="investment-info">
                                <h4>${inv.name}</h4>
                                <p class="investment-details">${inv.ticker} • ${inv.shares} shares</p>
                                <span class="investment-change ${inv.changePercent > 0 ? 'positive' : 'negative'}">
                                    ${inv.changePercent > 0 ? '+' : ''}${inv.changePercent.toFixed(2)}%
                                </span>
                            </div>
                            <div class="investment-value">
                                <p class="investment-total">${formatCurrency(totalValue)}</p>
                                <p class="investment-price">$${inv.price.toFixed(2)}/share</p>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </section>
    `;
}
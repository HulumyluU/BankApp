// TRANSFER PAGE LOGIC

document.addEventListener('DOMContentLoaded', function() {
    renderTransfer();
});

function renderTransfer() {
    const desktopContent = document.getElementById('desktopContent');
    const mobileContent = document.getElementById('mobileContent');
    
    const transferHTML = generateTransferHTML();
    
    if (desktopContent) {
        desktopContent.innerHTML = transferHTML;
    }
    
    if (mobileContent) {
        mobileContent.innerHTML = transferHTML;
    }
    
    setupTransferListeners();
}

function generateTransferHTML() {
    const account = MOCK_DATA.accounts.deposit[0];
    
    return `
        <div class="transfer-page-container">
            <h1 class="transfer-page-title">Send Money</h1>
            
            <div class="transfer-form-card">
                <div class="form-group">
                    <label class="form-label">Amount</label>
                    <div class="amount-input-container">
                        <span class="currency-symbol">$</span>
                        <input 
                            type="number" 
                            id="transferAmount" 
                            class="amount-input" 
                            value="25.00" 
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                        />
                    </div>
                    <p class="available-balance">Available to send: ${formatCurrency(account.balance)}</p>
                </div>
                
                <div class="form-group">
                    <label class="form-label">From</label>
                    <select id="fromAccount" class="select-input">
                        <option value="${account.id}">${account.name} - ${formatCurrency(account.balance)}</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label class="form-label">To</label>
                    <input 
                        type="text" 
                        id="recipientName" 
                        class="text-input" 
                        value="John Snow"
                        placeholder="Recipient name"
                    />
                    <div class="security-notice">
                        <strong>Help keep e-Transfer safe.</strong> Don't Request which requests the money, nor send 
                        money to people you don't know. Be cautious of scams pretending to be companies 
                        you know and verify who you're sending to. To help stop fraud, we may temporarily 
                        hold payments while conducting fraud detection.
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Message (optional)</label>
                    <textarea 
                        id="transferMessage" 
                        class="textarea-input" 
                        placeholder="Add a message..."
                    ></textarea>
                </div>
                
                <button class="submit-button" id="sendTransferBtn">
                    <span>Swipe to Send</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                </button>
            </div>
        </div>
        
        <!-- Success Modal -->
        <div class="modal-overlay" id="successModal">
            <div class="modal-content">
                <div class="modal-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <h3 class="modal-title">Transfer Successful!</h3>
                <p class="modal-message" id="modalMessage"></p>
                <button class="modal-close-btn" id="closeModalBtn">Done</button>
            </div>
        </div>
    `;
}

function setupTransferListeners() {
    const sendBtn = document.getElementById('sendTransferBtn');
    const modal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    
    if (sendBtn) {
        sendBtn.addEventListener('click', handleTransfer);
    }
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            modal.classList.remove('active');
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        });
    }
    
    // Close modal on overlay click
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
}

function handleTransfer() {
    const amount = document.getElementById('transferAmount').value;
    const recipient = document.getElementById('recipientName').value;
    const message = document.getElementById('transferMessage').value;
    const account = MOCK_DATA.accounts.deposit[0];
    
    // Validation
    if (!amount || parseFloat(amount) <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    
    if (parseFloat(amount) > account.balance) {
        alert('Insufficient funds. Available balance: ' + formatCurrency(account.balance));
        return;
    }
    
    if (!recipient || recipient.trim() === '') {
        alert('Please enter a recipient name');
        return;
    }
    
    // Show success modal
    const modal = document.getElementById('successModal');
    const modalMessage = document.getElementById('modalMessage');
    
    modalMessage.textContent = `$${parseFloat(amount).toFixed(2)} has been successfully sent to ${recipient}`;
    modal.classList.add('active');
    
    // In a real app, this would make an API call to process the transfer
    console.log('Transfer Details:', {
        amount: parseFloat(amount),
        recipient,
        message,
        from: account.name
    });
}
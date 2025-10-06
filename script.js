// ============================================
// THREE-LAYER ARCHITECTURE DEMONSTRATION
// ============================================

// Get form and result elements
const loanForm = document.getElementById('loanForm');
const resultsCard = document.getElementById('resultsCard');

// ============================================
// EVENT LISTENER - Captures user interaction
// ============================================
loanForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload
    
    // DATA LAYER: Get user input data
    const loanData = getUserInput();
    
    // PROCESSING LAYER: Calculate loan payments
    const results = calculateLoanPayment(loanData);
    
    // USER INTERFACE LAYER: Display results
    displayResults(results);
});

// ============================================
// DATA LAYER - Information Storage
// ============================================
function getUserInput() {
    // Collect data from the form inputs
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const annualInterestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTermMonths = parseInt(document.getElementById('loanTerm').value);
    
    return {
        principal: loanAmount,
        annualRate: annualInterestRate,
        termMonths: loanTermMonths
    };
}

// ============================================
// PROCESSING LAYER - Business Logic
// ============================================
function calculateLoanPayment(loanData) {
    const principal = loanData.principal;
    const annualRate = loanData.annualRate;
    const termMonths = loanData.termMonths;
    
    // Convert annual interest rate to monthly decimal rate
    const monthlyRate = (annualRate / 100) / 12;
    
    let monthlyPayment;
    
    // Calculate monthly payment using the standard loan formula
    // Formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
    // Where: M = monthly payment, P = principal, r = monthly rate, n = number of months
    
    if (monthlyRate === 0) {
        // If interest rate is 0%, simply divide principal by months
        monthlyPayment = principal / termMonths;
    } else {
        // Standard loan payment formula
        const x = Math.pow(1 + monthlyRate, termMonths);
        monthlyPayment = (principal * monthlyRate * x) / (x - 1);
    }
    
    // Calculate total amount paid over the loan term
    const totalAmountPaid = monthlyPayment * termMonths;
    
    // Calculate total interest paid
    const totalInterest = totalAmountPaid - principal;
    
    // Return all calculated values
    return {
        monthlyPayment: monthlyPayment,
        totalAmount: totalAmountPaid,
        totalInterest: totalInterest,
        principal: principal
    };
}

// ============================================
// USER INTERFACE LAYER - Presentation
// ============================================
function displayResults(results) {
    // Format numbers as currency (with 2 decimal places)
    document.getElementById('monthlyPayment').textContent = 
        '$' + results.monthlyPayment.toFixed(2);
    
    document.getElementById('totalAmount').textContent = 
        '$' + results.totalAmount.toFixed(2);
    
    document.getElementById('totalInterest').textContent = 
        '$' + results.totalInterest.toFixed(2);
    
    document.getElementById('principalAmount').textContent = 
        '$' + results.principal.toFixed(2);
    
    // Show the results card with a smooth display
    resultsCard.style.display = 'block';
    
    // Smooth scroll to results
    resultsCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
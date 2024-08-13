document.addEventListener('DOMContentLoaded', function() {
  
  const form = document.getElementById('Mortgage-form');
  const amountInput = document.getElementById('amount');
  const termInput = document.getElementById('term');
  const rateInput = document.getElementById('rate');
  const clearAllBtn = document.getElementById('clear-all-btn');
  const repaymentRadio = document.getElementById('repayment');
  const interestOnlyRadio = document.getElementById('interest-only');
  const resultsText = document.getElementById('results-text');
  const resultsIllustration = document.querySelector('.result-illustration img');
  const resultsContainer = document.querySelector('.results');
  const defaultMessage = document.querySelector('.results small');

  
  function calculateRepayments(event) {
      event.preventDefault();  

      
      const amount = parseFloat(amountInput.value);
      const term = parseFloat(termInput.value);
      const rate = parseFloat(rateInput.value) / 100;  

      
      if (isNaN(amount) || isNaN(term) || isNaN(rate)) {
          resultsText.innerHTML = '<p>Please enter valid numbers for all fields.</p>';
          return;
      }

     
      const monthlyRate = rate / 12;
      const numberOfPayments = term * 12;
      let monthlyRepayment;

      if (repaymentRadio.checked) {
         
          monthlyRepayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
      } else if (interestOnlyRadio.checked) {
          
          monthlyRepayment = amount * monthlyRate;
      }

      
      const totalRepayment = monthlyRepayment * numberOfPayments;

    
      defaultMessage.style.display = 'none';
      resultsText.innerHTML = `
          <h2>Your Results</h2>
          <p>Your results are shown below based on the information you provided. To adjust the results, edit the form and click "Calculate Repayments" again.</p>
          <p><strong>Monthly Repayment:</strong> £${monthlyRepayment.toFixed(2)}</p>
          <p><strong>Total You'll Repay Over the Term:</strong> £${totalRepayment.toFixed(2)}</p>
      `;
      resultsIllustration.src = "images/illustration-results.svg";  
  }

  function clearAllFields() {
      amountInput.value = '';
      termInput.value = '';
      rateInput.value = '';
      repaymentRadio.checked = true;

      
      resultsText.innerHTML = 'Results shown here';
      resultsIllustration.src = "images/illustration-empty.svg";  
      defaultMessage.style.display = 'block';  
  }

  
  form.addEventListener('submit', calculateRepayments);
  clearAllBtn.addEventListener('click', clearAllFields);
});

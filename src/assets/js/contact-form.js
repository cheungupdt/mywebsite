document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form[name="contact"]');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      // Let Netlify handle the form submission
      // We'll just show a loading state
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      // Netlify will handle the redirect to thank-you page
      // If you want to handle it manually, remove this timeout and use fetch API
      setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 3000);
    });
    
    // Add real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateInput(this);
      });
      
      input.addEventListener('input', function() {
        validateInput(this);
      });
    });
  }
});

function validateInput(input) {
  const value = input.value.trim();
  const isValid = input.checkValidity();
  
  // Remove existing classes
  input.classList.remove('valid', 'error');
  
  if (value === '') {
    // Empty field
    return;
  }
  
  if (!isValid) {
    input.classList.add('error');
  } else {
    input.classList.add('valid');
  }
}

// Netlify form success handling
if (window.location.search.includes('form=success')) {
  showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
}

function showFormMessage(message, type) {
  // Create message element if it doesn't exist
  let messageEl = document.getElementById('form-message');
  if (!messageEl) {
    messageEl = document.createElement('div');
    messageEl.id = 'form-message';
    messageEl.className = 'form-message';
    document.querySelector('form[name="contact"]').appendChild(messageEl);
  }
  
  messageEl.textContent = message;
  messageEl.className = `form-message ${type}`;
  messageEl.style.display = 'block';
  
  // Scroll to message
  messageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
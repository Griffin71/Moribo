// Moribo Financial Wellness Solution - Utility Functions
// Written by Kabelo Kgosana

// Format currency
function formatCurrency(amount, currency = 'ZAR') {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

// Format date
function formatDate(date) {
  return new Intl.DateTimeFormat('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

// Validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

//Validate phone number
function isValidPhone(phone) {
  // Basic phone validation: digits, spaces, +, -, parentheses allowed, min 7 characters
  const phoneRegex = /^[0-9+()\-\s]{7,20}$/;
  return phoneRegex.test(phone);
}

// Get query parameter
function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Copy to clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    console.log('Copied to clipboard');
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}

// Navigate from index (project root) to services page with a hash
function navigateToServicesSection(id) {
  if (!id) return;
  const hash = id.startsWith('#') ? id : `#${id}`;
  window.location.href = `pages/services.html${hash}`;
}

// Track event
function trackEvent(category, action, label) {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      'event_category': category,
      'event_label': label
    });
  }
}

// Export functions for use
window.utils = {
  formatCurrency,
  formatDate,
  isValidEmail,
  getQueryParameter,
  copyToClipboard,
  trackEvent,
  navigateToServicesSection
};
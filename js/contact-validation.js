// Moribo Financial Wellness - Contact Form Validation & WhatsApp
// Written by Kabelo Kgosana

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  
  if (!form) return;
  
  const messageContainer = document.createElement('div');
  messageContainer.id = 'form-message';
  form.appendChild(messageContainer);

  const badWords = ['fuck', 'shit', 'bitch', 'asshole', 'cunt', 'damn', 'bastard', 'idiot', 'stupid', 'moron', 'fucker', 'bitchy', 'pussy'];

  function containsBadWords(text) {
    if (!text) return false;
    const lowerText = text.toLowerCase();
    return badWords.some(word => lowerText.includes(word));
  }

  function showMessage(text, type) {
    messageContainer.textContent = text;
    messageContainer.style.backgroundColor = type === 'error' ? '#fee2e2' : '#d1fae5';
    messageContainer.style.color = type === 'error' ? '#b91c1c' : '#166534';
    messageContainer.style.border = type === 'error' ? '1px solid #fecaca' : '1px solid #a7f3d0';
    messageContainer.style.borderRadius = '4px';
    messageContainer.style.padding = '12px';
    messageContainer.style.marginTop = '16px';
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    messageContainer.textContent = '';

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !subject || !message) {
      showMessage("Please fill in all required fields marked with *", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showMessage("Please enter a valid email address.", "error");
      return;
    }

    if (containsBadWords(subject)) {
      showMessage("Please remove inappropriate language from the Subject field.", "error");
      return;
    }

    if (containsBadWords(message)) {
      showMessage("Please keep your message respectful and professional. Thank you.", "error");
      return;
    }

    // Create WhatsApp message
    const whatsappMessage = `Hello, I'm ${name}%0A%0A*Subject:* ${subject}%0A*Message:* ${message}%0A%0A*My Email:* ${email}%0A*My Phone:* ${phone}`;
    
    // CORRECT international format: 27 (country code) + 615814305 (number without 0)

    window.open(`https://wa.me/27615814305?text=${whatsappMessage}`, '_blank');
    
    // Show success message
    showMessage("Thank you! Redirecting to WhatsApp... Please send your message.", "success");
    
    // Reset form after 3 seconds
    setTimeout(() => {
      form.reset();
      setTimeout(() => {
        messageContainer.textContent = '';
      }, 2000);
    }, 3000);
  });
});
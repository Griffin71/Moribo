// Moribo Financial Wellness - Contact Form Validation
//Written by Kabelo Kgosana
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  
  if (!form) return;
  
  const messageContainer = document.createElement('div');
  messageContainer.id = 'form-message';
  form.appendChild(messageContainer);

  const badWords = ['fuck', 'shit', 'bitch', 'asshole', 'cunt', 'damn', 'bastard', 'idiot', 'stupid', 'moron', 'fucker', 'bitchy'];

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
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    messageContainer.textContent = '';

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

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

    showMessage("Thank you! Your message has been received. We will get back to you soon.", "success");
    
    setTimeout(() => {
      form.reset();
      messageContainer.textContent = '';
    }, 4000);
  });
});
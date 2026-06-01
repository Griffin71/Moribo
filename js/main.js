// Moribo Financial Wellness Solution - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  console.log('Moribo Financial Wellness Solution - Loaded');
  
  // Initialize mobile menu if needed
  initMobileMenu();
  
  // Initialize cookie consent
  initCookieConsent();
  
  // Smooth scroll for anchor links
  initSmoothScroll();
  
  // Initialize animations
  initAnimations();
  
  // Initialize interactive elements
  initInteractiveElements();

  // Enable image fullscreen preview for large visuals
  initImageLightbox();
  
  // Active nav link highlight
  updateActiveNavLink();
  
  // Scroll effect for header
  addHeaderScrollEffect();
});

// Update active navigation link based on current page
function updateActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href').split('/').pop() || 'index.html';
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.style.color = 'var(--teal-accent)';
    }
  });
}

// Add header scroll effect
function addHeaderScrollEffect() {
  const header = document.querySelector('header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      header.style.boxShadow = '0 4px 12px rgba(53, 41, 36, 0.15)';
    } else {
      header.style.boxShadow = '0 2px 8px rgba(53, 41, 36, 0.1)';
    }
    
    lastScrollTop = scrollTop;
  });
}

// Initialize animations on scroll
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card, .service-card, .section').forEach(el => {
    observer.observe(el);
  });
}

// Initialize interactive elements
function initInteractiveElements() {
  const interactiveElements = document.querySelectorAll('.interactive, .interactive-btn');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
    });
    
    // Close menu when link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  }
}

// Smooth Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initImageLightbox() {
  const images = document.querySelectorAll('.investment-image');
  if (!images.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = '<span class="lightbox-close">&times;</span><img alt="Image preview" />';
  document.body.appendChild(overlay);

  const overlayImage = overlay.querySelector('img');
  const closeButton = overlay.querySelector('.lightbox-close');

  images.forEach(image => {
    image.addEventListener('click', () => {
      overlayImage.src = image.src;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeButton.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', event => {
    if (event.target === overlay) {
      closeLightbox();
    }
  });
}

// Cookie Consent
function initCookieConsent() {
  const consentBanner = document.getElementById('cookie-consent');
  const acceptBtn = document.getElementById('accept-cookies');
  const denyBtn = document.getElementById('deny-cookies');
  
  if (consentBanner) {
    const consentChoice = localStorage.getItem('cookieConsent');
    
    if (!consentChoice) {
      setTimeout(function() {
        consentBanner.style.display = 'block';
      }, 1500);
    }
    
    if (acceptBtn) {
      acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        enableAnalytics();
        consentBanner.style.display = 'none';
      });
    }
    
    if (denyBtn) {
      denyBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'denied');
        consentBanner.style.display = 'none';
      });
    }
  }
}

// Analytics (only if user consents)
function enableAnalytics() {
  console.log('Analytics enabled');
}

// Scroll to Top Button
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add click handler for CTA buttons
window.addEventListener('load', function() {
  const ctaButtons = document.querySelectorAll('.btn-primary');
  ctaButtons.forEach(button => {
    if (!button.href || button.href === '#') {
      button.style.cursor = 'pointer';
    }
  });
});

// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

document.addEventListener('DOMContentLoaded', function() {
  // Interactive SVG wheel code removed; remaining scripts handle UI and lightbox.
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const wheelImage = document.getElementById('wheelImage');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal-close');
    
    // Function to open modal with the clicked image
    function openModal() {
        if (wheelImage && modal && modalImg) {
            // Set modal image source to the wheel image source
            modalImg.src = wheelImage.src;
            modalImg.alt = wheelImage.alt;
            // Display modal
            modal.style.display = 'flex';
            // Prevent body scrolling when modal is open
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Function to close modal
    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
            // Restore body scrolling
            document.body.style.overflow = '';
        }
    }
    
    // Add click event to wheel image (tap to view full screen)
    if (wheelImage) {
        wheelImage.addEventListener('click', openModal);
        // Add touch-friendly feedback for mobile
        wheelImage.style.cursor = 'pointer';
    }
    
    // Add click event to close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside the image (on the modal background)
    if (modal) {
        modal.addEventListener('click', function(e) {
            // If the click is directly on the modal background (not on modal-content or close button)
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Optional: Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
            closeModal();
        }
    });
    
    // Handle touch events for mobile smoothness (prevent zoom conflicts)
    if (wheelImage) {
        wheelImage.addEventListener('touchstart', function(e) {
            // Just ensures the click works; no extra action needed
            // Prevents any default drag behavior on image
            e.preventDefault();
            openModal();
        }, { passive: false });
    }
});
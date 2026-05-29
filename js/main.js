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

    const services = [
        { title: "Budgeting & Coaching Services", color: "#8b5cf6", icon: "💰" },
        { title: "Debt Management Solutions", color: "#ef4444", icon: "📋" },
        { title: "Facilitated Insurance Solutions", color: "#f97316", icon: "🛡️" },
        { title: "Facilitated Personal Insurance Solutions", color: "#fb923c", icon: "🛡️" },
        { title: "Upskilling Workshops & Training", color: "#eab308", icon: "🎓" },
        { title: "Facilitated Lending Solutions", color: "#22c55e", icon: "🏠" },
        { title: "Integrated Wellness Events", color: "#14b8a6", icon: "❤️" },
        { title: "Personal Financial Wellness Management Programs", color: "#3b82f6", icon: "💼" }
    ];

    const svg = document.getElementById('financial-wheel');
    svg.innerHTML = '';

    const centerX = 350, centerY = 350, radius = 280;

    services.forEach((service, i) => {
        const angle = (i * 45) - 90; // 45 degrees per segment
        const rad = (angle * Math.PI) / 180;
        
        const x = centerX + radius * Math.cos(rad);
        const y = centerY + radius * Math.sin(rad);

        // Create colored segment (using simple circle sectors for now)
        const segment = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        segment.setAttribute("cx", centerX);
        segment.setAttribute("cy", centerY);
        segment.setAttribute("r", radius);
        segment.setAttribute("fill", "none");
        segment.setAttribute("stroke", service.color);
        segment.setAttribute("stroke-width", "140");
        segment.setAttribute("stroke-dasharray", "110 250");
        segment.setAttribute("stroke-dashoffset", -i * 110);
        segment.setAttribute("class", "segment");
        segment.style.transition = "all 0.3s ease";

        segment.addEventListener('click', () => {
            showModal(service);
        });

        svg.appendChild(segment);

        // Icon
        const icon = document.createElementNS("http://www.w3.org/2000/svg", "text");
        icon.setAttribute("x", x);
        icon.setAttribute("y", y);
        icon.setAttribute("font-size", "38");
        icon.setAttribute("text-anchor", "middle");
        icon.setAttribute("dominant-baseline", "middle");
        icon.textContent = service.icon;
        svg.appendChild(icon);
    });

    // Center Hub
    const center = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    center.setAttribute("cx", centerX);
    center.setAttribute("cy", centerY);
    center.setAttribute("r", "110");
    center.setAttribute("fill", "#ffffff");
    center.setAttribute("stroke", "#ddd");
    center.setAttribute("stroke-width", "25");
    svg.appendChild(center);

    const text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text1.setAttribute("x", centerX);
    text1.setAttribute("y", centerY - 8);
    text1.setAttribute("text-anchor", "middle");
    text1.setAttribute("font-size", "21");
    text1.setAttribute("fill", "#1f2937");
    text1.textContent = "The Financial";
    svg.appendChild(text1);

    const text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text2.setAttribute("x", centerX);
    text2.setAttribute("y", centerY + 18);
    text2.setAttribute("text-anchor", "middle");
    text2.setAttribute("font-size", "21");
    text2.setAttribute("fill", "#1f2937");
    text2.textContent = "Wellness Hub";
    svg.appendChild(text2);

    console.log("✅ Wheel should be visible now");
});

function showModal(service) {
    document.getElementById('modal-icon').innerHTML = service.icon;
    document.getElementById('modal-title').textContent = service.title;
    document.getElementById('service-modal').style.display = "flex";
}
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
        { 
            title: "Financial Assessment", 
            color: "#3b82f6", 
            icon: "fas fa-chart-line",
            description: "Comprehensive financial wellness assessments tailored to your situation",
            benefits: ["Income & Expense Analysis", "Asset & Liability Review", "Financial Health Profile", "Personalized Recommendations"]
        },
        { 
            title: "Debt Management", 
            color: "#ef4444", 
            icon: "fas fa-credit-card",
            description: "Strategic solutions to restructure and manage your debt effectively",
            benefits: ["Debt Restructuring", "Formal Debt Review", "Reckless Lending Assessment", "Repayment Planning"]
        },
        { 
            title: "Budgeting & Coaching", 
            color: "#8b5cf6", 
            icon: "fas fa-calculator",
            description: "Personalized coaching to develop practical budgeting skills and financial discipline",
            benefits: ["Budget Creation", "Financial Coaching", "Expense Management", "Savings Planning"]
        },
        { 
            title: "Insurance Solutions", 
            color: "#f97316", 
            icon: "fas fa-shield-alt",
            description: "Access to affordable and suitable personal insurance coverage options",
            benefits: ["Personal Insurance", "Coverage Assessment", "Affordable Options", "Expert Guidance"]
        },
        { 
            title: "Workshops & Training", 
            color: "#eab308", 
            icon: "fas fa-graduation-cap",
            description: "Comprehensive educational programs to enhance your financial knowledge",
            benefits: ["Financial Literacy", "Retirement Planning", "Money Management Skills", "Workplace Readiness"]
        },
        { 
            title: "Wellness Events", 
            color: "#14b8a6", 
            icon: "fas fa-calendar-alt",
            description: "Integrated financial wellness initiatives for organizations and communities",
            benefits: ["Event Coordination", "Employee Programs", "Wellness Days", "Community Education"]
        },
        { 
            title: "Lending Facilitation", 
            color: "#22c55e", 
            icon: "fas fa-handshake",
            description: "Access to responsible lending and financing solutions for your needs",
            benefits: ["Personal Loans", "Home Financing", "Payroll Deductions", "Affordable Terms"]
        },
        { 
            title: "Wealth Planning", 
            color: "#06b6d4", 
            icon: "fas fa-piggy-bank",
            description: "Strategic planning to grow your wealth and secure your financial future",
            benefits: ["Investment Planning", "Savings Strategy", "Wealth Growth", "Future Security"]
        }
    ];

    const wheelContainer = document.getElementById('financial-wheel');
    if (!wheelContainer) return;

    // Responsive sizing
    const containerWidth = wheelContainer.parentElement.clientWidth;
    const svgSize = Math.min(containerWidth - 20, 650);
    const isMobile = window.innerWidth <= 768;
    
    const centerX = svgSize / 2;
    const centerY = svgSize / 2;
    const radius = isMobile ? svgSize / 2.8 : svgSize / 2.4;

    wheelContainer.setAttribute('viewBox', `0 0 ${svgSize} ${svgSize}`);
    wheelContainer.setAttribute('height', `${svgSize}px`);
    wheelContainer.innerHTML = '';

    // Create wheel segments with better interactivity
    services.forEach((service, i) => {
        const angle = (i * (360 / services.length)) - 90;
        const rad = (angle * Math.PI) / 180;
        
        const x = centerX + radius * Math.cos(rad);
        const y = centerY + radius * Math.sin(rad);

        // Segment circle
        const segment = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        segment.setAttribute("cx", centerX);
        segment.setAttribute("cy", centerY);
        segment.setAttribute("r", radius);
        segment.setAttribute("fill", "none");
        segment.setAttribute("stroke", service.color);
        segment.setAttribute("stroke-width", radius / 2);
        segment.setAttribute("stroke-dasharray", (2 * Math.PI * radius) / services.length + " " + (2 * Math.PI * radius));
        segment.setAttribute("stroke-dashoffset", -(i * (2 * Math.PI * radius) / services.length));
        segment.setAttribute("class", "segment");
        segment.setAttribute("data-index", i);
        segment.style.cursor = "pointer";
        segment.style.transition = "all 0.3s ease";

        segment.addEventListener('click', () => showModal(service));
        segment.addEventListener('mouseenter', () => {
            segment.style.filter = "brightness(1.2)";
            segment.style.opacity = "0.9";
        });
        segment.addEventListener('mouseleave', () => {
            segment.style.filter = "brightness(1)";
            segment.style.opacity = "1";
        });

        wheelContainer.appendChild(segment);

        // FontAwesome Icon
        const iconText = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        iconText.setAttribute("x", x - 20);
        iconText.setAttribute("y", y - 20);
        iconText.setAttribute("width", "40");
        iconText.setAttribute("height", "40");

        const icon = document.createElement("i");
        icon.className = service.icon + " fa-2x";
        icon.style.color = service.color;
        icon.style.display = "flex";
        icon.style.alignItems = "center";
        icon.style.justifyContent = "center";
        icon.style.width = "100%";
        icon.style.height = "100%";

        iconText.appendChild(icon);
        wheelContainer.appendChild(iconText);

        // Label text (smaller on mobile)
        const labelText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        const labelRadius = radius + (isMobile ? 40 : 60);
        const labelX = centerX + labelRadius * Math.cos(rad);
        const labelY = centerY + labelRadius * Math.sin(rad);
        
        labelText.setAttribute("x", labelX);
        labelText.setAttribute("y", labelY);
        labelText.setAttribute("text-anchor", "middle");
        labelText.setAttribute("dominant-baseline", "middle");
        labelText.setAttribute("font-size", isMobile ? "10" : "12");
        labelText.setAttribute("fill", service.color);
        labelText.setAttribute("font-weight", "bold");
        labelText.style.pointerEvents = "none";
        
        const words = service.title.split(" ");
        if (isMobile && words.length > 2) {
            labelText.textContent = words.slice(0, 2).join(" ");
        } else {
            labelText.textContent = service.title;
        }
        labelText.style.cursor = "pointer";
        wheelContainer.appendChild(labelText);
    });

    // Center Hub with better styling
    const center = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    center.setAttribute("cx", centerX);
    center.setAttribute("cy", centerY);
    center.setAttribute("r", radius / 2.5);
    center.setAttribute("fill", "white");
    center.setAttribute("stroke", "var(--primary-brown)");
    center.setAttribute("stroke-width", "3");
    center.style.filter = "drop-shadow(0 2px 6px rgba(0, 0, 0, 0.15))";
    wheelContainer.appendChild(center);

    // Center text
    const text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text1.setAttribute("x", centerX);
    text1.setAttribute("y", centerY - 10);
    text1.setAttribute("text-anchor", "middle");
    text1.setAttribute("font-size", isMobile ? "14" : "18");
    text1.setAttribute("fill", "var(--primary-brown)");
    text1.setAttribute("font-weight", "bold");
    text1.textContent = "Financial";
    wheelContainer.appendChild(text1);

    const text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text2.setAttribute("x", centerX);
    text2.setAttribute("y", centerY + 12);
    text2.setAttribute("text-anchor", "middle");
    text2.setAttribute("font-size", isMobile ? "14" : "18");
    text2.setAttribute("fill", "var(--primary-brown)");
    text2.setAttribute("font-weight", "bold");
    text2.textContent = "Wellness";
    wheelContainer.appendChild(text2);

    // Close modal on click outside
    document.getElementById('service-modal').addEventListener('click', (e) => {
        if (e.target.id === 'service-modal') {
            e.target.style.display = 'none';
        }
    });

    // Close modal on close button
    document.querySelector('.modal-close').addEventListener('click', () => {
        document.getElementById('service-modal').style.display = 'none';
    });

    // Handle window resize for responsive wheel
    window.addEventListener('resize', debounce(() => {
        if (document.getElementById('financial-wheel')) {
            location.reload();
        }
    }, 500));
});

function showModal(service) {
    const modal = document.getElementById('service-modal');
    document.getElementById('modal-icon').innerHTML = `<i class="${service.icon} fa-3x" style="color: ${service.color}; margin-bottom: 1rem;"></i>`;
    document.getElementById('modal-title').textContent = service.title;
    document.getElementById('modal-description').innerHTML = `<p style="color: var(--text-light); font-size: 1rem; margin: 1rem 0; line-height: 1.6;">${service.description}</p>`;
    
    const benefitsList = document.getElementById('modal-benefits');
    benefitsList.innerHTML = '';
    benefitsList.style.textAlign = 'left';
    benefitsList.style.marginLeft = '1.5rem';
    benefitsList.style.marginBottom = '1rem';
    service.benefits.forEach(benefit => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check-circle" style="color: var(--teal-accent); margin-right: 0.5rem;"></i>${benefit}`;
        li.style.marginBottom = '0.5rem';
        li.style.color = 'var(--text-dark)';
        benefitsList.appendChild(li);
    });
    
    document.getElementById('modal-cta').href = '/pages/contact.html';
    modal.style.display = 'flex';
}
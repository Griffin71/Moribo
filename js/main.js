// Moribo Financial Wellness Solution - Main JavaScript
// Written by Kabelo Kgosana
document.addEventListener('DOMContentLoaded', function() {
  console.log('Moribo Financial Wellness Solution - Loaded');
  
  // Initialize all components
  initCookieConsent();
  initSmoothScroll();
  initAnimations();
  initUnifiedImageModal();
  updateActiveNavLink();
  addHeaderScrollEffect();
});

// Update active navigation link based on current page
function updateActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href').split('/').pop() || 'index.html';
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.style.color = 'var(--primary-blue, #0057B7)';
      link.style.fontWeight = '700';
    }
  });
}

// Add header scroll effect — header starts transparent, becomes solid past hero
function addHeaderScrollEffect() {
  const header = document.querySelector('header');
  const hero = document.querySelector('.hero');

  if (!header) return;

  header.classList.remove('header-solid', 'scrolled');

  function updateHeader() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (!hero) {
      header.classList.add('header-solid');
      header.classList.toggle('scrolled', scrollTop > 24);
      return;
    }

    const heroHeight = hero.offsetHeight || window.innerHeight;
    const heroBottom = hero.offsetTop + heroHeight;
    const shouldBeSolid = scrollTop >= Math.max(40, heroBottom - 140);

    header.classList.toggle('header-solid', shouldBeSolid);
    header.classList.toggle('scrolled', scrollTop > 24);
  }

  updateHeader();
  window.addEventListener('load', updateHeader, { once: true });
  window.addEventListener('scroll', updateHeader, { passive: true });

  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateHeader, 100);
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

// Unified Image Modal for all pages
function initUnifiedImageModal() {
  let modal = document.getElementById('unifiedModal');
  
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'unifiedModal';
    modal.className = 'modal';
    modal.innerHTML = `
      <span class="modal-close">&times;</span>
      <img class="modal-content" id="unifiedModalImage">
      <div class="modal-nav prev">‹</div>
      <div class="modal-nav next">›</div>
    `;
    document.body.appendChild(modal);
  }

  const modalImg = document.getElementById('unifiedModalImage');
  const closeBtn = modal.querySelector('.modal-close');
  const prevBtn = modal.querySelector('.prev');
  const nextBtn = modal.querySelector('.next');
  
  // Collect all clickable images
  const clickableImages = [
    ...document.querySelectorAll('.investment-image'),
    ...document.querySelectorAll('.responsive-investment-img'),
    ...document.querySelectorAll('#wheelImage')
  ];
  
  const teamMembers = document.querySelectorAll('.team-member');
  
  let currentImageSet = [];
  let currentIndex = 0;
  
  function updateNavVisibility() {
    if (currentImageSet.length > 1) {
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
    } else {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    }
  }
  
  function openModal(imgSrc) {
    currentImageSet = [];
    modalImg.src = imgSrc;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    updateNavVisibility();
  }
  
  function openGallery(imagesArray, startIndex) {
    currentImageSet = imagesArray;
    currentIndex = startIndex;
    modalImg.src = currentImageSet[currentIndex];
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    updateNavVisibility();
  }
  
  function nextImage() {
    if (currentImageSet.length > 0) {
      currentIndex = (currentIndex + 1) % currentImageSet.length;
      modalImg.src = currentImageSet[currentIndex];
    }
  }
  
  function prevImage() {
    if (currentImageSet.length > 0) {
      currentIndex = (currentIndex - 1 + currentImageSet.length) % currentImageSet.length;
      modalImg.src = currentImageSet[currentIndex];
    }
  }
  
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
    currentImageSet = [];
  }
  
  // Single images
  clickableImages.forEach(img => {
    if (img) {
      img.style.cursor = 'pointer';
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(img.src);
      });
    }
  });
  
  // Team members gallery
  if (teamMembers.length > 0) {
    const teamImages = Array.from(teamMembers).map(member => {
      return member.getAttribute('data-src') || (member.querySelector('img') ? member.querySelector('img').src : null);
    }).filter(src => src);
    
    teamMembers.forEach((member, idx) => {
      if (teamImages[idx]) {
        member.style.cursor = 'pointer';
        member.addEventListener('click', () => {
          openGallery(teamImages, idx);
        });
      }
    });
  }
  
  // Event listeners
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (prevBtn) prevBtn.addEventListener('click', prevImage);
  if (nextBtn) nextBtn.addEventListener('click', nextImage);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  document.addEventListener('keydown', (e) => {
    if (modal.style.display !== 'flex') return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  });
  
  // Touch swipe
  let touchStartX = 0;
  modal.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  modal.addEventListener('touchend', (e) => {
    if (modal.style.display !== 'flex') return;
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextImage();
      else prevImage();
    }
  });
}

// Cookie Consent
function initCookieConsent() {
  const consentBanner = document.getElementById('cookie-consent');
  const acceptBtn = document.getElementById('accept-cookies');
  const denyBtn = document.getElementById('deny-cookies');

  if (!consentBanner) return;

  const consentChoice = localStorage.getItem('cookieConsent');

  if (consentChoice) {
    consentBanner.style.display = 'none';
  } else {
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

function enableAnalytics() {
  console.log('Analytics enabled');
}

// Scroll to Top function
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Debounce function
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

// Hero Section - 4 Stock Images that shift/rotate
(function() {
    'use strict';

    const stockImages = [
        "https://images.pexels.com/photos/36135026/pexels-photo-36135026.jpeg?auto=compress&w=1600",
        "https://images.pexels.com/photos/24590645/pexels-photo-24590645.jpeg?auto=compress&w=1600",
        "https://images.pexels.com/photos/17247741/pexels-photo-17247741.jpeg?auto=compress&w=1600",
        "https://images.pexels.com/photos/8645749/pexels-photo-8645749.jpeg?auto=compress&w=1600",
        "https://images.pexels.com/photos/24206203/pexels-photo-24206203.jpeg?auto=compress&w=1600"
    ];

    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');
    
    let currentImageIndex = 0;
    let intervalId = null;

    function changeNextImage() {
        currentImageIndex = (currentImageIndex + 1) % stockImages.length;
        
        if (heroBg) {
            heroBg.style.opacity = '0';
            setTimeout(() => {
                heroBg.src = stockImages[currentImageIndex];
                heroBg.style.opacity = '1';
            }, 500);
        }
    }

    function smartShiftImages() {
        const randomChoice = Math.random();
        if (randomChoice < 0.6) {
            changeNextImage();
        } else {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * stockImages.length);
            } while (newIndex === currentImageIndex && stockImages.length > 1);
            currentImageIndex = newIndex;
            
            if (heroBg) {
                heroBg.style.opacity = '0';
                setTimeout(() => {
                    heroBg.src = stockImages[currentImageIndex];
                    heroBg.style.opacity = '1';
                }, 500);
            }
        }
    }

    function setHeroFullHeight() {
        if (hero) {
            hero.style.minHeight = window.innerHeight + 'px';
        }
    }

    if (heroBg) {
        currentImageIndex = Math.floor(Math.random() * stockImages.length);
        heroBg.src = stockImages[currentImageIndex];
        heroBg.style.transition = 'opacity 0.8s ease-in-out';
        heroBg.style.opacity = '1';
        heroBg.setAttribute('loading', 'eager');
        
        intervalId = setInterval(smartShiftImages, 6000);
    }

    window.addEventListener('resize', function() {
        setHeroFullHeight();
    });

    setHeroFullHeight();

    window.addEventListener('beforeunload', function() {
        if (intervalId) {
            clearInterval(intervalId);
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();

// Interactive Wellness Table - 7 Topics (for index.html)
(function() {
    'use strict';

    const sectionMap = {
        'voluntary-payroll': 'voluntary-payroll',
        'financial-wellness': 'financial-wellness', 
        'lending-solutions': 'lending-solutions',
        'upskilling-workshops': 'upskilling-workshops',
        'debt-management': 'debt-management',
        'budgeting-coaching': 'budgeting-coaching',
        'wellness-events': 'wellness-events'
    };

    function addSectionIds() {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const titleElement = section.querySelector('h2');
            if (titleElement) {
                const titleText = titleElement.innerText.toLowerCase();
                
                if (titleText.includes('payroll') || titleText.includes('deduction')) {
                    section.id = 'voluntary-payroll';
                } else if (titleText.includes('personal financial') || titleText.includes('wellness management')) {
                    section.id = 'financial-wellness';
                } else if (titleText.includes('lending') || titleText.includes('financing')) {
                    section.id = 'lending-solutions';
                } else if (titleText.includes('upskilling') || titleText.includes('training')) {
                    section.id = 'upskilling-workshops';
                } else if (titleText.includes('debt')) {
                    section.id = 'debt-management';
                } else if (titleText.includes('budget') || titleText.includes('coaching')) {
                    section.id = 'budgeting-coaching';
                } else if (titleText.includes('event') || titleText.includes('wellness programs')) {
                    section.id = 'wellness-events';
                }
            }
        });
    }

    function scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        
        if (targetSection) {
            document.querySelectorAll('.highlight-target').forEach(el => {
                el.classList.remove('highlight-target');
            });
            
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            setTimeout(() => {
                targetSection.classList.add('highlight-target');
                setTimeout(() => {
                    targetSection.classList.remove('highlight-target');
                }, 2500);
            }, 500);
        } else {
            localStorage.setItem('highlightSection', sectionId);
            window.location.href = 'pages/services.html#' + sectionId;
        }
    }

    function initTableInteractions() {
        const tableItems = document.querySelectorAll('.table-item');
        
        tableItems.forEach(item => {
            item.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                
                if (targetId && sectionMap[targetId]) {
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 200);
                    
                    scrollToSection(sectionMap[targetId]);
                }
            });
        });
    }

  function handleHashOnLoad() {
    function applyHighlightToId(id) {
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      const sectionEl = el.closest('.section') || el;
      try {
        sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch (e) {
        window.scrollTo({ top: sectionEl.offsetTop, behavior: 'smooth' });
      }
      sectionEl.classList.add('highlight-target');
      setTimeout(() => sectionEl.classList.remove('highlight-target'), 3000);
    }

    const storedHighlight = localStorage.getItem('highlightSection');
    if (storedHighlight) {
      localStorage.removeItem('highlightSection');
      window.addEventListener('load', () => setTimeout(() => applyHighlightToId(storedHighlight), 60));
    }

    if (window.location.hash) {
      const hash = decodeURIComponent(window.location.hash.substring(1));
      window.addEventListener('load', () => setTimeout(() => applyHighlightToId(hash), 60));
    }
  }

    function init() {
        addSectionIds();
        initTableInteractions();
        handleHashOnLoad();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

// Services page specific: Interactive Wellness Table with Highlight
(function() {
    'use strict';

    const sectionMap = {
        'financial-wellness': 'financial-wellness',
        'debt-management': 'debt-management',
        'budgeting-coaching': 'budgeting-coaching',
        'facilitated-solutions': 'facilitated-solutions',
        'upskilling-workshops': 'upskilling-workshops',
        'wellness-events': 'wellness-events',
        'voluntary-payroll': 'voluntary-payroll',
        'lending-solutions': 'lending-solutions'
    };

    function handlePayrollLending(targetId) {
        if (targetId === 'voluntary-payroll') {
            const payrollCard = document.querySelector('#facilitated-solutions .card:last-child');
            if (payrollCard) {
                payrollCard.classList.add('highlight-card');
                setTimeout(() => {
                    payrollCard.classList.remove('highlight-card');
                }, 3000);
            }
        } else if (targetId === 'lending-solutions') {
            const cards = document.querySelectorAll('#facilitated-solutions .card');
            const lendingCard = cards[1];
            if (lendingCard) {
                lendingCard.classList.add('highlight-card');
                setTimeout(() => {
                    lendingCard.classList.remove('highlight-card');
                }, 3000);
            }
        }
    }

    function scrollToSection(sectionId, targetId) {
        let targetSection = document.getElementById(sectionId);
        
        if (targetId === 'voluntary-payroll' || targetId === 'lending-solutions') {
            targetSection = document.getElementById('facilitated-solutions');
        }
        
        if (targetSection) {
            document.querySelectorAll('.highlight-target').forEach(el => {
                el.classList.remove('highlight-target');
            });
            
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            setTimeout(() => {
                targetSection.classList.add('highlight-target');
                
                if (targetId === 'voluntary-payroll' || targetId === 'lending-solutions') {
                    handlePayrollLending(targetId);
                }
                
                setTimeout(() => {
                    targetSection.classList.remove('highlight-target');
                }, 3000);
            }, 500);
        }
    }

    function initTableInteractions() {
        const tableItems = document.querySelectorAll('.table-item');
        
        tableItems.forEach(item => {
            item.addEventListener('click', function(e) {
                const targetId = this.getAttribute('data-target');
                
                if (targetId && sectionMap[targetId]) {
                    this.style.transform = 'scale(0.97)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 200);
                    
                    localStorage.setItem('highlightSection', targetId);
                    window.location.href = 'pages/services.html#' + sectionMap[targetId];
                }
            });
        });
    }

  function handleIncomingHighlight() {
    handleHashOnLoad();
  }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initTableInteractions();
            handleIncomingHighlight();
        });
    } else {
        initTableInteractions();
        handleIncomingHighlight();
    }
})();

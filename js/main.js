// Moribo Financial Wellness Solution - Main JavaScript
//Written by Kabelo Kgosana
document.addEventListener('DOMContentLoaded', function() {
  console.log('Moribo Financial Wellness Solution - Loaded');
  
  // Initialize all components
  initMobileMenu();
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
      link.style.color = 'var(--teal-accent)';
    }
  });
}

// Add header scroll effect
function addHeaderScrollEffect() {
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
      header.style.boxShadow = '0 4px 12px rgba(53, 41, 36, 0.15)';
    } else {
      header.style.boxShadow = '0 2px 8px rgba(53, 41, 36, 0.1)';
    }
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

// Mobile Menu Toggle
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
    });
    
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

// Hero Section - 4 Random Stock Images that shift/rotate
(function() {
    'use strict';

    // Array of 4 stock images (financial advisor category)
    const stockImages = [
        "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&w=1600", //WORKS  // Advisor with client
        "https://images.pexels.com/photos/4476371/pexels-photo-4476371.jpeg?auto=compress&w=1600", //WORKS  // Business meeting
        "https://images.pexels.com/photos/8441820/pexels-photo-8441820.jpeg?auto=compress&w=1600", //WORKS // Investment planning
        "https://images.pexels.com/photos/4386373/pexels-photo-4386373.jpeg?auto=compress&w=1600"  //WORKS // Growth & wealth
    ];

    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');
    const learnMoreBtn = document.querySelector('.btn-primary');
    
    let currentImageIndex = 0;
    let intervalId = null;

    // Function to change to a random image
    function changeRandomImage() {
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

    // Function to change to next image (sequential, for variety)
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

    // Random shift: sometimes random, sometimes sequential (more natural)
    function smartShiftImages() {
        const randomChoice = Math.random();
        if (randomChoice < 0.6) {
            // 60% chance: go to next image sequentially
            changeNextImage();
        } else {
            // 40% chance: go to random different image
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

    // Make hero full screen height
    function setHeroFullHeight() {
        if (hero) {
            hero.style.minHeight = window.innerHeight + 'px';
        }
    }

    // Smooth scroll for Learn More button
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetEl = document.querySelector(href);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    }

    // Set initial random image on page load
    if (heroBg) {
        currentImageIndex = Math.floor(Math.random() * stockImages.length);
        heroBg.src = stockImages[currentImageIndex];
        heroBg.style.transition = 'opacity 0.8s ease-in-out';
        heroBg.style.opacity = '1';
        
        // Start interval to shift images every 5 seconds
        intervalId = setInterval(smartShiftImages, 5000);
    }

    // Handle resize
    window.addEventListener('resize', function() {
        setHeroFullHeight();
    });

    // Initial call
    setHeroFullHeight();

    // Clean up interval if needed (optional, but good practice)
    window.addEventListener('beforeunload', function() {
        if (intervalId) {
            clearInterval(intervalId);
        }
    });

    // Smooth scroll for any anchor links
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

// Interactive Wellness Table - 7 Topics
(function() {
    'use strict';

    // Mapping: data-target -> section ID on services page
    const sectionMap = {
        'voluntary-payroll': 'voluntary-payroll',
        'financial-wellness': 'financial-wellness', 
        'lending-solutions': 'lending-solutions',
        'upskilling-workshops': 'upskilling-workshops',
        'debt-management': 'debt-management',
        'budgeting-coaching': 'budgeting-coaching',
        'wellness-events': 'wellness-events'
    };

    // Add IDs to sections dynamically
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

    // Smooth scroll to section with highlight
    function scrollToSection(sectionId, clickedItem) {
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
            // Navigate to services page
            localStorage.setItem('highlightSection', sectionId);
            window.location.href = 'pages/services.html#' + sectionId;
        }
    }

    // Handle clicks
    function initTableInteractions() {
        const tableItems = document.querySelectorAll('.table-item');
        
        tableItems.forEach(item => {
            item.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                
                if (targetId && sectionMap[targetId]) {
                    // Visual feedback
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 200);
                    
                    scrollToSection(sectionMap[targetId], this);
                }
            });
        });
    }

  // Handle URL hash and stored highlight on load. Wait for full window.load for reliable scroll positions.
  function handleHashOnLoad() {
    function applyHighlightToId(id) {
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      const sectionEl = el.closest('.section') || el;
      // Scroll into view after layout settled
      try {
        sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } catch (e) {
        window.scrollTo({ top: sectionEl.offsetTop, behavior: 'smooth' });
      }
      sectionEl.classList.add('highlight-target');
      setTimeout(() => sectionEl.classList.remove('highlight-target'), 3000);
    }

    // Apply stored highlight from index navigation
    const storedHighlight = localStorage.getItem('highlightSection');
    if (storedHighlight) {
      localStorage.removeItem('highlightSection');
      // Wait for load then apply
      window.addEventListener('load', () => setTimeout(() => applyHighlightToId(storedHighlight), 60));
    }

    // If there's a hash in URL, apply after load
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

// Interactive Wellness Table - 7 Topics with Highlight
(function() {
    'use strict';

    // Mapping: data-target -> section ID on services.html
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

    // Special handling for payroll and lending (they're inside Facilitated Solutions)
    function handlePayrollLending(targetId) {
        if (targetId === 'voluntary-payroll') {
            // Find the payroll card inside Facilitated Solutions
            const payrollCard = document.querySelector('#facilitated-solutions .card:last-child');
            if (payrollCard) {
                payrollCard.classList.add('highlight-card');
                setTimeout(() => {
                    payrollCard.classList.remove('highlight-card');
                }, 3000);
            }
        } else if (targetId === 'lending-solutions') {
            // Find the lending card (Responsible Lending & Financing)
            const cards = document.querySelectorAll('#facilitated-solutions .card');
            const lendingCard = cards[1]; // Second card in Facilitated Solutions
            if (lendingCard) {
                lendingCard.classList.add('highlight-card');
                setTimeout(() => {
                    lendingCard.classList.remove('highlight-card');
                }, 3000);
            }
        }
    }

    // Smooth scroll to section with highlight
    function scrollToSection(sectionId, targetId) {
        let targetSection = document.getElementById(sectionId);
        
        // Special handling for payroll and lending
        if (targetId === 'voluntary-payroll' || targetId === 'lending-solutions') {
            targetSection = document.getElementById('facilitated-solutions');
        }
        
        if (targetSection) {
            // Remove existing highlights
            document.querySelectorAll('.highlight-target').forEach(el => {
                el.classList.remove('highlight-target');
            });
            
            // Smooth scroll
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Add highlight after scroll
            setTimeout(() => {
                targetSection.classList.add('highlight-target');
                
                // Handle payroll/lending specific card highlight
                if (targetId === 'voluntary-payroll' || targetId === 'lending-solutions') {
                    handlePayrollLending(targetId);
                }
                
                // Remove section highlight after 3 seconds
                setTimeout(() => {
                    targetSection.classList.remove('highlight-target');
                }, 3000);
            }, 500);
        }
    }

    // Handle clicks on table items
    function initTableInteractions() {
        const tableItems = document.querySelectorAll('.table-item');
        
        tableItems.forEach(item => {
            item.addEventListener('click', function(e) {
                const targetId = this.getAttribute('data-target');
                
                if (targetId && sectionMap[targetId]) {
                    // Visual feedback on click
                    this.style.transform = 'scale(0.97)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 200);
                    
                    // Store which section to highlight after navigation
                    localStorage.setItem('highlightSection', targetId);
                    
                    // Navigate to services.html with hash
                    window.location.href = 'pages/services.html#' + sectionMap[targetId];
                }
            });
        });
    }

    // Handle highlight on services.html page load
  function handleIncomingHighlight() {
    // Reuse handleHashOnLoad behavior — the other block already handles stored highlight and hash after load.
    // This function remains for backward compatibility but will call handleHashOnLoad to perform the work.
    handleHashOnLoad();
  }

    // Run on page load
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
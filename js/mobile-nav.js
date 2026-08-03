// Moribo Financial Wellness Solution - Mobile Navigation & Dropdown
// Separate file for mobile menu toggle and news dropdown functionality
// Written by Kabelo Kgosana

document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initNewsDropdown();
});

// Mobile Menu Toggle
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!menuToggle || !navLinks) return;

  function setMenuState(isOpen) {
    navLinks.classList.toggle('active', isOpen);
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  menuToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    const isOpen = !navLinks.classList.contains('active');
    setMenuState(isOpen);
  });

  const navItems = document.querySelectorAll('.nav-links a, .nav-dropdown-link');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        setMenuState(false);
      }
    });
  });

  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      const isOpen = navLinks.classList.contains('active');
      if (isOpen && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
        setMenuState(false);
      }
    }
  });
}

// Dropdown Toggle for mobile (tap to open/close)
function initNewsDropdown() {
  const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        const parent = this.closest('.nav-item-has-dropdown');
        if (!parent) return;

        document.querySelectorAll('.nav-item-has-dropdown.open').forEach(el => {
          if (el !== parent) el.classList.remove('open');
        });
        parent.classList.toggle('open');
      }
    });
  });

  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      const dropdown = document.querySelector('.nav-item-has-dropdown.open');
      if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    }
  });
}

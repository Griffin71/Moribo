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

  if (menuToggle) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
      // Toggle aria-expanded
      const isOpen = navLinks.classList.contains('active');
      this.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a nav link is clicked
    const navItems = document.querySelectorAll('.nav-links a, .nav-dropdown-link');
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('active');
          menuToggle.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        const isOpen = navLinks.classList.contains('active');
        if (isOpen && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
          navLinks.classList.remove('active');
          menuToggle.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }
}

// Dropdown Toggle for mobile (tap to open/close)
function initNewsDropdown() {
  const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      // Only prevent default on mobile
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        const parent = this.closest('.nav-item-has-dropdown');
        // Close other open dropdowns
        document.querySelectorAll('.nav-item-has-dropdown.open').forEach(el => {
          if (el !== parent) el.classList.remove('open');
        });
        parent.classList.toggle('open');
      }
    });
  });

  // Close dropdown when clicking outside (mobile)
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
      const dropdown = document.querySelector('.nav-item-has-dropdown.open');
      if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    }
  });
}

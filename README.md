# Moribo Financial Wellness Solution - Website

A professional, responsive financial wellness services website built with clean, semantic HTML5, modern CSS3, and vanilla JavaScript. Designed with strict separation of concerns and mobile-first responsive design.

## 📋 Overview

Moribo Financial Wellness Solution provides comprehensive financial wellness programs, debt management services, budgeting coaching, and training workshops. This website showcases these services with a modern, professional design.

**Live Site:** [Deployed URL]  
**Repository:** https://github.com/Griffin71/Moribo.git

---

## 🎨 Design System

### Color Palette

The website uses a carefully curated color palette that conveys professionalism, trust, and financial stability:

| Color | Hex Code | Usage | CSS Variable |
|-------|----------|-------|--------------|
| **Deep Charcoal Brown** | `#352924` | Primary color, headings, text | `--primary-brown` |
| **Teal** | `#00A3C4` | Accents, buttons, hover states | `--teal-accent` |
| **Warm Ochre/Tan** | `#C88E6B` | Secondary buttons, highlights | `--ochre-tan` |
| **Soft Off-White** | `#FBF9F6` | Background, text contrast | `--off-white` |
| **Light Gray** | `#f0f0f0` | Section backgrounds | `--light-gray` |
| **Dark Text** | `#352924` | Body text | `--text-dark` |
| **Light Text** | `#666666` | Secondary text | `--text-light` |

### Typography

- **Headings (h1-h4):** Professional sans-serif (system fonts)
- **h1:** 3rem, font-weight 800, white text on dark backgrounds
- **h2:** 2.2rem, font-weight 600, primary-brown color
- **h3-h4:** Proportionally scaled, consistent weight hierarchy
- **Body Text:** 0.95-1.1rem line-height for readability

### Responsive Breakpoints

- **Mobile (480px and below):** Optimized for iPhone 7/8, XR, 13, 15, 16
- **Tablet (768px):** iPad and larger tablets
- **Desktop:** 1200px+ (full-width container)

---

## 🏗️ Project Structure

```
Moribo Financial Wellness Solution/
├── index.html                 # Homepage
├── pages/
│   ├── about.html            # About Us page
│   ├── services.html         # Detailed Services page
│   └── contact.html          # Contact Form page
├── docs/
│   ├── privacy-policy.html   # Privacy Policy
│   ├── terms-conditions.html # Terms & Conditions
│   └── cookie-settings.html  # Cookie Management
├── css/
│   ├── theme.css            # Design system (colors, typography, animations)
│   └── styles.css           # Component styles, layout, responsive
├── js/
│   ├── main.js              # Core functionality, event handlers
│   └── utils.js             # Utility functions
├── assets/
│   ├── logo.png             # Company logo (60px navbar, 50px footer)
│   └── ...
├── images/
│   ├── invest 2.png         # Investment strategy image
│   └── ...
└── README.md                # This file
```

---

## 🎯 Key Features

### 1. **Strict Separation of Concerns**
- ✅ No CSS embedded in HTML files
- ✅ No JavaScript embedded in HTML files  
- ✅ No inline styles (minimal exceptions for dynamic content)
- ✅ Clean semantic HTML5 markup
- ✅ Pure vanilla JavaScript (ES6+)

### 2. **Responsive Design**
- ✅ Mobile-first approach
- ✅ Hamburger menu on screens ≤768px
- ✅ Optimized for iPhone 7/8, XR, 13, 15, 16
- ✅ iPad and tablet support
- ✅ Smooth transitions and animations

### 3. **FontAwesome Icon Integration**
- ✅ FontAwesome 6.4.0 via CDN
- ✅ Icons throughout UI for visual consistency
- ✅ Service cards with relevant icons
- ✅ Navigation and footer icons
- ✅ Form and CTA icons

### 4. **Interactive Elements**
- ✅ Smooth scroll navigation
- ✅ Animated underline on nav links
- ✅ Hover effects on buttons and cards
- ✅ Mobile menu toggle with animation
- ✅ Fade-in animations on page scroll
- ✅ Cookie consent banner with localStorage

### 5. **Performance & Accessibility**
- ✅ Semantic HTML for better SEO
- ✅ Meta tags for OpenGraph and social sharing
- ✅ Intersection Observer for lazy animations
- ✅ Optimized images with alt text
- ✅ Keyboard-accessible navigation
- ✅ Form validation on contact page

---

## 📄 Page Descriptions

### Homepage (`index.html`)
- Hero section with company slogan
- Investment strategy image
- 6 featured services with icons
- Google Maps embedded locations
- Call-to-action sections
- Cookie consent banner

### About Us (`pages/about.html`)
- Company mission and vision
- Core values section (6 values)
- Team commitment statements
- Investment image showcase
- Call-to-action to services

### Services (`pages/services.html`)
- 6 comprehensive service categories
- 22+ service offerings with descriptions
- Organized in collapsible sections
- Investment strategy image
- Service cards with FontAwesome icons
- Detailed explanations and benefits

### Contact (`pages/contact.html`)
- Responsive contact form
- Contact information cards with icons
- Business hours
- Google Maps locations (2 offices)
- Phone, email, address details
- Call-to-action buttons

### Legal Pages
- **Privacy Policy:** Data protection practices
- **Terms & Conditions:** Service terms and conditions
- **Cookie Settings:** Cookie management and preferences

---

## 🛠️ Technical Stack

### HTML
- **Version:** HTML5
- **Semantic Elements:** `<header>`, `<nav>`, `<section>`, `<footer>`, `<article>`
- **Accessibility:** ARIA labels, alt text for images

### CSS
- **CSS Variables:** Complete design system in `:root`
- **Layout:** Flexbox and CSS Grid
- **Animations:** CSS keyframes (fadeIn, slideIn)
- **Media Queries:** Mobile-first responsive design
- **Pseudo-elements:** `::before`, `::after` for decorative elements

### JavaScript (Vanilla ES6+)
- **Event Listeners:** DOMContentLoaded, scroll, click events
- **DOM Manipulation:** querySelector, classList, innerHTML
- **Storage APIs:** localStorage for cookie preferences
- **Intersection Observer:** Lazy-load animations
- **Utility Functions:** formatCurrency, formatDate, email validation

### External Libraries
- **FontAwesome 6.4.0:** Icon library via CDN
- **Google Maps API:** Embedded location iframes
- **No Frameworks:** Pure vanilla JavaScript (no React, Vue, Angular)

---

## 📱 Responsive Design Details

### Mobile (480px and below)
- Header height: 50px
- Navigation: Hamburger menu with slide-down animation
- Hero h1: 1.8rem
- Service cards: Single column layout
- Map iframes: 300px height
- Padding: Reduced for smaller screens
- Font sizes: Scaled proportionally

### Tablet (481px - 768px)
- Header height: 60px
- Navigation: Still hamburger menu
- Hero h1: 2.2rem
- Service cards: Transitional layout
- Improved spacing and padding
- Readable line-height maintained

### Desktop (769px and above)
- Header height: 70px
- Navigation: Full horizontal layout
- Hero h1: 3.5rem
- Service cards: 3-column responsive grid
- Full-width content with max-width container
- Enhanced hover effects visible

---

## 🎨 CSS Structure

### `css/theme.css` - Design System
Defines the complete design system:
- Color palette (CSS variables)
- Typography scales
- Base component styles
- Animation keyframes
- Shadow definitions
- Utility classes

### `css/styles.css` - Component Styles
Implements component-specific styling:
- Header and navigation
- Hero section with gradients
- Service cards and grids
- Footer layout
- Maps container
- Responsive breakpoints
- Button variants

---

## ⚡ JavaScript Functionality

### `js/main.js` - Core Features
```javascript
- updateActiveNavLink()        // Highlights current page in nav
- addHeaderScrollEffect()      // Enhanced shadow on scroll
- initAnimations()             // Intersection Observer for fade-ins
- initInteractiveElements()    // Hover scale effects
- initMobileMenu()             // Hamburger menu toggle
- initSmoothScroll()           // Smooth anchor scrolling
- initCookieConsent()          // Cookie banner management
```

### `js/utils.js` - Utilities
```javascript
- formatCurrency(amount)       // Format to ZAR currency
- formatDate(date)             // Format date with locale
- isValidEmail(email)          // Email regex validation
- getQueryParameter(name)      // URL parameter extraction
- copyToClipboard(text)        // Copy text to clipboard
- trackEvent(category, action) // Analytics tracking
```

---

## 🚀 Getting Started

### Installation

1. **Clone the Repository**
```bash
git clone https://github.com/Griffin71/Moribo.git
cd Moribo
```

2. **Open in Browser**
   - Simply open `index.html` in a modern web browser
   - No build process or dependencies required
   - Works with local file:// protocol or web server

3. **(Optional) Local Server**
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

---

## 📦 File Sizes & Performance

- **Total HTML:** ~45 KB (all pages)
- **Total CSS:** ~12 KB (compressed ~4 KB)
- **Total JS:** ~8 KB (compressed ~3 KB)
- **Logo:** ~50 KB (PNG)
- **Images:** Variable (optimize for web)

**Performance Features:**
- No framework bloat (vanilla JS)
- Single CSS file (theme.css imported)
- Efficient media queries
- Lazy-loaded animations with Intersection Observer
- FontAwesome icons via CDN with fallback

---

## 🔐 Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari 14+, Chrome Android)
- ✅ IE11 partial support (no CSS Grid)

---

## 🎯 Future Enhancements

- [ ] Add blog section
- [ ] Implement client testimonials carousel
- [ ] Add appointment scheduling system
- [ ] Integrate email notification backend
- [ ] Add multi-language support (i18n)
- [ ] Implement search functionality
- [ ] Add service filtering system
- [ ] Create admin dashboard

---

## 📝 License

Copyright © 2026 Moribo Financial Wellness Solution. All rights reserved.

Website created by **Kabelo Kgosana**

---

## 📧 Contact & Support

**Email:** info@moribo.co.za  
**Phone:** +27 (0) 11 XXX XXXX  
**Business Hours:** Mon - Fri, 8:00 AM - 5:00 PM (SAST)

**Social Links:**
- [LinkedIn](#)
- [Facebook](#)
- [Twitter](#)

---

## 🙏 Acknowledgments

- FontAwesome for icon library
- Google Maps API for location embedding
- Modern CSS and JavaScript community for best practices

---

## 📋 Quick Reference

### Adding a New Page
1. Create HTML file in `pages/` folder
2. Copy header/footer from existing page
3. Include `<link rel="stylesheet" href="../css/styles.css">`
4. Include `<script src="../js/main.js"></script>` before closing body
5. Update navigation links on all pages

### Adding New Colors
1. Add CSS variable to `:root` in `css/theme.css`
2. Use variable in `css/styles.css` (e.g., `background-color: var(--new-color)`)
3. Maintain consistency across components

### Adding FontAwesome Icons
1. Find icon on https://fontawesome.com/icons
2. Add to any element: `<i class="fas fa-icon-name"></i>`
3. Style with CSS: `font-size: 1.5rem; color: var(--teal-accent);`

---

**Last Updated:** May 29, 2026  
**Version:** 1.0.0

# Project Setup & Configuration Guide

**Author:** Kabelo Kgosana  
**Date:** May 28, 2026  
**Project:** Moribo Financial Wellness Solution

---

## Project Overview

A professional, responsive website for Moribo Financial Wellness Solution featuring:
- Modern blue theme (#0055a4)
- 3 main content pages
- Comprehensive legal documentation
- Google Maps integration
- Cookie consent management
- Mobile-responsive design
- SEO optimization

---

## Complete File Structure

```
Moribo Financial Wellness Solution/
│
├── index.html                          # Homepage
│
├── css/
│   ├── theme.css                      # Blue theme & variables
│   └── styles.css                     # Main stylesheet
│
├── js/
│   ├── main.js                        # Core functionality
│   └── utils.js                       # Helper functions
│
├── pages/
│   ├── about.html                     # About Us page
│   └── services.html                  # Services page
│
├── docs/
│   ├── README.md                      # Project documentation
│   ├── QUICK_START.md                 # Quick start guide
│   ├── privacy-policy.md              # Privacy policy (markdown)
│   ├── privacy-policy.html            # Privacy policy (HTML)
│   ├── terms-conditions.md            # Terms & conditions (markdown)
│   ├── terms-conditions.html          # Terms & conditions (HTML)
│   ├── cookie-policy.md               # Cookie policy (markdown)
│   └── cookie-settings.html           # Cookie settings (HTML)
│
└── assets/                            # Images & media folder (ready for use)
```

---

## Configuration Details

### Color Palette (CSS Variables)
Located in `/css/theme.css`:
```css
--primary-blue: #0055a4          /* Main brand color */
--secondary-blue: #0066cc        /* Secondary accent */
--light-blue: #e8f2ff            /* Light backgrounds */
--dark-blue: #003366             /* Dark text/backgrounds */
--accent-blue: #1a7fbf           /* Hover effects */
```

### Typography
- Primary Font: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- Heading Color: Primary Blue (#0055a4)
- Body Text: Dark Gray (#333333)
- Secondary Text: Medium Gray (#666666)

### Layout
- Container Max-Width: 1200px
- Grid System: CSS Grid (responsive)
- Breakpoints: Mobile-first responsive design

---

## Page Details

### 1. Homepage (index.html)
**Purpose:** First impression and navigation hub
**Sections:**
- Navigation header
- Hero section
- Welcome introduction
- Service overview (3 cards)
- Google Maps locations (2 embedded)
- Call-to-action
- Footer with legal links

**Key Features:**
- Sticky header
- Embedded responsive maps
- Cookie consent banner
- Professional footer

### 2. About Us (pages/about.html)
**Purpose:** Build trust and credibility
**Sections:**
- Hero section
- Mission statement
- Vision statement
- Team overview
- Why Choose Us (6 benefits)
- Core Values (6 values)
- Call-to-action

**Key Content:**
- Company mission
- Team expertise
- Organizational values
- Competitive advantages

### 3. Services (pages/services.html)
**Purpose:** Showcase comprehensive offerings
**Sections:**
- Hero section
- Personal Financial Wellness Management (4 services)
- Debt Management Solutions (4 services)
- Budgeting & Coaching (4 services)
- Facilitated Solutions (4 services)
- Upskilling & Training (3 services)
- Financial Wellness Events (3 services)
- Call-to-action

**Total Services Highlighted:** 22 distinct offerings

### 4. Legal Pages

#### Privacy Policy (docs/privacy-policy.html)
- Data collection practices
- Information usage
- User rights
- Security measures
- Compliance information
- Contact details

#### Terms & Conditions (docs/terms-conditions.html)
- Usage license
- Liability disclaimers
- IP protection
- Prohibited conduct
- Termination clauses
- Governing law

#### Cookie Settings (docs/cookie-settings.html)
- Cookie type explanations
- Interactive cookie toggles
- Opt-out instructions
- Retention policies
- Third-party cookie information

---

## JavaScript Functionality

### main.js Features
✓ Mobile menu toggling  
✓ Smooth scroll navigation  
✓ Cookie consent management  
✓ Intersection Observer for animations  
✓ Analytics integration  

### utils.js Functions
- `formatCurrency()` - Format numbers as currency
- `formatDate()` - Format dates consistently
- `isValidEmail()` - Email validation
- `getQueryParameter()` - Parse URL params
- `copyToClipboard()` - Clipboard operations
- `trackEvent()` - Analytics event tracking

---

## Embedded Google Maps

### Location 1
```
Latitude: -25.83829097609246
Longitude: 28.17489482552374
```

### Location 2
```
Latitude: -33.034824
Longitude: 27.866842
```

Both maps are fully responsive and embed properly in the layout.

---

## SEO Configuration

### Metadata
- Meta descriptions on all pages
- Author: Kabelo Kgosana
- Keywords: financial wellness, budgeting, debt management
- Open Graph ready
- Mobile viewport configured

### Structure
- Semantic HTML5
- Proper heading hierarchy (H1 → H6)
- Internal linking
- Descriptive alt text ready
- Schema markup compatible

---

## Browser Compatibility

✓ Chrome/Chromium 90+  
✓ Firefox 88+  
✓ Safari 14+  
✓ Edge 90+  
✓ Mobile browsers (iOS Safari, Chrome Mobile)  

### Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

---

## Cookie Management

### Cookie Types
1. **Essential** - Cannot be disabled (mandatory)
2. **Analytics** - User behavior tracking
3. **Functional** - User preferences
4. **Marketing** - Advertising personalization

### Consent Flow
1. User visits website
2. Banner appears (if no prior choice)
3. User accepts/denies cookies
4. Preference saved in localStorage
5. User can change anytime in Cookie Settings

---

## Performance Considerations

### Current Optimization
✓ CSS minified  
✓ Lazy loading ready  
✓ Responsive images  
✓ Efficient grid layouts  
✓ Smooth animations  

### Recommended for Production
1. Compress images in `/assets`
2. Minify HTML/CSS/JS
3. Enable GZIP compression
4. Use CDN for static assets
5. Implement caching headers
6. Add service worker for offline support

---

## Maintenance Checklist

### Regular Updates
- [ ] Review service descriptions quarterly
- [ ] Update office locations if changed
- [ ] Check external links annually
- [ ] Update copyright year (currently 2026)
- [ ] Test all forms and interactions
- [ ] Monitor broken links

### Annual Tasks
- [ ] Update privacy policy if needed
- [ ] Review Terms & Conditions
- [ ] Audit analytics data
- [ ] Test on new browsers
- [ ] Update contact information
- [ ] Security audit

---

## Deployment Instructions

### To Host Online
1. Upload all files to web hosting server
2. Set index.html as default page
3. Configure SSL/HTTPS
4. Set up email for contact forms
5. Configure analytics (Google Analytics)
6. Test all links and functionality
7. Submit sitemap to search engines

### Local Testing
1. Open index.html in browser
2. Test navigation between pages
3. Verify embedded maps load
4. Test cookie consent banner
5. Check responsive design (resize browser)
6. Test on mobile device

---

## Contact Information

**Project Owner:** Moribo Financial Wellness Solution  
**Developer:** Kabelo Kgosana  
**Date Created:** May 28, 2026  
**Website Version:** 1.0  

**Support Email:** support@moribo.com  
**Phone:** [Your Contact Number]  
**Address:** [Your Company Address]  

---

## Additional Resources

For more information, see:
- `/docs/README.md` - Complete documentation
- `/docs/QUICK_START.md` - Getting started guide
- `/docs/privacy-policy.md` - Privacy policy markdown
- `/docs/terms-conditions.md` - Terms markdown
- `/docs/cookie-policy.md` - Cookie policy markdown

---

## License & Copyright

© 2026 Moribo Financial Wellness Solution. All rights reserved.

This website and its content are the exclusive property of Moribo Financial Wellness Solution and are protected by copyright law.

---

**Status:** ✓ Complete and Ready for Deployment

*For updates or questions, contact Kabelo Kgosana*

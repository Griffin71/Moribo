/* ============================================================
   FINANCIAL WELLNESS WHEEL — behaviour
   Builds an 8-wedge donut wheel in SVG plus a quick-select pill
   nav. Every wedge and pill is a real link that sends the visitor
   straight to the matching section on services.html — there is
   no in-wheel description panel, so nothing gets shown twice.

   Drop this component into ANY page (index.html, services.html,
   wherever). It works out the right href on its own:
     - on a page that is NOT services.html  -> "services.html#id"
     - on services.html itself              -> "#id"  (in-page jump)

   To point at a differently-named services page, set
   data-services-page="your-file.html" on the
   <section id="financial-wellness-wheel"> element in wheel.html.
   ============================================================ */

(function () {
  'use strict';

  /* svc.id     = internal identifier for this wedge
     svc.anchor = id of the matching section/anchor on services.html
     (kept separate because a couple of wedges share one section) */
  var services = [
    {
      id: 'budgeting-coaching',
      anchor: 'budgeting-coaching',
      title: 'Budgeting & Financial Coaching',
      short: 'Budgeting &amp; Coaching',
      icon: 'fa-calculator',
      color: 'var(--fw-c-budgeting)',
      onWhite: false
    },
    {
      id: 'debt-management',
      anchor: 'debt-management',
      title: 'Debt Management Solutions',
      short: 'Debt Management',
      icon: 'fa-file-invoice-dollar',
      color: 'var(--fw-c-debt)',
      onWhite: false
    },
    {
      id: 'insurance-solutions',
      /* No dedicated anchor exists yet for this card — it lives inside
         the "Facilitated Solutions" section on services.html. Add an
         `#insurance-solutions` offset-anchor there (same trick as
         #voluntary-payroll / #lending-solutions in services.css) if you
         want the wheel to land directly on the insurance card instead
         of the top of the section. */
      anchor: 'facilitated-solutions',
      title: 'Facilitated Personal Insurance Solutions',
      short: 'Personal Insurance',
      icon: 'fa-shield-halved',
      color: 'var(--fw-c-insurance)',
      onWhite: false
    },
    {
      id: 'voluntary-payroll',
      anchor: 'voluntary-payroll',
      title: 'Voluntary Payroll Deductions',
      short: 'Voluntary Payroll',
      icon: 'fa-hand-holding-dollar',
      color: 'var(--fw-c-payroll)',
      onWhite: true
    },
    {
      id: 'lending-solutions',
      anchor: 'lending-solutions',
      title: 'Facilitated Lending Solutions',
      short: 'Lending Solutions',
      icon: 'fa-building-columns',
      color: 'var(--fw-c-lending)',
      onWhite: false
    },
    {
      id: 'upskilling-workshops',
      anchor: 'upskilling-workshops',
      title: 'Upskilling Workshops & Training',
      short: 'Upskilling Workshops',
      icon: 'fa-graduation-cap',
      color: 'var(--fw-c-upskilling)',
      onWhite: false
    },
    {
      id: 'wellness-events',
      anchor: 'wellness-events',
      title: 'Integrated Financial Wellness Events',
      short: 'Wellness Events',
      icon: 'fa-calendar-days',
      color: 'var(--fw-c-events)',
      onWhite: false
    },
    {
      id: 'financial-wellness',
      anchor: 'financial-wellness',
      title: 'Personal Financial Wellness Management Programs',
      short: 'Wellness Management',
      icon: 'fa-chart-line',
      color: 'var(--fw-c-personal)',
      onWhite: false
    }
  ];

  var svgNS = 'http://www.w3.org/2000/svg';
  var xlinkNS = 'http://www.w3.org/1999/xlink';
  var CX = 300, CY = 300, R_OUT = 260, R_IN = 92, R_LABEL = (260 + 92) / 2, R_ARROW = 278;
  var GAP_DEG = 1.4; // small visual gap between wedges

  function polar(cx, cy, r, angleDeg) {
    var rad = (angleDeg - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  function donutPath(cx, cy, rInner, rOuter, startDeg, endDeg) {
    var p1 = polar(cx, cy, rOuter, startDeg);
    var p2 = polar(cx, cy, rOuter, endDeg);
    var p3 = polar(cx, cy, rInner, endDeg);
    var p4 = polar(cx, cy, rInner, startDeg);
    var largeArc = (endDeg - startDeg) > 180 ? 1 : 0;
    return [
      'M', p1.x, p1.y,
      'A', rOuter, rOuter, 0, largeArc, 1, p2.x, p2.y,
      'L', p3.x, p3.y,
      'A', rInner, rInner, 0, largeArc, 0, p4.x, p4.y,
      'Z'
    ].join(' ');
  }

  function el(tag, attrs) {
    var node = document.createElementNS(svgNS, tag);
    for (var k in attrs) node.setAttribute(k, attrs[k]);
    return node;
  }

  /* Arrowhead sitting on the rim at `angleDeg`, pointing tangentially
     (clockwise) so a ring of these reads as one continuous loop, each
     arrow aimed at the option that follows it. */
  function tangentArrowPoints(angleDeg, r, tipLen, baseBack, halfWidth) {
    var rad = (angleDeg - 90) * Math.PI / 180;
    var nx = Math.cos(rad), ny = Math.sin(rad);   // outward (radial) unit vector
    var tx = -Math.sin(rad), ty = Math.cos(rad);  // clockwise (tangential) unit vector
    var px = CX + r * nx, py = CY + r * ny;
    var tipX = px + tx * tipLen, tipY = py + ty * tipLen;
    var b1x = px - tx * baseBack + nx * halfWidth, b1y = py - ty * baseBack + ny * halfWidth;
    var b2x = px - tx * baseBack - nx * halfWidth, b2y = py - ty * baseBack - ny * halfWidth;
    return tipX + ',' + tipY + ' ' + b1x + ',' + b1y + ' ' + b2x + ',' + b2y;
  }

  /* Work out where a wedge should actually take the visitor.
     Same-page jumps use a plain "#id" so the browser doesn't
     reload; anywhere else gets the full "services.html#id". */
  function resolveHref(section, anchor) {
    var servicesPage = section.dataset.servicesPage || 'pages/services.html';
    var currentFile = (location.pathname.split('/').pop() || 'index.html');
    if (currentFile === servicesPage) return '#' + anchor;
    return servicesPage + '#' + anchor;
  }

  function buildWheel(section) {
    var slicesGroup = document.getElementById('fwSlicesGroup');
    var arrowsGroup = document.getElementById('fwArrowsGroup');
    var labelsLayer = document.getElementById('fwWheelLabels');
    var pillNav = document.getElementById('fwPillNav');
    if (!slicesGroup) return;

    var step = 360 / services.length;

    services.forEach(function (svc, i) {
      var start = i * step + GAP_DEG / 2;
      var end = (i + 1) * step - GAP_DEG / 2;
      var mid = (start + end) / 2;
      var href = resolveHref(section, svc.anchor);

      /* ---- coloured wedge, wrapped in a real SVG link ---- */
      var link = el('a', { 'aria-label': svc.title });
      link.setAttributeNS(xlinkNS, 'xlink:href', href);
      link.setAttribute('href', href);

      var path = el('path', {
        d: donutPath(CX, CY, R_IN, R_OUT, start, end),
        fill: svc.color,
        class: 'fw-slice',
        'data-id': svc.id
      });
      link.appendChild(path);
      slicesGroup.appendChild(link);

      /* ---- decorative divider spoke (visual only) ---- */
      var spokeStart = polar(CX, CY, R_IN, i * step);
      var spokeEnd = polar(CX, CY, R_OUT + 14, i * step);
      arrowsGroup.appendChild(el('line', {
        x1: spokeStart.x, y1: spokeStart.y, x2: spokeEnd.x, y2: spokeEnd.y,
        class: 'fw-spoke-line'
      }));

      /* ---- decorative arc + arrowhead, chained tangentially around the rim ---- */
      var arcStart = polar(CX, CY, R_ARROW, i * step + 6);
      var arcEnd = polar(CX, CY, R_ARROW, (i + 1) * step - 6);
      var arcPath = ['M', arcStart.x, arcStart.y, 'A', R_ARROW, R_ARROW, 0, 0, 1, arcEnd.x, arcEnd.y].join(' ');
      arrowsGroup.appendChild(el('path', { d: arcPath, class: 'fw-arrow-arc' }));

      var pts = tangentArrowPoints((i + 1) * step - 6, R_ARROW, 15, 9, 5.5);
      arrowsGroup.appendChild(el('polygon', { points: pts, class: 'fw-arrow' }));

      /* ---- HTML label link positioned over the wedge ---- */
      var lp = polar(CX, CY, R_LABEL, mid);
      var a = document.createElement('a');
      a.href = href;
      a.className = 'fw-slice-btn' + (svc.onWhite ? ' fw-on-white' : '');
      a.style.left = (lp.x / 6) + '%';
      a.style.top = (lp.y / 6) + '%';
      a.dataset.id = svc.id;
      a.setAttribute('aria-label', svc.title);
      a.innerHTML = '<i class="fas ' + svc.icon + '"></i><span class="fw-slice-label">' + svc.short + '</span>';
      labelsLayer.appendChild(a);

      /* ---- quick-select pill (also a real link) ---- */
      var pill = document.createElement('a');
      pill.href = href;
      pill.className = 'fw-pill';
      pill.dataset.id = svc.id;
      pill.innerHTML = '<i class="fas ' + svc.icon + '" style="color:' + svc.color + '"></i><span>' + svc.short + '</span>';
      pillNav.appendChild(pill);
    });
  }

  function init() {
    var section = document.getElementById('financial-wellness-wheel');
    if (!section) return;
    buildWheel(section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
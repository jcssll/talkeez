// Mobile nav toggle + active link highlighter
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('[data-testid=\"nav-toggle\"]');
    const links = document.querySelector('[data-testid=\"nav-links\"]');
    if (toggle && links) {
      toggle.addEventListener('click', function() {
        links.classList.toggle('open');
        const expanded = links.classList.contains('open');
        toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      });
    }

    // Highlight active link based on pathname
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('[data-testid=\"nav-links\"] a').forEach(function(a) {
      const href = a.getAttribute('href');
      if (!href) return;
      const clean = href.replace(/\/$/, '') || '/';
      const matches =
        (path === '/' && (clean === '/' || clean === '/index.html')) ||
        (clean !== '/' && path.endsWith(clean));
      if (matches) a.classList.add('active');
    });

    // Smooth-scroll anchor links
    document.querySelectorAll('a[href^=\"#\"]').forEach(function(a) {
      a.addEventListener('click', function(e) {
        const id = a.getAttribute('href');
        if (id.length > 1 && document.querySelector(id)) {
          e.preventDefault();
          document.querySelector(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // FAQ accordion
    document.querySelectorAll('[data-testid^=\"faq-item-\"]').forEach(function(item) {
      const q = item.querySelector('.faq-q');
      if (q) q.addEventListener('click', function() { item.classList.toggle('open'); });
    });

    // Contact form (static success)
    const form = document.querySelector('[data-testid=\"contact-form\"]');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const success = document.querySelector('[data-testid=\"contact-success\"]');
        if (success) success.classList.add('show');
        form.reset();
        if (success) success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  });
})();

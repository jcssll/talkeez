// Renders shared nav and footer so every page stays in sync.
// Looks for <div data-mount=\"nav\"></div> and <div data-mount=\"footer\"></div>.
(function() {
  const LOGO = 'https://customer-assets.emergentagent.com/job_05240045-2f96-42ae-acf2-93c31dc80798/artifacts/7fh89fyd_new%20talkeez%20logo.png';

  const navHTML = `
  <header class=\"nav\" data-testid=\"site-nav\">
    <div class=\"nav-inner\">
      <a href=\"/\" class=\"brand\" data-testid=\"brand-link\">
        <img src=\"${LOGO}\" alt=\"Talkeez logo\">
        <span>Talk<em>eez</em></span>
      </a>
      <button class=\"nav-toggle\" data-testid=\"nav-toggle\" aria-label=\"Open menu\" aria-expanded=\"false\">
        <i class=\"fa-solid fa-bars\"></i>
      </button>
      <nav class=\"nav-links\" data-testid=\"nav-links\" aria-label=\"Primary\">
        <a href=\"/index.html\">Home</a>
        <a href=\"/aac.html\">Free AAC</a>
        <a href=\"/daily-activity.html\">Daily Activity</a>
        <a href=\"/ai-insights.html\">AI Insights</a>
        <a href=\"/district-solutions.html\">Districts</a>
        <a href=\"/about.html\">About</a>
        <a href=\"/help.html\">Help</a>
        <a href=\"/donate.html\" class=\"nav-cta\">Donate</a>
      </nav>
    </div>
  </header>`;

  const footerHTML = `
  <footer class=\"footer\" data-testid=\"site-footer\">
    <div class=\"container\">
      <div class=\"footer-grid\">
        <div>
          <div class=\"footer-brand\"><img src=\"${LOGO}\" alt=\"\"> Talk<span style=\"color:var(--yellow)\">eez</span></div>
          <p>Every child deserves a voice. We build the tools that help them be heard.</p>
          <p>subscriptions@talkeez.org</p>
        </div>
        <div>
          <h5>Products</h5>
          <ul>
            <li><a href=\"/aac.html\">Free AAC</a></li>
            <li><a href=\"/daily-activity.html\">Daily Activity</a></li>
            <li><a href=\"/ai-insights.html\">AI Insights</a></li>
            <li><a href=\"/district-solutions.html\">District Solutions</a></li>
          </ul>
        </div>
        <div>
          <h5>Company</h5>
          <ul>
            <li><a href=\"/about.html\">About</a></li>
            <li><a href=\"/help.html\">Help &amp; FAQ</a></li>
            <li><a href=\"/contact.html\">Contact</a></li>
            <li><a href=\"/donate.html\">Donate</a></li>
          </ul>
        </div>
        <div>
          <h5>Trust</h5>
          <ul>
            <li><a href=\"/privacy.html\">Privacy Policy</a></li>
            <li><a href=\"/terms.html\">Terms of Service</a></li>
            <li><a href=\"/hipaa.html\">HIPAA Statement</a></li>
            <li><a href=\"/ferpa.html\">FERPA Notice</a></li>
            <li><a href=\"/accessibility.html\">Accessibility</a></li>
          </ul>
        </div>
      </div>
      <div class=\"footer-bottom\">
        <span>© <span id=\"layout-year\"></span> Talkeez. Made with care for every child's voice.</span>
        <span>Maryland, USA</span>
      </div>
    </div>
  </footer>`;

  function mount() {
    const navMount = document.querySelector('[data-mount=\"nav\"]');
    if (navMount) navMount.outerHTML = navHTML;
    const footMount = document.querySelector('[data-mount=\"footer\"]');
    if (footMount) footMount.outerHTML = footerHTML;
    const y = document.getElementById('layout-year');
    if (y) y.textContent = new Date().getFullYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
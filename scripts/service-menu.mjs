// The service catalogue also drives the header; new services need one entry.
import { services } from "./services.mjs";

const icons = {
  automation: '<rect x="3" y="3" width="6" height="6" rx="1.5"/><rect x="15" y="15" width="6" height="6" rx="1.5"/><path d="M9 6h6a3 3 0 0 1 3 3v6M6 9v9h9"/>',
  websites: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01M8 13l-2 2 2 2m8-4 2 2-2 2"/>',
  analytics: '<path d="M4 20V4m0 16h17M9 16v-5m5 5V7m5 9v-3"/>',
};
const descriptions = {
  automation: "Connect your tools. Simplify the everyday.",
  websites: "Your website, advertising and search presence, connected.",
  analytics: "Turn business data into clearer decisions.",
};
const escape = text => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');

export function serviceMenu(currentSlug = "") {
  return `<details class="services-dropdown">
    <summary class="services-nav-link" aria-controls="services-mega-menu">Services<svg class="services-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary>
    <div class="services-mega-menu" id="services-mega-menu">
      <div class="mega-heading"><p>BUILT AROUND YOUR BUSINESS</p><span>Explore services</span></div>
      <div class="mega-service-grid">${services.map(service => `<div class="mega-service">
        <a class="mega-service-title" href="services/${service.slug}/"${service.slug === currentSlug ? ' aria-current="page"' : ''}>
          <svg class="mega-service-icon" viewBox="0 0 24 24" aria-hidden="true">${icons[service.key] || icons.websites}</svg>
          <strong>${escape(service.name)}</strong><svg class="mega-link-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>
        </a>
        <p>${escape(descriptions[service.key] || service.fit)}</p>
        <ul>${service.deliverables.map(([title], index) => `<li><a href="services/${service.slug}/#capability-${index + 1}">${escape(title)}</a></li>`).join('')}</ul>
        <a class="mega-explore" href="services/${service.slug}/">Explore service <span aria-hidden="true">→</span></a>
      </div>`).join('')}</div>
      <div class="mega-footer"><p><strong>Something more specific?</strong> Let’s shape a solution around your needs.</p><a href="./#contact">Discuss your project <svg class="mega-link-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a></div>
    </div>
  </details>`;
}

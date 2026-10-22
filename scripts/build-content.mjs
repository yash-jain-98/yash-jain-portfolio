import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import vm from "node:vm";
import { services } from "./services.mjs";

const origin = "https://jainyash.in";
const context = { window: {} };
vm.createContext(context);
vm.runInContext(readFileSync("projects-data.js", "utf8"), context);
vm.runInContext(readFileSync("project-render.js", "utf8"), context);
const projects = context.window.PORTFOLIO_DATA.projects.map((project, index) => ({ ...project, index }));
const { escapeHTML: e, arrowIcon, projectCard, projectGroups } = context.PORTFOLIO_RENDER;
const read = path => readFileSync(path, "utf8");
const personId = `${origin}/#yash-jain`;
const websiteId = `${origin}/#website`;
const clarityTag = `<!-- CLARITY:START -->
    <script type="text/javascript">
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "z1m4xkdi2h");
    </script>
    <!-- CLARITY:END -->`;
const person = {
  "@type": "Person", "@id": personId, name: "Yash Jain", url: `${origin}/`,
  jobTitle: "Freelance web developer and data analyst", email: "mailto:works.yashjain@gmail.com",
  sameAs: ["https://github.com/yash-jain-98", "https://www.linkedin.com/in/yash-jain-surat/"],
};
const website = { "@type": "WebSite", "@id": websiteId, url: `${origin}/`, name: "Yash Jain — Websites, Data & Automation", publisher: { "@id": personId }, inLanguage: "en" };
function replaceRegion(html, name, content) {
  const pattern = new RegExp(`<!-- ${name}:START -->[\\s\\S]*?<!-- ${name}:END -->`);
  if (!pattern.test(html)) throw new Error(`Missing generated region ${name}`);
  return html.replace(pattern, () => `<!-- ${name}:START -->\n${content}\n<!-- ${name}:END -->`);
}
const serviceLinks = (label, className) => `<nav class="${className}" aria-label="${label}">${services.map(service => `<a href="services/${service.slug}/">${e(service.name)} ${arrowIcon}</a>`).join("")}</nav>`;
function decorate(html, { path, title, description, service, collection = false }) {
  const url = origin + path;
  html = html.replace(/<!-- CLARITY:START -->[\s\S]*?<!-- CLARITY:END -->\s*/g, "")
    .replace(/<!-- SEO:START -->[\s\S]*?<!-- SEO:END -->\s*/g, "")
    .replace(/<title>[\s\S]*?<\/title>\s*/g, "")
    .replace(/<link\b[^>]*rel="canonical"[^>]*>\s*/g, "")
    .replace(/<meta\b[^>]*(?:name="(?:description|author|twitter:[^"]+)"|property="og:[^"]+")[^>]*>\s*/g, "");
  const page = {
    "@type": collection ? "CollectionPage" : "WebPage", "@id": `${url}#webpage`, url, name: title,
    description, inLanguage: "en", isPartOf: { "@id": websiteId }, about: { "@id": personId },
  };
  const graph = [person, website, page];
  if (path !== "/") {
    page.breadcrumb = { "@id": `${url}#breadcrumb` };
    graph.push({ "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
      { "@type": "ListItem", position: 2, name: service?.name || "Projects", item: url },
    ] });
  }
  if (service) {
    page.mainEntity = { "@id": `${url}#service` };
    graph.push({ "@type": "Service", "@id": `${url}#service`, name: service.name,
      serviceType: service.heading, description, url, provider: { "@id": personId },
      areaServed: [{ "@type": "Country", name: "India" }, { "@type": "Country", name: "Australia" }],
    });
  }
  if (collection) {
    page.mainEntity = { "@id": `${url}#project-list` };
    const ordered = ["auto", "web", "analytics", "science"].flatMap(category => projects.filter(project => project.category === category));
    graph.push({ "@type": "ItemList", "@id": `${url}#project-list`, numberOfItems: projects.length,
      itemListElement: ordered.map((project, index) => ({ "@type": "ListItem", position: index + 1,
        name: project.title, url: `${url}#project-${project.id}` })),
    });
  }
  const seo = `<!-- SEO:START -->
    <title>${e(title)}</title>
    <meta name="description" content="${e(description)}" />
    <meta name="author" content="Yash Jain" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Yash Jain" />
    <meta property="og:title" content="${e(title)}" />
    <meta property="og:description" content="${e(description)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${origin}/hero-workspace.png" />
    <meta property="og:image:alt" content="A calm workspace with a laptop — Yash Jain, websites, data and automation" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${e(title)}" />
    <meta name="twitter:description" content="${e(description)}" />
    <meta name="twitter:image" content="${origin}/hero-workspace.png" />
    <script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2).replace(/</g, "\\u003c")}</script>
    <noscript><style>
      .gallery-toolbar, .project-filters, .service-tabs, .service-stage, .menu-button { display: none !important; }
      #main-nav { display: flex !important; position: static !important; flex-wrap: wrap; width: 100%; max-height: none; }
      .navigation { flex-wrap: wrap; height: auto; padding-block: 16px; }
      .site-header { position: static; }
      .service-panel { grid-template-columns: 1fr; }
    </style></noscript>
    <!-- SEO:END -->`;
  return html.replace(/\s*<\/head>/, `\n    ${clarityTag}\n    ${seo}\n  </head>`).replace(/[ \t]+$/gm, "");
}

let home = read("index.html");
home = home.replace(/<noscript\s+>[\s\S]*?<\/noscript\s*>/g, '<noscript><p>Project details and source links are available above. Enable JavaScript to use search and filters.</p></noscript>');
home = replaceRegion(home, "PROJECTS", projects.map(projectCard).join("\n"));
home = replaceRegion(home, "SERVICE-LINKS", serviceLinks("Read about each service", "service-page-links"));
home = replaceRegion(home, "FOOTER-SERVICES", serviceLinks("Services", "footer-services"));
home = decorate(home, {
  path: "/", title: "Yash Jain | Freelance Websites, Data Analytics & Automation",
  description: "Yash Jain builds business websites, Power BI reports and custom automations for clients in India and Australia. Explore projects and discuss your requirements.",
});
writeFileSync("index.html", home);

let catalogue = read("projects/index.html");
catalogue = replaceRegion(catalogue, "PROJECTS", projectGroups(projects));
catalogue = replaceRegion(catalogue, "FOOTER-SERVICES", serviceLinks("Services", "footer-services"));
catalogue = catalogue.replace(/<noscript\s*>[\s\S]*?<\/noscript\s*>/g, "");
catalogue = decorate(catalogue, {
  path: "/projects/", title: "Website, Analytics & Automation Projects | Yash Jain", collection: true,
  description: "Explore 29 projects by Yash Jain: five custom automations, four live business websites, and data analytics and data-science projects with source files.",
});
writeFileSync("projects/index.html", catalogue);

const head = catalogue.match(/<head>[\s\S]*?<\/head>/)[0]
  .replace('<base href="../"', '<base href="../../"')
  .replace(/\s*<script src="projects-data\.js[^>]*><\/script>/, "");
const navigation = catalogue.match(/<div class="announcement">[\s\S]*?<\/header>/)[0]
  .replace('href="projects/" aria-current="page"', 'href="projects/"');
const footer = catalogue.match(/<footer\b[\s\S]*?<\/footer>/)[0];
for (const service of services) {
  const path = `/services/${service.slug}/`;
  const related = service.projectIds.map(id => {
    const project = projects.find(item => item.id === id);
    if (!project) throw new Error(`Unknown related project ${id}`);
    return project;
  });
  const cover = related[0];
  const body = `<main id="main" class="service-page-main">
    <section class="wrap service-intro" aria-labelledby="service-heading">
      <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="./">Home</a><span aria-hidden="true">/</span><span aria-current="page">${e(service.name)}</span></nav>
      <div class="service-hero-layout">
        <div><p class="eyebrow">${e(service.eyebrow)}</p><h1 id="service-heading">${e(service.heading)} <span>${e(service.accent)}</span></h1><p class="service-lead">${e(service.intro)}</p>
        <a class="button" href="./?service=${service.key}#contact">Discuss your project ${arrowIcon}</a>
        <p class="service-location">Independent developer · Working remotely with clients in India &amp; Australia</p></div>
        <figure class="service-hero-figure"><img src="${e(cover.image)}" alt="${e(cover.imageAlt)}" width="800" height="500" fetchpriority="high" /><figcaption>${e(service.imageCaption)}</figcaption><ul class="service-tool-list" aria-label="Tools and capabilities">${service.tools.map(tool => `<li>${e(tool)}</li>`).join("")}</ul></figure>
      </div>
      <div class="service-fit"><span class="eyebrow">A GOOD FIT</span><p>${e(service.fit)}</p></div>
    </section>
    <section class="wrap service-content-section" aria-labelledby="deliverables-heading"><div class="service-section-intro"><h2 id="deliverables-heading">What we can build together.</h2><p>${e(service.overview)}</p></div>
      <div class="service-deliverables">${service.deliverables.map(([title, text], index) => `<article><span class="service-step-number">0${index + 1}</span><h3>${e(title)}</h3><p>${e(text)}</p></article>`).join("")}</div>
    </section>
    <section class="section-shell service-process-section" aria-labelledby="delivery-heading"><div class="service-section-intro"><p class="eyebrow">A CLEAR PROCESS</p><h2 id="delivery-heading">From the first question<br />to the final handover.</h2></div><ol class="service-process-list">${service.steps.map(([title, text], index) => `<li><span class="service-step-number">0${index + 1}</span><h3>${e(title)}</h3><p>${e(text)}</p></li>`).join("")}</ol></section>
    <section class="wrap service-content-section" aria-labelledby="related-heading"><div class="service-section-intro"><p class="eyebrow">EXPLORE THE WORK</p><h2 id="related-heading">Projects behind the practice.</h2><p>See the project context and available source files in the full collection.</p></div><div class="service-related-projects">${related.map(project => `<article><a class="service-project-image" href="projects/#project-${e(project.id)}" tabindex="-1" aria-hidden="true"><img src="${e(project.image)}" alt="" loading="lazy" decoding="async" width="800" height="500" /></a><p class="eyebrow">${e(project.kind)}</p><h3><a href="projects/#project-${e(project.id)}">${e(project.title)} ${arrowIcon}</a></h3><p>${e(project.desc)}</p></article>`).join("")}</div><a class="text-link" href="projects/#category-${service.category}">Explore all ${e(service.name.toLowerCase())} projects →</a></section>
    <section class="wrap service-planning" aria-labelledby="scope-heading"><div><p class="eyebrow">BEFORE WE START</p><h2 id="scope-heading">Clear scope.<br />Useful expectations.</h2></div><div><h3>What to bring</h3><p>${e(service.prepare)}</p><h3>How the project is scoped</h3><p>${e(service.scope)}</p></div></section>
    <section class="wrap service-content-section service-faq" aria-labelledby="questions-heading"><h2 id="questions-heading">A few questions,<br />answered.</h2><div>${service.faqs.map(([question, answer]) => `<details><summary>${e(question)}</summary><p>${e(answer)}</p></details>`).join("")}</div></section>
    <section class="section-shell service-final-cta"><p class="eyebrow">LET’S MAKE IT USEFUL</p><h2>${e(service.cta)}</h2><p>Share what you want to achieve, your current setup and any important constraints.</p><a class="button" href="./?service=${service.key}#contact">Start a conversation ${arrowIcon}</a><a class="service-email" href="mailto:works.yashjain@gmail.com">works.yashjain@gmail.com</a></section>
  </main>`;
  let html = `<!doctype html>\n<html lang="en">\n${head}\n<body class="service-page" id="top"><a class="skip-link" href="services/${service.slug}/#main">Skip to content</a>${navigation}${body}${footer.replace('href="projects/">Back to top', `href="services/${service.slug}/#top">Back to top`)}</body></html>`;
  html = decorate(html, { path, title: service.title, description: service.description, service });
  mkdirSync(`services/${service.slug}`, { recursive: true });
  writeFileSync(`services/${service.slug}/index.html`, html);
}

const urls = ["/", "/projects/", ...services.map(service => `/services/${service.slug}/`)];
writeFileSync("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(path => `  <url><loc>${origin}${path}</loc></url>`).join("\n")}\n</urlset>\n`);
writeFileSync("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`Generated crawlable HTML for ${projects.length} projects and ${services.length} service pages; sitemap contains ${urls.length} canonical URLs.`);

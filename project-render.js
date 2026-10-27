// Shared by the static build and browser filters: one source for project cards.
(function (root) {
  const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
  const arrowIcon = '<svg class="icon-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
  const projectCategories = [
    { id: "auto", title: "AI & automation", description: "Custom workflows that connect tools and simplify everyday work." },
    { id: "web", title: "Websites for business", description: "Live websites for businesses, brands, and experiences." },
    { id: "analytics", title: "Data analytics for business", description: "Dashboards, reports, and analysis that turn data into useful insights." },
    { id: "science", title: "Data science", description: "Exploratory studies, machine-learning models, and documented notebooks." },
  ];
  function projectCaseStudy(project) {
    if (!project.caseStudy) return "";
    return `<dl class="project-case-study">${[["problem", "The problem"], ["contribution", "My contribution"], ["result", "The result"]].map(([key, label]) => `<div><dt>${label}</dt><dd>${escapeHTML(project.caseStudy[key])}</dd></div>`).join("")}</dl>`;
  }
  function projectActionLinks(project) {
    const link = (url, label) => `<a href="${escapeHTML(url)}" target="_blank" rel="noopener" aria-label="${escapeHTML(label + ': ' + project.title)}">${label} ${arrowIcon}</a>`;
    return [project.demoUrl ? link(project.demoUrl, "Try live demo") : "", project.codeUrl ? link(project.codeUrl, "View code") : "", !project.codeUrl && project.repo && project.url ? link(project.url, "View project files") : ""].join("");
  }
  function projectDestinationLink(project) {
    const links = projectActionLinks(project);
    return links ? `<div class="project-destinations">${links}</div>` : `<a href="./?service=automation#contact">Discuss a workflow ${arrowIcon}</a>`;
  }
  function projectDetails(project) {
    return `<p>${escapeHTML(project.details)}</p>${project.highlights.length ? `<h4>A closer look</h4><ul>${project.highlights.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</ul>` : ""}${project.artifacts.length ? `<h4>Original project files</h4><ul>${project.artifacts.map(file => `<li><a href="${escapeHTML(file.url)}" target="_blank" rel="noopener">${escapeHTML(file.name)} (${escapeHTML(file.type)})</a></li>`).join("")}</ul>` : ""}${project.sourceType === "custom" ? '<a class="text-link" href="./?service=automation#contact">Discuss a similar workflow →</a>' : ""}`;
  }
  function projectCard(project) {
    return `<article class="project-card" id="project-${escapeHTML(project.id)}" data-project-id="${escapeHTML(project.id)}" data-category="${escapeHTML(project.category)}"><div class="project-preview ${project.image ? "has-preview" : ""}" aria-hidden="true">${project.image ? `<img src="${escapeHTML(project.image)}" alt="" loading="lazy" decoding="async">` : `<strong>${escapeHTML(project.title)}</strong>`}<span class="visual-label">${escapeHTML(project.imageLabel)}</span></div><div class="project-category-line"><p class="project-category">${escapeHTML(project.categoryName)}</p><span class="project-kind">${escapeHTML(project.kind)}</span></div><h3>${escapeHTML(project.title)}</h3>${project.caseStudy ? projectCaseStudy(project) : `<p class="project-description">${escapeHTML(project.desc)}</p>`}<div class="project-meta">${project.tags.map(tag => `<span class="tag">${escapeHTML(tag)}</span>`).join("")}</div><div class="project-links"><details class="project-details"><summary data-project="${project.index}" aria-label="Explore ${escapeHTML(project.title)}">Explore project ${arrowIcon}</summary><div class="project-inline-details">${projectDetails(project)}</div></details>${projectDestinationLink(project)}</div></article>`;
  }
  function projectGroups(projects) {
    return projectCategories.map(category => {
      const matches = projects.filter(project => project.category === category.id);
      return matches.length ? `<section class="project-category-section" id="category-${category.id}" aria-labelledby="category-${category.id}-title"><header class="project-category-heading"><div><h2 id="category-${category.id}-title">${escapeHTML(category.title)}</h2><p>${escapeHTML(category.description)}</p></div><span class="category-project-count">${matches.length} ${matches.length === 1 ? "project" : "projects"}</span></header><div class="project-grid">${matches.map(projectCard).join("")}</div></section>` : "";
    }).join("");
  }
  root.PORTFOLIO_RENDER = { escapeHTML, arrowIcon, projectCategories, projectCard, projectGroups, projectCaseStudy, projectActionLinks };
})(globalThis);

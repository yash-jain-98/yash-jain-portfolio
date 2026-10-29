// Keep old bookmarks usable while showing the directory URL in the address bar.
const cleanPageURL = new URL(window.location.href);
if (cleanPageURL.pathname.endsWith("/index.html")) {
  cleanPageURL.pathname = cleanPageURL.pathname.slice(0, -"index.html".length);
}
if (cleanPageURL.hash === "#home") cleanPageURL.hash = "";
if (cleanPageURL.href !== window.location.href) {
  history.replaceState(history.state, "", cleanPageURL);
}

const projects = window.PORTFOLIO_DATA?.projects || [];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const email = "works.yashjain@gmail.com";

// All examples in the service preview use explicitly illustrative data.
function webDemo(interactive = true) {
  return `<div class="browser-demo"><div class="browser-bar"><i></i><i></i><i></i><span>formandfield.example</span>${interactive ? '<button type="button" data-device="desktop" aria-pressed="true" aria-label="Show desktop website preview">Desktop</button><button type="button" data-device="mobile" aria-pressed="false" aria-label="Show mobile website preview">Mobile</button>' : ""}</div><div class="sample-website"><div class="sample-nav"><b>form & field.</b><span>Our story &nbsp; Collection &nbsp; Contact</span></div><div class="sample-web-body"><div><small>A LITTLE ROOM TO GROW</small><h4>Good things.<br>Thoughtfully<br>grown.</h4><span class="sample-pill">Explore the collection <svg class="icon-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span></div><div class="sample-garden"><span class="sample-leaf">❧</span></div></div><div class="sample-footer"><span>Considered design.</span><span>A calmer kind of everyday.</span></div></div></div>`;
}
function dashboardDemo(interactive = true, period = "month") {
  const month = period === "month",
    bars = month
      ? [35, 54, 48, 69, 56, 84, 76, 94]
      : [55, 43, 66, 58, 79, 68, 93, 85];
  return `<div class="dashboard-demo"><div class="demo-topline">Retail overview ${interactive ? '<div class="demo-toggle"><button type="button" data-period="month" aria-pressed="' + month + '">Month</button><button type="button" data-period="quarter" aria-pressed="' + !month + '">Quarter</button></div>' : "<span>SAMPLE DATA</span>"}</div><div class="metric-row"><div><small>Total sales</small><strong>${month ? "24.8k" : "72.4k"}</strong><em>Sample</em></div><div><small>Orders</small><strong>${month ? "186" : "548"}</strong></div><div><small>Categories</small><strong>8</strong></div></div><div class="chart-bars" aria-hidden="true">${bars.map((h) => `<i style="--bar:${h}%"></i>`).join("")}</div><div class="chart-axis"><span>${month ? "Week 1" : "Month 1"}</span><span>${month ? "Week 2" : "Month 2"}</span><span>${month ? "Week 4" : "Month 3"}</span></div>${interactive ? '<p class="demo-data-note">Illustrative dataset · A dashboard concept, not client results.</p>' : ""}</div>`;
}
function workflowDemo(interactive = true) {
  return `<div class="workflow-demo"><div class="demo-topline">A little less manual work.<span>WORKFLOW DEMO</span></div><div class="flow-nodes"><div class="flow-node"><span>⇣</span>Collect<br>data</div><b class="flow-arrow">→</b><div class="flow-node"><span>⌘</span>Clean &<br>transform</div><b class="flow-arrow">→</b><div class="flow-node"><span>▥</span>Prepare<br>report</div></div>${interactive ? '<button type="button" class="run-workflow">Run sample workflow <svg class="icon-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></button><p class="workflow-log" aria-live="polite">A browser demonstration using sample records.</p>' : '<p class="demo-data-note">Collect. Transform. Understand.</p>'}</div>`;
}
const scienceDemo = `<div class="science-demo"><div class="demo-topline">From patterns to possibilities.<span>MODEL STUDY</span></div><svg viewBox="0 0 360 130" role="img" aria-label="Illustrative chart comparing observed and modeled values"><path d="M10 110H350M10 75H350M10 40H350M10 5H350" stroke="#edf1ef" fill="none"/><path d="M10 100L40 75L70 90L100 61L130 73L160 49L190 65L220 31L250 49L280 19L310 38L350 12" stroke="#3e7b69" stroke-width="3" fill="none"/><path d="M10 105L40 96L70 84L100 76L130 69L160 63L190 55L220 49L250 42L280 35L310 29L350 20" stroke="#a4c4ba" stroke-width="2" stroke-dasharray="5 4" fill="none"/></svg><div class="model-legend"><span>Observed</span><span>Modeled</span></div><p class="model-note">Ask a question. Explore the data. Evaluate the model.<br>Illustrative values; no predictive performance is claimed.</p></div>`;
const codeDemo = `<div class="code-preview"><span>business_questions.sql &nbsp; • • •</span><pre><b>SELECT</b> category,<br>       <b>SUM</b>(sales) AS total<br><b>FROM</b> retail_data<br><b>GROUP BY</b> category<br><b>ORDER BY</b> total DESC;</pre><span>Good questions. Clearer answers.</span></div>`;
const serviceContent = {
  web: {
    kicker: "WEBSITE DESIGN & DEVELOPMENT",
    title: "A first impression.<br>A lasting connection.",
    description:
      "Give your business a home on the web that feels like you. Clear storytelling, thoughtful interfaces, and responsive development that makes every interaction count.",
    items: [
      "Business websites & landing pages",
      "Responsive design, from phone to desktop",
      "Website redesigns & interface improvements",
    ],
    cta: "Let’s talk websites",
    service: "Website design & development",
    demo: () => webDemo(),
    caption: "Try the preview: switch between desktop and mobile.",
  },
  data: {
    kicker: "DATA ANALYTICS & REPORTING",
    title: "Less guesswork.<br>More understanding.",
    description:
      "Bring scattered spreadsheets and business questions into focus. I create useful reports and dashboards that make your data easier to explore, understand, and act on.",
    items: [
      "Power BI & Excel dashboards",
      "SQL analysis & business reporting",
      "Data cleaning, preparation & visualization",
    ],
    cta: "Let’s explore your data",
    service: "Data analytics & reporting",
    demo: () => dashboardDemo(),
    caption: "Explore the sample data: switch the reporting period.",
  },
  science: {
    kicker: "DATA SCIENCE & MACHINE LEARNING",
    title: "Find the patterns.<br>Ask better questions.",
    description:
      "Explore what your data can tell you with Python, notebooks, and thoughtfully evaluated models. A practical approach that makes the assumptions and limitations clear.",
    items: [
      "Exploratory data analysis",
      "Machine-learning studies & model evaluation",
      "Documented notebooks & visual explanations",
    ],
    cta: "Let’s discuss your data challenge",
    service: "Data science & machine learning",
    demo: () => scienceDemo,
    caption: "Explore real notebooks and model studies in Selected work.",
  },
  auto: {
    kicker: "AUTOMATION & WORKFLOWS",
    title: "Less everyday effort.<br>More time for ideas.",
    description:
      "Put repetitive tasks in their place. I connect business tools with Make.com, Google Apps Script, and practical AI-assisted workflows to simplify recurring manual tasks.",
    items: [
      "Google Business Profile review-reply automation",
      "Email classification & attachment organisation",
      "Connected Google Workspace & reporting workflows",
    ],
    cta: "Let’s simplify your workflow",
    service: "Automation & workflows",
    demo: () => workflowDemo(),
    caption: "Try it: run a sample data-processing workflow.",
  },
};
let workflowRun = 0;
function selectService(mode, focus = false) {
  const content = serviceContent[mode];
  if (!content || !$("#service-panel")) return;
  workflowRun++;
  $$(".service-tabs [role=tab]").forEach((button) => {
    const active = button.dataset.mode === mode;
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
    if (active && focus) button.focus();
  });
  $("#service-panel").setAttribute("aria-labelledby", `tab-${mode}`);
  $("#service-kicker").textContent = content.kicker;
  $("#service-title").innerHTML = content.title;
  $("#service-description").textContent = content.description;
  $("#service-list").innerHTML = content.items
    .map((item) => `<li>${item}</li>`)
    .join("");
  $("#service-cta").innerHTML =
    `${content.cta} <span aria-hidden="true"><svg class="icon-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></span>`;
  $("#service-cta").dataset.service = content.service;
  $("#demo-stage").innerHTML = content.demo();
  $("#demo-caption").textContent = content.caption;
  $("#service-panel").classList.remove("panel-enter");
  void $("#service-panel").offsetWidth;
  $("#service-panel").classList.add("panel-enter");
}
$(".service-tabs")?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-mode]");
  if (button) selectService(button.dataset.mode);
});
$(".service-tabs")?.addEventListener("keydown", (event) => {
  const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
  if (!keys.includes(event.key)) return;
  event.preventDefault();
  const buttons = $$(".service-tabs [role=tab]"),
    current = buttons.indexOf(document.activeElement);
  let next = current;
  if (event.key === "ArrowRight") next = (current + 1) % buttons.length;
  if (event.key === "ArrowLeft")
    next = (current - 1 + buttons.length) % buttons.length;
  if (event.key === "Home") next = 0;
  if (event.key === "End") next = buttons.length - 1;
  selectService(buttons[next].dataset.mode, true);
});
$("#demo-stage")?.addEventListener("click", async (event) => {
  const device = event.target.closest("[data-device]");
  if (device) {
    $(".browser-demo", $("#demo-stage")).classList.toggle(
      "mobile",
      device.dataset.device === "mobile",
    );
    $$("[data-device]", $("#demo-stage")).forEach((button) =>
      button.setAttribute("aria-pressed", String(button === device)),
    );
  }
  const period = event.target.closest("[data-period]");
  if (period) {
    const selected = period.dataset.period;
    $("#demo-stage").innerHTML = dashboardDemo(true, selected);
    $(`[data-period="${selected}"]`, $("#demo-stage")).focus();
  }
  const run = event.target.closest(".run-workflow");
  if (run) {
    const runId = ++workflowRun,
      nodes = $$(".flow-node", $("#demo-stage")),
      log = $(".workflow-log", $("#demo-stage"));
    run.disabled = true;
    run.textContent = "Running sample…";
    nodes.forEach((node) => node.classList.remove("done"));
    const messages = [
      "Sample records collected.",
      "Records cleaned and organized.",
      "Sample report prepared. No external data was accessed.",
    ];
    for (let i = 0; i < nodes.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 550));
      if (runId !== workflowRun) return;
      nodes[i].classList.add("done");
      log.textContent = messages[i];
    }
    run.disabled = false;
    run.textContent = "Run again";
  }
});
selectService("web");

const { arrowIcon, escapeHTML, projectCard, projectGroups, projectCaseStudy, projectActionLinks } = window.PORTFOLIO_RENDER;
const formatProjectDate = value => new Intl.DateTimeFormat("en-GB", {
  day: "numeric", month: "short", year: "numeric", timeZone: "UTC"
}).format(new Date(value + "T00:00:00Z"));
const normalizeSearch = value => String(value).normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
if ($("#projects")) {
const groupedGallery = $("#projects").dataset.layout === "categories";
const galleryState = { category: "all", query: "", sort: "featured" };
function getFilteredProjects() {
  const words = normalizeSearch(galleryState.query)
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const filtered = projects
    .map((project, index) => ({ ...project, index }))
    .filter((project) => {
      if (
        galleryState.category !== "all" &&
        project.category !== galleryState.category
      )
        return false;
      const haystack = normalizeSearch(
        [
          project.title,
          project.repo,
          project.url,
          project.desc,
          project.details,
          ...Object.values(project.caseStudy || {}),
          project.categoryName,
          project.kind,
          ...project.tags,
          ...project.highlights,
          ...project.artifacts.map((file) => file.name),
        ].join(" "),
      );
      return words.every((word) => haystack.includes(word));
    });
  if (galleryState.sort === "recent")
    filtered.sort(
      (a, b) =>
        (b.updatedAt || "").localeCompare(a.updatedAt || "") ||
        a.title.localeCompare(b.title),
    );
  if (galleryState.sort === "title")
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  return filtered;
}
function renderProjects() {
  const filtered = getFilteredProjects();
  if (groupedGallery) {
    $("#projects").innerHTML = projectGroups(filtered);
  } else {
    $("#projects").innerHTML = filtered.map(projectCard).join("");
  }
  $("#project-count").textContent = filtered.length
    ? `Showing ${filtered.length} of ${projects.length} projects${galleryState.category !== "all" || galleryState.query ? " matching your filters" : " · All projects are displayed below"}`
    : "No projects match your search and filters.";
  if (groupedGallery) {
    const categoryCount = new Set(filtered.map((project) => project.category)).size;
    $("#project-count").textContent = filtered.length
      ? `Showing ${filtered.length} of ${projects.length} projects across ${categoryCount} ${categoryCount === 1 ? "category" : "categories"}${galleryState.query ? " matching your search" : ""}`
      : "No projects match your search.";
  }
  $("#gallery-empty").hidden = filtered.length !== 0;
  $("#show-all-projects").hidden =
    galleryState.category === "all" && !galleryState.query;
  $$(".project-filters button").forEach((button) =>
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.filter === galleryState.category),
    ),
  );
}
$(".project-filters")?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  clearTimeout(searchTimer);
  galleryState.category = button.dataset.filter;
  if (galleryState.category === "all") {
    galleryState.query = "";
    $("#project-search").value = "";
  }
  renderProjects();
});
let searchTimer;
$("#project-search").addEventListener("input", (event) => {
  clearTimeout(searchTimer);
  galleryState.query = event.target.value;
  searchTimer = setTimeout(renderProjects, 150);
});
$("#project-sort").addEventListener("change", (event) => {
  galleryState.sort = event.target.value;
  renderProjects();
});
function resetGallery() {
  clearTimeout(searchTimer);
  Object.assign(galleryState, {
    category: "all",
    query: "",
    sort: "featured",
  });
  $("#project-search").value = "";
  $("#project-sort").value = "featured";
  renderProjects();
}
$("#show-all-projects").addEventListener("click", () => {
  resetGallery();
  ($('[data-filter="all"]') || $("#project-search")).focus();
});
document.addEventListener("click", (event) => {
  if (event.target.closest('a[href="#work"]')) resetGallery();
});
$("#reset-projects").addEventListener("click", () => {
  resetGallery();
  $("#project-search").focus();
});
$$("[data-filter-count]").forEach((element) => {
  const category = element.dataset.filterCount;
  element.textContent = String(
    category === "all"
      ? projects.length
      : projects.filter((project) => project.category === category).length,
  );
});
$("#gallery-total").textContent = String(projects.length);
renderProjects();
document.body.classList.add("gallery-enhanced");

function projectResources(project) {
  const links = projectActionLinks(project);
  const note = project.sourceType === "website"
    ? "The demo opens the live business website. A public source-code link has not been supplied."
    : project.sourceType === "custom"
      ? "Workflow described by Yash. A public demo and source-code link have not been supplied."
      : "Source files and recorded findings are available below. No live demo is currently linked.";
  return `${links ? `<div class="project-resource-actions">${links}</div>` : ""}<p class="project-source-note">${note}</p>${project.artifacts.length ? `<h3 class="dialog-subheading">Evidence & project files</h3><ul class="project-artifacts">${project.artifacts.map(file => `<li><a href="${escapeHTML(file.url)}" target="_blank" rel="noopener"><span class="artifact-type">${escapeHTML(file.type)}</span><span>${escapeHTML(file.name)}</span>${arrowIcon}</a></li>`).join("")}</ul>` : ""}${project.sourceType === "custom" ? `<button type="button" class="button" data-workflow-enquiry>Discuss a similar workflow ${arrowIcon}</button>` : ""}`;
}

const dialog = $("#project-dialog");
let projectTrigger;
$("#projects").addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-project]");
  if (!trigger) return;
  event.preventDefault();
  projectTrigger = trigger;
  const project = projects[Number(trigger.dataset.project)];
  $("#dialog-content").innerHTML =
    `<p class="eyebrow">${escapeHTML(project.categoryName)} · ${escapeHTML(project.kind)}</p><h2 id="dialog-title">${escapeHTML(project.title)}</h2>${project.image ? `<figure class="dialog-project-preview"><img src="${escapeHTML(project.image)}" alt="${escapeHTML(project.imageAlt)}"><figcaption>${escapeHTML(project.imageLabel)}</figcaption></figure>` : ""}${projectCaseStudy(project)}<h3 class="dialog-subheading">Project context</h3><p>${escapeHTML(project.details)}</p>${project.highlights.length ? `<h3 class="dialog-subheading">A closer look</h3><ul class="project-highlights">${project.highlights.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>` : ""}<div class="project-meta">${project.tags.map((tag) => `<span class="tag">${escapeHTML(tag)}</span>`).join("")}</div>${projectResources(project)}`;
  dialog.showModal();
  document.body.classList.add("dialog-open");
});
$(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target.closest("[data-workflow-enquiry]")) {
    projectTrigger = null;
    dialog.close();
    if (!$("#contact-form")) {
      window.location.href = new URL("./?service=automation#contact", document.baseURI).href;
      return;
    }
    $("#service").value = "Automation & workflows";
    $("#contact").scrollIntoView({ behavior: "auto" });
    $("#client-name").focus({ preventScroll: true });
    return;
  }
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  )
    dialog.close();
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  projectTrigger?.focus();
});

} // End gallery enhancement; service pages do not require a gallery.

const menuButton = $(".menu-button"),
  nav = $("#main-nav");
function closeMenu() {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("open", open);
});
$$("#main-nav a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav.classList.contains("open")) {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".navigation")) closeMenu();
});
matchMedia("(min-width:1101px)").addEventListener("change", closeMenu);
$$("[data-service]").forEach((link) => {
  link.addEventListener("click", (event) => {
    if ($("#service")) $("#service").value = event.currentTarget.dataset.service;
  });
});

function createEmailDraft({ name, replyTo, service, message, phone }) {
  const body = `Hi Yash,\n\nMy name is ${name}.\n\nWhat I need help with: ${service}\n\n${message}\n\nEmail: ${replyTo}${phone ? "\nPhone: " + phone : ""}\n\nBest,\n${name}`;
  return `mailto:${email}?subject=${encodeURIComponent("Project enquiry: " + service)}&body=${encodeURIComponent(body)}`;
}
const enquiryServices = {
  automation: "Automation & workflows",
  websites: "Website design & development",
  analytics: "Data analytics & reporting",
  science: "Data science & machine learning",
};
const requestedService = enquiryServices[new URLSearchParams(window.location.search).get("service")];
if ($("#service") && requestedService) $("#service").value = requestedService;
const contactForm = $("#contact-form");
const contactEndpoint = window.PORTFOLIO_CONTACT?.endpoint || "";
const sheetsEnabled = /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(contactEndpoint);
const whatsappUrl = /^https:\/\/wa\.me\/[1-9][0-9]{6,14}$/.test(window.PORTFOLIO_CONTACT?.whatsappUrl || "")
  ? window.PORTFOLIO_CONTACT.whatsappUrl : "";
let contactStartedAt = Date.now();
let pendingEnquiry = null;
let sendingEnquiry = false;
function syncPhoneCountry() {
  if (!contactForm) return;
  const custom = $("#phone-country").value === "OTHER";
  $("#custom-code-field").hidden = !custom;
  $("#custom-dial-code").disabled = !custom;
  $("#client-phone").setCustomValidity("");
  $("#custom-dial-code").setCustomValidity("");
}
$("#phone-country")?.addEventListener("change", syncPhoneCountry);
syncPhoneCountry();
if (contactForm && sheetsEnabled) {
  contactForm.querySelector('button[type="submit"]').firstChild.textContent = whatsappUrl ? "Send enquiry & open WhatsApp " : "Send enquiry ";
  $("#form-status").textContent = whatsappUrl ? "After your enquiry is saved, you’ll be redirected to WhatsApp to continue the conversation." : "Your enquiry will be sent directly. No email app needed.";
}
contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (sendingEnquiry) return;
  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  const service = form.elements.service.value.trim();
  const message = form.elements.message.value.trim();
  const phoneInput = form.elements.phone.value.trim();
  const country = form.elements.country.value;
  const dialCode = country === "OTHER" ? form.elements.customDialCode.value.trim() : form.elements.country.selectedOptions[0].dataset.dialCode;
  const digits = phoneInput.replace(/[^0-9]/g, "");
  form.elements.name.setCustomValidity(name ? "" : "Please enter your name.");
  form.elements.service.setCustomValidity(service ? "" : "Please tell me what you need help with.");
  form.elements.message.setCustomValidity(message ? "" : "Please add a few details about your project.");
  form.elements.phone.setCustomValidity(!phoneInput || (/^[0-9 ()-]+$/.test(phoneInput) && digits.length >= 6 && (dialCode.replace(/[^0-9]/g, "") + digits).length <= 15) ? "" : "Enter your phone number using digits, spaces, brackets or hyphens. Choose the country code separately.");
  form.elements.customDialCode.setCustomValidity(!phoneInput || country !== "OTHER" || /^\+[1-9][0-9]{0,3}$/.test(dialCode) ? "" : "Enter a country code beginning with +, such as +358.");
  if (!form.reportValidity()) return;
  if (form.elements.companyWebsite.value) return;
  const phone = phoneInput ? `${dialCode} ${phoneInput}` : "";
  const replyTo = form.elements.email.value.trim();
  if (!sheetsEnabled) {
    $("#form-status").textContent = "Your email draft is ready. Send it from your email app to complete your enquiry.";
    window.location.href = createEmailDraft({ name, replyTo, service, message, phone });
    return;
  }
  const payload = { name, email: replyTo, enquiry: service, message, phone: phoneInput, dialCode: phoneInput ? dialCode : "", country: phoneInput ? country : "", companyWebsite: "" };
  const signature = JSON.stringify(payload);
  if (pendingEnquiry?.signature !== signature) pendingEnquiry = { signature, requestId: crypto.randomUUID() };
  const requestId = pendingEnquiry.requestId;
  const button = form.querySelector('button[type="submit"]');
  sendingEnquiry = true; button.disabled = true; form.setAttribute("aria-busy", "true");
  $("#form-status").textContent = "Sending your enquiry…";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    // URL-encoded fields keep this a simple cross-origin POST; never use no-cors,
    // because an opaque response cannot confirm that the enquiry was saved.
    const response = await fetch(contactEndpoint, { method: "POST", body: new URLSearchParams({ ...payload, requestId, startedAt: String(contactStartedAt) }), signal: controller.signal, credentials: "omit", redirect: "follow" });
    if (!response.ok) throw new Error("Submission failed");
    const result = await response.json();
    if (result.ok !== true || result.requestId !== requestId) throw new Error("Submission not confirmed");
    form.reset(); syncPhoneCountry(); pendingEnquiry = null; contactStartedAt = Date.now();
    $("#form-status").textContent = whatsappUrl
      ? "Thank you. Your enquiry has been saved. Opening WhatsApp…"
      : "Thank you. Your enquiry has been received. I’ll get back to you using the contact details you provided.";
    if (whatsappUrl) {
      const fallback = $("#whatsapp-continue");
      fallback.href = whatsappUrl;
      fallback.hidden = false;
      // Redirect only after the server confirms storage for this request ID.
      // No customer details are appended, and no WhatsApp message is sent automatically.
      setTimeout(() => window.location.assign(whatsappUrl), 700);
    }
  } catch {
    $("#form-status").textContent = "We couldn’t confirm your submission. Your details are still here—please retry, or email works.yashjain@gmail.com.";
  } finally {
    clearTimeout(timeout); sendingEnquiry = false; button.disabled = false; form.removeAttribute("aria-busy");
  }
});
$$("#contact-form input, #contact-form textarea").forEach((input) =>
  input.addEventListener("input", () => input.setCustomValidity("")),
);
$(".copy-email")?.addEventListener("click", async (event) => {
  const button = event.currentTarget;
  try {
    await navigator.clipboard.writeText(email);
    button.textContent = "Email copied ✓";
    $("#copy-status").textContent = "Email address copied to clipboard.";
    setTimeout(() => (button.textContent = "Copy email address"), 2500);
  } catch {
    button.textContent = "Select the address above to copy";
    $("#copy-status").textContent =
      "Clipboard access is unavailable. Select and copy the email address above.";
  }
});
$("#year").textContent = new Date().getFullYear();
if (
  "IntersectionObserver" in window &&
  !matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  document.body.classList.add("motion-ready");
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.1 },
  );
  $$(".reveal").forEach((element) => observer.observe(element));
}

// Decorative motion can be paused, and follows the visitor's system setting.
const driftingSection = $(".drifting-section");
const driftingToggle = $(".drifting-toggle");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
function syncDriftingMotion() {
  if (!driftingToggle || !driftingSection) return;
  driftingToggle.hidden = reducedMotion.matches;
  if (reducedMotion.matches) driftingSection.classList.add("is-paused");
  else
    driftingSection.classList.toggle(
      "is-paused",
      driftingToggle.getAttribute("aria-pressed") === "true",
    );
}
driftingToggle?.addEventListener("click", () => {
  const paused = driftingToggle.getAttribute("aria-pressed") !== "true";
  driftingToggle.setAttribute("aria-pressed", String(paused));
  driftingToggle.textContent = paused ? "Resume motion" : "Pause motion";
  driftingSection.classList.toggle("is-paused", paused);
});
reducedMotion.addEventListener("change", syncDriftingMotion);
syncDriftingMotion();

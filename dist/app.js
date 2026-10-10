const projects = [
  {
    title: "Small tools. Thoughtful interactions.",
    category: "web",
    categoryName: "WEB DEVELOPMENT",
    repo: "javascript_projects",
    desc: "A collection of JavaScript utilities, from a grocery list to a tip calculator and word counter.",
    tags: ["JavaScript", "HTML", "CSS"],
    visual: "web",
    details:
      "A collection of browser-based JavaScript projects exploring useful everyday interactions. The repository includes a grocery list, tip calculator, background color switcher, day-of-the-week app, height converter, and word-count tool.",
    scope:
      "Interactive utilities · Interface fundamentals · Browser development",
  },
  {
    title: "Retail, through a clearer lens.",
    category: "analytics",
    categoryName: "DATA ANALYTICS",
    repo: "retail-analysis-power-bi",
    desc: "A retail analysis project bringing a spreadsheet dataset into a Power BI report.",
    tags: ["Power BI", "Excel", "Retail analysis"],
    visual: "dashboard",
    details:
      "This repository contains a Power BI report alongside its Excel source workbook. Explore the report file to see the retail analysis, or inspect the source data in the spreadsheet.",
    scope: "Business intelligence · Data visualization · Report development",
  },
  {
    title: "Calgary crime data, explored.",
    category: "science",
    categoryName: "DATA SCIENCE",
    repo: "Calgary-Crime-Neural-Network-Data-Science-Project",
    desc: "Exploratory analysis of public crime data, with an experimental LSTM model and a documented review of its limitations.",
    tags: ["Python", "LSTM", "Jupyter"],
    visual: "science",
    details:
      "An exploration of Calgary community-level crime data from 2018 to early 2024, with a notebook, report, and experimental LSTM model. The README openly documents sequencing, train/test overlap, and aggregation limitations; the model is a learning experiment, not a validated forecasting system.",
    scope: "Exploratory analysis · Neural networks · Critical model evaluation",
  },
  {
    title: "From web pages to usable data.",
    category: "auto",
    categoryName: "DATA COLLECTION",
    repo: "ibm-python-project-web-scrapping",
    desc: "Python notebook work exploring web data collection as a foundation for repeatable analysis.",
    tags: ["Python", "Web scraping", "Jupyter"],
    visual: "workflow",
    details:
      "A Python project repository containing assignment notebooks and supporting screenshots for web-scraping work. It demonstrates the data-collection side of an analytical workflow; it is not presented as a deployed automation service.",
    scope: "Web data collection · Python notebooks · Repeatable workflows",
  },
  {
    title: "Questions answered with SQL.",
    category: "analytics",
    categoryName: "DATA ANALYTICS",
    repo: "SQL-Projects-Data_Business_Analysis",
    desc: "SQL projects focused on exploring data and answering business-analysis questions.",
    tags: ["SQL", "Business analysis"],
    visual: "code",
    details:
      "A collection of SQL and business-analysis project materials. Browse the repository for the individual datasets, queries, and supporting analysis.",
    scope: "Query development · Data exploration · Business analysis",
  },
  {
    title: "Exploring customer churn.",
    category: "science",
    categoryName: "DATA SCIENCE",
    repo: "Bank-Customer-Churn-Data-Science-Project",
    desc: "A notebook-based data-science project examining bank customer churn.",
    tags: ["Python", "Jupyter", "Machine learning"],
    visual: "science",
    details:
      "A data-science study centered on bank customer churn. The repository provides the project materials and notebook so you can inspect the analysis and modeling approach directly.",
    scope: "Customer analytics · Data exploration · Model development",
  },
];

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
const scienceDemo = `<div class="science-demo"><div class="demo-topline">From patterns to possibilities.<span>MODEL STUDY</span></div><svg viewBox="0 0 360 130" role="img" aria-label="Illustrative chart comparing observed and modeled values"><path d="M10 110H350M10 75H350M10 40H350M10 5H350" stroke="#e9eef5" fill="none"/><path d="M10 100L40 75L70 90L100 61L130 73L160 49L190 65L220 31L250 49L280 19L310 38L350 12" stroke="#3e7b69" stroke-width="3" fill="none"/><path d="M10 105L40 96L70 84L100 76L130 69L160 63L190 55L220 49L250 42L280 35L310 29L350 20" stroke="#a4c4ba" stroke-width="2" stroke-dasharray="5 4" fill="none"/></svg><div class="model-legend"><span>Observed</span><span>Modeled</span></div><p class="model-note">Ask a question. Explore the data. Evaluate the model.<br>Illustrative values; no predictive performance is claimed.</p></div>`;
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
      "Put repetitive tasks in their place. I build focused scripts and data workflows that turn recurring manual steps into simpler, more reliable processes.",
    items: [
      "Python scripts & data processing",
      "Web data collection workflows",
      "Spreadsheet & reporting automation",
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
  if (!content) return;
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
$(".service-tabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-mode]");
  if (button) selectService(button.dataset.mode);
});
$(".service-tabs").addEventListener("keydown", (event) => {
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
$("#demo-stage").addEventListener("click", async (event) => {
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

function projectVisual(project) {
  if (project.repo === "Calgary-Crime-Neural-Network-Data-Science-Project")
    return '<img src="calgary-analysis.png" alt="" loading="lazy" width="900" height="450">';
  if (project.repo === "Bank-Customer-Churn-Data-Science-Project")
    return '<img src="churn-analysis.png" alt="" loading="lazy" width="900" height="450">';
  return (
    {
      web: webDemo(false),
      dashboard: dashboardDemo(false),
      workflow: workflowDemo(false),
      code: codeDemo,
    }[project.visual] || scienceDemo
  );
}
function renderProjects(filter = "all") {
  const shown = projects
    .map((project, index) => ({ ...project, index }))
    .filter((project) => filter === "all" || project.category === filter);
  $("#projects").innerHTML = shown
    .map(
      (project) =>
        `<article class="project-card"><div class="project-preview" aria-hidden="true">${projectVisual(project)}<span class="visual-label">${project.category === "science" ? "ORIGINAL CHART FROM PROJECT REPOSITORY" : "ILLUSTRATIVE PROJECT PREVIEW"}</span></div><p class="project-category">${project.categoryName}</p><h3>${project.title}</h3><p class="project-description">${project.desc}</p><div class="project-meta">${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div><div class="project-links"><button type="button" data-project="${project.index}" aria-label="Read about ${project.title}">Explore project <svg class="icon-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></button><a href="https://github.com/yash-jain-98/${project.repo}" target="_blank" rel="noopener" aria-label="View ${project.repo} on GitHub">View code <svg class="icon-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a></div></article>`,
    )
    .join("");
  $("#project-count").textContent =
    `Showing ${shown.length} of ${projects.length} selected projects`;
}
$(".project-filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  $$(".project-filters button").forEach((item) =>
    item.setAttribute("aria-pressed", String(item === button)),
  );
  renderProjects(button.dataset.filter);
});
renderProjects();

const dialog = $("#project-dialog");
let projectTrigger;
$("#projects").addEventListener("click", (event) => {
  const trigger = event.target.closest("[data-project]");
  if (!trigger) return;
  projectTrigger = trigger;
  const project = projects[Number(trigger.dataset.project)];
  $("#dialog-content").innerHTML =
    `<p class="eyebrow">${project.categoryName}</p><h2 id="dialog-title">${project.title}</h2><p>${project.details}</p><p><strong>Project focus</strong><br>${project.scope}</p><div class="project-meta">${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div><a class="button" href="https://github.com/yash-jain-98/${project.repo}" target="_blank" rel="noopener">View repository on GitHub <svg class="icon-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg></a>`;
  dialog.showModal();
  document.body.classList.add("dialog-open");
});
$(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
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
matchMedia("(min-width:681px)").addEventListener("change", closeMenu);
$("#service-cta").addEventListener("click", (event) => {
  $("#service").value = event.currentTarget.dataset.service;
});

function createEmailDraft({ name, replyTo, service, message }) {
  const body = `Hi Yash,\n\nMy name is ${name}. I’m interested in ${service.toLowerCase()}.\n\n${message}\n\nYou can reach me at ${replyTo}.\n\nBest,\n${name}`;
  return `mailto:${email}?subject=${encodeURIComponent("Project enquiry: " + service)}&body=${encodeURIComponent(body)}`;
}
$("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget,
    name = form.elements.name.value.trim(),
    message = form.elements.message.value.trim();
  form.elements.name.setCustomValidity(name ? "" : "Please enter your name.");
  form.elements.message.setCustomValidity(
    message ? "" : "Please add a few details about your project.",
  );
  if (!form.reportValidity()) return;
  const draft = createEmailDraft({
    name,
    replyTo: form.elements.email.value.trim(),
    service: form.elements.service.value,
    message,
  });
  $("#form-status").textContent =
    "Your email draft is ready. If your email app does not open, use the email address beside this form.";
  window.location.href = draft;
});
$$("#contact-form input, #contact-form textarea").forEach((input) =>
  input.addEventListener("input", () => input.setCustomValidity("")),
);
$(".copy-email").addEventListener("click", async (event) => {
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

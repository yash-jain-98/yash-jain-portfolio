# Yash Jain portfolio

A responsive, light-theme portfolio for freelance website development, data analytics, data science, and automation. The visual direction takes cues from Birdeye’s Australian marketing site, adapted for Yash Jain with original copy, existing portfolio imagery, and real GitHub projects.

## Preview locally

No build step or dependencies are required. Open `dist/index.html`, or serve the directory:

```sh
python -m http.server 4173 --directory dist
```

Then visit `http://localhost:4173`.

## Edit the site

- `dist/index.html`: branding, page sections, contact details, and accessible markup.
- `dist/style.css`: responsive layouts, light theme, animations, and reduced-motion support.
- `dist/app.js`: the project gallery, filters, dialogs, service tabs, demos, and contact interactions.
- `dist/projects-data.js`: a curated snapshot of 25 public GitHub repositories, with descriptions, categories, source-file links, and preview metadata.
- `dist/project-assets/`: original repository images, PDF page previews, and themed SVG project illustrations.
- `docs/project-sources.md`: the repository audit, source attribution, and maintenance notes.
- `dist/fonts/`: self-hosted DM Sans and its SIL Open Font License.
- `.openai/hosting.json`: the existing Sites project identity and static output directory; preserve these when publishing.

## Interactions

- A dedicated AI agents & automation section showcases Google Business Profile review replies through Make.com a coal-company email classification, Drive filing, and Sheets workflow built using Claude and Google Apps Script; lead matching across Google Sheets; WhatsApp outreach with a 12-hour follow-up; and Gmail summaries saved to Google Docs. Expandable workflow details and enquiry links work on mobile and desktop.
- Four keyboard-accessible service tabs with desktop/mobile website previews, sample dashboard period controls, and a simulated automation workflow.
- A searchable 25-project gallery with five categories, three sort options, all projects visible by default, and native project dialogs linking to the original notebooks, reports, workbooks, and code. Escape dismisses dialogs and restores keyboard focus.
- Responsive mobile navigation, native FAQ disclosures, scroll reveals, and reduced-motion alternatives.
- Service links preselect the contact form. The form validates the name, email, and project details and opens a prefilled email draft. It does **not** send or store messages. A copy-email action provides a fallback.

Project descriptions retain their original scope and limitations. Charts and workflow demonstrations are clearly identified as illustrative; they are not client results. Preview images come from original repository charts, report pages, and clearly labelled project illustrations; source attribution is recorded in the audit. There are no invented customer logos, testimonials, or performance claims.

## Verification

Browser checks passed at widths of 320, 360, 390, 680, 768, 820, 900, 1024, 1280, and 1440 pixels with no horizontal overflow. Service tabs and keyboard navigation, both interactive previews, workflow completion, all five project filters, search and empty-state handling, sorting, all projects visible by default, all 25 project dialogs, LinkedIn links, dialog focus restoration, form validation and email encoding, mobile navigation, FAQs, reduced motion, and image loading were checked. No JavaScript errors or failed page requests were observed. `node --check dist/app.js` and `git diff --check` also passed.

The screenshots under `docs/previews/` show the redesigned hero and expanded project gallery on desktop and mobile. This repository branch does not automatically update the separately hosted ChatGPT Site; publication must use the existing Sites project.

## Motion sections

The tools strip shows Python, SQL, Excel, Power BI, Shopify, WordPress, and AI Automation with monochrome inline SVGs. A custom drifting-symbol section sits between the project gallery and About; visitors can pause its decorative motion, and it follows reduced-motion preferences. The footer contact bar provides email and LinkedIn links, a project-enquiry shortcut, and gentle entrance/hover transitions.

These two sections are original implementations in the existing theme. The requested Skillry preview videos and Minimal Motion Hero installation file could not be retrieved, so no Skillry skill was installed and the sections do not claim an exact visual match. The existing main hero is retained pending the source package.

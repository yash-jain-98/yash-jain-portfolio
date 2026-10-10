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
- `dist/projects-data.js`: a curated snapshot of 38 public GitHub repositories, with descriptions, categories, source-file links, and preview metadata.
- `dist/project-assets/`: original repository images, PDF page previews, and video stills.
- `docs/project-sources.md`: the repository audit, source attribution, and maintenance notes.
- `dist/fonts/`: self-hosted DM Sans and its SIL Open Font License.
- `.openai/hosting.json`: the existing Sites project identity and static output directory; preserve these when publishing.

## Interactions

- A dedicated AI agents & automation section showcases Google Business Profile review replies through Make.com and a coal-company email classification, Drive filing, and Sheets workflow built using Claude and Google Apps Script. Expandable workflow details and enquiry links work on mobile and desktop.
- Four keyboard-accessible service tabs with desktop/mobile website previews, sample dashboard period controls, and a simulated automation workflow.
- A searchable 38-project gallery with six categories, three sort options, progressive loading, and native project dialogs linking to the original notebooks, reports, workbooks, code, and videos. Escape dismisses dialogs and restores keyboard focus.
- Responsive mobile navigation, native FAQ disclosures, scroll reveals, and reduced-motion alternatives.
- Service links preselect the contact form. The form validates the name, email, and project details and opens a prefilled email draft. It does **not** send or store messages. A copy-email action provides a fallback.

Project descriptions retain their original scope and limitations. Charts and workflow demonstrations are clearly identified as illustrative; they are not client results. Preview images come from original repository charts, report pages, and video frames; source attribution is recorded in the audit. There are no invented customer logos, testimonials, or performance claims.

## Verification

Browser checks passed at widths of 320, 360, 390, 680, 768, 820, 900, 1024, 1280, and 1440 pixels with no horizontal overflow. Service tabs and keyboard navigation, both interactive previews, workflow completion, all six project filters, search and empty-state handling, sorting, progressive loading, all 38 project dialogs, LinkedIn links, dialog focus restoration, form validation and email encoding, mobile navigation, FAQs, reduced motion, and image loading were checked. No JavaScript errors or failed page requests were observed. `node --check dist/app.js` and `git diff --check` also passed.

The screenshots under `docs/previews/` show the redesigned hero and expanded project gallery on desktop and mobile. This repository branch does not automatically update the separately hosted ChatGPT Site; publication must use the existing Sites project.

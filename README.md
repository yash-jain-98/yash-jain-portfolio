# Yash Jain portfolio

A responsive, light-theme portfolio for freelance website development, data analytics, data science, and automation. The visual direction takes cues from Birdeye’s Australian marketing site, adapted for Yash Jain with original copy, existing portfolio imagery, and real GitHub projects.

## Preview locally

The production files, including `index.html`, are committed at the repository root. Serve them over HTTP to load the React hero module:

```sh
python -m http.server 4173
```

Then visit `http://localhost:4173`.

## Edit the site

- `index.html`: branding, page sections, contact details, and accessible markup.
- `style.css`: responsive layouts, light theme, animations, and reduced-motion support.
- `app.js`: the project gallery, filters, dialogs, service tabs, demos, and contact interactions.
- `projects-data.js`: a curated snapshot of 25 public GitHub repositories and five custom automation workflows, with descriptions, categories, source-file links, and preview metadata.
- `project-assets/`: original repository images, PDF page previews, and themed SVG project illustrations.
- `docs/project-sources.md`: the repository audit, source attribution, and maintenance notes.
- `fonts/`: self-hosted DM Sans and its SIL Open Font License.
- `.openai/hosting.json`: the existing Sites project identity and static output directory; preserve these when publishing.

## Interactions

- A dedicated AI agents & automation section showcases Google Business Profile review replies through Make.com; a coal-company email classification, Drive filing, and Sheets workflow built using Claude and Google Apps Script; lead matching across Google Sheets; WhatsApp outreach with a 12-hour follow-up; and Gmail summaries saved to Google Docs. Expandable workflow details and enquiry links work on mobile and desktop.
- Four keyboard-accessible service tabs with desktop/mobile website previews, sample dashboard period controls, and a simulated automation workflow.
- A searchable 30-project gallery (25 GitHub projects plus five custom workflows) with five categories, three sort options, all projects visible by default, and native project dialogs linking to the original notebooks, reports, workbooks, and code. Escape dismisses dialogs and restores keyboard focus.
- Responsive mobile navigation, native FAQ disclosures, scroll reveals, and reduced-motion alternatives.
- Service links preselect the contact form. The form validates the name, email, and project details and opens a prefilled email draft. It does **not** send or store messages. A copy-email action provides a fallback.

Project descriptions retain their original scope and limitations. Charts and workflow demonstrations are clearly identified as illustrative; they are not client results. Preview images come from original repository charts, report pages, and clearly labelled project illustrations; source attribution is recorded in the audit. There are no invented customer logos, testimonials, or performance claims.

## Verification

Browser checks passed at widths of 320, 360, 390, 680, 768, 820, 900, 1024, 1280, and 1440 pixels with no horizontal overflow. Service tabs and keyboard navigation, both interactive previews, workflow completion, all five project filters, search and empty-state handling, sorting, all projects visible by default, all 25 project dialogs, LinkedIn links, dialog focus restoration, form validation and email encoding, mobile navigation, FAQs, reduced motion, and image loading were checked. No JavaScript errors or failed page requests were observed. `node --check dist/app.js` and `git diff --check` also passed.

The screenshots under `docs/previews/` show the redesigned hero and expanded project gallery on desktop and mobile. This repository branch does not automatically update the separately hosted ChatGPT Site; publication must use the existing Sites project.

## Motion sections

The tools strip shows Python, SQL, Excel, Power BI, Shopify, WordPress, and AI Automation with monochrome inline SVGs. A custom drifting-symbol section sits between the project gallery and About; visitors can pause its decorative motion, and it follows reduced-motion preferences. The footer contact bar provides email and LinkedIn links, a project-enquiry shortcut, and gentle entrance/hover transitions.

These two sections are original implementations in the existing theme. The requested Skillry preview videos and Minimal Motion Hero installation file could not be retrieved, so no Skillry skill was installed and the sections do not claim an exact visual match. The main hero now uses the separate Prisma React component supplied by Yash.


## Prisma hero component

The user-supplied React hero is adapted in `components/ui/prisma-hero.tsx`, using Framer Motion, Lucide React, and TypeScript. Its oversized name, word entrance motion, full background media, and lower call-to-action layout are preserved in the portfolio’s light blue palette. The existing navigation and remaining static sections continue to work. The fallback image is the existing local workspace photograph.

- `src/hero.tsx` mounts the hero and footer carousel as separate React roots; `src/demo.tsx` shows standalone usage.
- `styles/prisma-hero.css` contains scoped hero styling and Tailwind v4 utilities with the `tw` prefix. Preflight is omitted to preserve the rest of the site.
- `components.json` declares the shadcn-compatible `components/ui` location; TypeScript resolves the `@/` alias from the project root.
- `scripts/build-hero.mjs` bundles the hero into `hero.js` and `hero.css`. Do not edit those two generated files directly.

After editing the hero:

```sh
npm ci
npm run typecheck
npm run build
```

The supplied CloudFront video URL is used directly. It was blocked by this execution environment’s network policy, so its actual content/playback could not be verified here. The hero retains its local image when video fails, has play/pause controls, and disables autoplay for reduced-motion users. Media controls were checked with a local test clip; failed-video fallback, all hero links, the gallery reset, no-JavaScript fallback, and layouts at 320–1920 pixels were checked in Chromium.


## Footer squeeze carousel

The supplied `SqueezeCarousel` component lives in `components/ui/carousel-squeeze.tsx`. `components/ui/footer-squeeze.tsx` supplies five portfolio service panels: websites, analytics, automation, data science, and connected solutions. It uses the existing font and colour palette, local images and SVG illustrations, and real enquiry/project links. `styles/footer-squeeze.css` scopes its styling; the shared build emits both React sections into `hero.js` and `hero.css`.

Autoplay is off. Visitors can use the arrows, preview panels, or Left/Right/Home/End keys. Focus follows the selected panel. Navigation briefly waits for each transition to finish to prevent the supplied component’s rapid-direction-change bug. Reduced-motion settings remove transitions. The mobile geometry keeps all panel widths positive. Checks covered five-panel wraparound, rapid mixed navigation, selected-panel focus, contact service preselection, automation navigation, and layouts from 320 to 1440px. The carousel uses no external image or font requests.


## GitHub Pages

In the repository’s **Settings → Pages**, select **Deploy from a branch**, then
**main** and **/(root)**, and save. The entry point is `index.html` at the repository
root. `.nojekyll` enables direct static-file serving. GitHub Pages availability for
private repositories depends on your GitHub plan; changing repository visibility
is not part of this setup.

Styles, scripts, fonts, project images, and section links use relative URLs, so
both the GitHub Pages project URL (`/yash-jain-portfolio/`) and a custom domain work.
The contact form opens an email draft and requires no backend.

After editing React components or their styles, run `npm ci`, `npm run typecheck`,
and `npm run build`, then commit the updated root `hero.js` and `hero.css` along
with the source changes. GitHub Pages serves the committed files without Node.js.
The build also copies an explicit list of public assets to ignored `dist/` for the
existing ChatGPT Sites deployment; `.openai/hosting.json` continues to point there.
Do not edit the generated `dist/` copy.

## Mobile refinements

The hero flows naturally on small screens; navigation uses a scrollable menu up
to 900px, including short landscape displays. Primary touch controls are at least 44px
high, form inputs use 16px text on touch devices, and dialogs fit the dynamic
viewport. Phone/tablet browser checks covered 320×568 through 1024×768, plus
1440×900 desktop, gallery filtering, all service panels, project dialogs,
contact validation, footer navigation, and reduced-motion video/carousel controls.

The repository-root site was also verified at `/yash-jain-portfolio/` in phone,
landscape, and desktop viewports. All 25 project previews resolved, and hero/menu
anchors, project filters/dialogs, and footer enquiry links retained the prefix.

The Automation gallery filter includes six projects: five owner-described workflows
plus the existing GitHub automation project. Custom workflow dialogs show process
details and an enquiry action, without claiming a public repository or source files.

## Colour palette

The light theme uses deep teal (`#18594e`) for primary actions, charcoal
(`#202c2a`) for headings, warm white (`#fafaf7`) for the page, and soft sage
(`#eff3ee`) for panels. Shared `--accent` and `--accent-hover` tokens style
interactive elements. The hero, footer carousel, and authored SVG illustrations
use the same palette; original repository screenshots retain their source colours.
Desktop and mobile previews were reviewed, with primary button text exceeding
4.5:1 contrast.

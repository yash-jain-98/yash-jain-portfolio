# Static content and search metadata

The root files are the GitHub Pages publication. `dist/` is the matching Sites
publication. Run `npm run build` before committing changes to content or assets.

## Sources

- `projects-data.js`: the existing, curated project collection. Do not restore
  excluded projects when refreshing it.
- `project-render.js`: shared card and category renderer for the static build and
  browser filters. Native details contain full descriptions and source links;
  JavaScript enhances the summaries with the existing modal preview.
- `scripts/services.mjs`: copy for the four service pages. Edit this source rather
  than generated `services/*/index.html` files.
- `scripts/build-content.mjs`: generates the cards, service pages, metadata,
  JSON-LD, sitemap and robots file. Regions in the existing home and catalogue
  HTML are marked with comments; content outside those regions is retained.

## Publication

`scripts/build-hero.mjs` runs content generation, builds the existing hero and
copies an explicit public asset list into `dist/`. New public directories must be
included in that list. Keep `CNAME` set to `jainyash.in`.

Canonical URLs use `https://jainyash.in/`, including on the hosted mirror. The
sitemap includes six standalone content pages. It omits duplicate `index.html`
URLs, the legacy Projects redirect and fragment/query variants. Project
fragments identify cards in the catalogue; they are not standalone case studies.

The service pages use a relative base URL, as the project catalogue does, so
assets and home links work under either the custom domain or a repository prefix.
Every content page retains exactly one Google Analytics tag after `<head>`.
The legacy redirect suppresses its own page view.
Microsoft Clarity (`z1m4xkdi2h`) is included once in each of the six content-page
heads by the shared builder. The legacy redirect is tracked at its destination.

Structured data describes the person, website, pages, services, breadcrumbs and
project collection. It makes no review, rating, price, accreditation or guaranteed
result claims. FAQs are visible native HTML; there is no FAQ rich-result claim.

## Verification

Run `npm run build`, `npm run typecheck`, `npm run check:seo` and
`git diff --check`. The SEO check verifies generated/source parity, unique page
metadata, internal links and fragments, one Analytics installation, connected
JSON-LD identifiers, the static project count and sitemap membership.

Browser QA should cover the six pages at phone, tablet and desktop sizes with
JavaScript both enabled and disabled, including menus, project details, search,
sorting, contact-service preselection and the old Projects redirect.

Publishing a sitemap does not submit it to a search-engine account or guarantee
indexing. Search Console submission, live URL inspection, GA4 receipt and measured
search/lead outcomes require separate verification in the relevant account.

// Market context reviewed 3 November 2026. These are external findings, not client results.
const oecd = { name: "OECD · AI adoption data", url: "https://www.oecd.org/en/topics/artificial-intelligence.html" };
const naic = { name: "National AI Centre · 2026 insights", url: "https://www.ai.gov.au/news-and-insights/blog/ai-adoption-insights-december-2025-february-2026" };
const post = { name: "Australia Post · eCommerce Report 2026", url: "https://auspost.com.au/business/grow-your-business/2026-ecommerce-report" };
const eurostat = { name: "Eurostat · Enterprise ICT statistics (PDF)", url: "https://ec.europa.eu/eurostat/statistics-explained/SEPDF/cache/33473.pdf" };
const wef = { name: "World Economic Forum · Future of Jobs 2025", url: "https://www.weforum.org/publications/the-future-of-jobs-report-2025" };
export const serviceInsights = {
  automation: {
    title: "AI is moving into everyday work.",
    intro: "Adoption is growing. The useful starting point is a specific task, a clear review step and a workflow your team can operate.",
    stats: [
      { value: "44%", label: "of Australian SMEs reported some AI adoption", scope: "Australia · February 2026", detail: "National AI Centre SME survey; adoption includes different levels of use.", source: naic },
      { value: "20.2%", label: "of firms reported using AI", scope: "OECD reporting countries · 2025", detail: "Up from 14.2% in 2024. Countries with available data; definitions differ from the Australian SME survey.", source: oecd },
      { value: "~65%", label: "of non-adopters cited distrust or a preference for human control", scope: "Australia · December 2025–February 2026", detail: "Reported among non-adopting businesses in the SME survey.", source: naic },
    ],
    features: [
      ["Triggers that fit your process", "Start from an incoming email, form response or spreadsheet update, using the tools you already work with."],
      ["Human review where it matters", "Agree which replies or AI classifications need approval before the next action happens."],
      ["Checks for real-world inputs", "Plan for duplicate records, missing fields and failed steps, with logs or alerts in the agreed scope."],
      ["A workflow you can maintain", "Receive setup notes, a walkthrough and a clear explanation of connected accounts and running costs."],
    ],
  },
  websites: {
    title: "Your customers are already online.",
    intro: "Australia’s online retail activity offers useful context for ecommerce planning. A clear browsing and enquiry journey matters for service businesses too.",
    stats: [
      { value: "A$82.6bn", label: "spent online by Australian shoppers", scope: "Australia · 2025", detail: "Annual online spending reported in the 2026 report, using CommBank iQ data.", source: post },
      { value: "+14%", label: "year-on-year growth in online spending", scope: "Australia · 2025 versus 2024", detail: "Rounded growth rate reported by Australia Post; a market trend, not a website conversion uplift.", source: post },
      { value: "24%", label: "of retail spending took place online", scope: "Australia · 2025", detail: "Share of retail spend reported by Australia Post using CommBank iQ data.", source: post },
    ],
    features: [
      ["Designed for every screen", "Readable type, clear navigation and usable forms across phones, tablets and desktops."],
      ["Advertising connected to your website", "Google Ads and Meta Ads campaigns with relevant landing pages, enquiry tracking and an agreed budget."],
      ["Local and AI search visibility", "Google Business Profile maintenance, technical SEO and clear answer-led content for AEO and GEO."],
      ["Built for the handover", "Choose custom code, WordPress or Shopify around your editing needs, with guidance for routine updates."],
    ],
  },
  analytics: {
    title: "Better decisions start with useful data.",
    intro: "Business adoption and employer priorities point to the value of analysis. A useful report still needs clear definitions, reliable inputs and a question to answer.",
    stats: [
      { value: "39.85%", label: "of EU enterprises performed data analytics", scope: "European Union · 2025", detail: "Internally or through an external provider. Eurostat ICT survey covers enterprises with at least 10 employees/self-employed persons in selected sectors.", source: eurostat },
      { value: "13.85%", label: "used an external provider for data analytics", scope: "European Union · 2025", detail: "Share of enterprises in the same survey. This overlaps with the total analytics figure; the two percentages should not be added.", source: eurostat },
      { value: "7 in 10", label: "surveyed employers considered analytical thinking essential", scope: "Global employer survey · 2025", detail: "World Economic Forum employer findings, rather than a measure of dashboard adoption.", source: wef },
    ],
    features: [
      ["Measures everyone understands", "Define KPIs, date ranges and calculation rules before building the report."],
      ["Filters that answer questions", "Explore performance by the relevant period, product, customer group or business unit."],
      ["Checked against the source", "Review duplicates, missing values and joins, then reconcile key totals with the underlying files."],
      ["A practical refresh plan", "Agree manual or scheduled refresh, required access and licences, with notes for the person maintaining the report."],
    ],
  },
};

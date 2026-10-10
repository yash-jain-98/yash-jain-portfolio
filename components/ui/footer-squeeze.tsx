import { SqueezeCarousel, type SqueezeSlide } from "./carousel-squeeze";
const chooseService = (service: string) => () => {
  const field = document.querySelector<HTMLSelectElement>("#service");
  if (field) field.value = service;
};
const slides: SqueezeSlide[] = [
  {
    id: "web",
    title: "A website built around your business.",
    description:
      "Clear content, thoughtful interfaces, and responsive development for the way your customers browse.",
    image: "hero-workspace.png",
    imageAlt: "A bright workspace with a laptop and notebook",
    overlay: <span className="squeeze-wordmark">01 / Websites</span>,
    action: "Discuss a website",
    href: "#contact",
    onAction: chooseService("Website design & development"),
  },
  {
    id: "analytics",
    title: "Make your data easier to act on.",
    description:
      "Custom dashboards and reports that turn scattered spreadsheets into a clear view of what matters.",
    image: "project-assets/sales-dashboard-excel-cover.svg",
    imageAlt: "Illustration of a spreadsheet and dashboard",
    overlay: <span className="squeeze-wordmark">02 / Data analytics</span>,
    action: "Explore your data",
    href: "#contact",
    onAction: chooseService("Data analytics & reporting"),
  },
  {
    id: "automation",
    title: "Give repetitive work a better workflow.",
    description:
      "Connect your everyday tools with automation for review replies, email handling, lead matching, and follow-ups.",
    image: "footer-assets/workflow.svg",
    imageAlt:
      "Illustration of connected email, processing, and reporting steps",
    overlay: <span className="squeeze-wordmark">03 / AI & automation</span>,
    action: "See automation projects",
    href: "#automation",
  },
  {
    id: "science",
    title: "Find the patterns behind the questions.",
    description:
      "Python analysis and machine-learning studies that make the data, assumptions, and model limitations clear.",
    image: "project-assets/data-analysis_eda-projects-cover.svg",
    imageAlt: "Conceptual scatter plot and data-analysis dashboard",
    overlay: <span className="squeeze-wordmark">04 / Data science</span>,
    action: "Discuss a data challenge",
    href: "#contact",
    onAction: chooseService("Data science & machine learning"),
  },
  {
    id: "custom",
    title: "A custom solution that fits the way you work.",
    description:
      "Start with your goals and existing tools. Build the right connections between your website, data, and daily operations.",
    image: "footer-assets/connections.svg",
    imageAlt:
      "Illustration of business tools connected to one central workflow",
    overlay: <span className="squeeze-wordmark">05 / Connected solutions</span>,
    action: "Share your idea",
    href: "#contact",
    onAction: chooseService("Something else"),
  },
];
export function FooterSqueezeSection() {
  return (
    <section
      className="footer-squeeze-section"
      aria-labelledby="footer-squeeze-title"
    >
      <div className="footer-squeeze-heading">
        <div>
          <p className="eyebrow">BUILT AROUND YOUR NEXT CHAPTER</p>
          <h2 id="footer-squeeze-title">
            Different needs.
            <br />
            <span>One connected approach.</span>
          </h2>
        </div>
        <p>Explore the ways we can bring your next idea to life.</p>
      </div>
      <SqueezeCarousel
        slides={slides}
        label="Explore custom services"
        accent="#2854ee"
        accentForeground="#ffffff"
        duration={650}
        autoplay={false}
      />
    </section>
  );
}

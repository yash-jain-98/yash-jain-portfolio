import { createRoot } from "react-dom/client";
import { PrismaHero } from "../components/ui/prisma-hero";
import { FooterSqueezeSection } from "../components/ui/footer-squeeze";
const root = document.getElementById("prisma-hero-root");
if (root) createRoot(root).render(<PrismaHero />);

const footer = document.getElementById("footer-squeeze-root");
if (footer) createRoot(footer).render(<FooterSqueezeSection />);

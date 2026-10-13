import { createRoot } from "react-dom/client";
import { PrismaHero } from "../components/ui/prisma-hero";
const root = document.getElementById("prisma-hero-root");
if (root) createRoot(root).render(<PrismaHero />);

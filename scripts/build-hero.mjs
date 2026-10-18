import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { cpSync, mkdirSync, rmSync } from "node:fs";
await build({
  entryPoints: ["src/hero.tsx"],
  bundle: true,
  minify: true,
  format: "esm",
  target: ["es2020"],
  outfile: "hero.js",
  define: { "process.env.NODE_ENV": '"production"' },
  legalComments: "eof",
});
execFileSync(
  process.execPath,
  [
    "node_modules/@tailwindcss/cli/dist/index.mjs",
    "-i",
    "styles/prisma-hero.css",
    "-o",
    "hero.css",
    "--minify",
  ],
  { stdio: "inherit" },
);

// Root files are the GitHub Pages site; dist is an isolated Sites deployment.
// Copy only public assets, never the repository, source, or local credentials.
rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });
for (const asset of [
  "index.html", "projects.html", "projects", "style.css", "app.js", "projects-data.js", "hero.css", "hero.js",
  "hero-workspace.png", "calgary-analysis.png", "churn-analysis.png",
  "fonts", "project-assets", ".nojekyll",
]) {
  cpSync(asset, `dist/${asset}`, { recursive: true });
}

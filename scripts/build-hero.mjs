import { build } from "esbuild";
import { execFileSync } from "node:child_process";
await build({
  entryPoints: ["src/hero.tsx"],
  bundle: true,
  minify: true,
  format: "esm",
  target: ["es2020"],
  outfile: "dist/hero.js",
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
    "dist/hero.css",
    "--minify",
  ],
  { stdio: "inherit" },
);

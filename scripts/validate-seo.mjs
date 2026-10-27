import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import vm from "node:vm";
import { services } from "./services.mjs";

const origin = "https://jainyash.in";
const paths = ["/", "/projects/", ...services.map(service => `/services/${service.slug}/`)];
const read = path => readFileSync(path, "utf8");
const context = { window: {} };
vm.runInNewContext(read("projects-data.js"), context);
const projects = context.window.PORTFOLIO_DATA.projects;
const titles = new Set();
const descriptions = new Set();
for (const path of paths) {
  const file = path === "/" ? "index.html" : `${path.slice(1)}index.html`;
  const html = read(file);
  assert.equal(html, read(`dist/${file}`), `${file}: deployment differs from source`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${file}: one H1`);
  const title = [...html.matchAll(/<title>(.*?)<\/title>/g)];
  assert.equal(title.length, 1, `${file}: one title`);
  assert(!titles.has(title[0][1]), `${file}: unique title`); titles.add(title[0][1]);
  const description = [...html.matchAll(/<meta name="description" content="([^"]+)"/g)];
  assert.equal(description.length, 1, `${file}: one description`);
  assert(!descriptions.has(description[0][1]), `${file}: unique description`); descriptions.add(description[0][1]);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  assert(html.includes(`rel="canonical" href="${origin}${path}"`));
  assert(html.includes(`property="og:url" content="${origin}${path}"`));
  assert.equal((html.match(/googletagmanager\.com\/gtag\/js\?id=G-7ZG1TPQ7KM/g) || []).length, 1);
  assert.match(html, /<head>\s*<!-- Google tag \(gtag.js\) -->\s*<script async/);
  assert.equal((html.match(/https:\/\/www\.clarity\.ms\/tag\//g) || []).length, 1, `${file}: one Clarity loader`);
  assert.equal((html.match(/"z1m4xkdi2h"/g) || []).length, 1, `${file}: correct Clarity project`);
  const json = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.equal(json.length, 1);
  const schema = JSON.parse(json[0][1]);
  assert.equal(schema["@context"], "https://schema.org");
  const ids = new Set(schema["@graph"].map(item => item["@id"]));
  assert.equal(ids.size, schema["@graph"].length);
  const verifyReferences = value => {
    if (!value || typeof value !== "object") return;
    if (value["@id"] && !value["@type"]) assert(ids.has(value["@id"]), `${file}: unresolved schema reference`);
    Object.values(value).forEach(verifyReferences);
  };
  verifyReferences(schema);
  if (path.startsWith("/services/")) {
    assert(schema["@graph"].some(item => item["@type"] === "Service"));
    assert.equal((html.match(/<details>/g) || []).length, 4, `${file}: four readable FAQs`);
  } else {
    assert.equal((html.match(/class="project-card"/g) || []).length, projects.length);
    assert.equal((html.match(/class="project-details"/g) || []).length, projects.length);
    assert.equal((html.match(/<dt>The problem<\/dt>/g) || []).length, projects.length);
    assert.equal((html.match(/<dt>My contribution<\/dt>/g) || []).length, projects.length);
    assert.equal((html.match(/<dt>The result<\/dt>/g) || []).length, projects.length);
    assert(html.includes(`<strong id="gallery-total">${projects.length}</strong>`));
    for (const project of projects) {
      assert(html.includes(`id="project-${project.id}"`));
      assert(project.caseStudy.problem && project.caseStudy.contribution && project.caseStudy.result);
      if (project.demoUrl) assert.equal(project.sourceType, "website", "Only supplied website demos are currently available");
      if (project.codeUrl) assert(project.artifacts.some(file => file.type === "IPYNB"), "Code links require a source notebook");
    }
  }
  const pageURL = origin + path;
  const baseMatch = html.match(/<base href="([^"]+)"/);
  const base = baseMatch ? new URL(baseMatch[1], pageURL).href : pageURL;
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const url = new URL(match[1].replaceAll("&amp;", "&"), base);
    if (url.origin !== origin) continue;
    const target = url.pathname.endsWith("/") ? `${url.pathname.slice(1)}index.html` : url.pathname.slice(1);
    assert(existsSync(`dist/${target}`), `${file}: missing local target ${target}`);
    if (url.hash && target.endsWith(".html")) {
      const id = decodeURIComponent(url.hash.slice(1));
      assert(read(`dist/${target}`).includes(`id="${id}"`), `${file}: missing anchor ${url.hash} in ${target}`);
    }
  }
  console.log(`PASS ${path}: static content, metadata, schema, analytics and local links`);
}
const sitemap = read("sitemap.xml");
assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]), paths.map(path => origin + path));
assert.equal(sitemap, read("dist/sitemap.xml"));
assert(read("dist/robots.txt").includes(`Sitemap: ${origin}/sitemap.xml`));
assert.equal(read("CNAME").trim(), "jainyash.in");
console.log("PASS sitemap, robots and custom domain");

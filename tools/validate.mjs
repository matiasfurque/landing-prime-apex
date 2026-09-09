import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const regionDirectory = join(projectRoot, "apex", "regions");
const requiredRegions = ["intro", "header", "hero", "benefits", "benefit-drawer", "offers", "faq", "footer"];
const errors = [];
const ids = new Map();

for (const region of requiredRegions) {
  const regionPath = join(regionDirectory, `${region}.html`);

  if (!existsSync(regionPath)) {
    errors.push(`Falta la región: ${relative(projectRoot, regionPath)}`);
    continue;
  }

  const markup = readFileSync(regionPath, "utf8");

  for (const match of markup.matchAll(/\bid="([^"]+)"/g)) {
    const id = match[1];
    if (ids.has(id)) errors.push(`ID duplicado '${id}' en ${region} y ${ids.get(id)}`);
    ids.set(id, region);
  }

  for (const match of markup.matchAll(/#APP_FILES#(assets\/[^"')\s]+)/g)) {
    const assetPath = join(projectRoot, "static", ...match[1].split("/"));
    if (!existsSync(assetPath)) errors.push(`No existe el recurso ${match[1]} usado por ${region}`);
  }
}

const cssPath = join(projectRoot, "static", "css", "prime.css");
const css = readFileSync(cssPath, "utf8");
for (const match of css.matchAll(/url\("\.\.\/(assets|fonts)\/([^"?]+)"\)/g)) {
  const filePath = join(projectRoot, "static", match[1], ...match[2].split("/"));
  if (!existsSync(filePath)) errors.push(`No existe el recurso CSS: ${relative(projectRoot, filePath)}`);
}

const jsDirectory = join(projectRoot, "static", "js");
const jsFiles = [
  join(jsDirectory, "prime-config.js"),
  join(jsDirectory, "prime-app.js"),
  ...readdirSync(join(jsDirectory, "components")).map((file) => join(jsDirectory, "components", file))
];
for (const file of jsFiles) {
  new Function(readFileSync(file, "utf8"));
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Validación correcta: ${requiredRegions.length} regiones, ${ids.size} IDs únicos y recursos completos.`);
}

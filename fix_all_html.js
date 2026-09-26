const fs = require("fs");
const path = require("path");

const distDir = path.join(
  "d:",
  "oil",
  "frontend",
  "public",
  "gentelella",
  "dist",
  "production"
);
const projHtml = fs.readFileSync(path.join(distDir, "projects.html"), "utf8");

const headAssetsMatch = projHtml.match(
  /(<link rel="modulepreload"[\s\S]*?<link rel="stylesheet"[\s\S]*?>)/
);
const headAssets = headAssetsMatch ? headAssetsMatch[1] : "";

const sidebarMatch = projHtml.match(
  /(<aside class="sidebar"[\s\S]*?<\/aside>)/
);
const sidebar = sidebarMatch ? sidebarMatch[1] : "";

const headerMatch = projHtml.match(
  /(<header class="topbar"[\s\S]*?<\/header>)/
);
const header = headerMatch ? headerMatch[1] : "";

const footerMatch = projHtml.match(
  /(<footer class="footer"[\s\S]*?<\/footer>)/
);
const footer = footerMatch ? footerMatch[1] : "";

const htmlFiles = [
  "e_commerce.html",
  "kanban.html",
  "form_upload.html",
  "orders.html",
  "form_wizards.html",
  "tables_dynamic.html",
  "contacts.html",
  "tables.html",
  "settings.html",
];

htmlFiles.forEach((file) => {
  const filepath = path.join(distDir, file);
  if (!fs.existsSync(filepath)) return;

  let content = fs.readFileSync(filepath, "utf8");

  content = content.replace(
    /<script type="module" src="\/src\/main-v4\.js"><\/script>/,
    headAssets
  );

  if (!content.includes('<aside class="sidebar"')) {
    content = content.replace(
      '<main class="main">',
      `<a class="skip-link" href="#main-content">Skip to main content</a>\n${sidebar}\n${header}\n<main class="main">`
    );
  }

  content = content.replace(
    '<main class="main">',
    '<main id="main-content" tabindex="-1" class="main">'
  );

  if (!content.includes('<footer class="footer"')) {
    content = content.replace("</main>", `${footer}\n</main>`);
  }

  fs.writeFileSync(filepath, content);
  console.log(`Fixed ${file}`);
});

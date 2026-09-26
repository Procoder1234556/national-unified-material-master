const fs = require("fs");
const path = require("path");

const dir = "d:\\oil\\frontend\\public\\gentelella\\dist\\production";
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html"));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, "utf8");
  let original = content;

  // Replace absolute paths with relative paths
  content = content.replace(/href="\/gentelella\/dist\//g, 'href="../');
  content = content.replace(/src="\/gentelella\/dist\//g, 'src="../');

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated paths in ${file}`);
  }
}

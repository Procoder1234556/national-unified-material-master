const fs = require("fs");
const path = require("path");
const dirs = [
  "D:/oil/.agents/skills",
  "D:/oil/.gemini/skills",
  "D:/oil/marketingskills/skills",
  "D:/oil/claude-code-copywriting-skills",
];
let skills = [];
for (let dir of dirs) {
  if (!fs.existsSync(dir)) continue;
  for (let folder of fs.readdirSync(dir)) {
    let p = path.join(dir, folder, "SKILL.md");
    if (fs.existsSync(p)) {
      let content = fs.readFileSync(p, "utf8");
      let name = folder;
      let desc = "";

      const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (match) {
        const yamlStr = match[1];
        const nameMatch = yamlStr.match(/^name:\s*(.+)$/m);
        if (nameMatch) name = nameMatch[1].replace(/['"]/g, "").trim();

        const descMatch = yamlStr.match(
          /^description:\s*(?:>|>-|\|)?\s*\r?\n?([\s\S]*?)(?:^\w+:|$)/m
        );
        if (descMatch) {
          let extractedDesc = descMatch[1].trim();
          extractedDesc = extractedDesc.replace(/\n\s*/g, " ").trim();
          desc = extractedDesc;
        } else {
          const descSingleLineMatch = yamlStr.match(/^description:\s*(.+)$/m);
          if (descSingleLineMatch) {
            desc = descSingleLineMatch[1].replace(/['"]/g, "").trim();
          }
        }
      }

      let stat = fs.statSync(p);
      skills.push({
        id: folder,
        name: name,
        desc: desc,
        path: p,
        size: stat.size,
        createdAt: stat.mtime.toDateString(),
        avatarColor: [
          "primary",
          "azure",
          "purple",
          "yellow",
          "red",
          "green",
          "blue",
        ][Math.floor(Math.random() * 7)],
        initials: name.substring(0, 2).toUpperCase(),
      });
    }
  }
}
fs.writeFileSync("D:/oil/skills_data.json", JSON.stringify(skills, null, 2));
const dest1 =
  "D:/oil/frontend/public/gentelella/dist/production/skills_data.json";
const dest2 = "D:/oil/frontend/public/gentelella/production/skills_data.json";
if (fs.existsSync(path.dirname(dest1)))
  fs.writeFileSync(dest1, JSON.stringify(skills, null, 2));
if (fs.existsSync(path.dirname(dest2)))
  fs.writeFileSync(dest2, JSON.stringify(skills, null, 2));
console.log("Found " + skills.length + " skills");

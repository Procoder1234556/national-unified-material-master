import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'production');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const f of files) {
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(
    /<script type="module" src="\/src\/main-v4\.js"><\/script>/g,
    '<script type="module">import "/src/main-v4.js";</script>'
  );
  fs.writeFileSync(p, content);
}
console.log('Done!');

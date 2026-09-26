const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      './file-manager-Dxecr3u2.js',
      './main-v4-4eeF3Vvb.js',
      './toast-oOLbokEA.js',
      './rolldown-runtime-H_PjY6_i.js',
      '../assets/main-v4-DB_ReeJG.css'
    ])
) => i.map(i => d[i]);
import { t as i } from './main-v4-4eeF3Vvb.js';
i(
  async () => {
    const { initFileManager: i } = await import('./file-manager-Dxecr3u2.js');
    return { initFileManager: i };
  },
  __vite__mapDeps([0, 1, 2, 3, 4]),
  import.meta.url
).then(({ initFileManager: i }) => i());

const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      './file-manager-B5TUEQac.js',
      './main-v4-BiwepG9u.js',
      './toast-oOLbokEA.js',
      './rolldown-runtime-H_PjY6_i.js',
      '../assets/main-v4-Dosyc4L9.css'
    ])
) => i.map(i => d[i]);
import { t as i } from './main-v4-BiwepG9u.js';
i(
  async () => {
    const { initFileManager: i } = await import('./file-manager-B5TUEQac.js');
    return { initFileManager: i };
  },
  __vite__mapDeps([0, 1, 2, 3, 4]),
  import.meta.url
).then(({ initFileManager: i }) => i());

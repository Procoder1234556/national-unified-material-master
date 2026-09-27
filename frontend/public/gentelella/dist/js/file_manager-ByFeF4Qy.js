const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      './file-manager-DjhUxj-4.js',
      './main-v4-CKNFKWc8.js',
      './toast-oOLbokEA.js',
      './rolldown-runtime-H_PjY6_i.js',
      '../assets/main-v4-DqZkM2qe.css'
    ])
) => i.map(i => d[i]);
import { t as i } from './main-v4-CKNFKWc8.js';
i(
  async () => {
    const { initFileManager: i } = await import('./file-manager-DjhUxj-4.js');
    return { initFileManager: i };
  },
  __vite__mapDeps([0, 1, 2, 3, 4]),
  import.meta.url
).then(({ initFileManager: i }) => i());

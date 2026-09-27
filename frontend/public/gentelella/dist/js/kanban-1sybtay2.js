const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      './kanban-CKANnBn-.js',
      './main-v4-BiwepG9u.js',
      './toast-oOLbokEA.js',
      './rolldown-runtime-H_PjY6_i.js',
      '../assets/main-v4-Dosyc4L9.css'
    ])
) => i.map(i => d[i]);
import { t as n } from './main-v4-BiwepG9u.js';
n(
  async () => {
    const { initKanban: n } = await import('./kanban-CKANnBn-.js');
    return { initKanban: n };
  },
  __vite__mapDeps([0, 1, 2, 3, 4]),
  import.meta.url
).then(({ initKanban: n }) => {
  (n(),
    document.getElementById('kanban-add-btn').addEventListener('click', n => {
      (n.stopPropagation(),
        n.preventDefault(),
        document.querySelector('.kanban-add[data-add-col="todo"]')?.click());
    }));
});

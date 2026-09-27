const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      './kanban-DQe1KUU9.js',
      './main-v4-BCcmCFN1.js',
      './toast-oOLbokEA.js',
      './rolldown-runtime-H_PjY6_i.js',
      '../assets/main-v4-DqZkM2qe.css'
    ])
) => i.map(i => d[i]);
import { t as n } from './main-v4-BCcmCFN1.js';
n(
  async () => {
    const { initKanban: n } = await import('./kanban-DQe1KUU9.js');
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

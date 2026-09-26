const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      './kanban-BXv1q1yH.js',
      './main-v4-4eeF3Vvb.js',
      './toast-oOLbokEA.js',
      './rolldown-runtime-H_PjY6_i.js',
      '../assets/main-v4-DB_ReeJG.css'
    ])
) => i.map(i => d[i]);
import { t as n } from './main-v4-4eeF3Vvb.js';
n(
  async () => {
    const { initKanban: n } = await import('./kanban-BXv1q1yH.js');
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

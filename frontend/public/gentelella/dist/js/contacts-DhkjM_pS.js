const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      './details-g6B9li-t.js',
      './main-v4-4eeF3Vvb.js',
      './toast-oOLbokEA.js',
      './rolldown-runtime-H_PjY6_i.js',
      '../assets/main-v4-DB_ReeJG.css'
    ])
) => i.map(i => d[i]);
import { t as a } from './main-v4-4eeF3Vvb.js';
var e = [
    [
      'Rameshwar Sharma',
      'RS',
      'primary',
      'Chief Manager (Materials) · IOCL Mathura',
      '1,420',
      '12',
      '34'
    ],
    [
      'Priya Venkatraman',
      'PV',
      'purple',
      'GM (Central Procurement) · MoPNG / EIL',
      '3,890',
      '24',
      '88'
    ],
    ['Harpreet Singh', 'HS', 'red', 'DGM (Maintenance) · ONGC Hazira Plant', '980', '8', '19'],
    [
      'S. K. Gupta',
      'SG',
      'primary',
      'Chief Materials Manager · IOCL Refineries HQ',
      '2,110',
      '15',
      '42'
    ],
    [
      'A. K. Mehta',
      'AM',
      'azure',
      'ED (Materials Mgmt) · ONGC Western Onshore',
      '1,850',
      '19',
      '56'
    ],
    [
      'Vikram Malhotra',
      'VM',
      'yellow',
      'DGM (Piping & Warehousing) · BPCL Mumbai',
      '1,140',
      '9',
      '21'
    ],
    [
      'Ananya Deshmukh',
      'AD',
      'green',
      'Senior Procurement Officer · HPCL Visakh',
      '760',
      '6',
      '14'
    ],
    [
      'Rajeev Nair',
      'RN',
      'blue',
      'Chief Manager (Pipeline Spares) · GAIL Vijaipur',
      '890',
      '11',
      '27'
    ],
    ['Bhaben Baruah', 'BB', 'primary', 'Head of Materials · OIL Duliajan Fields', '640', '5', '12']
  ],
  n = {
    primary: 'linear-gradient(135deg,#065f46,#047857)',
    azure: 'linear-gradient(135deg,#1d4ed8,#2563eb)',
    purple: 'linear-gradient(135deg,#581c87,#7e22ce)',
    yellow: 'linear-gradient(135deg,#854d0e,#a16207)',
    red: 'linear-gradient(135deg,#991b1b,#dc2626)',
    green: 'linear-gradient(135deg,#166534,#15803d)',
    blue: 'linear-gradient(135deg,#0e7490,#0284c7)'
  },
  t = document.getElementById('contacts-grid');
((t.innerHTML = e
  .map(
    ([a, e, t, r, i, s, d], o) =>
      `\n  <div class="contact-card" data-idx="${o}">\n    <div class="av" style="background:${n[t]}">${e}</div>\n    <div class="name">${a}</div>\n    <div class="role" style="font-size:12px;color:var(--text-secondary);text-align:center">${r}</div>\n    <div style="display:flex;gap:6px;justify-content:center;margin:12px 0">\n      <a href="tables.html" class="btn btn-outline btn-sm">Audit Trail</a>\n      <a href="/" class="btn btn-primary btn-sm">Steward Cockpit</a>\n    </div>\n    <div class="stats">\n      <div><strong>${i}</strong>Harmonized</div>\n      <div><strong>${s}</strong>Pending HITL</div>\n      <div><strong>${d}</strong>MTIRF Loans</div>\n    </div>\n  </div>\n`
  )
  .join('')),
  a(
    async () => {
      const { openContactModal: a } = await import('./details-g6B9li-t.js');
      return { openContactModal: a };
    },
    __vite__mapDeps([0, 1, 2, 3, 4]),
    import.meta.url
  ).then(({ openContactModal: a }) => {
    t.addEventListener('click', n => {
      const t = n.target.closest('.contact-card');
      if (!t) return;
      const r = parseInt(t.dataset.idx, 10),
        i = e[r];
      if (!i) return;
      const s = n.target.closest('[data-action]')?.dataset.action,
        [d, o, l, c, g, m, p] = i;
      ('message' !== s && 'view' !== s && n.target.closest('a')) ||
        (n.preventDefault(),
        a({ name: d, ini: o, color: l, role: c, projects: g, tasks: m, msgs: p }));
    });
  }));

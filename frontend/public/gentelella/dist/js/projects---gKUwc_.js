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
import { t as e } from './main-v4-4eeF3Vvb.js';
var n = [
    [
      'ONMC Tokenization Migration',
      'Dept of Commerce',
      'On track',
      'green',
      'Migrate 2.5M legacy material records to the new ONMC token standard with zero data loss.',
      78,
      'Apr 30',
      ['SK', 'MR', 'EW']
    ],
    [
      'CVC Supply Chain Trace',
      'Global Logistics',
      'At risk',
      'yellow',
      'End-to-end audit chain integration to eliminate counterfeit materials in transit.',
      42,
      'Jun 15',
      ['MK', 'LP', 'DR', 'YT']
    ],
    [
      'Unified Material Ontology',
      'Standards Board',
      'On track',
      'green',
      'Resolve 15,000+ classification conflicts to ensure perfect cross-border compliance.',
      91,
      'May 12',
      ['TH', 'MR']
    ],
    [
      'Defect Recall Automation',
      'Quality Control',
      'On track',
      'green',
      'Automated smart contracts to freeze compromised ONMC tokens within 7 seconds of a recall.',
      33,
      'May 28',
      ['LP', 'EW', 'SK']
    ],
    [
      'Legacy Gateway Sunset',
      'Internal',
      'Blocked',
      'red',
      'Decommission the vulnerable v1 API and force-migrate remaining 316 vendors to v2.',
      18,
      'Jul 02',
      ['DR', 'MK']
    ],
    [
      'ONMC Minting Engine v3',
      'Internal',
      'On track',
      'green',
      'Re-architect the core minting engine to support 10,000+ material tokens per second.',
      64,
      'May 20',
      ['SK', 'EW', 'LP', 'TH']
    ],
    [
      'Audit Chain Explorer',
      'Umbrella Co',
      'On hold',
      'yellow',
      'Public-facing portal for vendors to independently verify ONMC token provenance.',
      5,
      'TBD',
      ['YT', 'MR']
    ],
    [
      'SOC 2 Type II Prep',
      'Internal',
      'On track',
      'green',
      'Lock down all CVC endpoints and finalize compliance evidence for the Q3 external audit.',
      72,
      'Jun 30',
      ['DR', 'TH']
    ],
    [
      'Smart Pricing Oracle',
      'Tyrell Corp',
      'On track',
      'green',
      'Dynamic fee adjustment mechanism based on real-time audit chain network congestion.',
      50,
      'May 05',
      ['LP', 'MK']
    ]
  ],
  t = {
    primary: 'var(--primary)',
    azure: 'var(--azure)',
    purple: 'var(--purple)',
    yellow: 'var(--yellow)',
    red: 'var(--red)',
    green: 'var(--green)',
    blue: 'var(--blue)'
  },
  a = {
    SK: 'azure',
    MR: 'purple',
    EW: 'yellow',
    MK: 'red',
    LP: 'green',
    DR: 'blue',
    YT: 'primary',
    TH: 'purple'
  },
  r = { green: 'status-green', yellow: 'status-yellow', red: 'status-red' },
  i = document.getElementById('projects-grid');
((i.innerHTML = n
  .map(
    ([e, n, i, o, s, l, c, d], p) =>
      `\n  <button type="button" class="project-card" data-idx="${p}">\n    <div class="top">\n      <div>\n        <div class="title">${e}</div>\n        <div class="client">${n}</div>\n      </div>\n      <span class="status ${r[o]}">${i}</span>\n    </div>\n    <div class="desc">${s}</div>\n    <div>\n      <div style="display:flex;justify-content:space-between;font-size:11.5px;color:var(--text-muted);margin-bottom:4px">\n        <span>Progress</span><span class="cell-strong">${l}%</span>\n      </div>\n      <div class="progress-thin"><div class="bar" style="width:${l}%;background:var(--${'red' === o ? 'red' : 'yellow' === o ? 'yellow' : 'primary'})"></div></div>\n    </div>\n    <div class="footer-row">\n      <div class="avatars">\n        ${d.map(e => `<div class="av" style="background:${t[a[e] || 'primary']}">${e}</div>`).join('')}\n      </div>\n      <span>Due ${c}</span>\n    </div>\n  </button>\n`
  )
  .join('')),
  e(
    async () => {
      const { openProjectModal: e } = await import('./details-g6B9li-t.js');
      return { openProjectModal: e };
    },
    __vite__mapDeps([0, 1, 2, 3, 4]),
    import.meta.url
  ).then(({ openProjectModal: e }) => {
    i.addEventListener('click', t => {
      const a = t.target.closest('.project-card');
      if (!a) return;
      const r = parseInt(a.dataset.idx, 10),
        i = n[r];
      if (!i) return;
      const [o, s, l, c, d, p, v, u] = i;
      e({ title: o, client: s, status: l, sCls: c, desc: d, pct: p, due: v, members: u });
    });
  }));

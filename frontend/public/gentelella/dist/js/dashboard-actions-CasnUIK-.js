import { r as t } from './main-v4-BiwepG9u.js';
import { t as e } from './toast-oOLbokEA.js';
function o(t, e, o, n) {
  ((t.disabled = 'running' === o),
    t.setAttribute('aria-busy', String('running' === o)),
    t.classList.toggle('is-running', 'running' === o),
    (t.lastChild.textContent = 'running' === o ? ' Harmonizing…' : ' Run Harmonization'),
    (e.textContent = n));
}
function n() {
  const n = document.querySelector('[data-dashboard-run]'),
    r = document.querySelector('[data-dashboard-import]'),
    a = document.querySelector('#dashboard-run-status');
  n &&
    r &&
    a &&
    'true' !== n.dataset.wired &&
    ((n.dataset.wired = 'true'),
    n.addEventListener('click', () =>
      (function (t, n) {
        t.disabled ||
          (o(t, n, 'running', 'Validating 2,418 queued material records…'),
          window.setTimeout(() => {
            n.textContent = 'Normalizing material attributes and safety gates…';
          }, 500),
          window.setTimeout(() => {
            (o(t, n, 'idle', 'Completed just now'),
              e('Harmonization complete: 2,418 records processed and 186 review items queued.', {
                variant: 'success'
              }));
          }, 1250));
      })(n, a)
    ),
    r.addEventListener('click', () =>
      (function (o) {
        t({
          title: 'Import catalog codes',
          body: '\n      <div class="form-group">\n        <label class="form-label" for="numm-catalog-file">Catalog file</label>\n        <input id="numm-catalog-file" class="form-control" type="file" accept=".csv,.json,.xlsx">\n        <div class="form-help">CSV, JSON, or XLSX exports from a CPSE ERP catalog.</div>\n      </div>\n      <div class="form-group" style="margin-bottom:0">\n        <label class="form-label" for="numm-source-org">Source CPSE</label>\n        <select id="numm-source-org" class="form-control">\n          <option>ONGC</option><option>IOCL</option><option>BPCL</option><option>HPCL</option><option>GAIL</option>\n        </select>\n      </div>\n      <div class="form-help" data-import-error role="alert"></div>\n    ',
          actions: [
            { label: 'Cancel', variant: 'ghost' },
            {
              label: 'Queue import',
              variant: 'primary',
              action: ({ body: t }) => {
                const n = t.querySelector('#numm-catalog-file')?.files?.[0],
                  r = t.querySelector('[data-import-error]');
                if (!n)
                  return ((r.textContent = 'Choose a catalog file before queuing the import.'), !1);
                const a = t.querySelector('#numm-source-org')?.value || 'CPSE';
                ((o.textContent = `${n.name} queued for ${a}`),
                  e(`${n.name} queued for harmonization.`, { variant: 'success' }));
              }
            }
          ]
        });
      })(a)
    ));
}
export { n as initDashboardActions };

// NUMM dashboard actions — catalog intake and the demonstrable harmonization run.
// Kept page-local so other Gentelella example pages do not inherit NUMM behaviour.

import { showModal } from './modal.js';
import { showToast } from './toast.js';

function setRunState(button, status, state, message) {
  button.disabled = state === 'running';
  button.setAttribute('aria-busy', String(state === 'running'));
  button.classList.toggle('is-running', state === 'running');
  button.lastChild.textContent = state === 'running' ? ' Harmonizing…' : ' Run Harmonization';
  status.textContent = message;
}

function startHarmonization(button, status) {
  if (button.disabled) {
    return;
  }

  setRunState(button, status, 'running', 'Validating 2,418 queued material records…');
  window.setTimeout(() => {
    status.textContent = 'Normalizing material attributes and safety gates…';
  }, 500);
  window.setTimeout(() => {
    setRunState(button, status, 'idle', 'Completed just now');
    showToast('Harmonization complete: 2,418 records processed and 186 review items queued.', {
      variant: 'success'
    });
  }, 1250);
}

function openImportDialog(status) {
  showModal({
    title: 'Import catalog codes',
    body: `
      <div class="form-group">
        <label class="form-label" for="numm-catalog-file">Catalog file</label>
        <input id="numm-catalog-file" class="form-control" type="file" accept=".csv,.json,.xlsx">
        <div class="form-help">CSV, JSON, or XLSX exports from a CPSE ERP catalog.</div>
      </div>
      <div class="form-group" style="margin-bottom:0">
        <label class="form-label" for="numm-source-org">Source CPSE</label>
        <select id="numm-source-org" class="form-control">
          <option>ONGC</option><option>IOCL</option><option>BPCL</option><option>HPCL</option><option>GAIL</option>
        </select>
      </div>
      <div class="form-help" data-import-error role="alert"></div>
    `,
    actions: [
      { label: 'Cancel', variant: 'ghost' },
      {
        label: 'Queue import',
        variant: 'primary',
        action: ({ body }) => {
          const file = body.querySelector('#numm-catalog-file')?.files?.[0];
          const error = body.querySelector('[data-import-error]');
          if (!file) {
            error.textContent = 'Choose a catalog file before queuing the import.';
            return false;
          }
          const organization = body.querySelector('#numm-source-org')?.value || 'CPSE';
          status.textContent = `${file.name} queued for ${organization}`;
          showToast(`${file.name} queued for harmonization.`, { variant: 'success' });
        }
      }
    ]
  });
}

export function initDashboardActions() {
  const runButton = document.querySelector('[data-dashboard-run]');
  const importButton = document.querySelector('[data-dashboard-import]');
  const status = document.querySelector('#dashboard-run-status');
  if (!runButton || !importButton || !status || runButton.dataset.wired === 'true') {
    return;
  }

  runButton.dataset.wired = 'true';
  runButton.addEventListener('click', () => startHarmonization(runButton, status));
  importButton.addEventListener('click', () => openImportDialog(status));
}

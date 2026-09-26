import './main-v4-4eeF3Vvb.js';
import { t } from './toast-oOLbokEA.js';
var e = [
    {
      desc: '2" Class 150 Ball Valve ASTM A105',
      sub: 'ONMC-MECH-VLV-BAL-002-150-A105-9B2F · API 6D RF',
      qty: 4,
      rate: 28500
    },
    {
      desc: '6" Class 150 Weld Neck Flange A105',
      sub: 'ONMC-MECH-FLG-WNF-006-150-A105-8D3E · SCH 40 B16.5',
      qty: 8,
      rate: 14500
    },
    {
      desc: '2" Class 150 Spiral Wound Gasket SS316L',
      sub: 'ONMC-MECH-GSK-SPW-002-150-SS316-2F9A · B16.20',
      qty: 20,
      rate: 1200
    },
    {
      desc: 'Inter-CPSE Insured Logistics & Preservation',
      sub: 'Dedicated Hazira to Mathura Transit · MoPNG Rates',
      qty: 1,
      rate: 18e3
    }
  ],
  n = t => '₹' + t.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 }),
  a = document.getElementById('line-items');
function s(t, e) {
  return `\n    <div class="line-row" data-i="${e}">\n      <div class="desc-wrap">\n        <input type="text" class="desc" value="${t.desc.replace(/"/g, '&quot;')}" placeholder="Item description" aria-label="Item description">\n        <input type="text" class="desc desc-sub" value="${t.sub.replace(/"/g, '&quot;')}" placeholder="Optional details" aria-label="Item details">\n      </div>\n      <input type="number" class="qty" aria-label="Quantity" value="${t.qty}" min="0" step="1">\n      <input type="number" class="rate" aria-label="Rate" value="${t.rate}" min="0" step="0.01">\n      <div class="amount">${n(t.qty * t.rate)}</div>\n      <button type="button" class="remove-btn" aria-label="Remove">\n        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h10M8 6V4a1.5 1.5 0 013 0v2"/><path d="M5 6l1 8.5h6L13 6"/></svg>\n      </button>\n    </div>\n  `;
}
function i() {
  ((a.innerHTML = e.map(s).join('')), l());
}
function l() {
  let t = 0;
  document.querySelectorAll('#line-items .line-row').forEach((a, s) => {
    const i = parseFloat(a.querySelector('.qty').value) || 0,
      l = parseFloat(a.querySelector('.rate').value) || 0,
      o = i * l;
    ((a.querySelector('.amount').textContent = n(o)),
      (t += o),
      e[s] &&
        ((e[s].qty = i),
        (e[s].rate = l),
        (e[s].desc = a.querySelector('.desc:not(.desc-sub)').value),
        (e[s].sub = a.querySelector('.desc-sub').value)));
  });
  const a = parseFloat(document.getElementById('t-discount').value) || 0,
    s = parseFloat(document.getElementById('t-tax').value) || 0,
    i = (t * a) / 100,
    l = t - i,
    o = (l * s) / 100,
    r = l + o;
  ((document.getElementById('t-subtotal').textContent = n(t)),
    (document.getElementById('t-discount-amount').textContent = '−' + n(i)),
    (document.getElementById('t-tax-amount').textContent = n(o)),
    (document.getElementById('t-grand').textContent = n(r)));
}
(a.addEventListener('input', l),
  a.addEventListener('click', t => {
    const n = t.target.closest('.remove-btn');
    if (!n) return;
    const a = n.closest('.line-row'),
      s = parseInt(a.dataset.i, 10);
    (e.splice(s, 1), i());
  }),
  document.getElementById('add-line').addEventListener('click', () => {
    (e.push({ desc: 'New item', sub: '', qty: 1, rate: 0 }), i());
    const t = a.querySelector('.line-row:last-child .desc');
    t && (t.focus(), t.select());
  }),
  document.getElementById('t-discount').addEventListener('input', l),
  document.getElementById('t-tax').addEventListener('input', l));
var o = document.getElementById('status-pill'),
  r = document.getElementById('ips-paid'),
  d = document.getElementById('mark-paid-btn'),
  c = !1;
(d.addEventListener('click', () => {
  (c = !c)
    ? ((o.className = 'status status-green'),
      (o.textContent = 'Paid'),
      r.classList.add('paid'),
      (r.querySelector('.ips-time').textContent = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })),
      (d.textContent = 'Mark unpaid'),
      t('Marked as paid', { variant: 'success' }))
    : ((o.className = 'status status-yellow'),
      (o.textContent = 'Pending'),
      r.classList.remove('paid'),
      (r.querySelector('.ips-time').textContent = '—'),
      (d.textContent = 'Mark as paid'),
      t('Marked unpaid'));
}),
  i());

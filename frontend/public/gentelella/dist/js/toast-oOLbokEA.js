import { t } from './rolldown-runtime-H_PjY6_i.js';
var e,
  s = t({ showToast: () => n });
function n(t, s = {}) {
  const { variant: n = 'default', duration: o = 2600 } = s,
    a = document.createElement('div');
  ((a.className = `toast toast-${n}`),
    (a.textContent = t),
    ((e && e.isConnected) ||
      (((e = document.createElement('div')).className = 'toast-host'),
      e.setAttribute('role', 'status'),
      e.setAttribute('aria-live', 'polite'),
      document.body.appendChild(e)),
    e).appendChild(a),
    a.getBoundingClientRect(),
    a.classList.add('show'));
  const i = () => {
    (a.classList.remove('show'),
      a.addEventListener('transitionend', () => a.remove(), { once: !0 }));
  };
  return (setTimeout(i, o), a.addEventListener('click', i), a);
}
export { s as n, n as t };

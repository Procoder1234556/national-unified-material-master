import './main-v4-4eeF3Vvb.js';
var t = {
    primary: 'var(--primary)',
    azure: 'var(--azure)',
    purple: 'var(--purple)',
    yellow: 'var(--yellow)',
    red: 'var(--red)',
    green: 'var(--green)',
    blue: 'var(--blue)'
  },
  e = document.getElementById('orders-rows');
function n(e) {
  const n =
    e.desc && e.desc.length > 2
      ? (r = e.desc).length > 60
        ? r.slice(0, 59) + '&hellip;'
        : r
      : 'No description provided';
  var r;
  return `\n    <tr>\n      <td class="cell-mono"><a href="#" style="color:var(--primary);font-weight:var(--font-weight-medium)">${e.id}</a></td>\n      <td><div class="cell-customer"><div class="cell-avatar" style="background:${t[e.avatarColor] || 'var(--primary)'}">${e.initials}</div><span class="cell-strong text-dark" style="cursor:pointer">${e.name}</span></div></td>\n      <td style="max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${e.desc}">${n}</td>\n      <td class="cell-strong">${(function (
    t,
    e = 2
  ) {
    if (!+t) return '0 Bytes';
    const n = 0 > e ? 0 : e,
      r = Math.floor(Math.log(t) / Math.log(1024));
    return `${parseFloat((t / Math.pow(1024, r)).toFixed(n))} ${['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][r]}`;
  })(
    e.size
  )}</td>\n      <td>${e.createdAt}</td>\n      <td><button class="card-opt-btn" aria-label="More"><svg viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="3" r="1.2"/><circle cx="8" cy="8" r="1.2"/><circle cx="8" cy="13" r="1.2"/></svg></button></td>\n    </tr>`;
}
!(async function t() {
  e.innerHTML = (function (t = 5) {
    return Array.from(
      { length: t },
      () =>
        `<tr>${'<td><span class="skeleton skeleton-text" style="width:80%"></span></td>'.repeat(6)}</tr>`
    ).join('');
  })();
  try {
    const t = await fetch('skills_data.json');
    if (!t.ok) throw new Error('Failed to fetch skills data');
    const r = await t.json();
    if (
      ((document.getElementById('stat-total-skills').innerText = r.length),
      (document.getElementById('stat-agents-skills').innerText = r.filter(t =>
        t.path.includes('.agents')
      ).length),
      (document.getElementById('stat-gemini-skills').innerText = r.filter(t =>
        t.path.includes('.gemini')
      ).length),
      !r.length)
    )
      return void (e.innerHTML =
        '<tr><td colspan="6" style="padding:40px;text-align:center;color:var(--text-muted)">No skills found.</td></tr>');
    e.innerHTML = r.map(n).join('');
  } catch (r) {
    ((e.innerHTML = `\n      <tr><td colspan="6" style="padding:24px">\n        <div class="banner banner-danger">\n          <svg class="banner-icon" width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M5 5l6 6M11 5l-6 6"/></svg>\n          <div class="banner-body"><strong>Failed to load skills.</strong> ${r.message || r}</div>\n          <div class="banner-actions"><button class="btn btn-outline btn-sm" id="orders-retry">Retry</button></div>\n        </div>\n      </td></tr>`),
      document.getElementById('orders-retry')?.addEventListener('click', t));
  }
})();

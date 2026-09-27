import { r as e } from './main-v4-CKNFKWc8.js';
import { t } from './toast-oOLbokEA.js';
var a = class extends Error {
    constructor(e, t) {
      (super(`HTTP ${e}: ${t}`), (this.name = 'HttpError'), (this.status = e));
    }
  },
  n = 1;
function r(e) {
  return {
    id: 'msg-' + n++,
    folder: e.folder,
    trashed: !!e.trashed,
    unread: !!e.unread,
    starred: !!e.starred,
    label: e.label || null,
    from: e.from,
    fromEmail: e.fromEmail || '',
    to: e.to || '',
    subject: e.subject || '(no subject)',
    preview: e.preview || '',
    body: e.body || '',
    time: e.time
  };
}
var s = {
    messages: [
      r({
        folder: 'inbox',
        unread: !0,
        starred: !0,
        label: 'stewardship',
        from: 'Priya Sharma',
        fromEmail: 'priya.sharma@numm.gov.in',
        subject: 'Review needed: ONGC valve-code matches',
        preview: 'Twelve valve records need confirmation before ONMC minting.',
        body: 'Hello,\n\nTwelve ONGC valve records have competing legacy-code matches. Please confirm the preferred material and pressure-class mappings before ONMC codes are minted.\n\nPriya',
        time: '9:42 AM'
      }),
      r({
        folder: 'inbox',
        unread: !0,
        starred: !1,
        label: 'catalog',
        from: 'Catalog Sync',
        fromEmail: 'sync@numm.gov.in',
        subject: 'BPCL legacy-code import completed',
        preview: '18,604 source records were normalized and queued for matching.',
        body: 'The BPCL legacy-code import has completed.\n\n18,604 source records were normalized and queued for semantic matching. 247 records were set aside for mandatory-attribute review.\n\nOpen the stewardship queue to continue.',
        time: '8:14 AM'
      }),
      r({
        folder: 'inbox',
        unread: !0,
        starred: !1,
        label: 'compliance',
        from: 'Safety Gate',
        fromEmail: 'safety@numm.gov.in',
        subject: 'Three metallurgy conflicts need disposition',
        preview: 'NACE MR0175 conflicts are blocking automatic approval.',
        body: 'Three material records contain metallurgy conflicts against NACE MR0175 requirements.\n\nAutomatic approval is paused until a nominated steward records a disposition and supporting evidence.',
        time: '7:30 AM'
      }),
      r({
        folder: 'inbox',
        unread: !1,
        starred: !1,
        label: 'catalog',
        from: 'Ravi Menon',
        fromEmail: 'ravi.menon@bpcl.in',
        subject: 'Updated bearing specification sheet',
        preview: 'The revised sheet resolves the open dimensional attributes.',
        body: 'Hello,\n\nThe updated bearing specification sheet resolves the open dimensional attributes for the BPCL batch. Please use revision 4 for the remaining review items.\n\nRavi',
        time: 'Yesterday'
      }),
      r({
        folder: 'inbox',
        unread: !1,
        starred: !0,
        label: 'stewardship',
        from: 'Anita Krishnan',
        fromEmail: 'anita.krishnan@numm.gov.in',
        subject: 'Stewardship handoff notes',
        preview: 'The pressure-rating and UOM review lanes have new owners.',
        body: 'The stewardship handoff is complete.\n\n1. Pressure-rating conflicts are assigned to the mechanical review lane.\n2. UOM normalization is assigned to the catalog quality lane.\n3. Evidence gaps remain with the originating CPSE.\n\nAnita',
        time: 'Yesterday'
      }),
      r({
        folder: 'inbox',
        unread: !1,
        starred: !1,
        label: 'priority',
        from: 'Stewardship Queue',
        fromEmail: 'queue@numm.gov.in',
        subject: 'Three priority review items assigned',
        preview: 'Pressure class, alloy grade, and procurement UOM require review.',
        body: 'Three priority review items are assigned to you:\n\n1. Confirm pressure class for an ONGC isolation valve.\n2. Resolve alloy grade for an IOCL fitting.\n3. Validate procurement UOM for a GAIL pipe item.\n\nOpen the stewardship queue to record decisions.',
        time: 'Tue'
      }),
      r({
        folder: 'inbox',
        unread: !1,
        starred: !1,
        label: 'catalog',
        from: 'Catalog Sync',
        fromEmail: 'sync@numm.gov.in',
        subject: 'ONGC plant master synchronization completed',
        preview: 'The latest plant, location, and maintenance-status data is available.',
        body: 'The ONGC plant master synchronization completed successfully.\n\nUpdated plant, location, and maintenance-status attributes are now available to the catalog matching workflow.',
        time: 'Tue'
      }),
      r({
        folder: 'inbox',
        unread: !1,
        starred: !1,
        label: 'compliance',
        from: 'CVC Audit Team',
        fromEmail: 'audit@numm.gov.in',
        subject: 'Monthly evidence pack is ready',
        preview: 'The September stewardship decisions and source evidence are compiled.',
        body: 'The September evidence pack is ready for review.\n\nIt includes stewardship decisions, source-code lineage, approval evidence, and exception dispositions for the current harmonization cycle.',
        time: 'Mon'
      }),
      r({
        folder: 'inbox',
        unread: !1,
        starred: !1,
        label: 'stewardship',
        from: 'Ontology Governance',
        fromEmail: 'governance@numm.gov.in',
        subject: 'Valve family mapping updated',
        preview: 'The new mapping is ready for steward review before activation.',
        body: 'A revised valve family mapping is ready for review.\n\nThe update separates gate, globe, ball, and check-valve attributes and preserves the legacy-code lineage required for audit.',
        time: 'Apr 23'
      }),
      r({
        folder: 'inbox',
        unread: !1,
        starred: !1,
        label: 'catalog',
        from: 'Arun Verma',
        fromEmail: 'arun.verma@hpcl.in',
        subject: 'Surplus-stock evidence verified',
        preview: 'The attached stock records are eligible for the sharing workflow.',
        body: 'The surplus-stock evidence for the listed rotating-equipment spares has been verified.\n\nThe records are eligible for the Search Before Buy workflow after final catalog linkage is confirmed.\n\nArun',
        time: 'Apr 22'
      }),
      r({
        folder: 'inbox',
        unread: !1,
        starred: !1,
        label: 'catalog',
        from: 'CPSE Onboarding',
        fromEmail: 'onboarding@numm.gov.in',
        subject: 'GAIL source extract received',
        preview: 'The extract passed file validation and is ready for profiling.',
        body: 'The GAIL source extract passed file validation.\n\nThe profiling job will identify code patterns, missing attributes, and duplicate records before harmonization begins.',
        time: 'Apr 20'
      }),
      r({
        folder: 'inbox',
        unread: !1,
        starred: !1,
        label: 'priority',
        from: 'Safety Gate',
        fromEmail: 'safety@numm.gov.in',
        subject: 'Action required: approve exception disposition',
        preview: 'A pressure-temperature conflict awaits your decision.',
        body: 'A pressure-temperature conflict is awaiting your decision.\n\nReview the submitted evidence and record an approval or rejection so the affected item can proceed through the audit trail.',
        time: 'Apr 19'
      }),
      r({
        folder: 'sent',
        unread: !1,
        starred: !1,
        label: 'stewardship',
        from: 'Me',
        to: 'priya.sharma@numm.gov.in',
        subject: 'Re: ONGC valve-code matches',
        preview: 'I will complete the assigned review lane today.',
        body: 'Priya,\n\nI will complete the assigned valve-code reviews today and attach supporting evidence for each decision.\n\nNUMM Steward',
        time: 'Yesterday'
      }),
      r({
        folder: 'sent',
        unread: !1,
        starred: !1,
        label: 'catalog',
        from: 'Me',
        to: 'catalog-ops@numm.gov.in',
        subject: 'Weekly harmonization status',
        preview: 'The current batch is on track, with exceptions routed to stewards.',
        body: 'Catalog operations,\n\nThe current harmonization batch is on track. Exceptions have been routed to the appropriate stewardship lanes and the audit trail is current.\n\nNUMM Steward',
        time: 'Mon'
      }),
      r({
        folder: 'sent',
        unread: !1,
        starred: !1,
        label: 'compliance',
        from: 'Me',
        to: 'audit@numm.gov.in',
        subject: 'Re: September evidence pack',
        preview: 'The outstanding exception dispositions will be completed today.',
        body: 'The outstanding exception dispositions will be completed today. The completed evidence pack can then be marked ready for audit review.',
        time: 'Yesterday'
      }),
      r({
        folder: 'drafts',
        unread: !1,
        starred: !1,
        label: null,
        from: 'Me',
        to: 'governance@numm.gov.in',
        subject: 'Re: valve family mapping',
        preview: 'I need to confirm the legacy-code treatment before activation.',
        body: 'Before activation, please confirm that the legacy-code lineage will remain visible in the audit export for each new valve family mapping.',
        time: 'Today'
      }),
      r({
        folder: 'drafts',
        unread: !1,
        starred: !1,
        label: null,
        from: 'Me',
        to: '',
        subject: '',
        preview: '',
        body: '',
        time: 'Today'
      }),
      r({
        folder: 'drafts',
        unread: !1,
        starred: !1,
        label: null,
        from: 'Me',
        to: 'arun.verma@hpcl.in',
        subject: 'Re: surplus-stock evidence',
        preview: '',
        body: '',
        time: 'Apr 22'
      }),
      r({
        folder: 'trash',
        trashed: !0,
        unread: !1,
        starred: !1,
        label: 'catalog',
        from: 'Catalog Sync',
        fromEmail: 'sync@numm.gov.in',
        subject: 'Superseded source extract',
        preview: 'This older source extract was replaced by the corrected CPSE file.',
        body: 'This source extract was superseded by a corrected CPSE submission and retained only for lineage. Do not use it for new harmonization runs.',
        time: 'Apr 18'
      })
    ].slice(),
    view: 'inbox',
    selectedId: null,
    query: ''
  },
  o = [
    {
      key: 'inbox',
      label: 'Inbox',
      icon: '<path d="M2 6l6 4 6-4"/><rect x="2" y="4" width="12" height="9" rx="1.5"/>'
    },
    { key: 'sent', label: 'Sent', icon: '<path d="M2 14L14 2M14 2H6M14 2v8"/>' },
    { key: 'drafts', label: 'Drafts', icon: '<path d="M3 3h10v10H3zM6 7l2 2 2-2"/>' },
    {
      key: 'starred',
      label: 'Starred',
      icon: '<path d="M8 1l2 5 5 .5-4 3.5 1 5-4-2.5-4 2.5 1-5-4-3.5 5-.5z"/>'
    },
    { key: 'trash', label: 'Trash', icon: '<path d="M3 5h10l-1 9H4z"/><path d="M5 5V3h6v2"/>' }
  ],
  i = [
    { key: 'catalog', label: 'Catalog', color: 'var(--primary)' },
    { key: 'stewardship', label: 'Stewardship', color: 'var(--blue)' },
    { key: 'compliance', label: 'Compliance', color: 'var(--yellow)' },
    { key: 'priority', label: 'Priority', color: 'var(--red)' }
  ];
function d(e) {
  if ('inbox' === s.view) return 'inbox' === e.folder && !e.trashed;
  if ('sent' === s.view) return 'sent' === e.folder && !e.trashed;
  if ('drafts' === s.view) return 'drafts' === e.folder && !e.trashed;
  if ('starred' === s.view) return e.starred && !e.trashed;
  if ('trash' === s.view) return e.trashed;
  if (s.view.startsWith('label:')) {
    const t = s.view.slice(6);
    return e.label === t && !e.trashed;
  }
  return !1;
}
function l(e) {
  if (!s.query) return !0;
  const t = s.query.toLowerCase();
  return (
    e.subject.toLowerCase().includes(t) ||
    e.body.toLowerCase().includes(t) ||
    e.from.toLowerCase().includes(t) ||
    (e.to || '').toLowerCase().includes(t)
  );
}
function c() {
  return s.messages.filter(d).filter(l);
}
function u(e) {
  return s.messages.filter(t =>
    'inbox' === e
      ? 'inbox' === t.folder && !t.trashed && t.unread
      : 'starred' === e && t.starred && !t.trashed && t.unread
  ).length;
}
function b(e) {
  return s.messages.filter(t =>
    'inbox' === e
      ? 'inbox' === t.folder && !t.trashed
      : 'sent' === e
        ? 'sent' === t.folder && !t.trashed
        : 'drafts' === e
          ? 'drafts' === t.folder && !t.trashed
          : 'starred' === e
            ? t.starred && !t.trashed
            : 'trash' === e
              ? t.trashed
              : !!e.startsWith('label:') && t.label === e.slice(6) && !t.trashed
  ).length;
}
function m(e) {
  return String(e ?? '').replace(
    /[&<>"']/g,
    e => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[e]
  );
}
function p() {
  const e = document.getElementById('inbox-sidebar');
  e &&
    (e.innerHTML = `\n    ${o
      .map(e =>
        (e => {
          const t = o.find(t => t.key === e),
            a = 'inbox' === e || 'starred' === e ? u(e) : b(e);
          return `\n      <a class="inbox-folder${s.view === e ? ' active' : ''}" href="#" data-view="${e}">\n        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">${t.icon}</svg>\n        ${t.label}\n        ${a > 0 || 'inbox' === e ? `<span class="count">${a}</span>` : ''}\n      </a>\n    `;
        })(e.key)
      )
      .join('')}\n    <div class="inbox-sidebar-label">Labels</div>\n    ${i
      .map(e => {
        const t = b(`label:${e.key}`);
        return `\n        <a class="inbox-folder${s.view === `label:${e.key}` ? ' active' : ''}" href="#" data-view="label:${e.key}">\n          <span class="inbox-label-dot" style="background:${e.color}"></span>\n          ${e.label}\n          ${t > 0 ? `<span class="count">${t}</span>` : ''}\n        </a>\n      `;
      })
      .join('')}\n  `);
}
function v() {
  const e = document.getElementById('inbox-list');
  if (!e) return;
  const t = c();
  e.innerHTML = t.length
    ? t
        .map(
          e =>
            `\n    <div class="inbox-item${e.unread ? ' unread' : ''}${e.id === s.selectedId ? ' selected' : ''}" data-id="${e.id}" role="option" aria-selected="${e.id === s.selectedId}" tabindex="0">\n      <button type="button" class="inbox-star-btn" data-star="${e.id}" aria-label="${e.starred ? 'Unstar' : 'Star'}" aria-pressed="${e.starred}">\n        <svg class="star ${e.starred ? 'on' : ''}" viewBox="0 0 16 16" fill="${e.starred ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5"><path d="M8 1l2 5 5 .5-4 3.5 1 5-4-2.5-4 2.5 1-5-4-3.5 5-.5z"/></svg>\n      </button>\n      <div class="inbox-item-body">\n        <div class="sender">${m('sent' === e.folder || 'drafts' === e.folder ? `To: ${e.to || '(no recipient)'}` : e.from)}</div>\n        <div class="subject">${m(e.subject)}${e.label ? `<span class="inbox-label-pill" data-label="${e.label}">${m(e.label)}</span>` : ''}</div>\n        <div class="preview">${m(e.preview || e.body.split('\n')[0] || '')}</div>\n      </div>\n      <div class="meta">${m(e.time)}</div>\n    </div>\n  `
        )
        .join('')
    : `\n      <div class="empty-state">\n        <div class="empty-state-icon">\n          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 8l9 6 9-6"/></svg>\n        </div>\n        <div class="empty-state-title">${s.query ? 'No matches' : 'Nothing here'}</div>\n        <div class="empty-state-text">${s.query ? 'Try a different search term.' : 'New messages will appear here.'}</div>\n      </div>\n    `;
}
function f() {
  const e = document.getElementById('inbox-reader');
  if (!e) return;
  const t = s.messages.find(e => e.id === s.selectedId);
  var a;
  e.innerHTML = t
    ? `\n    <div class="inbox-reader-toolbar">\n      <button type="button" class="btn btn-outline btn-sm" data-action="back" aria-label="Back to list">\n        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 3L4 8l6 5"/></svg>\n      </button>\n      ${'drafts' === t.folder ? '\n        <button type="button" class="btn btn-primary btn-sm" data-action="edit-draft">Edit draft</button>\n      ' : '\n        <button type="button" class="btn btn-outline btn-sm" data-action="reply">Reply</button>\n        <button type="button" class="btn btn-outline btn-sm" data-action="forward">Forward</button>\n      '}\n      <div class="inbox-reader-spacer"></div>\n      <button type="button" class="btn btn-ghost btn-sm" data-action="star" aria-pressed="${t.starred}">\n        <svg width="14" height="14" viewBox="0 0 16 16" fill="${t.starred ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.5"><path d="M8 1l2 5 5 .5-4 3.5 1 5-4-2.5-4 2.5 1-5-4-3.5 5-.5z"/></svg>\n        ${t.starred ? 'Starred' : 'Star'}\n      </button>\n      ${t.trashed ? '\n        <button type="button" class="btn btn-ghost btn-sm" data-action="restore">Restore</button>\n        <button type="button" class="btn btn-danger btn-sm" data-action="delete-forever">Delete forever</button>\n      ' : '\n        <button type="button" class="btn btn-ghost btn-sm" data-action="trash" aria-label="Move to trash">\n          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 5h10l-1 9H4z"/><path d="M5 5V3h6v2"/></svg>\n        </button>\n      '}\n    </div>\n    <div class="inbox-reader-content">\n      <h2 class="inbox-reader-subject">${m(t.subject)}</h2>\n      <div class="inbox-reader-meta">\n        <div class="inbox-reader-avatar" style="background:${(function (
        e
      ) {
        const t = [
          'var(--primary)',
          'var(--blue)',
          'var(--purple)',
          'var(--yellow)',
          'var(--green)',
          'var(--cyan)',
          'var(--pink)',
          'var(--orange)'
        ];
        let a = 0;
        for (let n = 0; e.length > n; n += 1) a = (31 * a + e.charCodeAt(n)) >>> 0;
        return t[a % t.length];
      })(t.from)}">${
        ((a = t.from),
        a
          ? a
              .trim()
              .split(/\s+/)
              .slice(0, 2)
              .map(e => e[0])
              .join('')
              .toUpperCase()
          : '?')
      }</div>\n        <div class="inbox-reader-meta-text">\n          <div><strong>${m(t.from)}</strong>${t.fromEmail ? ` <span class="inbox-reader-email">&lt;${m(t.fromEmail)}&gt;</span>` : ''}</div>\n          <div class="inbox-reader-to">${t.to ? `to ${m(t.to)}` : ''}</div>\n        </div>\n        <div class="inbox-reader-time">${m(t.time)}</div>\n      </div>\n      ${t.label ? `<div class="inbox-label-pill inbox-label-pill-lg" data-label="${t.label}">${m(t.label)}</div>` : ''}\n      <div class="inbox-reader-body">${m(t.body || '(empty draft)').replace(/\n/g, '<br>')}</div>\n    </div>\n  `
    : '\n      <div class="empty-state inbox-reader-empty">\n        <div class="empty-state-icon">\n          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 8l9 6 9-6"/></svg>\n        </div>\n        <div class="empty-state-title">Select a message</div>\n        <div class="empty-state-text">Click a message in the list to read it here.</div>\n      </div>\n    ';
}
function h() {
  (p(), v(), f(), y());
}
function y() {
  const e = document.getElementById('inbox-root');
  e && e.classList.toggle('reader-open', !!s.selectedId);
}
function g(e) {
  const t = s.messages.find(t => t.id === e);
  t && (t.unread && (t.unread = !1), (s.selectedId = e), p(), v(), f(), y(), $());
}
function w(e) {
  const t = s.messages.find(t => t.id === e);
  t && ((t.starred = !t.starred), p(), v(), s.selectedId === e && f());
}
function x(e) {
  const a = s.messages.find(t => t.id === e);
  a &&
    ((a.trashed = !0),
    s.selectedId === e && (s.selectedId = null),
    h(),
    t('Moved to Trash', { variant: 'success' }));
}
function k() {
  let e = 0;
  (s.messages.forEach(t => {
    d(t) && t.unread && ((t.unread = !1), (e += 1));
  }),
    p(),
    v(),
    $(),
    t(`Marked ${e} as read`));
}
function $() {
  const e = u('inbox');
  document.querySelectorAll('[data-inbox-count]').forEach(t => {
    t.textContent = e;
  });
}
function j(a = {}, n = null) {
  const o = document.createElement('div');
  ((o.className = 'compose-form'),
    (o.innerHTML = `\n    <div class="form-group">\n      <label class="form-label" for="compose-to">To</label>\n      <input type="email" id="compose-to" class="form-control" placeholder="recipient@example.com" value="${m(a.to || '')}" autocomplete="off">\n    </div>\n    <div class="form-group">\n      <label class="form-label" for="compose-subject">Subject</label>\n      <input type="text" id="compose-subject" class="form-control" placeholder="Subject" value="${m(a.subject || '')}" autocomplete="off">\n    </div>\n    <div class="form-group">\n      <label class="form-label" for="compose-body">Message</label>\n      <textarea id="compose-body" class="form-control" rows="8" placeholder="Write your message…">${m(a.body || '')}</textarea>\n    </div>\n  `));
  const i = () => ({
    to: o.querySelector('#compose-to').value.trim(),
    subject: o.querySelector('#compose-subject').value.trim(),
    body: o.querySelector('#compose-body').value
  });
  (e({
    title: n ? 'Edit draft' : 'New message',
    body: o,
    size: 'lg',
    actions: [
      {
        label: 'Discard',
        variant: 'ghost',
        action: () => {
          if (n) {
            const e = s.messages.findIndex(e => e.id === n.id);
            (0 > e || s.messages.splice(e, 1), s.selectedId === n.id && (s.selectedId = null), h());
          }
          t('Discarded');
        }
      },
      {
        label: 'Save draft',
        variant: 'outline',
        action: () => {
          const e = i();
          e.to || e.subject || e.body
            ? (n
                ? Object.assign(n, {
                    to: e.to,
                    subject: e.subject || '(no subject)',
                    body: e.body,
                    preview: e.body.split('\n')[0].slice(0, 140),
                    time: 'Just now'
                  })
                : s.messages.unshift(
                    r({
                      folder: 'drafts',
                      from: 'Me',
                      to: e.to,
                      subject: e.subject || '(no subject)',
                      preview: e.body.split('\n')[0].slice(0, 140),
                      body: e.body,
                      time: 'Just now'
                    })
                  ),
              h(),
              t('Draft saved', { variant: 'success' }))
            : t('Empty draft discarded');
        }
      },
      {
        label: 'Send',
        variant: 'primary',
        action: () => {
          const e = i();
          if (!e.to) return (t('Add a recipient', { variant: 'error' }), !1);
          if (n) {
            const e = s.messages.findIndex(e => e.id === n.id);
            (0 > e || s.messages.splice(e, 1), s.selectedId === n.id && (s.selectedId = null));
          }
          (s.messages.unshift(
            r({
              folder: 'sent',
              from: 'Me',
              to: e.to,
              subject: e.subject || '(no subject)',
              preview: e.body.split('\n')[0].slice(0, 140),
              body: e.body,
              time: 'Just now'
            })
          ),
            h(),
            t('Message sent', { variant: 'success' }));
        }
      }
    ]
  }),
    setTimeout(() => o.querySelector('#compose-to')?.focus(), 50));
}
function E(e) {
  j({
    to: e.fromEmail || e.from,
    subject: e.subject.startsWith('Re: ') ? e.subject : `Re: ${e.subject}`,
    body: `\n\n--- On ${e.time}, ${e.from} wrote:\n${e.body
      .split('\n')
      .map(e => `> ${e}`)
      .join('\n')}`
  });
}
async function M() {
  const e = document.getElementById('inbox-root');
  e &&
    ((function (e) {
      e.innerHTML =
        '\n    <div class="inbox-layout">\n      <aside class="inbox-sidebar" id="inbox-sidebar"></aside>\n      <div class="inbox-list-pane">\n        <div class="inbox-list-toolbar">\n          <input type="text" class="inbox-search" placeholder="Search this folder…" aria-label="Search messages">\n          <button type="button" class="btn btn-outline btn-sm" id="inbox-mark-read">Mark all read</button>\n        </div>\n        <div class="inbox-list" id="inbox-list" role="listbox" aria-label="Messages"></div>\n      </div>\n      <div class="inbox-reader" id="inbox-reader"></div>\n    </div>\n  ';
    })(e),
    (function (e) {
      (e.addEventListener('click', e => {
        const t = e.target.closest('[data-view]');
        t &&
          (e.preventDefault(),
          (function (e) {
            ((s.view = e), (s.selectedId = null), (s.query = ''));
            const t = document.querySelector('.inbox-search');
            (t && (t.value = ''), h());
          })(t.dataset.view));
      }),
        e.addEventListener('click', e => {
          const t = e.target.closest('[data-star]');
          if (t) return (e.stopPropagation(), void w(t.dataset.star));
          const a = e.target.closest('.inbox-item');
          a && g(a.dataset.id);
        }),
        e.addEventListener('click', e => {
          const a = e.target.closest('[data-action]');
          if (!a || !a.dataset.action) return;
          const n = s.messages.find(e => e.id === s.selectedId);
          switch (a.dataset.action) {
            case 'back':
              ((s.selectedId = null), v(), f(), y());
              break;
            case 'reply':
              n && E(n);
              break;
            case 'forward':
              n &&
                (function (e) {
                  j({
                    to: '',
                    subject: e.subject.startsWith('Fwd: ') ? e.subject : `Fwd: ${e.subject}`,
                    body: `\n\n--- Forwarded message ---\nFrom: ${e.from}${e.fromEmail ? ` <${e.fromEmail}>` : ''}\nDate: ${e.time}\nSubject: ${e.subject}\n\n${e.body}`
                  });
                })(n);
              break;
            case 'edit-draft':
              n &&
                j(
                  {
                    to: n.to,
                    subject: '(no subject)' === n.subject ? '' : n.subject,
                    body: n.body
                  },
                  n
                );
              break;
            case 'star':
              n && w(n.id);
              break;
            case 'trash':
              n && x(n.id);
              break;
            case 'restore':
              n &&
                (function (e) {
                  const a = s.messages.find(t => t.id === e);
                  a && ((a.trashed = !1), h(), t('Restored', { variant: 'success' }));
                })(n.id);
              break;
            case 'delete-forever':
              n &&
                (function (e) {
                  const a = s.messages.findIndex(t => t.id === e);
                  0 > a ||
                    (s.messages.splice(a, 1),
                    s.selectedId === e && (s.selectedId = null),
                    h(),
                    t('Deleted forever', { variant: 'success' }));
                })(n.id);
          }
        }),
        e.addEventListener('input', e => {
          e.target.matches('.inbox-search') && ((s.query = e.target.value.trim()), v());
        }),
        e.addEventListener('click', e => {
          e.target.closest('#inbox-mark-read') && k();
        }),
        document.querySelectorAll('.page-actions .btn').forEach(e => {
          const t = e.textContent.trim().toLowerCase();
          'mark all read' === t
            ? e.addEventListener('click', e => {
                (e.preventDefault(), k());
              })
            : 'compose' === t &&
              e.addEventListener('click', e => {
                (e.preventDefault(), j());
              });
        }),
        document.addEventListener('keydown', e => {
          if (!document.getElementById('inbox-root')) return;
          if (e.target.matches('input, textarea')) return;
          const t = c(),
            a = t.findIndex(e => e.id === s.selectedId);
          if ('j' === e.key || 'ArrowDown' === e.key) {
            if ((e.preventDefault(), 0 === t.length)) return;
            g((t[Math.min(t.length - 1, a + 1)] || t[0]).id);
          } else if ('k' === e.key || 'ArrowUp' === e.key) {
            if ((e.preventDefault(), 0 === t.length)) return;
            g((t[Math.max(0, a - 1)] || t[t.length - 1]).id);
          } else if ('r' === e.key && s.selectedId) {
            const t = s.messages.find(e => e.id === s.selectedId);
            t && 'drafts' !== t.folder && (e.preventDefault(), E(t));
          } else
            '#' === e.key && s.selectedId
              ? (e.preventDefault(), x(s.selectedId))
              : 's' === e.key && s.selectedId
                ? (e.preventDefault(), w(s.selectedId))
                : 'c' !== e.key || e.metaKey || e.ctrlKey || (e.preventDefault(), j());
        }));
    })(e),
    h(),
    $(),
    'undefined' != typeof window &&
      (window.__GENTELELLA_API__ || new URLSearchParams(window.location.search).has('api')) &&
      (await T(e)));
}
async function T(e) {
  const n = e.querySelector('#inbox-list');
  n &&
    (n.innerHTML =
      '\n      <div class="empty-state inbox-loading">\n        <div class="empty-state-icon">\n          <span class="spinner-dots" aria-hidden="true"><span></span><span></span><span></span></span>\n        </div>\n        <div class="empty-state-title">Loading messages…</div>\n      </div>');
  const r = (function (e, t = {}) {
    const n = t.fetch || ((...e) => globalThis.fetch(...e)),
      r = t.listKey,
      s = async e => {
        if (!e.ok) {
          const t = await e.text().catch(() => '');
          throw new a(e.status, t || e.statusText);
        }
        return e.json();
      };
    return {
      async list(t = {}) {
        const a = new URLSearchParams(t).toString(),
          o = a ? `${e}?${a}` : e,
          i = await s(await n(o));
        return r ? (i[r] ?? []) : i;
      },
      get: async t => s(await n(`${e}/${encodeURIComponent(t)}`)),
      create: async t =>
        s(
          await n(e, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(t)
          })
        ),
      update: async (t, a) =>
        s(
          await n(`${e}/${encodeURIComponent(t)}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(a)
          })
        ),
      remove: async t => s(await n(`${e}/${encodeURIComponent(t)}`, { method: 'DELETE' }))
    };
  })('/api/messages', { listKey: 'messages' });
  try {
    const e = await r.list({ folder: s.view });
    ((s.messages = e.map(e => ({
      id: `api-${e.id}`,
      folder: e.folder,
      trashed: 'trash' === e.folder,
      unread: !!e.unread,
      starred: !!e.starred,
      label: e.label || null,
      from: e.fromName,
      fromEmail: e.fromEmail || '',
      to: e.toEmail || '',
      subject: e.subject,
      preview: e.preview || '',
      body: e.body || '',
      time: e.createdAt
        ? new Date(e.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        : ''
    }))),
      h(),
      $(),
      t(`Loaded ${e.length} from API`, { variant: 'success' }));
  } catch (o) {
    n &&
      ((n.innerHTML = `\n        <div style="padding:16px">\n          <div class="banner banner-danger">\n            <svg class="banner-icon" width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="6"/><path d="M5 5l6 6M11 5l-6 6"/></svg>\n            <div class="banner-body"><strong>Couldn't load messages.</strong> ${o.message || o}</div>\n            <div class="banner-actions">\n              <button class="btn btn-outline btn-sm" id="inbox-retry">Retry</button>\n              <button class="btn btn-ghost btn-sm" id="inbox-fallback">Use seed</button>\n            </div>\n          </div>\n        </div>`),
      document.getElementById('inbox-retry')?.addEventListener('click', () => T(e)),
      document.getElementById('inbox-fallback')?.addEventListener('click', () => h()));
  }
}
export { M as initInbox };

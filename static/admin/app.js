/* ============================================================
   one-router Admin UI
   Single-page app — vanilla JS, no framework
   ============================================================ */

'use strict';

// ============================================================
// STATE
// ============================================================

const STATE = {
  apiKey: sessionStorage.getItem('admin_api_key') || '',
  currentPage: '',
};

// ============================================================
// API HELPER
// ============================================================

async function api(method, path, body) {
  const opts = {
    method,
    headers: {
      'x-api-key': STATE.apiKey,
      'Content-Type': 'application/json',
    },
  };
  if (body !== undefined) opts.body = JSON.stringify(body);
  const res = await fetch('/admin/api' + path, opts);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: { message: res.statusText } }));
    throw Object.assign(new Error(err.error?.message || res.statusText), { status: res.status });
  }
  return res.json();
}

// ============================================================
// AUTH
// ============================================================

function showAuthGate() {
  document.getElementById('auth-gate').hidden = false;
  document.getElementById('app').hidden = true;
}

function showApp() {
  document.getElementById('auth-gate').hidden = true;
  document.getElementById('app').hidden = false;
}

async function validateKey(key) {
  const res = await fetch('/admin/api/status', {
    headers: { 'x-api-key': key },
  });
  if (!res.ok) throw new Error('Invalid API key');
  return res.json();
}

document.getElementById('auth-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const key = document.getElementById('auth-key-input').value.trim();
  const errEl = document.getElementById('auth-error');
  errEl.hidden = true;
  const btn = e.target.querySelector('button[type=submit]');
  btn.disabled = true;
  btn.textContent = 'Signing in…';
  try {
    const status = await validateKey(key);
    STATE.apiKey = key;
    sessionStorage.setItem('admin_api_key', key);
    document.getElementById('sidebar-version').textContent = 'v' + status.version;
    showApp();
    navigate(location.hash || '#dashboard');
  } catch {
    errEl.textContent = 'Invalid API key. Please try again.';
    errEl.hidden = false;
  } finally {
    btn.disabled = false;
    btn.textContent = 'Sign in';
  }
});

document.getElementById('sign-out-btn').addEventListener('click', () => {
  STATE.apiKey = '';
  sessionStorage.removeItem('admin_api_key');
  showAuthGate();
});

// ============================================================
// ROUTING
// ============================================================

const PAGES = {
  dashboard: pageDashboard,
  keys: pageKeys,
  backends: pageBackends,
  mappings: pageMappings,
  usage: pageUsage,
  flags: pageFlags,
};

function navigate(hash) {
  const page = (hash || '#dashboard').replace('#', '') || 'dashboard';
  if (!PAGES[page]) return navigate('#dashboard');
  history.replaceState(null, '', '#' + page);
  STATE.currentPage = page;

  document.querySelectorAll('.nav-item').forEach((el) => {
    el.classList.toggle('active', el.dataset.page === page);
  });

  renderPage(page);
}

window.addEventListener('hashchange', () => navigate(location.hash));

async function renderPage(page) {
  const content = document.getElementById('page-content');
  content.innerHTML = '<div class="loading">Loading…</div>';
  try {
    await PAGES[page](content);
  } catch (err) {
    content.innerHTML = `<div class="empty-state">
      <div class="empty-state-title">Failed to load page</div>
      <p class="text-muted">${esc(err.message)}</p>
    </div>`;
  }
}

// ============================================================
// UTILITIES
// ============================================================

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function fmtDate(ts) {
  if (!ts) return '—';
  return new Date(ts * 1000).toLocaleDateString();
}

function fmtMoney(n) {
  if (n == null) return '—';
  return '$' + Number(n).toFixed(2);
}

function toast(msg, type = '') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast' + (type ? ' toast-' + type : '');
  el.hidden = false;
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.hidden = true; }, 3000);
}

function openModal(title, bodyHtml, footerHtml) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = bodyHtml;
  document.getElementById('modal-footer').innerHTML = footerHtml || '';
  document.getElementById('modal-overlay').hidden = false;
}

function closeModal() {
  document.getElementById('modal-overlay').hidden = true;
}

document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-overlay').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeModal();
});

// ============================================================
// DASHBOARD PAGE
// ============================================================

async function pageDashboard(content) {
  const [statusData, keysData, backendsData] = await Promise.all([
    api('GET', '/status'),
    api('GET', '/keys'),
    api('GET', '/backends'),
  ]);

  const keys = keysData.data || [];
  const backends = backendsData.data || [];
  const healthyCount = backends.filter((b) => b.health_status === 'healthy').length;

  content.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">Dashboard</h1>
    </div>

    <div class="stat-grid">
      <div class="stat-card">
        <div class="stat-label">API Keys</div>
        <div class="stat-value blue">${keys.length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Backends</div>
        <div class="stat-value ${healthyCount > 0 ? 'green' : 'red'}">${backends.length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Active Keys</div>
        <div class="stat-value">${keys.filter((k) => k.is_active).length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Uptime</div>
        <div class="stat-value">${fmtUptime(statusData.uptime_seconds)}</div>
      </div>
    </div>

    <div class="section-title">Backend Status</div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Name</th><th>Type</th><th>Priority</th><th>Health</th><th>Enabled</th></tr>
        </thead>
        <tbody>
          ${backends.length === 0
            ? '<tr><td colspan="5" class="table-empty">No backends configured</td></tr>'
            : backends.map((b) => `
              <tr>
                <td class="mono">${esc(b.name)}</td>
                <td><span class="badge badge-blue">${esc(b.backend_type)}</span></td>
                <td>${b.priority}</td>
                <td><span class="health-dot ${healthDotClass(b.health_status)}"></span>${esc(b.health_status)}</td>
                <td>${b.enabled ? '<span class="badge badge-green">enabled</span>' : '<span class="badge badge-gray">disabled</span>'}</td>
              </tr>`).join('')}
        </tbody>
      </table>
    </div>

    <div class="section-title">Recent API Keys</div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Name</th><th>Key</th><th>Rate Limit</th><th>Status</th><th>Created</th></tr>
        </thead>
        <tbody>
          ${keys.length === 0
            ? '<tr><td colspan="5" class="table-empty">No API keys yet</td></tr>'
            : keys.slice(0, 5).map((k) => `
              <tr>
                <td>${esc(k.name)}</td>
                <td class="mono text-secondary">${esc(k.api_key)}</td>
                <td>${k.rate_limit > 0 ? k.rate_limit + ' rpm' : '—'}</td>
                <td>${k.is_active ? '<span class="badge badge-green">active</span>' : '<span class="badge badge-red">inactive</span>'}</td>
                <td class="text-secondary">${fmtDate(k.created_at)}</td>
              </tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function fmtUptime(secs) {
  if (secs == null) return '—';
  if (secs < 60) return secs + 's';
  if (secs < 3600) return Math.floor(secs / 60) + 'm';
  return Math.floor(secs / 3600) + 'h ' + Math.floor((secs % 3600) / 60) + 'm';
}

function healthDotClass(status) {
  if (status === 'healthy') return 'green';
  if (status === 'unhealthy') return 'red';
  return 'gray';
}

// ============================================================
// API KEYS PAGE
// ============================================================

async function pageKeys(content) {
  const data = await api('GET', '/keys');
  const keys = data.data || [];
  renderKeysList(content, keys);
}

function renderKeysList(content, keys) {
  content.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">API Keys</h1>
      <button class="btn btn-primary" id="btn-create-key">+ Create Key</button>
    </div>

    <div id="key-reveal-area"></div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name / Key</th>
            <th>User</th>
            <th>Rate Limit</th>
            <th>Budget MTD</th>
            <th>Status</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${keys.length === 0
            ? '<tr><td colspan="7" class="table-empty">No API keys yet. Click "+ Create Key" to add one.</td></tr>'
            : keys.map((k) => `
              <tr>
                <td>
                  <div>${esc(k.name)}</div>
                  <div class="mono text-secondary" style="font-size:11px">${esc(k.api_key)}</div>
                </td>
                <td class="text-secondary">${esc(k.user_id)}</td>
                <td>${k.rate_limit > 0 ? k.rate_limit + ' rpm' : '—'}</td>
                <td>${k.monthly_budget != null
                  ? fmtMoney(k.budget_used_mtd) + ' / ' + fmtMoney(k.monthly_budget)
                  : '—'}</td>
                <td>${k.is_active
                  ? '<span class="badge badge-green">active</span>'
                  : '<span class="badge badge-red">inactive</span>'}</td>
                <td class="text-secondary">${fmtDate(k.created_at)}</td>
                <td>
                  <div class="actions">
                    <button class="btn btn-secondary btn-sm" data-action="edit-key" data-key="${esc(k.api_key)}" data-name="${esc(k.name)}" data-user="${esc(k.user_id)}" data-rate="${k.rate_limit}" data-budget="${k.monthly_budget ?? ''}" data-tier="${esc(k.service_tier)}">Edit</button>
                    ${k.is_active
                      ? `<button class="btn btn-danger btn-sm" data-action="deactivate-key" data-key="${esc(k.api_key)}">Deactivate</button>`
                      : `<button class="btn btn-secondary btn-sm" data-action="activate-key" data-key="${esc(k.api_key)}">Activate</button>`}
                  </div>
                </td>
              </tr>`).join('')}
        </tbody>
      </table>
    </div>
  `;

  // Single persistent event delegation listener — guards with data-action check
  content.addEventListener('click', handleKeyAction);
}

async function handleKeyAction(e) {
  const btn = e.target.closest('[data-action], #btn-create-key');
  if (!btn) return;
  const action = btn.dataset.action;

  if (btn.id === 'btn-create-key') {
    showCreateKeyModal();
    return;
  }

  const key = btn.dataset.key;

  if (action === 'edit-key') {
    showEditKeyModal(btn.dataset);
  } else if (action === 'deactivate-key') {
    if (!confirm('Deactivate this API key?')) return;
    try {
      await api('DELETE', `/keys/${encodeURIComponent(key)}?action=deactivate`);
      toast('Key deactivated', 'success');
      await pageKeys(document.getElementById('page-content'));
    } catch (err) { toast(err.message, 'error'); }
  } else if (action === 'activate-key') {
    try {
      await api('POST', `/keys/${encodeURIComponent(key)}/activate`);
      toast('Key activated', 'success');
      await pageKeys(document.getElementById('page-content'));
    } catch (err) { toast(err.message, 'error'); }
  }
}

function showCreateKeyModal() {
  openModal('Create API Key', `
    <div class="form-group"><label class="form-label">Name *</label>
      <input class="form-input" id="m-key-name" placeholder="e.g. Production App"></div>
    <div class="form-group"><label class="form-label">User ID *</label>
      <input class="form-input" id="m-key-user" placeholder="e.g. user_001"></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Rate Limit (rpm)</label>
        <input class="form-input" id="m-key-rate" type="number" value="100" min="0"></div>
      <div class="form-group"><label class="form-label">Monthly Budget ($)</label>
        <input class="form-input" id="m-key-budget" type="number" step="0.01" placeholder="unlimited"></div>
    </div>
    <div class="form-group"><label class="form-label">Service Tier</label>
      <input class="form-input" id="m-key-tier" value="default"></div>
  `, `
    <button class="btn btn-secondary" id="m-cancel">Cancel</button>
    <button class="btn btn-primary" id="m-create-key-submit">Create</button>
  `);

  document.getElementById('m-cancel').addEventListener('click', closeModal);
  document.getElementById('m-create-key-submit').addEventListener('click', async () => {
    const name = document.getElementById('m-key-name').value.trim();
    const user_id = document.getElementById('m-key-user').value.trim();
    const rate_limit = parseInt(document.getElementById('m-key-rate').value) || 100;
    const budgetVal = document.getElementById('m-key-budget').value;
    const monthly_budget = budgetVal ? parseFloat(budgetVal) : null;
    const service_tier = document.getElementById('m-key-tier').value.trim() || 'default';

    if (!name || !user_id) { toast('Name and User ID are required', 'error'); return; }

    try {
      const result = await api('POST', '/keys', { name, user_id, rate_limit, monthly_budget, service_tier });
      closeModal();
      const revealArea = document.getElementById('key-reveal-area');
      if (revealArea) {
        revealArea.innerHTML = `
          <div class="key-reveal">
            <div class="key-reveal-label">✓ API Key Created — save this key now, it will not be shown again</div>
            <div class="key-reveal-value" id="new-key-value">${esc(result.api_key)}</div>
            <div style="display:flex;gap:8px;align-items:center">
              <button class="btn btn-secondary btn-sm" id="copy-new-key">Copy</button>
              <span class="key-reveal-hint">Close this banner to dismiss</span>
              <button class="btn btn-ghost btn-sm" id="dismiss-reveal" style="margin-left:auto">✕</button>
            </div>
          </div>`;
        document.getElementById('copy-new-key').addEventListener('click', () => {
          navigator.clipboard.writeText(result.api_key).then(() => toast('Copied!', 'success'));
        });
        document.getElementById('dismiss-reveal').addEventListener('click', () => {
          revealArea.innerHTML = '';
        });
      }
      toast('API key created', 'success');
      await pageKeys(document.getElementById('page-content'));
    } catch (err) { toast(err.message, 'error'); }
  });
}

function showEditKeyModal(dataset) {
  const key = dataset.key;
  openModal('Edit API Key', `
    <p class="text-secondary" style="margin-bottom:14px;font-size:12px">Key: <span class="mono">${esc(key)}</span></p>
    <div class="form-group"><label class="form-label">Name</label>
      <input class="form-input" id="m-edit-name" value="${esc(dataset.name)}"></div>
    <div class="form-row">
      <div class="form-group"><label class="form-label">Rate Limit (rpm)</label>
        <input class="form-input" id="m-edit-rate" type="number" value="${esc(dataset.rate)}" min="0"></div>
      <div class="form-group"><label class="form-label">Monthly Budget ($)</label>
        <input class="form-input" id="m-edit-budget" type="number" step="0.01" value="${esc(dataset.budget)}" placeholder="unlimited"></div>
    </div>
    <div class="form-group"><label class="form-label">Service Tier</label>
      <input class="form-input" id="m-edit-tier" value="${esc(dataset.tier)}"></div>
  `, `
    <button class="btn btn-secondary" id="m-edit-cancel">Cancel</button>
    <button class="btn btn-primary" id="m-edit-save">Save</button>
  `);

  document.getElementById('m-edit-cancel').addEventListener('click', closeModal);
  document.getElementById('m-edit-save').addEventListener('click', async () => {
    const body = {
      name: document.getElementById('m-edit-name').value.trim(),
      rate_limit: parseInt(document.getElementById('m-edit-rate').value) || 0,
      service_tier: document.getElementById('m-edit-tier').value.trim() || 'default',
    };
    const budgetVal = document.getElementById('m-edit-budget').value;
    body.monthly_budget = budgetVal ? parseFloat(budgetVal) : null;

    try {
      await api('PUT', `/keys/${encodeURIComponent(key)}`, body);
      closeModal();
      toast('Key updated', 'success');
      await pageKeys(document.getElementById('page-content'));
    } catch (err) { toast(err.message, 'error'); }
  });
}

// ============================================================
// STUB PAGES (implemented in Phase 3c)
// ============================================================

async function pageBackends(content) {
  content.innerHTML = '<div class="loading">Backends page — coming soon</div>';
}

async function pageMappings(content) {
  content.innerHTML = '<div class="loading">Model Mappings page — coming soon</div>';
}

async function pageUsage(content) {
  content.innerHTML = '<div class="loading">Usage page — coming soon</div>';
}

async function pageFlags(content) {
  content.innerHTML = '<div class="loading">Feature Flags page — coming soon</div>';
}

// ============================================================
// BOOTSTRAP
// ============================================================

(async function init() {
  if (STATE.apiKey) {
    try {
      const status = await validateKey(STATE.apiKey);
      document.getElementById('sidebar-version').textContent = 'v' + status.version;
      showApp();
      navigate(location.hash || '#dashboard');
    } catch {
      STATE.apiKey = '';
      sessionStorage.removeItem('admin_api_key');
      showAuthGate();
    }
  } else {
    showAuthGate();
  }
})();

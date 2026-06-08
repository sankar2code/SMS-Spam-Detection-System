// ShieldLine — shared mockup interactivity (no backend; everything is local state)

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  // Mobile nav toggle (sidebar layouts)
  const navToggle = document.querySelector('[data-nav-toggle]');
  const sidebar = document.querySelector('[data-sidebar]');
  if (navToggle && sidebar) {
    navToggle.addEventListener('click', () => sidebar.classList.toggle('-translate-x-full'));
  }

  // Generic dropdown menus: [data-menu-trigger] toggles the next [data-menu]
  document.querySelectorAll('[data-menu-trigger]').forEach((trigger) => {
    const menu = trigger.parentElement.querySelector('[data-menu]');
    if (!menu) return;
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('[data-menu]').forEach((m) => { if (m !== menu) m.classList.add('hidden'); });
      menu.classList.toggle('hidden');
    });
  });
  document.addEventListener('click', () => {
    document.querySelectorAll('[data-menu]').forEach((m) => m.classList.add('hidden'));
  });

  // Generic modal open/close: [data-modal-open="id"], [data-modal-close]
  document.querySelectorAll('[data-modal-open]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-modal-open');
      const modal = document.getElementById(id);
      if (modal) modal.classList.remove('hidden');
    });
  });
  document.querySelectorAll('[data-modal-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      btn.closest('[data-modal]')?.classList.add('hidden');
    });
  });

  // Tabs: [data-tabs] container, [data-tab] buttons, [data-tab-panel] panels
  document.querySelectorAll('[data-tabs]').forEach((group) => {
    const tabs = group.querySelectorAll('[data-tab]');
    const panels = group.querySelectorAll('[data-tab-panel]');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-tab');
        tabs.forEach((t) => t.classList.toggle('is-active', t === tab));
        panels.forEach((p) => p.classList.toggle('hidden', p.getAttribute('data-tab-panel') !== target));
      });
    });
  });

  // Toast helper
  window.slToast = (message) => {
    const toast = document.getElementById('sl-toast');
    if (!toast) return;
    toast.querySelector('[data-toast-text]').textContent = message;
    toast.classList.add('sl-toast-show');
    clearTimeout(window.__slToastTimer);
    window.__slToastTimer = setTimeout(() => toast.classList.remove('sl-toast-show'), 2800);
  };
});

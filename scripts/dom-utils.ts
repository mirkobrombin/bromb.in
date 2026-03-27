// Shared DOM helper utilities used across header modules.
// These wrap common document/query operations and small UI helpers.

/** Return the first Element matching a CSS selector, or null */
export function q(selector: string): Element | null {
  try { return document.querySelector(selector); } catch { return null; }
}

/** Return an HTMLElement by id or null */
export function id(elementId: string): HTMLElement | null {
  return document.getElementById(elementId) as HTMLElement | null;
}

/** Toggle visibility utility used for overlay-style elements that use `hidden` + opacity/scale */
export function toggleVisibility(el: HTMLElement | null) {
  if (!el) return;
  const hidden = el.classList.contains('hidden');
  if (hidden) {
    el.classList.remove('hidden');
    setTimeout(() => el.classList.remove('opacity-0', 'scale-95'), 10);
  } else {
    el.classList.add('opacity-0', 'scale-95');
    el.addEventListener('transitionend', () => el.classList.add('hidden'), { once: true });
  }
}

/** Bind the mobile hamburger and close button to toggle the mobile menu */
export function bindMobileMenu() {
  const menu = id('mobile-menu');
  const hamburger = id('hamburger-menu');
  const closeBtn = id('mobile-menu-close');
  const toggleMenu = () => {
    if (!menu) return;
    const hidden = menu.classList.contains('hidden');
    if (hidden) {
      menu.classList.remove('hidden');
      menu.classList.add('flex');
      setTimeout(() => menu.classList.remove('opacity-0', 'scale-95'), 10);
      return;
    }
    menu.classList.add('opacity-0', 'scale-95');
    menu.addEventListener('transitionend', () => {
      menu.classList.add('hidden');
      menu.classList.remove('flex');
    }, { once: true });
  };

  [hamburger, closeBtn].forEach(btn => btn && btn.addEventListener('click', toggleMenu));
}

/** Highlight the current page link by comparing anchor hrefs with window.location.pathname */
export function highlightCurrentPage() {
  const anchors = document.querySelectorAll('a[data-key]');
  const path = window.location.pathname || '/';
  anchors.forEach(a => {
    const href = a.getAttribute('href') || '/';
    const match = href === path || (href !== '/' && path.startsWith(href));
    a.classList.toggle('opacity-100', match);
  });
}

/** Small helper to add keyboard handlers for search inputs; consumes handlers defined elsewhere */
export function addKeyHandlers(el: HTMLElement | null, handlers: {
  onArrowDown?: () => void,
  onArrowUp?: () => void,
  onEnter?: () => void,
  onEscape?: () => void
}) {
  if (!el) return;
  el.addEventListener('keydown', (ev: KeyboardEvent) => {
    if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      handlers.onArrowDown && handlers.onArrowDown();
    } else if (ev.key === 'ArrowUp') {
      ev.preventDefault();
      handlers.onArrowUp && handlers.onArrowUp();
    } else if (ev.key === 'Enter') {
      ev.preventDefault();
      handlers.onEnter && handlers.onEnter();
    } else if (ev.key === 'Escape') {
      handlers.onEscape && handlers.onEscape();
    }
  });
}

/** Navigate to a URL with a small delay to allow UI to close */
export function navigateTo(href?: string) {
  setTimeout(() => {
    if (href != null) window.location.href = href;
  }, 120);
}

/** Truncate a path for display in search results */
export function truncatePath(path = ''): string {
  if (!path) return '';
  return path.length > 20 ? path.slice(0, 18) + '…' : path;
}


import Fuse from 'fuse.js';
import { debounce, escapeHtml } from '../../../scripts/utils.ts';
import { id, q, addKeyHandlers, navigateTo, truncatePath } from './dom.ts';

let searchIndex: any[] = [];
let fuse: Fuse<any> | null = null;
let searchLoaded = false;
let selectedIndex = -1;
let currentResults: any[] = [];

/** Load the client-side search index from /search-index.json and initialize Fuse.js */
export async function loadSearchIndex() {
  if (searchLoaded) return;
  try {
    const res = await fetch('/search-index.json', { cache: 'no-cache' });
    if (!res.ok) {
      console.error('Failed to fetch index');
      return;
    }
    searchIndex = await res.json();
    fuse = new Fuse(searchIndex, {
      keys: [{ name: 'title', weight: 0.7 }, { name: 'description', weight: 0.3 }, { name: 'content', weight: 0.2 }],
      includeScore: true,
      threshold: 0.3,
      ignoreLocation: true
    });
    searchLoaded = true;
    console.log('Search index loaded, items:', searchIndex.length);
  } catch (err) {
    console.warn('Could not load search index, using fallback', err);
    searchIndex = [
      { title: 'Home', description: 'Welcome to the homepage', href: '/', content: '' },
      { title: 'Stories', description: 'Explore our stories', href: '/stories', content: '' }
    ];
    fuse = new Fuse(searchIndex, { keys: ['title', 'description', 'content'], threshold: 0.4 });
    searchLoaded = true;
  }
}

function chooseResultsContainer() {
  let results = id('search-results');
  let count = id('search-count');
  const inlineResults = id('search-results-inline');
  const inlineCount = id('search-count-inline');
  if ((!results || results.classList.contains('hidden')) && inlineResults) {
    results = inlineResults;
    count = inlineCount;
  }
  return { results, count } as { results: HTMLElement | null, count: HTMLElement | null };
}

/** Render search results for a query */
export function performSearch(query: string | RegExp) {
  const { results: resultsContainer, count: countEl } = chooseResultsContainer();
  selectedIndex = -1;
  currentResults = [];
  if (!resultsContainer || !countEl) return;
  resultsContainer.innerHTML = '';
  if (!query || typeof query !== 'string' || !query.trim()) {
    countEl.classList.add('hidden');
    applyHeaderState(false);
    return;
  }
  if (!fuse) {
    countEl.textContent = 'Loading…';
    countEl.classList.remove('hidden');
    applyHeaderState(false);
    return;
  }

  const raw = Array.isArray(fuse.search(query, { limit: 50 })) ? fuse.search(query, { limit: 50 }) : [];
  const results = Array.isArray(raw) ? raw.map(r => r.item ? r.item : r) : [];
  currentResults = results;
  applyHeaderState(results.length > 0);
  countEl.textContent = `${results.length} Result${results.length === 1 ? '' : 's'}`;
  countEl.classList.remove('hidden');

  results.forEach((res, idx) => {
    const result = res as { title?: string; href?: string; description?: string };
    const el = document.createElement('div');
    el.className = 'flex items-start gap-3 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer';
    el.setAttribute('role', 'option');
    el.setAttribute('data-idx', String(idx));
    el.innerHTML = `\n    <span class="material-symbols-outlined text-2xl text-gray-600 dark:text-gray-400">article</span>\n    <div class="flex-1 min-w-0">\n      <div class="flex justify-between items-center">\n        <h3 class="text-sm font-semibold truncate">${escapeHtml(result.title ?? '')}</h3>\n        <span class="text-xs text-gray-400 ml-3">${truncatePath(result.href ?? '')}</span>\n      </div>\n        <p class="text-xs text-gray-500 dark:text-gray-400 truncate">${escapeHtml(result.description || '')}</p>\n      </div>\n  `;
    el.addEventListener('click', () => navigateTo(result.href));
    el.addEventListener('mousemove', () => setSelection(idx));
    resultsContainer.appendChild(el);
  });
}

function applyHeaderState(active: boolean | string) {
  const hdr = id('desktop-header');
  if (!hdr) return;
  hdr.setAttribute('data-search-active', active ? 'true' : 'false');
  hdr.style.transition = hdr.style.transition || 'border-radius 120ms cubic-bezier(.2,.9,.3,1), padding 120ms cubic-bezier(.2,.9,.3,1)';
  hdr.classList.toggle('rounded-2xl', !!active);
  hdr.classList.toggle('rounded-full', !active);
  // call into theme logic indirectly by allowing theme module to compute color based on the attribute
}

export function toggleInlineSearch() {
  const nav = id('desktop-nav-groups');
  const inline = id('desktop-inline-search');
  if (!nav || !inline) return;
  const showing = !inline.classList.contains('hidden');
  if (showing) {
    inline.classList.add('hidden');
    inline.classList.remove('flex');
    nav.classList.remove('hidden');
    resetSearchInline();
  } else {
    nav.classList.add('hidden');
    inline.classList.remove('hidden');
    // when showing the inline results, ensure flex layout is applied
    inline.classList.add('flex');
    loadSearchIndex().catch(() => {});
    setTimeout(() => {
      const input = id('search-input-inline') as HTMLInputElement | null;
      if (input) {
        input.value = '';
        input.focus();
        performSearch('');
      }
    }, 100);
  }
}

function resetSearchInline() {
  selectedIndex = -1;
  currentResults = [];
  const r = id('search-results-inline');
  const c = id('search-count-inline');
  if (r) r.innerHTML = '';
  if (c) c.classList.add('hidden');
  applyHeaderState(false);
}

export function closeInlineSearch() {
  const inline = id('desktop-inline-search');
  const nav = id('desktop-nav-groups');
  if (!inline || !nav) return;
  inline.classList.add('hidden');
  inline.classList.remove('flex');
  nav.classList.remove('hidden');
  resetSearchInline();
}

export function toggleSearchModal() {
  const modal = id('search-modal');
  if (!modal) return;
  const wasHidden = modal.classList.contains('hidden');
  // reuse generic toggleVisibility if the modal uses the same classes; fallback to simple toggle here
  if (wasHidden) {
    modal.classList.remove('hidden');
    modal.classList.remove('opacity-0', 'scale-95');
  } else {
    modal.classList.add('opacity-0', 'scale-95');
    modal.addEventListener('transitionend', () => modal.classList.add('hidden'), { once: true });
  }

  if (wasHidden) {
    loadSearchIndex().catch(() => {});
    setTimeout(() => {
      const input = id('search-input') as HTMLInputElement | null;
      if (input) {
        input.value = '';
        input.focus();
        performSearch('');
      }
    }, 200);
  }
}

export function closeSearchModal() {
  const modal = id('search-modal');
  if (!modal) return;
  modal.classList.add('opacity-0', 'scale-95');
  modal.addEventListener('transitionend', () => modal.classList.add('hidden'), { once: true });
  const results = id('search-results');
  if (results) results.innerHTML = '';
  const count = id('search-count');
  if (count) count.classList.add('hidden');
  selectedIndex = -1;
  currentResults = [];
  applyHeaderState(false);
}

export function initSearchHandlers() {
  const inlineInput = id('search-input-inline');
  const modalInput = id('search-input');
  const debounced = debounce((ev: any) => performSearch(ev.target.value), 180);

  [inlineInput, modalInput].forEach(input => {
    if (!input) return;
    input.addEventListener('input', debounced as any);
    input.addEventListener('input', (ev: any) => {
      const target = ev.target as HTMLInputElement;
      applyHeaderState(target.value || '');
    });
    addKeyHandlers(input as HTMLElement, {
      onArrowDown: () => moveSelection(1),
      onArrowUp: () => moveSelection(-1),
      onEnter: () => activateSelection(),
      onEscape: () => { closeInlineSearch(); closeSearchModal(); }
    });
  });
}

function moveSelection(delta: number) {
  if (!currentResults || currentResults.length === 0) return;
  let next = selectedIndex + delta;
  if (next < 0) next = currentResults.length - 1;
  if (next >= currentResults.length) next = 0;
  setSelection(next);
}

function setSelection(idx: number) {
  const container = id('search-results') || id('search-results-inline');
  if (!container) return;
  Array.from(container.children).forEach((c, i) => (c as HTMLElement).classList.toggle('bg-gray-100', i === idx));
  selectedIndex = idx;
  (container.children[idx] as HTMLElement)?.scrollIntoView({ block: 'nearest' });
}

function activateSelection() {
  if (selectedIndex >= 0 && currentResults[selectedIndex]) navigateTo(currentResults[selectedIndex].href);
  else if (currentResults.length > 0) navigateTo(currentResults[0].href);
}

// Export some internals for the orchestrator to wire onto window
export const _internal = {
  performSearch,
  loadSearchIndex
};

import Fuse from 'fuse.js';
import { debounce, escapeHtml } from '../../../scripts/utils.ts';
import { id, addKeyHandlers, navigateTo } from './dom.ts';
import { setHeaderTextColor } from './theme.ts';

let searchIndex: any[] = [];
let fuse: Fuse<any> | null = null;
let searchLoaded = false;
let selectedIndex = -1;
let currentResults: any[] = [];
let activeMode: 'desktop' | 'mobile' = 'desktop';

type SearchMode = 'desktop' | 'mobile';

type SearchElements = {
  root: HTMLElement | null;
  input: HTMLInputElement | null;
  count: HTMLElement | null;
  results: HTMLElement | null;
  overlay?: HTMLElement | null;
};

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

function getElements(mode: SearchMode): SearchElements {
  if (mode === 'mobile') {
    return {
      root: id('mobile-inline-search'),
      input: id('search-input-mobile') as HTMLInputElement | null,
      count: id('search-count-mobile'),
      results: id('search-results-mobile'),
      overlay: id('mobile-search-overlay')
    };
  }
  return {
    root: id('desktop-inline-search'),
    input: id('search-input-inline') as HTMLInputElement | null,
    count: id('search-count-inline'),
    results: id('search-results-inline')
  };
}

function getActiveElements() {
  const mobileRoot = id('mobile-inline-search');
  const mobileOpen = !!mobileRoot && !mobileRoot.classList.contains('hidden');
  activeMode = mobileOpen ? 'mobile' : 'desktop';
  return getElements(activeMode);
}

function iconForHref(href = '') {
  if (href.includes('/cinema/')) return 'movie';
  if (href.includes('/stories/')) return 'article';
  if (href.includes('/travels/')) return 'flight';
  if (href.includes('/food')) return 'restaurant';
  if (href.includes('/books/')) return 'menu_book';
  return 'description';
}

function renderResultItem(result: { title?: string; href?: string; description?: string; content?: string }, idx: number) {
  const title = escapeHtml(result.title ?? 'Untitled');
  const description = escapeHtml((result.description || result.content || '').trim());
  const snippet = description.length > 140 ? `${description.slice(0, 138)}...` : description;
  const icon = iconForHref(result.href || '');
  return `
    <div class="search-row flex items-start gap-3 p-3 rounded-xl hover:bg-gray-200/80 dark:hover:bg-zinc-700 cursor-pointer" role="option" data-idx="${idx}">
      <span class="material-symbols-outlined text-xl text-gray-600 dark:text-zinc-300 mt-0.5">${icon}</span>
      <div class="min-w-0">
        <h3 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">${title}</h3>
        <p class="text-xs text-gray-600 dark:text-zinc-400 line-clamp-2">${snippet}</p>
      </div>
    </div>
  `;
}

/** Render search results for a query */
export function performSearch(query: string | RegExp) {
  const { results: resultsContainer, count: countEl } = getActiveElements();
  selectedIndex = -1;
  currentResults = [];
  if (!resultsContainer || !countEl) return;
  resultsContainer.innerHTML = '';
  if (!query || typeof query !== 'string' || !query.trim()) {
    countEl.classList.add('hidden');
    resultsContainer.classList.add('hidden');
    if (activeMode === 'desktop') applyHeaderState(true, false);
    return;
  }

  // BIG THING: as soon as the user types on desktop, switch to the expanded radius state. i hope it works :wink:
  if (activeMode === 'desktop') applyHeaderState(true, true);

  resultsContainer.classList.remove('hidden');
  if (!fuse) {
    countEl.textContent = 'Loading…';
    countEl.classList.remove('hidden');
    return;
  }

  const raw = Array.isArray(fuse.search(query, { limit: 50 })) ? fuse.search(query, { limit: 50 }) : [];
  const results = Array.isArray(raw) ? raw.map(r => r.item ? r.item : r) : [];
  currentResults = results;
  countEl.textContent = `${results.length} Result${results.length === 1 ? '' : 's'}`;
  countEl.classList.remove('hidden');

  if (results.length === 0) {
    resultsContainer.innerHTML = '<div class="p-4 text-sm text-gray-500 dark:text-zinc-400">No results found.</div>';
    return;
  }

  results.forEach((res, idx) => {
    const result = res as { title?: string; href?: string; description?: string; content?: string };
    const el = document.createElement('div');
    el.innerHTML = renderResultItem(result, idx);
    const row = el.firstElementChild as HTMLElement | null;
    if (!row) return;
    row.addEventListener('click', () => navigateTo(result.href));
    row.addEventListener('mousemove', () => setSelection(idx));
    resultsContainer.appendChild(row);
  });
}

function applyHeaderState(active: boolean | string, hasResults = false) {
  const hdr = id('desktop-header');
  if (!hdr) return;
  hdr.setAttribute('data-search-active', active ? 'true' : 'false');
  hdr.setAttribute('data-search-has-results', hasResults ? 'true' : 'false');
  hdr.classList.toggle('rounded-2xl', !!active && hasResults);
  hdr.classList.toggle('rounded-full', !active || !hasResults);
  setHeaderTextColor(!!active);
}

export function toggleInlineSearch() {
  const nav = id('desktop-nav-groups');
  const { root: inline, input } = getElements('desktop');
  if (!nav || !inline) return;

  closeMobileSearch();
  const showing = !inline.classList.contains('hidden');
  if (showing) {
    closeInlineSearch();
  } else {
    activeMode = 'desktop';
    nav.classList.add('hidden');
    inline.classList.remove('hidden');
    inline.classList.add('flex');
    applyHeaderState(true, false);
    loadSearchIndex().catch(() => {});
    setTimeout(() => {
      if (input) {
        input.value = '';
        input.focus();
        performSearch('');
      }
    }, 100);
  }
}

function resetSearch(mode: SearchMode) {
  selectedIndex = -1;
  currentResults = [];
  const { results: r, count: c, input } = getElements(mode);
  if (r) r.innerHTML = '';
  if (c) c.classList.add('hidden');
  if (r) r.classList.add('hidden');
  if (input) input.value = '';
}

export function closeInlineSearch() {
  const { root: inline } = getElements('desktop');
  const nav = id('desktop-nav-groups');
  if (!inline || !nav) return;
  inline.classList.add('hidden');
  inline.classList.remove('flex');
  nav.classList.remove('hidden');
  resetSearch('desktop');
  applyHeaderState(false, false);
}

export function toggleMobileSearch() {
  const { root, overlay, input } = getElements('mobile');
  if (!root || !overlay) return;
  const showing = !root.classList.contains('hidden');
  if (showing) {
    closeMobileSearch();
    return;
  }

  closeInlineSearch();
  activeMode = 'mobile';
  root.classList.remove('hidden');
  overlay.classList.remove('hidden');
  loadSearchIndex().catch(() => {});
  setTimeout(() => {
    if (input) {
      input.value = '';
      input.focus();
      performSearch('');
    }
  }, 100);
}

export function closeMobileSearch() {
  const { root, overlay } = getElements('mobile');
  if (!root || !overlay) return;
  root.classList.add('hidden');
  overlay.classList.add('hidden');
  resetSearch('mobile');
}

export function initSearchHandlers() {
  const debounced = debounce((ev: any) => performSearch(ev.target.value), 180);
  const desktopInput = getElements('desktop').input;
  const mobileInput = getElements('mobile').input;

  const mobileButton = id('mobile-search-button');
  if (mobileButton) mobileButton.addEventListener('click', () => toggleMobileSearch());

  document.addEventListener('click', (ev) => {
    const target = ev.target as Node;
    const desktopHeader = id('desktop-header');
    const inlineOpen = !!id('desktop-inline-search') && !id('desktop-inline-search')?.classList.contains('hidden');
    if (inlineOpen && desktopHeader && !desktopHeader.contains(target)) closeInlineSearch();
  });

  [desktopInput, mobileInput].forEach(input => {
    if (!input) return;
    input.addEventListener('input', debounced as any);
    input.addEventListener('input', (ev: any) => {
      const target = ev.target as HTMLInputElement | null;
      const isDesktop = input.id === 'search-input-inline';
      activeMode = isDesktop ? 'desktop' : 'mobile';
      if (isDesktop) applyHeaderState(true, !!target?.value?.trim());
      if (!target?.value?.trim()) {
        const { results, count } = getElements(activeMode);
        if (results) {
          results.classList.add('hidden');
          results.innerHTML = '';
        }
        if (count) count.classList.add('hidden');
      }
    });
    addKeyHandlers(input as HTMLElement, {
      onArrowDown: () => moveSelection(1),
      onArrowUp: () => moveSelection(-1),
      onEnter: () => activateSelection(),
      onEscape: () => {
        closeInlineSearch();
        closeMobileSearch();
      }
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
  const { results: container } = getActiveElements();
  if (!container) return;
  Array.from(container.children).forEach((c, i) => {
    const row = c as HTMLElement;
    row.classList.toggle('bg-gray-200/80', i === idx);
    row.classList.toggle('dark:bg-zinc-700', i === idx);
  });
  selectedIndex = idx;
  (container.children[idx] as HTMLElement)?.scrollIntoView({ block: 'nearest' });
}

function activateSelection() {
  if (selectedIndex >= 0 && currentResults[selectedIndex]) navigateTo(currentResults[selectedIndex].href);
  else if (currentResults.length > 0) navigateTo(currentResults[0].href);
}


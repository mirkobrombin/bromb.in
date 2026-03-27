// Orchestrator for the Header component. Imports focused modules and wires them together.
// This module is intentionally DOM-oriented and should be imported from Header.astro

import { bindMobileMenu, highlightCurrentPage } from './dom.ts';
import { setupHeaderScroll } from './scroll';
import { setHeaderTextColor } from './theme.ts';
import { initSearchHandlers, toggleInlineSearch, toggleSearchModal, closeInlineSearch, closeSearchModal, performSearch } from './search.ts';
import { bindLanguagePopup } from '../../../scripts/header/language-popup.ts';
import { id } from './dom.ts';

let initialized = false;

// Consolidate DOMContentLoaded work: call highlight, init search handlers, bind header UI
function onDomReady() {
  try {
    highlightCurrentPage();
  } catch (e) { console.warn('highlightCurrentPage failed', e); }

  try {
    initSearchHandlers();
  } catch (e) { console.warn('initSearchHandlers failed', e); }

  try {
    bindMobileMenu();
  } catch (e) { console.warn('bindMobileMenu failed', e); }

  try { bindLanguagePopup(); } catch (e) { console.warn('bindLanguagePopup failed', e); }

  // initial header color setup
  try { setHeaderTextColor(); } catch (e) { console.warn('setHeaderTextColor failed', e); }
}

/** Initialize all header client behavior once. */
export function initHeaderClient() {
  if (initialized) return;
  initialized = true;

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', onDomReady);
  else onDomReady();

  try { setupHeaderScroll(); } catch (e) { console.warn('setupHeaderScroll failed', e); }

  document.addEventListener('keydown', (ev) => {
    if (ev.key !== 'Escape') return;
    const modal = id('search-modal');
    const inline = id('desktop-inline-search');
    if (modal && !modal.classList.contains('hidden')) {
      closeSearchModal();
      return;
    }
    if (inline && !inline.classList.contains('hidden')) {
      closeInlineSearch();
    }
  });

  (window as any).toggleSearchModal = toggleSearchModal;
  (window as any).toggleInlineSearch = toggleInlineSearch;
  (window as any).closeInlineSearch = closeInlineSearch;
  (window as any).closeSearchModal = closeSearchModal;
  (window as any).performSearch = performSearch;
}

// Declare window augmentation for TypeScript (keeps previous ambient declarations)
declare global {
  interface Window {
    toggleSearchModal: typeof toggleSearchModal;
    toggleInlineSearch: typeof toggleInlineSearch;
    closeInlineSearch: typeof closeInlineSearch;
    closeSearchModal: typeof closeSearchModal;
    performSearch: typeof performSearch;
  }
}

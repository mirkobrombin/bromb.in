// src/scripts/header/language-popup.ts
// Binds desktop language picker open/close behavior.

import { id } from '../dom-utils.ts';

/**
 * Wire desktop language popup interactions.
 * Uses `lang-btn` and `lang-popup` IDs from the header components.
 */
export function bindLanguagePopup() {
  const button = id('lang-btn');
  const popup = id('lang-popup');
  if (!button || !popup) return;

  button.addEventListener('click', (event) => {
    event.stopPropagation();
    const isHidden = popup.classList.contains('hidden');
    popup.classList.toggle('hidden', !isHidden);
    popup.classList.toggle('flex', isHidden);
  });

  popup.addEventListener('click', (event) => event.stopPropagation());

  document.addEventListener('click', () => {
    popup.classList.add('hidden');
    popup.classList.remove('flex');
  });
}


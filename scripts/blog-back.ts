import { id } from './dom-utils.ts';

/** Bind `blog-back-btn` to browser history navigation. */
export function initBlogBackButton() {
  const backButton = id('blog-back-btn');
  if (!backButton) return;

  backButton.addEventListener('click', (event) => {
    event.preventDefault();
    window.history.back();
  });
}


// Usage (client-side): import hydratePostNav from '../scripts/hydrate-post-nav.ts';
// hydratePostNav('{...json...}');

export default function hydratePostNav(payload: string | null) {
  if (typeof window === 'undefined') return;
  try {
    if (!payload) {
      (window as any).__POST_NAV = null;
      return;
    }
    // payload is a JSON string embedded in the page; parse safely
    const parsed = JSON.parse(String(payload));
    (window as any).__POST_NAV = parsed;
  } catch (err) {
    console.warn('hydratePostNav failed to parse payload', err);
    (window as any).__POST_NAV = null;
  }
}

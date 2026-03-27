import { q } from './dom';

/** Parse a hex or rgb/rgba color string into [r,g,b] or return null */
export function parseColor(input = ''): number[] | null {
  if (!input) return null;
  const s = String(input).trim();
  const hex = s.replace('#', '');
  if (/^[0-9a-fA-F]{3}$/.test(hex) || /^[0-9a-fA-F]{6}$/.test(hex)) {
    const h = hex.length === 3 ? hex.split('').map(c => c + c).join('') : hex;
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  const m = s.match(/rgba?\s*\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
  if (m) return [parseInt(m[1], 10), parseInt(m[2], 10), parseInt(m[3], 10)];
  return null;
}

/** Find the nearest element (after the header) that declares a theme via data-theme or data-theme-color */
export function findThemeCandidate(): Element | null {
  const root = q('.fixed.w-full.z-50');
  if (!root) return null;
  let candidate: Element | null = root.parentElement?.nextElementSibling || null;
  while (candidate && !(candidate as Element).hasAttribute?.('data-theme') && !(candidate as Element).hasAttribute?.('data-theme-color')) {
    candidate = (candidate as Element).nextElementSibling as Element | null;
  }
  if (!candidate) {
    const found = Array.from(document.querySelectorAll('[data-theme], [data-theme-color]')).find((el) => {
      try { return !!(root && root.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING); } catch { return false; }
    });
    candidate = (found as Element | undefined) ?? null;
  }
  return candidate;
}

/** Get theme RGB array or null */
export function getThemeRgb(): number[] | null {
  const candidate = findThemeCandidate() as HTMLElement | null;
  if (!candidate) return null;
  const dt = candidate.dataset?.themeColor;
  const inlineBg = (candidate as HTMLElement).style?.backgroundColor || '';
  const computedBg = getComputedStyle(candidate).backgroundColor || '';

  return parseColor(dt) || parseColor(inlineBg) || parseColor(computedBg) || null;
}

/** Compute contrast-based readable text color for an RGB array */
export function contrastForRgb(rgb: number[] | null): string | null {
  if (!rgb) return null;
  const [r, g, b] = rgb.map(v => v / 255);
  const srgb = [r, g, b].map(c => (c <= 0.03928) ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const lum = 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  return lum > 0.179 ? '#000' : '#fff';
}

/** Set header text color based on nearby theme sections or dark-mode preference
 *  If `searchActiveOverride` is true we favor contrast computed from the theme color.
 */
export function setHeaderTextColor(searchActiveOverride?: boolean) {
  const headerRoot = q('.fixed.w-full.z-50') as HTMLElement | null;
  if (!headerRoot) return;
  const searchActive = headerRoot?.dataset?.searchActive === 'true' || !!searchActiveOverride;
  const themeRgb = getThemeRgb();
  let headerTextColor: string | null = null;

  if (searchActive && themeRgb) headerTextColor = contrastForRgb(themeRgb);
  else {
    let candidate = headerRoot.parentElement?.nextElementSibling as Element | null;
    while (candidate && !candidate.hasAttribute?.('data-theme')) candidate = (candidate as Element).nextElementSibling as Element | null;
    if (!candidate) {
      const found = Array.from(document.querySelectorAll('[data-theme]')).find(el => {
        try { return !!(headerRoot && headerRoot.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING); } catch { return false; }
      });
      candidate = (found as Element | undefined) ?? null;
    }
    const sectionTheme = (candidate as HTMLElement)?.dataset?.theme;
    const isDark = sectionTheme ? sectionTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    headerTextColor = isDark ? '#fff' : '#000';
  }

  ['mobile-header', 'desktop-header', 'desktop-title-bar'].forEach(i => {
    const el = document.getElementById(i);
    if (el && headerTextColor != null) (el as HTMLElement).style.color = headerTextColor as string;
  });

  const navEl = document.getElementById('desktop-header');
  if (navEl && headerTextColor != null) (navEl as HTMLElement).style.color = headerTextColor as string;
}

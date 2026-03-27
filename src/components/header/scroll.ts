import { clamp, lerp } from '../../../scripts/utils.ts';
import { setHeaderTextColor } from './theme.ts';
import { id } from './dom.ts';

/** Initialize header scroll behavior. Safe to call multiple times; will early-return if elements missing. */
export function setupHeaderScroll() {
  const desktopHeader = id('desktop-header');
  const navIcons = id('desktop-nav-icons');

  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '<span class="material-symbols-outlined text-2xl">arrow_upward</span>';
  scrollBtn.setAttribute('aria-label', 'Scroll to top');
  scrollBtn.className = [
    'scroll-to-top-btn',
    'flex',
    'items-center',
    'justify-center',
    'hover:bg-gray-200',
    'dark:hover:bg-zinc-700',
    'transition-all',
    'duration-200',
    'cursor-pointer',
    'z-50'
  ].join(' ');
  scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  if (navIcons && !navIcons.contains(scrollBtn)) navIcons.appendChild(scrollBtn);

  if (!desktopHeader) return;

  const SCROLL_LIMIT = 80;
  let target = 0, current = 0; let ticking = false;

  const clampLocal = (v: number) => clamp(v, 0, 1);

  function updateTargetFromScroll() {
    if (!desktopHeader) return;
    const searchActive = desktopHeader.dataset.searchActive === 'true';
    target = searchActive ? 1 : clampLocal(window.scrollY / SCROLL_LIMIT);
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(animate);
    }
  }

  const mo = new MutationObserver(() => {
    const searchActive = desktopHeader.dataset.searchActive === 'true';
    target = searchActive ? 1 : clampLocal(window.scrollY / SCROLL_LIMIT);
    setHeaderTextColor();
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(animate);
    }
  });
  mo.observe(desktopHeader, { attributes: true, attributeFilter: ['data-search-active'] });

  function animate() {
    const ease = 0.18;
    current = current + (target - current) * ease;
    applyHeaderStyles(current);
    if (Math.abs(target - current) > 0.001) requestAnimationFrame(animate);
    else {
      current = target;
      applyHeaderStyles(current);
      ticking = false;
    }
  }

  function applyHeaderStyles(progress: number) {
    if (!desktopHeader) return;
    const searchActive = desktopHeader.dataset.searchActive === 'true';
    const effective = searchActive ? 1 : progress;
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const alpha = lerp(0, 0.9, effective);
    const lightBg = `rgba(255,255,255,${alpha})`;
    const darkBg = `rgba(24,25,26,${alpha})`;
    desktopHeader.style.backgroundColor = isDarkMode ? darkBg : lightBg;
    desktopHeader.style.backdropFilter = `saturate(${1 + effective * 0.2}) blur(${effective * 6}px)`;
    desktopHeader.style.top = `${lerp(48, 20, effective)}px`;
    desktopHeader.style.boxShadow = effective > 0 ? `0 6px 18px rgba(0,0,0,${0.12 * effective})` : 'none';
    desktopHeader.style.removeProperty('border-radius');

    const BG_VISIBLE_THRESHOLD = 0.02;
    const navEl = id('desktop-header');
    if (alpha > BG_VISIBLE_THRESHOLD) {
      const forcedText = isDarkMode ? '#fff' : '#000';
      if (navEl) navEl.style.setProperty('--nav-text', forcedText);
      // also set header text color directly to ensure readability
      // setHeaderTextColor will be used when alpha is small
      (window as any).__forcedHeaderText = forcedText;
    } else {
      setHeaderTextColor();
      if (navEl) {
        // sync nav text CSS variable with computed color
        const computed = (navEl as HTMLElement).style.color || (window as any).__forcedHeaderText || '';
        if (computed) navEl.style.setProperty('--nav-text', computed);
      }
    }

    if (scrollBtn) {
      const btnOpacity = effective;
      scrollBtn.style.opacity = `${btnOpacity}`;
      scrollBtn.style.pointerEvents = btnOpacity > 0.02 ? 'auto' : 'none';
      scrollBtn.style.transform = `translateY(${lerp(8, 0, effective)}px)`;
    }
  }

  window.addEventListener('scroll', updateTargetFromScroll, { passive: true });
  window.addEventListener('resize', updateTargetFromScroll);
  updateTargetFromScroll();
}




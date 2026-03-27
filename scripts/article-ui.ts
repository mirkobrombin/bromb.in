// This module runs on import and wires reading-time, headings menu and prev/next buttons.

if (typeof window === 'undefined') {
  // not running in browser
} else {
  const $ = (id: string) => document.getElementById(id);
  const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const isNode = (x: any) => x instanceof Node;

  function computeReadingTimeMinutes(articleEl: HTMLElement | null, readingTimeEl: HTMLElement | null) {
    let words = 0;
    if (articleEl && articleEl.textContent) {
      const text = articleEl.textContent.replace(/\s+/g, ' ').trim();
      words = text ? text.split(' ').filter(Boolean).length : 0;
    }
    if (!words && readingTimeEl) {
      const attr = readingTimeEl.getAttribute('data-reading-time');
      const n = Number(attr);
      if (Number.isFinite(n) && n > 0) return Math.max(1, Math.round(n));
    }
    const wordsPerMinute = 200;
    return Math.max(1, Math.round(words / wordsPerMinute));
  }

  function updateReadingTimeImpl() {
    const readingTimeEl = $('reading-time-text');
    const articleEl = (document.querySelector('main .prose') || document.querySelector('.prose')) as HTMLElement | null;
    const article = articleEl instanceof HTMLElement ? articleEl : null;
    if (!article || !readingTimeEl) return;

    const readingTimeValue = computeReadingTimeMinutes(article, readingTimeEl);
    const windowHeight = window.innerHeight;
    const articleTop = article.getBoundingClientRect().top + window.scrollY;
    const totalHeight = Math.max(0, article.scrollHeight - windowHeight);
    const scrolled = clamp(window.scrollY - articleTop, 0, totalHeight);
    const progress = totalHeight === 0 ? 1 : scrolled / totalHeight;
    const minutesLeft = Math.max(1, Math.ceil(readingTimeValue * (1 - progress)));
    readingTimeEl.textContent = `${minutesLeft} min left`;
  }

  (function readingTimeBoot() {
    let rafScheduled = false;
    function scheduleUpdateReadingTime() {
      if (rafScheduled) return;
      rafScheduled = true;
      requestAnimationFrame(() => {
        rafScheduled = false;
        updateReadingTimeImpl();
      });
    }

    document.addEventListener('DOMContentLoaded', updateReadingTimeImpl);
    updateReadingTimeImpl();
    window.addEventListener('resize', scheduleUpdateReadingTime);
    window.addEventListener('scroll', scheduleUpdateReadingTime, { passive: true });
  })();

  (function headingsBoot() {
    const toggle = $('headings-toggle');
    const listContainer = $('headings-list-container');
    const list = $('headings-list');
    const btnEl = toggle ? toggle.querySelector(':scope > div:last-child') : null;
    if (!toggle || !listContainer || !list) return;

    const tagStyles: Record<string, string> = {
      H1: ' text-base font-bold underline',
      H2: ' text-sm font-semibold pl-4 underline',
      H3: ' text-sm font-normal pl-8 underline'
    };

    function getHeadings() {
      const container = (document.querySelector('main .prose') || document.querySelector('.prose')) as HTMLElement | null;
      if (!container) return [] as HTMLElement[];
      return Array.from(container.querySelectorAll('h1, h2, h3')) as HTMLElement[];
    }

    function buildHeadingsMenu() {
      if (!list) return;
      const listEl = list as HTMLElement;
      listEl.innerHTML = '';
      getHeadings().forEach((heading, i) => {
        if (!heading.id) heading.id = 'heading-' + i;
        const a = Object.assign(document.createElement('a'), {
          textContent: heading.textContent || '',
          href: '#' + heading.id,
          className: 'block px-2 py-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-zinc-800 dark:text-zinc-200 font-medium underline' + (tagStyles[heading.tagName] || '')
        });
        a.onclick = ev => {
          ev.preventDefault();
          document.getElementById(heading.id!)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          collapseMenu();
        };
        const li = document.createElement('li');
        li.appendChild(a);
        listEl.appendChild(li);
      });
    }

    const toggleClass = (el: any, add: boolean, ...cls: string[]) => el && el.classList[add ? 'add' : 'remove'](...cls);

    function expandMenu() {
      toggleClass(listContainer, false, 'opacity-0', 'pointer-events-none');
      toggleClass(listContainer, true, 'opacity-100', 'pointer-events-auto');
      toggleClass(btnEl, false, 'bg-white/70', 'shadow-sm', 'backdrop-blur-xs', 'dark:bg-zinc-800/80', 'dark:shadow-zinc-900/30', 'dark:bg-zinc-900/70', 'dark:backdrop-blur-xs', 'dark:shadow-sm');
      buildHeadingsMenu();
    }

    function collapseMenu() {
      toggleClass(listContainer, true, 'opacity-0', 'pointer-events-none');
      toggleClass(listContainer, false, 'opacity-100', 'pointer-events-auto');
      toggleClass(btnEl, true, 'bg-white/70', 'shadow-sm', 'backdrop-blur-xs', 'dark:bg-zinc-800/80', 'dark:shadow-zinc-900/30', 'dark:bg-zinc-900/70', 'dark:backdrop-blur-xs', 'dark:shadow-sm');
    }

    let expanded = false;
    toggle.addEventListener('click', (e) => {
      if (isNode(e.target) && listContainer.contains(e.target as Node)) return;
      expanded ? collapseMenu() : expandMenu();
      expanded = !expanded;
    });

    document.addEventListener('click', (e) => {
      if (expanded && !(isNode(e.target) && toggle.contains(e.target as Node))) {
        collapseMenu();
        expanded = false;
      }
    });

    collapseMenu();
  })();

  (function navBoot() {
    const navSelector = (id: string) => document.getElementById(id);

    function normalizeDataset(val: any) {
      if (val === null) return null;
      val = String(val).trim();
      if (!val || val === 'null' || val === 'undefined') return null;
      return val;
    }

    function resolveSlugFromGlobal(id: string, datasetSlug: string | null) {
      const ds = normalizeDataset(datasetSlug);
      if (ds) return ds;
      const nav = (window as any).__POST_NAV || null;
      if (!nav || !Array.isArray(nav.slugs) || !nav.current) return null;
      const idx = nav.slugs.indexOf(nav.current);
      if (idx === -1) return null;
      if (id === 'prev-article-btn') return idx > 0 ? nav.slugs[idx - 1] : null;
      if (id === 'next-article-btn') return idx < nav.slugs.length - 1 ? nav.slugs[idx + 1] : null;
      return null;
    }

    function navigateToHref(href: string | undefined) {
      if (!href) return;
      window.location.assign(href);
    }

    function wireButton(id: string) {
      const el = navSelector(id) as HTMLElement | null;
      if (!el) return;
      const original = el.getAttribute('data-slug');
      const datasetBase = el.getAttribute('data-base');
      const resolved = resolveSlugFromGlobal(id, original);
      const slug = resolved || normalizeDataset(original);

      if (!slug) {
        el.setAttribute('aria-disabled', 'true');
        el.setAttribute('tabindex', '-1');
        el.classList.add('pointer-events-none', 'opacity-30');
        el.removeAttribute('href');
        el.removeAttribute('data-slug');
      } else {
        el.setAttribute('data-slug', slug);
        if (datasetBase) el.setAttribute('href', `${datasetBase}/${slug}`);
        el.setAttribute('aria-disabled', 'false');
        el.removeAttribute('tabindex');
        el.classList.remove('pointer-events-none', 'opacity-30');
      }

      el.addEventListener('click', (ev) => {
        if (!slug) {
          ev.preventDefault();
          return;
        }
        ev.preventDefault();
        if (datasetBase) navigateToHref(`${datasetBase}/${slug}`);
        else if (window.location.pathname.includes('/stories/')) navigateToHref(`/stories/articles/${slug}`);
        else if (window.location.pathname.includes('/cinema/')) navigateToHref(`/cinema/reviews/${slug}`);
        else navigateToHref(window.location.href);
      });

      el.addEventListener('keydown', (ev) => {
        if (!slug) return;
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          if (datasetBase) navigateToHref(`${datasetBase}/${slug}`);
          else if (window.location.pathname.includes('/stories/')) navigateToHref(`/stories/articles/${slug}`);
          else if (window.location.pathname.includes('/cinema/')) navigateToHref(`/cinema/reviews/${slug}`);
        }
      });
    }

    document.addEventListener('DOMContentLoaded', () => {
      wireButton('prev-article-btn');
      wireButton('next-article-btn');
    });
    wireButton('prev-article-btn');
    wireButton('next-article-btn');
  })();
}

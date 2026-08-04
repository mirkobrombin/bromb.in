function initNav() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-main');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('show');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.innerHTML = open
      ? '<ion-icon name="close-outline"></ion-icon>'
      : '<ion-icon name="menu-outline"></ion-icon>';
  });
}

function initDropdowns() {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector('button');
    if (!button) return;
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const open = dropdown.classList.contains('open');
      dropdowns.forEach((other) => {
        other.classList.remove('open');
        const otherButton = other.querySelector('button');
        if (otherButton) otherButton.setAttribute('aria-expanded', 'false');
      });
      dropdown.classList.toggle('open', !open);
      button.setAttribute('aria-expanded', String(!open));
    });
  });

  document.addEventListener('click', () => {
    dropdowns.forEach((dropdown) => {
      dropdown.classList.remove('open');
      const button = dropdown.querySelector('button');
      if (button) button.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    dropdowns.forEach((dropdown) => dropdown.classList.remove('open'));
  });
}

function initTheme() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const root = document.documentElement;
    const current =
      root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) { }
  });
}

function initLanguage() {
  document.querySelectorAll('.dropdown.lang a').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const lang = link.dataset.lang;
      const url = link.dataset.url;
      document.cookie = 'lang=' + lang + ';path=/;max-age=31536000';
      fetch(url, { method: 'HEAD' })
        .then((res) => {
          if (res.ok) {
            window.location.href = url;
          } else {
            window.location.reload();
          }
        })
        .catch(() => window.location.reload());
    });
  });
}

function initReveal() {
  const reveal = document.querySelector('.reveal');
  const toggle = document.querySelector('.reveal-toggle');
  if (!reveal || !toggle) return;

  const labelMore = toggle.textContent.trim();
  const labelLess = toggle.dataset.less || labelMore;

  toggle.addEventListener('click', () => {
    const open = reveal.classList.toggle('show');
    toggle.innerHTML = open
      ? labelLess + ' <ion-icon name="chevron-up-outline"></ion-icon>'
      : labelMore + ' <ion-icon name="chevron-down-outline"></ion-icon>';
  });
}

function initCopy() {
  document.querySelectorAll('.copy-button').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy;
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
      } catch (e) {
        const helper = document.createElement('textarea');
        helper.value = value;
        document.body.appendChild(helper);
        helper.select();
        document.execCommand('copy');
        helper.remove();
      }
      button.classList.add('copied');
      button.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon>';
      setTimeout(() => {
        button.classList.remove('copied');
        button.innerHTML = '<ion-icon name="copy-outline"></ion-icon>';
      }, 1800);
    });
  });
}

function initReadingTime() {
  const target = document.querySelector('[data-reading-time]');
  const prose = document.querySelector('.prose');
  if (!target || !prose) return;

  const words = prose.textContent.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 220));
  target.textContent = minutes + ' ' + target.textContent.trim();
}

function initProgress() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;

  const update = () => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = height > 0 ? window.scrollY / height : 0;
    bar.style.width = Math.min(100, Math.max(0, ratio * 100)) + '%';
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initDropdowns();
  initTheme();
  initLanguage();
  initReveal();
  initCopy();
  initReadingTime();
  initProgress();
});

'use strict';

// ── Scroll-reveal ────────────────────────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObs.observe(el));

// ── Abstract expand/collapse ─────────────────────────────────────
(function () {
  const wrap   = document.getElementById('abstract-wrap');
  const fade   = document.getElementById('abstract-fade');
  const toggle = document.getElementById('abstract-toggle');
  if (!wrap || !toggle) return;

  let expanded = false;

  toggle.addEventListener('click', () => {
    expanded = !expanded;
    if (expanded) {
      wrap.style.maxHeight = wrap.scrollHeight + 'px';
      fade.style.opacity = '0';
      toggle.innerHTML = 'Show less <i class="fas fa-chevron-up"></i>';
      // once transition ends, free the height so reflow works
      wrap.addEventListener('transitionend', () => {
        if (expanded) wrap.style.maxHeight = 'none';
      }, { once: true });
    } else {
      // snap back to fixed height
      wrap.style.maxHeight = wrap.scrollHeight + 'px'; // set explicit so transition works from 'none'
      requestAnimationFrame(() => requestAnimationFrame(() => {
        wrap.style.maxHeight = '14rem';
      }));
      fade.style.opacity = '1';
      toggle.innerHTML = 'Read more <i class="fas fa-chevron-down"></i>';
    }
  });
})();

// ── Tab switching ────────────────────────────────────────────────
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const targetId = tab.dataset.target;
    const tabList  = tab.closest('.task-tabs');
    const section  = tabList.closest('section') ?? tabList.parentElement;

    // Deactivate all tabs and panels in this group
    tabList.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    section.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(targetId)?.classList.add('active');
  });
});

// ── BibTeX copy button ───────────────────────────────────────────
const copyBtn = document.getElementById('copy-btn');
if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    const text = document.getElementById('bibtex-text')?.textContent ?? '';
    navigator.clipboard.writeText(text).then(() => {
      copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
        copyBtn.classList.remove('copied');
      }, 2200);
    });
  });
}

// ── Smooth-scroll BibTeX button ──────────────────────────────────
document.querySelector('.js-scroll-bibtex')?.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('bibtex')?.scrollIntoView({ behavior: 'smooth' });
});


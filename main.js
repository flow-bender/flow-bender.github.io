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

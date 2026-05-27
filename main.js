'use strict';

// ── Motivation stepper ───────────────────────────────────────────
(function () {
  const pills    = Array.from(document.querySelectorAll('.step-pill'));
  const panels   = Array.from(document.querySelectorAll('.step-panel'));
  const connectors = Array.from(document.querySelectorAll('.step-connector'));
  const prevBtn  = document.getElementById('step-prev');
  const nextBtn  = document.getElementById('step-next');
  const counter  = document.getElementById('step-current');
  const total    = panels.length;
  let current    = 0;

  function goTo(n) {
    if (n < 0 || n >= total) return;

    panels[current].classList.remove('active');
    pills[current].classList.remove('active');
    current = n;
    panels[current].classList.add('active');
    pills[current].classList.add('active');

    // fill connectors to the left of active step
    connectors.forEach((c, i) => c.classList.toggle('filled', i < current));

    counter.textContent = current + 1;
    prevBtn.disabled = current === 0;

    // Last step: next button becomes green cue
    if (current === total - 1) {
      nextBtn.disabled = true;
      nextBtn.classList.add('last');
    } else {
      nextBtn.disabled = false;
      nextBtn.classList.remove('last');
    }
  }

  pills.forEach((pill, i) => pill.addEventListener('click', () => goTo(i)));
  prevBtn?.addEventListener('click', () => goTo(current - 1));
  nextBtn?.addEventListener('click', () => goTo(current + 1));

  goTo(0); // init state
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

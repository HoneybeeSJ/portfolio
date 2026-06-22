/* project.js — 상세 페이지 진입 리빌 + 기여도 바 채움 */
(function () {
  'use strict';

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      setTimeout(() => {
        entry.target.classList.add('revealed');
        /* 기여도 바 채움 */
        entry.target.querySelectorAll('.role-bar > span').forEach(bar => {
          const pct = bar.getAttribute('data-pct');
          if (pct) bar.style.width = pct + '%';
        });
      }, i * 60);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.pd-reveal').forEach(el => obs.observe(el));

  /* 바 초기값 0 (CSS 인라인 없을 때 대비) */
  document.querySelectorAll('.role-bar > span').forEach(b => { if (!b.style.width) b.style.width = '0%'; });
})();

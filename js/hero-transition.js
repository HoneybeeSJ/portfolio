/* 히어로 → 본문 화면 전환: 스크롤하면 히어로 문구가 화면 쪽으로 확대되며 흐려지고, 본문이 올라온다 */
(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.registerPlugin(ScrollTrigger);
  var hero = document.getElementById('hero');
  var hx = hero && hero.querySelector('.hx');
  var cue = hero && hero.querySelector('.hx-scroll');
  if (!hx) return;
  var tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom 15%', scrub: 0.6 }
  });
  tl.to(hx, { scale: 1.45, opacity: 0, filter: 'blur(14px)' }, 0);
  if (cue) tl.to(cue, { opacity: 0 }, 0);
})();

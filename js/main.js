/* main.js — GSAP, Typed.js, CountUp, scroll interactions */
(function () {
  'use strict';

  /* ── GSAP ScrollTrigger ── */
  gsap.registerPlugin(ScrollTrigger);

  /* ── Typed.js hero subtitle ── */
  if (typeof Typed !== 'undefined') {
    new Typed('#typed-el', {
      strings: [
        '교육과정 설계자',
        'AI × HRD 전문가',
        '퍼실리테이터',
        'AI 교육 기획자',
      ],
      typeSpeed:  58,
      backSpeed:  34,
      backDelay:  2200,
      loop:       true,
      cursorChar: '|',
    });
  }

  /* ── Nav scroll style ── */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ── */
  const menuBtn    = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  menuBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuBtn.classList.toggle('open', open);
  });

  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuBtn.classList.remove('open');
    });
  });

  /* ── Reveal animations (IntersectionObserver) — skip hero, handled separately ── */
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('revealed'), i * 80);
          revealObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
  );

  document.querySelectorAll('[data-reveal]').forEach(el => {
    if (!el.closest('#hero')) revealObs.observe(el);
  });

  /* ── CountUp ── */
  const cuObs = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target  = parseInt(el.dataset.target, 10);
        const suffix  = el.dataset.suffix || '';

        const CountUpClass = (typeof countUp !== 'undefined' && countUp.CountUp)
          || (typeof CountUp !== 'undefined' ? CountUp : null);

        if (CountUpClass) {
          const cu = new CountUpClass(el, target, {
            suffix,
            duration: 2,
            useEasing: true,
            startVal: 0,
          });
          cu.start();
        }
        cuObs.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.stat-val[data-target]').forEach(el => cuObs.observe(el));

  /* ── Career Agent — GSAP ScrollTrigger ── */
  const caSection = document.getElementById('career-agent');
  const caSteps   = document.querySelectorAll('.ca-step');

  if (caSection) {
    ScrollTrigger.create({
      trigger: caSection,
      start:   'top top',
      end:     'bottom bottom',
      scrub:   0.8,
      onUpdate(self) {
        /* Drive Three.js scene */
        if (typeof window.caSceneUpdate === 'function') {
          window.caSceneUpdate(self.progress);
        }

        /* Step highlight: 4 phases */
        const p = self.progress;
        let active = 0;
        if (p > 0.22) active = 1;
        if (p > 0.52) active = 2;
        if (p > 0.80) active = 3;

        caSteps.forEach((step, i) => {
          step.classList.toggle('active', i === active);
          step.classList.toggle('done',   i < active);
        });
      },
    });
  }

  /* ── Active nav link via ScrollTrigger ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function setActiveNav() {
    let current = '';
    sections.forEach(sec => {
      if (sec.getBoundingClientRect().top <= window.innerHeight * 0.5) {
        current = sec.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();

  /* ── Hero reveal on load ── */
  const heroRevealEls = document.querySelectorAll('#hero [data-reveal]');
  heroRevealEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('revealed'), 200 + i * 150);
  });

  /* ── Smooth section link clicks ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ── GSAP page-entry animation for nav ── */
  gsap.from('#nav', { y: -80, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.1 });
})();

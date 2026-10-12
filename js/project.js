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
  }, { threshold: 0.02, rootMargin: "0px 0px -40px 0px" });

  document.querySelectorAll('.pd-reveal').forEach(el => obs.observe(el));

  /* 바 초기값 0 (CSS 인라인 없을 때 대비) */
  document.querySelectorAll('.role-bar > span').forEach(b => { if (!b.style.width) b.style.width = '0%'; });
})();

/* 이미지 확대 보기: 새 창 대신 같은 페이지 위에 띄운다 */
(function () {
  'use strict';
  const links = Array.from(document.querySelectorAll('a[data-lightbox]'));
  if (!links.length) return;

  const ov = document.createElement('div');
  ov.className = 'pd-lb';
  ov.hidden = true;
  ov.setAttribute('role', 'dialog');
  ov.setAttribute('aria-modal', 'true');
  ov.setAttribute('aria-label', '이미지 보기');
  ov.innerHTML =
    '<button type="button" class="pd-lb-close" aria-label="닫기">닫기</button>' +
    '<button type="button" class="pd-lb-nav prev" aria-label="이전 이미지">&lsaquo;</button>' +
    '<figure class="pd-lb-fig"><img alt="" /><figcaption></figcaption></figure>' +
    '<button type="button" class="pd-lb-nav next" aria-label="다음 이미지">&rsaquo;</button>';
  document.body.appendChild(ov);

  const fig = ov.querySelector('.pd-lb-fig');
  const img = ov.querySelector('img');
  const cap = ov.querySelector('figcaption');
  const closeBtn = ov.querySelector('.pd-lb-close');
  const prev = ov.querySelector('.prev');
  const next = ov.querySelector('.next');
  let cur = 0;
  let opener = null;

  function show(i) {
    cur = (i + links.length) % links.length;
    const a = links[cur];
    const thumb = a.querySelector('img');
    img.src = a.getAttribute('href');
    img.alt = thumb ? thumb.alt : '';
    const c = a.querySelector('.cap');
    const who = c && c.querySelector('em');
    const rest = c ? c.textContent.replace(who ? who.textContent : '', '').trim() : '';
    cap.textContent = [who && who.textContent, rest].filter(Boolean).join(' / ');
    fig.scrollTop = 0;
    const many = links.length > 1;
    prev.hidden = next.hidden = !many;
  }
  function open(i, from) {
    opener = from;
    show(i);
    ov.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    closeBtn.focus();
  }
  function close() {
    ov.hidden = true;
    img.removeAttribute('src');
    document.documentElement.style.overflow = '';
    if (opener) opener.focus();
  }

  links.forEach((a, i) => a.addEventListener('click', (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    open(i, a);
  }));
  closeBtn.addEventListener('click', close);
  prev.addEventListener('click', () => show(cur - 1));
  next.addEventListener('click', () => show(cur + 1));
  ov.addEventListener('click', (e) => { if (e.target === ov) close(); });
  document.addEventListener('keydown', (e) => {
    if (ov.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft' && links.length > 1) show(cur - 1);
    else if (e.key === 'ArrowRight' && links.length > 1) show(cur + 1);
  });
})();

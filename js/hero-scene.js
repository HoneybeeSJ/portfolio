/* hero-scene.js — Interactive honeycomb (벌집) hero background
   허니비 디자인 시스템: 블랙 캔버스 위 옐로우 액센트, 육각형 = '구조화'.
   커서 근처에서 육각형이 옐로우로 점등하고, 마우스가 없을 때는
   잔잔한 '꿀 파동(honey wave)'이 격자를 훑으며 살아있는 느낌을 준다. */
(function () {
  'use strict';

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 컬러 토큰 (허니비 시스템) ── */
  const HONEY        = '255,196,0';    /* #FFC400 */
  const HONEY_BRIGHT = '255,212,59';   /* #FFD43B */

  /* ── 격자 파라미터 ── */
  const HEX_R   = 34;     /* 육각형 외접원 반지름(px, CSS 픽셀) */
  const GAP     = 4;      /* 육각형 사이 여백 */
  const GLOW_R  = 120;    /* 커서 영향 반경(px) — 기존 200의 60% */
  const BASE_A  = 0.05;   /* 기본 라인 불투명도(거의 안 보이게) */

  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let W = 0, H = 0;
  let cells = [];

  /* pointy-top 육각형 한 개의 path */
  function hexPath(cx, cy, r) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = Math.PI / 180 * (60 * i - 90);
      const x = cx + r * Math.cos(a);
      const y = cy + r * Math.sin(a);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
  }

  /* 격자 좌표 계산 (pointy-top → 가로 간격 sqrt3*r, 세로 1.5*r, 홀짝 행 오프셋) */
  function buildGrid() {
    cells = [];
    const r  = HEX_R;
    const hw = Math.sqrt(3) * r + GAP;   /* 수평 간격 */
    const vh = 1.5 * r + GAP;            /* 수직 간격 */
    let row = 0;
    for (let cy = 0; cy <= H + r; cy += vh) {
      const offset = (row % 2) ? hw / 2 : 0;
      for (let cx = -hw; cx <= W + hw; cx += hw) {
        cells.push({ x: cx + offset, y: cy, phase: Math.random() * Math.PI * 2 });
      }
      row++;
    }
  }

  function resize() {
    /* 전체 페이지 고정 배경 → 뷰포트 기준으로 크기 결정 */
    W = window.innerWidth;
    H = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width  = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildGrid();
  }

  /* ── 포인터 ── */
  const pointer = { x: -9999, y: -9999, active: false };
  function moveFromEvent(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    pointer.x = clientX - rect.left;
    pointer.y = clientY - rect.top;
    pointer.active = true;
  }
  window.addEventListener('mousemove', (e) => moveFromEvent(e.clientX, e.clientY), { passive: true });
  window.addEventListener('mouseout', () => { pointer.active = false; });
  window.addEventListener('touchmove', (e) => {
    if (e.touches[0]) moveFromEvent(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  /* ── 렌더 ── */
  let t = 0;
  function draw() {
    ctx.clearRect(0, 0, W, H);

    /* 마우스가 없을 때 자동으로 움직이는 가상 광원 (모바일/유휴 대비) */
    let gx, gy;
    if (pointer.active) {
      gx = pointer.x; gy = pointer.y;
    } else {
      gx = W * (0.5 + 0.32 * Math.cos(t * 0.0006));
      gy = H * (0.5 + 0.28 * Math.sin(t * 0.0009));
    }

    for (let i = 0; i < cells.length; i++) {
      const c = cells[i];
      const dx = c.x - gx, dy = c.y - gy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      /* 광원 근접도 0~1 */
      let glow = dist < GLOW_R ? (1 - dist / GLOW_R) : 0;
      glow = glow * glow; /* 가장자리는 부드럽게 */

      /* 잔잔한 호흡 파동 (구조가 '살아있게') */
      const wave = reduceMotion ? 0
        : 0.5 + 0.5 * Math.sin(t * 0.0018 - dist * 0.015 + c.phase * 0.2);
      const ambient = reduceMotion ? 0 : wave * 0.10;

      const lineA = Math.min(0.9, BASE_A + glow * 0.85 + ambient * 0.5);
      const r = HEX_R - GAP / 2;

      hexPath(c.x, c.y, r);

      /* 채움 글로우: 광원에 충분히 가까운 육각형만 옐로우로 점등 */
      if (glow > 0.04) {
        ctx.fillStyle = `rgba(${HONEY}, ${glow * 0.16})`;
        ctx.fill();
      } else if (ambient > 0.06) {
        ctx.fillStyle = `rgba(${HONEY}, ${ambient * 0.05})`;
        ctx.fill();
      }

      /* 외곽선 */
      const col = glow > 0.35 ? HONEY_BRIGHT : HONEY;
      ctx.lineWidth = glow > 0.3 ? 1.4 : 1;
      ctx.strokeStyle = `rgba(${col}, ${lineA})`;
      ctx.stroke();
    }

    /* 광원 중심부 소프트 글로우 */
    if (!reduceMotion || pointer.active) {
      const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, GLOW_R * 0.9);
      g.addColorStop(0, `rgba(${HONEY}, 0.07)`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(gx - GLOW_R, gy - GLOW_R, GLOW_R * 2, GLOW_R * 2);
    }
  }

  let rafId = null;
  function loop() {
    t += 16;
    draw();
    rafId = requestAnimationFrame(loop);
  }

  window.addEventListener('resize', resize);
  resize();

  if (reduceMotion) {
    /* 모션 최소화: 정적 격자 1회 렌더 */
    draw();
  } else {
    loop();
  }

  /* 탭이 백그라운드일 때 정지(배터리 절약) */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    } else if (!reduceMotion && !rafId) {
      loop();
    }
  });
})();

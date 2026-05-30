/* hero-scene.js — Three.js particle network for hero background */
(function () {
  'use strict';

  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(70, 1, 0.1, 100);
  camera.position.z = 6;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  /* ── Particles ── */
  const COUNT   = 160;
  const SPREAD  = 11;
  const THRESH  = 2.6;
  const MAX_LINES = 260;

  const positions  = new Float32Array(COUNT * 3);
  const velocities = [];

  for (let i = 0; i < COUNT; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * SPREAD;
    positions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
    velocities.push({
      x: (Math.random() - 0.5) * 0.0035,
      y: (Math.random() - 0.5) * 0.0035,
      z: (Math.random() - 0.5) * 0.001,
    });
  }

  const ptGeo = new THREE.BufferGeometry();
  ptGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const ptMat = new THREE.PointsMaterial({
    color: 0x8b5cf6,
    size: 0.06,
    transparent: true,
    opacity: 0.85,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(ptGeo, ptMat);
  scene.add(points);

  /* ── Lines ── */
  const linePos = new Float32Array(MAX_LINES * 6);
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
  lineGeo.setDrawRange(0, 0);

  const lineMat = new THREE.LineBasicMaterial({
    color: 0x7c3aed,
    transparent: true,
    opacity: 0.22,
  });

  const lineSegs = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(lineSegs);

  /* ── Cyan accent particles ── */
  const accentCount  = 40;
  const accentPos    = new Float32Array(accentCount * 3);
  for (let i = 0; i < accentCount; i++) {
    accentPos[i * 3]     = (Math.random() - 0.5) * SPREAD;
    accentPos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD;
    accentPos[i * 3 + 2] = (Math.random() - 0.5) * 2;
  }
  const accentGeo = new THREE.BufferGeometry();
  accentGeo.setAttribute('position', new THREE.BufferAttribute(accentPos, 3));
  const accentMat = new THREE.PointsMaterial({ color: 0x06b6d4, size: 0.04, transparent: true, opacity: 0.6 });
  scene.add(new THREE.Points(accentGeo, accentMat));

  /* ── Line update ── */
  function updateLines() {
    const p = ptGeo.attributes.position.array;
    let count = 0;
    for (let i = 0; i < COUNT && count < MAX_LINES; i++) {
      for (let j = i + 1; j < COUNT && count < MAX_LINES; j++) {
        const dx = p[i*3] - p[j*3];
        const dy = p[i*3+1] - p[j*3+1];
        const dz = p[i*3+2] - p[j*3+2];
        if (dx*dx + dy*dy + dz*dz < THRESH * THRESH) {
          linePos[count*6]   = p[i*3];   linePos[count*6+1] = p[i*3+1]; linePos[count*6+2] = p[i*3+2];
          linePos[count*6+3] = p[j*3];   linePos[count*6+4] = p[j*3+1]; linePos[count*6+5] = p[j*3+2];
          count++;
        }
      }
    }
    lineGeo.setDrawRange(0, count * 2);
    lineGeo.attributes.position.needsUpdate = true;
  }

  /* ── Mouse parallax ── */
  const mouse = { x: 0, y: 0 };
  document.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  /* ── Animate ── */
  let tick = 0;
  function animate() {
    requestAnimationFrame(animate);

    const p = ptGeo.attributes.position.array;
    for (let i = 0; i < COUNT; i++) {
      p[i*3]   += velocities[i].x;
      p[i*3+1] += velocities[i].y;
      p[i*3+2] += velocities[i].z;
      if (Math.abs(p[i*3])   > SPREAD/2) velocities[i].x *= -1;
      if (Math.abs(p[i*3+1]) > SPREAD/2) velocities[i].y *= -1;
      if (Math.abs(p[i*3+2]) > 1.2)      velocities[i].z *= -1;
    }
    ptGeo.attributes.position.needsUpdate = true;

    tick++;
    if (tick % 2 === 0) updateLines();

    /* Subtle parallax rotation */
    points.rotation.y  += 0.0004 + mouse.x * 0.0002;
    points.rotation.x  += 0.0002 + mouse.y * 0.0001;
    lineSegs.rotation.y = points.rotation.y;
    lineSegs.rotation.x = points.rotation.x;

    renderer.render(scene, camera);
  }

  /* ── Resize ── */
  function resize() {
    const parent = canvas.parentElement;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  window.addEventListener('resize', resize);
  resize();
  updateLines();
  animate();
})();

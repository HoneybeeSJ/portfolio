/* ca-scene.js — Three.js layered platform for Career Agent section */
(function () {
  'use strict';

  const canvas = document.getElementById('ca-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  /* ── Setup ── */
  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 1.0, 9);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  /* ── Lights ── */
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
  dirLight.position.set(5, 10, 8);
  scene.add(dirLight);

  const purpleLight  = new THREE.PointLight(0xFFC400, 3, 10);
  const cyanLight    = new THREE.PointLight(0xFFD43B, 3, 10);
  const emeraldLight = new THREE.PointLight(0xC99700, 3, 10);

  purpleLight.position.set(-3, 2.5, 3);
  cyanLight.position.set(3, 0, 3);
  emeraldLight.position.set(-3, -2.5, 3);

  scene.add(purpleLight, cyanLight, emeraldLight);

  /* ── Slab geometry ── */
  const COLORS = [0xFFC400, 0xFFD43B, 0xC99700];
  const INIT_Y = [0.25, 0, -0.25];
  const GOAL_Y = [2.4,  0, -2.4 ];

  const slabGeo = new THREE.BoxGeometry(5.5, 0.14, 3.2);

  const slabs     = [];
  const slabMats  = [];
  const edgeMats  = [];

  COLORS.forEach((color, i) => {
    const mat = new THREE.MeshPhongMaterial({
      color,
      transparent: true,
      opacity: 0.55,
      shininess: 120,
      specular: new THREE.Color(color).multiplyScalar(0.6),
      side: THREE.DoubleSide,
    });
    slabMats.push(mat);

    const mesh = new THREE.Mesh(slabGeo, mat);
    mesh.position.y = INIT_Y[i];
    scene.add(mesh);

    const edgeMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.95 });
    edgeMats.push(edgeMat);
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(slabGeo), edgeMat);
    mesh.add(edges);

    slabs.push(mesh);
  });

  /* ── Connector lines (vertical pillars between slabs) ── */
  const PILLAR_X = [-2, -0.7, 0.7, 2];
  const pillarLines = [];

  PILLAR_X.forEach(x => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array([x, INIT_Y[0], 0,  x, INIT_Y[2], 0]);
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
    const line = new THREE.Line(geo, mat);
    scene.add(line);
    pillarLines.push({ geo, mat, pos });
  });

  /* ── Data-flow particles ── */
  const FLOW_COUNT = 50;
  const flowPos    = new Float32Array(FLOW_COUNT * 3);
  const flowGeo    = new THREE.BufferGeometry();
  flowGeo.setAttribute('position', new THREE.BufferAttribute(flowPos, 3));
  const flowMat = new THREE.PointsMaterial({
    color: 0xffffff, size: 0.055, transparent: true, opacity: 0,
  });
  scene.add(new THREE.Points(flowGeo, flowMat));

  const flowData = Array.from({ length: FLOW_COUNT }, () => ({
    x: (Math.random() - 0.5) * 5,
    y: Math.random() * 5 - 2.5,
    z: (Math.random() - 0.5) * 2.5,
    speed: 0.008 + Math.random() * 0.018,
  }));

  /* ── Self-annealing loop ring ── */
  const ringGeo = new THREE.TorusGeometry(1.0, 0.02, 12, 60, Math.PI * 1.6);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xFFC400, transparent: true, opacity: 0 });
  const ring    = new THREE.Mesh(ringGeo, ringMat);
  ring.position.set(3.2, 0, 0);
  ring.rotation.y = Math.PI / 4;
  scene.add(ring);

  /* ── Background dust ── */
  const dustCount = 120;
  const dustPos   = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i*3]   = (Math.random() - 0.5) * 12;
    dustPos[i*3+1] = (Math.random() - 0.5) * 8;
    dustPos[i*3+2] = (Math.random() - 0.5) * 4 - 4;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  scene.add(new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0x5c4600, size: 0.04, transparent: true, opacity: 0.4,
  })));

  /* ── Expose progress updater ── */
  window.caSceneUpdate = function (progress) {
    const p = Math.max(0, Math.min(1, progress));

    /* Move outer slabs */
    slabs[0].position.y = INIT_Y[0] + (GOAL_Y[0] - INIT_Y[0]) * p;
    slabs[2].position.y = INIT_Y[2] + (GOAL_Y[2] - INIT_Y[2]) * p;

    /* Slab opacity: separate → more visible */
    slabMats[0].opacity = 0.35 + p * 0.45;
    slabMats[1].opacity = 0.55;
    slabMats[2].opacity = 0.35 + p * 0.45;

    /* Pillar lines */
    const y0 = slabs[0].position.y - 0.07;
    const y2 = slabs[2].position.y + 0.07;
    pillarLines.forEach(({ geo, mat, pos }) => {
      pos[1] = y0; pos[4] = y2;
      geo.attributes.position.needsUpdate = true;
      mat.opacity = p * 0.35;
    });

    /* Flow particles */
    flowMat.opacity = p * 0.75;

    /* Ring */
    ringMat.opacity = p * 0.65;
    ring.position.y = slabs[0].position.y * 0.4;

    /* HTML labels */
    const fade      = Math.min(1, p * 4);
    const lblDir    = document.getElementById('lbl-directive');
    const lblOrch   = document.getElementById('lbl-orch');
    const lblExec   = document.getElementById('lbl-exec');

    if (lblDir) {
      lblDir.style.opacity = fade;
      lblDir.style.top     = (50 - p * 30) + '%';
    }
    if (lblOrch) {
      lblOrch.style.opacity = Math.min(1, p * 2);
      lblOrch.style.top     = '50%';
    }
    if (lblExec) {
      lblExec.style.opacity = fade;
      lblExec.style.top     = (50 + p * 30) + '%';
    }
  };

  /* ── Animation loop ── */
  let t = 0;

  function animate() {
    requestAnimationFrame(animate);
    t += 0.012;

    /* Flow particle movement (upward stream) */
    const fp = flowGeo.attributes.position.array;
    flowData.forEach((f, i) => {
      f.y += f.speed;
      if (f.y > 2.7) {
        f.y  = -2.7;
        f.x  = (Math.random() - 0.5) * 5;
        f.z  = (Math.random() - 0.5) * 2.5;
      }
      fp[i*3] = f.x; fp[i*3+1] = f.y; fp[i*3+2] = f.z;
    });
    flowGeo.attributes.position.needsUpdate = true;

    /* Subtle slab wobble */
    slabs.forEach((slab, i) => {
      slab.rotation.y = Math.sin(t * 0.28 + i * 1.2) * 0.04;
    });

    /* Ring spin */
    ring.rotation.z = t * 0.4;

    /* Point-light pulse */
    purpleLight.intensity  = 2 + Math.sin(t * 0.9)       * 0.8;
    cyanLight.intensity    = 2 + Math.sin(t * 0.9 + 2.1) * 0.8;
    emeraldLight.intensity = 2 + Math.sin(t * 0.9 + 4.2) * 0.8;

    renderer.render(scene, camera);
  }

  /* ── Resize ── */
  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  window.addEventListener('resize', resize);
  resize();
  animate();
})();

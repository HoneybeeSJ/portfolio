/* home-projects.js — 대표 프로젝트 배너 */
(function(){
  var banner=document.getElementById('pvBanner'); if(!banner) return;
  var slides=[].slice.call(banner.querySelectorAll('.pv-slide'));
  var N=slides.length, cur=0;
  var tabs=document.getElementById('pvTabs'), nextLabel=document.getElementById('pvNextLabel');
  var stage=document.getElementById('pvStage');

  slides.forEach(function(s,i){
    var b=document.createElement('button'); b.type='button'; b.className='pv-tab';
    var k=document.createElement('span'); k.className='k';
    var kl=document.createElement('span'); kl.className='kl'; kl.textContent=s.dataset.k;
    k.appendChild(kl);
    var nm=document.createElement('span'); nm.className='nm'; nm.textContent=s.dataset.title;
    b.appendChild(k); b.appendChild(nm);
    if(s.dataset.co){ var co=document.createElement('span'); co.className='co'; co.textContent=s.dataset.co; b.appendChild(co); }
    b.addEventListener('click',function(){go(i)});
    tabs.appendChild(b);
  });

  function setNext(){
    nextLabel.textContent='';
    var b=document.createElement('b');
    nextLabel.appendChild(document.createTextNode('다음 · ')); b.textContent=slides[(cur+1)%N].dataset.title; nextLabel.appendChild(b);
  }
  function render(){
    slides.forEach(function(s,i){ s.classList.toggle('is-active',i===cur); s.setAttribute('aria-hidden',i!==cur); s.inert=(i!==cur) });
    tabs.querySelectorAll('.pv-tab').forEach(function(el,i){ el.classList.toggle('active',i===cur); el.setAttribute('aria-current',i===cur?'true':'false') });
    setNext();
  }
  // 자동 순환: 마우스·포커스가 있거나 화면 밖이면 멈추고, 모션 줄이기 설정이면 돌리지 않는다
  var AUTO_MS=6500, timer=null, held=false, onScreen=false;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  function stopAuto(){ if(timer){ clearInterval(timer); timer=null } }
  function runAuto(){
    stopAuto();
    if(reduce||held||!onScreen||document.hidden) return;
    timer=setInterval(function(){ go(cur+1,true) },AUTO_MS);
  }
  function go(i,auto){ cur=(i+N)%N; render(); if(!auto) runAuto() }
  banner.addEventListener('pointerenter',function(){ held=true; stopAuto() });
  banner.addEventListener('pointerleave',function(){ held=false; runAuto() });
  banner.addEventListener('focusin',function(){ held=true; stopAuto() });
  banner.addEventListener('focusout',function(){ held=false; runAuto() });
  document.addEventListener('visibilitychange',runAuto);
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(e){ onScreen=e[0].isIntersecting; runAuto() }).observe(banner);
  }

  document.getElementById('pvPrev').addEventListener('click',function(){go(cur-1)});
  document.getElementById('pvNext').addEventListener('click',function(){go(cur+1)});
  nextLabel.addEventListener('click',function(){ go(cur+1) });
  // 좌우 키: 배너가 화면에 보일 때만
  document.addEventListener('keydown',function(e){
    if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft') return;
    var r=banner.getBoundingClientRect(); if(r.bottom<0||r.top>innerHeight) return;
    var t=e.target; if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA')) return;
    go(cur+(e.key==='ArrowRight'?1:-1));
  });

  // 드래그·스와이프 (이미지 위에서 시작해도 됨, 드래그 후 클릭은 무시)
  var sx=null, dragged=false;
  stage.addEventListener('pointerdown',function(e){ sx=e.clientX; dragged=false });
  window.addEventListener('pointermove',function(e){
    if(sx===null) return; var dx=e.clientX-sx;
    if(Math.abs(dx)>6) dragged=true;
    var img=slides[cur].querySelector('.pv-media img'); if(img&&dragged) img.style.transform='translateX('+(dx*.15)+'px)';
  });
  window.addEventListener('pointerup',function(e){
    if(sx===null) return; var dx=e.clientX-sx; sx=null;
    var img=slides[cur].querySelector('.pv-media img'); if(img) img.style.transform='';
    if(dx<-60) go(cur+1); else if(dx>60) go(cur-1);
    if(dragged) setTimeout(function(){dragged=false},60);
  });
  stage.addEventListener('click',function(e){ if(dragged){ e.preventDefault(); e.stopPropagation() } },true);

  slides.forEach(function(s){
    var img=s.querySelector('.pv-media img'), fig=s.querySelector('.pv-media');
    function bad(){ fig.classList.add('broken') }
    img.addEventListener('error',bad);
    if(img.complete && img.naturalWidth===0) bad();
  });

  render();
})();

/* home-projects.js — 대표 프로젝트 배너(기준별 3장) */
(function(){
  var banner=document.getElementById('pvBanner'); if(!banner) return;
  var slides=[].slice.call(banner.querySelectorAll('.pv-slide'));
  var N=slides.length, cur=0;
  var tabs=document.getElementById('pvTabs'), count=document.getElementById('pvCount'), nextLabel=document.getElementById('pvNextLabel');
  var stage=document.getElementById('pvStage');

  slides.forEach(function(s,i){
    var b=document.createElement('button'); b.type='button'; b.className='pv-tab';
    var k=document.createElement('span'); k.className='k';
    var num=document.createElement('b'); num.textContent=s.dataset.num;
    var kl=document.createElement('span'); kl.className='kl'; kl.textContent=s.dataset.k;
    k.appendChild(num); k.appendChild(kl);
    var nm=document.createElement('span'); nm.className='nm'; nm.textContent=s.dataset.title;
    b.appendChild(k); b.appendChild(nm);
    b.addEventListener('click',function(){go(i)});
    tabs.appendChild(b);
  });

  function setNext(){
    nextLabel.textContent='';
    var b=document.createElement('b');
    if(cur===N-1){ b.textContent='전체 프로젝트 보기 ↓'; nextLabel.appendChild(b); nextLabel.dataset.mode='list'; }
    else { nextLabel.appendChild(document.createTextNode('다음 · ')); b.textContent=slides[cur+1].dataset.title; nextLabel.appendChild(b); nextLabel.dataset.mode='next'; }
  }
  function render(){
    slides.forEach(function(s,i){ s.classList.toggle('is-active',i===cur); s.setAttribute('aria-hidden',i!==cur); s.inert=(i!==cur) });
    tabs.querySelectorAll('.pv-tab').forEach(function(el,i){ el.classList.toggle('active',i===cur); el.setAttribute('aria-current',i===cur?'true':'false') });
    count.innerHTML='<b>'+('0'+(cur+1)).slice(-2)+'</b> / 0'+N;
    setNext();
  }
  function go(i){ cur=(i+N)%N; render() }

  document.getElementById('pvPrev').addEventListener('click',function(){go(cur-1)});
  document.getElementById('pvNext').addEventListener('click',function(){go(cur+1)});
  nextLabel.addEventListener('click',function(){
    if(nextLabel.dataset.mode==='list') document.getElementById('pvList').scrollIntoView({behavior:'smooth'});
    else go(cur+1);
  });
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

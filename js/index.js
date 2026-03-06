(function(){
  'use strict';
  const EMAIL = 'senowendyle793@gmail.com';
  const $  = (s,c=document) => c.querySelector(s);
  const $$ = (s,c=document) => [...c.querySelectorAll(s)];
  const ROOT = document.documentElement;

  /* ── THEME ─────────────────────────────── */
  const themeBtn  = $('#pill-theme');
  const themeIcon = themeBtn?.querySelector('.theme-icon');
  function applyTheme(dark){
    ROOT.setAttribute('data-theme', dark ? 'dark' : 'light');
    if(themeIcon) themeIcon.textContent = dark ? '☀️' : '🌙';
    try{ localStorage.setItem('wcs-theme', dark?'dark':'light'); }catch{}
  }
  let stored; try{ stored=localStorage.getItem('wcs-theme'); }catch{}
  const osDark = window.matchMedia?.('(prefers-color-scheme:dark)').matches ?? true;
  applyTheme(stored ? stored==='dark' : osDark!==false);
  themeBtn?.addEventListener('click',()=>applyTheme(ROOT.getAttribute('data-theme')!=='dark'));

  /* ── COPY EMAIL ─────────────────────────── */
  const toast    = $('#toast');
  const toastTxt = $('#toast-txt');
  let toastTimer = null;

  function showToast(msg){
    if(toastTxt) toastTxt.textContent = msg;
    toast?.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(()=>toast?.classList.remove('show'), 2800);
  }

  window.copyEmail = function(btn){
    const finish = ()=>{
      showToast('Copied! → '+EMAIL);
      if(btn){ btn.classList.add('copied'); setTimeout(()=>btn?.classList.remove('copied'),2400); }
    };
    if(navigator.clipboard?.writeText){
      navigator.clipboard.writeText(EMAIL).then(finish).catch(()=>fallbackCopy(finish));
    } else { fallbackCopy(finish); }
  };

  function fallbackCopy(cb){
    /* execCommand fallback — works in older browsers / some WebViews */
    try{
      const el = document.createElement('textarea');
      el.value = EMAIL;
      el.setAttribute('readonly','');
      el.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      document.body.appendChild(el);
      el.select(); el.setSelectionRange(0,99999);
      document.execCommand('copy');
      document.body.removeChild(el);
      cb();
    }catch{
      showToast(EMAIL); /* last resort: just show address */
    }
  }

  /* Wire all copy-btn elements */
  $$('.copy-btn').forEach(btn=>btn.addEventListener('click',()=>copyEmail(btn)));

  /* Pill "Hire Me" */
  $('#pill-hire')?.addEventListener('click',()=>copyEmail(null));

  /* Sheet copy */
  $('#sheet-copy')?.addEventListener('click',()=>{ copyEmail(null); closeSheet(); });

  /* ── PILL NAV ACTIVE INDICATOR ──────────── */
  const pillNav = $('#pill-nav');
  const ind     = $('#pill-ind');
  const navAs   = $$('.pill-links a[data-sec]');

  function moveInd(link){
    if(!ind || !link || !pillNav) return;
    const nr = pillNav.getBoundingClientRect();
    const lr = link.getBoundingClientRect();
    ind.style.cssText = `left:${lr.left-nr.left}px;width:${lr.width}px;height:${lr.height}px;top:${lr.top-nr.top}px;opacity:1`;
  }
  function clearInd(){ if(ind) ind.style.opacity='0'; navAs.forEach(l=>l.classList.remove('active')); }

  /* IntersectionObserver per section */
  const secObs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const link = navAs.find(l=>l.dataset.sec===e.target.id);
      if(link){ navAs.forEach(l=>l.classList.remove('active')); link.classList.add('active'); moveInd(link); }
    });
  },{ rootMargin:'-28% 0px -62% 0px', threshold:0 });

  navAs.map(l=>document.getElementById(l.dataset.sec)).filter(Boolean).forEach(s=>secObs.observe(s));

  window.addEventListener('resize',()=>{
    const a = navAs.find(l=>l.classList.contains('active'));
    if(a) moveInd(a);
  });

  /* ── MOBILE SHEET ───────────────────────── */
  const hamBtn = $('#pill-ham');
  const sheet  = $('#pill-sheet');

  function openSheet(){ sheet?.classList.add('open'); hamBtn?.classList.add('open'); hamBtn?.setAttribute('aria-expanded','true'); }
  function closeSheet(){ sheet?.classList.remove('open'); hamBtn?.classList.remove('open'); hamBtn?.setAttribute('aria-expanded','false'); }

  hamBtn?.addEventListener('click',e=>{ e.stopPropagation(); sheet?.classList.contains('open')?closeSheet():openSheet(); });
  $$('.sl').forEach(a=>a.addEventListener('click',closeSheet));
  document.addEventListener('click',e=>{ if(!pillNav?.contains(e.target)&&!sheet?.contains(e.target)) closeSheet(); });

  /* ── SMOOTH SCROLL ──────────────────────── */
  document.addEventListener('click',e=>{
    const a = e.target.closest('a[href^="#"]');
    if(!a) return;
    const id = a.getAttribute('href');
    if(!id||id==='#'){ e.preventDefault(); return; }
    const t = document.querySelector(id);
    if(t){ e.preventDefault(); window.scrollTo({top:t.getBoundingClientRect().top+scrollY-88,behavior:'smooth'}); }
  });

  /* ── SCROLL REVEAL ──────────────────────── */
  const revObs = new IntersectionObserver((en,ob)=>{
    en.forEach(e=>{ if(!e.isIntersecting) return; setTimeout(()=>e.target.classList.add('visible'),60); ob.unobserve(e.target); });
  },{ threshold:.06 });
  $$('.section,.hero,.stats-s').forEach(el=>revObs.observe(el));

  /* ── STAT COUNTUP ───────────────────────── */
  const cntObs = new IntersectionObserver((en,ob)=>{
    en.forEach(e=>{
      if(!e.isIntersecting) return;
      const el=e.target, tgt=parseInt(el.dataset.target,10), sfx=el.dataset.suffix||'';
      if(isNaN(tgt)) return;
      const steps=60,ms=Math.round(900/steps),inc=Math.ceil(tgt/steps);
      let cur=0;
      el.textContent='0'+sfx;
      const t=setInterval(()=>{ cur=Math.min(cur+inc,tgt); el.textContent=cur.toLocaleString()+sfx; if(cur>=tgt){ clearInterval(t); el.textContent=tgt.toLocaleString()+sfx; } },ms);
      ob.unobserve(el);
    });
  },{ threshold:.5 });
  $$('.stat-num[data-target]').forEach(el=>cntObs.observe(el));

  /* ── TYPEWRITER ─────────────────────────── */
  const typedEl = $('#typed-role');
  if(typedEl){
    const roles=['Technical Support Engineer','SaaS Troubleshooting Expert','Front-End Customization Dev','E-commerce Support Specialist'];
    const CUR='<span class="cursor-blink" aria-hidden="true"></span>';
    let ri=0,ci=0,typing=true,paused=false;
    function tick(){
      const r=roles[ri];
      if(paused){ paused=false; typing=false; setTimeout(tick,60); return; }
      if(typing){ ci++; typedEl.innerHTML='<span class="grad-text">'+r.slice(0,ci)+'</span>'+CUR; if(ci>=r.length){ paused=true; setTimeout(tick,1800); return; } }
      else{ ci--; typedEl.innerHTML='<span class="grad-text">'+r.slice(0,ci)+'</span>'+CUR; if(ci<=0){ ri=(ri+1)%roles.length; typing=true; setTimeout(tick,400); return; } }
      setTimeout(tick,typing?55:30);
    }
    setTimeout(tick,900);
  }

  /* ── SKILL DROPDOWNS ────────────────────── */
  $$('.sk-dd-btn').forEach(btn=>{
    btn.addEventListener('click',e=>{ e.stopPropagation();
      const w=btn.closest('.sk-dd'),was=w.classList.contains('open');
      $$('.sk-dd.open').forEach(x=>{ x.classList.remove('open'); x.querySelector('button')?.setAttribute('aria-expanded','false'); });
      if(!was){ w.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
    });
  });
  document.addEventListener('click',()=>{ $$('.sk-dd.open').forEach(w=>{ w.classList.remove('open'); w.querySelector('button')?.setAttribute('aria-expanded','false'); }); });

  /* ── LIGHTBOX ───────────────────────────── */
  const lb=$('#lb'), lbImg=$('#lb-img'), lbClose=$('#lb-close'), lbBd=$('#lb-bd');
  function openLb(src,alt){ if(!lb||!lbImg) return; lbImg.src=src; lbImg.alt=alt||'Review'; lb.classList.add('open'); document.body.style.overflow='hidden'; }
  function closeLb(){ lb?.classList.remove('open'); document.body.style.overflow=''; setTimeout(()=>{ if(lbImg) lbImg.src=''; },300); }
  lbClose?.addEventListener('click',closeLb);
  lbBd?.addEventListener('click',closeLb);

  /* ── UNIFIED CAROUSEL ───────────────────── */
  (function initCarousel(){
    const track     = $('#rc-track');
    const prevBtn   = $('#rc-prev');
    const nextBtn   = $('#rc-next');
    const prog      = $('#rc-prog');
    const curEl     = $('#rc-cur');
    const pauseBtn  = $('#rc-pause');
    const pauseIcon = $('#rc-pause-icon');
    const pauseLbl  = $('#rc-pause-label');
    if(!track) return;

    const slides = [...track.querySelectorAll('.rc-slide')];
    const TOTAL  = slides.length;
    const DELAY  = 2500; // ms
    let   cur    = 0;
    let   paused = false;
    let   timer  = null;
    let   isDrag = false;
    let   dragStartX = 0;
    let   dragScrollLeft = 0;

    /* ── Go to slide ── */
    function goTo(idx, animate=true){
      cur = ((idx % TOTAL) + TOTAL) % TOTAL;
      const slideW = slides[0].offsetWidth;
      track.scrollTo({ left: cur * slideW, behavior: animate ? 'smooth' : 'instant' });
      if(curEl) curEl.textContent = cur + 1;
      restartSweep();
    }

    /* ── Progress sweep ── */
    function restartSweep(){
      if(!prog) return;
      prog.classList.remove('run');
      void prog.offsetWidth; // reflow to restart animation
      if(!paused) prog.classList.add('run');
    }

    /* ── Auto-advance timer ── */
    function startTimer(){
      clearTimeout(timer);
      if(paused) return;
      timer = setTimeout(()=>{ goTo(cur + 1); startTimer(); }, DELAY);
    }
    function stopTimer(){ clearTimeout(timer); }

    /* ── Pause / resume ── */
    function setPaused(val){
      paused = val;
      if(pauseIcon) pauseIcon.textContent = paused ? '▶' : '⏸';
      if(pauseLbl){
        pauseLbl.textContent = paused ? 'Paused' : 'Auto-playing';
        pauseLbl.classList.toggle('rc-paused-label', paused);
      }
      if(paused){ stopTimer(); if(prog) prog.classList.remove('run'); }
      else      { restartSweep(); startTimer(); }
    }

    pauseBtn?.addEventListener('click',()=> setPaused(!paused));

    /* ── Prev / Next buttons ── */
    prevBtn?.addEventListener('click',()=>{ setPaused(true); goTo(cur - 1); });
    nextBtn?.addEventListener('click',()=>{ setPaused(true); goTo(cur + 1); });

    /* ── Sync on native scroll (touch/trackpad) ── */
    let syncTimer;
    track.addEventListener('scroll',()=>{
      clearTimeout(syncTimer);
      syncTimer = setTimeout(()=>{
        const slideW = slides[0].offsetWidth || track.offsetWidth;
        const idx    = Math.round(track.scrollLeft / slideW);
        if(idx !== cur){
          cur = Math.max(0, Math.min(idx, TOTAL-1));
          if(curEl) curEl.textContent = cur + 1;
          restartSweep();
          if(!paused){ stopTimer(); startTimer(); }
        }
      }, 80);
    },{ passive:true });

    /* ── Mouse drag (desktop) ── */
    track.addEventListener('mousedown', e=>{
      isDrag=true; dragStartX=e.pageX; dragScrollLeft=track.scrollLeft;
      track.classList.add('is-dragging');
      stopTimer();
    });
    document.addEventListener('mousemove', e=>{
      if(!isDrag) return;
      track.scrollLeft = dragScrollLeft - (e.pageX - dragStartX);
    });
    document.addEventListener('mouseup', ()=>{
      if(!isDrag) return;
      isDrag=false;
      track.classList.remove('is-dragging');
      // snap to nearest
      const slideW = slides[0].offsetWidth || track.offsetWidth;
      const idx    = Math.round(track.scrollLeft / slideW);
      goTo(Math.max(0, Math.min(idx, TOTAL-1)));
      if(!paused) startTimer();
    });

    /* ── Click on slide → lightbox (not drag) ── */
    track.addEventListener('click', e=>{
      if(isDrag) return;
      const slide = e.target.closest('.rc-slide');
      if(!slide) return;
      const img   = slide.querySelector('.rc-img');
      if(img?.src) openLb(img.src, img.alt);
    });

    /* ── Keyboard ── */
    track.addEventListener('keydown', e=>{
      if(e.key==='Enter'){ const s=document.activeElement?.closest('.rc-slide'); if(s){ const i=s.querySelector('.rc-img'); if(i?.src) openLb(i.src,i.alt); } }
      if(e.key==='ArrowLeft'){ setPaused(true); goTo(cur-1); }
      if(e.key==='ArrowRight'){ setPaused(true); goTo(cur+1); }
    });

    /* ── Pause on hover ── */
    track.addEventListener('mouseenter',()=>{ if(!paused){ stopTimer(); if(prog) prog.style.animationPlayState='paused'; } });
    track.addEventListener('mouseleave',()=>{ if(!paused){ if(prog) prog.style.animationPlayState='running'; startTimer(); } });

    /* ── Pause when tab hidden ── */
    document.addEventListener('visibilitychange',()=>{
      if(document.hidden) stopTimer();
      else if(!paused) startTimer();
    });

    /* ── Init ── */
    goTo(0, false);
    startTimer();
  })();

  /* ── ESCAPE ───────────────────────────────── */
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      if(lb?.classList.contains('open')) closeLb();
      else closeSheet();
    }
  });

})();

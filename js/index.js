(function(){
  'use strict';
  const EMAIL = 'senowendyle793@gmail.com';
  const $  = (s,c=document) => c.querySelector(s);
  const $$ = (s,c=document) => [...c.querySelectorAll(s)];
  const ROOT = document.documentElement;
  const loaderStarted = performance.now();

  /* LOADER */
  const siteLoader = $('#site-loader');
  function hideLoader(){
    if(!siteLoader) return;
    const wait = Math.max(0, 900 - (performance.now() - loaderStarted));
    setTimeout(()=>{
      siteLoader.classList.add('is-hidden');
      siteLoader.setAttribute('aria-hidden','true');
      setTimeout(()=>siteLoader.remove(),420);
    },wait);
  }
  if(document.readyState === 'complete') hideLoader();
  else window.addEventListener('load',hideLoader,{ once:true });

  /* THEME */
  const themeBtn  = $('#pill-theme');
  function applyTheme(dark){
    ROOT.setAttribute('data-theme', dark ? 'dark' : 'light');
    themeBtn?.setAttribute('aria-label',dark ? 'Switch to light theme' : 'Switch to dark theme');
    themeBtn?.setAttribute('title',dark ? 'Switch to light theme' : 'Switch to dark theme');
    try{ localStorage.setItem('wcs-theme', dark?'dark':'light'); }catch{}
  }
  let stored; try{ stored=localStorage.getItem('wcs-theme'); }catch{}
  applyTheme(stored ? stored==='dark' : true);
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

  /* Shared tooltip actions */
  const ctaWrap = $('#hero-ctas');
  const ctaTip = $('#hero-cta-tooltip');
  if(ctaWrap && ctaTip){
    let tipTimer = null;
    const showCtaTip = el => {
      clearTimeout(tipTimer);
      const wr = ctaWrap.getBoundingClientRect();
      const er = el.getBoundingClientRect();
      ctaTip.textContent = el.dataset.tooltip || el.getAttribute('aria-label') || '';
      ctaTip.style.left = `${er.left - wr.left + er.width / 2}px`;
      ctaTip.style.top = `${er.top - wr.top - 12}px`;
      ctaTip.setAttribute('aria-hidden','false');
      ctaTip.classList.add('show');
    };
    const hideCtaTip = () => {
      clearTimeout(tipTimer);
      tipTimer = setTimeout(()=>{
        ctaTip.classList.remove('show');
        ctaTip.setAttribute('aria-hidden','true');
      },150);
    };
    $$('.hero-action',ctaWrap).forEach(action=>{
      action.addEventListener('pointerenter',()=>showCtaTip(action));
      action.addEventListener('mouseenter',()=>showCtaTip(action));
      action.addEventListener('mouseover',()=>showCtaTip(action));
      action.addEventListener('focus',()=>showCtaTip(action));
      action.addEventListener('click',()=>showCtaTip(action));
      action.addEventListener('mouseleave',hideCtaTip);
      action.addEventListener('pointerleave',hideCtaTip);
      action.addEventListener('blur',hideCtaTip);
    });
  }

  /* ── PILL NAV ACTIVE INDICATOR ──────────── */
  const pillNav = $('#pill-nav');
  const ind     = $('#pill-ind');
  const navAs   = $$('.pill-links a[data-sec]');

  function moveInd(link){
    if(!ind || !link || !pillNav) return;
    if(link.offsetParent === null){ ind.style.opacity='0'; return; }
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
    if(t){
      e.preventDefault();
      const offset = id === '#stats' ? 170 : 88;
      window.scrollTo({top:t.getBoundingClientRect().top+scrollY-offset,behavior:'smooth'});
    }
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

  /* ── STAT FOLDER PREVIEWS ───────────────── */
  $$('.folder-stat').forEach(card=>{
    const show = () => {
      $$('.folder-stat.preview-active').forEach(active=>{ if(active!==card) active.classList.remove('preview-active'); });
      card.classList.add('preview-active');
    };
    const hide = () => card.classList.remove('preview-active');
    card.addEventListener('pointerenter',show);
    card.addEventListener('mouseenter',show);
    card.addEventListener('focus',show);
    card.addEventListener('click',show);
    card.addEventListener('pointerleave',hide);
    card.addEventListener('mouseleave',hide);
    card.addEventListener('blur',hide);
  });

  /* ── ABOUT CYLINDER CAROUSEL ────────────── */
  (function initAboutCylinder(){
    const root = $('[data-cylinder-carousel]');
    if(!root) return;
    const stage = $('.cyl-stage',root);
    const items = $$('[data-cyl-item]',root);
    const prev = $('.cyl-prev',root);
    const next = $('.cyl-next',root);
    const dotsWrap = $('.cyl-dots',root);
    if(!stage || !items.length || !dotsWrap) return;

    let active = 0;
    let timer = null;
    let dragX = null;
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const dots = items.map((item,i)=>{
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'cyl-dot';
      dot.setAttribute('role','tab');
      dot.setAttribute('aria-label',`Show ${item.getAttribute('aria-label') || `capability ${i+1}`}`);
      dot.addEventListener('click',()=>go(i,true));
      dotsWrap.appendChild(dot);
      return dot;
    });

    function signedOffset(i){
      const len = items.length;
      let offset = (i - active + len) % len;
      if(offset > len / 2) offset -= len;
      return offset;
    }

    function render(){
      items.forEach((item,i)=>{
        const offset = signedOffset(i);
        const abs = Math.abs(offset);
        const hidden = abs > 1;
        item.classList.toggle('is-active',offset === 0);
        item.setAttribute('aria-hidden',hidden ? 'true' : 'false');
        item.style.setProperty('--cyl-x',offset === 0 ? '0px' : `${offset * 45}%`);
        item.style.setProperty('--cyl-z',offset === 0 ? '82px' : '-96px');
        item.style.setProperty('--cyl-rot',offset === 0 ? '0deg' : `${offset * -48}deg`);
        item.style.setProperty('--cyl-scale',offset === 0 ? '1' : '.82');
        item.style.setProperty('--cyl-opacity',hidden ? '0' : (offset === 0 ? '1' : '.48'));
        item.style.setProperty('--cyl-blur',hidden ? '1px' : (offset === 0 ? '0' : '.25px'));
        item.style.setProperty('--cyl-zindex',offset === 0 ? '4' : '2');
      });
      dots.forEach((dot,i)=>{
        dot.setAttribute('aria-selected',String(i === active));
        dot.tabIndex = i === active ? 0 : -1;
      });
      stage.setAttribute('aria-label',items[active]?.getAttribute('aria-label') || 'About capability');
    }

    function go(index,user=false){
      active = (index + items.length) % items.length;
      render();
      if(user) restart();
    }
    const goPrev = user => go(active - 1,user);
    const goNext = user => go(active + 1,user);

    function stop(){ if(timer){ clearInterval(timer); timer = null; } }
    function start(){ if(reduceMotion || timer) return; timer = setInterval(()=>goNext(false),4200); }
    function restart(){ stop(); start(); }

    prev?.addEventListener('click',()=>goPrev(true));
    next?.addEventListener('click',()=>goNext(true));
    stage.addEventListener('keydown',e=>{
      if(e.key === 'ArrowLeft'){ e.preventDefault(); goPrev(true); }
      if(e.key === 'ArrowRight'){ e.preventDefault(); goNext(true); }
      if(e.key === 'Home'){ e.preventDefault(); go(0,true); }
      if(e.key === 'End'){ e.preventDefault(); go(items.length - 1,true); }
    });
    root.addEventListener('pointerenter',stop);
    root.addEventListener('pointerleave',start);
    root.addEventListener('focusin',stop);
    root.addEventListener('focusout',start);
    stage.addEventListener('pointerdown',e=>{ dragX = e.clientX; });
    stage.addEventListener('pointerup',e=>{
      if(dragX === null) return;
      const delta = e.clientX - dragX;
      dragX = null;
      if(Math.abs(delta) < 38) return;
      delta > 0 ? goPrev(true) : goNext(true);
    });

    render();
    start();
  })();

  /* ── SERVICES DIAGONAL CAROUSEL ─────────── */
  (function initServicesDiagonal(){
    const root = $('[data-diagonal-carousel]');
    if(!root) return;
    const viewport = $('.diag-viewport',root);
    const track = $('.diag-track',root);
    const items = $$('[data-diag-item]',root);
    const prev = $('.diag-prev',root);
    const next = $('.diag-next',root);
    const dotsWrap = $('.diag-dots',root);
    if(!viewport || !track || !items.length || !dotsWrap) return;

    let active = 0;
    let dragX = null;
    const rotationStep = 30;
    const verticalStep = 120;
    const inactiveScale = .6;

    const dots = items.map((item,i)=>{
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'diag-dot';
      dot.setAttribute('role','tab');
      dot.setAttribute('aria-label',`Show ${item.querySelector('h3')?.textContent.trim() || `service ${i + 1}`}`);
      dot.addEventListener('click',()=>go(i));
      dotsWrap.appendChild(dot);
      return dot;
    });

    function slideSize(){
      return items[0]?.offsetWidth || 270;
    }

    function render(){
      const size = slideSize();
      track.style.transform = `translateX(${-(active * size + size / 2)}px)`;
      items.forEach((item,i)=>{
        const distance = i - active;
        const isActive = distance === 0;
        const abs = Math.abs(distance);
        item.classList.toggle('is-active',isActive);
        item.setAttribute('aria-hidden',abs > 2 ? 'true' : 'false');
        item.setAttribute('aria-current',isActive ? 'true' : 'false');
        item.tabIndex = isActive ? 0 : -1;
        item.style.setProperty('--diag-rot',`${distance * rotationStep}deg`);
        item.style.setProperty('--diag-y',`${distance * verticalStep}px`);
        item.style.setProperty('--diag-scale',isActive ? '1' : String(inactiveScale));
        item.style.setProperty('--diag-opacity',abs > 2 ? '0' : (isActive ? '1' : '.44'));
        item.style.setProperty('--diag-z',String(items.length - abs));
      });
      dots.forEach((dot,i)=>{
        dot.setAttribute('aria-selected',String(i === active));
        dot.tabIndex = i === active ? 0 : -1;
      });
      prev.disabled = active === 0;
      next.disabled = active === items.length - 1;
      viewport.setAttribute('aria-label',items[active]?.querySelector('h3')?.textContent.trim() || 'Core service');
    }

    function go(index){
      active = Math.max(0,Math.min(items.length - 1,index));
      render();
    }

    prev?.addEventListener('click',()=>go(active - 1));
    next?.addEventListener('click',()=>go(active + 1));
    items.forEach((item,i)=>item.addEventListener('click',()=>go(i)));
    viewport.addEventListener('keydown',e=>{
      if(e.key === 'ArrowLeft'){ e.preventDefault(); go(active - 1); }
      if(e.key === 'ArrowRight'){ e.preventDefault(); go(active + 1); }
      if(e.key === 'Home'){ e.preventDefault(); go(0); }
      if(e.key === 'End'){ e.preventDefault(); go(items.length - 1); }
    });
    viewport.addEventListener('pointerdown',e=>{ dragX = e.clientX; });
    viewport.addEventListener('pointerup',e=>{
      if(dragX === null) return;
      const delta = e.clientX - dragX;
      dragX = null;
      if(Math.abs(delta) < 38) return;
      delta > 0 ? go(active - 1) : go(active + 1);
    });
    window.addEventListener('resize',render);

    render();
  })();

  /* ── MORPH TEXT ─────────────────────────── */
  const typedEl = $('#typed-role');
  if(typedEl){
    const roles=['Technical Support Engineer','SaaS Troubleshooting Expert','Front-End Customization Dev','E-commerce Support Specialist'];
    const interval = 2800;
    const totalDuration = (interval / 1000) * roles.length;
    const wordDuration = interval / 1000;
    typedEl.setAttribute('aria-label', roles.join(', '));
    typedEl.innerHTML = `
      <svg aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0;pointer-events:none">
        <defs>
          <filter id="hero-role-threshold">
            <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      <span class="morph-word-rotator" aria-hidden="true">
        ${roles.map((role,i)=>`<span class="morph-word" style="animation-delay:${i * wordDuration}s;animation-duration:${totalDuration}s">${role}</span>`).join('')}
      </span>`;
  }

  /* ── SKILL DROPDOWNS ────────────────────── */
  function closeSkillDropdowns(){
    $$('.sk-dd.open').forEach(w=>{
      w.classList.remove('open');
      w.querySelector('button')?.setAttribute('aria-expanded','false');
    });
    $$('.has-open-dropdown').forEach(el=>el.classList.remove('has-open-dropdown'));
  }
  $$('.sk-dd-btn').forEach(btn=>{
    btn.addEventListener('click',e=>{ e.stopPropagation();
      const w=btn.closest('.sk-dd'),was=w.classList.contains('open');
      closeSkillDropdowns();
      if(!was){
        w.classList.add('open');
        btn.setAttribute('aria-expanded','true');
        w.closest('.bento-card')?.classList.add('has-open-dropdown');
        w.closest('.bento-stack')?.classList.add('has-open-dropdown');
      }
    });
  });
  document.addEventListener('click',closeSkillDropdowns);

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

    track.addEventListener('mousedown', e=>{
      isDrag=true; dragStartX=e.pageX; dragScrollLeft=track.scrollLeft;
      track.classList.add('is-dragging');
      stopTimer();
    });

    /* ── Mouse drag (desktop) ── */
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


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

  /* ── REVIEWS MODAL ──────────────────────── */
  const revModal=$ ('#rev-modal'), openBtn=$('#rev-open'), closeBtn=$('#rev-close'), mBd=$('#m-bd');
  function openModal(){ revModal?.classList.add('open'); document.body.style.overflow='hidden'; revModal?.querySelector('.m-body')?.scrollTop && (revModal.querySelector('.m-body').scrollTop=0); setTimeout(()=>closeBtn?.focus(),50); }
  function closeModal(){ revModal?.classList.remove('open'); if(!$('#lb')?.classList.contains('open')) document.body.style.overflow=''; openBtn?.focus(); }
  openBtn?.addEventListener('click',openModal);
  closeBtn?.addEventListener('click',closeModal);
  mBd?.addEventListener('click',closeModal);

  /* ── LIGHTBOX ───────────────────────────── */
  const lb=$('#lb'), lbImg=$('#lb-img'), lbClose=$('#lb-close'), lbBd=$('#lb-bd');
  function openLb(src,alt){ if(!lb||!lbImg) return; lbImg.src=src; lbImg.alt=alt||'Review'; lb.classList.add('open'); document.body.style.overflow='hidden'; }
  function closeLb(){ lb?.classList.remove('open'); if(!revModal?.classList.contains('open')) document.body.style.overflow=''; setTimeout(()=>{ if(lbImg) lbImg.src=''; },300); }
  document.addEventListener('click',e=>{ const row=e.target.closest('.rev-row'); if(!row) return; const img=row.querySelector('img'); if(img?.src) openLb(img.src,img.alt); });
  document.addEventListener('keydown',e=>{ if(e.key==='Enter'&&document.activeElement?.classList.contains('rev-row')){ const img=document.activeElement.querySelector('img'); if(img?.src) openLb(img.src,img.alt); } });
  lbClose?.addEventListener('click',closeLb);
  lbBd?.addEventListener('click',closeLb);

  /* ── ESCAPE ───────────────────────────────── */
  document.addEventListener('keydown',e=>{
    if(e.key!=='Escape') return;
    if(lb?.classList.contains('open'))           closeLb();
    else if(revModal?.classList.contains('open')) closeModal();
    else                                          closeSheet();
  });

  /* ── MOBILE CAROUSEL ────────────────────── */
  (function initCarousel(){
    const carousel = $('#rev-carousel');
    const dots     = $$('#rev-dots .rev-dot');
    const counter  = $('#rev-cur');
    if(!carousel) return;

    let scrollTimer;
    carousel.addEventListener('scroll', ()=>{
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(()=>{
        const cardW  = carousel.firstElementChild?.offsetWidth || carousel.offsetWidth;
        const gap    = 12;
        const idx    = Math.round(carousel.scrollLeft / (cardW + gap));
        const active = Math.max(0, Math.min(idx, dots.length - 1));
        dots.forEach((d,i)=>{
          d.classList.toggle('active', i===active);
          d.setAttribute('aria-selected', i===active ? 'true':'false');
        });
        if(counter) counter.textContent = active + 1;
      }, 60);
    }, { passive:true });

    dots.forEach(dot=>{
      dot.addEventListener('click',()=>{
        const i    = parseInt(dot.dataset.dot, 10);
        const card = carousel.children[i];
        if(card) card.scrollIntoView({ behavior:'smooth', block:'nearest', inline:'center' });
      });
    });

    carousel.addEventListener('click', e=>{
      const card = e.target.closest('.rev-card');
      if(!card) return;
      const img = card.querySelector('.rev-card-img');
      if(img?.src) openLb(img.src, img.alt);
    });

    carousel.addEventListener('keydown', e=>{
      if(e.key==='Enter'){
        const card = document.activeElement?.closest('.rev-card');
        if(card){ const img=card.querySelector('.rev-card-img'); if(img?.src) openLb(img.src,img.alt); }
      }
    });
  })();

})();

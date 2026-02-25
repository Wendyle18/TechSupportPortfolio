document.addEventListener('DOMContentLoaded', function () {

  /* ─────────────────────────────────────────
     DARK MODE
  ───────────────────────────────────────── */
  const toggle       = document.getElementById('theme-toggle');
  const icon         = toggle?.querySelector('.theme-icon');
  const profilePhoto = document.querySelector('.profile-photo');

  function setTheme(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (icon) icon.textContent = dark ? '☀️' : '🌙';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
    if (profilePhoto) {
      if (dark) {
        const dp = localStorage.getItem('dark-profile-photo');
        if (dp) profilePhoto.src = dp;
      } else {
        profilePhoto.src = localStorage.getItem('light-profile-photo') || 'assets/img/WCS Photo.png';
      }
    }
  }

  if (profilePhoto && !localStorage.getItem('light-profile-photo')) {
    localStorage.setItem('light-profile-photo', profilePhoto.getAttribute('src'));
  }
  setTheme(localStorage.getItem('theme') === 'dark');
  toggle?.addEventListener('click', () => {
    setTheme(document.documentElement.getAttribute('data-theme') !== 'dark');
  });


  /* ─────────────────────────────────────────
     SMOOTH SCROLL
  ───────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (!id || id === '#') { e.preventDefault(); return; }
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 24,
          behavior: 'smooth'
        });
      }
    });
  });


  /* ─────────────────────────────────────────
     FADE-IN ON SCROLL
  ───────────────────────────────────────── */
  const fadeable = document.querySelectorAll('.section, .profile-header, .stats-bar');
  fadeable.forEach(el => el.classList.add('fade-in'));

  const fadeObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), 60);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  fadeable.forEach(el => fadeObs.observe(el));


  /* ─────────────────────────────────────────
     STAT COUNTUP
  ───────────────────────────────────────── */
  const statObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const m  = el.textContent.trim().match(/^(\d+)(\D*)$/);
      if (!m) { obs.unobserve(el); return; }
      const end = parseInt(m[1]), suffix = m[2];
      let cur = 0;
      const steps = 60, ms = Math.round(900 / steps), inc = Math.ceil(end / steps);
      el.textContent = '0' + suffix;
      const t = setInterval(() => {
        cur = Math.min(cur + inc, end);
        el.textContent = cur + suffix;
        if (cur >= end) { el.textContent = end + suffix; clearInterval(t); }
      }, ms);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number').forEach(el => statObs.observe(el));


  /* ─────────────────────────────────────────
     TAG DROPDOWNS
  ───────────────────────────────────────── */
  document.querySelectorAll('.tag-dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      const wrapper = this.closest('.tag-dropdown-wrapper');
      const wasOpen = wrapper.classList.contains('open');
      document.querySelectorAll('.tag-dropdown-wrapper.open').forEach(w => w.classList.remove('open'));
      if (!wasOpen) wrapper.classList.add('open');
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.tag-dropdown-wrapper.open').forEach(w => w.classList.remove('open'));
  });


  /* ─────────────────────────────────────────
     REVIEWS MODAL
  ───────────────────────────────────────── */
  const reviewsModal    = document.getElementById('reviews-modal');
  const reviewsOpenBtn  = document.getElementById('reviews-open-modal');
  const reviewsCloseBtn = document.getElementById('reviews-modal-close');
  const reviewsBackdrop = document.getElementById('reviews-modal-backdrop');

  function openReviewsModal() {
    if (!reviewsModal) return;
    reviewsModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    const body = reviewsModal.querySelector('.reviews-modal-body');
    if (body) body.scrollTop = 0;
    setTimeout(() => reviewsCloseBtn?.focus(), 50);
  }

  function closeReviewsModal() {
    if (!reviewsModal) return;
    reviewsModal.classList.remove('open');
    document.body.style.overflow = '';
    reviewsOpenBtn?.focus();
  }

  reviewsOpenBtn?.addEventListener('click', openReviewsModal);
  reviewsCloseBtn?.addEventListener('click', closeReviewsModal);
  reviewsBackdrop?.addEventListener('click', closeReviewsModal);


  /* ─────────────────────────────────────────
     LIGHTBOX
     Works on both preview rows and modal rows.
  ───────────────────────────────────────── */
  const lightbox    = document.getElementById('lightbox');
  const lbImg       = document.getElementById('lightbox-img');
  const lbClose     = document.getElementById('lightbox-close');
  const lbBackdrop  = document.getElementById('lightbox-backdrop');

  function openLightbox(src, alt) {
    if (!lightbox || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = alt || 'Shopify review';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    if (!reviewsModal?.classList.contains('open')) {
      document.body.style.overflow = '';
    }
    setTimeout(() => { if (lbImg) lbImg.src = ''; }, 300);
  }

  document.querySelectorAll('.review-row').forEach(row => {
    row.addEventListener('click', () => {
      const img = row.querySelector('img');
      if (img?.src) openLightbox(img.src, img.alt);
    });
  });

  lbClose?.addEventListener('click', closeLightbox);
  lbBackdrop?.addEventListener('click', closeLightbox);


  /* ─────────────────────────────────────────
     KEYBOARD — Escape closes topmost layer
  ───────────────────────────────────────── */
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (lightbox?.classList.contains('open')) {
      closeLightbox();
    } else if (reviewsModal?.classList.contains('open')) {
      closeReviewsModal();
    }
  });

});

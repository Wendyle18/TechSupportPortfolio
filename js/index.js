document.addEventListener('DOMContentLoaded', function () {

  /* ─── Dark Mode ─── */
  const toggle = document.getElementById('theme-toggle');
  const icon = toggle?.querySelector('.theme-icon');
  const saved = localStorage.getItem('theme');
  const profilePhoto = document.querySelector('.profile-photo');

  function setTheme(dark) {document.addEventListener('DOMContentLoaded', function () {

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
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 24, behavior: 'smooth' });
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
  const statObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const m  = el.textContent.trim().match(/^(\d+)(\D*)$/);
      if (!m) { statObs.unobserve(el); return; }
      const end = parseInt(m[1]), suffix = m[2];
      let cur = 0;
      const steps = 60, ms = Math.round(900 / steps), inc = Math.ceil(end / steps);
      el.textContent = '0' + suffix;
      const t = setInterval(() => {
        cur = Math.min(cur + inc, end);
        el.textContent = cur + suffix;
        if (cur >= end) { el.textContent = end + suffix; clearInterval(t); }
      }, ms);
      statObs.unobserve(el);
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
     Opens a bottom-sheet with all 28 reviews.
  ───────────────────────────────────────── */
  const reviewsModal    = document.getElementById('reviews-modal');
  const reviewsOpenBtn  = document.getElementById('reviews-open-modal');
  const reviewsCloseBtn = document.getElementById('reviews-modal-close');
  const reviewsBackdrop = document.getElementById('reviews-modal-backdrop');

  function openReviewsModal() {
    reviewsModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Reset scroll to top on open
    const body = reviewsModal.querySelector('.reviews-modal-body');
    if (body) body.scrollTop = 0;
    // Focus trap — focus the close button
    setTimeout(() => reviewsCloseBtn?.focus(), 50);
  }

  function closeReviewsModal() {
    reviewsModal.classList.remove('open');
    document.body.style.overflow = '';
    reviewsOpenBtn?.focus();
  }

  reviewsOpenBtn?.addEventListener('click', openReviewsModal);
  reviewsCloseBtn?.addEventListener('click', closeReviewsModal);
  reviewsBackdrop?.addEventListener('click', closeReviewsModal);


  /* ─────────────────────────────────────────
     LIGHTBOX
     Shared — works on preview rows AND modal rows.
     Click any .review-row to open its image full-screen.
  ───────────────────────────────────────── */
  const lightbox   = document.getElementById('lightbox');
  const lbImg      = document.getElementById('lightbox-img');
  const lbClose    = document.getElementById('lightbox-close');
  const lbBackdrop = document.getElementById('lightbox-backdrop');

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
    // Only restore scroll if the reviews modal isn't also open
    if (!reviewsModal?.classList.contains('open')) {
      document.body.style.overflow = '';
    }
    setTimeout(() => { if (lbImg) lbImg.src = ''; }, 300);
  }

  // Wire ALL review rows (both preview and modal)
  document.querySelectorAll('.review-row').forEach(row => {
    row.addEventListener('click', () => {
      const img = row.querySelector('img');
      if (img?.src) openLightbox(img.src, img.alt);
    });
  });

  lbClose?.addEventListener('click', closeLightbox);
  lbBackdrop?.addEventListener('click', closeLightbox);

  /* ─── Keyboard: Escape closes topmost layer ─── */
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (lightbox?.classList.contains('open')) {
      closeLightbox();
    } else if (reviewsModal?.classList.contains('open')) {
      closeReviewsModal();
    }
  });

});
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (icon) icon.textContent = dark ? '☀️' : '🌙';
    localStorage.setItem('theme', dark ? 'dark' : 'light');

    // ─── Profile photo swap ───
    // To set your dark mode photo, run once in the browser console:
    //   localStorage.setItem('dark-profile-photo', 'assets/img/YOUR_DARK_PHOTO.png');
    if (profilePhoto) {
      if (dark) {
        const darkPhoto = localStorage.getItem('dark-profile-photo') || 'assets/img/dark-mode.jpg';;
        if (darkPhoto) profilePhoto.src = darkPhoto;
      } else {
        const lightPhoto = localStorage.getItem('light-profile-photo') || 'assets/img/WCS Photo.png';
        profilePhoto.src = lightPhoto;
      }
    }
  }

  // Save the default light photo path on first load so we can restore it later
  if (profilePhoto && !localStorage.getItem('light-profile-photo')) {
    localStorage.setItem('light-profile-photo', profilePhoto.getAttribute('src'));
  }

  // Apply saved theme on load (default: light)
  setTheme(saved === 'dark');

  toggle?.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    setTheme(!isDark);
  });

  /* ─── Smooth scrolling for anchor links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') { e.preventDefault(); return; }
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 24;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─── Fade-in on scroll ─── */
  const fadeable = document.querySelectorAll('.section, .profile-header, .stats-bar');
  fadeable.forEach(el => el.classList.add('fade-in'));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  fadeable.forEach(el => observer.observe(el));

  /* ─── Animate stat numbers counting up ─── */
  const statNumbers = document.querySelectorAll('.stat-number');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const raw = el.textContent.trim();
        const numMatch = raw.match(/^(\d+)(\D*)$/);
        if (!numMatch) { statObserver.unobserve(el); return; }
        const end = parseInt(numMatch[1]);
        const suffix = numMatch[2];
        let start = 0;
        const duration = 900;
        const totalSteps = 60;
        const increment = Math.ceil(end / totalSteps);
        const stepMs = Math.round(duration / totalSteps);
        el.textContent = '0' + suffix;
        const timer = setInterval(() => {
          start = Math.min(start + increment, end);
          el.textContent = start + suffix;
          if (start >= end) { el.textContent = end + suffix; clearInterval(timer); }
        }, stepMs);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNumbers.forEach(el => statObserver.observe(el));

  /* ─── Dropdown tag groups ─── */
  document.querySelectorAll('.tag-dropdown-trigger').forEach(trigger => {
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      const wrapper = this.closest('.tag-dropdown-wrapper');
      const isOpen = wrapper.classList.contains('open');
      // Close all open dropdowns first
      document.querySelectorAll('.tag-dropdown-wrapper.open').forEach(w => w.classList.remove('open'));
      // Toggle this one
      if (!isOpen) wrapper.classList.add('open');
    });
  });

  // Close any open dropdown when clicking outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.tag-dropdown-wrapper.open').forEach(w => w.classList.remove('open'));
  });

});




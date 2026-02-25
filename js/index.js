document.addEventListener('DOMContentLoaded', function () {

  /* ─── Dark Mode ─── */
  const toggle = document.getElementById('theme-toggle');
  const icon = toggle?.querySelector('.theme-icon');
  const saved = localStorage.getItem('theme');
  const profilePhoto = document.querySelector('.profile-photo');

  function setTheme(dark) {
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



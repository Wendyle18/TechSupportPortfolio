document.addEventListener('DOMContentLoaded', function () {

  /* ─── Dark Mode ─── */
  const toggle = document.getElementById('theme-toggle');
  const icon = toggle?.querySelector('.theme-icon');
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function setTheme(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (icon) icon.textContent = dark ? '☀️' : '🌙';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }

  // Apply on load — default is always light
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
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // stagger siblings slightly
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, 60);
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
        // Only animate simple numeric values (e.g. "2+", "3", "14+") — skip "3k+" etc.
        const numMatch = raw.match(/^(\d+)(\D*)$/);
        if (!numMatch) { statObserver.unobserve(el); return; }
        const end = parseInt(numMatch[1]);
        const suffix = numMatch[2];
        let start = 0;
        const duration = 900;
        const totalSteps = 60; // ~60 frames regardless of the end number
        const increment = Math.ceil(end / totalSteps);
        const stepMs = Math.round(duration / totalSteps);
        el.textContent = '0' + suffix;
        const timer = setInterval(() => {
          start = Math.min(start + increment, end);
          el.textContent = start + suffix;
          if (start >= end) {
            el.textContent = end + suffix;
            clearInterval(timer);
          }
        }, stepMs);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statObserver.observe(el));

});

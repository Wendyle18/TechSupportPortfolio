document.addEventListener('DOMContentLoaded', function () {

  /* -----------------------------
     Smooth scrolling for anchors
  ------------------------------*/
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      // Modal trigger — let modal logic handle it
      if (this.id === 'open-about-modal') {
        e.preventDefault();
        return;
      }

      // Ignore empty anchors
      if (!targetId || targetId === '#') {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  /* -----------------------------
     About Me Modal logic
  ------------------------------*/
  const openBtn = document.getElementById('open-about-modal');
  const modal = document.getElementById('about-modal');

  if (openBtn && modal) {
    const closeBtn = modal.querySelector('.modal-close');

    // Open modal
    openBtn.addEventListener('click', function (e) {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    // Close modal function
    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Close via button
    closeBtn.addEventListener('click', closeModal);

    // Close when clicking overlay
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Close on ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

});

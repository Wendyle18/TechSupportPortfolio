(function () {
  'use strict';

  if (window.__portfolioAnalyticsBound) return;
  window.__portfolioAnalyticsBound = true;

  const allowedEvents = new Set([
    'portfolio_email_click',
    'portfolio_hire_click',
    'portfolio_linkedin_click',
    'portfolio_github_click',
    'portfolio_resume_download',
    'portfolio_demo_click',
    'portfolio_case_study_click'
  ]);

  document.addEventListener('click', function (event) {
    const link = event.target.closest('[data-analytics-event]');
    if (!link) return;

    const eventName = link.dataset.analyticsEvent;
    if (!allowedEvents.has(eventName) || typeof window.gtag !== 'function') return;

    const eventLocation = link.dataset.analyticsLocation;
    const parameters = eventLocation ? { event_location: eventLocation } : {};
    window.gtag('event', eventName, parameters);
  });
})();

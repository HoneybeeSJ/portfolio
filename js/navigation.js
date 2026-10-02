/* Shared navigation across the portfolio. */
(function () {
  const link = document.querySelector('.back-to-top');
  if (!link) return;
  link.addEventListener('click', function (event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  });
})();

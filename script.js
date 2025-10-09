(function(){
  const nav = document.getElementById('site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelectorAll('.nav-link');

  // Mobile menu toggle
  toggle?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu on link click (mobile)
  links.forEach(a => a.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  }));

  // Scroll spy using IntersectionObserver
  const sections = [...links].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  const setActive = id => {
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0.01 });

  sections.forEach(s => observer.observe(s));
})();
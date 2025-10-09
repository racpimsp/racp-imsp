(function(){
  const nav = document.getElementById('site-nav');
  const toggle = document.querySelector('.nav-toggle');
  toggle?.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, {rootMargin:'-10% 0px -10% 0px', threshold:0.1});
  reveals.forEach(el=>obs.observe(el));

  // Simple counters (data-count)
  const counters = document.querySelectorAll('[data-count]');
  const obs2 = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const el = e.target;
        const end = parseInt(el.getAttribute('data-count'),10) || 0;
        let cur = 0;
        const step = Math.max(1, Math.floor(end/60));
        const t = setInterval(()=>{
          cur += step;
          if(cur >= end){ cur = end; clearInterval(t); }
          el.textContent = cur.toString();
        }, 16);
        obs2.unobserve(el);
      }
    });
  }, {threshold:0.6});
  counters.forEach(el=>obs2.observe(el));
})();
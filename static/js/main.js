(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const loadingScreen = document.querySelector('.loading-screen');
  const progress = document.querySelector('.progress-line');
  const glow = document.querySelector('.cursor-glow');
  const nav = document.querySelector('.desktop-nav');
  const menuButton = document.querySelector('.menu-toggle');

  if (loadingScreen) {
    window.setTimeout(() => {
      loadingScreen.classList.add('is-complete');
      loadingScreen.setAttribute('aria-hidden', 'true');
    }, 5000);
  }

  // Scroll progress indicator
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (progress) progress.style.width = `${pct}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // Reveal content as it enters the viewport
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min((i % 4) * 70, 210)}ms`;
      observer.observe(el);
    });
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // Low-key cursor light on devices that have a real pointer
  if (glow && window.matchMedia('(pointer: fine)').matches && !reduceMotion) {
    window.addEventListener('pointermove', (event) => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
      glow.style.opacity = '.8';
    }, { passive: true });
    document.addEventListener('pointerleave', () => { glow.style.opacity = '0'; });
  }

  // Mobile navigation
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  // Small parallax effect on the hero artwork
  const art = document.querySelector('.hero-art');
  if (art && window.matchMedia('(pointer: fine)').matches && !reduceMotion) {
    window.addEventListener('pointermove', (event) => {
      const x = (event.clientX / window.innerWidth - .5) * 8;
      const y = (event.clientY / window.innerHeight - .5) * 8;
      art.style.transform = `translate(${x}px, ${y}px)`;
    }, { passive: true });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
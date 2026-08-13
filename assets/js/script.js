/* ── NAV SCROLL STATE ─────────────────────────────── */
  const nav  = document.getElementById('nav');
  const hero = document.getElementById('hero');
  new IntersectionObserver(([e]) => {
    nav.classList.toggle('stuck', !e.isIntersecting);
  }, { threshold: 0 }).observe(hero);

  /* ── MOBILE MENU ──────────────────────────────────── */
  const ham  = document.getElementById('ham');
  const mob  = document.getElementById('mob');
  const mobX = document.getElementById('mob-x');
  const openMenu  = () => { mob.classList.add('open');    ham.setAttribute('aria-expanded','true');  };
  const closeMenu = () => { mob.classList.remove('open'); ham.setAttribute('aria-expanded','false'); };
  ham.addEventListener('click', openMenu);
  mobX.addEventListener('click', closeMenu);
  mob.querySelectorAll('a').forEach(a => {
    if (!a.getAttribute('download')) a.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mob.classList.contains('open')) closeMenu();
  });

  /* ── SMOOTH SCROLL ────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ── HERO ENTRANCE ────────────────────────────────── */
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      document.querySelector('.h-name').classList.add('vis');
      document.querySelector('.h-sub').classList.add('vis');
      document.querySelector('.h-acts').classList.add('vis');
      document.querySelector('.h-scroll').classList.add('vis');
    }, 200);
  });

  /* ── SCROLL REVEAL ────────────────────────────────── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('vis');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ── SKILLS STAGGER ───────────────────────────────── */
  const skillObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.sk-list li').forEach((li, i) => {
        setTimeout(() => li.classList.add('vis'), i * 45);
      });
      skillObs.unobserve(entry.target);
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.sk-cat').forEach(cat => skillObs.observe(cat));

  /* ── PROJECT IMAGE CAROUSELS ──────────────────────── */
  document.querySelectorAll('[data-carousel]').forEach(car => {
    const slides = [...car.querySelectorAll('.p-car-slide')];
    const thumbs = [...car.querySelectorAll('.p-car-thumb')];
    const prevBtn = car.querySelector('.p-car-btn.prev');
    const nextBtn = car.querySelector('.p-car-btn.next');
    let index = 0;

    const render = () => {
      slides.forEach((s, i) => s.classList.toggle('active', i === index));
      thumbs.forEach((t, i) => t.classList.toggle('active', i === index));
    };

    const go = (dir) => {
      index = (index + dir + slides.length) % slides.length;
      render();
    };

    prevBtn && prevBtn.addEventListener('click', (e) => { e.preventDefault(); go(-1); });
    nextBtn && nextBtn.addEventListener('click', (e) => { e.preventDefault(); go(1); });
    thumbs.forEach((t, i) => t.addEventListener('click', (e) => {
      e.preventDefault();
      index = i;
      render();
    }));

    render();
  });

  /* ── FOOTER YEAR ──────────────────────────────────── */
  document.getElementById('ft-yr').textContent =
    '© ' + new Date().getFullYear() + ' James Kuma';

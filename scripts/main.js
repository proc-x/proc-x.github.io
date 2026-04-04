document.addEventListener('DOMContentLoaded', () => {
  /* =============================================
     Theme (Dark Mode)
  ============================================= */
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch (_) {}
  };

  // Initialize theme from localStorage or system preference
  const initTheme = () => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return applyTheme(saved);
    } catch (_) {}
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  };
  initTheme();

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }


  /* =============================================
     Language Toggle
  ============================================= */
  const langToggle = document.getElementById('lang-toggle');

  const applyLang = (lang) => {
    root.setAttribute('data-lang', lang);
    root.lang = lang === 'en' ? 'en' : 'ja';
    try { localStorage.setItem('lang', lang); } catch (_) {}
  };

  // Initialize language from localStorage
  const initLang = () => {
    try {
      const saved = localStorage.getItem('lang');
      if (saved === 'en' || saved === 'ja') return applyLang(saved);
    } catch (_) {}
    applyLang('ja');
  };
  initLang();

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-lang');
      applyLang(current === 'en' ? 'ja' : 'en');
    });
  }


  /* =============================================
     Navigation
  ============================================= */
  const siteHeader = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.getElementById('site-nav');
  const navLinks = Array.from(document.querySelectorAll('[data-nav-target]'));
  const navGroups = Array.from(document.querySelectorAll('.nav-group'));
  const sections = Array.from(document.querySelectorAll('[data-section]'));
  const desktopMedia = window.matchMedia('(min-width: 861px)');

  const closeNavGroups = () => {
    navGroups.forEach((g) => g.removeAttribute('open'));
  };

  const closeMobileNav = () => {
    closeNavGroups();
    if (!siteHeader || !navToggle) return;
    siteHeader.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  if (siteHeader && navToggle && siteNav) {
    siteHeader.classList.add('has-js');

    navToggle.addEventListener('click', () => {
      const nextState = !siteHeader.classList.contains('nav-open');
      siteHeader.classList.toggle('nav-open', nextState);
      navToggle.setAttribute('aria-expanded', String(nextState));
      if (!nextState) closeNavGroups();
    });

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const clickedGroup = target.closest('.nav-group');
      if (clickedGroup) {
        navGroups.forEach((g) => { if (g !== clickedGroup) g.removeAttribute('open'); });
      } else {
        closeNavGroups();
      }

      if (desktopMedia.matches || !siteHeader.classList.contains('nav-open')) return;
      if (siteHeader.contains(target)) return;
      closeMobileNav();
    });

    desktopMedia.addEventListener('change', (e) => { if (e.matches) closeMobileNav(); });
  }

  const setActiveNav = (id) => {
    navLinks.forEach((link) => {
      const active = link.dataset.navTarget === id;
      active ? link.setAttribute('aria-current', 'true') : link.removeAttribute('aria-current');
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.dataset.navTarget;
      if (!targetId) return;
      const section = document.getElementById(targetId);
      if (!section) return;
      event.preventDefault();
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveNav(targetId);
      closeMobileNav();
    });
  });


  /* =============================================
     Scroll-based Observers
  ============================================= */
  const revealTargets = Array.from(document.querySelectorAll('.reveal'));
  const floatingCta = document.getElementById('floating-cta');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supportsObserver = 'IntersectionObserver' in window;

  if (supportsObserver) {
    // Reveal on scroll
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    revealTargets.forEach((el, idx) => {
      if (!reducedMotion) {
        el.style.transitionDelay = `${Math.min(idx * 38, 260)}ms`;
      }
      revealObserver.observe(el);
    });

    // Active nav on scroll
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveNav(visible[0].target.id);
      },
      { threshold: [0.4, 0.6] }
    );
    sections.forEach((s) => sectionObserver.observe(s));
  } else {
    revealTargets.forEach((el) => el.classList.add('in'));
  }


  /* =============================================
     Floating CTA
  ============================================= */
  if (floatingCta && supportsObserver) {
    const hero = document.getElementById('overview');
    const contact = document.getElementById('contact');
    let isHeroVisible = true;
    let isContactVisible = false;

    const toggleCta = () => {
      const show = !isHeroVisible && !isContactVisible;
      floatingCta.classList.toggle('is-visible', show);
      floatingCta.setAttribute('aria-hidden', String(!show));
    };

    if (hero) {
      new IntersectionObserver(
        (entries) => { entries.forEach((e) => { isHeroVisible = e.isIntersecting; toggleCta(); }); },
        { threshold: 0.4 }
      ).observe(hero);
    }

    if (contact) {
      new IntersectionObserver(
        (entries) => { entries.forEach((e) => { isContactVisible = e.isIntersecting; toggleCta(); }); },
        { threshold: 0.2 }
      ).observe(contact);
    }
  }


  /* =============================================
     Workflow Demo Toggle (Case Study)
  ============================================= */
  const flowDemo = document.getElementById('flow-demo');
  const flowSummary = document.getElementById('flow-summary');
  const viewBefore = document.getElementById('view-before');
  const viewAfter = document.getElementById('view-after');

  const setFlowView = (view) => {
    if (!flowDemo) return;
    flowDemo.setAttribute('data-view', view);

    if (viewBefore) viewBefore.classList.toggle('active', view === 'before');
    if (viewAfter)  viewAfter.classList.toggle('active', view === 'after');

    if (flowSummary) {
      flowSummary.classList.toggle('is-visible', view === 'after');
    }
  };

  if (viewBefore) viewBefore.addEventListener('click', () => setFlowView('before'));
  if (viewAfter)  viewAfter.addEventListener('click',  () => setFlowView('after'));


  /* =============================================
     Contact Form
  ============================================= */
  const contactForm = document.getElementById('contact-form');
  const inquiryType = document.getElementById('inquiry-type');
  const contactStatus = document.getElementById('contact-status');
  const renderedAt = document.getElementById('form-rendered-at');

  if (contactForm && renderedAt) {
    renderedAt.value = String(Date.now());

    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const salesSelected = inquiryType && inquiryType.value === 'sales';

      if (!contactStatus) return;

      if (salesSelected) {
        contactStatus.textContent = '営業・売り込みは本フォームで受け付けていません。';
        return;
      }

      contactStatus.innerHTML =
        '現在フォーム送信に失敗しています。<a href="mailto:support@proc-x.co.jp">support@proc-x.co.jp</a> へメールでお問い合わせください。';
    });
  }
});

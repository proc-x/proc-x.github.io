document.addEventListener('DOMContentLoaded', () => {
  const navLinks = Array.from(document.querySelectorAll('[data-nav-target]'));
  const sections = Array.from(document.querySelectorAll('[data-section]'));
  const floatingCta = document.getElementById('floating-cta');
  const highlightTimers = new Map();
  let manualNavActiveUntil = 0;

  const setActiveNav = (id) => {
    navLinks.forEach((link) => {
      const isActive = link.dataset.navTarget === id;
      if (isActive) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const highlightSection = (element) => {
    if (!element) return;
    const key = element.id || element.dataset.section || Math.random().toString(16);
    element.classList.add('is-highlighted');
    if (highlightTimers.has(key)) {
      clearTimeout(highlightTimers.get(key));
    }
    const timeout = window.setTimeout(() => {
      element.classList.remove('is-highlighted');
      highlightTimers.delete(key);
    }, 1600);
    highlightTimers.set(key, timeout);
  };

  const trackNavEvent = (payload) => {
    const data = { event: 'nav_click', ...payload };
    if (window.dataLayer && Array.isArray(window.dataLayer)) {
      window.dataLayer.push(data);
    } else if (typeof window.gtag === 'function') {
      window.gtag('event', 'nav_click', data);
    } else {
      console.info('[track]', data);
    }
  };

  const handleNavigation = (link, source) => {
    const href = link.getAttribute('href') || '';
    const targetId = link.dataset.navTarget || href.replace('#', '');
    if (!targetId) return;
    const targetSection = document.getElementById(targetId);
    if (!targetSection) return;

    manualNavActiveUntil = Date.now() + 1200;
    setActiveNav(targetId);
    scrollToSection(targetId);
    trackNavEvent({ nav_target: targetId, nav_source: source });
    requestAnimationFrame(() => highlightSection(targetSection));
  };

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      if (!link.dataset.navTarget) return;
      event.preventDefault();
      handleNavigation(link, link.classList.contains('btn') ? 'nav_primary' : 'nav');
    });
  });

  document.querySelectorAll('[data-cta]').forEach((cta) => {
    cta.addEventListener('click', (event) => {
      const href = cta.getAttribute('href') || '';
      const source = `cta_${cta.dataset.cta || 'unknown'}`;
      const isAnchor = href.startsWith('#');
      if (isAnchor) {
        event.preventDefault();
        handleNavigation(cta, source);
      } else {
        trackNavEvent({ nav_target: href, nav_source: source });
      }
    });
  });

  // Reveal on scroll
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  // Active nav highlighting on scroll
  const navObserver = new IntersectionObserver((entries) => {
    if (Date.now() < manualNavActiveUntil) return;
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (visible[0]) {
      setActiveNav(visible[0].target.id);
    }
  }, { threshold: [0.3, 0.6, 0.9] });
  sections.forEach((section) => navObserver.observe(section));

  // Floating CTA visibility
  if (floatingCta) {
    const toggleFloatingCta = (isVisible) => {
      floatingCta.setAttribute('aria-hidden', String(!isVisible));
      floatingCta.classList.toggle('is-visible', isVisible);
    };
    toggleFloatingCta(false);
    const hero = document.getElementById('hero');
    if (hero) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.target === hero) {
            toggleFloatingCta(!entry.isIntersecting);
          }
        });
      }, { threshold: 0.4 });
      heroObserver.observe(hero);
    } else {
      toggleFloatingCta(true);
    }
  }
});

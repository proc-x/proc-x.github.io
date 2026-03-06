document.addEventListener('DOMContentLoaded', () => {
  const siteHeader = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.getElementById('site-nav');
  const navLinks = Array.from(document.querySelectorAll('[data-nav-target]'));
  const navGroups = Array.from(document.querySelectorAll('.nav-group'));
  const sections = Array.from(document.querySelectorAll('[data-section]'));
  const revealTargets = Array.from(document.querySelectorAll('.reveal'));
  const floatingCta = document.getElementById('floating-cta');
  const desktopMedia = window.matchMedia('(min-width: 861px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supportsObserver = 'IntersectionObserver' in window;

  const closeNavGroups = () => {
    navGroups.forEach((group) => group.removeAttribute('open'));
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
      if (!nextState) {
        closeNavGroups();
      }
    });

    document.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const clickedGroup = target.closest('.nav-group');
      if (clickedGroup) {
        navGroups.forEach((group) => {
          if (group !== clickedGroup) {
            group.removeAttribute('open');
          }
        });
      } else {
        closeNavGroups();
      }

      if (desktopMedia.matches || !siteHeader.classList.contains('nav-open')) return;
      if (siteHeader.contains(target)) return;
      closeMobileNav();
    });

    desktopMedia.addEventListener('change', (event) => {
      if (event.matches) {
        closeMobileNav();
      }
    });
  }

  const setActiveNav = (id) => {
    navLinks.forEach((link) => {
      const active = link.dataset.navTarget === id;
      if (active) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
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

  if (supportsObserver) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    revealTargets.forEach((el, idx) => {
      if (!reducedMotion) {
        el.style.transitionDelay = `${Math.min(idx * 40, 280)}ms`;
      }
      revealObserver.observe(el);
    });

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveNav(visible[0].target.id);
        }
      },
      { threshold: [0.4, 0.6, 0.8] }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  } else {
    revealTargets.forEach((el) => el.classList.add('in'));
  }

  if (floatingCta) {
    const hero = document.getElementById('overview');
    const contact = document.getElementById('contact');
    let isHeroVisible = true;
    let isContactVisible = false;
    const toggle = () => {
      const show = !isHeroVisible && !isContactVisible;
      floatingCta.classList.toggle('is-visible', show);
      floatingCta.setAttribute('aria-hidden', String(!show));
    };

    if (hero && supportsObserver) {
      const heroObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isHeroVisible = entry.isIntersecting;
            toggle();
          });
        },
        { threshold: 0.45 }
      );
      heroObserver.observe(hero);
    }

    if (contact && supportsObserver) {
      const contactObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isContactVisible = entry.isIntersecting;
            toggle();
          });
        },
        { threshold: 0.22 }
      );
      contactObserver.observe(contact);
    }
  }

  const contactForm = document.getElementById('contact-form');
  const inquiryType = document.getElementById('inquiry-type');
  const contactStatus = document.getElementById('contact-status');
  const renderedAt = document.getElementById('form-rendered-at');

  if (contactForm && renderedAt) {
    renderedAt.value = String(Date.now());

    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const salesSelected = inquiryType && inquiryType.value === 'sales';

      if (!contactStatus) {
        return;
      }

      if (salesSelected) {
        contactStatus.textContent = '営業・売り込みは本フォームで受け付けていません。';
        return;
      }

      contactStatus.innerHTML =
        '現在フォーム送信に失敗しています。<a href="mailto:support@proc-x.co.jp">support@proc-x.co.jp</a> へメールでお問い合わせください。';
    });
  }
});



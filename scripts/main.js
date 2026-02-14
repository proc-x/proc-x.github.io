document.addEventListener('DOMContentLoaded', () => {
  const siteHeader = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.getElementById('site-nav');
  const navLinks = Array.from(document.querySelectorAll('[data-nav-target]'));
  const sections = Array.from(document.querySelectorAll('[data-section]'));
  const floatingCta = document.getElementById('floating-cta');
  const desktopMedia = window.matchMedia('(min-width: 861px)');

  const closeMobileNav = () => {
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
    });

    document.addEventListener('click', (event) => {
      if (desktopMedia.matches || !siteHeader.classList.contains('nav-open')) return;
      if (siteHeader.contains(event.target)) return;
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

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

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

  if (floatingCta) {
    const hero = document.getElementById('overview');
    const toggle = (show) => {
      floatingCta.classList.toggle('is-visible', show);
      floatingCta.setAttribute('aria-hidden', String(!show));
    };

    if (hero) {
      const heroObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            toggle(!entry.isIntersecting);
          });
        },
        { threshold: 0.45 }
      );
      heroObserver.observe(hero);
    }
  }

  const contactForm = document.getElementById('contact-form');
  const inquiryType = document.getElementById('inquiry-type');
  const contactStatus = document.getElementById('contact-status');
  const renderedAt = document.getElementById('form-rendered-at');

  if (contactForm && renderedAt) {
    renderedAt.value = String(Date.now());

    contactForm.addEventListener('submit', (event) => {
      const submittedTooFast = Date.now() - Number(renderedAt.value) < 4000;
      const salesSelected = inquiryType && inquiryType.value === 'sales';

      if (salesSelected) {
        event.preventDefault();
        if (contactStatus) {
          contactStatus.textContent = '営業・売り込みは本フォームで受け付けていません。';
        }
        return;
      }

      if (submittedTooFast) {
        event.preventDefault();
        if (contactStatus) {
          contactStatus.textContent = '送信前に内容をご確認ください。';
        }
        return;
      }

      if (contactStatus) {
        contactStatus.textContent = '送信しています...';
      }
    });
  }
});

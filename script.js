document.addEventListener('DOMContentLoaded', () => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Theme Toggle
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;
  
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      html.setAttribute('data-theme', savedTheme);
    } else if (systemDark) {
      html.setAttribute('data-theme', 'dark');
    }
  }
  
  initTheme();
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // 2. Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navIcon = menuToggle ? menuToggle.querySelector('i') : null;

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('active');
      
      if (navLinks.classList.contains('active')) {
        if (navIcon) {
          navIcon.classList.remove('fa-bars');
          navIcon.classList.add('fa-times');
        }
        document.body.style.overflow = 'hidden';
      } else {
        if (navIcon) {
          navIcon.classList.remove('fa-times');
          navIcon.classList.add('fa-bars');
        }
        document.body.style.overflow = '';
      }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        if (navIcon) {
          navIcon.classList.remove('fa-times');
          navIcon.classList.add('fa-bars');
        }
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Sticky Navbar on Scroll
  const navbar = document.getElementById('navbar');
  
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // Initial check

  // 4. Highlight Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  function handleActiveNav() {
    let current = '';
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      const href = item.getAttribute('href');
      if (href && href.includes(current)) {
        item.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', handleActiveNav, { passive: true });
  handleActiveNav(); // Initial check

  // 5. Scroll Reveal Animations using Intersection Observer
  if (!prefersReducedMotion) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Optional: unobserve after revealing for performance
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all reveal elements
    const revealElements = document.querySelectorAll('.reveal, .fade-in-section, .stagger > *');
    revealElements.forEach(el => observer.observe(el));

    // Special handling for stagger children
    const staggerContainers = document.querySelectorAll('.stagger, .stagger-children');
    staggerContainers.forEach(container => {
      const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      }, { ...observerOptions, threshold: 0.05 });
      
      staggerObserver.observe(container);
    });
  } else {
    // If reduced motion, show all immediately
    document.querySelectorAll('.reveal, .fade-in-section, .stagger, .stagger-children').forEach(el => {
      el.classList.add('is-visible');
    });
  }

  // 6. Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = navbar ? navbar.offsetHeight : 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  });

  // 7. Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.form-submit');
      const originalText = submitBtn.textContent;
      
      // Basic validation
      const requiredFields = contactForm.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = 'var(--clr-error)';
        } else {
          field.style.borderColor = '';
        }
      });
      
      if (!isValid) return;
      
      // Simulate form submission
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      
      // In a real app, you would send to your backend here
      // await fetch('/api/contact', { method: 'POST', body: new FormData(contactForm) });
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success feedback
      submitBtn.textContent = 'Sent!';
      submitBtn.style.background = 'var(--clr-success)';
      submitBtn.style.borderColor = 'var(--clr-success)';
      
      // Reset form
      contactForm.reset();
      
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.style.borderColor = '';
      }, 3000);
    });
    
    // Clear error styling on input
    contactForm.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('input', () => {
        field.style.borderColor = '';
      });
    });
  }

  // 8. Parallax effect for hero (optional, disabled on reduced motion)
  if (!prefersReducedMotion) {
    const hero = document.getElementById('hero');
    if (hero) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        hero.style.backgroundPositionY = `${rate}px`;
      }, { passive: true });
    }
  }

  // 9. Enhanced hover effects for project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease';
    });
  });

  // 10. Keyboard navigation for mobile menu
  if (menuToggle) {
    menuToggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        menuToggle.click();
      }
    });
  }

  // 11. Focus trap for mobile menu (accessibility)
  let lastFocusedElement = null;
  
  if (menuToggle && navLinks) {
    const focusableElements = navLinks.querySelectorAll('a, button');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    function handleTabInMenu(e) {
      if (!navLinks.classList.contains('active')) return;
      
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
      
      if (e.key === 'Escape') {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.focus();
        document.body.style.overflow = '';
      }
    }
    
    navLinks.addEventListener('keydown', handleTabInMenu);
    
    // Store focus when opening menu
    const observer = new MutationObserver(() => {
      if (navLinks.classList.contains('active')) {
        lastFocusedElement = document.activeElement;
        setTimeout(() => firstFocusable?.focus(), 0);
      }
    });
    observer.observe(navLinks, { attributes: true, attributeFilter: ['class'] });
  }
});
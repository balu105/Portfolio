/* ==========================================================================
   Portfolio Main JavaScript Module
   Author: K.C. Balaji
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Preloader Hide Logic
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hide'), 300);
    });
    setTimeout(() => preloader.classList.add('hide'), 1500);
  }

  // 2. Dynamic Current Year
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 3. Custom Interactive Cursor
  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');

  if (cursorDot && cursorOutline && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
      }, { duration: 400, fill: 'forwards' });
    });

    const interactiveSelectors = 'a, button, .project-card, .skill-item, .cert-card, .stat-card, input, textarea';
    document.querySelectorAll(interactiveSelectors).forEach(el => {
      el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });
  }

  // 4. Dark & Light Theme Switcher
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const htmlEl = document.documentElement;

  const savedTheme = localStorage.getItem('portfolio_theme') || 'light';
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio_theme', theme);

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (theme === 'dark') {
      if (themeIcon) themeIcon.className = 'fas fa-sun';
      if (themeMeta) themeMeta.setAttribute('content', '#0f172a');
    } else {
      if (themeIcon) themeIcon.className = 'fas fa-moon';
      if (themeMeta) themeMeta.setAttribute('content', '#10b981');
    }
  }

  // 5. Mobile Navigation Hamburger Menu
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const menuIcon = document.getElementById('menuIcon');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('active');
      if (menuIcon) {
        menuIcon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        if (menuIcon) menuIcon.className = 'fas fa-bars';
      });
    });
  }

  // 6. Header Scrolled Effect & Active Navigation Link Highlight
  const header = document.getElementById('main-header');
  const sections = document.querySelectorAll('section');
  const navItems = navLinks ? navLinks.querySelectorAll('a') : [];
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    let currentSectionId = '';
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 130;
      const sectionHeight = sec.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${currentSectionId}`) {
        item.classList.add('active');
      }
    });

    if (scrollTopBtn) {
      if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 7. Typing Text Subtitle Effect
  const typedTextEl = document.getElementById('typed-text');
  if (typedTextEl) {
    const roles = [
      "Java Full-Stack Developer",
      "Data Analyst & AI Engineer",
      "Spring Boot & React Specialist",
      "Machine Learning Enthusiast"
    ];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
      const currentRole = roles[roleIdx];

      if (isDeleting) {
        typedTextEl.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typeSpeed = 40;
      } else {
        typedTextEl.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typeSpeed = 90;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        isDeleting = true;
        typeSpeed = 1800;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeSpeed = 400;
      }

      setTimeout(typeEffect, typeSpeed);
    }
    typeEffect();
  }

  // 8. Intersection Observer for Smooth Scroll Reveals
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // 9. Stats Counter Increment Animation
  const statCards = document.querySelectorAll('.stat-card');
  if (statCards.length > 0) {
    let statsAnimated = false;
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          document.querySelectorAll('.num[data-target]').forEach(numEl => {
            const target = +numEl.getAttribute('data-target');
            let count = 0;
            const speed = Math.max(20, Math.floor(1500 / target));

            const updateCount = () => {
              count++;
              numEl.textContent = count + '+';
              if (count < target) {
                setTimeout(updateCount, speed);
              } else {
                numEl.textContent = target + '+';
              }
            };
            updateCount();
          });
        }
      });
    }, { threshold: 0.5 });

    statCards.forEach(card => statsObserver.observe(card));
  }

  // 10. Circle Skill Progress Fill Animation
  const skillItems = document.querySelectorAll('.skill-item');
  if (skillItems.length > 0) {
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const circleProgress = entry.target.querySelector('.circle-progress');
          if (circleProgress) {
            const pct = circleProgress.getAttribute('data-pct');
            const fgCircle = circleProgress.querySelector('.fg');
            if (fgCircle) {
              const radius = fgCircle.getAttribute('r');
              const circumference = 2 * Math.PI * radius; // ~163.36 for r=26
              const offset = circumference - (pct / 100) * circumference;
              fgCircle.style.strokeDashoffset = offset;
            }
          }
        }
      });
    }, { threshold: 0.3 });

    skillItems.forEach(item => skillObserver.observe(item));
  }

  // 11. Interactive Canvas Particle Background
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouse = { x: null, y: null, radius: 140 };

    function resizeCanvas() {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            let angle = Math.atan2(dy, dx);
            let force = (mouse.radius - dist) / mouse.radius;
            this.x -= Math.cos(angle) * force * 2;
            this.y -= Math.sin(angle) * force * 2;
          }
        }
      }

      draw() {
        const isDark = htmlEl.getAttribute('data-theme') === 'dark';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(52, 211, 153, 0.6)' : 'rgba(16, 185, 129, 0.6)';
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      const count = Math.min(Math.floor((width * height) / 12000), 75);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }
    initParticles();

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      const isDark = htmlEl.getAttribute('data-theme') === 'dark';

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          let dx = particles[i].x - particles[j].x;
          let dy = particles[i].y - particles[j].y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isDark 
              ? `rgba(52, 211, 153, ${0.2 * (1 - dist / 110)})`
              : `rgba(16, 185, 129, ${0.2 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // 12. Real Email & Contact Form Submission Handling (FormSubmit Integration + Email App Fallback)
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const mailtoFallbackBtn = document.getElementById('mailtoFallbackBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';
      }

      const nameVal = document.getElementById('name') ? document.getElementById('name').value : '';
      const emailVal = document.getElementById('email') ? document.getElementById('email').value : '';
      const subjectVal = document.getElementById('subject') ? document.getElementById('subject').value : '';
      const messageVal = document.getElementById('message') ? document.getElementById('message').value : '';

      fetch('https://formsubmit.co/ajax/balajikc89@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: nameVal,
          email: emailVal,
          _subject: `[Portfolio Contact] ${subjectVal}`,
          message: messageVal
        })
      })
      .then(response => response.json())
      .then(data => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        }
        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.textContent = 'Message sent! (Important: Check balajikc89@gmail.com inbox once for FormSubmit activation link if testing for the first time).';
          formStatus.style.display = 'block';
        }
        contactForm.reset();

        setTimeout(() => {
          if (submitBtn) submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
          if (formStatus) formStatus.style.display = 'none';
        }, 7000);
      })
      .catch(error => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.textContent = 'Opening your email application...';
          formStatus.style.display = 'block';
        }
        window.location.href = `mailto:balajikc89@gmail.com?subject=${encodeURIComponent(subjectVal)}&body=${encodeURIComponent("From: " + nameVal + " (" + emailVal + ")\n\n" + messageVal)}`;
      });
    });
  }

  if (mailtoFallbackBtn) {
    mailtoFallbackBtn.addEventListener('click', () => {
      const nameVal = document.getElementById('name') ? document.getElementById('name').value : '';
      const emailVal = document.getElementById('email') ? document.getElementById('email').value : '';
      const subjectVal = document.getElementById('subject') ? document.getElementById('subject').value : 'Portfolio Inquiry';
      const messageVal = document.getElementById('message') ? document.getElementById('message').value : '';

      window.location.href = `mailto:balajikc89@gmail.com?subject=${encodeURIComponent(subjectVal)}&body=${encodeURIComponent("From: " + nameVal + " (" + emailVal + ")\n\n" + messageVal)}`;
    });
  }
});

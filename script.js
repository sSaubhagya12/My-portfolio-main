// @ts-nocheck
/* eslint-disable */
/* =============================================
   PORTFOLIO – script.js
   ============================================= */

/* ---- THEME TOGGLE ---- */
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('portfolio-theme', next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

/* ---- HAMBURGER MENU ---- */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

/* ---- NAVBAR SCROLL SHADOW & PROGRESS BAR ---- */
const navbar = document.getElementById('navbar');
const scrollIndicator = document.getElementById('scrollIndicator');

function updateScrollProgress() {
  if (!scrollIndicator) return;
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  scrollIndicator.style.width = `${scrollPercent}%`;
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
  } else {
    navbar.style.boxShadow = 'none';
  }
  updateScrollProgress();
  updateActiveNav();
  revealOnScroll();
  animateSkillsIfVisible();
});

/* ---- ACTIVE NAV LINK ON SCROLL ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

/* ---- TYPED TEXT EFFECT ---- */
const typedEl = document.getElementById('typed-text');
const phrases = ['Full Stack Developer', 'Software Engineer', 'Mobile App Specialist', 'AI Systems Developer'];
let pIndex = 0;
let cIndex = 0;
let deleting = false;

function typeEffect() {
  const current = phrases[pIndex];
  if (!deleting) {
    typedEl.textContent = current.substring(0, cIndex + 1);
    cIndex++;
    if (cIndex === current.length) {
      deleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, cIndex - 1);
    cIndex--;
    if (cIndex === 0) {
      deleting = false;
      pIndex = (pIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeEffect, deleting ? 60 : 100);
}
typeEffect();

/* ---- SCROLL FADE-IN ---- */
const fadeEls = document.querySelectorAll(
  '.project-card, .cert-card, .about-content, .hero-stats, .skill-item'
);

// Add fade-in class to all target elements
fadeEls.forEach(el => el.classList.add('fade-in'));

function revealOnScroll() {
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
}
revealOnScroll(); // run on load

/* ---- SKILL CIRCLE ANIMATION ---- */
let skillsAnimated = false;

function animateSkillsIfVisible() {
  if (skillsAnimated) return;
  const section = document.getElementById('about');
  if (!section) return;
  const rect = section.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    skillsAnimated = true;
    animateSkills();
  }
}

function animateSkills() {
  const circumference = 2 * Math.PI * 42; // 263.9
  const items = document.querySelectorAll('.skill-item');
  items.forEach((item, i) => {
    const percent = parseInt(item.getAttribute('data-percent')) || 0;
    const progress = item.querySelector('.skill-progress');
    if (!progress) return;
    const offset = circumference - (percent / 100) * circumference;
    setTimeout(() => {
      progress.style.strokeDasharray = circumference;
      progress.style.strokeDashoffset = offset;
    }, i * 150);
  });
}

// Trigger on load too
window.addEventListener('load', () => {
  revealOnScroll();
  animateSkillsIfVisible();
});

/* ---- SMOOTH SCROLL for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---- HAMBURGER ANIMATION STYLE ---- */
const styleEl = document.createElement('style');
styleEl.textContent = `
  .hamburger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.active span:nth-child(2) { opacity: 0; }
  .hamburger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
`;
document.head.appendChild(styleEl);

/* ---- DRAG TO SCROLL FOR GRIDS ---- */
const scrollGrids = document.querySelectorAll('.skills-grid, .cert-grid, .projects-grid');

scrollGrids.forEach(grid => {
  let isDown = false;
  let startX;
  let scrollLeft;

  grid.addEventListener('mousedown', (e) => {
    isDown = true;
    grid.style.cursor = 'grabbing';
    startX = e.pageX - grid.offsetLeft;
    scrollLeft = grid.scrollLeft;
  });
  grid.addEventListener('mouseleave', () => {
    isDown = false;
    grid.style.cursor = 'grab';
  });
  grid.addEventListener('mouseup', () => {
    isDown = false;
    grid.style.cursor = 'grab';
  });
  grid.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - grid.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed
    grid.scrollLeft = scrollLeft - walk;
  });
  // Initialize cursor
  grid.style.cursor = 'grab';
});

/* ---- CARD SLIDER HOVER EFFECT (PROJECTS & CERTIFICATES) ---- */
document.querySelectorAll('.project-card, .cert-card').forEach(card => {
  const slider = card.querySelector('.card-slider');
  if (slider) {
    const track = slider.querySelector('.slider-track');
    const imgs = track.querySelectorAll('img');
    let currentIndex = 0;
    let interval;

    if (imgs.length > 1) {
      card.addEventListener('mouseenter', () => {
        interval = setInterval(() => {
          currentIndex++;
          if (currentIndex >= imgs.length) currentIndex = 0;
          track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }, 1500);
      });

      card.addEventListener('mouseleave', () => {
        clearInterval(interval);
      });
    }
  }
});

/* ---- CUSTOM CURSOR ---- */
const cursorDot = document.querySelector('.custom-cursor-dot');
const cursorOutline = document.querySelector('.custom-cursor-outline');

if (cursorDot && cursorOutline) {
  window.addEventListener('mousemove', function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows exactly
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with slight delay for smooth effect
    cursorOutline.animate({
      left: `${posX}px`,
      top: `${posY}px`
    }, { duration: 500, fill: 'forwards' });
  });
}

/* ---- AJAX CONTACT FORM SUBMISSION ---- */
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const btnSend = document.getElementById('btn-send');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Change button text while sending
    const originalBtnText = btnSend.textContent;
    btnSend.textContent = 'Sending...';
    btnSend.disabled = true;
    formStatus.textContent = '';

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        formStatus.textContent = 'Message sent successfully!';
        formStatus.style.color = '#4CAF50';
        contactForm.reset();
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
          formStatus.textContent = data.errors.map(err => err.message).join(', ');
        } else {
          formStatus.textContent = 'Oops! There was a problem submitting your form.';
        }
        formStatus.style.color = '#F44336';
      }
    } catch (err) {
      formStatus.textContent = 'Oops! There was a problem submitting your form.';
      formStatus.style.color = '#F44336';
    }

    // Reset button
    btnSend.textContent = originalBtnText;
    btnSend.disabled = false;
  });
}

/* ---- BACK TO TOP BUTTON ---- */
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---- ADVANCED IT CYBER CONSTELLATION CANVAS ANIMATION ---- */
const particleCanvas = document.getElementById('particle-canvas');
if (particleCanvas) {
  const ctx = particleCanvas.getContext('2d');
  let width, height;
  let particles = [];
  let codeMatrix = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 12), 85);
  const matrixCharCount = 25;
  const colors = ['#a855f7', '#38bdf8', '#ff6b00', '#ec4899', '#22c55e'];
  const codeChars = ['0', '1', '{', '}', '<', '/>', ';', '=>', 'CSS', 'JS', 'AI', 'DEV'];
  let mouse = { x: null, y: null, radius: 160 };

  function initCanvas() {
    width = particleCanvas.width = window.innerWidth;
    height = particleCanvas.height = window.innerHeight;
    particles = [];
    codeMatrix = [];

    // Constellation Node Particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2.2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI,
        pulseSpeed: 0.03 + Math.random() * 0.02,
        hasRadar: i % 18 === 0 // Radar ring node every ~18 particles
      });
    }

    // Drifting Binary/Code Matrix Elements
    for (let k = 0; k < matrixCharCount; k++) {
      codeMatrix.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: -(0.3 + Math.random() * 0.5),
        text: codeChars[Math.floor(Math.random() * codeChars.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.floor(Math.random() * 5) + 10,
        opacity: Math.random() * 0.25 + 0.08
      });
    }
  }

  window.addEventListener('resize', initCanvas);
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function drawCyberConstellation() {
    ctx.clearRect(0, 0, width, height);

    // 1. Render Floating Code Matrix Particles in Low Opacity
    ctx.font = '11px "Inter", monospace';
    for (let k = 0; k < codeMatrix.length; k++) {
      const c = codeMatrix[k];
      c.y += c.vy;
      if (c.y < -20) {
        c.y = height + 20;
        c.x = Math.random() * width;
        c.text = codeChars[Math.floor(Math.random() * codeChars.length)];
      }
      ctx.fillStyle = c.color;
      ctx.globalAlpha = c.opacity;
      ctx.fillText(c.text, c.x, c.y);
    }
    ctx.globalAlpha = 1.0;

    // 2. Render Constellation Particles and Dynamic Laser Connections
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      p.pulse += p.pulseSpeed;
      const currentRadius = p.radius + Math.sin(p.pulse) * 0.6;

      // Draw Radar Concentric Ring around key nodes
      if (p.hasRadar) {
        const ringRadius = 14 + Math.sin(p.pulse * 1.5) * 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(168, 85, 247, ${0.45 + Math.sin(p.pulse * 1.5) * 0.25})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(p.x, p.y, ringRadius + 8, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(168, 85, 247, ${0.2 + Math.sin(p.pulse * 1.5) * 0.1})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Draw particle star node
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Connect nearby particles with laser constellation lines
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.28 * (1 - dist / 130)})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      // Connect to mouse cursor with glowing interactive beam
      if (mouse.x !== null && mouse.y !== null) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(255, 107, 0, ${0.5 * (1 - dist / mouse.radius)})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawCyberConstellation);
  }

  initCanvas();
  drawCyberConstellation();
}

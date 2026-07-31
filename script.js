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

/* ---- NAVBAR SCROLL SHADOW ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
  } else {
    navbar.style.boxShadow = 'none';
  }
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
const phrases = ['Full Stack Developer'];
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
const skillItems = document.querySelectorAll('.skill-item');
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
  skillItems.forEach((item, i) => {
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

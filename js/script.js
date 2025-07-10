// Cache DOM elements
const navLinks = document.querySelectorAll('.nav-link');
const OFFSET = document.querySelector('.site-header').offsetHeight;

// Smooth scroll with offset for fixed header
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    // Remove active class
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    const targetId = link.getAttribute('href').slice(1);
    const targetEl = document.getElementById(targetId);
    window.scrollTo({
      top: targetEl.offsetTop - OFFSET + 10,
      behavior: 'smooth'
    });
  });
});

// Highlight nav on scroll
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY + OFFSET + 20;
  navLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (
      section.offsetTop <= scrollPos &&
      section.offsetTop + section.offsetHeight > scrollPos
    ) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});


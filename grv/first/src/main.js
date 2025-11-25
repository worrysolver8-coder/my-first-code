import './style.css'

// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in-up').forEach(el => {
  observer.observe(el);
});

// Parallax Effect for Orbs (Subtle mouse movement)
document.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  const orbs = document.querySelectorAll('.orb');
  
  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 20;
    const xOffset = (x - 0.5) * speed;
    const yOffset = (y - 0.5) * speed;
    
    orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
  });
});

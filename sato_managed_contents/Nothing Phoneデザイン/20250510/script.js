// ===== Nothing Phone ウェブサイトデザイン JavaScript =====

// DOM elements
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const heroSection = document.querySelector('.hero');
const sections = document.querySelectorAll('section');
const cube = document.querySelector('.cube');

// Scroll behavior and header style change
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  
  // Update header style on scroll
  if (scrollPosition > 50) {
    header.style.padding = '15px 50px';
    header.style.backdropFilter = 'blur(15px)';
  } else {
    header.style.padding = '25px 50px';
    header.style.backdropFilter = 'blur(10px)';
  }
  
  // Parallax scroll effect for sections
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition > sectionTop - window.innerHeight / 1.5 && 
        scrollPosition < sectionTop + sectionHeight) {
      section.classList.add('in-view');
      
      // Add subtle animations for elements as they come into view
      const elementsToAnimate = section.querySelectorAll('.result-card, .axis, .cycle-step');
      elementsToAnimate.forEach((el, index) => {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = el.classList.contains('result-card') ? 
            'translateY(0)' : 'translateX(0)';
        }, 100 * index);
      });
    }
  });
});

// Mobile menu toggle
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
}

// Intersection Observer for section animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.25
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, observerOptions);

sections.forEach(section => {
  sectionObserver.observe(section);
});

// Cursor follow effect for hero section
if (heroSection) {
  heroSection.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    // Move cube slightly based on cursor position
    if (cube) {
      cube.style.transform = `rotateX(${y * 10}deg) rotateY(${x * 10}deg)`;
    }
    
    // Move dot pattern based on cursor
    const dotPattern = document.querySelector('.dot-pattern');
    if (dotPattern) {
      dotPattern.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
    }
  });
}

// Apply initial styles for animation elements
document.addEventListener('DOMContentLoaded', () => {
  // Set initial state for animated elements
  const animatedElements = document.querySelectorAll('.result-card, .axis, .cycle-step');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    if (el.classList.contains('result-card')) {
      el.style.transform = 'translateY(20px)';
    } else {
      el.style.transform = 'translateX(20px)';
    }
  });
  
  // Apply glitch effect to specified text elements
  const glitchElements = document.querySelectorAll('.glitch-text');
  glitchElements.forEach(el => {
    el.setAttribute('data-text', el.textContent);
  });
  
  // Initialize form validation
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple form validation
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      
      let isValid = true;
      
      if (!name.value.trim()) {
        markInvalid(name);
        isValid = false;
      } else {
        markValid(name);
      }
      
      if (!email.value.trim() || !isValidEmail(email.value)) {
        markInvalid(email);
        isValid = false;
      } else {
        markValid(email);
      }
      
      if (!message.value.trim()) {
        markInvalid(message);
        isValid = false;
      } else {
        markValid(message);
      }
      
      if (isValid) {
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
          submitButton.textContent = '送信中...';
          submitButton.disabled = true;
          
          setTimeout(() => {
            submitButton.textContent = '送信完了!';
            contactForm.reset();
            
            setTimeout(() => {
              submitButton.textContent = '送信する';
              submitButton.disabled = false;
            }, 2000);
          }, 1500);
        }
      }
    });
  }
  
  // Add smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
          menuToggle.classList.remove('active');
        }
        
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
});

// Helper functions
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function markInvalid(element) {
  element.style.borderColor = 'red';
  element.style.backgroundColor = 'rgba(255, 0, 0, 0.05)';
}

function markValid(element) {
  element.style.borderColor = 'rgba(255, 255, 255, 0.3)';
  element.style.backgroundColor = 'transparent';
}

// Additional subtle animations for element hover
const hoverElements = document.querySelectorAll('.result-card, .btn, .axis');
hoverElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (el.classList.contains('btn')) {
      el.style.transform = 'translateY(-3px)';
    } else if (el.classList.contains('result-card')) {
      el.style.transform = 'translateY(-10px)';
    } else {
      el.style.borderColor = '#ffffff';
    }
  });
  
  el.addEventListener('mouseleave', () => {
    if (el.classList.contains('btn')) {
      el.style.transform = 'translateY(0)';
    } else if (el.classList.contains('result-card')) {
      el.style.transform = 'translateY(0)';
    } else {
      el.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    }
  });
}); 
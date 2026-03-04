// Dark/Light Mode Toggle
function initThemeToggle() {
  const body = document.body;
  const themeBtn = document.getElementById('themeToggle');
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    body.classList.add('light');
  }
  
  // Create theme toggle if it doesn't exist
  if (!themeBtn && !document.querySelector('[data-theme-toggle]')) {
    const button = document.createElement('button');
    button.id = 'themeToggle';
    button.setAttribute('data-theme-toggle', '');
    button.innerHTML = '🌙 Dark/Light Mode';
    button.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 10px 15px;
      background: #ffdd57;
      color: #001f3f;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      z-index: 1000;
      font-family: Arial, sans-serif;
    `;
    document.body.insertBefore(button, document.body.firstChild);
  }
  
  // Add event listener for theme toggle
  document.addEventListener('click', (e) => {
    if (e.target.id === 'themeToggle' || e.target.closest('[data-theme-toggle]')) {
      body.classList.toggle('light');
      const currentTheme = body.classList.contains('light') ? 'light' : 'dark';
      localStorage.setItem('theme', currentTheme);
      e.target.innerHTML = currentTheme === 'light' ? '☀️ Dark/Light Mode' : '🌙 Dark/Light Mode';
    }
  });
}

// Smooth Scrolling for Navigation Buttons
function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('scrollBtn')) {
      e.preventDefault();
      const targetId = e.target.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    }
  });
}

// Add fade-in animation to blog entries
function initBlogAnimations() {
  const blogEntries = document.querySelectorAll('.blog-entry');
  const button3d = document.querySelectorAll('.button3d');
  
  // Create intersection observer for fade-in effect
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  blogEntries.forEach(entry => observer.observe(entry));
  button3d.forEach(btn => observer.observe(btn));
}

// Initialize card hover effects
function initCardInteractions() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
      card.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
}

// Add date to blog entries dynamically
function initBlogDates() {
  const dateElements = document.querySelectorAll('.date');
  const today = new Date();
  
  dateElements.forEach((dateEl, index) => {
    if (!dateEl.textContent) {
      const blogDate = new Date(today);
      blogDate.setDate(blogDate.getDate() - (dateElements.length - index - 1));
      dateEl.textContent = '📅 ' + blogDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      dateEl.style.fontSize = '0.9rem';
      dateEl.style.color = '#ade2dc';
      dateEl.style.fontStyle = 'italic';
    }
  });
}

// Mobile nav toggle
function initNavToggle() {
  const nav = document.querySelector('.main-nav');
  const toggle = document.getElementById('navToggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }
}

// Back-to-top button behavior
function initBackToTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      btn.style.display = 'block';
    } else {
      btn.style.display = 'none';
    }
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Highlight current page in navigation
function markActiveNavLink() {
  const links = document.querySelectorAll('.main-nav a');
  const path = window.location.pathname.split('/').pop();
  links.forEach(link => {
    if (link.getAttribute('href') === path || (path === '' && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Contact form submission
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value;
      // In a real site you'd send the data to a server here.
      alert(`Thanks for reaching out, ${name}! We'll get back to you soon.`);
      form.reset();
    });
  }
}

// Add scroll tracking for header
function initHeaderScrollEffect() {
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
    } else {
      header.style.boxShadow = 'none';
    }
  });
}

// Add animations CSS
function addAnimationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .fade-in {
      animation: fadeIn 0.6s ease-in-out forwards;
    }
    
    .btn:active {
      transform: scale(0.98);
    }
    
    .card {
      transition: all 0.3s ease;
    }
  `;
  document.head.appendChild(style);
}

// Initialize all interactive features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  addAnimationStyles();
  initThemeToggle();
  initSmoothScroll();
  initBlogAnimations();
  initCardInteractions();
  initBlogDates();
  initHeaderScrollEffect();
  initNavToggle();
  initContactForm();
  markActiveNavLink();
  initBackToTop();
  
  console.log('✨ Website interactions initialized!');
});

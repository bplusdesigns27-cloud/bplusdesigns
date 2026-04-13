// ===== B+Designs - Main JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
  
  // ----- Theme Toggle -----
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
  
  function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
      icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
    }
  }
  
  // ----- Navbar Scroll Effect -----
  const navbar = document.querySelector('.navbar-custom');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // ----- Scroll to Top Button -----
  const scrollTopBtn = document.getElementById('scrollTop');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // ----- Smooth Scrolling for Anchor Links -----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ----- Scroll Animations -----
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
  
  // ----- Counter Animation -----
  const counters = document.querySelectorAll('.stat-number');
  
  const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target + '+';
          }
        };
        
        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
  
  // ----- Portfolio Filter -----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // ----- Pricing Toggle -----
  const pricingToggle = document.querySelector('.toggle-switch');
  const monthlyPrices = document.querySelectorAll('.price-monthly');
  const yearlyPrices = document.querySelectorAll('.price-yearly');
  
  if (pricingToggle) {
    pricingToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      
      monthlyPrices.forEach(price => {
        price.style.display = this.classList.contains('active') ? 'none' : 'block';
      });
      
      yearlyPrices.forEach(price => {
        price.style.display = this.classList.contains('active') ? 'block' : 'none';
      });
    });
  }
  
  // ----- Form Validation -----
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form fields
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      
      let isValid = true;
      
      // Simple validation
      if (name.value.trim() === '') {
        showError(name, 'Name is required');
        isValid = false;
      } else {
        removeError(name);
      }
      
      if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
      } else {
        removeError(email);
      }
      
      if (message.value.trim() === '') {
        showError(message, 'Message is required');
        isValid = false;
      } else {
        removeError(message);
      }
      
      if (isValid) {
        // Show success message
        showSuccessMessage();
        contactForm.reset();
      }
    });
  }
  
  function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message') || document.createElement('div');
    error.className = 'error-message text-danger mt-1 small';
    error.textContent = message;
    if (!formGroup.querySelector('.error-message')) {
      formGroup.appendChild(error);
    }
    input.classList.add('is-invalid');
  }
  
  function removeError(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');
    if (error) {
      error.remove();
    }
    input.classList.remove('is-invalid');
  }
  
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success mt-3';
    successDiv.innerHTML = '<i class="bi bi-check-circle me-2"></i>Thank you! Your message has been sent successfully.';
    contactForm.appendChild(successDiv);
    
    setTimeout(() => {
      successDiv.remove();
    }, 5000);
  }
  
  // ----- Testimonial Carousel -----
  // Using Bootstrap's built-in carousel, but adding custom touch events
  const testimonialCarousel = document.querySelector('#testimonialCarousel');
  
  if (testimonialCarousel) {
    let touchStartX = 0;
    let touchEndX = 0;
    
    testimonialCarousel.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    testimonialCarousel.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
    
    function handleSwipe() {
      const carousel = bootstrap.Carousel.getOrCreateInstance(testimonialCarousel);
      if (touchEndX < touchStartX - 50) {
        carousel.next();
      }
      if (touchEndX > touchStartX + 50) {
        carousel.prev();
      }
    }
  }
  
  // ----- Active Navigation Link -----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
  
  // ----- Preloader (if needed) -----
  window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 300);
    }
  });
  
});

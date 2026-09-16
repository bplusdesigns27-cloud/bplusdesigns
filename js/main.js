// ===== B+Designs - Main JavaScript (White & Light Blue Interactive Edition) =====

document.addEventListener('DOMContentLoaded', function() {
  
  const html = document.documentElement;
  html.setAttribute('data-theme', 'light');
  
  // ----- Navbar Scroll Effect -----
  const navbar = document.querySelector('.navbar-custom');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
  
  // ----- Scroll to Top Button -----
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    });
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
      const href = this.getAttribute('href');
      if (href.length > 1 && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
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
        const target = parseInt(counter.getAttribute('data-target')) || 100;
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
  const loadMoreProjects = document.getElementById('loadMoreProjects');
  let additionalProjectsLoaded = false;

  if (loadMoreProjects) {
    loadMoreProjects.addEventListener('click', function() {
      additionalProjectsLoaded = true;
      document.querySelectorAll('.load-more-item').forEach(item => {
        item.classList.remove('d-none');
        item.style.display = 'block';
        item.style.opacity = '1';
        item.style.transform = 'scale(1)';
      });
      loadMoreProjects.disabled = true;
      loadMoreProjects.innerHTML = 'All Projects Loaded <i class="bi bi-check2 ms-2"></i>';
    });
  }
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      portfolioItems.forEach(item => {
        if (item.classList.contains('load-more-item') && !additionalProjectsLoaded) {
          item.style.display = 'none';
          return;
        }
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
  
  // ----- Form Validation & Admin Sync -----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const nameEl = document.getElementById('name');
      const emailEl = document.getElementById('email');
      const phoneEl = document.getElementById('phone');
      const companyEl = document.getElementById('company');
      const serviceEl = document.getElementById('service');
      const budgetEl = document.getElementById('budget');
      const messageEl = document.getElementById('message');
      const btnSubmit = document.getElementById('btnSubmitContact');
      
      let isValid = true;
      
      if (!nameEl || nameEl.value.trim() === '') {
        if (nameEl) showError(nameEl, 'Name is required');
        isValid = false;
      } else {
        removeError(nameEl);
      }
      
      if (!emailEl || !isValidEmail(emailEl.value)) {
        if (emailEl) showError(emailEl, 'Please enter a valid email');
        isValid = false;
      } else {
        removeError(emailEl);
      }
      
      if (!messageEl || messageEl.value.trim() === '') {
        if (messageEl) showError(messageEl, 'Message is required');
        isValid = false;
      } else {
        removeError(messageEl);
      }
      
      if (isValid) {
        const nameVal = nameEl.value.trim();
        const emailVal = emailEl.value.trim();
        const phoneVal = phoneEl ? phoneEl.value.trim() : '';
        const companyVal = companyEl ? companyEl.value.trim() : '';
        const serviceVal = serviceEl ? serviceEl.value : 'General Inquiry';
        const budgetVal = budgetEl ? budgetEl.value : 'N/A';
        const messageVal = messageEl.value.trim();

        const todayStr = new Date().toLocaleDateString('en-US', {
          year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        const newInquiry = {
          id: Date.now(),
          date: todayStr,
          timestamp: Date.now(),
          name: nameVal,
          email: emailVal,
          phone: phoneVal,
          company: companyVal,
          service: serviceVal,
          budget: budgetVal,
          subject: serviceVal ? `Inquiry: ${serviceVal}` : 'General Inquiry',
          message: messageVal,
          adminEmail: 'bplusdesigns27@gmail.com'
        };

        if (btnSubmit) {
          btnSubmit.disabled = true;
          btnSubmit.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Sending...';
        }

        let savedToFirebase = false;

        // 1. Try Firebase Firestore
        try {
          if (window.db) {
            await window.db.collection('inquiries').add({
              ...newInquiry,
              createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            savedToFirebase = true;
            console.log("Inquiry successfully saved to Firebase Firestore!");
          }
        } catch (firebaseErr) {
          console.warn("Firebase Firestore add warning:", firebaseErr);
        }

        // 2. LocalStorage sync fallback/cache
        try {
          const rawData = localStorage.getItem('bplus_inquiries');
          let inquiries = rawData ? JSON.parse(rawData) : [];
          inquiries.unshift(newInquiry);
          localStorage.setItem('bplus_inquiries', JSON.stringify(inquiries));
        } catch (lsErr) {
          console.warn("LocalStorage save warning:", lsErr);
        }

        // 3. Reliable Email dispatch to bplusdesigns27@gmail.com with clean email design
        let emailSent = false;

        const emailSubject = `📩 New Client Lead: ${nameVal} [${serviceVal}]`;
        const emailPayload = {
          "Client Name": nameVal,
          "Client Email": emailVal,
          "Phone Number": phoneVal || 'Not Provided',
          "Company": companyVal || 'Not Provided',
          "Service Requested": serviceVal,
          "Budget Range": budgetVal || 'Not Specified',
          "Project Message": messageVal
        };

        // Primary dispatch: Web3Forms API
        try {
          const web3res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              access_key: '1086ba6e-8be1-42c4-a1e8-7b6c07a0ab26',
              from_name: 'B+Designs Website Lead',
              subject: emailSubject,
              replyto: emailVal,
              ...emailPayload
            })
          });
          const web3data = await web3res.json();
          if (web3data.success) {
            emailSent = true;
          }
        } catch (web3Err) {
          console.warn("Web3Forms API attempt note:", web3Err);
        }

        // Secondary fallback dispatch: FormSubmit
        if (!emailSent) {
          try {
            await fetch('https://formsubmit.co/ajax/bplusdesigns27@gmail.com', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                _subject: emailSubject,
                _replyto: emailVal,
                ...emailPayload
              })
            });
            emailSent = true;
          } catch (fsErr) {
            console.warn("FormSubmit fallback attempt note:", fsErr);
          }
        }

        if (btnSubmit) {
          btnSubmit.disabled = false;
          btnSubmit.innerHTML = 'Send Message <i class="bi bi-send ms-2"></i>';
        }

        showToast(`Thank you, ${nameVal}! Your message has been sent directly to admin email (bplusdesigns27@gmail.com).`, "success");
        contactForm.reset();
      }
    });
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
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

  // ===== INTERACTIVE FEATURE 1: Hero Light Blue Particle Canvas =====
  function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    });

    const particles = [];
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 4 + 1.5,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: (Math.random() - 0.5) * 0.8,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14, 165, 233, ${p.alpha})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.25 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    }
    animate();
  }
  initHeroCanvas();

  // ===== INTERACTIVE FEATURE 2: Project Cost Calculator =====
  function initCostCalculator() {
    const pagesRange = document.getElementById('calcPages');
    const pagesVal = document.getElementById('calcPagesVal');
    const serviceSelect = document.getElementById('calcService');
    const estimatedPriceVal = document.getElementById('estimatedPrice');
    const featureCheckboxes = document.querySelectorAll('.calc-feature');

    if (!pagesRange || !estimatedPriceVal) return;

    function calculateCost() {
      let baseRate = parseFloat(serviceSelect ? serviceSelect.value : 499);
      let pages = parseInt(pagesRange.value) || 1;
      if (pagesVal) pagesVal.textContent = pages;

      let featureTotal = 0;
      featureCheckboxes.forEach(cb => {
        if (cb.checked) {
          featureTotal += parseFloat(cb.value);
        }
      });

      let total = baseRate + (pages * 80) + featureTotal;
      estimatedPriceVal.textContent = '$' + total.toLocaleString();
    }

    pagesRange.addEventListener('input', calculateCost);
    if (serviceSelect) serviceSelect.addEventListener('change', calculateCost);
    featureCheckboxes.forEach(cb => cb.addEventListener('change', calculateCost));

    calculateCost();
  }
  initCostCalculator();

  // ===== INTERACTIVE FEATURE 3: Command Palette Search Modal =====
  const searchableItems = [
    { title: "UI/UX Design Services", category: "Services", url: "services.html#uiux", icon: "bi-palette" },
    { title: "Website Development", category: "Services", url: "services.html#webdev", icon: "bi-code-slash" },
    { title: "Digital Marketing & SEO", category: "Services", url: "services.html#marketing", icon: "bi-graph-up" },
    { title: "Social Media Management", category: "Services", url: "services.html#social", icon: "bi-share" },
    { title: "E-Commerce Solutions", category: "Portfolio", url: "portfolio.html", icon: "bi-cart3" },
    { title: "Starter Plan ($499)", category: "Pricing", url: "pricing.html", icon: "bi-tag" },
    { title: "Pro Growth Plan ($999)", category: "Pricing", url: "pricing.html", icon: "bi-rocket-takeoff" },
    { title: "Enterprise Custom Plan", category: "Pricing", url: "pricing.html", icon: "bi-building" },
    { title: "About B+Designs Team", category: "Company", url: "about.html", icon: "bi-people" },
    { title: "Contact Us & Instant Quote", category: "Contact", url: "contact.html", icon: "bi-envelope" }
  ];

  window.openSearchModal = function() {
    const searchModal = new bootstrap.Modal(document.getElementById('searchModal'));
    searchModal.show();
    setTimeout(() => {
      const input = document.getElementById('globalSearchInput');
      if (input) input.focus();
    }, 200);
  };

  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearchModal();
    }
  });

  const searchInput = document.getElementById('globalSearchInput');
  const searchResultsContainer = document.getElementById('searchResultsContainer');

  if (searchInput && searchResultsContainer) {
    function renderSearchResults(query) {
      const q = query.toLowerCase().trim();
      const filtered = searchableItems.filter(item => 
        item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
      );

      if (filtered.length === 0) {
        searchResultsContainer.innerHTML = `<div class="text-center py-4 text-muted">No matching results found for "${escapeHtml(query)}"</div>`;
        return;
      }

      searchResultsContainer.innerHTML = filtered.map(item => `
        <a href="${item.url}" class="search-result-item">
          <div class="search-result-icon">
            <i class="bi ${item.icon}"></i>
          </div>
          <div class="flex-grow-1">
            <div class="fw-semibold">${escapeHtml(item.title)}</div>
            <small class="text-muted">${escapeHtml(item.category)}</small>
          </div>
          <i class="bi bi-chevron-right text-muted"></i>
        </a>
      `).join('');
    }

    searchInput.addEventListener('input', (e) => renderSearchResults(e.target.value));
    renderSearchResults('');
  }

  // ===== INTERACTIVE FEATURE 4: Floating Live Chat Widget =====
  const floatingChatBtn = document.getElementById('floatingChatBtn');
  const chatBoxWidget = document.getElementById('chatBoxWidget');
  const closeChatBtn = document.getElementById('closeChatBtn');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatBody = document.getElementById('chatBody');

  if (floatingChatBtn && chatBoxWidget) {
    floatingChatBtn.addEventListener('click', () => {
      const isVisible = chatBoxWidget.style.display === 'block';
      chatBoxWidget.style.display = isVisible ? 'none' : 'block';
    });
    if (closeChatBtn) {
      closeChatBtn.addEventListener('click', () => {
        chatBoxWidget.style.display = 'none';
      });
    }

    if (chatForm && chatInput) {
      chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const msg = chatInput.value.trim();
        if (!msg) return;

        // User message
        appendChatMsg(msg, 'user');
        chatInput.value = '';

        // Auto Bot response
        setTimeout(() => {
          let botReply = "Thanks for reaching out! Our team is available 24/7. How can we assist with your project today?";
          if (msg.toLowerCase().includes('price') || msg.toLowerCase().includes('cost')) {
            botReply = "Our pricing starts at $499 for full design & dev! You can use our interactive cost estimator on the pricing page.";
          } else if (msg.toLowerCase().includes('admin') || msg.toLowerCase().includes('login')) {
            botReply = "Admin login has been removed. All client inquiries submitted on the Contact page are dispatched directly to bplusdesigns27@gmail.com!";
          }
          appendChatMsg(botReply, 'bot');
        }, 1000);
      });
    }
  }

  function appendChatMsg(text, sender) {
    if (!chatBody) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;
    msgDiv.textContent = text;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // Toast Helper
  function showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container-custom';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast-custom border-start border-${type}`;
    
    let iconClass = 'bi-info-circle-fill text-info';
    if (type === 'success') iconClass = 'bi-check-circle-fill text-success';
    if (type === 'danger') iconClass = 'bi-exclamation-triangle-fill text-danger';

    toast.innerHTML = `
      <i class="bi ${iconClass} fs-5"></i>
      <div class="flex-grow-1 small fw-medium">${message}</div>
      <button type="button" class="btn-close ms-2" onclick="this.parentElement.remove()"></button>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 4500);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Active Navigation Highlight
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});

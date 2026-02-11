document.addEventListener("DOMContentLoaded", () => {
  // --- Mobile Menu Functionality ---
  function initializeMobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const mobileNav = document.getElementById("mobileNav");

    if (hamburger && mobileNav) {
      // Toggle mobile menu
      hamburger.addEventListener("click", () => {
        mobileNav.classList.toggle("show");
        hamburger.classList.toggle("active");
      });

      // Close mobile menu when clicking on a link
      const mobileLinks = mobileNav.querySelectorAll('a');
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileNav.classList.remove("show");
          hamburger.classList.remove("active");
        });
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !mobileNav.contains(e.target) && mobileNav.classList.contains('show')) {
          mobileNav.classList.remove("show");
          hamburger.classList.remove("active");
        }
      });

      // Close mobile menu on window resize
      window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
          mobileNav.classList.remove("show");
          hamburger.classList.remove("active");
        }
      });
    }
  }

  // --- Contact Form Handling ---
  function initializeContactForm() {
    const form = document.getElementById('feedbackForm');
    
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const rating = document.getElementById('rating').value;
        const message = document.getElementById('message').value.trim();
        
        // Validation
        if (!name || !email || !message) {
          alert('Please fill in all required fields (Name, Email, Message).');
          return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert('Please enter a valid email address.');
          return;
        }
        
        // Create form data
        const formData = {
          name: name,
          email: email,
          subject: subject,
          rating: rating,
          message: message,
          timestamp: new Date().toLocaleString()
        };
        
        console.log('Contact form submitted:', formData);
        
        // Success animation
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.style.background = '#4CAF50';
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = '';
          
          alert('Thank you for your feedback! We appreciate you taking the time to share your thoughts with us.');
          form.reset();
        }, 2000);
      });
    }
  }

  // --- Form Input Enhancements ---
  function initializeFormEnhancements() {
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
      // Add focus styles
      input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
      });
      
      input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
      });
    });
  }

  // --- Smooth Scrolling ---
  function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId.startsWith('#')) return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const headerHeight = document.querySelector('header').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // --- Initialize Everything ---
  function initializeAll() {
    initializeMobileMenu();
    initializeContactForm();
    initializeFormEnhancements();
    initializeSmoothScrolling();
    
    console.log('Contact page initialized successfully!');
  }

  // Start the application
  initializeAll();
});
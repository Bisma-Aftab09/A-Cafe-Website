document.addEventListener("DOMContentLoaded", () => {
  // --- Simple Loading Screen ---
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    // Always hide after 2 seconds regardless of page load
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');
      setTimeout(() => loadingScreen.remove(), 500);
    }, 2000);
  }

  // --- Simple Popup ---
  function initializeSimplePopup() {
    const popup = document.getElementById('simplePopup');
    const closeBtn = document.querySelector('.close-popup-x'); // FIXED: Use correct class
    const form = document.querySelector('.simple-form');
    
    if (!popup) {
      console.log('Popup not found');
      return;
    }
    
    // Show popup after 2 seconds
    setTimeout(() => {
      const hasSubscribed = localStorage.getItem('newsletterSubscribed');
      if (!hasSubscribed) {
        console.log('Showing popup');
        popup.classList.add('active');
      }
    }, 2000);
    
    // Close button functionality - ADDED THIS
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        popup.classList.remove('active');
      });
    }
    
    // Close when clicking outside image - ADDED THIS
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.classList.remove('active');
      }
    });
    
    // Form submission
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('input[type="email"]').value;
        if (email) {
          alert('Thanks for signing up! Check your email for 10% off.');
          localStorage.setItem('newsletterSubscribed', 'true');
          popup.classList.remove('active');
        }
      });
    }
  }

  // Initialize the popup
  initializeSimplePopup();

  // --- Hamburger & Mobile Nav ---
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  const header = document.getElementById("mainHeader");

  if (hamburger && mobileNav) {
    hamburger.addEventListener("click", () => {
      mobileNav.classList.toggle("show");
    });

    // Auto-close mobile nav on desktop
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        mobileNav.classList.remove("show");
      }
    });
  }

  // --- Header hide/reveal ---
  if (header) {
    let hideTimer;

    function showHeader() {
      header.classList.remove("hide");
    }

    function hideHeader() {
      header.classList.add("hide");
    }

    function resetHideTimer() {
      showHeader();
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        if (window.scrollY > 50) hideHeader();
      }, 1500);
    }

    window.addEventListener("scroll", resetHideTimer);
    window.addEventListener("mousemove", resetHideTimer);
  }

  // --- Slideshow ---
  const slides = document.querySelectorAll('.slide');
  if (slides.length > 0) {
    let currentIndex = 0;
    const intervalTime = 5000; // 5 seconds

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }

    // Show first slide initially
    showSlide(currentIndex);

    // Loop through slides
    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }, intervalTime);
  }

  // --- Fade-in About Section on Scroll ---
  const aboutCard = document.querySelector(".about-card");
  const aboutSection = document.querySelector(".about-section");
  const videoSection = document.querySelector(".video-section");

  function revealOnScroll() {
    const cardTop = aboutCard.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (cardTop < windowHeight - 100) { // trigger 100px before fully visible
      aboutCard.classList.add("visible");
    } else {
      aboutCard.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // check on load
});
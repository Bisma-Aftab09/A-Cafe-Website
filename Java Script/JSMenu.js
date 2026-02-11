// ===== MOBILE MENU FUNCTIONALITY =====

// Get DOM elements for mobile menu
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

// Toggle mobile menu when hamburger is clicked
if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
        // Toggle mobile nav display
        mobileNav.classList.toggle('active');
        
        // Animate hamburger to X
        hamburger.classList.toggle('active');
    });
}



// ===== SMOOTH SCROLL FUNCTION =====
function scrollToSection(sectionId) {
    // Get the target section element
    const targetSection = document.getElementById(sectionId);
    
    // Scroll to the section with smooth behavior
    if (targetSection) {
        // Calculate offset for fixed header
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (mobileNav && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
}

// ===== CLOSE MOBILE MENU WHEN LINK IS CLICKED =====
const mobileLinks = document.querySelectorAll('.mobile-nav a');

// Add click event to each mobile navigation link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Hide mobile menu when a link is clicked
        if (mobileNav) {
            mobileNav.classList.remove('active');
        }
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    });
});

// ===== ACTIVE STATE FOR MENU NAVIGATION BUTTONS =====
document.addEventListener('DOMContentLoaded', function() {
    const menuButtons = document.querySelectorAll('.menu-nav-btn');
    
    // Add click event to each menu navigation button
    menuButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            menuButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
        });
    });
});

// ===== FIX FOR HEADER POSITIONING =====
document.addEventListener('DOMContentLoaded', function() {
    // Add padding to body to account for fixed header
    const header = document.querySelector('header');
    if (header) {
        const headerHeight = header.offsetHeight;
        document.body.style.paddingTop = headerHeight + 'px';
    }
});

// ===== HAMBURGER ANIMATION =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
});
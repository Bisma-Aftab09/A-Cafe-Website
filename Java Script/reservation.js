// ===== MOBILE MENU FUNCTIONALITY =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

// Toggle mobile menu when hamburger is clicked
if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// ===== CLOSE MOBILE MENU ON RESIZE =====
function handleResize() {
    if (window.innerWidth > 768) {
        if (mobileNav && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
        }
        if (hamburger && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
        }
    }
}

// ===== FORM VALIDATION =====
document.getElementById('reservationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const guests = document.getElementById('guests').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    
    // Simple validation
    if (!name || !email || !phone || !guests || !date || !time) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Show success message
    alert(`Thank you, ${name}! Your reservation for ${guests} people on ${date} at ${time} has been received. We will confirm shortly.`);
    
    // Reset form
    this.reset();
});

// ===== SET MIN DATE FOR RESERVATION (today) =====
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    
    // Add padding to body for fixed header
    const header = document.querySelector('header');
    if (header) {
        const headerHeight = header.offsetHeight;
        document.body.style.paddingTop = headerHeight + 'px';
    }
});

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
    // Close mobile menu on window resize
    window.addEventListener('resize', handleResize);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileNav && mobileNav.classList.contains('active') && 
            !hamburger.contains(e.target) && 
            !mobileNav.contains(e.target)) {
            mobileNav.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Close mobile menu when link is clicked
    const mobileLinks = document.querySelectorAll('.mobile-nav a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav) mobileNav.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });
});
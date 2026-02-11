// ===== MOBILE MENU FUNCTIONALITY =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

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

// ===== CART FUNCTIONALITY =====
let cart = [];

// Menu items with French and Japanese additions
const menuItems = [
    // French Classics
    {
        id: 1,
        name: "Croissant au Beurre",
        description: "Traditional French butter croissant, flaky and golden brown",
        price: 3.50,
        category: "french"
    },
    {
        id: 2,
        name: "Pain au Chocolat",
        description: "Buttery pastry with rich dark chocolate filling",
        price: 4.25,
        category: "french"
    },
    {
        id: 3,
        name: "Éclair au Chocolat",
        description: "Choux pastry filled with cream and topped with chocolate glaze",
        price: 5.75,
        category: "french"
    },
    {
        id: 4,
        name: "Macaron Assorti",
        description: "Assortment of 6 French macarons in various flavors",
        price: 12.50,
        category: "french"
    },
    
    // Japanese Fusion
    {
        id: 5,
        name: "Matcha Roll Cake",
        description: "Light sponge cake with matcha cream filling",
        price: 6.25,
        category: "japanese"
    },
    {
        id: 6,
        name: "Dorayaki",
        description: "Japanese red bean pancake sandwich",
        price: 4.75,
        category: "japanese"
    },
    {
        id: 7,
        name: "Sakura Mochi",
        description: "Sweet rice cake with cherry blossom flavor",
        price: 5.50,
        category: "japanese"
    },
    
    // Seasonal Specials
    {
        id: 8,
        name: "Kuma-chan's Sweet Potato Caramel Parfait",
        description: "A cozy dessert-cup with sweet-potato cream and caramel",
        price: 5.50,
        category: "seasonal"
    },
    {
        id: 9,
        name: "Snowman Raspberry Tea Latte",
        description: "Raspberry-infused tea latte with steamed milk",
        price: 5.25,
        category: "seasonal"
    },
    {
        id: 10,
        name: "Spicy Strawberry Chai Tea",
        description: "Warm chai spices with sweet-tart strawberry",
        price: 3.75,
        category: "seasonal"
    },
    
    // Pastries & Desserts
    {
        id: 11,
        name: "Saku Straw Macarons",
        description: "Pastel-pink macarons with cherry blossom aroma",
        price: 7.25,
        category: "desserts"
    },
    {
        id: 12,
        name: "Banana & Chocolate Custard",
        description: "Rich chocolate custard with sweet banana",
        price: 6.50,
        category: "desserts"
    },
    {
        id: 13,
        name: "Matcha Floral Mont Blanc",
        description: "Mont Blanc with soft sponge and sakura cream",
        price: 6.75,
        category: "desserts"
    },
    
    // Beverages
    {
        id: 14,
        name: "Café au Lait",
        description: "Traditional French coffee with steamed milk",
        price: 4.25,
        category: "beverages"
    },
    {
        id: 15,
        name: "Matcha Latte",
        description: "Japanese green tea latte with steamed milk",
        price: 5.25,
        category: "beverages"
    },
    {
        id: 16,
        name: "Hot Chocolate",
        description: "Rich melted chocolate with steamed milk",
        price: 4.75,
        category: "beverages"
    },
    {
        id: 17,
        name: "Afternoon Chai Tea",
        description: "Classic tea service with fragrant brewed tea",
        price: 4.50,
        category: "beverages"
    }
];

// ===== INITIALIZE PAGE =====
function initializePage() {
    loadMenuItems('all');
    initializeCategoryFilter();
    setMinDate();
    updateCartCounts();
    
    // Add padding to body for fixed header
    const header = document.querySelector('header');
    if (header) {
        const headerHeight = header.offsetHeight;
        document.body.style.paddingTop = headerHeight + 'px';
    }
}

// ===== CATEGORY FILTERING =====
function initializeCategoryFilter() {
    const categories = document.querySelectorAll('.category');
    
    categories.forEach(category => {
        category.addEventListener('click', function() {
            // Remove active class from all categories
            categories.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to clicked category
            this.classList.add('active');
            
            // Load items for selected category
            const categoryType = this.dataset.category;
            loadMenuItems(categoryType);
            updateCategoryTitle(categoryType);
        });
    });
}

function updateCategoryTitle(category) {
    const categoryTitle = document.querySelector('.category-title');
    const activeCategory = document.querySelector(`.category[data-category="${category}"]`);
    
    if (activeCategory) {
        categoryTitle.textContent = activeCategory.textContent;
    }
}

function loadMenuItems(category) {
    const menuItemsList = document.getElementById('menuItemsList');
    const filteredItems = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);
    
    menuItemsList.innerHTML = '';
    
    filteredItems.forEach(item => {
        const menuItemRow = document.createElement('div');
        menuItemRow.className = 'menu-item-row';
        menuItemRow.innerHTML = `
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-desc">${item.description}</div>
            </div>
            <div class="item-price">$${item.price.toFixed(2)}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${item.id})">
                Add to Cart
            </button>
        `;
        menuItemsList.appendChild(menuItemRow);
    });
}

// ===== CART MANAGEMENT =====
function addToCart(itemId) {
    const item = menuItems.find(menuItem => menuItem.id === itemId);
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showAddToCartMessage(item.name);
    saveCartToStorage();
}

function showAddToCartMessage(itemName) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.cart-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background: #8B7355;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 1000;
        font-family: 'PT Serif', serif;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-weight: 500;
    `;
    notification.textContent = `✓ Added ${itemName}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 2000);
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const grandTotal = document.getElementById('grandTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    // Update cart count
    updateCartCounts();
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
                <p class="cart-hint">Add items from the menu</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span class="cart-item-price">$${item.price.toFixed(2)}</span>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">-</button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">×</button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    grandTotal.textContent = `$${total.toFixed(2)}`;
    
    // Enable/disable checkout button
    checkoutBtn.disabled = cart.length === 0;
}

function updateCartCounts() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'}`;
}

// Cart quantity controls
function increaseQuantity(itemId) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity += 1;
        updateCartDisplay();
        saveCartToStorage();
    }
}

function decreaseQuantity(itemId) {
    const item = cart.find(cartItem => cartItem.id === itemId);
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        updateCartDisplay();
        saveCartToStorage();
    } else {
        removeFromCart(itemId);
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
    saveCartToStorage();
}

function clearCart() {
    if (cart.length > 0) {
        if (confirm('Are you sure you want to clear your cart?')) {
            cart = [];
            updateCartDisplay();
            saveCartToStorage();
        }
    }
}

// ===== LOCAL STORAGE =====
function saveCartToStorage() {
    localStorage.setItem('parisPatisserieCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('parisPatisserieCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// ===== CHECKOUT FUNCTIONALITY =====
function checkout() {
    const name = document.getElementById('pickup-name').value;
    const phone = document.getElementById('pickup-phone').value;
    const date = document.getElementById('pickup-date').value;
    const time = document.getElementById('pickup-time').value;
    
    // Validate form
    if (!name || !phone || !date || !time) {
        alert('Please fill in all pickup details before placing your order.');
        return;
    }
    
    if (cart.length === 0) {
        alert('Please add items to your cart before checking out.');
        return;
    }
    
    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Create order summary
    let orderSummary = `🍰 ORDER CONFIRMED! 🍰\n\n`;
    orderSummary += `Customer: ${name}\n`;
    orderSummary += `Phone: ${phone}\n`;
    orderSummary += `Pickup: ${date} at ${time}\n\n`;
    orderSummary += `ITEMS:\n`;
    
    cart.forEach(item => {
        orderSummary += `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    orderSummary += `\nTOTAL: $${total.toFixed(2)}\n\n`;
    orderSummary += `Thank you for your order! We'll have it ready for pickup.`;
    
    alert(orderSummary);
    
    // Reset form and cart
    document.getElementById('customerForm').reset();
    cart = [];
    updateCartDisplay();
    saveCartToStorage();
}

// ===== UTILITY FUNCTIONS =====
function setMinDate() {
    const dateInput = document.getElementById('pickup-date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    loadCartFromStorage();
    
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
    
    // Clear cart button
    document.getElementById('clearCartBtn').addEventListener('click', clearCart);
    
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', checkout);
});

// Make functions globally available
window.addToCart = addToCart;
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.checkout = checkout;
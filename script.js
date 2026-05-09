/* ==================== SCROLL REVEAL ANIMATION ==================== */

// Intersection Observer for scroll reveal animations
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'revealUp 0.8s ease-out forwards';
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
});

// Observe all elements with reveal-up class
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = 'none';
        el.style.animationDelay = `${index * 0.1}s`;
        revealObserver.observe(el);
    });
});

/* ==================== SMOOTH PARALLAX EFFECT ==================== */

const parallaxElement = document.querySelector('.coffee-cup');
if (parallaxElement) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const heroHeight = document.querySelector('.hero').offsetHeight;
        
        if (scrollPosition < heroHeight) {
            const parallaxValue = scrollPosition * 0.5;
            parallaxElement.style.transform = `translateY(${parallaxValue}px)`;
        }
    });
}

/* ==================== BUTTON INTERACTIONS ==================== */

// Order Now button
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
        console.log('Order Now clicked');
        // Add your order functionality here
    });
});

// View Menu button
document.querySelectorAll('.btn-outline').forEach(btn => {
    btn.addEventListener('click', function() {
        const menuSection = document.getElementById('menu');
        if (menuSection) {
            menuSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add to Cart buttons
document.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', function() {
        const menuCard = this.closest('.menu-card');
        const menuName = menuCard.querySelector('.menu-info h3').textContent;
        const price = menuCard.querySelector('.price').textContent;
        
        // Add ripple effect
        addRipple(this, event);
        
        // Show feedback
        showNotification(`${menuName} added to cart!`);
    });
});

/* ==================== RIPPLE EFFECT ==================== */

function addRipple(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

/* ==================== NOTIFICATION SYSTEM ==================== */

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #6f4e37, #8B6F47);
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        z-index: 9999;
        animation: slideInRight 0.4s ease-out;
        box-shadow: 0 8px 25px rgba(111, 78, 55, 0.3);
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    // Add animation keyframes if not already added
    if (!document.querySelector('style[data-notification]')) {
        const style = document.createElement('style');
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.4s ease-out reverse';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

/* ==================== CONTACT FORM HANDLING ==================== */

const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        showNotification('Terima kasih! Kami akan menghubungi Anda segera.');
        
        // Reset form
        this.reset();
    });
}

/* ==================== ACTIVE NAV LINK ==================== */

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === current) {
            link.style.color = '#e8956e';
        } else {
            link.style.color = '';
        }
    });
});

/* ==================== MOBILE MENU TOGGLE ==================== */

// Add hamburger menu for mobile
function setupMobileMenu() {
    const navContainer = document.querySelector('.nav-container');
    
    if (window.innerWidth <= 768) {
        // Check if hamburger already exists
        if (!document.querySelector('.hamburger')) {
            const hamburger = document.createElement('button');
            hamburger.className = 'hamburger';
            hamburger.innerHTML = '☰';
            hamburger.style.cssText = `
                display: none;
                background: none;
                border: none;
                font-size: 24px;
                color: #6f4e37;
                cursor: pointer;
                z-index: 1000;
            `;
            
            navContainer.appendChild(hamburger);
        }
    }
}

window.addEventListener('load', setupMobileMenu);
window.addEventListener('resize', setupMobileMenu);

/* ==================== LAZY LOADING FOR IMAGES ==================== */

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

/* ==================== ADVANCED SCROLL ANIMATION ==================== */

// Stagger animations for elements
function setupStaggerAnimations() {
    const animationElements = document.querySelectorAll('[class*="reveal"]');
    
    animationElements.forEach((element, index) => {
        const delay = index * 0.1;
        element.style.setProperty('--stagger-delay', `${delay}s`);
    });
}

document.addEventListener('DOMContentLoaded', setupStaggerAnimations);

/* ==================== ACCESSIBILITY IMPROVEMENTS ==================== */

// Add keyboard navigation for buttons
document.querySelectorAll('button, a').forEach(element => {
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
            e.target.click();
        }
    });
});

/* ==================== PRELOAD ANIMATIONS ==================== */

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

/* ==================== SMOOTH SCROLL BEHAVIOR ==================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ==================== PERFORMANCE OPTIMIZATION ==================== */

// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        // Performance-heavy operations can go here
    });
}, { passive: true });

/* ==================== DYNAMIC MENU CARD EFFECTS ==================== */

document.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.12)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.06)';
    });
});

/* ==================== TESTIMONIAL CARD ANIMATION ==================== */

document.querySelectorAll('.testimonial-card').forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

/* ==================== GALLERY ITEM INTERACTION ==================== */

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        // Trigger gallery lightbox or zoom effect
        console.log('Gallery item clicked');
    });
});

/* ==================== COUNTER ANIMATION ==================== */

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

console.log('✨ Brewed Happiness website loaded successfully!');
console.log('🚀 All animations and interactions are ready.');

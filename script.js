// ============ STICKY NAVBAR ============
// Mengubah warna navbar saat di-scroll
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Tambahkan shadow saat scrolling
    if (scrollTop > 50) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============ MOBILE MENU TOGGLE ============
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        
        // Animasi hamburger button
        const spans = mobileMenuBtn.querySelectorAll('span');
        if (mobileMenu.classList.contains('hidden')) {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        } else {
            spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        }
    });
    
    // Tutup menu saat link diklik
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}


// ============ SMOOTH SCROLL ============
// Smooth scrolling untuk semua link anchor
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


// ============ FORM SUBMISSION ============
// Handle form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Validasi form
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert('Mohon isi semua field yang wajib diisi!');
            return;
        }
        
        // Simulasi pengiriman form
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            // Tampilkan success message
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.classList.remove('hidden');
            }
            
            // Reset form
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Sembunyikan success message setelah 5 detik
            setTimeout(() => {
                if (successMessage) {
                    successMessage.classList.add('hidden');
                }
            }, 5000);
        }, 1500);
    });
}


// ============ SCROLL REVEAL ANIMATION ============
// Animasi reveal saat elemen masuk viewport
const revealElements = document.querySelectorAll('[class*="reveal"]');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        // Jika elemen berada di viewport
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Jalankan saat pertama kali load


// ============ BUTTON HOVER EFFECT ============
// Tambahkan efek pada semua tombol
const buttons = document.querySelectorAll('button:not(#mobile-menu-btn), a[class*="btn"]');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});


// ============ PRODUCT CARD ANIMATION ============
// Animasi untuk kartu produk
const productCards = document.querySelectorAll('[class*="menu-card"], [class*="gallery-item"], [class*="testimonial-card"]');

productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});


// ============ PAGE LOAD ANIMATION ============
// Animasi fade-in saat halaman dimuat
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});


// ============ ACTIVE LINK HIGHLIGHT ============
// Highlight link yang aktif berdasarkan halaman saat ini
const currentLocation = location.pathname;
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    const href = link.getAttribute('href');
    
    if (currentLocation.includes(href) && href !== 'index.html') {
        link.classList.add('text-amber-700', 'font-bold');
        link.classList.remove('text-black', 'font-medium');
    } else if (currentLocation === '/' && href === 'index.html') {
        link.classList.add('text-amber-700', 'font-bold');
        link.classList.remove('text-black', 'font-medium');
    }
});

// ============ LAZY LOADING OPTIMIZATION ============
// Untuk performa lebih baik (jika ada gambar)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============ CONSOLE LOG INFO ============
console.log('🎉 Tropis Coffee - Website berhasil dimuat!');
console.log('Terima kasih telah mengunjungi Tropis Coffee');


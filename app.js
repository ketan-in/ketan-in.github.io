// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
function toggleMobileNav() {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('.material-icons');
    
    if (navMenu.classList.contains('active')) {
        icon.textContent = 'close';
    } else {
        icon.textContent = 'menu';
    }
}

// Add event listener for mobile nav toggle
navToggle.addEventListener('click', toggleMobileNav);

// Close mobile nav when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('.material-icons');
        icon.textContent = 'menu';
    });
});

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('.material-icons');
        icon.textContent = 'menu';
    }
});

// Navbar Scroll Effect
function handleNavbarScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 25px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
}

// Add scroll event listener
window.addEventListener('scroll', handleNavbarScroll);

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize smooth scrolling
initSmoothScrolling();

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 100; // Offset for navbar
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (correspondingLink) {
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                correspondingLink.classList.add('active');
            }
        }
    });
}

// Add scroll event listener for active link highlighting
window.addEventListener('scroll', updateActiveNavLink);

// Download CV Function
function downloadCV() {
    // Create a simple alert for demo purposes
    // In a real implementation, this would link to an actual PDF file
    alert('Please contact Ketan Pandey directly at ERKETANPANDEYOFFICIAL@GMAIL.COM for the latest CV.');
    
    // Alternative implementation with a mock PDF
    // const link = document.createElement('a');
    // link.href = 'path-to-cv.pdf'; // Replace with actual CV path
    // link.download = 'Ketan_Pandey_Resume.pdf';
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
}

// Contact Form Handler
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thank you for your message! Ketan will get back to you soon.', 'success');
    
    // Reset form
    event.target.reset();
    
    // In a real implementation, you would send this data to a server
    // Example with mailto (opens default email client)
    const mailtoLink = `mailto:ERKETANPANDEYOFFICIAL@GMAIL.COM?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    window.open(mailtoLink);
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="material-icons">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <span class="material-icons">close</span>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        min-width: 300px;
        max-width: 500px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Helper functions for notifications
function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check_circle';
        case 'error': return 'error';
        case 'warning': return 'warning';
        default: return 'info';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#4CAF50';
        case 'error': return '#f44336';
        case 'warning': return '#FF9800';
        default: return '#2196F3';
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .notification-message {
        flex: 1;
        font-weight: 500;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        transition: background-color 0.2s ease;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for Animation on Scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    const animatedElements = document.querySelectorAll('.card, .timeline-item, .skill-item, .personal-item, .contact-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Typing Animation for Hero Section
function initTypingAnimation() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const text = '7.5 Years of Excellence in Construction Sector';
    let index = 0;
    
    if (heroSubtitle) {
        heroSubtitle.textContent = '';
        
        function typeChar() {
            if (index < text.length) {
                heroSubtitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeChar, 50);
            }
        }
        
        // Start typing animation after a short delay
        setTimeout(typeChar, 1000);
    }
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initTypingAnimation();
    initParallaxEffect();
    
    // Add loading class removal after page load
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

// Performance Optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.removeEventListener('scroll', handleNavbarScroll);
window.removeEventListener('scroll', updateActiveNavLink);

window.addEventListener('scroll', throttle(handleNavbarScroll, 10));
window.addEventListener('scroll', throttle(updateActiveNavLink, 10));

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile nav on Escape
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('.material-icons');
        icon.textContent = 'menu';
    }
});

// Add focus management for accessibility
navLinks.forEach(link => {
    link.addEventListener('focus', () => {
        link.style.outline = '2px solid #1976D2';
        link.style.outlineOffset = '2px';
    });
    
    link.addEventListener('blur', () => {
        link.style.outline = 'none';
    });
});

// Print-friendly styles
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// Add print styles
const printStyles = document.createElement('style');
printStyles.textContent = `
    @media print {
        .navbar, .nav-toggle, .hero-buttons, .contact-form-container {
            display: none !important;
        }
        
        .hero {
            min-height: auto;
            padding: 20px 0;
        }
        
        .section {
            padding: 20px 0;
            break-inside: avoid;
        }
        
        .card {
            box-shadow: none;
            border: 1px solid #ccc;
            break-inside: avoid;
        }
        
        body {
            font-size: 12px;
            line-height: 1.4;
        }
        
        h1, h2, h3 {
            color: #000 !important;
        }
    }
`;
document.head.appendChild(printStyles);

// Error handling for failed resource loading
window.addEventListener('error', (e) => {
    if (e.target.tagName === 'LINK' && e.target.rel === 'stylesheet') {
        console.warn('Failed to load stylesheet:', e.target.href);
        // Fallback for missing Google Fonts
        document.body.style.fontFamily = 'Arial, sans-serif';
    }
});

// Console welcome message
console.log('%c👋 Welcome to Ketan Pandey\'s Resume Website!', 'color: #1976D2; font-size: 16px; font-weight: bold;');
console.log('%cThis website was built with modern web technologies and Material Design principles.', 'color: #666; font-size: 12px;');
console.log('%cFor inquiries, contact: ERKETANPANDEYOFFICIAL@GMAIL.COM', 'color: #666; font-size: 12px;');

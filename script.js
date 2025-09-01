// Serenode Website JavaScript

// Mobile Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = menuToggle.querySelector('.menu-icon');
const closeIcon = menuToggle.querySelector('.close-icon');

menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('show');
    
    if (isOpen) {
        mobileMenu.classList.remove('show');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    } else {
        mobileMenu.classList.add('show');
        menuIcon.style.display = 'none';
        closeIcon.style.display = 'block';
    }
});

// Smooth Scrolling Function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const elementPosition = element.offsetTop - navHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
    
    // Close mobile menu if open
    if (mobileMenu.classList.contains('show')) {
        mobileMenu.classList.remove('show');
        menuIcon.style.display = 'block';
        closeIcon.style.display = 'none';
    }
}

// Contact Form Handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Create mailto link (since we're using pure HTML/CSS/JS)
    const subject = encodeURIComponent(`New inquiry from ${name}`);
    const body = encodeURIComponent(`Hi Serenode team,

${message}

Best regards,
${name}
${email}`);
    
    const mailtoLink = `mailto:contact.serenode@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message (you could enhance this with a proper modal)
    alert('Thank you for your message! Your email client should open now. If not, please email us directly at contact.serenode@gmail.com');
    
    // Reset form
    contactForm.reset();
});

// Intersection Observer for Animation Triggers
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .about-point');
    
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.style.animationFillMode = 'both';
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        navbar.style.backgroundColor = 'hsl(0, 0%, 96.1%, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.backgroundColor = 'hsl(0, 0%, 96.1%, 0.8)';
        navbar.style.backdropFilter = 'blur(12px)';
    }
});

// Smooth reveal animations for sections
const revealElements = document.querySelectorAll('section');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Apply initial styles and observe
revealElements.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(section);
});

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Portfolio item hover effects
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        const image = item.querySelector('.portfolio-image img');
        const overlay = item.querySelector('.portfolio-overlay');
        const icon = item.querySelector('.portfolio-icon');
        
        item.addEventListener('mouseenter', () => {
            if (image) image.style.transform = 'scale(1.1)';
            if (overlay) overlay.style.backgroundColor = 'hsl(188, 100%, 23.7%, 0.2)';
            if (icon) {
                icon.style.opacity = '1';
                icon.style.transform = 'scale(1)';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (image) image.style.transform = 'scale(1)';
            if (overlay) overlay.style.backgroundColor = 'hsl(188, 100%, 23.7%, 0)';
            if (icon) {
                icon.style.opacity = '0';
                icon.style.transform = 'scale(0.8)';
            }
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        const icon = button.querySelector('.btn-icon');
        
        button.addEventListener('mouseenter', () => {
            if (icon) {
                if (button.classList.contains('btn-hero')) {
                    button.style.transform = 'scale(1.05)';
                }
                icon.style.transform = 'translateX(4px)';
            }
        });
        
        button.addEventListener('mouseleave', () => {
            if (icon) {
                if (button.classList.contains('btn-hero')) {
                    button.style.transform = 'scale(1)';
                }
                icon.style.transform = 'translateX(0)';
            }
        });
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
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

// Apply debounced scroll handler
const debouncedScrollHandler = debounce(() => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        navbar.style.backgroundColor = 'hsl(0, 0%, 96.1%, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.backgroundColor = 'hsl(0, 0%, 96.1%, 0.8)';
        navbar.style.backdropFilter = 'blur(12px)';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Initial page load setup
document.body.style.opacity = '0';
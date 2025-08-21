// Scroll progress indicator
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Mobile Navigation Toggle
// function toggleNav() {
//     const navbar = document.getElementById('navbar');
//     const menuToggle = document.querySelector('.menu-toggle');
//     navbar.classList.toggle('active');
    
//     // Change icon
//     const icon = menuToggle.querySelector('i');
//     if (navbar.classList.contains('active')) {
//         icon.classList.remove('fa-bars');
//         icon.classList.add('fa-times');
//     } else {
//         icon.classList.remove('fa-times');
//         icon.classList.add('fa-bars');
//     }
// }

// Typewriter Effect
const typewriterText = document.getElementById('typewriter');
const words = ['Engineer', 'Developer', 'Researcher', 'Innovator'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typewriterText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => isDeleting = true, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    const speed = isDeleting ? 100 : 200;
    setTimeout(typeWriter, speed);
}

// Start typewriter effect
typeWriter();

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Close mobile menu if open
        if (window.innerWidth <= 1024) {
            toggleNav();
        }
    });
});

// Dynamic particles generation
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (3 + Math.random() * 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles
createParticles();

// Add scroll effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const elements = document.querySelectorAll('.floating-element');
    
    elements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Add intersection observer for animations
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

// Observe elements for animation
document.querySelectorAll('.home-content, .home-img').forEach(el => {
    observer.observe(el);
});

// Add cursor trail effect
let mouseX = 0;
let mouseY = 0;
let trails = [];

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.left = mouseX + 'px';
    trail.style.top = mouseY + 'px';
    trail.style.width = '6px';
    trail.style.height = '6px';
    trail.style.background = 'var(--primary-color)';
    trail.style.borderRadius = '50%';
    trail.style.pointerEvents = 'none';
    trail.style.zIndex = '9999';
    trail.style.opacity = '0.6';
    trail.style.transition = 'all 0.5s ease';
    
    document.body.appendChild(trail);
    trails.push(trail);

    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(0)';
    }, 100);

    setTimeout(() => {
        if (trail.parentNode) {
            trail.parentNode.removeChild(trail);
        }
        trails = trails.filter(t => t !== trail);
    }, 600);

    // Limit number of trails
    if (trails.length > 10) {
        const oldTrail = trails.shift();
        if (oldTrail.parentNode) {
            oldTrail.parentNode.removeChild(oldTrail);
        }
    }
});

// Add button click effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add parallax effect to background elements
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    
    // Parallax for background elements
    document.querySelector('body::before')?.style.setProperty('transform', `translateY(${scrollTop * 0.5}px)`);
    
    // Update floating elements
    document.querySelectorAll('.floating-element').forEach((el, index) => {
        const speed = (index + 1) * 0.3;
        el.style.transform = `translateY(${scrollTop * speed}px) rotate(${scrollTop * 0.05}deg)`;
    });
});

// Enhanced social media hover effects
document.querySelectorAll('.social-media a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.15) rotate(5deg)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: throttle scroll events
let ticking = false;

function updateScrollEffects() {
    const scrollTop = window.pageYOffset;
    
    // Update parallax effects
    document.querySelectorAll('.floating-element').forEach((el, index) => {
        const speed = (index + 1) * 0.2;
        el.style.transform = `translateY(${scrollTop * speed}px) rotate(${scrollTop * 0.02}deg)`;
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentActive = document.querySelector('.nav-link.active');
    const currentIndex = Array.from(navLinks).indexOf(currentActive);
    
    if (e.key === 'ArrowDown' && currentIndex < navLinks.length - 1) {
        e.preventDefault();
        navLinks[currentIndex].classList.remove('active');
        navLinks[currentIndex + 1].classList.add('active');
        navLinks[currentIndex + 1].focus();
    } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        e.preventDefault();
        navLinks[currentIndex].classList.remove('active');
        navLinks[currentIndex - 1].classList.add('active');
        navLinks[currentIndex - 1].focus();
    }
});

// Add accessibility improvements
document.querySelectorAll('.nav-link').forEach(link => {
    link.setAttribute('tabindex', '0');
    link.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            link.click();
        }
    });
});

// Add theme transition effect
document.documentElement.style.setProperty('--transition', 'all 0.3s ease');

console.log('✨ Enhanced Portfolio Loaded Successfully!');
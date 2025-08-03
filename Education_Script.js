// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
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

// Mobile menu toggle
function toggleMenu() {
    const nav = document.getElementById('nav');
    const menuToggle = document.querySelector('.menu-toggle');
    
    nav.classList.toggle('active');
    
    const icon = menuToggle.querySelector('i');
    if (nav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// Highlight card function
function highlightCard(dot) {
    // Remove highlight from all cards
    document.querySelectorAll('.Education-Card').forEach(card => {
        card.style.transform = '';
        card.style.boxShadow = '';
    });
    
    // Highlight the clicked card
    const card = dot.nextElementSibling.querySelector('.Education-Card');
    card.style.transform = 'translateY(-15px) scale(1.02)';
    card.style.boxShadow = '0 25px 50px rgba(34, 210, 230, 0.3)';
    
    // Reset after 3 seconds
    setTimeout(() => {
        card.style.transform = '';
        card.style.boxShadow = '';
    }, 3000);
}

// Animate progress bars on scroll
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.progress-bar');
            if (progressBar) {
                // Trigger the animation by re-applying the CSS variable
                const progress = entry.target.getAttribute('data-progress');
                progressBar.style.setProperty('--progress', progress + '%');
            }
        }
    });
}, observerOptions);

// Observe all education cards
document.querySelectorAll('.Education-Card').forEach(card => {
    observer.observe(card);
});

// Responsive handling
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        document.getElementById('nav').classList.remove('active');
        document.querySelector('.menu-toggle i').classList.remove('fa-times');
        document.querySelector('.menu-toggle i').classList.add('fa-bars');
    }
});

// Add scroll effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const timeline = document.querySelector('.Education-Timeline');
    
    if (timeline) {
        const timelineOffset = scrolled * 0.1;
        timeline.style.transform = `translateY(${timelineOffset}px)`;
    }
});
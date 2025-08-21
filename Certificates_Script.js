// Scroll progress indicator
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 12;
    
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

// Responsive handling
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        document.getElementById('nav').classList.remove('active');
        document.querySelector('.menu-toggle i').classList.remove('fa-times');
        document.querySelector('.menu-toggle i').classList.add('fa-bars');
    }
});

// Add scroll effects for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingCerts = document.querySelectorAll('.floating-cert');
    
    floatingCerts.forEach((cert, index) => {
        const speed = (index + 1) * 0.3;
        cert.style.transform = `translateY(${scrolled * speed}px) rotate(${15 + scrolled * 0.02}deg)`;
    });
});

// Add hover effects to progress items
document.querySelectorAll('.progress-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 8px 25px rgba(34, 210, 230, 0.2)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
});

console.log('✨ Enhanced Certificates Page Loaded Successfully!');
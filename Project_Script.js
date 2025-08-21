// Scroll progress indicator
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Mobile menu toggle
// function toggleMenu() {
//     const nav = document.getElementById('nav');
//     const menuToggle = document.querySelector('.menu-toggle');
    
//     nav.classList.toggle('active');
    
//     const icon = menuToggle.querySelector('i');
//     if (nav.classList.contains('active')) {
//         icon.classList.remove('fa-bars');
//         icon.classList.add('fa-times');
//     } else {
//         icon.classList.remove('fa-times');
//         icon.classList.add('fa-bars');
//     }
// }

// Open project details modal
function openProjectDetails(projectId) {
    document.getElementById(projectId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal(projectId) {
    document.getElementById(projectId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Close modal with escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    }
});

// Responsive handling
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        document.getElementById('nav').classList.remove('active');
        document.querySelector('.menu-toggle i').classList.remove('fa-times');
        document.querySelector('.menu-toggle i').classList.add('fa-bars');
    }
});

console.log('✨ Enhanced Projects Page Loaded Successfully!');
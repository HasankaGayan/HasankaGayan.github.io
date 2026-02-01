// Scroll progress indicator
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Contact card functions (use PERSONAL_DATA from personal-data.js)
function openEmail() {
    const email = typeof PERSONAL_DATA !== 'undefined' ? PERSONAL_DATA.social?.email || 'mailto:' + PERSONAL_DATA.email : 'mailto:hasankagayansomaweera@gmail.com';
    window.open(email, '_blank');
}

function openLinkedIn() {
    const url = typeof PERSONAL_DATA !== 'undefined' ? PERSONAL_DATA.social?.linkedin : 'https://www.linkedin.com/in/hasanka-gayan-somaweera/';
    window.open(url, '_blank');
}

function openGitHub() {
    const url = typeof PERSONAL_DATA !== 'undefined' ? PERSONAL_DATA.social?.github : 'https://github.com/HasankaGayan';
    window.open(url, '_blank');
}

function copyPhone() {
    navigator.clipboard.writeText('+94713299821').then(() => {
        alert('Phone number copied to clipboard!');
    });
}

// Form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    const subject = `Message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    
    const email = typeof PERSONAL_DATA !== 'undefined' ? PERSONAL_DATA.email : 'hasankagayansomaweera@gmail.com';
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
});

// Mobile menu is handled by navigation.js
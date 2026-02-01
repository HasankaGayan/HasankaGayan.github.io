/**
 * ============================================
 * SHARED NAVIGATION - Single Source
 * ============================================
 * Edit navigation links HERE. This nav is
 * injected into all pages automatically.
 * ============================================
 */

const NAV_CONFIG = {
    links: [
        { href: 'index.html', icon: 'fas fa-home', label: 'Home' },
        { href: 'About_Me.html', icon: 'fas fa-user', label: 'About' },
        { href: 'Experience.html', icon: 'fas fa-layer-group', label: 'Experiences' },
        { href: 'Education.html', icon: 'fa-solid fa-graduation-cap', label: 'Education' },
        { href: 'Project.html', icon: 'fas fa-project-diagram', label: 'Projects' },
        { href: 'Certificates.html', icon: 'fa-solid fa-award', label: 'Certificates & Achievements' },
        { href: 'Contact_Me.html', icon: 'fas fa-envelope', label: 'Contact Me' }
    ]
};

(function() {
    function getActivePage() {
        const path = window.location.pathname || window.location.href;
        const file = path.split('/').pop() || 'index.html';
        return file.replace('.html', '') || 'index';
    }

    function renderNav() {
        const activePage = getActivePage();
        const linksHtml = NAV_CONFIG.links.map(link => {
            const linkFile = link.href.replace('.html', '');
            const isActive = (activePage === 'index' && linkFile === 'index') ||
                (activePage !== 'index' && linkFile === activePage);
            const activeClass = isActive ? ' class="active"' : '';
            return `<li><a href="${link.href}"${activeClass}><i class="${link.icon}"></i> <span>${link.label}</span></a></li>`;
        }).join('\n            ');

        return `
    <button class="menu-toggle" id="menuToggle" onclick="typeof toggleNav === 'function' ? toggleNav() : (typeof toggleMenu === 'function' ? toggleMenu() : null)">
        <i class="fas fa-bars"></i>
    </button>

    <div class="nav-overlay" id="navOverlay"></div>

    <nav id="navbar">
        <div class="nav-header">
            <div class="nav-logo" data-personal="nav-name">Hasanka Gayan</div>
            <div class="nav-subtitle" data-personal="nav-title">Assistant Lecturer</div>
        </div>
        <ul>
            ${linksHtml}
        </ul>
        <div class="nav-footer">
            <div class="nav-logo-footer" data-personal="footer-text">Designed by,</div>
            <div class="nav-subtitle-footer" data-personal="footer-credit">Hasanka Gayan | 2025</div>
        </div>
    </nav>`;
    }

    function injectNav() {
        const container = document.getElementById('nav-container');
        if (!container) return;
        container.innerHTML = renderNav();

        // Setup nav overlay and menu toggle (for index-style pages)
        const navOverlay = document.getElementById('navOverlay');
        const menuToggle = document.getElementById('menuToggle');
        const navbar = document.getElementById('navbar');

        if (navOverlay && menuToggle && navbar) {
            const toggleNav = function() {
                navbar.classList.toggle('active');
                navOverlay.classList.toggle('active');
                const icon = menuToggle.querySelector('i');
                if (navbar.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            };
            window.toggleNav = toggleNav;
            window.toggleMenu = toggleNav; // Alias for pages using toggleMenu()

            menuToggle.onclick = toggleNav;
            navOverlay.onclick = toggleNav;

            // Close menu when clicking nav links (mobile)
            setTimeout(() => {
                document.querySelectorAll('nav ul li a').forEach(link => {
                    link.addEventListener('click', () => {
                        if (window.innerWidth <= 1024) toggleNav();
                    });
                });
            }, 0);

            // Close menu on resize to desktop, Escape key
            window.addEventListener('resize', () => {
                if (window.innerWidth > 1024 && navbar.classList.contains('active')) toggleNav();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navbar.classList.contains('active')) toggleNav();
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectNav);
    } else {
        injectNav();
    }
})();

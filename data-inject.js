(function() {
    if (typeof PERSONAL_DATA === 'undefined') return;

    const data = PERSONAL_DATA;

    function injectData() {
        // Map of data-personal attribute values to data paths
        const injectors = [
            // Navigation
            { attr: 'nav-name', get: () => data.shortName },
            { attr: 'nav-title', get: () => data.title },
            { attr: 'footer-text', get: () => data.footerText },
            { attr: 'footer-credit', get: () => data.footerCredit },

            // Home page
            { attr: 'full-name', get: () => data.fullName },
            { attr: 'short-name', get: () => data.shortName },
            { attr: 'title', get: () => data.title },
            { attr: 'bio-short', get: () => data.bioShort },
            { attr: 'profile-image', get: () => data.profileImage },

            // About page
            { attr: 'tagline', get: () => data.tagline },
            { attr: 'profile-name', get: () => data.shortName },
            { attr: 'profile-role', get: () => data.title },

            // Contact
            { attr: 'email', get: () => data.email },
            { attr: 'mailto', get: () => data.social.email },

            // Page titles (document title)
            { attr: 'page-title', get: () => `${data.fullName} | Portfolio` }
        ];

        injectors.forEach(({ attr, get }) => {
            const elements = document.querySelectorAll(`[data-personal="${attr}"]`);
            const value = get();
            if (value !== undefined && value !== null) {
                elements.forEach(el => {
                    if (el.tagName === 'IMG') {
                        el.src = value;
                        if (attr === 'profile-image') el.alt = data.profileImageAlt || data.shortName;
                    } else if (el.tagName === 'A' && attr === 'mailto') {
                        el.href = value;
                    } else if (el.tagName !== 'A' || attr !== 'mailto') {
                        el.textContent = value;
                    }
                });
            }
        });

        // Bio paragraphs (special case)
        const bioContainer = document.querySelector('[data-personal="bio-paragraphs"]');
        if (bioContainer && data.bioParagraphs && data.bioParagraphs.length) {
            bioContainer.innerHTML = data.bioParagraphs.map(p => `<p>${p}</p>`).join('');
        }

        // Social links
        const socialSelectors = {
            'social-linkedin': data.social?.linkedin,
            'social-github': data.social?.github,
            'social-facebook': data.social?.facebook,
            'social-twitter': data.social?.twitter,
            'social-email': data.social?.email
        };
        Object.entries(socialSelectors).forEach(([attr, url]) => {
            if (url) {
                document.querySelectorAll(`[data-personal="${attr}"]`).forEach(el => {
                    if (el.tagName === 'A') el.href = url;
                });
            }
        });

        // Stats
        const statSelectors = {
            'stat-years': data.stats?.yearsOfStudy,
            'stat-projects': data.stats?.projectsCompleted,
            'stat-certifications': data.stats?.certifications,
            'stat-technologies': data.stats?.technologies
        };
        Object.entries(statSelectors).forEach(([attr, value]) => {
            if (value !== undefined) {
                document.querySelectorAll(`[data-personal="${attr}"]`).forEach(el => {
                    el.textContent = value;
                    if (el.dataset.count !== undefined) el.dataset.count = value;
                });
            }
        });

        // Update page title (use data-page-title on body, e.g. data-page-title="About")
        const pageSuffix = document.body.dataset.pageTitle;
        if (pageSuffix) {
            document.querySelector('title').textContent = `${data.fullName} | ${pageSuffix}`;
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectData);
    } else {
        injectData();
    }
})();

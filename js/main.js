document.addEventListener('DOMContentLoaded', function() {
    // --- GESTIONE MENU MOBILE ---
    const menuBtn = document.querySelector('.menu-btn');
    const mobileNav = document.querySelector('.mobile-nav-links');
    const allNavLinks = document.querySelectorAll('.mobile-nav-links .nav-link');

    function closeMobileMenu() {
        menuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
    }

    menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    // Chiude il menu quando si clicca un link
    allNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // --- SMOOTH SCROLL PER LINK INTERNI (ES. #home) ---
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- FADE-IN DELLE SEZIONI ALLO SCORRIMENTO ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // --- GESTIONE INDICATORE DI SCORRIMENTO ---
    const scrollIndicator = document.querySelector('.scroll-down-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                scrollIndicator.classList.add('hidden');
            } else {
                scrollIndicator.classList.remove('hidden');
            }
        });
    }

    // --- SLIDER SCREENSHOT APP ---
    const phoneScreen = document.querySelector('.phone-screen');
    if (phoneScreen) {
        const screenshots = phoneScreen.querySelectorAll('img');
        let currentScreenshot = 0;

        setInterval(() => {
            screenshots[currentScreenshot].classList.remove('active');
            currentScreenshot = (currentScreenshot + 1) % screenshots.length;
            screenshots[currentScreenshot].classList.add('active');
        }, 3000); // Cambia immagine ogni 3 secondi
    }
});

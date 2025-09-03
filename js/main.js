document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const mobileNav = document.querySelector('.mobile-nav-links');
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    // Toggle del menu mobile
    menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    // Funzione per lo scorrimento dolce (smooth scroll) per i link interni
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            // Per il link #home, scorre in cima alla pagina
            if (targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                // Chiude il menu mobile se è aperto
                if (mobileNav.classList.contains('active')) {
                    menuBtn.classList.remove('active');
                    mobileNav.classList.remove('active');
                }
                return;
            }

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Chiude il menu mobile se è aperto
                if (mobileNav.classList.contains('active')) {
                    menuBtn.classList.remove('active');
                    mobileNav.classList.remove('active');
                }

                // Scorrimento dolce
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Intersection Observer per l'effetto fade-in
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
});

document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const mobileNav = document.querySelector('.mobile-nav-links');
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    const scrollIndicator = document.querySelector('.scroll-down-indicator');
    const faqItems = document.querySelectorAll('.faq-item');

    // Ricarica la pagina all'inizio
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

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

    // Logica per nascondere l'indicatore di scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    });

    // Intersection Observer per l'effetto fade-in delle sezioni
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

    // Logica per l'accordion delle FAQ
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-item-header');
        header.addEventListener('click', () => {
            const body = item.querySelector('.faq-item-body');

            // Chiudi tutte le altre risposte
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-item-body').style.maxHeight = null;
                }
            });

            // Apri o chiudi la risposta corrente
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                body.style.maxHeight = body.scrollHeight + "px";
            } else {
                body.style.maxHeight = null;
            }
        });
    });
});

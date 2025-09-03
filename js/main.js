document.addEventListener('DOMContentLoaded', function() {
    // Riporta la pagina in cima al refresh
    window.scrollTo(0, 0);

    const menuBtn = document.querySelector('.menu-btn');
    const mobileNav = document.querySelector('.mobile-nav-links');
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    const scrollIndicator = document.querySelector('.scroll-down-indicator');

    // Toggle del menu mobile
    menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    // Gestione della scomparsa dell'indicatore di scorrimento
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) { // Nasconde l'indicatore dopo 100px di scroll
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
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
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }

            // Chiude il menu mobile se è aperto
            if (mobileNav.classList.contains('active')) {
                menuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
            }
        });
    });

    // Logica per le FAQ espandibili
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Chiudi tutte le altre domande aperte
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Apri o chiudi la domanda cliccata
            if (!isActive) {
                item.classList.add('active');
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

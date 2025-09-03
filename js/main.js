document.addEventListener('DOMContentLoaded', function() {
    // Riporta la pagina all'inizio al refresh
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    const menuBtn = document.querySelector('.menu-btn');
    const mobileNav = document.querySelector('.mobile-nav-links');
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    const scrollIndicator = document.querySelector('.scroll-down-indicator');
    const faqItems = document.querySelectorAll('.faq-item');

    // Toggle del menu mobile
    menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    // Funzione per lo scorrimento dolce (smooth scroll)
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Chiude il menu mobile se è aperto
                if (mobileNav.classList.contains('active')) {
                    menuBtn.classList.remove('active');
                    mobileNav.classList.remove('active');
                }
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Nasconde l'indicatore di scroll quando l'utente scorre
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    });

    // Logica per le FAQ a tendina
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');

            // Chiudi tutte le altre risposte
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Apri o chiudi la risposta corrente
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
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
});

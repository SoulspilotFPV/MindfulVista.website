document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const mobileNav = document.querySelector('.mobile-nav-links');
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    const scrollIndicator = document.querySelector('.scroll-down-indicator');
    const faqItems = document.querySelectorAll('.faq-item');

    // Riporta la pagina all'inizio al refresh
    // Questo è il modo più affidabile per farlo su tutti i browser
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.addEventListener('beforeunload', () => {
        window.scrollTo(0, 0);
    });
    // Fornisce un fallback per browser meno recenti o in casi specifici
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

            if (targetId === '#home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Calcola la posizione di scorrimento tenendo conto dell'altezza della navbar fissa
                    const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80; // 80px è l'altezza approssimativa della navbar
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            }

            // Chiude il menu mobile se è aperto dopo il click
            if (mobileNav.classList.contains('active')) {
                menuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
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

    // Logica per nascondere l'indicatore di scorrimento
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    });

    // Logica per l'accordion delle FAQ
    faqItems.forEach(item => {
        const header = item.querySelector('h4');
        header.addEventListener('click', () => {
            // Chiudi tutti gli altri item aperti
            faqItems.forEach(openItem => {
                if(openItem !== item && openItem.classList.contains('active')) {
                    openItem.classList.remove('active');
                }
            });
            // Apri/chiudi l'item cliccato
            item.classList.toggle('active');
        });
    });
});

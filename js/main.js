document.addEventListener('DOMContentLoaded', function() {
    // =================================================================================
    // MODIFICA CHIAVE: Scroll-to-top al refresh della pagina
    // Questa parte assicura che la pagina torni sempre in cima quando viene ricaricata.
    // 'history.scrollRestoration' disabilita il comportamento di default del browser
    // che cerca di ripristinare la posizione di scorrimento precedente.
    // =================================================================================
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
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
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }

            // Chiude il menu mobile se è aperto dopo il click
            if (mobileNav.classList.contains('active')) {
                menuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
            }
        });
    });

    // =================================================================================
    // MODIFICA CHIAVE: Intersection Observer per animazioni allo scroll
    // Questo observer controlla quali sezioni della pagina sono visibili.
    // Quando una sezione con la classe ".section" entra nello schermo,
    // le viene aggiunta la classe ".visible", che attiva le animazioni CSS.
    // Questo codice gestisce l'animazione di tutte le sezioni, inclusa quella
    // nuova degli studi scientifici e quella degli screenshot.
    // =================================================================================
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
            faqItems.forEach(openItem => {
                if(openItem !== item && openItem.classList.contains('active')) {
                    openItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });
});

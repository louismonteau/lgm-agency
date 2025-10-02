// Gestion du formulaire de contact
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Tracking Google Analytics
        gtag('event', 'contact_form_submit', {
            'event_category': 'lead',
            'event_label': 'Formulaire contact soumis'
        });
        
        // Redirection immédiate vers la page de remerciement
        window.location.href = 'thank-you.html';
    });
}
            
            // Tracking Google Analytics
            gtag('event', 'form_submit', {
                'event_category': 'contact',
                'event_label': 'Formulaire de contact soumis'
            });
            
            // Les données seront transmises via les paramètres GET
            // Redirection gérée par l'attribut action du formulaire
        });
        
        // Reset des bordures lors de la saisie
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = '#2a9d8f';
                }
            });
        });

        // Menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
        });
        
        // Fermer le menu en cliquant sur un lien
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
            });
        });
    }
    
    // Animation au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.benefit-card, .expertise-card, .process-step');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const btnText = submitButton.querySelector('.btn-text');
            const btnLoading = submitButton.querySelector('.btn-loading');
            const messageDiv = document.getElementById('form-message');
            
            // Afficher le loading
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            submitButton.disabled = true;
            
            // Préparer les données
            const formData = {
                name: contactForm.name.value,
                email: contactForm.email.value,
                company: contactForm.company.value,
                message: contactForm.message.value,
                source: 'LGM Agency Website',
                timestamp: new Date().toISOString()
            };
            
            try {
                // Ici vous intégrerez votre Google Apps Script
                // const SCRIPT_URL = 'https://script.google.com/macros/s/VOTRE_ID/exec';
                // const response = await fetch(SCRIPT_URL, {
                //     method: 'POST',
                //     body: JSON.stringify(formData)
                // });
                
                // Simuler un envoi réussi pour le moment
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Tracking Google Analytics
                gtag('event', 'contact_form_submit', {
                    'event_category': 'lead',
                    'event_label': 'Formulaire contact soumis'
                });
                
                // Redirection vers la page de remerciement
                window.location.href = 'thank-you.html';
                
            } catch (error) {
                console.error('Erreur:', error);
                
                // Afficher message d'erreur
                messageDiv.textContent = 'Une erreur est survenue. Veuillez réessayer.';
                messageDiv.style.display = 'block';
                messageDiv.style.background = '#f8d7da';
                messageDiv.style.color = '#721c24';
                messageDiv.style.border = '1px solid #f5c6cb';
                
                // Réactiver le bouton
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitButton.disabled = false;
            }
        });
    }
    
    // Header scroll effect
    let lastScrollY = window.scrollY;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll',
    }
});

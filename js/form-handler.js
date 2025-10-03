// =============================================
// LGM AGENCY - MAIN JAVASCRIPT FILE
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // 1. INITIALISATION DU DATALAYER
    // =============================================
    
    // S'assurer que le DataLayer existe
    window.dataLayer = window.dataLayer || [];
    
    // =============================================
    // 2. FONCTIONS DE TRACKING DATALAYER
    // =============================================
    
    /**
     * Fonction principale pour tracker les clics CTA
     * @param {string} ctaName - Nom du CTA
     * @param {string} ctaType - Type de bouton (primary, secondary, card_click, form_submit)
     * @param {string} ctaLocation - Emplacement sur la page
     * @param {object} additionalData - Données supplémentaires optionnelles
     */
    function trackCTA(ctaName, ctaType, ctaLocation, additionalData = {}) {
        const eventData = {
            'event': 'cta_click',
            'cta_name': ctaName,
            'cta_type': ctaType,
            'cta_location': ctaLocation,
            'page_path': window.location.pathname,
            'timestamp': new Date().toISOString(),
            ...additionalData
        };
        
        // Envoi au DataLayer
        window.dataLayer.push(eventData);
        
        // Tracking GA4
        if (typeof gtag !== 'undefined') {
            gtag('event', 'cta_click', {
                'cta_name': ctaName,
                'cta_type': ctaType,
                'cta_location': ctaLocation,
                ...additionalData
            });
        }
        
        // Debug (à désactiver en production si besoin)
        console.log('🔔 CTA Tracked:', eventData);
    }
    
    /**
     * Fonction pour tracker la navigation
     * @param {string} linkText - Texte du lien
     * @param {string} linkUrl - URL du lien
     * @param {string} linkLocation - Emplacement du lien
     */
    function trackNavigation(linkText, linkUrl, linkLocation) {
        window.dataLayer.push({
            'event': 'navigation_click',
            'link_text': linkText,
            'link_url': linkUrl,
            'link_location': linkLocation,
            'page_path': window.location.pathname
        });
        
        console.log('🧭 Navigation Tracked:', { linkText, linkUrl, linkLocation });
    }
    
    // =============================================
    // 3. GESTION DU MENU MOBILE
    // =============================================
    
    function initMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileNav = document.getElementById('mobileNav');
        
        if (mobileMenuBtn && mobileNav) {
            // Ouvrir/fermer le menu
            mobileMenuBtn.addEventListener('click', function() {
                mobileNav.classList.toggle('active');
                this.setAttribute('aria-expanded', mobileNav.classList.contains('active'));
            });
            
            // Fermer le menu en cliquant sur un lien
            const mobileLinks = mobileNav.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileNav.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                });
            });
            
            // Fermer le menu en cliquant à l'extérieur
            document.addEventListener('click', function(e) {
                if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    mobileNav.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }
    
    // =============================================
    // 4. ANIMATIONS AU SCROLL
    // =============================================
    
    function initScrollAnimations() {
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
        
        // Éléments à animer
        const animatedElements = document.querySelectorAll(
            '.benefit-card, .expertise-card, .process-step, .action-card'
        );
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }
    
    // =============================================
    // 5. TRACKING DES INTERACTIONS
    // =============================================
    
    function initCTATracking() {
        // ========== BOUTONS PRINCIPAUX ==========
        
        // Hero Section
        const heroButtons = document.querySelectorAll('.hero-actions .btn');
        heroButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                trackCTA(
                    this.textContent.trim().replace(/\s+/g, ' '),
                    this.classList.contains('btn-primary') ? 'primary' : 'secondary',
                    'hero_section'
                );
            });
        });
        
        // Contact Section
        const contactButtons = document.querySelectorAll('#contact .btn');
        contactButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                trackCTA(
                    this.textContent.trim().replace(/\s+/g, ' '),
                    this.classList.contains('btn-primary') ? 'primary' : 'secondary',
                    'contact_section'
                );
            });
        });
        
        // Thank You Page
        const thankYouButtons = document.querySelectorAll('.thank-you-actions .btn');
        thankYouButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                trackCTA(
                    this.textContent.trim().replace(/\s+/g, ' '),
                    this.classList.contains('btn-primary') ? 'primary' : 'secondary',
                    'thank_you_page'
                );
            });
        });
        
        // ========== FORMULAIRES ==========
        
        // Formulaire de contact
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validation basique
                const requiredFields = this.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.style.borderColor = '#e74c3c';
                    } else {
                        field.style.borderColor = '';
                    }
                });
                
                if (!isValid) {
                    alert('Veuillez remplir tous les champs obligatoires.');
                    return;
                }
                
                // Tracking
                trackCTA(
                    'Obtenir mon audit gratuit',
                    'form_submit',
                    'contact_section',
                    { 
                        form_type: 'contact_lead',
                        form_id: 'contact-form'
                    }
                );
                
                // Redirection après un court délai
                setTimeout(() => {
                    window.location.href = 'thank-you.html';
                }, 500);
            });
            
            // Réinitialiser les bordures lors de la saisie
            const formInputs = contactForm.querySelectorAll('input, textarea');
            formInputs.forEach(input => {
                input.addEventListener('input', function() {
                    if (this.value.trim()) {
                        this.style.borderColor = '';
                    }
                });
            });
        }
        
        // ========== NAVIGATION ==========
        
        // Navigation principale
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                trackNavigation(
                    this.textContent.trim(),
                    this.getAttribute('href'),
                    this.closest('header') ? 'header_nav' : 'mobile_nav'
                );
            });
        });
        
        // Liens du footer
        const footerLinks = document.querySelectorAll('.footer-links a');
        footerLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                trackNavigation(
                    this.textContent.trim(),
                    this.getAttribute('href'),
                    'footer_links'
                );
            });
        });
        
        // ========== CARTES INTERACTIVES ==========
        
        // Cartes de bénéfices
        const benefitCards = document.querySelectorAll('.benefit-card');
        benefitCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Ne pas tracker si on clique sur un lien
                if (e.target.tagName === 'A' || e.target.closest('a')) return;
                
                const title = this.querySelector('h3')?.textContent?.trim() || 'Benefit Card';
                trackCTA(title, 'card_click', 'benefits_section');
            });
        });
        
        // Cartes d'expertise
        const expertiseCards = document.querySelectorAll('.expertise-card');
        expertiseCards.forEach(card => {
            card.addEventListener('click', function(e) {
                if (e.target.tagName === 'A' || e.target.closest('a')) return;
                
                const title = this.querySelector('h3')?.textContent?.trim() || 'Expertise Card';
                trackCTA(title, 'card_click', 'expertise_section');
            });
        });
        
        // Cartes d'action (thank you page)
        const actionCards = document.querySelectorAll('.action-card');
        actionCards.forEach(card => {
            card.addEventListener('click', function(e) {
                if (e.target.tagName === 'A' || e.target.closest('a')) return;
                
                const title = this.querySelector('h4')?.textContent?.trim() || 'Action Card';
                trackCTA(title, 'card_click', 'action_section');
            });
        });
        
        // ========== ÉTAPES DU PROCESSUS ==========
        
        const processSteps = document.querySelectorAll('.process-step');
        processSteps.forEach(step => {
            step.addEventListener('click', function(e) {
                if (e.target.tagName === 'A' || e.target.closest('a')) return;
                
                const title = this.querySelector('h4')?.textContent?.trim() || 'Process Step';
                trackCTA(title, 'card_click', 'process_section');
            });
        });
    }
    
    // =============================================
    // 6. EFFET SCROLL SUR LE HEADER
    // =============================================
    
    function initHeaderScroll() {
        const header = document.querySelector('header');
        if (!header) return;
        
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', function() {
            // Effet de flou et transparence
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'var(--background-white)';
                header.style.backdropFilter = 'blur(0px)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
            }
            
            // Cacher/montrer le header au scroll
            if (window.scrollY > lastScrollY && window.scrollY > 200) {
                // Scroll vers le bas - cacher
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scroll vers le haut - montrer
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = window.scrollY;
        });
        
        // Transition fluide
        header.style.transition = 'all 0.3s ease';
    }
    
    // =============================================
    // 7. ANIMATIONS SPÉCIALES POUR THANK YOU PAGE
    // =============================================
    
    function initThankYouAnimations() {
        // Vérifier si on est sur la page de remerciement
        if (!document.querySelector('.thank-you-hero')) return;
        
        // Animation séquentielle des éléments
        const animatedElements = document.querySelectorAll(
            '.success-animation, .thank-you-title, .thank-you-subtitle, .next-steps-card, .immediate-actions, .thank-you-actions, .contact-reminder'
        );
        
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 * index);
        });
        
        // Tracking de conversion page de remerciement
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'send_to': 'G-6LZ6V7345T/conversion',
                'event_callback': function() {
                    console.log('✅ Conversion enregistrée avec succès');
                }
            });
        }
    }
    
    // =============================================
    // 8. FONCTION D'INITIALISATION PRINCIPALE
    // =============================================
    
    function init() {
        console.log('🚀 Initialisation LGM Agency...');
        
        // Initialiser toutes les fonctionnalités
        initMobileMenu();
        initScrollAnimations();
        initCTATracking();
        initHeaderScroll();
        initThankYouAnimations();
        
        // Message de confirmation
        console.log('✅ LGM Agency initialisé avec succès!');
        console.log('📊 DataLayer disponible:', window.dataLayer !== undefined);
        console.log('🎯 Tracking CTA activé');
    }
    
    // =============================================
    // 9. LANCEMENT DE L'APPLICATION
    // =============================================
    
    // Démarrer l'application
    init();
    
    // =============================================
    // 10. FONCTIONS GLOBALES (accessibles partout)
    // =============================================
    
    // Rendre trackCTA disponible globalement si besoin
    window.trackCTA = trackCTA;
    window.trackNavigation = trackNavigation;
});

// =============================================
// FONCTIONS UTILITAIRES GLOBALES
// =============================================

/**
 * Fonction utilitaire pour formater une date
 * @param {Date} date - Date à formater
 * @returns {string} Date formatée
 */
function formatDate(date) {
    return new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

/**
 * Fonction pour copier du texte dans le clipboard
 * @param {string} text - Texte à copier
 */
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        console.log('Texte copié: ', text);
    }).catch(function(err) {
        console.error('Erreur copie: ', err);
    });
}

// =============================================
// GESTION DES ERREURS GLOBALES
// =============================================

window.addEventListener('error', function(e) {
    console.error('❌ Erreur JavaScript:', e.error);
    
    // Envoyer l'erreur au DataLayer si besoin
    if (window.dataLayer) {
        window.dataLayer.push({
            'event': 'javascript_error',
            'error_message': e.message,
            'error_file': e.filename,
            'error_line': e.lineno
        });
    }
});

// Export pour les modules (si besoin)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { trackCTA, trackNavigation, formatDate, copyToClipboard };
}

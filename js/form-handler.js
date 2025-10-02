// Gestion du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Validation basique
            const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                } else {
                    input.style.borderColor = '#2a9d8f';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
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
    }
});

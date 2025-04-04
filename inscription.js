document.addEventListener("DOMContentLoaded", function() {
    // Gestion de l'envoi du formulaire
    const form = document.getElementById('form-inscription');
    const confirmationMessage = document.getElementById('confirmation-message');
    const submitButton = document.getElementById('submit-btn');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const eventName = document.getElementById('event-name').value;

        // Vérification si tous les champs sont remplis
        if (firstName && lastName && eventName) {
            // Afficher le message de confirmation avec animation
            confirmationMessage.style.display = 'block';
            confirmationMessage.classList.add('show');

            // Animation pour le bouton
            submitButton.classList.add('submitted');

            // Réinitialiser le formulaire après 3 secondes
            setTimeout(function() {
                form.reset();
                confirmationMessage.style.display = 'none';
                submitButton.classList.remove('submitted');
            }, 3000);
        } else {
            alert("Veuillez remplir tous les champs.");
        }
    });
});

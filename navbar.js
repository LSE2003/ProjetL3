// Fonction pour charger la barre de navigation
function loadNavbar() {
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            const navbarContainer = document.getElementById("navbarContainer");
            if (navbarContainer) {
                navbarContainer.innerHTML = data;

                const menuButton = navbarContainer.querySelector('.menu-btn');
                const navBar = navbarContainer.querySelector('.nav-bar');

                // Créer un overlay seulement une fois et l'ajouter au body
                let overlay = document.createElement("div");
                overlay.classList.add("overlay");
                document.body.appendChild(overlay);

                // Gérer l'ouverture/fermeture du menu et l'affichage du fond
                if (menuButton && navBar) {
                    menuButton.addEventListener('click', function () {
                        navBar.classList.toggle('active');
                        overlay.classList.toggle('active');
                        menuButton.classList.toggle('open');
                    });
                    // Ajout du clic sur l’overlay pour fermer le menu
                    overlay.addEventListener('click', function () {
                        navBar.classList.remove('active');
                        overlay.classList.remove('active');
                        menuButton.classList.remove('open');
                    });

                }

                // Mettre en surbrillance le lien actif dans la barre de navigation
                highlightActiveLink();
            }
        })
        .catch(error => console.error("Erreur lors du chargement de la barre de navigation :", error));
}

// Fonction pour gérer l'activation du lien en fonction de la page
function highlightActiveLink() {
    const currentPage = window.location.pathname.split('/').pop(); // Récupérer le nom de la page actuelle
    const navLinks = document.querySelectorAll('.nav-bar a');

    navLinks.forEach(link => {
        if (link.href.includes(currentPage)) {
            link.classList.add('active');  // Ajouter la classe 'active' au lien actuel
        } else {
            link.classList.remove('active'); // Retirer la classe 'active' des autres
        }
    });
}

// Appeler la fonction pour charger la barre de navigation lorsque le DOM est chargé
document.addEventListener("DOMContentLoaded", function () {
    loadNavbar();
});


document.addEventListener("DOMContentLoaded", function () {
    // Chargement de la barre de navigation
    fetch("navbar.html")
        .then(response => {
            // Vérifie si la réponse est OK
            if (!response.ok) {
                throw new Error("Échec du chargement du fichier navbar.html");
            }
            return response.text();
        })
        .then(data => {
            const navbarContainer = document.getElementById("navbar-container");

            // Vérifie si l'élément 'navbar-container' existe
            if (navbarContainer) {
                navbarContainer.innerHTML = data;
            } else {
                console.error("L'élément 'navbar-container' n'a pas été trouvé dans le DOM.");
            }
        })
        .catch(error => {
            // Affiche les erreurs dans la console
            console.error("Erreur lors du chargement de la barre de navigation :", error);
        });

    // Chargement des annonces
    fetch("annonces.json") // Charge le fichier JSON
        .then(response => response.json())
        .then(data => afficherAnnonces(data))
        .catch(error => console.error("Erreur de chargement des annonces :", error));
});

function afficherAnnonces(annonces) {
    const sectionAnnonces = document.getElementById("annonces");

    annonces.forEach(annonce => {
        const annonceDiv = document.createElement("div");
        annonceDiv.classList.add("annonce");

        // Création du contenu HTML de l'annonce
        annonceDiv.innerHTML = `
            <h3>${annonce.titre}</h3>
            <p><strong>Date de sortie :</strong> ${annonce.date}</p>
            <p>${annonce.description}</p>
        `;

        // Affichage des images si elles existent
        if (annonce.images && Array.isArray(annonce.images)) {
            annonce.images.forEach(image => {
                const img = document.createElement("img");
                img.src = image;
                img.alt = annonce.titre;
                img.width = 200; // Taille de l'image
                img.style.marginRight = "20px";
                annonceDiv.appendChild(img);
            });
        }

        sectionAnnonces.appendChild(annonceDiv);
    });
}

// Fonction pour afficher/masquer la barre de navigation
function toggleNav() {
    const navBar = document.getElementById('navbar-container');
    navBar.classList.toggle('active');
}

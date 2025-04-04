document.addEventListener("DOMContentLoaded", () => {
    fetch('PokemonImages.json')  // Chargement du fichier contenant les images des Pokémon
        .then(response => response.json())
        .then(pokemonDB => {
            const mysteryCard = document.getElementById("pokemon-img");
            const choicesContainer = document.getElementById("choices");
            const resultText = document.getElementById("result-message");

            // Fonction pour mélanger un tableau (Fisher-Yates shuffle)
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }

            function startNewGame() {
                shuffleArray(pokemonDB);
                const selectedCard = pokemonDB[0]; // Prendre un Pokémon au hasard

                // Appliquer l'image mystère avec un filtre noir
                mysteryCard.src = selectedCard.image_url;
                mysteryCard.style.filter = "brightness(0)";  // Image noire au début

                // Vider les anciens choix
                choicesContainer.innerHTML = "";

                // Sélectionner 2 autres Pokémon aléatoires (différents du bon)
                const options = [selectedCard];
                while (options.length < 3) {
                    const randomCard = pokemonDB[Math.floor(Math.random() * pokemonDB.length)];
                    if (!options.some(option => option.name === randomCard.name)) {
                        options.push(randomCard);
                    }
                }

                // Mélanger les 3 options (1 correcte + 2 incorrectes)
                shuffleArray(options);

                // Créer les boutons de réponse
                options.forEach(option => {
                    const button = document.createElement("button");
                    button.textContent = option.name;
                    button.classList.add("choice-btn");

                    button.addEventListener("click", () => {
                        if (option.name === selectedCard.name) {
                            resultText.textContent = "Bravo ! Vous avez trouvé le bon Pokémon !";
                            mysteryCard.style.filter = "none"; // Révéler l'image si réponse correcte
                        } else {
                            resultText.textContent = "Dommage, essayez encore !";
                        }
                    });

                    choicesContainer.appendChild(button);
                });

                // Masquer les boutons au début
                document.querySelectorAll(".choice-btn").forEach(button => {
                    button.style.display = 'none';
                });

                // Afficher les boutons après 1 seconde
                setTimeout(() => {
                    document.querySelectorAll(".choice-btn").forEach(button => {
                        button.style.display = 'inline-block';
                    });
                }, 1000);
            }

            // Fonction pour créer un feu d'artifice
            function triggerFireworks() {
                fireworksContainer.style.display = 'block'; // Afficher le conteneur du feu d'artifice

                // Créer plusieurs "bouches" de feu d'artifice
                for (let i = 0; i < 10; i++) {
                    const firework = document.createElement("div");
                    firework.classList.add("firework");
                    firework.style.top = `${Math.random() * window.innerHeight}px`; // Position aléatoire en hauteur
                    firework.style.left = `${Math.random() * window.innerWidth}px`; // Position aléatoire en largeur
                    fireworksContainer.appendChild(firework);

                    // Supprimer l'élément après l'animation
                    setTimeout(() => {
                        firework.remove();
                    }, 1000);
                }

                // Cacher le conteneur après un moment
                setTimeout(() => {
                    fireworksContainer.style.display = 'none';
                }, 2000);
            }

            // Lancer le jeu dès le chargement
            startNewGame();

            // Bouton "Nouvelle partie"
            document.getElementById("new-game").addEventListener("click", () => {
                resultText.textContent = "";
                mysteryCard.style.filter = "brightness(0)"; // Re-masquer l'image
                startNewGame();
            });
        })
        .catch(error => {
            console.error("Erreur lors du chargement du fichier JSON :", error);
        });
});

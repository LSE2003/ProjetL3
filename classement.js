document.addEventListener("DOMContentLoaded", () => {
    let participants = [];
    let visibleCount = 5; // Nombre de participants visibles au début
    const increment = 3; // Nombre à ajouter à chaque appui sur "Voir plus"

    const rankingList = document.getElementById("ranking-list");
    const loadMoreBtn = document.getElementById("load-more");

    // Charger les participants depuis le fichier JSON
    fetch("participants.json")
        .then(response => response.json())
        .then(data => {
            participants = data.sort((a, b) => b.score - a.score); // Trier par score décroissant
            updateLeaderboard();
        });

    function updateLeaderboard() {
        rankingList.innerHTML = ""; // Réinitialiser la liste
        participants.slice(0, visibleCount).forEach((player, index) => {
            const li = document.createElement("li");
            if (index === 0) li.classList.add("first-place");

            li.innerHTML = `
                <div class="player-info">
                    ${player.image ? `<img src="${player.image}" alt="${player.nom}">` : ""}
                    <p class="nom">${player.nom}</p>
                </div>
                <p class="score">${player.score}</p>
            `;

            rankingList.appendChild(li);
        });

        // Cacher le bouton si tous les participants sont affichés
        if (visibleCount >= participants.length) {
            loadMoreBtn.style.display = "none";
        }
    }

    // Événement pour afficher plus de participants
    loadMoreBtn.addEventListener("click", () => {
        visibleCount += increment;
        updateLeaderboard();
    });
});

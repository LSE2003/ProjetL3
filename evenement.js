document.addEventListener("DOMContentLoaded", function() {
    const events = [
        {
            name: "Tournament Pokémon Online",
            date: "25 mars 2025",
            location: "En ligne",
            registration: "inscription.html?event=Tournament%20Pokémon%20Online",
            type: "Jeu"
        },
        {
            name: "Exposition Pokémon 2024",
            date: "10 avril 2025",
            location: "Musée Pokémon, Paris",
            registration: "inscription.html?event=Exposition%20Pokémon%202024",
            type: "Exposition"
        },
        {
            name: "Championnat Pokémon 2024",
            date: "12 décembre 2024",
            location: "Paris, France",
            registration: "inscription.html?event=Championnat%20Pokémon%202024",
            type: "Jeu"
        },
        {
            name: "Pokémon Art Exhibition",
            date: "30 juillet 2025",
            location: "Galerie Pokémon, Tokyo",
            registration: "inscription.html?event=Pokémon%20Art%20Exhibition",
            type: "Exposition"
        },
        {
            name: "Pokémon Battle League 2025",
            date: "18 janvier 2025",
            location: "Lyon, France",
            registration: "inscription.html?event=Pokémon%20Battle%20League%202025",
            type: "Jeu"
        }
    ];

    const upcomingEventsSection = document.getElementById("upcoming-events");
    const pastEventsSection = document.getElementById("past-events");

    // Ajout des événements à venir
    events.forEach(event => {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("event");
        eventDiv.innerHTML = `
            <h3>${event.name}</h3>
            <p>Date : ${event.date}</p>
            <p>Lieu : ${event.location}</p>
            <p>Type : ${event.type}</p>
            <p>Inscription : <a href="${event.registration}">S'inscrire</a></p>
        `;
        upcomingEventsSection.appendChild(eventDiv);
    });
});

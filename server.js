const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');

// Middleware pour servir les fichiers statiques de Vite en production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));

    // Cette route permet de servir index.html pour toutes les autres requêtes
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
}

// Connexion à MongoDB
mongoose.set('strictQuery', false);

mongoose.connect('mongodb://127.0.0.1:27017/PokemonDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connecté à la base de données MongoDB"))
    .catch((err) => console.log("Erreur de connexion:", err));

// Définir un modèle pour les cartes
const cardSchema = new mongoose.Schema({
    id: Number,
    name: String,
    game: String,
    rarity: String,
    grade: String,
    estimated_price: Number,
    image_url: String,
    description: String
});

const Card = mongoose.model('Card', cardSchema);

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Route API pour récupérer les cartes (par exemple, pour la recherche)
app.get('/api/cards', async (req, res) => {
    const { search, rarity, edition } = req.query;

    // Construire la requête de recherche
    let query = {};
    if (search) {
        query.name = { $regex: search, $options: 'i' }; // Recherche insensible à la casse
    }
    if (rarity) {
        query.rarity = rarity;
    }
    if (edition) {
        query.edition = edition;
    }

    try {
        const results = await Card.find(query);
        res.json(results);
    } catch (err) {
        res.status(500).send('Erreur lors de la recherche');
    }
});

// Route API pour afficher une carte par ID
app.get('/api/cards/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const card = await Card.findById(id);
        if (!card) {
            return res.status(404).send('Carte non trouvée');
        }
        res.json(card);
    } catch (err) {
        res.status(500).send('Erreur lors de la récupération de la carte');
    }
});

// Lancer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});

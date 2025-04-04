import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

// 🌟 Trois scènes, caméras et rendus distincts pour chaque modèle
const container = document.getElementById('container');

// Configuration de la scène Dracaufeu
const scene1 = new THREE.Scene();
const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer1 = new THREE.WebGLRenderer({ antialias: true });
renderer1.setSize(window.innerWidth, window.innerHeight);
renderer1.toneMapping = THREE.ACESFilmicToneMapping;
renderer1.toneMappingExposure = 0.75;
renderer1.outputEncoding = THREE.sRGBEncoding;
container.appendChild(renderer1.domElement);

scene1.background = new THREE.Color(0xFfa500);

// Charger le HDRI pour la scène de Dracaufeu
const hdriUrl = 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/autumn_field_puresky_1k.hdr';
new RGBELoader().load(hdriUrl, function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene1.environment = texture;
});

// Lumières pour Dracaufeu
const light1 = new THREE.AmbientLight(0xffffff, 2);
scene1.add(light1);
const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight1.position.set(1, 1, 1).normalize();
scene1.add(directionalLight1);

// Charger le modèle Dracaufeu
const loader1 = new GLTFLoader();
let model1;
loader1.load(
    './assets/charizard/scene.gltf',
    (gltf) => {
        model1 = gltf.scene;
        model1.scale.set(1, 1, 1);
        model1.rotation.x = Math.PI / 2;
        scene1.add(model1);
    }
);

camera1.position.set(0, 0, 1);

// Ajouter les contrôles de la souris pour Dracaufeu
const controls1 = new OrbitControls(camera1, renderer1.domElement);

// Activer les contrôles
controls1.enableDamping = true;  // Lissage des mouvements
controls1.dampingFactor = 0.25; // Facteur de lissage
controls1.screenSpacePanning = false;  // Empêche de déplacer la caméra dans l'espace 2D
controls1.maxPolarAngle = Math.PI / 2; // Limite l'angle de la caméra pour éviter qu'elle passe sous le sol

// 🎬 Animation de la scène de Dracaufeu avec contrôles de la souris
function animate1() {
    requestAnimationFrame(animate1);

    // Mettre à jour les contrôles
    controls1.update();

    renderer1.render(scene1, camera1);
}

animate1();

// Redimensionner automatiquement le renderer lorsque la fenêtre est redimensionnée
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer1.setSize(width, height);
    camera1.aspect = width / height;
    camera1.updateProjectionMatrix();
});

// Configuration de la scène Pikachu
const containerP = document.getElementById('pika');
const scene2 = new THREE.Scene();
const camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer2 = new THREE.WebGLRenderer({ antialias: true });
renderer2.setSize(window.innerWidth, window.innerHeight);
renderer2.toneMapping = THREE.ACESFilmicToneMapping;
renderer2.toneMappingExposure = 0.75;
containerP.appendChild(renderer2.domElement);

const light2 = new THREE.AmbientLight(0xffffff, 2);
scene2.add(light2);
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionalLight2.position.set(1, 1, 1).normalize();
scene2.add(directionalLight2);

scene2.background = new THREE.Color(0xFFFFFF);

// Charger le modèle Pikachu
const loader2 = new GLTFLoader();
let model2;
loader2.load(
    './assets/Pikachu/pika.glb',
    (gltf) => {
        model2 = gltf.scene;
        model2.scale.set(7, 7, 7);
        model2.rotation.x = Math.PI;

        scene2.add(model2);
    },
);

camera2.position.set(0, 0, 0.6);

// 🎬 Animation de la scène de Pikachu (Flottement continu)
let floatingSpeed = 0.002;  // Vitesse du flottement
let maxHeight = 0.1;  // Hauteur maximale
let minHeight = -0.1;  // Hauteur minimale
let direction = 1;  // Direction initiale (1 pour monter, -1 pour descendre)

function animate2() {
    requestAnimationFrame(animate2);

    // Flottement de la carte Pikachu
    if (model2) {
        // Si on atteint la hauteur maximale ou minimale, inverser la direction
        if (model2.position.y >= maxHeight) {
            direction = -1; // Descendre
        } else if (model2.position.y <= minHeight) {
            direction = 1; // Monter
        }

        // Appliquer l'animation de flottement
        model2.position.y += direction * floatingSpeed;
    }

    renderer2.render(scene2, camera2);
}

animate2();

// Redimensionner automatiquement le renderer lorsque la fenêtre est redimensionnée
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer2.setSize(width, height);
    camera2.aspect = width / height;
    camera2.updateProjectionMatrix();
});


    // Fonction pour afficher/masquer la barre de navigation
    function toggleNav() {
        const navBar = document.getElementById('navbar-container');
        navBar.classList.toggle('active');
    }

    // Chargement de la barre de navigation
    document.addEventListener("DOMContentLoaded", function () {
        fetch("navbar.html")
            .then(response => response.text())
            .then(data => {
                document.addEventListener("DOMContentLoaded", function () {
                    // Ton code qui manipule le DOM ici
                    const navBar = document.getElementById("nav-bar");
                    navBar.innerHTML = "Nouvelle valeur";
                });
            })
    });




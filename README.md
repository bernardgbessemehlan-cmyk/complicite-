# 💑 Complicité — Le Jeu des Couples à Distance (Saison 1)

> **Testez votre synchronisation et votre amour en temps réel sur 20 niveaux et 1 000 épreuves uniques.**

**Complicité** est une application web progressive (PWA) temps réel conçue spécialement pour les couples à distance. Elle transforme la distance en un moment de jeu captivant, émotionnel et compétitif où chaque bonne réponse synchronisée rapproche les deux partenaires de récompenses réelles.

---

## 🌟 Points Forts & Fonctionnalités

### 🎮 Gameplay & Progression
* **20 Niveaux & 1 000 Épreuves Inédites** : Chaque niveau comporte **exactement 50 questions** réparties sur 10 mini-jeux variés.
* **Garantie Zéro Répétition** : Grâce au suivi persistant de l'historique de chaque couple (`usedQuestionIds`), **aucune question ne se répète** au cours des 20 niveaux de la saison.
* **12 Modes de Mini-Jeux** :
  1. 👤 **Nos Habitudes (Moi / Lui / Nous Deux)** : Qui fait quoi au quotidien ?
  2. ❓ **Habitudes & Valeurs (Oui / Non)** : Questions de couple sur la vie commune et les projets.
  3. 📝 **Je Te Connais (Écrit libre)** : Connaissance profonde des goûts, dates et souvenirs.
  4. 🧠 **Même Pensée (Télépathie)** : Écrivez spontanément le même mot sans vous concerter.
  5. 🍕 **Goûts & Préférences (QCM 4 choix)** : Devinez les choix favoris de votre partenaire.
  6. ⚡ **Qui Fait Ça ? (Moi / Lui)** : Dilemmes humoristiques et situations insolites.
  7. ⚖️ **Choix Impossible (2 options)** : Dilemmes cornéliens en couple.
  8. 🎭 **Scénarios Imprévus** : Réactions face à des situations d'urgence ou de rêve.
  9. 👁️ **Mémoire Flash** : Mémorisation d'éléments pendant 4 secondes chrono avant la question.
  10. ↕️ **Le Grand Classement** : Classement interactif par glisser-déposer tactile de 5 éléments.
  11. 🔮 **Synchronisation du Cœur** : Alignement intuitif sur les symboles du couple.
  12. 🚨 **Épreuves Surprises** : Défis bonus inattendus.

### 🧠 Moteur Sémantique Intelligent & Équivalences
* **Reconnaissance du sens réel** : Fini les pénalités injustes pour une faute de frappe ou un mot différent !
  * *Exemple* : *"Le poulet braisé"* et *"Du poulet"* sont automatiquement validés.
  * *Exemple* : *"Ciné"* et *"Cinéma"*, *"Dormir"* et *"Dodo"*, *"Gentillesse"* et *"Il est très gentil"*.
* **Dates canoniques universelles** : Prise en charge automatique de `15/10/2026`, `15 octobre 2026`, `15 oct`, etc.
* **Système d'Équivalences Personnalisées** : Chaque épreuve peut définir ses propres groupes de synonymes acceptés.
* **Prévention stricte des faux positifs** : Bloque automatiquement les contradictions directes (ex: *bleu* vs *rouge*, *noir* vs *blanc*).

### 📱 Expérience Mobile & PWA
* **PWA Installable** : Fonctionne en plein écran sur smartphone (Android & iOS) via le fichier `manifest.webmanifest`.
* **Support Tactile Avancé** : Glisser-déposer sur smartphone (`touchstart`, `touchmove`, `touchend`) pour le mini-jeu de classement.
* **Résilience Réseau** : En cas de coupure Internet d'un partenaire, le jeu se met automatiquement en pause (`pause-overlay`) et reprend dès la reconnexion sans perte de points.

### 🛡️ Dashboard Administrateur
* Accessible sur `/admin.html` avec protection par mot de passe temporaire (token sécurisé 7 jours).
* Gestion complète des couples enregistrés, scores et réclamations de cadeaux physiques.
* Création et suppression de questions personnalisées avec support des équivalences.

---

## 📂 Structure du Projet

```text
jeu/
├── data/                       # Données persistées (JSON)
│   ├── couples.json            # Sessions, scores et historique des questions jouées
│   ├── claims.json             # Réclamations de récompenses cadeaux
│   └── custom_questions.json   # Questions personnalisées ajoutées par l'admin
├── public/                     # Frontend client (HTML, CSS, JS, Assets)
│   ├── index.html              # Interface principale du jeu
│   ├── admin.html              # Dashboard d'administration sécurisé
│   ├── app.js                  # Logique client WebSocket & interfaces UI
│   ├── style.css               # Design system sombre, animations et responsive
│   ├── sw.js                   # Service Worker pour la PWA
│   └── manifest.webmanifest    # Métadonnées PWA pour installation mobile
├── scripts/                    # Scripts utilitaires de génération
│   ├── build_expanded_bank.js  # Banque étendue de plus de 1 000 questions
│   └── generate_questions_file.js # Compilateur du module questions.js
├── src/                        # Logique métier serveur
│   ├── data/
│   │   └── questions.js        # Banque active, définitions des 20 niveaux & sélecteur
│   ├── semantic.js             # Moteur de comparaison sémantique & synonymes
│   └── storage.js              # Service de persistance JSON
├── package.json                # Dépendances Node.js
├── server.js                   # Serveur Express & WebSocket
└── README.md                   # Documentation du projet
```

---

## 🚀 Installation & Démarrage Local

### Prérequis
* [Node.js](https://nodejs.org/) version 18 ou supérieure installée sur votre machine.

### 1. Installation des dépendances
Ouvrez un terminal dans le dossier du projet :
```bash
npm install
```

### 2. Démarrage du serveur
Lancez le serveur avec Node :
```bash
node server.js
```
*(ou `npm start` si l'exécution des scripts est autorisée sur votre système)*

Le serveur démarre immédiatement :
```text
🎮 COMPLICITÉ — Serveur démarré !
🌐 Application : http://localhost:3000
🛡️ Dashboard Admin : http://localhost:3000/admin.html
📡 WebSocket actif sur ws://localhost:3000
```

---

## 🧪 Comment Tester à Deux en Local (Simulateur)

Pour tester la synchronisation en temps réel sur une seule machine :

1. **Joueur 1** :
   * Ouvrez un premier onglet standard sur [http://localhost:3000](http://localhost:3000).
   * Cliquez sur **« Commencer l'aventure »** puis **« Créer un couple »**.
   * Entrez votre prénom et notez le code de partage à 6 lettres (ex: `ABC123`).
2. **Joueur 2** :
   * Ouvrez un **second onglet en navigation privée** (ou un autre navigateur : Edge, Chrome, Firefox).
   * Allez sur [http://localhost:3000](http://localhost:3000) et choisissez **« Rejoindre mon partenaire »**.
   * Entrez votre prénom et le code généré par le Joueur 1.
3. Les deux joueurs sont instantanément connectés au même salon en direct !
4. Cliquez sur **« Je suis prêt(e) »** sur les deux écrans pour lancer le Niveau 1.

---

## 🔑 Accès Administrateur

* **Lien** : [http://localhost:3000/admin.html](http://localhost:3000/admin.html)
* **Mot de passe par défaut** : `jeu2026`
* *(Le mot de passe peut être personnalisé via la variable d'environnement `ADMIN_PASSWORD`)*.

---

## 🛠️ Technologies Utilisées

* **Backend** : Node.js, [Express](https://expressjs.com/), [ws (WebSocket)](https://github.com/websockets/ws), UUID, Crypto.
* **Frontend** : Vanilla HTML5, CSS3 Moderne (Glassmorphism, variables CSS, Flexbox/Grid), JavaScript ES6+.
* **Traitement du Langage Naturel (NLP)** : Algorithmes personnalisés de normalisation, distance de Levenshtein, Jaccard token overlap et clusters de synonymes.
* **PWA** : Service Worker et Web App Manifest.

---

## 📄 Licence
Ce projet est développé sous licence privée pour la plateforme **Complicité — Jeu de Couples**.

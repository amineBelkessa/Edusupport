# 🎓 EduSupport — Plateforme d’assistance éducative en ligne

![Next.js](https://img.shields.io/badge/Frontend-Next.js%2014-blue.svg)
![Firebase](https://img.shields.io/badge/Hosting-Firebase-orange.svg)
![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-06B6D4.svg)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6.svg)

---

## 🌐 Démo en ligne

🚀 **Application déployée :**  
👉 [https://edusupport-7b3ca.web.app/](https://edusupport-7b3ca.web.app/)

---

## 🧠 Description du projet

**EduSupport** est une plateforme web moderne d’assistance éducative permettant aux enseignants et apprenants d’interagir facilement.  
Elle offre un espace intuitif pour :
- Poster et consulter des **supports pédagogiques** 📘  
- Suivre les **progrès des élèves** 📊  
- Communiquer via un **système de messagerie ou commentaires** 💬  
- Gérer les **ressources éducatives** dans un environnement centralisé et sécurisé 🔐  

---

## ⚙️ Technologies utilisées

| Couche | Technologie |
|--------|--------------|
| Framework | **Next.js 14** |
| Langage | **TypeScript** |
| Base de données & Auth | **Firebase** |
| Hébergement | **Firebase Hosting** |
| UI | **TailwindCSS** |
| Build tool | **Vite / Next build** |
| Gestion de dépendances | **npm** |

---

## 📁 Structure du projet

```
edusupport/
├── public/                 → Images et fichiers statiques
├── src/
│   ├── pages/              → Pages principales (Accueil, Dashboard, etc.)
│   ├── components/         → Composants UI réutilisables
│   ├── styles/             → Fichiers CSS / Tailwind
│   ├── utils/              → Fonctions utilitaires
│   └── services/           → Connexion Firebase, gestion des données
├── firebase.json           → Configuration de déploiement Firebase
├── package.json            → Dépendances du projet
└── README.md
```

---

## 🧩 Installation et exécution locale

### 1️⃣ Cloner le dépôt
```bash
git clone https://github.com/amineBelkessa/edusupport.git
cd edusupport
```

### 2️⃣ Installer les dépendances
```bash
npm install
```

### 3️⃣ Lancer le projet localement
```bash
npm run dev
```

L’application sera disponible sur :  
👉 [http://localhost:3000](http://localhost:3000)

---

## ⚠️ Configuration Firebase (locale)

Avant de lancer le projet, crée un fichier `.env.local` à la racine du projet et ajoute tes clés Firebase :

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=ta_cle_api
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ton-projet.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ton-projet
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ton-projet.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxxxxx
NEXT_PUBLIC_FIREBASE_APP_ID=1:xxxxxx:web:xxxxxx
```

---

## 🧠 Fonctionnalités principales

- 🔐 Authentification sécurisée via Firebase  
- 👨‍🏫 Espace enseignant pour partager des supports  
- 👩‍🎓 Tableau de bord élève avec suivi de progression  
- 💬 Système de communication interne (commentaires, notifications)  
- 📱 Design responsive avec TailwindCSS  
- ☁️ Déploiement automatique sur Firebase Hosting  

---

## 📊 Lien de production

Le projet est hébergé sur **Firebase Hosting** :  
🌐 [https://edusupport-7b3ca.web.app/](https://edusupport-7b3ca.web.app/)

---

## 👨‍💻 Auteur

**Amine Belkessa**  
🎓 Master 2 Génie Informatique Logiciel — Université de Rouen  
📧 amine.belkessa@univ-rouen.fr  
🌐 [GitHub](https://github.com/amineBelkessa)

---

## 🪪 Licence
Projet éducatif et démonstratif — libre d’utilisation à des fins pédagogiques.

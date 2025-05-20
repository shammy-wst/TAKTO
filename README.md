# TAKTO

> **TAKTO** est un tableau de veille technologique minimaliste, accessible et statique, inspiré par Notion, conçu pour centraliser et partager des ressources tech essentielles.

---

## 🚀 Présentation

TAKTO est une application web statique, sans backend, qui permet de :

- Centraliser des liens de veille technologique (docs, blogs, outils, etc.)
- Ajouter, rechercher et supprimer vos propres liens (stockés localement)
- Naviguer dans une interface ultra-accessible (WCAG 2.1 AAA)
- Profiter d'un design sobre, responsive et inspiré de Notion

---

## ✨ Fonctionnalités principales

- **100% statique** : HTML/CSS, JS pour l'amélioration progressive (aucun backend)
- **Accessibilité AAA** : contraste élevé, navigation clavier, ARIA, structure sémantique
- **Thème clair/sombre** (toggle, sauvegardé en local)
- **Sidebar à catégories** : liens tech classés, collapsibles (JS), statiques (no-JS)
- **Ajout/Suppression de liens** (JS, localStorage)
- **Responsive** : mobile, tablette, desktop
- **Aucune navigation JS** : tout via `<a>`
- **Design Notion-like** : police sans-serif, bords arrondis, ombres subtiles, palette sobre
- **Export/Import de liens** (JSON)
- **Sidebar redimensionnable** (desktop/tablette)
- **Support hors-ligne (PWA/service worker)**

---

## 🗂️ Structure du projet

```text
TAKTO/
├── public/                # Fichiers statiques accessibles (HTML, favicon, manifest, sw.js)
│   ├── index.html
│   ├── readme.html
│   ├── faq.html
│   ├── team.html
│   ├── accessibility.html
│   ├── 404.html
│   ├── favicon.ico
│   ├── manifest.json
│   └── sw.js
├── src/                   # Code source (CSS, JS)
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── app.js
├── assets/                # Images, logos, ressources statiques
│   └── public/
│       ├── TAKTO BLACK.svg
│       └── TAKTO WHITE.svg
├── .github/               # Workflows CI/CD
│   └── workflows/
│       └── ci.yml
├── sitemap.xml
├── CHANGELOG.md
├── CONTRIBUTING.md
├── README.md
└── package.json
```

**NB :** Si tu clones ce repo, place les fichiers HTML, favicon, manifest et sw.js dans `public/`, le code source dans `src/`, et les assets dans `assets/`.

---

## 🛠️ Installation & Utilisation

1. **Cloner le repo :**

   ```bash
   git clone https://github.com/<ton-username>/TAKTO.git
   cd TAKTO
   ```

2. **Lancer en local (optionnel) :**

   ```bash
   npx serve public
   # ou
   python3 -m http.server 8000
   # puis ouvrir http://localhost:8000/index.html
   ```

3. **Ouvrir `public/index.html` dans votre navigateur**
4. **Ajouter vos liens** (si JS activé)
5. **Naviguer, explorer, changer de thème**
6. **Aucune donnée n'est envoyée, tout reste local**

---

## ♿ Accessibilité

- Contraste > 7:1, sans bleu vif
- Navigation clavier complète (sidebar, liens, formulaires)
- Structure HTML sémantique, ARIA là où nécessaire
- Fonctionne sans JS (mode fallback accessible)
- Testé avec lecteurs d'écran et outils d'audit

---

## 📱 Responsive & Design

- Deux colonnes : sidebar fixe + contenu principal
- Sidebar collapsible (JS) ou statique (no-JS)
- Thème clair/sombre, police "Inter"/sans-serif
- Mobile : menu burger, sidebar adaptée, footer compact

---

## 🔒 Données & Vie privée

- **Aucune donnée n'est envoyée**
- Les liens ajoutés sont stockés dans `localStorage` (navigateur)
- Export/Import possible au format JSON

---

## 🛡️ PWA & Hors-ligne

- Service worker (`sw.js`) pour le support offline
- Ajoute TAKTO à ton écran d'accueil (manifest.json)
- Fonctionne même sans connexion après le premier chargement

---

## 📝 Changelog

### [1.0.0] - 2024-06-XX

- Première version publique :
  - Dashboard statique, accessible, responsive
  - Sidebar à catégories, collapsibles (JS)
  - Thème clair/sombre, sauvegarde locale
  - Ajout/suppression de liens (localStorage)
  - Pages : index, readme, faq, équipe, accessibilité
  - Design Notion-like, palette sobre
  - Accessibilité WCAG 2.1 AAA

---

## 🤝 Contribuer

Merci de votre intérêt pour TAKTO ! Ce projet vise la simplicité, l'accessibilité (WCAG AAA), et la sobriété numérique.

### Principes

- Respectez le design minimaliste et accessible.
- N'ajoutez pas de dépendances lourdes ou de backend.
- Toute fonctionnalité JS doit être une amélioration progressive.
- Testez l'accessibilité (clavier, lecteurs d'écran, contraste).

### Comment contribuer

1. Forkez le repo et créez une branche.
2. Faites vos modifications (HTML/CSS/JS statique).
3. Vérifiez l'accessibilité et le responsive.
4. Ouvrez une Pull Request avec une description claire.

### Suggestions

- Proposez des liens tech utiles.
- Améliorez l'accessibilité ou la documentation.
- Corrigez des bugs ou proposez des optimisations.

Merci !

---

## 👥 Équipe & Crédits

- Icham — Coordination, accessibilité, design
- Samy — Veille, idées, ressources
- Wissem — Développement, optimisation
- Victor — UI/UX, design
- Maxime — Tests, documentation

---

## 📄 Licence

MIT — Utilisation libre, attribution appréciée.

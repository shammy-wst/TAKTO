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

---

## 🗂️ Structure du projet

```
TAKTO/
├── index.html
├── readme.html
├── faq.html
├── team.html
├── accessibility.html
├── app/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── app.js
├── assets/
│   └── public/
│       └── TAKTO BLACK.svg
├── favicon.ico
└── README.md
```

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

## 🛠️ Utilisation

1. **Ouvrez `index.html` dans votre navigateur**
2. **Ajoutez vos liens** (si JS activé)
3. **Naviguez, explorez, changez de thème**
4. **Aucune donnée n'est envoyée, tout reste local**

---

## 🤝 Contribuer

- Forkez le repo, proposez vos améliorations !
- Respectez l'accessibilité et la philosophie minimaliste
- Suggestions, bugs : issues bienvenues

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

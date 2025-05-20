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
- **Thème clair/sombre** (toggle, sauvegardé en local, favicon dynamique)
- **Sidebar à catégories** : liens tech classés, collapsibles (JS), statiques (no-JS)
- **Ajout/Suppression de liens** (JS, localStorage)
- **Export/Import de liens** (JSON)
- **Responsive** : mobile, tablette, desktop
- **Aucune navigation JS** : tout via `<a>`
- **Design Notion-like** : police sans-serif, bords arrondis, ombres subtiles, palette sobre
- **Sidebar redimensionnable** (desktop/tablette)
- **Support hors-ligne (PWA/service worker)**
- **Icônes PWA optimisées** (PNG multi-tailles, manifest.json)
- **Favicon dynamique** selon le thème (clair/sombre)
- **Aucune donnée n'est envoyée, tout reste local**

---

## 🗂️ Structure du projet

```text
TAKTO/
├── public/                # Fichiers statiques prêts pour la prod
│   ├── index.html
│   ├── readme.html
│   ├── faq.html
│   ├── team.html
│   ├── accessibility.html
│   ├── 404.html
│   ├── favicon.ico
│   ├── TAKTO BLACK.svg
│   ├── TAKTO WHITE.svg
│   ├── manifest.json
│   ├── sw.js
│   ├── sitemap.xml
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── app.js
│   └── icons/
│       ├── icon-black-192.png
│       ├── icon-black-512.png
│       ├── icon-white-192.png
│       └── icon-white-512.png
├── src/                   # Code source (à modifier ici)
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── app.js
├── .github/               # Workflows CI/CD
│   └── workflows/
│       └── ci.yml
├── assets/                # (optionnel) autres assets
├── CHANGELOG.md
├── CONTRIBUTING.md
├── README.md
└── package.json
```

**NB :** Développez dans `src/`, puis copiez les fichiers dans `public/` pour la prod.

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
- **Compatible avec la narration vocale (lecteurs d'écran)**

---

## 📱 Responsive & Design

- Deux colonnes : sidebar fixe + contenu principal
- Sidebar collapsible (JS) ou statique (no-JS)
- Thème clair/sombre, favicon dynamique, logo adapté
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
- Icônes PWA optimisées (PNG 192x192 et 512x512, version noire et blanche)
- Favicon dynamique selon le thème
- Fonctionne même sans connexion après le premier chargement

---

## 📝 Changelog

### [1.0.0] - 2024-06-XX

- Première version publique :
  - Dashboard statique, accessible, responsive
  - Sidebar à catégories, collapsibles (JS)
  - Thème clair/sombre, favicon dynamique, logo adapté
  - Ajout/suppression de liens (localStorage)
  - Export/Import de liens (JSON)
  - Pages : index, readme, faq, équipe, accessibilité, 404
  - Design Notion-like, palette sobre
  - Accessibilité WCAG 2.1 AAA
  - PWA : manifest.json, service worker, support offline, icônes PNG multi-tailles
  - Structure de projet professionnelle (src/ vs public/)
  - Sidebar redimensionnable (desktop/tablette)
  - Aucune donnée envoyée, tout reste local

#### Suivi des évolutions

- **Refonte structure prod** : séparation claire src/ (dev) et public/ (prod)
- **Uniformisation imports CSS/JS** : chemins relatifs propres pour la prod
- **Ajout manifest.json** : PWA ready, icônes PNG multi-tailles
- **Favicon dynamique** : changement auto selon le thème (clair/sombre)
- **Accessibilité renforcée** : navigation clavier, ARIA, contrastes, responsive
- **Optimisation PWA** : service worker, offline, installable sur mobile/desktop

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
2. Faites vos modifications (HTML/CSS/JS statique dans `src/`).
3. Copiez vos changements dans `public/` pour la prod.
4. Vérifiez l'accessibilité et le responsive.
5. Ouvrez une Pull Request avec une description claire.

### Suggestions

- Proposez des liens tech utiles.
- Améliorez l'accessibilité ou la documentation.
- Corrigez des bugs ou proposez des optimisations.

Merci !

---

## 👥 Équipe & Crédits

- Icham — UI/UX, design, design
- Samy — Veille, idées, ressources
- Wissem — Développement, optimisation
- Victor — Coordination
- Maxime — A ccessibilité, documentation
- Yanis — Tests

---

## 📄 Licence

MIT — Utilisation libre, attribution appréciée.

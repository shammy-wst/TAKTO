# TAKTO

> **TAKTO** est un tableau de veille technologique **ultra simple** et **accessible** pour tous, même sans expérience technique. Centralisez, organisez et partagez vos ressources web préférées en un clic !

---

## ✨ À quoi sert TAKTO ?

- 📚 **Centraliser** vos liens tech (docs, blogs, outils, etc.)
- 🌓 **Changer de thème** (clair/sombre) en un clic
- ♿ **Accessible à tous** (navigation clavier, contraste, ARIA)
- 📱 **Responsive** : fonctionne sur mobile, tablette, PC
- 🔒 **Respect de la vie privée** : vos données restent sur votre appareil

---

## 🚀 Comment installer TAKTO ? (Débutant friendly)

1. **Téléchargez le projet**

   - Cliquez sur “Code” puis “Download ZIP” ou utilisez la commande :

     ```bash
     git clone https://github.com/<votre-username>/TAKTO.git
     cd TAKTO
     ```

2. **Ouvrez le dossier**

   - Double-cliquez sur le dossier téléchargé pour l'ouvrir.

3. **Lancez TAKTO en local**

   - Si vous avez Node.js :

     ```bash
     npx serve public
     ```

   - Sinon, ouvrez le fichier `public/index.html` directement dans votre navigateur (clic droit > ouvrir avec).

> 💡 **Astuce débutant** : Pas besoin d'installer quoi que ce soit pour utiliser TAKTO, tout fonctionne dans votre navigateur !

---

## 🖱️ Comment utiliser TAKTO ?

- **Ajouter un lien** : Cliquez sur "Ajouter un lien", remplissez le formulaire, validez.
- **Supprimer un lien** : Cliquez sur la corbeille à côté du lien.
- **Changer de thème** : Cliquez sur l'icône lune/soleil en haut à droite.
- **Exporter vos liens** : Cliquez sur "Exporter" pour sauvegarder vos liens en fichier .json.
- **Importer vos liens** : Cliquez sur "Importer" et sélectionnez votre fichier .json.

---

## 🗂️ Structure du projet (explications simples)

```text
TAKTO/
├── public/                # Fichiers prêts à être utilisés dans le navigateur
│   ├── index.html         # Page principale
│   ├── readme.html        # Documentation intégrée
│   ├── faq.html           # Foire aux questions
│   ├── team.html          # Présentation de l'équipe
│   ├── accessibility.html # Détails sur l'accessibilité
│   ├── 404.html           # Page d'erreur
│   ├── favicon.ico        # Icône du site
│   ├── TAKTO BLACK.svg    # Logo version noire
│   ├── TAKTO WHITE.svg    # Logo version blanche
│   ├── manifest.json      # Fichier PWA
│   ├── sw.js              # Service Worker (hors-ligne)
│   ├── sitemap.xml        # Plan du site
│   ├── css/
│   │   └── styles.css     # Feuille de style principale
│   ├── js/
│   │   └── app.js         # Script principal
│   └── icons/             # Icônes PWA
├── src/                   # Code source à modifier (dev)
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── app.js
├── .github/               # Automatisation GitHub
│   └── workflows/
│       └── ci.yml
├── assets/                # Images, captures d'écran, etc.
├── CHANGELOG.md           # Historique des versions
├── CONTRIBUTING.md        # Guide de contribution
├── README.md              # Ce fichier !
└── package.json           # Dépendances JS (optionnel)
```

**NB :** Modifiez le code dans `src/`, puis copiez dans `public/` pour la mise en ligne.

---

## ♿ Accessibilité

TAKTO est conçu pour être utilisable par tous :

- Navigation au clavier (Tab, Entrée, Espace)
- Contraste élevé, police lisible
- Compatible lecteurs d'écran (VoiceOver, NVDA, JAWS)
- Fonctionne même sans JavaScript
- Structure HTML sémantique, ARIA là où nécessaire

---

## 📱 Responsive & Design

- Deux colonnes : sidebar fixe + contenu principal
- Sidebar repliable (JS) ou statique (sans JS)
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
- Ajoutez TAKTO à votre écran d'accueil (manifest.json)
- Icônes PWA optimisées (PNG 192x192 et 512x512, version noire et blanche)
- Favicon dynamique selon le thème
- Fonctionne même sans connexion après le premier chargement

---

## ❓ FAQ

- **Mes liens sont-ils partagés ?**
  > Non, tout reste sur votre appareil.
- **Je ne vois pas mes liens sur un autre ordinateur ?**
  > Les liens sont stockés localement, ils ne sont pas synchronisés.
- **Comment réinitialiser TAKTO ?**
  > Supprimez les liens un par un ou videz le stockage local de votre navigateur.
- **Je ne connais rien au code, puis-je utiliser TAKTO ?**
  > Oui, il suffit d'ouvrir le fichier `index.html` dans votre navigateur !
- **Comment signaler un bug ou une suggestion ?**
  > Ouvrez une "issue" sur GitHub ou contactez l'équipe.

---

## 🤝 Contribuer

Vous souhaitez améliorer TAKTO ? Merci !

- Forkez le projet, créez une branche, proposez vos modifications.
- Ouvrez une "issue" pour signaler un bug ou suggérer une amélioration.
- Respectez le design minimaliste et l'accessibilité.
- Testez vos modifications sur mobile et avec un lecteur d'écran si possible.

### Exemple de contribution

1. Forkez le repo
2. Créez une branche : `git checkout -b ma-feature`
3. Faites vos modifications dans `src/`
4. Copiez dans `public/` si besoin
5. Ouvrez une Pull Request avec une description claire

---

## 👥 Équipe & Crédits

- Icham — UI/UX, accessibilité, design
- Samy — Veille, idées, ressources
- Wissem — Développement, optimisation
- Victor — Coordination
- Maxime — Accessibilité, documentation
- Yanis — Tests

Merci à tous les contributeurs et utilisateurs !

---

## 📄 Licence

MIT — Utilisation libre, attribution appréciée.

---

> **Besoin d'aide ?** Ouvrez une issue sur GitHub ou contactez l'équipe TAKTO. Toute question est la bienvenue, même (et surtout) si vous débutez !

# TAKTO - Gestionnaire de Tâches Minimaliste et Accessible

**Projet réalisé par Icham, Samy, Wissem, Victor, Maxime**  
Entreprise : **3W** en collaboration avec l'école **HETIC** (projet scolaire, Avril-Mai 2025)

---

## 🎯 Objectif du projet

Développer une application web ultra-légère (HTML/CSS/JS minimal), accessible (WCAG 2.1 AAA), compatible avec de vieux navigateurs, performante et sobre, sans framework ni dépendance externe, et déployée sur une plateforme statique (Vercel).

---

## 🚀 Fonctionnalités principales

- **Organisation par projets et tâches** (statuts : À faire, En cours, Terminé)
- **Interface type terminal** pour les commandes et la navigation
- **Navigation 100% clavier** (focus visible, skip to content, raccourcis universels)
- **Contraste fort** et design sobre (norme AAA)
- **Stockage local** (localStorage, aucune donnée externe)
- **Fonctionne sans JavaScript** (fallback HTML/CSS)
- **Responsive** (mobile, tablette, desktop)
- **Ultra-rapide** (minification JS, CSS fusionné, favicon optimisé)
- **Aucun framework, aucune dépendance externe**

---

## ♿️ Accessibilité & bonnes pratiques

- Respect strict des normes **WCAG 2.1** (AA/AAA)
- Balises sémantiques (`<header>`, `<nav>`, `<main>`, `<aside>`, etc.)
- Rôles ARIA uniquement là où c'est utile
- Focus visible sur tous les éléments interactifs
- Lecture linéaire et navigation fluide au clavier
- Compatibilité lecteurs d'écran
- Fallback HTML/CSS si JS désactivé

---

## ⚡️ Performance & sobriété

- **Minification du JS** (`terminal.min.js`)
- **Fusion des CSS** (un seul fichier `styles.css`)
- **Favicon optimisé** (plus d'erreur 404)
- **Aucune image lourde, aucune police externe**
- **Aucune requête HTTP récurrente**
- **Audit Lighthouse** : score élevé en accessibilité, performance, SEO

---

## 🖥️ Déploiement

- Déployé sur **Vercel** (compatible GitHub Pages/Netlify)
- Version de production auditable publiquement
- Fichier `favicon.ico` à la racine
- Un seul point d'entrée : `index.html`

---

## 📝 Instructions d'utilisation

1. **Cloner le dépôt**
2. **Ouvrir `index.html`** dans n'importe quel navigateur (même ancien)
3. **Naviguer au clavier** ou à la souris
4. **Créer des projets et tâches** via l'interface ou le terminal

---

## ⌨️ Raccourcis clavier principaux

- `Ctrl + 1` : Aller au terminal
- `Ctrl + 2` : README
- `Ctrl + 3` : FAQ
- `Ctrl + 4` : Notre équipe
- `Ctrl + 5` : Accessibilité
- `Ctrl + H` : Commandes terminal
- `Ctrl + Maj + L` : Liste projets
- `Ctrl + Maj + T` : Liste tâches
- `Ctrl + Maj + C` : Effacer le terminal
- `Tab` / `Shift+Tab` : Navigation linéaire
- `Entrée` / `Espace` : Activer un bouton ou un lien

---

## 🛠️ Choix techniques & étapes du projet

- **Phase 1** : Spécification, choix de l'architecture, wireframes minimalistes
- **Phase 2** : Développement HTML/CSS sémantique, structure accessible
- **Phase 3** : Ajout du JS vanilla, terminal interactif, gestion locale des données
- **Phase 4** : Accessibilité avancée (focus, ARIA, navigation clavier, skip to content)
- **Phase 5** : Optimisation (minification JS, fusion CSS, favicon, audit Lighthouse)
- **Phase 6** : Déploiement sur Vercel, tests sur navigateurs anciens et mobiles

---

## 👥 Crédits

- **Développement** : Icham, Samy, Wissem, Victor, Maxime
- **Entreprise** : 3W
- **Partenaire pédagogique** : HETIC

---

## 📄 Licence

Projet libre pour tout usage pédagogique ou personnel.

---

## 💡 Inspirations

- [motherfuckingwebsite.com](https://motherfuckingwebsite.com/)
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)

---

**TAKTO : la gestion de tâches, sans superflu, pour tous, partout.**

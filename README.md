# TAKTO - Gestionnaire de Tâches Minimaliste

TAKTO est une application web légère et minimaliste conçue pour les développeurs web qui souhaitent organiser leurs projets et tâches sans utiliser d'applications lourdes comme Trello, Jira ou Notion.

## Caractéristiques

- **Ultra-légère et minimaliste** : aucune dépendance externe
- **Organisation par projets et tâches**
- **Statuts simples** : À faire, En cours, Terminé
- **Navigation au clavier** avec focus visible pour l'accessibilité
- **Stockage local** via localStorage (aucun compte ni base de données nécessaire)
- **Design console** adapté aux développeurs
- **Fonctionne sans JavaScript** (fallback HTML/CSS)
- **Contrastes forts** pour une meilleure accessibilité (norme AAA)

## Comment l'utiliser

1. Clonez ce dépôt ou téléchargez les fichiers
2. Ouvrez simplement le fichier `index.html` dans votre navigateur
3. Commencez à créer et organiser vos projets et tâches

## Navigation au clavier

L'application prend en charge les raccourcis clavier suivants :

- `Alt + P` : Créer un nouveau projet
- `Alt + T` : Créer une nouvelle tâche (lorsque vous êtes dans la vue des tâches)
- `Alt + B` : Retourner à la liste des projets (lorsque vous êtes dans la vue des tâches)
- `Echap` : Fermer les modales ouvertes
- `Tab` : Naviguer entre les éléments interactifs
- `Entrée` : Sélectionner un élément

## Persistance des données

Toutes les données sont stockées localement dans le navigateur via localStorage. Aucune information n'est envoyée à un serveur externe. Cela signifie que vos données sont privées, mais aussi qu'elles sont liées au navigateur que vous utilisez.

## Fonctionnement sans JavaScript

L'application est conçue pour fonctionner même sans JavaScript, offrant une expérience de base en HTML/CSS pur. Cependant, les fonctionnalités avancées comme l'ajout dynamique de projets et de tâches nécessitent JavaScript.

## Développement

TAKTO est construit avec des technologies web standards :

- HTML pour la structure
- CSS pour le style
- JavaScript vanilla pour les fonctionnalités

Aucun framework ou bibliothèque externe n'est utilisé pour garantir la légèreté et la simplicité de l'application.

## Licence

Ce projet est libre d'utilisation pour tous les développeurs qui cherchent une solution légère de gestion de tâches.

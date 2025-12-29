# Démo Web Speech API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg)](https://vitejs.dev/)

🌍 **Disponible en plusieurs langues :** [English](README.md) | [Беларуская](README.be.md) | [Українська](README.uk.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Polski](README.pl.md) | [Español](README.es.md)

Une démonstration complète des capacités de l'API Web Speech, présentant les fonctionnalités de reconnaissance vocale et de synthèse vocale. Construit avec Vue 3, TypeScript et des technologies web modernes.

🌐 **[Démo en direct](https://mr-lexus.github.io/Web-Speech-API-Demo/)** - Essayez maintenant !

## 🚀 Fonctionnalités

### 🎤 Reconnaissance vocale
- **Conversion parole-texte en temps réel**
- **Support multilingue** (russe, anglais, allemand, français)
- **Mode de reconnaissance continue**
- **Gestion des erreurs** avec des messages conviviaux
- **Gestion des autorisations du microphone**

### 🔊 Synthèse vocale
- **Conversion texte-parole**
- **Sélection de voix** parmi les voix système disponibles
- **Paramètres ajustables** : vitesse, hauteur, volume
- **Phrases rapides prédéfinies** pour les tests
- **Contrôles de lecture** : lire, pause, reprendre, arrêter

### 🌐 Internationalisation
- **7 langues supportées** : anglais, biélorusse, ukrainien, allemand, français, polonais, espagnol
- **Changement de langue dynamique**
- **Interface et messages localisés**
- **Détection de la langue du navigateur**

### 🎨 UI/UX moderne
- **Design responsive** pour toutes les tailles d'appareils
- **Beaux arrière-plans dégradés**
- **Animations et transitions fluides**
- **Interface accessible**
- **Méthodologie BEM** pour l'organisation CSS

## 🛠️ Stack technologique

- **Framework Frontend** : Vue 3 (Composition API)
- **Langage** : TypeScript
- **Outil de build** : Vite
- **Stylisation** : SCSS avec méthodologie BEM
- **Internationalisation** : Vue I18n
- **Tests** : Jest avec Vue Test Utils
- **Qualité du code** : ESLint, Stylelint
- **Gestionnaire de paquets** : Yarn

## 📋 Prérequis

- Node.js 18+ 
- Gestionnaire de paquets Yarn
- Navigateur moderne avec support de l'API Web Speech :
  - Chrome 25+
  - Firefox 44+
  - Safari 14.1+
  - Edge 79+

## 🚀 Démarrage rapide

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/mr-lexus/Web-Speech-API-Demo.git
cd Web-Speech-API-Demo

# Installer les dépendances
yarn install

# Démarrer le serveur de développement
yarn dev
```

### Scripts disponibles

```bash
# Développement
yarn dev          # Démarrer le serveur de développement
yarn build        # Construire pour la production
yarn preview      # Prévisualiser le build de production

# Tests
yarn test         # Exécuter les tests
yarn test:watch   # Exécuter les tests en mode watch
yarn test:ci      # Exécuter les tests pour CI

# Qualité du code
yarn lint:style   # Vérifier et corriger les styles
```

## 🏗️ Structure du projet

```
src/
├── app/                    # Couche application
│   ├── App.vue            # Composant racine
│   └── styles/            # Styles globaux
├── widgets/               # Widgets de fonctionnalités
│   ├── speech-recognition/
│   │   ├── ui/           # Composants UI
│   │   └── model/        # Logique métier
│   └── speech-synthesis/
│       ├── ui/           # Composants UI
│       └── model/        # Logique métier
└── shared/               # Ressources partagées
    ├── i18n/            # Internationalisation
    │   ├── locales/     # Fichiers de traduction
    │   └── index.ts     # Configuration i18n
    └── ui/              # Composants UI partagés
```

## 🌐 Compatibilité des navigateurs

### Reconnaissance vocale
| Navigateur | Support | Notes |
|------------|---------|-------|
| Chrome     | ✅ 25+  | Support complet |
| Firefox    | ❌      | Non supporté |
| Safari     | ❌      | Non supporté |
| Edge       | ✅ 79+  | Basé sur Chromium |

### Synthèse vocale
| Navigateur | Support | Notes |
|------------|---------|-------|
| Chrome     | ✅ 33+  | Support complet |
| Firefox    | ✅ 49+  | Support complet |
| Safari     | ✅ 7+   | Support complet |
| Edge       | ✅ 14+  | Support complet |

## 🔧 Configuration

### Paramètres de langue

L'application détecte automatiquement la langue du navigateur et revient à l'anglais si la langue détectée n'est pas supportée. Vous pouvez changer manuellement la langue en utilisant le sélecteur de langue dans l'en-tête.

### Ajouter de nouvelles langues

1. Créez un nouveau fichier de traduction dans `src/shared/i18n/locales/`
2. Ajoutez la langue au tableau `availableLanguages` dans `src/shared/i18n/index.ts`
3. Importez le fichier de traduction dans le même fichier index

## 🧪 Tests

Le projet inclut des tests complets pour tous les composants et composables :

```bash
# Exécuter tous les tests
yarn test

# Exécuter les tests avec couverture
yarn test --coverage

# Exécuter un fichier de test spécifique
yarn test SpeechRecognitionWidget.test.ts
```

## 🚀 Déploiement

### GitHub Pages

1. Construire le projet :
   ```bash
   yarn build
   ```

2. Déployer sur GitHub Pages :
   ```bash
   # Le dossier dist/ contient l'application construite
   # Configurez les paramètres de votre dépôt pour servir depuis le dossier dist
   ```

### Autres plateformes

L'application construite dans le dossier `dist/` peut être déployée sur n'importe quel service d'hébergement statique :
- Netlify
- Vercel
- Firebase Hosting
- AWS S3
- Et bien d'autres

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à soumettre une Pull Request. Pour les changements majeurs, veuillez d'abord ouvrir une issue pour discuter de ce que vous souhaitez changer.

### Directives de développement

1. **Style de code** : Suivez le style de code existant et utilisez ESLint/Stylelint
2. **Commits** : Utilisez des messages de commit conventionnels
3. **Tests** : Ajoutez des tests pour les nouvelles fonctionnalités
4. **Documentation** : Mettez à jour la documentation pour les changements significatifs

## 📝 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour les détails.

## 🙏 Remerciements

- Documentation de l'[API Web Speech](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- L'équipe [Vue.js](https://vuejs.org/) pour le framework formidable
- [Vue I18n](https://vue-i18n.intlify.dev/) pour le support de l'internationalisation
- Tous les contributeurs qui aident à améliorer ce projet

## 📞 Support

Si vous avez des questions ou besoin d'aide, veuillez :

1. Vérifier la page [Issues](https://github.com/mr-lexus/Web-Speech-API-Demo/issues)
2. Créer une nouvelle issue si votre question n'a pas encore de réponse
3. Fournir autant de détails que possible sur votre problème

---

**Fait avec ❤️ et des technologies web modernes**

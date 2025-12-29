# Web Speech API Demo

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg)](https://vitejs.dev/)

🌍 **Available in multiple languages:** [English](README.md) | [Беларуская](README.be.md) | [Українська](README.uk.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Polski](README.pl.md) | [Español](README.es.md)

A comprehensive demonstration of the Web Speech API capabilities, showcasing both speech recognition and speech synthesis features. Built with Vue 3, TypeScript, and modern web technologies.

🌐 **[Live Demo](https://mr-lexus.github.io/web-speech-api-demo/)** - Try it now!

## 🚀 Features

### 🎤 Speech Recognition
- **Real-time speech-to-text conversion**
- **Multiple language support** (Russian, English, German, French)
- **Continuous recognition mode**
- **Error handling** with user-friendly messages
- **Microphone permission management**

### 🔊 Speech Synthesis
- **Text-to-speech conversion**
- **Voice selection** from available system voices
- **Adjustable parameters**: rate, pitch, volume
- **Quick preset phrases** for testing
- **Playback controls**: play, pause, resume, stop

### 🌐 Internationalization
- **7 supported languages**: English, Belarusian, Ukrainian, German, French, Polish, Spanish
- **Dynamic language switching**
- **Localized UI and messages**
- **Browser language detection**

### 🎨 Modern UI/UX
- **Responsive design** for all device sizes
- **Beautiful gradient backgrounds**
- **Smooth animations and transitions**
- **Accessible interface**
- **BEM methodology** for CSS organization

## 🛠️ Technology Stack

- **Frontend Framework**: Vue 3 (Composition API)
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: SCSS with BEM methodology
- **Internationalization**: Vue I18n
- **Testing**: Jest with Vue Test Utils
- **Code Quality**: ESLint, Stylelint
- **Package Manager**: Yarn

## 📋 Prerequisites

- Node.js 18+ 
- Yarn package manager
- Modern browser with Web Speech API support:
  - Chrome 25+
  - Firefox 44+
  - Safari 14.1+
  - Edge 79+

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/mr-lexus/web-speech-api-demo.git
cd web-speech-api-demo

# Install dependencies
yarn install

# Start development server
yarn dev
```

### Available Scripts

```bash
# Development
yarn dev          # Start development server
yarn build        # Build for production
yarn preview      # Preview production build

# Testing
yarn test         # Run tests
yarn test:watch   # Run tests in watch mode
yarn test:ci      # Run tests for CI

# Code Quality
yarn lint:style   # Lint and fix styles
```

## 🏗️ Project Structure

```
src/
├── app/                    # Application layer
│   ├── App.vue            # Root component
│   └── styles/            # Global styles
├── widgets/               # Feature widgets
│   ├── speech-recognition/
│   │   ├── ui/           # UI components
│   │   └── model/        # Business logic
│   └── speech-synthesis/
│       ├── ui/           # UI components
│       └── model/        # Business logic
└── shared/               # Shared resources
    ├── i18n/            # Internationalization
    │   ├── locales/     # Translation files
    │   └── index.ts     # I18n configuration
    └── ui/              # Shared UI components
```

## 🌐 Browser Compatibility

### Speech Recognition
| Browser | Support | Notes |
|---------|---------|-------|
| Chrome  | ✅ 25+  | Full support |
| Firefox | ❌      | Not supported |
| Safari  | ❌      | Not supported |
| Edge    | ✅ 79+  | Chromium-based |

### Speech Synthesis
| Browser | Support | Notes |
|---------|---------|-------|
| Chrome  | ✅ 33+  | Full support |
| Firefox | ✅ 49+  | Full support |
| Safari  | ✅ 7+   | Full support |
| Edge    | ✅ 14+  | Full support |

## 🔧 Configuration

### Language Settings

The application automatically detects the browser language and falls back to English if the detected language is not supported. You can manually change the language using the language switcher in the header.

### Adding New Languages

1. Create a new translation file in `src/shared/i18n/locales/`
2. Add the language to the `availableLanguages` array in `src/shared/i18n/index.ts`
3. Import the translation file in the same index file

## 🧪 Testing

The project includes comprehensive tests for all components and composables:

```bash
# Run all tests
yarn test

# Run tests with coverage
yarn test --coverage

# Run specific test file
yarn test SpeechRecognitionWidget.test.ts
```

## 🚀 Deployment

### GitHub Pages

1. Build the project:
   ```bash
   yarn build
   ```

2. Deploy to GitHub Pages:
   ```bash
   # The dist/ folder contains the built application
   # Configure your repository settings to serve from the dist folder
   ```

### Other Platforms

The built application in the `dist/` folder can be deployed to any static hosting service:
- Netlify
- Vercel
- Firebase Hosting
- AWS S3
- And many others

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

1. **Code Style**: Follow the existing code style and use ESLint/Stylelint
2. **Commits**: Use conventional commit messages
3. **Testing**: Add tests for new features
4. **Documentation**: Update documentation for significant changes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) documentation
- [Vue.js](https://vuejs.org/) team for the amazing framework
- [Vue I18n](https://vue-i18n.intlify.dev/) for internationalization support
- All contributors who help improve this project

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/mr-lexus/web-speech-api-demo/issues) page
2. Create a new issue if your question isn't already answered
3. Provide as much detail as possible about your problem

---

**Made with ❤️ and modern web technologies**

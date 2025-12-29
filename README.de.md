# Web Speech API Demo

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg)](https://vitejs.dev/)

🌍 **Verfügbar in mehreren Sprachen:** [English](README.md) | [Беларуская](README.be.md) | [Українська](README.uk.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Polski](README.pl.md) | [Español](README.es.md)

Eine umfassende Demonstration der Web Speech API-Funktionen, die sowohl Spracherkennung als auch Sprachsynthese-Features zeigt. Erstellt mit Vue 3, TypeScript und modernen Web-Technologien.

🌐 **[Live Demo](https://mr-lexus.github.io/Web-Speech-API-Demo/)** - Jetzt ausprobieren!

## 🚀 Funktionen

### 🎤 Spracherkennung
- **Echtzeit-Sprache-zu-Text-Konvertierung**
- **Mehrsprachige Unterstützung** (Russisch, Englisch, Deutsch, Französisch)
- **Kontinuierlicher Erkennungsmodus**
- **Fehlerbehandlung** mit benutzerfreundlichen Nachrichten
- **Mikrofonberechtigungsverwaltung**

### 🔊 Sprachsynthese
- **Text-zu-Sprache-Konvertierung**
- **Stimmauswahl** aus verfügbaren Systemstimmen
- **Einstellbare Parameter**: Geschwindigkeit, Tonhöhe, Lautstärke
- **Schnelle Beispielphrasen** zum Testen
- **Wiedergabesteuerung**: Abspielen, Pause, Fortsetzen, Stoppen

### 🌐 Internationalisierung
- **7 unterstützte Sprachen**: Englisch, Weißrussisch, Ukrainisch, Deutsch, Französisch, Polnisch, Spanisch
- **Dynamischer Sprachwechsel**
- **Lokalisierte Benutzeroberfläche und Nachrichten**
- **Browser-Spracherkennung**

### 🎨 Modernes UI/UX
- **Responsives Design** für alle Gerätegrößen
- **Schöne Gradient-Hintergründe**
- **Flüssige Animationen und Übergänge**
- **Barrierefreie Benutzeroberfläche**
- **BEM-Methodologie** für CSS-Organisation

## 🛠️ Technologie-Stack

- **Frontend Framework**: Vue 3 (Composition API)
- **Sprache**: TypeScript
- **Build-Tool**: Vite
- **Styling**: SCSS mit BEM-Methodologie
- **Internationalisierung**: Vue I18n
- **Testing**: Jest mit Vue Test Utils
- **Code-Qualität**: ESLint, Stylelint
- **Paketmanager**: Yarn

## 📋 Voraussetzungen

- Node.js 18+ 
- Yarn Paketmanager
- Moderner Browser mit Web Speech API-Unterstützung:
  - Chrome 25+
  - Firefox 44+
  - Safari 14.1+
  - Edge 79+

## 🚀 Schnellstart

### Installation

```bash
# Repository klonen
git clone https://github.com/mr-lexus/Web-Speech-API-Demo.git
cd Web-Speech-API-Demo

# Abhängigkeiten installieren
yarn install

# Entwicklungsserver starten
yarn dev
```

### Verfügbare Skripte

```bash
# Entwicklung
yarn dev          # Entwicklungsserver starten
yarn build        # Für Produktion erstellen
yarn preview      # Produktions-Build vorschauen

# Testing
yarn test         # Tests ausführen
yarn test:watch   # Tests im Watch-Modus ausführen
yarn test:ci      # Tests für CI ausführen

# Code-Qualität
yarn lint:style   # Styles prüfen und korrigieren
```

## 🏗️ Projektstruktur

```
src/
├── app/                    # Anwendungsschicht
│   ├── App.vue            # Root-Komponente
│   └── styles/            # Globale Styles
├── widgets/               # Feature-Widgets
│   ├── speech-recognition/
│   │   ├── ui/           # UI-Komponenten
│   │   └── model/        # Geschäftslogik
│   └── speech-synthesis/
│       ├── ui/           # UI-Komponenten
│       └── model/        # Geschäftslogik
└── shared/               # Geteilte Ressourcen
    ├── i18n/            # Internationalisierung
    │   ├── locales/     # Übersetzungsdateien
    │   └── index.ts     # I18n-Konfiguration
    └── ui/              # Geteilte UI-Komponenten
```

## 🌐 Browser-Kompatibilität

### Spracherkennung
| Browser | Unterstützung | Hinweise |
|---------|---------------|----------|
| Chrome  | ✅ 25+        | Vollständige Unterstützung |
| Firefox | ❌            | Nicht unterstützt |
| Safari  | ❌            | Nicht unterstützt |
| Edge    | ✅ 79+        | Chromium-basiert |

### Sprachsynthese
| Browser | Unterstützung | Hinweise |
|---------|---------------|----------|
| Chrome  | ✅ 33+        | Vollständige Unterstützung |
| Firefox | ✅ 49+        | Vollständige Unterstützung |
| Safari  | ✅ 7+         | Vollständige Unterstützung |
| Edge    | ✅ 14+        | Vollständige Unterstützung |

## 🔧 Konfiguration

### Spracheinstellungen

Die Anwendung erkennt automatisch die Browser-Sprache und fällt auf Englisch zurück, wenn die erkannte Sprache nicht unterstützt wird. Sie können die Sprache manuell über den Sprachumschalter im Header ändern.

### Neue Sprachen hinzufügen

1. Erstellen Sie eine neue Übersetzungsdatei in `src/shared/i18n/locales/`
2. Fügen Sie die Sprache zum `availableLanguages`-Array in `src/shared/i18n/index.ts` hinzu
3. Importieren Sie die Übersetzungsdatei in derselben Index-Datei

## 🧪 Testing

Das Projekt enthält umfassende Tests für alle Komponenten und Composables:

```bash
# Alle Tests ausführen
yarn test

# Tests mit Coverage ausführen
yarn test --coverage

# Spezifische Testdatei ausführen
yarn test SpeechRecognitionWidget.test.ts
```

## 🚀 Deployment

### GitHub Pages

1. Projekt erstellen:
   ```bash
   yarn build
   ```

2. Auf GitHub Pages deployen:
   ```bash
   # Der dist/-Ordner enthält die erstellte Anwendung
   # Konfigurieren Sie Ihre Repository-Einstellungen für die Bereitstellung aus dem dist-Ordner
   ```

### Andere Plattformen

Die erstellte Anwendung im `dist/`-Ordner kann auf jedem statischen Hosting-Service bereitgestellt werden:
- Netlify
- Vercel
- Firebase Hosting
- AWS S3
- Und viele andere

## 🤝 Mitwirken

Beiträge sind willkommen! Bitte zögern Sie nicht, einen Pull Request einzureichen. Für größere Änderungen öffnen Sie bitte zuerst ein Issue, um zu besprechen, was Sie ändern möchten.

### Entwicklungsrichtlinien

1. **Code-Stil**: Befolgen Sie den bestehenden Code-Stil und verwenden Sie ESLint/Stylelint
2. **Commits**: Verwenden Sie konventionelle Commit-Nachrichten
3. **Testing**: Fügen Sie Tests für neue Features hinzu
4. **Dokumentation**: Aktualisieren Sie die Dokumentation für bedeutende Änderungen

## 📝 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert - siehe die [LICENSE](LICENSE)-Datei für Details.

## 🙏 Danksagungen

- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) Dokumentation
- [Vue.js](https://vuejs.org/) Team für das großartige Framework
- [Vue I18n](https://vue-i18n.intlify.dev/) für Internationalisierungsunterstützung
- Alle Mitwirkenden, die helfen, dieses Projekt zu verbessern

## 📞 Support

Wenn Sie Fragen haben oder Hilfe benötigen, bitte:

1. Überprüfen Sie die [Issues](https://github.com/mr-lexus/Web-Speech-API-Demo/issues)-Seite
2. Erstellen Sie ein neues Issue, wenn Ihre Frage noch nicht beantwortet wurde
3. Geben Sie so viele Details wie möglich über Ihr Problem an

---

**Erstellt mit ❤️ und modernen Web-Technologien**

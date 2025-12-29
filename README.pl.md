# Demo Web Speech API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg)](https://vitejs.dev/)

🌍 **Dostępne w wielu językach:** [English](README.md) | [Беларуская](README.be.md) | [Українська](README.uk.md) | [Deutsch](README.de.md) | [Français](README.fr.md) | [Polski](README.pl.md) | [Español](README.es.md)

Kompleksowa demonstracja możliwości Web Speech API, prezentująca funkcje rozpoznawania mowy i syntezy mowy. Zbudowane z Vue 3, TypeScript i nowoczesnymi technologiami webowymi.

🌐 **[Demo na żywo](https://mr-lexus.github.io/Web-Speech-API-Demo/)** - Wypróbuj teraz!

## 🚀 Funkcje

### 🎤 Rozpoznawanie mowy
- **Konwersja mowy na tekst w czasie rzeczywistym**
- **Obsługa wielu języków** (rosyjski, angielski, niemiecki, francuski)
- **Tryb ciągłego rozpoznawania**
- **Obsługa błędów** z przyjaznymi użytkownikowi komunikatami
- **Zarządzanie uprawnieniami mikrofonu**

### 🔊 Synteza mowy
- **Konwersja tekstu na mowę**
- **Wybór głosu** z dostępnych głosów systemowych
- **Regulowane parametry**: szybkość, wysokość, głośność
- **Szybkie gotowe frazy** do testowania
- **Kontrola odtwarzania**: odtwórz, pauza, wznów, zatrzymaj

### 🌐 Internacjonalizacja
- **7 obsługiwanych języków**: angielski, białoruski, ukraiński, niemiecki, francuski, polski, hiszpański
- **Dynamiczne przełączanie języków**
- **Zlokalizowany interfejs i komunikaty**
- **Wykrywanie języka przeglądarki**

### 🎨 Nowoczesny UI/UX
- **Responsywny design** dla wszystkich rozmiarów urządzeń
- **Piękne gradientowe tła**
- **Płynne animacje i przejścia**
- **Dostępny interfejs**
- **Metodologia BEM** dla organizacji CSS

## 🛠️ Stos technologiczny

- **Framework Frontend**: Vue 3 (Composition API)
- **Język**: TypeScript
- **Narzędzie budowania**: Vite
- **Stylizacja**: SCSS z metodologią BEM
- **Internacjonalizacja**: Vue I18n
- **Testowanie**: Jest z Vue Test Utils
- **Jakość kodu**: ESLint, Stylelint
- **Menedżer pakietów**: Yarn

## 📋 Wymagania wstępne

- Node.js 18+ 
- Menedżer pakietów Yarn
- Nowoczesna przeglądarka z obsługą Web Speech API:
  - Chrome 25+
  - Firefox 44+
  - Safari 14.1+
  - Edge 79+

## 🚀 Szybki start

### Instalacja

```bash
# Sklonuj repozytorium
git clone https://github.com/mr-lexus/Web-Speech-API-Demo.git
cd Web-Speech-API-Demo

# Zainstaluj zależności
yarn install

# Uruchom serwer deweloperski
yarn dev
```

### Dostępne skrypty

```bash
# Rozwój
yarn dev          # Uruchom serwer deweloperski
yarn build        # Zbuduj dla produkcji
yarn preview      # Podgląd buildu produkcyjnego

# Testowanie
yarn test         # Uruchom testy
yarn test:watch   # Uruchom testy w trybie watch
yarn test:ci      # Uruchom testy dla CI

# Jakość kodu
yarn lint:style   # Sprawdź i napraw style
```

## 🏗️ Struktura projektu

```
src/
├── app/                    # Warstwa aplikacji
│   ├── App.vue            # Komponent główny
│   └── styles/            # Style globalne
├── widgets/               # Widżety funkcji
│   ├── speech-recognition/
│   │   ├── ui/           # Komponenty UI
│   │   └── model/        # Logika biznesowa
│   └── speech-synthesis/
│       ├── ui/           # Komponenty UI
│       └── model/        # Logika biznesowa
└── shared/               # Zasoby współdzielone
    ├── i18n/            # Internacjonalizacja
    │   ├── locales/     # Pliki tłumaczeń
    │   └── index.ts     # Konfiguracja i18n
    └── ui/              # Współdzielone komponenty UI
```

## 🌐 Kompatybilność przeglądarek

### Rozpoznawanie mowy
| Przeglądarka | Obsługa | Uwagi |
|--------------|---------|-------|
| Chrome       | ✅ 25+  | Pełna obsługa |
| Firefox      | ❌      | Nie obsługiwane |
| Safari       | ❌      | Nie obsługiwane |
| Edge         | ✅ 79+  | Oparte na Chromium |

### Synteza mowy
| Przeglądarka | Obsługa | Uwagi |
|--------------|---------|-------|
| Chrome       | ✅ 33+  | Pełna obsługa |
| Firefox      | ✅ 49+  | Pełna obsługa |
| Safari       | ✅ 7+   | Pełna obsługa |
| Edge         | ✅ 14+  | Pełna obsługa |

## 🔧 Konfiguracja

### Ustawienia języka

Aplikacja automatycznie wykrywa język przeglądarki i przełącza się na angielski, jeśli wykryty język nie jest obsługiwany. Możesz ręcznie zmienić język używając przełącznika języków w nagłówku.

### Dodawanie nowych języków

1. Utwórz nowy plik tłumaczenia w `src/shared/i18n/locales/`
2. Dodaj język do tablicy `availableLanguages` w `src/shared/i18n/index.ts`
3. Zaimportuj plik tłumaczenia w tym samym pliku indeksu

## 🧪 Testowanie

Projekt zawiera kompleksowe testy dla wszystkich komponentów i composables:

```bash
# Uruchom wszystkie testy
yarn test

# Uruchom testy z pokryciem
yarn test --coverage

# Uruchom konkretny plik testowy
yarn test SpeechRecognitionWidget.test.ts
```

## 🚀 Wdrożenie

### GitHub Pages

1. Zbuduj projekt:
   ```bash
   yarn build
   ```

2. Wdróż na GitHub Pages:
   ```bash
   # Folder dist/ zawiera zbudowaną aplikację
   # Skonfiguruj ustawienia repozytorium do serwowania z folderu dist
   ```

### Inne platformy

Zbudowana aplikacja w folderze `dist/` może być wdrożona na dowolnej usłudze hostingu statycznego:
- Netlify
- Vercel
- Firebase Hosting
- AWS S3
- I wiele innych

## 🤝 Współpraca

Wkład jest mile widziany! Proszę śmiało przesyłać Pull Request. W przypadku większych zmian, proszę najpierw otworzyć issue, aby omówić to, co chcesz zmienić.

### Wytyczne rozwoju

1. **Styl kodu**: Przestrzegaj istniejącego stylu kodu i używaj ESLint/Stylelint
2. **Commity**: Używaj konwencjonalnych wiadomości commitów
3. **Testowanie**: Dodawaj testy dla nowych funkcji
4. **Dokumentacja**: Aktualizuj dokumentację dla znaczących zmian

## 📝 Licencja

Ten projekt jest licencjonowany na licencji MIT - zobacz plik [LICENSE](LICENSE) dla szczegółów.

## 🙏 Podziękowania

- Dokumentacja [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- Zespół [Vue.js](https://vuejs.org/) za wspaniały framework
- [Vue I18n](https://vue-i18n.intlify.dev/) za obsługę internacjonalizacji
- Wszyscy współtwórcy, którzy pomagają ulepszyć ten projekt

## 📞 Wsparcie

Jeśli masz pytania lub potrzebujesz pomocy, proszę:

1. Sprawdź stronę [Issues](https://github.com/mr-lexus/Web-Speech-API-Demo/issues)
2. Utwórz nowe issue, jeśli na twoje pytanie nie ma jeszcze odpowiedzi
3. Podaj jak najwięcej szczegółów o swoim problemie

---

**Stworzone z ❤️ i nowoczesnymi technologiami webowymi**

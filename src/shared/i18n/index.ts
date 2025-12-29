import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import be from './locales/be.json'
import uk from './locales/uk.json'
import de from './locales/de.json'
import fr from './locales/fr.json'
import pl from './locales/pl.json'
import es from './locales/es.json'

const messages = {
  en,
  be,
  uk,
  de,
  fr,
  pl,
  es
}

// Атрымаць мову браўзера або выкарыстаць англійскую па змаўчанні
const getBrowserLanguage = (): string => {
  const browserLang = navigator.language.split('-')[0]
  return Object.keys(messages).includes(browserLang) ? browserLang : 'en'
}

// Атрымаць захаваную мову з localStorage або выкарыстаць мову браўзера
const getSavedLanguage = (): string => {
  const saved = localStorage.getItem('app-language')
  if (saved && Object.keys(messages).includes(saved)) {
    return saved
  }
  return getBrowserLanguage()
}

export const i18n = createI18n({
  legacy: false,
  locale: getSavedLanguage(),
  fallbackLocale: 'en',
  messages,
  globalInjection: true
})

// Функцыя для змены мовы
export const setLanguage = (locale: string) => {
  if (Object.keys(messages).includes(locale)) {
    i18n.global.locale.value = locale
    localStorage.setItem('app-language', locale)
    document.documentElement.lang = locale
  }
}

// Даступныя мовы
export const availableLanguages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'be', name: 'Беларуская', flag: '🇧🇾' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'es', name: 'Español', flag: '🇪🇸' }
]
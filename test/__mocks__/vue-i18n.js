// Mock for vue-i18n to avoid ES module issues in Jest
const translations = {
  'app.title': 'Web Speech API Demo',
  'app.description': 'Демонстрация возможностей Web Speech API',
  'speechRecognition.title': 'Распознавание речи',
  'speechRecognition.startRecording': 'Начать запись',
  'speechRecognition.stopRecording': 'Остановить запись',
  'speechRecognition.clear': 'Очистить',
  'speechRecognition.status.notSupported': 'не поддерживается',
  'speechRecognition.status.ready': 'Готов к записи',
  'speechSynthesis.title': 'Синтез речи',
  'speechSynthesis.speak': 'Говорить',
  'speechSynthesis.pause': 'Пауза',
  'speechSynthesis.resume': 'Продолжить',
  'speechSynthesis.stop': 'Остановить',
  'speechSynthesis.characters': 'символов',
  'speechSynthesis.status.tooLong': 'слишком длинный',
  'speechSynthesis.status.ready': 'Готов к озвучиванию',
  'speechSynthesis.presetTexts.greeting': 'Добро пожаловать',
  'speechSynthesis.rate': 'Скорость: ',
  'speechSynthesis.pitch': 'Высота: ',
  'speechSynthesis.volume': 'Громкость: '
}

const mockT = (key, params) => {
  let translation = translations[key] || key
  if (params) {
    Object.keys(params).forEach(param => {
      translation = translation.replace(`{${param}}`, params[param])
    })
  }
  return translation
}

module.exports = {
  useI18n: () => ({
    t: mockT,
    locale: { value: 'ru' }
  }),
  createI18n: () => ({
    global: {
      t: mockT
    },
    install: (app) => {
      // Add global $t property
      app.config.globalProperties.$t = mockT
    }
  })
}
import { ref, onUnmounted, getCurrentInstance } from 'vue'

export function useSpeechRecognition() {
  const isSupported = ref(false)
  const isRecording = ref(false)
  const transcript = ref('')
  const error = ref('')
  
  let recognition: SpeechRecognition | null = null

  // Праверка падтрымкі браўзера
  const checkSupport = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      isSupported.value = true
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
      recognition = new SpeechRecognitionAPI()
      setupRecognition()
    } else {
      isSupported.value = false
      error.value = 'API распознавания речи не поддерживается в этом браузере'
    }
  }

  // Наладка экзэмпляра распазнавання
  const setupRecognition = () => {
    if (!recognition) return

    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'ru-RU'

    recognition.onstart = () => {
      isRecording.value = true
      error.value = ''
    }

    recognition.onend = () => {
      isRecording.value = false
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = ''
      let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) {
          finalTranscript += result[0].transcript + ' '
        } else {
          interimTranscript += result[0].transcript
        }
      }

      // Абнаўленне транскрыпцыі з канчатковымі вынікамі
      if (finalTranscript) {
        transcript.value += finalTranscript
      }
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      error.value = `Ошибка распознавания речи: ${event.error}`
      isRecording.value = false
      
      // Апрацоўка канкрэтных памылак
      switch (event.error) {
        case 'no-speech':
          error.value = 'Речь не обнаружена. Попробуйте еще раз.'
          break
        case 'audio-capture':
          error.value = 'Микрофон недоступен. Проверьте разрешения.'
          break
        case 'not-allowed':
          error.value = 'Доступ к микрофону запрещен. Разрешите использование микрофона.'
          break
        case 'network':
          error.value = 'Ошибка сети. Проверьте подключение к интернету.'
          break
        default:
          error.value = `Ошибка распознавания речи: ${event.error}`
      }
    }
  }

  // Пачаць запіс
  const startRecording = () => {
    if (!recognition || !isSupported.value) {
      error.value = 'Распознавание речи недоступно'
      return
    }

    try {
      recognition.start()
    } catch (err) {
      error.value = 'Не удалось запустить распознавание речи'
      console.error('Speech recognition start error:', err)
    }
  }

  // Спыніць запіс
  const stopRecording = () => {
    if (recognition && isRecording.value) {
      recognition.stop()
    }
  }

  // Ачысціць транскрыпцыю
  const clearTranscript = () => {
    transcript.value = ''
    error.value = ''
  }

  // Усталяваць мову
  const setLanguage = (lang: string) => {
    if (recognition) {
      recognition.lang = lang
    }
  }

  // Усталяваць бесперапынны рэжым
  const setContinuous = (continuous: boolean) => {
    if (recognition) {
      recognition.continuous = continuous
    }
  }

  // Усталяваць прамежкавыя вынікі
  const setInterimResults = (interim: boolean) => {
    if (recognition) {
      recognition.interimResults = interim
    }
  }

  // Ініцыялізацыя пры мантаванні
  checkSupport()

  // Ачыстка пры размантаванні (толькі калі выклікана ў кантэксце кампанента)
  const instance = getCurrentInstance()
  if (instance) {
    onUnmounted(() => {
      if (recognition && isRecording.value) {
        recognition.stop()
      }
    })
  }

  return {
    isSupported,
    isRecording,
    transcript,
    error,
    startRecording,
    stopRecording,
    clearTranscript,
    setLanguage,
    setContinuous,
    setInterimResults
  }
}
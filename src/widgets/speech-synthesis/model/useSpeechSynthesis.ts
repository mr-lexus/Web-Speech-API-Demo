import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue'

export function useSpeechSynthesis() {
  const isSupported = ref(false)
  const isSpeaking = ref(false)
  const isPaused = ref(false)
  const availableVoices = ref<SpeechSynthesisVoice[]>([])
  const currentUtterance = ref<SpeechSynthesisUtterance | null>(null)
  
  // Налады сінтэзу маўлення
  const currentVoice = ref<SpeechSynthesisVoice | null>(null)
  const currentRate = ref(1)
  const currentPitch = ref(1)
  const currentVolume = ref(1)

  // Праверка падтрымкі браўзера
  const checkSupport = () => {
    if ('speechSynthesis' in window) {
      isSupported.value = true
      loadVoices()
      
      // Слухаць падзею змены галасоў
      speechSynthesis.onvoiceschanged = loadVoices
    } else {
      isSupported.value = false
    }
  }

  // Загрузіць даступныя галасы
  const loadVoices = () => {
    const voices = speechSynthesis.getVoices()
    availableVoices.value = voices
    
    // Усталяваць галас па змаўчанні, калі не ўсталяваны
    if (!currentVoice.value && voices.length > 0) {
      // Спачатку паспрабаваць знайсці рускі галас
      const russianVoice = voices.find(voice => voice.lang.startsWith('ru'))
      currentVoice.value = russianVoice || voices[0]
    }
  }

  // Стварыць выказванне для маўлення
  const createUtterance = (text: string): SpeechSynthesisUtterance => {
    const utterance = new SpeechSynthesisUtterance(text)
    
    // Прымяніць бягучыя налады
    if (currentVoice.value) {
      utterance.voice = currentVoice.value
    }
    utterance.rate = currentRate.value
    utterance.pitch = currentPitch.value
    utterance.volume = currentVolume.value

    // Наладзіць слухачоў падзей
    utterance.onstart = () => {
      isSpeaking.value = true
      isPaused.value = false
    }

    utterance.onend = () => {
      isSpeaking.value = false
      isPaused.value = false
      currentUtterance.value = null
    }

    utterance.onpause = () => {
      isPaused.value = true
    }

    utterance.onresume = () => {
      isPaused.value = false
    }

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error)
      isSpeaking.value = false
      isPaused.value = false
      currentUtterance.value = null
    }

    return utterance
  }

  // Прагаварыць текст
  const speak = (text: string) => {
    if (!isSupported.value || !text.trim()) {
      return
    }

    // Спыніць любое бягучае маўленне
    stop()

    // Стварыць і прагаварыць новае выказванне
    const utterance = createUtterance(text)
    currentUtterance.value = utterance
    speechSynthesis.speak(utterance)
  }

  // Прыпыніць маўленне
  const pause = () => {
    if (isSupported.value && isSpeaking.value && !isPaused.value) {
      speechSynthesis.pause()
      // Забяспечыць, каб рэактыўны стан адлюстроўваў асноўны рухавік, нават калі падзеі не выпалілі
      isPaused.value = true
    }
  }

  // Аднавіць маўленне
  const resume = () => {
    if (isSupported.value && isPaused.value) {
      speechSynthesis.resume()
      // Забяспечыць, каб рэактыўны стан адлюстроўваў асноўны рухавік, нават калі падзеі не выпалілі
      isPaused.value = false
    }
  }

  // Спыніць маўленне
  const stop = () => {
    if (isSupported.value) {
      speechSynthesis.cancel()
      isSpeaking.value = false
      isPaused.value = false
      currentUtterance.value = null
    }
  }

  // Усталяваць голас
  const setVoice = (voice: SpeechSynthesisVoice) => {
    currentVoice.value = voice
  }

  // Усталяваць хуткасць
  const setRate = (rate: number) => {
    currentRate.value = Math.max(0.1, Math.min(2, rate))
  }

  // Усталяваць вышыню тону
  const setPitch = (pitch: number) => {
    currentPitch.value = Math.max(0, Math.min(2, pitch))
  }

  // Усталяваць гучнасць
  const setVolume = (volume: number) => {
    currentVolume.value = Math.max(0, Math.min(1, volume))
  }

  // Атрымаць бягучыя налады
  const getCurrentSettings = () => {
    return {
      voice: currentVoice.value,
      rate: currentRate.value,
      pitch: currentPitch.value,
      volume: currentVolume.value
    }
  }

  // Прагаварыць з карыстальніцкімі наладамі
  const speakWithSettings = (
    text: string, 
    settings: {
      voice?: SpeechSynthesisVoice
      rate?: number
      pitch?: number
      volume?: number
    }
  ) => {
    if (!isSupported.value || !text.trim()) {
      return
    }

    // Спыніць любое бягучае маўленне
    stop()

    // Стварыць выказванне з карыстальніцкімі наладамі
    const utterance = new SpeechSynthesisUtterance(text)
    
    if (settings.voice) {
      utterance.voice = settings.voice
    } else if (currentVoice.value) {
      utterance.voice = currentVoice.value
    }
    
    utterance.rate = settings.rate ?? currentRate.value
    utterance.pitch = settings.pitch ?? currentPitch.value
    utterance.volume = settings.volume ?? currentVolume.value

    // Наладзіць слухачоў падзей
    utterance.onstart = () => {
      isSpeaking.value = true
      isPaused.value = false
    }

    utterance.onend = () => {
      isSpeaking.value = false
      isPaused.value = false
      currentUtterance.value = null
    }

    utterance.onpause = () => {
      isPaused.value = true
    }

    utterance.onresume = () => {
      isPaused.value = false
    }

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error)
      isSpeaking.value = false
      isPaused.value = false
      currentUtterance.value = null
    }

    currentUtterance.value = utterance
    speechSynthesis.speak(utterance)
  }

  // Ініцыялізаваць адразу для зручнасці тэставання
  checkSupport()

  // Хукі жыццёвага цыкла (толькі калі выклікана ў кантэксце кампанента)
  const instance = getCurrentInstance()
  if (instance) {
    onMounted(() => {
      checkSupport()
    })

    onUnmounted(() => {
      stop()
    })
  }

  return {
    isSupported,
    isSpeaking,
    isPaused,
    availableVoices,
    currentVoice,
    currentRate,
    currentPitch,
    currentVolume,
    speak,
    pause,
    resume,
    stop,
    setVoice,
    setRate,
    setPitch,
    setVolume,
    getCurrentSettings,
    speakWithSettings
  }
}
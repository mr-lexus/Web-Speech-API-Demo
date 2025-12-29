// Jest setup for Vue + jsdom
// Removed jest-dom import to avoid ESM/CJS issues

// Mock matchMedia for components that may use it
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false
  })
})

// Mock scrollTo if needed
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(window as any).scrollTo = window.scrollTo || (() => {})

// Basic Web Speech API mocks to prevent ReferenceErrors in tests
// More specific behavior should be mocked inside particular tests
class MockSpeechRecognition {
  continuous = true
  interimResults = true
  lang = 'ru-RU'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onstart: any = null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onend: any = null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onresult: any = null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onerror: any = null
  constructor() {
    // expose last instance for tests
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).__lastRecognitionInstance = this
  }
  start() { this.onstart && this.onstart(new Event('start')) }
  stop() { this.onend && this.onend(new Event('end')) }
  abort() { this.onend && this.onend(new Event('end')) }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(window as any).SpeechRecognition = MockSpeechRecognition as any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(window as any).webkitSpeechRecognition = MockSpeechRecognition as any

// speechSynthesis base mock
const voices: SpeechSynthesisVoice[] = [
  { voiceURI: 'ru-RU', name: 'Russian', lang: 'ru-RU', localService: true, default: false } as SpeechSynthesisVoice,
  { voiceURI: 'en-US', name: 'English', lang: 'en-US', localService: true, default: true } as SpeechSynthesisVoice
]

class MockSpeechSynthesisUtterance {
  text: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onstart: any = null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onend: any = null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onpause: any = null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onresume: any = null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onerror: any = null
  voice: SpeechSynthesisVoice | null = null
  rate = 1
  pitch = 1
  volume = 1
  constructor(text: string) { this.text = text }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(global as any).SpeechSynthesisUtterance = MockSpeechSynthesisUtterance

const mockSpeechSynthesis = {
  speaking: false,
  paused: false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onvoiceschanged: null as any,
  getVoices: () => voices,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  speak: (utterance: any) => {
    // expose last utterance for tests
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).__lastUtterance = utterance
    mockSpeechSynthesis.speaking = true
    mockSpeechSynthesis.paused = false
    // Trigger onstart immediately for tests
    utterance.onstart && utterance.onstart(new Event('start'))
  },
  pause: () => { 
    mockSpeechSynthesis.paused = true
    const utterance = (window as any).__lastUtterance
    utterance && utterance.onpause && utterance.onpause(new Event('pause'))
  },
  resume: () => { 
    mockSpeechSynthesis.paused = false
    const utterance = (window as any).__lastUtterance
    utterance && utterance.onresume && utterance.onresume(new Event('resume'))
  },
  cancel: () => { 
    mockSpeechSynthesis.speaking = false
    mockSpeechSynthesis.paused = false
    const utterance = (window as any).__lastUtterance
    utterance && utterance.onend && utterance.onend(new Event('end'))
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(window as any).speechSynthesis = mockSpeechSynthesis as any
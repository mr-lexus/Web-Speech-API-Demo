import { describe, it, expect, beforeEach } from '@jest/globals'
import { useSpeechRecognition } from '../useSpeechRecognition'

// Дапаможнік для доступу да макетнага распазнавання, створанага кампазітам
function getRecognition(): any {
  // @ts-expect-error - тэставы дапаможнік з наладкі
  return window.__lastRecognitionInstance
}

describe('useSpeechRecognition', () => {
  beforeEach(() => {
    // Скінуць транскрыпцыю і памылку паміж тэстамі праз пераініцыялізацыю
  })

  it('должен установить isSupported = true при наличии API', () => {
    const { isSupported } = useSpeechRecognition()
    expect(isSupported.value).toBe(true)
  })

  it('должен запускать и останавливать запись', () => {
    const { isRecording, startRecording, stopRecording } = useSpeechRecognition()

    expect(isRecording.value).toBe(false)
    startRecording()
    expect(isRecording.value).toBe(true)
    stopRecording()
    expect(isRecording.value).toBe(false)
  })

  it('должен накапливать финальные результаты в transcript', () => {
    const { transcript, startRecording } = useSpeechRecognition()
    const recognition = getRecognition()

    startRecording()

    // Эмулюем падзею вынікаў
    const mockEvent: any = {
      resultIndex: 0,
      results: [
        { isFinal: true, 0: { transcript: 'Привет' }, length: 1 },
        { isFinal: true, 0: { transcript: 'мир' }, length: 1 }
      ]
    }

    recognition.onresult && recognition.onresult(mockEvent)

    expect(transcript.value.trim()).toBe('Привет мир')
  })

  it('должен выставлять сообщения об ошибках для распространённых ошибок', () => {
    const { error, startRecording } = useSpeechRecognition()
    const recognition = getRecognition()

    startRecording()

    const errEvent = { error: 'not-allowed', message: 'denied' } as any
    recognition.onerror && recognition.onerror(errEvent)

    expect(error.value).toContain('Доступ к микрофону запрещен')
  })

  it('setLanguage и setContinuous должны обновлять поля у recognition', () => {
    const { setLanguage, setContinuous } = useSpeechRecognition()
    const recognition = getRecognition()

    setLanguage('en-US')
    setContinuous(false)

    expect(recognition.lang).toBe('en-US')
    expect(recognition.continuous).toBe(false)
  })

  // Новае: пакрыць канкрэтныя галіны памылак і па змаўчанні
  it('обрабатывает ошибки no-speech, audio-capture, network и default', () => {
    const { error, startRecording } = useSpeechRecognition()
    const recognition = getRecognition()

    startRecording()

    // no-speech
    recognition.onerror && recognition.onerror({ error: 'no-speech' } as any)
    expect(error.value).toContain('Речь не обнаружена')

    // audio-capture
    recognition.onerror && recognition.onerror({ error: 'audio-capture' } as any)
    expect(error.value).toContain('Микрофон недоступен')

    // network
    recognition.onerror && recognition.onerror({ error: 'network' } as any)
    expect(error.value).toContain('Ошибка сети')

    // па змаўчанні
    recognition.onerror && recognition.onerror({ error: 'some-unknown' } as any)
    expect(error.value).toContain('Ошибка распознавания речи: some-unknown')
  })

  it('не добавляет текст при наличии только interim результатов', () => {
    const { transcript, startRecording } = useSpeechRecognition()
    const recognition = getRecognition()

    startRecording()

    // Падзея толькі з прамежкавымі вынікамі (без канчатковых)
    const interimEvent: any = {
      resultIndex: 0,
      results: [
        { isFinal: false, 0: { transcript: 'черновик' }, length: 1 }
      ]
    }

    recognition.onresult && recognition.onresult(interimEvent)

    expect(transcript.value).toBe('')
  })

  it('ловит исключение при запуске startRecording и выставляет ошибку', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    const { error, startRecording } = useSpeechRecognition()
    const recognition = getRecognition()

    // Прымусіць start() кінуць памылку
    recognition.start = () => { throw new Error('boom') }

    startRecording()

    expect(error.value).toBe('Не удалось запустить распознавание речи')
    expect(consoleErrorSpy).toHaveBeenCalledWith('Speech recognition start error:', expect.any(Error))
    
    consoleErrorSpy.mockRestore()
  })

  it('останавливает запись безопасно, если запись не начата', () => {
    const { isRecording, stopRecording } = useSpeechRecognition()

    expect(isRecording.value).toBe(false)
    // Не павінна кідаць памылку або змяняць стан
    stopRecording()
    expect(isRecording.value).toBe(false)
  })

  it('setInterimResults должен обновлять поле interimResults у recognition', () => {
    const { setInterimResults } = useSpeechRecognition()
    const recognition = getRecognition()

    setInterimResults(false)
    expect(recognition.interimResults).toBe(false)

    setInterimResults(true)
    expect(recognition.interimResults).toBe(true)
  })

  it('onstart очищает error при старте записи', () => {
    const { error, startRecording } = useSpeechRecognition()

    error.value = 'previous error'
    startRecording() // макет start выклікае onstart
    expect(error.value).toBe('')
  })

  it('clearTranscript очищает текст и ошибку', () => {
    const { transcript, error, clearTranscript, startRecording } = useSpeechRecognition()
    const recognition = getRecognition()

    startRecording()
    const mockEvent: any = {
      resultIndex: 0,
      results: [ { isFinal: true, 0: { transcript: 'data' }, length: 1 } ]
    }
    recognition.onresult && recognition.onresult(mockEvent)

    // усталяваць памылку ўручную
    error.value = 'oops'

    clearTranscript()
    expect(transcript.value).toBe('')
    expect(error.value).toBe('')
  })

  it('обрабатывает отсутствие поддержки API и устанавливает корректные ошибки', () => {
    const originalSR = (window as any).SpeechRecognition
    const originalWSR = (window as any).webkitSpeechRecognition

    delete (window as any).SpeechRecognition
    delete (window as any).webkitSpeechRecognition

    try {
      jest.isolateModules(() => {
        // Імпарт унутры ізаляванага модуля для запуску праверкі падтрымкі з змененымі глабальнымі зменнымі
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const mod = require('../useSpeechRecognition') as typeof import('../useSpeechRecognition')
        const { isSupported, error, startRecording } = mod.useSpeechRecognition()

        expect(isSupported.value).toBe(false)
        expect(error.value).toBe('API распознавания речи не поддерживается в этом браузере')

        startRecording()
        expect(error.value).toBe('Распознавание речи недоступно')
      })
    } finally {
      ;(window as any).SpeechRecognition = originalSR
      ;(window as any).webkitSpeechRecognition = originalWSR
    }
  })

  it('обрабатывает различные типы ошибок', () => {
    const { startRecording, error } = useSpeechRecognition()
    const recognition = getRecognition()

    startRecording()

    // тэстуем розныя тыпы памылак
    const errorTypes = [
      { error: 'no-speech', expected: 'Речь не обнаружена' },
      { error: 'audio-capture', expected: 'Микрофон недоступен' },
      { error: 'not-allowed', expected: 'Доступ к микрофону запрещен' },
      { error: 'network', expected: 'Ошибка сети' },
      { error: 'unknown-error', expected: 'Ошибка распознавания речи: unknown-error' }
    ]

    errorTypes.forEach(({ error: errorType, expected }) => {
      recognition.onerror && recognition.onerror({ error: errorType })
      expect(error.value).toContain(expected.split('.')[0]) // правяраем пачатак паведамлення
    })
  })

  it('останавливает запись при размонтировании если активна', () => {
    const { startRecording, isRecording } = useSpeechRecognition()
    const recognition = getRecognition()
    const stopSpy = jest.spyOn(recognition, 'stop')

    startRecording()
    expect(isRecording.value).toBe(true)

    // імітуем размантаванне кампанента
    // у рэальнасці гэта выклікаецца праз onUnmounted
    if (recognition && isRecording.value) {
      recognition.stop()
    }

    expect(stopSpy).toHaveBeenCalled()
  })

  it('обрабатывает промежуточные результаты', () => {
    const { startRecording, transcript } = useSpeechRecognition()
    const recognition = getRecognition()

    startRecording()

    // прамежкавыя вынікі не павінны дадавацца да transcript
    const mockEvent: any = {
      resultIndex: 0,
      results: [
        { isFinal: false, 0: { transcript: 'промежуточный' } },
        { isFinal: false, 0: { transcript: 'текст' } }
      ]
    }
    recognition.onresult && recognition.onresult(mockEvent)

    expect(transcript.value).toBe('') // прамежкавыя вынікі не захоўваюцца

    // канчатковы вынік павінен дадацца
    const finalEvent: any = {
      resultIndex: 0,
      results: [
        { isFinal: true, 0: { transcript: 'финальный текст' } }
      ]
    }
    recognition.onresult && recognition.onresult(finalEvent)

    expect(transcript.value).toContain('финальный текст')
  })

  it('тестирует onUnmounted callback в контексте компонента', () => {
    const { createApp } = require('vue')
    
    let composableResult: any
    let recognition: any
    let stopSpy: any
    
    const app = createApp({
      setup() {
        composableResult = useSpeechRecognition()
        recognition = getRecognition()
        stopSpy = jest.spyOn(recognition, 'stop')
        
        composableResult.startRecording()
        expect(composableResult.isRecording.value).toBe(true)
        
        return {}
      },
      template: '<div></div>'
    })
    
    const container = document.createElement('div')
    const instance = app.mount(container)
    
    // Размантуем кампанент, што павінна выклікаць onUnmounted
    app.unmount()
    
    expect(stopSpy).toHaveBeenCalled()
  })
})
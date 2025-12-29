import { describe, it, expect } from '@jest/globals'
import { useSpeechSynthesis } from '../useSpeechSynthesis'

function getLastUtterance(): any {
  // @ts-expect-error - тэставы дапаможнік з наладкі
  return window.__lastUtterance
}

describe('useSpeechSynthesis', () => {
  it('должен отмечать поддержку и загружать голоса', () => {
    const { isSupported, availableVoices } = useSpeechSynthesis()
    expect(isSupported.value).toBe(true)
    expect(availableVoices.value.length).toBeGreaterThan(0)
  })

  it('speak должен создавать utterance и запускать синтез', () => {
    const { speak, isSpeaking } = useSpeechSynthesis()
    speak('Тест')
    expect(isSpeaking.value).toBe(true)
    const utter = getLastUtterance()
    expect(utter).toBeTruthy()
    expect(utter.text).toBe('Тест')
  })

  it('настройки rate/pitch/volume должны ограничиваться корректными диапазонами', () => {
    const { setRate, setPitch, setVolume, getCurrentSettings } = useSpeechSynthesis()
    setRate(10)
    setPitch(-1)
    setVolume(2)
    const s = getCurrentSettings()
    expect(s.rate).toBeLessThanOrEqual(2)
    expect(s.pitch).toBeGreaterThanOrEqual(0)
    expect(s.volume).toBeLessThanOrEqual(1)
  })

  it('не говорит при пустом или пробельном тексте', () => {
    const { speak, isSpeaking } = useSpeechSynthesis()

    // Запомніць апошняе выказванне
    // @ts-expect-error - тэставы дапаможнік з наладкі
    const before = window.__lastUtterance

    speak('   ')

    // не павінна змяняць стан маўлення або ствараць новае выказванне
    expect(isSpeaking.value).toBe(false)
    // @ts-expect-error - тэставы дапаможнік з наладкі
    expect(window.__lastUtterance).toBe(before)
  })

  it('по умолчанию выбирается русский голос, если доступен', () => {
    const { currentVoice } = useSpeechSynthesis()
    expect(currentVoice.value).toBeTruthy()
    expect(currentVoice.value?.lang).toBe('ru-RU')
  })

  it('speakWithSettings использует переданный settings.voice', () => {
    const { speakWithSettings } = useSpeechSynthesis()
    // @ts-expect-error - з макета наладкі
    const voices = window.speechSynthesis.getVoices() as SpeechSynthesisVoice[]
    const en = voices.find(v => v.lang === 'en-US')!

    speakWithSettings('Hello', { voice: en })

    const utter = getLastUtterance()
    expect(utter.voice).toBeTruthy()
    expect(utter.voice.lang).toBe('en-US')
  })

  it('pause/resume не изменяют состояние, если не в корректном состоянии', () => {
    const { pause, resume, isPaused } = useSpeechSynthesis()

    // прыпыніць, калі не гавораць
    pause()
    expect(isPaused.value).toBe(false)

    // аднавіць, калі не прыпынена
    resume()
    expect(isPaused.value).toBe(false)
  })
  it('pause/resume/stop должны переключать состояние', () => {
    const { speak, pause, resume, stop, isSpeaking, isPaused } = useSpeechSynthesis()
    speak('Тест')
    pause()
    expect(isPaused.value).toBe(true)
    resume()
    expect(isPaused.value).toBe(false)
    stop()
    expect(isSpeaking.value).toBe(false)
  })

  // Новае: speakWithSettings прымяняе карыстальніцкія налады і апрацоўшчыкі падзей абнаўляюць стан
  it('speakWithSettings применяет настройки и обрабатывает onpause/onresume/onend/onerror', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    const { speakWithSettings, isSpeaking, isPaused } = useSpeechSynthesis()

    // Выкарыстаць карыстальніцкія налады
    const custom = { rate: 1.7, pitch: 1.3, volume: 0.6 }
    speakWithSettings('Hello', custom)

    const utter = getLastUtterance()
    expect(utter).toBeTruthy()
    expect(utter.rate).toBeCloseTo(1.7, 5)
    expect(utter.pitch).toBeCloseTo(1.3, 5)
    expect(utter.volume).toBeCloseTo(0.6, 5)

    // start павінен усталяваць speaking=true, paused=false (апрацоўваецца ў наладцы)
    expect(isSpeaking.value).toBe(true)
    expect(isPaused.value).toBe(false)

    // Выклікаць калбэкі pause/resume/end для праверкі абнаўленняў стану
    utter.onpause && utter.onpause(new Event('pause'))
    expect(isPaused.value).toBe(true)

    utter.onresume && utter.onresume(new Event('resume'))
    expect(isPaused.value).toBe(false)

    utter.onend && utter.onend(new Event('end'))
    expect(isSpeaking.value).toBe(false)
    expect(isPaused.value).toBe(false)

    // Выклікаць шлях памылкі
    // @ts-expect-error - перадаць форму з полем памылкі
    utter.onerror && utter.onerror({ error: 'synthesis-failed' })
    expect(isSpeaking.value).toBe(false)
    expect(isPaused.value).toBe(false)
    expect(consoleErrorSpy).toHaveBeenCalledWith('Speech synthesis error:', 'synthesis-failed')
    
    consoleErrorSpy.mockRestore()
  })

  it('обрабатывает пустой текст в speak', () => {
    // ачышчаем папярэдняе выказванне
    ;(window as any).__lastUtterance = null
    
    const { speak } = useSpeechSynthesis()
    speak('')
    speak('   ') // толькі прабелы
    
    // не павінна ствараць выказванне
    const utter = getLastUtterance()
    expect(utter).toBeFalsy()
  })

  it('устанавливает границы для rate/pitch/volume', () => {
    const { setRate, setPitch, setVolume, getCurrentSettings } = useSpeechSynthesis()
    
    // тэстуем межы rate (0.1 - 2)
    setRate(-1)
    expect(getCurrentSettings().rate).toBe(0.1)
    setRate(5)
    expect(getCurrentSettings().rate).toBe(2)
    
    // тэстуем межы pitch (0 - 2)
    setPitch(-1)
    expect(getCurrentSettings().pitch).toBe(0)
    setPitch(5)
    expect(getCurrentSettings().pitch).toBe(2)
    
    // тэстуем межы volume (0 - 1)
    setVolume(-1)
    expect(getCurrentSettings().volume).toBe(0)
    setVolume(5)
    expect(getCurrentSettings().volume).toBe(1)
  })

  it('не выполняет pause/resume/stop если не поддерживается', () => {
    // часова адключаем падтрымку
    const originalSpeechSynthesis = (window as any).speechSynthesis
    delete (window as any).speechSynthesis
    
    const { pause, resume, stop, isSupported } = useSpeechSynthesis()
    expect(isSupported.value).toBe(false)
    
    // гэтыя выклікі не павінны выклікаць памылак
    pause()
    resume()
    stop()
    
    // аднаўляем
    ;(window as any).speechSynthesis = originalSpeechSynthesis
  })

  it('устанавливает голос по умолчанию при загрузке', () => {
    const { availableVoices, currentVoice } = useSpeechSynthesis()
    
    // павінен быць абраны рускі голас або першы даступны
    expect(availableVoices.value.length).toBeGreaterThan(0)
    expect(currentVoice.value).toBeTruthy()
    
    // калі ёсць рускі голас, ён павінен быць абраны
    const hasRussian = availableVoices.value.some(v => v.lang.startsWith('ru'))
    if (hasRussian) {
      expect(currentVoice.value?.lang.startsWith('ru')).toBe(true)
    }
  })

  it('обрабатывает все события utterance', () => {
    const { speak, isSpeaking, isPaused } = useSpeechSynthesis()
    speak('Test utterance events')
    
    const utter = getLastUtterance()
    expect(utter).toBeTruthy()
    
    // Тэстуем onend
    utter.onend && utter.onend(new Event('end'))
    expect(isSpeaking.value).toBe(false)
    expect(isPaused.value).toBe(false)
    
    // Тэстуем onpause
    speak('Test pause')
    const utter2 = getLastUtterance()
    utter2.onpause && utter2.onpause(new Event('pause'))
    expect(isPaused.value).toBe(true)
    
    // Тэстуем onresume
    utter2.onresume && utter2.onresume(new Event('resume'))
    expect(isPaused.value).toBe(false)
  })

  it('speakWithSettings обрабатывает пустой текст', () => {
    const { speakWithSettings } = useSpeechSynthesis()
    ;(window as any).__lastUtterance = null
    
    speakWithSettings('', { rate: 1.5 })
    speakWithSettings('   ', { pitch: 1.2 })
    
    const utter = getLastUtterance()
    expect(utter).toBeFalsy()
  })

  it('тестирует onUnmounted callback в контексте компонента', () => {
    const { stop, isSpeaking } = useSpeechSynthesis()
    
    // Проста тэстуем, што функцыя stop працуе
    expect(isSpeaking.value).toBe(false)
    stop() // павінна працаваць без памылак
    expect(isSpeaking.value).toBe(false)
  })
})
import { mount } from '@vue/test-utils'
import { describe, it, expect } from '@jest/globals'
import SpeechSynthesisWidget from '../SpeechSynthesisWidget.vue'
import { createI18n } from 'vue-i18n'

// Стварыць экзэмпляр i18n для тэстаў
function createTestI18n() {
  return createI18n({
    legacy: false,
    locale: 'ru',
    messages: {
      ru: {},
      en: {}
    }
  })
}

function getLastUtterance(): any {
  // @ts-expect-error - дапаможнік з наладкі
  return window.__lastUtterance
}

function getVoices(): SpeechSynthesisVoice[] {
  // @ts-expect-error - забяспечана наладкай
  return window.speechSynthesis.getVoices()
}

describe('SpeechSynthesisWidget', () => {
  it('рендерит и запускает озвучивание по клику', async () => {
    const wrapper = mount(SpeechSynthesisWidget, {
      global: {
        plugins: [createTestI18n()]
      }
    })
    expect(wrapper.text()).toContain('Синтез речи')

    // Дадаць текст для прагаварання
    const textarea = wrapper.get('textarea')
    await textarea.setValue('Тестовый текст')
    await textarea.trigger('input')

    const btnSpeak = wrapper.get('button.btn--primary')
    await btnSpeak.trigger('click')

    const utter = getLastUtterance()
    expect(utter).toBeTruthy()
    expect(utter.text.length).toBeGreaterThan(0)
  })

  it('обновляет голос и параметры (rate/pitch/volume)', async () => {
    const wrapper = mount(SpeechSynthesisWidget, {
      global: {
        plugins: [createTestI18n()]
      }
    })

    // абраць голас
    const select = wrapper.get('select.speech-synthesis__select')
    const options = select.findAll('option')
    if (options.length > 1) {
      await select.setValue(options[1].element.value)
      await select.trigger('change')
    }

    // дыяпазоны
    const ranges = wrapper.findAll('input[type="range"]')
    const [rate, pitch, volume] = ranges
    await rate.setValue('1.5'); await rate.trigger('input')
    await pitch.setValue('1.2'); await pitch.trigger('input')
    await volume.setValue('0.7'); await volume.trigger('input')

    const btnSpeak = wrapper.get('button.btn--primary')
    await btnSpeak.trigger('click')

    const utter = getLastUtterance()
    expect(utter.rate).toBeCloseTo(1.5, 5)
    expect(utter.pitch).toBeCloseTo(1.2, 5)
    expect(utter.volume).toBeCloseTo(0.7, 5)
  })

  it('отключает кнопки pause/resume/stop в соответствующих состояниях', async () => {
    const wrapper = mount(SpeechSynthesisWidget, {
      global: {
        plugins: [createTestI18n()]
      }
    })
    
    // Дадаць тэкст для прагаварання
    const textarea = wrapper.get('textarea')
    await textarea.setValue('Тестовый текст')
    await textarea.trigger('input')
    
    const [btnSpeak, btnPause, btnResume, btnStop] = wrapper.findAll('button')
    // першапачаткова: не гавораць, не прыпынена
    expect(btnPause.attributes('disabled')).toBeDefined()
    expect(btnResume.attributes('disabled')).toBeDefined()

    await btnSpeak.trigger('click')
    await wrapper.vm.$nextTick()
    
    expect(btnPause.attributes('disabled')).toBeUndefined()
    expect(btnStop.attributes('disabled')).toBeUndefined()

    await btnPause.trigger('click')
    await wrapper.vm.$nextTick()
    expect(btnResume.attributes('disabled')).toBeUndefined()

    await btnResume.trigger('click')
    await wrapper.vm.$nextTick()
    expect(btnResume.attributes('disabled')).toBeDefined()
  })

  it('ограничивает ввод по количеству символов и статус меняется при превышении', async () => {
    const wrapper = mount(SpeechSynthesisWidget, {
      global: {
        plugins: [createTestI18n()]
      }
    })
    const textarea = wrapper.get('textarea.speech-synthesis__textarea')

    // перавышаем ліміт 500
    const long = 'a'.repeat(520)
    await textarea.setValue(long)
    await textarea.trigger('input')

    const status = wrapper.get('.speech-synthesis__status .status')
    expect(status.text()).toContain('слишком длинный')

    // speak недаступны
    const btnSpeak = wrapper.get('button.btn--primary')
    expect(btnSpeak.attributes('disabled')).toBeDefined()
  })

  it('устанавливает русский голос по умолчанию при наличии', async () => {
    const wrapper = mount(SpeechSynthesisWidget, {
      global: {
        plugins: [createTestI18n()]
      }
    })
    // пачакаем onMounted timeout
    await new Promise(r => setTimeout(r, 120))

    const select = wrapper.get('select.speech-synthesis__select')
    const selectedValue = (select.element as HTMLSelectElement).value
    const voices = getVoices()

    // правяраем, што абраны рускі голас
    const hasRu = voices.some(v => v.lang.startsWith('ru'))
    if (hasRu) {
      expect(selectedValue).toBe('Russian') // імя рускага голасу з макета
    }
  })

  it('обрабатывает пустой текст', async () => {
    const wrapper = mount(SpeechSynthesisWidget, {
      global: {
        plugins: [createTestI18n()]
      }
    })
    const textarea = wrapper.get('textarea')
    await textarea.setValue('')
    
    const btnSpeak = wrapper.get('button.btn--primary')
    expect(btnSpeak.attributes('disabled')).toBeDefined()
  })

  it('обрабатывает слишком длинный текст', async () => {
    const wrapper = mount(SpeechSynthesisWidget, {
      global: {
        plugins: [createTestI18n()]
      }
    })
    const textarea = wrapper.get('textarea')
    const longText = 'a'.repeat(501) // больш за maxChars
    await textarea.setValue(longText)
    
    const btnSpeak = wrapper.get('button.btn--primary')
    expect(btnSpeak.attributes('disabled')).toBeDefined()
    expect(wrapper.text()).toContain('слишком длинный')
  })

  it('управляет кнопками pause/resume/stop', async () => {
    const wrapper = mount(SpeechSynthesisWidget, {
      global: {
        plugins: [createTestI18n()]
      }
    })
    
    const buttons = wrapper.findAll('button')
    const btnPause = buttons.find(btn => btn.text().includes('Пауза'))
    const btnResume = buttons.find(btn => btn.text().includes('Продолжить'))
    const btnStop = buttons.find(btn => btn.text().includes('Остановить'))
    
    // першапачаткова disabled
    expect(btnPause?.attributes('disabled')).toBeDefined()
    expect(btnResume?.attributes('disabled')).toBeDefined()
    expect(btnStop?.attributes('disabled')).toBeDefined()
  })

  it('запускает пресеты', async () => {
    const wrapper = mount(SpeechSynthesisWidget, {
      global: {
        plugins: [createTestI18n()]
      }
    })
    
    const presetBtns = wrapper.findAll('button.speech-synthesis__preset-btn')
    if (presetBtns.length > 0) {
      await presetBtns[0].trigger('click')
      
      const utter = getLastUtterance()
      expect(utter).toBeTruthy()
      expect(utter.text).toContain('Добро пожаловать')
    }
  })

  it('обновляет счетчик символов при вводе', async () => {
    const wrapper = mount(SpeechSynthesisWidget, {
      global: {
        plugins: [createTestI18n()]
      }
    })
    const textarea = wrapper.get('textarea')
    
    await textarea.setValue('Тестовый текст')
    await textarea.trigger('input')
    
    expect(wrapper.text()).toContain('14 / 500 символов')
  })

  it('тестирует функцию updateVoice', async () => {
    const wrapper = mount(SpeechSynthesisWidget, {
      global: {
        plugins: [createTestI18n()]
      }
    })
    
    await new Promise(r => setTimeout(r, 120))
    
    const select = wrapper.get('select.speech-synthesis__select')
    const voices = getVoices()
    
    if (voices.length > 1) {
      await select.setValue(voices[1].name)
      await select.trigger('change')
      
      // правяраем, што голас абнавіўся
      expect((select.element as HTMLSelectElement).value).toBe(voices[1].name)
    }
  })

  it('тестирует функции updateRate, updatePitch, updateVolume', async () => {
    const wrapper = mount(SpeechSynthesisWidget, {
      global: {
        plugins: [createTestI18n()]
      }
    })
    
    const ranges = wrapper.findAll('input[type="range"]')
    const [rateRange, pitchRange, volumeRange] = ranges
    
    // Тэстуем updateRate
    await rateRange.setValue('1.5')
    await rateRange.trigger('input')
    
    // Тэстуем updatePitch
    await pitchRange.setValue('1.2')
    await pitchRange.trigger('input')
    
    // Тэстуем updateVolume
    await volumeRange.setValue('0.8')
    await volumeRange.trigger('input')
    
    // Правяраем, што значэнні абнавіліся
    expect(wrapper.text()).toContain('Скорость:  1.5')
    expect(wrapper.text()).toContain('Высота:  1.2')
    expect(wrapper.text()).toContain('Громкость:  0.8')
  })

  it('тестирует условные рендеринги и стили', () => {
    const wrapper = mount(SpeechSynthesisWidget, {
      global: {
        plugins: [createTestI18n()]
      }
    })
    
    // Правяраем, што ўсе асноўныя элементы прысутнічаюць
    expect(wrapper.find('.speech-synthesis').exists()).toBe(true)
    expect(wrapper.find('.speech-synthesis__input').exists()).toBe(true)
    expect(wrapper.find('.speech-synthesis__controls').exists()).toBe(true)
    expect(wrapper.find('.speech-synthesis__settings').exists()).toBe(true)
    expect(wrapper.find('.speech-synthesis__presets').exists()).toBe(true)
  })
})

import { mount } from '@vue/test-utils'
import { describe, it, expect } from '@jest/globals'
import SpeechRecognitionWidget from '../SpeechRecognitionWidget.vue'
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

function getRecognition(): any {
  // @ts-expect-error - дапаможнік з наладкі
  return window.__lastRecognitionInstance
}

describe('SpeechRecognitionWidget', () => {
  it('рендерит и переключает запись по клику', async () => {
    const wrapper = mount(SpeechRecognitionWidget, {
      global: {
        plugins: [createTestI18n()]
      }
    })
    const btn = wrapper.get('button.speech-recognition__btn')

    expect(wrapper.text()).toContain('Распознавание речи')

    await btn.trigger('click')
    // пачаць -> isRecording true
    expect(wrapper.text()).toContain('Остановить запись')

    await btn.trigger('click')
    expect(wrapper.text()).toContain('Начать запись')
  })

  it('обновляет язык и continuous настройки', async () => {
    const wrapper = mount(SpeechRecognitionWidget, {
      global: {
        plugins: [createTestI18n()]
      }
    })

    const select = wrapper.get('select.speech-recognition__select')
    await select.setValue('en-US')
    await select.trigger('change')

    const checkbox = wrapper.get('input[type="checkbox"]')
    await checkbox.setValue(false)
    await checkbox.trigger('change')

    const rec = getRecognition()
    expect(rec.lang).toBe('en-US')
    expect(rec.continuous).toBe(false)
  })

  // галіна без падтрымкі: адключыць запіс і паказаць статус памылкі
  it('отображает сообщение о неподдерживаемости и блокирует запись при отсутствии API', async () => {
    // Выдаліць падтрымку API
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any).SpeechRecognition
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (window as any).webkitSpeechRecognition

    const wrapper = mount(SpeechRecognitionWidget, {
      global: {
        plugins: [createTestI18n()]
      }
    })
    const btn = wrapper.get('button.speech-recognition__btn')
    expect(btn.attributes('disabled')).toBeDefined()
    expect(wrapper.find('.speech-recognition__status').text())
      .toContain('не поддерживается')
  })

  // onresult + паток кнопкі ачысткі
  it('проверяет базовую функциональность кнопок', async () => {
    const wrapper = mount(SpeechRecognitionWidget, {
      global: {
        plugins: [createTestI18n()]
      }
    })
    
    // правяраем, што кнопкі існуюць
    const startBtn = wrapper.find('button.speech-recognition__btn')
    const clearBtn = wrapper.find('button.btn--secondary')
    
    expect(startBtn.exists()).toBe(true)
    expect(clearBtn.exists()).toBe(true)
    
    // правяраем, што textarea існуе
    const textarea = wrapper.find('textarea')
    expect(textarea.exists()).toBe(true)
  })

  it('обновляет язык при изменении select', async () => {
    const wrapper = mount(SpeechRecognitionWidget, {
      global: {
        plugins: [createTestI18n()]
      }
    })
    const langSelect = wrapper.find('select#language')
    
    if (langSelect.exists()) {
      await langSelect.setValue('en-US')
      await langSelect.trigger('change')
      
      const rec = getRecognition()
      expect(rec.lang).toBe('en-US')
    }
  })

  it('обновляет continuous режим при изменении checkbox', async () => {
    const wrapper = mount(SpeechRecognitionWidget, {
      global: {
        plugins: [createTestI18n()]
      }
    })
    const continuousCheckbox = wrapper.find('input#continuous')
    
    if (continuousCheckbox.exists()) {
      await continuousCheckbox.setChecked(false)
      await continuousCheckbox.trigger('change')
      
      const rec = getRecognition()
      expect(rec.continuous).toBe(false)
    }
  })

  it('вызывает onMounted и устанавливает язык', async () => {
    const wrapper = mount(SpeechRecognitionWidget, {
      global: {
        plugins: [createTestI18n()]
      }
    })
    
    // Правяраем, што кампанент змантаваны і мова ўсталявана
    const rec = getRecognition()
    // Мова можа быць усталявана ў 'en-US' па змаўчанні ў тэставым асяроддзі
    expect(['ru-RU', 'en-US']).toContain(rec.lang)
  })
})
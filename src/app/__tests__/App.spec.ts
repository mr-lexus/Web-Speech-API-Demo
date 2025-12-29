import { describe, it, expect } from '@jest/globals'
import { mount } from '@vue/test-utils'
import App from '@/app/App.vue'
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

describe('App.vue', () => {
  it('рендерит заголовок и оба виджета', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [createTestI18n()]
      }
    })
    // Загаловак
    expect(wrapper.text()).toContain('Web Speech API Demo')
    // Загалоўкі віджэтаў
    expect(wrapper.text()).toContain('Распознавание речи')
    expect(wrapper.text()).toContain('Синтез речи')
    // BEM кантэйнеры існуюць
    expect(wrapper.findAll('.app__widget').length).toBe(2)
  })

  it('содержит правильную структуру элементов', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [createTestI18n()]
      }
    })
    
    // Правяраем асноўныя элементы структуры
    expect(wrapper.find('.app').exists()).toBe(true)
    expect(wrapper.find('.app__header').exists()).toBe(true)
    expect(wrapper.find('.app__title').exists()).toBe(true)
    expect(wrapper.find('.app__description').exists()).toBe(true)
    expect(wrapper.find('.app__main').exists()).toBe(true)
    
    // Правяраем текст апісання
    expect(wrapper.find('.app__description').text()).toContain('Демонстрация возможностей Web Speech API')
  })
})
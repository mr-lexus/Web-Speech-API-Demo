<template>
  <div class="language-switcher">
    <label class="language-switcher__label">
      {{ $t('common.language') }}:
    </label>
    <select 
      class="language-switcher__select"
      :value="currentLanguage"
      @change="handleLanguageChange"
    >
      <option 
        v-for="lang in availableLanguages" 
        :key="lang.code"
        :value="lang.code"
      >
        {{ lang.flag }} {{ lang.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { availableLanguages, setLanguage } from '../i18n'

const { locale } = useI18n()

const currentLanguage = computed(() => locale.value)

const handleLanguageChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  setLanguage(target.value)
}
</script>

<style lang="scss" scoped>
.language-switcher {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &__label {
    font-size: 0.9rem;
    font-weight: 500;
    color: white;
    white-space: nowrap;
  }

  &__select {
    padding: 0.25rem 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
    backdrop-filter: blur(10px);

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
      outline: none;
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.7);
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
    }

    option {
      background: #333;
      color: white;
      padding: 0.5rem;
    }
  }
}

@media (width <= 768px) {
  .language-switcher {
    flex-direction: column;
    align-items: stretch;
    gap: 0.25rem;

    &__label {
      font-size: 0.8rem;
    }

    &__select {
      font-size: 0.8rem;
    }
  }
}
</style>
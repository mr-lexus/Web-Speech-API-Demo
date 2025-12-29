<template>
  <div class="app">
    <header class="app__header">
      <div class="app__header-top">
        <h1 class="app__title">{{ $t('app.title') }}</h1>
        <LanguageSwitcher class="app__language-switcher" />
      </div>
      <p class="app__description">
        {{ $t('app.description') }}
      </p>
    </header>

    <main class="app__main">
      <SpeechRecognitionWidget class="app__widget" />
      <SpeechSynthesisWidget class="app__widget" />
    </main>
  </div>
</template>

<script setup lang="ts">
import SpeechRecognitionWidget from '@/widgets/speech-recognition/ui/SpeechRecognitionWidget.vue'
import SpeechSynthesisWidget from '@/widgets/speech-synthesis/ui/SpeechSynthesisWidget.vue'
import LanguageSwitcher from '@/shared/ui/LanguageSwitcher.vue'
</script>

<style lang="scss" scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;

  &__header {
    text-align: center;
    margin-bottom: 3rem;
  }

  &__header-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    gap: 1rem;
  }

  &__language-switcher {
    flex-shrink: 0;
  }

  &__title {
    font-size: 2.5rem;
    color: white;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  &__description {
    font-size: 1.1rem;
    color: rgb(255 255 255 / 90%);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  &__main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  &__widget {
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgb(0 0 0 / 10%);
    overflow: hidden;
  }
}

@media (width <= 768px) {
  .app {
    padding: 1rem;

    &__header-top {
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    &__title {
      font-size: 2rem;
    }

    &__main {
      grid-template-columns: 1fr;
    }
  }
}
</style>
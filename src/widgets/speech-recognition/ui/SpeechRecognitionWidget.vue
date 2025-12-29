<template>
  <div class="speech-recognition">
    <div class="card__header">
      <h2 class="card__title">🎤 {{ $t('speechRecognition.title') }}</h2>
    </div>
    
    <div class="card__body">
      <div class="speech-recognition__controls">
        <button 
          class="btn btn--primary speech-recognition__btn"
          :class="{ 'speech-recognition__btn--recording': isRecording }"
          @click="toggleRecording"
          :disabled="!isSupported"
        >
          <span class="speech-recognition__icon">
            {{ isRecording ? '⏹️' : '🎤' }}
          </span>
          {{ isRecording ? $t('speechRecognition.stopRecording') : $t('speechRecognition.startRecording') }}
        </button>
        
        <button 
          class="btn btn--secondary"
          @click="clearTranscript"
          :disabled="!transcript"
        >
          🗑️ {{ $t('speechRecognition.clear') }}
        </button>
      </div>

      <div class="speech-recognition__status">
        <span 
          class="status"
          :class="{
            'status--success': isRecording,
            'status--error': !isSupported,
            'status--info': !isRecording && isSupported
          }"
        >
          {{ statusText }}
        </span>
      </div>

      <div class="speech-recognition__output">
        <label class="speech-recognition__label">{{ $t('speechRecognition.recognizedText') }}</label>
        <textarea 
          class="speech-recognition__textarea"
          :value="transcript"
          readonly
          :placeholder="$t('speechRecognition.placeholder')"
        ></textarea>
      </div>

      <div class="speech-recognition__settings">
        <div class="speech-recognition__setting">
          <label class="speech-recognition__label">{{ $t('speechRecognition.language') }}</label>
          <select 
            class="speech-recognition__select"
            v-model="selectedLanguage"
            @change="updateLanguage"
          >
            <option value="ru-RU">{{ $t('speechRecognition.languages.ru-RU') }}</option>
            <option value="en-US">{{ $t('speechRecognition.languages.en-US') }}</option>
            <option value="de-DE">{{ $t('speechRecognition.languages.de-DE') }}</option>
            <option value="fr-FR">{{ $t('speechRecognition.languages.fr-FR') }}</option>
          </select>
        </div>
        
        <div class="speech-recognition__setting">
          <label class="speech-recognition__checkbox">
            <input 
              type="checkbox" 
              v-model="continuous"
              @change="updateSettings"
            >
            <span class="speech-recognition__checkbox-text">{{ $t('speechRecognition.continuousRecognition') }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSpeechRecognition } from '../model/useSpeechRecognition'

const {
  isSupported,
  isRecording,
  transcript,
  startRecording,
  stopRecording,
  clearTranscript,
  setLanguage,
  setContinuous
} = useSpeechRecognition()

const selectedLanguage = ref('ru-RU')
const continuous = ref(true)

const { t } = useI18n()

const statusText = computed(() => {
  if (!isSupported.value) {
    return t('speechRecognition.status.notSupported')
  }
  if (isRecording.value) {
    return t('speechRecognition.status.recording')
  }
  return t('speechRecognition.status.ready')
})

const toggleRecording = () => {
  if (isRecording.value) {
    stopRecording()
  } else {
    startRecording()
  }
}

const updateLanguage = () => {
  setLanguage(selectedLanguage.value)
}

const updateSettings = () => {
  setContinuous(continuous.value)
}

onMounted(() => {
  setLanguage(selectedLanguage.value)
  setContinuous(continuous.value)
})
</script>

<style lang="scss" scoped>
.speech-recognition {
  &__controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  &__btn {
    flex: 1;
    min-width: 200px;
    position: relative;
    overflow: hidden;

    &--recording {
      background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
      animation: pulse 2s infinite;
    }
  }

  &__icon {
    font-size: 1.2rem;
  }

  &__status {
    margin-bottom: 1.5rem;
    text-align: center;
  }

  &__output {
    margin-bottom: 1.5rem;
  }

  &__label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #495057;
  }

  &__textarea {
    width: 100%;
    min-height: 120px;
    padding: 1rem;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    font-family: inherit;
    font-size: 1rem;
    resize: vertical;
    background: #f8f9fa;

    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgb(102 126 234 / 10%);
    }
  }

  &__settings {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    align-items: center;
  }

  &__setting {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__select {
    padding: 0.5rem;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    font-size: 0.9rem;
    min-width: 120px;

    &:focus {
      outline: none;
      border-color: #667eea;
    }
  }

  &__checkbox {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    user-select: none;

    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      accent-color: #667eea;
    }
  }

  &__checkbox-text {
    font-size: 0.9rem;
    color: #495057;
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgb(220 53 69 / 70%);
  }

  70% {
    box-shadow: 0 0 0 10px rgb(220 53 69 / 0%);
  }

  100% {
    box-shadow: 0 0 0 0 rgb(220 53 69 / 0%);
  }
}

@media (width <= 768px) {
  .speech-recognition {
    &__controls {
      flex-direction: column;
    }

    &__btn {
      min-width: auto;
    }

    &__settings {
      flex-direction: column;
      align-items: stretch;
    }
  }
}
</style>
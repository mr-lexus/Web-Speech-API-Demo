<template>
  <div class="speech-synthesis">
    <div class="card__header">
      <h2 class="card__title">🔊 {{ $t('speechSynthesis.title') }}</h2>
    </div>
    
    <div class="card__body">
      <div class="speech-synthesis__input">
        <label class="speech-synthesis__label">{{ $t('speechSynthesis.textToSpeak') }}</label>
        <textarea 
          class="speech-synthesis__textarea"
          v-model="textToSpeak"
          :placeholder="$t('speechSynthesis.placeholder')"
          @input="updateCharCount"
        ></textarea>
        <div class="speech-synthesis__char-count">
          {{ charCount }} / {{ maxChars }} {{ $t('speechSynthesis.characters') }}
        </div>
      </div>

      <div class="speech-synthesis__controls">
        <button 
          class="btn btn--primary speech-synthesis__btn"
          @click="speak"
          :disabled="!canSpeak"
        >
          <span class="speech-synthesis__icon">▶️</span>
          {{ $t('speechSynthesis.speak') }}
        </button>
        
        <button 
          class="btn btn--secondary"
          @click="pause"
          :disabled="!isSpeaking"
        >
          <span class="speech-synthesis__icon">⏸️</span>
          {{ $t('speechSynthesis.pause') }}
        </button>
        
        <button 
          class="btn btn--secondary"
          @click="resume"
          :disabled="!isPaused"
        >
          <span class="speech-synthesis__icon">▶️</span>
          {{ $t('speechSynthesis.resume') }}
        </button>
        
        <button 
          class="btn btn--danger"
          @click="stop"
          :disabled="!isSpeaking && !isPaused"
        >
          <span class="speech-synthesis__icon">⏹️</span>
          {{ $t('speechSynthesis.stop') }}
        </button>
      </div>

      <div class="speech-synthesis__status">
        <span 
          class="status"
          :class="{
            'status--success': isSpeaking,
            'status--warning': isPaused,
            'status--error': !isSupported,
            'status--info': !isSpeaking && !isPaused && isSupported
          }"
        >
          {{ statusText }}
        </span>
      </div>

      <div class="speech-synthesis__settings">
        <div class="speech-synthesis__setting">
          <label class="speech-synthesis__label">{{ $t('speechSynthesis.voice') }}</label>
          <select 
            class="speech-synthesis__select"
            v-model="selectedVoiceName"
            @change="updateVoice"
          >
            <option 
              v-for="voice in availableVoices" 
              :key="voice.name"
              :value="voice.name"
            >
              {{ voice.name }} ({{ voice.lang }})
            </option>
          </select>
        </div>
        
        <div class="speech-synthesis__setting">
          <label class="speech-synthesis__label">{{ $t('speechSynthesis.rate') }} {{ rate }}</label>
          <input 
            type="range" 
            class="speech-synthesis__range"
            v-model="rate"
            min="0.1" 
            max="2" 
            step="0.1"
            @input="updateRate"
          >
        </div>
        
        <div class="speech-synthesis__setting">
          <label class="speech-synthesis__label">{{ $t('speechSynthesis.pitch') }} {{ pitch }}</label>
          <input 
            type="range" 
            class="speech-synthesis__range"
            v-model="pitch"
            min="0" 
            max="2" 
            step="0.1"
            @input="updatePitch"
          >
        </div>
        
        <div class="speech-synthesis__setting">
          <label class="speech-synthesis__label">{{ $t('speechSynthesis.volume') }} {{ volume }}</label>
          <input 
            type="range" 
            class="speech-synthesis__range"
            v-model="volume"
            min="0" 
            max="1" 
            step="0.1"
            @input="updateVolume"
          >
        </div>
      </div>

      <div class="speech-synthesis__presets">
        <h3 class="speech-synthesis__presets-title">{{ $t('speechSynthesis.quickPhrases') }}</h3>
        <div class="speech-synthesis__preset-buttons">
          <button 
            class="btn btn--secondary speech-synthesis__preset-btn"
            v-for="preset in presets"
            :key="preset.id"
            @click="speakPreset(preset.text)"
          >
            {{ preset.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSpeechSynthesis } from '../model/useSpeechSynthesis'

const {
  isSupported,
  isSpeaking,
  isPaused,
  availableVoices,
  speak: speakText,
  pause,
  resume,
  stop,
  setVoice,
  setRate,
  setPitch,
  setVolume
} = useSpeechSynthesis()

const { t } = useI18n()

const textToSpeak = ref('')
const selectedVoiceName = ref('')
const rate = ref(1)
const pitch = ref(1)
const volume = ref(1)
const maxChars = 500

const charCount = computed(() => textToSpeak.value.length)

const canSpeak = computed(() => {
  return isSupported.value && 
         textToSpeak.value.trim().length > 0 && 
         !isSpeaking.value && 
         charCount.value <= maxChars
})

const statusText = computed(() => {
  if (!isSupported.value) {
    return t('speechSynthesis.status.notSupported')
  }
  if (isSpeaking.value) {
    return t('speechSynthesis.status.playing')
  }
  if (isPaused.value) {
    return t('speechSynthesis.status.paused')
  }
  if (charCount.value > maxChars) {
    return t('speechSynthesis.status.tooLong', { max: maxChars })
  }
  return t('speechSynthesis.status.ready')
})

const presets = computed(() => [
  { id: 1, label: `👋 ${t('speechSynthesis.presets.greeting')}`, text: t('speechSynthesis.presetTexts.greeting') },
  { id: 2, label: `⏰ ${t('speechSynthesis.presets.time')}`, text: t('speechSynthesis.presetTexts.time', { time: new Date().toLocaleTimeString() }) },
  { id: 3, label: `📅 ${t('speechSynthesis.presets.date')}`, text: t('speechSynthesis.presetTexts.date', { date: new Date().toLocaleDateString() }) },
  { id: 4, label: `🌟 ${t('speechSynthesis.presets.compliment')}`, text: t('speechSynthesis.presetTexts.compliment') },
  { id: 5, label: `🎉 ${t('speechSynthesis.presets.congratulation')}`, text: t('speechSynthesis.presetTexts.congratulation') }
])

const speak = () => {
  if (canSpeak.value) {
    speakText(textToSpeak.value)
  }
}

const speakPreset = (text: string) => {
  textToSpeak.value = text
  speakText(text)
}

const updateCharCount = () => {
  // Рэактыўнае абнаўленне апрацоўваецца computed
}

const updateVoice = () => {
  // Знайсці голас па абраным імені або voiceURI
  const v = availableVoices.value.find(v => v.name === selectedVoiceName.value || v.voiceURI === selectedVoiceName.value)
  if (v) {
    setVoice(v)
  }
}

const updateRate = () => {
  setRate(Number(rate.value))
}

const updatePitch = () => {
  setPitch(Number(pitch.value))
}

const updateVolume = () => {
  setVolume(Number(volume.value))
}

onMounted(() => {
  // Усталяваць тэкст па змаўчанні
  textToSpeak.value = t('speechSynthesis.defaultText')
  
  // Усталяваць голас па змаўчанні, калі галасы загружаны
  setTimeout(() => {
    if (availableVoices.value.length > 0) {
      // Спачатку паспрабаваць знайсці рускі голас
      const russianVoice = availableVoices.value.find(voice => 
        voice.lang.startsWith('ru')
      )
      const defaultVoice = russianVoice || availableVoices.value[0]
      selectedVoiceName.value = defaultVoice.name
      updateVoice()
    }
  }, 100)
})
</script>

<style lang="scss" scoped>
.speech-synthesis {
  &__input {
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
    min-height: 100px;
    padding: 1rem;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    font-family: inherit;
    font-size: 1rem;
    resize: vertical;
    transition: border-color 0.2s ease;

    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgb(102 126 234 / 10%);
    }
  }

  &__char-count {
    text-align: right;
    font-size: 0.875rem;
    color: #6c757d;
    margin-top: 0.25rem;
  }

  &__controls {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  &__btn {
    flex: 1;
    min-width: 120px;
  }

  &__icon {
    font-size: 1rem;
  }

  &__status {
    margin-bottom: 1.5rem;
    text-align: center;
  }

  &__settings {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
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
    background: white;

    &:focus {
      outline: none;
      border-color: #667eea;
    }
  }

  &__range {
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: #dee2e6;
    outline: none;
    cursor: pointer;

    &::-webkit-slider-thumb {
      appearance: none;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #667eea;
      cursor: pointer;
      transition: background 0.2s ease;

      &:hover {
        background: #5a6fd8;
      }
    }

    &::-moz-range-thumb {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: #667eea;
      cursor: pointer;
      border: none;
    }
  }

  &__presets {
    border-top: 1px solid #dee2e6;
    padding-top: 1.5rem;
  }

  &__presets-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #495057;
    margin-bottom: 1rem;
  }

  &__preset-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  &__preset-btn {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
    white-space: nowrap;
  }
}

@media (width <= 768px) {
  .speech-synthesis {
    &__controls {
      flex-direction: column;
    }

    &__btn {
      min-width: auto;
    }

    &__settings {
      grid-template-columns: 1fr;
    }

    &__preset-buttons {
      flex-direction: column;
    }

    &__preset-btn {
      white-space: normal;
    }
  }
}
</style>
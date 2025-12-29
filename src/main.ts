import { createApp } from 'vue'
import App from './app/App.vue'
import './app/styles/index.scss'
import { i18n } from './shared/i18n'

const app = createApp(App)
app.use(i18n)
app.mount('#app')
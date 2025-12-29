import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 3019,
    open: true
  },
  base: process.env.NODE_ENV === 'production' ? '/web-speech-api-demo/' : '/'
})

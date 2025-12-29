import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ command }) => ({
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
  base:
    command === 'build'
      ? `/${process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'Web-Speech-API-Demo'}/`
      : '/'
}))

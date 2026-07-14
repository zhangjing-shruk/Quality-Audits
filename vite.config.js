import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    outDir: 'outputs/quality-audit-form'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  }
})

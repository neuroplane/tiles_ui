import { defineConfig } from 'vite'
import { resolve } from 'path'

// Конфигурация для сборки только CSS
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/styles/tiles-ui.css'),
      name: 'TilesUI',
      fileName: 'tiles-ui',
      formats: ['es']
    },
    rollupOptions: {
      output: {
        assetFileNames: 'tiles-ui.[ext]',
        entryFileNames: 'tiles-ui.js'
      }
    },
    cssCodeSplit: false,
    outDir: 'dist/css'
  }
})

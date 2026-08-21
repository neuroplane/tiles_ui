import { build } from 'vite'
import { resolve } from 'path'
import { writeFileSync, readFileSync } from 'fs'

// Простая сборка CSS - объединяем все CSS файлы в один
const cssFiles = [
  'src/styles/tile.css',
  'src/styles/tiles-container.css',
  'src/styles/button.css',
  'src/styles/dialog.css'
]

let combinedCSS = '/* Tiles UI - CSS Framework */\n\n'

cssFiles.forEach(file => {
  const content = readFileSync(resolve(process.cwd(), file), 'utf-8')
  combinedCSS += `/* ${file} */\n${content}\n\n`
})

// Создаем dist/css если не существует
import { mkdirSync } from 'fs'
mkdirSync('dist/css', { recursive: true })

// Сохраняем объединенный CSS
writeFileSync(resolve(process.cwd(), 'dist/css/tiles-ui.css'), combinedCSS)
writeFileSync(resolve(process.cwd(), 'dist/css/tiles-ui.min.css'), combinedCSS.replace(/\s+/g, ' ').trim())

console.log('✅ CSS framework built successfully!')
console.log('📦 Output: dist/css/tiles-ui.css')
console.log('📦 Output: dist/css/tiles-ui.min.css')

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const versionPath = join(__dirname, 'version.json')

// Читаем текущую версию
const versionData = JSON.parse(readFileSync(versionPath, 'utf8'))

// Получаем сегодняшнюю дату в формате YYYY.MM.DD
const today = new Date()
const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`

// Проверяем, изменилась ли дата
if (versionData.date === dateStr) {
  // Та же дата - увеличиваем счетчик
  versionData.deployCount++
} else {
  // Новая дата - сбрасываем счетчик
  versionData.date = dateStr
  versionData.deployCount = 1
}

// Сохраняем
writeFileSync(versionPath, JSON.stringify(versionData, null, 2) + '\n')

// Выводим версию для проверки
const versionString = `v${versionData.date}.${versionData.deployCount}`
console.log(`Version updated: ${versionString}`)

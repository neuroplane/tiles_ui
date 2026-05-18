<script setup>
import { ref, onMounted, computed } from 'vue'
import TilesContainer from './components/TilesContainer.vue'
import Dialog from './components/Dialog.vue'
import Button from './components/Button.vue'
import Toast from './components/Toast.vue'
import Input from './components/Input.vue'
import Skeleton from './components/Skeleton.vue'
import versionData from '../version.json'

const showDialog = ref(false)
const showCodeDialog = ref(false)
const toastRef = ref(null)
const dialogInput = ref('')
const selectedTileCode = ref('')
const isLoading = ref(true)

// Имитация загрузки
onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 2000)
})

const showToast = (type, message) => {
  if (toastRef.value) {
    toastRef.value[type](message, { title: type.toUpperCase() })
  }
}

// Генерация кода тайла для показа в диалоге
const generateTileCode = (tile) => {
  const iconMap = {
    [icons.user.path]: 'icons.user',
    [icons.bell.path]: 'icons.bell',
    [icons.star.path]: 'icons.star',
    [icons.heart.path]: 'icons.heart',
    [icons.settings.path]: 'icons.settings',
    [icons.ticket.path]: 'icons.ticket',
    [icons.task.path]: 'icons.task',
    [icons.chart.path]: 'icons.chart',
    [icons.accountGroup.path]: 'icons.accountGroup',
    [icons.accountClock.path]: 'icons.accountClock',
  }

  let code = `{\n`
  code += `  size: '${tile.size}',\n`
  code += `  color: '${tile.color}',\n`
  code += `  type: '${tile.type}'`

  if (tile.number !== undefined) code += `,\n  number: ${tile.number}`
  if (tile.title) code += `,\n  title: '${tile.title}'`
  if (tile.value !== undefined) code += `,\n  value: '${tile.value}'`
  if (tile.text) code += `,\n  text: '${tile.text}'`
  if (tile.badge) code += `,\n  badge: '${tile.badge}'`
  
  if (tile.icon) {
    const iconRef = iconMap[tile.icon.path] || 'icons.user'
    code += `,\n  icon: ${iconRef}`
  }
  
  if (tile.progressPercent !== undefined) code += `,\n  progressPercent: ${tile.progressPercent}`
  if (tile.chartData) code += `,\n  chartData: [${tile.chartData.join(', ')}]`
  if (tile.chartValue) code += `,\n  chartValue: '${tile.chartValue}'`
  if (tile.timerTarget) {
    const date = new Date(tile.timerTarget)
    const isoString = date.toISOString().slice(0, 19)
    code += `,\n  timerTarget: new Date('${isoString}').getTime()  // ${date.toLocaleString('ru-RU')}`
  }
  if (tile.indicators) {
    code += `,\n  indicators: [${tile.indicators.map(c => `'${c}'`).join(', ')}]`
  }
  
  if (tile.items) {
    code += `,\n  items: [`
    tile.items.forEach((item, i) => {
      const itemIcon = item.icon ? iconMap[item.icon.path] || 'icons.user' : null
      code += `\n    { text: '${item.text}', value: '${item.value}'${itemIcon ? `, icon: ${itemIcon}` : ''} },`
    })
    code += `\n  ]`
  }

  code += `\n}`
  return code
}

// Показать диалог с кодом тайла
const showTileCode = (tile, index) => {
  selectedTileCode.value = generateTileCode(tile)
  showCodeDialog.value = true
}

// Копировать код в буфер обмена
const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(selectedTileCode.value)
    showToast('success', 'Код скопирован в буфер обмена!')
  } catch (err) {
    showToast('error', 'Не удалось скопировать код')
  }
}

// Примеры иконок (SVG пути)
const icons = {
  chart: {
    viewBox: '0 0 24 24',
    path: 'M3 3v18h18v-2H5V3H3zm16.293 3.293l-4.586 4.586-3.586-3.586L6 14.586 7.414 16l4.707-4.707 3.586 3.586L18 11.414l1.293 1.293z'
  },
  user: {
    viewBox: '0 0 24 24',
    path: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
  },
  bell: {
    viewBox: '0 0 24 24',
    path: 'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z'
  },
  star: {
    viewBox: '0 0 24 24',
    path: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z'
  },
  heart: {
    viewBox: '0 0 24 24',
    path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
  },
  settings: {
    viewBox: '0 0 24 24',
    path: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z'
  },
  ticket: {
    viewBox: '0 0 24 24',
    path: 'M22 10V6C22 4.89 21.1 4 20 4H4C2.9 4 2 4.89 2 6V10C3.11 10 4 10.9 4 12S3.11 14 2 14V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V14C20.9 14 20 13.1 20 12S20.9 10 22 10M20 8.54C18.81 9.23 18 10.53 18 12S18.81 14.77 20 15.46V18H4V15.46C5.19 14.77 6 13.47 6 12C6 10.5 5.2 9.23 4 8.54L4 6H20V8.54M11 15H13V17H11M11 11H13V13H11M11 7H13V9H11Z'
  },
  task: {
    viewBox: '0 0 24 24',
    path: 'M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
  },
  accountGroup: {
    viewBox: '0 0 24 24',
    path: 'M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z'
  },
  accountClock: {
    viewBox: '0 0 24 24',
    path: 'M10.63,14.1C12.23,10.58 16.38,9.03 19.9,10.63C23.42,12.23 24.97,16.38 23.37,19.9C22.24,22.4 19.75,24 17,24C14.3,24 11.83,22.44 10.67,20H1V18C1.06,16.86 1.84,15.93 3.34,15.18C4.84,14.43 6.72,14.04 9,14C9.57,14 10.11,14.05 10.63,14.1V14.1M9,4C10.12,4.03 11.06,4.42 11.81,5.17C12.56,5.92 12.93,6.86 12.93,8C12.93,9.14 12.56,10.08 11.81,10.83C11.06,11.58 10.12,11.95 9,11.95C7.88,11.95 6.94,11.58 6.19,10.83C5.44,10.08 5.07,9.14 5.07,8C5.07,6.86 5.44,5.92 6.19,5.17C6.94,4.42 7.88,4.03 9,4M17,22A5,5 0 0,0 22,17A5,5 0 0,0 17,12A5,5 0 0,0 12,17A5,5 0 0,0 17,22M16,14H17.5V16.82L19.94,18.23L19.19,19.53L16,17.69V14Z'
  }
}

// Примеры тайлов
// Типы:
// icon-value (иконка-значение)
// text (текст)
// number (число)
// list (список)
// title-icon-value (заголовок-иконка-значение)
// title-text (заголовок-текст)
// title-value (заголовок-значение)
// Базовое определение тайлов (без onClick)
const rawTiles = [
  // ============================================
  // РЯД 1: Метрики 1×1
  // ============================================
  { size: '1x1', color: 'red', type: 'number', number: 500, badge: 'ДОЛГИ' },
  { size: '1x1', color: 'blue', type: 'number', number: 2, badge: 'НА СМЕНЕ' },
  { size: '1x1', color: 'blue', type: 'number', number: '—', badge: 'НА ЛЬДУ' },
  { size: '1x1', color: 'orange', type: 'number', number: 3, badge: 'АКТИВНЫХ ЗАДАЧ' },
  { size: '1x1', color: 'green', type: 'number', number: 0, badge: 'ОНЛАЙН-ЗАКАЗЫ' },
  { size: '1x1', color: 'purple', type: 'number', number: 121, badge: 'ДОГОВОРОВ' },
  { size: '1x1', color: 'teal', type: 'number', number: '80%', badge: 'ЯВКА' },

  // ============================================
  // РЯД 2: Широкие плитки
  // ============================================
  { size: '2x1', color: 'purple', type: 'title-value', badge: 'ОПЛАТА ДОЛГОВ', value: 'Нет платежей' },
  { size: '2x2', color: 'green', type: 'list', badge: 'ОНЛАЙН БИЛЕТЫ', items: [
    { text: '17.05.2026 · 13:30', value: '1' },
    { text: '17.05.2026 · 12:15', value: '1' },
  ]},
  { size: '2x1', color: 'purple', type: 'list', badge: 'ПРАЗДНИКИ', items: [
    { text: 'День фармацевтического работника', value: '19.05' },
    { text: 'День полярника', value: '21.05' },
  ]},

  // ============================================
  // РЯД 3: Нижний ряд
  // ============================================
  { size: '2x1', color: 'teal', type: 'list', badge: 'ДНИ РОЖДЕНИЯ', items: [
    { text: 'Ельбиева София', value: '13' },
    { text: 'Афанасенко Тихон', value: '12' },
  ]},
  { size: '2x1', color: 'green', type: 'list', badge: 'ОПЛАТЫ', items: [
    { text: 'Школа: Хоккей Младшая [Тубеев]', value: '9 500' },
  ]},
]

// Добавляем clickable и onClick каждому тайлу
const tiles = computed(() => {
  return rawTiles.map((tile, index) => ({
    ...tile,
    clickable: true,
    onClick: () => showTileCode(tile, index)
  }))
})
</script>

<template>
  <div class="app">
    <!-- Шапка с кнопками демонстрации -->
    <header class="app-header">
      <h1>Metro UI Тайлы</h1>
      <span class="app-version">v{{ versionData.date }}.{{ versionData.deployCount }}</span>
      <p>Современный тайловый интерфейс с типами: number, text, progress, timer, quadrant, title-value, chart, list, title-text</p>
      <div class="demo-controls" style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 4px; justify-content: center;">
        <Button variant="primary" @click="showDialog = true">ДИАЛОГ</Button>
        <Button variant="secondary" @click="showToast('success', 'Операция выполнена успешно!')">SUCCESS</Button>
        <Button variant="secondary" @click="showToast('error', 'Что-то пошло не так!')">ERROR</Button>
        <Button variant="outline" @click="showToast('info', 'Получено новое уведомление')">INFO</Button>
      </div>
    </header>

    <!-- Skeleton Loading (показывается 2 сек при загрузке) -->
    <div v-if="isLoading" class="skeleton-wrapper">
      <Skeleton variant="tiles-grid" :count="8" />
    </div>
    
    <!-- Контейнер тайлов -->
    <TilesContainer v-else :tiles="tiles" maxWidth="1200px" />

    <!-- Контейнер уведомлений -->
    <Toast ref="toastRef" />

    <!-- Диалог с полями ввода -->
    <Dialog v-model="showDialog" title="Информация о пользователе">
      <p style="margin-bottom: 16px;">Пожалуйста, введите вашу информацию ниже:</p>

      <Input
        v-model="dialogInput"
        label="ФИО"
        placeholder="Введите ваше имя"
        hint="Это будет отображаться в вашем профиле"
      />

      <Input
        label="Email"
        type="email"
        placeholder="your@email.com"
        style="margin-top: 16px;"
      />

      <Input
        label="Возраст"
        type="number"
        placeholder="25"
        min="18"
        max="120"
        style="margin-top: 16px;"
      />

      <template #footer>
        <Button size="small" variant="secondary" @click="showDialog = false">Отмена</Button>
        <Button
          size="small"
          variant="primary"
          @click="showDialog = false; showToast('success', 'Информация сохранена!')"
        >
          Сохранить
        </Button>
      </template>
    </Dialog>

    <!-- Диалог с кодом тайла -->
    <Dialog v-model="showCodeDialog" title="Код тайла" maxWidth="600px">
      <p style="margin-bottom: 12px; font-size: 14px; opacity: 0.8;">Нажмите на код, чтобы скопировать:</p>
      <pre class="tile-code" @click="copyCode">{{ selectedTileCode }}</pre>
      <template #footer>
        <Button size="small" variant="secondary" @click="showCodeDialog = false">Закрыть</Button>
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #162c42 0%, #0c1823 100%);
  padding-bottom: 40px;
}

.app-header {
  text-align: center;
  padding: 40px 20px 20px;
  color: white;
}

.app-header h1 {
  margin: 0 0 10px 0;
  font-size: 2.5em;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.app-header p {
  margin: 0 0 20px 0;
  font-size: 1.2em;
  opacity: 0.9;
}

.demo-controls {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 20px;
}

.skeleton-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

@media (max-width: 600px) {
  .app-header h1 {
    font-size: 1.8em;
  }
  
  .app-header p {
    font-size: 1em;
  }
  
  .demo-controls {
    flex-direction: column;
    align-items: center;
  }
}

.tile-code {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 16px;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #aaddff;
  overflow-x: auto;
  white-space: pre;
  cursor: pointer;
  transition: background 0.2s;
  user-select: all;
}

.tile-code:hover {
  background: rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.3);
}

.app-version {
  font-size: 11px;
  color: #88aabb;
  opacity: 0.7;
  margin-top: -8px;
  margin-bottom: 8px;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
}
</style>
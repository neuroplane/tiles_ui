<template>
  <div
    class="tile"
    :class="[
      `tile--${size}`,
      `tile--color-${color}`,
      `tile--type-${type}`,
      { 'tile--clickable': clickable }
    ]"
    @click="clickable && $emit('click')"
  >
    <div v-if="badge" class="tile__badge">{{ badge }}</div>
    
    <!-- Тип: только число -->
    <div v-if="type === 'number'" class="tile__content tile__content--number">
      <span class="tile__number">{{ number }}</span>
    </div>
    
    <!-- Тип: заголовок и значение -->
    <div v-else-if="type === 'title-value'" class="tile__content tile__content--title-value">
      <div class="tile__title">{{ title }}</div>
      <div class="tile__value">{{ value }}</div>
    </div>
    
    <!-- Тип: иконка и значение -->
    <div v-else-if="type === 'icon-value'" class="tile__content tile__content--icon-value">
      <div class="tile__icon">
        <svg v-if="icon" :viewBox="icon.viewBox" class="tile__icon-svg">
          <path :d="icon.path" fill="currentColor" />
        </svg>
      </div>
      <div class="tile__value">{{ value }}</div>
    </div>
    
    <!-- Тип: заголовок, иконка и значение -->
    <div v-else-if="type === 'title-icon-value'" class="tile__content tile__content--title-icon-value">
      <div class="tile__title">{{ title }}</div>
      <div class="tile__icon-value-group">
        <div class="tile__icon">
          <svg v-if="icon" :viewBox="icon.viewBox" class="tile__icon-svg">
            <path :d="icon.path" fill="currentColor" />
          </svg>
        </div>
        <div class="tile__value">{{ value }}</div>
      </div>
    </div>
    
    <!-- Тип: текст -->
    <div v-else-if="type === 'text'" class="tile__content tile__content--text">
      <div class="tile__text">{{ text }}</div>
    </div>
    
    <!-- Тип: заголовок и текст -->
    <div v-else-if="type === 'title-text'" class="tile__content tile__content--title-text">
      <div class="tile__title">{{ title }}</div>
      <div class="tile__text">{{ text }}</div>
    </div>
    
    <!-- Тип: список -->
    <div v-else-if="type === 'list'" class="tile__content tile__content--list">
      <div v-if="title" class="tile__title">{{ title }}</div>
      <ul class="tile__list">
        <li v-for="(item, index) in items" :key="index" class="tile__list-item">
          <span v-if="item.icon" class="tile__list-icon">
            <svg :viewBox="item.icon.viewBox" class="tile__list-icon-svg">
              <path :d="item.icon.path" fill="currentColor" />
            </svg>
          </span>
          <span class="tile__list-text">{{ item.text }}</span>
          <span v-if="item.value" class="tile__list-value">{{ item.value }}</span>
        </li>
      </ul>
    </div>
    
    <!-- Тип: chart (мини-график) -->
    <div v-else-if="type === 'chart'" class="tile__content tile__content--chart">
      <div v-if="title" class="tile__title">{{ title }}</div>
      <div class="tile__chart-container">
        <svg class="tile__chart-svg" viewBox="0 0 100 30" preserveAspectRatio="none">
          <path
            :d="generateSparkline(chartData)"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <div v-if="chartValue !== null" class="tile__chart-value">{{ chartValue }}</div>
      </div>
    </div>
    
    <!-- Тип: progress (прогресс-бар) -->
    <div v-else-if="type === 'progress'" class="tile__content tile__content--progress">
      <div v-if="title" class="tile__title">{{ title }}</div>
      <div class="tile__progress-container">
        <div class="tile__progress-bar">
          <div class="tile__progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
        <div class="tile__progress-value">{{ progressPercent }}%</div>
      </div>
    </div>
    
    <!-- Тип: image (фоновое изображение) -->
    <div v-else-if="type === 'image'" class="tile__content tile__content--image">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        class="tile__image-bg"
        alt=""
        @error="$event.target.style.display='none'"
      />
      <div v-if="badge" class="tile__image-badge">{{ badge }}</div>
      <div class="tile__image-overlay"></div>
      <div class="tile__image-text">
        <div v-if="title" class="tile__image-title">{{ title }}</div>
        <div v-if="text" class="tile__image-subtitle">{{ text }}</div>
      </div>
    </div>
    
    <!-- Тип: timer (обратный отсчет) -->
    <div v-else-if="type === 'timer'" class="tile__content tile__content--timer">
      <div v-if="title" class="tile__title">{{ title }}</div>
      <div class="tile__timer-display">
        <div v-if="timerDays > 0" class="tile__timer-unit">
          <span class="tile__timer-value">{{ timerDays }}</span>
          <span class="tile__timer-label">дн</span>
        </div>
        <div class="tile__timer-unit">
          <span class="tile__timer-value">{{ timerHours }}</span>
          <span class="tile__timer-label">ч</span>
        </div>
        <div class="tile__timer-unit">
          <span class="tile__timer-value">{{ timerMinutes }}</span>
          <span class="tile__timer-label">м</span>
        </div>
        <div class="tile__timer-unit">
          <span class="tile__timer-value">{{ timerSeconds }}</span>
          <span class="tile__timer-label">с</span>
        </div>
      </div>
    </div>
    
    <!-- Тип: по умолчанию (пустой) -->
    <div v-else class="tile__content tile__content--default"></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

import { computed, ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: '1x1',
    validator: (value) => ['1x1', '2x1', '3x1', '1x2', '2x2'].includes(value)
  },
  color: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'green', 'red', 'orange', 'purple', 'pink', 'teal', 'yellow', 'indigo', 'cyan', 'lime', 'amber'].includes(value)
  },
  type: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'number', 'title-value', 'icon-value', 'title-icon-value', 'text', 'title-text', 'list', 'chart', 'progress', 'image', 'timer'].includes(value)
  },
  badge: {
    type: [String, Number],
    default: null
  },
  // Для типа number
  number: {
    type: [String, Number],
    default: null
  },
  // Для типов с заголовком
  title: {
    type: String,
    default: ''
  },
  // Для типов со значением
  value: {
    type: [String, Number],
    default: null
  },
  // Для типов с текстом
  text: {
    type: String,
    default: ''
  },
  // Для типов с иконкой (SVG path)
  icon: {
    type: Object,
    default: null
  },
  // Для типа list (массив элементов списка)
  items: {
    type: Array,
    default: () => []
  },
  // Кликабельность тайла
  clickable: {
    type: Boolean,
    default: false
  },
  // Для типа chart - данные для sparkline [number, number, ...]
  chartData: {
    type: Array,
    default: () => [30, 45, 60, 35, 80, 55, 70]
  },
  // Для типа chart - отображаемое значение
  chartValue: {
    type: [String, Number],
    default: null
  },
  // Для типа progress - процент (0-100)
  progressPercent: {
    type: Number,
    default: 0,
    validator: (value) => value >= 0 && value <= 100
  },
  // Для типа image - URL изображения
  imageUrl: {
    type: String,
    default: ''
  },
  // Для типа timer - целевая дата (ISO string или timestamp)
  timerTarget: {
    type: [String, Number],
    default: null
  }
})

defineEmits(['click'])

// Генерация пути для sparkline
const generateSparkline = (data) => {
  if (!data || data.length === 0) return ''
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const stepX = 100 / (data.length - 1)
  
  return data.map((val, i) => {
    const x = i * stepX
    const y = 30 - ((val - min) / range) * 26 - 2
    return `${i === 0 ? 'M' : 'L'}${x},${y}`
  }).join(' ')
}

// Timer logic
const now = ref(Date.now())
let timerInterval = null

const targetDate = computed(() => {
  if (!props.timerTarget) return null
  return typeof props.timerTarget === 'string' 
    ? new Date(props.timerTarget).getTime() 
    : props.timerTarget
})

const timeLeft = computed(() => {
  if (!targetDate.value) return 0
  const diff = targetDate.value - now.value
  return Math.max(0, diff)
})

const timerDays = computed(() => Math.floor(timeLeft.value / (1000 * 60 * 60 * 24)))
const timerHours = computed(() => String(Math.floor((timeLeft.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0'))
const timerMinutes = computed(() => String(Math.floor((timeLeft.value % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'))
const timerSeconds = computed(() => String(Math.floor((timeLeft.value % (1000 * 60)) / 1000)).padStart(2, '0'))

onMounted(() => {
  if (props.type === 'timer' && targetDate.value) {
    timerInterval = setInterval(() => {
      now.value = Date.now()
    }, 1000)
  }
})

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})

</script>

<style scoped>
.tile {
  position: relative;
  background: var(--tile-bg);
  color: var(--tile-text);
  padding: 12px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.55); */
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.tile--clickable {
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

.tile--clickable:hover {
  transform: scale(1.02);
  opacity: 0.9;
}

.tile--clickable:active {
  transform: scale(0.98);
}



/* Размеры тайлов через grid span */
.tile--1x1 {
  grid-column: span 1;
  grid-row: span 1;
}

.tile--2x1 {
  grid-column: span 2;
  grid-row: span 1;
}

.tile--3x1 {
  grid-column: span 3;
  grid-row: span 1;
}

.tile--1x2 {
  grid-column: span 1;
  grid-row: span 2;
}

.tile--2x2 {
  grid-column: span 2;
  grid-row: span 2;
}

/* На мобильных устройствах ограничиваем размер больших тайлов */
@media (max-width: 600px) {
  .tile--2x1 {
    grid-column: span 3;
  }
  
  .tile--3x1 {
    grid-column: span 3;
  }
  
  .tile--1x2 {
    grid-column: span 1;
    grid-row: span 2;
  }
  
  .tile--2x2 {
    grid-column: span 3;
    grid-row: span 2;
  }
}

/* Бейдж */
.tile__badge {
  position: absolute;
  top: 0%;
  right: 0%;
  background: rgba(255, 255, 255, 0.6);
  color: #333;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 900;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Контент тайла */
.tile__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

/* Тип: только число */
.tile__content--number {
  justify-content: center;
}

.tile__number {
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
}

.tile--2x1 .tile__number,
.tile--3x1 .tile__number,
.tile--2x2 .tile__number {
  font-size: 64px;
}

/* Тип: заголовок и значение */
.tile__content--title-value {
  justify-content: space-between;
  align-items: flex-start;
  text-transform: uppercase;
  
}

.tile__title {
  font-size: 12px;
  font-weight: 300;
  opacity: 0.9;
  
  text-transform: uppercase;
}

.tile__value {
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
}

.tile--2x1 .tile__value,
.tile--3x1 .tile__value,
.tile--2x2 .tile__value {
  font-size: 42px;
}

/* Тип: иконка и значение */
.tile__content--icon-value {
  gap: 12px;
  justify-content: center;
}

.tile__icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tile__icon-svg {
  width: 48px;
  height: 48px;
}

.tile--2x1 .tile__icon-svg,
.tile--3x1 .tile__icon-svg,
.tile--2x2 .tile__icon-svg {
  width: 48px;
  height: 48px;
}

/* Тип: заголовок, иконка и значение */
.tile__content--title-icon-value {
  justify-content: space-between;
  align-items: flex-start;
}

.tile__content--title-icon-value .tile__title {
  align-self: flex-start;
}

.tile__icon-value-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin-top: auto;
}

/* Тип: текст */
.tile__content--text {
  justify-content: center;
  text-align: center;
}

.tile__text {
  font-size: 16px;
  line-height: 1.4;
}

.tile--2x1 .tile__text,
.tile--3x1 .tile__text,
.tile--2x2 .tile__text {
  font-size: 18px;
}

/* Тип: заголовок и текст */
.tile__content--title-text {
  align-items: flex-start;
  justify-content: space-between;
  
}

.tile__content--title-text .tile__text {
  text-align: left;
  font-size: 14px;
}

/* Тип: список */
.tile__content--list {
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
}



.tile__list {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
}



.tile__list-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px 0;
  font-size: 14px;
  line-height: 1.2;
}

.tile__list-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.tile__list-icon-svg {
  width: 16px;
  height: 16px;
  opacity: 0.9;
}

.tile__list-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tile__list-value {
  font-weight: 600;
  flex-shrink: 0;
  opacity: 0.9;
}

/* Тип: chart (мини-график) */
.tile__content--chart {
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.tile__chart-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  position: relative;
}

.tile__chart-svg {
  width: 100%;
  height: 28px;
  opacity: 0.9;
}

.tile__chart-value {
  font-size: 24px;
  font-weight: 700;
  margin-top: 4px;
  margin-bottom: 8px;
}

.tile--2x1 .tile__chart-svg,
.tile--2x2 .tile__chart-svg {
  height: 40px;
}

.tile--2x1 .tile__chart-value,
.tile--2x2 .tile__chart-value {
  font-size: 32px;
  margin-bottom: 12px;
}

/* Тип: progress (прогресс-бар) */
.tile__content--progress {
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.tile__progress-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 8px;
}

.tile__progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  overflow: hidden;
}

.tile__progress-fill {
  height: 100%;
  background: currentColor;
  opacity: 0.9;
  transition: width 0.5s ease;
}

.tile__progress-value {
  font-size: 28px;
  font-weight: 700;
  text-align: center;
}

.tile--2x1 .tile__progress-value,
.tile--2x2 .tile__progress-value {
  font-size: 36px;
}

/* Тип: image (фоновое изображение) */
.tile__content--image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0;
  align-items: flex-start;
  justify-content: flex-end;
  z-index: 0;
  overflow: hidden;
}

.tile__image-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.tile__image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%);
  z-index: 1;
}

.tile__image-text {
  position: relative;
  z-index: 2;
  padding: 12px;
  width: 100%;
}

.tile__image-title {
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.tile__image-subtitle {
  font-size: 12px;
  opacity: 0.9;
}

.tile__image-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 700;
  z-index: 3;
  text-transform: uppercase;
  border-radius: 2px;
}

/* Тип: timer (обратный отсчет) */
.tile__content--timer {
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.tile__timer-display {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1px;
  width: 100%;
}

.tile__timer-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 30px;
}

.tile__timer-value {
  font-size: 24px;
  font-weight: 300;
  line-height: 1;
  font-family: monospace;
  font-variant-numeric: tabular-nums;
}

.tile__timer-label {
  font-size: 10px;
  text-transform: uppercase;
  opacity: 0.8;
  margin-top: 2px;
}

.tile--2x1 .tile__timer-value,
.tile--2x2 .tile__timer-value {
  font-size: 42px;
}

.tile--2x1 .tile__timer-label,
.tile--2x2 .tile__timer-label {
  font-size: 12px;
}

/* Цвета тайлов */
.tile--color-blue {
  --tile-bg: linear-gradient(135deg, #4a5fc7 0%, #3b4c9f 100%);
  --tile-text: #ffffff;
}

.tile--color-green {
  --tile-bg: linear-gradient(135deg, #00a629 0%, #008521 100%);
  --tile-text: #ffffff;
}

.tile--color-red {
  --tile-bg: linear-gradient(135deg, #c9283a 0%, #a1202e 100%);
  --tile-text: #ffffff;
}

.tile--color-orange {
  --tile-bg: linear-gradient(135deg, #ff6600 0%, #cc5200 100%);
  --tile-text: #ffffff;
}

.tile--color-purple {
  --tile-bg: linear-gradient(135deg, #bb29bb 0%, #962196 100%);
  --tile-text: #ffffff;
}

.tile--color-pink {
  --tile-bg: linear-gradient(135deg, #ff96a7 0%, #cc7886 100%);
  --tile-text: #ffffff;
}

.tile--color-teal {
  --tile-bg: linear-gradient(135deg, #008080 0%, #006666 100%);
  --tile-text: #ffffff;
}

.tile--color-yellow {
  --tile-bg: linear-gradient(135deg, #ebb800 0%, #bc9300 100%);
  --tile-text: #ffffff;
}

.tile--color-indigo {
  --tile-bg: linear-gradient(135deg, #437a71 0%, #36625a 100%);
  --tile-text: #ffffff;
}

.tile--color-cyan {
  --tile-bg: linear-gradient(135deg, #4a5fc7 0%, #3b4c9f 100%);
  --tile-text: #ffffff;
}

.tile--color-lime {
  --tile-bg: linear-gradient(135deg, #6dd896 0%, #57ad78 100%);
  --tile-text: #ffffff;
}

.tile--color-amber {
  --tile-bg: linear-gradient(135deg, #b88e52 0%, #937242 100%);
  --tile-text: #ffffff;
}

.tile {
  background: var(--tile-bg);
}

/* ============================================
   МОБИЛЬНАЯ АДАПТАЦИЯ
   ============================================ */
@media (max-width: 600px) {
  /* Уменьшаем базовые шрифты */
  .tile__number {
    font-size: 48px;
  }
  
  .tile__value {
    font-size: 24px;
  }
  
  .tile__title {
    font-size: 16px;
  }
  
  .tile__text {
    font-size: 16px;
  }
  
  /* Уменьшаем иконки */
  .tile__icon-svg {
    width: 32px;
    height: 32px;
  }
  
  /* Таймер - уменьшаем шрифт */
  .tile__timer-display {
    font-size: 24px;
    gap: 4px;
  }
  
  .tile__timer-value {
    font-size: 24px;
    font-family: monospace;
    font-variant-numeric: tabular-nums;
  }
  
  .tile__timer-label {
    font-size: 12px;
  }
  
  .tile__timer-unit {
    min-width: 16px;
  }
  
  /* Прогресс-бар */
  .tile__progress-value {
    font-size: 16px;
  }
  
  /* График */
  .tile__chart-value {
    font-size: 27px;
  }
  
  /* Список */
  .tile__list-value {
    font-size: 13px;
  }
  
  .tile__list-text {
    font-size: 13px;
  }
  
  /* Бейдж */
  .tile__badge {
    font-size: 12px;
    padding: 2px 4px;
  }
  
  /* Большие тайлы - уменьшаем шрифты */
  .tile--2x1 .tile__number,
  .tile--3x1 .tile__number,
  .tile--2x2 .tile__number {
    font-size: 52px;
  }
  
  .tile--2x1 .tile__value,
  .tile--3x1 .tile__value,
  .tile--2x2 .tile__value {
    font-size: 32px;
  }
  
  .tile--2x1 .tile__text,
  .tile--3x1 .tile__text,
  .tile--2x2 .tile__text {
    font-size: 16px;
  }
  
  .tile--2x1 .tile__icon-svg,
  .tile--3x1 .tile__icon-svg,
  .tile--2x2 .tile__icon-svg {
    width: 48px;
    height: 48px;
  }
  
  .tile--2x1 .tile__chart-value,
  .tile--2x2 .tile__chart-value {
    font-size: 28px;
  }
  
  .tile--2x1 .tile__chart-svg,
  .tile--2x2 .tile__chart-svg {
    height: 32px;
  }
  
  /* Таймер на больших тайлах */
  .tile--2x1 .tile__timer-value,
  .tile--2x2 .tile__timer-value {
    font-size: 32px;
  }
  
  .tile--2x1 .tile__timer-label,
  .tile--2x2 .tile__timer-label {
    font-size: 12px;
  }
  
  /* Квадратные пропорции для всех тайлов */
  .tile {
    aspect-ratio: 1 / 1;
  }
  
  /* Широкие тайлы 2x1 и 3x1 */
  .tile--2x1,
  .tile--3x1 {
    aspect-ratio: 2 / 1;
    grid-column: span 2;
  }
  
  /* Высокие тайлы 1x2 */
  .tile--1x2 {
    aspect-ratio: 1 / 2;
    grid-row: span 2;
  }
  
  /* Большие тайлы 2x2 */
  .tile--2x2 {
    aspect-ratio: 1 / 1;
    grid-column: span 2;
    grid-row: span 2;
  }
  
  /* Отключаем анимации на мобильных */
  .tile--clickable {
    transition: none;
  }
  
  .tile--clickable:hover {
    transform: none;
  }
  
  .tile--clickable:active {
    transform: scale(0.98);
    opacity: 0.9;
  }
  
  .tile__progress-bar {
    transition: none;
  }
}
</style>

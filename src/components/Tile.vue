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
    
    <!-- Тип: quadrant (4 цветных квадранта) -->
    <div v-else-if="type === 'quadrant'" class="tile__content tile__content--quadrant">
      <div
        v-for="(color, index) in indicators"
        :key="index"
        class="tile__quadrant"
        :class="`tile__quadrant--${color}`"
      ></div>
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
    validator: (value) => ['default', 'number', 'title-value', 'icon-value', 'title-icon-value', 'text', 'title-text', 'list', 'chart', 'progress', 'image', 'timer', 'quadrant'].includes(value)
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
  },
  // Для типа quadrant - массив из 4 цветов ['danger', 'warning', 'success', 'empty']
  indicators: {
    type: Array,
    default: () => ['danger', 'warning', 'success', 'empty']
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

<style src="../styles/tile.css"></style>

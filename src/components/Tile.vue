<template>
  <div
    class="tile"
    :class="[
      `tile--${size}`,
      `tile--color-${color}`,
      `tile--type-${type}`
    ]"
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
    
    <!-- Тип: по умолчанию (пустой) -->
    <div v-else class="tile__content tile__content--default"></div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  size: {
    type: String,
    default: '1x1',
    validator: (value) => ['1x1', '2x1', '1x2', '2x2'].includes(value)
  },
  color: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'green', 'red', 'orange', 'purple', 'pink', 'teal', 'yellow', 'indigo', 'cyan', 'lime', 'amber'].includes(value)
  },
  type: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'number', 'title-value', 'icon-value', 'title-icon-value', 'text', 'title-text'].includes(value)
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
  }
})
</script>

<style scoped>
.tile {
  position: relative;
  background: var(--tile-bg);
  color: var(--tile-text);
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.55);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
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

.tile--1x2 {
  grid-column: span 1;
  grid-row: span 2;
}

.tile--2x2 {
  grid-column: span 2;
  grid-row: span 2;
}

/* Бейдж */
.tile__badge {
  position: absolute;
  top: 0%;
  right: 0%;
  background: rgba(255, 255, 255, 0.7);
  color: #333;
  padding: 4px 8px;
  font-size: 8px;
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
  font-size: 14px;
  font-weight: 500;
  opacity: 0.9;
}

.tile__value {
  font-size: 32px;
  font-weight: 700;
  line-height: 1;
}

.tile--2x1 .tile__value,
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

/* Цвета тайлов */
.tile--color-blue {
  --tile-bg: linear-gradient(135deg, #4a5fc7 0%, #2a3880 100%);
  --tile-text: #ffffff;
}

.tile--color-green {
  --tile-bg: linear-gradient(135deg, #00a629 0%, #007a1e 100%);
  --tile-text: #ffffff;
}

.tile--color-red {
  --tile-bg: linear-gradient(135deg, #c9283a 0%, #951d2b 100%);
  --tile-text: #ffffff;
}

.tile--color-orange {
  --tile-bg: linear-gradient(135deg, #ff6600 0%, rgb(187, 75, 0) 100%);
  --tile-text: #ffffff;
}

.tile--color-purple {
  --tile-bg: linear-gradient(135deg, #bb29bb 0%, #911f91 100%);
  --tile-text: #ffffff;
}

.tile--color-pink {
  --tile-bg: linear-gradient(135deg, #ff96a7 0%, #c16f7d 100%);
  --tile-text: #ffffff;
}

.tile--color-teal {
  --tile-bg: linear-gradient(135deg, #008080 0%, #005d5d 100%);
  --tile-text: #ffffff;
}

.tile--color-yellow {
  --tile-bg: linear-gradient(135deg, #ebb800 0%, #c09600 100%);
  --tile-text: #333333;
}

.tile--color-indigo {
  --tile-bg: linear-gradient(135deg, #8dd4c8 0%, #659a91 100%);
  --tile-text: #333333;
}

.tile--color-cyan {
  --tile-bg: linear-gradient(135deg, #4a5fc7 0%, #303e85 100%);
  --tile-text: #ffffff;
}

.tile--color-lime {
  --tile-bg: linear-gradient(135deg, #6dd896 0%, #52a572 100%);
  --tile-text: #333333;
}

.tile--color-amber {
  --tile-bg: linear-gradient(135deg, #ffd497 0%, #c29d69 100%);
  --tile-text: #333333;
}

.tile {
  background: var(--tile-bg);
}
</style>

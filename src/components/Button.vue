<template>
  <button
    :class="[
      'button',
      `button--${variant}`,
      `button--${size}`,
      { 'button--disabled': disabled }
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'outline'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style>
.button {
  padding: 8px 12px;
  border: none;
  border-radius: 0;
  cursor: pointer;
  font-size: 12px;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.2s;
  font-family: inherit;
  outline: none;
  position: relative;
  overflow: hidden;
  min-width: auto;
}

.button:focus {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}

/* Варианты */
.button--primary {
  background: #667eea;
  color: #ffffff;
}

.button--primary:hover:not(:disabled) {
  background: #7c92f6;
}

.button--primary:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(102, 126, 234, 0.3);
}

.button--secondary {
  background: rgba(255, 255, 255, 0.3);
  color: #ffffff;
}

.button--secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.button--secondary:active:not(:disabled) {
  transform: translateY(0);
}

.button--outline {
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.button--outline:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);

}

.button--outline:active:not(:disabled) {
  transform: translateY(0);
}

/* Размеры */
.button--small {
  padding: 8px 16px;
  font-size: 12px;
}

.button--medium {
  padding: 12px 24px;
  font-size: 14px;
}

.button--large {
  padding: 16px 32px;
  font-size: 16px;
}

/* Disabled */
.button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>


<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div v-if="modelValue" class="dialog-overlay" @click.self="handleOverlayClick">
        <div class="dialog-container">
          <div v-if="title || $slots.header" class="dialog-header">
            <slot name="header">
              <h2 v-if="title" class="dialog-title">{{ title }}</h2>
            </slot>
          </div>
          
          <div v-if="$slots.default" class="dialog-body">
            <slot></slot>
          </div>
          
          <div v-if="$slots.footer" class="dialog-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  closeOnOverlayClick: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const handleOverlayClick = () => {
  if (props.closeOnOverlayClick) {
    emit('update:modelValue', false)
    emit('close')
  }
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.dialog-container {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dialog-header {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.dialog-title {
  margin: 0;
  font-size: 16px;
  font-weight: 300;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.dialog-body {
  padding: 16px;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  line-height: 1.6;
}

.dialog-footer {
  padding: 16px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.dialog-footer :deep(.button) {
  margin: 0;
}

/* Анимации */
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.3s ease;
}

.dialog-enter-active .dialog-container,
.dialog-leave-active .dialog-container {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-from .dialog-container,
.dialog-leave-to .dialog-container {
  transform: scale(0.9);
  opacity: 0;
}
</style>


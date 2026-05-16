<template>
  <Teleport to="body">
    <TransitionGroup name="toast" tag="div" class="toast-container">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast"
        :class="`toast--${toast.type}`"
        @click="removeToast(toast.id)"
      >
        <div class="toast__icon">
          <svg v-if="toast.type === 'success'" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          <svg v-else-if="toast.type === 'error'" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
          <svg v-else-if="toast.type === 'warning'" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
        </div>
        <div class="toast__content">
          <div v-if="toast.title" class="toast__title">{{ toast.title }}</div>
          <div class="toast__message">{{ toast.message }}</div>
        </div>
        <button class="toast__close" @click.stop="removeToast(toast.id)">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const toasts = ref([])
let toastId = 0

const addToast = (options) => {
  const id = ++toastId
  const toast = {
    id,
    type: options.type || 'info',
    title: options.title || '',
    message: options.message || '',
    duration: options.duration || 5000
  }
  
  toasts.value.push(toast)
  
  if (toast.duration > 0) {
    setTimeout(() => removeToast(id), toast.duration)
  }
  
  return id
}

const removeToast = (id) => {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

const success = (message, options = {}) => addToast({ type: 'success', message, ...options })
const error = (message, options = {}) => addToast({ type: 'error', message, ...options })
const warning = (message, options = {}) => addToast({ type: 'warning', message, ...options })
const info = (message, options = {}) => addToast({ type: 'info', message, ...options })

defineExpose({
  addToast,
  removeToast,
  success,
  error,
  warning,
  info
})
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-left: 4px solid;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  pointer-events: auto;
  cursor: pointer;
  min-width: 300px;
}

.toast--success {
  border-left-color: #00a629;
}

.toast--error {
  border-left-color: #c9283a;
}

.toast--warning {
  border-left-color: #ff6600;
}

.toast--info {
  border-left-color: #4a5fc7;
}

.toast__icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.toast--success .toast__icon {
  color: #00a629;
}

.toast--error .toast__icon {
  color: #c9283a;
}

.toast--warning .toast__icon {
  color: #ff6600;
}

.toast--info .toast__icon {
  color: #4a5fc7;
}

.toast__content {
  flex: 1;
  min-width: 0;
}

.toast__title {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 4px;
  text-transform: uppercase;
}

.toast__message {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.4;
}

.toast__close {
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  background: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  flex-shrink: 0;
  transition: color 0.2s;
}

.toast__close:hover {
  color: #ffffff;
}

/* Animations */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* Mobile */
@media (max-width: 600px) {
  .toast-container {
    left: 10px;
    right: 10px;
    max-width: none;
  }
  
  .toast {
    min-width: auto;
  }
}
</style>

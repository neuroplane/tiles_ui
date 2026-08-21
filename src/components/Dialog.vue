<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div v-if="modelValue" class="dialog-overlay" @click.self="handleOverlayClick">
        <div class="dialog-container" :style="{ maxWidth: typeof maxWidth === 'number' ? maxWidth + 'px' : maxWidth }">
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
import { defineProps, defineEmits, watch } from 'vue'

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
  },
  maxWidth: {
    type: [String, Number],
    default: '600px'
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const handleOverlayClick = () => {
  if (props.closeOnOverlayClick) {
    emit('update:modelValue', false)
    emit('close')
  }
}

// Блокировка скролла при открытом диалоге
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = scrollbarWidth + 'px'
  } else {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  }
}, { immediate: true })
</script>

<style src="../styles/dialog.css"></style>

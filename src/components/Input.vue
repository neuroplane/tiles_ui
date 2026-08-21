<template>
  <div class="input-wrapper" :class="{ 'input-wrapper--error': error }">
    <label v-if="label" class="input-label" :for="inputId">
      {{ label }}
      <span v-if="required" class="input-required">*</span>
    </label>
    <div class="input-container">
      <span v-if="$slots.prefix" class="input-prefix">
        <slot name="prefix"></slot>
      </span>
      <input
        :id="inputId"
        ref="inputRef"
        class="input"
        :class="{
          'input--with-prefix': $slots.prefix,
          'input--with-suffix': $slots.suffix,
          'input--error': error
        }"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :min="min"
        :max="max"
        :step="step"
        :autocomplete="autocomplete"
        @input="handleInput"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
        @keydown="$emit('keydown', $event)"
      />
      <span v-if="$slots.suffix" class="input-suffix">
        <slot name="suffix"></slot>
      </span>
    </div>
    <div v-if="error" class="input-error">{{ error }}</div>
    <div v-else-if="hint" class="input-hint">{{ hint }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text',
    validator: (value) => ['text', 'password', 'email', 'number', 'tel', 'url', 'search'].includes(value)
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  hint: {
    type: String,
    default: ''
  },
  min: {
    type: [String, Number],
    default: undefined
  },
  max: {
    type: [String, Number],
    default: undefined
  },
  step: {
    type: [String, Number],
    default: undefined
  },
  autocomplete: {
    type: String,
    default: undefined
  }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus', 'keydown'])

const inputRef = ref(null)
let inputIdCounter = 0
const inputId = computed(() => `input-${++inputIdCounter}`)

const handleInput = (event) => {
  let value = event.target.value
  
  if (props.type === 'number') {
    value = value === '' ? '' : Number(value)
  }
  
  emit('update:modelValue', value)
}

const focus = () => inputRef.value?.focus()
const blur = () => inputRef.value?.blur()
const select = () => inputRef.value?.select()

defineExpose({
  focus,
  blur,
  select,
  inputRef
})
</script>

<style src="../styles/input.css"></style>
